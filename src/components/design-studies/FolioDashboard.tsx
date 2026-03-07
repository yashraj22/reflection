import { studyActivity, studySeries } from "./mockData";

const DAY_KEYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;

export default function FolioDashboard() {
	return (
		<div className="space-y-6">
			<section className="rounded-[22px] border border-black/10 bg-white p-6">
				<p className="text-sm text-black/48">Dashboard</p>
				<div className="mt-6 grid gap-3">
					{studySeries.map((point) => (
						<div
							key={point.id}
							className="grid grid-cols-[44px_1fr_1fr_1fr] gap-3 text-sm"
						>
							<span className="text-black/48">{point.label}</span>
							<FolioBar value={point.mood} color="#7a5b3e" />
							<FolioBar value={point.energy} color="#5c7863" />
							<FolioBar value={point.progress} color="#b07348" />
						</div>
					))}
				</div>
			</section>
			<section className="rounded-[22px] border border-black/10 bg-[#f6f0e7] p-6">
				<p className="text-sm text-black/48">Activity</p>
				<div
					className="mt-4 grid gap-1"
					style={{
						gridTemplateColumns: `repeat(${studyActivity.length}, 14px)`,
					}}
				>
					{studyActivity.flatMap((column) =>
						column.days.map((value, index) => (
							<div
								key={`${column.id}-${DAY_KEYS[index]}-${value}`}
								className="h-3.5 w-3.5 rounded-[2px]"
								style={{
									backgroundColor:
										value === 0
											? "#ece2d5"
											: value === 1
												? "#dbc8b3"
												: value === 2
													? "#c1a488"
													: value === 3
														? "#9b7d61"
														: "#5f4a3a",
								}}
							/>
						)),
					)}
				</div>
			</section>
		</div>
	);
}

function FolioBar({ value, color }: { value: number; color: string }) {
	return (
		<div className="h-4 bg-[#eee5d9]">
			<div
				className="h-full"
				style={{ width: `${(value / 5) * 100}%`, backgroundColor: color }}
			/>
		</div>
	);
}
