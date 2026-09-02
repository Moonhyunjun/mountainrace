---
name: add-landscape
description: "Build Landscape from its verified Community source with the complete renderer, interactions, controls, and required assets."
---

# Build Landscape

A tower-free procedural terrain whose light, sky, fog, stars, rain, lightning, snow, grass, and stones move through seven authored environment states.

## Verified source material

- `src/shaders/japanese-tower/Towers.html — exact upstream self-contained source`
- `scripts/generate-landscape.mjs — deterministic tower-free presentation adapter`
- `src/shaders/landscape/LandscapeScene.tsx`
- `public/landscape.html — generated scene-only package asset`

Source revision: `e8aab488464bcd44471c390cf309597c6f3adb05`

## Requirements

- Preserve the complete Three.js r149 renderer and every published Community option.
- Preserve its interaction contract: Pointer parallax, drag-to-orbit, wheel and pinch zoom, with cross-fading time and weather systems.
- Preserve its assets: No external scene assets — the exact self-contained source carries its runtime and procedural systems.
- Verify resize, mobile, reduced motion, visibility, teardown, and console health.
