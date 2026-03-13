import { Link, useRouterState } from "@tanstack/react-router";
import type { CSSProperties, ReactNode } from "react";
import { useState } from "react";
import {
	studyActivity,
	studyEntries,
	studyGoals,
	studyPrompts,
	studySeries,
} from "./mockData";

type FamilyId = 2 | 3 | 4 | 5 | 7 | 8 | 9 | 10;
type PageKey = "today" | "history" | "dashboard";

type FamilyConfig = {
	name: string;
	fontClass: string;
	shell:
		| "paper"
		| "rail"
		| "planner"
		| "board"
		| "ribbon"
		| "archive"
		| "folio"
		| "grid";
	palette: {
		bg: string;
		surface: string;
		surfaceAlt: string;
		border: string;
		text: string;
		muted: string;
		accent: string;
		accentText: string;
		mood: string;
		energy: string;
		progress: string;
		heat: [string, string, string, string, string];
	};
};

type ShellProps = {
	family: FamilyId;
	config: FamilyConfig;
	page: PageKey;
	children: ReactNode;
};

type DraftState = ReturnType<typeof useDraft>;

const FAMILY_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
const PAGE_LABELS: { key: PageKey; label: string }[] = [
	{ key: "today", label: "Today" },
	{ key: "history", label: "History" },
	{ key: "dashboard", label: "Dashboard" },
];

const FAMILY_CONFIG: Record<FamilyId, FamilyConfig> = {
	2: {
		name: "Ledger",
		fontClass: "[font-family:'Public_Sans',ui-sans-serif,sans-serif]",
		shell: "paper",
		palette: {
			bg: "#f3eee6",
			surface: "#fffdf8",
			surfaceAlt: "#f7f1e7",
			border: "#d7cebf",
			text: "#1e1812",
			muted: "#6b6258",
			accent: "#6f5f4b",
			accentText: "#fffdf8",
			mood: "#7a6b59",
			energy: "#a88357",
			progress: "#49625a",
			heat: ["#ece4d7", "#d8c6ad", "#b8a289", "#8e775f", "#5b4a39"],
		},
	},
	3: {
		name: "Night Desk",
		fontClass: "[font-family:'IBM_Plex_Sans',ui-sans-serif,sans-serif]",
		shell: "rail",
		palette: {
			bg: "#111110",
			surface: "#181816",
			surfaceAlt: "#21201d",
			border: "#2c2a26",
			text: "#f1ede7",
			muted: "#9a9287",
			accent: "#d2c1a4",
			accentText: "#131210",
			mood: "#c0b29c",
			energy: "#9d8370",
			progress: "#7f9886",
			heat: ["#1f1d1a", "#37322c", "#5a4f44", "#847360", "#c7b394"],
		},
	},
	4: {
		name: "Day Plan",
		fontClass: "[font-family:'Manrope',ui-sans-serif,sans-serif]",
		shell: "planner",
		palette: {
			bg: "#efebe4",
			surface: "#fbfaf7",
			surfaceAlt: "#f4f0e9",
			border: "#d5cfc4",
			text: "#1d1915",
			muted: "#6d675f",
			accent: "#59634f",
			accentText: "#fbfaf7",
			mood: "#6c6658",
			energy: "#8f7755",
			progress: "#5b6c56",
			heat: ["#e8e2d8", "#d4ccb9", "#b4aa8d", "#8d856c", "#5d6552"],
		},
	},
	5: {
		name: "Board",
		fontClass: "[font-family:'Public_Sans',ui-sans-serif,sans-serif]",
		shell: "board",
		palette: {
			bg: "#f6f4ef",
			surface: "#fcfbf8",
			surfaceAlt: "#f0ece5",
			border: "#d7d0c5",
			text: "#181612",
			muted: "#676159",
			accent: "#75583d",
			accentText: "#fcfbf8",
			mood: "#756659",
			energy: "#a17e53",
			progress: "#4f6158",
			heat: ["#ebe3d6", "#d8c7ab", "#bea381", "#947356", "#63462d"],
		},
	},
	7: {
		name: "Ribbon",
		fontClass: "[font-family:'Manrope',ui-sans-serif,sans-serif]",
		shell: "ribbon",
		palette: {
			bg: "#faf8f3",
			surface: "#fffdfa",
			surfaceAlt: "#f2ede4",
			border: "#d8d0c3",
			text: "#191713",
			muted: "#676058",
			accent: "#615951",
			accentText: "#fffdfa",
			mood: "#74695f",
			energy: "#9c825c",
			progress: "#566961",
			heat: ["#ece5d8", "#d6cab5", "#baa88d", "#8f7f69", "#625545"],
		},
	},
	8: {
		name: "Archive",
		fontClass: "[font-family:'IBM_Plex_Sans',ui-sans-serif,sans-serif]",
		shell: "archive",
		palette: {
			bg: "#ecebe7",
			surface: "#f7f5f0",
			surfaceAlt: "#ece8e0",
			border: "#cfc9bf",
			text: "#161714",
			muted: "#626760",
			accent: "#4d5958",
			accentText: "#f7f5f0",
			mood: "#636761",
			energy: "#8a785d",
			progress: "#50605e",
			heat: ["#e1ddd5", "#c8c4bb", "#a7aaa2", "#7a827d", "#4b5757"],
		},
	},
	9: {
		name: "Folio",
		fontClass: "[font-family:'Public_Sans',ui-sans-serif,sans-serif]",
		shell: "folio",
		palette: {
			bg: "#f5f3ee",
			surface: "#fffdf9",
			surfaceAlt: "#f2eee7",
			border: "#d7d0c6",
			text: "#171512",
			muted: "#666059",
			accent: "#7b6a56",
			accentText: "#fffdf9",
			mood: "#7b6f63",
			energy: "#a4845e",
			progress: "#566a5d",
			heat: ["#eee7dc", "#dacca9", "#bba488", "#90745d", "#665240"],
		},
	},
	10: {
		name: "Grid",
		fontClass: "[font-family:'IBM_Plex_Sans',ui-sans-serif,sans-serif]",
		shell: "grid",
		palette: {
			bg: "#121311",
			surface: "#171916",
			surfaceAlt: "#20231e",
			border: "#2d312a",
			text: "#f0ede7",
			muted: "#9a968d",
			accent: "#b9ac9b",
			accentText: "#151613",
			mood: "#c0b4a5",
			energy: "#aa8a62",
			progress: "#7e9685",
			heat: ["#1e211d", "#363a32", "#5b5d53", "#878174", "#bbb09d"],
		},
	},
};

const AVERAGES = {
	mood: averageScore("mood"),
	energy: averageScore("energy"),
	progress: averageScore("progress"),
};

const STREAK_COUNT = studyActivity
	.flatMap((column) => column.days)
	.reverse()
	.findIndex((value) => value === 0);

const ACTIVE_DAYS =
	studyActivity.flatMap((column) => column.days).filter((value) => value > 0)
		.length;

const WEEK_GROUPS = [
	{ label: "This week", items: studyEntries.slice(0, 2) },
	{ label: "Earlier", items: studyEntries.slice(2) },
] as const;

function averageScore(key: "mood" | "energy" | "progress") {
	const total = studySeries.reduce((sum, point) => sum + point[key], 0);
	return (total / studySeries.length).toFixed(1);
}

function paletteStyle(family: FamilyId) {
	const palette = FAMILY_CONFIG[family].palette;
	return {
		"--study-bg": palette.bg,
		"--study-surface": palette.surface,
		"--study-surface-alt": palette.surfaceAlt,
		"--study-border": palette.border,
		"--study-text": palette.text,
		"--study-muted": palette.muted,
		"--study-accent": palette.accent,
		"--study-accent-text": palette.accentText,
		"--study-mood": palette.mood,
		"--study-energy": palette.energy,
		"--study-progress": palette.progress,
		"--study-heat-0": palette.heat[0],
		"--study-heat-1": palette.heat[1],
		"--study-heat-2": palette.heat[2],
		"--study-heat-3": palette.heat[3],
		"--study-heat-4": palette.heat[4],
	} as CSSProperties;
}

function cx(...classes: Array<string | false | null | undefined>) {
	return classes.filter(Boolean).join(" ");
}

function pagePath(family: FamilyId, page: PageKey) {
	return `/${family}/${page}`;
}

function currentPage(pathname: string): PageKey {
	if (pathname.endsWith("/history")) {
		return "history";
	}
	if (pathname.endsWith("/dashboard")) {
		return "dashboard";
	}
	return "today";
}

function useDraft() {
	const [intention, setIntention] = useState(
		"Finish the part that still feels vague.",
	);
	const [reflection, setReflection] = useState(
		"Momentum came back once the next step was small enough to see clearly.",
	);
	const [summary, setSummary] = useState(
		"Quiet morning. Better focus after noon.",
	);
	const [tomorrow, setTomorrow] = useState("Start with the hard paragraph.");
	const [mood, setMood] = useState(4);
	const [energy, setEnergy] = useState(3);
	const [progress, setProgress] = useState(4);

	function insertPrompt(prompt: string) {
		setReflection((current) =>
			current.trim() ? `${current.trim()}\n\n${prompt}` : `${prompt}\n\n`,
		);
	}

	return {
		intention,
		setIntention,
		reflection,
		setReflection,
		summary,
		setSummary,
		tomorrow,
		setTomorrow,
		mood,
		setMood,
		energy,
		setEnergy,
		progress,
		setProgress,
		insertPrompt,
	};
}

export function StudyShell({
	family,
	children,
}: {
	family: FamilyId;
	children: ReactNode;
}) {
	const pathname = useRouterState({ select: (state) => state.location.pathname });
	const config = FAMILY_CONFIG[family];
	const page = currentPage(pathname);
	const props = {
		family,
		config,
		page,
		children,
	};

	switch (config.shell) {
		case "paper":
			return <PaperShell {...props} />;
		case "rail":
			return <RailShell {...props} />;
		case "planner":
			return <PlannerShell {...props} />;
		case "board":
			return <BoardShell {...props} />;
		case "ribbon":
			return <RibbonShell {...props} />;
		case "archive":
			return <ArchiveShell {...props} />;
		case "folio":
			return <FolioShell {...props} />;
		case "grid":
			return <GridShell {...props} />;
	}
}

export function StudyTodayPage({ family }: { family: FamilyId }) {
	const draft = useDraft();

	switch (family) {
		case 2:
			return <LedgerToday draft={draft} />;
		case 3:
			return <NightDeskToday draft={draft} />;
		case 4:
			return <DayPlanToday draft={draft} />;
		case 5:
			return <BoardToday draft={draft} />;
		case 7:
			return <RibbonToday draft={draft} />;
		case 8:
			return <ArchiveToday draft={draft} />;
		case 9:
			return <FolioToday draft={draft} />;
		case 10:
			return <GridToday draft={draft} />;
	}
}

export function StudyHistoryPage({ family }: { family: FamilyId }) {
	switch (family) {
		case 2:
			return <LedgerHistory />;
		case 3:
			return <NightDeskHistory />;
		case 4:
			return <DayPlanHistory />;
		case 5:
			return <BoardHistory />;
		case 7:
			return <RibbonHistoryPage />;
		case 8:
			return <ArchiveHistoryPage />;
		case 9:
			return <FolioHistoryPage />;
		case 10:
			return <GridHistoryPage />;
	}
}

export function StudyDashboardPage({ family }: { family: FamilyId }) {
	switch (family) {
		case 2:
			return <LedgerDashboard />;
		case 3:
			return <NightDeskDashboard />;
		case 4:
			return <DayPlanDashboard />;
		case 5:
			return <BoardDashboard />;
		case 7:
			return <RibbonDashboardPage />;
		case 8:
			return <ArchiveDashboardPage />;
		case 9:
			return <FolioDashboardPage />;
		case 10:
			return <GridDashboardPage />;
	}
}

function PaperShell({ family, config, page, children }: ShellProps) {
	return (
		<div
			className={cx(
				config.fontClass,
				"min-h-screen bg-[color:var(--study-bg)] text-[color:var(--study-text)]",
			)}
			style={paletteStyle(family)}
		>
			<div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 lg:px-8">
				<div className="border border-[color:var(--study-border)] bg-[color:var(--study-surface)] px-5 py-5 sm:px-7 sm:py-6">
					<div className="flex flex-col gap-4 border-b border-[color:var(--study-border)] pb-5 sm:flex-row sm:items-end sm:justify-between">
						<div className="space-y-3">
							<FamilySwitcher active={family} />
							<div className="space-y-1">
								<h1 className="text-[1.65rem] font-semibold tracking-[-0.04em]">
									Reflection
								</h1>
								<p className="text-sm text-[color:var(--study-muted)]">
									{config.name}
								</p>
							</div>
						</div>
						<PageTabs family={family} current={page} />
					</div>
					<div className="pt-6">{children}</div>
				</div>
			</div>
		</div>
	);
}

function RailShell({ family, config, page, children }: ShellProps) {
	return (
		<div
			className={cx(
				config.fontClass,
				"min-h-screen bg-[color:var(--study-bg)] text-[color:var(--study-text)]",
			)}
			style={paletteStyle(family)}
		>
			<div className="mx-auto grid min-h-screen max-w-[1380px] md:grid-cols-[248px_minmax(0,1fr)]">
				<aside className="border-b border-[color:var(--study-border)] px-5 py-5 md:border-b-0 md:border-r md:px-6 md:py-7">
					<div className="space-y-8">
						<div className="space-y-3">
							<FamilySwitcher active={family} dark />
							<div>
								<h1 className="text-[1.5rem] font-semibold tracking-[-0.04em]">
									Reflection
								</h1>
								<p className="mt-1 text-sm text-[color:var(--study-muted)]">
									{config.name}
								</p>
							</div>
						</div>
						<PageTabs family={family} current={page} vertical dark />
						<div className="space-y-3 border-t border-[color:var(--study-border)] pt-4 text-sm">
							<p className="font-medium">Current goal</p>
							<p className="text-[color:var(--study-muted)]">
								{studyGoals[0].title}
							</p>
							<p className="font-mono text-xs text-[color:var(--study-muted)]">
								Next: {studyGoals[0].nextStep}
							</p>
						</div>
					</div>
				</aside>
				<main className="px-4 py-5 sm:px-6 sm:py-7 lg:px-8">{children}</main>
			</div>
		</div>
	);
}

function PlannerShell({ family, config, page, children }: ShellProps) {
	return (
		<div
			className={cx(
				config.fontClass,
				"min-h-screen bg-[color:var(--study-bg)] text-[color:var(--study-text)]",
			)}
			style={paletteStyle(family)}
		>
			<div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
				<header className="space-y-5 border-b border-[color:var(--study-border)] pb-5">
					<div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
						<div className="space-y-3">
							<FamilySwitcher active={family} />
							<div>
								<h1 className="text-[1.7rem] font-semibold tracking-[-0.04em]">
									Reflection
								</h1>
								<p className="mt-1 text-sm text-[color:var(--study-muted)]">
									{config.name}
								</p>
							</div>
						</div>
						<PageTabs family={family} current={page} />
					</div>
					<div className="grid gap-3 text-sm text-[color:var(--study-muted)] sm:grid-cols-3">
						<MetaLine label="Date" value="March 9" />
						<MetaLine label="Focus" value={studyGoals[0].title} />
						<MetaLine label="State" value="Draft" />
					</div>
				</header>
				<main className="pt-6">{children}</main>
			</div>
		</div>
	);
}

function BoardShell({ family, config, page, children }: ShellProps) {
	return (
		<div
			className={cx(
				config.fontClass,
				"min-h-screen bg-[color:var(--study-bg)] text-[color:var(--study-text)]",
			)}
			style={paletteStyle(family)}
		>
			<div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
				<div className="space-y-5">
					<div className="flex flex-col gap-4 border-b border-[color:var(--study-border)] pb-4 xl:flex-row xl:items-end xl:justify-between">
						<div className="space-y-3">
							<FamilySwitcher active={family} />
							<div>
								<h1 className="text-[1.65rem] font-semibold tracking-[-0.04em]">
									Reflection
								</h1>
								<p className="mt-1 text-sm text-[color:var(--study-muted)]">
									{config.name}
								</p>
							</div>
						</div>
						<PageTabs family={family} current={page} />
					</div>
					<main>{children}</main>
				</div>
			</div>
		</div>
	);
}

function RibbonShell({ family, config, page, children }: ShellProps) {
	return (
		<div
			className={cx(
				config.fontClass,
				"min-h-screen bg-[color:var(--study-bg)] text-[color:var(--study-text)]",
			)}
			style={paletteStyle(family)}
		>
			<header className="border-b border-[color:var(--study-border)] bg-[color:var(--study-surface)]">
				<div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
					<div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-6">
						<FamilySwitcher active={family} />
						<div className="flex items-center gap-3">
							<h1 className="text-[1.45rem] font-semibold tracking-[-0.04em]">
								Reflection
							</h1>
							<span className="text-sm text-[color:var(--study-muted)]">
								{config.name}
							</span>
						</div>
					</div>
					<PageTabs family={family} current={page} />
				</div>
			</header>
			<main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
				{children}
			</main>
		</div>
	);
}

function ArchiveShell({ family, config, page, children }: ShellProps) {
	return (
		<div
			className={cx(
				config.fontClass,
				"min-h-screen bg-[color:var(--study-bg)] text-[color:var(--study-text)]",
			)}
			style={paletteStyle(family)}
		>
			<div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
				<div className="grid gap-6 md:grid-cols-[180px_minmax(0,1fr)]">
					<aside className="space-y-6 border-b border-[color:var(--study-border)] pb-6 md:border-b-0 md:border-r md:pb-0 md:pr-6">
						<div className="space-y-3">
							<FamilySwitcher active={family} />
							<div>
								<h1 className="text-[1.45rem] font-semibold tracking-[-0.04em]">
									Reflection
								</h1>
								<p className="mt-1 text-sm text-[color:var(--study-muted)]">
									{config.name}
								</p>
							</div>
						</div>
						<PageTabs family={family} current={page} vertical />
					</aside>
					<main>{children}</main>
				</div>
			</div>
		</div>
	);
}

function FolioShell({ family, config, page, children }: ShellProps) {
	return (
		<div
			className={cx(
				config.fontClass,
				"min-h-screen bg-[color:var(--study-bg)] text-[color:var(--study-text)]",
			)}
			style={paletteStyle(family)}
		>
			<div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
				<header className="space-y-4 border-b border-[color:var(--study-border)] pb-5">
					<FamilySwitcher active={family} />
					<div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
						<div>
							<h1 className="text-[1.75rem] font-semibold tracking-[-0.05em]">
								Reflection
							</h1>
							<p className="mt-1 text-sm text-[color:var(--study-muted)]">
								{config.name}
							</p>
						</div>
						<PageTabs family={family} current={page} />
					</div>
				</header>
				<main className="pt-6">{children}</main>
			</div>
		</div>
	);
}

function GridShell({ family, config, page, children }: ShellProps) {
	return (
		<div
			className={cx(
				config.fontClass,
				"min-h-screen bg-[color:var(--study-bg)] text-[color:var(--study-text)]",
			)}
			style={paletteStyle(family)}
		>
			<div className="mx-auto max-w-[1440px] px-4 py-4 sm:px-6 lg:px-8">
				<div className="border border-[color:var(--study-border)] bg-[color:var(--study-surface)]">
					<header className="grid gap-4 border-b border-[color:var(--study-border)] px-4 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:px-6">
						<div className="space-y-3">
							<FamilySwitcher active={family} dark />
							<div className="flex flex-wrap items-center gap-3">
								<h1 className="text-[1.45rem] font-semibold tracking-[-0.04em]">
									Reflection
								</h1>
								<span className="font-mono text-xs text-[color:var(--study-muted)]">
									{config.name}
								</span>
							</div>
						</div>
						<PageTabs family={family} current={page} dark />
					</header>
					<main className="px-4 py-5 sm:px-6 sm:py-6">{children}</main>
				</div>
			</div>
		</div>
	);
}

function FamilySwitcher({
	active,
	dark = false,
}: {
	active: FamilyId;
	dark?: boolean;
}) {
	return (
		<nav aria-label="Design studies" className="flex flex-wrap gap-3 text-sm">
			{FAMILY_IDS.map((item) => {
				const isActive = item === active;
				return (
					<Link
						key={item}
						to={`/${item}`}
						className={cx(
							"border-b border-transparent pb-0.5 transition-colors",
							dark
								? "text-[color:var(--study-muted)] hover:text-[color:var(--study-text)]"
								: "text-[color:var(--study-muted)] hover:text-[color:var(--study-text)]",
							isActive && "border-current text-[color:var(--study-text)]",
						)}
					>
						/{item}
					</Link>
				);
			})}
		</nav>
	);
}

function PageTabs({
	family,
	current,
	vertical = false,
	dark = false,
}: {
	family: FamilyId;
	current: PageKey;
	vertical?: boolean;
	dark?: boolean;
}) {
	return (
		<nav
			aria-label="Pages"
			className={cx(
				"flex gap-2",
				vertical ? "flex-col" : "flex-wrap items-center",
			)}
		>
			{PAGE_LABELS.map((item) => {
				const active = item.key === current;
				return (
					<Link
						key={item.key}
						to={pagePath(family, item.key)}
						className={cx(
							"rounded-md border px-3 py-2 text-sm font-medium transition-colors",
							active
								? "border-[color:var(--study-accent)] bg-[color:var(--study-accent)] text-[color:var(--study-accent-text)]"
								: "border-[color:var(--study-border)] bg-[color:var(--study-surface)] text-[color:var(--study-muted)] hover:text-[color:var(--study-text)]",
							dark && !active && "bg-transparent",
						)}
					>
						{item.label}
					</Link>
				);
			})}
		</nav>
	);
}

function MetaLine({ label, value }: { label: string; value: string }) {
	return (
		<div className="space-y-1">
			<p className="text-xs font-medium uppercase tracking-[0.12em] text-[color:var(--study-muted)]">
				{label}
			</p>
			<p className="text-sm text-[color:var(--study-text)]">{value}</p>
		</div>
	);
}

function PageHeading({
	title,
	note,
	trailing,
}: {
	title: string;
	note?: string;
	trailing?: ReactNode;
}) {
	return (
		<div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
			<div>
				<h2 className="text-[1.45rem] font-semibold tracking-[-0.04em]">
					{title}
				</h2>
				{note ? (
					<p className="mt-1 text-sm text-[color:var(--study-muted)]">{note}</p>
				) : null}
			</div>
			{trailing ? <div>{trailing}</div> : null}
		</div>
	);
}

function Panel({
	title,
	children,
	className,
	compact = false,
	action,
}: {
	title?: string;
	children: ReactNode;
	className?: string;
	compact?: boolean;
	action?: ReactNode;
}) {
	return (
		<section
			className={cx(
				"border border-[color:var(--study-border)] bg-[color:var(--study-surface)]",
				compact ? "p-4" : "p-5",
				className,
			)}
		>
			{title ? (
				<div className="mb-4 flex items-start justify-between gap-3">
					<h3 className="text-sm font-semibold text-[color:var(--study-text)]">
						{title}
					</h3>
					{action}
				</div>
			) : null}
			{children}
		</section>
	);
}

function GhostButton({
	children,
	onClick,
	className,
}: {
	children: ReactNode;
	onClick?: () => void;
	className?: string;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={cx(
				"rounded-md border border-[color:var(--study-border)] bg-[color:var(--study-surface-alt)] px-3 py-2 text-left text-sm text-[color:var(--study-text)] transition-colors hover:bg-[color:var(--study-surface)]",
				className,
			)}
		>
			{children}
		</button>
	);
}

function InputRow({
	label,
	value,
	onChange,
	placeholder,
}: {
	label: string;
	value: string;
	onChange: (value: string) => void;
	placeholder: string;
}) {
	return (
		<label className="grid gap-2">
			<span className="text-sm font-medium">{label}</span>
			<input
				value={value}
				onChange={(event) => onChange(event.target.value)}
				placeholder={placeholder}
				className="w-full rounded-md border border-[color:var(--study-border)] bg-[color:var(--study-surface)] px-3 py-2.5 text-sm text-[color:var(--study-text)] placeholder:text-[color:var(--study-muted)]"
			/>
		</label>
	);
}

function TextAreaRow({
	label,
	value,
	onChange,
	placeholder,
	rows,
}: {
	label: string;
	value: string;
	onChange: (value: string) => void;
	placeholder: string;
	rows: number;
}) {
	return (
		<label className="grid gap-2">
			<span className="text-sm font-medium">{label}</span>
			<textarea
				value={value}
				onChange={(event) => onChange(event.target.value)}
				placeholder={placeholder}
				rows={rows}
				className="w-full rounded-md border border-[color:var(--study-border)] bg-[color:var(--study-surface)] px-3 py-3 text-sm leading-6 text-[color:var(--study-text)] placeholder:text-[color:var(--study-muted)]"
			/>
		</label>
	);
}

function ScoreRow({
	mood,
	setMood,
	energy,
	setEnergy,
	progress,
	setProgress,
	vertical = false,
}: {
	mood: number;
	setMood: (value: number) => void;
	energy: number;
	setEnergy: (value: number) => void;
	progress: number;
	setProgress: (value: number) => void;
	vertical?: boolean;
}) {
	return (
		<div
			className={cx(
				"grid gap-3",
				vertical ? "grid-cols-1" : "sm:grid-cols-3",
			)}
		>
			<ScoreControl label="Mood" value={mood} onChange={setMood} />
			<ScoreControl label="Energy" value={energy} onChange={setEnergy} />
			<ScoreControl label="Progress" value={progress} onChange={setProgress} />
		</div>
	);
}

function ScoreControl({
	label,
	value,
	onChange,
}: {
	label: string;
	value: number;
	onChange: (value: number) => void;
}) {
	return (
		<div className="grid gap-2">
			<p className="text-sm font-medium">{label}</p>
			<div className="grid grid-cols-5 gap-1.5">
				{[1, 2, 3, 4, 5].map((step) => (
					<button
						key={step}
						type="button"
						onClick={() => onChange(step)}
						aria-pressed={value === step}
						className={cx(
							"h-9 rounded-md border text-sm font-medium transition-colors",
							value === step
								? "border-[color:var(--study-accent)] bg-[color:var(--study-accent)] text-[color:var(--study-accent-text)]"
								: "border-[color:var(--study-border)] bg-[color:var(--study-surface)] text-[color:var(--study-muted)] hover:text-[color:var(--study-text)]",
						)}
					>
						{step}
					</button>
				))}
			</div>
		</div>
	);
}

function GoalList({ dense = false }: { dense?: boolean }) {
	return (
		<div className="space-y-3">
			{studyGoals.map((goal) => (
				<div
					key={goal.title}
					className={cx(
						"border-t border-[color:var(--study-border)] pt-3 first:border-t-0 first:pt-0",
						dense && "pt-2",
					)}
				>
					<p className="text-sm font-medium">{goal.title}</p>
					<p className="mt-1 text-sm text-[color:var(--study-muted)]">
						{goal.nextStep}
					</p>
				</div>
			))}
		</div>
	);
}

function PromptList({
	onPick,
	compact = false,
	horizontal = false,
}: {
	onPick?: (prompt: string) => void;
	compact?: boolean;
	horizontal?: boolean;
}) {
	return (
		<div
			className={cx(
				"grid gap-2",
				horizontal && "sm:grid-cols-2",
				compact && "gap-1.5",
			)}
		>
			{studyPrompts.map((prompt) => (
				<GhostButton
					key={prompt}
					onClick={onPick ? () => onPick(prompt) : undefined}
					className={compact ? "px-2.5 py-2 text-[13px]" : undefined}
				>
					{prompt}
				</GhostButton>
			))}
		</div>
	);
}

function SimpleEntryList({
	layout = "stack",
}: {
	layout?: "stack" | "rows" | "cards";
}) {
	const className =
		layout === "cards"
			? "grid gap-4 md:grid-cols-2"
			: "grid gap-0";

	return (
		<div className={className}>
			{studyEntries.map((entry) => (
				<article
					key={entry.date}
					className={cx(
						"content-auto",
						layout === "cards"
							? "border border-[color:var(--study-border)] bg-[color:var(--study-surface)] p-5"
							: "border-t border-[color:var(--study-border)] py-4 first:border-t-0 first:pt-0",
					)}
				>
					<div
						className={cx(
							"gap-3",
							layout === "rows"
								? "grid md:grid-cols-[84px_minmax(0,1fr)_112px] md:items-start"
								: "space-y-3",
						)}
					>
						<div className="text-sm text-[color:var(--study-muted)]">
							{entry.date}
						</div>
						<div>
							<h3 className="text-base font-semibold">{entry.title}</h3>
							<p className="mt-2 text-sm leading-6 text-[color:var(--study-muted)]">
								{entry.excerpt}
							</p>
						</div>
						<div className="text-sm text-[color:var(--study-muted)]">
							{entry.mood}/{entry.energy}/{entry.progress}
						</div>
					</div>
				</article>
			))}
		</div>
	);
}

function MetricStrip({
	metrics,
	columns = 3,
}: {
	metrics: { label: string; value: string; note?: string }[];
	columns?: number;
}) {
	return (
		<div
			className={cx(
				"grid gap-3",
				columns === 2 && "sm:grid-cols-2",
				columns === 3 && "sm:grid-cols-3",
			)}
		>
			{metrics.map((metric) => (
				<div
					key={metric.label}
					className="border border-[color:var(--study-border)] bg-[color:var(--study-surface-alt)] p-4"
				>
					<p className="text-sm text-[color:var(--study-muted)]">
						{metric.label}
					</p>
					<p className="mt-1 text-[1.4rem] font-semibold tracking-[-0.04em]">
						{metric.value}
					</p>
					{metric.note ? (
						<p className="mt-1 text-sm text-[color:var(--study-muted)]">
							{metric.note}
						</p>
					) : null}
				</div>
			))}
		</div>
	);
}

function TrendChart() {
	return (
		<div className="space-y-4">
			<svg
				viewBox="0 0 540 210"
				className="h-52 w-full"
				aria-label="Reflection trend chart"
			>
				{[0, 1, 2, 3, 4].map((row) => (
					<line
						key={row}
						x1="20"
						y1={24 + row * 38}
						x2="520"
						y2={24 + row * 38}
						stroke="var(--study-border)"
						strokeWidth="1"
					/>
				))}
				{buildPath("mood", "var(--study-mood)")}
				{buildPath("energy", "var(--study-energy)")}
				{buildPath("progress", "var(--study-progress)")}
				{studySeries.map((point, index) => {
					const x = 30 + index * 44;
					return (
						<text
							key={point.id}
							x={x}
							y="198"
							textAnchor="middle"
							fontSize="11"
							fill="var(--study-muted)"
						>
							{point.label}
						</text>
					);
				})}
			</svg>
			<div className="flex flex-wrap gap-4 text-sm text-[color:var(--study-muted)]">
				<LegendDot label="Mood" color="var(--study-mood)" />
				<LegendDot label="Energy" color="var(--study-energy)" />
				<LegendDot label="Progress" color="var(--study-progress)" />
			</div>
		</div>
	);
}

function buildPath(key: "mood" | "energy" | "progress", stroke: string) {
	const d = studySeries
		.map((point, index) => {
			const x = 30 + index * 44;
			const y = 180 - (point[key] - 1) * 38;
			return `${index === 0 ? "M" : "L"} ${x} ${y}`;
		})
		.join(" ");

	return <path d={d} fill="none" stroke={stroke} strokeWidth="3" />;
}

function LegendDot({ label, color }: { label: string; color: string }) {
	return (
		<span className="inline-flex items-center gap-2">
			<span
				className="inline-block h-2.5 w-2.5 rounded-full"
				style={{ backgroundColor: color }}
			/>
			{label}
		</span>
	);
}

function ActivityGrid({
	compact = false,
}: {
	compact?: boolean;
}) {
	const size = compact ? 10 : 12;
	const gap = compact ? 3 : 4;

	return (
		<div className="space-y-3">
			<div
				role="img"
				aria-label="Reflection activity heatmap"
				className="grid w-fit"
				style={{
					gridTemplateColumns: `repeat(${studyActivity.length}, ${size}px)`,
					gap,
				}}
			>
				{studyActivity.flatMap((column, columnIndex) =>
					column.days.map((value, rowIndex) => (
						<div
							key={`${column.id}-${rowIndex}-${value}`}
							className="border border-[color:var(--study-heat-0)]"
							style={{
								width: size,
								height: size,
								backgroundColor: `var(--study-heat-${value})`,
								gridColumn: columnIndex + 1,
								gridRow: rowIndex + 1,
							}}
						/>
					)),
				)}
			</div>
			<div className="flex items-center gap-2 text-xs text-[color:var(--study-muted)]">
				<span>Less</span>
				{[1, 2, 3, 4].map((value) => (
					<span
						key={value}
						className="inline-block border border-[color:var(--study-heat-0)]"
						style={{
							width: size,
							height: size,
							backgroundColor: `var(--study-heat-${value})`,
						}}
					/>
				))}
				<span>More</span>
			</div>
		</div>
	);
}

function MetricsSummary({
	compact = false,
}: {
	compact?: boolean;
}) {
	return (
		<div className={cx("grid gap-3", compact ? "grid-cols-1" : "sm:grid-cols-3")}>
			<MiniStat label="Mood" value={AVERAGES.mood} />
			<MiniStat label="Energy" value={AVERAGES.energy} />
			<MiniStat label="Progress" value={AVERAGES.progress} />
		</div>
	);
}

function MiniStat({ label, value }: { label: string; value: string }) {
	return (
		<div className="border border-[color:var(--study-border)] bg-[color:var(--study-surface-alt)] px-3 py-3">
			<p className="text-sm text-[color:var(--study-muted)]">{label}</p>
			<p className="mt-1 text-lg font-semibold">{value}</p>
		</div>
	);
}

function LedgerToday({ draft }: { draft: DraftState }) {
	return (
		<div className="space-y-6">
			<PageHeading
				title="Today"
				note="Sequential entry with focused sidebar."
				trailing={<p className="text-sm text-[color:var(--study-muted)]">March 9</p>}
			/>
			<div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
				<div className="space-y-5">
					<Panel title="Anchor" className="bg-[color:var(--study-surface-alt)]">
						<GoalList dense />
					</Panel>
					<Panel title="State" className="bg-[color:var(--study-surface-alt)]">
						<ScoreRow
							mood={draft.mood}
							setMood={draft.setMood}
							energy={draft.energy}
							setEnergy={draft.setEnergy}
							progress={draft.progress}
							setProgress={draft.setProgress}
							vertical
						/>
					</Panel>
					<Panel title="Prompts" className="bg-[color:var(--study-surface-alt)]">
						<PromptList onPick={draft.insertPrompt} compact />
					</Panel>
				</div>
				<div className="space-y-5">
					<InputRow
						label="Next step"
						value={draft.intention}
						onChange={draft.setIntention}
						placeholder="What comes next"
					/>
					<TextAreaRow
						label="Reflection"
						value={draft.reflection}
						onChange={draft.setReflection}
						placeholder="What happened, what it means."
						rows={14}
					/>
					<div className="grid gap-5 md:grid-cols-2">
						<TextAreaRow
							label="Summary"
							value={draft.summary}
							onChange={draft.setSummary}
							placeholder="The day in brief"
							rows={6}
						/>
						<TextAreaRow
							label="Tomorrow"
							value={draft.tomorrow}
							onChange={draft.setTomorrow}
							placeholder="How tomorrow opens"
							rows={6}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

function LedgerHistory() {
	return (
		<div className="space-y-6">
			<PageHeading title="History" note="Chronological record with sidebar insight." />
			<div className="grid gap-6 xl:grid-cols-[240px_minmax(0,1fr)]">
				<div className="space-y-5">
					<Panel title="Insight" className="bg-[color:var(--study-surface-alt)]">
						<MetricsSummary compact />
					</Panel>
					<Panel title="Active" className="bg-[color:var(--study-surface-alt)]">
						<GoalList dense />
					</Panel>
				</div>
				<Panel>
					<SimpleEntryList layout="rows" />
				</Panel>
			</div>
		</div>
	);
}

function LedgerDashboard() {
	return (
		<div className="space-y-6">
			<PageHeading title="Dashboard" note="Trend and context, sequentially." />
			<MetricStrip
				metrics={[
					{ label: "Streak", value: `${STREAK_COUNT < 0 ? 0 : STREAK_COUNT} days` },
					{ label: "Average mood", value: AVERAGES.mood },
					{ label: "Active days", value: `${ACTIVE_DAYS}` },
				]}
			/>
			<div className="grid gap-6 xl:grid-cols-[240px_minmax(0,1fr)]">
				<div className="space-y-5">
					<Panel title="Goals" className="bg-[color:var(--study-surface-alt)]">
						<GoalList dense />
					</Panel>
					<Panel title="Activity" className="bg-[color:var(--study-surface-alt)]">
						<ActivityGrid compact />
					</Panel>
				</div>
				<Panel title="Trend">
					<TrendChart />
				</Panel>
			</div>
		</div>
	);
}

function NightDeskToday({ draft }: { draft: DraftState }) {
	return (
		<div className="space-y-5">
			<PageHeading
				title="Today"
				note="Write. Nothing else matters."
				trailing={
					<p className="font-mono text-xs text-[color:var(--study-muted)]">
						idle
					</p>
				}
			/>
			<div className="grid gap-4 xl:grid-cols-[140px_minmax(0,1fr)]">
				<div className="space-y-3">
					<div className="text-[0.75rem] font-medium text-[color:var(--study-muted)] uppercase tracking-wider">
						<p>Goal</p>
					</div>
					<div className="text-xs text-[color:var(--study-muted)]">
						<GoalList dense />
					</div>
					<div className="text-[0.75rem] font-medium text-[color:var(--study-muted)] uppercase tracking-wider">
						<p>State</p>
					</div>
					<ScoreRow
						mood={draft.mood}
						setMood={draft.setMood}
						energy={draft.energy}
						setEnergy={draft.setEnergy}
						progress={draft.progress}
						setProgress={draft.setProgress}
						vertical
					/>
				</div>
				<div className="space-y-4">
					<InputRow
						label="Command"
						value={draft.intention}
						onChange={draft.setIntention}
						placeholder="The next step"
					/>
					<TextAreaRow
						label="Log"
						value={draft.reflection}
						onChange={draft.setReflection}
						placeholder="Write plainly."
						rows={18}
					/>
					<div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_120px] lg:grid-cols-[minmax(0,1fr)_100px_100px]">
						<TextAreaRow
							label="Summary"
							value={draft.summary}
							onChange={draft.setSummary}
							placeholder="One note"
							rows={4}
						/>
						<TextAreaRow
							label="Tomorrow"
							value={draft.tomorrow}
							onChange={draft.setTomorrow}
							placeholder="Resume here"
							rows={4}
						/>
						<PromptList onPick={draft.insertPrompt} compact />
					</div>
				</div>
			</div>
		</div>
	);
}

function NightDeskHistory() {
	return (
		<div className="space-y-5">
			<PageHeading title="History" note="Quick review, minimal distraction." />
			<div className="space-y-2">
				{studyEntries.map((entry) => (
					<div
						key={entry.date}
						className="grid gap-3 border-t border-[color:var(--study-border)] px-4 py-3 first:border-t-0 first:pt-0 md:grid-cols-[80px_minmax(0,1fr)_80px]"
					>
						<p className="text-xs font-mono text-[color:var(--study-muted)]">
							{entry.date}
						</p>
						<div className="min-w-0">
							<h3 className="truncate text-sm font-semibold">{entry.title}</h3>
							<p className="mt-1 line-clamp-2 text-xs text-[color:var(--study-muted)]">
								{entry.excerpt}
							</p>
						</div>
						<p className="text-xs font-mono text-[color:var(--study-muted)]">
							{entry.mood}/{entry.energy}/{entry.progress}
						</p>
					</div>
				))}
			</div>
			<div className="grid gap-4 md:grid-cols-2 pt-4 border-t border-[color:var(--study-border)]">
				<div>
					<p className="text-xs font-medium text-[color:var(--study-muted)] uppercase tracking-wider">
						Signals
					</p>
					<div className="mt-3">
						<MetricsSummary compact />
					</div>
				</div>
				<div>
					<p className="text-xs font-medium text-[color:var(--study-muted)] uppercase tracking-wider">
						Prompts
					</p>
					<div className="mt-3 space-y-2 text-xs text-[color:var(--study-muted)]">
						{studyPrompts.slice(0, 3).map((prompt) => (
							<p key={prompt}>{prompt}</p>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

function NightDeskDashboard() {
	return (
		<div className="space-y-5">
			<PageHeading title="Dashboard" note="Clean signals, nothing more." />
			<div className="space-y-4">
				<div className="grid gap-3 border border-[color:var(--study-border)] bg-[color:var(--study-surface)] p-4">
					<p className="text-xs font-medium text-[color:var(--study-muted)] uppercase tracking-wider">
						Averages
					</p>
					<MetricStrip
						metrics={[
							{ label: "Mood", value: AVERAGES.mood },
							{ label: "Energy", value: AVERAGES.energy },
							{ label: "Progress", value: AVERAGES.progress },
						]}
					/>
				</div>
				<Panel title="Trend" className="bg-[color:var(--study-surface)]">
					<TrendChart />
				</Panel>
				<Panel title="Activity" className="bg-[color:var(--study-surface)]">
					<ActivityGrid compact />
				</Panel>
			</div>
		</div>
	);
}

function DayPlanToday({ draft }: { draft: DraftState }) {
	return (
		<div className="max-w-2xl space-y-5">
			<PageHeading title="Today" note="One step at a time." />
			<div className="space-y-4">
				<NumberedSection step="01" title="Direction">
					<InputRow
						label="Next step"
						value={draft.intention}
						onChange={draft.setIntention}
						placeholder="The move that matters most"
					/>
				</NumberedSection>
				<NumberedSection step="02" title="Write">
					<TextAreaRow
						label="Reflection"
						value={draft.reflection}
						onChange={draft.setReflection}
						placeholder="Write what happened and why it mattered."
						rows={14}
					/>
				</NumberedSection>
				<NumberedSection step="03" title="Summary">
					<TextAreaRow
						label="What happened"
						value={draft.summary}
						onChange={draft.setSummary}
						placeholder="The day in one paragraph"
						rows={6}
					/>
				</NumberedSection>
				<NumberedSection step="04" title="Tomorrow">
					<TextAreaRow
						label="Start here"
						value={draft.tomorrow}
						onChange={draft.setTomorrow}
						placeholder="The opening move"
						rows={5}
					/>
				</NumberedSection>
				<NumberedSection step="05" title="State">
					<ScoreRow
						mood={draft.mood}
						setMood={draft.setMood}
						energy={draft.energy}
						setEnergy={draft.setEnergy}
						progress={draft.progress}
						setProgress={draft.setProgress}
					/>
				</NumberedSection>
				<NumberedSection step="06" title="Questions">
					<PromptList onPick={draft.insertPrompt} compact />
				</NumberedSection>
			</div>
		</div>
	);
}

function NumberedSection({
	step,
	title,
	children,
}: {
	step: string;
	title: string;
	children: ReactNode;
}) {
	return (
		<section className="grid gap-3 border border-[color:var(--study-border)] bg-[color:var(--study-surface)] p-4 md:grid-cols-[72px_minmax(0,1fr)] md:p-5">
			<div className="text-sm font-semibold text-[color:var(--study-muted)]">
				{step}
			</div>
			<div className="space-y-4">
				<h3 className="text-base font-semibold">{title}</h3>
				{children}
			</div>
		</section>
	);
}

function DayPlanHistory() {
	return (
		<div className="max-w-2xl space-y-6">
			<PageHeading title="History" note="Sequential review by week." />
			<div className="space-y-6">
				{WEEK_GROUPS.map((group) => (
					<div key={group.label} className="space-y-3">
						<h3 className="text-sm font-semibold text-[color:var(--study-muted)] uppercase tracking-wider">
							{group.label}
						</h3>
						<div className="space-y-4">
							{group.items.map((entry) => (
								<div
									key={entry.date}
									className="border-t border-[color:var(--study-border)] pt-4 first:border-t-0 first:pt-0"
								>
									<div className="flex items-baseline justify-between gap-3">
										<h3 className="text-base font-semibold">{entry.title}</h3>
										<p className="text-sm text-[color:var(--study-muted)]">
											{entry.date}
										</p>
									</div>
									<p className="mt-2 text-sm leading-6 text-[color:var(--study-muted)]">
										{entry.excerpt}
									</p>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

function DayPlanDashboard() {
	return (
		<div className="max-w-2xl space-y-6">
			<PageHeading title="Dashboard" note="Week review, step by step." />
			<div className="space-y-4">
				<div className="border border-[color:var(--study-border)] bg-[color:var(--study-surface)] p-4">
					<p className="text-sm font-semibold text-[color:var(--study-muted)] uppercase tracking-wider mb-3">
						Averages
					</p>
					<MetricStrip
						metrics={[
							{ label: "Mood", value: AVERAGES.mood },
							{ label: "Energy", value: AVERAGES.energy },
							{ label: "Progress", value: AVERAGES.progress },
						]}
					/>
				</div>
				<Panel title="Trend">
					<TrendChart />
				</Panel>
				<Panel title="Activity">
					<ActivityGrid />
				</Panel>
				<Panel title="Active goals">
					<GoalList dense />
				</Panel>
			</div>
		</div>
	);
}

function BoardToday({ draft }: { draft: DraftState }) {
	return (
		<div className="space-y-6">
			<PageHeading title="Today" note="Clean cards, breathing room." />
			<div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_240px]">
				<div className="space-y-6">
					<Panel title="Write">
						<div className="space-y-4">
							<InputRow
								label="Next step"
								value={draft.intention}
								onChange={draft.setIntention}
								placeholder="What matters next"
							/>
							<TextAreaRow
								label="Reflection"
								value={draft.reflection}
								onChange={draft.setReflection}
								placeholder="Write the day clearly."
								rows={12}
							/>
						</div>
					</Panel>
					<div className="grid gap-6 md:grid-cols-2">
						<Panel title="Summary">
							<TextAreaRow
								label="What happened"
								value={draft.summary}
								onChange={draft.setSummary}
								placeholder="What mattered"
								rows={6}
							/>
						</Panel>
						<Panel title="Tomorrow">
							<TextAreaRow
								label="Opening move"
								value={draft.tomorrow}
								onChange={draft.setTomorrow}
								placeholder="Where to resume"
								rows={6}
							/>
						</Panel>
					</div>
				</div>
				<div className="space-y-6">
					<Panel title="Goal" className="bg-[color:var(--study-surface-alt)]">
						<div>
							<p className="text-sm font-semibold">{studyGoals[0].title}</p>
							<p className="mt-2 text-xs text-[color:var(--study-muted)]">
								{studyGoals[0].nextStep}
							</p>
						</div>
					</Panel>
					<Panel title="State" className="bg-[color:var(--study-surface-alt)]">
						<ScoreRow
							mood={draft.mood}
							setMood={draft.setMood}
							energy={draft.energy}
							setEnergy={draft.setEnergy}
							progress={draft.progress}
							setProgress={draft.setProgress}
							vertical
						/>
					</Panel>
					<Panel title="Questions" className="bg-[color:var(--study-surface-alt)]">
						<PromptList onPick={draft.insertPrompt} compact />
					</Panel>
				</div>
			</div>
		</div>
	);
}

function BoardHistory() {
	return (
		<div className="space-y-6">
			<PageHeading title="History" note="Card grid with generous spacing." />
			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				<SimpleEntryList layout="cards" />
			</div>
		</div>
	);
}

function BoardDashboard() {
	return (
		<div className="space-y-6">
			<PageHeading
				title="Dashboard"
				note="Three cards: trend, activity, goals."
			/>
			<div className="grid gap-6 xl:grid-cols-3">
				<Panel title="Trend">
					<TrendChart />
				</Panel>
				<Panel title="Activity">
					<ActivityGrid />
				</Panel>
				<Panel title="Goals">
					<GoalList dense />
				</Panel>
			</div>
			<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
				<Panel title="Averages">
					<MetricsSummary compact />
				</Panel>
				<Panel title="Recent">
					<div className="space-y-3">
						{studyEntries.slice(0, 3).map((entry) => (
							<div
								key={entry.date}
								className="border-t border-[color:var(--study-border)] pt-3 first:border-t-0 first:pt-0"
							>
								<p className="text-sm font-medium">{entry.title}</p>
								<p className="mt-1 text-sm text-[color:var(--study-muted)]">
									{entry.date}
								</p>
							</div>
						))}
					</div>
				</Panel>
			</div>
		</div>
	);
}

function RibbonToday({ draft }: { draft: DraftState }) {
	return (
		<div className="space-y-5">
			<PageHeading title="Today" note="Read top to bottom." />
			<div className="border border-[color:var(--study-border)] bg-[color:var(--study-surface)]">
				<RibbonRow label="Goal">
					<p className="text-sm font-semibold">{studyGoals[0].title}</p>
				</RibbonRow>
				<RibbonRow label="Next">
					<InputRow
						label="Direction"
						value={draft.intention}
						onChange={draft.setIntention}
						placeholder="What comes next"
					/>
				</RibbonRow>
				<RibbonRow label="Write">
					<TextAreaRow
						label="Reflection"
						value={draft.reflection}
						onChange={draft.setReflection}
						placeholder="Write the day."
						rows={14}
					/>
				</RibbonRow>
				<RibbonRow label="Summary">
					<TextAreaRow
						label="What happened"
						value={draft.summary}
						onChange={draft.setSummary}
						placeholder="One paragraph"
						rows={5}
					/>
				</RibbonRow>
				<RibbonRow label="Tomorrow">
					<TextAreaRow
						label="Resume here"
						value={draft.tomorrow}
						onChange={draft.setTomorrow}
						placeholder="Opening move"
						rows={4}
					/>
				</RibbonRow>
				<RibbonRow label="State">
					<ScoreRow
						mood={draft.mood}
						setMood={draft.setMood}
						energy={draft.energy}
						setEnergy={draft.setEnergy}
						progress={draft.progress}
						setProgress={draft.setProgress}
					/>
				</RibbonRow>
				<RibbonRow label="Questions">
					<PromptList onPick={draft.insertPrompt} compact />
				</RibbonRow>
			</div>
		</div>
	);
}

function RibbonRow({
	label,
	children,
}: {
	label: string;
	children: ReactNode;
}) {
	return (
		<section className="grid gap-3 border-t border-[color:var(--study-border)] px-4 py-4 first:border-t-0 md:grid-cols-[150px_minmax(0,1fr)] md:px-5">
			<p className="text-sm font-medium text-[color:var(--study-muted)]">{label}</p>
			<div>{children}</div>
		</section>
	);
}

function RibbonHistoryPage() {
	return (
		<div className="space-y-5">
			<PageHeading title="History" note="Sequential flow, one entry per line." />
			<div className="space-y-0 border border-[color:var(--study-border)] bg-[color:var(--study-surface)]">
				{studyEntries.map((entry) => (
					<div
						key={entry.date}
						className="grid gap-3 border-t border-[color:var(--study-border)] px-5 py-4 first:border-t-0 md:grid-cols-[100px_minmax(0,1fr)_100px]"
					>
						<p className="text-sm font-mono text-[color:var(--study-muted)]">{entry.date}</p>
						<div>
							<h3 className="text-base font-semibold">{entry.title}</h3>
							<p className="mt-1 text-sm text-[color:var(--study-muted)] line-clamp-2">
								{entry.excerpt}
							</p>
						</div>
						<p className="text-sm font-mono text-[color:var(--study-muted)]">
							{entry.mood}/{entry.energy}/{entry.progress}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}

function RibbonDashboardPage() {
	return (
		<div className="space-y-5">
			<PageHeading title="Dashboard" note="Three horizontal strips." />
			<div className="space-y-4">
				<RibbonPanel title="Trend">
					<TrendChart />
				</RibbonPanel>
				<RibbonPanel title="Activity">
					<ActivityGrid />
				</RibbonPanel>
				<RibbonPanel title="Averages">
					<MetricsSummary compact />
				</RibbonPanel>
			</div>
		</div>
	);
}

function RibbonPanel({
	title,
	children,
}: {
	title: string;
	children: ReactNode;
}) {
	return (
		<section className="grid gap-3 border border-[color:var(--study-border)] bg-[color:var(--study-surface)] px-4 py-4 md:grid-cols-[150px_minmax(0,1fr)] md:px-5">
			<h3 className="text-sm font-semibold text-[color:var(--study-muted)]">
				{title}
			</h3>
			<div>{children}</div>
		</section>
	);
}

function ArchiveToday({ draft }: { draft: DraftState }) {
	return (
		<div className="space-y-6">
			<PageHeading title="Today" note="Sidebar context, full-width writing." />
			<div className="grid gap-8 xl:grid-cols-[220px_minmax(0,1fr)]">
				<div className="space-y-4">
					<div>
						<p className="text-xs font-medium text-[color:var(--study-muted)] uppercase tracking-wider mb-2">
							Date
						</p>
						<p className="text-sm">March 9</p>
					</div>
					<div>
						<p className="text-xs font-medium text-[color:var(--study-muted)] uppercase tracking-wider mb-2">
							Goal
						</p>
						<p className="text-sm text-[color:var(--study-muted)]">
							{studyGoals[0].title}
						</p>
					</div>
					<Panel title="State" compact className="bg-[color:var(--study-surface-alt)]">
						<ScoreRow
							mood={draft.mood}
							setMood={draft.setMood}
							energy={draft.energy}
							setEnergy={draft.setEnergy}
							progress={draft.progress}
							setProgress={draft.setProgress}
							vertical
						/>
					</Panel>
				</div>
				<div className="max-w-4xl space-y-6">
					<InputRow
						label="Next step"
						value={draft.intention}
						onChange={draft.setIntention}
						placeholder="The one move that matters"
					/>
					<TextAreaRow
						label="Reflection"
						value={draft.reflection}
						onChange={draft.setReflection}
						placeholder="Write clearly and completely."
						rows={16}
					/>
					<div className="grid gap-6 md:grid-cols-2">
						<TextAreaRow
							label="Summary"
							value={draft.summary}
							onChange={draft.setSummary}
							placeholder="What happened"
							rows={6}
						/>
						<TextAreaRow
							label="Tomorrow"
							value={draft.tomorrow}
							onChange={draft.setTomorrow}
							placeholder="Resume here"
							rows={6}
						/>
					</div>
					<div>
						<p className="text-xs font-medium text-[color:var(--study-muted)] uppercase tracking-wider mb-3">
							Questions
						</p>
						<PromptList onPick={draft.insertPrompt} compact />
					</div>
				</div>
			</div>
		</div>
	);
}

function ArchiveHistoryPage() {
	return (
		<div className="space-y-6">
			<PageHeading title="History" note="Organized chronologically by month." />
			<div className="max-w-3xl space-y-8">
				<div>
					<h3 className="text-sm font-semibold text-[color:var(--study-muted)] uppercase tracking-wider mb-6">
						March
					</h3>
					<div className="space-y-6">
						{studyEntries.map((entry) => (
							<div key={entry.date} className="border-t border-[color:var(--study-border)] pt-6 first:border-t-0 first:pt-0">
								<div className="flex items-start justify-between gap-4 mb-2">
									<div>
										<p className="text-xs font-mono text-[color:var(--study-muted)]">
											{entry.date}
										</p>
										<h3 className="mt-2 text-base font-semibold">
											{entry.title}
										</h3>
									</div>
									<p className="text-xs font-mono text-[color:var(--study-muted)] whitespace-nowrap">
										{entry.mood}/{entry.energy}/{entry.progress}
									</p>
								</div>
								<p className="mt-3 max-w-2xl text-sm leading-6 text-[color:var(--study-muted)]">
									{entry.excerpt}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

function ArchiveDashboardPage() {
	return (
		<div className="space-y-6">
			<PageHeading title="Dashboard" note="Activity, averages, then trend." />
			<div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_240px]">
				<Panel title="Activity">
					<ActivityGrid />
				</Panel>
				<div className="space-y-6">
					<Panel title="Averages" className="bg-[color:var(--study-surface-alt)]">
						<MetricsSummary compact />
					</Panel>
					<Panel title="Active days" className="bg-[color:var(--study-surface-alt)]">
						<p className="text-2xl font-semibold tracking-tight">
							{ACTIVE_DAYS}
						</p>
						<p className="mt-2 text-xs text-[color:var(--study-muted)]">
							Days with entries
						</p>
					</Panel>
				</div>
			</div>
			<Panel title="Trend">
				<TrendChart />
			</Panel>
		</div>
	);
}

function FolioToday({ draft }: { draft: DraftState }) {
	return (
		<div className="space-y-8">
			<PageHeading title="Today" note="Gallery layout with generous margins." />
			<div className="grid gap-8 xl:grid-cols-[280px_minmax(0,1fr)]">
				<div className="space-y-6">
					<Panel title="Direction" className="bg-[color:var(--study-surface-alt)]">
						<p className="font-semibold leading-relaxed">{studyGoals[0].title}</p>
						<p className="mt-3 text-sm text-[color:var(--study-muted)] leading-relaxed">
							{studyGoals[0].nextStep}
						</p>
					</Panel>
					<Panel title="State" className="bg-[color:var(--study-surface-alt)]">
						<ScoreRow
							mood={draft.mood}
							setMood={draft.setMood}
							energy={draft.energy}
							setEnergy={draft.setEnergy}
							progress={draft.progress}
							setProgress={draft.setProgress}
							vertical
						/>
					</Panel>
					<Panel title="Tomorrow" className="bg-[color:var(--study-surface-alt)]">
						<TextAreaRow
							label="Resume here"
							value={draft.tomorrow}
							onChange={draft.setTomorrow}
							placeholder="Where the next day begins"
							rows={6}
						/>
					</Panel>
				</div>
				<div className="max-w-3xl space-y-7">
					<InputRow
						label="Next step"
						value={draft.intention}
						onChange={draft.setIntention}
						placeholder="What you're working toward"
					/>
					<TextAreaRow
						label="Reflection"
						value={draft.reflection}
						onChange={draft.setReflection}
						placeholder="Write the entry with care."
						rows={16}
					/>
					<TextAreaRow
						label="Summary"
						value={draft.summary}
						onChange={draft.setSummary}
						placeholder="One full paragraph"
						rows={6}
					/>
					<Panel title="Questions" className="bg-[color:var(--study-surface-alt)]">
						<PromptList onPick={draft.insertPrompt} compact />
					</Panel>
				</div>
			</div>
		</div>
	);
}

function FolioHistoryPage() {
	return (
		<div className="space-y-8">
			<PageHeading title="History" note="Portfolio view with breathing room." />
			<div className="max-w-3xl space-y-8">
				{studyEntries.map((entry) => (
					<div
						key={entry.date}
						className="grid gap-5 border-t border-[color:var(--study-border)] pt-8 first:border-t-0 first:pt-0 md:grid-cols-[100px_minmax(0,1fr)_100px]"
					>
						<p className="text-xs font-mono text-[color:var(--study-muted)] uppercase">
							{entry.date}
						</p>
						<div>
							<h3 className="text-lg font-semibold leading-tight">{entry.title}</h3>
							<p className="mt-3 max-w-2xl text-sm leading-7 text-[color:var(--study-muted)]">
								{entry.excerpt}
							</p>
						</div>
						<p className="text-xs font-mono text-[color:var(--study-muted)]">
							{entry.mood}/{entry.energy}/{entry.progress}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}

function FolioDashboardPage() {
	return (
		<div className="space-y-8">
			<PageHeading title="Dashboard" note="Elegant display of key metrics." />
			<div className="grid gap-8 md:grid-cols-3">
				<div className="border-t-2 border-[color:var(--study-accent)] pt-6">
					<p className="text-xs font-medium text-[color:var(--study-muted)] uppercase tracking-wider">
						Mood
					</p>
					<p className="mt-3 text-3xl font-light tracking-tight">
						{AVERAGES.mood}
					</p>
				</div>
				<div className="border-t-2 border-[color:var(--study-accent)] pt-6">
					<p className="text-xs font-medium text-[color:var(--study-muted)] uppercase tracking-wider">
						Energy
					</p>
					<p className="mt-3 text-3xl font-light tracking-tight">
						{AVERAGES.energy}
					</p>
				</div>
				<div className="border-t-2 border-[color:var(--study-accent)] pt-6">
					<p className="text-xs font-medium text-[color:var(--study-muted)] uppercase tracking-wider">
						Progress
					</p>
					<p className="mt-3 text-3xl font-light tracking-tight">
						{AVERAGES.progress}
					</p>
				</div>
			</div>
			<div className="grid gap-8 xl:grid-cols-[minmax(0,1.5fr)_300px]">
				<Panel title="Trend">
					<TrendChart />
				</Panel>
				<Panel title="Activity">
					<ActivityGrid compact />
				</Panel>
			</div>
		</div>
	);
}

function GridToday({ draft }: { draft: DraftState }) {
	return (
		<div className="space-y-5">
			<PageHeading
				title="Today"
				note="Modular grid with clear boundaries."
				trailing={
					<p className="font-mono text-xs text-[color:var(--study-muted)]">
						12c system
					</p>
				}
			/>
			<div className="grid gap-5 xl:grid-cols-12">
				<Panel title="Write" className="xl:col-span-7">
					<div className="space-y-4">
						<InputRow
							label="Next step"
							value={draft.intention}
							onChange={draft.setIntention}
							placeholder="What matters next"
						/>
						<TextAreaRow
							label="Reflection"
							value={draft.reflection}
							onChange={draft.setReflection}
							placeholder="Write clearly and directly."
							rows={15}
						/>
					</div>
				</Panel>
				<div className="grid gap-5 xl:col-span-5 xl:grid-rows-2">
					<Panel title="State" className="bg-[color:var(--study-surface-alt)]">
						<ScoreRow
							mood={draft.mood}
							setMood={draft.setMood}
							energy={draft.energy}
							setEnergy={draft.setEnergy}
							progress={draft.progress}
							setProgress={draft.setProgress}
							vertical
						/>
					</Panel>
					<Panel title="Context" className="bg-[color:var(--study-surface-alt)]">
						<p className="text-sm mb-2">{studyGoals[0].title}</p>
						<PromptList onPick={draft.insertPrompt} compact />
					</Panel>
				</div>
				<Panel title="Summary" className="xl:col-span-4 bg-[color:var(--study-surface-alt)]">
					<TextAreaRow
						label="What happened"
						value={draft.summary}
						onChange={draft.setSummary}
						placeholder="One paragraph recap"
						rows={7}
					/>
				</Panel>
				<Panel title="Tomorrow" className="xl:col-span-4 bg-[color:var(--study-surface-alt)]">
					<TextAreaRow
						label="Resume here"
						value={draft.tomorrow}
						onChange={draft.setTomorrow}
						placeholder="Opening move"
						rows={7}
					/>
				</Panel>
				<Panel title="Goals" className="xl:col-span-4 bg-[color:var(--study-surface-alt)]">
					<GoalList dense />
				</Panel>
			</div>
		</div>
	);
}

function GridHistoryPage() {
	return (
		<div className="space-y-5">
			<PageHeading title="History" note="Structured table view." />
			<div className="overflow-x-auto border border-[color:var(--study-border)] bg-[color:var(--study-surface)]">
				<div className="grid grid-cols-[80px_minmax(0,1fr)_100px] gap-4 border-b border-[color:var(--study-border)] px-5 py-3 text-xs font-medium uppercase tracking-wider text-[color:var(--study-muted)]">
					<span>Date</span>
					<span>Entry</span>
					<span>Scores</span>
				</div>
				{studyEntries.map((entry) => (
					<div
						key={entry.date}
						className="grid grid-cols-[80px_minmax(0,1fr)_100px] gap-4 border-t border-[color:var(--study-border)] px-5 py-4 first:border-t-0 items-start"
					>
						<p className="text-xs font-mono text-[color:var(--study-muted)]">{entry.date}</p>
						<div>
							<h3 className="font-semibold">{entry.title}</h3>
							<p className="mt-2 text-sm leading-6 text-[color:var(--study-muted)] line-clamp-2">
								{entry.excerpt}
							</p>
						</div>
						<p className="text-xs font-mono text-[color:var(--study-muted)] whitespace-nowrap">
							{entry.mood}/{entry.energy}/{entry.progress}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}

function GridDashboardPage() {
	return (
		<div className="space-y-5">
			<PageHeading
				title="Dashboard"
				note="Compact grid with key metrics and charts."
			/>
			<div className="grid gap-5 xl:grid-cols-12">
				<Panel title="Trend" className="xl:col-span-8">
					<TrendChart />
				</Panel>
				<Panel title="Activity" className="xl:col-span-4">
					<ActivityGrid compact />
				</Panel>
				<Panel title="Averages" className="xl:col-span-3">
					<MetricsSummary compact />
				</Panel>
				<Panel title="Goals" className="xl:col-span-3">
					<GoalList dense />
				</Panel>
				<Panel title="Recent" className="xl:col-span-6">
					<div className="space-y-3">
						{studyEntries.slice(0, 3).map((entry) => (
							<div
								key={entry.date}
								className="grid gap-2 border-t border-[color:var(--study-border)] pt-3 first:border-t-0 first:pt-0 md:grid-cols-[80px_minmax(0,1fr)]"
							>
								<p className="text-xs font-mono text-[color:var(--study-muted)]">
									{entry.date}
								</p>
								<p className="font-medium text-sm">{entry.title}</p>
							</div>
						))}
					</div>
				</Panel>
			</div>
		</div>
	);
}
