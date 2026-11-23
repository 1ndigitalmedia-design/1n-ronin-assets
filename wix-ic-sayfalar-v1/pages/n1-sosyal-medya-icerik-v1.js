/* 1N Digital Media | Sosyal Medya & İçerik | Wix Studio Custom Element n1-sosyal-icerik-v1 | SVG-only icons */
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
})({"slug":"sosyal-medya-icerik","tag":"n1-sosyal-icerik-v1","title":"Sosyal Medya & İçerik","type":"SOSYAL / İÇERİK","edition":"07","eyebrow":"DİKKATİ ANLAMA DÖNÜŞTÜREN İÇERİKLER","hero":["SOSYAL MEDYA","& İÇERİK"],"tagline":"Akışta kaybolmayan bir ses.","intro":"İçeriğin yalnızca yayın takvimi değil, markanın insanlarla kurduğu sürekli ilişki olduğuna inanırız. Formatı değil, anlamı merkeze koyarız.","art":"social","artLabel":"CONTENT / CONVERSATION / CULTURE","heroFoot":"SOCIAL FIRST / BRAND ALWAYS","manifesto":["HER PAYLAŞIM","BİR AMAÇ TAŞIR."],"manifestoBody":"Bir sosyal medya hesabını doldurmak yerine, markanın sesiyle konuşan bir yayın dünyası kurarız. Topluluk dinamiklerini yaratıcı fikir, görsel tutarlılık ve doğru ritimle birleştiririz.","pillars":[{"title":"DİNLEYEREK BAŞLARIZ.","desc":"Hedef kitlenin ihtiyaçlarını, sorularını ve dilini anlamaya çalışırız."},{"title":"SERİLER OLUŞTURURUZ.","desc":"Tekil paylaşımlar yerine devamlılığı olan içerik fikirleri tasarlarız."},{"title":"ETKİLEŞİMİ YORUMLARIZ.","desc":"Beğeni kadar kaydetme, mesaj ve nitelikli talep sinyallerini dikkate alırız."}],"scopeTitle":["İÇERİĞE","YÖN VERİRİZ."],"scopeText":"İyi sosyal medya yönetimi strateji, editoryal plan, yaratıcı üretim ve topluluk anlayışının birlikte çalışmasını gerektirir.","scope":["İçerik stratejisi ve yayın dili","Reels / kısa video konseptleri","Kreatif post ve carousel tasarımı","Topluluk ve etkileşim yaklaşımı","İçerik performansı değerlendirmesi"],"processTitle":"AKIŞIN ARKASINDA","process":[{"title":"DİNLE.","desc":"Konuşmaları, gündemi ve marka ihtiyaçlarını tararız."},{"title":"ÜRET.","desc":"Fikri mecraya uygun bir görsel ve sözel anlatıma dönüştürürüz."},{"title":"GELİŞTİR.","desc":"İçeriğin yarattığı etkiyi yeni yayın planına taşırız."}],"quote":["AKIŞ HIZLI","KARAKTER KALICI."],"cta":["BİRLİKTE","ANLATALIM."],"nextHref":"/sosyal-medya","nextLabel":"SOSYAL MEDYA"},"https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@11bc39eb7d9dc40b92e11a7d8e3ea374b7528f8d/wix-ic-sayfalar-v1/modules/n1-inner-pages-runtime-v1.js");
