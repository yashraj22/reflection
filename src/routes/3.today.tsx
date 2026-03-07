import { createFileRoute } from "@tanstack/react-router";
import TerminalToday from "../components/design-studies/TerminalToday";

export const Route = createFileRoute("/3/today")({
	component: TerminalToday,
});
