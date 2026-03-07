import { Link, Outlet } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { DesignSwitcher } from "./shared";

export default function RibbonShell({ children }: { children?: ReactNode }) {
	return (
		<div className="min-h-screen bg-[#eee7db] text-[#1d1713]">
			<div className="mx-auto max-w-[1540px] px-6 py-8 lg:px-10">
				<header className="mb-8 space-y-5">
					<DesignSwitcher active={7} />
					<div className="grid gap-px overflow-hidden rounded-[22px] border border-black/10 bg-black/10 lg:grid-cols-[1fr_420px]">
						<div className="bg-[#f6efe4] px-6 py-6">
							<Link
								to="/7/today"
								className="text-5xl tracking-[-0.06em] md:text-7xl"
								style={{ fontFamily: '"Fraunces", serif' }}
							>
								Reflection
							</Link>
						</div>
						<div className="bg-[#7f5c44] px-6 py-6 text-[#f6efe4]">
							<nav
								aria-label="Ribbon pages"
								className="flex flex-wrap gap-5 text-sm"
							>
								{[
									["/7/today", "Today"],
									["/7/history", "History"],
									["/7/dashboard", "Dashboard"],
								].map(([to, label]) => (
									<Link
										key={to}
										to={to}
										className="border-b border-transparent pb-1 hover:border-current"
										activeProps={{ className: "border-b border-current pb-1" }}
									>
										{label}
									</Link>
								))}
							</nav>
						</div>
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
