import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/10/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <Navigate to="/10/today" />;
}
