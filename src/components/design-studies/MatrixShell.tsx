import { Link, Outlet } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { DesignSwitcher } from "./shared";

export default function MatrixShell({ children }: { children?: ReactNode }) {
	return (
		<div className="min-h-screen bg-[#f2ece3] text-[#17120e]">
			<div className="mx-auto max-w-[1540px] px-5 py-5 lg:px-7">
				<header className="mb-6 rounded-[18px] border border-black/10 bg-white px-6 py-5">
					<div className="space-y-5">
						<DesignSwitcher active={10} />
						<div className="grid gap-px overflow-hidden rounded-[14px] border border-black/10 bg-black/10 lg:grid-cols-[1fr_420px]">
							<div className="bg-[#f3e7da] px-6 py-6">
								<Link
									to="/10/today"
									className="text-5xl tracking-[-0.06em] md:text-7xl"
									style={{ fontFamily: '"Fraunces", serif' }}
								>
									Reflection
								</Link>
							</div>
							<div className="bg-[#1a1714] px-6 py-6 text-[#f8f3ea]">
								<nav
									aria-label="Matrix pages"
									className="flex flex-wrap gap-5 text-sm"
								>
									{[
										["/10/today", "Today"],
										["/10/history", "History"],
										["/10/dashboard", "Dashboard"],
									].map(([to, label]) => (
										<Link
											key={to}
											to={to}
											className="border-b border-transparent pb-1 hover:border-current"
											activeProps={{
												className: "border-b border-current pb-1",
											}}
										>
											{label}
										</Link>
									))}
								</nav>
							</div>
						</div>
					</div>
				</header>

				{children ?? <Outlet />}
				<footer className="mt-6 rounded-[18px] border border-black/10 bg-white px-6 py-4 text-center text-sm text-black/56">
					TESTING
				</footer>
			</div>
		</div>
	);
}
