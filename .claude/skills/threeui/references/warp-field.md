---
name: add-warp-field
description: "Build Warp Field from its verified authored source using Three.js r128, including the complete renderer, interactions, and required assets. Use when Codex needs to implement, port, or adapt this effect without requiring the ThreeUI package or reconstructing the visual from an approximation."
---

# Build Warp Field

## Description

Nexus’s focused hero warp: 400 emerald additive streaks and 40 luminous tiles streaming through an authored deep-space fog field.

Recreate the authored behavior from the verified source, not from screenshots or the abbreviated orchestration sample in this skill. The implementation may live directly in the target project and does not require `@designcodeio/threeui`.

## Technologies

- React lifecycle host
- Pinned Three.js r128
- 400 colored additive line segments
- 40 luminous plane tiles and exponential fog

## Verified source material

- `Nexus-Edge-Compute.html — hero warp scene`
- `src/shaders/warp-field/warpFieldRenderer.ts`
- `src/shaders/warp-field/WarpFieldBackground.tsx`

Source revision: `SHA-256 bd7c486164d8`

## Implementation steps

1. Open every verified source file listed above and identify the renderer, host lifecycle, styles, and assets before editing.
2. Pin Three.js 0.128.0 and carry only the complete primary hero-warp scene.
3. Retain the exact random distributions, four-color palette, line lengths, tile geometry, materials, camera, fog, and wrap bounds.
4. Advance both line endpoints and all tiles by the same authored speed so the warp stays coherent.
5. Expose speed, opacities, FOV, brightness, and a final-canvas hue/saturation grade with source-exact defaults.
6. Dispose cloned tile materials, both geometries, the streak material, observers, frames, and renderer.
7. Give the local component a sized, overflow-controlled parent and verify desktop, mobile, reduced-motion, and context-loss behavior.

Asset handling: This effect has no required external assets.

## Local component example

Import the copied local component rather than a package entrypoint:

```tsx
import { WarpFieldBackground } from "./effects/warp-field/WarpFieldBackground";
import "./effects/warp-field/styles.css";

export function Scene() {
  return <div className="effect-frame"><WarpFieldBackground /></div>;
}
```

## Core renderer pattern

This excerpt documents orchestration only. Copy the exact shader, geometry, pass, and interaction code from the verified source files.

```tsx
positions[index * 6 + 2] += speed;
positions[index * 6 + 5] += speed;
if (positions[index * 6 + 2] > 200) wrapStreak(index);
renderer.render(scene, camera);
```

## Behavior contract

- Runtime: Three.js r128
- Passes: 1 Three.js scene render
- Interaction: Customizable speed, streaks, tiles, color, camera, and brightness
- Assets: No external assets
- **renderer** (host): Three.js r128
- **variant** (optional): streaks | letters | keycaps | hyperspace
- **streaks** (fixed): 400
- **tiles** (fixed): 40
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
