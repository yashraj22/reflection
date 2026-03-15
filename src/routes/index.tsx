import { createFileRoute, Navigate } from "@tanstack/react-router";
import ConvexSetupNotice from "../components/ConvexSetupNotice";
import JournalToday from "../components/JournalToday";
import { isDateKey } from "../lib/date";
import { isConvexConfigured } from "../lib/convex";

export const Route = createFileRoute("/")({
	validateSearch: (search: Record<string, unknown>) => ({
		date: typeof search.date === "string" ? search.date : undefined,
	}),
	component: Home,
});

function Home() {
	const { date } = Route.useSearch();

	if (date && isDateKey(date)) {
		return (
			<Navigate
				to="/history/$dateKey"
				params={{ dateKey: date }}
				replace
			/>
		);
	}

	return isConvexConfigured ? (
		<JournalToday />
	) : (
		<ConvexSetupNotice />
	);
}
