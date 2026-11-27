// Kademeli kaydırma regresyonu. node grad24.js <webkit|chromium> <path> <stepPx> <v23|v24> [n]
const pw=require('playwright');const fs=require('fs');const [,,BR='webkit',P='/',STEP='150',VER='v24',N='2']=process.argv;
const IOS='Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1';
(async()=>{for(let k=1;k<=+N;k++){const b=await pw[BR].launch();const o={viewport:{width:390,height:844},deviceScaleFactor:3,hasTouch:true};if(BR==='chromium')o.isMobile=true;else o.userAgent=IOS;
 const ctx=await b.newContext(o);const st={};await require('./routeEt.js')(ctx,VER,st);const pg=await ctx.newPage();let crashed=false;pg.on('crash',()=>crashed=true);
 const perr=[];pg.on('pageerror',e=>{const m=String(e.message);if(!/googleadservices|Cross-origin script|doubleclick|Failed to fetch|Load failed/.test(m))perr.push(m.slice(0,80))});
 let y=0,H=0,sec='',t0=Date.now(),fil='';
 try{await pg.goto('https://www.reklam1n.com'+P,{waitUntil:'domcontentloaded',timeout:60000});await pg.waitForTimeout(8000);H=await pg.evaluate(()=>document.documentElement.scrollHeight);
  for(y=0;y<=H&&!crashed;y+=+STEP){try{sec=await pg.evaluate(y=>{scrollTo(0,y);const el=document.elementFromPoint(195,422);const s=el&&el.closest('section,[id]');return s?(s.id||s.className).toString().slice(0,30):'-'},y);await pg.waitForTimeout(300);}catch(e){break;}}
  if(!crashed){await pg.waitForTimeout(1500);H=await pg.evaluate(()=>document.documentElement.scrollHeight);fil=await pg.evaluate(()=>{const i=document.querySelector('.ec-line.is-on .ec-line__img');return i?getComputedStyle(i).filter:''}).catch(()=>'');}
 }catch(e){sec+=' HATA '+String(e.message).slice(0,50);}
 const r={br:BR,page:P,step:+STEP,ver:P==='/e-ticaret-yonetimi'?VER:'-',run:k,crash:crashed,y,H,sec,routeHit:st.hit||0,perr:perr.length,sn:Math.round((Date.now()-t0)/1000),activeFilter:fil};
 fs.appendFileSync('grad24.jsonl',JSON.stringify(r)+'\n');
 console.log(BR,P.padEnd(22),'adım',STEP,'sürüm',r.ver,'#'+k,crashed?'ÇÖKME @'+y+' ('+sec+')':'tamam: sona kadar '+H+'px','| v-yönl',r.routeHit,'| JS hata',perr.length,'|',r.sn+'sn',fil?'| aktif filtre '+fil:'');
 await b.close().catch(()=>{});}})();
