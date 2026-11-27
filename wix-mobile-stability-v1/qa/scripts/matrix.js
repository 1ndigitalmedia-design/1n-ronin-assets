const pw=require('playwright');
const VPS=[[320,640],[360,780],[375,812],[390,844],[414,896],[430,932],[844,390],[768,1024],[820,1180],[1024,1366],[1180,820],[1280,800],[1440,900],[1920,1080]];
(async()=>{const b=await pw.chromium.launch();const rows=[];
for(const [w,h] of VPS){const touch=w<=1024||h>w;const ctx=await b.newContext({viewport:{width:w,height:h},hasTouch:touch,isMobile:touch&&w<1100});await ctx.addInitScript({path:process.env.N1_INJECT});
 for(const p of ['/','/kreatif-produksiyon']){const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>{const s=String(e);if(!/Failed to fetch|Transition was skipped|Load failed/.test(s))errs.push(s.slice(0,100))});
  await pg.goto('https://www.reklam1n.com'+p,{waitUntil:'domcontentloaded'});await pg.waitForTimeout(11000);
  const r=await pg.evaluate(()=>{const hs=[...document.querySelectorAll('n1-header')];const vis=hs.filter(h=>getComputedStyle(h).display!=='none'&&h.getBoundingClientRect().height>0);
   return {overflowX:document.documentElement.scrollWidth-innerWidth,headers:hs.length,visibleHeaders:vis.length,fc:document.querySelectorAll('n1-floating-controls').length,stab:window.__n1Stability&&__n1Stability.report().mobile,nav:window.__n1Nav&&__n1Nav.version}});
  const ok=r.overflowX<=0&&r.visibleHeaders===1&&r.fc<=1&&errs.length===0;rows.push({w,h,p,ok,...r,errs});console.log(ok?'PASS':'FAIL',`${w}x${h}`,p,JSON.stringify(r),errs.join('|'));await pg.close();}
 await ctx.close();}
require('fs').writeFileSync('matrix.json',JSON.stringify(rows,null,1));console.log('TOPLAM',rows.filter(r=>r.ok).length+'/'+rows.length);await b.close();})();
