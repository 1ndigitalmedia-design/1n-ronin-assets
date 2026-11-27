// P02: 7 hizmet sayfası + ana sayfa kaynak profili (iPhone benzeri 390×844 dpr3). node p02pages.js <webkit|chromium>
const pw=require('playwright');const fs=require('fs');const {execSync}=require('child_process');const [,,BR='webkit']=process.argv;
const PAGES=['/','/kreatif-produksiyon','/e-ticaret-yonetimi','/sosyal-medya','/reklam-yonetimi','/ui-ux-tasarim','/yapay-zeka','/uygulama-gelistirme'];
function maxProcMB(){const rows=execSync("ps -eo pid=,ppid=,rss=").toString().trim().split("\n").map(l=>l.trim().split(/\s+/).map(Number));const k=new Map();rows.forEach(([p,pp,r])=>{if(!k.has(pp))k.set(pp,[]);k.get(pp).push([p,r])});let mx=0,tot=0;const st=[process.pid];while(st.length){const p=st.pop();(k.get(p)||[]).forEach(([c,r])=>{mx=Math.max(mx,r);tot+=r;st.push(c)})}return [Math.round(mx/1024),Math.round(tot/1024)];}
const PROBE=()=>{const v=[...document.querySelectorAll('video')];const im=[...document.images];
 const g=window.gsap;return{vids:v.length,withSrc:v.filter(x=>x.currentSrc).length,playing:v.filter(x=>!x.paused&&x.readyState>2).length,
 decodedMP:+(v.reduce((a,x)=>a+(x.readyState>1?x.videoWidth*x.videoHeight:0),0)/1e6).toFixed(2),
 maxVid:v.reduce((a,x)=>x.videoWidth*x.videoHeight>a[0]*a[1]?[x.videoWidth,x.videoHeight]:a,[0,0]).join('×'),
 srcs:[...new Set(v.map(x=>(x.currentSrc||'').split('/').slice(-3).join('/')).filter(Boolean))].slice(0,8),
 imgs:im.length,imgMP:+(im.reduce((a,x)=>a+(x.complete?x.naturalWidth*x.naturalHeight:0),0)/1e6).toFixed(1),
 st:window.ScrollTrigger?ScrollTrigger.getAll().length:0,tweens:g?g.globalTimeline.getChildren(true,true,false).length:0,
 dom:document.getElementsByTagName('*').length,canvas:document.querySelectorAll('canvas').length,iframes:document.querySelectorAll('iframe').length,
 res:performance.getEntriesByType('resource').length,kb:Math.round(performance.getEntriesByType('resource').reduce((a,r)=>a+(r.transferSize||0),0)/1024)};};
(async()=>{const out=[];const b=await pw[BR].launch(BR==='chromium'?{args:['--autoplay-policy=no-user-gesture-required']}:{});
for(const P of PAGES){const o={viewport:{width:390,height:844},deviceScaleFactor:3,hasTouch:true};if(BR==='chromium')o.isMobile=true;
 const ctx=await b.newContext(o);const pg=await ctx.newPage();let cdp=null;if(BR==='chromium'){cdp=await ctx.newCDPSession(pg);await cdp.send('Performance.enable');}
 const errs=[];pg.on('pageerror',e=>{const m=String(e.message);if(!/googleadservices|Cross-origin script|doubleclick/.test(m))errs.push(m.slice(0,100))});
 const rec={br:BR,page:P};
 try{await pg.goto('https://www.reklam1n.com'+P,{waitUntil:'domcontentloaded',timeout:60000});await pg.waitForTimeout(9000);
  rec.top=await pg.evaluate(PROBE);[rec.top.maxProcMB,rec.top.totMB]=maxProcMB();
  const H=await pg.evaluate(()=>document.documentElement.scrollHeight);for(let i=1;i<=8;i++){await pg.evaluate(y=>scrollTo(0,y),Math.round(H*i/8));await pg.waitForTimeout(800);}
  await pg.waitForTimeout(3000);rec.end=await pg.evaluate(PROBE);[rec.end.maxProcMB,rec.end.totMB]=maxProcMB();
  if(cdp){const {metrics}=await cdp.send('Performance.getMetrics');const m={};metrics.forEach(x=>m[x.name]=x.value);rec.end.heapMB=Math.round(m.JSHeapUsedSize/1048576);rec.end.listeners=m.JSEventListeners;}
 }catch(e){rec.fail=String(e.message).slice(0,100);}
 rec.errs=errs.slice(0,5);out.push(rec);const t=rec.top||{},e=rec.end||{};
 console.log(BR,P.padEnd(22),`video ${t.vids}/${e.vids} oynayan ${t.playing}/${e.playing} çözülmüş ${t.decodedMP}/${e.decodedMP}MP en büyük ${e.maxVid} | ST ${e.st} tween ${e.tweens} | img ${e.imgs} (${e.imgMP}MP) | DOM ${e.dom} | ${e.res} istek ${e.kb}KB | süreç ${t.maxProcMB}/${e.maxProcMB}MB toplam ${e.totMB}MB`+(e.heapMB?` heap ${e.heapMB}MB dinleyici ${e.listeners}`:'')+` hata ${errs.length}`+(rec.fail?' FAIL '+rec.fail:''));
 await ctx.close();}
fs.writeFileSync('p02/pages-'+BR+'.json',JSON.stringify(out,null,1));await b.close();})();
