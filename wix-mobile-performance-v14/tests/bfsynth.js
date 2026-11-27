// BFCache geçişinin deterministik benzetimi: belge içinde PageTransitionEvent('pagehide'|'pageshow', {persisted:true}) — bileşenlerin kendi işleyicileri gerçek sırayla çalışır.
// Ölçülen: gizlenince kaynaklı/oynayan video; dönüşte kaynak geri mi, ilerleyen video var mı; 3 döngüde dinleyici/gözlemci artışı. node bfsynth.js <chromium|webkit> <live|v14> <profile> <pages>
const pw=require('playwright');const [,,BR='chromium',MODE='v14',PROF='masaustu',PAGES='/']=process.argv;
const P={mobil:{viewport:{width:390,height:844},deviceScaleFactor:3,hasTouch:true,isMobile:true,userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.7 Mobile/15E148 Safari/604.1'},masaustu:{viewport:{width:1440,height:900},deviceScaleFactor:1}}[PROF];
const INSTR=`(function(){if(window.top!==window)return;var C={win:0,doc:0};window.__bf=C;function wrap(t,k){var a=t.addEventListener,r=t.removeEventListener,seen=new Map();
t.addEventListener=function(ty,fn,o){var c=typeof o==='boolean'?o:!!(o&&o.capture),id=ty+'|'+c,m=seen.get(fn)||new Set();if(!m.has(id)){m.add(id);seen.set(fn,m);C[k]++;}return a.apply(this,arguments);};
t.removeEventListener=function(ty,fn,o){var c=typeof o==='boolean'?o:!!(o&&o.capture),id=ty+'|'+c,m=seen.get(fn);if(m&&m.has(id)){m.delete(id);C[k]--;}return r.apply(this,arguments);};}wrap(window,'win');wrap(document,'doc');})();`;
(async()=>{const b=await pw[BR].launch(BR==='chromium'?{args:['--autoplay-policy=no-user-gesture-required']}:{});
for(const PAGE of PAGES.split(',')){const o=Object.assign({},P);if(BR!=='chromium')delete o.isMobile;const ctx=await b.newContext(o);if(MODE==='v14')await require('./route14.js')(ctx);await ctx.addInitScript(INSTR);
 const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>{const m=String(e.message);if(!/googleadservices|doubleclick|Cross-origin script|Failed to fetch|Load failed|ChunkLoad|SiteAssets|notifyEventToEditorApp/.test(m))errs.push(m.slice(0,100));});
 await pg.goto('https://www.reklam1n.com'+PAGE,{waitUntil:'domcontentloaded',timeout:60000});await pg.waitForTimeout(9000);
 const S=()=>pg.evaluate(()=>{const v=[...document.querySelectorAll('video')];return{n:v.length,src:v.filter(x=>x.getAttribute('src')).length,play:v.filter(x=>!x.paused).length,t:v.map(x=>x.currentTime),p:v.map(x=>x.paused),win:__bf.win,doc:__bf.doc};});
 const s0=await S();const line=[];let ok=true;
 for(let i=1;i<=3;i++){
  await pg.evaluate(()=>{window.dispatchEvent(new PageTransitionEvent('pagehide',{persisted:true}));});await pg.waitForTimeout(400);
  const h=await S();
  await pg.evaluate(()=>{window.dispatchEvent(new PageTransitionEvent('pageshow',{persisted:true}));});await pg.waitForTimeout(4000);
  const a=await S();await pg.waitForTimeout(1500);const a2=await S();const adv=a2.t.filter((t,k)=>Math.abs(t-a.t[k])>0.05&&!a2.p[k]).length;   // döngüsel kısa videolar (1,8–7 sn) pencere içinde başa sarabilir: değişim mutlak değerle ölçülür
  line.push(`#${i} gizli: kaynaklı ${h.src}/${h.n} oynayan ${h.play} → dönüş: kaynaklı ${a.src}/${a.n} ilerleyen ${adv}`);
  if(MODE==='v14'&&!(PROF==='masaustu'&&PAGE==='/')&&(h.src!==0||a.src<s0.src||adv<Math.min(1,s0.play)))ok=false;}
 const s3=await S();
 console.log(BR,MODE,PROF,PAGE.padEnd(22),'başlangıç kaynaklı',s0.src+'/'+s0.n,'oynayan',s0.play,'|',line.join(' | '),'| dinleyici artışı win',s3.win-s0.win,'doc',s3.doc-s0.doc,'| 1N hata',errs.length,errs.slice(0,1).join(''),MODE==='v14'?(ok?'| SONUÇ: GEÇTİ':'| SONUÇ: KALDI'):'');
 await ctx.close();}
await b.close();})();
