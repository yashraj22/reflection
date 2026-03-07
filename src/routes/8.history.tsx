import { createFileRoute } from "@tanstack/react-router";
import SlateHistory from "../components/design-studies/SlateHistory";

export const Route = createFileRoute("/8/history")({
	component: SlateHistory,
});
