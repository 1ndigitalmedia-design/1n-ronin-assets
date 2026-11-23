/* 1N Digital Media — Scroll Text Highlight hizmet bağlantıları (v6.44)
 * Adresler HTML'de gerçek href olarak yazılıdır (arama motoru + JS'siz çalışır); bu dosya yalnızca merkezi haritayla
 * (n1-links-v644.js → window.N1_ROUTES) eşitler. Geçici #hizmet-baglanmadi sistemi kaldırıldı.
 * Çok kelimeli hizmetler tek <a> içindedir; noktalama bağlantının dışında. Animasyon dosyasına dokunulmadı. */
(function () {
  'use strict';
  var R = window.N1_ROUTES || {};
  document.querySelectorAll('a[data-service]').forEach(function (a) {
    var p = R[a.getAttribute('data-service')];
    if (p) a.setAttribute('href', p);
    a.removeAttribute('data-pending'); a.removeAttribute('title');
  });
})();
