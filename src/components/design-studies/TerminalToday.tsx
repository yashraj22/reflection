import { studyGoals, studyPrompts } from "./mockData";

export default function TerminalToday() {
	return (
		<div className="grid gap-6 2xl:grid-cols-[minmax(0,1fr)_320px]">
			<section className="border border-[#262a22] bg-[#131611] p-5">
				<div
					className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-[#262a22] pb-4 text-sm text-[#96a184]"
					style={{ fontFamily: '"IBM Plex Mono", monospace' }}
				>
					<p>session://today/2026-03-07</p>
					<p>saved::02m</p>
				</div>

				<div className="grid gap-5 xl:grid-cols-[220px_minmax(0,1fr)]">
					<div className="space-y-5">
						<MonoBox label="goal" value="Write with more clarity" />
						<MonoBox
							label="next_step"
							value="Finish one honest page before lunch"
						/>
						<div className="border border-[#262a22] p-4">
							<p
								className="text-xs uppercase tracking-[0.22em] text-[#96a184]"
								style={{ fontFamily: '"IBM Plex Mono", monospace' }}
							>
								signals
							</p>
							<div className="mt-4 space-y-3 text-sm">
								<SignalRow label="mood" value="4/5" />
								<SignalRow label="energy" value="3/5" />
								<SignalRow label="progress" value="4/5" />
							</div>
						</div>
					</div>

					<div className="border border-[#262a22] p-5">
						<p
							className="text-xs uppercase tracking-[0.22em] text-[#96a184]"
							style={{ fontFamily: '"IBM Plex Mono", monospace' }}
						>
							entry.log
						</p>
						<p className="mt-5 text-base leading-8">
							I wanted the day to feel finished before it began. It got better
							when I dropped that and just made the next move small and visible.
						</p>
					</div>
				</div>
			</section>

			<aside className="space-y-6">
				<section className="border border-[#262a22] bg-[#131611] p-5">
					<p
						className="text-xs uppercase tracking-[0.22em] text-[#96a184]"
						style={{ fontFamily: '"IBM Plex Mono", monospace' }}
					>
						prompts
					</p>
					<div className="mt-4 space-y-3">
						{studyPrompts.map((prompt) => (
							<button
								key={prompt}
								type="button"
								className="block w-full border border-[#262a22] p-3 text-left text-sm leading-6 text-[#d8dbc9]"
							>
								{prompt}
							</button>
						))}
					</div>
				</section>

				<section className="border border-[#262a22] bg-[#131611] p-5">
					<p
						className="text-xs uppercase tracking-[0.22em] text-[#96a184]"
						style={{ fontFamily: '"IBM Plex Mono", monospace' }}
					>
						active_goals
					</p>
					<div className="mt-4 space-y-4">
						{studyGoals.map((goal) => (
							<div
								key={goal.title}
								className="border-t border-[#262a22] pt-4 first:border-t-0 first:pt-0"
							>
								<p className="text-sm font-semibold">{goal.title}</p>
								<p className="mt-2 text-sm text-[#96a184]">{goal.nextStep}</p>
							</div>
						))}
					</div>
				</section>
			</aside>
		</div>
	);
}

function MonoBox({ label, value }: { label: string; value: string }) {
	return (
		<div className="border border-[#262a22] p-4">
			<p
				className="text-xs uppercase tracking-[0.22em] text-[#96a184]"
				style={{ fontFamily: '"IBM Plex Mono", monospace' }}
			>
				{label}
			</p>
			<p className="mt-3 text-sm">{value}</p>
		</div>
	);
}

function SignalRow({ label, value }: { label: string; value: string }) {
	return (
		<div className="flex items-center justify-between gap-4 border-b border-[#262a22] pb-3 last:border-b-0 last:pb-0">
			<span
				className="text-xs uppercase tracking-[0.22em] text-[#96a184]"
				style={{ fontFamily: '"IBM Plex Mono", monospace' }}
			>
				{label}
			</span>
			<span>{value}</span>
		</div>
	);
}
