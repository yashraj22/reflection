import { Link, Outlet } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { DesignSwitcher } from "./shared";

export default function NotebookShell({ children }: { children?: ReactNode }) {
	return (
		<div className="min-h-screen bg-[#f4efe7] text-[#1d1915]">
			<div className="mx-auto max-w-[980px] px-5 py-8">
				<header className="mb-10 space-y-5">
					<DesignSwitcher active={6} />
					<div className="border-y border-black/10 py-8 text-center">
						<Link
							to="/6/today"
							className="text-5xl tracking-[-0.07em] md:text-7xl"
							style={{ fontFamily: '"Instrument Serif", serif' }}
						>
							Reflection
						</Link>
						<nav
							aria-label="Notebook pages"
							className="mt-5 flex justify-center gap-6 text-sm text-black/55"
						>
							{[
								["/6/today", "Today"],
								["/6/history", "History"],
								["/6/dashboard", "Dashboard"],
							].map(([to, label]) => (
								<Link
									key={to}
									to={to}
									className="border-b border-transparent pb-1 hover:border-current hover:text-black"
									activeProps={{
										className: "border-b border-current pb-1 text-black",
									}}
								>
									{label}
								</Link>
							))}
						</nav>
					</div>
				</header>

				{children ?? <Outlet />}
				<footer className="mt-10 text-center text-sm text-black/52">
					TESTING
				</footer>
			</div>
		</div>
	);
}
