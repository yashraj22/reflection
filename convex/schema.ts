import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  goals: defineTable({
    title: v.string(),
    why: v.optional(v.string()),
    area: v.optional(v.string()),
    nextStep: v.optional(v.string()),
    horizon: v.union(
      v.literal('north_star'),
      v.literal('quarter'),
      v.literal('current'),
    ),
    status: v.union(
      v.literal('active'),
      v.literal('paused'),
      v.literal('completed'),
    ),
    createdAt: v.number(),
    updatedAt: v.number(),
    completedAt: v.optional(v.number()),
  })
    .index('by_status', ['status'])
    .index('by_horizon', ['horizon']),

  reflections: defineTable({
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
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_dateKey', ['dateKey'])
    .index('by_updatedAt', ['updatedAt']),
})
