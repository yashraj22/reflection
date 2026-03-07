import { createFileRoute } from "@tanstack/react-router";
import RibbonHistory from "../components/design-studies/RibbonHistory";

export const Route = createFileRoute("/7/history")({
	component: RibbonHistory,
});
