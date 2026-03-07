import { studyEntries } from "./mockData";

export default function RibbonHistory() {
	return (
		<div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
			<section className="rounded-[22px] border border-black/10 bg-[#7f5c44] p-6 text-[#f6efe4]">
				<p className="text-sm text-white/72">Theme</p>
				<h1
					className="mt-2 text-5xl tracking-[-0.05em]"
					style={{ fontFamily: '"Fraunces", serif' }}
				>
					Clarity
				</h1>
			</section>
			<section className="rounded-[22px] border border-black/10 bg-white p-6">
				<div className="mb-6 flex items-center justify-between gap-4">
					<h1
						className="text-4xl tracking-[-0.05em]"
						style={{ fontFamily: '"Fraunces", serif' }}
					>
						History
					</h1>
					<p className="text-sm text-black/48">128 entries</p>
				</div>
				<div className="space-y-4">
					{studyEntries.map((entry) => (
						<div
							key={entry.date}
							className="border-t border-black/10 pt-4 first:border-t-0 first:pt-0"
						>
							<p className="text-sm text-black/48">{entry.date}</p>
							<h2 className="mt-2 text-lg font-semibold">{entry.title}</h2>
							<p className="mt-2 text-sm leading-6 text-black/64">
								{entry.excerpt}
							</p>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}
