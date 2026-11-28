// Ek: 320 px (küçük telefon) taşma/başlık kırpılması, prefers-reduced-motion (animasyon yok, içerik hemen görünür), geri bağlantısı klavye odağı.
const pw=require('playwright');const fs=require('fs');const [,,BR='chromium',OUT]=process.argv;const out=[];
const PAGES=['/insan-kaynaklari','/acik-pozisyonlar','/staj-programlari'];
function T(n,ok,i){out.push({n,ok:!!ok,i});console.log(BR,ok?'GEÇTİ':'KALDI',n,i===undefined?'':JSON.stringify(i).slice(0,200));}
(async()=>{const b=await pw[BR].launch();
 for(const [label,o] of [['320 px',{viewport:{width:320,height:640},deviceScaleFactor:2,hasTouch:true}],['375 px',{viewport:{width:375,height:667},deviceScaleFactor:2,hasTouch:true}]]){
  for(const p of PAGES){const ctx=await b.newContext(o);await require('./routecareer.js')(ctx,{});const pg=await ctx.newPage();
   await pg.goto('https://www.reklam1n.com'+p,{waitUntil:'domcontentloaded'});await pg.waitForTimeout(9000);
   const H=await pg.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<=H;y+=300){await pg.evaluate(y=>scrollTo(0,y),y);await pg.waitForTimeout(100);}await pg.waitForTimeout(1500);
   const r=await pg.evaluate(()=>{const vw=innerWidth;const bad=[...document.querySelectorAll('.cr *')].filter(e=>{const b=e.getBoundingClientRect();return b.width&&(b.right>vw+0.5||b.left<-0.5);}).map(e=>String(e.className).slice(0,24));
    const lines=[...document.querySelectorAll('.cr-title .cr-ln, .cr-door__title .cr-ln')].map(l=>{const r=document.createRange();r.selectNodeContents(l);const b=r.getBoundingClientRect();return Math.round(b.right);});
    const hidden=[...document.querySelectorAll('[data-cr-rise],[data-cr-in]')].filter(e=>+getComputedStyle(e).opacity<1).length;
    return{overflowX:document.documentElement.scrollWidth>vw,bad:bad.slice(0,4),maxLine:Math.max(...lines),vw,hidden};});
   T(label+' '+p+': yatay taşma yok, başlık satırları ekran içinde, gizli blok yok',!r.overflowX&&!r.bad.length&&r.maxLine<=r.vw&&r.hidden===0,r);await ctx.close();}}
 for(const prof of [{viewport:{width:1440,height:900}},{viewport:{width:390,height:844},deviceScaleFactor:2,hasTouch:true}]){
  const ctx=await b.newContext(Object.assign({reducedMotion:'reduce'},prof));await require('./routecareer.js')(ctx,{});const pg=await ctx.newPage();
  await pg.goto('https://www.reklam1n.com/insan-kaynaklari',{waitUntil:'domcontentloaded'});
  await pg.waitForFunction(()=>!!window.gsap&&!!document.querySelector('.cr-door'),null,{timeout:30000});await pg.waitForTimeout(400);
  const r=await pg.evaluate(()=>({op:[...document.querySelectorAll('[data-cr-in],[data-cr-rise]')].map(e=>getComputedStyle(e).opacity),tf:[...document.querySelectorAll('[data-cr-in],[data-cr-rise]')].map(e=>e.style.transform||''),tweens:window.gsap.globalTimeline.getChildren(true,true,false).length,rm:matchMedia('(prefers-reduced-motion: reduce)').matches}));
  T('hareket azaltma ('+prof.viewport.width+' px): içerik hemen tam görünür, GSAP tween yok',r.rm&&r.op.every(x=>+x===1)&&r.tf.every(x=>!x),r);await ctx.close();}
 { const ctx=await b.newContext({viewport:{width:1440,height:900}});await require('./routecareer.js')(ctx,{});const pg=await ctx.newPage();
  await pg.goto('https://www.reklam1n.com/acik-pozisyonlar',{waitUntil:'domcontentloaded'});await pg.waitForTimeout(9000);
  let found=null;for(let i=0;i<14&&!found;i++){await pg.keyboard.press('Tab');found=await pg.evaluate(()=>{const e=document.activeElement;if(!e||!e.classList.contains('cr-back__a'))return null;const c=getComputedStyle(e);const r=e.getBoundingClientRect();return{outline:c.outlineStyle+' '+c.outlineWidth+' '+c.outlineColor,op:getComputedStyle(e.parentNode).opacity,inView:r.top>=0&&r.bottom<=innerHeight};});}
  T('klavye: "İnsan Kaynaklarına Dön" odaklanabilir, görünür ve odak çerçevesi var',found&&/solid 2px/.test(found.outline)&&+found.op===1,found);
  await pg.keyboard.press('Enter');await pg.waitForURL(/n1career=insan-kaynaklari/,{timeout:20000}).then(()=>T('klavye: Enter ile /insan-kaynaklari',true)).catch(e=>T('klavye: Enter ile /insan-kaynaklari',false,e.message.slice(0,80)));await ctx.close();}
 if(OUT)fs.writeFileSync(OUT,JSON.stringify(out,null,1));console.log(BR,'TOPLAM',out.filter(x=>x.ok).length,'geçti',out.filter(x=>!x.ok).length,'kaldı');await b.close();})();
