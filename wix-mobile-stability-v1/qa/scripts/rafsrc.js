const pw=require('playwright');
const init=`(function(){var _r=window.requestAnimationFrame;window.__rafSrc={};window.__rafOn=false;window.requestAnimationFrame=function(cb){if(window.__rafOn){var s=(new Error().stack||'').split('\\n').slice(2,5).map(function(l){return l.trim().replace(/https:\\/\\/[^ )]*\\//,'').slice(0,90)}).join(' < ');window.__rafSrc[s]=(window.__rafSrc[s]||0)+1;}return _r.call(window,cb)};})();`;
(async()=>{const b=await pw.chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
for(const p of ['/kreatif-produksiyon','/uygulama-gelistirme','/']){
const pg=await ctx.newPage(); await pg.addInitScript(init);
await pg.goto('https://www.reklam1n.com'+p,{waitUntil:'domcontentloaded'}); await pg.waitForTimeout(8000);
const H=await pg.evaluate(()=>document.documentElement.scrollHeight); for(let i=1;i<=4;i++){await pg.evaluate(y=>scrollTo(0,y),Math.round(H*i/5)); await pg.waitForTimeout(700);}
await pg.waitForTimeout(2000);
await pg.evaluate(()=>{window.__rafSrc={};window.__rafOn=true}); await pg.waitForTimeout(3000);
const r=await pg.evaluate(()=>window.__rafSrc); console.log('==',p); Object.entries(r).sort((a,b)=>b[1]-a[1]).slice(0,6).forEach(([k,v])=>console.log('  ',v,k));
await pg.close();}
await b.close();})();
