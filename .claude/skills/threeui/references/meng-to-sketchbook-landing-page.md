---
name: add-meng-to-sketchbook-landing-page
description: "Build Sketchbook from its verified authored source using Full HTML + DOM/CSS + JavaScript, including the complete renderer, interactions, and required assets. Use when Codex needs to implement, port, or adapt this effect without requiring the ThreeUI package or reconstructing the visual from an approximation."
---

# Build Sketchbook

## Description

A tactile personal portfolio built as a Singapore sketchbook, with nine illustrated plates, curled page turns, a draggable magnifying glass, zoom controls, a botanical paper atmosphere, and an editorial index.

Recreate the authored behavior from the verified source, not from screenshots or the abbreviated orchestration sample in this skill. The implementation may live directly in the target project and does not require `@designcodeio/threeui`.

## Technologies

- React iframe host
- Byte-exact complete authored HTML document
- Same-project local source URL
- Fourteen local paper, botanical, and Singapore illustration images plus three local Instrument Serif and Newsreader font files

## Verified source material

- `src/shaders/landing-pages/LandingPages.tsx`
- `src/shaders/landing-pages/pageTypography.ts`
- `src/shaders/landing-pages/pageRecipes.ts`
- `public/landing-pages/meng-to-sketchbook.html — byte-exact complete page`
- `public/landing-pages/meng-to-sketchbook/ — 17 local image and font assets`

Source revision: `SHA-256 e0330548b1ac`

## Implementation steps

1. Open every verified source file listed above and identify the renderer, host lifecycle, styles, and assets before editing.
2. Copy the complete Meng To Sketchbook HTML file byte-for-byte to /landing-pages/meng-to-sketchbook.html; do not extract, rewrite, shorten, or rebrand any section.
3. Preserve every embedded style, script, media payload, text string, interaction, responsive rule, and document-level lifecycle.
4. Keep every relative local asset at the exact path expected by the original document.
5. Load the local document in a full-size iframe whose permissions retain the authored forms, modals, downloads, popups, scripts, and same-origin resources.
6. Lazy-load only the React host bundle; do not import the complete HTML into the application JavaScript graph.
7. Give the local component a sized, overflow-controlled parent and verify desktop, mobile, reduced-motion, and context-loss behavior.

Asset handling: Copy meng-to-sketchbook.html byte-for-byte and keep all 17 files under meng-to-sketchbook/ at exactly that relative path. The page needs no network access.

## Local component example

Import the copied local component rather than a package entrypoint:

```tsx
import { MengToSketchbookLandingPage } from "./effects/meng-to-sketchbook-landing-page/MengToSketchbookLandingPage";
import "./effects/meng-to-sketchbook-landing-page/styles.css";

export function Scene() {
  return <div className="effect-frame"><MengToSketchbookLandingPage /></div>;
}
```

## Core renderer pattern

This excerpt documents orchestration only. Copy the exact shader, geometry, pass, and interaction code from the verified source files.

```tsx
<LandingPageFrame title="Meng To Sketchbook" sourceUrl="/landing-pages/meng-to-sketchbook.html" />
```

## Behavior contract

- Runtime: Full HTML + DOM/CSS + JavaScript
- Passes: 1 sandboxed full-document renderer
- Interaction: Original page turns, pointer tilt, draggable magnifier, zoom controls, navigation, scroll, keyboard, and responsive layout
- Assets: Fourteen local paper, botanical, and Singapore illustration images plus three local variable and display fonts
- **document** (fixed): Complete original meng-to-sketchbook.html, byte-for-byte
- **sourceUrl** (fixed): /landing-pages/meng-to-sketchbook.html
- **headingFont** (optional): Instrument Serif | Newsreader | Geist
- **bodyFont** (optional): Newsreader | Geist | Instrument Serif
- **headingWeight** (optional): 300 | 400 | 500 | 600
- **bodyWeight** (optional): 200 | 300 | 400 | 500 | 600
- **primaryColor** (optional): Hex color — page ink and its opacity tints; the warm earth accent remains authored
- **typography** (optional): Nameplate and plate-title scale + body scale + heading tracking
- **layout** (responsive): Original full landing page inside the preview frame
- **interaction** (original): Page turns + magnifier drag + zoom + pointer tilt + scroll + keyboard
- **assets** (local): 17 packaged files in public/landing-pages/meng-to-sketchbook/; no network request

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
