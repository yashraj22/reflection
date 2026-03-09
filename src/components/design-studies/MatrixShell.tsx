import type { ReactNode } from "react";
import { StudyShell } from "./ReimaginedStudies";

export default function MatrixShell({
	children,
}: {
	children?: ReactNode;
}) {
	return <StudyShell family={10}>{children}</StudyShell>;
}
