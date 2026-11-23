/* 1N Digital Media | Kreatif Prodüksiyon | Wix Studio Custom Element n1-kreatif-produksiyon-v1 | SVG-only icons */
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
})({"slug":"kreatif-produksiyon","tag":"n1-kreatif-produksiyon-v1","title":"Kreatif Prodüksiyon","type":"PRODÜKSİYON / HAREKET","edition":"12","eyebrow":"FİKRİ KAREYE, SAHNEYE VE SESLERE TAŞIMAK","hero":["KREATİF","PRODÜKSİYON"],"tagline":"Her kare, aynı hikâyenin parçası.","intro":"Fotoğraf, video ve hareketli içeriği birbirinden kopuk üretimler olarak değil, markanın görsel anlatısının devamı olarak planlarız.","art":"production","artLabel":"PREPARE / CAPTURE / CREATE","heroFoot":"ART DIRECTION / PRODUCTION","manifesto":["GÜÇLÜ GÖRSEL","PLANLA BAŞLAR."],"manifestoBody":"Çekim günü yaratıcı fikrin başlangıcı değil, sonucudur. Konsept, ışık, mekân, kompozisyon ve kurgu dili önceden doğru tanımlandığında görsel hikâye tutarlı hâle gelir.","pillars":[{"title":"KONSEPTİ KURARIZ.","desc":"Görsel yaklaşımı ve prodüksiyonun anlatım hedefini belirleriz."},{"title":"DETAYI TASARLARIZ.","desc":"Kadraj, renk, ışık, hareket ve ürün sunumunda bütünlük ararız."},{"title":"FORMATLARI UYARLARIZ.","desc":"Tek bir üretimi farklı kanallarda kullanılabilecek doğru varyasyonlarla planlarız."}],"scopeTitle":["GÖRÜNTÜYE","KARAKTER."],"scopeText":"Prodüksiyon türü ve çekim kapsamı projeye göre farklılaşır. Çekim, post-prodüksiyon ve devam eden içerik ihtiyacını birlikte planlarız.","scope":["Kampanya görsel konsepti","Ürün ve marka fotoğraf prodüksiyonu","Kısa video ve Reels üretimi","Motion ve post-prodüksiyon yönü","Mecra bazlı görsel adaptasyonlar"],"processTitle":"SAHNENİN ARKASINDA","process":[{"title":"HAZIRLIK.","desc":"Yaratıcı brief, çekim planı ve görsel referansları belirleriz."},{"title":"ÜRETİM.","desc":"Kadraj ve hikâye bütünlüğünü koruyarak üretiriz."},{"title":"SON DOKUNUŞ.","desc":"Kurgu, renk ve format uyarlamalarıyla yayına hazırlarız."}],"quote":["KARE KARE","KİMLİK."],"cta":["HİKÂYENİ","GÖRELİM."],"nextHref":"/kreatif-studyo","nextLabel":"KREATİF STÜDYO"},"https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@11bc39eb7d9dc40b92e11a7d8e3ea374b7528f8d/wix-ic-sayfalar-v1/modules/n1-inner-pages-runtime-v1.js");
