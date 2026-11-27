// Normal ziyaretçi: v13.1 anahtarı ile parametresiz ana sayfa + bir hizmet sayfası → hiçbir test dosyası/kutusu yok
const pw=require('playwright');const fs=require('fs');const {execFileSync}=require('child_process');const R='/home/user/1n-ronin-assets/wix-global-stability-v13/';
const SW=fs.readFileSync(R+'wix-custom-code/TEST-SWITCH-v13.1-head.html','utf8');
function curl(u){return execFileSync('curl',['-sS','-f','-L','--compressed','--max-time','25',u],{maxBuffer:64<<20}).toString('utf8');}
function entries(h){const out=[];const re=/\{"id":"[0-9a-f-]+","embedType":"custom",(?:"pages":\[[^\]]*\],)?"position":"(\w+)","loadOnce":\w+,"content":\{"type":"custom","html":"((?:[^"\\]|\\.)*)"/g;let m;while((m=re.exec(h)))out.push(JSON.parse('"'+m[2]+'"'));return out;}
(async()=>{const b=await pw.webkit.launch();const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:3,hasTouch:true});let rep=0;
await ctx.route(r=>r.hostname==='www.reklam1n.com',async route=>{const q=route.request();if(q.resourceType()!=='document')return route.continue();let h=curl(q.url());const e=entries(h).find(x=>x.includes('__n1Test'));if(e&&h.includes(e.trim())){h=h.split(e.trim()).join(SW);rep++;}route.fulfill({status:200,body:h,headers:{'content-type':'text/html; charset=utf-8'}});});
const pg=await ctx.newPage();const req=[];pg.on('request',q=>{if(/n1-stress|n1-stability|test-media|1\.5x/.test(q.url()))req.push(q.url().split('/').pop())});
for(const p of ['/','/kreatif-produksiyon']){await pg.goto('https://www.reklam1n.com'+p,{waitUntil:'domcontentloaded'});await pg.waitForTimeout(7000);
 console.log('normal ziyaretçi',p,JSON.stringify(await pg.evaluate(()=>({test:window.__n1Test||null,stress:window.__n1Stress||null,panel:!!document.getElementById('n1-stress-panel'),diag:!!document.getElementById('n1t-diag'),ls:Object.keys(localStorage).filter(k=>/^n1s-|^n1t/.test(k)),ss:Object.keys(sessionStorage).filter(k=>/^n1t/.test(k))}))));}
console.log('anahtar değiştirildi',rep,'test dosyası istekleri',req.length,req.join(','));await b.close();})();
