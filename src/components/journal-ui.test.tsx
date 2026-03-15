// @vitest-environment jsdom

import { readFileSync } from "node:fs";
import { cleanup, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockUseQuery = vi.fn();
const mockUseConvexMutation = vi.fn();

vi.mock("@tanstack/react-query", () => ({
	useQuery: (...args: unknown[]) => mockUseQuery(...args),
}));

vi.mock("@convex-dev/react-query", () => ({
	convexQuery: vi.fn(() => ({})),
	useConvexMutation: (...args: unknown[]) => mockUseConvexMutation(...args),
}));

vi.mock("@tanstack/react-router", () => ({
	Link: ({
		to,
		params,
		search,
		className,
		children,
	}: {
		to: string;
		params?: { dateKey?: string };
		search?: { date?: string };
		className?: string;
		children: ReactNode;
	}) => {
		let href = to;
		if (params?.dateKey) {
			href = href.replace("$dateKey", params.dateKey);
		}
		if (search?.date) {
			href = `${href}?date=${search.date}`;
		}
		return (
			<a href={href} className={className}>
				{children}
			</a>
		);
	},
}));

import HistoryPage from "./HistoryPage";
import JournalEntryReview from "./JournalEntryReview";

describe("journal history flow", () => {
	beforeEach(() => {
		cleanup();
		mockUseQuery.mockReset();
		mockUseConvexMutation.mockReset();
		mockUseConvexMutation.mockReturnValue(vi.fn());
	});

	it("renders history cards that point to the read-only entry route", () => {
		mockUseQuery.mockReturnValue({
			isPending: false,
			error: null,
			data: {
				entries: [
					{
						_id: "entry-1",
						dateKey: "2026-03-10",
						excerpt: "A solid day of progress.",
						mood: 4,
						energy: 3,
						progress: 4,
					},
				],
				summary: {
					totalReflections: 1,
					activeGoals: 2,
					completedGoals: 5,
					topThemes: [{ label: "Focus", count: 3 }],
				},
			},
		});

		render(<HistoryPage />);

		expect(screen.getByText("Read-only entry")).toBeTruthy();
		expect(
			screen.getByRole("link", { name: /review entry/i }).getAttribute("href"),
		).toBe("/history/2026-03-10");
	});

	it("keeps history as a layout route with an index child", () => {
		const historyRouteSource = readFileSync("src/routes/history.tsx", "utf8");
		const historyIndexRouteSource = readFileSync(
			"src/routes/history.index.tsx",
			"utf8",
		);

		expect(historyRouteSource).toContain('import { createFileRoute, Outlet }');
		expect(historyRouteSource).toContain("return isConvexConfigured ? <Outlet />");
		expect(historyIndexRouteSource).toContain('createFileRoute("/history/")');
		expect(historyIndexRouteSource).toContain("return <HistoryPage />;");
	});

	it("keeps support collapsed by default in the home-screen implementation", () => {
		const source = readFileSync("src/components/JournalToday.tsx", "utf8");

		expect(source).toContain(
			'const [isSupportOpen, setSupportOpen] = useState(false);',
		);
		expect(source).toContain(
			'const SUPPORT_SUMMARY = "Prompts, follow-up, and recent context.";',
		);
		expect(source).toContain("pattern-strip-grid");
		expect(source).not.toContain("dashboard-sidebar");
	});

	it("keeps prompt actions inside the support disclosure", () => {
		const source = readFileSync("src/components/JournalToday.tsx", "utf8");

		expect(source).toContain('{isSupportOpen ? (');
		expect(source).toContain('<p className="section-kicker">Prompts</p>');
		expect(source).toContain('{promptPrimary.map((prompt) => (');
		expect(source).toContain('{promptSecondary.length > 0 ? (');
	});

	it("renders past entries without editable inputs", () => {
		mockUseQuery.mockReturnValue({
			isPending: false,
			error: null,
			data: {
				todayReflection: {
					_id: "reflection-1",
					dateKey: "2026-03-10",
					intention: "Finish the hard part first.",
					reflection: "I finally stopped context switching.",
					summary: "Less busy, more useful.",
					win: "Closed the main task.",
					blocker: "Late start.",
					tomorrowFocus: "Begin before messages.",
					mood: 4,
					energy: 3,
					progress: 4,
					themes: [{ slug: "focus", label: "Focus" }],
					completionScore: 89,
				},
				contextLines: ["You have checked in 3 days in a row."],
			},
		});

		render(<JournalEntryReview dateKey="2026-03-10" />);

		expect(screen.getAllByText("Read-only entry").length).toBeGreaterThan(0);
		expect(screen.queryByRole("textbox")).toBeNull();
		expect(screen.getByText("Finish the hard part first.")).toBeTruthy();
		expect(screen.queryByText("Signals")).toBeNull();
	});
});
