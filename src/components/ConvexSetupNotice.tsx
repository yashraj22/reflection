export default function ConvexSetupNotice() {
	return (
		<main id="content" className="site-main">
			<div className="page-wrap">
				<header className="page-header">
					<div>
						<h1 className="page-title">Connect Convex</h1>
						<p className="page-subtitle">
							The app needs <code>VITE_CONVEX_URL</code> before the journal can
							load.
						</p>
					</div>
				</header>

				<section className="section-shell">
					<div className="stack">
						<div>
							<h2 className="section-title">Run these commands</h2>
						</div>
						<ol className="list-reset rule-list">
							<li className="simple-row">
								<p className="item-title">1. Start Convex</p>
								<pre className="message">
									<code>{`npx convex dev`}</code>
								</pre>
							</li>
							<li className="simple-row">
								<p className="item-title">2. Start the app</p>
								<pre className="message">
									<code>{`npm run dev`}</code>
								</pre>
							</li>
						</ol>
						<p className="section-note">
							Convex will create the deployment config and regenerate
							<code>convex/_generated</code>.
						</p>
					</div>
				</section>
			</div>
		</main>
	);
}
