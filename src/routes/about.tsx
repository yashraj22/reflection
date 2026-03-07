import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
	component: About,
});

function About() {
	return (
		<main id="content" className="site-main">
			<div className="page-wrap">
				<header className="page-header">
					<div>
						<h1 className="page-title">Method</h1>
						<p className="page-subtitle">
							The journal stays useful by staying small.
						</p>
					</div>
				</header>

				<section className="section-shell">
					<p className="item-copy">
						Keep long-term direction visible, decide the next step clearly, and
						reflect often enough that patterns stop being vague.
					</p>
				</section>
			</div>
		</main>
	);
}
