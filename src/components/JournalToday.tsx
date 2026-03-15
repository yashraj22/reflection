import { convexQuery, useConvexMutation } from "@convex-dev/react-query";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import type { FormEvent } from "react";
import { useEffect, useRef, useState, useTransition } from "react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { formatDisplayDate, getTodayDateKey } from "../lib/date";
import JournalDashboardSkeleton from "./JournalDashboardSkeleton";

type GoalDraft = {
	title: string;
	why: string;
	area: string;
	nextStep: string;
	horizon: "north_star" | "quarter" | "current";
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
	why?: string | null;
	area?: string | null;
	nextStep?: string | null;
	horizon: GoalDraft["horizon"];
	horizonLabel: string;
};

const EMPTY_GOAL: GoalDraft = {
	title: "",
	why: "",
	area: "",
	nextStep: "",
	horizon: "current",
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

const AUTO_SAVE_DELAY_MS = 250;
const SUPPORT_SUMMARY = "Prompts, follow-up, and recent context.";

export default function JournalToday() {
	const todayKey = getTodayDateKey();
	const dashboardQuery = useQuery({
		...convexQuery(api.journal.dashboard, { dateKey: todayKey }),
	});
	const saveReflection = useConvexMutation(api.journal.upsertReflection);
	const createGoal = useConvexMutation(api.journal.createGoal);
	const updateGoal = useConvexMutation(api.journal.updateGoal);
	const setGoalStatus = useConvexMutation(api.journal.setGoalStatus);

	const reflectionRef = useRef<HTMLTextAreaElement>(null);
	const goalTitleRef = useRef<HTMLInputElement>(null);
	const saveRequestRef = useRef(0);
	const pendingSelectionRef = useRef<number | null>(null);

	const [goalDraft, setGoalDraft] = useState(EMPTY_GOAL);
	const [reflectionDraft, setReflectionDraft] = useState(EMPTY_REFLECTION);
	const [savedReflectionDraft, setSavedReflectionDraft] =
		useState(EMPTY_REFLECTION);
	const [isAutoSaving, setAutoSaving] = useState(false);
	const [saveError, setSaveError] = useState<string | null>(null);
	const [lastSavedAt, setLastSavedAt] = useState<number | null>(null);
	const [promptAnnouncement, setPromptAnnouncement] = useState("");
	const [goalError, setGoalError] = useState<string | null>(null);
	const [goalTitleError, setGoalTitleError] = useState<string | null>(null);
	const [isGoalEditorOpen, setGoalEditorOpen] = useState(false);
	const [isSupportOpen, setSupportOpen] = useState(false);
	const [isMorePromptsOpen, setMorePromptsOpen] = useState(false);
	const [editingGoalId, setEditingGoalId] = useState<Id<"goals"> | null>(null);
	const [confirmingGoalId, setConfirmingGoalId] = useState<string | null>(null);
	const [goalAction, setGoalAction] = useState<{
		id: string;
		type: "paused" | "completed";
	} | null>(null);
	const [isSavingGoal, startSavingGoal] = useTransition();

	const todayReflection = dashboardQuery.data?.todayReflection ?? null;
	useEffect(() => {
		const nextDraft = toReflectionDraft(todayReflection);
		setReflectionDraft(nextDraft);
		setSavedReflectionDraft(nextDraft);
		setSaveError(null);
		setLastSavedAt(null);
	}, [todayReflection]);

	useEffect(() => {
		if (pendingSelectionRef.current === null) {
			return;
		}

		const nextSelection = pendingSelectionRef.current;
		pendingSelectionRef.current = null;

		window.requestAnimationFrame(() => {
			const textarea = reflectionRef.current;
			if (!textarea) {
				return;
			}

			textarea.focus();
			textarea.setSelectionRange(nextSelection, nextSelection);
		});
	}, [reflectionDraft.reflection]);

	useEffect(() => {
		if (!promptAnnouncement) {
			return;
		}

		const timeoutId = window.setTimeout(() => setPromptAnnouncement(""), 1400);
		return () => window.clearTimeout(timeoutId);
	}, [promptAnnouncement]);

	const hasGoalDraft = hasGoalInput(goalDraft);
	const hasUnsavedReflection = !reflectionDraftsEqual(
		reflectionDraft,
		savedReflectionDraft,
	);
	const hasUnsavedChanges = hasGoalDraft || hasUnsavedReflection || isAutoSaving;

	useEffect(() => {
		if (!hasUnsavedChanges) {
			return;
		}

		const onBeforeUnload = (event: BeforeUnloadEvent) => {
			event.preventDefault();
			event.returnValue = "";
		};

		window.addEventListener("beforeunload", onBeforeUnload);
		return () => window.removeEventListener("beforeunload", onBeforeUnload);
	}, [hasUnsavedChanges]);

	useEffect(() => {
		if (!hasUnsavedReflection) {
			return;
		}

		const timeoutId = window.setTimeout(() => {
			void saveDraft(reflectionDraft);
		}, AUTO_SAVE_DELAY_MS);

		return () => window.clearTimeout(timeoutId);
	}, [hasUnsavedReflection, reflectionDraft]);
	/* EARLY_RETURNS */
	if (dashboardQuery.isPending) {
		return <JournalDashboardSkeleton />;
	}

	if (dashboardQuery.error || !dashboardQuery.data) {
		return (
			<main id="content" className="site-main">
				<div className="page-wrap">
					<section className="section-shell">
						<h1 className="page-title">Today</h1>
						<p className="page-subtitle">
							{dashboardQuery.error instanceof Error
								? dashboardQuery.error.message
								: "The journal could not load."}
						</p>
					</section>
				</div>
			</main>
		);
	}
	/* DERIVED_VALUES */
	const dashboard = dashboardQuery.data;
	const activeGoals = dashboard.activeGoals as ActiveGoal[];
	const primaryGoal = activeGoals[0] ?? null;
	const secondaryGoalsCount = Math.max(0, activeGoals.length - 1);
	const promptQuestions = dashboard.promptPack.questions;
	const promptPrimary = promptQuestions.slice(0, 2);
	const promptSecondary = promptQuestions.slice(2);
	const contextLines = dashboard.contextLines.slice(0, 3);
	const metrics = dashboard.metrics;

	const saveTone = saveError
		? "error"
		: isAutoSaving
			? "saving"
			: hasUnsavedReflection
				? "pending"
				: lastSavedAt
					? "saved"
					: "idle";
	const saveLabel =
		saveTone === "error"
			? saveError
			: saveTone === "saving"
				? "Saving..."
				: saveTone === "pending"
					? "Changes pending..."
					: saveTone === "saved"
						? "Saved just now"
						: "Autosaves as you write.";
	/* HANDLERS */
	async function saveDraft(draft: ReflectionDraft) {
		const requestId = saveRequestRef.current + 1;
		saveRequestRef.current = requestId;
		setAutoSaving(true);
		setSaveError(null);

		try {
			await saveReflection({
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
			});

			if (saveRequestRef.current !== requestId) {
				return;
			}

			setSavedReflectionDraft(draft);
			setLastSavedAt(Date.now());
		} catch (error) {
			if (saveRequestRef.current !== requestId) {
				return;
			}

			setSaveError(
				error instanceof Error
					? error.message
					: "Reflection save failed. Try again.",
			);
		} finally {
			if (saveRequestRef.current === requestId) {
				setAutoSaving(false);
			}
		}
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

	function insertPrompt(prompt: string) {
		const input = reflectionRef.current;
		const currentValue = reflectionDraft.reflection;
		const start = input?.selectionStart ?? currentValue.length;
		const end = input?.selectionEnd ?? currentValue.length;
		const prefix = currentValue.slice(0, start);
		const suffix = currentValue.slice(end);
		const needsGap = prefix.length > 0 && !prefix.endsWith("\n\n");
		const insertion = `${needsGap ? "\n\n" : ""}${prompt}\n\n`;
		pendingSelectionRef.current = prefix.length + insertion.length;

		setReflectionDraft((current) => ({
			...current,
			reflection: `${prefix}${insertion}${suffix}`,
		}));
		setPromptAnnouncement("Prompt added to reflection.");
	}

	function openGoalEditor() {
		setGoalEditorOpen(true);
		setGoalError(null);
		setGoalTitleError(null);
		window.requestAnimationFrame(() => goalTitleRef.current?.focus());
	}

	async function handleGoalSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (!goalDraft.title.trim()) {
			setGoalTitleError("Enter a goal title.");
			goalTitleRef.current?.focus();
			return;
		}

		setGoalTitleError(null);
		setGoalError(null);
		const payload = {
			title: goalDraft.title.trim(),
			why: optionalText(goalDraft.why),
			area: optionalText(goalDraft.area),
			nextStep: optionalText(goalDraft.nextStep),
			horizon: goalDraft.horizon,
		};

		startSavingGoal(async () => {
			try {
				if (editingGoalId) {
					await updateGoal({ goalId: editingGoalId, ...payload });
				} else {
					await createGoal(payload);
				}
				clearGoalDraft();
			} catch (error) {
				setGoalError(
					error instanceof Error ? error.message : "Goal save failed.",
				);
			}
		});
	}

	function editGoal(goal: ActiveGoal) {
		setGoalEditorOpen(true);
		setConfirmingGoalId(null);
		setGoalError(null);
		setGoalTitleError(null);
		setEditingGoalId(goal._id as Id<"goals">);
		setGoalDraft({
			title: goal.title,
			why: goal.why ?? "",
			area: goal.area ?? "",
			nextStep: goal.nextStep ?? "",
			horizon: goal.horizon,
		});
		window.requestAnimationFrame(() => goalTitleRef.current?.focus());
	}

	async function updateGoalStatus(goalId: string, status: "paused" | "completed") {
		setGoalAction({ id: goalId, type: status });
		setGoalError(null);
		try {
			await setGoalStatus({ goalId: goalId as Id<"goals">, status });
			setConfirmingGoalId(null);
		} catch (error) {
			setGoalError(
				error instanceof Error ? error.message : "Goal update failed.",
			);
		} finally {
			setGoalAction(null);
		}
	}

	function resetGoalEditor() {
		setGoalError(null);
		setGoalTitleError(null);
		setGoalEditorOpen(false);
	}

	function clearGoalDraft() {
		setGoalDraft(EMPTY_GOAL);
		setGoalTitleError(null);
		setGoalError(null);
		setEditingGoalId(null);
		setConfirmingGoalId(null);
		setGoalEditorOpen(false);
	}
	/* RENDER */
	return (
		<main id="content" className="site-main">
			<div className="dashboard-wrap">
				<div className="reflection-shell">
					<section className="section-shell section-shell-reflection reflection-card">
						<div className="reflection-card-head">
							<div className="reflection-card-copy">
								<div className="reflection-card-meta">
									<p className="hero-eyebrow">Northstar journal</p>
									<Link to="/history" className="button-quiet">
										History
									</Link>
								</div>
								<h1 className="page-title page-title-dashboard">
									{formatDisplayDate(todayKey)}
								</h1>
								<p className="page-subtitle page-subtitle-dashboard reflection-subtitle">
									Write the day plainly.
								</p>
							</div>

							<div
								className={`save-status-row reflection-save-row ${saveTone !== "idle" ? `is-${saveTone}` : ""}`}
							>
								<div aria-live="polite">
									<p className="save-status-text">{saveLabel}</p>
								</div>
								{saveError ? (
									<button
										type="button"
										className="button-secondary button-secondary-compact"
										onClick={() => void saveDraft(reflectionDraft)}
									>
										Retry save
									</button>
								) : null}
							</div>
						</div>

						<div className="field-grid reflection-card-body">
							<Field label="Today's step" htmlFor="intention">
								<input
									id="intention"
									name="intention"
									autoComplete="off"
									value={reflectionDraft.intention}
									onChange={(event) =>
										updateDraft("intention", event.target.value)
									}
									placeholder={
										primaryGoal?.nextStep ?? "The smallest step that matters..."
									}
									className="field-input"
								/>
							</Field>

							<Field label="Write" htmlFor="reflection">
								<textarea
									ref={reflectionRef}
									id="reflection"
									name="reflection"
									autoComplete="off"
									value={reflectionDraft.reflection}
									onChange={(event) =>
										updateDraft("reflection", event.target.value)
									}
									placeholder="What felt true today?"
									rows={12}
									className="field-textarea is-entry reflection-entry"
								/>
							</Field>

							<p className="sr-only" aria-live="polite">
								{promptAnnouncement}
							</p>
						</div>
					</section>

					<section className="section-shell section-shell-compact section-shell-muted">
						<div className="section-head">
							<div>
								<p className="section-kicker">Visible Now</p>
								<h2 className="section-title">Direction & State</h2>
								<p className="section-note">
									Keep the next move and current pulse in view while writing.
								</p>
							</div>
						</div>
						<div className="pattern-strip-grid px-2.5 mb-8" aria-label="Recent signals">
							<InlineMetric
								label="Streak"
								value={`${metrics.streak} day${metrics.streak === 1 ? "" : "s"}`}
							/>
							<InlineMetric label="Mood" value={metricValue(metrics.averageMood)} />
							<InlineMetric
								label="Energy"
								value={metricValue(metrics.averageEnergy)}
							/>
							<InlineMetric
								label="Progress"
								value={metricValue(metrics.averageProgress)}
							/>
						</div>
 
						<div className="dashboard-support-grid">
							<section className="support-mini-panel">
								<div className="support-section-copy">
									<p className="section-kicker">State</p>
									<h3 className="section-title">State</h3>
									<p className="section-note">{describePulse(reflectionDraft)}</p>
								</div>
								<div className="meter-grid">
									<ScaleField
										label="Mood"
										name="mood"
										value={reflectionDraft.mood}
										onChange={(value) => updateDraft("mood", value)}
									/>
									<ScaleField
										label="Energy"
										name="energy"
										value={reflectionDraft.energy}
										onChange={(value) => updateDraft("energy", value)}
									/>
									<ScaleField
										label="Progress"
										name="progress"
										value={reflectionDraft.progress}
										onChange={(value) => updateDraft("progress", value)}
									/>
								</div>
							</section>
														<section className="support-mini-panel">
								<div className="section-head">
									<div>
										<p className="section-kicker">Direction</p>
										<h3 className="section-title">Direction</h3>
									</div>
									<button
										type="button"
										onClick={openGoalEditor}
										className="button-secondary button-secondary-compact"
									>
										{primaryGoal ? "Manage Direction" : "Add Direction"}
									</button>
								</div>

								{primaryGoal ? (
									<div className="support-direction-summary">
										<div className="direction-focus-card">
											<p className="goal-preview-kicker">{primaryGoal.horizonLabel}</p>
											<p className="item-title direction-focus-title">
												{primaryGoal.title}
											</p>
											{primaryGoal.nextStep ? (
												<p className="item-copy direction-focus-step">
													Next: {primaryGoal.nextStep}
												</p>
											) : (
												<p className="section-note">
													Add the next concrete step so the writing prompt stays
													specific.
												</p>
											)}
											<div className="direction-summary-row">
												<span>{primaryGoal.area ? primaryGoal.area : "Current Focus"}</span>
												{secondaryGoalsCount > 0 ? (
													<span>
														{secondaryGoalsCount} more active direction
														{secondaryGoalsCount === 1 ? "" : "s"}
													</span>
												) : null}
											</div>
											{primaryGoal.why ? (
												<p className="section-note">{primaryGoal.why}</p>
											) : null}
										</div>
									</div>
								) : (
									<p className="section-note">
										No direction saved yet. Add one when you want the next step
										to stay visible.
									</p>
								)}

								{isGoalEditorOpen ? (
									<div className="stack">
										<p className="section-note">
											Closing keeps this draft. Only discard clears it.
										</p>

										<form className="field-grid" onSubmit={handleGoalSubmit}>
											<div className="field-grid-2">
												<Field label="Goal" htmlFor="goal_title" error={goalTitleError}>
													<input
														ref={goalTitleRef}
														id="goal_title"
														name="goal_title"
														autoComplete="off"
														value={goalDraft.title}
														onChange={(event) => {
															setGoalTitleError(null);
															setGoalDraft((current) => ({
																...current,
																title: event.target.value,
															}));
														}}
														placeholder="What are you aiming at?"
														aria-invalid={Boolean(goalTitleError)}
														className="field-input"
													/>
												</Field>
												<Field label="Next step" htmlFor="goal_next_step">
													<input
														id="goal_next_step"
														name="goal_next_step"
														autoComplete="off"
														value={goalDraft.nextStep}
														onChange={(event) =>
															setGoalDraft((current) => ({
																...current,
																nextStep: event.target.value,
															}))
														}
														placeholder="The next concrete step..."
														className="field-input"
													/>
												</Field>
											</div>

											<details className="details-shell">
												<summary className="details-summary">
													Area, horizon, and why
												</summary>
												<div className="details-panel field-grid">
													<div className="field-grid-2">
														<Field label="Area" htmlFor="goal_area">
															<input
																id="goal_area"
																name="goal_area"
																autoComplete="off"
																value={goalDraft.area}
																onChange={(event) =>
																	setGoalDraft((current) => ({
																		...current,
																		area: event.target.value,
																	}))
																}
																placeholder="Work, health, personal..."
																className="field-input"
															/>
														</Field>
														<Field label="Horizon" htmlFor="goal_horizon">
															<select
																id="goal_horizon"
																name="goal_horizon"
																value={goalDraft.horizon}
																onChange={(event) =>
																	setGoalDraft((current) => ({
																		...current,
																		horizon:
																			event.target.value as GoalDraft["horizon"],
																	}))
																}
																className="field-select"
															>
																<option value="north_star">North Star</option>
																<option value="quarter">This Quarter</option>
																<option value="current">Current Focus</option>
															</select>
														</Field>
													</div>
													<Field label="Why" htmlFor="goal_why">
														<textarea
															id="goal_why"
															name="goal_why"
															autoComplete="off"
															value={goalDraft.why}
															onChange={(event) =>
																setGoalDraft((current) => ({
																	...current,
																	why: event.target.value,
																}))
															}
															placeholder="Why this matters..."
															rows={4}
															className="field-textarea"
														/>
													</Field>
												</div>
											</details>

											{goalError ? (
												<p className="message message-error" aria-live="polite">
													{goalError}
												</p>
											) : null}

										<div className="goal-editor-actions">
											<button
												type="button"
												className="button-secondary"
												onClick={resetGoalEditor}
												>
													Close
												</button>
												{hasGoalDraft || editingGoalId ? (
													<button
														type="button"
														className="button-secondary"
														onClick={clearGoalDraft}
													>
														Discard draft
													</button>
												) : null}
												<button type="submit" className="button" disabled={isSavingGoal}>
												{isSavingGoal
													? "Saving..."
													: editingGoalId
														? "Save changes"
														: "Add Direction"}
											</button>
										</div>
										</form>

										{activeGoals.length > 0 ? (
											<ul className="list-reset rule-list">
												{activeGoals.map((goal) => (
													<li key={goal._id} className="simple-row">
														<div className="section-head">
															<div className="min-w-0">
																<p className="item-title">{goal.title}</p>
																<p className="item-meta">
																	{goal.horizonLabel}
																	{goal.area ? ` / ${goal.area}` : ""}
																</p>
															</div>
															<div className="goal-row-actions">
																<button
																	type="button"
																	className="button-secondary button-secondary-compact"
																	onClick={() => editGoal(goal)}
																	disabled={goalAction?.id === goal._id}
																>
																	Edit
																</button>
																<button
																	type="button"
																	className="button-secondary button-secondary-compact"
																	onClick={() => void updateGoalStatus(goal._id, "paused")}
																	disabled={goalAction?.id === goal._id}
																>
																	{goalAction?.id === goal._id &&
																	goalAction.type === "paused"
																		? "Pausing..."
																		: "Pause"}
																</button>
																<button
																	type="button"
																	className="button-secondary button-secondary-compact"
																	onClick={() =>
																		setConfirmingGoalId((current) =>
																			current === goal._id ? null : goal._id,
																		)
																	}
																	disabled={goalAction?.id === goal._id}
																>
																	Complete
																</button>
															</div>
														</div>
														{goal.nextStep ? (
															<p className="item-copy">Next: {goal.nextStep}</p>
														) : null}
														{goal.why ? <p className="item-copy">{goal.why}</p> : null}
														{confirmingGoalId === goal._id ? (
															<div className="goal-confirm-row">
																<p className="section-note">
																	Complete this goal and move it to history?
																</p>
																<div className="goal-row-actions">
																	<button
																		type="button"
																		className="button-secondary button-secondary-compact"
																		onClick={() => setConfirmingGoalId(null)}
																	>
																		Cancel
																	</button>
																	<button
																		type="button"
																		className="button button-compact"
																		onClick={() =>
																			void updateGoalStatus(goal._id, "completed")
																		}
																		disabled={goalAction?.id === goal._id}
																	>
																		{goalAction?.id === goal._id &&
																		goalAction.type === "completed"
																			? "Completing..."
																			: "Confirm complete"}
																	</button>
																</div>
															</div>
														) : null}
													</li>
												))}
											</ul>
										) : null}
									</div>
								) : null}
							</section>
						</div>
					</section>

					<section className="section-shell section-shell-compact section-shell-muted support-shell">
						<div className="support-head">
							<h2 className="section-title">Support</h2>
							<button
								type="button"
								aria-expanded={isSupportOpen}
								aria-controls="journal-support-panel"
								onClick={() => setSupportOpen((open) => !open)}
								className="button-secondary button-secondary-compact support-toggle"
							>
								{isSupportOpen ? "Hide" : "Open"}
							</button>
						</div>
						<p className="support-summary">{SUPPORT_SUMMARY}</p>

						{isSupportOpen ? (
							<div id="journal-support-panel" className="support-sections">
								<section className="support-section">
									<div className="support-section-copy">
										<p className="section-kicker">Prompts</p>
										<h3 className="section-title">Prompts</h3>
										<p className="section-note">{dashboard.promptPack.headline}</p>
									</div>
									<div className="prompt-inline-grid">
										{promptPrimary.map((prompt) => (
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
									{promptSecondary.length > 0 ? (
										<div className="support-subtoggle">
											<button
												type="button"
												aria-expanded={isMorePromptsOpen}
												onClick={() => setMorePromptsOpen((open) => !open)}
												className="button-secondary button-secondary-compact"
											>
												{isMorePromptsOpen ? "Fewer prompts" : "More prompts"}
											</button>
											{isMorePromptsOpen ? (
												<div className="compact-stack">
													{promptSecondary.map((prompt) => (
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
											) : null}
										</div>
									) : null}
								</section>

								<section className="support-section">
									<div className="support-section-copy">
										<p className="section-kicker">Follow-up</p>
										<h3 className="section-title">Follow-up</h3>
									</div>
									<div className="field-grid-2">
										<Field label="What happened" htmlFor="summary">
											<textarea
												id="summary"
												name="summary"
												autoComplete="off"
												value={reflectionDraft.summary}
												onChange={(event) =>
													updateDraft("summary", event.target.value)
												}
												placeholder="The shape of the day..."
												rows={4}
												className="field-textarea"
											/>
										</Field>
										<Field label="Tomorrow" htmlFor="tomorrowFocus">
											<textarea
												id="tomorrowFocus"
												name="tomorrowFocus"
												autoComplete="off"
												value={reflectionDraft.tomorrowFocus}
												onChange={(event) =>
													updateDraft("tomorrowFocus", event.target.value)
												}
												placeholder="How tomorrow should start..."
												rows={4}
												className="field-textarea"
											/>
										</Field>
									</div>

									<div className="field-grid-2">
										<Field label="Win" htmlFor="win">
											<textarea
												id="win"
												name="win"
												autoComplete="off"
												value={reflectionDraft.win}
												onChange={(event) =>
													updateDraft("win", event.target.value)
												}
												placeholder="What counted as a win..."
												rows={3}
												className="field-textarea"
											/>
										</Field>
										<Field label="Blocker" htmlFor="blocker">
											<textarea
												id="blocker"
												name="blocker"
												autoComplete="off"
												value={reflectionDraft.blocker}
												onChange={(event) =>
													updateDraft("blocker", event.target.value)
												}
												placeholder="What got in the way..."
												rows={3}
												className="field-textarea"
											/>
										</Field>
									</div>
								</section>

								<section className="support-section">
									<div className="support-section-copy">
										<p className="section-kicker">Recent context</p>
										<h3 className="section-title">Recent context</h3>
									</div>
									<div className="support-context-grid">
										<div className="support-mini-panel">
											<p className="section-kicker">Context</p>
											{contextLines.length > 0 ? (
												<div className="context-list">
													{contextLines.map((line) => (
														<p key={line} className="context-line">
															{line}
														</p>
													))}
												</div>
											) : (
												<p className="section-note">
													Write a few days in a row and the shape of the week will
													show up here.
												</p>
											)}
										</div>
									</div>
								</section>
							</div>
						) : null}
					</section>
				</div>
			</div>
		</main>
	);
}

function Field({
	label,
	htmlFor,
	children,
	error,
}: {
	label: string;
	htmlFor: string;
	children: React.ReactNode;
	error?: string | null;
}) {
	return (
		<div className="field">
			<label className="field-label" htmlFor={htmlFor}>
				{label}
			</label>
			{children}
			{error ? <p className="message message-error">{error}</p> : null}
		</div>
	);
}

function InlineMetric({ label, value }: { label: string; value: string }) {
	return (
		<div className="pattern-metric">
			<span className="metric-label">{label}</span>
			<span className="pattern-metric-value">{value}</span>
		</div>
	);
}

function ScaleField({
	label,
	name,
	value,
	onChange,
}: {
	label: string;
	name: string;
	value: number;
	onChange: (value: number) => void;
}) {
	return (
		<fieldset className={`scale-group scale-group-${name}`}>
			<legend className="field-label">{label}</legend>
			<div className="scale-row">
				{[1, 2, 3, 4, 5].map((step) => (
					<button
						key={`${name}-${step}`}
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

function hasGoalInput(goalDraft: GoalDraft) {
	return [goalDraft.title, goalDraft.why, goalDraft.area, goalDraft.nextStep].some(
		(value) => value.trim().length > 0,
	);
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

function metricValue(value?: number | null) {
	return value === undefined || value === null ? "n/a" : `${value}/5`;
}

function optionalText(value: string) {
	const trimmed = value.trim();
	return trimmed ? trimmed : undefined;
}

function describePulse(reflection: ReflectionDraft) {
	const moodText =
		reflection.mood >= 4
			? "steady mood"
			: reflection.mood <= 2
				? "heavy mood"
				: "mixed mood";
	const energyText =
		reflection.energy >= 4
			? "strong energy"
			: reflection.energy <= 2
				? "low energy"
				: "moderate energy";
	const progressText =
		reflection.progress >= 4
			? "clear forward movement"
			: reflection.progress <= 2
				? "a next step that should stay small"
				: "movement that still needs a clearer next step";

	return `${moodText}, ${energyText}, and ${progressText}.`;
}
