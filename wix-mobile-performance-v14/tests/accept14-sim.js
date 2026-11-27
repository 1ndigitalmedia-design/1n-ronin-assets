// V1.4 kabul testinin Playwright benzetimi: canlı HTML'deki test anahtarı girişi v14 ile değiştirilir, CE Server URL'leri route14 ile V1.4'e yönlenir
// (= V1.4 üretim yapılandırması), kabul betiği yerelden. Tek bağlantı ?n1t=kabul14, hiçbir tıklama yok. node accept14-sim.js <webkit|chromium> [out.md]
const pw=require('playwright');const fs=require('fs');const {execFileSync}=require('child_process');const R='/home/user/1n-ronin-assets/wix-mobile-performance-v14/';
const [,,BR='webkit',OUT=R+'qa/accept/accept14-sim-webkit.md']=process.argv;
const SW=fs.readFileSync(R+'wix-custom-code/TEST-SWITCH-v14-head.html','utf8');
const UA='Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.7 Mobile/15E148 Safari/604.1';
function curl(u){return execFileSync('curl',['-sS','-f','-L','--compressed','--max-time','25','-A',UA,u],{maxBuffer:64<<20}).toString('utf8');}
function entries(h){const out=[];const re=/\{"id":"[0-9a-f-]+","embedType":"custom",(?:"pages":\[[^\]]*\],)?"position":"(\w+)","loadOnce":\w+,"content":\{"type":"custom","html":"((?:[^"\\]|\\.)*)"/g;let m;while((m=re.exec(h)))out.push(JSON.parse('"'+m[2]+'"'));return out;}
const log=(...a)=>console.log(new Date().toISOString().slice(11,19),...a);
(async()=>{const b=await pw[BR].launch(BR==='chromium'?{args:['--autoplay-policy=no-user-gesture-required']}:{});const o={viewport:{width:390,height:844},deviceScaleFactor:3,hasTouch:true,userAgent:UA};if(BR==='chromium')o.isMobile=true;
const ctx=await b.newContext(o);const st={docs:0,sw:0};const r14={};await require('./route14.js')(ctx,r14);
await ctx.route(r=>r.hostname==='www.reklam1n.com',async route=>{const q=route.request();if(q.resourceType()!=='document')return route.continue();let h;try{h=curl(q.url());}catch(e){return route.continue();}st.docs++;
  const e=entries(h).find(x=>x.includes('__n1Test'));if(e&&h.includes(e.trim())){h=h.split(e.trim()).join(SW);st.sw++;}else h=h.replace(/<head([^>]*)>/,'<head$1>'+SW);
  route.fulfill({status:200,body:h,headers:{'content-type':'text/html; charset=utf-8'}});});
let pg=await ctx.newPage();let crashes=0;pg.on('crash',()=>crashes++);
const t0=Date.now();await pg.goto('https://www.reklam1n.com/?n1t=kabul14',{waitUntil:'domcontentloaded'});
const S=()=>pg.evaluate(()=>{const x=JSON.parse(localStorage.getItem('n1k4-state')||'null');return x&&{seq:x.seq,att:x.att,ph:x.phase,rev:x.rev,run:x.run,n:x.plan.length,p:location.pathname}}).catch(()=>null);
let last='',started=0;
while(Date.now()-t0<30*60e3){await pg.waitForTimeout(1000).catch(()=>{});const s=await S();if(!s)continue;if(!started){started=Date.now();log('otomatik başladı, açılıştan',((started-t0)/1000).toFixed(0),'sn sonra · plan',s.n);}
 const k=`${s.seq}.${s.att} ${s.ph} ${s.p}`;if(k!==last){log('durum',k,'rev',s.rev);last=k;}if(s.run===false){log('bitti');break;}}
await pg.waitForTimeout(1500);
const rep=await pg.evaluate(()=>{[...document.querySelectorAll('#n1-stress-panel button')].find(b=>b.textContent==='Rapor').click();return document.querySelector('textarea').value;}).catch(e=>'RAPOR HATASI '+e.message);
fs.mkdirSync(require('path').dirname(OUT),{recursive:true});
const head=`<!-- Playwright ${BR} benzetimi (iPhone değil), ${new Date().toISOString()} · bağlantıdan bitişe ${((Date.now()-t0)/60000).toFixed(1)} dk · belge ${st.docs} · anahtar değişimi ${st.sw} · V1.4 yönlendirme ${JSON.stringify(r14)} · playwright crash ${crashes} -->\n`;
fs.writeFileSync(OUT,head+rep);console.log(head);console.log(rep.split('## Olay günlüğü')[0]);await b.close();})();
