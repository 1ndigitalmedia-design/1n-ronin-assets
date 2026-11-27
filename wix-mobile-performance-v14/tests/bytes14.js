// V1.4 önce/sonra aktarım ölçümü (yalnız Chromium, CDP): tür bazında aktarılan bayt (yarım kalan istekler dahil), video/görsel bayt, CLS, LCP.
// node bytes14.js <live|v14> <mobil|masaustu|tablet_yatay> <pages,comma> [out.json]
const pw=require('playwright');const fs=require('fs');
const [,,MODE='v14',PROF='mobil',PAGES='/',OUT]=process.argv;
const IOS='Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.7 Mobile/15E148 Safari/604.1';
const IPAD='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.7 Safari/605.1.15';
const P={mobil:{viewport:{width:390,height:844},deviceScaleFactor:3,hasTouch:true,isMobile:true,userAgent:IOS},
 tablet_yatay:{viewport:{width:1180,height:820},deviceScaleFactor:2,hasTouch:true,isMobile:true,userAgent:IPAD},
 masaustu:{viewport:{width:1440,height:900},deviceScaleFactor:1}}[PROF];
(async()=>{const b=await pw.chromium.launch({args:['--autoplay-policy=no-user-gesture-required']});const out=[];
for(const pg_ of PAGES.split(',')){const ctx=await b.newContext(P);const st={};if(MODE==='v14')await require('./route14.js')(ctx,st);
 const pg=await ctx.newPage();const cdp=await ctx.newCDPSession(pg);await cdp.send('Network.enable');await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});
 const req={};cdp.on('Network.requestWillBeSent',e=>{req[e.requestId]={url:e.request.url,type:e.type||'Other',bytes:0}});
 cdp.on('Network.responseReceived',e=>{if(req[e.requestId])req[e.requestId].type=e.type||req[e.requestId].type});
 cdp.on('Network.dataReceived',e=>{if(req[e.requestId])req[e.requestId].bytes+=e.encodedDataLength||e.dataLength||0});
 cdp.on('Network.loadingFinished',e=>{if(req[e.requestId])req[e.requestId].bytes=Math.max(req[e.requestId].bytes,e.encodedDataLength||0)});
 await pg.addInitScript(()=>{window.__cls=0;window.__lcp=0;try{new PerformanceObserver(l=>{for(const e of l.getEntries())if(!e.hadRecentInput)window.__cls+=e.value}).observe({type:'layout-shift',buffered:true});
  new PerformanceObserver(l=>{for(const e of l.getEntries())window.__lcp=e.startTime}).observe({type:'largest-contentful-paint',buffered:true});}catch(e){}});
 const rec={page:pg_,mode:MODE,profile:PROF};
 try{await pg.goto('https://www.reklam1n.com'+pg_,{waitUntil:'domcontentloaded',timeout:60000});await pg.waitForTimeout(8000);
  rec.lcp=Math.round(await pg.evaluate(()=>window.__lcp));
  const H=await pg.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<=H;y+=300){await pg.evaluate(y=>scrollTo(0,y),y);await pg.waitForTimeout(200);}await pg.waitForTimeout(3000);
  rec.cls=+(await pg.evaluate(()=>window.__cls)).toFixed(4);
 }catch(e){rec.error=String(e.message).slice(0,100);}
 const by={};let n=0;for(const r of Object.values(req)){const t=(/\.mp4/.test(r.url)||r.type==='Media')?'Media':r.type==='Image'||/\.(webp|png|jpe?g|avif|gif)(\?|$)/i.test(r.url)?'Image':r.type;by[t]=(by[t]||0)+r.bytes;n++;}
 rec.requests=n;rec.byType=by;rec.total=Object.values(by).reduce((a,c)=>a+c,0);rec.routed=Object.keys(st).length;out.push(rec);
 const mb=x=>((x||0)/1048576).toFixed(2);
 console.log(MODE,PROF,pg_.padEnd(24),'toplam',mb(rec.total),'MB | video',mb(by.Media),'| görsel',mb(by.Image),'| js',mb(by.Script),'| istek',n,'| LCP',rec.lcp,'| CLS',rec.cls,rec.error||'');
 await ctx.close();}
if(OUT)fs.writeFileSync(OUT,JSON.stringify(out,null,1));await b.close();})();
