import { Link, Outlet } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { DesignSwitcher } from "./shared";

export default function StudyOneShell({ children }: { children?: ReactNode }) {
	return (
		<div className="min-h-screen bg-[#f4eee4] text-[#231c16]">
			<div
				className="mx-auto max-w-[1280px] px-5 py-6 lg:px-8"
				style={{
					backgroundImage:
						"linear-gradient(to bottom, rgba(101,82,58,0.045) 1px, transparent 1px)",
					backgroundSize: "100% 34px",
				}}
			>
				<header className="mb-8 border-b border-black/10 pb-6">
					<div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
						<div className="space-y-4">
							<DesignSwitcher active={1} />
							<div>
								<Link
									to="/1/today"
									className="text-5xl tracking-[-0.05em] md:text-6xl"
									style={{ fontFamily: '"Fraunces", serif' }}
								>
									Reflection
								</Link>
								<p className="mt-2 text-sm text-black/58">
									Quiet structure for the day, the archive, and the review.
								</p>
							</div>
						</div>

						<nav
							aria-label="Study one pages"
							className="flex flex-wrap gap-2 text-sm text-black/56"
						>
							{[
								["/1/today", "Today"],
								["/1/history", "History"],
								["/1/dashboard", "Dashboard"],
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
