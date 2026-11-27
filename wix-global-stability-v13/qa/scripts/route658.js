// canlı v657 → yerel v658; v13 video modülü → yerel
const fs=require('fs');const R='/home/user/1n-ronin-assets/';
module.exports=async function(ctx){await ctx.route(/cdn\.jsdelivr\.net\/gh\/1ndigitalmedia-design\/1n-ronin-assets@/,async route=>{const u=route.request().url();let f=null;
 if(/wix-global-menu-v12\/pages\/wix-home-v657\/n1-site-wix-v657\.js$/.test(u))f=R+'wix-global-stability-v13/home/n1-site-wix-v658.js';
 else if(/wix-global-stability-v13\/home\/n1-video-m5-v13\.js$/.test(u))f=R+'wix-global-stability-v13/home/n1-video-m5-v13.js';
 if(!f)return route.continue();route.fulfill({status:200,body:fs.readFileSync(f),headers:{'content-type':'application/javascript; charset=utf-8','access-control-allow-origin':'*'}});});};
