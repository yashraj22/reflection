import { studyEntries } from "./mockData";

export default function NotebookHistory() {
	return (
		<section className="border border-black/10 bg-[#fffdf8] p-6">
			<p className="text-sm text-black/48">Archive</p>
			<h1
				className="mt-3 text-5xl tracking-[-0.07em]"
				style={{ fontFamily: '"Instrument Serif", serif' }}
			>
				History
			</h1>
			<div className="mt-8 space-y-6">
				{studyEntries.map((entry) => (
					<div
						key={entry.date}
						className="grid gap-4 border-t border-black/10 pt-6 first:border-t-0 first:pt-0 md:grid-cols-[90px_minmax(0,1fr)_72px]"
					>
						<p className="text-sm text-black/48">{entry.date}</p>
						<div>
							<h2 className="text-xl font-semibold">{entry.title}</h2>
							<p className="mt-3 text-sm leading-7 text-black/66">
								{entry.excerpt}
							</p>
						</div>
						<p className="text-sm text-black/48">
							{entry.mood}/{entry.energy}/{entry.progress}
						</p>
					</div>
				))}
			</div>
		</section>
	);
}
