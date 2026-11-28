// KARİYER V1 test yönlendirmesi (Wix'e dokunmadan): canlı Server URL'leri → wix-career-v1/sites yeni sürümleri; herhangi bir SHA'daki
// wix-career-v1/ ve wix-mobile-performance-v14/ yolları → yerel depo. Kariyer adresleri (/insan-kaynaklari, /acik-pozisyonlar, /staj-programlari)
// canlıda henüz yok: istek /kisaca-biz?n1career=<yol> kabuğuna yönlendirilir, o belgede Kısaca Biz betik isteği kariyer modülüne (+ test sarmalayıcısı) gider.
// Kullanım: await require('./routecareer.js')(context, stats, {mode:'new'|'live'})
const fs=require('fs');const path=require('path');const {execFileSync}=require('child_process');const R=path.resolve(__dirname,'..','..')+'/';
const S='wix-career-v1/sites/';
const MAP=[
 [/\/wix-global-stability-v13\/home\/n1-site-wix-v658\.js$/,S+'home/n1-site-wix-v660.js'],
  // canlı V1.4 (@36a24d3) adresleri — 28 Kasım 2026 itibarıyla yayında
 [/\/wix-mobile-performance-v14\/home\/n1-site-wix-v659\.js$/,S+'home/n1-site-wix-v660.js'],
 [/\/wix-mobile-performance-v14\/pages\/wix-kreatif-produksiyon-v24\/n1-kreatif-produksiyon-v24\.js$/,S+'pages/wix-kreatif-produksiyon-v25/n1-kreatif-produksiyon-v25.js'],
 [/\/wix-mobile-performance-v14\/pages\/wix-e-ticaret-yonetimi-v25\/n1-e-ticaret-yonetimi-v25\.js$/,S+'pages/wix-e-ticaret-yonetimi-v26/n1-e-ticaret-yonetimi-v26.js'],
 [/\/wix-mobile-performance-v14\/pages\/wix-sosyal-medya-v28\/n1-sosyal-medya-v28\.js$/,S+'pages/wix-sosyal-medya-v29/n1-sosyal-medya-v29.js'],
 [/\/wix-mobile-performance-v14\/pages\/wix-reklam-yonetimi-v24\/n1-reklam-yonetimi-v24\.js$/,S+'pages/wix-reklam-yonetimi-v25/n1-reklam-yonetimi-v25.js'],
 [/\/wix-mobile-performance-v14\/pages\/wix-uiux-tasarim-v30\/n1-uiux-tasarim-v30\.js$/,S+'pages/wix-uiux-tasarim-v31/n1-uiux-tasarim-v31.js'],
 [/\/wix-mobile-performance-v14\/pages\/wix-yapay-zeka-v3\/n1-yapay-zeka-v3\.js$/,S+'pages/wix-yapay-zeka-v4/n1-yapay-zeka-v4.js'],
 [/\/wix-mobile-performance-v14\/pages\/wix-uygulama-gelistirme-v3\/n1-uygulama-gelistirme-v3\.js$/,S+'pages/wix-uygulama-gelistirme-v4/n1-uygulama-gelistirme-v4.js'],
 [/\/wix-kreatif-produksiyon-v23\/n1-kreatif-produksiyon-v23\.js$/,S+'pages/wix-kreatif-produksiyon-v25/n1-kreatif-produksiyon-v25.js'],
 [/\/wix-e-ticaret-yonetimi-v24\/n1-e-ticaret-yonetimi-v24\.js$/,S+'pages/wix-e-ticaret-yonetimi-v26/n1-e-ticaret-yonetimi-v26.js'],
 [/\/wix-sosyal-medya-v27\/n1-sosyal-medya-v27\.js$/,S+'pages/wix-sosyal-medya-v29/n1-sosyal-medya-v29.js'],
 [/\/wix-reklam-yonetimi-v23\/n1-reklam-yonetimi-v23\.js$/,S+'pages/wix-reklam-yonetimi-v25/n1-reklam-yonetimi-v25.js'],
 [/\/wix-uiux-tasarim-v29\/n1-uiux-tasarim-v29\.js$/,S+'pages/wix-uiux-tasarim-v31/n1-uiux-tasarim-v31.js'],
 [/\/wix-yapay-zeka-v2\/n1-yapay-zeka-v2\.js$/,S+'pages/wix-yapay-zeka-v4/n1-yapay-zeka-v4.js'],
 [/\/wix-uygulama-gelistirme-v2\/n1-uygulama-gelistirme-v2\.js$/,S+'pages/wix-uygulama-gelistirme-v4/n1-uygulama-gelistirme-v4.js'],
 [/\/wix-kisaca-biz-v1\/n1-kisaca-biz-v1\.js$/,S+'pages/wix-kisaca-biz-v2/n1-kisaca-biz-v2.js'],
 [/\/wix-markalar-v1\/n1-markalar-v11\.js$/,S+'pages/wix-markalar-v12/n1-markalar-v12.js'],
 [/\/wix-yasal-sayfalar-v1\/n1-yasal-sayfalar-v1\.js$/,S+'pages/wix-yasal-sayfalar-v2/n1-yasal-sayfalar-v2.js'],
];
const CAREER={'/insan-kaynaklari':'n1-insan-kaynaklari-v1','/acik-pozisyonlar':'n1-acik-pozisyonlar-v1','/staj-programlari':'n1-staj-programlari-v1'};
const CT={'.js':'application/javascript; charset=utf-8','.webp':'image/webp','.css':'text/css'};
function careerShim(tag){return fs.readFileSync(R+'wix-career-v1/pages/n1-career-v1.js','utf8')+
 `\n;/* TEST SARMALAYICISI (yalnız Playwright): Kısaca Biz kabuğundaki öğe kariyer öğesini taşır */(function(){var T=${JSON.stringify(tag)};var st=document.createElement('style');st.textContent='n1-kisaca-biz-v1{display:block}';document.head.appendChild(st);
 if(!customElements.get('n1-kisaca-biz-v1'))customElements.define('n1-kisaca-biz-v1',class extends HTMLElement{connectedCallback(){if(!this.querySelector(T))this.appendChild(document.createElement(T));}});})();`;}
const CDNP='https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@2aa9a9b483e53be78aebcd67f5af54e5ba485f90/';
function cdnShim(tag){return `(function(){var T=${JSON.stringify(tag)};var st=document.createElement('style');st.textContent='n1-kisaca-biz-v1{display:block}';document.head.appendChild(st);
 var s=document.createElement('script');s.src='${CDNP}wix-career-v1/pages/n1-career-v1.js';s.onload=function(){if(!customElements.get('n1-kisaca-biz-v1'))customElements.define('n1-kisaca-biz-v1',class extends HTMLElement{connectedCallback(){if(!this.querySelector(T))this.appendChild(document.createElement(T));}});};document.head.appendChild(s);})();`;}
const cpath=u=>{try{return new URL(u).pathname.replace(/\/+$/,'')||'/';}catch(e){return '';}};
module.exports=async function(ctx,stats,opt){stats=stats||{};opt=opt||{};const NEW=opt.mode!=='live';
 // YALNIZ TEST: kariyer sayfaları canlıda henüz yok; Wix istemci yönlendiricisi bu bağlantıları pushState ile çizmeye çalışıp 404 kabuğu gösterir.
 // Kariyer adreslerine tıklama tam sayfa gezinmesine çevrilir (belge isteği yakalanıp kabuğa yönlendirilebilsin). Diğer bağlantılara dokunulmaz.
 await ctx.addInitScript(()=>{var CR=/^\/(insan-kaynaklari|acik-pozisyonlar|staj-programlari)\/?$/;
  // Chromium: Wix gezinmeyi Navigation API (NavigateEvent.intercept) ya da pushState ile ele geçirir; kariyer adreslerinde bunu kapat (yalnız test)
  try{if(window.NavigateEvent&&NavigateEvent.prototype.intercept){var oi=NavigateEvent.prototype.intercept;NavigateEvent.prototype.intercept=function(o){try{if(CR.test(new URL(this.destination.url).pathname))return;}catch(x){}return oi.call(this,o);};}}catch(x){}
  try{var ops=history.pushState;history.pushState=function(st,t,url){try{var u=new URL(url,location.href);if(u.origin===location.origin&&CR.test(u.pathname)){location.assign(u.href);return;}}catch(x){}return ops.apply(this,arguments);};}catch(x){}
  window.addEventListener('click',function(e){var a=e.target&&e.target.closest&&e.target.closest('a[href]');if(!a)return;var u;try{u=new URL(a.href,location.href);}catch(x){return;}
  if(u.origin===location.origin&&/^\/(insan-kaynaklari|acik-pozisyonlar|staj-programlari)\/?$/.test(u.pathname)){e.preventDefault();e.stopImmediatePropagation();location.assign(u.href);}},true);});
 // Kariyer adresine giden belge isteği: hedef kaydedilir, Wix'in gerçek sayfa kabuğu için /kisaca-biz?n1career=<yol> adresine yönlendirme (Wix sayfayı URL'den seçer)
 await ctx.route(r=>r.hostname==='www.reklam1n.com'&&CAREER[cpath(r.href)]!==undefined,async route=>{
  if(route.request().resourceType()!=='document')return route.continue();
  const cp=cpath(route.request().url());stats['doc:'+cp]=(stats['doc:'+cp]||0)+1;(stats.navs=stats.navs||[]).push(cp);
  route.fulfill({status:200,headers:{'content-type':'text/html; charset=utf-8'},body:'<!doctype html><meta charset=utf-8><script>location.replace('+JSON.stringify('https://www.reklam1n.com/kisaca-biz?n1career='+cp.slice(1))+')</script>'});   /* WebKit 302 ile fulfill desteklemez */});
 await ctx.route(/cdn\.jsdelivr\.net\/gh\/1ndigitalmedia-design\/1n-ronin-assets@[0-9a-f]+\//,route=>{
  const q=route.request(),u=q.url().split('?')[0];let fp='';try{const fu=new URL(q.frame().url());fp=fu.searchParams.get('n1career')?'/'+fu.searchParams.get('n1career'):'';}catch(e){}
  if(/\/wix-kisaca-biz-v1\/n1-kisaca-biz-v1\.js$/.test(u)&&CAREER[fp]){stats['career:'+fp]=(stats['career:'+fp]||0)+1;
   return route.fulfill({status:200,body:opt.cdn?cdnShim(CAREER[fp]):careerShim(CAREER[fp]),headers:{'content-type':CT['.js'],'access-control-allow-origin':'*'}});}
  let f=null;if(NEW)for(const [re,file] of MAP) if(re.test(u)) f=file;
  if(opt.cdn&&f){stats['cdn:'+f]=(stats['cdn:'+f]||0)+1;return route.continue({url:CDNP+f});}   // gerçek CDN testi: yeni dosya jsDelivr'dan (SHA sabit)
  if(opt.cdn&&/\/wix-career-v1\//.test(u)){stats['cdn-direct']=(stats['cdn-direct']||0)+1;return route.continue();}
  const m=/1n-ronin-assets@[0-9a-f]+\/((wix-career-v1|wix-mobile-performance-v14)\/.+)$/.exec(u); if(!f&&m) f=m[1];
  if(!f) return route.continue();
  stats[f]=(stats[f]||0)+1;
  route.fulfill({status:200,body:fs.readFileSync(R+f),headers:{'content-type':CT[path.extname(f)]||'application/octet-stream','access-control-allow-origin':'*'}});});};
module.exports.CAREER=CAREER;
