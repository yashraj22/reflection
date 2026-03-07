import { Link, Outlet } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { DesignSwitcher } from "./shared";

export default function StudyOneShell({ children }: { children?: ReactNode }) {
	return (
		<div className="min-h-screen bg-[#f4eee4] text-[#231c16]">
			<div
				className="mx-auto max-w-[1400px] px-6 py-8 lg:px-10"
				style={{
					backgroundImage:
						"linear-gradient(to bottom, rgba(101,82,58,0.05) 1px, transparent 1px)",
					backgroundSize: "100% 34px",
				}}
			>
				<header className="mb-8 flex flex-wrap items-start justify-between gap-6 border-b border-black/10 pb-6">
					<div className="space-y-4">
						<DesignSwitcher active={1} />
						<div>
							<Link
								to="/1/today"
								className="text-5xl tracking-[-0.05em] md:text-7xl"
								style={{ fontFamily: '"Fraunces", serif' }}
							>
								Reflection
							</Link>
							<p className="mt-3 max-w-xl text-sm text-black/65">
								Direction, writing, and review.
							</p>
						</div>
					</div>

					<nav
						aria-label="Study one pages"
						className="flex flex-wrap gap-5 text-sm text-black/55"
					>
						<Link
							to="/1/today"
							className="border-b border-transparent pb-1 hover:border-current hover:text-black"
							activeProps={{
								className: "border-b border-current pb-1 text-black",
							}}
						>
							Today
						</Link>
						<Link
							to="/1/history"
							className="border-b border-transparent pb-1 hover:border-current hover:text-black"
							activeProps={{
								className: "border-b border-current pb-1 text-black",
							}}
						>
							History
						</Link>
						<Link
							to="/1/dashboard"
							className="border-b border-transparent pb-1 hover:border-current hover:text-black"
							activeProps={{
								className: "border-b border-current pb-1 text-black",
							}}
						>
							Dashboard
						</Link>
					</nav>
				</header>

				{children ?? <Outlet />}
			</div>
		</div>
	);
}
