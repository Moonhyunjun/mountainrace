---
name: add-temple-night
description: "Build Temple Night from its verified Community source with the complete renderer, interactions, controls, and required assets."
---

# Build Temple Night

Kage’s procedural Kyoto mountain temple after dark, with the exact authored architecture, rain, mist, leaves, pointer wisps, camera composition, and bloom pipeline.

## Verified source material

- `kage-github/index.html — procedural Three.js world`
- `src/shaders/temple-night/templeNightRenderer.js`
- `src/shaders/temple-night/TempleNightScene.tsx`

Source revision: `4399487d2fb42bce39c7b032fbbb50d230bf4f0b`

## Requirements

- Preserve the complete Three.js r149 renderer and every published Community option.
- Preserve its interaction contract: Pointer parallax and world-space cursor wisps.
- Preserve its assets: No external scene assets.
- Verify resize, mobile, reduced motion, visibility, teardown, and console health.
