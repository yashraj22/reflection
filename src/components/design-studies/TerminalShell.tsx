import { Link, Outlet } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { DesignSwitcher } from "./shared";

export default function TerminalShell({ children }: { children?: ReactNode }) {
	return (
		<div className="min-h-screen bg-[#0f110d] text-[#d8dbc9]">
			<div className="grid min-h-screen xl:grid-cols-[260px_minmax(0,1fr)]">
				<aside className="border-b border-[#262a22] bg-[#131611] px-6 py-7 xl:border-b-0 xl:border-r">
					<div className="space-y-8">
						<div className="space-y-4">
							<DesignSwitcher active={3} dark />
							<div>
								<p
									className="text-xs uppercase tracking-[0.28em] text-[#96a184]"
									style={{ fontFamily: '"IBM Plex Mono", monospace' }}
								>
									Archive Mode
								</p>
								<Link
									to="/3/today"
									className="mt-3 block text-4xl tracking-[-0.05em]"
									style={{ fontFamily: '"IBM Plex Mono", monospace' }}
								>
									Reflection
								</Link>
							</div>
						</div>

						<nav
							aria-label="Terminal pages"
							className="space-y-3 text-sm"
							style={{ fontFamily: '"IBM Plex Mono", monospace' }}
						>
							{[
								["/3/today", "> today"],
								["/3/history", "> history"],
								["/3/dashboard", "> dashboard"],
							].map(([to, label]) => (
								<Link
									key={to}
									to={to}
									className="block text-[#96a184] hover:text-[#d8dbc9]"
									activeProps={{ className: "block text-[#d8dbc9]" }}
								>
									{label}
								</Link>
							))}
						</nav>
					</div>
				</aside>

				<div className="px-6 py-7 md:px-8">
					{children ?? <Outlet />}
					<footer
						className="mt-8 border-t border-[#262a22] pt-5 text-center text-sm text-[#96a184]"
						style={{ fontFamily: '"IBM Plex Mono", monospace' }}
					>
						TESTING
					</footer>
				</div>
			</div>
		</div>
	);
}
