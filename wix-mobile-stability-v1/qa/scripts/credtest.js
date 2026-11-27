const pw=require('playwright');
const U='https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@d24fa373d6d76c0218b3f3b77897a8c2ace04e5e/wix-home-v648/modules/n1-header-v648.js';
const G='https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js';
(async()=>{for(const br of ['webkit'])for(const mode of ['none','omit','none','omit']){
 const b=await pw[br].launch();const ctx=await b.newContext({viewport:{width:390,height:844}});
 if(mode!=='none')await ctx.addInitScript(`if(window.top===window)document.addEventListener('DOMContentLoaded',function(){['${U}','${G}'].forEach(function(u){fetch(u,{mode:'no-cors',credentials:'${mode}'}).catch(function(){})})},{once:true});`);
 const pg=await ctx.newPage();await pg.goto('https://www.reklam1n.com/kreatif-produksiyon',{waitUntil:'domcontentloaded'});await pg.waitForTimeout(12000);
 const r=await pg.evaluate(([u,g])=>[u,g].map(x=>performance.getEntriesByName(x).map(e=>e.initiatorType+':'+e.transferSize+'/'+e.decodedBodySize+' '+Math.round(e.duration)+'ms').join(' ')),[U,G]);
 console.log(br.padEnd(8),mode.padEnd(11),'header:',r[0].padEnd(40),'ST:',r[1]);await b.close();}})();
