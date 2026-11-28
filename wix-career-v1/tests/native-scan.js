// Canlı Wix yerel ve tüm kurumsal sayfalarda "Ekibimize Katıl" / /ekibimize-katil / kariyer bağlantısı taraması (gizli öğeler + Shadow DOM dahil)
const pw=require('playwright');const [,,PAGES]=process.argv;
(async()=>{const b=await pw.chromium.launch();for(const p of PAGES.split(',')){const ctx=await b.newContext({viewport:{width:1440,height:900}});const pg=await ctx.newPage();
 try{await pg.goto('https://www.reklam1n.com'+p,{waitUntil:'domcontentloaded',timeout:60000});await pg.waitForTimeout(6000);
 const r=await pg.evaluate(()=>{const out=[];const walk=root=>{root.querySelectorAll('*').forEach(el=>{if(el.shadowRoot)walk(el.shadowRoot);const h=el.getAttribute&&el.getAttribute('href')||'';const t=el.children.length===0?(el.textContent||'').trim():'';
  if(/ekibimize|insan-kaynaklari|acik-pozisyonlar|staj-programlari|kariyer/i.test(h)||/Ekibimize Katıl|Kariyer|İnsan Kaynakları|Açık Pozisyonlar/.test(t))out.push((el.tagName+' '+(h||t)).slice(0,60));});};walk(document);return [...new Set(out)];});
 console.log(p.padEnd(36),r.length?JSON.stringify(r):'—');}catch(e){console.log(p,'HATA',e.message.slice(0,60));}await ctx.close();}await b.close();})();
