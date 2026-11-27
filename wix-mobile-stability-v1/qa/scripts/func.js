const pw=require('playwright');const [,,BR='chromium']=process.argv;
(async()=>{const b=await pw[BR].launch(BR==='chromium'?{args:['--autoplay-policy=no-user-gesture-required']}:{});const o={viewport:{width:390,height:844},hasTouch:true};if(BR==='chromium')o.isMobile=true;
const ctx=await b.newContext(o);await require('./route.js')(ctx);const errs=[];
for(const p of ['/uygulama-gelistirme','/']){const pg=await ctx.newPage();pg.on('pageerror',e=>errs.push(p+' '+String(e).slice(0,160)));
await pg.goto('https://www.reklam1n.com'+p,{waitUntil:'domcontentloaded'});await pg.waitForTimeout(9000);
const st=()=>pg.evaluate(()=>{const v=[...document.querySelectorAll('video')].filter(x=>x.closest('[class]')&&true);const h=document.querySelector('[data-m4-film]');return {hero:h&&h.__n1v5?(function(x){return {state:x.state,t:x.t,ready:x.isReady,frames:x.frames}})(h.__n1v5.state()):null,rep:window.__n1Stability&&__n1Stability.report(),vids:v.map(x=>({src:!!x.getAttribute('src'),rel:!!x.__n1rel,paused:x.paused,rs:x.readyState,top:Math.round(x.getBoundingClientRect().top)}))}});
console.log(BR,p,'initial',JSON.stringify((await st()).rep.stats));
const H=await pg.evaluate(()=>document.documentElement.scrollHeight);
for(let i=1;i<=6;i++){await pg.evaluate(y=>scrollTo(0,y),Math.round(H*i/7));await pg.waitForTimeout(1500);}
await pg.waitForTimeout(5000);let s=await st();console.log(' hero before:',JSON.stringify(s.hero));console.log(' bottom:',JSON.stringify(s.rep.stats),JSON.stringify(s.vids));
await pg.evaluate(()=>scrollTo(0,0));await pg.waitForTimeout(4000);s=await st();console.log(' back top:',JSON.stringify(s.rep.stats),JSON.stringify(s.vids));
// synthetic BFCache cycle
await pg.evaluate(()=>{window.dispatchEvent(new PageTransitionEvent('pagehide',{persisted:true}));});await pg.waitForTimeout(500);s=await st();console.log(' after pagehide:',JSON.stringify(s.vids));
await pg.evaluate(()=>{window.dispatchEvent(new PageTransitionEvent('pageshow',{persisted:true}));});await pg.waitForTimeout(4000);s=await st();await pg.waitForTimeout(2000);const s2=await st();console.log(' hero after pageshow:',JSON.stringify(s.hero),'+2s',JSON.stringify(s2.hero));console.log(' after pageshow:',JSON.stringify(s.rep.stats),JSON.stringify(s.vids),s.rep.log.slice(-3));
await pg.close();}
console.log('errors:',errs);console.log('route hits',JSON.stringify(ctx.__routeHits));await b.close();})();
