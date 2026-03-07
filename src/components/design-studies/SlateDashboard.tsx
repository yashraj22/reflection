import { studyActivity, studySeries } from "./mockData";

const DAY_KEYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;

export default function SlateDashboard() {
	return (
		<div className="grid gap-6 2xl:grid-cols-[minmax(0,1fr)_320px]">
			<section className="rounded-[18px] border border-[#2a2d28] bg-[#171916] p-6">
				<p className="text-sm text-[#99a18d]">Metrics</p>
				<div className="mt-5 grid gap-3">
					{studySeries.map((point) => (
						<div
							key={point.id}
							className="grid grid-cols-[44px_1fr_1fr_1fr] gap-3 text-sm"
						>
							<span className="text-[#99a18d]">{point.label}</span>
							<SlateBar value={point.mood} color="#7a7658" />
							<SlateBar value={point.energy} color="#5b7862" />
							<SlateBar value={point.progress} color="#9b684c" />
						</div>
					))}
				</div>
			</section>
			<section className="rounded-[18px] border border-[#2a2d28] bg-[#171916] p-6">
				<p className="text-sm text-[#99a18d]">Activity</p>
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
											? "#232723"
											: value === 1
												? "#384239"
												: value === 2
													? "#556459"
													: value === 3
														? "#738577"
														: "#b2c3b6",
								}}
							/>
						)),
					)}
				</div>
			</section>
		</div>
	);
}

function SlateBar({ value, color }: { value: number; color: string }) {
	return (
		<div className="h-5 rounded-[2px] bg-[#232723]">
			<div
				className="h-full rounded-[2px]"
				style={{ width: `${(value / 5) * 100}%`, backgroundColor: color }}
			/>
		</div>
	);
}
