---
name: add-character-carousel
description: "Build Character Carousel from its verified authored source using DOM + CSS, including the complete renderer, interactions, and required assets. Use when Codex needs to implement, port, or adapt this effect without requiring the ThreeUI package or reconstructing the visual from an approximation."
---

# Build Character Carousel

## Description

Two authored editorial character-card carousels collected as a light filmstrip and a dark responsive wave.

Recreate the authored behavior from the verified source, not from screenshots or the abbreviated orchestration sample in this skill. The implementation may live directly in the target project and does not require `@designcodeio/threeui`.

## Technologies

- React variant host
- Two byte-exact authored DOM/CSS documents
- Embedded portrait JPEGs
- Sandboxed source isolation
- Pointer, wheel, keyboard, palette, and lifecycle controls

## Verified source material

- `character-filmstrip.html — complete authored light filmstrip`
- `character-wave.html — complete authored dark wave`
- `src/shaders/character-carousel/sources/character-filmstrip.html`
- `src/shaders/character-carousel/sources/character-wave.html`
- `src/shaders/character-carousel/CharacterCarousel.tsx`

Source revision: `SHA-256 4c98939e0e2b`

## Implementation steps

1. Open every verified source file listed above and identify the renderer, host lifecycle, styles, and assets before editing.
2. Keep CharacterCarousel as the public entry point and select filmstrip or wave with the variant prop.
3. Retain both complete source documents byte-for-byte, including their embedded portraits, card labels, paper or grain surfaces, looping geometry, and responsive breakpoints.
4. Preserve the filmstrip pointer, wheel, arrow, focus, and idle-drift behavior plus the wave orientation toggle and horizontal-to-vertical responsive transition.
5. Expose speed and scale through a postMessage adapter and apply opacity and palette grading only at the outer iframe boundary so defaults remain source-exact.
6. Keep allow-scripts as the only sandbox permission and pause the authored loop whenever the host or document is hidden.
7. Give the local component a sized, overflow-controlled parent and verify desktop, mobile, reduced-motion, and context-loss behavior.

Asset handling: This effect has no required external assets.

## Local component example

Import the copied local component rather than a package entrypoint:

```tsx
import { CharacterCarousel } from "./effects/character-carousel/CharacterCarousel";
import "./effects/character-carousel/styles.css";

export function Scene() {
  return <div className="effect-frame"><CharacterCarousel /></div>;
}
```

## Core renderer pattern

This excerpt documents orchestration only. Copy the exact shader, geometry, pass, and interaction code from the verified source files.

```tsx
<CharacterCarousel variant="wave" speed={1} scale={1} />
```

## Behavior contract

- Runtime: DOM + CSS
- Passes: 1 selected responsive DOM/CSS card composition
- Interaction: Pointer focus, wheel and arrow navigation, card selection, idle drift, responsive orientation, scale, speed, opacity, and palette
- Assets: 4 embedded authored portrait JPEGs shared by both exact source documents
- **renderer** (host): Sandboxed authored DOM/CSS documents
- **variant** (prop): "filmstrip" | "wave"
- **interaction** (input): pointer + wheel + keyboard + card focus
- **lifecycle** (host): responsive + visibility-aware + reduced motion

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
