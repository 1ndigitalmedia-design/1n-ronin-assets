// Bellek ölçümü (iPhone değeri DEĞİLDİR): Chromium mobil benzetimi, ana sayfa ↔ 7 hizmet sayfası × 2 tur, aynı sekmede bağlantı gezintisi.
// Her sayfa: 8 sn bekle + sona kadar kaydır + 2 sn; sonra CDP: JSHeapUsedSize, DOM sayaçları (belge/düğüm/dinleyici), GPU/medya için renderer süreç RSS (ps).
// node mem14.js <live|v14> [out.json]
const pw=require('playwright');const fs=require('fs');const {execSync}=require('child_process');const [,,MODE='v14',OUT]=process.argv;
const PAGES=['/kreatif-produksiyon','/e-ticaret-yonetimi','/sosyal-medya','/reklam-yonetimi','/ui-ux-tasarim','/yapay-zeka','/uygulama-gelistirme'];
function rss(){try{return Math.round(execSync("ps -eo rss,args | grep -E 'chrom.*--type=renderer' | grep -v grep | awk '{s+=$1} END {print s}'").toString()/1024);}catch(e){return null}}
(async()=>{const b=await pw.chromium.launch({args:['--autoplay-policy=no-user-gesture-required','--enable-precise-memory-info']});
const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:3,isMobile:true,hasTouch:true});if(MODE==='v14')await require('./route14.js')(ctx,{});
const pg=await ctx.newPage();const cdp=await ctx.newCDPSession(pg);await cdp.send('Performance.enable');const rows=[];
async function sample(label){await cdp.send('HeapProfiler.collectGarbage').catch(()=>{});await pg.waitForTimeout(500);const m=Object.fromEntries((await cdp.send('Performance.getMetrics')).metrics.map(x=>[x.name,x.value]));
 const d=await cdp.send('Memory.getDOMCounters').catch(()=>({}));const r={label,heapMB:+(m.JSHeapUsedSize/1048576).toFixed(1),docs:d.documents,nodes:d.nodes,listeners:d.jsEventListeners,rendererRssMB:rss(),
  vids:await pg.evaluate(()=>document.querySelectorAll('video').length).catch(()=>null)};rows.push(r);console.log(MODE,label.padEnd(30),'heap',r.heapMB,'MB | belge',r.docs,'düğüm',r.nodes,'dinleyici',r.listeners,'| renderer RSS',r.rendererRssMB,'MB | video',r.vids);}
async function visit(p){await pg.goto('https://www.reklam1n.com'+p,{waitUntil:'domcontentloaded',timeout:60000});await pg.waitForTimeout(8000);const H=await pg.evaluate(()=>document.documentElement.scrollHeight);
 for(let y=0;y<=H;y+=400){await pg.evaluate(y=>scrollTo(0,y),y);await pg.waitForTimeout(120);}await pg.waitForTimeout(2000);}
for(let tur=1;tur<=2;tur++)for(const p of PAGES){await visit('/');await sample(`tur${tur} ana sayfa`);await visit(p);await sample(`tur${tur} ${p}`);}
if(OUT)fs.writeFileSync(OUT,JSON.stringify(rows,null,1));await b.close();})();
