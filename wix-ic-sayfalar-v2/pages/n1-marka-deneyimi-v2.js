/* 1N Digital Media | Marka Deneyimi | V2 / #A8CF62 | Wix Studio Custom Element n1-marka-deneyimi-v1 | SVG-only icons */
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
})({"slug":"marka-deneyimi","tag":"n1-marka-deneyimi-v1","title":"Marka Deneyimi","type":"MARKA / DENEYİM","edition":"05","eyebrow":"MARKAYI TEMAS NOKTALARINDA YAŞATMAK","hero":["MARKA","DENEYİMİ"],"tagline":"Bir kimlik değil, tutarlı bir his.","intro":"Markanın verdiği sözün web sitesinde, reklamda, ambalajda ve her iletişim anında aynı güçle hissedilmesini hedefleriz.","art":"brand","artLabel":"IDENTITY / EXPERIENCE / MEMORY","heroFoot":"BRAND EXPERIENCE SYSTEM","manifesto":["MARKA BİR LOGODAN","DAHA BÜYÜKTÜR."],"manifestoBody":"İnsanlar markaları tek bir görselle değil, tekrar eden deneyimlerle tanır. Bu nedenle marka karakterini hem görsel hem sözel hem de işlevsel düzeyde tasarlarız.","pillars":[{"title":"ÖZÜ TANIMLARIZ.","desc":"Markanın konumunu, değerini ve hedef kitlesine vaat ettiği şeyi netleştiririz."},{"title":"SİSTEMİ KURARIZ.","desc":"Kimlik parçalarını farklı temas noktalarında uygulanabilir bir dile dönüştürürüz."},{"title":"DENEYİMİ KORURUZ.","desc":"Tutarlılığı tek bir tasarıma değil, bütün müşteri yolculuğuna yayarız."}],"scopeTitle":["HER TEMASTA","AYNI KARAKTER."],"scopeText":"Marka deneyimini yalnızca lansman anında değil; araştırmadan satın almaya ve sonrasındaki iletişime kadar ele alırız.","scope":["Marka konumlandırma ve anlatı","Görsel ve sözel kimlik yönü","Müşteri yolculuğu haritalama","Dijital temas noktası tasarımı","Marka deneyimi tutarlılık sistemi"],"processTitle":"KARAKTERİN YOLU","process":[{"title":"KEŞFET.","desc":"İnsanların markayı bugün nasıl gördüğünü anlamaya çalışırız."},{"title":"TASARLA.","desc":"Verilen sözü görünür kılan bir deneyim dili oluştururuz."},{"title":"YAYGINLAŞTIR.","desc":"Sistemi doğru kanallara ve gerçek kullanım senaryolarına uygularız."}],"quote":["TUTARLILIK","GÜVEN OLUŞTURUR."],"cta":["MARKANI","BÜYÜTELİM."],"nextHref":"/web-e-ticaret","nextLabel":"WEB & E-TİCARET"},"https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@581d0f511a73eee246aa159ce79ce1a78ce197a1/wix-ic-sayfalar-v2/modules/n1-inner-pages-runtime-v2.js");
