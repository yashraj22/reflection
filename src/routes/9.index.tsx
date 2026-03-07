import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/9/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <Navigate to="/9/today" />;
}
