import { Link, Outlet } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { DesignSwitcher } from "./shared";

export default function NotebookShell({ children }: { children?: ReactNode }) {
	return (
		<div className="min-h-screen bg-[#f4efe7] text-[#1d1915]">
			<div className="mx-auto max-w-[900px] px-6 py-10">
				<header className="mb-12 space-y-7 text-center border-b-2 border-black/12 pb-8">
					<DesignSwitcher active={6} />
					<div className="space-y-5">
						<Link
							to="/6/today"
							className="block text-5xl md:text-6xl tracking-[-0.08em] leading-none"
							style={{ fontFamily: '"Instrument Serif", serif', fontWeight: 400 }}
						>
							Reflection
						</Link>
						<p className="text-sm text-black/60 max-w-md mx-auto leading-relaxed">
							Intimate space for writing, thinking, and reviewing. One entry at a time.
						</p>
					</div>

					<nav
						aria-label="Notebook pages"
						className="flex justify-center gap-8 text-sm pt-2"
					>
						{[
							["/6/today", "Today"],
							["/6/history", "History"],
							["/6/dashboard", "Dashboard"],
						].map(([to, label]) => (
							<Link
								key={to}
								to={to}
								className="px-2 py-1 border-b-2 border-transparent text-black/55 hover:text-black/75 transition-colors"
								activeProps={{
									className: "px-2 py-1 border-b-2 border-black/40 text-black font-medium",
								}}
							>
								{label}
							</Link>
						))}
					</nav>
				</header>

				<main className="space-y-8">
					{children ?? <Outlet />}
				</main>
			</div>
		</div>
	);
}
