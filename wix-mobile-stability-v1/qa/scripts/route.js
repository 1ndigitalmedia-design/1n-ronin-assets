// Routes selected live CDN URLs to local repo files. Config: env N1_ROUTES = JSON [[urlSubstring, absLocalPath], ...]
const fs=require('fs');
module.exports=async function(ctx){
  const map=JSON.parse(process.env.N1_ROUTES||'[]'); const hits={};
  await ctx.route(/cdn\.jsdelivr\.net\/gh\/1ndigitalmedia-design\/1n-ronin-assets@/, async (route)=>{
    const u=route.request().url(); const m=map.find(([s])=>u.includes(s));
    if(!m) return route.continue();
    hits[m[0]]=(hits[m[0]]||0)+1;
    const body=fs.readFileSync(m[1]); const ct=m[1].endsWith('.css')?'text/css':'application/javascript';
    return route.fulfill({status:200,body,headers:{'content-type':ct+'; charset=utf-8','access-control-allow-origin':'*','cache-control':'max-age=600'}});
  });
  ctx.__routeHits=hits;
};
