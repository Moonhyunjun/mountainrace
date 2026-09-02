---
name: add-woven-cloth
description: "Build Woven Cloth from its verified authored source using Three.js r160, including the complete renderer, interactions, and required assets. Use when Codex needs to implement, port, or adapt this effect without requiring the ThreeUI package or reconstructing the visual from an approximation."
---

# Build Woven Cloth

## Description

A Three.js woven-cloth simulation with Woven Cloth typography printed into its procedural textile so every letter deforms with the fabric, and three companion cloths woven around the same Verlet sheet.

Recreate the authored behavior from the verified source, not from screenshots or the abbreviated orchestration sample in this skill. The implementation may live directly in the target project and does not require `@designcodeio/threeui`.

## Technologies

- React component with a sandboxed `srcDoc` effect boundary
- Three.js r160 woven-cloth scene with canvas-texture typography copied from the byte-exact Neuform export
- A post-load focus adapter that keeps only the authored shader, button, canvas, or visual targets visible
- Optional outer-frame hue, saturation, and brightness grading with source-exact defaults

## Verified source material

- `src/shaders/woven-cloth/WovenCloth.tsx`
- `src/shaders/neuform-isolated/NeuformCraftEffects.tsx`
- `src/shaders/neuform-isolated/sources/lumina-weavers-cloth.html`
- `src/shaders/woven-cloth/woven-cloth-iridescent.html`
- `src/shaders/woven-cloth/woven-cloth-atelier.html`
- `src/shaders/woven-cloth/woven-cloth-washi.html`

Source revision: `SHA-256 9bfd56ef7579`

## Implementation steps

1. Open every verified source file listed above and identify the renderer, host lifecycle, styles, and assets before editing.
2. Copy the complete canonical HTML source byte-for-byte so its shader strings, materials, DOM, timing, and initialization order remain auditable.
3. After the source load event, retain only the fixed cloth viewport; do not rewrite the renderer or approximate the composition.
4. Force retained background targets to the sandbox viewport and center retained buttons without changing their internal pointer or shader state.
5. Dispatch one resize event after reparenting so the exact source renderer recalculates its backing resolution.
6. Apply optional hue, saturation, and brightness only to the outer iframe; omit the filter at 0/1/1 so source color remains exact.
7. Keep the sandbox isolated with `allow-scripts` only; removing the iframe must release its document, listeners, frames, and graphics contexts together.
8. Give the local component a sized, overflow-controlled parent and verify desktop, mobile, reduced-motion, and context-loss behavior.

Asset handling: This effect has no required external assets.

## Local component example

Import the copied local component rather than a package entrypoint:

```tsx
import { WovenCloth } from "./effects/woven-cloth/WovenCloth";
import "./effects/woven-cloth/styles.css";

export function Scene() {
  return <div className="effect-frame"><WovenCloth /></div>;
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

- Runtime: Three.js r160
- Passes: 1 Three.js cloth scene pass per variant, plus a bright-pass bloom on the iridescent silk
- Interaction: Variant selection; typography deforms with the authored textile motion + optional final-frame palette
- Assets: No owned binary assets
- **source** (fixed): Exact Neuform HTML for the base cloth
- **variant** (optional): Woven Cloth | Iridescent Silk | Atelier Flag | Washi Noren
- **companions** (original): Three first-party documents; the packaged export is untouched
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
