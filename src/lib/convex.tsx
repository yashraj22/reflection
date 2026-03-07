import { ConvexQueryClient } from "@convex-dev/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { useState } from "react";

const convexUrl = import.meta.env.VITE_CONVEX_URL as string | undefined;

export const isConvexConfigured = Boolean(convexUrl);

function createClients() {
	const queryClient = new QueryClient();

	if (!convexUrl) {
		return {
			queryClient,
			convexClient: null,
		};
	}

	const convexClient = new ConvexReactClient(convexUrl);
	const convexQueryClient = new ConvexQueryClient(convexClient);

	queryClient.setDefaultOptions({
		queries: {
			queryKeyHashFn: convexQueryClient.hashFn(),
			queryFn: convexQueryClient.queryFn(),
			staleTime: Number.POSITIVE_INFINITY,
			gcTime: 1000 * 60 * 10,
			retry: 1,
		},
	});

	convexQueryClient.connect(queryClient);

	return {
		queryClient,
		convexClient,
	};
}

export function AppProviders({ children }: { children: React.ReactNode }) {
	const [{ queryClient, convexClient }] = useState(createClients);

	return (
		<QueryClientProvider client={queryClient}>
			{convexClient ? (
				<ConvexProvider client={convexClient}>{children}</ConvexProvider>
			) : (
				children
			)}
		</QueryClientProvider>
	);
}
