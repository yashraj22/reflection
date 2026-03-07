import { createFileRoute, Outlet } from "@tanstack/react-router";
import NewsprintShell from "../components/design-studies/NewsprintShell";

export const Route = createFileRoute("/2")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<NewsprintShell>
			<Outlet />
		</NewsprintShell>
	);
}
