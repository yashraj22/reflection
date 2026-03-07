import { Link, Outlet } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { DesignSwitcher } from "./shared";

export default function NewsprintShell({ children }: { children?: ReactNode }) {
	return (
		<div className="min-h-screen bg-[#e7dfd3] text-[#1a1714]">
			<div className="mx-auto max-w-[1540px] px-4 py-4 md:px-6 md:py-6">
				<div className="border border-[#b9ae9f] bg-[#fbf8f2] shadow-[0_10px_30px_rgba(36,24,12,0.08)]">
					<header className="border-b border-[#b9ae9f] px-6 py-5 md:px-8">
						<div className="space-y-5">
							<DesignSwitcher active={2} />
							<div className="grid gap-6 lg:grid-cols-[1fr_380px] lg:items-end">
								<div>
									<p className="text-center text-xs uppercase tracking-[0.28em] text-black/55">
										Daily Edition
									</p>
									<Link
										to="/2/today"
										className="mt-3 block text-center text-5xl tracking-[-0.06em] md:text-7xl"
										style={{ fontFamily: '"Fraunces", serif' }}
									>
										Reflection
									</Link>
								</div>

								<nav
									aria-label="Newsprint pages"
									className="grid gap-px border border-[#b9ae9f] bg-[#b9ae9f] sm:grid-cols-3"
									style={{ fontFamily: '"IBM Plex Mono", monospace' }}
								>
									{[
										["/2/today", "Today"],
										["/2/history", "History"],
										["/2/dashboard", "Dashboard"],
									].map(([to, label]) => (
										<Link
											key={to}
											to={to}
											className="bg-[#f3ece1] px-4 py-3 text-center text-sm text-black/64 hover:text-black"
											activeProps={{
												className:
													"bg-[#1a1714] px-4 py-3 text-center text-sm text-[#fbf8f2]",
											}}
										>
											{label}
										</Link>
									))}
								</nav>
							</div>
						</div>
					</header>

					<div className="px-6 py-6 md:px-8 md:py-8">
						{children ?? <Outlet />}
					</div>
					<footer className="border-t border-[#b9ae9f] px-6 py-4 text-center text-sm text-black/56 md:px-8">
						TESTING
					</footer>
				</div>
			</div>
		</div>
	);
}
