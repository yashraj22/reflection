import { createFileRoute } from "@tanstack/react-router";
import NewsprintHistory from "../components/design-studies/NewsprintHistory";

export const Route = createFileRoute("/2/history")({
	component: NewsprintHistory,
});
