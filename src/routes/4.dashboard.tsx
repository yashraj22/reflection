import { createFileRoute } from "@tanstack/react-router";
import PlannerDashboard from "../components/design-studies/PlannerDashboard";

export const Route = createFileRoute("/4/dashboard")({
	component: PlannerDashboard,
});
