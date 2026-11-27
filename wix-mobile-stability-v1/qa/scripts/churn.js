// node churn.js <label> <inject|none> <out>  — tek sayfada uzak-bırak/geri-yükle çalkantısı
const pw=require('playwright');const fs=require('fs');const {execSync}=require('child_process');const [,,LAB,INJ,OUT]=process.argv;
function maxProc(){const rows=execSync('ps -eo pid=,ppid=,rss=').toString().trim().split('\n').map(l=>l.trim().split(/\s+/).map(Number));const kids=new Map();rows.forEach(([p,pp,r])=>{if(!kids.has(pp))kids.set(pp,[]);kids.get(pp).push([p,r])});let mx=0;const st=[process.pid];while(st.length){const p=st.pop();(kids.get(p)||[]).forEach(([c,r])=>{mx=Math.max(mx,r);st.push(c)})}return Math.round(mx/1024);}
(async()=>{const b=await pw.webkit.launch();const ctx=await b.newContext({viewport:{width:390,height:844},hasTouch:true});if(INJ!=='none')await ctx.addInitScript({path:INJ});
const pg=await ctx.newPage();await pg.goto('https://www.reklam1n.com/uygulama-gelistirme',{waitUntil:'domcontentloaded'});await pg.waitForTimeout(10000);
const s=[maxProc()];const rel=[];
for(let i=0;i<12;i++){await pg.evaluate(()=>scrollTo(0,document.documentElement.scrollHeight));await pg.waitForTimeout(6500);
 rel.push(await pg.evaluate(()=>[...document.querySelectorAll('video')].filter(v=>v.__n1rel).length));
 await pg.evaluate(()=>scrollTo(0,0));await pg.waitForTimeout(6500);s.push(maxProc());}
const r={LAB,mp:s,released:rel};console.log(JSON.stringify(r));fs.writeFileSync(OUT,JSON.stringify(r));await b.close();})();
