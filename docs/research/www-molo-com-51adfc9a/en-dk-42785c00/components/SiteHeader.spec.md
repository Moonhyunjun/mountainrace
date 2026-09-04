# SiteHeader Specification

## Overview
- **Target file:** `src/components/sites/www-molo-com-51adfc9a/en-dk-42785c00/SiteHeader.tsx`
- **Screenshot:** `docs/design-references/www-molo-com-51adfc9a/en-dk-42785c00/desktop-full.jpg` (y 32–120)
- **Interaction model:** scroll-driven (height only)

## DOM Structure
`header` (grid, 3 columns) → `div.navigation` (left nav) | `div.logo` (centred wordmark link) | `nav.right` → `ul` (utility links)

## Computed Styles (exact)

### header
- position: `fixed`; top: `32px`; left/right: `0`; z-index: `50`
- display: `grid`; gridTemplateColumns: `508.797px 254.391px 508.797px` → implement as `1fr auto 1fr`; columnGap: `24px`; gridTemplateRows: `88px`
- padding: `0 60px`; height: `88px`
- backgroundColor: `rgba(0,0,0,0)`; boxShadow: `none`; borderBottom: `none`
- **mixBlendMode: `difference`**
- The `<header>` box itself computes `color: rgb(24, 24, 24)`, but every
  **visible** nav item overrides it to `color: rgb(255, 255, 255)` (measured on
  the live `TEEN` / `JUNIOR` / `BABY & TODDLER` buttons). The white source is what
  makes the difference blend resolve to near-black over the pale page — with a
  dark source it would wash out to `rgb(227,227,227)`. The `rgb(24,24,24)` links
  in the DOM belong to the hidden mega-menu flyout, which renders on a white panel
  outside the blended header.
- transition: `height 0.3s`

### div.navigation (left)
- display: `flex`; alignItems: `center`; height: `88px`
- item font: mono `11px / 15.4px`, letterSpacing `-0.11px`, textTransform `uppercase`
- item gap: `24px`

### div.logo (centre)
- display: `flex`; justifyContent: `center`; alignItems: `center`; height: `88px`
- link box: `98px × 41px` (Molo wordmark) — the clone renders a text wordmark at the same optical size

### nav.right
- display: `flex`; justifyContent: `flex-end`; alignItems: `center`; height: `88px`
- `ul`: display `flex`; gap `24px`; alignItems `center`; height `15.39px`
- font: mono `11px / 15.4px`, letterSpacing `-0.11px`, uppercase

## States & Behaviors
### Scroll shrink
- **Trigger:** `window.scrollY > 600` (measured: 88 → 56 by scroll 600)
- **State A:** `height: 88px` · **State B:** `height: 56px`
- **Transition:** `height 0.3s` — nothing else changes
- **Implementation:** `scroll` listener (passive) toggling a boolean
### Colour inversion
- White text + `mix-blend-mode: difference` only. **Never** swap colours in JS,
  and never darken the source — see the note above.
### Hover
- link color `rgb(24,24,24)` → `rgba(24,24,24,.5)`; no transform, no underline

## Assets
None — wordmark is type.

## Text Content (clone)
Left: `2027 대회` · `2026 기록` · `코스` · `장소`
Centre: `MOUNTAIN RACE`
Right: `일정` · `INSTAGRAM` · `사전알림`

## Responsive Behavior
- 1440 / 768: `padding: 0 60px`, height 88 → 56
- 390: `padding: 0 20px`, height `56px` (already shrunk), left nav collapses to a `MENU` button that opens a full-screen sheet; centre wordmark and a single `사전알림` link remain.
- Breakpoint: **768px**
