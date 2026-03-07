import { createFileRoute } from "@tanstack/react-router";
import StudyOneToday from "../components/design-studies/StudyOneToday";

export const Route = createFileRoute("/1/today")({
	component: StudyOneToday,
});
