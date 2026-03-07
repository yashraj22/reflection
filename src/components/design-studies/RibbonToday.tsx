import { studyGoals, studyPrompts } from "./mockData";

export default function RibbonToday() {
	return (
		<div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
			<section className="grid gap-px overflow-hidden rounded-[22px] border border-black/10 bg-black/10">
				<div className="bg-[#f6efe4] px-6 py-6">
					<p className="text-sm text-black/48">Today</p>
					<h1
						className="mt-3 text-5xl tracking-[-0.06em]"
						style={{ fontFamily: '"Fraunces", serif' }}
					>
						Saturday, March 7
					</h1>
				</div>
				<div className="grid gap-px bg-black/10 lg:grid-cols-[1fr_220px]">
					<div className="bg-white px-6 py-6">
						<div className="space-y-5">
							<div>
								<p className="text-sm text-black/48">Goal</p>
								<p className="mt-2 text-lg">Write with more clarity</p>
							</div>
							<div>
								<p className="text-sm text-black/48">Today's step</p>
								<p className="mt-2 text-lg">
									Finish one honest page before lunch
								</p>
							</div>
							<div>
								<p className="text-sm text-black/48">Reflection</p>
								<p className="mt-3 text-base leading-8">
									I needed a smaller starting point. Once the task fit in one
									sitting, momentum stopped feeling abstract.
								</p>
							</div>
						</div>
					</div>
					<div className="grid gap-px bg-black/10 lg:grid-rows-3">
						{[
							["Mood", "4/5", "#e0d3c3"],
							["Energy", "3/5", "#caa886"],
							["Progress", "4/5", "#7f5c44"],
						].map(([label, value, bg]) => (
							<div
								key={label}
								className="px-5 py-5 text-[#1d1713]"
								style={{ backgroundColor: bg }}
							>
								<p className="text-sm text-current/62">{label}</p>
								<p className="mt-4 text-3xl font-semibold">{value}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<div className="space-y-6">
				<section className="rounded-[22px] border border-black/10 bg-[#7f5c44] p-6 text-[#f6efe4]">
					<h2
						className="text-3xl tracking-[-0.05em]"
						style={{ fontFamily: '"Fraunces", serif' }}
					>
						Prompts
					</h2>
					<div className="mt-5 space-y-3">
						{studyPrompts.map((prompt) => (
							<button
								key={prompt}
								type="button"
								className="block w-full border-b border-white/18 pb-3 text-left text-sm leading-6"
							>
								{prompt}
							</button>
						))}
					</div>
				</section>
				<section className="rounded-[22px] border border-black/10 bg-[#f6efe4] p-6">
					<h2
						className="text-3xl tracking-[-0.05em]"
						style={{ fontFamily: '"Fraunces", serif' }}
					>
						In view
					</h2>
					<div className="mt-5 space-y-4">
						{studyGoals.map((goal) => (
							<div
								key={goal.title}
								className="border-t border-black/10 pt-4 first:border-t-0 first:pt-0"
							>
								<p className="text-lg font-semibold">{goal.title}</p>
								<p className="mt-2 text-sm leading-6 text-black/64">
									{goal.nextStep}
								</p>
							</div>
						))}
					</div>
				</section>
			</div>
		</div>
	);
}
