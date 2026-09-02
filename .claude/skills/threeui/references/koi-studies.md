---
name: add-koi-studies
description: "Build Koi Studies from its verified Community source with the complete renderer, interactions, controls, and required assets."
---

# Build Koi Studies

A tactile stack of three Japanese koi studies with CSS 3D depth, pointer tilt, drag and keyboard navigation, pixel-mask reveals, and animated halftone imagery.

## Verified source material

- `public/synthralos-halftone.html — byte-exact complete source`
- `src/shaders/koi-studies/KoiStudies.tsx`

Source revision: `SHA-256 32cf6493414a`

## Requirements

- Preserve the complete DOM + CSS 3D + Canvas 2D + WebGL renderer and every published Community option.
- Preserve its interaction contract: Drag, tap, or use the arrow keys to cycle cards, with pointer tilt, reveal trails, responsive layout, and reduced-motion behavior.
- Preserve its assets: 3 embedded JPEGs + 3 embedded MP4 clips + 1 inline halftone mask; the optional authored CDN shader has a CSS fallback.
- Verify resize, mobile, reduced motion, visibility, teardown, and console health.
