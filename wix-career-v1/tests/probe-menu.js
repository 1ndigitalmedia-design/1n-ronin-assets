// Canlı menü keşfi: hangi bileşen "İnsan Kaynakları"/"Ekibimize" içeriyor (normal + Shadow DOM), profil başına.
const pw=require('playwright');const [,,PAGES='/',PROF='mobil']=process.argv;
const P={mobil:{viewport:{width:390,height:844},deviceScaleFactor:2,hasTouch:true,isMobile:true},tablet:{viewport:{width:820,height:1180},hasTouch:true,isMobile:true},masaustu:{viewport:{width:1440,height:900}}}[PROF];
(async()=>{const b=await pw.chromium.launch();for(const p of PAGES.split(',')){const ctx=await b.newContext(P);const pg=await ctx.newPage();
 await pg.goto('https://www.reklam1n.com'+p,{waitUntil:'domcontentloaded',timeout:60000});await pg.waitForTimeout(9000);
 const r=await pg.evaluate(()=>{const out=[];const re=/İnsan Kaynakları|Ekibimize|Açık Pozisyon|Kariyer/;
  const walk=(root,host)=>{root.querySelectorAll('*').forEach(el=>{if(el.shadowRoot)walk(el.shadowRoot,el.tagName.toLowerCase());
    if(el.children.length===0&&re.test(el.textContent||'')){const a=el.closest('a,button');const box=el.getBoundingClientRect();out.push({t:el.textContent.trim().slice(0,30),host:host||'-',anc:(a&&a.tagName)||'',href:a&&a.getAttribute('href'),cls:(el.closest('[class]')||{}).className&&String(el.closest('[class]').className).slice(0,40),vis:!!(box.width&&box.height),comp:(el.closest('n1-header,n1-mobile-nav,[class*=m4],[class*=n1m],nav')||{}).tagName||''});}});};
  walk(document);return {out,hdr:[...document.querySelectorAll('n1-header')].map(h=>getComputedStyle(h).display),menuBtns:[...document.querySelectorAll('button')].filter(b=>/menu|menü/i.test(b.textContent+b.getAttribute('aria-label'))).map(b=>(b.className||'').toString().slice(0,40)+'|'+(b.getAttribute('aria-label')||b.textContent.trim()).slice(0,20))};});
 console.log(PROF,p,JSON.stringify(r).slice(0,1500));await ctx.close();}await b.close();})();
