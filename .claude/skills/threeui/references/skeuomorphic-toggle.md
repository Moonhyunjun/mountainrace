---
name: add-skeuomorphic-toggle
description: "Build Skeuomorphic Toggle from its verified authored source using DOM/CSS + Three.js + Raw WebGL, including the complete renderer, interactions, and required assets. Use when Codex needs to implement, port, or adapt this effect without requiring the ThreeUI package or reconstructing the visual from an approximation."
---

# Build Skeuomorphic Toggle

## Description

Four takes on one switch: the preserved tactile skeuomorphic export plus flat modern, Three.js glass, and shader-lit treatments, each matching light and dark appearances automatically.

Recreate the authored behavior from the verified source, not from screenshots or the abbreviated orchestration sample in this skill. The implementation may live directly in the target project and does not require `@designcodeio/threeui`.

## Technologies

- React component with a sandboxed `srcDoc` effect boundary
- DOM/CSS copied from the byte-exact Neuform export
- A post-load focus adapter that keeps only the authored shader, button, canvas, or visual targets visible
- Optional outer-frame hue, saturation, and brightness grading with source-exact defaults

## Verified source material

- `src/shaders/neuform-isolated/sources/skeuomorphic-toggle.html`
- `src/shaders/neuform-isolated/NeuformBatchEffects.tsx`
- `src/shaders/skeuomorphic-toggle/SkeuomorphicToggleCollection.tsx`
- `src/shaders/skeuomorphic-toggle/ModernToggle.tsx`
- `src/shaders/skeuomorphic-toggle/GlassToggle.tsx`
- `src/shaders/skeuomorphic-toggle/glassToggleScene.ts`
- `src/shaders/skeuomorphic-toggle/ShaderToggle.tsx`
- `src/shaders/skeuomorphic-toggle/shaderToggleScene.ts`
- `src/shaders/skeuomorphic-toggle/shaderToggleGlsl.ts`
- `src/shaders/skeuomorphic-toggle/toggleMode.ts`

Source revision: `SHA-256 3e19e7fec9ac`

## Implementation steps

1. Open every verified source file listed above and identify the renderer, host lifecycle, styles, and assets before editing.
2. Copy the complete canonical HTML source byte-for-byte so its shader strings, materials, DOM, timing, and initialization order remain auditable.
3. After the source load event, retain only the #skeuomorphic-toggle control; do not rewrite the renderer or approximate the composition.
4. Force retained background targets to the sandbox viewport and center retained buttons without changing their internal pointer or shader state.
5. Dispatch one resize event after reparenting so the exact source renderer recalculates its backing resolution.
6. Apply optional hue, saturation, and brightness only to the outer iframe; omit the filter at 0/1/1 so source color remains exact.
7. Keep the sandbox isolated with `allow-scripts` only; removing the iframe must release its document, listeners, frames, and graphics contexts together.
8. Give the local component a sized, overflow-controlled parent and verify desktop, mobile, reduced-motion, and context-loss behavior.

Asset handling: This effect has no required external assets.

## Local component example

Import the copied local component rather than a package entrypoint:

```tsx
import { SkeuomorphicToggleCollection } from "./effects/skeuomorphic-toggle/SkeuomorphicToggleCollection";
import "./effects/skeuomorphic-toggle/styles.css";

export function Scene() {
  return <div className="effect-frame"><SkeuomorphicToggleCollection /></div>;
}
```

## Core renderer pattern

This excerpt documents orchestration only. Copy the exact shader, geometry, pass, and interaction code from the verified source files.

```tsx
const focusedSource = canonicalHtml
  .replace("</head>", focusStyles + "</head>")
  .replace("</body>", focusAfterLoadScript + "</body>");

return <iframe title="Focused source effect" srcDoc={focusedSource} sandbox="allow-scripts" />;
```

## Behavior contract

- Runtime: DOM/CSS + Three.js + Raw WebGL
- Passes: 1 selected toggle pass
- Interaction: Click or keyboard switching, pointer-lit 3D variants, automatic site/system appearance with explicit light and dark overrides, plus customizable speed, size, opacity, and palette
- Assets: No owned binary assets
- **source** (fixed): Exact Neuform HTML
- **focus** (host): Effect-only sandbox
- **mode** (optional): auto | dark | light
- **speed** (number): 1
- **size** (number): 1
- **length** (number): 1
- **density** (number): 1
- **opacity** (number): 1
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
