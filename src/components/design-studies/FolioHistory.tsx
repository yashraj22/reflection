import { studyEntries } from "./mockData";

export default function FolioHistory() {
	return (
		<div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
			<section className="rounded-[22px] border border-black/10 bg-[#f6f0e7] p-6">
				<p className="text-sm text-black/48">Theme</p>
				<h1
					className="mt-3 text-5xl tracking-[-0.06em]"
					style={{ fontFamily: '"Fraunces", serif' }}
				>
					Clarity
				</h1>
			</section>
			<section className="rounded-[22px] border border-black/10 bg-white p-6">
				<p className="text-sm text-black/48">History</p>
				<div className="mt-6 space-y-6">
					{studyEntries.map((entry) => (
						<div
							key={entry.date}
							className="border-t border-black/10 pt-6 first:border-t-0 first:pt-0"
						>
							<div className="flex items-start justify-between gap-4">
								<div>
									<p className="text-sm text-black/48">{entry.date}</p>
									<h2 className="mt-2 text-xl font-semibold">{entry.title}</h2>
								</div>
								<p className="text-sm text-black/48">
									{entry.mood}/{entry.energy}/{entry.progress}
								</p>
							</div>
							<p className="mt-3 text-sm leading-7 text-black/66">
								{entry.excerpt}
							</p>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}
