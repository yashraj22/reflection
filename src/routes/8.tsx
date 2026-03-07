import { createFileRoute, Outlet } from "@tanstack/react-router";
import SlateShell from "../components/design-studies/SlateShell";

export const Route = createFileRoute("/8")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<SlateShell>
			<Outlet />
		</SlateShell>
	);
}
