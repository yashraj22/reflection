import { createFileRoute } from "@tanstack/react-router";
import BulletinHistory from "../components/design-studies/BulletinHistory";

export const Route = createFileRoute("/5/history")({
	component: BulletinHistory,
});
