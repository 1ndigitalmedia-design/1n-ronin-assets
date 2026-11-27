// V1.3.2 denetleyici doğrulaması (WebKit, iPhone benzeri). Canlı HTML'de test anahtarı v13.2 ile değiştirilir; stres2 betiği yerelden.
const pw=require('playwright');const fs=require('fs');const {execFileSync}=require('child_process');const R='/home/user/1n-ronin-assets/wix-global-stability-v13/';
const SW=fs.readFileSync(R+'wix-custom-code/TEST-SWITCH-v13.2-head.html','utf8');const RUN=fs.readFileSync(R+'stress/n1-stress-v2.js');
const UA='Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.7 Mobile/15E148 Safari/604.1';
function curl(u,ua){return execFileSync('curl',['-sS','-f','-L','--compressed','--max-time','25','-A',ua||UA,u],{maxBuffer:64<<20}).toString('utf8');}
function entries(h){const out=[];const re=/\{"id":"[0-9a-f-]+","embedType":"custom",(?:"pages":\[[^\]]*\],)?"position":"(\w+)","loadOnce":\w+,"content":\{"type":"custom","html":"((?:[^"\\]|\\.)*)"/g;let m;while((m=re.exec(h)))out.push(JSON.parse('"'+m[2]+'"'));return out;}
const log=(...a)=>console.log(new Date().toISOString().slice(11,19),...a);
(async()=>{const b=await pw.webkit.launch();const ctx=await b.newContext({viewport:{width:440,height:956},deviceScaleFactor:3,hasTouch:true,userAgent:UA});
const st={docs:0,sw:0};
await ctx.route(r=>r.hostname==='www.reklam1n.com',async route=>{const q=route.request();if(q.resourceType()!=='document')return route.continue();let h;try{h=curl(q.url());}catch(e){return route.continue();}st.docs++;
  const e=entries(h).find(x=>x.includes('__n1Test'));if(e&&h.includes(e.trim())){h=h.split(e.trim()).join(SW);st.sw++;}else h=h.replace(/<head([^>]*)>/,'<head$1>'+SW);
  route.fulfill({status:200,body:h,headers:{'content-type':'text/html; charset=utf-8'}});});
await ctx.route(/n1-stress-v2\.js$/,r=>r.fulfill({status:200,body:RUN,headers:{'content-type':'application/javascript','access-control-allow-origin':'*'}}));
let pg=await ctx.newPage();let crashes=0;pg.on('crash',()=>crashes++);
await pg.goto('https://www.reklam1n.com/?n1t=stress2',{waitUntil:'domcontentloaded'});await pg.waitForSelector('#n1-stress-panel',{timeout:45000});
// video ön kontrolü
await pg.waitForTimeout(3000);await pg.evaluate(()=>[...document.querySelectorAll('#n1-stress-panel button')].find(b=>/Video kontrol/.test(b.textContent)).click());
await pg.waitForFunction(()=>/Video kontrolü: (?!yapılmadı)/.test(document.getElementById('n1-stress-panel').innerText),{timeout:30000});
log('ön kontrol:',(await pg.evaluate(()=>document.getElementById('n1-stress-panel').innerText.match(/Video kontrolü:.*$/m)[0])).slice(0,160));
// plan: B,RP × reklam × n,e1000 × 1
await pg.evaluate(()=>{const p=document.getElementById('n1-stress-panel');p.querySelectorAll('input[type=checkbox]').forEach(c=>{const on={B:1,'/reklam-yonetimi':1,n:1,e1000:1}[c.value];c.checked=!!on;});
  p.querySelector('select').value='1';p.querySelector('div').dispatchEvent(new Event('change',{bubbles:true}));p.querySelectorAll('input')[0].dispatchEvent(new Event('change',{bubbles:true}));});
await pg.evaluate(()=>[...document.querySelectorAll('#n1-stress-panel button')].find(b=>/Başlat/.test(b.textContent)).click());
const S=()=>pg.evaluate(()=>{const x=JSON.parse(localStorage.getItem('n1s2-state')||'null');return x&&{seq:x.seq,att:x.att,ph:x.phase,rev:x.rev,run:x.run,by:x.by,n:x.plan.length,p:location.pathname,doc:window.__n1Stress2&&window.__n1Stress2.doc}}).catch(()=>null);
const t0=Date.now();let last='',revs=[],done={};let pg2=null,pg3=null,closedAt=0;const docsWriting=new Set();
while(Date.now()-t0<25*60e3){await pg.waitForTimeout(1000).catch(()=>{});const s=await S();if(!s)continue;revs.push(s.rev);docsWriting.add(s.by);
 const k=`${s.seq}.${s.att} ${s.ph} ${s.p}`;if(k!==last){log('durum',k,'rev',s.rev);last=k;}
 // A) zorunlu yeniden yükleme: adım 0, hizmet sayfası etkin
 if(false&&s.seq===0&&s.ph==='page'){await pg.waitForTimeout(2500);done.A=1;log('>>> A: hizmet sayfası etkinken reload');await pg.reload({waitUntil:'commit'}).catch(()=>{});continue;}
 // B) yanlış geçmiş: adım 1, hizmet sayfası — runner'ın geri çağrısı başka sayfaya gitsin
 if(false&&s.seq===1&&s.ph==='page'){done.B=1;log('>>> B: history.back yanlış sayfaya yönlendirilecek');await pg.evaluate(()=>{history.back=function(){location.href='/sosyal-medya';};});continue;}
 // C) beklenmeyen sayfa: adım 2, ana sayfa hazırlanırken
 if(false&&s.seq===2&&s.ph==='home'){done.C=1;log('>>> C: ana sayfa etkinken başka sayfaya gidiliyor');await pg.goto('https://www.reklam1n.com/yapay-zeka',{waitUntil:'commit'}).catch(()=>{});continue;}
 // D) eş zamanlı sekme: adım 3 başında ikinci sekme
 if(false&&s.seq===3&&s.ph==='home'){done.D=1;pg2=await ctx.newPage();await pg2.goto('https://www.reklam1n.com/?n1t=stress2',{waitUntil:'domcontentloaded'});await pg2.waitForSelector('#n1-stress-panel',{timeout:45000}).catch(()=>{});await pg2.waitForTimeout(2000);
   log('>>> D: 2. sekme paneli:',(await pg2.evaluate(()=>document.getElementById('n1-stress-panel').innerText.split('\n').slice(0,2).join(' ¦ ')).catch(e=>'?')).slice(0,140));continue;}
 // E) yarım kalan test: adım 3 hizmet sayfasında 1. sekme kapanır, yeni sekme açılır
 if(!done.E&&s.seq===1&&s.ph==='page'){done.E=1;log('>>> E: aktif sekme kapatılıyor, yeni sekmede bağlantı açılıyor');await pg.close();closedAt=Date.now();
   pg3=await ctx.newPage();pg3.on('crash',()=>crashes++);await pg3.goto('https://www.reklam1n.com/?n1t=stress2',{waitUntil:'domcontentloaded'});pg=pg3;continue;}
 if(s.run===false){log('bitti');break;}}
await pg.waitForTimeout(1500);
const out=await pg.evaluate(()=>({res:JSON.parse(localStorage.getItem('n1s2-res')||'{}'),ev:JSON.parse(localStorage.getItem('n1s2-ev')||'[]'),st:JSON.parse(localStorage.getItem('n1s2-state')||'null')}));
const A=Object.entries(out.res).filter(([k,v])=>v.runId===out.st.runId);
console.log('\n=== DOĞRULAMA');console.log('plan adımı',out.st.plan.length,'deneme kaydı (benzersiz attemptId)',A.length,'bitti',out.st.phase);
A.sort((a,b)=>a[1].tStart-b[1].tStart).forEach(([k,v])=>console.log(' ',k.split('|').slice(1).join('.'),v.v,v.p,v.sc,'→',v.cls,(v.msg||'').slice(0,70),'| home',v.homeNt,'back',v.backNt||'','ats',v.atsReload||0,'video',v.videoOk,(v.homeVid&&v.homeVid.hero)?(v.homeVid.hero.src+' '+v.homeVid.hero.w+'x'+v.homeVid.hero.h+' adv'+v.homeVid.hero.adv):''));
let mono=true;for(let i=1;i<revs.length;i++)if(revs[i]<revs[i-1])mono=false;console.log('rev monoton (örneklenen',revs.length,'):',mono);
const p2doc=pg2?await pg2.evaluate(()=>window.__n1Stress2&&window.__n1Stress2.doc).catch(()=>null):null;
const p2ev=out.ev.filter(e=>e.doc===p2doc).map(e=>e.type);console.log('2. sekme belgesi',p2doc,'olayları',JSON.stringify(p2ev),'durumu yazdı mı:',docsWriting.has(p2doc));
console.log('kapanıştan sonra devralma:',JSON.stringify(out.ev.filter(e=>e.type==='lease-takeover').map(e=>new Date(e.t).toISOString().slice(11,19))),'playwright crash',crashes,'belge',st.docs,'anahtar değişimi',st.sw);
const rep=await pg.evaluate(()=>{[...document.querySelectorAll('#n1-stress-panel button')].find(b=>b.textContent==='Rapor').click();return document.querySelector('textarea').value;}).catch(e=>'RAPOR HATASI '+e.message);
fs.writeFileSync('st132e-report.md',rep);console.log(rep.split('## Olay günlüğü')[0]);await b.close();})();
