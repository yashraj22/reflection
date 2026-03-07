import { Link, Outlet } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { DesignSwitcher } from "./shared";

export default function FolioShell({ children }: { children?: ReactNode }) {
	return (
		<div className="min-h-screen bg-[#f0e8de] text-[#17130f]">
			<div className="mx-auto max-w-[1500px] px-6 py-8 lg:px-10">
				<header className="mb-8 rounded-[22px] border border-black/10 bg-[#faf6ef] px-6 py-6">
					<div className="grid gap-6 lg:grid-cols-[1fr_420px] lg:items-end">
						<div className="space-y-4">
							<DesignSwitcher active={9} />
							<div>
								<Link
									to="/9/today"
									className="text-5xl tracking-[-0.06em] md:text-7xl"
									style={{ fontFamily: '"Fraunces", serif' }}
								>
									Reflection
								</Link>
								<p className="mt-3 max-w-lg text-sm text-black/56">
									Folio spread. Soft columns, stacked pages, and calmer pacing.
								</p>
							</div>
						</div>
						<nav
							aria-label="Folio pages"
							className="flex flex-wrap gap-5 text-sm text-black/56"
						>
							{[
								["/9/today", "Today"],
								["/9/history", "History"],
								["/9/dashboard", "Dashboard"],
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
				<footer className="mt-8 text-center text-sm text-black/52">
					TESTING
				</footer>
			</div>
		</div>
	);
}
