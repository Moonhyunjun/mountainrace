---
name: add-predictive-arc
description: "Build Predictive Arc from its verified authored source using Canvas 2D + Raw WebGL + Three.js r128, including the complete renderer, interactions, and required assets. Use when Codex needs to implement, port, or adapt this effect without requiring the ThreeUI package or reconstructing the visual from an approximation."
---

# Build Predictive Arc

## Description

Eight animated arc, signal, ribbon, void, and halftone scenes collected in one Canvas 2D, raw-WebGL, and Three.js family.

Recreate the authored behavior from the verified source, not from screenshots or the abbreviated orchestration sample in this skill. The implementation may live directly in the target project and does not require `@designcodeio/threeui`.

## Technologies

- React variant host
- Four Canvas 2D renderers
- Three raw-WebGL renderers
- One Three.js point-field renderer
- Dark/light mode surfaces
- Lazy-loaded variant sources
- ResizeObserver, IntersectionObserver, adaptive pixel ratio, and requestAnimationFrame

## Verified source material

- `Axiom---Predictive-Search-Engine (3).html — predictive arc source`
- `Axiom-Dynamic-Data-Orchestration.html — data pixel arc source`
- `src/shaders/predictive-arc/predictiveArcRenderer.ts`
- `src/shaders/data-pixel-arc/dataPixelArcRenderer.ts`
- `src/shaders/neuform-isolated/sources/signal-particles.html`
- `src/shaders/neuform-isolated/sources/override-grid.html`
- `src/shaders/neuform-isolated/NeuformBatchEffects.tsx`
- `src/shaders/ribbon-field/RibbonFieldBackground.tsx`
- `src/shaders/ribbon-field/ribbonFieldShaders.ts`
- `src/shaders/neuform-isolated/NeuformIsolatedEffects.tsx`
- `src/shaders/neuform-isolated/sources/void-protocol.html`
- `src/shaders/neuform-isolated/NeuformCraftEffects.tsx`
- `src/shaders/neuform-isolated/sources/nexus-unified-flow.html`
- `src/shaders/neuform-isolated/sources/amber-halftone.html`
- `src/shaders/predictive-arc/PredictiveArcCollection.tsx`
- `src/shaders/predictive-arc/PredictiveArcCanvas.tsx`

Source revision: `SHA-256 fa86582fc870`

## Implementation steps

1. Open every verified source file listed above and identify the renderer, host lifecycle, styles, and assets before editing.
2. Keep Predictive Arc as the public entry point and select predictive, data-pixel, signal-particles, override-grid, ribbon-field, void-field, halftone-flow, or amber-halftone with the variant prop.
3. Retain each authored renderer and its original composition instead of blending the scenes into one canvas.
4. Expose the shared mode, speed, hue, saturation, and brightness controls at the collection boundary.
5. Lazy-load the isolated Signal Particles, Override Grid, Ribbon Field, Void Field, Halftone Flow, and Amber Halftone renderers so only the selected variant runs.
6. Preserve each renderer's resize, visibility, animation-frame, and cleanup lifecycle.
7. Give the local component a sized, overflow-controlled parent and verify desktop, mobile, reduced-motion, and context-loss behavior.

Asset handling: This effect has no required external assets.

## Local component example

Import the copied local component rather than a package entrypoint:

```tsx
import { PredictiveArcCanvas } from "./effects/predictive-arc/PredictiveArcCanvas";
import "./effects/predictive-arc/styles.css";

export function Scene() {
  return <div className="effect-frame"><PredictiveArcCanvas /></div>;
}
```

## Core renderer pattern

This excerpt documents orchestration only. Copy the exact shader, geometry, pass, and interaction code from the verified source files.

```tsx
<PredictiveArcCanvas variant="ribbon-field" speed={1.2} hue={12} />
```

## Behavior contract

- Runtime: Canvas 2D + Raw WebGL + Three.js r128
- Passes: 1 selected Canvas 2D, raw-WebGL, or Three.js field pass
- Interaction: Variant selection plus customizable mode, speed, color, and brightness
- Assets: No external assets
- **renderer** (host): Canvas 2D + Raw WebGL + Three.js
- **variants** (fixed): Predictive + Data Pixel + Signal + Override + Ribbon + Void + Halftone Flow + Amber Halftone
- **mode** (optional): dark | light
- **pixelRatio** (adaptive): ≤ 2
- **assets** (fixed): None

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
