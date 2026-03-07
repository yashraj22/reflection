import { studyActivity, studySeries } from "./mockData";

const DAY_KEYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;

export default function MatrixDashboard() {
	return (
		<div className="grid gap-6 xl:grid-cols-[1fr_300px]">
			<section className="grid gap-px overflow-hidden rounded-[18px] border border-black/10 bg-black/10">
				<div className="grid gap-px bg-black/10 sm:grid-cols-[120px_1fr_1fr_1fr]">
					<div className="bg-[#f3e7da] px-4 py-4 text-xs uppercase tracking-[0.22em] text-black/48">
						Day
					</div>
					<div className="bg-[#f3e7da] px-4 py-4 text-xs uppercase tracking-[0.22em] text-black/48">
						Mood
					</div>
					<div className="bg-[#f3e7da] px-4 py-4 text-xs uppercase tracking-[0.22em] text-black/48">
						Energy
					</div>
					<div className="bg-[#f3e7da] px-4 py-4 text-xs uppercase tracking-[0.22em] text-black/48">
						Progress
					</div>
				</div>
				{studySeries.map((point) => (
					<div
						key={point.id}
						className="grid gap-px bg-black/10 sm:grid-cols-[120px_1fr_1fr_1fr]"
					>
						<div className="bg-white px-4 py-4 text-sm text-black/56">
							{point.label}
						</div>
						<MatrixCell value={point.mood} color="#8a4631" />
						<MatrixCell value={point.energy} color="#517361" />
						<MatrixCell value={point.progress} color="#1a1714" />
					</div>
				))}
			</section>
			<section className="rounded-[18px] border border-black/10 bg-white p-5">
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
											? "#eee6db"
											: value === 1
												? "#d9c7b4"
												: value === 2
													? "#c09e7f"
													: value === 3
														? "#8d6547"
														: "#332621",
								}}
							/>
						)),
					)}
				</div>
			</section>
		</div>
	);
}

function MatrixCell({ value, color }: { value: number; color: string }) {
	return (
		<div className="bg-[#f8f3ea] px-4 py-4">
			<div className="h-4 bg-[#efe6db]">
				<div
					className="h-full"
					style={{ width: `${(value / 5) * 100}%`, backgroundColor: color }}
				/>
			</div>
		</div>
	);
}
