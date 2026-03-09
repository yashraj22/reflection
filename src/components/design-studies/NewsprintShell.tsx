import type { ReactNode } from "react";
import { StudyShell } from "./ReimaginedStudies";

export default function NewsprintShell({
	children,
}: {
	children?: ReactNode;
}) {
	return <StudyShell family={2}>{children}</StudyShell>;
}
