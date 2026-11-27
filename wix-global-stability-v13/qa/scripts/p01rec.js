// node p01rec.js <webkit|chromium> <tag> [inject]
const pw=require('playwright');const fs=require('fs');const [,,BR='webkit',TAG='live',INJ]=process.argv;
(async()=>{const b=await pw[BR].launch();const o={viewport:{width:390,height:844},hasTouch:true,recordVideo:{dir:'p01/vid-'+BR+'-'+TAG,size:{width:390,height:844}}};if(BR==='chromium')o.isMobile=true;
const ctx=await b.newContext(o);if(INJ)await ctx.addInitScript({path:INJ});const pg=await ctx.newPage();const t0=Date.now();const marks={};
await pg.goto('https://www.reklam1n.com/sosyal-medya',{waitUntil:'domcontentloaded'});await pg.waitForSelector('n1-header .n1h-menu',{state:'visible',timeout:45000});await pg.waitForTimeout(6000);
await pg.tap('n1-header .n1h-menu');await pg.waitForTimeout(900);await pg.tap('.n1h-panel[data-open] .n1h-item:has-text("Hizmetler")');await pg.waitForTimeout(700);
marks.tap=(Date.now()-t0)/1000;
// state sampler on the OLD page: record header/panel state every animation frame until unload
await pg.evaluate(()=>{window.__st=[];const h=document.querySelector('n1-header'),p=document.querySelector('.n1h-panel'),bc=p.querySelector('.n1h-brandcard'),ico=h.querySelector('.n1h-ico i');const t0=performance.now();
 (function f(){window.__st.push([Math.round(performance.now()-t0),h.hasAttribute('data-open'),getComputedStyle(p).visibility,(+getComputedStyle(bc).opacity).toFixed(2),getComputedStyle(ico).transform]);try{sessionStorage.setItem('__st',JSON.stringify(window.__st.slice(-40)))}catch(e){};requestAnimationFrame(f)})();});
await Promise.all([pg.waitForURL('**/kreatif-produksiyon',{waitUntil:'commit',timeout:30000}),pg.tap('.n1h-sub[data-open] a[href="/kreatif-produksiyon"]')]);
marks.commit=(Date.now()-t0)/1000;await pg.waitForTimeout(4000);
const st=await pg.evaluate(()=>JSON.parse(sessionStorage.getItem('__st')||'[]'));
const now=await pg.evaluate(()=>{const h=document.querySelector('n1-header');const p=document.querySelector('.n1h-panel');return {newPageOpen:h&&h.hasAttribute('data-open'),panelVis:p&&getComputedStyle(p).visibility,expanded:h&&h.querySelector('.n1h-menu').getAttribute('aria-expanded')}});
await ctx.close();await b.close();
console.log(BR,TAG,'marks',JSON.stringify(marks));console.log(' eski sayfa son durumları [ms, data-open, panel visibility, brandcard opacity, ikon transform]:');st.slice(-12).forEach(r=>console.log('  ',JSON.stringify(r)));console.log(' yeni sayfa:',JSON.stringify(now));
fs.writeFileSync(`p01/marks-${BR}-${TAG}.json`,JSON.stringify(marks));})();
