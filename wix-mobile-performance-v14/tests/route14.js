// V1.4 test yönlendirmesi: canlı Server URL'leri (V1.3) yerel V1.4 dosyalarıyla, V1.4'ün kendi CDN adreslerini (herhangi bir SHA) yerel depo dosyalarıyla yanıtlar.
// Wix'e dokunmadan V1.4'ü canlı sitenin içinde çalıştırır. Kullanım: await require('./route14.js')(context)
const fs=require('fs');const path=require('path');const R=path.resolve(__dirname,'..','..')+'/';
const MAP=[ // canlı (V1.3) dosya adı → V1.4 yerel dosya
 [/\/wix-global-stability-v13\/home\/n1-site-wix-v658\.js$/,'wix-mobile-performance-v14/home/n1-site-wix-v659.js'],
 [/\/wix-kreatif-produksiyon-v23\/n1-kreatif-produksiyon-v23\.js$/,'wix-mobile-performance-v14/pages/wix-kreatif-produksiyon-v24/n1-kreatif-produksiyon-v24.js'],
 [/\/wix-e-ticaret-yonetimi-v24\/n1-e-ticaret-yonetimi-v24\.js$/,'wix-mobile-performance-v14/pages/wix-e-ticaret-yonetimi-v25/n1-e-ticaret-yonetimi-v25.js'],
 [/\/wix-sosyal-medya-v27\/n1-sosyal-medya-v27\.js$/,'wix-mobile-performance-v14/pages/wix-sosyal-medya-v28/n1-sosyal-medya-v28.js'],
 [/\/wix-reklam-yonetimi-v23\/n1-reklam-yonetimi-v23\.js$/,'wix-mobile-performance-v14/pages/wix-reklam-yonetimi-v24/n1-reklam-yonetimi-v24.js'],
 [/\/wix-uiux-tasarim-v29\/n1-uiux-tasarim-v29\.js$/,'wix-mobile-performance-v14/pages/wix-uiux-tasarim-v30/n1-uiux-tasarim-v30.js'],
 [/\/wix-yapay-zeka-v2\/n1-yapay-zeka-v2\.js$/,'wix-mobile-performance-v14/pages/wix-yapay-zeka-v3/n1-yapay-zeka-v3.js'],
 [/\/wix-uygulama-gelistirme-v2\/n1-uygulama-gelistirme-v2\.js$/,'wix-mobile-performance-v14/pages/wix-uygulama-gelistirme-v3/n1-uygulama-gelistirme-v3.js'],
];
const CT={'.js':'application/javascript; charset=utf-8','.webp':'image/webp','.css':'text/css'};
module.exports=async function(ctx,stats){stats=stats||{};ctx.__r14=stats;
 await ctx.route(/cdn\.jsdelivr\.net\/gh\/1ndigitalmedia-design\/1n-ronin-assets@[0-9a-f]+\//,route=>{const u=route.request().url().split('?')[0];let f=null;
  for(const [re,file] of MAP) if(re.test(u)) f=file;
  const m=/1n-ronin-assets@[0-9a-f]+\/(wix-mobile-performance-v14\/.+)$/.exec(u); if(!f&&m) f=m[1];
  if(!f) return route.continue();
  stats[f]=(stats[f]||0)+1;
  route.fulfill({status:200,body:fs.readFileSync(R+f),headers:{'content-type':CT[path.extname(f)]||'application/octet-stream','access-control-allow-origin':'*','cache-control':'max-age=600'}});});};
