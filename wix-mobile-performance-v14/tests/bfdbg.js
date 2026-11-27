const pw=require('playwright');const [,,BR='webkit',PAGE='/reklam-yonetimi',MODE='v14']=process.argv;
(async()=>{const b=await pw[BR].launch(BR==='chromium'?{args:['--autoplay-policy=no-user-gesture-required']}:{});const o={viewport:{width:390,height:844},deviceScaleFactor:3,hasTouch:true,userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.7 Mobile/15E148 Safari/604.1'};if(BR==='chromium')o.isMobile=true;
const ctx=await b.newContext(o);if(MODE==='v14')await require('./route14.js')(ctx);const pg=await ctx.newPage();
await pg.goto('https://www.reklam1n.com'+PAGE,{waitUntil:'domcontentloaded'});await pg.waitForTimeout(9000);
const S=()=>pg.evaluate(()=>[...document.querySelectorAll('video')].filter(v=>v.getAttribute('src')||v.currentSrc).map(v=>`p${+v.paused} rs${v.readyState} ns${v.networkState} t${v.currentTime.toFixed(2)} d${(v.duration||0).toFixed(1)} loop${+v.loop} r${(()=>{const b=v.getBoundingClientRect();return Math.round(Math.max(0,Math.min(b.bottom,innerHeight)-Math.max(b.top,0))/Math.max(1,b.height)*100)})()}%`).join(' ; '));
console.log('başlangıç',await S());
for(let i=1;i<=2;i++){await pg.evaluate(()=>window.dispatchEvent(new PageTransitionEvent('pagehide',{persisted:true})));await pg.waitForTimeout(400);
 await pg.evaluate(()=>window.dispatchEvent(new PageTransitionEvent('pageshow',{persisted:true})));
 for(const t of [300,1000,2000,4000,6000,9000]){await pg.waitForTimeout(t-(t>300?[300,1000,2000,4000,6000][[1000,2000,4000,6000,9000].indexOf(t)]:0));console.log('#'+i,t+'ms',await S());}}
await b.close();})();
