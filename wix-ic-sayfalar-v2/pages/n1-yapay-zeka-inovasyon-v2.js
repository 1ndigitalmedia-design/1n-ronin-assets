/* 1N Digital Media | Yapay Zekâ & İnovasyon | V2 / #A8CF62 | Wix Studio Custom Element n1-ai-inovasyon-v1 | SVG-only icons */
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
})({"slug":"yapay-zeka-inovasyon","tag":"n1-ai-inovasyon-v1","title":"Yapay Zekâ & İnovasyon","type":"TEKNOLOJİ / KEŞİF","edition":"09","eyebrow":"YENİ ARAÇLAR, DAHA İYİ SORULAR","hero":["YAPAY ZEKÂ","& İNOVASYON"],"tagline":"Teknoloji değil, yarattığı değer.","intro":"Yeni teknolojileri gösteri amaçlı değil; yaratıcı üretimi, iş akışlarını ve kullanıcı deneyimlerini daha anlamlı hâle getirmek için değerlendiririz.","art":"innovation","artLabel":"EXPLORE / PROTOTYPE / APPLY","heroFoot":"HUMAN-LED INNOVATION","manifesto":["GELECEK BİR ARAÇ","DEĞİL YAKLAŞIM."],"manifestoBody":"Yapay zekâyı tek başına çözüm olarak sunmayız. Gerçek problemi tanımlar, verinin ve insan denetiminin rolünü belirler, uygun teknolojiyi kontrollü prototiplerle sınarız.","pillars":[{"title":"İHTİYACI BULURUZ.","desc":"Teknoloji kullanmadan önce çözülmesi gereken işi netleştiririz."},{"title":"KÜÇÜK DENERİZ.","desc":"Prototiplerle değer, kalite ve operasyonel uyumu test ederiz."},{"title":"İNSANI MERKEZDE TUTARIZ.","desc":"Marka sesi, veri güvenliği ve yaratıcı kararlar için insan kontrolünü koruruz."}],"scopeTitle":["YENİ OLANA","AKILLI BAKIŞ."],"scopeText":"Deneysel fikri uygulanabilir sisteme dönüştürürken doğruluk, gizlilik ve sürdürülebilirlik kriterlerini gözetiriz.","scope":["AI destekli yaratıcı konseptler","İçerik üretim akışı prototipleri","İş süreçleri için otomasyon fikirleri","Prompt ve kalite kontrol sistemleri","Yeni dijital ürün keşifleri"],"processTitle":"DENEYDEN DEĞERE","process":[{"title":"SORUNU TANIMLA.","desc":"Kullanıcıyı, veri akışını ve beklenen kazanımı analiz ederiz."},{"title":"PROTOTİP OLUŞTUR.","desc":"Küçük ama sınanabilir bir ilk çözüm tasarlarız."},{"title":"DOĞRULA.","desc":"Kalite, güvenilirlik ve operasyonel uyumu değerlendiririz."}],"quote":["YENİ OLAN","YETERLİ DEĞİL."],"cta":["YENİ BİR","ŞEY DENEYELİM."],"nextHref":"/yapay-zeka","nextLabel":"YAPAY ZEKÂ"},"https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@581d0f511a73eee246aa159ce79ce1a78ce197a1/wix-ic-sayfalar-v2/modules/n1-inner-pages-runtime-v2.js");
