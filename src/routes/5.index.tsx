import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/5/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <Navigate to="/5/today" />;
}
