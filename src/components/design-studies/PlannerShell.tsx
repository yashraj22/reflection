import { Link, Outlet } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { DesignSwitcher } from "./shared";

export default function PlannerShell({ children }: { children?: ReactNode }) {
	return (
		<div className="min-h-screen bg-[#ebe7dc] text-[#21211d]">
			<div className="mx-auto max-w-[1520px] px-5 py-5 lg:px-7">
				<header className="mb-6 rounded-[20px] border border-black/10 bg-[#faf6ee] px-6 py-5">
					<div className="grid gap-6 lg:grid-cols-[1fr_430px] lg:items-end">
						<div className="space-y-4">
							<DesignSwitcher active={4} />
							<div>
								<Link
									to="/4/today"
									className="text-4xl font-semibold tracking-[-0.05em] md:text-6xl"
									style={{ fontFamily: '"Manrope", sans-serif' }}
								>
									Reflection
								</Link>
								<p className="mt-3 max-w-lg text-sm text-black/56">
									Planner view. Structured lanes, explicit modules, less drift.
								</p>
							</div>
						</div>

						<nav
							aria-label="Planner pages"
							className="grid gap-px overflow-hidden rounded-[12px] border border-black/10 bg-black/10 sm:grid-cols-3"
						>
							{[
								["/4/today", "Today"],
								["/4/history", "History"],
								["/4/dashboard", "Dashboard"],
							].map(([to, label]) => (
								<Link
									key={to}
									to={to}
									className="bg-[#e7e2d4] px-4 py-3 text-sm text-black/58 hover:text-black"
									activeProps={{
										className: "bg-[#21211d] px-4 py-3 text-sm text-[#faf6ee]",
									}}
								>
									{label}
								</Link>
							))}
						</nav>
					</div>
				</header>

				{children ?? <Outlet />}
				<footer className="mt-6 rounded-[20px] border border-black/10 bg-[#faf6ee] px-6 py-4 text-center text-sm text-black/56">
					TESTING
				</footer>
			</div>
		</div>
	);
}
