const pw=require('playwright');
(async()=>{for(const br of ['webkit','chromium']){const b=await pw[br].launch();const o={viewport:{width:390,height:844},hasTouch:true};if(br==='chromium')o.isMobile=true;const ctx=await b.newContext(o);const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>{const s=String(e);if(!/Failed to fetch|Load failed|Fetch API|Cross-origin|Transition/.test(s))errs.push(s.slice(0,160))});
for(const u of ['/?n1v11=1&n1diag=1','/kreatif-produksiyon']){await pg.goto('https://www.reklam1n.com'+u,{waitUntil:'domcontentloaded'});await pg.waitForTimeout(12000);
 const r=await pg.evaluate(()=>({v11flag:sessionStorage.getItem('n1-v11'),__n1V11:!!window.__n1V11,nav:window.__n1Nav?(window.__n1Nav.version||JSON.stringify(window.__n1Nav)):null,stab:window.__n1Stability?window.__n1Stability.version:null,navScripts:[...document.scripts].map(s=>s.src).filter(s=>/n1-nav|n1-stability/.test(s)).map(s=>s.split('/').pop()),diagBox:!!document.querySelector('pre[aria-hidden]')}));
 console.log(br,u,JSON.stringify(r));}
console.log(br,'pageerrors:',JSON.stringify(errs.slice(0,4)));await b.close();}})();
