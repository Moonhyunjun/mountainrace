---
name: threeui
description: ThreeUI Community(MengTo/threeui) 셰이더·캔버스·Three.js 컴포넌트 43종을 이 프로젝트에 이식할 때 쓰는 가이드. 사용자가 "threeui", "셰이더 배경", "WebGL 효과", "별자리/파티클/글래스 버튼 넣어줘", "3D 히어로" 같은 요청을 하면 이 스킬을 로드한다. 컴포넌트별 검증된 소스 파일과 구현 절차는 references/<slug>.md 에 있다.
---

# ThreeUI (vendored)

ThreeUI는 Three.js · Raw WebGL · Canvas 2D로 만든 UI 효과 라이브러리입니다. 원본은 React 패키지(`@designcodeio/threeui`)이지만,
각 컴포넌트에는 "패키지 없이 검증된 원본 소스에서 그대로 이식하라"는 스킬 문서가 붙어 있습니다. 이 디렉터리는 그 스킬 문서 43개와,
이 프로젝트가 실제로 쓰는 원본 HTML 소스를 복사한 것입니다.

## 이 프로젝트에서 쓰는 법

1. 아래 카탈로그에서 슬러그를 고르고 `references/<slug>.md` 를 읽는다. "Verified source material" 에 적힌 파일이 진짜 구현이다.
2. 원본 소스가 필요하면 `sources/` 에 있는지 먼저 본다. 없으면 `git clone --depth 1 https://github.com/MengTo/threeui.git /tmp/threeui` 후 `src/shaders/...` 경로에서 연다.
3. 이 저장소의 산출물은 **아임웹 코드 위젯(바닐라 HTML/CSS/JS)** 이므로 React 호스트는 쓰지 않는다. 렌더러(캔버스/WebGL 루프)만 떼어
   `.ovn` 스코프 안의 캔버스에 붙이고, 원본의 리사이즈 · visibility 일시정지 · reduced-motion · 컨텍스트 손실 처리를 그대로 유지한다.
4. 원본이 요구하는 외부 스크립트(tailwind CDN, iconify, gsap)는 데모 페이지용이다. 렌더러 자체가 의존하지 않으면 가져오지 않는다.
5. 컴포넌트를 하나 넣을 때마다 unlazy 게이트(`site-v2/GATES.md`)에 "캔버스가 그려지고 JS 에러가 없다"를 검증하는 CHECK를 추가한다.

## 적용 이력

| 위치 | 컴포넌트 | 변형 | 비고 |
|---|---|---|---|
| `site-v2/src/widget.src.html` 뉴스레터·푸터 배경 | `constellation-field` | constellation-field (Canvas 2D) | 원본 캔버스 루프 이식, 팔레트를 OVERNIGHT 토큰(bone/coral)으로 치환, 뷰포트 밖이면 정지 |

## 카탈로그 (43)

| slug | 컴포넌트 | 기술 | 설명 |
|---|---|---|---|
| `kage-landing-page` | Kage | Full HTML + DOM/CSS + Three.js | The complete authored Kage temple experience, preserved as an interactive full-page docume |
| `complete-shelf-landing-page` | Complete Shelf | Full HTML + DOM/CSS + Three.js r165 | The complete Working Volumes bookshelf page with all seven tools, its responsive editorial |
| `bestsellers-book-showcase` | Bestsellers Book Showcase | Full HTML + DOM/CSS + embedded media | The complete Field Manuals book showcase, preserved unchanged with its editorial layout, a |
| `sylva-hero` | Sylva |  |  |
| `meng-to-sketchbook-landing-page` | Sketchbook | Full HTML + DOM/CSS + JavaScript | A tactile personal portfolio built as a Singapore sketchbook, with nine illustrated plates |
| `predictive-arc` | Predictive Arc | Canvas 2D + Raw WebGL + Three.js r128 | Eight animated arc, signal, ribbon, void, and halftone scenes collected in one Canvas 2D,  |
| `liquid-form` | Liquid Form | Raw WebGL | A centered silver ray-marched liquid form with authored studio reflections and pointer-res |
| `crt` | CRT | Raw WebGL + Canvas 2D | One sharpened curved-glass CRT tube driving four screens: the Matrix-era boot terminal, a  |
| `energy-orb` | Globe |  |  |
| `spark-badge` | Spark Badge |  |  |
| `elements` | Elements | Raw WebGL2 + Canvas 2D | Water, lightning, fire, condensation, and a painterly generative tree collected as one ele |
| `typography-vortex` | Typography Vortex | Canvas 2D | Sable’s complete rotating typography vortex with crisp prerendered rings, drifting glyphs, |
| `semantic-bloom` | Semantic Bloom | Canvas 2D + DOM/CSS | A customizable Codex wordmark that draws a viscous particle organism toward its letters, i |
| `globe-study` | Text Path Studies | Canvas 2D | Six interactive Canvas 2D typography studies spanning a globe, flowing outlines, morphing  |
| `gallery-heading` | Gallery Heading | Canvas 2D | An oversized headline ringed by twelve 4:3 plates — one flat colour each, shaded by a proc |
| `star-portal` | Shader Buttons | Raw WebGL + Canvas 2D + CSS | Six authored shader and canvas button treatments collected into one interactive family. |
| `rectangle-buttons` | Rectangle Buttons | DOM + CSS | Twenty-two authored rectangle-button and animated CTA treatments collected into one family |
| `circle-buttons` | Circle Buttons | DOM + CSS | Three compact circular icon controls using the exact Dark Glass, Launch, and Dot Border ma |
| `liquid-metal-button` | Liquid Metal Button | Raw WebGL 2 + DOM/CSS | A prismatic liquid-metal control in Sign up pill, Liquid Orb, and configurable Play Circle |
| `character-carousel` | Character Carousel | DOM + CSS | Two authored editorial character-card carousels collected as a light filmstrip and a dark  |
| `gallery` | Gallery | Three.js r149 | The isolated Vantrix hero image ribbon: sixteen curved editorial panels orbiting a vertica |
| `sylva-living-world` | Sylva Living World |  |  |
| `temple-night` | Temple Night |  |  |
| `landscape` | Landscape |  |  |
| `japanese-tower` | Country Towers | Three.js r149 + Canvas 2D | Six country-specific towers assembling above a procedural landscape: Japanese, Chinese, Vi |
| `bookshelf` | Bookshelf | Three.js r165 | The exact seven-volume Bookshelf collection with its authored room, carousel shelf, indivi |
| `structure-flow` | Structure Flow | Three.js r128–r160 | Thirteen authored Three.js field studies collected as one family, spanning particle domes, |
| `warp-field` | Warp Field | Three.js r128 | Nexus’s focused hero warp: 400 emerald additive streaks and 40 luminous tiles streaming th |
| `engraved-certificate` | Engraved Certificate | Canvas 2D + DOM/CSS | A responsive engraved certificate: plate field, dual guilloche rosettes, and a drifting ha |
| `woven-cloth` | Woven Cloth | Three.js r160 | A Three.js woven-cloth simulation with Woven Cloth typography printed into its procedural  |
| `performance-gauges` | Performance Gauges | DOM + CSS | Four layered CSS instruments — tachometer, speedometer, turbo boost, and EV power — each i |
| `uplink-loader` | Uplink Loader |  |  |
| `koi-studies` | Koi Studies |  |  |
| `article-headings` | Article Headings | DOM/CSS + Canvas 2D | Three expressive text treatments collected in one family: a chromatic intro, a particle wo |
| `animated-top-dock` | Animated Top Dock | DOM + CSS + WebGL + Three.js r128 | Sable’s proximity-spring menu in four fits: the authored centred dock, a modern command ba |
| `sketchbook` | Sketchbook | DOM + CSS 3D | The exact Singapore paper sketchbook with nested-strip page curls, direct dragging, tilt,  |
| `constellation-field` | Constellation Field | Canvas 2D + Raw WebGL | A family of particle networks, gateways, interface lines, defense traces, and topographic  |
| `portal-field` | Portal Field | Three.js r134 + Raw WebGL + Canvas 2D | Five ambient field backgrounds collected across Three.js, raw WebGL, and Canvas 2D rendere |
| `diagnostics-panel` | Diagnostics Panel | Canvas 2D | Three diagnostic illustration variants — layered planes, node cubes, and a flowing mesh —  |
| `skeuomorphic-toggle` | Skeuomorphic Toggle | DOM/CSS + Three.js + Raw WebGL | Four takes on one switch: the preserved tactile skeuomorphic export plus flat modern, Thre |
| `matrix-field` | Laser | Raw WebGL | Four pointer-reactive laser scenes spanning a preserved matrix junction, atmospheric blade |
| `wireframe-forms` | Wireframe Forms | Canvas 2D | A family of rotating wireframe forms, with the cube, crossed cylinders, and nested sphere  |
| `brand-orbs` | Brand Orbs | Canvas 2D | Twenty-three animated brand marks rebuilt as small and medium dimensional dot orbs for AI  |
