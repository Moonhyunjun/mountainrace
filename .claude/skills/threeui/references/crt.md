---
name: add-crt
description: "Build CRT from its verified authored source using Raw WebGL + Canvas 2D, including the complete renderer, interactions, and required assets. Use when Codex needs to implement, port, or adapt this effect without requiring the ThreeUI package or reconstructing the visual from an approximation."
---

# Build CRT

## Description

One sharpened curved-glass CRT tube driving four screens: the Matrix-era boot terminal, a monochrome film leader, a noise-torn blue signal fault, and an 8-bit console title.

Recreate the authored behavior from the verified source, not from screenshots or the abbreviated orchestration sample in this skill. The implementation may live directly in the target project and does not require `@designcodeio/threeui`.

## Technologies

- React lifecycle host
- Raw WebGL CRT composite
- Offscreen Canvas 2D screen texture
- Hand-authored 5x7 pixel font
- Visibility-aware animation and adaptive backing resolution

## Verified source material

- `ZION-Construct-Initialization (1).html — complete CRT background`
- `src/shaders/crt/crtRenderer.ts`
- `src/shaders/crt/crtShaders.ts`
- `src/shaders/crt/crtScreens.ts`
- `src/shaders/crt/CrtBackground.tsx`

Source revision: `SHA-256 860a1eb1d4c9`

## Implementation steps

1. Open every verified source file listed above and identify the renderer, host lifecycle, styles, and assets before editing.
2. Size the backing store to the host at up to 1920 px and 2x device pixel ratio, and pin the scanline count and aperture-grille pitch to CSS size so the authored look survives the higher resolution.
3. Select the screen with the variant prop: the complete 19-row terminal log with its colors, layout math, cursor, reveal cadence, and blink state; a monotone film leader; a blue signal fault; or an 8-bit console title.
4. Give each screen the texture resolution it needs — full backing for type, a 320x180 nearest-filtered grid for pixel art — and upload only when that screen changes.
5. Compile one fragment shader whose curvature, chromatic offset, halation, scanline, grille, transport noise, rolling bar, vignette, flicker, monochrome, and grain stages are driven by the variant's uniform preset.
6. Apply brightness, opacity, and a hue/saturation grade to the completed host rather than editing the texture or GLSL.
7. Own texture, buffer, shader, observer, resize, frame, and disposal lifecycle.
8. Give the local component a sized, overflow-controlled parent and verify desktop, mobile, reduced-motion, and context-loss behavior.

Asset handling: This effect has no required external assets.

## Local component example

Import the copied local component rather than a package entrypoint:

```tsx
import { CrtBackground } from "./effects/crt/CrtBackground";
import "./effects/crt/styles.css";

export function Scene() {
  return <div className="effect-frame"><CrtBackground /></div>;
}
```

## Core renderer pattern

This excerpt documents orchestration only. Copy the exact shader, geometry, pass, and interaction code from the verified source files.

```tsx
<CrtBackground variant="nintendo" speed={1} motion={1} />

CRT_SCREENS[variant](textContext, width, height, seconds);
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textCanvas);
gl.drawArrays(gl.TRIANGLES, 0, 3);
```

## Behavior contract

- Runtime: Raw WebGL + Canvas 2D
- Passes: 2 — Canvas 2D screen texture + raw WebGL CRT composite
- Interaction: Selectable screen style plus customizable boot speed, CRT motion, hue, brightness, and opacity
- Assets: No external assets
- **renderer** (host): Raw WebGL + Canvas 2D
- **variants** (fixed): Terminal | Cinematic | Blue Screen | Nintendo
- **backing** (adaptive): ≤ 1920 px, ≤ 2 DPR
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
