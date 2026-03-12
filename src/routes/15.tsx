import { createFileRoute } from "@tanstack/react-router";
import ConvexSetupNotice from "../components/ConvexSetupNotice";
import JournalExperiment from "../components/JournalExperiment";
import { isConvexConfigured } from "../lib/convex";

export const Route = createFileRoute("/15")({
	component: RouteComponent,
});

function RouteComponent() {
	return isConvexConfigured ? (
		<JournalExperiment variant={15} />
	) : (
		<ConvexSetupNotice />
	);
}
