import { createFileRoute } from "@tanstack/react-router";
import RibbonDashboard from "../components/design-studies/RibbonDashboard";

export const Route = createFileRoute("/7/dashboard")({
	component: RibbonDashboard,
});
