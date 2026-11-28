// Canlı sitede her sayfanın gerçekten yüklediği 1N betik adresleri (Server URL tespiti)
const pw=require('playwright');const [,,PAGES]=process.argv;
(async()=>{const b=await pw.chromium.launch();for(const p of PAGES.split(',')){const ctx=await b.newContext({viewport:{width:1440,height:900}});const pg=await ctx.newPage();const s=new Set();
 pg.on('request',q=>{const u=q.url();if(/1n-ronin-assets@/.test(u)&&/\.js(\?|$)/.test(u))s.add(u.replace(/^https:\/\/cdn\.jsdelivr\.net\/gh\/1ndigitalmedia-design\/1n-ronin-assets@/,''));});
 await pg.goto('https://www.reklam1n.com'+p,{waitUntil:'domcontentloaded',timeout:60000});await pg.waitForTimeout(9000);
 console.log(p,'\n  '+[...s].filter(u=>/pages\/|home\/|n1-kisaca|n1-markalar|yasal|header|markup|menu-close/.test(u)).join('\n  '));await ctx.close();}await b.close();})();
