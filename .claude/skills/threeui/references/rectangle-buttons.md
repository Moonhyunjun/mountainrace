---
name: add-rectangle-buttons
description: "Build Rectangle Buttons from its verified authored source using DOM + CSS, including the complete renderer, interactions, and required assets. Use when Codex needs to implement, port, or adapt this effect without requiring the ThreeUI package or reconstructing the visual from an approximation."
---

# Build Rectangle Buttons

## Description

Twenty-two authored rectangle-button and animated CTA treatments collected into one family.

Recreate the authored behavior from the verified source, not from screenshots or the abbreviated orchestration sample in this skill. The implementation may live directly in the target project and does not require `@designcodeio/threeui`.

## Technologies

- React variant host
- One Section DOM/CSS source
- Ten isolated DOM/CSS CTA sources
- Two Lumen DOM/CSS treatments
- Light and dark palette controls
- Lazy-loaded variant renderers

## Verified source material

- `src/shaders/rectangle-buttons/RectangleButtons.tsx`
- `remote-control.html — shared button treatment`
- `src/shaders/section-elements/SectionElements.tsx`
- `src/shaders/section-elements/section-elements.css`
- `src/shaders/neuform-isolated/NeuformIsolatedEffects.tsx`
- `src/shaders/neuform-isolated/sources/launch-button.html`
- `src/shaders/neuform-isolated/sources/dot-border-button.html`
- `src/shaders/neuform-isolated/sources/floating-dots-cta.html`
- `src/shaders/neuform-isolated/sources/sliding-text-cta.html`
- `src/shaders/neuform-isolated/sources/gradient-beam-cta.html`
- `src/shaders/neuform-isolated/sources/gradient-pill-button.html`
- `src/shaders/neuform-isolated/sources/generate-button.html`
- `src/shaders/neuform-isolated/sources/glassmorphism-cta.html`
- `src/shaders/neuform-isolated/sources/spinning-border-button.html`
- `src/shaders/neuform-isolated/sources/gradient-cta.html`
- `src/shaders/lumen-cta/LumenCta.tsx`
- `src/shaders/lumen-cta/lumen-cta.css`
- `src/shaders/lumen-cta/sources/lumen.html`
- `halftone-bloom.html — Aster glass access and arrow CTA treatments`

Source revision: `SHA-256 f4f3dd8422cd`

## Implementation steps

1. Open every verified source file listed above and identify the renderer, host lifecycle, styles, and assets before editing.
2. Keep RectangleButtons as the public entry point and select dark-pill, launch-button, dot-border-button, floating-dots-cta, sliding-text-cta, gradient-beam-cta, gradient-pill-button, generate-button, glassmorphism-cta, spinning-border-button, gradient-cta, lumen-cta, or lumen-cta-ghost with the variant prop.
3. Retain the original dark-glass rectangle, all ten complete authored CTA documents, and both Lumen treatments instead of flattening their markup or animation systems.
4. Expose mode and palette controls at the collection boundary while leaving each variant's authored hover, focus, and motion behavior intact.
5. Lazy-load and mount only the selected CTA renderer so inactive variants do not allocate isolated documents or animation loops.
6. Give the local component a sized, overflow-controlled parent and verify desktop, mobile, reduced-motion, and context-loss behavior.

Asset handling: This effect has no required external assets.

## Local component example

Import the copied local component rather than a package entrypoint:

```tsx
import { RectangleButtons } from "./effects/rectangle-buttons/RectangleButtons";
import "./effects/rectangle-buttons/styles.css";

export function Scene() {
  return <div className="effect-frame"><RectangleButtons /></div>;
}
```

## Core renderer pattern

This excerpt documents orchestration only. Copy the exact shader, geometry, pass, and interaction code from the verified source files.

```tsx
<RectangleButtons variant="gradient-beam-cta" mode="dark" />
```

## Behavior contract

- Runtime: DOM + CSS
- Passes: 1 selected DOM/CSS button composition
- Interaction: Variant selection with authored hover, focus, motion, and palette behavior
- Assets: 5 local SF Pro font subsets + 1 authored remote portrait reference
- **renderer** (host): React DOM + scoped CSS
- **source** (fixed): Owner-selected reference HTML
- **theme** (fixed): Dark
- **layout** (responsive): Container-relative 16:9 composition
- **motion** (adaptive): Reduced-motion safe
- **assets** (owned): Local fonts and illustrations
- **variants** (fixed): Dark Glass + Launch + Dot Border + Floating Dots + Sliding Text + Gradient Beam + Gradient Pill + Generate + Glassmorphism + Spinning Border + Gradient + Lumen CTA + Lumen CTA Ghost + Trochil Signal + Attune Thermal + Tideform Outline + Understory Arrow Pill + Meridian Keycap Primary + Meridian Keycap Secondary + Halvorsen Arrow Pill + Aster Glass Access + Aster Glass Arrow

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
