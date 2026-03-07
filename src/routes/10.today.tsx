import { createFileRoute } from "@tanstack/react-router";
import MatrixToday from "../components/design-studies/MatrixToday";

export const Route = createFileRoute("/10/today")({
	component: MatrixToday,
});
