import { useEffect, useState } from "react";

type ThemeMode = "light" | "dark" | "auto";
const STORAGE_KEY = "northstar-theme:v1";

function getInitialMode(): ThemeMode {
	if (typeof window === "undefined") {
		return "auto";
	}

	try {
		const stored = window.localStorage.getItem(STORAGE_KEY);
		if (stored === "light" || stored === "dark" || stored === "auto") {
			return stored;
		}
	} catch {
		return "auto";
	}

	return "auto";
}

function applyThemeMode(mode: ThemeMode) {
	if (typeof window === "undefined") {
		return;
	}

	const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
	const resolved = mode === "auto" ? (prefersDark ? "dark" : "light") : mode;

	document.documentElement.classList.remove("light", "dark");
	document.documentElement.classList.add(resolved);

	if (mode === "auto") {
		document.documentElement.removeAttribute("data-theme");
	} else {
		document.documentElement.setAttribute("data-theme", mode);
	}

	document.documentElement.style.colorScheme = resolved;
}

export default function ThemeToggle() {
	const [mode, setMode] = useState<ThemeMode>(getInitialMode);

	useEffect(() => {
		applyThemeMode(mode);
	}, [mode]);

	useEffect(() => {
		if (mode !== "auto") {
			return;
		}

		const media = window.matchMedia("(prefers-color-scheme: dark)");
		const onChange = () => applyThemeMode("auto");

		media.addEventListener("change", onChange);
		return () => {
			media.removeEventListener("change", onChange);
		};
	}, [mode]);

	function toggleMode() {
		const nextMode: ThemeMode =
			mode === "light" ? "dark" : mode === "dark" ? "auto" : "light";
		setMode(nextMode);
		applyThemeMode(nextMode);
		try {
			window.localStorage.setItem(STORAGE_KEY, nextMode);
		} catch {}
	}

	const label =
		mode === "auto"
			? "Theme: auto. Activate to switch to light."
			: `Theme: ${mode}. Activate to switch mode.`;

	return (
		<button
			type="button"
			onClick={toggleMode}
			aria-label={label}
			className="button-quiet text-sm"
		>
			Theme
		</button>
	);
}
