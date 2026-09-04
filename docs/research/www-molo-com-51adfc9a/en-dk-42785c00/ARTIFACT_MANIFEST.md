# Artifact Manifest — what was and was not bundled

## Extracted and used
| Artifact | Source | Where it lives |
|---|---|---|
| 78 CSS custom properties | `getComputedStyle(document.documentElement)` | `DESIGN_TOKENS.md` → `src/app/globals.css` |
| Full type scale (12 roles) | per-element `getComputedStyle` | `DESIGN_TOKENS.md` |
| Section geometry, 14 sections | `getBoundingClientRect` + computed styles | `raw-sections.json`, `raw-geometry.json` |
| Header state A/B diff | computed styles at scrollY 0 and 600 | `BEHAVIORS.md` |
| Marquee timing | `animation: scroll 152.644s linear infinite` | `BEHAVIORS.md` |
| Responsive token values at 1440 / 768 / 390 | re-read custom properties per viewport | `BEHAVIORS.md`, `raw-mobile.json` |
| Screenshots | 1440 full-page (11,948px), 390 full-page (11,975px), footer | `docs/design-references/…` |
| Close / arrow icon shapes | inline `<svg>` in `raw-assets.json` | `icons.tsx` |

## Deliberately NOT bundled

### Photography and video (48 images, 1 video)
Molo's campaign imagery — including `https://cdn.molohub.com/videos/d2-explore-2-79co3j.mp4`
and `d1-back-to-school-2-h9xx2x.mp4` — is another company's copyrighted commercial photography
of identifiable children. The deliverable here is a **live public website for a real event**
(WONJU MOUNTAIN RACE), not a throwaway visual study, so shipping that imagery would be
straightforward infringement and a misuse of the models' likenesses.

Every media slot therefore renders `MediaFrame` — a `rgb(241,241,239)` plate at the **exact
size, aspect ratio and position** of the original, captioned in the site's own mono style.
Dropping in real race photography is a one-line change per slot (`src="/sites/…/xxx.jpg"`);
no layout work is needed. The repo's `assets/img/` folder is currently empty
(`assets/img/README.txt` only), so no race photos were available to substitute.

**Atlas Cloud generated fallback was not used** — the skill's fallback path requires explicit
user approval and is barred for brand artwork; neither condition was met here.

### Webfonts (`text`, `display`, `simon` / Simon Mono)
Proprietary licensed families served from Molo's own origin. Substituted with the fallback
stacks Molo itself declares (`IBM Plex Mono …` for mono) plus Pretendard (SIL OFL) for the
Korean copy. See the substitution table in `DESIGN_TOKENS.md`.

### Molo wordmark, favicon, e-mærket certification badge
Trademarks and a third-party certification mark. Replaced with the WONJU MOUNTAIN RACE
wordmark set in the clone's own type at the same optical size.

## Known gaps
1. Media plates instead of photography (above) — the single largest visual difference from the original.
2. The live hero's video slides cannot be reproduced without source footage; the carousel
   mechanics (autoplay, counter, prev/next, mobile progress bars) are implemented in full.
3. Molo's mega-menu flyout (18px `text`-family links, revealed on nav hover) is out of scope —
   the clone's four nav items are anchors, not categories.
4. Product-card hover image swap needs a second asset per card; not implemented.
