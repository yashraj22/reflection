import { createFileRoute } from "@tanstack/react-router";
import PlannerToday from "../components/design-studies/PlannerToday";

export const Route = createFileRoute("/4/today")({
	component: PlannerToday,
});
