import { createFileRoute } from "@tanstack/react-router";
import NotebookHistory from "../components/design-studies/NotebookHistory";

export const Route = createFileRoute("/6/history")({
	component: NotebookHistory,
});
