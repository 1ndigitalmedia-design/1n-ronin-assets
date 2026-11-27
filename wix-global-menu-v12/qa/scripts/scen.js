// Senaryo düzeneği: A = canlı; B = yeni menü (v12 sayfalar) + özel nav kodları yok; C = B + stabilite v1.1.1
const fs=require('fs');const {execFileSync}=require('child_process');
const R='/home/user/1n-ronin-assets/';
function curl(u,ua){return execFileSync('curl',['-sS','-L','--compressed','-A',ua||'Mozilla/5.0',u],{maxBuffer:64<<20}).toString('utf8');}
function customEntries(h){const out=[];const re=/\{"id":"[0-9a-f-]+","embedType":"custom",(?:"pages":\[[^\]]*\],)?"position":"(\w+)","loadOnce":\w+,"content":\{"type":"custom","html":"((?:[^"\\]|\\.)*)"/g;let m;while((m=re.exec(h))){const nm=/"name":"((?:[^"\\]|\\.)*)"/.exec(h.slice(re.lastIndex,re.lastIndex+600));out.push({pos:m[1],name:nm?JSON.parse('"'+nm[1]+'"'):'',html:JSON.parse('"'+m[2]+'"')});}return out;}
const STAB='https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@LOCALTEST/wix-mobile-stability-v1/n1-stability-v1.1.1.js';
module.exports=async function(ctx,SC,log){
  const stats={docs:0,removed:0,missing:0,ce:0};ctx.__scen=stats;
  await ctx.route(r=>r.hostname==='www.reklam1n.com',async route=>{const q=route.request();if(q.resourceType()!=='document')return route.continue();
    let h=curl(q.url(),await q.headerValue('user-agent'));stats.docs++;
    if(SC!=='A'){for(const e of customEntries(h)){if(!/Capa Navigasyonu|V1\.1 Test Anahtar/.test(e.name))continue;const t=e.html.trim();if(h.includes(t)){h=h.split(t).join('');stats.removed++;}else stats.missing++;}
      if(SC==='C')h=h.replace('</body>','<script src="'+STAB+'" defer></script></body>');}
    route.fulfill({status:200,body:h,headers:{'content-type':'text/html; charset=utf-8'}});});
  await ctx.route(/cdn\.jsdelivr\.net\/gh\/1ndigitalmedia-design\/1n-ronin-assets@/,async route=>{const u=route.request().url();let f=null;
    if(SC!=='A'){
      if(/@f97db8ed[0-9a-f]*\/wix-home-v656\/n1-site-wix-v656\.js/.test(u))f=R+'wix-global-menu-v12/pages/wix-home-v657/n1-site-wix-v657.js';
      let m=/@f97db8ed[0-9a-f]*\/wix-sitewide-mobile-fix-2026-11-26\/(.+\.js)$/.exec(u);if(m)f=R+'wix-global-menu-v12/pages/'+m[1];
      m=/@[0-9a-f]+\/(wix-global-menu-v12\/.+\.js)$/.exec(u);if(m)f=R+m[1];
      if(u===STAB)f=R+'wix-mobile-stability-v1/n1-stability-v1.1.1.js';}
    if(!f)return route.continue();stats.ce++;
    route.fulfill({status:200,body:fs.readFileSync(f),headers:{'content-type':'application/javascript; charset=utf-8','access-control-allow-origin':'*'}});});
};
