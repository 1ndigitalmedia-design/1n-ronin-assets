/* 1N Digital Media | Workshops | V2 / #A8CF62 | Wix Studio Custom Element n1-workshops-v1 | SVG-only icons */
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
})({"slug":"workshops","tag":"n1-workshops-v1","title":"Workshops","type":"ÖĞRENME / ATÖLYE","edition":"10","eyebrow":"DÜŞÜNMEK İÇİN YER AÇMAK","hero":["WORKSHOPS","ATÖLYELER"],"tagline":"Birlikte düşün. Birlikte dene.","intro":"Atölyeleri pasif sunumlardan çok, soruların, deneylerin ve ortak fikirlerin üretildiği çalışma alanları olarak kurgularız.","art":"workshop","artLabel":"LEARN / EXPERIMENT / SHARE","heroFoot":"COLLECTIVE CREATIVE SESSIONS","manifesto":["BİLGİ PAYLAŞILDIKÇA","DERİNLEŞİR."],"manifestoBody":"Bir fikri anlamanın en iyi yollarından biri onu uygulamaktır. Atölye yaklaşımımız, katılımcıları gerçek sorular üzerinde düşünmeye, üretmeye ve birlikte değerlendirmeye davet eder.","pillars":[{"title":"SORUYLA AÇARIZ.","desc":"Konuya hazır cevaplarla değil, katılımcının ihtiyacıyla başlarız."},{"title":"UYGULAMAYLA ÖĞRENİRİZ.","desc":"Soyut çerçeveleri küçük deneyler ve örnek çalışmalarla somutlaştırırız."},{"title":"ÇIKTIYA ODAKLANIRIZ.","desc":"Oturumu yalnızca konuşulmuş fikirlerle değil, üzerinde çalışılabilir sonuçlarla bitirmeyi hedefleriz."}],"scopeTitle":["DÜŞÜN.","DENE. PAYLAŞ."],"scopeText":"Atölye konuları marka, ekip ve hedeflere göre ortaklaşa şekillendirilir. Sabit tarih veya herkese aynı program varsaymıyoruz.","scope":["Yaratıcı düşünme ve fikir geliştirme","Marka ve içerik atölyeleri","Dijital strateji çalışma oturumları","AI araçları ve üretim pratikleri","Ekip içi ortak üretim seansları"],"processTitle":"ATÖLYE DENEYİMİ","process":[{"title":"HAZIRLA.","desc":"Amaçları ve katılımcı beklentilerini netleştiririz."},{"title":"BİRLİKTE ÜRET.","desc":"Sorular, örnekler ve denemelerle fikirleri geliştiririz."},{"title":"SONUÇLANDIR.","desc":"Oluşan fikirleri uygulanabilir adımlara dönüştürürüz."}],"quote":["ÖĞRENMEK","BİRLİKTE GÜÇLÜ."],"cta":["BİR ATÖLYE","KURALIM."],"nextHref":"/reklam-ajansi","nextLabel":"1N ACADEMY"},"https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@581d0f511a73eee246aa159ce79ce1a78ce197a1/wix-ic-sayfalar-v2/modules/n1-inner-pages-runtime-v2.js");
