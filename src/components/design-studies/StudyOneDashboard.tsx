import { ActivityHeatmap, MultiLineChart } from "./shared";

export default function StudyOneDashboard() {
	return (
		<div className="space-y-6">
			<section className="rounded-[18px] border border-black/10 bg-[#fffdf8] p-6 shadow-[0_12px_30px_rgba(34,24,14,0.06)] md:p-8">
				<div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-black/10 pb-5">
					<div>
						<p className="text-sm text-black/55">Dashboard</p>
						<h1
							className="text-3xl tracking-[-0.04em]"
							style={{ fontFamily: '"Fraunces", serif' }}
						>
							Patterns over time
						</h1>
					</div>
					<p className="text-sm text-black/55">14 day window</p>
				</div>

				<MultiLineChart
					lineColors={{
						mood: "#7e5f3f",
						energy: "#3b7b63",
						progress: "#b26a4a",
					}}
					gridColor="rgba(35, 28, 22, 0.12)"
					labelColor="rgba(35, 28, 22, 0.58)"
				/>
			</section>

			<div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
				<section className="rounded-[18px] border border-black/10 bg-[#fffdf8] p-6 shadow-[0_12px_30px_rgba(34,24,14,0.06)]">
					<div className="space-y-6">
						<div>
							<p className="text-sm text-black/55">Current streak</p>
							<p className="mt-2 text-5xl font-semibold tracking-[-0.05em]">
								18
							</p>
						</div>
						<div className="border-t border-black/10 pt-6">
							<p className="text-sm text-black/55">Average energy</p>
							<p className="mt-2 text-5xl font-semibold tracking-[-0.05em]">
								3.4
							</p>
						</div>
						<div className="border-t border-black/10 pt-6">
							<p className="text-sm text-black/55">Average progress</p>
							<p className="mt-2 text-5xl font-semibold tracking-[-0.05em]">
								3.8
							</p>
						</div>
					</div>
				</section>

				<section className="rounded-[18px] border border-black/10 bg-[#fffdf8] p-6 shadow-[0_12px_30px_rgba(34,24,14,0.06)]">
					<div className="mb-5 flex items-center justify-between gap-4">
						<h2
							className="text-2xl tracking-[-0.04em]"
							style={{ fontFamily: '"Fraunces", serif' }}
						>
							Activity
						</h2>
						<p className="text-sm text-black/55">12 weeks</p>
					</div>
					<ActivityHeatmap
						levels={[
							"rgba(126, 95, 63, 0.08)",
							"rgba(126, 95, 63, 0.18)",
							"rgba(126, 95, 63, 0.34)",
							"rgba(126, 95, 63, 0.52)",
							"rgba(126, 95, 63, 0.78)",
						]}
						cellRadius={4}
						cellSize={13}
					/>
				</section>
			</div>
		</div>
	);
}
