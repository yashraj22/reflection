import { useState } from "react";
import { studyGoals, studyPrompts } from "./mockData";

export default function NotebookToday() {
	const [step, setStep] = useState("Finish one honest page before lunch");
	const [reflection, setReflection] = useState(
		"I felt the drag early, but the moment I reduced the task it stopped controlling the day. The difference was not motivation. It was precision.",
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
		<div className="space-y-8">
			<section className="border-y border-black/10 py-5">
				<p className="text-sm text-black/48">Saturday, March 7</p>
				<h1
					className="mt-3 text-5xl tracking-[-0.07em]"
					style={{ fontFamily: '"Instrument Serif", serif' }}
				>
					One page for the day
				</h1>
			</section>

			<div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_240px]">
				<section className="border border-black/10 bg-[#fffdf8] p-6">
					<div className="grid gap-6">
						<div className="grid gap-5 md:grid-cols-2">
							<div>
								<p className="text-sm text-black/48">Goal</p>
								<p className="mt-2 border-t border-black/10 pt-3 text-lg">
									Write with more clarity
								</p>
							</div>
							<label className="block">
								<span className="text-sm text-black/48">Next step</span>
								<input
									value={step}
									onChange={(event) => setStep(event.target.value)}
									className="mt-2 w-full border border-black/10 bg-[#fffdfa] px-3 py-3 text-[15px] outline-none"
								/>
							</label>
						</div>

						<div>
							<p className="text-sm text-black/48">Reflection</p>
							<textarea
								value={reflection}
								onChange={(event) => setReflection(event.target.value)}
								className="mt-3 min-h-[320px] w-full resize-none border border-black/10 bg-transparent px-0 py-0 text-base leading-8 outline-none"
							/>
						</div>

						<div className="grid gap-4 sm:grid-cols-3">
							<NotebookScale label="Mood" value={mood} onChange={setMood} />
							<NotebookScale
								label="Energy"
								value={energy}
								onChange={setEnergy}
							/>
							<NotebookScale
								label="Progress"
								value={progress}
								onChange={setProgress}
							/>
						</div>
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
									onClick={() => insertPrompt(prompt)}
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

function NotebookScale({
	label,
	value,
	onChange,
}: {
	label: string;
	value: number;
	onChange: (value: number) => void;
}) {
	return (
		<div className="border-t border-black/10 pt-4">
			<p className="text-sm text-black/48">{label}</p>
			<div className="mt-3 grid grid-cols-5 gap-1.5">
				{[1, 2, 3, 4, 5].map((item) => (
					<button
						key={item}
						type="button"
						onClick={() => onChange(item)}
						aria-pressed={item === value}
						className={`h-9 border text-sm ${
							item === value
								? "border-[#1d1915] bg-[#1d1915] text-[#fffdf8]"
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
