import { chromium } from 'playwright-core';
import fs from 'node:fs';
const URL_='https://www.molo.com/en-DK?ref=minimal.gallery';
const OUT='/home/user/mountainrace/docs/research/www-molo-com-51adfc9a/en-dk-42785c00';
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',proxy:{server:'http://127.0.0.1:43453'},args:['--no-sandbox','--ssl-version-max=tls1.2']});
const ctx=await b.newContext({viewport:{width:1440,height:900}});
const page=await ctx.newPage();
await page.goto(URL_,{waitUntil:'domcontentloaded',timeout:90000});
await page.waitForTimeout(4000);
for(const t of ['Accept all','Accept All','Allow all']){const x=page.locator(`button:has-text("${t}")`).first();if(await x.count()&&await x.isVisible().catch(()=>false)){await x.click().catch(()=>{});await page.waitForTimeout(1200);break;}}
await page.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{window.scrollTo(0,y);y+=500;if(y>document.body.scrollHeight){clearInterval(t);window.scrollTo(0,0);r();}},180);});});
await page.waitForTimeout(2500);

const P=['display','gridTemplateColumns','gridTemplateRows','gap','columnGap','rowGap','padding','paddingTop','paddingBottom','paddingLeft','paddingRight','margin','marginTop','marginBottom','width','height','maxWidth','aspectRatio','position','top','right','bottom','left','justifyContent','alignItems','flexDirection','textAlign','backgroundColor','color','fontFamily','fontSize','fontWeight','lineHeight','letterSpacing','textTransform','objectFit','overflow','borderRadius','transition','transform','zIndex','mixBlendMode','animation','animationDuration'];
const dump=await page.evaluate((P)=>{
  const cs=getComputedStyle;
  const st=el=>{if(!el)return null;const s=cs(el);const o={};P.forEach(p=>{const v=s[p];if(v&&v!=='none'&&v!=='normal'&&v!=='auto'&&v!=='0px'&&v!=='rgba(0, 0, 0, 0)')o[p]=v;});const r=el.getBoundingClientRect();o.__box=`${Math.round(r.left)},${Math.round(r.top+scrollY)} ${Math.round(r.width)}x${Math.round(r.height)}`;o.__cls=el.className?.toString().replace(/[A-Za-z]+-module-scss-module__[A-Za-z0-9]+__/g,'').slice(0,90);o.__tag=el.tagName.toLowerCase();return o;};
  const tree=(el,d=0,max=3)=>{if(!el||d>max)return null;return {...st(el), children:[...el.children].slice(0,8).map(c=>tree(c,d+1,max)).filter(Boolean)};};
  const secs=[...document.querySelectorAll('main section')];
  return {
    hero:tree(secs[0],0,4),
    centeredMedia:tree(secs[1],0,4),
    productGrid:tree(secs[2],0,3),
    statement:tree(secs[3],0,3),
    splitPair:tree(secs[4],0,3),
    marqueeStrip:tree(secs[12],0,3),
    lastSplit:tree(secs[13],0,3),
    footerTree:tree(document.querySelector('footer'),0,3),
    headerTree:tree(document.querySelector('header'),0,2),
    uspTree:tree(document.querySelector('[class*="UspBanner"]'),0,3),
  };
},P);
fs.writeFileSync(`${OUT}/raw-geometry.json`,JSON.stringify(dump,null,1));
await b.close();
console.log('RECON3 OK');
