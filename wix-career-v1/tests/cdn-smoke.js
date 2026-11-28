// Gerçek CDN duman testi: bütün yeni dosyalar jsDelivr @755f905 / @f40415a adreslerinden (yerel dosya yok).
const pw=require('playwright');const [,,BR='chromium',PROF='mobil']=process.argv;
const IOS='Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.7 Mobile/15E148 Safari/604.1';
const P={masaustu:{viewport:{width:1440,height:900}},mobil:{viewport:{width:390,height:844},deviceScaleFactor:3,hasTouch:true,isMobile:true,userAgent:IOS}}[PROF];
(async()=>{const b=await pw[BR].launch();
for(const p of ['/','/reklam-yonetimi','/kisaca-biz','/markalar','/gizlilik','/insan-kaynaklari','/acik-pozisyonlar','/staj-programlari']){const o=Object.assign({},P);if(BR!=='chromium')delete o.isMobile;const ctx=await b.newContext(o);const st={};await require('./routecareer.js')(ctx,st,{cdn:true});
 const pg=await ctx.newPage();const errs=[];const cdn=new Set();pg.on('pageerror',e=>{if(!/googleadservices|doubleclick|Cross-origin|Failed to fetch|Load failed|SiteAssets|notifyEventToEditorApp|Transition/.test(e.message))errs.push(e.message.slice(0,100))});
 pg.on('response',r=>{const u=r.url();if(/wix-career-v1\//.test(u))cdn.add(r.status()+' '+u.replace(/.*1n-ronin-assets@(.{7})[^/]*\//,'@$1/').slice(0,80));});
 await pg.goto('https://www.reklam1n.com'+p,{waitUntil:'domcontentloaded',timeout:60000});await pg.waitForTimeout(10000);
 const r=await pg.evaluate(()=>{const hdr=document.querySelector('n1-header');const js=hdr&&[...document.querySelectorAll('.n1h-panel .n1h-main .n1h-item')].map(i=>i.textContent.trim().slice(0,18)+':'+(i.getAttribute('href')||'btn'));return{ik:(js||[]).filter(x=>/İnsan/.test(x)),tog:!!document.querySelector('.n1h-panel .n1h-subtog'),eki:/Ekibimize/.test((document.querySelector('.n1h-panel')||{}).textContent||''),h1:document.querySelectorAll('.cr h1').length};});
 console.log(BR,PROF,p.padEnd(20),'İK',JSON.stringify(r.ik),'düğme',r.tog,'Ekibimize',r.eki,'kariyer H1',r.h1,'| CDN',[...cdn].join(' , '),'| hata',errs.length,errs[0]||'');await ctx.close();}
await b.close();})();
