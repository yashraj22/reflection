import { studyEntries } from "./mockData";

export default function TerminalHistory() {
	return (
		<section className="border border-[#262a22] bg-[#131611] p-5">
			<div
				className="mb-5 flex flex-wrap items-end justify-between gap-4 border-b border-[#262a22] pb-4 text-sm text-[#96a184]"
				style={{ fontFamily: '"IBM Plex Mono", monospace' }}
			>
				<p>archive://history</p>
				<p>entries::128</p>
			</div>
			<div className="space-y-4">
				{studyEntries.map((entry) => (
					<div key={entry.date} className="border border-[#262a22] p-4">
						<div className="flex items-start justify-between gap-4">
							<div>
								<p className="text-xs uppercase tracking-[0.22em] text-[#96a184]">
									{entry.date}
								</p>
								<h2 className="mt-2 text-lg font-semibold">{entry.title}</h2>
							</div>
							<p className="text-sm text-[#96a184]">
								{entry.mood}/{entry.energy}/{entry.progress}
							</p>
						</div>
						<p className="mt-3 text-sm leading-7 text-[#c8ccb8]">
							{entry.excerpt}
						</p>
					</div>
				))}
			</div>
		</section>
	);
}
