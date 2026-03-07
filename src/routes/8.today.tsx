import { createFileRoute } from "@tanstack/react-router";
import SlateToday from "../components/design-studies/SlateToday";

export const Route = createFileRoute("/8/today")({
	component: SlateToday,
});
