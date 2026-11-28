// Kariyer sayfaları: tam sayfa ekran görüntüsü + temel denetim (H1 sayısı, yatay taşma, medya/ağır istek, 1N hata, footer altı boşluk).
// node shots.js <chromium|webkit> <masaustu|tablet|mobil> [pages] [outdir] [dpr]
const pw=require('playwright');const fs=require('fs');const [,,BR='chromium',PROF='masaustu',PAGES='/insan-kaynaklari,/acik-pozisyonlar,/staj-programlari',OUT='../screenshots',DPR]=process.argv;
const IOS='Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.7 Mobile/15E148 Safari/604.1';
const P={masaustu:{viewport:{width:1440,height:900},deviceScaleFactor:1},tablet:{viewport:{width:820,height:1180},deviceScaleFactor:2,hasTouch:true,isMobile:true},
 tablet_yatay:{viewport:{width:1180,height:820},deviceScaleFactor:2,hasTouch:true,isMobile:true},mobil:{viewport:{width:390,height:844},deviceScaleFactor:3,hasTouch:true,isMobile:true,userAgent:IOS}}[PROF];
const IGN=/googleadservices|doubleclick|Cross-origin script|Failed to fetch|Load failed|ChunkLoad|SiteAssets|notifyEventToEditorApp|Fetch API|Transition/;
(async()=>{const b=await pw[BR].launch();fs.mkdirSync(OUT,{recursive:true});const res=[];
for(const p of PAGES.split(',')){const o=Object.assign({},P);if(DPR)o.deviceScaleFactor=+DPR;if(BR!=='chromium')delete o.isMobile;const ctx=await b.newContext(o);const st={};await require('./routecareer.js')(ctx,st);
 const pg=await ctx.newPage();const errs=[],media=[],big=[];pg.on('pageerror',e=>{const m=String(e.message);if(!IGN.test(m))errs.push(m.slice(0,140))});
 pg.on('console',m=>{if(m.type()==='error'&&/n1|N1|cr-/.test(m.text()))errs.push('console: '+m.text().slice(0,140))});
 pg.on('response',async r=>{const q=r.request(),u=r.url();if(q.resourceType()==='media'||/\.mp4/.test(u))media.push(u.slice(-70));const l=+(r.headers()['content-length']||0);if(l>400000&&!/\.js(\?|$)/.test(u))big.push(Math.round(l/1024)+'KB '+u.slice(-60));});
 const r={page:p,br:BR,profile:PROF};
 try{await pg.goto('https://www.reklam1n.com'+p,{waitUntil:'domcontentloaded',timeout:60000});await pg.waitForTimeout(9000);
  const H=await pg.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<=H;y+=300){await pg.evaluate(y=>scrollTo(0,y),y);await pg.waitForTimeout(120);}await pg.waitForTimeout(1600);
  Object.assign(r,await pg.evaluate(()=>{const ce=document.querySelector('n1-insan-kaynaklari-v1,n1-acik-pozisyonlar-v1,n1-staj-programlari-v1');const ft=document.querySelector('footer.n1ft');const fb=ft&&ft.getBoundingClientRect();
   const over=[...document.querySelectorAll('.cr *')].filter(e=>{const b=e.getBoundingClientRect();return b.right>innerWidth+1||b.left<-1;}).map(e=>e.className&&String(e.className).slice(0,30)).slice(0,5);
   return{h1:document.querySelectorAll('.cr h1').length,h1text:(document.querySelector('.cr h1')||{}).textContent,overflowX:document.documentElement.scrollWidth>innerWidth+1,overEls:over,
    header:!!document.querySelector('n1-header .n1h-logo'),footer:!!ft,fc:!!document.querySelector('n1-floating-controls'),gapBelowFooter:fb?Math.round(document.documentElement.scrollHeight-(fb.bottom+scrollY)):null,
    height:document.documentElement.scrollHeight,videos:document.querySelectorAll('video').length,canvas:document.querySelectorAll('.cr canvas').length,imgs:[...document.querySelectorAll('.cr img')].length,
    doors:[...document.querySelectorAll('.cr-door')].map(a=>a.getAttribute('href')),back:(document.querySelector('.cr-back__a')||{}).href||null,gsap:!!window.gsap,st:!!window.ScrollTrigger};}));
  await pg.evaluate(()=>scrollTo(0,0));await pg.waitForTimeout(800);
  const name=p.slice(1)+'-'+PROF+'-'+BR;await pg.screenshot({path:`${OUT}/${name}-full.png`,fullPage:true});await pg.screenshot({path:`${OUT}/${name}.png`});
 }catch(e){r.error=e.message.slice(0,120);}
 r.errors=errs;r.media=media;r.big=big;r.routed=st;res.push(r);
 console.log(BR,PROF,p.padEnd(20),'H1',r.h1,JSON.stringify(r.h1text),'| taşma',r.overflowX,JSON.stringify(r.overEls),'| header',r.header,'footer',r.footer,'fc',r.fc,'| footer altı',r.gapBelowFooter,'px | yükseklik',r.height,'| video',r.videos,'img',r.imgs,'| medya',media.length,'büyük',big.length,'| gsap',r.gsap,'ST',r.st,'| hata',errs.length,errs.slice(0,2).join(' ¦ '),r.error||'');
 await ctx.close();}
fs.writeFileSync(`${OUT}/shots-${BR}-${PROF}.json`,JSON.stringify(res,null,1));await b.close();})();
