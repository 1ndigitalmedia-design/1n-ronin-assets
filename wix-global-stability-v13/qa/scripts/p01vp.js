// Menü kalıntı testi: 4 görünüm × (alt menü bağlantısı → eski sayfanın son karesi; ardından GERİ → menü durumu)
// node p01vp.js <webkit|chromium> <live|fix>
const pw=require('playwright');const [,,BR='webkit',TAG='live']=process.argv;
const VPS={masaustu:{viewport:{width:1440,height:900}},tablet:{viewport:{width:834,height:1194},hasTouch:true,mob:1},'tablet-yatay':{viewport:{width:1194,height:834},hasTouch:true,mob:1},mobil:{viewport:{width:390,height:844},hasTouch:true,mob:1}};
const ST=`(function(){var h=document.querySelector('n1-header'),p=h&&h.panel||document.querySelector('.n1h-panel'),bc=p&&p.querySelector('.n1h-brandcard'),ico=h&&h.querySelector('.n1h-ico i');
 return [h&&h.hasAttribute('data-open'),p?getComputedStyle(p).visibility:'-',bc?(+getComputedStyle(bc).opacity).toFixed(2):'-',ico?getComputedStyle(ico).transform:'-',h?h.querySelector('.n1h-menu').getAttribute('aria-expanded'):'-',p?String(p.inert):'-']})()`;
(async()=>{const b=await pw[BR].launch();let pass=0,tot=0;
for(const [name,vp] of Object.entries(VPS)){const o={viewport:vp.viewport,hasTouch:!!vp.hasTouch};if(BR==='chromium'&&vp.mob)o.isMobile=true;
 const ctx=await b.newContext(o);if(TAG==='fix')await ctx.addInitScript({path:'inj-menu13.js'});const pg=await ctx.newPage();
 const act=(s)=>vp.hasTouch?pg.tap(s):pg.click(s);
 try{
 await pg.goto('https://www.reklam1n.com/sosyal-medya',{waitUntil:'domcontentloaded'});await pg.waitForSelector('n1-header .n1h-menu',{state:'visible',timeout:45000});await pg.waitForTimeout(6000);
 await act('n1-header .n1h-menu');await pg.waitForTimeout(900);await act('.n1h-panel[data-open] .n1h-item:has-text("Hizmetler")');await pg.waitForTimeout(700);
 await pg.evaluate(ST=>{window.__st=[];(function f(){window.__st.push(eval(ST));try{sessionStorage.setItem('__st',JSON.stringify(window.__st.slice(-3)))}catch(e){};requestAnimationFrame(f)})();},ST);
 await Promise.all([pg.waitForURL('**/kreatif-produksiyon',{waitUntil:'commit',timeout:30000}),act('.n1h-sub[data-open] a[href="/kreatif-produksiyon"]')]);await pg.waitForTimeout(5000);
 const last=(await pg.evaluate(()=>JSON.parse(sessionStorage.getItem('__st')||'[]'))).pop();
 const nw=await pg.evaluate(ST);
 await pg.goBack({waitUntil:'commit'});await pg.waitForTimeout(5000);const back=await pg.evaluate(ST).catch(e=>'ERR');
 const nav=await pg.evaluate(()=>(performance.getEntriesByType('navigation')[0]||{}).type);
 const closed=s=>Array.isArray(s)&&s[0]===false&&s[1]==='hidden'&&s[2]==='0.00'&&s[3]==='none'&&s[4]!=='true';
 const r=[closed(last),closed(nw),closed(back)];tot+=3;pass+=r.filter(Boolean).length;
 console.log(BR,TAG,name.padEnd(12),'eski-son-kare',r[0]?'KAPALI':'AÇIK-KALINTI',JSON.stringify(last),'| yeni',r[1]?'kapalı':'AÇIK','| geri('+nav+')',r[2]?'kapalı':'AÇIK '+JSON.stringify(back));
 }catch(e){tot+=3;console.log(BR,TAG,name,'HATA',String(e.message).slice(0,100));}
 await ctx.close();}
console.log(BR,TAG,'SONUÇ',pass+'/'+tot);await b.close();})();
