/* 1N Digital Media | Uygulama Geliştirme | Wix Studio Custom Element n1-uygulama-v1 | SVG-only icons */
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
})({"slug":"uygulama-gelistirme","tag":"n1-uygulama-v1","title":"Uygulama Geliştirme","type":"ÜRÜN / YAZILIM","edition":"18","eyebrow":"FİKİRDEN ÇALIŞAN DİJİTAL ÜRÜNE","hero":["UYGULAMA","GELİŞTİRME"],"tagline":"İşleyen deneyimler inşa etmek.","intro":"Uygulama fikirlerini kullanıcı ihtiyaçları, ürün kapsamı ve teknik sürdürülebilirlik üzerinden ele alırız. Karmaşıklığı doğru yerde çözer, net bir ürün deneyimi hedefleriz.","art":"application","artLabel":"PRODUCT / INTERFACE / BUILD","heroFoot":"PRODUCT THINKING / ENGINEERING","manifesto":["ÖNCE PROBLEM","SONRA KOD."],"manifestoBody":"Bir uygulamanın değeri sahip olduğu ekran sayısında değil, kullanıcı için çözdüğü problemde ortaya çıkar. Bu nedenle kapsam, öncelik ve test edilebilirlik kararlarını geliştirmeden önce netleştiririz.","pillars":[{"title":"ÜRÜNÜ TANIMLARIZ.","desc":"Kullanıcı senaryolarını, temel işlevleri ve ilk sürümün sınırlarını belirleriz."},{"title":"DENEYİMİ KURARIZ.","desc":"Akışları ve arayüzleri prototipleyerek teknik kararlara temel hazırlarız."},{"title":"ADIM ADIM GELİŞTİRİRİZ.","desc":"Sürümleme, test ve iyileştirmeyi ürünün doğal döngüsü olarak ele alırız."}],"scopeTitle":["FİKİRDEN","ÜRÜNE."],"scopeText":"İhtiyaçları netleştiren keşif süreci, farklı geliştirme kapsamları arasında gerçekçi seçimler yapmayı kolaylaştırır.","scope":["Ürün keşfi ve ihtiyaç analizi","MVP kapsamı ve fonksiyon öncelikleri","UX / UI ve etkileşim prototipi","Uygulama arayüzü geliştirme planı","Test, bakım ve sonraki sürüm yaklaşımı"],"processTitle":"ÜRÜN GELİŞTİRME DÖNGÜSÜ","process":[{"title":"KEŞFET.","desc":"Kullanıcının gerçek ihtiyacını ve temel senaryoları tanımlarız."},{"title":"İNŞA ET.","desc":"Öncelikli özellikleri test edilebilir bir yapıya dönüştürürüz."},{"title":"GELİŞTİR.","desc":"Geri bildirimlerle ürünü adım adım olgunlaştırırız."}],"quote":["DAHA ÇOK ÖZELLİK","DAHA İYİ ÜRÜN DEĞİL."],"cta":["BİR ÜRÜN","TASARLAYALIM."],"nextHref":"/ui-ux-tasarim","nextLabel":"UI-UX TASARIM"},"https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@11bc39eb7d9dc40b92e11a7d8e3ea374b7528f8d/wix-ic-sayfalar-v1/modules/n1-inner-pages-runtime-v1.js");
