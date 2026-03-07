import { studyEntries } from "./mockData";

export default function MatrixHistory() {
	return (
		<section className="grid gap-px overflow-hidden rounded-[18px] border border-black/10 bg-black/10">
			<div className="grid gap-px bg-black/10 sm:grid-cols-[120px_minmax(0,1fr)_120px]">
				<div className="bg-[#f3e7da] px-4 py-4 text-xs uppercase tracking-[0.22em] text-black/48">
					Date
				</div>
				<div className="bg-[#f3e7da] px-4 py-4 text-xs uppercase tracking-[0.22em] text-black/48">
					Entry
				</div>
				<div className="bg-[#f3e7da] px-4 py-4 text-xs uppercase tracking-[0.22em] text-black/48">
					Score
				</div>
			</div>
			{studyEntries.map((entry) => (
				<div
					key={entry.date}
					className="grid gap-px bg-black/10 sm:grid-cols-[120px_minmax(0,1fr)_120px]"
				>
					<div className="bg-white px-4 py-4 text-sm text-black/56">
						{entry.date}
					</div>
					<div className="bg-[#f8f3ea] px-4 py-4">
						<p className="text-lg font-semibold">{entry.title}</p>
						<p className="mt-2 text-sm leading-6 text-black/66">
							{entry.excerpt}
						</p>
					</div>
					<div className="bg-white px-4 py-4 text-sm text-black/56">
						{entry.mood}/{entry.energy}/{entry.progress}
					</div>
				</div>
			))}
		</section>
	);
}
