/* 1N INTELLIGENCE — Dijital Varlık Yönetimi (#html7, Google Drive ortak arşiv)
   Veri kaynağı: API yok. Bağlantı müşteri yapılandırmasında durur (N1I_CONFIG.client.driveUrl).
   Paylaşım izinleri bu bileşenle değişmez; bağlantı yalnızca Drive'ı yeni sekmede açar.
   Güvenlik: yalnızca https://drive.google.com/ adresleri kabul edilir. */
(function () {
  'use strict';
  var N = window.N1I, esc = N.esc, ui = N.ui;
  var root = document.getElementById('n1i-root');
  var url = (N.cfg.client && N.cfg.client.driveUrl) || '';
  var valid = /^https:\/\/drive\.google\.com\//.test(url);
  var kinds = ['Prodüksiyon videoları', 'Logo ve marka varlıkları', 'Sosyal medya içerikleri', 'Baskıya hazır tasarımlar'];

  root.innerHTML = '<section class="n1i-module" aria-labelledby="dv-title">' +
    N.header({ icon: 'drive', tone: 'sand', title: 'Dijital varlık arşivi', meta: ['<span>Google Drive ortak klasörü</span>'] }) +
    '<div class="n1i-grid" style="margin-top:0;align-items:stretch">' +
    '<div class="n1i-panel n1i-col-8"><p style="margin:0 0 12px;color:var(--n1i-text-2);max-width:68ch">Markanıza ait dijital ve basılı materyaller bu ortak arşivde düzenli olarak saklanır ve güncellenir.</p>' +
    '<ul style="list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:8px">' + kinds.map(function (k) { return '<li style="display:flex;align-items:center;gap:8px;color:var(--n1i-text);font-size:var(--n1i-fs-sm)"><span style="color:var(--n1i-muted);width:16px;height:16px;flex:none">' + N.icon('drive') + '</span>' + esc(k) + '</li>'; }).join('') + '</ul></div>' +
    '<div class="n1i-panel n1i-col-4" style="display:flex;flex-direction:column;gap:12px;justify-content:center">' +
    (valid ? '<a class="n1i-btn n1i-btn--primary" href="' + esc(url) + '" target="_blank" rel="noopener noreferrer">' + N.icon('external') + 'Google Drive\'ı aç<span class="n1i-sr"> (yeni sekmede açılır)</span></a>'
      : ui.state('warn', 'Arşiv bağlantısı tanımlı değil', 'Bağlantı 1N tarafından eklenecek.')) +
    '<div class="n1i-state n1i-state--info" style="padding:10px 12px">' + N.icon('lock') + '<p class="n1i-state__text" style="color:var(--n1i-text-2)">Ortak Google Drive klasörünü yalnızca erişim yetkisi verilmiş hesaplar görüntüleyebilir.</p></div>' +
    '</div></div></section>';
  root.querySelector('h2').id = 'dv-title';
  N.height.start(root);
})();
