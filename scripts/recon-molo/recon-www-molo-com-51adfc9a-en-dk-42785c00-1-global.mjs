import { chromium } from 'playwright-core';
import fs from 'node:fs';

const URL_ = 'https://www.molo.com/en-DK?ref=minimal.gallery';
const SHOTS = '/home/user/mountainrace/docs/design-references/www-molo-com-51adfc9a/en-dk-42785c00';
const OUT = '/home/user/mountainrace/docs/research/www-molo-com-51adfc9a/en-dk-42785c00';

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', proxy: { server: 'http://127.0.0.1:43453' }, args: ['--no-sandbox','--ssl-version-max=tls1.2'] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1,
  userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36' });
const page = await ctx.newPage();
await page.goto(URL_, { waitUntil: 'domcontentloaded', timeout: 90000 });
await page.waitForTimeout(4000);

// cookie banner
const texts = ['Accept all','Accept All','Allow all','Accept','Godkend alle','OK'];
for (const t of texts) {
  const b = page.locator(`button:has-text("${t}")`).first();
  if (await b.count() && await b.isVisible().catch(()=>false)) { await b.click().catch(()=>{}); await page.waitForTimeout(1500); break; }
}
await page.waitForTimeout(2000);
await page.screenshot({ path: `${SHOTS}/desktop-viewport-top.png` });

const global = await page.evaluate(() => {
  const cs = getComputedStyle;
  const body = document.body, html = document.documentElement;
  const uniq = a => [...new Set(a)];
  const heads = [...document.querySelectorAll('h1,h2,h3,h4,p,a,button,span,li')].slice(0,400);
  const fontMap = {};
  heads.forEach(el => { const s = cs(el); const k = el.tagName.toLowerCase();
    (fontMap[k] ||= []).push(`${s.fontFamily} | ${s.fontSize} | ${s.fontWeight} | ${s.lineHeight} | ${s.letterSpacing} | ${s.textTransform} | ${s.color}`); });
  Object.keys(fontMap).forEach(k => fontMap[k] = uniq(fontMap[k]).slice(0,10));
  const colors = uniq([...document.querySelectorAll('*')].slice(0,1500).flatMap(el => { const s = cs(el); return [s.color, s.backgroundColor, s.borderColor]; })).filter(c => c && c !== 'rgba(0, 0, 0, 0)');
  return {
    title: document.title,
    lang: html.lang,
    bodyBg: cs(body).backgroundColor, bodyColor: cs(body).color, bodyFont: cs(body).fontFamily, bodyFontSize: cs(body).fontSize,
    htmlClasses: html.className, bodyClasses: body.className,
    metaDesc: document.querySelector('meta[name="description"]')?.content,
    fontFaces: [...document.styleSheets].flatMap(ss => { try { return [...ss.cssRules] } catch { return [] } })
      .filter(r => r.constructor.name === 'CSSFontFaceRule').map(r => r.cssText).slice(0,40),
    fontLinks: [...document.querySelectorAll('link[rel="preload"][as="font"], link[href*="font"]')].map(l => l.href),
    favicons: [...document.querySelectorAll('link[rel*="icon"]')].map(l => ({ href: l.href, sizes: l.sizes?.toString(), type: l.type })),
    fontMap, colors: colors.slice(0,60),
    scrollLibs: { lenis: !!document.querySelector('.lenis, [data-lenis], html.lenis'), locomotive: !!document.querySelector('[data-scroll-container]') },
    cssVars: (() => { const s = cs(html); const o = {}; for (const p of s) if (p.startsWith('--')) o[p] = s.getPropertyValue(p).trim(); return o; })(),
    scrollHeight: document.documentElement.scrollHeight,
  };
});
fs.writeFileSync(`${OUT}/raw-global.json`, JSON.stringify(global, null, 2));

const topology = await page.evaluate(() => {
  const out = [];
  const main = document.querySelector('main') || document.body;
  const walk = (el, depth) => {
    for (const c of el.children) {
      const r = c.getBoundingClientRect(); const s = getComputedStyle(c);
      if (r.height < 60) continue;
      out.push({ depth, tag: c.tagName.toLowerCase(), id: c.id, cls: c.className?.toString().slice(0,140),
        top: Math.round(r.top + window.scrollY), h: Math.round(r.height), w: Math.round(r.width),
        pos: s.position, bg: s.backgroundColor, text: (c.innerText||'').trim().replace(/\s+/g,' ').slice(0,160),
        imgs: c.querySelectorAll('img').length, vids: c.querySelectorAll('video').length, svgs: c.querySelectorAll('svg').length });
      if (depth < 2) walk(c, depth + 1);
    }
  };
  walk(main, 0);
  return { mainTag: main.tagName, headerHtmlLen: document.querySelector('header')?.outerHTML.length || 0, nodes: out };
});
fs.writeFileSync(`${OUT}/raw-topology.json`, JSON.stringify(topology, null, 2));

const assets = await page.evaluate(() => ({
  images: [...document.querySelectorAll('img')].map(i => ({ src: i.currentSrc || i.src, alt: i.alt, w: i.naturalWidth, h: i.naturalHeight,
    cls: i.className?.toString().slice(0,80), parentCls: i.parentElement?.className?.toString().slice(0,80),
    pos: getComputedStyle(i).position, fit: getComputedStyle(i).objectFit, srcset: (i.srcset||'').slice(0,300) })),
  videos: [...document.querySelectorAll('video')].map(v => ({ src: v.currentSrc || v.src || v.querySelector('source')?.src, poster: v.poster, autoplay: v.autoplay, loop: v.loop, muted: v.muted })),
  bgImages: [...document.querySelectorAll('*')].filter(el => { const b = getComputedStyle(el).backgroundImage; return b && b !== 'none' && b.includes('url'); })
    .map(el => ({ url: getComputedStyle(el).backgroundImage.slice(0,300), el: el.tagName + '.' + (el.className?.toString().split(' ')[0]||'') })).slice(0,40),
  svgs: [...document.querySelectorAll('svg')].slice(0,40).map(s => ({ cls: s.getAttribute('class'), vb: s.getAttribute('viewBox'), w: s.getAttribute('width'), h: s.getAttribute('height'), html: s.outerHTML.slice(0,900) })),
}));
fs.writeFileSync(`${OUT}/raw-assets.json`, JSON.stringify(assets, null, 2));

// full page screenshot desktop
await page.evaluate(async () => { await new Promise(res => { let y = 0; const t = setInterval(() => { window.scrollTo(0, y); y += 600; if (y > document.body.scrollHeight) { clearInterval(t); window.scrollTo(0,0); res(); } }, 120); }); });
await page.waitForTimeout(3000);
await page.screenshot({ path: `${SHOTS}/desktop-full.png`, fullPage: true });

await browser.close();
console.log('RECON OK', global.title, 'scrollHeight', global.scrollHeight, 'imgs', assets.images.length, 'vids', assets.videos.length);
