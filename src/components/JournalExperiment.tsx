import { convexQuery, useConvexMutation } from "@convex-dev/react-query";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import type { Dispatch, FormEvent, ReactNode, SetStateAction } from "react";
import { useEffect, useRef, useState, useTransition } from "react";
import { api } from "../../convex/_generated/api";
import { formatDisplayDate, getTodayDateKey } from "../lib/date";

type GoalDraft = {
	title: string;
	nextStep: string;
};

type ReflectionDraft = {
	summary: string;
	intention: string;
	reflection: string;
	win: string;
	blocker: string;
	tomorrowFocus: string;
	mood: number;
	energy: number;
	progress: number;
};

type ReflectionLike = {
	summary?: string | null;
	intention?: string | null;
	reflection?: string | null;
	win?: string | null;
	blocker?: string | null;
	tomorrowFocus?: string | null;
	mood?: number | null;
	energy?: number | null;
	progress?: number | null;
} | null;

type ActiveGoal = {
	_id: string;
	title: string;
	horizonLabel: string;
	area?: string | null;
	nextStep?: string | null;
	why?: string | null;
};

type ReflectionSummary = {
	_id: string;
	dateKey: string;
	excerpt: string;
	completionScore: number;
	mood?: number | null;
	energy?: number | null;
	progress?: number | null;
};

type VariantId = 11 | 12 | 13 | 14 | 15;

const EMPTY_GOAL: GoalDraft = {
	title: "",
	nextStep: "",
};

const EMPTY_REFLECTION: ReflectionDraft = {
	summary: "",
	intention: "",
	reflection: "",
	win: "",
	blocker: "",
	tomorrowFocus: "",
	mood: 3,
	energy: 3,
	progress: 3,
};

const AUTO_SAVE_DELAY_MS = 700;

const VARIANT_META: Record<
	VariantId,
	{ name: string; note: string; width: string }
> = {
	11: {
		name: "Focus First",
		note: "Writing takes the first slot. Support stays nearby, but secondary.",
		width: "max-w-6xl",
	},
	12: {
		name: "Guided Start",
		note: "Questions appear earlier so the page never starts cold.",
		width: "max-w-[1180px]",
	},
	13: {
		name: "Wide Compose",
		note: "The reflection stays dominant, with everything else beneath it.",
		width: "max-w-[1240px]",
	},
	14: {
		name: "Step Flow",
		note: "The journey is explicit: direction, write, rate, review.",
		width: "max-w-[1080px]",
	},
	15: {
		name: "Review Rail",
		note: "Context and recent patterns stay visible while you write.",
		width: "max-w-[1280px]",
	},
};

export default function JournalExperiment({ variant }: { variant: VariantId }) {
	const todayKey = getTodayDateKey();
	const dashboardQuery = useQuery({
		...convexQuery(api.journal.dashboard, { dateKey: todayKey }),
	});
	const todayReflection = dashboardQuery.data?.todayReflection ?? null;
	const saveReflection = useConvexMutation(api.journal.upsertReflection);
	const createGoal = useConvexMutation(api.journal.createGoal);
	const setGoalStatus = useConvexMutation(api.journal.setGoalStatus);

	const saveRequestRef = useRef(0);
	const [goalDraft, setGoalDraft] = useState<GoalDraft>(EMPTY_GOAL);
	const [reflectionDraft, setReflectionDraft] =
		useState<ReflectionDraft>(EMPTY_REFLECTION);
	const [savedReflectionDraft, setSavedReflectionDraft] =
		useState<ReflectionDraft>(EMPTY_REFLECTION);
	const [statusMessage, setStatusMessage] = useState("Start writing.");
	const [reflectionErrorMessage, setReflectionErrorMessage] = useState<
		string | null
	>(null);
	const [goalErrorMessage, setGoalErrorMessage] = useState<string | null>(null);
	const [goalActionId, setGoalActionId] = useState<string | null>(null);
	const [isAutoSavingReflection, setAutoSavingReflection] = useState(false);
	const [isSavingGoal, startSavingGoal] = useTransition();

	useEffect(() => {
		const nextDraft = toReflectionDraft(todayReflection);
		setReflectionDraft(nextDraft);
		setSavedReflectionDraft(nextDraft);
		setReflectionErrorMessage(null);
		setStatusMessage(`Loaded ${formatDisplayDate(todayKey)}.`);
	}, [todayReflection, todayKey]);

	const hasUnsavedReflection = !reflectionDraftsEqual(
		reflectionDraft,
		savedReflectionDraft,
	);

	useEffect(() => {
		if (!hasUnsavedReflection) {
			return;
		}

		setStatusMessage("Saving...");
		const timeoutId = window.setTimeout(() => {
			const requestId = saveRequestRef.current + 1;
			saveRequestRef.current = requestId;
			const draft = reflectionDraft;

			setAutoSavingReflection(true);
			setReflectionErrorMessage(null);

			void saveReflection({
				dateKey: todayKey,
				summary: optionalText(draft.summary),
				intention: optionalText(draft.intention),
				reflection: optionalText(draft.reflection),
				win: optionalText(draft.win),
				blocker: optionalText(draft.blocker),
				tomorrowFocus: optionalText(draft.tomorrowFocus),
				mood: draft.mood,
				energy: draft.energy,
				progress: draft.progress,
			})
				.then(() => {
					if (saveRequestRef.current !== requestId) {
						return;
					}
					setSavedReflectionDraft(draft);
					setStatusMessage(`Saved ${formatDisplayDate(todayKey)}.`);
				})
				.catch((error) => {
					if (saveRequestRef.current !== requestId) {
						return;
					}
					setReflectionErrorMessage(
						error instanceof Error
							? error.message
							: "Reflection save failed. Try again.",
					);
					setStatusMessage("Save failed.");
				})
				.finally(() => {
					if (saveRequestRef.current === requestId) {
						setAutoSavingReflection(false);
					}
				});
		}, AUTO_SAVE_DELAY_MS);

		return () => window.clearTimeout(timeoutId);
	}, [hasUnsavedReflection, reflectionDraft, saveReflection, todayKey]);

	if (dashboardQuery.isPending) {
		return <ExperimentState message="Loading today..." />;
	}

	if (dashboardQuery.error || !dashboardQuery.data) {
		return (
			<ExperimentState
				title="Today"
				message={
					dashboardQuery.error instanceof Error
						? dashboardQuery.error.message
						: "The journal could not load."
				}
			/>
		);
	}

	const dashboard = dashboardQuery.data;
	const primaryGoal = (dashboard.activeGoals[0] ?? null) as ActiveGoal | null;
	const goals = dashboard.activeGoals as ActiveGoal[];
	const contextLines = dashboard.contextLines.slice(0, 4);
	const promptQuestions = dashboard.promptPack.questions;
	const recentReflections = dashboard.recentReflections.slice(
		0,
		3,
	) as ReflectionSummary[];
	const meta = VARIANT_META[variant];
	const visibleStatus = reflectionErrorMessage ?? statusMessage;

	function insertPrompt(prompt: string) {
		setReflectionDraft((current) => ({
			...current,
			reflection: current.reflection.trim()
				? `${current.reflection.trim()}\n\n${prompt}`
				: `${prompt}\n\n`,
		}));
	}

	function updateDraft<K extends keyof ReflectionDraft>(
		key: K,
		value: ReflectionDraft[K],
	) {
		setReflectionDraft((current) => ({
			...current,
			[key]: value,
		}));
	}

	function handleGoalSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (!goalDraft.title.trim()) {
			setGoalErrorMessage("Enter a goal title.");
			return;
		}

		setGoalErrorMessage(null);
		startSavingGoal(async () => {
			try {
				await createGoal({
					title: goalDraft.title.trim(),
					nextStep: optionalText(goalDraft.nextStep),
					horizon: "current",
				});
				setGoalDraft(EMPTY_GOAL);
				setStatusMessage("Goal added.");
			} catch (error) {
				setGoalErrorMessage(
					error instanceof Error ? error.message : "Goal creation failed.",
				);
			}
		});
	}

	async function handleGoalStatusChange(
		goalId: string,
		status: "paused" | "completed",
	) {
		if (status === "completed") {
			const shouldContinue = window.confirm(
				"Complete this goal? You can still find it in history.",
			);
			if (!shouldContinue) {
				return;
			}
		}

		setGoalErrorMessage(null);
		setGoalActionId(goalId);

		try {
			await setGoalStatus({ goalId: goalId as never, status });
			setStatusMessage(status === "paused" ? "Goal paused." : "Goal completed.");
		} catch (error) {
			setGoalErrorMessage(
				error instanceof Error ? error.message : "Goal update failed.",
			);
		} finally {
			setGoalActionId(null);
		}
	}

	const composePanel = (
		<ComposePanel
			primaryGoal={primaryGoal}
			reflectionDraft={reflectionDraft}
			updateDraft={updateDraft}
			insertPrompt={insertPrompt}
			primaryPrompt={promptQuestions[0] ?? null}
			morePrompts={promptQuestions.slice(1)}
			errorMessage={reflectionErrorMessage}
		/>
	);

	const scorePanel = (
		<Section title="State">
			<ScoreField
				label="Mood"
				value={reflectionDraft.mood}
				onChange={(value) => updateDraft("mood", value)}
			/>
			<div className="mt-4">
				<ScoreField
					label="Energy"
					value={reflectionDraft.energy}
					onChange={(value) => updateDraft("energy", value)}
				/>
			</div>
			<div className="mt-4">
				<ScoreField
					label="Progress"
					value={reflectionDraft.progress}
					onChange={(value) => updateDraft("progress", value)}
				/>
			</div>
		</Section>
	);

	const promptPanel = (
		<Section title="Questions">
			<div className="grid gap-3">
				{promptQuestions.map((prompt) => (
					<button
						key={prompt}
						type="button"
						onClick={() => insertPrompt(prompt)}
						className="prompt-button"
					>
						{prompt}
					</button>
				))}
			</div>
		</Section>
	);

	const goalPanel = (
		<GoalPanel
			goals={goals}
			goalDraft={goalDraft}
			setGoalDraft={setGoalDraft}
			onSubmit={handleGoalSubmit}
			onStatusChange={handleGoalStatusChange}
			goalActionId={goalActionId}
			isSavingGoal={isSavingGoal}
			errorMessage={goalErrorMessage}
		/>
	);

	const contextPanel = (
		<Section title="Context">
			{contextLines.length > 0 ? (
				<div className="compact-stack">
					{contextLines.map((line) => (
						<p key={line} className="context-line">
							{line}
						</p>
					))}
				</div>
			) : (
				<p className="section-note">No context yet.</p>
			)}
		</Section>
	);

	const recentPanel = (
		<Section title="Recent">
			<ul className="list-reset rule-list">
				{recentReflections.map((entry) => (
					<li key={entry._id} className="simple-row">
						<div className="history-head">
							<p className="item-title">{formatDisplayDate(entry.dateKey)}</p>
							<p className="item-meta">{entry.completionScore}% complete</p>
						</div>
						<p className="item-copy line-clamp-3">{entry.excerpt}</p>
					</li>
				))}
			</ul>
		</Section>
	);

	const detailPanel = (
		<Section title="More">
			<div className="field-grid">
				<TextAreaField
					label="Summary"
					name={`${variant}-summary`}
					value={reflectionDraft.summary}
					onChange={(value) => updateDraft("summary", value)}
					placeholder="The shape of the day..."
					rows={4}
				/>
				<TextAreaField
					label="Tomorrow"
					name={`${variant}-tomorrow`}
					value={reflectionDraft.tomorrowFocus}
					onChange={(value) => updateDraft("tomorrowFocus", value)}
					placeholder="How tomorrow should start..."
					rows={4}
				/>
				<div className="field-grid-2">
					<TextAreaField
						label="Win"
						name={`${variant}-win`}
						value={reflectionDraft.win}
						onChange={(value) => updateDraft("win", value)}
						placeholder="What counted as a win..."
						rows={3}
					/>
					<TextAreaField
						label="Blocker"
						name={`${variant}-blocker`}
						value={reflectionDraft.blocker}
						onChange={(value) => updateDraft("blocker", value)}
						placeholder="What got in the way..."
						rows={3}
					/>
				</div>
			</div>
		</Section>
	);

	return (
		<main id="content" className="site-main">
			<div className={`mx-auto px-4 sm:px-6 ${meta.width}`}>
				<ExperimentHeader
					variant={variant}
					name={meta.name}
					note={meta.note}
					dateLabel={formatDisplayDate(todayKey)}
					status={isAutoSavingReflection ? "Saving..." : visibleStatus}
					metrics={dashboard.metrics}
				/>
				{renderVariantLayout(variant, {
					composePanel,
					scorePanel,
					promptPanel,
					goalPanel,
					contextPanel,
					recentPanel,
					detailPanel,
				})}
			</div>
		</main>
	);
}

function renderVariantLayout(
	variant: VariantId,
	blocks: {
		composePanel: ReactNode;
		scorePanel: ReactNode;
		promptPanel: ReactNode;
		goalPanel: ReactNode;
		contextPanel: ReactNode;
		recentPanel: ReactNode;
		detailPanel: ReactNode;
	},
) {
	switch (variant) {
		case 11:
			return (
				<div className="space-y-4">
					<div className="grid gap-4 xl:grid-cols-[minmax(0,1.65fr)_340px]">
						<div className="space-y-4">
							{blocks.composePanel}
							{blocks.detailPanel}
						</div>
						<div className="space-y-4">
							{blocks.contextPanel}
							{blocks.scorePanel}
							{blocks.promptPanel}
						</div>
					</div>
					<div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
						{blocks.goalPanel}
						{blocks.recentPanel}
					</div>
				</div>
			);
		case 12:
			return (
				<div className="space-y-4">
					{blocks.promptPanel}
					<div className="grid gap-4 xl:grid-cols-[320px_minmax(0,1fr)]">
						<div className="space-y-4">
							{blocks.contextPanel}
							{blocks.scorePanel}
							{blocks.recentPanel}
						</div>
						<div className="space-y-4">
							{blocks.composePanel}
							{blocks.goalPanel}
							{blocks.detailPanel}
						</div>
					</div>
				</div>
			);
		case 13:
			return (
				<div className="space-y-4">
					{blocks.composePanel}
					{blocks.detailPanel}
					<div className="grid gap-4 xl:grid-cols-3">
						{blocks.contextPanel}
						{blocks.promptPanel}
						{blocks.goalPanel}
					</div>
					{blocks.recentPanel}
				</div>
			);
		case 14:
			return (
				<div className="space-y-4">
					<StepSection step="01" title="Direction">
						{blocks.goalPanel}
					</StepSection>
					<StepSection step="02" title="Write">
						{blocks.composePanel}
					</StepSection>
					<StepSection step="03" title="Track">
						<div className="grid gap-4 xl:grid-cols-[300px_minmax(0,1fr)]">
							{blocks.scorePanel}
							{blocks.detailPanel}
						</div>
					</StepSection>
					<StepSection step="04" title="Support">
						<div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]">
							{blocks.contextPanel}
							{blocks.promptPanel}
							{blocks.recentPanel}
						</div>
					</StepSection>
				</div>
			);
		case 15:
			return (
				<div className="grid gap-4 xl:grid-cols-[280px_minmax(0,1.3fr)_320px]">
					<div className="space-y-4">
						{blocks.contextPanel}
						{blocks.recentPanel}
					</div>
					<div className="space-y-4">
						{blocks.composePanel}
						{blocks.detailPanel}
					</div>
					<div className="space-y-4">
						{blocks.scorePanel}
						{blocks.goalPanel}
						{blocks.promptPanel}
					</div>
				</div>
			);
	}
}

function ExperimentState({
	title,
	message,
}: {
	title?: string;
	message: string;
}) {
	return (
		<main id="content" className="site-main">
			<div className="page-wrap">
				<section className="section-shell">
					{title ? <h1 className="page-title">{title}</h1> : null}
					<p className={title ? "page-subtitle" : "status-text"}>{message}</p>
				</section>
			</div>
		</main>
	);
}

function ExperimentHeader({
	variant,
	name,
	note,
	dateLabel,
	status,
	metrics,
}: {
	variant: VariantId;
	name: string;
	note: string;
	dateLabel: string;
	status: string;
	metrics: {
		streak: number;
		reflectionCount: number;
		averageMood: number | null;
		averageEnergy: number | null;
		averageProgress: number | null;
	};
}) {
	return (
		<header className="mb-4 space-y-4 border-b border-[var(--border)] pb-4">
			<div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
				<div className="space-y-3">
					<RouteSwitcher active={variant} />
					<div>
						<h1 className="page-title">Reflection</h1>
						<p className="page-subtitle">
							{name} / {note}
						</p>
					</div>
				</div>
				<div className="space-y-2 text-sm text-[var(--text-muted)] xl:text-right">
					<p>{dateLabel}</p>
					<p>{status}</p>
				</div>
			</div>
			<div className="grid gap-3 sm:grid-cols-4">
				<MetricChip label="Streak" value={`${metrics.streak} days`} />
				<MetricChip label="Mood" value={metricValue(metrics.averageMood)} />
				<MetricChip label="Energy" value={metricValue(metrics.averageEnergy)} />
				<MetricChip
					label="Progress"
					value={metricValue(metrics.averageProgress)}
				/>
			</div>
		</header>
	);
}

function RouteSwitcher({ active }: { active: VariantId }) {
	const items: Array<{ to: string; label: string }> = [
		{ to: "/", label: "/" },
		{ to: "/11", label: "/11" },
		{ to: "/12", label: "/12" },
		{ to: "/13", label: "/13" },
		{ to: "/14", label: "/14" },
		{ to: "/15", label: "/15" },
	];

	return (
		<nav aria-label="Experiments" className="flex flex-wrap gap-4 text-sm">
			{items.map((item) => (
				<Link
					key={item.to}
					to={item.to}
					className={
						item.to === `/${active}`
							? "text-[var(--text)]"
							: "text-[var(--text-muted)] hover:text-[var(--text)]"
					}
				>
					{item.label}
				</Link>
			))}
		</nav>
	);
}

function MetricChip({ label, value }: { label: string; value: string }) {
	return (
		<div className="section-shell section-shell-muted p-4">
			<p className="item-meta">{label}</p>
			<p className="item-title mt-1">{value}</p>
		</div>
	);
}

function StepSection({
	step,
	title,
	children,
}: {
	step: string;
	title: string;
	children: ReactNode;
}) {
	return (
		<section className="section-shell grid gap-4 xl:grid-cols-[72px_minmax(0,1fr)]">
			<div className="item-meta">{step}</div>
			<div className="space-y-4">
				<h2 className="section-title text-base">{title}</h2>
				{children}
			</div>
		</section>
	);
}

function Section({
	title,
	children,
}: {
	title: string;
	children: ReactNode;
}) {
	return (
		<section className="section-shell">
			<div className="section-head">
				<h2 className="section-title">{title}</h2>
			</div>
			{children}
		</section>
	);
}

function ComposePanel({
	primaryGoal,
	reflectionDraft,
	updateDraft,
	insertPrompt,
	primaryPrompt,
	morePrompts,
	errorMessage,
}: {
	primaryGoal: ActiveGoal | null;
	reflectionDraft: ReflectionDraft;
	updateDraft: <K extends keyof ReflectionDraft>(
		key: K,
		value: ReflectionDraft[K],
	) => void;
	insertPrompt: (prompt: string) => void;
	primaryPrompt: string | null;
	morePrompts: string[];
	errorMessage: string | null;
}) {
	return (
		<Section title="Write">
			<div className="field-grid">
				<InputField
					label="Next step"
					name="experiment-intention"
					value={reflectionDraft.intention}
					onChange={(value) => updateDraft("intention", value)}
					placeholder={
						primaryGoal?.nextStep ?? "The smallest step that matters..."
					}
				/>
				{primaryPrompt ? (
					<button
						type="button"
						onClick={() => insertPrompt(primaryPrompt)}
						className="prompt-button"
					>
						{primaryPrompt}
					</button>
				) : null}
				<TextAreaField
					label="Reflection"
					name="experiment-reflection"
					value={reflectionDraft.reflection}
					onChange={(value) => updateDraft("reflection", value)}
					placeholder="What felt true today?"
					rows={12}
					variant="entry"
				/>
				{morePrompts.length > 0 ? (
					<details className="details-shell">
						<summary className="details-summary">More questions</summary>
						<div className="details-panel compact-stack">
							{morePrompts.map((prompt) => (
								<button
									key={prompt}
									type="button"
									onClick={() => insertPrompt(prompt)}
									className="prompt-button"
								>
									{prompt}
								</button>
							))}
						</div>
					</details>
				) : null}
				{errorMessage ? (
					<p className="message message-error" aria-live="polite">
						{errorMessage}
					</p>
				) : null}
			</div>
		</Section>
	);
}

function GoalPanel({
	goals,
	goalDraft,
	setGoalDraft,
	onSubmit,
	onStatusChange,
	goalActionId,
	isSavingGoal,
	errorMessage,
}: {
	goals: ActiveGoal[];
	goalDraft: GoalDraft;
	setGoalDraft: Dispatch<SetStateAction<GoalDraft>>;
	onSubmit: (event: FormEvent<HTMLFormElement>) => void;
	onStatusChange: (goalId: string, status: "paused" | "completed") => void;
	goalActionId: string | null;
	isSavingGoal: boolean;
	errorMessage: string | null;
}) {
	return (
		<Section title="Direction">
			<form className="field-grid" onSubmit={onSubmit}>
				<InputField
					label="Goal"
					name="experiment-goal-title"
					value={goalDraft.title}
					onChange={(value) =>
						setGoalDraft((current) => ({ ...current, title: value }))
					}
					placeholder="What are you aiming at?"
				/>
				<InputField
					label="Next step"
					name="experiment-goal-step"
					value={goalDraft.nextStep}
					onChange={(value) =>
						setGoalDraft((current) => ({ ...current, nextStep: value }))
					}
					placeholder="The next concrete move..."
				/>
				<div>
					<button type="submit" className="button" disabled={isSavingGoal}>
						{isSavingGoal ? "Saving..." : "Add goal"}
					</button>
				</div>
				{errorMessage ? (
					<p className="message message-error">{errorMessage}</p>
				) : null}
			</form>

			<ul className="list-reset rule-list mt-5">
				{goals.length > 0 ? (
					goals.map((goal) => (
						<li key={goal._id} className="simple-row">
							<div className="section-head">
								<div className="min-w-0">
									<p className="item-title">{goal.title}</p>
									<p className="item-meta">
										{goal.horizonLabel}
										{goal.area ? ` / ${goal.area}` : ""}
									</p>
								</div>
								<div className="flex flex-wrap gap-2">
									<button
										type="button"
										className="button-secondary"
										onClick={() => void onStatusChange(goal._id, "paused")}
										disabled={goalActionId === goal._id}
									>
										Pause
									</button>
									<button
										type="button"
										className="button-secondary"
										onClick={() => void onStatusChange(goal._id, "completed")}
										disabled={goalActionId === goal._id}
									>
										Done
									</button>
								</div>
							</div>
							{goal.nextStep ? (
								<p className="item-copy">Next: {goal.nextStep}</p>
							) : null}
						</li>
					))
				) : (
					<li>
						<p className="section-note">
							Set one direction worth pointing today toward.
						</p>
					</li>
				)}
			</ul>
		</Section>
	);
}

function ScoreField({
	label,
	value,
	onChange,
}: {
	label: string;
	value: number;
	onChange: (value: number) => void;
}) {
	return (
		<fieldset className="scale-group">
			<legend className="field-label">{label}</legend>
			<div className="scale-row">
				{[1, 2, 3, 4, 5].map((step) => (
					<button
						key={`${label}-${step}`}
						type="button"
						onClick={() => onChange(step)}
						aria-pressed={value === step}
						className={`scale-button ${value === step ? "is-active" : ""}`}
					>
						{step}
					</button>
				))}
			</div>
		</fieldset>
	);
}

function InputField({
	label,
	name,
	value,
	onChange,
	placeholder,
}: {
	label: string;
	name: string;
	value: string;
	onChange: (value: string) => void;
	placeholder: string;
}) {
	return (
		<div className="field">
			<label className="field-label" htmlFor={name}>
				{label}
			</label>
			<input
				id={name}
				name={name}
				autoComplete="off"
				value={value}
				onChange={(event) => onChange(event.target.value)}
				placeholder={placeholder}
				className="field-input"
			/>
		</div>
	);
}

function TextAreaField({
	label,
	name,
	value,
	onChange,
	placeholder,
	rows,
	variant,
}: {
	label: string;
	name: string;
	value: string;
	onChange: (value: string) => void;
	placeholder: string;
	rows: number;
	variant?: "entry";
}) {
	return (
		<div className="field">
			<label className="field-label" htmlFor={name}>
				{label}
			</label>
			<textarea
				id={name}
				name={name}
				autoComplete="off"
				value={value}
				onChange={(event) => onChange(event.target.value)}
				placeholder={placeholder}
				rows={rows}
				className={`field-textarea ${variant === "entry" ? "is-entry" : ""}`}
			/>
		</div>
	);
}

function metricValue(value: number | null) {
	return value === null ? "n/a" : `${value}/5`;
}

function toReflectionDraft(reflection: ReflectionLike): ReflectionDraft {
	return {
		summary: reflection?.summary ?? "",
		intention: reflection?.intention ?? "",
		reflection: reflection?.reflection ?? "",
		win: reflection?.win ?? "",
		blocker: reflection?.blocker ?? "",
		tomorrowFocus: reflection?.tomorrowFocus ?? "",
		mood: reflection?.mood ?? 3,
		energy: reflection?.energy ?? 3,
		progress: reflection?.progress ?? 3,
	};
}

function reflectionDraftsEqual(left: ReflectionDraft, right: ReflectionDraft) {
	return (
		left.summary === right.summary &&
		left.intention === right.intention &&
		left.reflection === right.reflection &&
		left.win === right.win &&
		left.blocker === right.blocker &&
		left.tomorrowFocus === right.tomorrowFocus &&
		left.mood === right.mood &&
		left.energy === right.energy &&
		left.progress === right.progress
	);
}

function optionalText(value: string) {
	const trimmed = value.trim();
	return trimmed ? trimmed : undefined;
}
