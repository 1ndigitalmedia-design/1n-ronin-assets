// v24'ü gerçek jsDelivr adresinden (curl ile indirilip) yükleyip WebKit'te 150 px kademeli kaydırma
const pw=require('playwright');const {execFileSync}=require('child_process');
const U='https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@997f951a4ae76ab2dd95440c4e8e597ffa682499/wix-global-stability-v13/pages/wix-e-ticaret-yonetimi-v24/n1-e-ticaret-yonetimi-v24.js';
(async()=>{const body=execFileSync('curl',['-sS','-f',U]);const b=await pw.webkit.launch();const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:3,hasTouch:true});
let hit=0;await ctx.route(/n1-e-ticaret-yonetimi-v23\.js$/,r=>{hit++;r.fulfill({status:200,body,headers:{'content-type':'application/javascript','access-control-allow-origin':'*'}});});
const pg=await ctx.newPage();let c=false;pg.on('crash',()=>c=true);await pg.goto('https://www.reklam1n.com/e-ticaret-yonetimi',{waitUntil:'domcontentloaded'});await pg.waitForTimeout(8000);
const H=await pg.evaluate(()=>document.documentElement.scrollHeight);let y=0;for(;y<=H&&!c;y+=150){try{await pg.evaluate(y=>scrollTo(0,y),y);await pg.waitForTimeout(300);}catch(e){break;}}
console.log('CDN v24 (',body.length,'B, yönlendirme',hit,') WebKit 150px:',c?'ÇÖKME @'+y:'tamam, sona kadar '+H+'px');await b.close();})();
