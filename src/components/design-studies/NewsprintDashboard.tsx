import { studyActivity, studySeries } from "./mockData";

const DAY_KEYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;

export default function NewsprintDashboard() {
	return (
		<div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
			<section className="border border-[#b9ae9f] bg-[#fbf8f2] p-5">
				<div className="mb-5 border-b border-[#d8cdbf] pb-4">
					<p className="text-xs uppercase tracking-[0.28em] text-black/52">
						Review Window
					</p>
					<h1
						className="mt-3 text-5xl tracking-[-0.06em]"
						style={{ fontFamily: '"Fraunces", serif' }}
					>
						Dashboard
					</h1>
				</div>
				<div className="space-y-6">
					<div className="space-y-3">
						<p className="text-sm font-semibold">Mood / Energy / Progress</p>
						<div className="grid gap-2">
							{studySeries.map((point) => (
								<div
									key={point.id}
									className="grid grid-cols-[44px_1fr_1fr_1fr] items-center gap-3 text-sm"
								>
									<span className="text-black/52">{point.label}</span>
									<Bar value={point.mood} color="#7a5a3e" />
									<Bar value={point.energy} color="#567663" />
									<Bar value={point.progress} color="#b46f49" />
								</div>
							))}
						</div>
					</div>

					<div className="space-y-3">
						<p className="text-sm font-semibold">Activity</p>
						<div
							className="grid gap-1"
							style={{
								gridTemplateColumns: `repeat(${studyActivity.length}, 14px)`,
							}}
						>
							{studyActivity.flatMap((column) =>
								column.days.map((value, index) => (
									<div
										key={`${column.id}-${DAY_KEYS[index]}-${value}`}
										className="h-3.5 w-3.5 border border-[#d8cdbf]"
										style={{
											backgroundColor:
												value === 0
													? "#f3ece1"
													: value === 1
														? "#ddd0bd"
														: value === 2
															? "#c7b39b"
															: value === 3
																? "#9a7c5d"
																: "#5b4633",
										}}
									/>
								)),
							)}
						</div>
					</div>
				</div>
			</section>

			<aside className="border border-[#b9ae9f] bg-[#f3ece1] p-5">
				<p className="text-xs uppercase tracking-[0.28em] text-black/52">
					Notes
				</p>
				<div className="mt-4 space-y-4 text-sm leading-6 text-black/66">
					<p>Progress tends to rise when energy is above 3.</p>
					<p>Clarity correlates with better mood and fewer stalled days.</p>
					<p>Recent activity suggests consistency is improving.</p>
				</div>
			</aside>
		</div>
	);
}

function Bar({ value, color }: { value: number; color: string }) {
	return (
		<div className="h-5 border border-[#d8cdbf] bg-[#f3ece1]">
			<div
				className="h-full"
				style={{
					width: `${(value / 5) * 100}%`,
					backgroundColor: color,
				}}
			/>
		</div>
	);
}
