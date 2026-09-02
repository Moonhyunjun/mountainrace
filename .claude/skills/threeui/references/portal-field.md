---
name: add-portal-field
description: "Build Portal Field from its verified authored source using Three.js r134 + Raw WebGL + Canvas 2D, including the complete renderer, interactions, and required assets. Use when Codex needs to implement, port, or adapt this effect without requiring the ThreeUI package or reconstructing the visual from an approximation."
---

# Build Portal Field

## Description

Five ambient field backgrounds collected across Three.js, raw WebGL, and Canvas 2D renderers.

Recreate the authored behavior from the verified source, not from screenshots or the abbreviated orchestration sample in this skill. The implementation may live directly in the target project and does not require `@designcodeio/threeui`.

## Technologies

- React variant host
- Three.js ShaderMaterial
- Raw WebGL fullscreen renderers
- Canvas 2D particle and ember composites
- Lazy-loaded variant sources

## Verified source material

- `src/shaders/portal-field/PortalFieldCollection.tsx`
- `src/shaders/neuform-isolated/NeuformBatchEffects.tsx`
- `src/shaders/neuform-isolated/sources/portal-field.html`
- `src/shaders/neuform-isolated/sources/flow-field.html`
- `src/shaders/neuform-isolated/NeuformIsolatedEffects.tsx`
- `src/shaders/neuform-isolated/sources/strata-cloud.html`
- `src/shaders/stream-convergence/StreamConvergenceBackground.tsx`
- `src/shaders/stream-convergence/streamConvergenceShaders.ts`
- `src/shaders/bell-field/BellFieldBackground.tsx`
- `src/shaders/bell-field/bellFieldShaders.ts`

Source revision: `SHA-256 f90e34f83d51`

## Implementation steps

1. Open every verified source file listed above and identify the renderer, host lifecycle, styles, and assets before editing.
2. Keep PortalFieldCollection as the public entry point and select portal-field, flow-field, cloud-field, bell-field, or stream-convergence with the variant prop.
3. Retain each authored renderer and composition at its existing implementation boundary.
4. Keep the common palette and motion controls at the collection boundary while allowing renderer-specific props through the typed variant union.
5. Lazy-load and mount only the selected renderer so inactive WebGL contexts, canvases, timers, and animation loops are not allocated.
6. Preserve every renderer's resize, visibility, interaction, animation-frame, and cleanup lifecycle.
7. Give the local component a sized, overflow-controlled parent and verify desktop, mobile, reduced-motion, and context-loss behavior.

Asset handling: This effect has no required external assets.

## Local component example

Import the copied local component rather than a package entrypoint:

```tsx
import { PortalFieldCollection } from "./effects/portal-field/PortalFieldCollection";
import "./effects/portal-field/styles.css";

export function Scene() {
  return <div className="effect-frame"><PortalFieldCollection /></div>;
}
```

## Core renderer pattern

This excerpt documents orchestration only. Copy the exact shader, geometry, pass, and interaction code from the verified source files.

```tsx
<PortalFieldCollection variant="flow-field" speed={1.1} density={1.2} hue={8} />
```

## Behavior contract

- Runtime: Three.js r134 + Raw WebGL + Canvas 2D
- Passes: 1 selected ambient field composition
- Interaction: Variant selection plus customizable motion, geometry, opacity, and palette
- Assets: No owned binary assets
- **source** (fixed): Exact Neuform HTML
- **focus** (host): Effect-only sandbox
- **speed** (number): 1
- **size** (number): 1
- **length** (number): 1
- **density** (number): 1
- **opacity** (number): 1
- **palette** (optional): Final-frame grade
- **assets** (fixed): No owned binary assets
- **variants** (fixed): Portal + Flow + Cloud + Bell + Stream Convergence

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
