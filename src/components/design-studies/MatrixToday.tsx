import { studyGoals, studyPrompts } from "./mockData";

export default function MatrixToday() {
	return (
		<div className="grid gap-6 xl:grid-cols-[1fr_280px]">
			<section className="grid gap-px overflow-hidden rounded-[18px] border border-black/10 bg-black/10">
				<div className="grid gap-px bg-black/10 lg:grid-cols-[1fr_180px_180px_180px]">
					{[
						["Date", "Saturday, March 7"],
						["Mood", "4/5"],
						["Energy", "3/5"],
						["Progress", "4/5"],
					].map(([label, value]) => (
						<div key={label} className="bg-[#f3e7da] px-4 py-4">
							<p className="text-xs uppercase tracking-[0.22em] text-black/48">
								{label}
							</p>
							<p className="mt-2 text-lg font-semibold">{value}</p>
						</div>
					))}
				</div>
				<div className="grid gap-px bg-black/10 lg:grid-cols-[280px_minmax(0,1fr)]">
					<div className="bg-white px-5 py-5">
						<p className="text-sm text-black/48">Goal</p>
						<p className="mt-2 text-lg">Write with more clarity</p>
						<p className="mt-5 text-sm text-black/48">Today's step</p>
						<p className="mt-2 text-lg">Finish one honest page before lunch</p>
						<div className="mt-8 border-t border-black/10 pt-5">
							<p className="text-sm text-black/48">In view</p>
							<div className="mt-3 space-y-3">
								{studyGoals.map((goal) => (
									<p key={goal.title} className="text-sm leading-6">
										{goal.title}
									</p>
								))}
							</div>
						</div>
					</div>
					<div className="bg-[#f8f3ea] px-6 py-6">
						<p className="text-sm text-black/48">Reflection</p>
						<p className="mt-3 text-base leading-8">
							I wanted the day to feel finished before it began. It got better
							when I dropped that and just made the next move small and visible.
						</p>
					</div>
				</div>
			</section>
			<section className="rounded-[18px] border border-black/10 bg-white p-5">
				<p className="text-sm text-black/48">Prompts</p>
				<div className="mt-4 space-y-3">
					{studyPrompts.map((prompt) => (
						<button
							key={prompt}
							type="button"
							className="block w-full rounded-[10px] border border-black/10 bg-[#f8f3ea] p-3 text-left text-sm leading-6"
						>
							{prompt}
						</button>
					))}
				</div>
			</section>
		</div>
	);
}
