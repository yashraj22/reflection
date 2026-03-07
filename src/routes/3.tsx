import { createFileRoute, Outlet } from "@tanstack/react-router";
import TerminalShell from "../components/design-studies/TerminalShell";

export const Route = createFileRoute("/3")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<TerminalShell>
			<Outlet />
		</TerminalShell>
	);
}
