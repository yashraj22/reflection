export default function HistorySkeleton({
	mode = "list",
}: {
	mode?: "list" | "entry";
}) {
	return (
		<main id="content" className="site-main">
			<div className="page-wrap">
				<section className="section-shell">
					<div className="skeleton-box skeleton-pill w-32" />
					<div className="mt-5 grid gap-4">
						<div className="skeleton-box skeleton-line w-40" />
						<div className="skeleton-box skeleton-line w-full" />
						<div className="skeleton-box skeleton-line w-4/5" />
					</div>
				</section>

				<div className="mt-4 grid gap-4">
					{mode === "list" ? (
						Array.from({ length: 4 }).map((_, index) => (
							<section key={index} className="section-shell history-skeleton-row">
								<div className="skeleton-box skeleton-line w-32" />
								<div className="mt-3 grid gap-3">
									<div className="skeleton-box skeleton-line w-3/5" />
									<div className="skeleton-box skeleton-line w-full" />
									<div className="skeleton-box skeleton-line w-5/6" />
								</div>
							</section>
						))
					) : (
						<>
							<section className="section-shell">
								<div className="skeleton-box skeleton-line w-32" />
								<div className="mt-4 grid gap-3">
									<div className="skeleton-box skeleton-card" />
									<div className="skeleton-box skeleton-field-tall" />
								</div>
							</section>
							<section className="section-shell">
								<div className="skeleton-box skeleton-line w-40" />
								<div className="mt-4 grid gap-3">
									<div className="skeleton-box skeleton-line w-full" />
									<div className="skeleton-box skeleton-line w-4/5" />
									<div className="skeleton-box skeleton-line w-3/4" />
								</div>
							</section>
						</>
					)}
				</div>
			</div>
		</main>
	);
}
