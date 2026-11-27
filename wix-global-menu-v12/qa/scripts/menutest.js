// node menutest.js <chromium|webkit>  — senaryo B (yeni menü, özel nav yok)
const pw=require('playwright');const fs=require('fs');const [,,BR='chromium']=process.argv;const B='https://www.reklam1n.com';
const SHOT='/home/user/1n-ronin-assets/wix-global-menu-v12/screenshots/';
const DEV=[['masaustu',{width:1440,height:900},false],['tablet',{width:820,height:1180},true],['tablet-yatay',{width:1180,height:820},true],['mobil',{width:390,height:844},true],['kucuk-mobil',{width:320,height:568},true]];
(async()=>{const b=await pw[BR].launch();const res=[];
for(const [name,vp,touch] of DEV){const o={viewport:vp,hasTouch:touch,deviceScaleFactor:2};if(BR==='chromium'&&touch)o.isMobile=true;
 const ctx=await b.newContext(o);await require('./scen.js')(ctx,'B');const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>{const s=String(e);if(!/Failed to fetch|Load failed|Fetch API|Cross-origin|Transition/.test(s))errs.push(s.slice(0,140))});
 const act=(sel)=>touch?pg.tap(sel):pg.click(sel);
 const T=(n,ok,i)=>{res.push({BR,dev:name,n,ok});console.log(BR,name,ok?'PASS':'FAIL',n,i===undefined?'':JSON.stringify(i))};
 const panel=()=>pg.evaluate(()=>{const p=document.querySelector('.n1h-panel');const hb=[...p.querySelectorAll('.n1h-item')].find(i=>/Hizmetler/.test(i.textContent));const s=document.getElementById(hb.getAttribute('aria-controls'));
   const links=[...s.querySelectorAll('a')];const r=p.getBoundingClientRect();
   return {open:p.hasAttribute('data-open'),subOpen:s.hasAttribute('data-open'),expanded:hb.getAttribute('aria-expanded'),btnTag:hb.tagName,btnH:Math.round(hb.getBoundingClientRect().height),
     links:links.map(a=>a.getAttribute('href')),texts:links.map(a=>a.textContent.trim()),minLinkH:Math.min(...links.map(a=>Math.round(a.getBoundingClientRect().height))),
     subVisible:s.hasAttribute('data-open')&&getComputedStyle(s).visibility!=='hidden'&&getComputedStyle(s).display!=='none'&&s.getBoundingClientRect().height>0,
     panelScrollable:p.scrollHeight>p.clientHeight+1,panelBottom:Math.round(r.bottom),vh:innerHeight,activeEl:(document.activeElement&&document.activeElement.textContent||'').trim().slice(0,20)}});
 try{
  await pg.goto(B+'/',{waitUntil:'domcontentloaded'});await pg.waitForSelector('n1-header .n1h-menu',{state:'visible',timeout:40000});await pg.waitForTimeout(5000);
  await act('n1-header .n1h-menu');await pg.waitForTimeout(800);
  const hiz='.n1h-panel[data-open] .n1h-item:has-text("Hizmetler")';
  let s=await panel();T('Hizmetler bir buton (bağlantı değil), kapalı',s.btnTag==='BUTTON'&&s.expanded==='false'&&!s.subOpen,{tag:s.btnTag,exp:s.expanded});
  await act(hiz);await pg.waitForTimeout(700);s=await panel();
  const exp=['/kreatif-produksiyon','/e-ticaret-yonetimi','/sosyal-medya','/reklam-yonetimi','/ui-ux-tasarim','/yapay-zeka','/uygulama-gelistirme'];
  T('tıklayınca açılır, 7 bağlantı doğru sıra',s.subVisible&&s.expanded==='true'&&JSON.stringify(s.links)===JSON.stringify(exp),{texts:s.texts});
  T('url değişmedi (yönlendirme yok)',new URL(pg.url()).pathname==='/'&&new URL(pg.url()).hash==='',pg.url());
  T('dokunma alanları ≥40 px (başlık / alt bağlantı)',s.btnH>=40&&s.minLinkH>=40,{btn:s.btnH,link:s.minLinkH});
  // son bağlantıya ulaşılabilirlik (gerekirse panel kaydırılır)
  const last=await pg.evaluate(()=>{const a=[...document.querySelectorAll('.n1h-sub[data-open] a')].pop();a.scrollIntoView({block:'nearest'});const r=a.getBoundingClientRect();return {visible:r.top>=0&&r.bottom<=innerHeight+1,top:Math.round(r.top),bottom:Math.round(r.bottom),vh:innerHeight}});
  T('son alt bağlantı ekranda erişilebilir'+(s.panelScrollable?' (panel kaydırılabilir)':''),last.visible,last);
  await pg.evaluate(()=>{const a=document.querySelector('.n1h-sub[data-open] a');a&&a.scrollIntoView({block:'nearest'})});await pg.waitForTimeout(300);
  await pg.screenshot({path:SHOT+`${BR}-${name}-hizmetler-acik.png`});
  await act(hiz);await pg.waitForTimeout(600);s=await panel();T('tekrar tıklayınca kapanır',!s.subOpen&&s.expanded==='false');
  // İK hâlâ çalışıyor
  await act('.n1h-panel[data-open] .n1h-item:has-text("İnsan Kaynakları")');await pg.waitForTimeout(600);
  const ik=await pg.evaluate(()=>[...document.querySelectorAll('.n1h-sub[data-open] a')].map(a=>a.getAttribute('href')));T('İnsan Kaynakları alt menüsü korunuyor',JSON.stringify(ik)===JSON.stringify(['/ekibimize-katil','/acik-pozisyonlar']),ik);
  // klavye
  await pg.keyboard.press('Escape');await pg.waitForTimeout(300);await pg.keyboard.press('Escape');await pg.waitForTimeout(500);s=await panel();T('Escape ×2: alt menü sonra menü kapanır',!s.open,{open:s.open});
  await pg.focus('n1-header .n1h-menu');await pg.keyboard.press('Enter');await pg.waitForTimeout(700);
  await pg.keyboard.press('ArrowDown');await pg.waitForTimeout(150);s=await panel();T('klavye: Enter menüyü açar, ↓ Hizmetler\'e gelir',s.open&&/Hizmetler/.test(s.activeEl),{focus:s.activeEl});
  await pg.keyboard.press('Enter');await pg.waitForTimeout(500);s=await panel();T('klavye: Enter alt menüyü açar',s.subOpen&&s.expanded==='true');
  await pg.keyboard.press('Escape');await pg.waitForTimeout(300);s=await panel();T('klavye: Escape alt menüyü kapatır, odak başlıkta',!s.subOpen&&s.open&&/Hizmetler/.test(s.activeEl),{focus:s.activeEl});
  if(!touch){await pg.keyboard.press('Escape');await pg.waitForTimeout(400);await pg.click('n1-header .n1h-menu');await pg.waitForTimeout(700);await pg.hover(hiz);await pg.waitForTimeout(400);s=await panel();T('masaüstü: fareyle üzerine gelince açılır',s.subOpen);
    await pg.click(hiz);await pg.waitForTimeout(300);s=await panel();T('masaüstü: üzerine gelinmiş menüye tıklama sabitler (açık kalır)',s.subOpen);
    await pg.click(hiz);await pg.waitForTimeout(300);s=await panel();T('masaüstü: ikinci tıklama kapatır',!s.subOpen);await pg.click(hiz);await pg.waitForTimeout(400);}
  else {await pg.keyboard.press('Enter');await pg.waitForTimeout(400);}
  // standart bağlantıyla gezinme
  await Promise.all([pg.waitForURL('**/ui-ux-tasarim',{waitUntil:'commit',timeout:30000}),act('.n1h-sub[data-open] a[href="/ui-ux-tasarim"]')]);
  await pg.waitForSelector('n1-header .n1h-menu',{state:'visible',timeout:40000});await pg.waitForTimeout(5000);T('alt bağlantı → /ui-ux-tasarim (standart gezinme)',new URL(pg.url()).pathname==='/ui-ux-tasarim');
  await act('n1-header .n1h-menu');await pg.waitForTimeout(700);await act(hiz);await pg.waitForTimeout(600);
  if(name==='mobil')await pg.screenshot({path:SHOT+`${BR}-${name}-ic-sayfa-hizmetler-acik.png`});
  await Promise.all([pg.waitForURL('**/yapay-zeka',{waitUntil:'commit',timeout:30000}),act('.n1h-sub[data-open] a[href="/yapay-zeka"]')]);await pg.waitForTimeout(6000);
  T('iç sayfa menüsünden → /yapay-zeka',new URL(pg.url()).pathname==='/yapay-zeka');
  await pg.goBack({waitUntil:'commit'});await pg.waitForTimeout(6000);T('geri → /ui-ux-tasarim',new URL(pg.url()).pathname==='/ui-ux-tasarim');
  await pg.goForward({waitUntil:'commit'});await pg.waitForTimeout(6000);T('ileri → /yapay-zeka',new URL(pg.url()).pathname==='/yapay-zeka');
  const hdr=await pg.evaluate(()=>{const l=document.querySelector('n1-header .n1h-logo'),m=document.querySelector('n1-header .n1h-menu');const v=e=>!!e&&e.getBoundingClientRect().height>0;return v(l)&&v(m)});T('header/logo/MENU görünür',hdr);
  // eski URL standart davranış
  await pg.goto(B+'/#hizmetler-ozet',{waitUntil:'domcontentloaded'});await pg.waitForTimeout(12000);
  const old=await pg.evaluate(()=>{const t=document.getElementById('hizmetler-ozet');return {exists:!!t,top:t?Math.round(t.getBoundingClientRect().top):null,y:Math.round(scrollY),hash:location.hash,nav:typeof window.__n1Nav}});
  T('eski /#hizmetler-ozet adresi açılıyor (standart tarayıcı davranışı, bilgi)',old.exists&&old.nav==='undefined',old);
 }catch(e){T('EXCEPTION',false,e.message.slice(0,200))}
 T('1N kaynaklı sayfa hatası yok',errs.length===0,errs.slice(0,3));await ctx.close();}
fs.writeFileSync('menutest-'+BR+'.json',JSON.stringify(res,null,1));console.log(BR,'SONUÇ',res.filter(r=>r.ok).length+'/'+res.length);await b.close();})();
