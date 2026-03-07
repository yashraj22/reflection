import { createFileRoute } from "@tanstack/react-router";
import ConvexSetupNotice from "../components/ConvexSetupNotice";
import HistoryPage from "../components/HistoryPage";
import { isConvexConfigured } from "../lib/convex";

export const Route = createFileRoute("/history")({
	component: HistoryRoute,
});

function HistoryRoute() {
	return isConvexConfigured ? <HistoryPage /> : <ConvexSetupNotice />;
}
