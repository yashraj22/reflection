import type { ReactNode } from "react";
import { StudyShell } from "./ReimaginedStudies";

export default function FolioShell({
	children,
}: {
	children?: ReactNode;
}) {
	return <StudyShell family={9}>{children}</StudyShell>;
}
