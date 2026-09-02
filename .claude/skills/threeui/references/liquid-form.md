---
name: add-liquid-form
description: "Build Liquid Form from its verified authored source using Raw WebGL, including the complete renderer, interactions, and required assets. Use when Codex needs to implement, port, or adapt this effect without requiring the ThreeUI package or reconstructing the visual from an approximation."
---

# Build Liquid Form

## Description

A centered silver ray-marched liquid form with authored studio reflections and pointer-responsive camera drift.

Recreate the authored behavior from the verified source, not from screenshots or the abbreviated orchestration sample in this skill. The implementation may live directly in the target project and does not require `@designcodeio/threeui`.

## Technologies

- React lifecycle host
- Raw WebGL 1 fullscreen quad
- High-precision GLSL simplex noise and 70-step signed-distance-field ray march
- Smoothed pointer look-at and adaptive 1.5x DPR

## Verified source material

- `V-E-L-O-X-Quantum-Engineered.html — WebGL background`
- `src/shaders/liquid-form/liquidFormShaders.ts`
- `src/shaders/liquid-form/LiquidFormBackground.tsx`

Source revision: `SHA-256 acc0cbacb914`

## Implementation steps

1. Open every verified source file listed above and identify the renderer, host lifecycle, styles, and assets before editing.
2. Compile the exact full-screen vertex shader and complete silver liquid metal fragment shader.
3. Keep all three noise octaves, SDF normals, environment lights, Fresnel, specular, bloom, tone mapping, and gamma stages.
4. Map geometric customization to uniforms, then optionally tint the final silver canvas; tint amount zero must remain source-exact.
5. Preserve pointer smoothing, resize, visibility pausing, context ownership, and complete WebGL resource cleanup.
6. Give the local component a sized, overflow-controlled parent and verify desktop, mobile, reduced-motion, and context-loss behavior.

Asset handling: This effect has no required external assets.

## Local component example

Import the copied local component rather than a package entrypoint:

```tsx
import { LiquidFormBackground } from "./effects/liquid-form/LiquidFormBackground";
import "./effects/liquid-form/styles.css";

export function Scene() {
  return <div className="effect-frame"><LiquidFormBackground /></div>;
}
```

## Core renderer pattern

This excerpt documents orchestration only. Copy the exact shader, geometry, pass, and interaction code from the verified source files.

```tsx
gl.uniform1f(uniforms.morph, options.morph);
gl.uniform1f(uniforms.noiseScale, options.noiseScale);
gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
```

## Behavior contract

- Runtime: Raw WebGL
- Passes: 1 raw WebGL ray-march pass
- Interaction: Smoothed pointer look-at plus customizable material, morph, and tint
- Assets: No external assets
- **renderer** (host): Raw WebGL
- **steps** (fixed): 70
- **pixelRatio** (adaptive): ≤ 1.5

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
