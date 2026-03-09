import type { ReactNode } from "react";
import { StudyShell } from "./ReimaginedStudies";

export default function BulletinShell({
	children,
}: {
	children?: ReactNode;
}) {
	return <StudyShell family={5}>{children}</StudyShell>;
}
