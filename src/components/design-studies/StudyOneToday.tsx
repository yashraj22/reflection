import { useState } from "react";
import { studyGoals, studyPrompts } from "./mockData";

export default function StudyOneToday() {
	const [step, setStep] = useState("Finish one honest page before lunch");
	const [reflection, setReflection] = useState(
		"I kept circling the hard part until I named it clearly. Once the next step was concrete, the resistance dropped. The day improved after that.",
	);
	const [mood, setMood] = useState(4);
	const [energy, setEnergy] = useState(3);
	const [progress, setProgress] = useState(4);

	function insertPrompt(prompt: string) {
		setReflection((current) =>
			current.trim() ? `${current.trim()}\n\n${prompt}` : `${prompt}\n\n`,
		);
	}

	return (
		<div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_300px]">
			<section className="border border-black/10 bg-[#fffdf8] p-6 md:p-7">
				<div className="flex flex-wrap items-end justify-between gap-4 border-b border-black/10 pb-5">
					<div>
						<p className="text-sm text-black/52">Today</p>
						<h1
							className="mt-2 text-3xl tracking-[-0.04em]"
							style={{ fontFamily: '"Fraunces", serif' }}
						>
							Saturday, March 7
						</h1>
					</div>
					<p className="text-sm text-black/52">Draft</p>
				</div>

				<div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_240px]">
					<div className="space-y-6">
						<div className="grid gap-5 md:grid-cols-2">
							<div>
								<p className="text-sm font-medium text-black/68">Goal</p>
								<p className="mt-2 border-t border-black/10 pt-3 text-[15px]">
									Write with more clarity
								</p>
							</div>
							<label className="block">
								<span className="text-sm font-medium text-black/68">
									Next step
								</span>
								<input
									value={step}
									onChange={(event) => setStep(event.target.value)}
									className="mt-2 w-full border border-[#d3c8b8] bg-[#fffdfa] px-3 py-3 text-[15px] outline-none"
								/>
							</label>
						</div>

						<div>
							<p className="text-sm font-medium text-black/68">Write</p>
							<div className="mt-3 border border-[#d3c8b8] bg-[#fffdfa] p-4">
								<textarea
									value={reflection}
									onChange={(event) => setReflection(event.target.value)}
									className="min-h-[340px] w-full resize-none bg-transparent text-[15px] leading-7 outline-none"
								/>
							</div>
						</div>

						<div className="grid gap-3 sm:grid-cols-3">
							<ScaleField label="Mood" value={mood} onChange={setMood} />
							<ScaleField label="Energy" value={energy} onChange={setEnergy} />
							<ScaleField
								label="Progress"
								value={progress}
								onChange={setProgress}
							/>
						</div>
					</div>

					<aside className="border-l border-black/10 pl-0 lg:pl-6">
						<div className="space-y-5">
							<div>
								<p className="text-sm font-medium text-black/68">Context</p>
								<div className="mt-3 space-y-3 text-sm leading-6 text-black/68">
									<p>Clarity has shown up in 3 of the last 5 entries.</p>
									<p>Smaller steps still correlate with better progress.</p>
									<p>Most recent win: one honest page changed the tone.</p>
								</div>
							</div>

							<div className="border-t border-black/10 pt-5">
								<p className="text-sm font-medium text-black/68">Questions</p>
								<div className="mt-3 space-y-3">
									{studyPrompts.map((prompt) => (
										<button
											key={prompt}
											type="button"
											onClick={() => insertPrompt(prompt)}
											className="block w-full border-b border-black/10 pb-3 text-left text-sm leading-6 text-black/74"
										>
											{prompt}
										</button>
									))}
								</div>
							</div>
						</div>
					</aside>
				</div>
			</section>

			<aside className="border border-black/10 bg-[#fbf7ef] p-6">
				<div className="flex items-center justify-between gap-4 border-b border-black/10 pb-4">
					<h2
						className="text-2xl tracking-[-0.04em]"
						style={{ fontFamily: '"Fraunces", serif' }}
					>
						In view
					</h2>
					<p className="text-sm text-black/52">3 goals</p>
				</div>
				<div className="mt-5 space-y-5">
					{studyGoals.map((goal) => (
						<div
							key={goal.title}
							className="border-t border-black/10 pt-4 first:border-t-0 first:pt-0"
						>
							<p className="text-sm text-black/48">{goal.horizon}</p>
							<p className="mt-2 text-lg font-semibold">{goal.title}</p>
							<p className="mt-2 text-sm leading-6 text-black/64">
								{goal.nextStep}
							</p>
						</div>
					))}
				</div>
			</aside>
		</div>
	);
}

function ScaleField({
	label,
	value,
	onChange,
}: {
	label: string;
	value: number;
	onChange: (value: number) => void;
}) {
	return (
		<div className="border-t border-black/10 pt-3">
			<p className="text-sm text-black/52">{label}</p>
			<div className="mt-3 grid grid-cols-5 gap-1.5">
				{[1, 2, 3, 4, 5].map((item) => (
					<button
						key={item}
						type="button"
						onClick={() => onChange(item)}
						aria-pressed={item === value}
						className={`h-9 border text-sm ${
							item === value
								? "border-[#231c16] bg-[#231c16] text-[#fffdf8]"
								: "border-black/10 bg-[#fffdfa] text-black/60"
						}`}
					>
						{item}
					</button>
				))}
			</div>
		</div>
	);
}
