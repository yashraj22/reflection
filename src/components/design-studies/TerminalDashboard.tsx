import { studyActivity, studySeries } from "./mockData";

const DAY_KEYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;

export default function TerminalDashboard() {
	return (
		<div className="grid gap-6 2xl:grid-cols-[minmax(0,1fr)_300px]">
			<section className="border border-[#262a22] bg-[#131611] p-5">
				<div
					className="mb-5 flex flex-wrap items-end justify-between gap-4 border-b border-[#262a22] pb-4 text-sm text-[#96a184]"
					style={{ fontFamily: '"IBM Plex Mono", monospace' }}
				>
					<p>graph://metrics</p>
					<p>window::14</p>
				</div>
				<div className="space-y-3">
					{studySeries.map((point) => (
						<div
							key={point.id}
							className="grid grid-cols-[44px_1fr_1fr_1fr] items-center gap-3 text-sm"
						>
							<span className="text-[#96a184]">{point.label}</span>
							<TerminalBar value={point.mood} color="#8a7d56" />
							<TerminalBar value={point.energy} color="#5d8368" />
							<TerminalBar value={point.progress} color="#9c654a" />
						</div>
					))}
				</div>
			</section>

			<section className="border border-[#262a22] bg-[#131611] p-5">
				<p
					className="text-xs uppercase tracking-[0.22em] text-[#96a184]"
					style={{ fontFamily: '"IBM Plex Mono", monospace' }}
				>
					activity
				</p>
				<div
					className="mt-4 grid gap-1"
					style={{
						gridTemplateColumns: `repeat(${studyActivity.length}, 12px)`,
					}}
				>
					{studyActivity.flatMap((column) =>
						column.days.map((value, index) => (
							<div
								key={`${column.id}-${DAY_KEYS[index]}-${value}`}
								className="h-3 w-3 border border-[#262a22]"
								style={{
									backgroundColor:
										value === 0
											? "#131611"
											: value === 1
												? "#243026"
												: value === 2
													? "#3b5540"
													: value === 3
														? "#53775b"
														: "#86aa8c",
								}}
							/>
						)),
					)}
				</div>
			</section>
		</div>
	);
}

function TerminalBar({ value, color }: { value: number; color: string }) {
	return (
		<div className="h-4 border border-[#262a22] bg-[#0f110d]">
			<div
				className="h-full"
				style={{ width: `${(value / 5) * 100}%`, backgroundColor: color }}
			/>
		</div>
	);
}
