import { createFileRoute } from "@tanstack/react-router";
import FolioDashboard from "../components/design-studies/FolioDashboard";

export const Route = createFileRoute("/9/dashboard")({
	component: FolioDashboard,
});
