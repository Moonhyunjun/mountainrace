import { chromium } from 'playwright-core';
const SHOTS='/home/user/mountainrace/docs/design-references/www-molo-com-51adfc9a/en-dk-42785c00';
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--no-sandbox']});
for (const [name,w,h] of [['clone-desktop',1440,900],['clone-mobile',390,844]]) {
  const ctx=await b.newContext({viewport:{width:w,height:h}});
  const p=await ctx.newPage();
  await p.goto('http://127.0.0.1:3100/',{waitUntil:'networkidle',timeout:60000});
  await p.waitForTimeout(2500);
  await p.screenshot({path:`${SHOTS}/${name}-full.png`,fullPage:true});
  const info=await p.evaluate(()=>({h:document.body.scrollHeight,
    header:(()=>{const s=getComputedStyle(document.querySelector('header'));return{top:s.top,height:s.height,blend:s.mixBlendMode,pad:s.padding,cols:s.gridTemplateColumns};})(),
    usp:(()=>{const e=document.querySelector('div.fixed.inset-x-0.top-0');const s=e&&getComputedStyle(e);return s?{h:s.height,bg:s.backgroundColor,fs:s.fontSize,ls:s.letterSpacing}:null;})(),
    sections:[...document.querySelectorAll('main > *')].map(e=>{const r=e.getBoundingClientRect();const s=getComputedStyle(e);return{tag:e.tagName.toLowerCase(),id:e.id,top:Math.round(r.top+scrollY),h:Math.round(r.height),mb:s.marginBottom};}),
    label:(()=>{const e=document.querySelector('.mr-label');const s=getComputedStyle(e);return{ff:s.fontFamily.split(',')[0],fs:s.fontSize,lh:s.lineHeight,ls:s.letterSpacing,tt:s.textTransform};})(),
    footer:(()=>{const s=getComputedStyle(document.querySelector('footer'));return{bg:s.backgroundColor,pad:s.padding};})()}));
  console.log('===',name,JSON.stringify(info,null,1));
  await ctx.close();
}
await b.close();
