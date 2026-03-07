import { createFileRoute } from "@tanstack/react-router";
import TerminalDashboard from "../components/design-studies/TerminalDashboard";

export const Route = createFileRoute("/3/dashboard")({
	component: TerminalDashboard,
});
