// V1.4 ağ ve işlev denetimi: sayfa × profil × sürüm (live|v14) × motor. Sona kadar kademeli kaydırma; medya istekleri, video/kare öğeleri, 1N hataları.
// node net14.js <chromium|webkit> <live|v14> <profile> <pages,comma> [out.json]
const pw=require('playwright');const fs=require('fs');
const [,,BR='chromium',MODE='v14',PROF='mobil',PAGES='/kreatif-produksiyon',OUT]=process.argv;
const IOS='Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.7 Mobile/15E148 Safari/604.1';
const IPAD='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.7 Safari/605.1.15';
const P={mobil:{viewport:{width:390,height:844},deviceScaleFactor:3,hasTouch:true,isMobile:true,userAgent:IOS},
 android:{viewport:{width:412,height:915},deviceScaleFactor:2.625,hasTouch:true,isMobile:true,userAgent:'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Mobile Safari/537.36'},
 tablet:{viewport:{width:820,height:1180},deviceScaleFactor:2,hasTouch:true,isMobile:true,userAgent:IPAD},
 tablet_yatay:{viewport:{width:1180,height:820},deviceScaleFactor:2,hasTouch:true,isMobile:true,userAgent:IPAD},
 masaustu:{viewport:{width:1440,height:900},deviceScaleFactor:1}}[PROF];
(async()=>{const b=await pw[BR].launch(BR==='chromium'?{args:['--autoplay-policy=no-user-gesture-required']}:{});const out=[];
for(const pg_ of PAGES.split(',')){const o=Object.assign({},P);if(BR!=='chromium')delete o.isMobile;const ctx=await b.newContext(o);const st={};if(MODE==='v14')await require('./route14.js')(ctx,st);if(MODE==='cdn')await require('./routecdn.js')(ctx,st);
 const pg=await ctx.newPage();const media=[],errs=[];let crash=0;pg.on('crash',()=>crash++);
 pg.on('request',q=>{const u=q.url();if(q.resourceType()==='media'||/\.mp4(\?|$)/.test(u))media.push(u.replace(/^https:\/\/video\.wixstatic\.com\/video\//,'wix:').replace(/\/mp4\/file\.mp4.*/,'').slice(0,90));});
 pg.on('pageerror',e=>{const m=String(e.message);if(!/googleadservices|doubleclick|Cross-origin script|Failed to fetch|Load failed|ChunkLoad|SiteAssets|notifyEventToEditorApp/.test(m))errs.push(m.slice(0,120));});
 const rec={page:pg_,br:BR,mode:MODE,profile:PROF};
 try{await pg.goto('https://www.reklam1n.com'+pg_,{waitUntil:'domcontentloaded',timeout:60000});await pg.waitForTimeout(8000);
  rec.lite=await pg.evaluate(()=>({anyCoarse:matchMedia('(any-pointer: coarse)').matches,hoverNone:matchMedia('(hover: none)').matches,w:innerWidth}));
  const H=await pg.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<=H;y+=300){await pg.evaluate(y=>scrollTo(0,y),y);await pg.waitForTimeout(200);}await pg.waitForTimeout(2500);
  Object.assign(rec,await pg.evaluate(()=>({videos:document.querySelectorAll('video').length,withSrc:[...document.querySelectorAll('video')].filter(v=>v.getAttribute('src')).length,
    stills:[...document.querySelectorAll('img[data-n1-still]')].map(i=>i.getAttribute('data-n1-still')+(i.complete&&i.naturalWidth?':'+i.naturalWidth:':YÜKLENMEDİ')),
    playing:[...document.querySelectorAll('video')].filter(v=>!v.paused&&v.readyState>2).length})));
 }catch(e){rec.error=String(e.message).slice(0,100);}
 rec.media=[...new Set(media)];rec.errors=errs;rec.crash=crash;rec.routed=Object.keys(st).length;out.push(rec);
 console.log(BR,MODE,PROF,pg_.padEnd(24),'lite?',JSON.stringify(rec.lite||{}),'| video',rec.videos,'| kare',(rec.stills||[]).join(' '),'| medya istek',rec.media.length,JSON.stringify(rec.media),'| 1N hata',errs.length,errs.slice(0,2).join(' ¦ '),rec.error||'');
 await ctx.close();}
if(OUT)fs.writeFileSync(OUT,JSON.stringify(out,null,1));await b.close();})();
