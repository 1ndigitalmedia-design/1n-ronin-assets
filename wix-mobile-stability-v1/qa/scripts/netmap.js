const {chromium}=require('playwright');
const pages=['/', '/kreatif-produksiyon','/e-ticaret-yonetimi','/sosyal-medya','/reklam-yonetimi','/ui-ux-tasarim','/yapay-zeka','/uygulama-gelistirme','/markalar','/kisaca-biz','/n1-full-test','/kvkk-aydinlatma-metni'];
(async()=>{
 const b=await chromium.launch();
 const out={};
 for(const p of pages){
  const ctx=await b.newContext({viewport:{width:390,height:844},userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',isMobile:true,hasTouch:true});
  const pg=await ctx.newPage(); const reqs=[];const errs=[];const fails=[];
  pg.on('request',r=>{const u=r.url(); if(/jsdelivr|githack|cdnjs|unpkg|gsap|1n-ronin|\.mp4|video\.wixstatic/.test(u)) reqs.push(r.resourceType()+' '+u)});
  pg.on('pageerror',e=>errs.push(String(e).slice(0,300)));
  pg.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text().slice(0,300))});
  pg.on('requestfailed',r=>fails.push(r.url().slice(0,200)+' '+(r.failure()||{}).errorText));
  let resp; try{resp=await pg.goto('https://www.reklam1n.com'+p,{waitUntil:'load',timeout:60000});}catch(e){errs.push('goto '+e.message)}
  await pg.waitForTimeout(6000);
  await pg.evaluate(()=>window.scrollTo(0,document.body.scrollHeight/2)); await pg.waitForTimeout(2500);
  const info=await pg.evaluate(()=>{
    const tags=[...document.querySelectorAll('*')].map(e=>e.tagName.toLowerCase()).filter(t=>t.includes('-')&&!t.startsWith('wix-')&&customElements.get(t));
    const ce=[...new Set(tags)];
    const attrs={};document.querySelectorAll(ce.join(',')||'nope').forEach(e=>{if(e.attributes.length)attrs[e.tagName.toLowerCase()]=[...e.attributes].map(a=>a.name+'='+a.value).join(' | ')});
    return {url:location.href,title:document.title,ce,attrs,videos:document.querySelectorAll('video').length,gsap:window.gsap&&gsap.version,st:window.ScrollTrigger&&ScrollTrigger.getAll().length,scripts:[...document.scripts].map(s=>s.src).filter(s=>/jsdelivr|cdnjs|unpkg/.test(s))};
  });
  out[p]={status:resp&&resp.status(),final:info.url,info,reqs:[...new Set(reqs)],errs:errs.slice(0,30),fails:fails.slice(0,30)};
  console.error(p,'done',info.ce.join(','));
  await ctx.close();
 }
 require('fs').writeFileSync('netmap.json',JSON.stringify(out,null,1));
 await b.close();
})();
