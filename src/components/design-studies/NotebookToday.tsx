import { studyGoals, studyPrompts } from "./mockData";

export default function NotebookToday() {
	return (
		<div className="space-y-8">
			<section className="border border-black/10 bg-[#fbf8f2] p-6">
				<p className="text-sm text-black/48">Saturday, March 7</p>
				<h1
					className="mt-3 text-5xl tracking-[-0.07em]"
					style={{ fontFamily: '"Instrument Serif", serif' }}
				>
					One page for the day
				</h1>
			</section>

			<div className="grid gap-8 lg:grid-cols-[1fr_280px]">
				<section className="space-y-6 border border-black/10 bg-[#fffdf8] p-6">
					<div>
						<p className="text-sm text-black/48">Goal</p>
						<p className="mt-2 text-lg">Write with more clarity</p>
					</div>
					<div>
						<p className="text-sm text-black/48">Today's step</p>
						<p className="mt-2 text-lg">Finish one honest page before lunch</p>
					</div>
					<div>
						<p className="text-sm text-black/48">Reflection</p>
						<p className="mt-3 text-base leading-8">
							I felt the drag early, but the moment I reduced the task it
							stopped controlling the day. The difference was not motivation. It
							was precision.
						</p>
					</div>
					<div className="grid gap-4 sm:grid-cols-3">
						{[
							["Mood", "4"],
							["Energy", "3"],
							["Progress", "4"],
						].map(([label, value]) => (
							<div key={label} className="border-t border-black/10 pt-4">
								<p className="text-sm text-black/48">{label}</p>
								<p
									className="mt-2 text-4xl tracking-[-0.06em]"
									style={{ fontFamily: '"Instrument Serif", serif' }}
								>
									{value}
								</p>
							</div>
						))}
					</div>
				</section>

				<aside className="space-y-6">
					<section className="border border-black/10 bg-[#fbf8f2] p-5">
						<p className="text-sm text-black/48">Prompts</p>
						<div className="mt-4 space-y-3">
							{studyPrompts.map((prompt) => (
								<button
									key={prompt}
									type="button"
									className="block w-full border-b border-black/10 pb-3 text-left text-sm leading-6"
								>
									{prompt}
								</button>
							))}
						</div>
					</section>
					<section className="border border-black/10 bg-[#fbf8f2] p-5">
						<p className="text-sm text-black/48">In view</p>
						<div className="mt-4 space-y-4">
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
				</aside>
			</div>
		</div>
	);
}
