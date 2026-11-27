// node ab.js <variant> <inject|none> <out>
const pw=require('playwright');const fs=require('fs');const [,,VAR,INJ,OUT]=process.argv;
const pages=(process.env.PAGES||'/,/kreatif-produksiyon,/sosyal-medya').split(',');
const init=`(function(){window.__hdr={};function chk(){try{var l=document.querySelector('n1-header .n1h-logo');if(l){var r=l.getBoundingClientRect();if(r.width>0&&r.bottom>0&&getComputedStyle(l.closest('n1-header')).display!=='none'){__hdr.logo=Math.round(performance.now());return;}}}catch(e){}requestAnimationFrame(chk);}requestAnimationFrame(chk);})();`;
(async()=>{const b=await pw.chromium.launch();const res=[];
for(const warm of [false,true]){const ctx=await b.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
 if(INJ!=='none')await ctx.addInitScript({path:INJ});
 for(const p of pages){const pg=await ctx.newPage();const cdp=await ctx.newCDPSession(pg);await cdp.send('Network.enable');await cdp.send('Performance.enable');
  await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:150,downloadThroughput:1.6*1024*1024/8,uploadThroughput:750*1024/8});
  await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
  let bytes=0,reqs=0,ours=0;cdp.on('Network.loadingFinished',e=>{bytes+=e.encodedDataLength;reqs++;});cdp.on('Network.requestWillBeSent',e=>{if(/1n-ronin-assets|cdnjs/.test(e.request.url))ours++;});
  await pg.addInitScript(init);await pg.goto('https://www.reklam1n.com'+p,{waitUntil:'commit'});
  let h={};for(let i=0;i<40;i++){await pg.waitForTimeout(500);h=await pg.evaluate(()=>window.__hdr).catch(()=>({}));if(h&&h.logo)break;}
  await pg.waitForTimeout(Math.max(0,15000-(h.logo||15000)));
  const {metrics}=await cdp.send('Performance.getMetrics');const M={};metrics.forEach(m=>M[m.name]=m.value);
  const rec={variant:VAR,warm,page:p,logo:h.logo||null,kb:Math.round(bytes/1024),reqs,oursReq:ours,taskS:+M.TaskDuration.toFixed(2),scriptS:+M.ScriptDuration.toFixed(2),heapMB:+(M.JSHeapUsedSize/1048576).toFixed(1)};
  res.push(rec);console.log(JSON.stringify(rec));await pg.close();}
 await ctx.close();}
fs.writeFileSync(OUT,JSON.stringify(res));await b.close();})();
