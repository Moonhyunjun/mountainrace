---
name: add-performance-gauges
description: "Build Performance Gauges from its verified authored source using DOM + CSS, including the complete renderer, interactions, and required assets. Use when Codex needs to implement, port, or adapt this effect without requiring the ThreeUI package or reconstructing the visual from an approximation."
---

# Build Performance Gauges

## Description

Four layered CSS instruments — tachometer, speedometer, turbo boost, and EV power — each isolated to one full-bleed dial with polar tick geometry, scale bands, and a self-testing needle sweep.

Recreate the authored behavior from the verified source, not from screenshots or the abbreviated orchestration sample in this skill. The implementation may live directly in the target project and does not require `@designcodeio/threeui`.

## Technologies

- React variant host over a sandboxed `srcDoc` effect boundary
- DOM and layered CSS copied from the byte-exact source document
- A post-load focus adapter that keeps only the selected gauge card visible
- Optional outer-frame hue, saturation, and brightness grading with source-exact defaults

## Verified source material

- `src/shaders/neuform-isolated/sources/performance-gauges.html`
- `src/shaders/neuform-isolated/NeuformIsolatedEffects.tsx`

Source revision: `SHA-256 2dc25058fc85`

## Implementation steps

1. Open every verified source file listed above and identify the renderer, host lifecycle, styles, and assets before editing.
2. Copy the complete canonical HTML source byte-for-byte so its dial geometry, scale bands, and needle timing remain auditable.
3. Select tachometer, speedometer, boost, or power with the variant prop; each variant isolates one gauge card by id.
4. After the source load event, retain only that card and let the square fit rule size it against the shorter sandbox axis.
5. Leave the authored self-test sequence — full-scale sweep, fall to rest, settle with overshoot, idle flutter — untouched.
6. Apply optional hue, saturation, and brightness only to the outer iframe; omit the filter at 0/1/1 so source color remains exact.
7. Keep the sandbox isolated with `allow-scripts` only; removing the iframe must release its document, listeners, and timers together.
8. Give the local component a sized, overflow-controlled parent and verify desktop, mobile, reduced-motion, and context-loss behavior.

Asset handling: This effect has no required external assets.

## Local component example

Import the copied local component rather than a package entrypoint:

```tsx
import { PerformanceGauges } from "./effects/performance-gauges/PerformanceGauges";
import "./effects/performance-gauges/styles.css";

export function Scene() {
  return <div className="effect-frame"><PerformanceGauges /></div>;
}
```

## Core renderer pattern

This excerpt documents orchestration only. Copy the exact shader, geometry, pass, and interaction code from the verified source files.

```tsx
<PerformanceGauges variant="speedometer" />
```

## Behavior contract

- Runtime: DOM + CSS
- Passes: 4 layered CSS gauge compositions, one per variant
- Interaction: Self-test needle sweep, settle, and idle flutter with a counting readout + optional final-frame palette
- Assets: No owned binary assets
- **source** (fixed): Exact Neuform HTML
- **focus** (host): Effect-only sandbox
- **palette** (optional): Final-frame grade
- **assets** (fixed): No owned binary assets

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
