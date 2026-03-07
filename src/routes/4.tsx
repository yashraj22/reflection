import { createFileRoute, Outlet } from "@tanstack/react-router";
import PlannerShell from "../components/design-studies/PlannerShell";

export const Route = createFileRoute("/4")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<PlannerShell>
			<Outlet />
		</PlannerShell>
	);
}
