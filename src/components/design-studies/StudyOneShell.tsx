import { Link, Outlet } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { DesignSwitcher } from "./shared";

export default function StudyOneShell({ children }: { children?: ReactNode }) {
	return (
		<div className="min-h-screen bg-[#f4eee4] text-[#231c16]">
			<div className="mx-auto max-w-[1280px] px-5 py-8 lg:px-8">
				<header className="mb-12 space-y-6">
					<DesignSwitcher active={1} />
					<div
						className="pb-8 border-b-2 border-black/15"
						style={{
							backgroundImage:
								"linear-gradient(to bottom, rgba(101,82,58,0.05) 1px, transparent 1px)",
							backgroundSize: "100% 32px",
						}}
					>
						<Link
							to="/1/today"
							className="inline-block text-5xl tracking-[-0.05em] md:text-6xl leading-none"
							style={{ fontFamily: '"Fraunces", serif' }}
						>
							Reflection
						</Link>
						<p className="mt-4 text-sm text-black/60 max-w-lg leading-relaxed">
							Quiet structure with Fraunces grid. Direction, clarity, and daily review in one place.
						</p>
					</div>

					<nav
						aria-label="Study one pages"
						className="flex gap-6 text-sm"
					>
						{[
							["/1/today", "Today"],
							["/1/history", "History"],
							["/1/dashboard", "Dashboard"],
						].map(([to, label]) => (
							<Link
								key={to}
								to={to}
								className="px-3 py-2 border-b-2 border-transparent text-black/60 hover:text-black hover:border-black/40 transition-colors"
								activeProps={{
									className: "px-3 py-2 border-b-2 border-black text-black font-medium",
								}}
							>
								{label}
							</Link>
						))}
					</nav>
				</header>

				{children ?? <Outlet />}
			</div>
		</div>
	);
}
