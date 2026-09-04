# UspMarquee Specification

## Overview
- **Target file:** `src/components/sites/www-molo-com-51adfc9a/en-dk-42785c00/UspMarquee.tsx`
- **Screenshot:** `docs/design-references/www-molo-com-51adfc9a/en-dk-42785c00/desktop-full.jpg` (y 0–32)
- **Interaction model:** time-driven (infinite marquee) + click (dismiss)

## DOM Structure
`div.container` → `div.marqueeViewport` → `div.marqueeTrack` → N × `span.item`; sibling `button.close` → `svg`.

## Computed Styles (exact, from getComputedStyle)

### Container
- position: `fixed`; top: `0`; left: `0`; right: `0`; height: `32px`; z-index: `50`
- display: `flex`; alignItems: `center`; overflow: `hidden`
- backgroundColor: `rgb(24, 24, 24)`; color: `rgb(251, 251, 251)`
- fontFamily: mono stack; fontSize: `10px`; lineHeight: `15px`; letterSpacing: `-0.2px`

### Track
- display: `flex`; alignItems: `center`; width: `1526.44px` per copy (child `508.81px` each)
- animation: `scroll 152.644s linear 0s infinite normal none running`
- Two copies of the train are rendered side by side so the loop is seamless.

### Close button
- position: `absolute`; right: `0`; width: `33px`; height: `32px`; padding: `0 12px`
- display: `flex`; alignItems: `center`; backgroundColor: `rgb(24,24,24)`; z-index: `1001`
- icon: `svg` 9 × 9

## States & Behaviors
### Marquee
- **Trigger:** always running. **Transition:** linear, no easing, no pause on hover.
- **Implementation:** CSS `@keyframes` translating `-50%` on a doubled track; `prefers-reduced-motion: reduce` → `animation: none`.
### Dismiss
- **Trigger:** click on close. **State A:** bar visible, header at `top: 32px`.
- **State B:** bar removed, header at `top: 0`. No transition on the live site.

## Assets
None. Close icon = inline SVG (two 8px crossing paths), from the shared `icons.tsx`.

## Text Content (clone — WONJU MOUNTAIN RACE)
`2027 WONJU MOUNTAIN RACE · 사전알림 접수 중 · 일정 확정 시 가장 먼저 알려드립니다`

## Responsive Behavior
- Desktop 1440 / Tablet 768 / Mobile 390: identical — height stays `32px`, font stays `10px`.
