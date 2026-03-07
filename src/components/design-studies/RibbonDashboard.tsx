import { studyActivity, studySeries } from "./mockData";

const DAY_KEYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;

export default function RibbonDashboard() {
	return (
		<div className="space-y-6">
			<section className="rounded-[22px] border border-black/10 bg-white p-6">
				<h1
					className="text-4xl tracking-[-0.05em]"
					style={{ fontFamily: '"Fraunces", serif' }}
				>
					Dashboard
				</h1>
				<div className="mt-6 grid gap-3">
					{studySeries.map((point) => (
						<div
							key={point.id}
							className="grid grid-cols-[44px_1fr_1fr_1fr] gap-3 text-sm"
						>
							<span className="text-black/48">{point.label}</span>
							<RibbonBar value={point.mood} color="#7f5c44" />
							<RibbonBar value={point.energy} color="#6f7c66" />
							<RibbonBar value={point.progress} color="#c38c56" />
						</div>
					))}
				</div>
			</section>
			<section className="rounded-[22px] border border-black/10 bg-[#f6efe4] p-6">
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
											? "#e8ddcd"
											: value === 1
												? "#d2bc9f"
												: value === 2
													? "#b08e68"
													: value === 3
														? "#8d6948"
														: "#5a4331",
								}}
							/>
						)),
					)}
				</div>
			</section>
		</div>
	);
}

function RibbonBar({ value, color }: { value: number; color: string }) {
	return (
		<div className="h-5 rounded-[2px] bg-[#efe4d6]">
			<div
				className="h-full rounded-[2px]"
				style={{ width: `${(value / 5) * 100}%`, backgroundColor: color }}
			/>
		</div>
	);
}
