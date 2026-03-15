import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { api } from "../../convex/_generated/api";
import { formatDisplayDate, isDateKey } from "../lib/date";
import HistorySkeleton from "./HistorySkeleton";

export default function JournalEntryReview({ dateKey }: { dateKey: string }) {
	const isValidDateKey = isDateKey(dateKey);
	const reviewQuery = useQuery({
		...convexQuery(api.journal.dashboard, { dateKey }),
		enabled: isValidDateKey,
	});

	if (!isValidDateKey) {
		return <ReviewState title="Entry not found" message="This archive link is invalid." />;
	}

	if (reviewQuery.isPending) {
		return <HistorySkeleton mode="entry" />;
	}

	if (reviewQuery.error || !reviewQuery.data) {
		return (
			<ReviewState
				title="Entry unavailable"
				message={
					reviewQuery.error instanceof Error
						? reviewQuery.error.message
						: "The entry could not load."
				}
			/>
		);
	}

	const dashboard = reviewQuery.data;
	const entry = dashboard.todayReflection;
	if (!entry) {
		return (
			<ReviewState
				title={formatDisplayDate(dateKey)}
				message="No journal entry was saved for this day."
			/>
		);
	}

	return (
		<main id="content" className="site-main">
			<div className="page-wrap page-wrap-review">
				<header className="page-header-rich review-hero">
					<div className="review-hero-copy">
						<p className="status-text">
							<Link to="/history">History</Link> / {formatDisplayDate(dateKey)}
						</p>
						<p className="hero-eyebrow">Archive</p>
						<h1 className="page-title page-title-review">
							{formatDisplayDate(dateKey)}
						</h1>
						<p className="page-subtitle page-subtitle-review">
							Read-only entry
						</p>
					</div>
					<div className="review-hero-actions">
						<Link to="/history" className="button-secondary">
							Back to history
						</Link>
						<Link to="/" className="button">
							Back to today
						</Link>
					</div>
				</header>

				<section className="section-shell section-shell-compact">
					<div className="review-metric-grid">
						<ReviewMetric label="Mood" value={metricValue(entry.mood)} />
						<ReviewMetric label="Energy" value={metricValue(entry.energy)} />
						<ReviewMetric label="Progress" value={metricValue(entry.progress)} />
						<ReviewMetric
							label="Completion"
							value={`${entry.completionScore}%`}
						/>
					</div>
				</section>

				<div className="review-grid">
					{entry.intention ? (
						<ReviewSection title="Direction">
							<p className="review-copy">{entry.intention}</p>
						</ReviewSection>
					) : null}

					{entry.reflection ? (
						<ReviewSection title="Reflection" emphasis>
							<p className="review-copy review-copy-entry">{entry.reflection}</p>
						</ReviewSection>
					) : null}

					{entry.summary ? (
						<ReviewSection title="What happened">
							<p className="review-copy">{entry.summary}</p>
						</ReviewSection>
					) : null}

					{entry.win || entry.blocker ? (
						<section className="review-row">
							{entry.win ? (
								<ReviewSection title="Win">
									<p className="review-copy">{entry.win}</p>
								</ReviewSection>
							) : null}
							{entry.blocker ? (
								<ReviewSection title="Blocker">
									<p className="review-copy">{entry.blocker}</p>
								</ReviewSection>
							) : null}
						</section>
					) : null}

					{entry.tomorrowFocus ? (
						<ReviewSection title="Tomorrow">
							<p className="review-copy">{entry.tomorrowFocus}</p>
						</ReviewSection>
					) : null}

					{entry.themes.length > 0 ? (
						<ReviewSection title="Themes">
							<div className="review-tag-list">
								{entry.themes.map((theme) => (
									<span key={theme.slug} className="review-tag">
										{theme.label}
									</span>
								))}
							</div>
						</ReviewSection>
					) : null}
				</div>
			</div>
		</main>
	);
}

function ReviewState({
	title,
	message,
}: {
	title: string;
	message: string;
}) {
	return (
		<main id="content" className="site-main">
			<div className="page-wrap">
				<section className="section-shell">
					<p className="hero-eyebrow">Archive</p>
					<h1 className="page-title page-title-review">{title}</h1>
					<p className="page-subtitle page-subtitle-review">{message}</p>
					<div className="review-hero-actions mt-6">
						<Link to="/history" className="button-secondary">
							Back to history
						</Link>
						<Link to="/" className="button">
							Back to today
						</Link>
					</div>
				</section>
			</div>
		</main>
	);
}

function ReviewSection({
	title,
	children,
	emphasis,
}: {
	title: string;
	children: React.ReactNode;
	emphasis?: boolean;
}) {
	return (
		<section
			className={`section-shell ${emphasis ? "section-shell-reflection" : "section-shell-compact"}`}
		>
			<div className="section-head">
				<div>
					<p className="section-kicker">Review</p>
					<h2 className="section-title">{title}</h2>
				</div>
			</div>
			{children}
		</section>
	);
}

function ReviewMetric({ label, value }: { label: string; value: string }) {
	return (
		<div className="pattern-metric review-metric">
			<span className="metric-label">{label}</span>
			<span className="pattern-metric-value">{value}</span>
		</div>
	);
}

function metricValue(value?: number | null) {
	return value === null || value === undefined ? "n/a" : `${value}/5`;
}
