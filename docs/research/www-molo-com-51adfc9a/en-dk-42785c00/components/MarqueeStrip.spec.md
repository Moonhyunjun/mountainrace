# MarqueeStrip Specification

## Overview
- **Target file:** `src/components/sites/www-molo-com-51adfc9a/en-dk-42785c00/MarqueeStrip.tsx`
- **Screenshot:** `desktop-full.jpg` y 9829–10424
- **Interaction model:** time-driven (infinite horizontal train)

## Computed Styles (exact)
### section
- display: `block`; width: `1440px`; height: `595.31px`; marginBottom: `156px`
### headline
- `h2`, `display` stack, fontSize `40px`, lineHeight `40px`, letterSpacing `-0.8px`, color `rgb(24,24,24)`
- padding: `0 60px`; maxWidth `44%`
- marginBottom: measured gap of `~96px` between the headline block and the train
### train
- `display: flex; gap: 0`; `overflow: hidden`; continuous translate, same mechanism as the USP marquee
- 20 items, each `160 × 396`, `object-fit: cover`, `border-radius: 0`
- item caption (clone addition, matching Molo's card meta): mono `11px`, uppercase, `rgb(69,69,69)`

## States & Behaviors
- **Trigger:** always running. **Transition:** `linear`, `infinite`.
- **Implementation:** doubled track + `@keyframes` translating `-50%`; `prefers-reduced-motion: reduce` → `animation: none` and the row becomes a plain horizontal scroller.

## Text Content (clone)
Headline: `원주의 숲과 능선을 잇는 35.92km. 구간마다 다른 얼굴을 만납니다.`
Train captions (checkpoints, 10 items × 2 copies):
`START` · `산악자전거파크` · `CP1` · `싱글트랙` · `능선 구간` · `CP2` · `피노키오숲` · `임도` · `CP3` · `FINISH`

## Responsive Behavior
- 1440: items `160 × 396`
- 768: items `130 × 322`, headline `32px / 32px`
- 390: items `108 × 268`, headline `24px / 26px`, padding `0 20px`
