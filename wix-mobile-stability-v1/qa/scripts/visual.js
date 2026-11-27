const pw=require('playwright');const fs=require('fs');const [,,BR='chromium']=process.argv;
const pages=['/','/kreatif-produksiyon','/markalar'];const vps={mobile:{width:390,height:844},tablet:{width:820,height:1180},desktop:{width:1440,height:900}};
(async()=>{const b=await pw[BR].launch();const out={};
for(const mode of ['live','patched'])for(const [dev,vp] of Object.entries(vps)){const o={viewport:vp,hasTouch:dev!=='desktop',deviceScaleFactor:1};if(BR==='chromium'&&dev!=='desktop')o.isMobile=true;
 const ctx=await b.newContext(o);if(mode==='patched')await ctx.addInitScript({path:process.env.N1_INJECT});
 for(const p of pages){const pg=await ctx.newPage();await pg.goto('https://www.reklam1n.com'+p,{waitUntil:'domcontentloaded'});await pg.waitForTimeout(12000);
  const g=await pg.evaluate(()=>{const R=s=>{const e=document.querySelector(s);if(!e)return null;const r=e.getBoundingClientRect();return [Math.round(r.left),Math.round(r.top),Math.round(r.width),Math.round(r.height)]};
   const secs=[...document.querySelectorAll('main section, footer')].slice(0,40).map(e=>{const r=e.getBoundingClientRect();return [Math.round(r.top+scrollY),Math.round(r.height)]});
   const ff=getComputedStyle(document.querySelector('h1,h2')||document.body);
   return {docH:document.documentElement.scrollHeight,bar:R('n1-header .n1h-bar'),logo:R('n1-header .n1h-logo'),menu:R('n1-header .n1h-menu'),h:R('h1')||R('h2'),font:ff.fontFamily+' '+ff.fontSize+' '+ff.fontWeight+' '+ff.color,secs}});
  await pg.screenshot({path:`vr/${mode}-${dev}${p.replace(/\//g,'_')||'_home'}.png`,clip:{x:0,y:0,width:vp.width,height:Math.min(140,vp.height)}});
  await pg.screenshot({path:`vr/full-${mode}-${dev}${p.replace(/\//g,'_')||'_home'}.png`});
  (out[dev+p]=out[dev+p]||{})[mode]=g;await pg.close();}
 await ctx.close();}
fs.writeFileSync(`vr-${BR}.json`,JSON.stringify(out,null,1));await b.close();})();
