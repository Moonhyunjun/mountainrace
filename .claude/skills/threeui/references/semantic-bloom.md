---
name: add-semantic-bloom
description: "Build Semantic Bloom from its verified authored source using Canvas 2D + DOM/CSS, including the complete renderer, interactions, and required assets. Use when Codex needs to implement, port, or adapt this effect without requiring the ThreeUI package or reconstructing the visual from an approximation."
---

# Build Semantic Bloom

## Description

A customizable Codex wordmark that draws a viscous particle organism toward its letters, illuminating the text as the network searches and reconnects.

Recreate the authored behavior from the verified source, not from screenshots or the abbreviated orchestration sample in this skill. The implementation may live directly in the target project and does not require `@designcodeio/threeui`.

## Technologies

- React and TypeScript visibility-aware iframe host
- Byte-exact Organic Semantic Explorer HTML source
- Canvas 2D particle network with SVG goo and displacement filters
- Customizable DOM wordmark synchronized through postMessage
- Dark/light surfaces, pointer attraction, and reduced-motion handling

## Verified source material

- `design-f0ebbe02-7d8a-41fd-9041-a1124185c27b.html — complete Organic Semantic Explorer source`
- `src/shaders/semantic-bloom/sources/design-f0ebbe02-7d8a-41fd-9041-a1124185c27b.html`
- `src/shaders/semantic-bloom/SemanticBloom.tsx`

Source revision: `SHA-256 0e48ec9ed2c3`

## Implementation steps

1. Open every verified source file listed above and identify the renderer, host lifecycle, styles, and assets before editing.
2. Keep the complete selected HTML document byte-for-byte as the canonical provenance source.
3. Inject presentation-only CSS that hides the journal chrome and centers the editable semantic text without rewriting its particle engine.
4. Replace only the source particle and connection colors when light mode is selected; retain the authored dark values as exact defaults.
5. Send text, scale, and pause state through postMessage so interactive controls do not remount the iframe or reset the organism.
6. Pause animation when the host is offscreen or the document is hidden, and render a still frame when reduced motion is requested.
7. Keep the iframe allow-scripts-only so unmounting releases the document, canvas, listeners, filters, and animation frame together.
8. Give the local component a sized, overflow-controlled parent and verify desktop, mobile, reduced-motion, and context-loss behavior.

Asset handling: This effect has no required external assets.

## Local component example

Import the copied local component rather than a package entrypoint:

```tsx
import { SemanticBloom } from "./effects/semantic-bloom/SemanticBloom";
import "./effects/semantic-bloom/styles.css";

export function Scene() {
  return <div className="effect-frame"><SemanticBloom /></div>;
}
```

## Core renderer pattern

This excerpt documents orchestration only. Copy the exact shader, geometry, pass, and interaction code from the verified source files.

```tsx
<SemanticBloom text="Codex" mode="dark" size={1} opacity={1} />
```

## Behavior contract

- Runtime: Canvas 2D + DOM/CSS
- Passes: 1 filtered Canvas 2D particle network over a DOM wordmark
- Interaction: Pointer attraction, live text and size controls, synchronized light/dark mode, visibility pausing, and reduced-motion still frame
- Assets: No external assets
- **source** (fixed): Exact owner-selected HTML
- **focus** (host): Centered semantic wordmark
- **text** (optional): Codex
- **mode** (optional): dark | light
- **size** (optional): 0.55–1.6
- **motion** (adaptive): Pointer + reduced-motion still
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
