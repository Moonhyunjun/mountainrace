# Behaviors — molo.com/en-DK

Findings from the mandatory interaction sweep (scroll / click / hover / responsive),
captured with Chromium + Playwright at 1440, 768 and 390.

## 1. Header shrink (scroll-driven) — the only scroll behaviour on the page

| | State A (scrollY = 0) | State B (scrollY ≥ ~600) |
|---|---|---|
| `height` | `88px` | `56px` |
| everything else | `position: fixed; top: 32px; padding: 0 60px; background: transparent; box-shadow: none; z-index: 50; mix-blend-mode: difference` | identical |

- **Trigger:** window scroll past the hero threshold.
- **Transition:** `transition: height 0.3s` — height only. No background, shadow, border,
  transform or colour change.
- **Implementation:** scroll listener → boolean class. Nothing needs IntersectionObserver.

## 2. Header colour inversion (not a state change)

The header's visible nav items are painted **white** (`rgb(255,255,255)`) under
`mix-blend-mode: difference`.
Over the pale page it reads near-black; over dark photography it inverts to white
automatically. The same trick is on the hero counter, the hero prev/next controls and
every section overlay label (`color: rgb(255,255,255)` + `mix-blend-mode: difference`).
**Do not implement this as a JS colour swap.**

## 3. USP marquee (time-driven)

`react-fast-marquee`: the child train is duplicated and translated with
`animation: scroll 152.644s linear infinite`. Track width 1526.44px per copy,
each child 508.81px. A 33 × 32 close button sits at the right edge (`z-index: 1001`)
and removes the bar (the header then sits at `top: 0`).

## 4. Hero carousel (time + click)

5 slides, autoplaying. Counter renders as three separate spans — `1`, `/`, `5` — with
`gap: 3px`. Controls are two 4 × 18 arrow buttons, `justify-content: space-between`
inside a 29 × 18 box. Videos are `autoplay loop muted` (and therefore `playsinline`).
On mobile the counter is replaced by `.mobileProgress`: five 12 × 1px bars, `gap: 4px`,
positioned `right: 60px; bottom: 42px`.

## 5. Product carousel (click-driven)

`PREVIOUS` / `NEXT` mono buttons scroll the card row horizontally. Not scroll-snap,
not auto-advancing.

## 6. Marquee strip (time-driven)

Section 12: a horizontal train of 20 cut-out figures, 160 × 396 each, translating
continuously — same marquee mechanism as the USP bar.

## 7. Hover states

| Element | Change |
|---|---|
| Header / footer / label links | colour → `rgba(24,24,24,.5)` (`--color-black-hover`) |
| Product card | image swaps to the second shot; size chips fade in over the image |
| Footer section headings | permanent 1px underline (not a hover) |

No transforms, no scale, no shadow anywhere on hover.

## 8. Entrance animations

**None.** No fade-up, no stagger, no `animation-timeline`, no IntersectionObserver
reveals. Content is simply present. This is a deliberate part of the design's stillness —
adding reveal animations would be wrong.

## 9. Responsive

Custom properties are re-declared per breakpoint; the layout primitives do not change type.

| | 1440 | 768 | 390 |
|---|---|---|---|
| `--site-padding` | 60px | 60px | 20px |
| `--header-height` | 88px | 88px | 56px |
| `--module-gap` | 156px | 156px | 80px |
| Product grid | 4 cols | 2 cols | 2 cols |
| Footer grid | 4 × 270px | 2 cols | 1 col |
| Split pair | 2 across | 2 across | stacked |
| Hero counter | `1 / 5` + arrows | same | 5 progress bars |

Breakpoint where the desktop grid collapses: **~1024px**; the mobile gutter and header
height change at **~768px**.
