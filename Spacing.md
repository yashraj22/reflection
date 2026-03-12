# Skill: UI Design Spacing & Layout Principles

## Description

This skill provides a comprehensive set of rules and best practices for applying spacing in User Interface (UI) design. The primary goal of spacing is to group related UI elements and separate distinct groups, guiding the user's eye and improving overall navigability and readability.

## Core Concepts & Units

### 1. Use REMs instead of Pixels

- **Rule:** Always define spacing (margins, padding, gaps) using `rem` units rather than `px`.
- **Reasoning:** Using `rem` ensures that spacing scales proportionally with the user's base font size, creating a responsive, accessible, and consistent spacing system.
- **Base Value:** Assume a base font size where `1rem = 16px`.

### 2. The Spacing Scale

- **Rule:** Do not use arbitrary numbers for spacing. Stick to a defined scale based on increments of `0.25rem` (4px).
- **Standard Scale:**
  - `0.25rem` (4px)
  - `0.5rem` (8px)
  - `0.75rem` (12px)
  - `1rem` (16px) - _The most common baseline spacing._
  - `1.25rem` (20px)
  - `1.5rem` (24px)
  - `2rem` (32px)

## Key Spacing Rules

### Rule 1: Grouping vs. Separating

- **Action:** Group closely related elements using smaller spacing values (e.g., `< 1rem`).
- **Action:** Separate distinct groups or distinct sections using larger spacing values (e.g., `>= 1rem`).
- **Example:** A title and author name should be closer together (`0.5rem`) than the entire title block is from the main content (`1.5rem`).

### Rule 2: Inner Spacing Must Be Smaller Than Outer Spacing

- **Action:** Ensure the space _inside_ an element or a tightly knit group is always less than the space _outside_ of it.
- **Application (Buttons):** The gap between an icon and text inside a button must be smaller than the horizontal padding of the button.
- **Application (Groups):** The gap between related buttons (like a "Like" and "Dislike" button) must be larger than the padding inside the buttons themselves.

### Rule 3: Balance Optical Weight (Vertical vs. Horizontal Padding)

- **Concept:** Text inherently carries more visual weight horizontally than vertically. Vertical space is constrained by cap heights and descenders.
- **Action:** When setting padding for elements like buttons or text inputs, vertical padding must be smaller than horizontal padding. Equal padding on all sides will make the element look bloated.
- **Formula:** Set horizontal padding to be **2x or 3x larger** than vertical padding.
  - _Good Example:_ `padding: 0.5rem 1rem;`
  - _Good Example:_ `padding: 0.5rem 1.5rem;`
  - _Bad Example:_ `padding: 1rem 1rem;`

### Rule 4: The Top-Down Testing Strategy

- **Action:** When determining the correct gap between elements, **do not** start with a small value and increase it. Small values can artificially cramp a design and hurt the user experience.
- **Action:** Start with a larger value (e.g., `1.5rem` or `2rem`). If it feels too disconnected, gradually decrease the spacing along the scale until the grouping feels visually appropriate. Extra white space is generally better than a cluttered interface.

### Rule 5: Consistency is the 1st Rule of Spacing

- **Action:** Maintain strict consistency across the UI. Apply the same spacing values to elements that serve the same hierarchical purpose.
- **Concept:** Even if a chosen spacing value is not theoretically "perfect," applying it consistently will result in a design that is fundamentally legible and acceptable. Random, inconsistent spacing is the most detrimental error in UI layout.

## The Simplified Spacing System (Alternative)

If a strict scale is not required, use this simplified, foolproof 3-tier system for gaps, margins, and padding:

- **Small Gap (`0.5rem`):** Use for grouping closely related elements (e.g., icon and text, title and subtitle).
- **Medium Gap (`1rem`):** Use for standard padding inside components or separating moderately related items.
- **Large Gap (`1.5rem`):** Use for separating distinct UI sections or major component blocks.
- _(Note: These three values can also be mirrored for border-radius values to create a harmonious design language)._
