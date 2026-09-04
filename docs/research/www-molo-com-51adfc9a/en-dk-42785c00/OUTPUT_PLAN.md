# Output Plan — molo.com/en-DK clone

| Field | Value |
|---|---|
| Source URL | `https://www.molo.com/en-DK?ref=minimal.gallery` (`ref` = tracking param, not stateful → normalized to `/en-DK`) |
| app-root | `.` (repo root) |
| site-key | `www-molo-com-51adfc9a` (sha256 of `https://www.molo.com`) |
| page-key | `en-dk-42785c00` (sha256 of `/en-DK`) |
| Artifact root | `docs/research/www-molo-com-51adfc9a/en-dk-42785c00/` |
| Screenshot root | `docs/design-references/www-molo-com-51adfc9a/en-dk-42785c00/` |
| Component root | `src/components/sites/www-molo-com-51adfc9a/en-dk-42785c00/` |
| Asset root | `public/sites/www-molo-com-51adfc9a/en-dk-42785c00/` |
| Destination route | `/` (first clone into an untouched template scaffold — `src/app/page.tsx` replaced) |

## Pre-existing routes inventoried before writing
- `src/app/page.tsx` — untouched Next.js/shadcn template scaffold. **Replaced** (allowed by the skill's routing default for the first fresh-template clone).
- No other `page.tsx`, no existing `src/components/sites/**`, no existing research/screenshot/asset namespaces.
- Legacy static site at repo root (`index.html`, `css/`, `js/`, `assets/`) is **not** part of the Next.js app and was left untouched.

## User instruction that overrides the pure-emulation default
> "클론을 만들고 현재 사이트에 정보를 넣어봐줘" — build the clone, then put the current site's (WONJU MOUNTAIN RACE) information into it.

Therefore: **layout, tokens, typography, geometry and behaviors are cloned 1:1 from molo.com; all copy is WONJU MOUNTAIN RACE content** taken verbatim from the repo's existing `index.html` / `README.md`.

## Browser automation
No browser MCP server is connected to this session. Used the pre-installed Chromium
(`/opt/pw-browsers/chromium`) driven by `playwright-core` instead, through the session's
egress proxy (`--proxy-server=http://127.0.0.1:43453 --ssl-version-max=tls1.2`; the proxy's
TLS termination resets Chromium's TLS 1.3 handshake). Certificate verification stayed on.
Recon scripts: `scripts/recon-molo/` (recon.mjs, recon2.mjs, recon3.mjs).
