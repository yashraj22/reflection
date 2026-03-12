import { useEffect, useState } from "react";

type ThemeMode = "light" | "dark" | "auto";
const STORAGE_KEY = "northstar-theme:v1";
const THEME_OPTIONS: Array<{ mode: ThemeMode; label: string }> = [
	{ mode: "light", label: "Light" },
	{ mode: "dark", label: "Dark" },
	{ mode: "auto", label: "Auto" },
];

function getInitialMode(): ThemeMode {
	if (typeof window === "undefined") {
		return "dark";
	}

	try {
		const stored = window.localStorage.getItem(STORAGE_KEY);
		if (stored === "light" || stored === "dark" || stored === "auto") {
			return stored;
		}
	} catch {
		return "dark";
	}

	return "dark";
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
		try {
			window.localStorage.setItem(STORAGE_KEY, mode);
		} catch {}
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

	return (
		<fieldset className="theme-control">
			<legend className="sr-only">Theme</legend>
			{THEME_OPTIONS.map((option) => (
				<button
					key={option.mode}
					type="button"
					onClick={() => setMode(option.mode)}
					aria-pressed={mode === option.mode}
					className={`theme-option ${mode === option.mode ? "is-active" : ""}`}
				>
					{option.label}
				</button>
			))}
		</fieldset>
	);
}
