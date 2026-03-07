import { createFileRoute } from "@tanstack/react-router";
import PlannerHistory from "../components/design-studies/PlannerHistory";

export const Route = createFileRoute("/4/history")({
	component: PlannerHistory,
});
