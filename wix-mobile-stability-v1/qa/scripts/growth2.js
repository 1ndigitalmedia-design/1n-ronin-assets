const pw=require('playwright');const {execSync}=require('child_process');
function maxProc(){const rows=execSync('ps -eo pid=,ppid=,rss=').toString().trim().split('\n').map(l=>l.trim().split(/\s+/).map(Number));const kids=new Map();rows.forEach(([p,pp,r])=>{if(!kids.has(pp))kids.set(pp,[]);kids.get(pp).push([p,r])});let mx=0;const st=[process.pid];while(st.length){const p=st.pop();(kids.get(p)||[]).forEach(([c,r])=>{mx=Math.max(mx,r);st.push(c)})}return Math.round(mx/1024);}
const B='https://www.reklam1n.com';
(async()=>{for(const mode of ['goto','back']){
 const b=await pw.webkit.launch();const ctx=await b.newContext({viewport:{width:390,height:844},hasTouch:true});const pg=await ctx.newPage();const s=[];let reloads=0;
 pg.on('framenavigated',f=>{});
 await pg.goto(B+'/',{waitUntil:'domcontentloaded'});await pg.waitForTimeout(8000);
 for(let i=0;i<10;i++){
  if(mode==='goto'){await pg.goto(B+'/kreatif-produksiyon',{waitUntil:'domcontentloaded'});await pg.waitForTimeout(6000);await pg.goto(B+'/',{waitUntil:'domcontentloaded'});await pg.waitForTimeout(6000);}
  else{await pg.evaluate(()=>document.querySelector('a[href="/kreatif-produksiyon"]').click()).catch(()=>{});await pg.waitForTimeout(6000);await pg.goBack({waitUntil:'commit'}).catch(()=>{});await pg.waitForTimeout(6000);
   const t=await pg.evaluate(()=>(performance.getEntriesByType('navigation')[0]||{}).type).catch(()=>'?');if(t==='reload')reloads++;}
  if(i%2===1)s.push(maxProc());}
 console.log(mode.padEnd(5),'home↔kreatif WebProcess MB @2,4,6,8,10:',s.join(' → '),mode==='back'?'(ATS reload sayısı '+reloads+'/10)':'');await b.close();}})();
