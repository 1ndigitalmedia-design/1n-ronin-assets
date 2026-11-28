// KARİYER V1 test yönlendirmesi (Wix'e dokunmadan): canlı Server URL'leri → wix-career-v1/sites yeni sürümleri; herhangi bir SHA'daki
// wix-career-v1/ ve wix-mobile-performance-v14/ yolları → yerel depo. Kariyer adresleri (/insan-kaynaklari, /acik-pozisyonlar, /staj-programlari)
// canlıda henüz yok: istek /kisaca-biz?n1career=<yol> kabuğuna yönlendirilir, o belgede Kısaca Biz betik isteği kariyer modülüne (+ test sarmalayıcısı) gider.
// Kullanım: await require('./routecareer.js')(context, stats, {mode:'new'|'live'})
const fs=require('fs');const path=require('path');const {execFileSync}=require('child_process');const R=path.resolve(__dirname,'..','..')+'/';
const S='wix-global-shell-v1/sites/';
const MAP=[
 [/\/wix-global-stability-v13\/home\/n1-site-wix-v658\.js$/,S+'home/n1-site-wix-v661.js'],
  // canlı V1.4 (@36a24d3) adresleri — 28 Kasım 2026 itibarıyla yayında
 [/\/wix-mobile-performance-v14\/home\/n1-site-wix-v659\.js$/,S+'home/n1-site-wix-v661.js'],
 [/\/wix-mobile-performance-v14\/pages\/wix-kreatif-produksiyon-v24\/n1-kreatif-produksiyon-v24\.js$/,S+'pages/wix-kreatif-produksiyon-v26/n1-kreatif-produksiyon-v26.js'],
 [/\/wix-mobile-performance-v14\/pages\/wix-e-ticaret-yonetimi-v25\/n1-e-ticaret-yonetimi-v25\.js$/,S+'pages/wix-e-ticaret-yonetimi-v27/n1-e-ticaret-yonetimi-v27.js'],
 [/\/wix-mobile-performance-v14\/pages\/wix-sosyal-medya-v28\/n1-sosyal-medya-v28\.js$/,S+'pages/wix-sosyal-medya-v30/n1-sosyal-medya-v30.js'],
 [/\/wix-mobile-performance-v14\/pages\/wix-reklam-yonetimi-v24\/n1-reklam-yonetimi-v24\.js$/,S+'pages/wix-reklam-yonetimi-v26/n1-reklam-yonetimi-v26.js'],
 [/\/wix-mobile-performance-v14\/pages\/wix-uiux-tasarim-v30\/n1-uiux-tasarim-v30\.js$/,S+'pages/wix-uiux-tasarim-v32/n1-uiux-tasarim-v32.js'],
 [/\/wix-mobile-performance-v14\/pages\/wix-yapay-zeka-v3\/n1-yapay-zeka-v3\.js$/,S+'pages/wix-yapay-zeka-v5/n1-yapay-zeka-v5.js'],
 [/\/wix-mobile-performance-v14\/pages\/wix-uygulama-gelistirme-v3\/n1-uygulama-gelistirme-v3\.js$/,S+'pages/wix-uygulama-gelistirme-v5/n1-uygulama-gelistirme-v5.js'],
 [/\/wix-kreatif-produksiyon-v23\/n1-kreatif-produksiyon-v23\.js$/,S+'pages/wix-kreatif-produksiyon-v26/n1-kreatif-produksiyon-v26.js'],
 [/\/wix-e-ticaret-yonetimi-v24\/n1-e-ticaret-yonetimi-v24\.js$/,S+'pages/wix-e-ticaret-yonetimi-v27/n1-e-ticaret-yonetimi-v27.js'],
 [/\/wix-sosyal-medya-v27\/n1-sosyal-medya-v27\.js$/,S+'pages/wix-sosyal-medya-v30/n1-sosyal-medya-v30.js'],
 [/\/wix-reklam-yonetimi-v23\/n1-reklam-yonetimi-v23\.js$/,S+'pages/wix-reklam-yonetimi-v26/n1-reklam-yonetimi-v26.js'],
 [/\/wix-uiux-tasarim-v29\/n1-uiux-tasarim-v29\.js$/,S+'pages/wix-uiux-tasarim-v32/n1-uiux-tasarim-v32.js'],
 [/\/wix-yapay-zeka-v2\/n1-yapay-zeka-v2\.js$/,S+'pages/wix-yapay-zeka-v5/n1-yapay-zeka-v5.js'],
 [/\/wix-uygulama-gelistirme-v2\/n1-uygulama-gelistirme-v2\.js$/,S+'pages/wix-uygulama-gelistirme-v5/n1-uygulama-gelistirme-v5.js'],
 [/\/wix-kisaca-biz-v1\/n1-kisaca-biz-v1\.js$/,S+'pages/wix-kisaca-biz-v3/n1-kisaca-biz-v3.js'],
 [/\/wix-markalar-v1\/n1-markalar-v11\.js$/,S+'pages/wix-markalar-v13/n1-markalar-v13.js'],
 [/\/wix-yasal-sayfalar-v1\/n1-yasal-sayfalar-v1\.js$/,S+'pages/wix-yasal-sayfalar-v3/n1-yasal-sayfalar-v3.js'],
 [/\/wix-career-v1\/pages\/n1-career-v1\.js$/,'wix-global-shell-v1/pages/n1-career-v2.js'],
 // canlı Global Shell V2 (@144d964) adresleri — Wix'te uygulanmış olabilir
 [/\/wix-global-shell-v1\/sites\/home\/n1-site-wix-v661\.js$/,S+'home/n1-site-wix-v661.js'],
 [/\/wix-global-shell-v1\/sites\/pages\/wix-kreatif-produksiyon-v26\/n1-kreatif-produksiyon-v26\.js$/,S+'pages/wix-kreatif-produksiyon-v26/n1-kreatif-produksiyon-v26.js'],
 [/\/wix-global-shell-v1\/sites\/pages\/wix-e-ticaret-yonetimi-v27\/n1-e-ticaret-yonetimi-v27\.js$/,S+'pages/wix-e-ticaret-yonetimi-v27/n1-e-ticaret-yonetimi-v27.js'],
 [/\/wix-global-shell-v1\/sites\/pages\/wix-sosyal-medya-v30\/n1-sosyal-medya-v30\.js$/,S+'pages/wix-sosyal-medya-v30/n1-sosyal-medya-v30.js'],
 [/\/wix-global-shell-v1\/sites\/pages\/wix-reklam-yonetimi-v26\/n1-reklam-yonetimi-v26\.js$/,S+'pages/wix-reklam-yonetimi-v26/n1-reklam-yonetimi-v26.js'],
 [/\/wix-global-shell-v1\/sites\/pages\/wix-uiux-tasarim-v32\/n1-uiux-tasarim-v32\.js$/,S+'pages/wix-uiux-tasarim-v32/n1-uiux-tasarim-v32.js'],
 [/\/wix-global-shell-v1\/sites\/pages\/wix-yapay-zeka-v5\/n1-yapay-zeka-v5\.js$/,S+'pages/wix-yapay-zeka-v5/n1-yapay-zeka-v5.js'],
 [/\/wix-global-shell-v1\/sites\/pages\/wix-uygulama-gelistirme-v5\/n1-uygulama-gelistirme-v5\.js$/,S+'pages/wix-uygulama-gelistirme-v5/n1-uygulama-gelistirme-v5.js'],
 [/\/wix-global-shell-v1\/sites\/pages\/wix-kisaca-biz-v3\/n1-kisaca-biz-v3\.js$/,S+'pages/wix-kisaca-biz-v3/n1-kisaca-biz-v3.js'],
 [/\/wix-global-shell-v1\/sites\/pages\/wix-markalar-v13\/n1-markalar-v13\.js$/,S+'pages/wix-markalar-v13/n1-markalar-v13.js'],
 [/\/wix-global-shell-v1\/sites\/pages\/wix-yasal-sayfalar-v3\/n1-yasal-sayfalar-v3\.js$/,S+'pages/wix-yasal-sayfalar-v3/n1-yasal-sayfalar-v3.js'],
 [/\/wix-global-shell-v1\/pages\/n1-career-v2\.js$/,'wix-global-shell-v1/pages/n1-career-v2.js'],
];
// V2.1 (varsayılan): bütün hedefler V2.1 sürümlerine çevrilir; N1_VER=20 eski V2 hedeflerini kullanır
const V21={'home/n1-site-wix-v661.js':'home/n1-site-wix-v662.js','pages/n1-career-v2.js':'pages/n1-career-v3.js'};
[['kreatif-produksiyon',26],['e-ticaret-yonetimi',27],['sosyal-medya',30],['reklam-yonetimi',26],['uiux-tasarim',32],['yapay-zeka',5],['uygulama-gelistirme',5],['kisaca-biz',3],['markalar',13],['yasal-sayfalar',3]].forEach(([n,v])=>{V21[`pages/wix-${n}-v${v}/n1-${n}-v${v}.js`]=`pages/wix-${n}-v${v+1}/n1-${n}-v${v+1}.js`;});
// canlı V2.1 (@f661795) adresleri — 28 Kasım 2026 itibarıyla Wix'te yayında
[['home/n1-site-wix-v662.js'],['pages/n1-career-v3.js']].concat([['kreatif-produksiyon',27],['e-ticaret-yonetimi',28],['sosyal-medya',31],['reklam-yonetimi',27],['uiux-tasarim',33],['yapay-zeka',6],['uygulama-gelistirme',6],['kisaca-biz',4],['markalar',14],['yasal-sayfalar',4]].map(([n,v])=>[`pages/wix-${n}-v${v}/n1-${n}-v${v}.js`])).forEach(([k])=>{const f=(k.startsWith('pages/n1-career')?'wix-global-shell-v1/':S)+k;MAP.push([new RegExp('/wix-global-shell-v1/'+(k.startsWith('pages/n1-career')?'':'sites/')+k.replace(/[.]/g,'\\.')+'$'),f]);});
// V2.2 (varsayılan): V2 → V2.1 → V2.2; N1_VER=21 V2.1 hedeflerinde, N1_VER=20 V2 hedeflerinde durur
const V22={'home/n1-site-wix-v662.js':'home/n1-site-wix-v663.js','pages/n1-career-v3.js':'pages/n1-career-v4.js'};
[['kreatif-produksiyon',27],['e-ticaret-yonetimi',28],['sosyal-medya',31],['reklam-yonetimi',27],['uiux-tasarim',33],['yapay-zeka',6],['uygulama-gelistirme',6],['kisaca-biz',4],['markalar',14],['yasal-sayfalar',4]].forEach(([n,v])=>{V22[`pages/wix-${n}-v${v}/n1-${n}-v${v}.js`]=`pages/wix-${n}-v${v+1}/n1-${n}-v${v+1}.js`;});
const VER=process.env.N1_VER||'22';
if(VER!=='20')MAP.forEach(m=>{for(const k in V21)if(m[1].endsWith(k)){m[1]=m[1].slice(0,-k.length)+V21[k];break;}});
if(VER==='22')MAP.forEach(m=>{for(const k in V22)if(m[1].endsWith(k)){m[1]=m[1].slice(0,-k.length)+V22[k];break;}});
const CAREER={'/insan-kaynaklari':'n1-insan-kaynaklari-v1','/acik-pozisyonlar':'n1-acik-pozisyonlar-v1','/staj-programlari':'n1-staj-programlari-v1'};
const CT={'.js':'application/javascript; charset=utf-8','.webp':'image/webp','.css':'text/css','.png':'image/png','.html':'text/html; charset=utf-8'};
function careerShim(tag){return fs.readFileSync(R+'wix-global-shell-v1/pages/'+({'20':'n1-career-v2.js','21':'n1-career-v3.js'}[process.env.N1_VER]||'n1-career-v4.js'),'utf8')+
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
  const m=/1n-ronin-assets@[0-9a-f]+\/((wix-global-shell-v1|wix-career-v1|wix-mobile-performance-v14)\/.+)$/.exec(u); if(!f&&m) f=m[1];
  if(!f) return route.continue();
  stats[f]=(stats[f]||0)+1;
  route.fulfill({status:200,body:fs.readFileSync(R+f),headers:{'content-type':CT[path.extname(f)]||'application/octet-stream','access-control-allow-origin':'*'}});});};
module.exports.CAREER=CAREER;
module.exports.shellPages=async function(ctx,shellUrl){const T=fs.readFileSync(R+'wix-global-shell-v1/tests/shell-page.html','utf8');
 // bağımsız bileşen test sayfası: gerçek adreste (?n1shell=<ad>) — aktif menü durumu adresle doğrulanabilsin; Wix sayfası değildir
 await ctx.route(r=>r.hostname==='www.reklam1n.com'&&(/^\/__shell\//.test(r.pathname)||r.searchParams.has('n1shell')),route=>{if(route.request().resourceType()!=='document'&&!/__shell/.test(route.request().url()))return route.continue();const u=new URL(route.request().url());const name=u.searchParams.get('n1shell')||u.pathname.split('/').pop();
  if(name==='iletisim-embed.html')return route.fulfill({status:200,body:fs.readFileSync(R+'wix-global-shell-v1/reference/iletisim-v4/iletisim.html'),headers:{'content-type':'text/html; charset=utf-8'}});
  route.fulfill({status:200,body:T.split('{{PAGE}}').join(name).split('{{SHELL}}').join(shellUrl),headers:{'content-type':'text/html; charset=utf-8'}});});};
