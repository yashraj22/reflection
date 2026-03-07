import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/4/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <Navigate to="/4/today" />;
}
