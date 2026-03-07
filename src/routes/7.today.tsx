import { createFileRoute } from "@tanstack/react-router";
import RibbonToday from "../components/design-studies/RibbonToday";

export const Route = createFileRoute("/7/today")({
	component: RibbonToday,
});
