# SiteFooter Specification

## Overview
- **Target file:** `src/components/sites/www-molo-com-51adfc9a/en-dk-42785c00/SiteFooter.tsx`
  (newsletter form: `NotifyForm.tsx`)
- **Screenshot:** `docs/design-references/www-molo-com-51adfc9a/en-dk-42785c00/desktop-footer.jpg`
- **Interaction model:** static + one form submit

## Computed Styles (exact)
### footer
- backgroundColor: **`rgb(72, 163, 220)`** (`--color-blue`); color: `rgb(24, 24, 24)`
- padding: `37px 60px 56px`; height: `468px`
- fontFamily: mono; fontSize: `11px`
### top grid
- display: `grid`; gridTemplateColumns: `270px 270px 270px 270px`; columnGap: `80px`
### column heading
- mono `11px`, uppercase, `text-decoration: underline`, `text-underline-offset: ~3px`
### column links list
- `display: flex; flex-direction: column; gap: 6px`; mono `11px`, uppercase
### newsletter column (4th)
- body copy: mono `11px`, uppercase, line-height ~`15.4px`
- input row: `display: flex; justify-content: space-between; align-items: center;`
  `border-bottom: 1px solid rgb(24,24,24)`; input background transparent, placeholder `#999`
  submit label `SIGN UP`, mono `11px`, uppercase
- checkbox row: `13px` box + `I accept the ...` with an underlined link, gap `~10px`
### bottom grid
- second `grid` with the same `270px × 4` / `80px` template
- left column: `EN / DKK` then `© MOLO 2026` (second line at reduced contrast)
- second column: badge icon `~40px` + `CERTIFIED BY …` + `READ MORE`
- right: oversized wordmark, bottom-aligned, cap height ≈ `100px`

## States & Behaviors
- Link hover: color → `rgba(24,24,24,.5)`; headings keep their underline.
- Form submit: the clone prevents default, validates `type="email"`, and swaps the row for a
  confirmation line (same mono 11px). No network call — matches the current static site's
  demo behaviour; wire `action` to Stibee/Mailchimp/Google Forms when a service is chosen.

## Text Content (clone)
- Column 1 `대회 안내`: `2027 대회` · `2026 기록` · `코스` · `장소` · `일정`
- Column 2 `참가 안내`: `참가 자격` · `사전알림 신청` · `자주 묻는 질문` · `문의하기`
- Column 3 `FOLLOW US`: `INSTAGRAM`
- Column 4: `2027 대회 일정과 얼리버드 접수 오픈 소식을 이메일로 가장 먼저 보내드립니다.`
  placeholder `이메일 주소` · submit `사전알림 신청` · checkbox `개인정보 수집·이용에 동의합니다`
- Bottom: `KO / KRW` · `© 2026 MOUNTAIN RACE` · `강원특별자치도 원주시 · 피노키오숲 일원` · `INSTAGRAM @mountainrace.official`
- Wordmark: `MOUNTAIN RACE`

## Responsive Behavior
- 1440: 4 × 270px, gap 80px, padding `37px 60px 56px`
- 768: `repeat(2, 1fr)`, gap `40px 32px`, wordmark cap height `~64px`
- 390: `1fr`, gap `32px`, padding `32px 20px 40px`, wordmark cap height `~40px`
- Breakpoint: **1024px** → 2 columns, **768px** → 1 column
