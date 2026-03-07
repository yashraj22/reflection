import { Link } from "@tanstack/react-router";
import {
	studyActivity,
	studyEntries,
	studyGoals,
	studyPrompts,
	studySeries,
} from "./mockData";

const activityDayIds = [
	"sun",
	"mon",
	"tue",
	"wed",
	"thu",
	"fri",
	"sat",
] as const;

export function DesignSwitcher({
	active,
	dark = false,
}: {
	active: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
	dark?: boolean;
}) {
	const baseClass = dark
		? "text-white/72 hover:text-white"
		: "text-black/55 hover:text-black";
	const activeClass = dark ? "text-white" : "text-black";

	return (
		<nav aria-label="Design studies" className="flex flex-wrap gap-4 text-sm">
			{([1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const).map((item) => (
				<Link
					key={item}
					to={`/${item}`}
					className={item === active ? activeClass : baseClass}
				>
					/{item}
				</Link>
			))}
		</nav>
	);
}

export function SectionLinks({ dark = false }: { dark?: boolean }) {
	const linkClass = dark
		? "text-white/65 hover:text-white"
		: "text-black/55 hover:text-black";

	return (
		<nav aria-label="Pages" className="flex flex-wrap gap-5 text-sm">
			<a href="#today" className={linkClass}>
				Today
			</a>
			<a href="#history" className={linkClass}>
				History
			</a>
			<a href="#dashboard" className={linkClass}>
				Dashboard
			</a>
		</nav>
	);
}

export function MultiLineChart({
	lineColors,
	gridColor,
	labelColor,
}: {
	lineColors: { mood: string; energy: string; progress: string };
	gridColor: string;
	labelColor: string;
}) {
	return (
		<div className="space-y-3">
			<svg
				viewBox="0 0 540 210"
				className="h-52 w-full"
				aria-label="Metrics over time"
			>
				{[0, 1, 2, 3, 4].map((row) => (
					<line
						key={row}
						x1="20"
						y1={24 + row * 38}
						x2="520"
						y2={24 + row * 38}
						stroke={gridColor}
						strokeWidth="1"
					/>
				))}
				{buildChartPath("mood", lineColors.mood)}
				{buildChartPath("energy", lineColors.energy)}
				{buildChartPath("progress", lineColors.progress)}
				{studySeries.map((point, index) => {
					const x = 30 + index * 44;
					return (
						<text
							key={point.id}
							x={x}
							y="200"
							textAnchor="middle"
							fontSize="11"
							fill={labelColor}
						>
							{point.label}
						</text>
					);
				})}
			</svg>
			<div
				className="flex flex-wrap gap-4 text-sm"
				style={{ color: labelColor }}
			>
				<LegendDot color={lineColors.mood} label="Mood" />
				<LegendDot color={lineColors.energy} label="Energy" />
				<LegendDot color={lineColors.progress} label="Progress" />
			</div>
		</div>
	);
}

export function ActivityHeatmap({
	levels,
	cellRadius = 8,
	cellSize = 12,
	gap = 4,
}: {
	levels: [string, string, string, string, string];
	cellRadius?: number;
	cellSize?: number;
	gap?: number;
}) {
	return (
		<div className="space-y-3">
			<div
				role="img"
				aria-label="Reflection activity heatmap"
				className="grid w-fit"
				style={{
					gridTemplateColumns: `repeat(${studyActivity.length}, ${cellSize}px)`,
					gap,
				}}
			>
				{studyActivity.flatMap((column, columnIndex) =>
					column.days.map((value, rowIndex) => (
						<div
							key={`${column.id}-${activityDayIds[rowIndex]}-${value}`}
							className="border"
							style={{
								width: cellSize,
								height: cellSize,
								borderRadius: cellRadius,
								backgroundColor: levels[value],
								borderColor: levels[0],
								gridColumn: columnIndex + 1,
								gridRow: rowIndex + 1,
							}}
						/>
					)),
				)}
			</div>
			<div className="flex items-center gap-2 text-xs text-inherit opacity-70">
				<span>Less</span>
				{levels.slice(1).map((level) => (
					<span
						key={level}
						className="inline-block border"
						style={{
							width: cellSize,
							height: cellSize,
							borderRadius: cellRadius,
							backgroundColor: level,
							borderColor: levels[0],
						}}
					/>
				))}
				<span>More</span>
			</div>
		</div>
	);
}

export function ReflectionList({ className = "" }: { className?: string }) {
	return (
		<ul className={`space-y-4 ${className}`}>
			{studyEntries.map((entry) => (
				<li key={entry.date} className="space-y-2">
					<div className="flex items-start justify-between gap-4">
						<div>
							<p className="text-sm opacity-60">{entry.date}</p>
							<h3 className="text-base font-semibold">{entry.title}</h3>
						</div>
						<p className="text-sm opacity-60">
							{entry.mood}/{entry.energy}/{entry.progress}
						</p>
					</div>
					<p className="text-sm leading-6 opacity-75">{entry.excerpt}</p>
				</li>
			))}
		</ul>
	);
}

export function GoalStack({ className = "" }: { className?: string }) {
	return (
		<div className={`space-y-3 ${className}`}>
			{studyGoals.map((goal) => (
				<div key={goal.title} className="space-y-1">
					<p className="text-sm opacity-60">{goal.horizon}</p>
					<p className="font-semibold">{goal.title}</p>
					<p className="text-sm opacity-75">{goal.nextStep}</p>
				</div>
			))}
		</div>
	);
}

export function PromptStack({
	className = "",
	buttonClassName,
}: {
	className?: string;
	buttonClassName: string;
}) {
	return (
		<div className={`space-y-3 ${className}`}>
			{studyPrompts.map((prompt) => (
				<button key={prompt} type="button" className={buttonClassName}>
					{prompt}
				</button>
			))}
		</div>
	);
}

function buildChartPath(key: "mood" | "energy" | "progress", stroke: string) {
	const d = studySeries
		.map((point, index) => {
			const x = 30 + index * 44;
			const y = 180 - (point[key] - 1) * 38;
			return `${index === 0 ? "M" : "L"} ${x} ${y}`;
		})
		.join(" ");

	return <path d={d} fill="none" stroke={stroke} strokeWidth="3" />;
}

function LegendDot({ color, label }: { color: string; label: string }) {
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
