/* 1N Digital Media | Sosyal Medya | Wix Studio Custom Element n1-sosyal-medya-v1 | SVG-only icons */
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
})({"slug":"sosyal-medya","tag":"n1-sosyal-medya-v1","title":"Sosyal Medya","type":"SOSYAL / YÖNETİM","edition":"14","eyebrow":"MARKAYI GÜNLÜK HAYATIN PARÇASI YAPMAK","hero":["SOSYAL","MEDYA"],"tagline":"Tutarlılık, tek paylaşımdan güçlüdür.","intro":"İçerik, moderasyon ve yayın ritmini birbirine bağlayarak markanın sosyal mecralarda tanınabilir ve sürdürülebilir bir varlık kurmasına odaklanırız.","art":"community","artLabel":"PLAN / PUBLISH / CONNECT","heroFoot":"CONSISTENT SOCIAL PRESENCE","manifesto":["SOSYAL MEDYA","BİR İLİŞKİDİR."],"manifestoBody":"Sürekli paylaşmak her zaman güçlü iletişim anlamına gelmez. Marka dili, topluluk ihtiyaçları ve iş hedefleriyle uyumlu bir içerik düzeni oluşturmak gerekir.","pillars":[{"title":"YAYIN DİLİNİ KURARIZ.","desc":"Markanın tonu, görsel yaklaşımı ve mesaj tutarlılığını belirleriz."},{"title":"RİTMİ PLANLARIZ.","desc":"Üretim ve yayın takvimini önceliklere göre düzenleriz."},{"title":"İLGİYİ ANLARIZ.","desc":"Yorum, kaydetme, mesaj ve nitelikli etkileşimlerden öğreniriz."}],"scopeTitle":["SADECE POST","DEĞİL."],"scopeText":"Sosyal yönetim, yaratıcı üretimin yanında planlama, koordinasyon ve düzenli değerlendirme gerektirir.","scope":["Sosyal medya yayın stratejisi","Aylık içerik ve kampanya planı","Feed, hikâye ve kısa video akışı","Topluluk iletişimi yaklaşımı","Performans ve içerik değerlendirmesi"],"processTitle":"YAYIN RİTMİ","process":[{"title":"PLANLA.","desc":"Hedefleri ve içerik önceliklerini belirleriz."},{"title":"YAYINLA.","desc":"Marka kimliğini koruyan üretimleri doğru zamanlarda sunarız."},{"title":"DEĞERLENDİR.","desc":"Etkileşim ve iş hedeflerini birlikte yorumlarız."}],"quote":["HER GÜN","AYNI KARAKTER."],"cta":["SOSYALİ","BİRLİKTE YÖNETELİM."],"nextHref":"/sosyal-medya-icerik","nextLabel":"SOSYAL MEDYA & İÇERİK"},"https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@11bc39eb7d9dc40b92e11a7d8e3ea374b7528f8d/wix-ic-sayfalar-v1/modules/n1-inner-pages-runtime-v1.js");
