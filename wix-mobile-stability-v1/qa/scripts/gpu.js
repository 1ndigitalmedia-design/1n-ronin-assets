const pw=require('playwright');
const pages=['/','/kreatif-produksiyon','/e-ticaret-yonetimi','/sosyal-medya','/reklam-yonetimi','/ui-ux-tasarim','/yapay-zeka','/uygulama-gelistirme','/markalar','/kisaca-biz'];
(async()=>{const b=await pw.chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:3});
const out={};
for(const p of pages){const pg=await ctx.newPage();const cdp=await ctx.newCDPSession(pg);
await pg.goto('https://www.reklam1n.com'+p,{waitUntil:'domcontentloaded'}); await pg.waitForTimeout(8000);
const H=await pg.evaluate(()=>document.documentElement.scrollHeight);
let maxL={n:0,mpx:0};
await cdp.send('LayerTree.enable'); let last=null; cdp.on('LayerTree.layerTreeDidChange',e=>{last=e.layers});
for(let i=0;i<=5;i++){await pg.evaluate(y=>scrollTo(0,y),Math.round(H*i/6)); await pg.waitForTimeout(900);
 if(last){const drawn=last.filter(l=>l.drawsContent); const mpx=drawn.reduce((s,l)=>s+l.width*l.height,0)/1e6; if(mpx>maxL.mpx)maxL={n:drawn.length,mpx:+mpx.toFixed(1)};}}
const css=await pg.evaluate(()=>{let bf=0,f=0,wc=0,fixed=0;document.querySelectorAll('*').forEach(e=>{const s=getComputedStyle(e);if((s.backdropFilter&&s.backdropFilter!=='none')||(s.webkitBackdropFilter&&s.webkitBackdropFilter!=='none'))bf++;if(s.filter&&s.filter!=='none')f++;if(s.willChange&&s.willChange!=='auto')wc++;if(s.position==='fixed')fixed++;});
 const imgs=[...document.images];const imgMpx=imgs.reduce((s,i)=>s+(i.naturalWidth*i.naturalHeight||0),0)/1e6;
 return {backdrop:bf,filter:f,willChange:wc,fixed,imgs:imgs.length,imgDecodedMpx:+imgMpx.toFixed(1),docH:document.documentElement.scrollHeight}});
out[p]={layersPeak:maxL,...css}; console.log(p,JSON.stringify(out[p]));
await pg.close();}
require('fs').writeFileSync('gpu.json',JSON.stringify(out,null,1));await b.close();})();
