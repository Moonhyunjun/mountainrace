# 이 스킬의 출처 (vendored)

| 항목 | 값 |
|---|---|
| 원본 저장소 | https://github.com/MengTo/threeui (ThreeUI Community) |
| 가져온 커밋 | `68802d5428071ada5c20db8094b1649e6bb770ed` (2026-09-02 기준 최신, 패키지 1.2.0) |
| 가져온 것 | `src/components/buildSkillMarkdown.js` 의 SKILLS 43개 → `references/*.md`, `src/shaders/neuform-isolated/sources/` 중 constellation-field 계열 8개 → `sources/` |
| 가져오지 않은 것 | React 앱 셸, 78MB `public/`(랜딩페이지·폰트·Three.js 런타임), 나머지 셰이더 소스 (필요 시 clone) |
| 라이선스 | 앱·컴포넌트 코드 MIT(`LICENSE`), 폰트 SIL OFL 1.1(`FONT-LICENSES.md`), 에셋 `ASSET-LICENSES.md`, 서드파티 `THIRD_PARTY_NOTICES.md` |

## 업데이트 방법

```bash
git clone --depth 1 https://github.com/MengTo/threeui.git /tmp/threeui
node -e 'const fs=require("fs");const s=fs.readFileSync("/tmp/threeui/src/components/buildSkillMarkdown.js","utf8");const S=eval("("+s.match(/const SKILLS = (\{[\s\S]*?\n\});/)[1]+")");for(const[k,v]of Object.entries(S))fs.writeFileSync(".claude/skills/threeui/references/"+k+".md",v)'
cp /tmp/threeui/src/shaders/neuform-isolated/sources/{constellation-field,particle-drift,particle-network,gateway-flow,connectivity-graph,interface-lines,defense-lines,topo-field}.html .claude/skills/threeui/sources/
git -C /tmp/threeui rev-parse HEAD   # → 위 표에 기록
```

## 주의

원본 소스 HTML은 데모 랜딩페이지 전체(타일윈드 CDN · iconify · gsap · 외부 이미지)입니다. 이 프로젝트에는 캔버스 렌더러 부분만 이식하고,
외부 CDN 스크립트와 데모 이미지는 가져오지 않습니다. ThreeUI 로고·상호는 사이트에 쓰지 마세요.
