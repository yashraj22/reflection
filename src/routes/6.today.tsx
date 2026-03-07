import { createFileRoute } from "@tanstack/react-router";
import NotebookToday from "../components/design-studies/NotebookToday";

export const Route = createFileRoute("/6/today")({
	component: NotebookToday,
});
