---
name: add-japanese-tower
description: "Build Country Towers from its verified authored source using Three.js r149 + Canvas 2D, including the complete renderer, interactions, and required assets. Use when Codex needs to implement, port, or adapt this effect without requiring the ThreeUI package or reconstructing the visual from an approximation."
---

# Build Country Towers

## Description

Six country-specific towers assembling above a procedural landscape: Japanese, Chinese, Vietnamese, Thai, Khmer, and Ottoman.

Recreate the authored behavior from the verified source, not from screenshots or the abbreviated orchestration sample in this skill. The implementation may live directly in the target project and does not require `@designcodeio/threeui`.

## Technologies

- React and TypeScript sandbox host
- Self-contained Three.js r149 document with embedded runtime and texture set
- Six procedural architectures: Japanese tenshu, Chinese pagoda, Vietnamese tháp, Thai prang, Khmer prasat, and Ottoman mosque
- Shared heightfield terrain, mountains, grass, stones, atmosphere, and lighting
- Construction timeline, pointer orbit, hover parallax, pinch and wheel zoom, and responsive camera fitting

## Verified source material

- `Towers.html — complete self-contained Three.js tower and landscape scene`
- `src/shaders/japanese-tower/Towers.html`
- `src/shaders/japanese-tower/JapaneseTowerLandscape.tsx`
- `public/japanese-tower.html — generated scene-only package asset`

Source revision: `SHA-256 7810e7163c02`

## Implementation steps

1. Open every verified source file listed above and identify the renderer, host lifecycle, styles, and assets before editing.
2. Copy the complete Towers.html source byte-for-byte so the embedded runtime, texture set, geometry, landscape, camera, and timeline remain intact.
3. Inject only scene-focused presentation CSS at runtime: hide the editorial chrome while keeping the background wash, tower canvas, and weather flash layers.
4. Map the country prop to the six authored style IDs in the generated scene asset; keep Japan as the default and disable sound for an embeddable component surface.
5. Load the focused document in an allow-scripts-only sandbox and size the iframe to a bounded host so its native resize path preserves the tower and landscape composition.
6. Remove the iframe on unmount so its browsing context, WebGL renderer, audio graph, listeners, and animation frame are released together.
7. Give the local component a sized, overflow-controlled parent and verify desktop, mobile, reduced-motion, and context-loss behavior.

Asset handling: Generate the focused japanese-tower.html asset from the exact Towers.html source, retain the six-country query adapter, and keep it available at the URL passed through sourceUrl.

## Local component example

Import the copied local component rather than a package entrypoint:

```tsx
import { JapaneseTowerLandscape } from "./effects/japanese-tower/JapaneseTowerLandscape";
import "./effects/japanese-tower/styles.css";

export function Scene() {
  return <div className="effect-frame"><JapaneseTowerLandscape country="japan" sourceUrl="/japanese-tower.html" /></div>;
}
```

## Core renderer pattern

This excerpt documents orchestration only. Copy the exact shader, geometry, pass, and interaction code from the verified source files.

```tsx
<JapaneseTowerLandscape country="china" sourceUrl="/japanese-tower.html" />
```

## Behavior contract

- Runtime: Three.js r149 + Canvas 2D
- Passes: 1 live Three.js scene render with six authored architecture builders and procedural CanvasTexture generation
- Interaction: Country selection, automatic 4.4-second construction, pointer orbit, hover parallax, pinch and wheel zoom, and camera reset
- Assets: 1 exact self-contained authored HTML scene with six country architectures, embedded Three.js runtime, procedural landscape, and texture set
- **renderer** (sandbox): Three.js r149
- **country** (variant): Japan / China / Vietnam / Thailand / Cambodia / Turkey
- **structure** (fixed): Six authored procedural architectures
- **landscape** (fixed): Terrain + mountains + grass + stones
- **camera** (pointer): Orbit + parallax + zoom
- **pixelRatio** (adaptive): ≤ 2
- **assets** (embedded): Runtime + texture set

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
