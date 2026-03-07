import { Link } from "@tanstack/react-router";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
	return (
		<header className="site-header px-4">
			<nav className="page-wrap site-header-inner" aria-label="Primary">
				<Link to="/" className="brand-link">
					Northstar
				</Link>

				<div className="site-nav text-sm">
					<Link
						to="/history"
						className="nav-link"
						activeProps={{ className: "nav-link is-active" }}
					>
						History
					</Link>
					<ThemeToggle />
				</div>
			</nav>
		</header>
	);
}
