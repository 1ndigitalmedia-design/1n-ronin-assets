/* 1N INTELLIGENCE — İş Takip modülü (#html4, Google Sheets, salt okunur)
   Sözleşme (değişmedi): Velo → widget: { values: [[...satır...], ...] }
     Sheets API hata döndürdüğünde mevcut sayfa kodu { values: undefined } gönderir; bu modül
     bunu hata olarak gösterir (eski bileşen sonsuz "yükleniyor"da kalıyordu).
   Tablo yapısı: başlık satırı "Öncelik" hücresini içeren ilk satırdır. Üstündeki satırlar
   özet satırlarıdır. Kullanılan sütunlar: Öncelik, Durum, Task, Tarih (+ varsa Açıklama, Kategori).
   Bu modül hiçbir veriyi geri yazmaz; yazma yetkisi yoktur. */
(function () {
  'use strict';
  var N = window.N1I, esc = N.esc, ui = N.ui;
  var root = document.getElementById('n1i-root');
  var CLIENT = (N.cfg.client && N.cfg.client.name) || '';
  var WANTED = ['Öncelik', 'Durum', 'Task', 'Tarih'];
  var OPTIONAL = ['Açıklama', 'Kategori'];
  var model = null, filters = { q: '', pr: '', st: '' }, limit = 40, received = false;

  function norm(s) { return String(s === null || s === undefined ? '' : s).trim().toLocaleLowerCase('tr-TR'); }
  function fold(s) { return norm(s).replace(/ı/g, 'i').replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ö/g, 'o').replace(/ç/g, 'c').replace(/i̇/g, 'i'); }
  function statusOf(v) {
    var n = fold(v);
    if (n.indexOf('tamamlan') > -1) return { k: 'done', label: 'Tamamlandı', chip: 'pos', ic: 'ok' };
    if (n.indexOf('devam') > -1) return { k: 'doing', label: 'Devam ediyor', chip: 'info', ic: 'clock' };
    if (n.indexOf('bekli') > -1) return { k: 'wait', label: 'Bekliyor', chip: 'warn', ic: 'alert' };
    if (n.indexOf('iptal') > -1) return { k: 'cancel', label: 'İptal', chip: '', ic: 'close' };
    return { k: 'other', label: v ? String(v) : 'Belirtilmemiş', chip: '', ic: 'info' };
  }
  function priorityChip(v) {
    var n = fold(v);
    if (!n) return '<span class="n1i-chip">—</span>';
    if (n.indexOf('yuksek') > -1) return ui.chip('warn', v, 'up');
    if (n.indexOf('dusuk') > -1) return ui.chip('', v, 'down');
    return ui.chip('', v, 'flat');
  }
  /* Tarih: gg.aa.yyyy, g.a.yyyy, gg/aa/yyyy, yyyy-aa-gg desteklenir. Okunamayan tarih sıralamada sona gider. */
  function parseDate(s) {
    s = String(s || '').trim(); var m;
    if ((m = s.match(/^(\d{1,2})[./](\d{1,2})[./](\d{4})$/))) return Date.UTC(+m[3], +m[2] - 1, +m[1]);
    if ((m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/))) return Date.UTC(+m[1], +m[2] - 1, +m[3]);
    return null;
  }

  function shell() {
    root.innerHTML = '<section class="n1i-module" aria-labelledby="sh-title">' +
      N.header({ icon: 'sheets', tone: 'lilac', title: 'İş takip', meta: [CLIENT ? '<span>' + esc(CLIENT) + '</span>' : '', '<span>Kaynak: Google Sheets · salt okunur</span>', '<span id="sh-recv" class="n1i-loading-line"><span class="n1i-spin"></span>Yükleniyor…</span>', ui.demoChip()] }) +
      '<div data-body>' + ui.skelPanel(120) + '<div class="n1i-grid"><div class="n1i-col-12">' + ui.skelPanel(220) + '</div></div></div></section>';
    root.querySelector('h2').id = 'sh-title';
  }

  function build(values) {
    var hi = values.findIndex(function (r) { return Array.isArray(r) && r.some(function (c) { return norm(c) === 'öncelik'; }); });
    if (hi === -1) return { raw: true, header: values[0] || [], rows: values.slice(1) };
    var header = values[hi];
    function col(name) { return header.findIndex(function (h) { return norm(h) === norm(name); }); }
    var cols = WANTED.map(function (n) { return { name: n, i: col(n) }; });
    OPTIONAL.forEach(function (n) { var i = col(n); if (i > -1) cols.push({ name: n, i: i }); });
    var ti = col('Tarih');
    var rows = values.slice(hi + 1).filter(function (r) { return Array.isArray(r) && r.some(function (c) { return String(c || '').trim() !== ''; }); }).map(function (r, idx) {
      var o = { idx: idx, cells: {} };
      cols.forEach(function (c) { o.cells[c.name] = c.i > -1 ? (r[c.i] === undefined ? '' : r[c.i]) : ''; });
      o.date = ti > -1 ? parseDate(r[ti]) : null;
      o.status = statusOf(o.cells['Durum']);
      o.search = fold(cols.map(function (c) { return o.cells[c.name]; }).join(' '));
      return o;
    });
    rows.sort(function (a, b) { if (a.date === null && b.date === null) return a.idx - b.idx; if (a.date === null) return 1; if (b.date === null) return -1; return b.date - a.date; });
    var top = values.slice(0, hi).filter(function (r) { return Array.isArray(r) && r.some(function (c) { return String(c || '').trim() !== ''; }); });
    return { raw: false, cols: cols, missing: cols.filter(function (c) { return c.i === -1; }).map(function (c) { return c.name; }), rows: rows, top: top, badDates: rows.filter(function (r) { return r.cells['Tarih'] && r.date === null; }).length };
  }

  function render(values) {
    received = true;
    document.getElementById('sh-recv').textContent = ui.received();
    var body = root.querySelector('[data-body]');
    if (!Array.isArray(values)) { body.innerHTML = ui.state('error', 'İş takip verisi alınamadı', 'Google Sheets bu sekme için veri döndürmedi (erişim izni, sekme adı veya bağlantı sorunu olabilir). Bu boş bir liste değildir.'); N.height.schedule(); return; }
    if (!values.length) { body.innerHTML = ui.state('empty', 'İş takip tablosu boş', 'Sekmede henüz kayıt yok.'); N.height.schedule(); return; }
    var first = !model;
    model = build(values);
    if (model.raw) {
      body.innerHTML = ui.state('info', 'Beklenen başlık satırı bulunamadı', '"Öncelik" sütunu olmadığı için tablo olduğu gibi gösteriliyor.') +
        '<div class="n1i-tablewrap" style="margin-top:12px" tabindex="0" role="region" aria-label="İş takip tablosu"><table class="n1i-table"><thead><tr>' + model.header.map(function (h) { return '<th scope="col">' + esc(h) + '</th>'; }).join('') + '</tr></thead><tbody>' +
        model.rows.map(function (r) { return '<tr>' + model.header.map(function (_, i) { return '<td>' + esc(r[i]) + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>';
      N.height.schedule(); return;
    }
    var counts = { done: 0, doing: 0, wait: 0, cancel: 0, other: 0 };
    model.rows.forEach(function (r) { counts[r.status.k]++; });
    var prs = [], sts = [];
    model.rows.forEach(function (r) { var p = r.cells['Öncelik'], s = r.cells['Durum']; if (p && prs.indexOf(p) === -1) prs.push(p); if (s && sts.indexOf(s) === -1) sts.push(s); });

    var topHtml = model.top.length ? '<div class="n1i-panel" style="margin-bottom:12px"><div class="n1i-panel__head"><div><h3 class="n1i-h2">Tablo özeti</h3><div class="n1i-panel__sub">Sekmenin üst satırları, olduğu gibi</div></div></div><div class="n1i-tablewrap" tabindex="0" role="region" aria-label="Tablo özeti"><table class="n1i-table"><tbody>' +
      model.top.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + esc(c) + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div></div>' : '';

    body.innerHTML =
      (function () {
        var tot = model.rows.length || 1;
        var parts = [['done', 'Tamamlandı', 'var(--n1i-pos)', 'ok'], ['doing', 'Devam ediyor', 'var(--n1i-info)', 'clock'], ['wait', 'Bekliyor', 'var(--n1i-warn)', 'alert'], ['cancel', 'İptal', 'var(--n1i-faint)', 'close'], ['other', 'Diğer', 'var(--n1i-line-strong)', 'info']];
        return '<div class="n1i-panel"><div class="n1i-panel__head" style="margin-bottom:12px"><div><h3 class="n1i-h2">Durum dağılımı</h3><div class="n1i-panel__sub">' + N.fmt.int(model.rows.length) + ' kayıt · Sheets\'teki "Durum" sütununa göre</div></div></div>' +
          '<div class="n1i-stack" role="img" aria-label="' + esc(parts.filter(function (p) { return counts[p[0]]; }).map(function (p) { return p[1] + ' ' + counts[p[0]]; }).join(', ')) + '">' + parts.filter(function (p) { return counts[p[0]]; }).map(function (p) { return '<span style="width:' + (counts[p[0]] / tot * 100).toFixed(2) + '%;background:' + p[2] + '"></span>'; }).join('') + '</div>' +
          '<div class="n1i-dist">' + parts.map(function (p) { return '<div class="n1i-dist__item"><span class="n1i-dist__label"><span class="n1i-dist__dot" style="background:' + p[2] + '"></span>' + p[1] + '</span><span class="n1i-dist__value n1i-num">' + N.fmt.int(counts[p[0]]) + '</span></div>'; }).join('') + '</div></div>';
      })() +
      '<div class="n1i-grid"><div class="n1i-col-12">' + topHtml +
      '<div class="n1i-panel n1i-responsive-table">' +
      '<div class="n1i-panel__head"><div><h3 class="n1i-h2">Görevler</h3><div class="n1i-panel__sub" id="sh-count"></div></div></div>' +
      '<div style="display:grid;grid-template-columns:minmax(0,2fr) minmax(0,1fr) minmax(0,1fr);gap:8px;margin-bottom:12px" class="sh-filters">' +
      '<div class="n1i-field"><label for="sh-q">Ara</label><div class="n1i-searchbox">' + N.icon('search') + '<input id="sh-q" class="n1i-input" type="search" placeholder="Görev, durum veya tarih" autocomplete="off"></div></div>' +
      '<div class="n1i-field"><label for="sh-pr">Öncelik</label><select id="sh-pr" class="n1i-select"><option value="">Tümü</option>' + prs.map(function (p) { return '<option value="' + esc(p) + '">' + esc(p) + '</option>'; }).join('') + '</select></div>' +
      '<div class="n1i-field"><label for="sh-st">Durum</label><select id="sh-st" class="n1i-select"><option value="">Tümü</option>' + sts.map(function (p) { return '<option value="' + esc(p) + '">' + esc(p) + '</option>'; }).join('') + '</select></div>' +
      '</div><div data-list></div></div></div></div>' +
      '<div class="n1i-foot"><p>Satırlar Tarih sütununa göre yeniden eskiye sıralanır' + (model.badDates ? '; okunamayan ' + model.badDates + ' tarih sona alındı' : '') + '.</p>' + (model.missing.length ? '<p>Tabloda bulunamayan sütun: ' + esc(model.missing.join(', ')) + '.</p>' : '') + '<p>Bu bölüm salt okunurdur; değişiklikler Google Sheets üzerinden yapılır.</p></div>';
    var st = document.createElement('style'); st.textContent = '@media (max-width:639px){.sh-filters{grid-template-columns:1fr 1fr !important}.sh-filters .n1i-field:first-child{grid-column:1/-1}}';
    body.appendChild(st);
    document.getElementById('sh-q').value = filters.q;
    document.getElementById('sh-pr').value = filters.pr;
    document.getElementById('sh-st').value = filters.st;
    drawList();
    if (first) N.motion.enter(root.querySelectorAll('.n1i-kpi, .n1i-panel'));
    N.height.schedule();
  }

  function drawList() {
    var el = root.querySelector('[data-list]'); if (!el) return;
    var q = fold(filters.q);
    var rows = model.rows.filter(function (r) {
      if (filters.pr && r.cells['Öncelik'] !== filters.pr) return false;
      if (filters.st && r.cells['Durum'] !== filters.st) return false;
      if (q && r.search.indexOf(q) === -1) return false;
      return true;
    });
    document.getElementById('sh-count').textContent = N.fmt.int(rows.length) + ' / ' + N.fmt.int(model.rows.length) + ' kayıt';
    if (!rows.length) { el.innerHTML = ui.state('empty', 'Filtreye uyan kayıt yok', 'Aramayı veya filtreleri değiştirin.', '<button type="button" class="n1i-btn n1i-btn--sm" data-clear>Filtreleri temizle</button>'); N.height.schedule(); return; }
    var shown = rows.slice(0, limit);
    var cols = model.cols.filter(function (c) { return c.i > -1; });
    function cell(r, c) {
      var v = r.cells[c.name];
      if (c.name === 'Durum') return ui.chip(r.status.chip, r.status.label, r.status.ic);
      if (c.name === 'Öncelik') return priorityChip(v);
      return esc(v);
    }
    el.innerHTML = '<div class="n1i-tablewrap" tabindex="0" role="region" aria-label="Görev tablosu"><table class="n1i-table"><thead><tr>' + cols.map(function (c) { return '<th scope="col">' + esc(c.name === 'Task' ? 'Görev' : c.name) + '</th>'; }).join('') + '</tr></thead><tbody>' +
      shown.map(function (r) { return '<tr>' + cols.map(function (c) { return '<td' + (c.name === 'Task' || c.name === 'Açıklama' ? ' class="is-name"' : (c.name === 'Tarih' ? ' style="white-space:nowrap"' : '')) + '>' + cell(r, c) + '</td>'; }).join('') + '</tr>'; }).join('') +
      '</tbody></table></div>' +
      '<ul class="n1i-cards" aria-label="Görevler">' + shown.map(function (r) {
        return '<li class="n1i-ccard"><div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px">' + ui.chip(r.status.chip, r.status.label, r.status.ic) + priorityChip(r.cells['Öncelik']) + '</div><div class="n1i-ccard__name">' + esc(r.cells['Task'] || '(görev adı yok)') + '</div>' +
          (r.cells['Açıklama'] ? '<p style="margin:0 0 6px;color:var(--n1i-text-2);font-size:var(--n1i-fs-sm)">' + esc(r.cells['Açıklama']) + '</p>' : '') +
          '<div style="color:var(--n1i-muted);font-size:var(--n1i-fs-xs)">' + esc(r.cells['Tarih'] || 'Tarih yok') + (r.cells['Kategori'] ? ' · ' + esc(r.cells['Kategori']) : '') + '</div></li>';
      }).join('') + '</ul>' +
      (rows.length > shown.length ? '<div style="margin-top:12px"><button type="button" class="n1i-btn n1i-btn--sm" data-more>Daha fazla göster (' + N.fmt.int(rows.length - shown.length) + ')</button></div>' : '');
    N.height.schedule();
  }

  root.addEventListener('input', function (e) {
    if (!model) return;
    if (e.target.id === 'sh-q') { filters.q = e.target.value; limit = 40; drawList(); }
  });
  root.addEventListener('change', function (e) {
    if (!model) return;
    if (e.target.id === 'sh-pr') { filters.pr = e.target.value; limit = 40; drawList(); }
    if (e.target.id === 'sh-st') { filters.st = e.target.value; limit = 40; drawList(); }
  });
  root.addEventListener('click', function (e) {
    if (e.target.closest('[data-more]')) { limit += 40; drawList(); }
    if (e.target.closest('[data-clear]')) { filters = { q: '', pr: '', st: '' }; ['sh-q', 'sh-pr', 'sh-st'].forEach(function (id) { document.getElementById(id).value = ''; }); drawList(); }
  });

  shell();
  N.height.start(root);
  var stop = N.watchdog(function () { if (received) return; root.querySelector('[data-body]').innerHTML = ui.state('warn', 'İş takip verisi gelmedi', 'Sayfa kodu bu bölüme veri göndermedi. Sorun sürerse sayfayı yenileyin.'); document.getElementById('sh-recv').textContent = ''; N.height.schedule(); });
  N.bridge.listen(function (d) { stop(); render(d.values); }, {
    accept: function (d) { return 'values' in d; },
    onError: function () { root.querySelector('[data-body]').innerHTML = ui.state('error', 'Görüntüleme hatası', 'Gelen veri beklenen biçimde değil.'); }
  });
})();
