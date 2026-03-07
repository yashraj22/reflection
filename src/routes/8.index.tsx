import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/8/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <Navigate to="/8/today" />;
}
