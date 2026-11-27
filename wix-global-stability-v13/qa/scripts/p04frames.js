// node p04frames.js <tag> <from> <to-link-href> [loaderHtmlFile]  — Chromium screencast, kare bazlı loader analizi
const pw=require('playwright');const fs=require('fs');const {execFileSync}=require('child_process');
const [,,TAG,FROM='/',TO='/kreatif-produksiyon',LOADER]=process.argv;const B='https://www.reklam1n.com';
const LIVE=JSON.parse(fs.readFileSync('/tmp/claude-0/-home-user-1n-ronin-assets/b579e39c-423e-549e-83d9-e277055c5c60/scratchpad/live13/customcode.json')).find(e=>/Özel Yükleniyor/.test(e.name)).html;
function curl(u,ua){return execFileSync('curl',['-sS','-L','--compressed','-A',ua,u],{maxBuffer:64<<20}).toString('utf8');}
const __docs=[];(async()=>{const b=await pw.chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:1});
 const NEW=LOADER?fs.readFileSync(LOADER,'utf8'):null;{await ctx.route(r=>r.hostname==='www.reklam1n.com',async route=>{const q=route.request();const acc=(await q.headerValue('accept'))||'';const isDoc=q.method()==='GET'&&(q.resourceType()==='document'||/text\/html/.test(acc))&&!/\.(js|css|json|png|jpe?g|webp|svg|mp4|woff2?)(\?|$)/.test(q.url())&&!/\/_api\/|\/_partials\//.test(q.url());if(!isDoc)return route.continue();__docs.push(q.resourceType()+' '+new URL(q.url()).pathname);let h=curl(q.url(),await q.headerValue('user-agent'));if(!h.includes(LIVE.trim()))console.log('UYARI: loader bloğu yok',q.url());if(NEW)h=h.split(LIVE.trim()).join(NEW.trim());if(process.env.NOPREFETCH)h=h.replace(/("mpa-prefetch-eager"[\s\S]{0,400}?\);)document\.head\.appendChild\(s\)/,'$1void 0');route.fulfill({status:200,body:h,headers:{'content-type':'text/html; charset=utf-8'}});});}
 if(process.env.INJLOADER)await ctx.addInitScript({path:process.env.INJLOADER});
 const pg=await ctx.newPage();await pg.goto(B+FROM,{waitUntil:'domcontentloaded'});await pg.waitForTimeout(9000);
 const vis=await pg.evaluate(s=>{const a=[...document.querySelectorAll(`a[href="${s}"]`)].find(x=>!x.closest('.n1h-panel'));if(a){a.scrollIntoView({block:'center'});return true}return false},TO);await pg.waitForTimeout(800);
 if(!vis){await pg.tap('n1-header .n1h-menu');await pg.waitForTimeout(800);if(TO!=='/'){await pg.tap('.n1h-panel[data-open] .n1h-item:has-text("Hizmetler")');await pg.waitForTimeout(600);}}
 const SEL=vis?`a[href="${TO}"]:not(.n1h-panel a)`:(TO==='/'?'.n1h-panel[data-open] a.n1h-brand':`.n1h-sub[data-open] a[href="${TO}"]`);
 const cdp=await ctx.newCDPSession(pg);const frames=[];cdp.on('Page.screencastFrame',async f=>{frames.push({t:f.metadata.timestamp,d:f.data});cdp.send('Page.screencastFrameAck',{sessionId:f.sessionId}).catch(()=>{});});
 await cdp.send('Page.startScreencast',{format:'png',everyNthFrame:1,maxWidth:390,maxHeight:844});await pg.waitForTimeout(300);
 const t0=Date.now()/1000;await pg.tap(SEL);await pg.waitForTimeout(9000);await cdp.send('Page.stopScreencast');
 const dir=`p04/${TAG}`;fs.mkdirSync(dir,{recursive:true});frames.forEach((f,i)=>fs.writeFileSync(`${dir}/f${String(i).padStart(4,'0')}_${Math.round((f.t-t0)*1000)}.png`,Buffer.from(f.d,'base64')));
 console.log(TAG,'belgeler:',JSON.stringify(__docs.slice(0,12)));console.log(TAG,'kare:',frames.length,'süre(sn):',frames.length?(frames[frames.length-1].t-frames[0].t).toFixed(2):0);await b.close();})();
