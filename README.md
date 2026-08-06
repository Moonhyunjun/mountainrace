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

## 별도 프로젝트 — OVERNIGHT (overnight.asia)

같은 저장소에 2026 단양 행사(`overnight.asia`) 런칭 파일이 함께 들어 있습니다.
원주 마운틴 레이스 사이트(`index.html`)와는 **별개 브랜드**이며 서로 영향을 주지 않습니다.

| 파일 | 용도 |
|---|---|
| `overnight-domain-setup.md` | **여기부터 읽으세요.** 아임웹 연동 · 도메인 · SSL 런북 |
| `overnight-imweb-copy.md` | 아임웹 섹션별 복붙 카피 · SEO · 폼 항목 · 인스타 바이오 |
| `overnight-hero-block.html` | 아임웹 `위젯 추가 > HTML` 에 통째로 붙여넣는 히어로 (`ovn-` 접두사) |
| `danyang-overnight.html` | 단독 실행 원페이지. 아임웹이 막히면 정적 호스팅에 올리는 대안 |
| `overnight-dns-check.sh` | 도메인 전파 · SSL 상태 점검 — macOS · Linux · WSL (`--watch` 로 반복) |
| `overnight-dns-check.ps1` | 같은 점검의 Windows PowerShell 버전 |

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
