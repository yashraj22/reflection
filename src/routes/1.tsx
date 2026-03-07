import { createFileRoute, Outlet } from "@tanstack/react-router";
import StudyOneShell from "../components/design-studies/StudyOneShell";

export const Route = createFileRoute("/1")({
	component: StudyOneRoute,
});

function StudyOneRoute() {
	return (
		<StudyOneShell>
			<Outlet />
		</StudyOneShell>
	);
}
