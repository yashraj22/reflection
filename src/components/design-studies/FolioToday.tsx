import { studyGoals, studyPrompts } from "./mockData";

export default function FolioToday() {
	return (
		<div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
			<section className="rounded-[22px] border border-black/10 bg-[#faf6ef] p-6">
				<p className="text-sm text-black/48">Today</p>
				<h1
					className="mt-3 text-5xl tracking-[-0.06em]"
					style={{ fontFamily: '"Fraunces", serif' }}
				>
					Saturday, March 7
				</h1>
				<div className="mt-6 space-y-5">
					<div>
						<p className="text-sm text-black/48">Goal</p>
						<p className="mt-2 text-lg">Write with more clarity</p>
					</div>
					<div>
						<p className="text-sm text-black/48">Today's step</p>
						<p className="mt-2 text-lg">Finish one honest page before lunch</p>
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
									style={{ fontFamily: '"Fraunces", serif' }}
								>
									{value}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="space-y-6">
				<div className="rounded-[22px] border border-black/10 bg-white p-6">
					<p className="text-sm text-black/48">Reflection</p>
					<p className="mt-4 text-base leading-8">
						I felt the drag early, but the moment I reduced the task it stopped
						controlling the day. The difference was not motivation. It was
						precision.
					</p>
				</div>
				<div className="grid gap-6 lg:grid-cols-2">
					<section className="rounded-[22px] border border-black/10 bg-[#f6f0e7] p-6">
						<p className="text-sm text-black/48">Prompts</p>
						<div className="mt-4 space-y-3">
							{studyPrompts.map((prompt) => (
								<button
									key={prompt}
									type="button"
									className="block w-full text-left text-sm leading-6"
								>
									{prompt}
								</button>
							))}
						</div>
					</section>
					<section className="rounded-[22px] border border-black/10 bg-[#f6f0e7] p-6">
						<p className="text-sm text-black/48">In view</p>
						<div className="mt-4 space-y-4">
							{studyGoals.map((goal) => (
								<div key={goal.title}>
									<p className="text-lg font-semibold">{goal.title}</p>
									<p className="mt-2 text-sm leading-6 text-black/64">
										{goal.nextStep}
									</p>
								</div>
							))}
						</div>
					</section>
				</div>
			</section>
		</div>
	);
}
