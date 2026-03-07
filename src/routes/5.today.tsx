import { createFileRoute } from "@tanstack/react-router";
import BulletinToday from "../components/design-studies/BulletinToday";

export const Route = createFileRoute("/5/today")({
	component: BulletinToday,
});
