const pw=require('playwright');
(async()=>{const b=await pw.chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:844},isMobile:true,deviceScaleFactor:3});
for(const p of ['/e-ticaret-yonetimi','/','/kreatif-produksiyon','/ui-ux-tasarim']){const pg=await ctx.newPage();
await pg.goto('https://www.reklam1n.com'+p,{waitUntil:'domcontentloaded'}); await pg.waitForTimeout(8000);
const H=await pg.evaluate(()=>document.documentElement.scrollHeight); for(let i=0;i<=5;i++){await pg.evaluate(y=>scrollTo(0,y),Math.round(H*i/6)); await pg.waitForTimeout(600);}
const r=await pg.evaluate(()=>[...document.images].map(i=>({src:(i.currentSrc||i.src).replace(/^.*1n-ronin-assets@[0-9a-f]{8}[0-9a-f]*\//,'@/').slice(0,110),nat:i.naturalWidth+'x'+i.naturalHeight,css:Math.round(i.getBoundingClientRect().width)+'x'+Math.round(i.getBoundingClientRect().height),mpx:+(i.naturalWidth*i.naturalHeight/1e6).toFixed(2)})).sort((a,b)=>b.mpx-a.mpx).slice(0,6));
console.log('==',p);r.forEach(x=>console.log('  ',x.mpx,x.nat,'css',x.css,x.src));await pg.close();}
await b.close();})();
