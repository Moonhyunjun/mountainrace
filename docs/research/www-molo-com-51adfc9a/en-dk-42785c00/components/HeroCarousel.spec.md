# HeroCarousel Specification

## Overview
- **Target file:** `src/components/sites/www-molo-com-51adfc9a/en-dk-42785c00/HeroCarousel.tsx`
- **Screenshot:** `desktop-full.jpg` (y 32–900)
- **Interaction model:** time-driven autoplay + click (prev/next)

## DOM Structure
`section` → `div.container(relative)` → `div.slider(relative)` → `div.viewport(overflow:hidden)` → `div.track(flex, transform)` → N × `div.slide`; plus `div.count` and `div.controls`, and `div.mobileProgress`.

## Computed Styles (exact)

### section
- height: `868px` (= 900 viewport − 32 USP bar); width: `100%`; marginBottom: `156px`; display: `block`

### div.container / div.slider / slide
- position: `relative`; width: `1440px`; height: `868px`; overflow: `hidden` on the viewport
- slide media: fills the slide, `object-fit: cover`

### div.count (`1 / 5`)
- position: `absolute`; right: `112px`; bottom: `60px`; zIndex: `1`
- display: `flex`; alignItems: `center`; gap: `3px`; height: `15.39px`
- three separate spans (`1`, `/`, `5`), each `7.375px` wide
- color: `rgb(255,255,255)`; **mixBlendMode: `difference`**
- font: mono `11px / 15.4px`, letterSpacing `-0.11px`, uppercase

### div.controls
- position: `absolute`; right: `60px`; bottom: `60px`; width: `29px`; height: `18px`
- display: `flex`; justifyContent: `space-between`; alignItems: `center`
- buttons: `4px × 18px` each; color `rgb(255,255,255)`; **mixBlendMode: `difference`**

### div.mobileProgress (mobile only)
- position: `absolute`; right: `60px`; bottom: `42px`; display: `flex`; gap: `4px`
- item: `12px × 1px`, `background: rgb(255,255,255)`; inactive item at reduced opacity
- **mixBlendMode: `difference`**

### Overlay label
Rendered by `LabelRow` variant `bottom` (`left/right: 60px; bottom: 60px`).

## States & Behaviors
### Autoplay
- 5 slides; advance on a timer; the live video slides are `autoplay loop muted playsinline`.
- **Implementation:** `setInterval` + `transform: translateX(-index * 100%)` on the track.
- Pause when `prefers-reduced-motion: reduce`.
### Prev / next
- Click steps the index with wraparound; the counter's first span updates.

## Assets
Live site: `https://cdn.molohub.com/videos/d2-explore-2-79co3j.mp4` (+ 4 stills).
**Not downloaded** — see `ARTIFACT_MANIFEST.md`. The clone renders `MediaFrame` plates at the
identical geometry so real race photography drops in by setting one `src`.

## Text Content (clone) — 5 slides
1. `2027 WONJU MOUNTAIN RACE` / countdown · `사전알림 신청`
2. `2026 RECAP` / `800여 명의 러너` · `기록 보기`
3. `35K · ITRA 2 POINTS` / `+1,962M` · `코스 보기`
4. `15K · TRAIL START` / `첫 트레일 도전` · `코스 보기`
5. `ROAD TO 2027` / `일정 확정 시 공지` · `사전알림 신청`

The left label's second line on slide 1 is the live countdown (`D-### · HH:MM:SS`), mono 11px —
same type as every other label, no separate styling.

## Responsive Behavior
- 1440 / 768: counter + arrows at `right: 112px / 60px`, `bottom: 60px`
- 390: counter and arrows hidden, `mobileProgress` bars shown at `right: 60px; bottom: 42px`; section height `calc(100svh - 32px)`
