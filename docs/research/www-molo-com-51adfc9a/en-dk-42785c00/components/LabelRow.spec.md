# LabelRow Specification (shared primitive)

## Overview
- **Target file:** `src/components/sites/www-molo-com-51adfc9a/en-dk-42785c00/LabelRow.tsx`
- **Interaction model:** static

Used by every media module. Two variants: `top` (pinned to the section's top edge) and
`bottom` (pinned 60px above the section's bottom edge, used by the hero).

## Computed Styles (exact, from `.stickyText` and the hero label)
- position: `absolute`; left: `60px`; right: `60px`; zIndex: `1`
- variant `top`: `top: 0` · variant `bottom`: `bottom: 60px`
- display: `flex`; justifyContent: `space-between`; alignItems: `center`; height: `16.5px`
- color: `rgb(255, 255, 255)`; **mixBlendMode: `difference`**
- fontFamily: mono; fontSize: `11px`; lineHeight: `16.5px`; letterSpacing: `-0.11px`; textTransform: `uppercase`
- right-hand `<p>`: `text-align: right`
- multi-line labels use a literal newline (`white-space: pre-line`), e.g. `NEW ARRIVALS\nEXPLORE NOW`

## States & Behaviors
Hover on the right-hand link: colour → `rgba(24,24,24,.5)` after blending. No transition on the live site.

## Responsive Behavior
- 1440 / 768: `left/right: 60px`
- 390: `left/right: 20px`; font size unchanged at `11px`
