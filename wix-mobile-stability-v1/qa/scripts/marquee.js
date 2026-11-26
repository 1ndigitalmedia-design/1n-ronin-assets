// node marquee.js <live|patched> <chromium|webkit>
const pw=require('playwright');const [,,MODE='live',BR='chromium']=process.argv;
(async()=>{const b=await pw[BR].launch();
for(const [name,vp] of [['mobile',{width:390,height:844}],['tablet',{width:820,height:1180}],['tablet-land',{width:1180,height:820}]]){
 const o={viewport:vp,hasTouch:true,deviceScaleFactor:1};if(BR==='chromium')o.isMobile=true;
 const ctx=await b.newContext(o);if(MODE==='patched'){ if(process.env.N1_INJECT) await ctx.addInitScript({path:process.env.N1_INJECT}); else await require('./route.js')(ctx); }const pg=await ctx.newPage();
 await pg.goto('https://www.reklam1n.com/markalar',{waitUntil:'domcontentloaded'});await pg.waitForTimeout(9000);
 await pg.evaluate(()=>{const s=document.querySelector('.mk-show');if(s)s.scrollIntoView({block:'start'})});await pg.waitForTimeout(2500);
 const sample=()=>pg.evaluate(()=>[...document.querySelectorAll('.mk-mq__row')].map(r=>{const t=r.querySelector('.mk-mq__track');const tr=t.getBoundingClientRect(),rr=r.getBoundingClientRect();const vw=document.documentElement.clientWidth;
   const lis=[...t.children];const vis=lis.filter(li=>{const b=li.getBoundingClientRect();return b.right>0&&b.left<vw&&b.width>0});
   // coverage: union of visible logo boxes horizontally in [0,vw]; gap = largest uncovered stretch
   const iv=vis.map(li=>{const b=li.getBoundingClientRect();return [Math.max(0,b.left),Math.min(vw,b.right)]}).sort((a,b)=>a[0]-b[0]);let gap=0,cur=0;iv.forEach(([a,c])=>{if(a>cur)gap=Math.max(gap,a-cur);cur=Math.max(cur,c)});gap=Math.max(gap,vw-cur);
   const m=getComputedStyle(t).transform;return {rowH:Math.round(rr.height),rowW:Math.round(rr.width),trackL:Math.round(tr.left),trackW:Math.round(tr.width),items:lis.length,visible:vis.length,maxGapPx:Math.round(gap),tf:m.slice(0,60),imgsOk:[...t.querySelectorAll('img')].filter(i=>i.complete&&i.naturalWidth>0).length,imgs:t.querySelectorAll('img').length}}));
 const a=await sample();await pg.waitForTimeout(1500);const b2=await sample();
 console.log('==',MODE,BR,name,JSON.stringify(vp));a.forEach((r,i)=>console.log('  row',i+1,'moved',r.trackL!==b2[i].trackL?'YES':'NO',JSON.stringify(b2[i])));
 await pg.screenshot({path:`shots/markalar-${MODE}-${BR}-${name}.png`});
 // scroll away and back (check resume)
 await pg.evaluate(()=>scrollTo(0,0));await pg.waitForTimeout(1500);await pg.evaluate(()=>{document.querySelector('.mk-show').scrollIntoView({block:'start'})});await pg.waitForTimeout(1500);
 const c=await sample();await pg.waitForTimeout(1200);const d=await sample();console.log('  after scroll-away/back moved:',c.map((r,i)=>r.trackL!==d[i].trackL?'YES':'NO').join(','),'gaps',d.map(r=>r.maxGapPx).join(','));
 await ctx.close();}
await b.close();})();
