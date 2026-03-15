import { createFileRoute } from "@tanstack/react-router";
import ConvexSetupNotice from "../components/ConvexSetupNotice";
import JournalEntryReview from "../components/JournalEntryReview";
import { isConvexConfigured } from "../lib/convex";

export const Route = createFileRoute("/history/$dateKey")({
	component: HistoryEntryRoute,
});

function HistoryEntryRoute() {
	const { dateKey } = Route.useParams();

	return isConvexConfigured ? (
		<JournalEntryReview dateKey={dateKey} />
	) : (
		<ConvexSetupNotice />
	);
}
