import type { ReactNode } from "react";
import { StudyShell } from "./ReimaginedStudies";

export default function SlateShell({
	children,
}: {
	children?: ReactNode;
}) {
	return <StudyShell family={8}>{children}</StudyShell>;
}
