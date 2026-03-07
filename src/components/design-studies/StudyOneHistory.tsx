import { ReflectionList } from "./shared";

export default function StudyOneHistory() {
	return (
		<div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
			<section className="rounded-[18px] border border-black/10 bg-[#fffdf8] p-6 shadow-[0_12px_30px_rgba(34,24,14,0.06)] md:p-8">
				<div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-black/10 pb-5">
					<div>
						<p className="text-sm text-black/55">History</p>
						<h1
							className="text-3xl tracking-[-0.04em]"
							style={{ fontFamily: '"Fraunces", serif' }}
						>
							All reflections
						</h1>
					</div>
					<p className="text-sm text-black/55">128 entries</p>
				</div>
				<ReflectionList className="space-y-6" />
			</section>

			<section className="rounded-[18px] border border-black/10 bg-[#fffdf8] p-6 shadow-[0_12px_30px_rgba(34,24,14,0.06)]">
				<div className="space-y-6">
					<div>
						<p className="text-sm text-black/55">Recurring theme</p>
						<h2
							className="mt-2 text-2xl tracking-[-0.04em]"
							style={{ fontFamily: '"Fraunces", serif' }}
						>
							Clarity
						</h2>
						<p className="mt-3 text-sm leading-6 text-black/72">
							It keeps appearing when the next step is vague.
						</p>
					</div>

					<div className="border-t border-black/10 pt-6">
						<p className="text-sm text-black/55">Current streak</p>
						<p className="mt-3 text-5xl font-semibold tracking-[-0.05em]">18</p>
					</div>

					<div className="border-t border-black/10 pt-6">
						<p className="text-sm text-black/55">Average mood</p>
						<p className="mt-3 text-5xl font-semibold tracking-[-0.05em]">
							3.8
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}
