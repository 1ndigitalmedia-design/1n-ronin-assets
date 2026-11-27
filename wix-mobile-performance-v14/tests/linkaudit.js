// P08: tüm sayfalarda "Hikâyemizin Devamı" metinli bağlantı/düğmeleri (Shadow DOM dahil) tarar. node linkaudit.js <live|v14> <mobil|masaustu|tablet> pages
const pw=require('playwright');const [,,MODE='live',PROF='masaustu',PAGES]=process.argv;
const P={mobil:{viewport:{width:390,height:844},deviceScaleFactor:2,hasTouch:true,isMobile:true},tablet:{viewport:{width:820,height:1180},hasTouch:true,isMobile:true},masaustu:{viewport:{width:1440,height:900}}}[PROF];
(async()=>{const b=await pw.chromium.launch();const res=[];
for(const p of PAGES.split(',')){const ctx=await b.newContext(P);if(MODE==='v14')await require('./route14.js')(ctx,{});const pg=await ctx.newPage();
 try{await pg.goto('https://www.reklam1n.com'+p,{waitUntil:'domcontentloaded',timeout:60000});await pg.waitForTimeout(7000);
  const H=await pg.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<=H;y+=900){await pg.evaluate(y=>scrollTo(0,y),y);await pg.waitForTimeout(120);}await pg.waitForTimeout(1500);
  const f=await pg.evaluate(()=>{const out=[];const re=/hik[aâ]yemizin\s+devam/i;
   const walk=(root,inShadow)=>{root.querySelectorAll('a,button,[role=link],[data-link]').forEach(el=>{const t=(el.textContent||'').replace(/\s+/g,' ').trim();if(re.test(t)){
     const tpl=el.closest('template');out.push({text:t.slice(0,40),tag:el.tagName,href:el.getAttribute('href'),dataLink:el.getAttribute('data-link'),cls:(el.className||'').toString().slice(0,40),shadow:inShadow,inTemplate:!!tpl,visible:!!(el.offsetWidth||el.offsetHeight)});}});
    root.querySelectorAll('*').forEach(el=>{if(el.shadowRoot)walk(el.shadowRoot,true);});};walk(document,false);return out;});
  res.push({p,f});console.log(MODE,PROF,p.padEnd(34),f.length?JSON.stringify(f):'—');
 }catch(e){console.log(MODE,PROF,p,'HATA',e.message.slice(0,80));}
 // tıklama denemesi: görünür ilk öğe
 const vis=(res.at(-1)||{f:[]}).f.find(x=>x.visible);
 if(vis&&p==='/'){try{const loc=pg.getByText(/Hik[aâ]yemizin Devam/i).first();await loc.scrollIntoViewIfNeeded();await Promise.all([pg.waitForURL(u=>!u.pathname||u.pathname!=='/',{timeout:20000}),loc.click()]);console.log('  tıklama →',new URL(pg.url()).pathname);}catch(e){console.log('  tıklama HATA',e.message.slice(0,80));}}
 await ctx.close();}
await b.close();})();
