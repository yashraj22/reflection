export default function JournalDashboardSkeleton() {
	return (
		<main id="content" className="site-main">
			<div className="dashboard-wrap">
				<div className="dashboard-skeleton">
					<section className="section-shell section-shell-reflection">
						<div className="skeleton-box skeleton-pill w-28" />
						<div className="mt-4 space-y-3">
							<div className="skeleton-box skeleton-line w-48" />
							<div className="skeleton-box skeleton-line w-full" />
							<div className="skeleton-box skeleton-line w-5/6" />
						</div>
						<div className="mt-6 grid gap-3">
							<div className="skeleton-box skeleton-field" />
							<div className="skeleton-box skeleton-field-tall" />
						</div>
					</section>

					<div className="dashboard-skeleton-support">
						<section className="section-shell section-shell-compact">
							<div className="skeleton-box skeleton-line w-36" />
							<div className="mt-4 grid gap-3">
								<div className="skeleton-box skeleton-card" />
								<div className="skeleton-box skeleton-card" />
							</div>
						</section>
						<section className="section-shell section-shell-compact">
							<div className="skeleton-box skeleton-line w-28" />
							<div className="mt-4 grid gap-3">
								<div className="skeleton-box skeleton-line w-full" />
								<div className="skeleton-box skeleton-line w-4/5" />
								<div className="skeleton-box skeleton-line w-3/4" />
							</div>
						</section>
					</div>
				</div>
			</div>
		</main>
	);
}
