// node hdrtime.js <live|patched> <out>
const pw=require('playwright');const fs=require('fs');
const [,,MODE='live',OUT='hdr.json']=process.argv;
const init=`(function(){window.__hdr={};function chk(){try{var l=document.querySelector('n1-header .n1h-logo'),m=document.querySelector('n1-header .n1h-menu');var vis=function(e){if(!e)return false;var r=e.getBoundingClientRect();if(!(r.width>0&&r.height>0&&r.bottom>0))return false;var h=e.closest('n1-header');var cs=getComputedStyle(h);return cs.display!=='none'&&cs.visibility!=='hidden';};if(!__hdr.logo&&vis(l))__hdr.logo=Math.round(performance.now());if(!__hdr.menu&&vis(m))__hdr.menu=Math.round(performance.now());}catch(e){} if(!(__hdr.logo&&__hdr.menu))requestAnimationFrame(chk);}requestAnimationFrame(chk);})();`;
const pages=(process.env.PAGES||'/,/kreatif-produksiyon,/e-ticaret-yonetimi,/sosyal-medya,/reklam-yonetimi,/ui-ux-tasarim,/yapay-zeka,/uygulama-gelistirme,/markalar,/kisaca-biz').split(',');
(async()=>{const b=await pw.chromium.launch();const res={};
for(const warm of [false,true]){const ctx=await b.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
 if(MODE==='patched'){ if(process.env.N1_INJECT) await ctx.addInitScript({path:process.env.N1_INJECT}); else await require('./route.js')(ctx); }
 for(const p of pages){const pg=await ctx.newPage();const cdp=await ctx.newCDPSession(pg);await cdp.send('Network.enable');
  await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:150,downloadThroughput:1.6*1024*1024/8,uploadThroughput:750*1024/8});
  await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
  await pg.addInitScript(init);
  await pg.goto('https://www.reklam1n.com'+p,{waitUntil:'commit'});
  let r={};for(let i=0;i<60;i++){await pg.waitForTimeout(500);r=await pg.evaluate(()=>window.__hdr).catch(()=>({}));if(r&&r.logo&&r.menu)break;}
  (res[p]=res[p]||{})[warm?'warm':'cold']=r; console.log(MODE,warm?'warm':'cold',p,JSON.stringify(r));await pg.close();}
 await ctx.close();}
fs.writeFileSync(OUT,JSON.stringify(res,null,1));await b.close();})();
