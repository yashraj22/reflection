import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/7/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <Navigate to="/7/today" />;
}
