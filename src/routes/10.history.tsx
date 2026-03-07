import { createFileRoute } from "@tanstack/react-router";
import MatrixHistory from "../components/design-studies/MatrixHistory";

export const Route = createFileRoute("/10/history")({
	component: MatrixHistory,
});
