import { createFileRoute } from "@tanstack/react-router";
import SlateDashboard from "../components/design-studies/SlateDashboard";

export const Route = createFileRoute("/8/dashboard")({
	component: SlateDashboard,
});
