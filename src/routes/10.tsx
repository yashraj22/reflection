import { createFileRoute, Outlet } from "@tanstack/react-router";
import MatrixShell from "../components/design-studies/MatrixShell";

export const Route = createFileRoute("/10")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<MatrixShell>
			<Outlet />
		</MatrixShell>
	);
}
