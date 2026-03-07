import { createFileRoute } from "@tanstack/react-router";
import MatrixDashboard from "../components/design-studies/MatrixDashboard";

export const Route = createFileRoute("/10/dashboard")({
	component: MatrixDashboard,
});
