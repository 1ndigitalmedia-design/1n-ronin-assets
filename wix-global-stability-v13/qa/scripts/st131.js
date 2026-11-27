// V1.3.1 stres testi işlev denemesi (WebKit). Canlı HTML'deki test anahtarı girişi v13.1 ile değiştirilir, stres betiği yerelden.
const pw=require('playwright');const fs=require('fs');const {execFileSync}=require('child_process');const R='/home/user/1n-ronin-assets/wix-global-stability-v13/';
const SW=fs.readFileSync(R+'wix-custom-code/TEST-SWITCH-v13.1-head.html','utf8');const RUN=fs.readFileSync(R+'stress/n1-stress-v1.js');
function curl(u,ua){return execFileSync('curl',['-sS','-f','-L','--compressed','--max-time','25','-A',ua||'Mozilla/5.0',u],{maxBuffer:64<<20}).toString('utf8');}
function entries(h){const out=[];const re=/\{"id":"[0-9a-f-]+","embedType":"custom",(?:"pages":\[[^\]]*\],)?"position":"(\w+)","loadOnce":\w+,"content":\{"type":"custom","html":"((?:[^"\\]|\\.)*)"/g;let m;while((m=re.exec(h)))out.push(JSON.parse('"'+m[2]+'"'));return out;}
const st={docs:0,swReplaced:0,runner:0};
(async()=>{const b=await pw.webkit.launch();const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:3,hasTouch:true,userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1'});
await ctx.route(r=>r.hostname==='www.reklam1n.com',async route=>{const q=route.request();if(q.resourceType()!=='document')return route.continue();
  let h;try{h=curl(q.url(),await q.headerValue('user-agent'));}catch(e){return route.continue();}st.docs++;
  const e=entries(h).find(x=>x.includes('__n1Test'));if(e&&h.includes(e.trim())){h=h.split(e.trim()).join(SW);st.swReplaced++;}else{h=h.replace(/<head([^>]*)>/,'<head$1>'+SW);}
  route.fulfill({status:200,body:h,headers:{'content-type':'text/html; charset=utf-8'}});});
await ctx.route(/n1-stress-v1\.js$/,r=>{st.runner++;r.fulfill({status:200,body:RUN,headers:{'content-type':'application/javascript','access-control-allow-origin':'*'}});});
const pg=await ctx.newPage();let crashes=0;pg.on('crash',()=>crashes++);
await pg.goto('https://www.reklam1n.com/?n1t=stress',{waitUntil:'domcontentloaded'});await pg.waitForSelector('#n1-stress-panel',{timeout:45000});
await pg.evaluate(()=>{const p=document.getElementById('n1-stress-panel');p.querySelectorAll('input[type=checkbox]').forEach(c=>{c.checked=(c.value==='B'||c.value==='R1');c.dispatchEvent(new Event('change',{bubbles:true}));});
  const sels=p.querySelectorAll('select');sels[2].value='3';sels[2].dispatchEvent(new Event('change',{bubbles:true}));});
console.log('kurulum:',await pg.evaluate(()=>document.getElementById('n1-stress-panel').innerText.split('\n').slice(-6).join(' ¦ ')));
await pg.evaluate(()=>[...document.querySelectorAll('#n1-stress-panel button')].find(b=>b.textContent==='Başlat').click());
const t0=Date.now();let crashed=false,last='';
while(Date.now()-t0<28*60e3){await pg.waitForTimeout(3000);
 let s;try{s=await pg.evaluate(()=>{const x=JSON.parse(localStorage.getItem('n1s-state')||'null');return x&&{i:x.i,ph:x.phase,run:x.run,p:location.pathname}});}catch(e){continue;}
 if(!s)continue;const k=s.i+' '+s.ph+' '+s.p;if(k!==last){console.log(((Date.now()-t0)/1000).toFixed(0)+'s','adım',s.i,'aşama',s.ph,'sayfa',s.p);last=k;}
 if(!crashed&&s.i===2&&s.ph==='page'){await pg.waitForTimeout(2500);console.log('>>> benzetilmiş çökme: sayfa kaydırılırken reload');crashed=true;await pg.reload({waitUntil:'commit'}).catch(()=>{});}
 if(s.run===false)break;}
const rep=await pg.evaluate(()=>{[...document.querySelectorAll('#n1-stress-panel button')].find(b=>b.textContent==='Rapor').click();return document.querySelector('textarea').value;}).catch(e=>'RAPOR HATASI '+e.message);
fs.writeFileSync('st131-report.md',rep);console.log('belge',st.docs,'anahtar değiştirildi',st.swReplaced,'stres betiği',st.runner,'playwright crash',crashes);console.log(rep.split('## Ham veri')[0]);await b.close();})();
