import type { ReactNode } from "react";
import { StudyShell } from "./ReimaginedStudies";

export default function TerminalShell({
	children,
}: {
	children?: ReactNode;
}) {
	return <StudyShell family={3}>{children}</StudyShell>;
}
