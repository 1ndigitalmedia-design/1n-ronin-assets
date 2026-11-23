/* 1N Digital Media | İçgörüler | V2 / #A8CF62 | Wix Studio Custom Element n1-icgoruler-v1 | SVG-only icons */
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
})({"slug":"icgoruler","tag":"n1-icgoruler-v1","title":"İçgörüler","type":"ARAŞTIRMA / PERSPEKTİF","edition":"11","eyebrow":"VERİNİN ANLATMADIĞINI DA SORMAK","hero":["İÇGÖRÜLER","VE FİKİRLER"],"tagline":"Görmek başka, anlamak başka.","intro":"Trendleri, davranışları ve dijital dönüşümü tek bir doğruya indirmeden; markaların bugün sorması gereken sorulara dönüştürürüz.","art":"insight","artLabel":"OBSERVE / INTERPRET / LEARN","heroFoot":"BEYOND THE SURFACE","manifesto":["DOĞRU SORU","YENİ KAPI AÇAR."],"manifestoBody":"İçgörü yalnızca bir grafik ya da veri noktası değildir. Bir örüntüyü, insan davranışını veya değişen ihtiyacı anlama çabasıdır. Yorum ile kanıtı birbirinden ayırmaya önem veririz.","pillars":[{"title":"GÖZLEMLERİZ.","desc":"Davranışları, kültürel hareketleri ve platform değişimlerini izleriz."},{"title":"BAĞLAM KURARIZ.","desc":"Tekil örnekleri daha geniş iş ve kullanıcı gerçekliği içinde değerlendiririz."},{"title":"SORU ÜRETİRİZ.","desc":"Gördüklerimizi yeni strateji ve yaratıcı düşünce başlangıçlarına çeviririz."}],"scopeTitle":["MERAKIN","PEŞİNDEYİZ."],"scopeText":"Bu sayfanın yaklaşımı araştırma ve yorum üretimidir; yayımlanmış özel araştırma veya ölçülmüş bulgu iddiası taşımaz.","scope":["Dijital davranış ve iletişim gözlemleri","Marka ve kullanıcı deneyimi perspektifleri","İçerik kültürü ve yaratıcı eğilimler","Yapay zekâ ve üretim pratikleri","Ölçüm ve stratejiye dair sorular"],"processTitle":"BAKIŞI DERİNLEŞTİR","process":[{"title":"GÖZLE.","desc":"Sinyalleri ve anlamlı değişimleri bir araya getiririz."},{"title":"YORUMLA.","desc":"Elde edilen bilgiyi bağlamı içinde tartışırız."},{"title":"SORUYA DÖNÜŞTÜR.","desc":"Sonraki hamleye yardımcı olacak hipotezler üretiriz."}],"quote":["MERAK","İLK ADIM."],"cta":["BİR FİKRİ","TARTIŞALIM."],"nextHref":"/workshops","nextLabel":"WORKSHOPS"},"https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@581d0f511a73eee246aa159ce79ce1a78ce197a1/wix-ic-sayfalar-v2/modules/n1-inner-pages-runtime-v2.js");
