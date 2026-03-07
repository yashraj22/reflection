import { createFileRoute } from "@tanstack/react-router";
import StudyOneHistory from "../components/design-studies/StudyOneHistory";

export const Route = createFileRoute("/1/history")({
	component: StudyOneHistory,
});
