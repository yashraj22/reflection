import { studyEntries } from "./mockData";

export default function SlateHistory() {
	return (
		<section className="rounded-[18px] border border-[#2a2d28] bg-[#171916] p-6">
			<div className="mb-5 flex items-end justify-between gap-4 border-b border-[#2a2d28] pb-4">
				<div>
					<p className="text-sm text-[#99a18d]">Archive</p>
					<h1 className="mt-2 text-4xl tracking-[-0.05em]">History</h1>
				</div>
				<p className="text-sm text-[#99a18d]">128 entries</p>
			</div>
			<div className="space-y-4">
				{studyEntries.map((entry) => (
					<div
						key={entry.date}
						className="rounded-[12px] border border-[#2a2d28] p-4"
					>
						<div className="flex items-start justify-between gap-4">
							<div>
								<p className="text-sm text-[#99a18d]">{entry.date}</p>
								<h2 className="mt-2 text-lg font-semibold">{entry.title}</h2>
							</div>
							<p className="text-sm text-[#99a18d]">
								{entry.mood}/{entry.energy}/{entry.progress}
							</p>
						</div>
						<p className="mt-3 text-sm leading-7 text-[#c7cbbc]">
							{entry.excerpt}
						</p>
					</div>
				))}
			</div>
		</section>
	);
}
