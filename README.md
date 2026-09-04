# WONJU MOUNTAIN RACE — 공식 웹사이트

원주 마운틴 레이스(mountain-race.com)의 새 웹사이트 소스입니다.

## 이번 개편의 목표

1. **모바일/PC 통일** — 기존 사이트는 모바일 버전과 PC 버전이 따로 관리되어 화면이 서로 달랐습니다.
   이 사이트는 **PC 레이아웃을 기준으로 한 단일 반응형 코드**입니다.
   모바일에서도 PC와 동일한 섹션·콘텐츠·순서가 그대로 보이고, 화면 폭에 맞춰 배치만 조정됩니다.
   별도의 모바일 버전을 따로 편집할 필요가 없습니다.
2. **2027 대회 기대감 조성** — 히어로의 2027 카운트다운, 2026 대회 리캡(참가자 800+, 코스 기록),
   2027 로드맵 타임라인, 사전알림 신청 CTA로 다음 대회를 기다리게 하는 구성입니다.

## 파일 구성

```
index.html      # 원페이지 사이트 (모든 섹션)
css/style.css   # 단일 반응형 스타일 (PC 기준 → 모바일 축소)
js/main.js      # 카운트다운, 모바일 메뉴, 스크롤 애니메이션, 사전알림 폼
assets/img/     # 대회 사진을 넣는 폴더 (아래 참고)
```

## 운영자가 자주 바꾸게 될 것들

| 항목 | 위치 | 방법 |
|---|---|---|
| 2027 대회 날짜 | `js/main.js` 맨 위 `RACE_DATE_2027` | 확정된 일시로 수정 (KST). `index.html`의 "2027년 6월 개최 예정" 문구도 함께 수정 |
| 2026 대회 사진 | `index.html`의 `recap-gallery` | `assets/img/`에 사진을 넣고 `<figure>` 를 `<img src="assets/img/파일명.jpg" alt="...">` 로 교체 |
| 사전알림 폼 연동 | `index.html`의 `#notifyForm` | 스티비/메일침프/구글폼 등 사용하는 서비스의 폼 URL을 `action`에 연결 (현재는 데모 동작) |
| 코스/참가비 정보 | `index.html`의 `#courses` 섹션 | 2027 코스 확정 시 카드 내용 수정 |

## 로컬 미리보기

빌드 과정이 없는 정적 사이트입니다.

```bash
# 아무 정적 서버로 열면 됩니다
python3 -m http.server 8000
# → http://localhost:8000
```

## 배포

정적 호스팅 어디든 그대로 올리면 됩니다 (GitHub Pages, Netlify, Vercel, 기존 호스팅의 웹루트 등).
GitHub Pages를 쓰는 경우: 저장소 Settings → Pages → 배포 브랜치 선택.

## 콘텐츠 출처 메모

2026 대회 수치(6/21 개최, 800여 명 참가, 35K 35.92km / +1,962m / 제한 8시간 / 보급소 3개소 / ITRA 2포인트)는
공개된 대회 결과 및 ITRA 등록 정보 기준입니다. 2027 관련 날짜는 모두 "예정"으로 표기되어 있으며
확정 시 위 표의 항목만 수정하면 됩니다.

---

## AI Website Cloner Template (추가 세팅)

이 저장소에는 [ai-website-cloner-template](https://github.com/JCodesMore/ai-website-cloner-template)
(커밋 `92872bc`)이 함께 세팅되어 있습니다. **기존 정적 사이트(`index.html`, `css/`, `js/`, `assets/`)는
그대로 유지**되며, 템플릿은 Next.js 작업 공간으로 옆에 추가된 형태입니다.

### 사용법

```bash
npm install
claude --chrome          # 또는 사용하는 AI 코딩 에이전트
/clone-website <복제할 사이트 URL>
```

`/clone-website` 스킬은 대상 사이트를 분석해 `src/app/` 아래 Next.js 페이지로 재구성합니다.
Claude Code 외에 Codex, Cursor, Gemini, Copilot 등 13개 에이전트용 설정이 함께 들어 있습니다
(`.claude/`, `.codex/`, `.cursor/`, `.gemini/` 등).

### 요구 사항

- **Node.js 24 이상** (`package.json`의 `engines.node: ">=24"`, `.nvmrc: 24`)
- 스택: Next.js 16.3.0 / React 19.2.4 / TypeScript strict / Tailwind CSS v4 / shadcn(base-ui)

### 명령어

| 명령 | 설명 |
|---|---|
| `npm run dev` | 개발 서버 |
| `npm run build` | 프로덕션 빌드 |
| `npm run lint` | ESLint |
| `npm run typecheck` | 타입 검사 |
| `npm run check` | lint + typecheck + build 일괄 |

### 두 사이트의 관계

| | 현재 운영 사이트 | Next.js 리뉴얼 안 |
|---|---|---|
| 진입점 | 루트 `index.html` | `src/app/page.tsx` |
| 디자인 | 자체 디자인 | molo.com 디자인 시스템 클론 |
| 빌드 | 없음 (정적) | `npm run build` |
| 배포 | 정적 호스팅 그대로 | Vercel/Netlify 등 Next.js 호스팅 |

정적 사이트를 그대로 배포하는 현재 방식은 영향을 받지 않습니다.

## Next.js 리뉴얼 안 (molo.com 디자인 클론)

`/clone-website https://www.molo.com/en-DK` 로 만든 결과물입니다.
**레이아웃·타이포·모션은 molo.com에서 1:1로 추출**했고, **콘텐츠는 이 저장소의
`index.html` 내용(2026 기록, 코스 스펙, 2027 로드맵)을 그대로** 넣었습니다.

```bash
npm install && npm run dev   # http://localhost:3000
```

- 추출 근거 문서: `docs/research/www-molo-com-51adfc9a/en-dk-42785c00/`
  (`DESIGN_TOKENS.md`, `PAGE_TOPOLOGY.md`, `BEHAVIORS.md`, `VISUAL_QA.md`, 컴포넌트 스펙 12개)
- 스크린샷 비교: `docs/design-references/www-molo-com-51adfc9a/en-dk-42785c00/`
- 컴포넌트: `src/components/sites/www-molo-com-51adfc9a/en-dk-42785c00/`

### 사진을 넣으려면

대회 사진이 없어 모든 이미지 자리는 **윤곽선 플레이스홀더**로 렌더링됩니다
(molo.com의 사진은 타사 저작물이라 사용하지 않았습니다 —
`docs/research/.../ARTIFACT_MANIFEST.md` 참고).

`src/components/sites/www-molo-com-51adfc9a/en-dk-42785c00/content.ts` 에서
`slot("2026 리캡", "...")` 을 `{ src: "/sites/www-molo-com-51adfc9a/en-dk-42785c00/recap.jpg", alt: "...", caption: "2026 리캡" }`
로 바꾸면 됩니다. 레이아웃은 손댈 필요가 없습니다.

### 2027 대회 날짜 변경

`src/components/sites/www-molo-com-51adfc9a/en-dk-42785c00/Countdown.tsx` 의
`RACE_DATE_2027` 상수 한 곳만 수정하면 히어로 카운트다운이 따라갑니다.

- 템플릿 원본 README: `docs/TEMPLATE_README.md`
- 프로젝트 규칙(에이전트용): `AGENTS.md` (수정 후 `bash scripts/sync-agent-rules.sh` 실행)
- 템플릿 제작자 후원 설정(`.github/FUNDING.yml`)은 이 저장소와 무관하여 제거했습니다.
