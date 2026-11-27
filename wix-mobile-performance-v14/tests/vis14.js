// Görsel regresyon V1.3 (canlı) ↔ V1.4: belge yüksekliği, medya kutularının (video + kare) konum/boyutu, taşma, 5 kaydırma noktasında ekran görüntüsü.
// Videolar duraklatılıp 0. saniyeye alınır, animasyonlar yerleşsin diye her noktada beklenir. node vis14.js <live|v14> <profile> <pages> <outdir>
const pw=require('playwright');const fs=require('fs');const [,,MODE,PROF,PAGES,OUT]=process.argv;
const IOS='Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.7 Mobile/15E148 Safari/604.1';
const P={mobil:{viewport:{width:390,height:844},deviceScaleFactor:2,hasTouch:true,isMobile:true,userAgent:IOS},tablet:{viewport:{width:820,height:1180},deviceScaleFactor:1,hasTouch:true,isMobile:true},
 masaustu:{viewport:{width:1440,height:900},deviceScaleFactor:1}}[PROF];
(async()=>{const b=await pw.chromium.launch();fs.mkdirSync(OUT,{recursive:true});const res=[];
for(const p of PAGES.split(',')){const ctx=await b.newContext({...P,reducedMotion:'no-preference'});if(MODE==='v14')await require('./route14.js')(ctx,{});const pg=await ctx.newPage();
 const name=(p==='/'?'home':p.slice(1));const r={page:p,mode:MODE,profile:PROF};
 try{await pg.goto('https://www.reklam1n.com'+p,{waitUntil:'domcontentloaded',timeout:60000});await pg.waitForTimeout(8000);
  let H=await pg.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<=H;y+=250){await pg.evaluate(y=>scrollTo(0,y),y);await pg.waitForTimeout(120);}
  await pg.evaluate(()=>scrollTo(0,0));await pg.waitForTimeout(2500);
  H=await pg.evaluate(()=>document.documentElement.scrollHeight);r.height=H;
  r.overflowX=await pg.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
  r.boxes=await pg.evaluate(()=>[...document.querySelectorAll('video,img[data-n1-still]')].map(e=>{const b=e.getBoundingClientRect();return{k:e.tagName==='VIDEO'?'video':'kare:'+e.getAttribute('data-n1-still'),x:Math.round(b.left),y:Math.round(b.top+scrollY),w:Math.round(b.width),h:Math.round(b.height),
    vis:getComputedStyle(e).visibility!=='hidden'&&getComputedStyle(e).display!=='none'&&b.width>0,fit:getComputedStyle(e).objectFit,nat:e.tagName==='IMG'?e.naturalWidth+'x'+e.naturalHeight:(e.videoWidth+'x'+e.videoHeight)}}).filter(x=>x.w>0));
  r.shots=[];for(const f of [0,.2,.4,.6,.8]){const y=Math.round((H-P.viewport.height)*f);await pg.evaluate(y=>scrollTo(0,y),y);await pg.waitForTimeout(1800);
   await pg.evaluate(()=>document.querySelectorAll('video').forEach(v=>{try{v.pause();v.currentTime=0}catch(e){}}));await pg.waitForTimeout(400);
   const fn=`${OUT}/${name}-${PROF}-${MODE}-${Math.round(f*100)}.png`;await pg.screenshot({path:fn});r.shots.push(fn);}
 }catch(e){r.error=e.message.slice(0,100);}
 res.push(r);console.log(MODE,PROF,p.padEnd(22),'yükseklik',r.height,'| yatay taşma',r.overflowX,'| kutular',(r.boxes||[]).filter(x=>x.vis).map(x=>x.k+'@'+x.y+':'+x.w+'x'+x.h).join(' '),r.error||'');
 await ctx.close();}
fs.writeFileSync(`${OUT}/vis-${MODE}-${PROF}.json`,JSON.stringify(res,null,1));await b.close();})();
