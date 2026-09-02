---
name: add-sketchbook
description: "Build Sketchbook from its verified authored source using DOM + CSS 3D, including the complete renderer, interactions, and required assets. Use when Codex needs to implement, port, or adapt this effect without requiring the ThreeUI package or reconstructing the visual from an approximation."
---

# Build Sketchbook

## Description

The exact Singapore paper sketchbook with nested-strip page curls, direct dragging, tilt, zoom, a movable magnifying glass, and its complete authored plate set.

Recreate the authored behavior from the verified source, not from screenshots or the abbreviated orchestration sample in this skill. The implementation may live directly in the target project and does not require `@designcodeio/threeui`.

## Technologies

- Semantic HTML, JavaScript, and CSS 3D transforms
- Eighteen nested strips per turning leaf for the page curl
- Pointer drag/tap, keyboard navigation, cursor tilt, zoom, draggable loupe, intro riffle, and reduced motion
- Fourteen exact artworks and three exact local font files
- Optional sandboxed `srcDoc` iframe for strict style and event isolation

## Verified source material

- `sketchbook/index.html — complete interaction source`
- `sketchbook/* — 14 artworks and 3 owned font files`
- `src/shaders/sketchbook/sketchbookDocument.js`
- `src/shaders/sketchbook/Sketchbook.tsx`

Source revision: `3938bc8def563f89ed587e52ac35ddc056c0a5f0`

## Implementation steps

1. Open every verified source file listed above and identify the renderer, host lifecycle, styles, and assets before editing.
2. Copy the complete authored document and all 17 local assets without renaming or recompressing them.
3. Preserve the page/spread model and build every turning leaf from the exact 18-strip nested transform structure.
4. Keep direct dragging, tap turns, arrows, keyboard controls, tilt, zoom, loupe movement, intro riffle, and coarse-pointer behavior together.
5. Resolve image and font URLs from one configurable asset base before loading the document.
6. Honor reduced motion, clean up listeners and animation frames, and verify every spread and asset path.
7. Give the local component a sized, overflow-controlled parent and verify desktop, mobile, reduced-motion, and context-loss behavior.

Asset handling: Copy all 14 artworks and three fonts under the configured asset base URL.

## Local component example

Import the copied local component rather than a package entrypoint:

```tsx
import { Sketchbook } from "./effects/sketchbook/Sketchbook";
import "./effects/sketchbook/styles.css";

export function Scene() {
  return <div className="effect-frame"><Sketchbook assetBaseUrl="/sketchbook/" /></div>;
}
```

## Core renderer pattern

This excerpt documents orchestration only. Copy the exact shader, geometry, pass, and interaction code from the verified source files.

```tsx
const documentSource = createSketchbookDocument("/sketchbook/");
return (
  <iframe
    title="Interactive Singapore sketchbook"
    srcDoc={documentSource}
    sandbox="allow-scripts"
  />
);
```

## Behavior contract

- Runtime: DOM + CSS 3D
- Passes: 18 nested CSS 3D strips per turning leaf
- Interaction: Drag or tap pages, arrows, keyboard, cursor tilt, zoom, and draggable loupe
- Assets: 14 exact artworks + 3 exact local font files
- **renderer** (host): DOM + CSS 3D
- **pageCurl** (fixed): 18 nested strips
- **interaction** (pointer): Drag + zoom + loupe
- **motion** (adaptive): Reduced-motion aware
- **assetBaseUrl** (string): /sketchbook/
- **assets** (fixed): 17 exact local files

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
