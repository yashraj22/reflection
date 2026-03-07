import { v } from 'convex/values'
import type { Doc } from './_generated/dataModel'
import { mutation, query } from './_generated/server'

const DAY_MS = 24 * 60 * 60 * 1000

const HORIZON_ORDER = {
  north_star: 0,
  quarter: 1,
  current: 2,
} as const

const THEME_RULES = [
  {
    label: 'Clarity',
    slug: 'clarity',
    keywords: ['clarity', 'unclear', 'uncertain', 'confused', 'direction'],
    question:
      'Which part of the goal feels fuzzy right now, and what would make it concrete enough to act on today?',
  },
  {
    label: 'Overwhelm',
    slug: 'overwhelm',
    keywords: ['overwhelmed', 'too much', 'chaos', 'pressure', 'stretched'],
    question:
      'What can you deliberately make smaller today so progress feels light instead of heavy?',
  },
  {
    label: 'Consistency',
    slug: 'consistency',
    keywords: ['consistent', 'consistency', 'routine', 'habit', 'streak'],
    question:
      'If you only protected one habit today, which one would keep the whole week pointed in the right direction?',
  },
  {
    label: 'Energy',
    slug: 'energy',
    keywords: ['energy', 'tired', 'drained', 'fatigue', 'burned out'],
    question:
      'What is draining you more than it deserves, and what boundary would buy some energy back tomorrow?',
  },
  {
    label: 'Focus',
    slug: 'focus',
    keywords: ['focus', 'distracted', 'context switch', 'scattered', 'attention'],
    question:
      'When did your focus feel strongest recently, and how can you recreate that environment in the next 24 hours?',
  },
  {
    label: 'Avoidance',
    slug: 'avoidance',
    keywords: ['avoid', 'avoiding', 'procrastinate', 'resist', 'stuck'],
    question:
      'What are you avoiding because it feels emotionally expensive, and what is the smallest honest first step?',
  },
  {
    label: 'Sleep',
    slug: 'sleep',
    keywords: ['sleep', 'late', 'woke up', 'rest', 'morning'],
    question:
      'How did sleep shape today, and what specific change tonight would make tomorrow easier?',
  },
] as const

type GoalDoc = Doc<'goals'>
type ReflectionDoc = Doc<'reflections'>

export const dashboard = query({
  args: {
    dateKey: v.string(),
  },
  handler: async (ctx, args) => {
    const [todayReflection, activeGoals, recentReflections] = await Promise.all([
      ctx.db
        .query('reflections')
        .withIndex('by_dateKey', (q) => q.eq('dateKey', args.dateKey))
        .unique(),
      ctx.db
        .query('goals')
        .withIndex('by_status', (q) => q.eq('status', 'active'))
        .collect(),
      ctx.db.query('reflections').withIndex('by_dateKey').order('desc').take(8),
    ])

    const sortedGoals = [...activeGoals].sort((left, right) => {
      const horizonDelta =
        HORIZON_ORDER[left.horizon] - HORIZON_ORDER[right.horizon]
      if (horizonDelta !== 0) {
        return horizonDelta
      }
      return right.updatedAt - left.updatedAt
    })

    const averages = getAverages(recentReflections)
    const recurringTheme = getRecurringTheme(recentReflections)
    const streak = getStreakCount(recentReflections, args.dateKey)

    return {
      todayReflection: todayReflection
        ? {
            ...todayReflection,
            themes: getThemes(todayReflection),
            completionScore: getCompletionScore(todayReflection),
          }
        : null,
      activeGoals: sortedGoals.map((goal) => ({
        ...goal,
        horizonLabel: getHorizonLabel(goal.horizon),
      })),
      recentReflections: recentReflections.map(toReflectionSummary),
      metrics: {
        streak,
        reflectionCount: recentReflections.length,
        averageMood: averages.mood,
        averageEnergy: averages.energy,
        averageProgress: averages.progress,
      },
      contextLines: buildContextLines({
        todayReflection,
        goals: sortedGoals,
        recentReflections,
        recurringTheme,
        averages,
        streak,
      }),
      promptPack: buildPromptPack({
        goals: sortedGoals,
        todayReflection,
        recentReflections,
        recurringTheme,
        averages,
      }),
    }
  },
})

export const history = query({
  args: {},
  handler: async (ctx) => {
    const [reflections, activeGoals, completedGoals] = await Promise.all([
      ctx.db.query('reflections').withIndex('by_dateKey').order('desc').collect(),
      ctx.db
        .query('goals')
        .withIndex('by_status', (q) => q.eq('status', 'active'))
        .collect(),
      ctx.db
        .query('goals')
        .withIndex('by_status', (q) => q.eq('status', 'completed'))
        .collect(),
    ])

    const themeCounts = new Map<string, { label: string; count: number }>()
    for (const reflection of reflections) {
      for (const theme of getThemes(reflection)) {
        const current = themeCounts.get(theme.slug)
        if (current) {
          current.count += 1
        } else {
          themeCounts.set(theme.slug, { label: theme.label, count: 1 })
        }
      }
    }

    const orderedThemes = [...themeCounts.values()]
      .sort((left, right) => right.count - left.count)
      .slice(0, 6)

    return {
      entries: reflections.map(toReflectionSummary),
      summary: {
        totalReflections: reflections.length,
        activeGoals: activeGoals.length,
        completedGoals: completedGoals.length,
        topThemes: orderedThemes,
      },
    }
  },
})

export const createGoal = mutation({
  args: {
    title: v.string(),
    why: v.optional(v.string()),
    area: v.optional(v.string()),
    nextStep: v.optional(v.string()),
    horizon: v.union(
      v.literal('north_star'),
      v.literal('quarter'),
      v.literal('current'),
    ),
  },
  handler: async (ctx, args) => {
    const now = Date.now()
    return ctx.db.insert('goals', {
      title: cleanText(args.title) ?? 'Untitled goal',
      why: cleanText(args.why),
      area: cleanText(args.area),
      nextStep: cleanText(args.nextStep),
      horizon: args.horizon,
      status: 'active',
      createdAt: now,
      updatedAt: now,
    })
  },
})

export const setGoalStatus = mutation({
  args: {
    goalId: v.id('goals'),
    status: v.union(
      v.literal('active'),
      v.literal('paused'),
      v.literal('completed'),
    ),
  },
  handler: async (ctx, args) => {
    const goal = await ctx.db.get(args.goalId)
    if (!goal) {
      throw new Error('Goal not found.')
    }

    const now = Date.now()
    await ctx.db.patch(args.goalId, {
      status: args.status,
      updatedAt: now,
      completedAt: args.status === 'completed' ? now : undefined,
    })
  },
})

export const upsertReflection = mutation({
  args: {
    dateKey: v.string(),
    summary: v.optional(v.string()),
    intention: v.optional(v.string()),
    reflection: v.optional(v.string()),
    win: v.optional(v.string()),
    blocker: v.optional(v.string()),
    tomorrowFocus: v.optional(v.string()),
    mood: v.optional(v.number()),
    energy: v.optional(v.number()),
    progress: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query('reflections')
      .withIndex('by_dateKey', (q) => q.eq('dateKey', args.dateKey))
      .unique()

    const now = Date.now()
    const payload = {
      dateKey: args.dateKey,
      summary: cleanText(args.summary),
      intention: cleanText(args.intention),
      reflection: cleanText(args.reflection),
      win: cleanText(args.win),
      blocker: cleanText(args.blocker),
      tomorrowFocus: cleanText(args.tomorrowFocus),
      mood: clampRating(args.mood),
      energy: clampRating(args.energy),
      progress: clampRating(args.progress),
      updatedAt: now,
    }

    if (existing) {
      await ctx.db.patch(existing._id, payload)
      return existing._id
    }

    return ctx.db.insert('reflections', {
      ...payload,
      createdAt: now,
    })
  },
})

function cleanText(value?: string) {
  const cleaned = value?.trim()
  return cleaned ? cleaned : undefined
}

function clampRating(value?: number) {
  if (value === undefined) {
    return undefined
  }
  return Math.max(1, Math.min(5, Math.round(value)))
}

function getThemes(reflection: Pick<
  ReflectionDoc,
  'summary' | 'intention' | 'reflection' | 'win' | 'blocker' | 'tomorrowFocus'
>) {
  const haystack = [
    reflection.summary,
    reflection.intention,
    reflection.reflection,
    reflection.win,
    reflection.blocker,
    reflection.tomorrowFocus,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  const themes = []
  for (const theme of THEME_RULES) {
    if (theme.keywords.some((keyword) => haystack.includes(keyword))) {
      themes.push({ slug: theme.slug, label: theme.label, question: theme.question })
    }
  }
  return themes
}

function getRecurringTheme(reflections: ReflectionDoc[]) {
  const counts = new Map<
    string,
    { count: number; theme: (typeof THEME_RULES)[number] }
  >()

  for (const reflection of reflections.slice(0, 5)) {
    const seen = new Set<string>()
    for (const theme of getThemes(reflection)) {
      if (seen.has(theme.slug)) {
        continue
      }
      seen.add(theme.slug)
      const matched = THEME_RULES.find((entry) => entry.slug === theme.slug)
      if (!matched) {
        continue
      }
      const current = counts.get(theme.slug)
      if (current) {
        current.count += 1
      } else {
        counts.set(theme.slug, { count: 1, theme: matched })
      }
    }
  }

  return [...counts.values()].sort((left, right) => right.count - left.count)[0] ?? null
}

function getCompletionScore(reflection: ReflectionDoc) {
  const completedFields = [
    reflection.summary,
    reflection.intention,
    reflection.reflection,
    reflection.win,
    reflection.blocker,
    reflection.tomorrowFocus,
    reflection.mood,
    reflection.energy,
    reflection.progress,
  ].filter((value) => value !== undefined)

  return Math.round((completedFields.length / 9) * 100)
}

function getAverages(reflections: ReflectionDoc[]) {
  return {
    mood: averageMetric(reflections, 'mood'),
    energy: averageMetric(reflections, 'energy'),
    progress: averageMetric(reflections, 'progress'),
  }
}

function averageMetric(
  reflections: ReflectionDoc[],
  key: 'mood' | 'energy' | 'progress',
) {
  const values = reflections
    .map((reflection) => reflection[key])
    .filter((value): value is number => value !== undefined)

  if (values.length === 0) {
    return null
  }

  const total = values.reduce((sum, value) => sum + value, 0)
  return Number((total / values.length).toFixed(1))
}

function buildContextLines({
  todayReflection,
  goals,
  recentReflections,
  recurringTheme,
  averages,
  streak,
}: {
  todayReflection: ReflectionDoc | null
  goals: GoalDoc[]
  recentReflections: ReflectionDoc[]
  recurringTheme: { count: number; theme: (typeof THEME_RULES)[number] } | null
  averages: ReturnType<typeof getAverages>
  streak: number
}) {
  const lines: string[] = []

  if (streak > 0) {
    lines.push(`You have checked in ${streak} day${streak === 1 ? '' : 's'} in a row.`)
  }

  if (recurringTheme && recurringTheme.count > 1) {
    lines.push(
      `${recurringTheme.theme.label} has shown up in ${recurringTheme.count} of your last 5 entries.`,
    )
  }

  const latestWin = recentReflections.find((reflection) => reflection.win)?.win
  if (latestWin) {
    lines.push(`Most recent win: ${latestWin}`)
  }

  if (averages.progress !== null && averages.progress < 3) {
    lines.push(
      `Average progress across recent check-ins is ${averages.progress}/5, so a smaller next step may help.`,
    )
  }

  const goalWithoutStep = goals.find((goal) => !goal.nextStep)
  if (goalWithoutStep) {
    lines.push(`"${goalWithoutStep.title}" still needs a concrete next step.`)
  }

  if (!todayReflection && recentReflections.length === 0) {
    lines.push('Start simple: direction, next step, and one honest reflection are enough.')
  }

  return lines.slice(0, 4)
}

function buildPromptPack({
  goals,
  todayReflection,
  recentReflections,
  recurringTheme,
  averages,
}: {
  goals: GoalDoc[]
  todayReflection: ReflectionDoc | null
  recentReflections: ReflectionDoc[]
  recurringTheme: { count: number; theme: (typeof THEME_RULES)[number] } | null
  averages: ReturnType<typeof getAverages>
}) {
  const questions: string[] = []
  const primaryGoal = goals[0]
  const reflectionIsBlank =
    !todayReflection ||
    getCompletionScore(todayReflection) < 35 ||
    !todayReflection.reflection

  if (goals.length === 0) {
    questions.push('What long-term direction matters enough that you want today to point toward it?')
    questions.push('If this week went well, what would you be proud to say actually moved?')
  }

  if (primaryGoal) {
    questions.push(
      `What would meaningful progress on "${primaryGoal.title}" look like before today ends?`,
    )
  }

  if (reflectionIsBlank) {
    questions.push('What felt most true today, even if it is messy or unfinished?')
    questions.push('What was the smallest action that either built or broke momentum today?')
  }

  if (averages.progress !== null && averages.progress < 3) {
    questions.push('What is the smallest visible step you can finish in 15 minutes tomorrow?')
  }

  if (recurringTheme && recurringTheme.count > 1) {
    questions.push(recurringTheme.theme.question)
  }

  const goalWithoutStep = goals.find((goal) => !goal.nextStep)
  if (goalWithoutStep) {
    questions.push(
      `Finish this sentence for "${goalWithoutStep.title}": "Next, I will..."`,
    )
  }

  if (recentReflections.every((reflection) => !reflection.win) && recentReflections.length > 0) {
    questions.push('What deserves to count as a win even if it looked small from the outside?')
  }

  return {
    headline:
      recurringTheme && recurringTheme.count > 1
        ? `You keep circling ${recurringTheme.theme.label.toLowerCase()}. Write into that instead of around it.`
        : 'If the page feels blank, start from a question that reduces friction.',
    questions: dedupe(questions).slice(0, 4),
  }
}

function toReflectionSummary(reflection: ReflectionDoc) {
  const themes = getThemes(reflection)

  return {
    _id: reflection._id,
    dateKey: reflection.dateKey,
    summary: reflection.summary,
    intention: reflection.intention,
    win: reflection.win,
    blocker: reflection.blocker,
    tomorrowFocus: reflection.tomorrowFocus,
    mood: reflection.mood,
    energy: reflection.energy,
    progress: reflection.progress,
    excerpt:
      reflection.reflection ??
      reflection.summary ??
      reflection.blocker ??
      reflection.win ??
      reflection.tomorrowFocus ??
      'A short check-in.',
    themes: themes.map((theme) => ({
      slug: theme.slug,
      label: theme.label,
    })),
    completionScore: getCompletionScore(reflection),
  }
}

function getStreakCount(reflections: ReflectionDoc[], todayKey: string) {
  const seen = new Set(reflections.map((reflection) => reflection.dateKey))
  let streak = 0
  let cursor = todayKey

  while (seen.has(cursor)) {
    streak += 1
    cursor = addDays(cursor, -1)
  }

  return streak
}

function addDays(dateKey: string, amount: number) {
  const timestamp = parseDateKey(dateKey)
  return formatDateKey(timestamp + amount * DAY_MS)
}

function parseDateKey(dateKey: string) {
  const [year, month, day] = dateKey.split('-').map(Number)
  return Date.UTC(year, month - 1, day)
}

function formatDateKey(timestamp: number) {
  const date = new Date(timestamp)
  const year = date.getUTCFullYear()
  const month = `${date.getUTCMonth() + 1}`.padStart(2, '0')
  const day = `${date.getUTCDate()}`.padStart(2, '0')
  return `${year}-${month}-${day}`
}

function getHorizonLabel(horizon: GoalDoc['horizon']) {
  if (horizon === 'north_star') {
    return 'North Star'
  }
  if (horizon === 'quarter') {
    return 'This Quarter'
  }
  return 'Current Focus'
}

function dedupe(values: string[]) {
  return [...new Set(values)]
}
