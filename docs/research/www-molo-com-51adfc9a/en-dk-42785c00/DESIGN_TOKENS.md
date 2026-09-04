# Design Tokens — molo.com/en-DK

All values below are read from `getComputedStyle()` on the live page (see `raw-global.json`,
`raw-geometry.json`). **Root font-size is `10px`** (`html { font-size: 62.5% }`), so `1rem = 10px`
and every `rem` in Molo's own CSS custom properties maps to `value × 10 = px`.

## Color (verbatim custom properties)

| Token | Value | Used for |
|---|---|---|
| `--color-black` | `rgb(24, 24, 24)` | body text, USP bar background |
| `--color-black-hover` | `rgba(24, 24, 24, .5)` | link hover |
| `--color-inactive` | `rgba(24, 24, 24, .35)` | inactive nav / meta |
| `--color-white` | `rgb(251, 251, 251)` | page background, USP bar text |
| `--color-image-background` | `rgb(241, 241, 239)` | image placeholder plate |
| `--color-light-gray` | `rgb(237, 237, 237)` | dividers |
| `--color-gray` | `rgb(217, 217, 217)` | rules |
| `--color-dark-gray` | `rgb(69, 69, 69)` | size chips under product cards |
| `--color-border` | `rgb(230, 230, 230)` | input underline |
| `--color-placeholder` | `#999` | "Sold out", input placeholder |
| `--color-blue` | `#48a3dc` | **footer background** |
| `--color-green` | `rgb(0, 175, 102)` | in-stock dot |
| `--color-low-stock` | `rgb(203, 101, 7)` | low-stock label |
| `--color-error` | `rgb(204, 102, 119)` | form error |
| `--main-color` | `#2C622C` | brand accent |
| `--link-color` / `--hover-color` | `#234923` | inline links |
| `--footer-background` | `#f6f6f6` | (declared; the live footer paints `--color-blue`) |

## Typography

Three families, all with `font-display: swap` and an `Arial` fallback carrying
`size-adjust` / `ascent-override`:

| Family | Declared stack | Role |
|---|---|---|
| `simon` (Simon Mono) | `"simon", "simon Fallback", "IBM Plex Mono", "SF Mono", Menlo, Consolas, "Liberation Mono", monospace` | every label, nav item, product name, price, footer link |
| `text` | `"text", "text Fallback", "Helvetica Neue Medium", sans-serif` | body default (14px) |
| `display` | `"display", "display Fallback", "Helvetica Neue Medium", sans-serif` | statement paragraphs |

Measured type scale:

| Role | size / line-height / letter-spacing / transform | color |
|---|---|---|
| USP marquee | `10px / 15px / -0.2px` | `rgb(251,251,251)` |
| Header right nav (`SEARCH`, `LOGIN`…) | `11px / 15.4px / -0.11px / uppercase` | `rgb(255,255,255)` + `mix-blend-mode: difference` |
| Header left nav (`TEEN`, `JUNIOR`…) | `11px / 15.4px / -0.11px / uppercase` | `rgb(255,255,255)` + `mix-blend-mode: difference` |
| Flyout menu links | `18px / -0.36px / uppercase`, family `text` | `rgb(24,24,24)` |
| Section overlay labels | `11px / 16.5px / -0.11px / uppercase` | `rgb(255,255,255)` + `mix-blend-mode: difference` |
| Hero counter `1 / 5` | `11px / 15.4px / -0.11px / uppercase` | `rgb(255,255,255)` + `mix-blend-mode: difference` |
| Product name / price | `11px / 15.4px / -0.11px / uppercase` | `rgb(24,24,24)` |
| Size chips | `11px / 15.4px / -0.11px / uppercase` | `rgb(69,69,69)` |
| "Sold out" | `11px / 15.4px / -0.11px / capitalize` | `rgb(153,153,153)` |
| Statement paragraph | `40px / 40px / -0.8px`, family `display` | `rgb(24,24,24)` |
| Footer links | `11px`, family `simon`, uppercase | `rgb(24,24,24)` |

Note the display scale is *set solid*: `font-size: 40px` with `line-height: 40px` (ratio 1.0).

## Spacing & layout

| Token | Value (px) |
|---|---|
| `--site-padding` | `6rem` = **60px** (left/right gutter everywhere) |
| `--module-gap` | `15.6rem` = **156px** (`margin-bottom` on every `<section>`) |
| `--header-height` | `8.8rem` = **88px** (→ 56px once scrolled) |
| `--usp-height` | `3.2rem` = **32px** |
| `--grid-column-gap` | `8rem` = **80px** |
| `--grid-column-width` | `calc((100vw - 120px - 240px) / 4)` = **270px** at 1440 |
| `--button-height` | `4.8rem` = 48px |
| `--control-padding` | `1.55rem 2rem` = 15.5px / 20px |
| `--border-radius` | `.2rem` = **2px** |
| `--dialog-padding` | `2.4rem` = 24px |
| `--drawer-max-width` | `43.2rem` = 432px |

## Aspect ratios

| Token | Value | Applied to |
|---|---|---|
| `--ratio-product` | `7 / 10` | product card image (270 × 386) |
| `--ratio-portrait` | `4 / 5` | centred portrait module (430 × 614 ≈ 7/10 rendered) |
| `--ratio-landscape` | `5 / 4` | landscape media (780 × 546) |
| — | `4 / 5` | split-pair panels (720 × 900) |

## Motion

| Token | Value |
|---|---|
| `--easeOutQuart` | `cubic-bezier(.165, .84, .44, 1)` |
| Header shrink | `transition: height 0.3s` |
| USP marquee | `animation: scroll 152.644s linear infinite` (`react-fast-marquee`) |

## Z-index ladder

`--header-z-index: 50` · `--header-backdrop-z-index: 49` · `--sticky-buy-z-index: 20`
· `--newsletter-popup-z-index: 30` · `--campaign-popup-z-index: 31` · `--backdrop-z-index: 99`
· `--dialog-z-index: 100`

## Font substitution in the clone (licensing)

Molo's `text` / `display` / `simon` webfont files are proprietary and were **not** downloaded.
The clone uses the fallback stacks Molo itself declares:

| Molo family | Clone substitute | Reason |
|---|---|---|
| `simon` | `"IBM Plex Mono", "SF Mono", Menlo, Consolas, "Liberation Mono", monospace` | verbatim from Molo's own `--font-family-mono` fallback |
| `text` / `display` | `"Pretendard Variable", "Helvetica Neue", Arial, sans-serif` | Molo's declared fallback is Helvetica Neue Medium; Pretendard (OFL) is added first because the injected content is Korean |
