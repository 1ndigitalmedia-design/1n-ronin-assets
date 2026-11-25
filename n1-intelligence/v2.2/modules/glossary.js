/* 1N INTELLIGENCE — Terimler sözlüğü / bilgi merkezi (#html15)
   Mevcut terimler ve açıklamaları DEĞİŞTİRİLMEDEN korunur (kaynak: mevcut #html15).
   "Yeni" işaretli terimler bu sürümde eklenen ve onay bekleyen açıklamalardır.
   Mevcut açıklamalardaki teknik notlar arayüzde değil, ARCHITECTURE_REPORT.md içinde raporlanır. */
(function () {
  'use strict';
  var N = window.N1I, esc = N.esc, ui = N.ui;
  var root = document.getElementById('n1i-root');
  var CATS = [
    { id: 'ga', title: 'Google Analytics', icon: 'ga4', terms: [
      ['Oturum', 'Bir ziyaretçinin sitenize yaptığı tek bir ziyaret. Aynı kişi bir gün içinde birden çok kez gelirse birden çok oturum sayılır.'],
      ['Kullanıcı', 'Sitenizi ziyaret eden tekil (farklı) kişi sayısı.'],
      ['Yeni Kullanıcı', 'Sitenize daha önce hiç gelmemiş, ilk kez ziyaret eden kişi sayısı.'],
      ['Sayfa Görüntüleme', 'Sitenizdeki sayfaların toplam kaç kez açıldığı.'],
      ['Etkileşim Oranı', 'Ziyaretçilerin sitede aktif olarak vakit geçirme veya bir işlem yapma oranı. Yüksek olması iyidir.'],
      ['Ortalama Oturum Süresi', 'Ziyaretçilerin sitenizde ortalama ne kadar süre kaldığı.'],
      ['Trafik Kaynağı', 'Ziyaretçilerin sitenize hangi yoldan (Google araması, sosyal medya, direkt giriş vb.) geldiği.'],
      ['Cihaz Dağılımı', 'Ziyaretçilerin sitenize telefon, bilgisayar ya da tablet üzerinden girme oranı.']
    ] },
    { id: 'meta', title: 'Meta Reklam (Facebook / Instagram)', icon: 'meta', terms: [
      ['Gösterim', 'Reklamınızın ekranlarda toplam kaç kez görüntülendiği.'],
      ['Tıklama', 'Reklamınıza kullanıcıların kaç kez tıkladığı.'],
      ['CTR (Tıklama Oranı)', 'Reklamı görenlerin yüzde kaçının tıkladığı. Yüksek olması reklamın ilgi çektiğini gösterir.'],
      ['Harcama', 'Seçilen tarih aralığında reklamlara ödenen toplam tutar.'],
      ['CPC (Tıklama Başı Maliyet)', 'Bir tıklama için ortalama ne kadar ödendiği. Düşük olması maliyet verimliliği açısından iyidir.'],
      ['Dönüşüm', 'Reklamı gören kişilerin form doldurma, satın alma, arama gibi istenen bir işlemi tamamlama sayısı.'],
      ['CPM (Bin Gösterim Maliyeti)', '1.000 gösterim için ödenen ortalama tutar. Harcama ÷ gösterim × 1.000 olarak hesaplanır.', true],
      ['Mesajlaşma Başlatma', 'Reklamdan sonra başlatılan Messenger, Instagram DM veya WhatsApp konuşması sayısı. Bir satış olduğu anlamına gelmez.', true],
      ['Bağlantı Tıklaması', 'Reklamdaki bağlantıya yapılan tıklamalar. Meta\'nın genel "Tıklama" sayısı bunun yanında profil, beğeni gibi tıklamaları da içerir.', true]
    ] },
    { id: 'gads', title: 'Google Ads', icon: 'gads', terms: [
      ['Ort. TBM (CPC)', 'Tıklama başına ortalama maliyet: toplam harcama ÷ tıklama.', true],
      ['Dönüşüm (Google Ads)', 'Google Ads hesabında tanımlı işlemler (ör. arama, form, satın alma). İlişkilendirme modeli nedeniyle kesirli olabilir.', true],
      ['Dönüşüm Değeri', 'Dönüşümlere Google Ads\'te atanmış değerlerin toplamı. İşletmenin gerçek cirosu değildir.', true]
    ] },
    { id: 'ig', title: 'Instagram', icon: 'instagram', terms: [
      ['Takipçi', 'Instagram hesabınızı takip eden kişi sayısı.'],
      ['Takip Edilen', 'Hesabınızın takip ettiği kişi/hesap sayısı.'],
      ['Gönderi', 'Hesabınızda paylaşılan toplam gönderi (fotoğraf/video) sayısı.'],
      ['Yeni Takipçi', 'Meta\'nın günlük yeni takipçi verisinin (follower_count) son 30 gün (bugün hariç) toplamı. Takipten çıkmalar düşülmez; net değişim değildir.', true],
      ['Son 5 Gönderi Etkileşimi', 'En son paylaşılan 5 gönderinin beğeni ve yorum toplamı.', true]
    ] }
  ];
  var onlyCats = N.cfg.options && N.cfg.options.categories;
  if (Array.isArray(onlyCats)) CATS = CATS.filter(function (c) { return onlyCats.indexOf(c.id) > -1; });

  function fold(s) { return String(s || '').toLocaleLowerCase('tr-TR').replace(/ı/g, 'i').replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ö/g, 'o').replace(/ç/g, 'c'); }
  var wide = window.matchMedia('(min-width: 720px)').matches;
  var open = {}; CATS.forEach(function (c, i) { open[c.id] = wide || i === 0; });
  var q = '';

  root.innerHTML = '<section class="n1i-module" aria-labelledby="gl-title">' +
    N.header({ icon: 'glossary', tone: 'teal', title: 'Terimler sözlüğü', meta: ['<span>Raporlarda geçen terimlerin kısa açıklamaları</span>'] }) +
    '<div style="display:grid;grid-template-columns:minmax(0,1fr) auto;gap:8px;align-items:end;margin-bottom:12px" class="gl-tools">' +
    '<div class="n1i-field"><label for="gl-q">Terim ara</label><div class="n1i-searchbox">' + N.icon('search') + '<input id="gl-q" class="n1i-input" type="search" placeholder="ör. CTR, oturum, takipçi" autocomplete="off"></div></div>' +
    '<div style="display:flex;gap:8px"><button type="button" class="n1i-btn n1i-btn--sm" data-all="1">Tümünü aç</button><button type="button" class="n1i-btn n1i-btn--sm" data-all="0">Tümünü kapat</button></div></div>' +
    '<div data-list></div><p class="n1i-summary-text" id="gl-count" aria-live="polite"></p></section>';
  root.querySelector('h2').id = 'gl-title';
  var st = document.createElement('style');
  st.textContent = '.gl-cat{border:var(--n1i-border-soft);border-radius:var(--n1i-r-md);background:var(--n1i-panel-raised);margin-bottom:8px}' +
    '.gl-cat__btn{width:100%;display:flex;align-items:center;gap:10px;padding:12px 14px;min-height:48px;background:none;border:0;color:var(--n1i-text);text-align:left;font-weight:600;font-size:var(--n1i-fs-md)}' +
    '.gl-cat__btn svg{width:16px;height:16px;color:var(--n1i-muted);flex:none}.gl-cat__btn .gl-chev{margin-left:auto;transition:transform var(--n1i-dur) var(--n1i-ease)}' +
    '.gl-cat__btn[aria-expanded="true"] .gl-chev{transform:rotate(180deg)}' +
    '.gl-cat__n{color:var(--n1i-muted);font-weight:500;font-size:var(--n1i-fs-xs)}' +
    '.gl-terms{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:8px;padding:0 14px 14px;margin:0}' +
    '.gl-term{padding:12px;border-radius:var(--n1i-r-sm);background:var(--n1i-panel-sunken);border:var(--n1i-border-soft)}' +
    '.gl-term dt{font-weight:600;margin-bottom:4px;display:flex;gap:8px;align-items:center;flex-wrap:wrap}.gl-term dd{margin:0;color:var(--n1i-text-2);font-size:var(--n1i-fs-sm);line-height:1.5}' +
    '.gl-term mark{background:var(--n1i-accent-soft);color:var(--n1i-text);border-radius:2px}' +
    '@media (max-width:479px){.gl-tools{grid-template-columns:1fr !important}}';
  document.head.appendChild(st);

  function hl(text) {
    var t = esc(text); if (!q) return t;
    var src = String(text), fs = fold(src), fq = fold(q), i = fs.indexOf(fq);
    if (i < 0 || fs.length !== src.length) return t;
    return esc(src.slice(0, i)) + '<mark>' + esc(src.slice(i, i + q.length)) + '</mark>' + esc(src.slice(i + q.length));
  }
  function draw() {
    var fq = fold(q.trim()), total = 0;
    var html = CATS.map(function (c) {
      var terms = c.terms.filter(function (t) { return !fq || fold(t[0] + ' ' + t[1]).indexOf(fq) > -1; });
      total += terms.length;
      if (!terms.length) return '';
      var isOpen = fq ? true : open[c.id];
      var pid = 'gl-' + c.id;
      return '<div class="gl-cat"><button type="button" class="gl-cat__btn" data-cat="' + c.id + '" aria-expanded="' + isOpen + '" aria-controls="' + pid + '">' + N.icon(c.icon) + '<span>' + esc(c.title) + '</span><span class="gl-cat__n">' + terms.length + ' terim</span>' + N.icon('chevron', 'gl-chev') + '</button>' +
        '<dl class="gl-terms" id="' + pid + '"' + (isOpen ? '' : ' hidden') + '>' + terms.map(function (t) {
          return '<div class="gl-term"><dt>' + hl(t[0]) + (t[2] ? ui.chip('info', 'Yeni · onay bekliyor') : '') + '</dt><dd>' + hl(t[1]) + '</dd></div>';
        }).join('') + '</dl></div>';
    }).join('');
    root.querySelector('[data-list]').innerHTML = html || ui.state('empty', 'Eşleşen terim yok', '"' + esc(q) + '" için sonuç bulunamadı.');
    document.getElementById('gl-count').textContent = fq ? total + ' terim bulundu' : '';
    N.height.schedule();
  }
  root.addEventListener('click', function (e) {
    var b = e.target.closest('[data-cat]');
    if (b) { var id = b.getAttribute('data-cat'); open[id] = b.getAttribute('aria-expanded') !== 'true'; draw(); var nb = root.querySelector('[data-cat="' + id + '"]'); if (nb) nb.focus(); return; }
    var a = e.target.closest('[data-all]');
    if (a) { var v = a.getAttribute('data-all') === '1'; CATS.forEach(function (c) { open[c.id] = v; }); draw(); }
  });
  document.getElementById('gl-q').addEventListener('input', function (e) { q = e.target.value; draw(); });
  draw();
  N.height.start(root);
})();
