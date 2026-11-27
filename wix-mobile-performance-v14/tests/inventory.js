// V1.4 P09 — canlı medya envanteri (Chromium; ağ boyutları CDP ile). node inventory.js [out.json] [pages,comma] [routeModule]
// Her sayfa × profil: CE etiketi, 1N betik adresleri, video/görsel öğeleri, sona kadar kademeli kaydırma sonrası gerçek medya istekleri (tür, adet, aktarım boyutu).
const pw=require('playwright');const fs=require('fs');
const OUT=process.argv[2]||'inventory.json';
const PAGES=(process.argv[3]||'/,/kisaca-biz,/kreatif-produksiyon,/e-ticaret-yonetimi,/sosyal-medya,/reklam-yonetimi,/ui-ux-tasarim,/yapay-zeka,/uygulama-gelistirme,/markalar,/reklam-ajansi,/1n,/iletisim,/kvkk-aydinlatma-metni,/cerez-politikasi,/kullanim-kosullari,/gizlilik,/veri-sahibi-basvuru-formu,/dijital-pazarlama,/google-reklam-yonetimi,/facebook-reklam-yonetimi,/instagram-reklam-yonetimi,/tiktok-reklam-yonetimi,/cgi-reklamlar,/marka-danismanligi,/online-ticaret-yonetimi,/sosyal-medya-yonetimi,/web-tasarim-ve-yazilim-programlama,/ucretsiz-analiz').split(',');
const ROUTE=process.argv[4]||null;
const PROFILES={
 mobil:{viewport:{width:390,height:844},deviceScaleFactor:3,isMobile:true,hasTouch:true,userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.7 Mobile/15E148 Safari/604.1'},
 tablet_yatay:{viewport:{width:1180,height:820},deviceScaleFactor:2,isMobile:true,hasTouch:true,userAgent:'Mozilla/5.0 (iPad; CPU OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.7 Mobile/15E148 Safari/604.1'},
 masaustu:{viewport:{width:1440,height:900},deviceScaleFactor:1}
};
const ONLY=(process.env.PROFILES||'mobil,tablet_yatay,masaustu').split(',');
(async()=>{const b=await pw.chromium.launch({args:['--autoplay-policy=no-user-gesture-required']});const out=[];
for(const P of PAGES)for(const pr of ONLY){const ctx=await b.newContext(PROFILES[pr]);if(ROUTE)await require(ROUTE)(ctx);const pg=await ctx.newPage();
 const req=[];const cdp=await ctx.newCDPSession(pg);await cdp.send('Network.enable');const meta={};
 cdp.on('Network.responseReceived',e=>{meta[e.requestId]={url:e.response.url,type:e.type,mime:e.response.mimeType,status:e.response.status};});
 cdp.on('Network.loadingFinished',e=>{const m=meta[e.requestId];if(m){m.bytes=e.encodedDataLength;req.push(m);}});
 cdp.on('Network.loadingFailed',e=>{const m=meta[e.requestId]||{};req.push(Object.assign(m,{failed:e.errorText,canceled:e.canceled,type:m.type||e.type}));});
 const rec={page:P,profile:pr};
 try{const r=await pg.goto('https://www.reklam1n.com'+P,{waitUntil:'domcontentloaded',timeout:60000});rec.status=r&&r.status();await pg.waitForTimeout(9000);
  const H=await pg.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<=H;y+=400){await pg.evaluate(y=>scrollTo(0,y),y);await pg.waitForTimeout(180);}
  await pg.waitForTimeout(2500);
  Object.assign(rec,await pg.evaluate(()=>{
   const ce=[...document.querySelectorAll('*')].filter(e=>/^n1-/.test(e.localName)).map(e=>e.localName);
   const scripts=[...document.scripts].map(s=>s.src).filter(s=>/1n-ronin-assets@/.test(s)).map(s=>s.split('1n-ronin-assets@')[1]);
   const vids=[...document.querySelectorAll('video')].map(v=>{const r=v.getBoundingClientRect();return{cls:(v.className||'').toString().slice(0,40),src:(v.currentSrc||v.getAttribute('src')||(v.querySelector('source')||{}).src||v.getAttribute('data-src')||'').slice(0,160),preload:v.preload,autoplay:v.autoplay,loop:v.loop,muted:v.muted,rs:v.readyState,w:v.videoWidth,h:v.videoHeight,dur:+(v.duration||0).toFixed(1),paused:v.paused,boxW:Math.round(r.width),boxH:Math.round(r.height),top:Math.round(r.top+scrollY)}});
   const imgs=[...document.images].filter(i=>i.currentSrc&&!/^data:/.test(i.currentSrc)).map(i=>({src:i.currentSrc.slice(0,170),nw:i.naturalWidth,nh:i.naturalHeight,dw:Math.round(i.getBoundingClientRect().width),dh:Math.round(i.getBoundingClientRect().height),loading:i.loading,hasWH:i.hasAttribute('width')&&i.hasAttribute('height')}));
   const css=[...document.styleSheets].length;const st=window.ScrollTrigger?ScrollTrigger.getAll().length:0;
   return{ce:[...new Set(ce)],scripts:[...new Set(scripts)],videos:vids,images:imgs,scrollTriggers:st,dom:document.getElementsByTagName('*').length,height:document.documentElement.scrollHeight};}));
 }catch(e){rec.error=String(e.message).slice(0,120);}
 const media=req.filter(r=>r.type==='Media'||/video\/|\.mp4/.test(r.mime||r.url||''));const img=req.filter(r=>r.type==='Image');
 rec.net={media:media.map(m=>({url:(m.url||'').slice(0,170),bytes:m.bytes||0,status:m.status,failed:m.failed})),mediaCount:new Set(media.map(m=>(m.url||'').split('?')[0])).size,mediaBytes:media.reduce((a,m)=>a+(m.bytes||0),0),
  imageCount:img.length,imageBytes:img.reduce((a,m)=>a+(m.bytes||0),0),totalBytes:req.reduce((a,m)=>a+(m.bytes||0),0),requests:req.length};
 out.push(rec);console.log(P.padEnd(36),pr.padEnd(13),'st',rec.status,'ce',(rec.ce||[]).join(',').slice(0,40),'| video el',(rec.videos||[]).length,'| medya istek',rec.net.mediaCount,(rec.net.mediaBytes/1048576).toFixed(1)+'MB','| görsel',rec.net.imageCount,(rec.net.imageBytes/1048576).toFixed(1)+'MB','| toplam',(rec.net.totalBytes/1048576).toFixed(1)+'MB',rec.error||'');
 await ctx.close();}
fs.writeFileSync(OUT,JSON.stringify(out,null,1));await b.close();})();
