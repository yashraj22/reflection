import { convexQuery, useConvexMutation } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState, useTransition } from "react";
import { api } from "../../convex/_generated/api";
import { formatDisplayDate, getTodayDateKey } from "../lib/date";

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

const AUTO_SAVE_DELAY_MS = 700;

export default function JournalDashboard() {
	const todayKey = getTodayDateKey();
	const dashboardQuery = useQuery({
		...convexQuery(api.journal.dashboard, { dateKey: todayKey }),
	});
	const todayReflection = dashboardQuery.data?.todayReflection ?? null;
	const saveReflection = useConvexMutation(api.journal.upsertReflection);
	const createGoal = useConvexMutation(api.journal.createGoal);
	const setGoalStatus = useConvexMutation(api.journal.setGoalStatus);

	const saveRequestRef = useRef(0);
	const goalTitleRef = useRef<HTMLInputElement>(null);
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
	const [goalTitleError, setGoalTitleError] = useState<string | null>(null);
	const [isGoalEditorOpen, setGoalEditorOpen] = useState(false);
	const [isAutoSavingReflection, setAutoSavingReflection] = useState(false);
	const [goalActionId, setGoalActionId] = useState<string | null>(null);
	const [isSavingGoal, startSavingGoal] = useTransition();

	useEffect(() => {
		const nextDraft = toReflectionDraft(todayReflection);
		setReflectionDraft(nextDraft);
		setSavedReflectionDraft(nextDraft);
		setReflectionErrorMessage(null);
		setStatusMessage(`Loaded ${formatDisplayDate(todayKey)}.`);
	}, [todayReflection, todayKey]);

	const hasGoalDraft = hasGoalInput(goalDraft);
	const hasUnsavedReflection = !reflectionDraftsEqual(
		reflectionDraft,
		savedReflectionDraft,
	);
	const hasUnsavedChanges =
		hasGoalDraft || hasUnsavedReflection || isAutoSavingReflection;

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
		return (
			<main id="content" className="site-main">
				<div className="page-wrap">
					<section className="section-shell">
						<p className="status-text">Loading today...</p>
					</section>
				</div>
			</main>
		);
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

	const dashboard = dashboardQuery.data;
	const primaryGoal = dashboard.activeGoals[0] ?? null;
	const additionalGoals = dashboard.activeGoals.slice(1);
	const contextLines = dashboard.contextLines.slice(0, 2);
	const primaryPrompt = dashboard.promptPack.questions[0] ?? null;
	const morePrompts = dashboard.promptPack.questions.slice(1);
	const showGoalEditor = isGoalEditorOpen || dashboard.activeGoals.length === 0;
	const visibleStatus = reflectionErrorMessage ?? statusMessage;

	async function handleGoalSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (!goalDraft.title.trim()) {
			setGoalTitleError("Enter a goal title.");
			goalTitleRef.current?.focus();
			return;
		}

		setGoalTitleError(null);
		setGoalErrorMessage(null);

		startSavingGoal(async () => {
			try {
				await createGoal({
					title: goalDraft.title.trim(),
					why: optionalText(goalDraft.why),
					area: optionalText(goalDraft.area),
					nextStep: optionalText(goalDraft.nextStep),
					horizon: goalDraft.horizon,
				});
				setGoalDraft(EMPTY_GOAL);
				setGoalEditorOpen(false);
				setStatusMessage("Goal added.");
			} catch (error) {
				setGoalErrorMessage(
					error instanceof Error ? error.message : "Goal creation failed.",
				);
			}
		});
	}

	async function handleGoalStatusChange(
		goalId: (typeof dashboard.activeGoals)[number]["_id"],
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
			await setGoalStatus({ goalId, status });
			setStatusMessage(
				status === "paused" ? "Goal paused." : "Goal completed.",
			);
		} catch (error) {
			setGoalErrorMessage(
				error instanceof Error ? error.message : "Goal update failed.",
			);
		} finally {
			setGoalActionId(null);
		}
	}

	function insertPrompt(prompt: string) {
		setReflectionDraft((current) => ({
			...current,
			reflection: current.reflection.trim()
				? `${current.reflection.trim()}\n\n${prompt}`
				: `${prompt}\n\n`,
		}));
	}

	return (
		<main id="content" className="site-main">
			<div className="page-wrap">
				<header className="page-header">
					<div>
						<h1 className="page-title">{formatDisplayDate(todayKey)}</h1>
						{primaryGoal ? (
							<p className="page-subtitle">{primaryGoal.title}</p>
						) : null}
					</div>
					<p className="status-text" aria-live="polite">
						{isAutoSavingReflection ? "Saving..." : visibleStatus}
					</p>
				</header>

				{contextLines.length > 0 ? (
					<section className="section-shell section-shell-muted">
						<div className="context-list">
							{contextLines.map((line) => (
								<p key={line} className="context-line">
									{line}
								</p>
							))}
						</div>
					</section>
				) : null}

				<section className="section-shell">
					<div className="stack">
						<div className="section-head">
							<h2 className="section-title">Reflection</h2>
						</div>

						<div className="field-grid">
							<InputField
								label="Today's Step"
								name="intention"
								value={reflectionDraft.intention}
								onChange={(value) =>
									setReflectionDraft((current) => ({
										...current,
										intention: value,
									}))
								}
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
								label="Write"
								name="reflection"
								value={reflectionDraft.reflection}
								onChange={(value) =>
									setReflectionDraft((current) => ({
										...current,
										reflection: value,
									}))
								}
								placeholder="What felt true today?..."
								rows={10}
								variant="entry"
							/>

							<div className="meter-grid">
								<ScaleField
									label="Mood"
									name="mood"
									value={reflectionDraft.mood}
									onChange={(value) =>
										setReflectionDraft((current) => ({
											...current,
											mood: value,
										}))
									}
								/>
								<ScaleField
									label="Energy"
									name="energy"
									value={reflectionDraft.energy}
									onChange={(value) =>
										setReflectionDraft((current) => ({
											...current,
											energy: value,
										}))
									}
								/>
								<ScaleField
									label="Progress"
									name="progress"
									value={reflectionDraft.progress}
									onChange={(value) =>
										setReflectionDraft((current) => ({
											...current,
											progress: value,
										}))
									}
								/>
							</div>

							<details className="details-shell">
								<summary className="details-summary">More</summary>
								<div className="details-panel stack">
									{morePrompts.length > 0 ? (
										<div className="compact-stack">
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
									) : null}

									<div className="field-grid-2">
										<TextAreaField
											label="What Happened"
											name="summary"
											value={reflectionDraft.summary}
											onChange={(value) =>
												setReflectionDraft((current) => ({
													...current,
													summary: value,
												}))
											}
											placeholder="The shape of the day..."
											rows={4}
										/>
										<TextAreaField
											label="Tomorrow"
											name="tomorrow_focus"
											value={reflectionDraft.tomorrowFocus}
											onChange={(value) =>
												setReflectionDraft((current) => ({
													...current,
													tomorrowFocus: value,
												}))
											}
											placeholder="How tomorrow should start..."
											rows={4}
										/>
									</div>

									<div className="field-grid-2">
										<TextAreaField
											label="Win"
											name="win"
											value={reflectionDraft.win}
											onChange={(value) =>
												setReflectionDraft((current) => ({
													...current,
													win: value,
												}))
											}
											placeholder="What counted as a win..."
											rows={3}
										/>
										<TextAreaField
											label="Blocker"
											name="blocker"
											value={reflectionDraft.blocker}
											onChange={(value) =>
												setReflectionDraft((current) => ({
													...current,
													blocker: value,
												}))
											}
											placeholder="What got in the way..."
											rows={3}
										/>
									</div>
								</div>
							</details>

							{reflectionErrorMessage ? (
								<p className="message message-error" aria-live="polite">
									{reflectionErrorMessage}
								</p>
							) : null}
						</div>
					</div>
				</section>

				<section className="section-shell">
					<div className="section-head">
						<h2 className="section-title">Direction</h2>
						<button
							type="button"
							onClick={() => setGoalEditorOpen((open) => !open)}
							className="button-quiet text-sm"
						>
							{showGoalEditor
								? "Close"
								: primaryGoal
									? "Edit Goals"
									: "Add Goal"}
						</button>
					</div>

					{primaryGoal ? (
						<div className="goal-preview">
							<p className="item-title">{primaryGoal.title}</p>
							<p className="item-meta">
								{primaryGoal.horizonLabel}
								{primaryGoal.area ? ` / ${primaryGoal.area}` : ""}
							</p>
							<p className="item-copy">
								{primaryGoal.nextStep
									? `Next: ${primaryGoal.nextStep}`
									: "This goal still needs a concrete next step."}
							</p>
							{additionalGoals.length > 0 ? (
								<p className="item-meta">
									{additionalGoals.length} more active
								</p>
							) : null}
						</div>
					) : (
						<p className="section-note">
							Set one direction worth pointing today toward.
						</p>
					)}

					{showGoalEditor ? (
						<div className="stack">
							<form className="field-grid" onSubmit={handleGoalSubmit}>
								<div className="field-grid-2">
									<InputField
										inputRef={goalTitleRef}
										label="Goal"
										name="goal_title"
										value={goalDraft.title}
										onChange={(value) => {
											setGoalTitleError(null);
											setGoalDraft((current) => ({
												...current,
												title: value,
											}));
										}}
										placeholder="What are you aiming at?..."
										error={goalTitleError}
									/>
									<InputField
										label="Next Step"
										name="goal_next_step"
										value={goalDraft.nextStep}
										onChange={(value) =>
											setGoalDraft((current) => ({
												...current,
												nextStep: value,
											}))
										}
										placeholder="The next concrete step..."
									/>
								</div>

								<details className="details-shell">
									<summary className="details-summary">
										More Goal Fields
									</summary>
									<div className="details-panel field-grid">
										<div className="field-grid-2">
											<InputField
												label="Area"
												name="goal_area"
												value={goalDraft.area}
												onChange={(value) =>
													setGoalDraft((current) => ({
														...current,
														area: value,
													}))
												}
												placeholder="Work, health, personal..."
											/>
											<SelectField
												label="Horizon"
												name="goal_horizon"
												value={goalDraft.horizon}
												onChange={(value) =>
													setGoalDraft((current) => ({
														...current,
														horizon: value as GoalDraft["horizon"],
													}))
												}
												options={[
													["north_star", "North Star"],
													["quarter", "This Quarter"],
													["current", "Current Focus"],
												]}
											/>
										</div>

										<TextAreaField
											label="Why"
											name="goal_why"
											value={goalDraft.why}
											onChange={(value) =>
												setGoalDraft((current) => ({
													...current,
													why: value,
												}))
											}
											placeholder="Why this matters..."
											rows={4}
										/>
									</div>
								</details>

								{goalErrorMessage ? (
									<p className="message message-error" aria-live="polite">
										{goalErrorMessage}
									</p>
								) : null}

								<div>
									<button
										type="submit"
										className="button"
										disabled={isSavingGoal}
									>
										{isSavingGoal ? "Saving..." : "Add Goal"}
									</button>
								</div>
							</form>

							{dashboard.activeGoals.length > 0 ? (
								<ul className="list-reset rule-list">
									{dashboard.activeGoals.map((goal) => (
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
														onClick={() =>
															void handleGoalStatusChange(goal._id, "paused")
														}
														disabled={goalActionId === goal._id}
													>
														Pause Goal
													</button>
													<button
														type="button"
														className="button-secondary"
														onClick={() =>
															void handleGoalStatusChange(goal._id, "completed")
														}
														disabled={goalActionId === goal._id}
													>
														Complete Goal
													</button>
												</div>
											</div>
											{goal.nextStep ? (
												<p className="item-copy">Next: {goal.nextStep}</p>
											) : null}
											{goal.why ? (
												<p className="item-copy">{goal.why}</p>
											) : null}
										</li>
									))}
								</ul>
							) : null}
						</div>
					) : null}
				</section>
			</div>
		</main>
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
	return [
		goalDraft.title,
		goalDraft.why,
		goalDraft.area,
		goalDraft.nextStep,
	].some((value) => value.trim().length > 0);
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
		<fieldset className="scale-group">
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

function InputField({
	label,
	name,
	value,
	onChange,
	placeholder,
	inputRef,
	error,
}: {
	label: string;
	name: string;
	value: string;
	onChange: (value: string) => void;
	placeholder: string;
	inputRef?: React.Ref<HTMLInputElement>;
	error?: string | null;
}) {
	return (
		<div className="field">
			<label className="field-label" htmlFor={name}>
				{label}
			</label>
			<input
				ref={inputRef}
				id={name}
				name={name}
				autoComplete="off"
				value={value}
				onChange={(event) => onChange(event.target.value)}
				placeholder={placeholder}
				aria-invalid={Boolean(error)}
				aria-describedby={error ? `${name}-error` : undefined}
				className="field-input"
			/>
			{error ? (
				<p id={`${name}-error`} className="message message-error">
					{error}
				</p>
			) : null}
		</div>
	);
}

function SelectField({
	label,
	name,
	value,
	onChange,
	options,
}: {
	label: string;
	name: string;
	value: string;
	onChange: (value: string) => void;
	options: [string, string][];
}) {
	return (
		<div className="field">
			<label className="field-label" htmlFor={name}>
				{label}
			</label>
			<select
				id={name}
				name={name}
				autoComplete="off"
				value={value}
				onChange={(event) => onChange(event.target.value)}
				className="field-select"
			>
				{options.map(([optionValue, optionLabel]) => (
					<option key={optionValue} value={optionValue}>
						{optionLabel}
					</option>
				))}
			</select>
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
