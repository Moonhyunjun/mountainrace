# MediaFrame Specification (shared media primitive)

## Overview
- **Target file:** `src/components/sites/www-molo-com-51adfc9a/en-dk-42785c00/MediaFrame.tsx`
- **Interaction model:** static

Every media slot in the clone goes through this one component so that a real photograph
replaces a plate by passing `src` — the geometry never changes.

## Computed Styles
- borderRadius: `0`; overflow: `hidden`; position: `relative`
- **Empty state is unpainted**, not `rgb(241,241,239)`. Molo's own
  `--color-image-background` plate sits behind a real photograph; using it for an
  empty slot puts a light fill into the root stacking context, and every
  `mix-blend-mode: difference` label above it resolves to mid-grey
  (measured: `rgb(228,228,228)` against a `rgb(241,241,239)` plate). The empty
  slot is therefore drawn as a 1px `--color-light-gray` outline over the page
  ground, which keeps the labels reading black exactly as they do on the original.
- when `src` is present: `<img>` `width: 100%; height: 100%; object-fit: cover; display: block`
- when `src` is absent: centred caption, mono `11px / 15.4px`, letterSpacing `-0.11px`,
  uppercase, color `rgb(153, 153, 153)` (`--color-placeholder`)

## States & Behaviors
Static. No hover, no transition — matches the live site.

## Assets
See `ARTIFACT_MANIFEST.md` for why the live originals are not bundled.

## Responsive Behavior
Inherits its box from the parent module; the caption size is constant at `11px`.
