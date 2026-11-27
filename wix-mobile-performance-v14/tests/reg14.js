// V1.4 işlev regresyonu (route14 ile V1.4): kademeli kaydırma (çökme), UI/UX gri anahtarı, menü aç/kapa + gezinme, döndürme, yüzen düğmeler, kırık medya, konsol.
// node reg14.js <chromium|webkit> <live|v14> <scenario: grad|gray|menu|rotate> [pages]
const pw=require('playwright');const fs=require('fs');const [,,BR='webkit',MODE='v14',SC='grad',PAGES='/,/kreatif-produksiyon,/e-ticaret-yonetimi,/sosyal-medya,/reklam-yonetimi,/ui-ux-tasarim,/yapay-zeka,/uygulama-gelistirme']=process.argv;
const IOS='Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.7 Mobile/15E148 Safari/604.1';
const MOB={viewport:{width:390,height:844},deviceScaleFactor:3,hasTouch:true,userAgent:IOS},DESK={viewport:{width:1440,height:900},deviceScaleFactor:1};
const IGN=/googleadservices|doubleclick|Cross-origin script|Failed to fetch|Load failed|ChunkLoad|SiteAssets|notifyEventToEditorApp|Fetch API|Transition/;
async function open(b,o,url){o=Object.assign({},o);if(BR==='chromium'&&o.hasTouch)o.isMobile=true;const ctx=await b.newContext(o);if(MODE==='v14')await require('./route14.js')(ctx,{});const pg=await ctx.newPage();
 const R={crash:false,errs:[],badMedia:[],console:[]};pg.on('crash',()=>R.crash=true);pg.on('pageerror',e=>{const m=String(e.message);if(!IGN.test(m))R.errs.push(m.slice(0,120))});
 pg.on('console',m=>{if(m.type()==='error'&&/n1|N1/.test(m.text()))R.console.push(m.text().slice(0,120))});
 pg.on('response',r=>{const u=r.url();if(/\.(webp|mp4|png|jpe?g)(\?|$)|wixstatic|jsdelivr/.test(u)&&r.status()>=400)R.badMedia.push(r.status()+' '+u.slice(-80))});
 await pg.goto('https://www.reklam1n.com'+url,{waitUntil:'domcontentloaded',timeout:60000});await pg.waitForTimeout(8000);return {ctx,pg,R};}
const fin=(R)=>`| çökme ${R.crash?'EVET':'yok'} | 1N/JS hata ${R.errs.length}${R.errs.length?' '+R.errs[0]:''} | konsol ${R.console.length} | kırık medya ${R.badMedia.length}${R.badMedia.length?' '+R.badMedia[0]:''}`;
(async()=>{const b=await pw[BR].launch(BR==='chromium'?{args:['--autoplay-policy=no-user-gesture-required']}:{});
 if(SC==='grad'){for(const prof of ['mobil','masaustu'])for(const p of PAGES.split(',')){const {ctx,pg,R}=await open(b,prof==='mobil'?MOB:DESK,p);let y=0,H=0;
   try{H=await pg.evaluate(()=>document.documentElement.scrollHeight);for(y=0;y<=H&&!R.crash;y+=150){await pg.evaluate(y=>scrollTo(0,y),y);await pg.waitForTimeout(250);}
    for(;y>=0&&!R.crash;y-=600){await pg.evaluate(y=>scrollTo(0,y),y);await pg.waitForTimeout(150);}}catch(e){R.errs.push('ölçüm: '+e.message.slice(0,60));}
   console.log(BR,MODE,'kademeli',prof,p.padEnd(22),R.crash?'ÇÖKME @'+y:'sona kadar + geri '+H+'px',fin(R));await ctx.close();}}
 if(SC==='gray'){for(const prof of ['masaustu','mobil']){const {ctx,pg,R}=await open(b,prof==='mobil'?MOB:DESK,'/ui-ux-tasarim');let n=0,st='';
   try{await pg.evaluate(()=>document.querySelector('.ux-screen--acc').scrollIntoView({block:'center'}));await pg.waitForTimeout(1500);
    const h=await pg.evaluateHandle(()=>{const s=document.querySelector('.ux-screen--acc');const root=s.closest('section')||document;return [...root.querySelectorAll('[aria-checked]')].find(b=>/gri|gray/i.test((b.textContent||'')+(b.getAttribute('aria-label')||'')+(b.className||'')))||root.querySelector('[aria-checked]');});
    const f=()=>pg.evaluate(()=>{const s=document.querySelector('.ux-screen--acc');return (s.classList.contains('is-gray')?'gri':'renkli')+'/'+getComputedStyle(s.querySelector('img,video,.ux-screen__img')||s).filter});
    st=await f();for(n=0;n<12&&!R.crash;n++){await h.evaluate(x=>x.click());await pg.waitForTimeout(300);if(n<2)st+=' → '+await f();}
   }catch(e){R.errs.push('ölçüm: '+e.message.slice(0,60));}
   console.log(BR,MODE,'gri anahtar',prof,n+' tıklama',st,fin(R));await ctx.close();}
   // FEEL: masaüstünde video + oynat düğmesi, hafif profilde kare ve düğme yok
   for(const prof of ['masaustu','mobil']){const {ctx,pg,R}=await open(b,prof==='mobil'?MOB:DESK,'/ui-ux-tasarim');
    const feel=await pg.evaluate(()=>{const v=document.querySelector('.ux-feel__video');return v?{tag:v.tagName,still:v.getAttribute('data-n1-still'),btn:!!document.querySelector('.ux-feel [class*=play],.ux-feel button')}:null});
    console.log(BR,MODE,'FEEL',prof,JSON.stringify(feel),fin(R));await ctx.close();}}
 if(SC==='menu'){for(const [prof,o] of [['mobil',MOB],['masaustu',DESK]]){const {ctx,pg,R}=await open(b,o,'/');const out=[];
   try{const act=s=>o.hasTouch?pg.tap(s):pg.click(s);
    await act('n1-header .n1h-menu');await pg.waitForTimeout(900);out.push('açık='+await pg.evaluate(()=>document.querySelector('.n1h-panel').hasAttribute('data-open')));
    await act('n1-header .n1h-menu');await pg.waitForTimeout(900);out.push('kapalı='+!await pg.evaluate(()=>document.querySelector('.n1h-panel').hasAttribute('data-open')));
    await act('n1-header .n1h-menu');await pg.waitForTimeout(900);
    const hb=pg.locator('.n1h-panel .n1h-item',{hasText:'Hizmetler'}).first();await (o.hasTouch?hb.tap():hb.click());await pg.waitForTimeout(700);
    const a=pg.locator('.n1h-panel a[href*="e-ticaret"]').first();await Promise.all([pg.waitForURL(/e-ticaret/,{timeout:30000}),o.hasTouch?a.tap():a.click()]);await pg.waitForTimeout(7000);
    out.push('gezinme='+new URL(pg.url()).pathname);out.push('yeni sayfada panel kapalı='+!await pg.evaluate(()=>{const p=document.querySelector('.n1h-panel');return !!p&&p.hasAttribute('data-open')}));
    await pg.goBack({waitUntil:'domcontentloaded'});await pg.waitForTimeout(6000);out.push('geri='+new URL(pg.url()).pathname);
    out.push('geride panel kapalı='+!await pg.evaluate(()=>{const p=document.querySelector('.n1h-panel');return !!p&&p.hasAttribute('data-open')}));
    out.push('yüzen düğmeler='+await pg.evaluate(()=>{const f=document.querySelector('n1-floating-controls');if(!f)return 'yok';const r=f.shadowRoot||f;return r.querySelectorAll('a,button').length}));
    out.push('loader artığı='+await pg.evaluate(()=>[...document.querySelectorAll('[id*=loader],[class*=loader]')].filter(e=>{const s=getComputedStyle(e);return s.display!=='none'&&s.visibility!=='hidden'&&+s.opacity>0.05&&e.getBoundingClientRect().height>200}).length));
   }catch(e){out.push('HATA '+e.message.slice(0,80));}
   console.log(BR,MODE,'menü',prof,out.join(' | '),fin(R));await ctx.close();}}
 if(SC==='rotate'){for(const p of PAGES.split(',')){const {ctx,pg,R}=await open(b,MOB,p);const req=[];pg.on('request',q=>{if(q.resourceType()==='media'||/\.mp4/.test(q.url()))req.push(q.url().slice(-60))});
   const s=()=>pg.evaluate(()=>({v:document.querySelectorAll('video').length,k:document.querySelectorAll('img[data-n1-still]').length,ox:document.documentElement.scrollWidth>innerWidth+1}));const a=await s();
   for(const vp of [{width:844,height:390},{width:390,height:844},{width:844,height:390},{width:390,height:844}]){await pg.setViewportSize(vp);await pg.waitForTimeout(1500);await pg.evaluate(()=>scrollTo(0,document.documentElement.scrollHeight*0.4));await pg.waitForTimeout(800);}
   const z=await s();console.log(BR,MODE,'döndürme ×4',p.padEnd(22),'video',a.v,'→',z.v,'| kare',a.k,'→',z.k,'| yatay taşma',z.ox,'| döndürmede yeni video isteği',req.length,JSON.stringify([...new Set(req)]),fin(R));await ctx.close();}}
 await b.close();})();
