import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/3/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <Navigate to="/3/today" />;
}
