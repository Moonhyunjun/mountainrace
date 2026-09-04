# Visual QA — clone vs. original

Both pages captured with the same Chromium build at 1440 × 900 and 390 × 844.
Original: `desktop-full.jpg` / `mobile-full.jpg`. Clone: `clone-desktop-full.png` /
`clone-mobile-full.png`.

## Geometry diff (desktop 1440)

| Section | Original top / height | Clone top / height | Δ |
|---|---|---|---|
| Hero | 32 / 868 | 32 / 868 | **0** |
| Centred portrait | 1056 / 900 | 1056 / 900 | **0** |
| 4-up grid | 2112 / 440 | 2112 / 450 | +10 height |
| Statement | 2708 / 120 | 2718 / 160 | +40 height (Korean copy runs 4 lines, not 3) |
| Split pair | 2984 / 900 | 3034 / 900 | +50 offset (accumulated) |
| 4-up grid | 4040 / 440 | 4090 / 450 | +10 height |
| Statement | 4637 / 160 | 4696 / 200 | +40 height |
| Full-bleed | 4953 / 900 | 5052 / 900 | 0 height |
| Carousel | 6009 / 496 | 6108 / 489 | −7 height |
| **Page total** | **11,948** | **12,130** | **+1.5%** |

Every module height that is fixed by the design (868 / 900 / 156px gap) matches
exactly. The drift comes only from Korean copy setting one line taller than the
English original in the two statement blocks and from the card meta row.

## Token verification (read back from the running clone)

| Property | Original | Clone |
|---|---|---|
| USP bar height / bg / size / tracking | 32px · `rgb(24,24,24)` · 10px · −0.2px | identical |
| Header top / height / blend / padding | 32px · 88px · `difference` · `0 60px` | identical |
| Header height after scroll | 56px | 56px |
| Label font / size / line-height / tracking / case | mono · 11px · 15.4px · −0.11px · uppercase | identical |
| Footer bg / padding | `rgb(72,163,220)` · `37px 60px 56px` | identical |
| Module gap | 156px | 156px |

## Rendered contrast of the blended chrome

Darkest pixel sampled inside each element over the pale page:

| Element | Original | Clone (final) |
|---|---|---|
| Header nav | `rgb(4,4,4)` | `rgb(7,7,7)` |
| Wordmark | `rgb(4,4,4)` | `rgb(4,4,4)` |
| Hero overlay label | `rgb(4,4,4)` | `rgb(4,4,4)` |

Two defects were found and fixed during this pass, both in the blend layer:

1. **Header washed out to `rgb(228,228,228)`.** The spec had recorded the
   `<header>` box's own `color: rgb(24,24,24)`; the live nav *buttons* are
   `rgb(255,255,255)`. Under `difference` a dark source over a pale page
   resolves to light grey — only a white source lands on black. Spec and
   component both corrected.
2. **Placeholder plates washed out every overlay label.** A filled
   `rgb(241,241,239)` plate enters the root stacking context and becomes the
   blend backdrop. Empty media slots are now drawn as a hairline outline over
   the page ground, so labels read black exactly as on the original; a real
   photograph restores the original inversion.

## Behaviour checks

| Behaviour | Result |
|---|---|
| Header 88 → 56 on scroll, `transition: height 0.3s`, nothing else changes | ✅ |
| Header inverts over dark media via `mix-blend-mode: difference` | ✅ |
| USP marquee runs continuously, close button removes the bar and drops the header to `top: 0` | ✅ |
| Hero autoplays, counter increments, prev/next wrap around | ✅ |
| Mobile hero shows 5 progress bars instead of the counter | ✅ |
| Carousel is click-driven (`previous` / `next`), not scroll-driven | ✅ |
| No entrance animations anywhere (the original has none) | ✅ |
| `prefers-reduced-motion: reduce` stops both marquees and hero autoplay | ✅ |
| Responsive: 4→2 grid columns, split pair stacks, footer 4→2→1 columns | ✅ |

## Remaining differences

1. **No photography.** Every media slot is an outlined placeholder — see
   `ARTIFACT_MANIFEST.md`. This is the one large visual gap and it is deliberate.
2. **Header column widths** compute `549 / 174 / 549` against the original's
   `509 / 254 / 509`. Both are the same `1fr auto 1fr` grid; the centre track is
   narrower only because the `MOUNTAIN RACE` wordmark is narrower than Molo's.
3. **Statement blocks run one line taller** in Korean, as tabulated above.
4. **Mega-menu flyout** not built (out of scope — the clone's nav items are anchors).
