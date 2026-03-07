import { studyGoals, studyPrompts } from "./mockData";

export default function SlateToday() {
	return (
		<div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
			<aside className="space-y-6">
				<section className="rounded-[18px] border border-[#2a2d28] bg-[#171916] p-5">
					<p className="text-sm text-[#99a18d]">Prompts</p>
					<div className="mt-4 space-y-3">
						{studyPrompts.map((prompt) => (
							<button
								key={prompt}
								type="button"
								className="block w-full border-b border-[#2a2d28] pb-3 text-left text-sm leading-6"
							>
								{prompt}
							</button>
						))}
					</div>
				</section>
				<section className="rounded-[18px] border border-[#2a2d28] bg-[#171916] p-5">
					<p className="text-sm text-[#99a18d]">Active goals</p>
					<div className="mt-4 space-y-4">
						{studyGoals.map((goal) => (
							<div
								key={goal.title}
								className="border-t border-[#2a2d28] pt-4 first:border-t-0 first:pt-0"
							>
								<p className="text-lg font-semibold">{goal.title}</p>
								<p className="mt-2 text-sm leading-6 text-[#99a18d]">
									{goal.nextStep}
								</p>
							</div>
						))}
					</div>
				</section>
			</aside>

			<section className="rounded-[18px] border border-[#2a2d28] bg-[#171916] p-6">
				<div className="mb-5 flex items-end justify-between gap-4 border-b border-[#2a2d28] pb-4">
					<div>
						<p className="text-sm text-[#99a18d]">Today</p>
						<h1 className="mt-2 text-4xl tracking-[-0.05em]">
							Saturday, March 7
						</h1>
					</div>
					<p className="text-sm text-[#99a18d]">Saved 2m ago</p>
				</div>
				<div className="grid gap-4 sm:grid-cols-3">
					{[
						["Mood", "4/5"],
						["Energy", "3/5"],
						["Progress", "4/5"],
					].map(([label, value]) => (
						<div
							key={label}
							className="rounded-[12px] border border-[#2a2d28] p-4"
						>
							<p className="text-sm text-[#99a18d]">{label}</p>
							<p className="mt-3 text-3xl font-semibold">{value}</p>
						</div>
					))}
				</div>
				<div className="mt-5 space-y-4">
					<div className="rounded-[12px] border border-[#2a2d28] p-4">
						<p className="text-sm text-[#99a18d]">Goal</p>
						<p className="mt-2 text-lg">Write with more clarity</p>
					</div>
					<div className="rounded-[12px] border border-[#2a2d28] p-4">
						<p className="text-sm text-[#99a18d]">Today's step</p>
						<p className="mt-2 text-lg">Finish one honest page before lunch</p>
					</div>
					<div className="rounded-[12px] border border-[#2a2d28] p-4">
						<p className="text-sm text-[#99a18d]">Reflection</p>
						<p className="mt-3 text-base leading-8">
							I wanted the day to feel finished before it began. It got better
							when I dropped that and just made the next move small and visible.
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}
