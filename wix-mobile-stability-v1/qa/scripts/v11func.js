const pw=require('playwright');const [,,BR='chromium']=process.argv;const B='https://www.reklam1n.com';
(async()=>{const b=await pw[BR].launch(BR==='chromium'?{args:['--autoplay-policy=no-user-gesture-required']}:{});const o={viewport:{width:390,height:844},hasTouch:true};if(BR==='chromium')o.isMobile=true;
const res=[];const T=(n,ok,i)=>{res.push(ok);console.log(BR,ok?'PASS':'FAIL',n,i||'')};
// sessionStorage write spy installed before everything
const spy=`(function(){var c=0,keys={};var s=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(this===window.sessionStorage&&/^n1/.test(k)){c++;keys[k]=1;}return s.apply(this,arguments)};window.__ssw=function(){return {count:c,keys:Object.keys(keys)}};})();`;
let ctx=await b.newContext(o);await ctx.addInitScript(spy);await ctx.addInitScript({path:process.env.N1_INJECT});
// 1 scope
for(const p of ['/intelligence','/intelligence-admin','/dashboard','/ella-cikolata','/iletisim']){const pg=await ctx.newPage();await pg.goto(B+p,{waitUntil:'domcontentloaded',timeout:60000}).catch(()=>{});await pg.waitForTimeout(5000);
 const r=await pg.evaluate(()=>({st:window.__n1Stability,nav:window.__n1Nav&&{v:window.__n1Nav.version,a:window.__n1Nav.active,r:window.__n1Nav.reason}})).catch(e=>({err:e.message}));
 T('kapsam dışı pasif '+p,r.st&&r.st.active===false&&r.nav&&r.nav.a===false,JSON.stringify(r));await pg.close();}
// 2 normal visitor: no n1 sessionStorage writes except nav leave key on pagehide; no diag box; no interval from module
let pg=await ctx.newPage();await pg.goto(B+'/kreatif-produksiyon',{waitUntil:'domcontentloaded'});await pg.waitForTimeout(9000);
let r=await pg.evaluate(()=>({ssw:__ssw(),box:!!document.querySelector('pre[aria-hidden]'),rep:__n1Stability.report(),nav:__n1Nav.version}));
T('normal ziyaretçi: sessionStorage yazımı yok, tanılama kutusu yok',r.ssw.count===0&&!r.box&&r.rep.diag===false,JSON.stringify(r.ssw)+' nav='+r.nav);
// 3 BFCache synthetic x2: no duplicate observers, restores once
const cyc=async()=>{await pg.evaluate(()=>window.dispatchEvent(new PageTransitionEvent('pagehide',{persisted:true})));await pg.waitForTimeout(300);const a=await pg.evaluate(()=>__n1Stability.report());await pg.evaluate(()=>window.dispatchEvent(new PageTransitionEvent('pageshow',{persisted:true})));await pg.waitForTimeout(2500);return [a,await pg.evaluate(()=>__n1Stability.report())]};
let [h1,s1]=await cyc();let [h2,s2]=await cyc();
T('pagehide: gözlemciler kapalı',!h1.observers.io&&!h1.observers.mo,JSON.stringify(h1.observers));
T('pageshow: tek IO yeniden kuruldu',s1.observers.io===true&&s2.observers.io===true&&s2.stats.starts===1,JSON.stringify({o:s2.observers,starts:s2.stats.starts,bf:s2.stats.bfRestores}));
T('BFCache sonrası hero oynuyor',s2.playing>=1,JSON.stringify({playing:s2.playing,released:s2.released,stats:s2.stats}));
// 4 detached video
r=await pg.evaluate(async()=>{const v=document.querySelectorAll('n1-kreatif-produksiyon-v23 video')[1];scrollTo(0,0);const par=v.parentNode;const nxt=v.nextSibling;scrollTo(0,document.documentElement.scrollHeight);await new Promise(r=>setTimeout(r,1200));const hadTimer=!!v.__n1farT;v.remove();await new Promise(r=>setTimeout(r,4800));const res={hadTimerBefore:hadTimer,connected:v.isConnected,rel:!!v.__n1rel,ownPlay:Object.prototype.hasOwnProperty.call(v,'play'),src:v.getAttribute('src'),timer:!!v.__n1farT};par.insertBefore(v,nxt);return res;});
T('DOM\'dan ayrılan video: zamanlayıcı/sarmalayıcı yok, kaynak geri yüklenmedi',!r.timer&&!r.ownPlay&&!r.rel,JSON.stringify(r));
await pg.close();
// 5 diag persistence across pages
pg=await ctx.newPage();await pg.goto(B+'/?n1diag=1',{waitUntil:'domcontentloaded'});await pg.waitForTimeout(9000);
await Promise.all([pg.waitForURL('**/kreatif-produksiyon',{waitUntil:'commit',timeout:30000}),pg.evaluate(()=>document.querySelector('a[href="/kreatif-produksiyon"]').click())]);await pg.waitForTimeout(8000);
r=await pg.evaluate(()=>({diag:__n1Stability.report().diag,box:(document.querySelector('pre[aria-hidden]')||{}).textContent||'',url:location.href}));
T('tanılama hizmet sayfasına geçişte açık kalır ve günlük taşınır',r.diag&&/pagehide/.test(r.box)&&/\/ /.test(r.box),r.url+' | '+r.box.split('\n').slice(0,2).join(' / '));
await pg.goto(B+'/sosyal-medya?n1diag=0',{waitUntil:'domcontentloaded'});await pg.waitForTimeout(6000);
r=await pg.evaluate(()=>({diag:__n1Stability.report().diag,box:!!document.querySelector('pre[aria-hidden]')}));T('n1diag=0 kapatır',!r.diag&&!r.box,JSON.stringify(r));
console.log(BR,'SONUÇ',res.filter(Boolean).length+'/'+res.length);await b.close();})();
