import { createFileRoute, Outlet } from "@tanstack/react-router";
import ConvexSetupNotice from "../components/ConvexSetupNotice";
import { isConvexConfigured } from "../lib/convex";

export const Route = createFileRoute("/history")({
	component: HistoryRoute,
});

function HistoryRoute() {
	return isConvexConfigured ? <Outlet /> : <ConvexSetupNotice />;
}
