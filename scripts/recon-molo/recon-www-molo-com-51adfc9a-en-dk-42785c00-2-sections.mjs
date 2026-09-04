import { chromium } from 'playwright-core';
import fs from 'node:fs';
const URL_='https://www.molo.com/en-DK?ref=minimal.gallery';
const SHOTS='/home/user/mountainrace/docs/design-references/www-molo-com-51adfc9a/en-dk-42785c00';
const OUT='/home/user/mountainrace/docs/research/www-molo-com-51adfc9a/en-dk-42785c00';
const LAUNCH={executablePath:'/opt/pw-browsers/chromium',proxy:{server:'http://127.0.0.1:43453'},args:['--no-sandbox','--ssl-version-max=tls1.2']};

const browser=await chromium.launch(LAUNCH);
const ctx=await browser.newContext({viewport:{width:1440,height:900},userAgent:'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36'});
const page=await ctx.newPage();
await page.goto(URL_,{waitUntil:'domcontentloaded',timeout:90000});
await page.waitForTimeout(4000);
for(const t of ['Accept all','Accept All','Allow all','Godkend alle','Accept']){const b=page.locator(`button:has-text("${t}")`).first();if(await b.count()&&await b.isVisible().catch(()=>false)){await b.click().catch(()=>{});await page.waitForTimeout(1500);break;}}

// ---- header state A (scroll 0)
const headerA=await page.evaluate(()=>{
  const pick=el=>{if(!el)return null;const s=getComputedStyle(el);const o={};
    ['position','top','height','padding','paddingLeft','paddingRight','backgroundColor','backdropFilter','boxShadow','borderBottom','transform','transition','zIndex','opacity','mixBlendMode','color'].forEach(p=>o[p]=s[p]);return o;};
  const h=document.querySelector('header');
  return {header:pick(h), headerText:(h?.innerText||'').trim(), usp:pick(document.querySelector('header')?.previousElementSibling)};
});

// ---- announcement / usp bar
const usp=await page.evaluate(()=>{
  const cands=[...document.querySelectorAll('div,section,aside')].filter(e=>{const r=e.getBoundingClientRect();return r.top<40&&r.height>20&&r.height<60&&r.width>1200;});
  return cands.slice(0,3).map(e=>{const s=getComputedStyle(e);return{cls:e.className?.toString().slice(0,120),h:Math.round(e.getBoundingClientRect().height),bg:s.backgroundColor,color:s.color,fs:s.fontSize,ff:s.fontFamily,ls:s.letterSpacing,tt:s.textTransform,text:e.innerText.trim().replace(/\s+/g,' ').slice(0,200)};});
});

// ---- force eager images
await page.evaluate(()=>{document.querySelectorAll('img').forEach(i=>{i.loading='eager';i.decoding='sync';});});
await page.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{window.scrollTo(0,y);y+=400;if(y>document.body.scrollHeight+1000){clearInterval(t);r();}},250);});});
await page.waitForTimeout(4000);

// header state B (scrolled)
await page.evaluate(()=>window.scrollTo(0,600));
await page.waitForTimeout(1200);
const headerB=await page.evaluate(()=>{const s=getComputedStyle(document.querySelector('header'));const o={};
  ['position','top','height','padding','backgroundColor','backdropFilter','boxShadow','borderBottom','transform','transition','zIndex','opacity','color'].forEach(p=>o[p]=s[p]);return o;});

await page.evaluate(()=>window.scrollTo(0,0));
await page.waitForTimeout(2500);
await page.screenshot({path:`${SHOTS}/desktop-full.png`,fullPage:true});

// ---- section-by-section detail
const sections=await page.evaluate(()=>{
  const secs=[...document.querySelectorAll('main section')];
  const cs=getComputedStyle;
  const st=el=>{const s=cs(el);const o={};['display','gridTemplateColumns','gap','padding','margin','marginTop','marginBottom','width','maxWidth','height','aspectRatio','position','backgroundColor','justifyContent','alignItems','flexDirection','overflow','textAlign'].forEach(p=>{const v=s[p];if(v&&v!=='none'&&v!=='normal'&&v!=='auto'&&v!=='0px')o[p]=v;});return o;};
  return secs.map((sec,i)=>{
    const r=sec.getBoundingClientRect();
    const texts=[...sec.querySelectorAll('h1,h2,h3,h4,p,a,span,button,li')].filter(e=>e.children.length===0&&e.textContent.trim()).slice(0,30)
      .map(e=>{const s=cs(e);return{tag:e.tagName.toLowerCase(),text:e.textContent.trim().slice(0,180),ff:s.fontFamily.split(',')[0],fs:s.fontSize,fw:s.fontWeight,lh:s.lineHeight,ls:s.letterSpacing,tt:s.textTransform,color:s.color,td:s.textDecorationLine}});
    const imgs=[...sec.querySelectorAll('img')].map(im=>{const s=cs(im);const rr=im.getBoundingClientRect();return{src:(im.currentSrc||im.src).slice(0,240),alt:im.alt,w:Math.round(rr.width),h:Math.round(rr.height),fit:s.objectFit,ar:s.aspectRatio,radius:s.borderRadius}});
    const vids=[...sec.querySelectorAll('video')].map(v=>({src:(v.currentSrc||v.src||v.querySelector('source')?.src||'').slice(0,240),poster:v.poster,autoplay:v.autoplay,loop:v.loop,muted:v.muted}));
    const grids=[...sec.querySelectorAll('ul,div')].filter(e=>cs(e).display.includes('grid')).slice(0,3).map(e=>({cls:e.className?.toString().slice(0,80),cols:cs(e).gridTemplateColumns,gap:cs(e).gap,children:e.children.length}));
    return {i,top:Math.round(r.top+scrollY),h:Math.round(r.height),cls:sec.className?.toString().slice(0,120),styles:st(sec),texts,imgs,vids,grids};
  });
});
fs.writeFileSync(`${OUT}/raw-sections.json`,JSON.stringify({headerA,headerB,usp,sections},null,2));

// ---- header full detail
const headerDetail=await page.evaluate(()=>{
  const h=document.querySelector('header');const cs=getComputedStyle;
  const items=[...h.querySelectorAll('a,button,span,svg')].slice(0,50).map(e=>{const s=cs(e);const r=e.getBoundingClientRect();return{tag:e.tagName.toLowerCase(),text:(e.textContent||'').trim().slice(0,40),href:e.getAttribute?.('href'),fs:s.fontSize,ff:s.fontFamily.split(',')[0],fw:s.fontWeight,ls:s.letterSpacing,tt:s.textTransform,color:s.color,x:Math.round(r.left),y:Math.round(r.top),w:Math.round(r.width)}});
  const logo=h.querySelector('svg,img');
  return {items, logoHtml:(logo?.outerHTML||'').slice(0,3000), innerText:h.innerText};
});
fs.writeFileSync(`${OUT}/raw-header.json`,JSON.stringify(headerDetail,null,2));

// ---- footer
const footer=await page.evaluate(()=>{
  const f=document.querySelector('footer');if(!f)return null;const cs=getComputedStyle;
  const s=cs(f);
  return {styles:{bg:s.backgroundColor,color:s.color,padding:s.padding,fs:s.fontSize,ff:s.fontFamily},
    innerText:f.innerText, h:Math.round(f.getBoundingClientRect().height),
    cols:[...f.querySelectorAll('ul,nav,div')].filter(e=>cs(e).display.includes('grid')||cs(e).display.includes('flex')).slice(0,6).map(e=>({cls:e.className?.toString().slice(0,80),d:cs(e).display,cols:cs(e).gridTemplateColumns,gap:cs(e).gap,text:e.innerText.replace(/\s+/g,' ').slice(0,200)}))};
});
fs.writeFileSync(`${OUT}/raw-footer.json`,JSON.stringify(footer,null,2));
await page.evaluate(()=>document.querySelector('footer')?.scrollIntoView());
await page.waitForTimeout(1500);
await page.screenshot({path:`${SHOTS}/desktop-footer.png`});

// ---- root font size + breakpoints
const meta=await page.evaluate(()=>({rootFontSize:getComputedStyle(document.documentElement).fontSize, bodyBg:getComputedStyle(document.body).backgroundColor, mainBg:getComputedStyle(document.querySelector('main')).backgroundColor}));
fs.writeFileSync(`${OUT}/raw-meta.json`,JSON.stringify(meta,null,2));

// ---- mobile
const m=await ctx.newPage();
await m.setViewportSize({width:390,height:844});
await m.goto(URL_,{waitUntil:'domcontentloaded',timeout:90000});
await m.waitForTimeout(3500);
for(const t of ['Accept all','Accept All','Allow all','Godkend alle','Accept']){const b=m.locator(`button:has-text("${t}")`).first();if(await b.count()&&await b.isVisible().catch(()=>false)){await b.click().catch(()=>{});await m.waitForTimeout(1200);break;}}
await m.evaluate(()=>{document.querySelectorAll('img').forEach(i=>{i.loading='eager';});});
await m.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{window.scrollTo(0,y);y+=350;if(y>document.body.scrollHeight+800){clearInterval(t);r();}},220);});});
await m.waitForTimeout(3000);
await m.evaluate(()=>window.scrollTo(0,0));
await m.waitForTimeout(1500);
await m.screenshot({path:`${SHOTS}/mobile-full.png`,fullPage:true});
const mob=await m.evaluate(()=>{
  const cs=getComputedStyle;
  return {sitePadding:cs(document.documentElement).getPropertyValue('--site-padding'),
    headerHeight:cs(document.documentElement).getPropertyValue('--header-height'),
    moduleGap:cs(document.documentElement).getPropertyValue('--module-gap'),
    gridCols:[...document.querySelectorAll('main ul,main div')].filter(e=>cs(e).display.includes('grid')).slice(0,6).map(e=>({cols:cs(e).gridTemplateColumns,gap:cs(e).gap,cls:e.className?.toString().slice(0,60)})),
    headerText:document.querySelector('header')?.innerText};
});
fs.writeFileSync(`${OUT}/raw-mobile.json`,JSON.stringify(mob,null,2));

// tablet
await m.setViewportSize({width:768,height:1024});
await m.waitForTimeout(1500);
const tab=await m.evaluate(()=>{const cs=getComputedStyle;return {sitePadding:cs(document.documentElement).getPropertyValue('--site-padding'),headerHeight:cs(document.documentElement).getPropertyValue('--header-height'),moduleGap:cs(document.documentElement).getPropertyValue('--module-gap'),gridCols:[...document.querySelectorAll('main ul,main div')].filter(e=>cs(e).display.includes('grid')).slice(0,6).map(e=>({cols:cs(e).gridTemplateColumns,gap:cs(e).gap}))};});
fs.appendFileSync(`${OUT}/raw-mobile.json`,'\n/* TABLET 768 */\n'+JSON.stringify(tab,null,2));
await browser.close();
console.log('RECON2 OK sections',sections.length);
