import { createFileRoute } from "@tanstack/react-router";
import StudyOneDashboard from "../components/design-studies/StudyOneDashboard";

export const Route = createFileRoute("/1/dashboard")({
	component: StudyOneDashboard,
});
