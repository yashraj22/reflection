import { studyActivity, studySeries } from "./mockData";

const DAY_KEYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;

export default function PlannerDashboard() {
	return (
		<div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
			<section className="rounded-[18px] border border-black/10 bg-[#faf6ee] p-5">
				<p className="text-sm text-black/48">Metrics</p>
				<div className="mt-5 grid gap-3">
					{studySeries.map((point) => (
						<div
							key={point.id}
							className="grid gap-px overflow-hidden rounded-[10px] border border-black/10 bg-black/10 sm:grid-cols-[44px_1fr_1fr_1fr]"
						>
							<div className="bg-[#e7e2d4] px-3 py-3 text-sm text-black/56">
								{point.label}
							</div>
							<MetricCell value={point.mood} color="#6e5d48" />
							<MetricCell value={point.energy} color="#5f7a68" />
							<MetricCell value={point.progress} color="#b27447" />
						</div>
					))}
				</div>
			</section>

			<section className="rounded-[18px] border border-black/10 bg-[#e7e2d4] p-5">
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
								className="h-3.5 w-3.5 border border-[#d4c8b8]"
								style={{
									backgroundColor:
										value === 0
											? "#f0ebdf"
											: value === 1
												? "#d8ccbc"
												: value === 2
													? "#bba891"
													: value === 3
														? "#8f775b"
														: "#5a4737",
								}}
							/>
						)),
					)}
				</div>
			</section>
		</div>
	);
}

function MetricCell({ value, color }: { value: number; color: string }) {
	return (
		<div className="bg-[#fffdf8] px-3 py-3">
			<div className="h-4 bg-[#e7e2d4]">
				<div
					className="h-full"
					style={{ width: `${(value / 5) * 100}%`, backgroundColor: color }}
				/>
			</div>
		</div>
	);
}
