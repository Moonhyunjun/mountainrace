# MediaBlock Specification (centred portrait / full-bleed / landscape)

## Overview
- **Target file:** `src/components/sites/www-molo-com-51adfc9a/en-dk-42785c00/MediaBlock.tsx`
- **Screenshot:** `desktop-full.jpg` — centred portrait y 1056–1956; full-bleed y 4953–5853; landscape y 6661–7561
- **Interaction model:** static

## DOM Structure
`section` → `div.container(relative, flex column)` → `LabelRow variant="top"` + `div.media`

## Computed Styles (exact)

### section
- display: `block`; width: `1440px`; height: `900px`; marginBottom: `156px`

### div.container
- display: `flex`; flexDirection: `column`; position: `relative`; width: `1440px`; height: `900px`
- backgroundColor: `rgb(251, 251, 251)`
- justifyContent: `center`; alignItems: `center` (the media is optically centred in the 900px band)

### media, by variant
| variant | rendered size | object-fit |
|---|---|---|
| `portrait` | `430 × 614` centred | `cover` |
| `landscape` | `780 × 546` centred | `cover` |
| `bleed` | `1440 × 900`, edge to edge | `cover` |

- borderRadius: `0` on every variant.

## States & Behaviors
Static. The whole block is one `<a>` on the live site (`display: flex; width: 1440px; height: 900px`);
hover produces no visual change on the media.

## Assets
Live originals not downloaded (see `ARTIFACT_MANIFEST.md`). `MediaFrame` renders a
`rgb(241,241,239)` plate (`--color-image-background`) at the exact size with a mono caption.

## Text Content (clone)
| Instance | Left label | Right label |
|---|---|---|
| portrait #1 | `2026 RECAP` | `기록 보기` |
| bleed (video slot) | `VENUE\n피노키오숲` | `장소 안내` |
| landscape | `원주산악자전거파크` | `코스 보기` |
| portrait #2 | `ROAD TO 2027` | `사전알림 신청` |

## Responsive Behavior
- 1440: as above
- 768: portrait `340 × 486`, landscape `648 × 454`, section height `720px`
- 390: portrait `min(78vw, 300px)`, landscape full-width, section height `auto` with `padding: 0 20px`; `bleed` becomes `100vw × 70svh`
