/* 1N Digital Media | Dijital Performans | V2 / #A8CF62 | Wix Studio Custom Element n1-dijital-performans-v1 | SVG-only icons */
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
})({"slug":"dijital-performans","tag":"n1-dijital-performans-v1","title":"Dijital Performans","type":"BÜYÜME / ANALİTİK","edition":"06","eyebrow":"VERİYİ ANLAMLI KARARLARA DÖNÜŞTÜRMEK","hero":["DİJİTAL","PERFORMANS"],"tagline":"Görünürlükten gerçek etkiye.","intro":"Kampanyaları sadece erişim ve tıklamalarla değil, iş hedeflerine katkılarıyla değerlendiririz. Ölçüm, öğrenme ve optimizasyonu aynı sistemde ele alırız.","art":"performance","artLabel":"SIGNAL / MEASURE / OPTIMIZE","heroFoot":"PERFORMANCE WITH PURPOSE","manifesto":["HER TIKLAMA","SONUÇ DEĞİLDİR."],"manifestoBody":"Güçlü performans yönetimi doğru KPI seçimiyle başlar. Platform raporlarını satış süreçleri, iletişim talepleri ve dönüşüm kalitesiyle birlikte yorumlarız; tek bir metriğe gereğinden fazla anlam yüklemeyiz.","pillars":[{"title":"HEDEFİ NETLEŞTİRİRİZ.","desc":"Erişim, talep, dönüşüm ve gelir gibi hedefleri birbirinden ayırırız."},{"title":"VERİYİ TEMİZLERİZ.","desc":"Ölçüm noktalarını, dönüşüm olaylarını ve raporlama mantığını kontrol ederiz."},{"title":"DÜZENLİ TEST EDERİZ.","desc":"Kreatif, hedef kitle ve teklif varsayımlarını planlı denemelerle geliştiririz."}],"scopeTitle":["RAKAMDAN","ANLAMA."],"scopeText":"Mecra metrikleri ile iş sonuçları arasındaki bağı görünür kılmak, bütçe kararlarında daha sağlıklı bir temel sağlar.","scope":["Google Ads ve Meta Ads stratejisi","GA4 / GTM ölçüm planlaması","Dönüşüm izleme ve veri kalitesi","Kreatif ve açılış sayfası testleri","Performans raporları ve optimizasyon"],"processTitle":"ÖLÇÜLEBİLİR AKIŞ","process":[{"title":"TEMELİ KUR.","desc":"Hedefleri, ölçüm noktalarını ve mevcut veriyi denetleriz."},{"title":"ÖĞRENEREK YAYINLA.","desc":"Kontrollü testlerle hangi yaklaşımın çalıştığını inceleriz."},{"title":"ÖLÇEKLE.","desc":"Sonuçları bütçe, kreatif ve kanal kararlarına taşırız."}],"quote":["DAHA FAZLA VERİ","DAHA İYİ KARAR."],"cta":["BÜYÜMEYİ","PLANLAYALIM."],"nextHref":"/reklam-yonetimi","nextLabel":"REKLAM YÖNETİMİ"},"https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@581d0f511a73eee246aa159ce79ce1a78ce197a1/wix-ic-sayfalar-v2/modules/n1-inner-pages-runtime-v2.js");
