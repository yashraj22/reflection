import { studyGoals, studyPrompts } from "./mockData";

export default function NewsprintToday() {
	return (
		<div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_320px]">
			<section className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_0.9fr]">
				<article className="border border-[#b9ae9f] bg-[#fbf8f2] p-5">
					<p className="text-xs uppercase tracking-[0.28em] text-black/52">
						Lead Entry
					</p>
					<h1
						className="mt-4 text-4xl tracking-[-0.06em]"
						style={{ fontFamily: '"Fraunces", serif' }}
					>
						Saturday, March 7
					</h1>
					<p className="mt-4 text-sm leading-6 text-black/66">
						Direction first. The next step second. The real reflection third.
					</p>

					<div className="mt-6 space-y-5">
						<div>
							<p className="text-sm font-semibold">Goal</p>
							<p className="mt-2 border-y border-[#d8cdbf] py-3">
								Write with more clarity
							</p>
						</div>
						<div>
							<p className="text-sm font-semibold">Today's step</p>
							<p className="mt-2 border-y border-[#d8cdbf] py-3">
								Finish one honest page before lunch
							</p>
						</div>
						<div>
							<p className="text-sm font-semibold">Reflection</p>
							<p className="mt-2 leading-8">
								I needed a smaller starting point. Once the task fit in one
								sitting, momentum stopped feeling abstract. The day improved as
								soon as the goal stopped pretending to be bigger than it was.
							</p>
						</div>
					</div>
				</article>

				<div className="space-y-6">
					<section className="border border-[#b9ae9f] bg-[#f3ece1] p-5">
						<div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
							{[
								["Mood", "4/5"],
								["Energy", "3/5"],
								["Progress", "4/5"],
							].map(([label, value]) => (
								<div
									key={label}
									className="border-b border-[#cfc1b0] pb-4 last:border-b-0 last:pb-0"
								>
									<p className="text-xs uppercase tracking-[0.22em] text-black/52">
										{label}
									</p>
									<p className="mt-2 text-3xl font-semibold">{value}</p>
								</div>
							))}
						</div>
					</section>

					<section className="border border-[#b9ae9f] bg-[#fbf8f2] p-5">
						<p className="text-xs uppercase tracking-[0.28em] text-black/52">
							Prompt Strip
						</p>
						<div className="mt-4 space-y-3">
							{studyPrompts.map((prompt) => (
								<button
									key={prompt}
									type="button"
									className="w-full border-b border-[#d8cdbf] pb-3 text-left text-sm leading-6"
								>
									{prompt}
								</button>
							))}
						</div>
					</section>
				</div>
			</section>

			<aside className="border border-[#b9ae9f] bg-[#f3ece1] p-5">
				<p className="text-xs uppercase tracking-[0.28em] text-black/52">
					In View
				</p>
				<div className="mt-4 space-y-5">
					{studyGoals.map((goal) => (
						<div
							key={goal.title}
							className="border-b border-[#cfc1b0] pb-4 last:border-b-0 last:pb-0"
						>
							<p className="text-xs uppercase tracking-[0.18em] text-black/48">
								{goal.horizon}
							</p>
							<p className="mt-2 text-lg font-semibold">{goal.title}</p>
							<p className="mt-2 text-sm leading-6 text-black/66">
								{goal.nextStep}
							</p>
						</div>
					))}
				</div>
			</aside>
		</div>
	);
}
