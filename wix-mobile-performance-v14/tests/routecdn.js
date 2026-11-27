// CDN gerçek testi: canlı Server URL'leri (V1.3) → jsDelivr'daki V1.4 adresleri (SHA sabit). Hiçbir dosya yerelden sunulmaz; kareler ve
// alt modüller doğrudan CDN'den gelir. = Wix'te Server URL değiştirilmiş hâlin birebir benzetimi.
const C='https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@36a24d3d5af5be5e5493598af4375f070a26b002/wix-mobile-performance-v14/';
const MAP=[[/\/wix-global-stability-v13\/home\/n1-site-wix-v658\.js$/,C+'home/n1-site-wix-v659.js'],
 [/\/wix-kreatif-produksiyon-v23\/n1-kreatif-produksiyon-v23\.js$/,C+'pages/wix-kreatif-produksiyon-v24/n1-kreatif-produksiyon-v24.js'],
 [/\/wix-e-ticaret-yonetimi-v24\/n1-e-ticaret-yonetimi-v24\.js$/,C+'pages/wix-e-ticaret-yonetimi-v25/n1-e-ticaret-yonetimi-v25.js'],
 [/\/wix-sosyal-medya-v27\/n1-sosyal-medya-v27\.js$/,C+'pages/wix-sosyal-medya-v28/n1-sosyal-medya-v28.js'],
 [/\/wix-reklam-yonetimi-v23\/n1-reklam-yonetimi-v23\.js$/,C+'pages/wix-reklam-yonetimi-v24/n1-reklam-yonetimi-v24.js'],
 [/\/wix-uiux-tasarim-v29\/n1-uiux-tasarim-v29\.js$/,C+'pages/wix-uiux-tasarim-v30/n1-uiux-tasarim-v30.js'],
 [/\/wix-yapay-zeka-v2\/n1-yapay-zeka-v2\.js$/,C+'pages/wix-yapay-zeka-v3/n1-yapay-zeka-v3.js'],
 [/\/wix-uygulama-gelistirme-v2\/n1-uygulama-gelistirme-v2\.js$/,C+'pages/wix-uygulama-gelistirme-v3/n1-uygulama-gelistirme-v3.js']];
module.exports=async function(ctx,stats){stats=stats||{};
 await ctx.route(/cdn\.jsdelivr\.net\/gh\/1ndigitalmedia-design\/1n-ronin-assets@[0-9a-f]+\/(wix-global-stability-v13|wix-global-menu-v12)\//,route=>{const u=route.request().url().split('?')[0];
  for(const [re,to] of MAP) if(re.test(u)){stats[to.split('/').pop()]=(stats[to.split('/').pop()]||0)+1;return route.continue({url:to});}
  return route.continue();});};
