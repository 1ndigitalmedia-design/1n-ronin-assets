const pw=require('playwright');
(async()=>{const b=await pw.chromium.launch();const ctx=await b.newContext();
for(const p of ['/','/kreatif-produksiyon','/markalar','/kisaca-biz','/iletisim']){const pg=await ctx.newPage();const mixed=[];pg.on('request',r=>{if(r.url().startsWith('http://'))mixed.push(r.url().slice(0,120))});
await pg.goto('https://www.reklam1n.com'+p,{waitUntil:'domcontentloaded'});await pg.waitForTimeout(7000);
const r=await pg.evaluate(()=>{const deep=[];(function w(root){root.querySelectorAll('input[type=password]').forEach(i=>deep.push(i.name||i.id||'pw'));root.querySelectorAll('*').forEach(e=>e.shadowRoot&&w(e.shadowRoot))})(document);
 const ifr=[...document.querySelectorAll('iframe')].map(f=>(f.src||'').split('?')[0].slice(0,80));
 const ext=[...new Set([...document.querySelectorAll('script[src]')].map(s=>new URL(s.src).host))];
 const blank=[...document.querySelectorAll('a[target=_blank]')].filter(a=>!/noopener|noreferrer/.test(a.rel)).map(a=>a.href.slice(0,70));
 return {pw:deep,forms:document.forms.length,iframes:ifr,scriptHosts:ext,blankNoRel:blank.slice(0,8),isSecure:window.isSecureContext}});
console.log(p,JSON.stringify(r),'mixedRequests:',mixed.length,mixed.slice(0,3));await pg.close();}
await b.close();})();
