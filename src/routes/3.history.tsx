import { createFileRoute } from "@tanstack/react-router";
import TerminalHistory from "../components/design-studies/TerminalHistory";

export const Route = createFileRoute("/3/history")({
	component: TerminalHistory,
});
