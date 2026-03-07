import { createFileRoute, Outlet } from "@tanstack/react-router";
import RibbonShell from "../components/design-studies/RibbonShell";

export const Route = createFileRoute("/7")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<RibbonShell>
			<Outlet />
		</RibbonShell>
	);
}
