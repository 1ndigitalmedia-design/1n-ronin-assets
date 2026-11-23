/* 1N Digital Media | E-Ticaret Yönetimi | Wix Studio Custom Element n1-eticaret-yonetimi-v1 | SVG-only icons */
(function pageRegistration(cfg, runtimeSource){
  'use strict';
  const arr=window.N1_PENDING_INNER_PAGES||(window.N1_PENDING_INNER_PAGES=[]);
  arr.push({tag:cfg.tag,cfg});
  if(cfg.hero.some(v=>v.length>9)){
    const id='n1ip-mobile-heading-'+cfg.slug;
    if(!document.getElementById(id)){
      const style=document.createElement('style');style.id=id;
      style.textContent='@media(max-width:767px){'+cfg.tag+' .n1ip-headline{font-size:clamp(50px,12.4vw,76px)!important}}@media(max-width:360px){'+cfg.tag+' .n1ip-headline{font-size:clamp(44px,12vw,65px)!important}}';
      document.head.appendChild(style);
    }
  }
  if(window.N1RegisterInnerPages){window.N1RegisterInnerPages();return;}
  if(document.querySelector('script[data-n1-inner-pages-runtime]'))return;
  const script=document.createElement('script');script.setAttribute('data-n1-inner-pages-runtime','v1');script.src=runtimeSource;script.async=false;
  script.onerror=()=>console.error('[1N İç Sayfalar] Ortak modül yüklenemedi: '+runtimeSource);
  document.head.appendChild(script);
})({"slug":"e-ticaret-yonetimi","tag":"n1-eticaret-yonetimi-v1","title":"E-Ticaret Yönetimi","type":"E-TİCARET / OPERASYON","edition":"13","eyebrow":"ÜRÜNDEN SİPARİŞE, DÜZENLİ BİR DENEYİM","hero":["E-TİCARET","YÖNETİMİ"],"tagline":"Dijital rafın arkasındaki düzen.","intro":"Ürün verisi, kategori mimarisi, kampanya kurgusu ve operasyonel akışlar aynı düzen içinde çalıştığında alışveriş deneyimi güçlenir.","art":"commerce","artLabel":"CATALOG / JOURNEY / OPERATE","heroFoot":"OPERATIONS MEET EXPERIENCE","manifesto":["İYİ VİTRİN","YETMEZ."],"manifestoBody":"E-ticaret yalnızca bir tema seçimi değil; doğru ürün bilgisini, yönetilebilir süreçleri ve güven veren bir kullanıcı deneyimini bir araya getirme işidir.","pillars":[{"title":"VERİYİ DÜZENLERİZ.","desc":"Ürün isimleri, açıklamalar, varyasyonlar ve kategori ilişkilerine bütüncül bakarız."},{"title":"AKIŞI KOLAYLAŞTIRIRIZ.","desc":"Kullanıcının ürünü bulmasını ve karar vermesini zorlaştıran sürtünmeleri azaltırız."},{"title":"OPERASYONU TAKİP EDERİZ.","desc":"İçerik güncellemeleri, kampanyalar ve ölçüm ihtiyaçları için düzenli bir çalışma planı kurarız."}],"scopeTitle":["ÜRÜNDEN","DENEYİME."],"scopeText":"Temel mağaza yönetimi ile kapsamlı yeniden tasarım, entegrasyon ve gelişmiş SEO çalışmalarını ayrı hizmet kapsamları olarak değerlendiririz.","scope":["Ürün ve kategori içerik yönetimi","Varyasyon ve katalog yapılandırması","Kampanya alanlarının güncellenmesi","Temel arama görünürlüğü düzeni","E-ticaret raporlama ve iyileştirme"],"processTitle":"KATALOGDAN AKIŞA","process":[{"title":"DÜZENİ KUR.","desc":"Mevcut mağaza yapısını ve içerik kalitesini değerlendiririz."},{"title":"GÜNCEL TUT.","desc":"Ürün, kampanya ve kategori operasyonlarını planlı yürütürüz."},{"title":"İYİLEŞTİR.","desc":"Kullanım verisi ve ticari önceliklerle deneyimi geliştiririz."}],"quote":["DÜZEN","DENEYİME DÖNÜŞÜR."],"cta":["MAĞAZANI","GELİŞTİRELİM."],"nextHref":"/web-e-ticaret","nextLabel":"WEB & E-TİCARET"},"https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@11bc39eb7d9dc40b92e11a7d8e3ea374b7528f8d/wix-ic-sayfalar-v1/modules/n1-inner-pages-runtime-v1.js");
