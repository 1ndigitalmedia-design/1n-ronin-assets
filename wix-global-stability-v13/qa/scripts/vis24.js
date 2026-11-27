// v23 ↔ v24 görsel eşdeğerlik: her satır sırayla aktif, geçiş bitince .ec-order ekran görüntüsü + hesaplanan filtre değerleri
const pw=require('playwright');const fs=require('fs');const [,,BR='chromium']=process.argv;
async function run(ver){const b=await pw[BR].launch();const o={viewport:{width:390,height:844},deviceScaleFactor:2,hasTouch:true,reducedMotion:'no-preference'};if(BR==='chromium')o.isMobile=true;
 const ctx=await b.newContext(o);const st={};if(process.env.NOTRANS)await ctx.addInitScript(()=>{document.addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');s.textContent='.ec-line__img{transition:none!important}';document.head.appendChild(s);});});await require('./routeEt.js')(ctx,ver,st);const pg=await ctx.newPage();let crash=0;pg.on('crash',()=>crash++);
 await pg.goto('https://www.reklam1n.com/e-ticaret-yonetimi',{waitUntil:'domcontentloaded'});await pg.waitForSelector('n1-e-ticaret-yonetimi-v23 .ec-line',{timeout:45000});await pg.waitForTimeout(6000);
 const n=await pg.evaluate(()=>document.querySelectorAll('.ec-line').length);const out={ver,hit:st.hit,shots:[],filters:[]};
 for(let k=0;k<n;k++){await pg.evaluate(k=>{const r=document.querySelectorAll('.ec-line')[k].getBoundingClientRect();scrollTo(0,scrollY+r.top+r.height/2-innerHeight/2);},k);await pg.waitForTimeout(600);await pg.evaluate(k=>{[...document.querySelectorAll('.ec-line')].forEach((r,i)=>r.classList.toggle('is-on',i===k));},k);await pg.waitForTimeout(1600);await pg.evaluate(k=>{[...document.querySelectorAll('.ec-line')].forEach((r,i)=>r.classList.toggle('is-on',i===k));},k);await pg.waitForTimeout(400);
  out.filters.push(await pg.evaluate(()=>[...document.querySelectorAll('.ec-line')].map(r=>(r.classList.contains('is-on')?'ON:':'off:')+getComputedStyle(r.querySelector('.ec-line__img')).filter).join(' | ')));
  const el=await pg.$('.ec-lines');const f=`vis/${BR}-${ver}-${k}.png`;await el.screenshot({path:f,animations:'disabled'});out.shots.push(f);}
 out.crash=crash;await b.close();return out;}
(async()=>{fs.mkdirSync('vis',{recursive:true});const a=await run('v23'),c=await run('v24');console.log(BR,'adres yönlendirme v23/v24:',a.hit,c.hit,'çökme',a.crash,c.crash);
 console.log(' v23 filtre (satır 0 aktifken):',a.filters[0]);console.log(' v24 filtre (satır 0 aktifken):',c.filters[0]);
 fs.writeFileSync(`vis/${BR}-res.json`,JSON.stringify({a,c},null,1));})();
