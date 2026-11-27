// V1.3 senaryo düzeneği. A = canlı HTML aynen. V = V1.3 Wix özel kodu uygulanmış HTML (test anahtarı başta, loader v13, Capa nav yok, menü kapanışı body-end).
const fs=require('fs');const {execFileSync}=require('child_process');const R='/home/user/1n-ronin-assets/';const W=R+'wix-global-stability-v13/';
const MENU='https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@bb6ebc7723625d137035b1074c6dca14c02fb296/wix-global-stability-v13/n1-menu-close-v13.js';
function curl(u,ua){return execFileSync('curl',['-sS','-f','-L','--compressed','--max-time','25','-A',ua||'Mozilla/5.0',u],{maxBuffer:64<<20}).toString('utf8');}
function customEntries(h){const out=[];const re=/\{"id":"[0-9a-f-]+","embedType":"custom",(?:"pages":\[[^\]]*\],)?"position":"(\w+)","loadOnce":\w+,"content":\{"type":"custom","html":"((?:[^"\\]|\\.)*)"/g;let m;while((m=re.exec(h))){const t=h.slice(re.lastIndex,re.lastIndex+20000);const nm=/"name":"((?:[^"\\]|\\.)*)"/.exec(t);out.push({pos:m[1],name:nm?JSON.parse('"'+nm[1]+'"'):'',html:JSON.parse('"'+m[2]+'"')});}return out;}
module.exports=async function(ctx,SC){
  const st={docs:0,nav:0,loader:0,ce:0};ctx.__scen=st;
  const SW=fs.readFileSync(W+'wix-custom-code/TEST-SWITCH-v13-head.html','utf8'),LD=fs.readFileSync(W+'wix-custom-code/LOADER-v13-ozel-yukleniyor.html','utf8');
  await ctx.route(r=>r.hostname==='www.reklam1n.com',async route=>{const q=route.request();if(q.resourceType()!=='document')return route.continue();
    let h;const t0=Date.now();try{h=curl(q.url(),await q.headerValue('user-agent'));}catch(e){st.curlFail=(st.curlFail||0)+1;process.stderr.write('CURL-FAIL '+q.url()+' '+String(e.message).slice(0,120)+'\n');return route.continue();}
    if(Date.now()-t0>5000)process.stderr.write('CURL-SLOW '+(Date.now()-t0)+'ms '+q.url()+'\n');st.docs++;
    if(SC!=='A'){for(const e of customEntries(h)){const t=e.html.trim();if(!h.includes(t))continue;
        if(/Capa Navigasyonu/.test(e.name)){h=h.split(t).join('');st.nav++;}
        else if(/Özel Yükleniyor/.test(e.name)){h=h.split(t).join(LD);st.loader++;}}
      h=h.replace(/<head([^>]*)>/,'<head$1>'+SW);h=h.replace('</body>','<script src="'+MENU+'" defer></script></body>');}
    route.fulfill({status:200,body:h,headers:{'content-type':'text/html; charset=utf-8'}});});
  await ctx.route(/cdn\.jsdelivr\.net\/gh\/1ndigitalmedia-design\/1n-ronin-assets@/,async route=>{const u=route.request().url();let f=null,ct='application/javascript; charset=utf-8';
    let m=/@[0-9a-f]{40}\/(wix-global-stability-v13\/.+)$/.exec(u);if(m)f=R+m[1];
    if(/n1-stability-v1\.1\.1\.js$/.test(u))f=R+'wix-mobile-stability-v1/n1-stability-v1.1.1.js';
    if(!f)return route.continue();if(/\.mp4$/.test(f))ct='video/mp4';st.ce++;
    route.fulfill({status:200,body:fs.readFileSync(f),headers:{'content-type':ct,'access-control-allow-origin':'*'}});});
};
