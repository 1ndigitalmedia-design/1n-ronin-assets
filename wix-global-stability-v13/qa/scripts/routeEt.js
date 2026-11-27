// e-ticaret canlı CE adresini yerel v23 ya da v24 dosyasıyla yanıtla
const fs=require('fs');const R='/home/user/1n-ronin-assets/';
const FILES={v23:R+'wix-global-menu-v12/pages/wix-e-ticaret-yonetimi-v23/n1-e-ticaret-yonetimi-v23.js',v24:R+'wix-global-stability-v13/pages/wix-e-ticaret-yonetimi-v24/n1-e-ticaret-yonetimi-v24.js'};
module.exports=async function(ctx,ver,st){await ctx.route(/cdn\.jsdelivr\.net\/gh\/1ndigitalmedia-design\/1n-ronin-assets@[0-9a-f]+\/wix-[a-z0-9-]+\/(pages\/)?wix-e-ticaret-yonetimi-v2[34]\/n1-e-ticaret-yonetimi-v2[34]\.js$/,r=>{if(st)st.hit=(st.hit||0)+1;r.fulfill({status:200,body:fs.readFileSync(FILES[ver]),headers:{'content-type':'application/javascript; charset=utf-8','access-control-allow-origin':'*'}});});};
