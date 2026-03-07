import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/2/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <Navigate to="/2/today" />;
}
