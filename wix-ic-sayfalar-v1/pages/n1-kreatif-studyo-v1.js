/* 1N Digital Media | Kreatif Stüdyo | Wix Studio Custom Element n1-kreatif-studyo-v1 | SVG-only icons */
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
})({"slug":"kreatif-studyo","tag":"n1-kreatif-studyo-v1","title":"Kreatif Stüdyo","type":"YARATICI HİZMETLER","edition":"04","eyebrow":"HİKÂYEYE BİÇİM VEREN FİKİRLER","hero":["KREATİF","STÜDYO"],"tagline":"Fikrin görsel bir karaktere dönüşümü.","intro":"Konsept, tasarım, metin ve hareketi tek bir yaratıcı bütünün parçaları olarak ele alırız. Her marka için kendine ait bir anlatım dili kurarız.","art":"studio","artLabel":"CONCEPT / DESIGN / MOTION","heroFoot":"THINK / MAKE / REFINE","manifesto":["TASARIM GÜZELLİKTEN","DAHA FAZLASI."],"manifestoBody":"Güçlü bir görsel dünyanın temelinde yalnızca estetik değil, doğru fikir vardır. Fark edilmekten çok hatırlanmayı sağlayan, anlamı olan yaratıcı işler tasarlarız.","pillars":[{"title":"KAVRAMI BULURUZ.","desc":"Markanın düşüncesini tek bir güçlü yaratıcı fikir çevresinde toplarız."},{"title":"DİLİ KURARIZ.","desc":"Tipografi, renk, görsel ritim ve metni tutarlı bir sisteme dönüştürürüz."},{"title":"HAREKETE GEÇİRİRİZ.","desc":"Fikirleri kampanya, içerik, dijital deneyim ve hareketli görsellere taşırız."}],"scopeTitle":["HİKÂYENİN","HER FORMATINDA."],"scopeText":"Kreatif stüdyomuz, markaların farklı temas noktalarında aynı karakteri koruyabilmesi için disiplinleri birlikte düşünür.","scope":["Yaratıcı konsept ve art direction","Kampanya tasarım sistemleri","Key visual ve dijital tasarım","Motion design ve video yönlendirmesi","Markaya özgü içerik tasarımları"],"processTitle":"FİKİRDEN FORMA","process":[{"title":"FİKRİ AÇ.","desc":"İçgörüyü yaratıcı brief'e ve güçlü bir anlatım eksenine dönüştürürüz."},{"title":"DÜNYAYI KUR.","desc":"Görsel sistemleri, örnek uygulamaları ve yaratıcı alternatifleri geliştiririz."},{"title":"UYARLA.","desc":"Konsepti farklı mecralara tutarlı ve etkili biçimde taşırız."}],"quote":["GÖRÜNÜR OLMAK","YETMEZ."],"cta":["FİKRİNİ","KONUŞALIM."],"nextHref":"/kreatif-produksiyon","nextLabel":"KREATİF PRODÜKSİYON"},"https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@11bc39eb7d9dc40b92e11a7d8e3ea374b7528f8d/wix-ic-sayfalar-v1/modules/n1-inner-pages-runtime-v1.js");
