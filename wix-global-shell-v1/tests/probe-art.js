// WebKit/Chromium mobil: footer partner görseli kaydırınca yükleniyor mu? + Ronin 2× kademesi DPR 2/3
const pw=require('playwright');const B='https://www.reklam1n.com';const rs=require('./routeshell.js');
const SH='https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@'+(process.env.SHELL_SHA||'0000000000000000000000000000000000000000')+'/wix-global-shell-v1/'+(process.env.SHELL_FILE||'n1-global-shell-v1-2.js');
(async()=>{const out=[];for(const br of ['webkit','chromium'])for(const w of [320,390]){const b=await pw[br].launch();const ctx=await b.newContext(Object.assign({viewport:{width:w,height:w<340?568:844},deviceScaleFactor:2,hasTouch:true},br==='chromium'?{isMobile:true}:{}));await rs(ctx,{});await rs.shellPages(ctx,SH);const pg=await ctx.newPage();
await pg.goto(B+'/iletisim?n1shell=iletisim',{waitUntil:'domcontentloaded',timeout:60000});await pg.waitForSelector('n1-global-footer-v1[data-ready]',{timeout:60000});
const before=await pg.evaluate(()=>{const i=document.querySelector('n1-global-footer-v1 .n1ft-partner-art img');return i&&i.naturalWidth});
await pg.evaluate(()=>document.querySelector('n1-global-footer-v1').scrollIntoView());await pg.waitForTimeout(4000);
const after=await pg.evaluate(()=>{const i=document.querySelector('n1-global-footer-v1 .n1ft-partner-art img');const r=i.getBoundingClientRect();return {nw:i.naturalWidth,src:(i.currentSrc||'').split('/').pop().slice(0,40),w:Math.round(r.width),h:Math.round(r.height),vis:getComputedStyle(i.parentNode).display}});
out.push({br,w,before,after});await b.close();}
for(const dpr of [2,3]){const b=await pw.webkit.launch();const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:dpr,hasTouch:true});await rs(ctx,{});const pg=await ctx.newPage();await pg.goto(B+'/',{waitUntil:'domcontentloaded'});await pg.waitForTimeout(9000);
out.push({ronin:'webkit 390 dpr'+dpr,v:await pg.evaluate(()=>[...document.querySelectorAll('video')].map(v=>(v.currentSrc||v.getAttribute('src')||'').split('/').pop()).filter(x=>/ronin/.test(x)))});await b.close();}
console.log(JSON.stringify(out,null,1));require('fs').writeFileSync(__dirname+'/../qa/test/probe-art-ronin.json',JSON.stringify(out,null,1))})();
