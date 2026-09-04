# SpecGrid Specification (Molo's product grid)

## Overview
- **Target file:** `src/components/sites/www-molo-com-51adfc9a/en-dk-42785c00/SpecGrid.tsx`
  (card: `SpecCard.tsx`)
- **Screenshot:** `desktop-full.jpg` y 2112–2552 and 4040–4480
- **Interaction model:** static (the live card swaps image on hover; the clone has no second image)

## Computed Styles (exact)
### section
- display: `block`; width: `1440px`; height: `440.48px`; marginBottom: `156px`
### grid
- display: `grid`; gridTemplateColumns: `repeat(4, 270px)` (= `--grid-column-width`); columnGap: `80px` (`--grid-column-gap`)
- padding: `0 60px`; justifyContent: `space-between`
### card > media
- width: `270px`; height: `386px` (**7 / 10**, `--ratio-product`); objectFit: `cover`; borderRadius: `0`
- background while empty: `rgb(241, 241, 239)`
### card > name
- `p`, mono `11px / 15.4px`, letterSpacing `-0.11px`, uppercase, color `rgb(24,24,24)`
- marginTop: `12px`
### card > value line
- `span` `From` + `span` value, mono `11px / 15.4px`, letterSpacing `-0.11px`, uppercase, color `rgb(24,24,24)`
### card > chips (size row on the live site)
- mono `11px / 15.4px`, letterSpacing `-0.11px`, uppercase, color `rgb(69, 69, 69)`, gap `8px`
### "sold out" style
- mono `11px`, textTransform `capitalize`, color `rgb(153, 153, 153)`

## States & Behaviors
- Live hover: media swaps to a second shot and the size chips fade in over the image.
- Clone: no image swap (no second asset); the meta row is always visible. Link hover → `rgba(24,24,24,.5)`.

## Text Content (clone)
### Instance A — `2026 기록`
| name | value | chips |
|---|---|---|
| `참가 러너` | `800+` | `2026.06.21` |
| `코스` | `2` | `15K` `35K` |
| `35K 누적 상승` | `+1,962 M` | `ITRA 2 POINTS` |
| `제한 시간` | `8 시간` | `보급소 3개소` |

### Instance B — `35K 코스 스펙`
| name | value | chips |
|---|---|---|
| `거리` | `35.92 KM` | `ITRA 인증` |
| `누적 상승` | `+1,962 M` | `능선 구간` |
| `제한 시간` | `8 시간` | `컷오프 운영` |
| `보급소` | `3 개소` | `급수 · 급식` |

Values are taken verbatim from the repo's `index.html` / `README.md` (2026 대회 기준).

## Responsive Behavior
- 1440: 4 columns × 270px, gap 80px
- 768: `repeat(2, 1fr)`, gap `40px`, media `aspect-ratio: 7 / 10`
- 390: `repeat(2, 1fr)`, gap `12px`, padding `0 20px`
- Breakpoint: **1024px** → 2 columns
