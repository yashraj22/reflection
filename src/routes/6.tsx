import { createFileRoute, Outlet } from "@tanstack/react-router";
import NotebookShell from "../components/design-studies/NotebookShell";

export const Route = createFileRoute("/6")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<NotebookShell>
			<Outlet />
		</NotebookShell>
	);
}
