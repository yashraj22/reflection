import { Link, Outlet } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { DesignSwitcher } from "./shared";

export default function NotebookShell({ children }: { children?: ReactNode }) {
	return (
		<div className="min-h-screen bg-[#f4efe7] text-[#1d1915]">
			<div className="mx-auto max-w-[960px] px-5 py-7">
				<header className="mb-9 space-y-5 border-b border-black/10 pb-7">
					<DesignSwitcher active={6} />
					<div className="text-center">
						<Link
							to="/6/today"
							className="text-5xl tracking-[-0.07em] md:text-6xl"
							style={{ fontFamily: '"Instrument Serif", serif' }}
						>
							Reflection
						</Link>
						<nav
							aria-label="Notebook pages"
							className="mt-5 flex flex-wrap justify-center gap-2 text-sm text-black/55"
						>
							{[
								["/6/today", "Today"],
								["/6/history", "History"],
								["/6/dashboard", "Dashboard"],
							].map(([to, label]) => (
								<Link
									key={to}
									to={to}
									className="inline-flex min-h-11 items-center rounded-full border border-black/10 px-3 py-2 transition-colors hover:border-black/20 hover:text-black"
									activeProps={{
										className:
											"inline-flex min-h-11 items-center rounded-full border border-black/20 bg-black/[0.04] px-3 py-2 text-black",
									}}
								>
									{label}
								</Link>
							))}
						</nav>
					</div>
				</header>

				{children ?? <Outlet />}
			</div>
		</div>
	);
}
