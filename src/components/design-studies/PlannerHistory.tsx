import { studyEntries } from "./mockData";

export default function PlannerHistory() {
	return (
		<section className="rounded-[18px] border border-black/10 bg-[#faf6ee] p-5">
			<div className="mb-5 flex items-end justify-between gap-4">
				<div>
					<p className="text-sm text-black/48">Archive</p>
					<h1 className="mt-2 text-4xl tracking-[-0.05em]">History</h1>
				</div>
				<p className="text-sm text-black/48">128 entries</p>
			</div>
			<div className="grid gap-3">
				{studyEntries.map((entry) => (
					<div
						key={entry.date}
						className="grid gap-px overflow-hidden rounded-[12px] border border-black/10 bg-black/10 md:grid-cols-[120px_minmax(0,1fr)_110px]"
					>
						<div className="bg-[#e7e2d4] px-4 py-4">
							<p className="text-sm text-black/56">{entry.date}</p>
						</div>
						<div className="bg-[#fffdf8] px-4 py-4">
							<p className="text-lg font-semibold">{entry.title}</p>
							<p className="mt-2 text-sm leading-6 text-black/64">
								{entry.excerpt}
							</p>
						</div>
						<div className="bg-[#f0ebdf] px-4 py-4 text-sm text-black/56">
							{entry.mood}/{entry.energy}/{entry.progress}
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
