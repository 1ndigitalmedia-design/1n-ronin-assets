// Deterministik: loader görünürken Wix OutIn türüyle View Transition başlat; geçiş ortasında ekran görüntüsü
const pw=require('playwright');const [,,BR='chromium',MODE='live']=process.argv;
(async()=>{const b=await pw[BR].launch();const o={viewport:{width:390,height:844},hasTouch:true};if(BR==='chromium')o.isMobile=true;const ctx=await b.newContext(o);
if(MODE==='v13')await ctx.addInitScript({path:'inj-loader13.js'});
const pg=await ctx.newPage();await pg.goto('https://www.reklam1n.com/kreatif-produksiyon',{waitUntil:'domcontentloaded'});
await pg.waitForFunction(()=>document.getElementById('n1GlobalLoader')&&document.querySelector('n1-kreatif-produksiyon-v23 main.kp h1, n1-kreatif-produksiyon-v23 .kp-hero'),{timeout:20000,polling:50});
const r=await pg.evaluate(async()=>{if(!document.startViewTransition)return {vt:false};
 // sayfa içeriğinin geçiş katmanında görünmesini garanti etmek için yeni içerik
 const vt=document.startViewTransition({update(){document.body.dataset.vt='1'},types:['OutIn']});await vt.ready.catch(()=>{});
 return {vt:true,loader:!!document.getElementById('n1GlobalLoader')};});
await pg.waitForTimeout(+(process.env.MID||450));await pg.screenshot({path:`p04/vt-${BR}-${MODE}.png`});
console.log(BR,MODE,JSON.stringify(r));await b.close();})();
