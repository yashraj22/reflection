# UI Color Palette Creation and Theming

## Overview

This skill defines the principles and methodology for generating scalable, consistent UI color palettes using CSS custom properties. It covers the selection of appropriate color formats, structuring variables for light and dark modes, and techniques for adding depth and polish to UI elements.

## 1. Preferred Color Formats

Never use HEX or RGB formats when generating palettes, as they make it mathematically difficult to create consistent shades.

- **Primary Choice: OKLCH**
  - OKLCH (`oklch(lightness chroma hue / alpha)`) is the modern standard (adopted by frameworks like Tailwind v4).
  - It provides uniform lightness perception across different hues, preventing colors like yellow from appearing significantly brighter than blue at the same lightness value.
  - Parameters: `Lightness` (0-1), `Chroma` (0-0.4 for typical UI, 0-0.2 for neutrals), `Hue` (0-360).
- **Secondary Choice: HSL**
  - HSL (`hsl(hue saturation lightness / alpha)`) is acceptable but less perceptually uniform than OKLCH.
  - Parameters: `Hue` (0-360), `Saturation` (0-100%), `Lightness` (0-100%).

## 2. Palette Structure and Naming Convention

A robust UI requires a semantic set of color variables rather than a literal list of colors. Focus on the _role_ of the color.

### Background Colors

Define shades based on their visual weight and hierarchy. Note that the naming convention is absolute to the lightness _within_ that theme.

- `--bg-dark`: The darkest background shade in the current theme.
- `--bg`: The default/middle background shade.
- `--bg-light`: The lightest background shade in the current theme.

### Text Colors

- `--text`: High contrast for headings and primary content.
- `--text-muted`: Lower contrast for secondary text, descriptions, or less important information.

### UI Accents and Semantic Colors

- `--border`: For standard borders separating elements.
- `--highlight`: A slightly lighter color used for top borders or gradients to simulate an overhead light source.
- `--primary`: The main brand or action color.
- `--secondary`: For alternative actions.
- `--danger`, `--warning`, `--success`, `--info`: Semantic state colors.

## 3. Theming Logic (Dark vs. Light Mode)

Start by designing a neutral palette (Hue = 0, Saturation/Chroma = 0) and establish the lightness scale. Hue and saturation can be injected later to "tint" the entire UI.

### Dark Mode (Default)

In dark mode, layered elements that are "closer" to the user should appear lighter.

- **Backgrounds**: Base is nearly black, elevated elements get lighter.
  - `--bg-dark`: ~0% Lightness
  - `--bg`: ~5% Lightness
  - `--bg-light`: ~10% Lightness
- **Text**: Needs to be light for readability, but avoid pure white (100%) for main text to prevent eye strain.
  - `--text`: ~95% Lightness
  - `--text-muted`: ~70% Lightness

### Light Mode

Invert the logic, but adjust manually to ensure it feels natural. Elevated elements usually appear lighter, but the base is already light, so depth is often achieved through shadows rather than significant background color shifts.

- **Backgrounds**:
  - `--bg-dark`: ~90% Lightness
  - `--bg`: ~95% Lightness
  - `--bg-light`: ~100% Lightness
- **Text**:
  - `--text`: ~5% Lightness
  - `--text-muted`: ~30% Lightness

## 4. Depth and Polish Techniques

Flat UIs can look boring. Apply these techniques to add character:

- **Borders**: Keep them subtle to define edges without distracting.
- **Highlights (Simulated Lighting)**: Add a 1px solid top border using the `--highlight` variable to cards or buttons to simulate light hitting the top edge.
- **Gradients**: Use subtle linear gradients on card backgrounds (e.g., from `--bg` to `--bg-light`) to create texture. Reveal a stronger gradient on `:hover` for interactivity.
- **Shadows**: Always combine at least two box-shadows for a realistic effect:
  1. A dark, tight, short shadow close to the element.
  2. A lighter, larger, softer shadow that spreads further out.
  - _Note: Shadows are primarily visible in light mode. In dark mode, rely more on background lightness differences and borders for depth._

## 5. CSS Implementation Template

Define the default theme (usually dark) in `:root`, and override variables for the alternate theme using a class or media query. Apply these variables to your CSS rules.

```css
/* Define Default Theme (Dark) */
:root {
	/* OKLCH Format */
	--bg-dark: oklch(0.1 0 0);
	--bg: oklch(0.15 0 0);
	--bg-light: oklch(0.2 0 0);

	--text: oklch(0.95 0 0);
	--text-muted: oklch(0.7 0 0);

	--border: oklch(0.3 0 0);
	--highlight: oklch(0.4 0 0);
}

/* Define Alternate Theme (Light) */
@media (prefers-color-scheme: light) {
	:root {
		--bg-dark: oklch(0.9 0 0);
		--bg: oklch(0.95 0 0);
		--bg-light: oklch(1 0 0);

		--text: oklch(0.15 0 0);
		--text-muted: oklch(0.4 0 0);

		--border: oklch(0.8 0 0);
		--highlight: oklch(1 0 0);
	}
}

/* Application */
body {
	background-color: var(--bg-dark);
	color: var(--text-muted);
}

h1,
h2,
h3 {
	color: var(--text);
}

.card {
	background-color: var(--bg);
	border: 1px solid var(--border);
	/* Highlight technique */
	border-top: 1px solid var(--highlight);
	/* Combined realistic shadow */
	box-shadow:
		0px 2px 4px oklch(0 0 0 / 0.1),
		0px 8px 16px oklch(0 0 0 / 0.05);
}

.card:hover {
	background-color: var(--bg-light);
}
```
