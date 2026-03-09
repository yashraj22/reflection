import { studyActivity, studySeries } from "./mockData";

const DAY_KEYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;

export default function NotebookDashboard() {
	return (
		<div className="space-y-8">
			<section className="border border-black/10 bg-[#fffdf8] p-6">
				<p className="text-sm text-black/48">Metrics</p>
				<h1
					className="mt-3 text-5xl tracking-[-0.07em]"
					style={{ fontFamily: '"Instrument Serif", serif' }}
				>
					Dashboard
				</h1>
				<div className="mt-8 grid gap-4">
					<div className="grid grid-cols-[44px_1fr_1fr_1fr] gap-3 text-xs text-black/45">
						<span>Day</span>
						<span>Mood</span>
						<span>Energy</span>
						<span>Progress</span>
					</div>
					{studySeries.map((point) => (
						<div
							key={point.id}
							className="grid grid-cols-[44px_1fr_1fr_1fr] gap-3 text-sm"
						>
							<span className="text-black/48">{point.label}</span>
							<NotebookBar value={point.mood} color="#7a5a3e" />
							<NotebookBar value={point.energy} color="#5d7b66" />
							<NotebookBar value={point.progress} color="#b17246" />
						</div>
					))}
				</div>
			</section>

			<section className="border border-black/10 bg-[#fbf8f2] p-6">
				<div className="flex items-center justify-between gap-4">
					<p className="text-sm text-black/48">Activity</p>
					<p className="text-sm text-black/48">12 weeks</p>
				</div>
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
											? "#ece4d8"
											: value === 1
												? "#d4c3b2"
												: value === 2
													? "#b7987d"
													: value === 3
														? "#8e6b50"
														: "#5c4737",
								}}
							/>
						)),
					)}
				</div>
			</section>
		</div>
	);
}

function NotebookBar({ value, color }: { value: number; color: string }) {
	return (
		<div className="h-4 bg-[#ece4d8]">
			<div
				className="h-full"
				style={{ width: `${(value / 5) * 100}%`, backgroundColor: color }}
			/>
		</div>
	);
}
