import { studyGoals, studyPrompts } from "./mockData";

export default function BulletinToday() {
	return (
		<div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_300px]">
			<section className="grid gap-px overflow-hidden rounded-[28px] border border-black/10 bg-black/10 lg:grid-cols-[minmax(0,1fr)_220px]">
				<div className="bg-[#17120e] px-6 py-6 text-[#f8f3ea] md:px-8 md:py-8">
					<div className="mb-6 flex flex-wrap items-start justify-between gap-4">
						<div>
							<p className="text-sm text-white/60">Today</p>
							<h1
								className="mt-2 text-4xl tracking-[-0.05em] md:text-5xl"
								style={{ fontFamily: '"Fraunces", serif' }}
							>
								Saturday, March 7
							</h1>
						</div>
						<p className="text-sm text-white/60">Saved 2m ago</p>
					</div>

					<div className="grid gap-5 sm:grid-cols-2">
						<div className="rounded-[18px] border border-white/14 p-4">
							<p className="text-sm text-white/60">Goal</p>
							<p className="mt-2 text-lg">Write with more clarity</p>
						</div>
						<div className="rounded-[18px] border border-white/14 p-4">
							<p className="text-sm text-white/60">Today's step</p>
							<p className="mt-2 text-lg">
								Finish one honest page before lunch
							</p>
						</div>
					</div>

					<div className="mt-5 rounded-[24px] border border-white/14 bg-[#241d17] p-5">
						<p className="text-sm text-white/60">Reflection</p>
						<p className="mt-3 text-base leading-8">
							I needed a smaller starting point. Once the task fit in one
							sitting, momentum stopped feeling abstract. The day improved as
							soon as the goal stopped pretending to be bigger than it was.
						</p>
					</div>
				</div>

				<div className="grid gap-px bg-black/10 lg:grid-rows-3">
					{[
						["Mood", "4/5", "#b85b3f"],
						["Energy", "3/5", "#c88c3c"],
						["Progress", "4/5", "#efe7da"],
					].map(([label, value, bg]) => (
						<div
							key={label}
							className="px-5 py-5 text-[#17120e]"
							style={{ backgroundColor: bg }}
						>
							<p className="text-sm text-current/68">{label}</p>
							<p className="mt-4 text-3xl font-semibold">{value}</p>
						</div>
					))}
				</div>
			</section>

			<div className="space-y-6">
				<section className="rounded-[28px] border border-black/10 bg-[#b85b3f] p-6 text-[#f8f3ea]">
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
								className="block w-full rounded-[18px] border border-white/14 bg-black/8 px-4 py-3 text-left text-sm leading-6"
							>
								{prompt}
							</button>
						))}
					</div>
				</section>

				<section className="rounded-[28px] border border-black/10 bg-[#efe7da] p-6">
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
								<p className="text-sm font-semibold">{goal.title}</p>
								<p className="mt-2 text-sm leading-6 text-black/66">
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
