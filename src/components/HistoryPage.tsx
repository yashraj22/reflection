import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../convex/_generated/api";
import { formatDisplayDate } from "../lib/date";

export default function HistoryPage() {
	const historyQuery = useQuery({
		...convexQuery(api.journal.history, {}),
	});

	if (historyQuery.isPending) {
		return (
			<main id="content" className="site-main">
				<div className="page-wrap">
					<section className="section-shell">
						<p className="status-text">Loading history...</p>
					</section>
				</div>
			</main>
		);
	}

	if (historyQuery.error || !historyQuery.data) {
		return (
			<main id="content" className="site-main">
				<div className="page-wrap">
					<section className="section-shell">
						<h1 className="page-title">History</h1>
						<p className="page-subtitle">
							{historyQuery.error instanceof Error
								? historyQuery.error.message
								: "The archive could not load."}
						</p>
					</section>
				</div>
			</main>
		);
	}

	const { entries } = historyQuery.data;

	return (
		<main id="content" className="site-main">
			<div className="page-wrap">
				<header className="page-header">
					<h1 className="page-title">History</h1>
					<p className="status-text">{entries.length} entries</p>
				</header>

				<section className="section-shell">
					<ul className="list-reset history-list">
						{entries.length > 0 ? (
							entries.map((entry) => (
								<li
									key={entry._id}
									className="simple-row history-row content-auto"
								>
									<div className="history-head">
										<p className="item-title">
											{formatDisplayDate(entry.dateKey)}
										</p>
										<p className="item-meta">
											Mood {metricText(entry.mood)} / Energy{" "}
											{metricText(entry.energy)} / Progress{" "}
											{metricText(entry.progress)}
										</p>
									</div>
									<p className="item-copy line-clamp-3">{entry.excerpt}</p>
								</li>
							))
						) : (
							<li>
								<p className="section-note">No entries yet.</p>
							</li>
						)}
					</ul>
				</section>
			</div>
		</main>
	);
}

function metricText(value?: number) {
	return value === undefined ? "n/a" : `${value}/5`;
}
