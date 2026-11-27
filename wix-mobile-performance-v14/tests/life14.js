// V1.4 yaşam döngüsü testi: sayfa → başka sayfa → GERİ (BFCache) × N. Ölçülen: pagehide sonunda kaynağı bağlı video sayısı (BFCache'e giren belge),
// dönüşte kaynak geri geldi mi, video yeniden oynuyor mu, window/document dinleyici + gözlemci sayısı büyüyor mu. node life14.js <chromium|webkit> <live|v14> <profile> <page> [N]
const pw=require('playwright');const [,,BR='webkit',MODE='v14',PROF='masaustu',PAGE='/kreatif-produksiyon',N='5']=process.argv;
const P={mobil:{viewport:{width:390,height:844},deviceScaleFactor:3,hasTouch:true,isMobile:true,userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.7 Mobile/15E148 Safari/604.1'},
 masaustu:{viewport:{width:1440,height:900},deviceScaleFactor:1}}[PROF];
const INSTR=`(function(){if(window.top!==window)return;var C={win:0,doc:0,io:0,ioLive:0};window.__l14=C;
function wrap(t,k){var a=t.addEventListener,r=t.removeEventListener,seen=new Map();t.addEventListener=function(ty,fn,o){var c=typeof o==='boolean'?o:!!(o&&o.capture),id=ty+'|'+c,m=seen.get(fn)||new Set();if(!m.has(id)){m.add(id);seen.set(fn,m);C[k]++;}return a.apply(this,arguments);};
t.removeEventListener=function(ty,fn,o){var c=typeof o==='boolean'?o:!!(o&&o.capture),id=ty+'|'+c,m=seen.get(fn);if(m&&m.has(id)){m.delete(id);C[k]--;}return r.apply(this,arguments);};}
wrap(window,'win');wrap(document,'doc');var IO=window.IntersectionObserver;if(IO){window.IntersectionObserver=function(cb,o){var i=new IO(cb,o);C.io++;var ob=i.observe,dc=i.disconnect,live=false;i.observe=function(){if(!live){live=true;C.ioLive++;}return ob.apply(i,arguments);};i.disconnect=function(){if(live){live=false;C.ioLive--;}return dc.apply(i,arguments);};return i;};window.IntersectionObserver.prototype=IO.prototype;}
addEventListener('pageshow',function(e){C.ps=(C.ps||'')+(e.persisted?'P':'N');});addEventListener('load',function(){setTimeout(function(){window.addEventListener('pagehide',function(){var v=[].slice.call(document.querySelectorAll('video'));sessionStorage.setItem('__l14hide',JSON.stringify({n:v.length,withSrc:v.filter(function(x){return x.getAttribute('src');}).length}));});},6000);});})();`;
(async()=>{const b=await pw[BR].launch(BR==='chromium'?{ignoreDefaultArgs:['--disable-back-forward-cache'],args:['--autoplay-policy=no-user-gesture-required']}:{});
const o=Object.assign({},P);if(BR!=='chromium')delete o.isMobile;const ctx=await b.newContext(o);if(MODE==='v14')await require('./route14.js')(ctx);await ctx.addInitScript(INSTR);
const pg=await ctx.newPage();let crash=0;pg.on('crash',()=>crash++);const errs=[];pg.on('pageerror',e=>{const m=String(e.message);if(!/googleadservices|doubleclick|Cross-origin script|Failed to fetch|Load failed|ChunkLoad|SiteAssets|notifyEventToEditorApp/.test(m))errs.push(m.slice(0,100));});
await pg.goto('https://www.reklam1n.com'+PAGE,{waitUntil:'domcontentloaded',timeout:60000});await pg.waitForTimeout(9000);
const snap=()=>pg.evaluate(()=>{const v=[].slice.call(document.querySelectorAll('video'));return{win:__l14.win,doc:__l14.doc,ioLive:__l14.ioLive,vids:v.length,withSrc:v.filter(x=>x.getAttribute('src')).length,playing:v.filter(x=>!x.paused&&x.readyState>2).length,t:v.map(x=>+x.currentTime.toFixed(1))}});
const s0=await snap();console.log(BR,MODE,PROF,PAGE,'başlangıç',JSON.stringify(s0));
const OTHER=PAGE==='/'?'/markalar':'/markalar';const rows=[];
for(let i=1;i<=+N;i++){await pg.goto('https://www.reklam1n.com'+OTHER,{waitUntil:'domcontentloaded',timeout:60000});await pg.waitForTimeout(4000);
 await pg.goBack({waitUntil:'commit',timeout:30000});await pg.waitForTimeout(5000);
 const r=await pg.evaluate(()=>({nav:(__l14.ps||'').slice(-1)==='P'?'BFCACHE':(performance.getEntriesByType('navigation')[0]||{}).type,hide:JSON.parse(sessionStorage.getItem('__l14hide')||'null')})).catch(()=>({}));
 const s=await snap().catch(e=>({err:String(e.message).slice(0,60)}));await pg.waitForTimeout(1500);const s2=await snap().catch(()=>({t:[]}));
 const adv=(s.t||[]).map((t,k)=>((s2.t||[])[k]||0)-t>0.3?1:0).reduce((a,x)=>a+x,0);
 rows.push(Object.assign({i:i,adv:adv},r,s));console.log(' #'+i,'geri:',r.nav,'| pagehide sonunda kaynaklı video',r.hide?r.hide.withSrc+'/'+r.hide.n:'?','| dönüşte kaynaklı',s.withSrc+'/'+s.vids,'oynuyor(ilerleyen)',adv,'| dinleyici win/doc',s.win+'/'+s.doc,'IO canlı',s.ioLive);}
console.log(' ÖZET: dinleyici artışı win',rows[rows.length-1].win-s0.win,'doc',rows[rows.length-1].doc-s0.doc,'IO',rows[rows.length-1].ioLive-s0.ioLive,'| 1N hata',errs.length,errs.slice(0,2).join(' ¦ '),'| crash',crash);
await b.close();})();
