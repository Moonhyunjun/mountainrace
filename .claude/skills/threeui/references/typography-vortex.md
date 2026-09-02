---
name: add-typography-vortex
description: "Build Typography Vortex from its verified authored source using Canvas 2D, including the complete renderer, interactions, and required assets. Use when Codex needs to implement, port, or adapt this effect without requiring the ThreeUI package or reconstructing the visual from an approximation."
---

# Build Typography Vortex

## Description

Sable’s complete rotating typography vortex with crisp prerendered rings, drifting glyphs, pointer dissolution, particle dust, and click suction — with dark and light surfaces.

Recreate the authored behavior from the verified source, not from screenshots or the abbreviated orchestration sample in this skill. The implementation may live directly in the target project and does not require `@designcodeio/threeui`.

## Technologies

- React lifecycle host and two layered Canvas 2D surfaces
- Dark/light mode surfaces with rebuilt glyph-ring bitmaps
- Seeded prerendered character-ring bitmaps with adaptive pixel ratio
- Pointer-relative alpha-mask dissolution and sampled glyph-particle emission
- Ambient dust, click suction, visibility pausing, reduced motion, and ResizeObserver sizing
- The exact embedded Fragment Mono font extracted as a local owned asset

## Verified source material

- `ascii-page-transition-v1.html — exact right-side typography vortex`
- `src/shaders/typography-vortex/typographyVortexRenderer.ts`
- `src/shaders/typography-vortex/TypographyVortexCanvas.tsx`
- `src/shaders/fonts/fragment-mono.woff2`

Source revision: `5a736cd3c1f6f19802f61ebb10e1701b9f7aa26e`

## Implementation steps

1. Open every verified source file listed above and identify the renderer, host lifecycle, styles, and assets before editing.
2. Load the exact Fragment Mono asset before measuring or prerendering character rings.
3. Build seeded rings using the authored phrase, font sizing, sparse-ring cadence, alpha, angular speed, wobble, and 1.21 radius growth.
4. Draw the rings and stray glyphs to an offscreen layer, then mask it with the authored ambient-left fade and pointer radial dissolve before compositing.
5. Sample visible layer pixels to emit matching dust and preserve both the ambient drift and pointer burst particle systems.
6. On pointer down, redirect existing particles into the complete timed suction state and retain the authored guide-circle feedback.
7. Keep adaptive DPR, resize rebuilds, offscreen pausing, visibility handling, reduced motion, and complete listener/observer/frame cleanup.
8. Give the local component a sized, overflow-controlled parent and verify desktop, mobile, reduced-motion, and context-loss behavior.

Asset handling: Copy the exact extracted Fragment Mono file and update the scoped @font-face URL only if the local asset directory changes.

## Local component example

Import the copied local component rather than a package entrypoint:

```tsx
import { TypographyVortexCanvas } from "./effects/typography-vortex/TypographyVortexCanvas";
import "./effects/typography-vortex/styles.css";

export function Scene() {
  return <div className="effect-frame"><TypographyVortexCanvas speed={1} ringGrowth={1.21} /></div>;
}
```

## Core renderer pattern

This excerpt documents orchestration only. Copy the exact shader, geometry, pass, and interaction code from the verified source files.

```tsx
const textLayer = document.createElement("canvas");
const text = textLayer.getContext("2d", { willReadFrequently: true });

drawPrerenderedRings(text, rings, time);
applyAmbientAndPointerDissolve(text, pointer);
context.drawImage(textLayer, 0, 0, width, height);
updateSampledDust(context, particles, suction);
```

## Behavior contract

- Runtime: Canvas 2D
- Passes: 2 Canvas 2D passes — text layer + particle composite
- Interaction: Mode, pointer dissolve, ambient dust, click suction, responsive rings, and reduced motion
- Assets: Exact embedded Fragment Mono font extracted from the authored source
- **renderer** (host): Canvas 2D
- **mode** (optional): dark | light
- **rings** (seeded): 1.21 growth
- **interaction** (pointer): Dissolve + suction
- **pixelRatio** (adaptive): ≤ 2
- **asset** (owned): Fragment Mono

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
