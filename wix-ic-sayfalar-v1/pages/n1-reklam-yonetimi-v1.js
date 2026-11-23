/* 1N Digital Media | Reklam Yönetimi | Wix Studio Custom Element n1-reklam-yonetimi-v1 | SVG-only icons */
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
})({"slug":"reklam-yonetimi","tag":"n1-reklam-yonetimi-v1","title":"Reklam Yönetimi","type":"MEDYA / PERFORMANS","edition":"15","eyebrow":"REKLAMIN ÖTESİNDE, DOĞRU KARARLAR","hero":["REKLAM","YÖNETİMİ"],"tagline":"Bütçeyi değil, öğrenmeyi büyüt.","intro":"Hedef kitle, kreatif, teklif ve ölçüm bileşenlerini birlikte planlarız. Reklamları tek seferlik kurulum değil, sürekli iyileştirilen bir sistem olarak görürüz.","art":"ads","artLabel":"PLAN / TEST / OPTIMIZE","heroFoot":"MEDIA STRATEGY / REAL SIGNALS","manifesto":["DAHA ÇOK GÖSTERİM","TEK BAŞINA YETMEZ."],"manifestoBody":"Reklamın başarısını anlamak için erişim ve maliyetin yanında dönüşümün niteliğine bakmak gerekir. Özellikle mesaj, telefon ve mağaza satışlarında platform verisini tek gerçek olarak kabul etmeyiz.","pillars":[{"title":"HEDEFİ AYIRIRIZ.","desc":"Farkındalık, talep toplama ve satış hedeflerini aynı tabloda karıştırmayız."},{"title":"KREATİFİ TEST EDERİZ.","desc":"Mesaj, görsel ve hedef kitle varsayımlarını kontrollü biçimde deneriz."},{"title":"BÜTÇEYİ YORUMLARIZ.","desc":"Maliyet kadar nitelik ve ticari geri dönüş sinyallerini değerlendiririz."}],"scopeTitle":["MEDYA","AKLINI KUR."],"scopeText":"Hesap mimarisi, ölçüm ve kreatif birbirinden ayrı işler değil; performansın aynı zincirdeki halkalarıdır.","scope":["Google Ads kampanya yönetimi","Meta Ads kampanya yönetimi","Hedef kitle ve teklif stratejisi","Dönüşüm izleme ve olay planı","Raporlama, test ve optimizasyon"],"processTitle":"REKLAMIN DÖNGÜSÜ","process":[{"title":"HEDEFLE.","desc":"İşin amacına uygun KPI ve kampanya kurgusunu seçeriz."},{"title":"ÖLÇEREK DENE.","desc":"Kreatif ve hedefleme alternatiflerini test ederiz."},{"title":"OPTİMİZE ET.","desc":"Veriler ışığında bütçe ve içerik kararlarını güncelleriz."}],"quote":["REKLAM VERMEK","STRATEJİ DEĞİL."],"cta":["HEDEFİ","NETLEŞTİRELİM."],"nextHref":"/dijital-performans","nextLabel":"DİJİTAL PERFORMANS"},"https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@11bc39eb7d9dc40b92e11a7d8e3ea374b7528f8d/wix-ic-sayfalar-v1/modules/n1-inner-pages-runtime-v1.js");
