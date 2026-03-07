import { GoalStack, PromptStack } from "./shared";

export default function StudyOneToday() {
	return (
		<div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_320px]">
			<section className="rounded-[18px] border border-black/10 bg-[#fffdf8] p-6 shadow-[0_12px_30px_rgba(34,24,14,0.06)] md:p-8">
				<div className="mb-6 flex flex-wrap items-start justify-between gap-4">
					<div>
						<p className="text-sm text-black/55">Today</p>
						<h1
							className="text-3xl tracking-[-0.04em]"
							style={{ fontFamily: '"Fraunces", serif' }}
						>
							Saturday, March 7
						</h1>
					</div>
					<div className="text-sm text-black/55">Saved 2m ago</div>
				</div>

				<div className="space-y-5">
					<div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_220px]">
						<div className="space-y-5">
							<div className="block space-y-2">
								<span className="text-sm font-medium text-black/70">Goal</span>
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
						</div>

						<div className="rounded-[22px] border border-[#d7ccb9] bg-[#fbf6ee] p-5">
							<p className="text-sm text-black/55">Context</p>
							<div className="mt-4 space-y-4 text-sm leading-6 text-black/72">
								<p>Clarity has shown up in 3 of the last 5 entries.</p>
								<p>
									Average progress is still below 4, so smaller steps are
									working better.
								</p>
								<p>
									Most recent win: the day felt lighter after the first honest
									page.
								</p>
							</div>
						</div>
					</div>

					<div className="space-y-2">
						<span className="text-sm font-medium text-black/70">Write</span>
						<div className="rounded-[24px] border border-[#cabca6] bg-[#fffdfa] p-5">
							<textarea
								readOnly
								value={
									"I kept circling the hard part until I named it clearly. Once the next step was concrete, the resistance dropped. The day improved after that."
								}
								className="min-h-[360px] w-full resize-none bg-transparent text-[15px] leading-7 outline-none"
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
			</section>

			<div className="space-y-6">
				<section className="rounded-[18px] border border-black/10 bg-[#fffdf8] p-6 shadow-[0_12px_30px_rgba(34,24,14,0.06)]">
					<div className="mb-4 flex items-center justify-between gap-4">
						<h2
							className="text-2xl tracking-[-0.04em]"
							style={{ fontFamily: '"Fraunces", serif' }}
						>
							Prompts
						</h2>
						<p className="text-sm text-black/55">4 ready</p>
					</div>
					<PromptStack buttonClassName="w-full rounded-2xl border border-[#d8ccb8] bg-[#fbf7ef] px-4 py-3 text-left text-sm leading-6 transition hover:bg-[#f6efdf]" />
				</section>

				<section className="rounded-[18px] border border-black/10 bg-[#fffdf8] p-6 shadow-[0_12px_30px_rgba(34,24,14,0.06)]">
					<div className="mb-4 flex items-center justify-between gap-4">
						<h2
							className="text-2xl tracking-[-0.04em]"
							style={{ fontFamily: '"Fraunces", serif' }}
						>
							In View
						</h2>
						<p className="text-sm text-black/55">3 goals</p>
					</div>
					<GoalStack />
				</section>
			</div>
		</div>
	);
}
