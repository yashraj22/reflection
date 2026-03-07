import {
	ActivityHeatmap,
	DesignSwitcher,
	GoalStack,
	MultiLineChart,
	PromptStack,
	ReflectionList,
	SectionLinks,
} from "./shared";

export default function StudyOne() {
	return (
		<div
			className="min-h-screen bg-[#f4eee4] text-[#231c16]"
			style={{
				backgroundImage:
					"linear-gradient(to bottom, rgba(101,82,58,0.06) 1px, transparent 1px)",
				backgroundSize: "100% 34px",
			}}
		>
			<div className="mx-auto max-w-[1380px] px-6 py-8 lg:px-10">
				<header className="mb-8 flex flex-wrap items-start justify-between gap-6 border-b border-black/10 pb-6">
					<div className="space-y-4">
						<DesignSwitcher active={1} />
						<div>
							<h1
								className="text-5xl tracking-[-0.05em] md:text-7xl"
								style={{ fontFamily: '"Fraunces", serif' }}
							>
								Reflection
							</h1>
							<p className="mt-3 max-w-xl text-sm text-black/65">
								One quiet place for direction, writing, and review.
							</p>
						</div>
					</div>
					<SectionLinks />
				</header>

				<div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(360px,0.8fr)]">
					<section
						id="today"
						className="rounded-[18px] border border-black/10 bg-[#fffdf8] p-6 shadow-[0_12px_30px_rgba(34,24,14,0.06)] md:p-8"
					>
						<div className="mb-6 flex flex-wrap items-start justify-between gap-4">
							<div>
								<p className="text-sm text-black/55">Today</p>
								<h2
									className="text-3xl tracking-[-0.04em]"
									style={{ fontFamily: '"Fraunces", serif' }}
								>
									Saturday, March 7
								</h2>
							</div>
							<div className="text-sm text-black/55">Saved 2m ago</div>
						</div>

						<div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_240px]">
							<div className="space-y-5">
								<div className="block space-y-2">
									<span className="text-sm font-medium text-black/70">
										Goal
									</span>
									<div className="rounded-2xl border border-[#d7ccb9] bg-[#fbf6ee] px-4 py-3 text-[15px]">
										Write with more clarity
									</div>
								</div>

								<label className="block space-y-2">
									<span className="text-sm font-medium text-black/70">
										Today's step
									</span>
									<input
										readOnly
										value="Finish one honest page before lunch"
										className="w-full rounded-2xl border border-[#cabca6] bg-transparent px-4 py-3 outline-none"
									/>
								</label>

								<div className="space-y-2">
									<span className="text-sm font-medium text-black/70">
										Write
									</span>
									<div className="rounded-[24px] border border-[#cabca6] bg-[#fffdfa] p-5">
										<textarea
											readOnly
											value={
												"I kept circling the hard part until I named it clearly. Once the next step was concrete, the resistance dropped. The day improved after that."
											}
											className="min-h-[290px] w-full resize-none bg-transparent text-[15px] leading-7 outline-none"
										/>
									</div>
								</div>

								<div className="grid gap-3 sm:grid-cols-3">
									{[
										["Mood", "4"],
										["Energy", "3"],
										["Progress", "4"],
									].map(([label, value]) => (
										<div
											key={label}
											className="rounded-2xl border border-[#d8cdbb] bg-[#fbf7ef] px-4 py-4"
										>
											<p className="text-sm text-black/55">{label}</p>
											<p className="mt-2 text-2xl font-semibold">{value}/5</p>
										</div>
									))}
								</div>
							</div>

							<div className="space-y-5 border-t border-black/10 pt-5 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
								<div className="space-y-3">
									<h3 className="text-sm font-medium text-black/70">Prompt</h3>
									<PromptStack buttonClassName="w-full rounded-2xl border border-[#d8ccb8] bg-[#fbf7ef] px-4 py-3 text-left text-sm leading-6 transition hover:bg-[#f6efdf]" />
								</div>
								<div className="space-y-3">
									<h3 className="text-sm font-medium text-black/70">In view</h3>
									<GoalStack />
								</div>
							</div>
						</div>
					</section>

					<div className="space-y-6">
						<section
							id="history"
							className="rounded-[18px] border border-black/10 bg-[#fffdf8] p-6 shadow-[0_12px_30px_rgba(34,24,14,0.06)]"
						>
							<div className="mb-5 flex items-center justify-between gap-4">
								<h2
									className="text-2xl tracking-[-0.04em]"
									style={{ fontFamily: '"Fraunces", serif' }}
								>
									History
								</h2>
								<p className="text-sm text-black/55">128 entries</p>
							</div>
							<ReflectionList />
						</section>

						<section
							id="dashboard"
							className="rounded-[18px] border border-black/10 bg-[#fffdf8] p-6 shadow-[0_12px_30px_rgba(34,24,14,0.06)]"
						>
							<div className="mb-5 flex items-center justify-between gap-4">
								<h2
									className="text-2xl tracking-[-0.04em]"
									style={{ fontFamily: '"Fraunces", serif' }}
								>
									Dashboard
								</h2>
								<p className="text-sm text-black/55">14 day window</p>
							</div>
							<div className="space-y-6">
								<MultiLineChart
									lineColors={{
										mood: "#7e5f3f",
										energy: "#3b7b63",
										progress: "#b26a4a",
									}}
									gridColor="rgba(35, 28, 22, 0.12)"
									labelColor="rgba(35, 28, 22, 0.58)"
								/>
								<ActivityHeatmap
									levels={[
										"rgba(126, 95, 63, 0.08)",
										"rgba(126, 95, 63, 0.18)",
										"rgba(126, 95, 63, 0.34)",
										"rgba(126, 95, 63, 0.52)",
										"rgba(126, 95, 63, 0.78)",
									]}
									cellRadius={4}
								/>
							</div>
						</section>
					</div>
				</div>
			</div>
		</div>
	);
}
