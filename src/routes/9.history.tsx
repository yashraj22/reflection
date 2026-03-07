import { createFileRoute } from "@tanstack/react-router";
import FolioHistory from "../components/design-studies/FolioHistory";

export const Route = createFileRoute("/9/history")({
	component: FolioHistory,
});
