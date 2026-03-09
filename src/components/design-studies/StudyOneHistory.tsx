import { ReflectionList } from "./shared";

export default function StudyOneHistory() {
	return (
		<div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_260px]">
			<section className="border border-black/10 bg-[#fffdf8] p-6 md:p-7">
				<div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-black/10 pb-5">
					<div>
						<p className="text-sm text-black/52">History</p>
						<h1
							className="mt-2 text-3xl tracking-[-0.04em]"
							style={{ fontFamily: '"Fraunces", serif' }}
						>
							All reflections
						</h1>
					</div>
					<p className="text-sm text-black/52">128 entries</p>
				</div>
				<ReflectionList className="space-y-6" />
			</section>

			<aside className="border border-black/10 bg-[#fbf7ef] p-6">
				<div className="space-y-6">
					<div>
						<p className="text-sm text-black/52">Theme</p>
						<h2
							className="mt-2 text-2xl tracking-[-0.04em]"
							style={{ fontFamily: '"Fraunces", serif' }}
						>
							Clarity
						</h2>
						<p className="mt-3 text-sm leading-6 text-black/68">
							It keeps returning whenever the next action is still abstract.
						</p>
					</div>
					<div className="border-t border-black/10 pt-5">
						<p className="text-sm text-black/52">Current streak</p>
						<p className="mt-2 text-4xl font-semibold tracking-[-0.04em]">18</p>
					</div>
					<div className="border-t border-black/10 pt-5">
						<p className="text-sm text-black/52">Average mood</p>
						<p className="mt-2 text-4xl font-semibold tracking-[-0.04em]">
							3.8
						</p>
					</div>
				</div>
			</aside>
		</div>
	);
}
