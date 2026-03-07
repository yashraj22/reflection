import { createFileRoute } from "@tanstack/react-router";
import BulletinDashboard from "../components/design-studies/BulletinDashboard";

export const Route = createFileRoute("/5/dashboard")({
	component: BulletinDashboard,
});
