import { createFileRoute } from "@tanstack/react-router";
import FolioToday from "../components/design-studies/FolioToday";

export const Route = createFileRoute("/9/today")({
	component: FolioToday,
});
