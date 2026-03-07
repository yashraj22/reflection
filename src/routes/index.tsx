import { createFileRoute } from "@tanstack/react-router";
import ConvexSetupNotice from "../components/ConvexSetupNotice";
import JournalDashboard from "../components/JournalDashboard";
import { isConvexConfigured } from "../lib/convex";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return isConvexConfigured ? <JournalDashboard /> : <ConvexSetupNotice />;
}
