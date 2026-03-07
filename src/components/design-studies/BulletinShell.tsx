import { Link, Outlet } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { DesignSwitcher } from "./shared";

export default function BulletinShell({ children }: { children?: ReactNode }) {
	return (
		<div className="min-h-screen bg-[#f4eee6] text-[#17120e]">
			<div className="mx-auto max-w-[1500px] px-6 py-8 lg:px-10">
				<header className="mb-8">
					<div className="grid gap-px overflow-hidden rounded-[26px] border border-black/10 bg-black/10 lg:grid-cols-[1fr_400px]">
						<div className="bg-[#17120e] px-6 py-6 text-[#f8f3ea] md:px-8">
							<div className="space-y-4">
								<DesignSwitcher active={5} dark />
								<Link
									to="/5/today"
									className="block text-5xl tracking-[-0.06em] md:text-7xl"
									style={{ fontFamily: '"Fraunces", serif' }}
								>
									Reflection
								</Link>
							</div>
						</div>
						<div className="bg-[#b85b3f] px-6 py-6 text-[#f8f3ea] md:px-8">
							<p className="max-w-sm text-sm leading-6 text-white/84">
								Bulletin board mode. Bigger statements, brighter blocks, less
								restraint.
							</p>
							<nav
								aria-label="Bulletin pages"
								className="mt-6 flex flex-wrap gap-5 text-sm"
							>
								{[
									["/5/today", "Today"],
									["/5/history", "History"],
									["/5/dashboard", "Dashboard"],
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
				<footer className="mt-8 rounded-[24px] border border-black/10 bg-[#17120e] px-6 py-4 text-center text-sm text-[#f8f3ea]">
					TESTING
				</footer>
			</div>
		</div>
	);
}
