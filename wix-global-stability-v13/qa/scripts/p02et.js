const pw=require('playwright');const [,,BR='webkit',P='/e-ticaret-yonetimi',N='3']=process.argv;
(async()=>{for(let k=1;k<=+N;k++){const b=await pw[BR].launch();const o={viewport:{width:390,height:844},deviceScaleFactor:+(process.env.DPR||3),hasTouch:true};if(BR==='chromium')o.isMobile=true;
const ctx=await b.newContext(o);if(process.env.BLOCK)await ctx.route(new RegExp(process.env.BLOCK),r=>r.abort());const pg=await ctx.newPage();let crash=0,closed=0;pg.on('crash',()=>crash++);pg.on('close',()=>closed++);b.on('disconnected',()=>closed+=100);
let step='goto',big=[];try{await pg.goto('https://www.reklam1n.com'+P,{waitUntil:'domcontentloaded',timeout:60000});await pg.waitForTimeout(9000);
 const H=await pg.evaluate(()=>document.documentElement.scrollHeight);for(let i=1;i<=8;i++){step='scroll'+i;await pg.evaluate(y=>scrollTo(0,y),Math.round(H*i/8));await pg.waitForTimeout(800);}
 step='end';await pg.waitForTimeout(3000);big=await pg.evaluate(()=>[...document.images].filter(i=>i.naturalWidth*i.naturalHeight>1.5e6).map(i=>i.naturalWidth+'×'+i.naturalHeight+' göster '+Math.round(i.getBoundingClientRect().width)+'×'+Math.round(i.getBoundingClientRect().height)+' '+(i.currentSrc||'').split('/').slice(-2).join('/').slice(0,70)));
}catch(e){step+=' HATA '+String(e.message).split('\n')[0].slice(0,80);}
console.log(BR,P,'deneme',k,'adım',step,'crash',crash,'kapanma',closed);if(k===1&&big.length)console.log(' büyük görseller ('+big.length+'):\n  '+big.join('\n  '));await b.close().catch(()=>{});}})();
