// node navorder.js <chromium|webkit>
const pw=require('playwright');const {execFileSync}=require('child_process');
function curl(u,ua){return execFileSync('curl',['-sS','-L','--compressed','-A',ua,u],{maxBuffer:64<<20});}const fs=require('fs');const [,,BR='chromium']=process.argv;
const OLD='b35d9875ac0e3288c8a8d953428574bdf42a5b61/wix-home-v648/modules/n1-nav-v1.js';
const NEWURL='https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@TESTV11/wix-mobile-stability-v1/n1-nav-v1.0.3.js';
const NEWSRC=fs.readFileSync('/home/user/1n-ronin-assets/wix-mobile-stability-v1/n1-nav-v1.0.3.js');
const GUARD="<script>window.__n1Nav=window.__n1Nav||{pending:'1.0.3'};</script>";
const SC=[ // name, guard, newDelay, oldDelay, newFail, expect
 ['A guard, gecikme yok',1,0,0,0,'1.0.3'],
 ['B guard, YENİ nav 6 sn gecikmeli (eski önce gelir)',1,6000,0,0,'1.0.3'],
 ['C guard YOK, YENİ nav 6 sn gecikmeli',0,6000,0,0,'?'],
 ['D guard, ESKİ nav 6 sn gecikmeli',1,0,6000,0,'1.0.3'],
 ['E guard YOK, gecikme yok',0,0,0,0,'?'],
 ['F guard, YENİ nav yüklenemiyor (404)',1,0,0,1,'none'],
 ['G guard, YENİ 3 sn + ESKİ 0 sn, masaüstü',1,3000,0,0,'1.0.3','desktop'],
];
(async()=>{const b=await pw[BR].launch();const out=[];
for(const [name,guard,nd,od,nf,expect,dev] of SC){
 const desk=dev==='desktop';const o={viewport:desk?{width:1440,height:900}:{width:390,height:844},hasTouch:!desk};if(BR==='chromium'&&!desk)o.isMobile=true;
 const ctx=await b.newContext(o);const order=[];
 await ctx.route(/^https:\/\/www\.reklam1n\.com\/(\?.*)?$/,async r=>{const ua=await r.request().headerValue('user-agent');let h=curl(r.request().url(),ua).toString('utf8');
   const n=(h.match(new RegExp(OLD.replace(/[.*+?^${}()|[\]\\\/]/g,'\\$&'),'g'))||[]).length;
   // replace only the parser-inserted custom code <script src> tag (escaped JSON copy stays for Wix data)
   h=h.replace('<script src="https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@'+OLD+'" defer></script>','<script src="'+NEWURL+'" defer></script>');
   if(guard)h=h.replace('<head>','<head>'+GUARD);
   r.fulfill({status:200,body:h,headers:{'content-type':'text/html; charset=utf-8'}});});
 await ctx.route(u=>u.href.includes(OLD),async r=>{order.push('old-req@'+Date.now());if(od)await new Promise(x=>setTimeout(x,od));const body=curl(r.request().url(),'Mozilla/5.0');order.push('old-served');r.fulfill({status:200,body,headers:{'content-type':'application/javascript','access-control-allow-origin':'*'}});});
 await ctx.route(NEWURL,async r=>{order.push('new-req');if(nd)await new Promise(x=>setTimeout(x,nd));if(nf)return r.fulfill({status:404,body:'nf'});order.push('new-served');r.fulfill({status:200,body:NEWSRC,headers:{'content-type':'application/javascript','access-control-allow-origin':'*'}});});
 const pg=await ctx.newPage();await pg.goto('https://www.reklam1n.com/',{waitUntil:'domcontentloaded',timeout:60000});await pg.waitForTimeout(16000);
 const st=await pg.evaluate(()=>({v:window.__n1Nav&&(window.__n1Nav.version||(window.__n1Nav.pending?'pending':'?')),conflict:window.__n1NavConflict||null,tagNew:!!document.querySelector('script[src*="n1-nav-v1.0.3"]')}));
 let func='-';
 if(st.v&&st.v!=='pending'){try{await pg.click('n1-header .n1h-menu',{timeout:15000});await pg.waitForTimeout(700);await pg.click('.n1h-panel[data-open] a.n1h-item[href*="hizmetler-ozet"]',{timeout:8000});await pg.waitForTimeout(2500);
   func=await pg.evaluate(()=>{const t=document.getElementById('hizmetler-ozet').getBoundingClientRect();const h=document.querySelector('n1-header');const hb=(h.querySelector('.n1h-bar')||h).getBoundingClientRect().bottom;return Math.abs(t.top-hb-12)<=6?'çapa OK top='+Math.round(t.top):'çapa SAPMA top='+Math.round(t.top)+' hb='+Math.round(hb)});}catch(e){func='ERR '+e.message.slice(0,60)}}
 const ok=expect==='?'?true:(expect==='none'?st.v==='pending':st.v===expect);
 const rec={BR,name,expect,active:st.v,conflict:st.conflict,func,order:order.map(x=>x.replace(/@\d+/,'')).join('>')};out.push(rec);
 console.log(BR,expect==='?'?'BİLGİ':(ok?'PASS':'FAIL'),name,'→ etkin:',st.v,st.conflict?'çakışma:'+JSON.stringify(st.conflict):'',func);
 await ctx.close();}
fs.writeFileSync('navorder-'+BR+'.json',JSON.stringify(out,null,1));await b.close();})();
