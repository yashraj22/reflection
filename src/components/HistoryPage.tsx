import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { api } from "../../convex/_generated/api";
import { formatDisplayDate } from "../lib/date";
import HistorySkeleton from "./HistorySkeleton";

export default function HistoryPage() {
	const historyQuery = useQuery({
		...convexQuery(api.journal.history, {}),
	});

	if (historyQuery.isPending) {
		return <HistorySkeleton mode="list" />;
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

	const { entries, summary } = historyQuery.data;

	return (
		<main id="content" className="site-main">
			<div className="page-wrap">
				<header className="page-header history-page-header">
					<div>
						<p className="hero-eyebrow">Archive</p>
						<h1 className="page-title">History</h1>
						<p className="page-subtitle">
							Read previous entries safely. Nothing here is editable.
						</p>
					</div>
					<div className="history-summary-grid">
						<HistoryStat label="Entries" value={`${summary.totalReflections}`} />
						<HistoryStat label="Active goals" value={`${summary.activeGoals}`} />
						<HistoryStat
							label="Completed goals"
							value={`${summary.completedGoals}`}
						/>
					</div>
				</header>

				{summary.topThemes.length > 0 ? (
					<section className="section-shell section-shell-compact">
						<div className="section-head">
							<div>
								<p className="section-kicker">Themes</p>
								<h2 className="section-title">What keeps recurring</h2>
							</div>
						</div>
						<div className="review-tag-list">
							{summary.topThemes.map((theme) => (
								<span key={theme.label} className="review-tag">
									{theme.label} {theme.count}
								</span>
							))}
						</div>
					</section>
				) : null}

				<section className="section-shell mt-4">
					<ul className="list-reset history-list">
						{entries.length > 0 ? (
							entries.map((entry) => (
								<li key={entry._id} className="history-row history-card-shell">
									<Link
										to="/history/$dateKey"
										params={{ dateKey: entry.dateKey }}
										className="history-card-link"
									>
										<div className="history-head">
											<div>
												<p className="history-link">
													{formatDisplayDate(entry.dateKey)}
												</p>
												<p className="item-meta">Read-only entry</p>
											</div>
											<div className="history-chip-row">
												<span className="history-chip">
													Mood {metricText(entry.mood)}
												</span>
												<span className="history-chip">
													Energy {metricText(entry.energy)}
												</span>
												<span className="history-chip">
													Progress {metricText(entry.progress)}
												</span>
											</div>
										</div>
										<p className="item-copy line-clamp-3">{entry.excerpt}</p>
										<span className="history-open-label">Review entry</span>
									</Link>
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

function HistoryStat({ label, value }: { label: string; value: string }) {
	return (
		<div className="pattern-metric review-metric">
			<span className="metric-label">{label}</span>
			<span className="pattern-metric-value">{value}</span>
		</div>
	);
}

function metricText(value?: number) {
	return value === undefined ? "n/a" : `${value}/5`;
}
