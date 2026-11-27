// node navtest.js <chromium|webkit> <live|patched>
const pw=require('playwright');const [,,BR='chromium',MODE='patched']=process.argv;const B='https://www.reklam1n.com';
(async()=>{const b=await pw[BR].launch();const res=[];
for(const [dev,vp] of [['mobile',{width:390,height:844}],['tablet',{width:820,height:1180}],['desktop',{width:1440,height:900}]]){
 const o={viewport:vp,hasTouch:dev!=='desktop'};if(BR==='chromium'&&dev!=='desktop')o.isMobile=true;
 const ctx=await b.newContext(o);if(MODE==='patched'&&process.env.N1_INJECT)await ctx.addInitScript({path:process.env.N1_INJECT});
 const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>{const s=String(e);if(!/Failed to fetch|Load failed|Fetch API|Cross-origin|CORS/.test(s))errs.push(s.slice(0,150))});
 const T=(name,ok,info)=>{res.push({BR,dev,name,ok,info});console.log(BR,dev,ok?'PASS':'FAIL',name,info||'')};
 const anchorOk=()=>pg.evaluate(()=>{const t=document.getElementById('hizmetler-ozet');if(!t)return {ok:false,why:'no target'};const r=t.getBoundingClientRect();const h=document.querySelector('n1-header');const hb=h?(h.querySelector('.n1h-bar')||h).getBoundingClientRect().bottom:0;return {ok:r.top>=0&&r.top<=Math.max(hb,0)+60&&r.top>=Math.max(hb,0)-4,top:Math.round(r.top),hdrBottom:Math.round(hb),hash:location.hash,path:location.pathname}});
 const openMenuClick=async()=>{await pg.click('n1-header .n1h-menu',{timeout:15000});await pg.waitForTimeout(700);await pg.click('.n1h-panel[data-open] a.n1h-item[href*="hizmetler-ozet"]',{timeout:10000});};
 try{
  await pg.goto(B+'/',{waitUntil:'domcontentloaded'});await pg.waitForSelector('n1-header .n1h-menu',{timeout:40000});await pg.waitForTimeout(6000);
  await openMenuClick();await pg.waitForTimeout(2500);let a=await anchorOk();T('home: MENU→Hizmetler kaydırma',a.ok&&a.path==='/',JSON.stringify(a));
  await Promise.all([pg.waitForURL('**/kreatif-produksiyon',{waitUntil:'commit',timeout:30000}),pg.evaluate(()=>document.querySelector('a[href="/kreatif-produksiyon"]').click())]);
  await pg.waitForSelector('n1-header .n1h-menu',{timeout:40000});await pg.waitForTimeout(5000);
  await Promise.all([pg.waitForURL(u=>u.pathname==='/'&&u.hash==='#hizmetler-ozet',{waitUntil:'commit',timeout:30000}),openMenuClick()]);
  await pg.waitForSelector('#hizmetler-ozet',{timeout:40000});await pg.waitForTimeout(8000);a=await anchorOk();T('iç sayfa: MENU→Hizmetler → /#hizmetler-ozet',a.ok,JSON.stringify(a));
  await pg.goBack({waitUntil:'commit'});await pg.waitForTimeout(7000);T('geri → hizmet sayfası',pg.url().endsWith('/kreatif-produksiyon'),pg.url());
  await pg.goForward({waitUntil:'commit'});await pg.waitForSelector('#hizmetler-ozet',{timeout:40000});await pg.waitForTimeout(9000);a=await anchorOk();T('ileri → /#hizmetler-ozet konumu',a.ok,JSON.stringify(a));
  await pg.reload({waitUntil:'commit'});await pg.waitForTimeout(9000);const rl=await pg.evaluate(()=>({hash:location.hash,y:Math.round(scrollY)}));T('yenileme: çapa temizlenir, en üst',rl.hash===''&&rl.y<5,JSON.stringify(rl));
  const p2=await ctx.newPage();await p2.goto(B+'/#hizmetler-ozet',{waitUntil:'domcontentloaded'});await p2.waitForSelector('#hizmetler-ozet',{timeout:40000});await p2.waitForTimeout(9000);
  const d=await p2.evaluate(()=>{const t=document.getElementById('hizmetler-ozet').getBoundingClientRect();return {top:Math.round(t.top),hash:location.hash}});T('doğrudan URL /#hizmetler-ozet',d.top>=0&&d.top<160,JSON.stringify(d));await p2.close();
  const p3=await ctx.newPage();const r3=await p3.goto(B+'/n1-full-test',{waitUntil:'commit'});await p3.waitForTimeout(1500);T('/n1-full-test → /',new URL(p3.url()).pathname==='/',p3.url()+' chain:'+(r3.request().redirectedFrom()?r3.request().redirectedFrom().url():'none'));await p3.close();
 }catch(e){T('EXCEPTION',false,e.message.slice(0,200))}
 const wixAbort=errs.filter(e=>/Transition was skipped/.test(e));const own=errs.filter(e=>!/Transition was skipped/.test(e));T('1N kaynaklı sayfa hatası yok',own.length===0,own.slice(0,3).join(' | ')+(wixAbort.length?' [Wix View Transition AbortError x'+wixAbort.length+' — canlıda da var]':''));try{T('aktif nav sürümü',true,await pg.evaluate(()=>window.__n1Nav&&__n1Nav.version))}catch(e){}
 await ctx.close();}
require('fs').writeFileSync(`nav-${BR}-${MODE}.json`,JSON.stringify(res,null,1));await b.close();})();
