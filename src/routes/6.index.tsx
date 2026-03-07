import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/6/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <Navigate to="/6/today" />;
}
