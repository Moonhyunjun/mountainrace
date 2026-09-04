# SplitPair Specification

## Overview
- **Target file:** `src/components/sites/www-molo-com-51adfc9a/en-dk-42785c00/SplitPair.tsx`
- **Screenshot:** `desktop-full.jpg` y 2984–3884, 7717–8617, 10580–11480
- **Interaction model:** static

## Computed Styles (exact)
### section
- display: `block`; width: `1440px`; height: `900px`; marginBottom: `156px` (`0` on the last instance)
### grid
- display: `grid`; gridTemplateColumns: `1fr 1fr`; gap: `0`; height: `900px`
### panel
- each panel `720 × 900`; media `object-fit: cover`; `border-radius: 0`; no gutter between panels
- each panel carries its own overlay label: `position: absolute; left: 60px / right: 60px; bottom: 60px`,
  mono `11px / 16.5px`, letterSpacing `-0.11px`, uppercase, `color: rgb(255,255,255)`, `mix-blend-mode: difference`
  (left panel's label is left-aligned at the section's left gutter; right panel's is right-aligned at the right gutter)

## States & Behaviors
Static; no hover change on the media.

## Assets
Plates via `MediaFrame` — see `ARTIFACT_MANIFEST.md`.

## Text Content (clone)
| Instance | Left panel | Right panel |
|---|---|---|
| #1 | `START LINE` | `RIDGE TRAIL` |
| #2 | `FINISH` | `COMMUNITY` |
| #3 | `15K · TRAIL START` | `35K · ITRA 2 POINTS` |

## Responsive Behavior
- 1440 / 768: two across (`1fr 1fr`), height 900 / 620
- 390: stacked (`grid-template-columns: 1fr`), each panel `100vw × 480px`, labels at `left/right: 20px`
- Breakpoint: **768px**
