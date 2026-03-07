import { createFileRoute } from "@tanstack/react-router";
import NewsprintToday from "../components/design-studies/NewsprintToday";

export const Route = createFileRoute("/2/today")({
	component: NewsprintToday,
});
