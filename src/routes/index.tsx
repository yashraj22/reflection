import { createFileRoute } from "@tanstack/react-router";
import ConvexSetupNotice from "../components/ConvexSetupNotice";
import JournalDashboard from "../components/JournalDashboard";
import { isConvexConfigured } from "../lib/convex";

export const Route = createFileRoute("/")({
	validateSearch: (search: Record<string, unknown>) => ({
		date: typeof search.date === "string" ? search.date : undefined,
	}),
	component: Home,
});

function Home() {
	const { date } = Route.useSearch();

	return isConvexConfigured ? (
		<JournalDashboard dateKey={date} />
	) : (
		<ConvexSetupNotice />
	);
}
