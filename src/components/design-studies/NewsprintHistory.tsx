import { studyEntries } from "./mockData";

export default function NewsprintHistory() {
	return (
		<div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
			<section className="border border-[#b9ae9f] bg-[#f3ece1] p-5">
				<p className="text-xs uppercase tracking-[0.28em] text-black/52">
					Theme
				</p>
				<h1
					className="mt-3 text-5xl tracking-[-0.06em]"
					style={{ fontFamily: '"Fraunces", serif' }}
				>
					Clarity
				</h1>
				<p className="mt-4 text-sm leading-6 text-black/66">
					It keeps appearing whenever the next step is not yet concrete enough
					to act on.
				</p>
			</section>

			<section className="border border-[#b9ae9f] bg-[#fbf8f2] p-5">
				<div className="mb-5 border-b border-[#d8cdbf] pb-4">
					<p className="text-xs uppercase tracking-[0.28em] text-black/52">
						Archive
					</p>
					<h1
						className="mt-3 text-5xl tracking-[-0.06em]"
						style={{ fontFamily: '"Fraunces", serif' }}
					>
						History
					</h1>
				</div>
				<div className="grid gap-5 md:grid-cols-2">
					{studyEntries.map((entry) => (
						<article key={entry.date} className="border border-[#d8cdbf] p-4">
							<p className="text-xs uppercase tracking-[0.22em] text-black/48">
								{entry.date}
							</p>
							<h2 className="mt-3 text-xl font-semibold">{entry.title}</h2>
							<p className="mt-3 text-sm leading-6 text-black/66">
								{entry.excerpt}
							</p>
						</article>
					))}
				</div>
			</section>
		</div>
	);
}
