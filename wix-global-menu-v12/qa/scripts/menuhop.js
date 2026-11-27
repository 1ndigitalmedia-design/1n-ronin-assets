// node menuhop.js <chromium|webkit> <A|B|C> <out>
const pw=require('playwright');const fs=require('fs');const {execSync}=require('child_process');const [,,BR,SC,OUT]=process.argv;const B='https://www.reklam1n.com';
function maxProc(){const rows=execSync('ps -eo pid=,ppid=,rss=').toString().trim().split('\n').map(l=>l.trim().split(/\s+/).map(Number));const kids=new Map();rows.forEach(([p,pp,r])=>{if(!kids.has(pp))kids.set(pp,[]);kids.get(pp).push([p,r])});let mx=0;const st=[process.pid];while(st.length){const p=st.pop();(kids.get(p)||[]).forEach(([c,r])=>{mx=Math.max(mx,r);st.push(c)})}return Math.round(mx/1024);}
const SV=['/kreatif-produksiyon','/e-ticaret-yonetimi','/sosyal-medya','/reklam-yonetimi','/ui-ux-tasarim','/yapay-zeka','/uygulama-gelistirme'];
(async()=>{const b=await pw[BR].launch();const o={viewport:{width:390,height:844},hasTouch:true};if(BR==='chromium')o.isMobile=true;const ctx=await b.newContext(o);await require('./scen.js')(ctx,SC);
const pg=await ctx.newPage();const rows=[];const act=s=>pg.tap(s,{timeout:20000});
const snap=async(step)=>{await pg.waitForTimeout(400);let r={};try{r=await pg.evaluate(()=>({path:location.pathname,nav:(performance.getEntriesByType('navigation')[0]||{}).type,hdr:(()=>{const m=document.querySelector('n1-header .n1h-menu');return !!m&&m.getBoundingClientRect().height>0})(),vids:document.querySelectorAll('video').length,playing:[...document.querySelectorAll('video')].filter(v=>!v.paused).length}))}catch(e){r={err:e.message.slice(0,80)}}rows.push({step,mp:maxProc(),...r});};
const ready=async()=>{await pg.waitForSelector('n1-header .n1h-menu',{state:'visible',timeout:45000}).catch(()=>{});await pg.waitForTimeout(5000);};
await pg.goto(B+'/',{waitUntil:'domcontentloaded'});await ready();await snap('home');
for(const s of SV){try{
  if(SC==='A'){await pg.goto(B+s,{waitUntil:'domcontentloaded'});}   // A: menüde Hizmetler alt menüsü yok; doğrudan adres (bağlantı tıklamasına eşdeğer tam gezinme)
  else{await act('n1-header .n1h-menu');await pg.waitForTimeout(600);await act('.n1h-panel[data-open] .n1h-item:has-text("Hizmetler")');await pg.waitForTimeout(500);
    await Promise.all([pg.waitForURL('**'+s,{waitUntil:'commit',timeout:30000}),act(`.n1h-sub[data-open] a[href="${s}"]`)]);}
  await ready();await pg.evaluate(()=>scrollTo(0,document.documentElement.scrollHeight/2));await pg.waitForTimeout(1500);await snap('menü→'+s);
 }catch(e){rows.push({step:'menü→'+s,err:e.message.slice(0,100)});}}
for(let i=0;i<7;i++){try{await pg.goBack({waitUntil:'commit',timeout:30000});await ready();await snap('geri'+(i+1));}catch(e){rows.push({step:'geri'+(i+1),err:e.message.slice(0,80)})}}
for(let i=0;i<7;i++){try{await pg.goForward({waitUntil:'commit',timeout:30000});await ready();await snap('ileri'+(i+1));}catch(e){rows.push({step:'ileri'+(i+1),err:e.message.slice(0,80)})}}
fs.writeFileSync(OUT,JSON.stringify({BR,SC,rows},null,1));
const ok=rows.filter(r=>!r.err);console.log(BR,SC,'adım',rows.length,'hata',rows.length-ok.length,'header yok',ok.filter(r=>!r.hdr).length,'reload(ATS)',ok.filter(r=>r.nav==='reload').length,'maxProc ort/maks',Math.round(ok.reduce((a,r)=>a+r.mp,0)/ok.length),Math.max(...ok.map(r=>r.mp)),'yollar',ok.map(r=>r.path).join(' '));await b.close();})();
