// Kullanıcı gibi kademeli kaydırma (250 px / 350 ms) — sayfa sonuna kadar. node gradual.js <webkit|chromium> <path> [n]
const pw=require('playwright');const [,,BR='webkit',P='/',N='2']=process.argv;
(async()=>{for(let k=1;k<=+N;k++){const b=await pw[BR].launch();const o={viewport:{width:390,height:844},deviceScaleFactor:3,hasTouch:true,userAgent:BR==='webkit'?'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1':undefined};if(BR==='chromium'){o.isMobile=true;delete o.userAgent;}
 const ctx=await b.newContext(o);const pg=await ctx.newPage();let crashed=false;pg.on('crash',()=>crashed=true);let last='',H=0;
 try{await pg.goto('https://www.reklam1n.com'+P,{waitUntil:'domcontentloaded',timeout:60000});await pg.waitForTimeout(8000);H=await pg.evaluate(()=>document.documentElement.scrollHeight);
  for(let y=0;y<=H&&!crashed;y+=250){try{last=await pg.evaluate(y=>{scrollTo(0,y);const el=document.elementFromPoint(195,422);const s=el&&el.closest('section,[id]');return y+':'+(s?(s.id||s.className).toString().slice(0,40):'-')},y);await pg.waitForTimeout(350);}catch(e){break;}}
  await pg.waitForTimeout(1500);}catch(e){last+=' HATA '+String(e.message).slice(0,60);}
 console.log(BR,P.padEnd(22),'deneme',k,crashed?'ÇÖKME @ '+last:'tamam (sona kadar, '+H+'px)');await b.close().catch(()=>{});}})().catch(e=>console.log('ERR',String(e.message).slice(0,80)));
