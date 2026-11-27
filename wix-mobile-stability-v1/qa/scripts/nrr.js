const pw=require('playwright');
const init=`(function(){try{var n=performance.getEntriesByType('navigation')[0];if(n&&n.type==='back_forward'){var a=JSON.parse(sessionStorage.getItem('__nrr')||'[]');a.push(JSON.stringify(n.notRestoredReasons));sessionStorage.setItem('__nrr',JSON.stringify(a));}}catch(e){}})();`;
(async()=>{const b=await pw.chromium.launch({ignoreDefaultArgs:['--disable-back-forward-cache']});const ctx=await b.newContext();const pg=await ctx.newPage();await pg.addInitScript(init);
await pg.goto('https://www.reklam1n.com/kisaca-biz',{waitUntil:'domcontentloaded'});await pg.waitForTimeout(5000);
await pg.goto('https://www.reklam1n.com/markalar',{waitUntil:'domcontentloaded'});await pg.waitForTimeout(4000);
await pg.goBack({waitUntil:'commit'});await pg.waitForTimeout(5000);
const r=await pg.evaluate(()=>sessionStorage.getItem('__nrr'));
const reasons=[];JSON.parse(r||'[]').forEach(s=>{const walk=o=>{if(!o)return;(o.reasons||[]).forEach(x=>reasons.push((o.src||o.url||'main').slice(0,80)+' :: '+(x.reason||JSON.stringify(x))));(o.children||[]).forEach(walk)};walk(JSON.parse(s))});
console.log([...new Set(reasons)].join('\n'));await b.close();})();
