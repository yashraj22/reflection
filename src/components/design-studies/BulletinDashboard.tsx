import { studyActivity, studySeries } from "./mockData";

const DAY_KEYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;

export default function BulletinDashboard() {
	return (
		<div className="space-y-6">
			<section className="grid gap-px overflow-hidden rounded-[28px] border border-black/10 bg-black/10 lg:grid-cols-[1fr_220px]">
				<div className="bg-[#efe7da] px-6 py-6 md:px-8">
					<div className="mb-6 flex items-center justify-between gap-4">
						<div>
							<p className="text-sm text-black/50">Dashboard</p>
							<h1
								className="mt-2 text-4xl tracking-[-0.05em]"
								style={{ fontFamily: '"Fraunces", serif' }}
							>
								Patterns over time
							</h1>
						</div>
					</div>
					<div className="grid gap-3">
						{studySeries.map((point) => (
							<div
								key={point.id}
								className="grid grid-cols-[44px_1fr_1fr_1fr] gap-3 text-sm"
							>
								<span className="text-black/52">{point.label}</span>
								<BulletBar value={point.mood} color="#8a4631" />
								<BulletBar value={point.energy} color="#2f675f" />
								<BulletBar value={point.progress} color="#18120e" />
							</div>
						))}
					</div>
				</div>
				<div className="bg-[#c88c3c] px-5 py-6 text-[#17120e]">
					<p className="text-sm text-current/70">Streak</p>
					<p className="mt-2 text-5xl font-semibold tracking-[-0.05em]">18</p>
				</div>
			</section>

			<section className="rounded-[28px] bg-[#17120e] px-6 py-6 text-[#f8f3ea] md:px-8">
				<div className="mb-5 flex items-center justify-between gap-4">
					<h2
						className="text-3xl tracking-[-0.05em]"
						style={{ fontFamily: '"Fraunces", serif' }}
					>
						Activity
					</h2>
					<p className="text-sm text-white/58">12 weeks</p>
				</div>
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
								className="h-3.5 w-3.5 rounded-[3px]"
								style={{
									backgroundColor:
										value === 0
											? "#2a221c"
											: value === 1
												? "#6f3929"
												: value === 2
													? "#9c4e37"
													: value === 3
														? "#c66b49"
														: "#e49d72",
								}}
							/>
						)),
					)}
				</div>
			</section>
		</div>
	);
}

function BulletBar({ value, color }: { value: number; color: string }) {
	return (
		<div className="h-5 rounded-[3px] bg-white/60">
			<div
				className="h-full rounded-[3px]"
				style={{ width: `${(value / 5) * 100}%`, backgroundColor: color }}
			/>
		</div>
	);
}
