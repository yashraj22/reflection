import { studyGoals, studyPrompts } from "./mockData";

export default function PlannerToday() {
	return (
		<div className="grid gap-6 xl:grid-cols-[1fr_1fr_320px]">
			<section className="rounded-[18px] border border-black/10 bg-[#faf6ee] p-5">
				<p className="text-sm text-black/48">Direction</p>
				<div className="mt-4 space-y-4">
					{studyGoals.map((goal) => (
						<div
							key={goal.title}
							className="rounded-[12px] border border-black/10 bg-[#f0ebdf] p-4"
						>
							<p className="text-xs uppercase tracking-[0.22em] text-black/48">
								{goal.horizon}
							</p>
							<p className="mt-2 text-lg font-semibold">{goal.title}</p>
							<p className="mt-2 text-sm leading-6 text-black/64">
								{goal.nextStep}
							</p>
						</div>
					))}
				</div>
			</section>

			<section className="rounded-[18px] border border-black/10 bg-[#faf6ee] p-5">
				<div className="mb-4 flex items-end justify-between gap-4">
					<div>
						<p className="text-sm text-black/48">Today</p>
						<h1 className="mt-2 text-4xl tracking-[-0.05em]">
							Saturday, March 7
						</h1>
					</div>
					<p className="text-sm text-black/48">Saved 2m ago</p>
				</div>
				<div className="space-y-4">
					<div className="rounded-[12px] border border-black/10 bg-[#f0ebdf] p-4">
						<p className="text-sm text-black/48">Today's step</p>
						<p className="mt-2 text-lg">Finish one honest page before lunch</p>
					</div>
					<div className="rounded-[12px] border border-black/10 bg-[#fffdf8] p-4">
						<p className="text-sm text-black/48">Reflection</p>
						<p className="mt-3 leading-8">
							I felt the drag early, but the moment I reduced the task it
							stopped controlling the day. The difference was not motivation. It
							was precision.
						</p>
					</div>
					<div className="grid gap-3 sm:grid-cols-3">
						{[
							["Mood", "4/5"],
							["Energy", "3/5"],
							["Progress", "4/5"],
						].map(([label, value]) => (
							<div
								key={label}
								className="rounded-[12px] border border-black/10 bg-[#f0ebdf] p-4"
							>
								<p className="text-sm text-black/48">{label}</p>
								<p className="mt-3 text-2xl font-semibold">{value}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="rounded-[18px] border border-black/10 bg-[#e7e2d4] p-5">
				<p className="text-sm text-black/48">Prompt Queue</p>
				<div className="mt-4 space-y-3">
					{studyPrompts.map((prompt) => (
						<button
							key={prompt}
							type="button"
							className="block w-full rounded-[12px] border border-black/10 bg-[#faf6ee] p-4 text-left text-sm leading-6"
						>
							{prompt}
						</button>
					))}
				</div>
			</section>
		</div>
	);
}
