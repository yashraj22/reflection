import { Link, Outlet } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { DesignSwitcher } from "./shared";

export default function SlateShell({ children }: { children?: ReactNode }) {
	return (
		<div className="min-h-screen bg-[#121311] text-[#ded9cd]">
			<div className="mx-auto max-w-[1520px] px-5 py-5 lg:px-7">
				<header className="mb-6 rounded-[18px] border border-[#2a2d28] bg-[#171916] px-6 py-5">
					<div className="grid gap-6 lg:grid-cols-[1fr_430px] lg:items-end">
						<div className="space-y-4">
							<DesignSwitcher active={8} dark />
							<div>
								<Link
									to="/8/today"
									className="text-4xl tracking-[-0.05em] md:text-6xl"
									style={{ fontFamily: '"Manrope", sans-serif' }}
								>
									Reflection
								</Link>
								<p className="mt-3 max-w-lg text-sm text-[#99a18d]">
									Slate board. Dark surface, thin lines, low-noise modules.
								</p>
							</div>
						</div>
						<nav
							aria-label="Slate pages"
							className="grid gap-px overflow-hidden rounded-[12px] border border-[#2a2d28] bg-[#2a2d28] sm:grid-cols-3"
						>
							{[
								["/8/today", "Today"],
								["/8/history", "History"],
								["/8/dashboard", "Dashboard"],
							].map(([to, label]) => (
								<Link
									key={to}
									to={to}
									className="bg-[#171916] px-4 py-3 text-sm text-[#99a18d] hover:text-[#ded9cd]"
									activeProps={{
										className: "bg-[#ded9cd] px-4 py-3 text-sm text-[#121311]",
									}}
								>
									{label}
								</Link>
							))}
						</nav>
					</div>
				</header>

				{children ?? <Outlet />}
				<footer className="mt-6 rounded-[18px] border border-[#2a2d28] bg-[#171916] px-6 py-4 text-center text-sm text-[#99a18d]">
					TESTING
				</footer>
			</div>
		</div>
	);
}
