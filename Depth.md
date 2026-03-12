# Skill: Enhancing UI Design with Depth

## Description

This skill provides a systematic approach to transforming flat, average user interfaces into polished, engaging designs by introducing visual depth. By strategically applying color shades, multi-layered shadows, and inset highlights, an AI agent can simulate physical layers and realistic lighting, significantly improving the aesthetic quality of a UI with minimal effort.

## Core Formula for Depth

To achieve a "high quality" design without over-complicating the UI, rely on this core formula:

1. **3-4 Shades of a Base Color:** Used to distinguish physical layers.
2. **System of Shadows:** 3 levels of drop shadows (small, medium, large) for elevation.
3. **Inset Shadows:** Light and dark inner shadows to simulate lighting highlights and recesses.
4. **Subtle Gradients:** To complement top-down lighting on key elements.

## Execution Guide

### Step 1: Establish a Layered Color Palette

Create a hierarchy of shades from a single base color to define the "z-axis" (depth) of your UI.

- **`bg-dark` (Lowest Layer):** Use the darkest shade for the main page background. This sets the base level.
- **`bg` (Middle Layer):** Use a slightly lighter shade for primary structural elements like cards, sections, or sidebars. This separates them from the background.
- **`bg-light` (Top Layer):** Use the lightest shade for interactive elements, inputs, or selected states that reside inside the middle layer containers.
- _Note: In dark mode, increasing lightness brings elements closer to the user. In light mode, the same principle generally applies to make elements stand out against a darker base, though exact lightness values will vary._

### Step 2: Construct Realistic Shadows

Avoid basic, single-layer drop shadows. Create realistic depth by simulating top-down lighting.

- **Top Highlight:** Apply a light, subtle inset shadow (or a 1px top border) to an element to simulate light hitting its top edge.
- **Bottom Drop Shadow:** Combine a tight, slightly darker shadow with a softer, wider shadow beneath the element to simulate realistic ambient occlusion and directional shadow.
- **Shadow Levels:** Create CSS variables for different elevations:
  - **Level 1 (Small):** For subtle lifts (e.g., standard cards, small buttons).
  - **Level 2 & 3 (Medium/Large):** For prominent floating elements (e.g., dropdown menus, modals, important call-to-action cards).
  - **Hover State:** Increase the shadow size and blur on hover to simulate an element raising towards the user.

### Step 3: Apply Depth to Specific UI Patterns

#### Elevating Structural Elements

- Assign the `bg` (middle layer) color to main content cards.
- Apply a standard drop shadow (Level 1 or 2) to lift them off the `bg-dark` page background.

#### Highlighting Selected States (e.g., Radio Buttons, Active Tabs)

Make selected items feel significantly closer to the user and prominent:

- Apply the `bg-light` (top layer) color.
- Add a light inset shadow on the top edge to catch the light.
- Add a dark inset shadow on the bottom edge to create volume.
- (Optional) Apply a subtle linear gradient that is slightly lighter at the top and darker at the bottom.

#### Creating Recessed Elements (e.g., Progress Bar Tracks, Secondary Tables)

Make an element appear "pushed in" to the surface it sits on:

- Apply a background color that is slightly darker than its parent container.
- Apply a dark inset shadow to the top edge to simulate a shadow cast inside the recess.
- Apply a light inset shadow to the bottom edge to simulate light hitting the bottom lip of the recess.

#### De-emphasizing Elements

If certain UI components (like a secondary table or graph) are competing too much for attention with primary elements:

- Push them back a layer by assigning them a background color closer to the base page color.
- Remove drop shadows or hard borders so they sit flat against their container.
- To create depth downward instead of upward, apply the recessed element technique (darker background + top dark inset shadow).

### Workflow for Upgrading a Flat UI

When presented with a basic, flat design, follow these steps to add depth:

1. **Define Backgrounds:** Set the main page background to the darkest shade (`bg-dark`).
2. **Separate Containers:** Apply the middle shade (`bg`) to the primary content cards and remove any basic stroke borders.
3. **Elevate:** Apply realistic drop shadows to those primary cards.
4. **Highlight Interactive Areas:** Apply the lightest shade (`bg-light`) to input fields, toggle backgrounds, and interactive elements.
5. **Refine Details:**
   - Use inset highlights/shadows for selected items or progress tracks.
   - Improve visual hierarchy by moving less important elements into recessed containers.
   - Enhance options with simple, monochromatic icons.
