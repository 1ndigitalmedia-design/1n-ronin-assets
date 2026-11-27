// Loader v13 ana sayfa üst sınırı: Ronin filmi 20 sn geciktirilir; loader ne zaman kapanıyor?
const pw=require('playwright');const [,,BR='webkit']=process.argv;
(async()=>{const b=await pw[BR].launch();const o={viewport:{width:390,height:844},deviceScaleFactor:3,hasTouch:true};if(BR==='chromium')o.isMobile=true;
const ctx=await b.newContext(o);await ctx.addInitScript({path:'inj-loader13.js'});
await ctx.route(/ronin-m5-film.*\.mp4/,async r=>{await new Promise(x=>setTimeout(x,20000));r.continue().catch(()=>{});});
const pg=await ctx.newPage();const t0=Date.now();await pg.goto('https://www.reklam1n.com/',{waitUntil:'commit'});
let seen=null,gone=null;const st=[];
for(let i=0;i<40;i++){const s=await pg.evaluate(()=>{const l=document.getElementById('n1GlobalLoader');const f=document.querySelector('[data-m4-film]');return [!!l&&getComputedStyle(l).opacity!=='0',f?f.getAttribute('data-n1v-state'):'-',window.__n1GlobalLoaderInstalled||'']}).catch(()=>[null]);
 const t=((Date.now()-t0)/1000).toFixed(1);if(s[0]&&!seen)seen=t;if(seen&&!s[0]&&!gone)gone=t+' (film:'+s[1]+')';st.push(t+':'+(s[0]?'L':'-')+s[1]);if(gone)break;await pg.waitForTimeout(500);}
console.log(BR,'loader',seen?'görünür @'+seen+'s':'görünmedi','→ kapandı @',gone||'15+ sn kapanmadı');console.log(' ',st.filter((x,i)=>i%3==0).join(' '));await b.close();})();
