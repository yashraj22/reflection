import { studyEntries } from "./mockData";

export default function BulletinHistory() {
	return (
		<div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
			<section className="rounded-[28px] border border-black/10 bg-[#b85b3f] p-6 text-[#f8f3ea] md:p-8">
				<p className="text-sm text-white/72">Recurring theme</p>
				<h1
					className="mt-2 text-5xl tracking-[-0.05em]"
					style={{ fontFamily: '"Fraunces", serif' }}
				>
					Clarity
				</h1>
				<p className="mt-4 max-w-md text-sm leading-6 text-white/84">
					The writing sharpens the moment the next step becomes real enough to
					do.
				</p>
			</section>

			<section className="rounded-[28px] border border-black/10 bg-[#fffdf8] p-6 md:p-8">
				<div className="mb-6 flex items-center justify-between gap-4">
					<div>
						<p className="text-sm text-black/50">History</p>
						<h1
							className="mt-2 text-4xl tracking-[-0.05em]"
							style={{ fontFamily: '"Fraunces", serif' }}
						>
							Archive
						</h1>
					</div>
					<p className="text-sm text-black/50">128 entries</p>
				</div>
				<div className="grid gap-4 md:grid-cols-2">
					{studyEntries.map((entry) => (
						<div
							key={entry.date}
							className="rounded-[18px] border border-black/10 p-4"
						>
							<p className="text-sm text-black/50">{entry.date}</p>
							<h2 className="mt-2 text-xl font-semibold">{entry.title}</h2>
							<p className="mt-3 text-sm leading-6 text-black/66">
								{entry.excerpt}
							</p>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}
