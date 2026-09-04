# Page Topology — molo.com/en-DK (desktop 1440 × 11,948)

Page background `rgb(251,251,251)`. Everything is one normal document flow — **no scroll
container, no scroll-snap, no smooth-scroll library** (verified: no `.lenis`,
no `[data-scroll-container]`). Every `<section>` carries `margin-bottom: 156px`
except the last.

## Fixed overlay layer

| Order | Element | Geometry |
|---|---|---|
| 1 | **USP marquee bar** | `position: fixed; top: 0; height: 32px; z-index: 50`, `bg rgb(24,24,24)`, close button 33 × 32 at right edge |
| 2 | **Header** | `position: fixed; top: 32px; height: 88px; z-index: 50; mix-blend-mode: difference`, `padding: 0 60px`, `display: grid; grid-template-columns: 508.8px 254.4px 508.8px; column-gap: 24px` (≈ `1fr auto 1fr`) |

`mix-blend-mode: difference` is why the header reads black over pale sections and inverts
to white over dark photography — it is **not** a scroll-driven colour swap.

## Flow sections (top → bottom)

| # | Module type | Top | Height | Content |
|---|---|---|---|---|
| 0 | **Hero carousel** | 32 | 868 | Full-bleed media (autoplay/loop/muted `<video>` + 4 images), 5 slides. Overlay label bottom-left, `1 / 5` counter at `right: 112px; bottom: 60px`, prev/next at `right: 60px; bottom: 60px` |
| 1 | **Centred portrait** | 1056 | 900 | Label row pinned to the top of the section (`left/right: 60px`, `justify-content: space-between`), single 430 × 614 portrait centred below |
| 2 | **Product grid** | 2112 | 440 | 4 × 270px cards, 80px gap, 7/10 images, name + `FROM <price>`, size chips |
| 3 | **Statement** | 2708 | 120 | `display` 40/40 paragraph, wraps at ~44% of the viewport |
| 4 | **Split pair** | 2984 | 900 | Two 720 × 900 panels, edge-to-edge, zero gap |
| 5 | **Product grid** | 4040 | 440 | as #2 |
| 6 | **Statement** | 4637 | 160 | as #3 |
| 7 | **Full-bleed video** | 4953 | 900 | Looping `<video>` + top label row |
| 8 | **Product carousel** | 6009 | 496 | Same card as #2 with `PREVIOUS` / `NEXT` controls, 6 cards |
| 9 | **Landscape media** | 6661 | 900 | Single 780 × 546 landscape + top label row |
| 10 | **Split pair** | 7717 | 900 | as #4 |
| 11 | **Centred portrait** | 8773 | 900 | as #1 |
| 12 | **Marquee strip** | 9829 | 595 | `display` headline, then 20 × 160 × 396 cut-outs scrolling horizontally |
| 13 | **Split pair** | 10580 | 900 | as #4, `margin-bottom: 0` |

## Footer

`bg rgb(72,163,220)` (`--color-blue`), `padding: 37px 60px 56px`, height 468.
Grid `270px × 4`, `column-gap: 80px`. Columns: HELP · ABOUT · FOLLOW US · newsletter.
Bottom row is a second 4-column grid: `EN / DKK` + `© MOLO 2026` | e-mærket badge | — | oversized
wordmark bottom-right.

## Reusable module vocabulary (the whole page is 7 primitives)

1. `MediaBlock` — full-bleed media, fixed height, optional overlay label row (top or bottom)
2. `SplitPair` — two 1/2-width media panels, zero gap
3. `ProductGrid` — 4-up card grid
4. `ProductCarousel` — same card, horizontal scroll + prev/next
5. `Statement` — one oversized `display` paragraph
6. `MarqueeStrip` — headline + infinite horizontal image train
7. `LabelRow` — `left ⟷ right` mono uppercase row, `mix-blend-mode: difference`
