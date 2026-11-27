// Usage: node cycle.js <chromium|webkit> <live|patched> <cycles> <outfile>
const pw=require('playwright'); const fs=require('fs'); const {execSync}=require('child_process');
const [,, BR='chromium', MODE='live', CYC='21', OUT='cycle.json']=process.argv;
const SERVICES=['/kreatif-produksiyon','/e-ticaret-yonetimi','/sosyal-medya','/reklam-yonetimi','/ui-ux-tasarim','/yapay-zeka','/uygulama-gelistirme'];
const BASE='https://www.reklam1n.com';
function rssMB(){ // sum RSS of all descendant processes of this node process
  const rows=execSync('ps -eo pid=,ppid=,rss=').toString().trim().split('\n').map(l=>l.trim().split(/\s+/).map(Number));
  const kids=new Map(); rows.forEach(([p,pp,r])=>{if(!kids.has(pp))kids.set(pp,[]);kids.get(pp).push([p,r])});
  let tot=0; const st=[process.pid]; while(st.length){const p=st.pop(); (kids.get(p)||[]).forEach(([c,r])=>{tot+=r;st.push(c)})}
  return Math.round(tot/1024);
}
function maxProcMB(){ const rows=execSync("ps -eo pid=,ppid=,rss=").toString().trim().split("\n").map(l=>l.trim().split(/\s+/).map(Number)); const kids=new Map(); rows.forEach(([p,pp,r])=>{if(!kids.has(pp))kids.set(pp,[]);kids.get(pp).push([p,r])}); let mx=0; const st=[process.pid]; while(st.length){const p=st.pop(); (kids.get(p)||[]).forEach(([c,r])=>{mx=Math.max(mx,r);st.push(c)})} return Math.round(mx/1024);
}
(async()=>{
  const bt=pw[BR];
  const b=await bt.launch(BR==='chromium'?{ignoreDefaultArgs:['--disable-back-forward-cache'],args:['--autoplay-policy=no-user-gesture-required']}:{});
  const ctxOpts={viewport:{width:390,height:844},hasTouch:true,userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'};
  if(BR==='chromium') ctxOpts.isMobile=true;
  const ctx=await b.newContext(ctxOpts);
  if(process.env.SCEN){ await require('./scen.js')(ctx,process.env.SCEN); } else if(MODE==='patched'){ if(process.env.N1_INJECT) await ctx.addInitScript({path:process.env.N1_INJECT}); else await require('./route.js')(ctx); }
  let pg=await ctx.newPage(); pg.on('crash',()=>{crashes++;});
  await pg.addInitScript({path:'instrument.js'});
  const cons=[]; pg.on('pageerror',e=>cons.push('pageerror '+String(e).slice(0,200)));
  pg.on('console',m=>{const t=m.text(); if(m.type()==='error'&&!/TUNNEL|Failed to fetch|Failed to load resource|error in your script/.test(t))cons.push('console '+t.slice(0,200))});
  const fails=[]; pg.on('requestfailed',r=>{const u=r.url(); if(/jsdelivr|cdnjs|reklam1n|wixstatic/.test(u)) fails.push(u.slice(0,160)+' '+(r.failure()||{}).errorText)});
  let cdp=null; if(BR==='chromium'){cdp=await ctx.newCDPSession(pg); await cdp.send('Performance.enable');}
  async function metrics(){ if(!cdp) return {}; const {metrics}=await cdp.send('Performance.getMetrics'); const o={}; metrics.forEach(m=>{if(['JSHeapUsedSize','Nodes','JSEventListeners','Documents','LayoutObjects'].includes(m.name))o[m.name]=m.name==='JSHeapUsedSize'?Math.round(m.value/1048576):m.value}); return o;}
  const TO=(p,ms,l)=>Promise.race([p,new Promise((_,rej)=>setTimeout(()=>rej(new Error('HANG '+l+' >'+ms+'ms')),ms))]);
  async function snap(label){ await pg.waitForTimeout(400); let s={}; try{s=await TO(pg.evaluate(()=>window.__n1probe&&__n1probe.snapshot()),20000,'evaluate');}catch(e){s={err:e.message.slice(0,100)}; hangs.push(label+' '+e.message.slice(0,80));} return Object.assign({label,t:Date.now(),rssMB:rssMB(),maxProcMB:maxProcMB()},s,await metrics()); }
  const DWELL=+(process.env.DWELL||6000);
  async function scrollThrough(){ const H=await pg.evaluate(()=>document.documentElement.scrollHeight); for(let i=1;i<=5;i++){ await pg.evaluate(y=>window.scrollTo(0,y),Math.round(H*i/5)); await pg.waitForTimeout(700);} await pg.waitForTimeout(DWELL); }
  const rows=[]; const hangs=[]; let crashes=0;
  await pg.goto(BASE+'/',{waitUntil:'domcontentloaded'}); await pg.waitForTimeout(9000);
  rows.push(await snap('home-initial'));
  for(let i=0;i<+CYC;i++){
    const svc=SERVICES[i%SERVICES.length];
    try{
      await pg.waitForSelector(`a[href="${svc}"]`,{state:'attached',timeout:20000});
      if(i>0){ await TO(scrollThrough(),40000,'home-scroll'); rows.push(await snap(`c${i}-home-dwelled`)); }
      await pg.evaluate(s=>document.querySelector(`a[href="${s}"]`).scrollIntoView({block:'center'}),svc); await pg.waitForTimeout(600);
      await Promise.all([pg.waitForURL('**'+svc,{timeout:30000,waitUntil:'commit'}), pg.click(`a[href="${svc}"]`,{timeout:15000})]);
      await pg.waitForLoadState('domcontentloaded'); await pg.waitForTimeout(6000);
      rows.push(await snap(`c${i+1}-svc${svc}-top`));
      await TO(scrollThrough(),30000,'scroll'); rows.push(await snap(`c${i+1}-svc${svc}-scrolled`));
      await pg.goBack({waitUntil:'commit',timeout:30000}); await pg.waitForLoadState('domcontentloaded'); await pg.waitForTimeout(6000);
      rows.push(await snap(`c${i+1}-home-after-back`));
    }catch(e){ rows.push({label:`c${i+1}-ERROR`,err:e.message.slice(0,200),url:pg.url()}); try{ if(/HANG/.test(e.message)){ hangs.push('cycle'+(i+1)+' '+e.message.slice(0,80)); try{await TO(pg.close(),10000,'close')}catch(_){} pg=await ctx.newPage(); pg.on('crash',()=>{crashes++;}); await pg.addInitScript({path:'instrument.js'}); } await pg.goto(BASE+'/',{waitUntil:'domcontentloaded'});await pg.waitForTimeout(8000);}catch(_){} }
    process.stderr.write(`${BR}/${MODE} cycle ${i+1} rss=${rows[rows.length-1].rssMB}MB\n`);
  }
  fs.writeFileSync(OUT,JSON.stringify({BR,MODE,rows,hangs,crashes,cons:[...new Set(cons)].slice(0,40),fails:[...new Set(fails)].slice(0,40)},null,1));
  await b.close();
})();
