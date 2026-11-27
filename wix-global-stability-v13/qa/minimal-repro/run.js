const pw=require('playwright');const path=require('path');const [,,F='grayscale(1) brightness(.42)']=process.argv;const fs=require('fs');
(async()=>{const ON=process.env.ON||'none';const html=fs.readFileSync(__dirname+'/index.html','utf8').replace('VAR_F',F).replace('.on img{filter:none;','.on img{filter:'+ON+';');fs.writeFileSync(__dirname+'/v.html',html);
const b=await pw.webkit.launch();const pg=await (await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:3})).newPage();let c=false;pg.on('crash',()=>c=true);
await pg.goto('file://'+__dirname+'/v.html');const H=await pg.evaluate(()=>document.documentElement.scrollHeight);let y=0;
for(;y<H&&!c;y+=60){try{await pg.evaluate(y=>scrollTo(0,y),y);await pg.waitForTimeout(150);}catch(e){break;}}
console.log('filtre:',F.padEnd(30),c?'ÇÖKME @'+y:'tamam');await b.close().catch(()=>{});})();
