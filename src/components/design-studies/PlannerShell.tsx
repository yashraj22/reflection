import type { ReactNode } from "react";
import { StudyShell } from "./ReimaginedStudies";

export default function PlannerShell({
	children,
}: {
	children?: ReactNode;
}) {
	return <StudyShell family={4}>{children}</StudyShell>;
}
