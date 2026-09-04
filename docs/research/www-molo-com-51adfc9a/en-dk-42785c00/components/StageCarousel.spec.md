# StageCarousel Specification (Molo's product carousel)

## Overview
- **Target file:** `src/components/sites/www-molo-com-51adfc9a/en-dk-42785c00/StageCarousel.tsx`
- **Screenshot:** `desktop-full.jpg` y 6009–6505
- **Interaction model:** **click-driven** — `PREVIOUS` / `NEXT` buttons scroll the row.
  Verified by scrolling the section first: nothing changes on scroll, so this is not scroll-driven.

## Computed Styles (exact)
### section
- display: `block`; width: `1440px`; height: `495.88px`; marginBottom: `156px`; padding: `0 60px`
### controls row
- `PREVIOUS` / `NEXT` `button`s: mono `11px / 15.4px`, letterSpacing `-0.11px`, uppercase, color `rgb(24,24,24)`
- sits above the track; `display: flex; justify-content: space-between` across the content width
### track
- `display: flex; gap: 80px; overflow-x: auto; scroll-behavior: smooth`
- 6 cards visible/queued; card geometry identical to `SpecCard` (media `270 × 386`, 7/10)
### card meta
- name: mono `11px`, uppercase, `rgb(24,24,24)`
- chips: mono `11px`, uppercase, `rgb(69,69,69)`

## States & Behaviors
### Prev / next
- **Trigger:** click. **Effect:** `scrollBy(±350px)` (one card + gap), `behavior: smooth`.
- No auto-advance, no scroll-snap on the live site.
### Disabled ends
- Live site keeps both buttons enabled and clamps at the ends. Clone matches.

## Text Content (clone) — `ROAD TO 2027`, verbatim from the repo's index.html timeline
| # | name | value | chips |
|---|---|---|---|
| 1 | `사전알림 접수 중` | `NOW` | `일정·접수 오픈 소식을 먼저` |
| 2 | `대회 일정 · 코스 공개` | `일정 확정 시` | `2027 개최일 · 코스 상세` |
| 3 | `얼리버드 → 일반 접수` | `접수 오픈` | `사전알림 신청자 우선 안내` |
| 4 | `RACE DAY` | `2027년 6월 (예정)` | `원주의 숲에서, 다시 출발선에` |

## Responsive Behavior
- 1440: gap `80px`, cards `270px`
- 768: gap `40px`, cards `240px`
- 390: gap `12px`, cards `62vw`, padding `0 20px`, controls still shown
