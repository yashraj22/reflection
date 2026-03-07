import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/1/")({
	component: StudyOneIndexRoute,
});

function StudyOneIndexRoute() {
	return <Navigate to="/1/today" />;
}
