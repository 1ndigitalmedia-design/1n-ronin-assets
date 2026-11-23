/* 1N Digital Media | Çalışma Ritmimiz | Wix Studio Custom Element n1-ritim-v1 | SVG-only icons */
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
})({"slug":"calisma-ritmimiz","tag":"n1-ritim-v1","title":"Çalışma Ritmimiz","type":"STÜDYO / METODOLOJİ","edition":"03","eyebrow":"İYİ İŞ, DOĞRU RİTİMLE BAŞLAR","hero":["ÇALIŞMA","RİTMİMİZ"],"tagline":"Süreçte netlik. Üretimde akış.","intro":"Fikri aceleye getirmeden ilerler, karar anlarını görünür kılarız. Strateji, tasarım ve uygulama aynı ritimde buluşur.","art":"rhythm","artLabel":"STRATEGY / CRAFT / DELIVERY","heroFoot":"DISCOVER OUR WAY OF WORKING","manifesto":["İLHAM TESADÜF","SÜREÇ BİLİNÇLİ."],"manifestoBody":"Yaratıcılığı takvimden bağımsız bir mucize olarak görmeyiz. Her projenin hedefini, sorumluluklarını ve teslim ritmini baştan tanımlar; fikirlerin olgunlaşabileceği bir çalışma alanı kurarız.","pillars":[{"title":"ÖNCE ANLARIZ.","desc":"Markanın ihtiyacını, hedef kitleyi ve başarı ölçütlerini ortak bir zeminde netleştiririz."},{"title":"BİRLİKTE ŞEKİLLENDİRİRİZ.","desc":"Taslakları, alternatifleri ve geri bildirimleri tek bir yaratıcı doğrultuda buluştururuz."},{"title":"ÖLÇER, GELİŞTİRİRİZ.","desc":"Teslimden sonra da öğrendiklerimizi sonraki üretimin girdisine dönüştürürüz."}],"scopeTitle":["BİRLİKTE","NASIL İLERLERİZ?"],"scopeText":"Her işin kapsamı farklıdır; çalışma disiplinimiz ise nettir. Sürecin her aşaması doğru sorular, görünür kararlar ve karşılıklı iletişim üzerine kurulur.","scope":["Brief ve hedeflerin netleştirilmesi","Araştırma ve yaratıcı yön belirleme","Konsept ve prototip geliştirme","Revizyon ve kalite kontrol","Yayın, izleme ve öğrenme"],"processTitle":"RİTMİN ÜÇ EVRESİ","process":[{"title":"KEŞİF.","desc":"Problemi tanımlar, doğru soruların peşine düşeriz."},{"title":"ÜRETİM.","desc":"Fikri tasarıma, içeriğe ya da çalışan bir deneyime dönüştürürüz."},{"title":"İYİLEŞTİRME.","desc":"Uygulamadan elde edilen verilerle yeni kararlar alırız."}],"quote":["İYİ FİKİR","İYİ AKIŞ İSTER."],"cta":["BİRLİKTE","BAŞLAYALIM."],"nextHref":"/kreatif-studyo","nextLabel":"KREATİF STÜDYO"},"https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@11bc39eb7d9dc40b92e11a7d8e3ea374b7528f8d/wix-ic-sayfalar-v1/modules/n1-inner-pages-runtime-v1.js");
