/* 1N Digital Media | Web & E-Ticaret | Wix Studio Custom Element n1-web-ticaret-v1 | SVG-only icons */
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
})({"slug":"web-e-ticaret","tag":"n1-web-ticaret-v1","title":"Web & E-Ticaret","type":"DİJİTAL / DENEYİM","edition":"08","eyebrow":"İYİ TASARIM, ÇALIŞAN SİSTEMLER","hero":["WEB &","E-TİCARET"],"tagline":"Her ekranda tutarlı bir deneyim.","intro":"Web sitesini yalnızca marka vitrini değil, kullanıcının yolunu bulduğu, güven duyduğu ve eyleme geçtiği bir dijital ürün olarak tasarlarız.","art":"web","artLabel":"DESIGN / BUILD / CONVERT","heroFoot":"DIGITAL EXPERIENCES THAT WORK","manifesto":["ESTETİK VE İŞLEV","BİRLİKTE."],"manifestoBody":"Güzel görünen ancak kullanılması zor bir site, işini eksik yapar. İçerik mimarisi, kullanıcı deneyimi, performans ve yönetilebilirlik arasında dengeli çözümler üretiriz.","pillars":[{"title":"YOLU KISALTIRIZ.","desc":"Kullanıcının ihtiyacına ulaşacağı akışı açık ve anlaşılır kurarız."},{"title":"DENEYİMİ TASARLARIZ.","desc":"Marka karakterini erişilebilir, duyarlı ve işlevsel arayüzlere taşırız."},{"title":"ÖLÇÜME BAĞLARIZ.","desc":"Önemli etkileşimleri ve dönüşüm noktalarını doğru biçimde izlemeyi planlarız."}],"scopeTitle":["DİJİTALİN","HER KATMANI."],"scopeText":"İhtiyaca göre temel e-ticaret operasyonlarını, özel geliştirmeleri ve kapsamlı site dönüşümlerini birbirinden ayırarak planlarız.","scope":["Web sitesi bilgi mimarisi","Responsive UI / UX tasarımı","E-ticaret deneyimi ve ürün akışları","Teknik SEO ve ölçüm temelleri","İçerik yönetimi ve iyileştirme planı"],"processTitle":"EKRANDAN DENEYİME","process":[{"title":"HARİTALA.","desc":"İçeriği, kullanıcı yolculuğunu ve sistem gereksinimlerini netleştiririz."},{"title":"İNŞA ET.","desc":"Tasarımı test edilebilir, ölçeklenebilir bir yapıya dönüştürürüz."},{"title":"GÖZLEMLE.","desc":"Davranış verilerini ve kullanım sorunlarını iyileştirme işlerine çeviririz."}],"quote":["İYİ WEB","HİSSETTİRMEZ."],"cta":["DİJİTALİ","YENİLEYELİM."],"nextHref":"/ui-ux-tasarim","nextLabel":"UI-UX TASARIM"},"https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@11bc39eb7d9dc40b92e11a7d8e3ea374b7528f8d/wix-ic-sayfalar-v1/modules/n1-inner-pages-runtime-v1.js");
