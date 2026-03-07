import { createFileRoute } from "@tanstack/react-router";
import NotebookDashboard from "../components/design-studies/NotebookDashboard";

export const Route = createFileRoute("/6/dashboard")({
	component: NotebookDashboard,
});
