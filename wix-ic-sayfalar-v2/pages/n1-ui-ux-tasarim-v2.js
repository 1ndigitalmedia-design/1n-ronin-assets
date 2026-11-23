/* 1N Digital Media | UI-UX Tasarım | V2 / #A8CF62 | Wix Studio Custom Element n1-uiux-v1 | SVG-only icons */
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
})({"slug":"ui-ux-tasarim","tag":"n1-uiux-v1","title":"UI-UX Tasarım","type":"ÜRÜN / DENEYİM","edition":"16","eyebrow":"İNSAN MERKEZLİ DİJİTAL ARAYÜZLER","hero":["UI / UX","TASARIM"],"tagline":"Daha az sürtünme, daha fazla açıklık.","intro":"Bir arayüzün güzelliği, kullanıcıya sunduğu netlikle tamamlanır. Karmaşık ihtiyaçları anlaşılır akışlara ve güçlü görsel sistemlere dönüştürürüz.","art":"uiux","artLabel":"RESEARCH / PROTOTYPE / USABILITY","heroFoot":"CLARITY IN EVERY INTERACTION","manifesto":["İYİ TASARIM","YOL GÖSTERİR."],"manifestoBody":"Kullanıcının ne yapacağını tahmin etmek zorunda kaldığı deneyimler sürtünme yaratır. Bilgi mimarisi, hiyerarşi, erişilebilirlik ve davranış tasarımıyla bu sürtünmeleri azaltmayı hedefleriz.","pillars":[{"title":"İHTİYACI HARİTALARIZ.","desc":"Kullanıcı görevlerini ve iş hedeflerini aynı zeminde toplarız."},{"title":"AKIŞI PROTOTİPLERİZ.","desc":"Kararları görsel tasarımdan önce test edilebilir akışlara çeviririz."},{"title":"SİSTEMİ OLUŞTURURUZ.","desc":"Bileşenler, tipografi ve durumları sürdürülebilir bir arayüz dilinde toplarız."}],"scopeTitle":["DENEYİMİ","SADELEŞTİR."],"scopeText":"İnsanların ihtiyaçlarını anlamaya ve kullanım anlarını iyileştirmeye odaklanan bir tasarım disiplinidir.","scope":["Kullanıcı akışı ve bilgi mimarisi","Wireframe ve etkileşim prototipleri","Responsive arayüz tasarımı","Bileşen ve tasarım sistemi","Erişilebilirlik ve kullanım değerlendirmesi"],"processTitle":"DÜŞÜN, TASARLA, TEST ET","process":[{"title":"ARAŞTIR.","desc":"Kullanıcıyı, görevi ve bağlamı anlamaya çalışırız."},{"title":"PROTOTİPLE.","desc":"Alternatif akışları hızla görünür kılarız."},{"title":"İYİLEŞTİR.","desc":"Geri bildirimlerle hiyerarşi ve kullanılabilirliği geliştiririz."}],"quote":["KULLANICI","YOLUNU BULSUN."],"cta":["DENEYİMİ","TASARLAYALIM."],"nextHref":"/uygulama-gelistirme","nextLabel":"UYGULAMA GELİŞTİRME"},"https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@581d0f511a73eee246aa159ce79ce1a78ce197a1/wix-ic-sayfalar-v2/modules/n1-inner-pages-runtime-v2.js");
