# 이 스킬의 출처 (vendored)

이 디렉터리는 당근 SEED Design 저장소의 스킬을 이 프로젝트로 복사(vendoring)한 것입니다.
직접 작성한 파일이 아니므로, 내용을 고칠 때는 아래 "업데이트 방법"을 먼저 확인하세요.

| 항목 | 값 |
|---|---|
| 원본 저장소 | https://github.com/daangn/seed-design |
| 원본 경로 | `skills/seed-design/` |
| 가져온 커밋 | `a4f0fe97d69883eef3ba9b1a7939ee8682cbb017` (2026-08-05) |
| 라이선스 | Apache License 2.0 (`LICENSE`, `NOTICE` 동봉) |

원본 저장소에는 이 스킬 외에도 `create-component`, `changeset`, `deprecation`,
`snapshot-release` 등의 스킬이 더 있지만, 그것들은 **SEED Design 저장소 자체를 개발할 때**
쓰는 것이라 이 프로젝트에는 가져오지 않았습니다.
여기 있는 `seed-design` 스킬만이 "SEED Design을 갖다 쓰는 쪽"을 위한 가이드입니다.

## 업데이트 방법

원본이 갱신되면 아래처럼 다시 복사하고, 위 표의 커밋 해시를 갱신하세요.

```bash
git clone --depth 1 https://github.com/daangn/seed-design.git /tmp/seed-design
cp -r /tmp/seed-design/skills/seed-design/SKILL.md \
      /tmp/seed-design/skills/seed-design/references \
      .claude/skills/seed-design/
cp /tmp/seed-design/LICENSE /tmp/seed-design/NOTICE .claude/skills/seed-design/
git -C /tmp/seed-design rev-parse HEAD   # → 이 값을 위 표에 기록
```

## 이 프로젝트에서의 주의점

SEED Design은 **React 기반** 디자인 시스템(`@seed-design/react`, `@seed-design/css`)입니다.
반면 이 저장소(mountain-race.com)는 빌드 과정이 없는 **정적 HTML/CSS/JS** 사이트라
컴포넌트 스니펫을 그대로 설치(`npx @seed-design/cli init`)할 수는 없습니다.

따라서 현재 구성에서는 주로 이런 용도로 쓰게 됩니다.

- 색상·타이포·스페이싱 등 **파운데이션 토큰을 참고**해 `css/style.css`의 디자인 값을 정리
- 나중에 사이트를 React로 다시 만들 경우의 **셋업·컴포넌트 도입 가이드**

컴포넌트를 실제로 설치하려면 npm/번들러가 있는 React 프로젝트가 필요합니다.

## 상표 관련

`NOTICE`에 적힌 대로 로고·상호명·캐릭터 등 당근마켓의 **브랜드 리소스**는 상표법의 보호를 받으며
Apache 2.0의 적용 대상이 아닙니다. 이 스킬은 문서/가이드 텍스트만 포함하고 있고
브랜드 리소스는 포함하지 않습니다. 당근마켓의 로고나 상호를 이 사이트에 사용하지 마세요.
