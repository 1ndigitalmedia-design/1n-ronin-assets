const pw=require('playwright');const fs=require('fs');const {execFileSync}=require('child_process');
const LIVE=JSON.parse(fs.readFileSync('/tmp/claude-0/-home-user-1n-ronin-assets/b579e39c-423e-549e-83d9-e277055c5c60/scratchpad/live13/customcode.json')).find(e=>/Özel Yükleniyor/.test(e.name)).html;
const NEW=fs.readFileSync('/home/user/1n-ronin-assets/wix-global-stability-v13/wix-custom-code/LOADER-v13-ozel-yukleniyor.html','utf8');
function curl(u,ua){return execFileSync('curl',['-sS','-L','--compressed','-A',ua,u],{maxBuffer:64<<20}).toString('utf8');}
(async()=>{const b=await pw.chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
await ctx.route(r=>r.hostname==='www.reklam1n.com',async route=>{const q=route.request();if(q.resourceType()!=='document')return route.continue();let h=curl(q.url(),await q.headerValue('user-agent'));h=h.split(LIVE.trim()).join(NEW.trim());console.log('doc',q.url());route.fulfill({status:200,body:h,headers:{'content-type':'text/html; charset=utf-8'}});});
await ctx.addInitScript(`window.__ldlog=[];new MutationObserver(m=>{for(const r of m){for(const n of r.addedNodes)if(n.id==='n1GlobalLoader')__ldlog.push('add@'+Math.round(performance.now()));for(const n of r.removedNodes)if(n.id==='n1GlobalLoader')__ldlog.push('rm@'+Math.round(performance.now()))}}).observe(document,{childList:true,subtree:true});`);
const pg=await ctx.newPage();await pg.goto('https://www.reklam1n.com/kreatif-produksiyon',{waitUntil:'domcontentloaded'});await pg.waitForTimeout(8000);
const which=await pg.evaluate(()=>{const a=[...document.querySelectorAll('a[href="/"]')].map(a=>a.className+'|'+(a.closest('[class]')||{}).className);return a.slice(0,4)});console.log('a[href=/]:',which);
await pg.tap('a[href="/"]');await pg.waitForTimeout(1500);
console.log(await pg.evaluate(()=>({path:location.pathname,nav:performance.getEntriesByType('navigation')[0].type,inst:window.__n1GlobalLoaderInstalled,log:__ldlog,el:!!document.getElementById('n1GlobalLoader')})));await b.close();})();
