import type { ReactNode } from "react";
import { StudyShell } from "./ReimaginedStudies";

export default function RibbonShell({
	children,
}: {
	children?: ReactNode;
}) {
	return <StudyShell family={7}>{children}</StudyShell>;
}
