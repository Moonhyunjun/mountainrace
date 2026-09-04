# Recon scripts — molo.com/en-DK

The scripts that produced `docs/research/www-molo-com-51adfc9a/en-dk-42785c00/*.json`
and `docs/design-references/www-molo-com-51adfc9a/en-dk-42785c00/*.png`.

No browser MCP server was connected to this session, so they drive the
pre-installed Chromium through `playwright-core` instead.

```bash
npm i --no-save playwright-core          # PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
node scripts/recon-molo/recon-www-molo-com-51adfc9a-en-dk-42785c00-1-global.mjs
node scripts/recon-molo/recon-www-molo-com-51adfc9a-en-dk-42785c00-2-sections.mjs
node scripts/recon-molo/recon-www-molo-com-51adfc9a-en-dk-42785c00-3-geometry.mjs
node scripts/recon-molo/qa-shot-clone.mjs   # needs `next start -p 3100` running
```

Two launch flags are load-bearing inside this sandbox and can be dropped elsewhere:

- `proxy: { server: 'http://127.0.0.1:43453' }` — Chromium does not pick up the
  session's `HTTPS_PROXY` on its own.
- `--ssl-version-max=tls1.2` — the egress proxy re-terminates TLS and resets
  Chromium's TLS 1.3 handshake (`ERR_CONNECTION_RESET` on every host). Certificate
  verification stays on.
