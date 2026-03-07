import { createFileRoute } from "@tanstack/react-router";
import NewsprintDashboard from "../components/design-studies/NewsprintDashboard";

export const Route = createFileRoute("/2/dashboard")({
	component: NewsprintDashboard,
});
