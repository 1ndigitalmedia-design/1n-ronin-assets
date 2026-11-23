/* 1N Digital Media | AI / Yapay Zekâ | V2 / #A8CF62 | Wix Studio Custom Element n1-yapay-zeka-v1 | SVG-only icons */
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
})({"slug":"yapay-zeka","tag":"n1-yapay-zeka-v1","title":"AI / Yapay Zekâ","type":"AI / YARATICI SİSTEMLER","edition":"17","eyebrow":"YAPAY ZEKÂYI AMAÇLA BULUŞTURMAK","hero":["YAPAY","ZEKÂ"],"tagline":"Hızın yanında kaliteyi koru.","intro":"Yapay zekâ destekli üretim sistemlerini insan yaratıcılığı ve kontrolüyle birlikte tasarlarız. Yeni aracın değil, ortaya çıkan işin değerine bakarız.","art":"ai","artLabel":"HUMAN / MACHINE / CRAFT","heroFoot":"AI-ASSISTED CREATIVE PRODUCTION","manifesto":["OTOMASYON","AKIL YÜRÜTMEZ."],"manifestoBody":"Bir sürecin hızlanması, kararın otomatik olarak doğru olduğu anlamına gelmez. Kaynak doğruluğu, görsel tutarlılık, telif ve veri güvenliği gibi kriterlerle çalışırız.","pillars":[{"title":"UYGUN YERİ SEÇERİZ.","desc":"Hangi adımın otomasyondan fayda göreceğini, hangisinin insan kararı istediğini belirleriz."},{"title":"ÜRETİMİ TASARLARIZ.","desc":"Prompt, referans, sürümleme ve kalite kontrolü aynı akışta ele alırız."},{"title":"ÇIKTIYI DENETLERİZ.","desc":"Kimlik, ürün doğruluğu ve marka bütünlüğü için sonuçları kontrol ederiz."}],"scopeTitle":["ARAÇ DEĞİL","YETENEK."],"scopeText":"AI kullanımını sürdürülebilir bir tasarım ve operasyon sürecine bağlarız; hatalı sonuçları doğrudan yayına almayız.","scope":["AI destekli kreatif konseptler","Görsel ve video üretim akışları","Prompt kütüphanesi ve standartlar","İnsan onaylı kalite kontrol sistemi","Tekrarlanan işlerde otomasyon fikri"],"processTitle":"AKILLI ÜRETİM AKIŞI","process":[{"title":"TANIMLA.","desc":"Girdi kalitesini, kısıtları ve doğruluk kriterlerini belirleriz."},{"title":"ÜRET.","desc":"Alternatifleri kontrollü bir süreçte geliştiririz."},{"title":"DOĞRULA.","desc":"Sonucu kimlik, kalite ve marka uyumu açısından denetleriz."}],"quote":["HIZ ETKİLEYİCİ","DOĞRULUK GEREKLİ."],"cta":["BİRLİKTE","DENEYELİM."],"nextHref":"/yapay-zeka-inovasyon","nextLabel":"YAPAY ZEKÂ & İNOVASYON"},"https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@581d0f511a73eee246aa159ce79ce1a78ce197a1/wix-ic-sayfalar-v2/modules/n1-inner-pages-runtime-v2.js");
