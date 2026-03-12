# Skill: UI/UX Web Design Principles & Creative Process

## Description

This skill equips the AI agent with top-tier web design heuristics, focusing on minimalism, psychological design laws, systematic scaling, and visual hierarchy. It also provides a structured framework for the creative process, treating creativity not as a spark, but as a repeatable methodology.

## Core Philosophy

- **Creativity is a Process:** Creativity is not about generating ideas from a blank slate; it is about combining and connecting existing ideas in unique ways based on fundamental rules.
- **Good Design is as Little Design as Possible:** Focus on essential features. Less clutter, fewer words, and fewer colors result in designs that are easier to build and easier to use.

---

## Part 1: The 5 Core Design Rules

### Rule 1: Simplify to the Essentials

- **Start with the Core:** Do not start designing a website from the header downwards. Start by asking: _"What is the key functionality or main selling point?"_ (e.g., Uber's core is the location input; Google's is the search bar). Design that first.
- **Reduce Cognitive Load:** The human brain simplifies visual input. Provide only the key visual information needed. Remove unnecessary decorative elements that complicate the UI.

### Rule 2: Apply Gestalt Theory

Design should be scannable within seconds. The brain processes the "whole" before noticing the "parts."

- **Law of Similarity:** Elements that look similar (by shape, size, color, or spacing) are perceived as the same group or function. This creates consistency and simplifies CSS implementation.
- **Law of Proximity:** Elements that are closer together are perceived as related. Use layout and spacing to clearly define relationships between UI components.

### Rule 3: Maximize Spacing (White Space)

- **Start Generous:** Elements require more space than initially assumed. When designing a specific element, start with a large amount of spacing.
- **Zoom Out to Tighten:** Look at the design as a whole, then gradually reduce the spacing until the visual balance is achieved.
- **Avoid Dummy Data:** Never test spacing with `Lorem Ipsum` or vague data. Use realistic content, as context dictates the appropriate amount of spacing.

### Rule 4: Implement a Design System

Never assign random values on the fly. Build a foundational system for spacing, typography, colors, and components.

- **Spacing System:**
  - Use a systematic increment (e.g., values divisible by 4 or 8).
  - Use `rem` units instead of pixels for accessibility and responsiveness (Default: `1rem = 16px`).
  - Use smaller, linear increments for tight relationships and larger, exponential increments for distinct sections.
- **Typography System:**
  - Select a primary font and set a consistent type scale (H1, H2, H3, Paragraph, Small Text) as global variables.
  - _Line Height Rule:_ Line height is inversely proportional to font size. Smaller text requires a larger line-height multiplier for legibility. Larger text requires a tighter line-height.
  - _Alignment Rule:_ Avoid center-aligned text for paragraphs and smaller text; always justify left for readability.
- **Color System:**
  - Avoid color psychology cliches.
  - Limit the palette: Pick one dark color (text), one light color (background), and two accent colors to add personality and indicate actions. Ensure high contrast.
- **Component System:**
  - Design key elements globally (e.g., Primary Action Buttons and Secondary Action Buttons). Base their size on the body text size.

### Rule 5: Master Visual Hierarchy

Hierarchy guides the user's eye to important actions and information (e.g., following a Z-pattern).

- **Emphasis Techniques:** Emphasize the primary element (like a title) using **Size**, **Weight**, or **Color**.
- **Start Small:** Do not overdo emphasis. Subtle changes often make a massive impact.
- **De-emphasis:** Sometimes, to make a primary element stand out, you must de-emphasize secondary competing elements (e.g., lower the contrast of a subtitle so the main title pops).
- **Contextual Hierarchy:** HTML tags (H1, H2, p) do not mandate rigid visual sizes. An H3 tag in one context might visually require a larger font size than an H2 tag in another, depending on the layout.
- **Adding Depth (The Exception to Minimalism):** To add character, elevate important elements using shadows or colors.
  - Lighter colors / bigger shadows = More Elevation (closer to the user).
  - Darker colors / inner shadows = More Depth.
  - Use subtle gradients instead of solid colors to break up bland elements.

---

## Part 2: The Creative Methodology Framework

When tasked with generating a new design or layout, the AI should follow this 5-step process:

### Step 1: Establish the Basics

Apply Rules 1 through 5. Set up the design system (spacing, typography, color palette) before generating layout concepts.

### Step 2: Source Inspiration

Look at top-tier, proven real-world designs within the specific industry (e.g., if designing a finance app testimonial, analyze how top finance competitors handle testimonials). Do not design from a blank slate.

### Step 3: Brainstorm with Empathy

Analyze the inspirations from a user's perspective.

- Extract the Unique Selling Proposition (USP).
- Look for ways to inject emotion (e.g., utilizing large, happy human faces instead of generic grid layouts).
- Focus on highlighting one clear message rather than diluting the design with too much information.

### Step 4: Step Away (Context Switch)

If struggling to solve a design problem or layout issue, simulate "stepping away." Shift context to a different analytical task, review a tutorial, or process unrelated data, then return to the design prompt. Subconscious processing yields better results than forced iteration.

### Step 5: Detach and Iterate (User Testing)

Do not fall in love with the first generated idea.

- Recognize inherent bias in the initial design.
- Subject the design to simulated "user feedback" (evaluate it strictly against scannability, contrast ratios, and hierarchy rules).
- Be willing to generate several "terrible" designs rapidly just to uncover one strong layout element. Stop over-planning and start iterating.
