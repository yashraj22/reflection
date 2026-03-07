import { createFileRoute, Outlet } from "@tanstack/react-router";
import FolioShell from "../components/design-studies/FolioShell";

export const Route = createFileRoute("/9")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<FolioShell>
			<Outlet />
		</FolioShell>
	);
}
