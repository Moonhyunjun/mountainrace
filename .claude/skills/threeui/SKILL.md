---
name: threeui
description: Use ThreeUI (@designcodeio/threeui) — MengTo's React + Three.js component library of copy-ready WebGL backgrounds, hero sections, landing page templates, animated buttons, text animations, and interactive UI effects. Use when building React/Next.js/Vite UI that needs 3D scenes, GLSL shader backgrounds, particle systems, kinetic typography, or premium animated components, or when the user mentions ThreeUI, threeui.com, or Three.js components.
---

# ThreeUI — React + Three.js component library

ThreeUI Community (https://threeui.com, source: https://github.com/MengTo/threeui) is an
open-source library of 50 parent components / 103 exported React components with interactive
Three.js/WebGL scenes, GLSL shaders, and polished motion. This skill tells you how to install
and use it; browse threeui.com for live previews and variant pickers.

## Install

```bash
npm install @designcodeio/threeui
```

Peer expectations: React 18+, a bundler (Vite/Next.js). Three.js is bundled via the package's
own dependency graph — do not add conflicting `three` versions unless required.

## Usage

Import a component and the shared styles once:

```tsx
import { AtTheHorizon } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

export function Hero() {
  return <AtTheHorizon />;
}
```

Smallest dev import graph — use a component subpath:

```tsx
import { AtTheHorizon } from "@designcodeio/threeui/components/AtTheHorizon";
```

Components that render full HTML documents expect their runtime files at the same
root-relative URLs as the ThreeUI preview: copy the needed files from
`node_modules/@designcodeio/threeui/lib-dist/assets/` into the app's `public/` directory,
or override the component's `sourceUrl` / `assetBaseUrl` prop where available.

In Next.js, WebGL/canvas components are client components — add `"use client"` to the file
that imports them, and prefer dynamic import with `ssr: false` for heavy scenes.

## Categories

Landing Pages · Hero · Three.js scenes · Backgrounds (WebGL/GLSL shader fields, particles,
procedural) · Buttons (glow, liquid-metal, tactile, loading) · Text Animation (reveals,
marquees, kinetic/shader type) · UI Elements · CSS effects · Motion Design.

## Exported components (Community, v1.2.x)

AmberHalftone, AnimatedTopDock, AudioWordmark, BallStudy, BellFieldBackground,
BestsellersBookShowcase, BookshelfScene, BrandOrbs, CharacterCarousel, CharacterFilmstrip,
CharacterWave, CircleButtons, ClothStudy, CloudField, CompleteShelfLandingPage,
CondensationBackground, ConnectivityGraph, ConstellationField, CrtBackground, DataField,
DefenseLines, DiagnosticsPanel, DimensionalField, DotBorderButton, DotMatrixBackground,
EditorialIntroSection, ElementsBackground, ElementsCollection, EmberStorm,
EmeraldHorizonBackground, EngravedCertificate, ExpanseField, FloatingDotsCta, FlowField,
FluidFieldBackground, FluxVortex, Gallery, GalleryHeading, GatewayFlow, GenerateButton,
GenerativeTree, GlassmorphismCta, GlobeCollection, GradientBeamCta, GradientCta,
GradientPillButton, HalftoneFlow, IgnitionButton, InductionButton, InterfaceLines,
JapaneseTowerLandscape, KageLandingPage, KoiStudies, LandscapeScene, LaserCollection,
LaunchButton, LiquidFormBackground, LiquidMetalButton, LogicCoreField, LumenCta,
MengToSketchbookLandingPage, MorphingGlyphCloud, NebulaBackground, NeonTypography,
NewsletterFooterSection, OrbitalSphereBackground, OutlineTypeflow, ParticleDrift,
ParticleNetwork, ParticleWordmark, PerformanceGauges, PlasmaButton, PortalFieldCollection,
PredictiveArcCanvas, RectangleButtons, RibbonFieldBackground, RippleStudy, SemanticBloom,
ShaderButtons, Sketchbook, SkeuomorphicToggle, SkeuomorphicToggleCollection, SlidingTextCta,
SparkBadge, SpinningBorderButton, StreamConvergenceBackground, StructureFlowCollection,
SylvaHero, SylvaLivingWorldScene, TactileButton, TempleNightScene, TextAnimationCollection,
TextPathStudies, ThinkingButton, ThreeUIIntro, TopoField, TopologyField,
TypographyVortexCanvas, UplinkLoader, VoidField, WarpFieldBackground, WireframeForms,
WovenCloth.

## Reading component source

For prop signatures and variant options, read the component source directly:
`node_modules/@designcodeio/threeui/` after install, or clone
https://github.com/MengTo/threeui and look in `src/package-components/<Name>.ts` and
`src/components/`.

## Pro components (not in Community)

Pro/Beta components are excluded from the npm package. Pro members pull them with
`npx @designcodeio/threeui-cli add <component>` (browser OAuth sign-in). Never try to
work around this — if a needed component is Pro-only, tell the user and pick the closest
Community alternative.

## Performance notes

- One WebGL scene per viewport region; avoid stacking multiple full-screen shader
  backgrounds on a single page.
- Pause/unmount off-screen scenes (IntersectionObserver) on long pages.
- Respect `prefers-reduced-motion`: swap heavy motion for a static frame.

## 이 저장소에서의 사용 (vendored 소스 · 바닐라 이식)

이 프로젝트의 산출물은 **아임웹 코드 위젯(바닐라 HTML/CSS/JS)** 이라 React 패키지를 설치하지 않습니다. 대신:

- `references/<slug>.md` — ThreeUI가 컴포넌트마다 배포하는 "검증된 원본 소스에서 이식하라" 스킬 문서 43개 (Community)
- `sources/*.html` — 실제로 쓰는 원본 HTML 소스 (constellation-field 계열 8개). 캔버스/WebGL 루프만 떼어 `.ovn` 스코프 캔버스에 붙이고
  리사이즈 · visibility 일시정지 · reduced-motion · 뷰포트 밖 정지를 유지합니다. 원본 데모의 tailwind/iconify/gsap CDN은 가져오지 않습니다.
- 적용 이력과 카탈로그 표: `SKILL.vendored-community.md`, 출처·업데이트 방법: `VENDOR.md`

적용: `site-v2/src/widget.src.html` 뉴스레터·푸터 배경 = `constellation-field` (Canvas 2D, 팔레트 bone/coral로 치환, 노드 7개 중 1개 coral).
