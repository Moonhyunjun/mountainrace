---
name: add-circle-buttons
description: "Build Circle Buttons from its verified authored source using DOM + CSS, including the complete renderer, interactions, and required assets. Use when Codex needs to implement, port, or adapt this effect without requiring the ThreeUI package or reconstructing the visual from an approximation."
---

# Build Circle Buttons

## Description

Three compact circular icon controls using the exact Dark Glass, Launch, and Dot Border material systems.

Recreate the authored behavior from the verified source, not from screenshots or the abbreviated orchestration sample in this skill. The implementation may live directly in the target project and does not require `@designcodeio/threeui`.

## Technologies

- React and TypeScript
- Semantic button elements
- Scoped layered CSS
- Inline SVG icons
- Light and dark palette controls
- Reduced-motion fallback

## Verified source material

- `src/shaders/circle-buttons/CircleButtons.tsx`
- `src/shaders/circle-buttons/circle-buttons.css`

Source revision: `SHA-256 2e85693f7ada`

## Implementation steps

1. Open every verified source file listed above and identify the renderer, host lifecycle, styles, and assets before editing.
2. Use CircleButtons as the public entry point and select play, plus, or mail with the variant prop.
3. Keep every variant circular, icon-only, and compact at its responsive 56–72px default; provide ariaLabel when the surrounding action needs a more specific accessible name.
4. Map each treatment directly to its Rectangle Buttons source: Dark Glass for Play, Launch for Plus, and Dot Border for Mail, including the original material tokens and motion timing.
5. Keep hover, keyboard focus, pressed, disabled, and reduced-motion behavior intact when adapting the control to another layout.
6. Use mode and palette controls at the component boundary rather than rewriting the internal highlight and shadow layers.
7. Give the local component a sized, overflow-controlled parent and verify desktop, mobile, reduced-motion, and context-loss behavior.

Asset handling: This effect has no required external assets.

## Local component example

Import the copied local component rather than a package entrypoint:

```tsx
import { CircleButtons } from "./effects/circle-buttons/CircleButtons";
import "./effects/circle-buttons/styles.css";

export function Scene() {
  return <div className="effect-frame"><CircleButtons /></div>;
}
```

## Core renderer pattern

This excerpt documents orchestration only. Copy the exact shader, geometry, pass, and interaction code from the verified source files.

```tsx
<CircleButtons variant="mail" mode="dark" ariaLabel="Open inbox" />
```

## Behavior contract

- Runtime: DOM + CSS
- Passes: 1 layered DOM/CSS circle composition
- Interaction: Source-faithful hover and press behavior, focus-visible ring, reduced-motion fallback, and adaptive light/dark palette
- Assets: Inline SVG icons; no external runtime assets
- **renderer** (host): Semantic button + scoped layered CSS
- **variants** (fixed): Play + Plus + Mail
- **materials** (fixed): Dark Glass + Launch + Dot Border
- **size** (responsive): 56–72px diameter
- **theme** (adaptive): Dark (default) | Light
- **interaction** (adaptive): Hover | Focus | Press | Disabled | Reduced motion
- **assets** (embedded): Three inline SVG icons

## Verification

1. Compare the rendered composition, animation timing, pointer behavior, and state transitions with the source implementation.
2. Exercise resize, high-DPI, mobile/coarse-pointer, reduced-motion, tab visibility, and WebGL context-loss paths where applicable.
3. Confirm every animation frame, observer, listener, geometry, buffer, texture, framebuffer, material, and renderer is released on teardown.
4. Check the browser console and confirm the effect renders at native-or-better backing resolution.

## Guardrails

- Do not substitute a visually similar package, demo, shader, or runtime.
- Do not approximate, reconstruct, or simplify the authored GLSL, render passes, geometry, interaction state, or assets.
- Keep exact source and asset hashes under regression tests when the source project provides them.
- Adapt only the surrounding host boundary needed by the target project; keep renderer behavior intact.
