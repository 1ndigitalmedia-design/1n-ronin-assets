/* 1N INTELLIGENCE — Domain ve Lisans modülü (#html6)
   Veri kaynağı: API yok; tarihler müşteri yapılandırmasında elle tutulur (mevcut bileşende de kod içindeydi).
   Yapılandırma: N1I_CONFIG.client.renewals = [{ label, date:'gg.aa.yyyy', verifiedUntil?:'gg.aa.yyyy', checkedAt?:'gg.aa.yyyy' }]
   DEĞİŞEN DAVRANIŞ (rapor edildi): Eski bileşen geçmiş tarihi her yıl otomatik ileri taşıyordu (getNextCycle).
   Bu, yenileme yapılmadığı halde süre varmış gibi gösterebilir. Yeni modül geçmiş tarihi taşımaz;
   "Yenileme doğrulanmadı" uyarısı gösterir. Yenileme yapıldıysa yapılandırmaya verifiedUntil yazılır. */
(function () {
  'use strict';
  var N = window.N1I, esc = N.esc, ui = N.ui, f = N.fmt;
  var root = document.getElementById('n1i-root');
  var items = (N.cfg.client && Array.isArray(N.cfg.client.renewals)) ? N.cfg.client.renewals : [];

  function parse(s) { var m = String(s || '').trim().match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/); return m ? Date.UTC(+m[3], +m[2] - 1, +m[1]) : null; }
  function todayUTC() { var t = f.todayISO().split('-'); return Date.UTC(+t[0], +t[1] - 1, +t[2]); }
  function show(ms) { return new Intl.DateTimeFormat('tr-TR', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(ms)); }

  function card(it) {
    var base = parse(it.verifiedUntil) || parse(it.date);
    /* V2.2: tarih bilinmiyorsa tahmin yok, "doğrulanmadı" */
    if (base === null) return ui.kpi({ label: it.label, value: N.DASH, state: 'na', foot: (it.date ? 'Tarih okunamadı: ' + esc(it.date) + '<br>' : '') + ui.chip('warn', 'Bitiş tarihi doğrulanmadı', 'alert'), tip: '<b>' + esc(it.label) + '</b>: Bitiş tarihi 1N kayıtlarında yok veya okunamadı. Tarih tahmin edilmez; kayıt firmasından doğrulanıp yapılandırmaya yazılmalıdır.' });
    var days = Math.round((base - todayUTC()) / 86400000);
    var chip, value, foot, state = 'ok';
    if (days < 0) {
      value = esc(f.int(Math.abs(days))) + '<small>gün önce doldu</small>';
      chip = ui.chip('neg', 'Yenileme doğrulanmadı', 'alert');
      foot = 'Kayıtlı bitiş: <b>' + show(base) + '</b><br>' + chip + '<br>Yenilendiyse yeni bitiş tarihi 1N tarafından güncellenmelidir.';
      state = 'err';
    } else {
      value = esc(f.int(days)) + '<small>gün kaldı</small>';
      chip = days <= 30 ? ui.chip('neg', 'Yenileme yaklaştı', 'alert') : days <= 90 ? ui.chip('warn', '90 günden az', 'clock') : ui.chip('pos', 'Süre yeterli', 'ok');
      foot = 'Bitiş: <b>' + show(base) + '</b><br>' + chip;
    }
    foot += it.checkedAt ? '<br>Son kontrol: ' + esc(it.checkedAt) : '<br><span title="Tarih kayıt firmasıyla karşılaştırılmadı">Kaynakla doğrulanmadı</span>';
    return ui.kpi({ cls: 'n1i-kpi--lg', label: it.label, value: value, foot: foot, state: state, tip: '<b>' + esc(it.label) + '</b>: Tarih 1N tarafından elle kaydedilir; kayıt firmasıyla otomatik eşitlenmez. 30 gün ve altı kırmızı, 90 gün ve altı sarı uyarıdır. Geçmiş tarih otomatik ileri taşınmaz.' });
  }

  root.innerHTML = '<section class="n1i-module" aria-labelledby="dm-title">' +
    N.header({ icon: 'domain', tone: 'sky', title: 'Domain ve lisans', meta: ['<span>Yenileme takibi</span>', '<span>Kaynak: 1N kayıtları (elle)</span>'] }) +
    (items.length ? '<div class="n1i-kpis" style="--n1i-kpi-desktop:' + Math.min(4, Math.max(2, items.length)) + '">' + items.map(card).join('') + '</div>' : ui.state('empty', 'Kayıtlı yenileme tarihi yok', 'Bu müşteri için domain veya lisans tarihi tanımlanmamış.')) +
    '</section>';
  root.querySelector('h2').id = 'dm-title';
  var st = document.createElement('style'); st.textContent = '@media (max-width:479px){#n1i-root .n1i-kpis{--n1i-kpi-cols:1 !important}}'; document.head.appendChild(st);
  N.height.start(root);
  N.motion.enter(root.querySelectorAll('.n1i-kpi'));
})();
