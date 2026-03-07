import { createFileRoute, Outlet } from "@tanstack/react-router";
import BulletinShell from "../components/design-studies/BulletinShell";

export const Route = createFileRoute("/5")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<BulletinShell>
			<Outlet />
		</BulletinShell>
	);
}
