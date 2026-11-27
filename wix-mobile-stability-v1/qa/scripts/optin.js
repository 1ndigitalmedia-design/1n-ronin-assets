// node optin.js <chromium|webkit>
const pw=require('playwright');const fs=require('fs');const {execFileSync}=require('child_process');const [,,BR='chromium']=process.argv;
const D='/home/user/1n-ronin-assets/wix-mobile-stability-v1/wix-custom-code/';
const strip=f=>fs.readFileSync(D+f,'utf8').replace(/<!--[\s\S]*?-->\n?/g,'');
const LIVE=JSON.parse(fs.readFileSync('/home/user/1n-ronin-assets/wix-mobile-stability-v1/qa/results/wix-custom-code-live.json')).find(c=>/Capa/.test(c.name)).html;
function curl(u,ua){return execFileSync('curl',['-sS','-L','--compressed','-A',ua,u],{maxBuffer:64<<20}).toString('utf8');}
async function ctxWith(b,head,body){const o={viewport:{width:390,height:844},hasTouch:true};if(BR==='chromium')o.isMobile=true;const ctx=await b.newContext(o);
 await ctx.route(r=>r.hostname==='www.reklam1n.com',async(route)=>{const q=route.request();if(q.resourceType()!=='document')return route.continue();
  let h=curl(q.url(),await q.headerValue('user-agent'));const had=h.includes(LIVE.trim());h=h.replace(LIVE.trim(),body.trim());if(head)h=h.replace('<head>','<head>'+head);
  if(!had)console.log('  UYARI: canlı özel kod bloğu HTML içinde bulunamadı',q.url());
  route.fulfill({status:200,body:h,headers:{'content-type':'text/html; charset=utf-8'}});});return ctx;}
const st=pg=>pg.evaluate(()=>({nav:window.__n1Nav&&(window.__n1Nav.version||'pending'),stab:window.__n1Stability?(window.__n1Stability.version+(window.__n1Stability.active?'':'(pasif)')):'-',flag:sessionStorage.getItem('n1-v11')}));
(async()=>{const b=await pw[BR].launch();const res=[];const T=(n,ok,i)=>{res.push(ok);console.log(BR,ok?'PASS':'FAIL',n,JSON.stringify(i))};
 let ctx=await ctxWith(b,strip('03-test-switch-head.html'),strip('04-test-switch-body-end.html'));let pg=await ctx.newPage();
 await pg.goto('https://www.reklam1n.com/',{waitUntil:'domcontentloaded'});await pg.waitForTimeout(12000);let s=await st(pg);T('test anahtarı, normal ziyaretçi = canlı (nav 1.0.1, stabilite yok)',s.nav==='1.0.1'&&s.stab==='-'&&!s.flag,s);
 await pg.goto('https://www.reklam1n.com/?n1v11=1',{waitUntil:'domcontentloaded'});await pg.waitForTimeout(12000);s=await st(pg);T('?n1v11=1 → nav 1.0.3 + stabilite 1.1.0',s.nav==='1.0.3'&&s.stab==='1.1.0'&&s.flag==='1',s);
 await Promise.all([pg.waitForURL('**/kreatif-produksiyon',{waitUntil:'commit'}),pg.evaluate(()=>document.querySelector('a[href="/kreatif-produksiyon"]').click())]);await pg.waitForTimeout(9000);s=await st(pg);T('hizmet sayfasına geçişte açık kalır',s.nav==='1.0.3'&&s.stab==='1.1.0',s);
 await pg.goBack({waitUntil:'commit'});await pg.waitForTimeout(10000);s=await st(pg);T('geri dönüşte açık kalır',s.nav==='1.0.3'&&s.stab==='1.1.0',s);
 await pg.goto('https://www.reklam1n.com/sosyal-medya?n1v11=0',{waitUntil:'domcontentloaded'});await pg.waitForTimeout(9000);s=await st(pg);T('?n1v11=0 → canlı davranışa döner',s.nav==='1.0.1'&&s.stab==='-'&&!s.flag,s);
 await ctx.close();
 ctx=await ctxWith(b,strip('01-production-head.html'),strip('02-production-body-end.html'));pg=await ctx.newPage();
 await pg.goto('https://www.reklam1n.com/',{waitUntil:'domcontentloaded'});await pg.waitForTimeout(12000);s=await st(pg);T('üretim yapılandırması (01+02): nav 1.0.3 + stabilite 1.1.0',s.nav==='1.0.3'&&s.stab==='1.1.0',s);
 await pg.goto('https://www.reklam1n.com/intelligence',{waitUntil:'domcontentloaded'}).catch(()=>{});await pg.waitForTimeout(6000);s=await st(pg);T('üretim: /intelligence kapsam dışı (pasif)',/pasif/.test(s.stab)&&s.nav==='1.0.3',s);
 await ctx.close();
 ctx=await ctxWith(b,'',strip('05-rollback-body-end.html'));pg=await ctx.newPage();
 await pg.goto('https://www.reklam1n.com/',{waitUntil:'domcontentloaded'});await pg.waitForTimeout(12000);s=await st(pg);T('geri dönüş (05): nav 1.0.1, stabilite yok',s.nav==='1.0.1'&&s.stab==='-',s);
 console.log(BR,'SONUÇ',res.filter(Boolean).length+'/'+res.length);await b.close();})();
