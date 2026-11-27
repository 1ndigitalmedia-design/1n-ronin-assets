// P03: ana sayfa → hizmet sayfası (Hizmetler bağlantısına dokunma) → d ms sonra GERİ → 7 sn sağlık denetimi.
// node p03back.js <chromium|webkit> <live|v13> [slow]   (çıktı: p03/<br>-<mode>-<cond>.json)
const pw=require('playwright');const fs=require('fs');
const [,,BR='webkit',MODE='live',COND='normal']=process.argv;
const PAGES=['/kreatif-produksiyon','/e-ticaret-yonetimi','/sosyal-medya','/reklam-yonetimi','/ui-ux-tasarim','/yapay-zeka','/uygulama-gelistirme'];
const DELAYS=(process.env.DELAYS||'250,500,1000,2000,3000,5000,full').split(',');
const ONLY=process.env.PAGES?process.env.PAGES.split(','):PAGES;
const PROBE=`(function(){if(window.top!==window)return;window.__p3={ps:[],err:0};
addEventListener('pageshow',function(e){window.__p3.ps.push(e.persisted?'P':'N')});
addEventListener('error',function(){window.__p3.err++});addEventListener('unhandledrejection',function(){window.__p3.err++});})();`;
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{fs.mkdirSync('p03',{recursive:true});const out=[];const b=await pw[BR].launch();
for(const P of ONLY){const o={viewport:{width:390,height:844},hasTouch:true};if(BR==='chromium')o.isMobile=true;
 const ctx=await b.newContext(o);await ctx.addInitScript(PROBE);
 if(MODE==='v13'){await require('./route658.js')(ctx);await ctx.addInitScript({path:'inj-menu13.js'});await ctx.addInitScript({path:'inj-loader13.js'});}
 if(COND==='slow'){await ctx.route(/cdn\.jsdelivr\.net|\.mp4(\?|$)|video\.wixstatic|static\.wixstatic\.com\/media/,async r=>{await sleep(/\.mp4|video/.test(r.request().url())?3000:1200);r.fallback();});}
 const pg=await ctx.newPage();let crashed=0,perr=[];pg.on('crash',()=>crashed++);pg.on('pageerror',e=>perr.push(String(e.message).slice(0,120)));
 const sel=`a.n1m-svc-link[href="${P}"], a.m4-svc-a[href="${P}"], #hizmetler-ozet a[href="${P}"]`;
 try{await pg.goto('https://www.reklam1n.com/',{waitUntil:'domcontentloaded',timeout:60000});}catch(e){}
 for(const D of DELAYS){const rec={br:BR,mode:MODE,cond:COND,page:P,delay:D};const t0=Date.now();perr=[];
  try{
   if(!/reklam1n\.com\/?(\?|#|$)/.test(pg.url()))await pg.goto('https://www.reklam1n.com/',{waitUntil:'domcontentloaded',timeout:60000});
   await pg.waitForSelector(sel,{state:'attached',timeout:45000});await sleep(2500);
   await pg.evaluate(s=>document.querySelector(s).scrollIntoView({block:'center'}),sel);await sleep(1200);
   const tc=Date.now();
   await Promise.all([pg.waitForURL('**'+P,{waitUntil:'commit',timeout:30000}),pg.tap(sel,{timeout:10000})]);
   rec.commitMs=Date.now()-tc;
   if(D==='full'){await pg.waitForLoadState('load',{timeout:45000}).catch(()=>{});await sleep(6000);}
   else await sleep(Math.max(0,+D-(Date.now()-tc)));
   rec.atBack=await pg.evaluate(()=>({rs:document.readyState,ld:!!document.getElementById('n1GlobalLoader'),ce:[...document.querySelectorAll('*')].filter(e=>e.localName.startsWith('n1-')).length,vids:document.querySelectorAll('video').length})).catch(e=>'eval-fail');
   const tb=Date.now();await pg.goBack({waitUntil:'commit',timeout:30000}).catch(e=>{rec.backErr=String(e.message).slice(0,80)});rec.backMs=Date.now()-tb;
   await sleep(7000);
   rec.after=await Promise.race([pg.evaluate(()=>{const l=document.getElementById('n1GlobalLoader');const h=document.querySelector('n1-header');const site=document.querySelector('n1-site-v1');
     const hero=document.querySelector('[data-m4-film]');const hv=hero&&hero.querySelector('video');
     return{url:location.pathname,rs:document.readyState,nav:(performance.getEntriesByType('navigation')[0]||{}).type,ps:window.__p3?window.__p3.ps.join(''):'?',
      loader:l?(getComputedStyle(l).opacity+'/'+getComputedStyle(l).visibility):'none',menuOpen:!!(h&&h.hasAttribute('data-open')),hdr:!!h,site:!!site,
      siteKids:site?site.querySelectorAll('*').length:0,hero:hero?hero.getAttribute('data-n1v-state'):'-',heroT:hv?+hv.currentTime.toFixed(2):-1,
      vids:document.querySelectorAll('video').length,err:window.__p3?window.__p3.err:-1,st:(window.ScrollTrigger&&ScrollTrigger.getAll().length)||0};}),sleep(8000).then(()=>'HANG')]).catch(e=>'eval-fail:'+String(e.message).slice(0,60));
   if(rec.after&&typeof rec.after==='object'){await sleep(1000);rec.heroT2=await pg.evaluate(()=>{const v=document.querySelector('[data-m4-film] video');return v?+v.currentTime.toFixed(2):-1}).catch(()=>-2);}
  }catch(e){rec.fail=String(e.message).split('\n')[0].slice(0,100);}
  rec.crash=crashed;rec.pageerrors=perr.slice(0,5);rec.ms=Date.now()-t0;out.push(rec);
  const a=rec.after||{};console.log(BR,MODE,COND,P,D,rec.fail?'FAIL '+rec.fail:(typeof a==='string'?a:`url=${a.url} nav=${a.nav} ps=${a.ps} loader=${a.loader} menu=${a.menuOpen} site=${a.siteKids} hero=${a.hero} t=${a.heroT}->${rec.heroT2} st=${a.st} err=${a.err}`),'crash='+crashed,'perr='+perr.length);
  if(crashed){break;}
 }
 await ctx.close().catch(()=>{});}
await b.close();fs.writeFileSync(`p03/${BR}-${MODE}-${COND}.json`,JSON.stringify(out,null,1));})();
