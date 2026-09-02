---
name: add-brand-orbs
description: "Build Brand Orbs from its verified authored source using Canvas 2D, including the complete renderer, interactions, and required assets. Use when Codex needs to implement, port, or adapt this effect without requiring the ThreeUI package or reconstructing the visual from an approximation."
---

# Build Brand Orbs

## Description

Twenty-three animated brand marks rebuilt as small and medium dimensional dot orbs for AI status, product activity, and compact loading states.

Recreate the authored behavior from the verified source, not from screenshots or the abbreviated orchestration sample in this skill. The implementation may live directly in the target project and does not require `@designcodeio/threeui`.

## Technologies

- React and TypeScript sandbox host
- Exact authored Canvas 2D dot engine
- Twenty-three embedded brand-mark variants
- Small 20px and medium 56px presets
- Dark-first theme
- Reduced-motion and visibility-aware animation lifecycle

## Verified source material

- `brand-orbs-v2.html — complete authored specimen library`
- `src/shaders/brand-orbs/sources/brand-orbs-v2.html`
- `src/shaders/brand-orbs/BrandOrbs.tsx`

Source revision: `SHA-256 c2733de8cf7b`

## Implementation steps

1. Open every verified source file listed above and identify the renderer, host lifecycle, styles, and assets before editing.
2. Keep the complete Brand Orbs V2 document byte-for-byte as the canonical provenance source.
3. Use BrandOrbs as the public entry point and select claude, openai, codex, cursor, gemini, figma, framer, react, swift, designcode, aura, dreamcut, ui, ux, css, ios, neuform, github, x, instagram, threads, linkedin, or email with the variant prop.
4. Extract only the authored orb engine into an allow-scripts-only srcDoc and mount one canvas so the separate book and study specimens do not allocate render loops.
5. Use size small for compact inline status and medium for the default presentation; do not stretch either tuned preset with CSS transforms.
6. Keep the default dark mode for the catalog presentation, switch to light only for a known light surface, and use paused to freeze the current frame rather than overloading speed.
7. Pause time and drawing when the host is offscreen, the document is hidden, or paused is true; preserve the authored reduced-motion still frame.
8. Give the local component a sized, overflow-controlled parent and verify desktop, mobile, reduced-motion, and context-loss behavior.

Asset handling: This effect has no required external assets.

## Local component example

Import the copied local component rather than a package entrypoint:

```tsx
import { BrandOrbs } from "./effects/brand-orbs/BrandOrbs";
import "./effects/brand-orbs/styles.css";

export function Scene() {
  return <div className="effect-frame"><BrandOrbs /></div>;
}
```

## Core renderer pattern

This excerpt documents orchestration only. Copy the exact shader, geometry, pass, and interaction code from the verified source files.

```tsx
<BrandOrbs variant="openai" size="medium" mode="dark" speed={1} aria-label="OpenAI is reasoning" />
```

## Behavior contract

- Runtime: Canvas 2D
- Passes: 1 transparent Canvas 2D dot-lattice pass
- Interaction: Twenty-three variants, small and medium presets, dark-first theme, speed, pause, reduced motion, visibility pause, and deterministic restart
- Assets: Embedded vector paths and procedural geometry; no external runtime assets
- **renderer** (host): Sandboxed authored Canvas 2D engine
- **variants** (fixed): 23 brand marks
- **size** (fixed): Small 20px | Medium 56px (default)
- **theme** (adaptive): Dark (default) | Light
- **motion** (adaptive): Speed | Pause | Reduced motion | Visibility
- **assets** (embedded): Vector paths + procedural dots

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
