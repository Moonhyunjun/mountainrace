# 이 스킬의 출처 (vendored)

이 디렉터리는 unlazy 저장소의 스킬을 이 프로젝트로 복사(vendoring)한 것입니다.
직접 작성한 파일이 아니므로, 내용을 고칠 때는 아래 "업데이트 방법"을 먼저 확인하세요.

| 항목 | 값 |
|---|---|
| 원본 저장소 | https://github.com/Leonxlnx/unlazy |
| 원본 경로 | 저장소 루트 (`SKILL.md`, `references/`, `scripts/`, `templates/`) |
| 가져온 커밋 | `473d4b80421c36d733042434cd4b938f81a19ef1` (2026-08-29, 2.1.0 소스) |
| 라이선스 | MIT (`LICENSE` 동봉) |

테스트(`tests/`), GitHub 워크플로우, `package.json`, `agents/`, `research/`는
스킬 사용에 필요하지 않아 가져오지 않았습니다.

## 업데이트 방법

```bash
git clone --depth 1 https://github.com/Leonxlnx/unlazy.git /tmp/unlazy
cp /tmp/unlazy/{SKILL.md,LICENSE,SECURITY.md,README.md,CHANGELOG.md} .claude/skills/unlazy/
cp -r /tmp/unlazy/{references,scripts,templates} .claude/skills/unlazy/
git -C /tmp/unlazy rev-parse HEAD   # → 이 값을 위 표에 기록
```

## 이 프로젝트에서 쓰는 법

unlazy는 "완료 규율" 스킬입니다. 실질적인 작업 전에 `GATES.md`에 검증 가능한 게이트
(`CHECK:` 명령 + `EXPECT:` 성공 마커)를 먼저 쓰고, 실행 결과(증거)로만 완료를 보고합니다.

```bash
node .claude/skills/unlazy/scripts/gate-lint.mjs  site-v2/GATES.md            # 게이트 품질 점검 (실행 없음)
node .claude/skills/unlazy/scripts/gate-check.mjs --status  site-v2/GATES.md  # 상태만 (실행 없음)
node .claude/skills/unlazy/scripts/gate-check.mjs --approve site-v2/GATES.md  # CHECK 명령을 읽고 승인 후 실행
node .claude/skills/unlazy/scripts/gate-check.mjs --reverify site-v2/GATES.md # 전부 재실행
```

`CHECK:` 줄은 셸 코드입니다. 남이 쓴 ledger를 승인하기 전에 반드시 명령과 호출되는 스크립트를 읽으세요.
승인 기록은 저장소 밖(`~/.unlazy/approved`)에 저장됩니다. `.unlazy/` 디렉터리는 커밋하지 마세요.
