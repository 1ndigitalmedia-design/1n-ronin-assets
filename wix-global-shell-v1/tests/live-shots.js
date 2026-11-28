const pw=require('playwright');(async()=>{const b=await pw.chromium.launch();
for(const [p,n] of [['/iletisim','iletisim'],['/reklam-ajansi','akademi'],['/bu-sayfa-yok-xyz','404']])for(const [prof,o] of [['masaustu',{viewport:{width:1440,height:900}}],['mobil',{viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true}]]){
 const ctx=await b.newContext(o);const pg=await ctx.newPage();await pg.goto('https://www.reklam1n.com'+p,{waitUntil:'domcontentloaded'});await pg.waitForTimeout(8000);
 const info=await pg.evaluate(()=>({h:document.documentElement.scrollHeight,ce:[...document.querySelectorAll('*')].filter(e=>e.tagName.includes('-')&&/^N1|^RONIN/.test(e.tagName)).map(e=>e.tagName.toLowerCase()),iframes:[...document.querySelectorAll('iframe')].map(f=>(f.src||'').slice(0,60)+' '+Math.round(f.getBoundingClientRect().height)),header:!!document.querySelector('header,#SITE_HEADER'),footer:!!document.querySelector('footer,#SITE_FOOTER')}));
 console.log(n,prof,JSON.stringify(info));await pg.screenshot({path:`../qa/live/${n}-${prof}.png`,fullPage:true});await ctx.close();}
await b.close();})();
