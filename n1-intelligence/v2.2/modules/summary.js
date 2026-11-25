/* 1N INTELLIGENCE — Genel Özet modülü (#html18)
   Sözleşme (değişmedi): Velo sayfa açılışında BİR KEZ gönderir:
     { visitors, sessions, visitorSeries:[{date:'YYYYMMDD', value}], totalSpend, spendPeriodLabel,
       totalClicks, followers, followerGrowth30, followerSeries:[{value, end_time}] }
   İsteğe bağlı, geriye uyumlu ek alan (önerilir, Velo'da henüz YOK):
     sourceStatus: { ga, meta7, google7, metaMtd, googleMtd, instagram } değerleri 'ok' | 'error' | 'missing'
   sourceStatus gelmezse 0 değerleri "doğrulanamadı" notuyla gösterilir, çünkü mevcut sayfa kodu
   veri alınamadığında da 0 gönderiyor. Her kart kendi dönemini gösterir; tek bir filtreye bağlı değildir. */
(function () {
  'use strict';
  var N = window.N1I, f = N.fmt, esc = N.esc, ui = N.ui;
  var root = document.getElementById('n1i-root');
  var visChart = null, folChart = null, received = false;
  var MONTHS = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];

  function shell() {
    root.innerHTML = '<section class="n1i-module" aria-labelledby="sum-title">' +
      N.header({ icon: 'summary', tone: 'lime', title: 'Genel özet', meta: ['<span>Her kart kendi döneminde</span>', '<span id="sum-recv" class="n1i-loading-line"><span class="n1i-spin"></span>Yükleniyor…</span>', ui.demoChip()] }) +
      '<div data-body class="n1i-wash"><div class="n1i-hero"><div>' + ui.skelPanel(300) + '</div><div class="n1i-hero__side">' + [0, 1, 2, 3].map(function (i) { return '<div class="n1i-kpi' + (i > 1 ? ' n1i-span2' : '') + '" aria-hidden="true"><div class="n1i-skel n1i-skel--text" style="width:55%"></div><div class="n1i-skel n1i-skel--value"></div><div class="n1i-skel n1i-skel--text" style="width:40%"></div></div>'; }).join('') + '</div></div></div></section>';
    root.querySelector('h2').id = 'sum-title';
  }

  function status(d, key) { return d.sourceStatus && d.sourceStatus[key] ? d.sourceStatus[key] : null; }

  function render(d) {
    received = true;
    var first = !root.querySelector('[data-rendered]');
    document.getElementById('sum-recv').textContent = ui.received();
    var hasStatus = !!d.sourceStatus;

    // ---- Oturum (GA4, son 7 gün). Ek satır: ziyaretçi başına oturum (aynı karttaki iki gerçek değerden) ----
    var gaSt = status(d, 'ga');
    var gaFail = gaSt === 'error' || gaSt === 'missing';
    /* V2.2: GA4 isteği başarılı ama satır yoksa bu gerçek sıfırdır ("veri alınamadı" değil) */
    if (gaSt === 'empty') { if (d.visitors === null || d.visitors === undefined) d.visitors = 0; if (d.sessions === null || d.sessions === undefined) d.sessions = 0; }
    function sessionsCard() {
      var tip = '<b>Oturum</b>: GA4 sessions, ' + (d.spendPeriod ? 'bugün dahil son 7 takvim günü' : 'son 7 gün + bugün') + '. <b>Ziyaretçi başına</b>: oturum ÷ aktif kullanıcı (aynı dönem).';
      if (gaFail || d.sessions === null || d.sessions === undefined) return ui.kpi({ id: 's-ses', label: 'Oturum', value: N.DASH, state: 'na', foot: '<b>Son 7 gün</b> · ' + (gaFail ? ui.chip('neg', 'Veri alınamadı', 'error') : 'veri yok'), tip: tip, cls: 'n1i-glass' });
      var ratio = f.isNum(d.visitors) && Number(d.visitors) > 0 ? f.dec2(Number(d.sessions) / Number(d.visitors)) : null;
      return ui.kpi({ id: 's-ses', label: 'Oturum', value: f.int(d.sessions), foot: '<b>Son 7 gün</b> · bugün dahil', tip: tip, cls: 'n1i-glass',
        aside: ratio ? '<span>Ziyaretçi başına</span><b class="n1i-num">' + ratio + '</b>' : '' });
    }

    // ---- Reklam kartları ----
    function adsCard(id, label, value, keys, periodHtml, formatter, tip, accent, aside, compact) {
      var sts = keys.map(function (k) { return status(d, k); });
      var bad = sts.filter(function (s) { return s === 'error' || s === 'missing'; }).length;
      var foot = periodHtml, state = 'ok', shown = formatter(value), cmp = compact ? compact(value) : null;
      if (!hasStatus) {
        if (Number(value) === 0) foot += ' · <span title="Mevcut sayfa kodu veri alınamadığında da 0 gönderir">0 doğrulanamadı</span>';
      } else if (bad === keys.length) { shown = N.DASH; cmp = null; state = 'na'; foot += ' · ' + ui.chip('neg', 'Veri alınamadı', 'error'); }
      else if (bad > 0) { foot += ' · ' + ui.chip('warn', 'Kısmi: ' + (sts[0] === 'ok' ? 'yalnızca Meta' : 'yalnızca Google'), 'alert'); }
      return ui.kpi({ id: id, label: label, value: shown, compact: cmp, foot: foot, state: state, tip: tip, aside: state === 'ok' ? aside : '', cls: (accent && state === 'ok' ? 'n1i-kpi--accent' : 'n1i-glass') + (accent ? ' n1i-span2' : '') });
    }
    var now = new Date(), monthLabel = d.spendPeriodLabel || (MONTHS[now.getMonth()] + ' Ayı');
    var monthName = monthLabel.replace(' Ayı', '');
    /* V2.2: dönem sunucudan (Europe/Istanbul takvim günü). Yoksa V2.1 davranışı. */
    var v22 = !!d.spendPeriod;
    var todayDay = v22 ? Number(d.spendPeriod.end.slice(8, 10)) : Number(f.todayISO().slice(8, 10));
    var spendNote = v22 ? 'Ayın 1\'inden bugüne (Türkiye saatiyle), bugün devam ediyor.' : 'Not: mevcut sayfa kodunda Meta ay başı hesabı önceki ayın son gününü de içeriyor; düzeltme onay bekliyor (DATA_ACCURACY_REVIEW V2).';
    var acc = d.accountCheck, curNote = '';
    if (acc) {
      var plats = [acc.meta, acc.gads].filter(Boolean);
      var bad = plats.some(function (x) { return x.currencyOk === false; });
      var verified = plats.length && plats.every(function (x) { return x.currencyOk === true; });
      curNote = bad ? ' ' + ui.chip('warn', 'Para birimi uyuşmuyor', 'alert') : (verified ? '' : ' · <span title="Hesap para birimi API\'den doğrulanmadı">para birimi doğrulanmadı</span>');
    }

    var side = '<div class="n1i-hero__side">' +
      sessionsCard() +
      adsCard('s-clk', 'Reklam tıklaması', d.totalClicks, ['meta7', 'google7'], '<b>Son 7 gün</b> · bugün dahil', f.int,
        '<b>Reklam tıklaması</b>: Meta "clicks (tümü)" ile Google Ads "clicks" toplamı. İki platformun tıklama tanımı aynı değildir; toplam yaklaşık bir göstergedir.', false,
        '<span>Kaynak</span><b>Meta + Google</b>') +
      adsCard('s-spd', 'Reklam harcaması', d.totalSpend, ['metaMtd', 'googleMtd'], '<b>' + esc(monthName) + '</b> · ay başından bugüne' + curNote, f.money,
        '<b>Reklam harcaması</b>: Bu ayın 1\'inden bugüne Meta + Google Ads harcaması. Diğer bölümlerdeki 7/30 gün seçiminden bağımsızdır. ' + spendNote, true,
        '<span>Dönem</span><b>1–' + todayDay + ' ' + esc(monthName) + '</b>', f.moneyShort) +
      '<div class="n1i-kpi n1i-glass n1i-span2" id="s-ig" data-ig></div>' +
      '</div>';

    var body = root.querySelector('[data-body]');
    body.setAttribute('data-rendered', '1');
    body.innerHTML = '<div class="n1i-hero"><div class="n1i-hero__main n1i-glass" id="s-vis" data-vis></div>' + side + '</div>' +
      '<div class="n1i-foot"><p>Dönemler farklıdır: ziyaretçi, oturum ve tıklama son 7 gün; harcama ay başından bugüne; takipçi mevcut toplam; yeni takipçi Meta\'nın günlük verisi (bugün hariç, gelen gün sayısı kadar). Bu özet sayfa açılışında bir kez hesaplanır, bölümlerdeki aralık seçimlerinden etkilenmez.</p>' +
      (hasStatus ? '' : '<p>Kaynak durumu bilgisi gelmediği için 0 değerler doğrulanamıyor (bkz. DATA_CONTRACTS.md, önerilen sourceStatus alanı).</p>') + '</div>';

    renderVisitors(d, gaFail);
    renderInstagram(d);
    if (first && !gaFail) { N.motion.count(document.querySelector('#s-vis [data-v]'), d.visitors, f.int); N.motion.count(document.querySelector('#s-ses [data-v]'), d.sessions, f.int); }
    N.fitNumbers(root, true);
    if (first) N.motion.enter(root.querySelectorAll('.n1i-kpi, .n1i-hero__main'));
    N.height.schedule();
  }

  function renderVisitors(d, gaFail) {
    var el = root.querySelector('[data-vis]');
    var na = gaFail || d.visitors === null || d.visitors === undefined;
    var head = '<div class="n1i-kpi__top"><span class="n1i-kpi__label">Web sitesi ziyaretçisi</span>' + ui.tip('<b>Ziyaretçi</b>: GA4 aktif kullanıcı (activeUsers), ' + (d.spendPeriod ? 'bugün dahil son 7 takvim günü' : 'son 7 gün + bugün') + '. Tarayıcı/cihaz bazlı tahmindir.', 'Ziyaretçi açıklaması') + '</div>' +
      '<div class="n1i-hero__value n1i-num" data-v>' + (na ? N.DASH : f.int(d.visitors)) + '</div>' +
      '<div class="n1i-kpi__foot" style="margin:0 0 18px"><b>Son 7 gün</b> · bugün dahil' + (gaFail ? ' · ' + ui.chip('neg', 'Veri alınamadı', 'error') : (na ? ' · veri yok' : '')) + '</div>' +
      '<div class="n1i-legend" data-leg style="margin:4px 0 6px"><span class="n1i-legend__item"><span class="n1i-legend__swatch n1i-legend__swatch--bar" style="color:var(--n1i-bar-edge)"></span>Günlük aktif kullanıcı</span><span class="n1i-legend__item"><span class="n1i-legend__swatch n1i-legend__swatch--bar" style="color:var(--n1i-bar-hi)"></span>En yüksek gün</span></div>';
    var s = Array.isArray(d.visitorSeries) ? d.visitorSeries : [];
    if (gaFail || !s.length) head = head.replace(/<div class="n1i-legend" data-leg[\s\S]*?<\/div>$/, '');
    if (gaFail) { el.innerHTML = head + ui.state('error', 'GA4 verisi alınamadı', 'Trend çizilemedi. Bu bir sıfır değer değildir.'); return; }
    if (!s.length) { el.innerHTML = head + ui.state('empty', 'Gösterilecek günlük veri yok', 'GA4 bu dönem için gün satırı döndürmedi.'); return; }
    var al = N.alignDays(s, function (x) { return x.date; }, function (x) { return Number(x.value) || 0; }, 0);
    var todayKey = f.todayISO().replace(/-/g, ''), partial = al.keys[al.keys.length - 1] === todayKey;
    var peak = Math.max.apply(null, al.values), pi = al.values.indexOf(peak);
    var summary = 'En yüksek gün ' + al.labels[pi] + ' (' + f.int(peak) + ').' + (partial ? ' Son çubuk bugündür ve gün henüz bitmedi.' : '') + ' Günlük değerlerin toplamı 7 günlük ziyaretçi sayısına eşit değildir; aynı kişi farklı günlerde tekrar sayılır.';
    el.innerHTML = head + '<div class="n1i-chartbox n1i-chartbox--sm" style="flex:1;min-height:170px"><canvas role="img" aria-label="' + esc('Günlük aktif kullanıcı çubuk grafiği. ' + summary) + '"></canvas></div><p class="n1i-summary-text">' + esc(summary) + '</p>';
    N.charts.load().then(function (Chart) {
      var c = N.charts.color, cv = el.querySelector('canvas'); if (!cv) return;
      if (visChart) visChart.destroy();
      visChart = N.charts.create(cv, function () { var c = N.charts.color; return {
        type: 'bar',
        data: { labels: al.labels, datasets: [{ label: 'Aktif kullanıcı', data: al.values, backgroundColor: al.values.map(function (v, i) { return partial && i === al.values.length - 1 ? c('--n1i-bar-partial') : (i === pi ? c('--n1i-bar-hi') : c('--n1i-bar')); }), borderColor: al.values.map(function (v, i) { return i === pi ? c('--n1i-bar-hi-edge') : c('--n1i-bar-edge'); }), borderWidth: { top: 2, left: 0, right: 0, bottom: 0 }, borderSkipped: 'bottom', borderRadius: 10, maxBarThickness: 46 }] },
        options: { scales: { x: N.charts.axis({ grid: { display: false }, ticks: { color: c('--n1i-muted'), font: { size: 12.5, weight: '500' }, maxRotation: 0, autoSkipPadding: 10 } }), y: N.charts.axis({ beginAtZero: true, ticks: { color: c('--n1i-muted'), maxTicksLimit: 4, precision: 0, callback: function (v) { return f.compact(v); } } }) },
          plugins: { tooltip: { callbacks: { title: function (it) { return f.dayLong(al.keys[it[0].dataIndex]) + (partial && it[0].dataIndex === al.keys.length - 1 ? ' (devam ediyor)' : ''); }, label: function (it) { return 'Aktif kullanıcı: ' + f.int(it.parsed.y); } } } } }
      }; });
    }, function () {
      el.innerHTML = head + '<ul class="n1i-shares">' + al.keys.map(function (k, i) { return '<li class="n1i-share"><span class="n1i-share__name">' + f.dayLong(k) + '</span><span class="n1i-share__val n1i-num">' + f.int(al.values[i]) + '</span></li>'; }).join('') + '</ul>';
    });
  }

  function renderInstagram(d) {
    var el = root.querySelector('[data-ig]');
    var igSt = status(d, 'instagram'), igFail = igSt === 'error' || igSt === 'missing';
    var head = '<div class="n1i-kpi__top"><span class="n1i-kpi__label">Instagram takipçisi</span>' + ui.tip('<b>Takipçi</b>: profildeki güncel toplam. <b>Yeni takipçi</b>: Meta Instagram API\'nin günlük <i>follower_count</i> değerlerinin son 30 gün (bugün hariç) toplamı. Bu metrik yalnızca yeni takipleri sayar; takipten çıkmalar düşülmez, bu yüzden net değişim değildir.', 'Instagram açıklaması') + '</div>';
    if (igFail || d.followers === null || d.followers === undefined) {
      el.classList.add('n1i-kpi--na');
      el.innerHTML = head + '<div class="n1i-kpi__value n1i-num" data-v>' + N.DASH + '</div><div class="n1i-kpi__foot"><b>Güncel toplam</b> · ' + (igFail ? ui.chip('neg', 'Veri alınamadı', 'error') : 'veri yok') + '</div>';
      return;
    }
    var series = (Array.isArray(d.followerSeries) ? d.followerSeries : []).map(function (v) { return Number(v.value) || 0; });
    var g = d.followerGrowth30;
    var covN = d.followerCoverage && d.followerCoverage.days ? d.followerCoverage.days : series.length;
    var covTxt = covN ? 'Son ' + covN + ' gün · bugün hariç' : 'Dönem doğrulanamadı';
    // Mevcut backend, Meta günlük seriyi döndüremediğinde değeri 0 olarak hesaplıyor: seri boşsa doğrulanamaz.
    var known = g !== null && g !== undefined && series.length > 0;
    var chip = !known ? ui.chip('', 'Yeni takipçi doğrulanamadı', 'info') : g > 0 ? ui.chip('pos', '+' + f.int(g) + ' yeni takipçi', 'up') : ui.chip('', 'Yeni takipçi yok', 'flat');
    el.innerHTML = head +
      '<div class="n1i-kpi__row"><div><div class="n1i-kpi__value n1i-num" id="s-fol" data-v>' + f.int(d.followers) + '</div>' +
      '<div class="n1i-kpi__foot" style="margin-top:8px"><b>Güncel toplam</b> ' + chip + '</div></div>' +
      (series.length ? '<div class="n1i-mini"><canvas role="img" aria-label="' + esc(covTxt) + ': günlük yeni takipçi sayısı çubuk grafiği"></canvas></div>' : '') + '</div>' +
      '<div class="n1i-kpi__aside"><span>Yeni takipçi dönemi</span><b>' + esc(covTxt) + '</b></div>';
    if (!series.length) return;
    N.charts.load().then(function (Chart) {
      var cv = el.querySelector('canvas'); if (!cv) return;
      if (folChart) folChart.destroy();
      var ends = (d.followerSeries || []).map(function (v) { return v.end_time ? String(v.end_time).slice(0, 10) : ''; });
      var peak = Math.max.apply(null, series);
      folChart = N.charts.create(cv, function () { var c = N.charts.color; return {
        type: 'bar',
        data: { labels: ends.map(function (e) { return e ? f.dayShort(e) : ''; }), datasets: [{ label: 'Yeni takipçi', data: series, backgroundColor: series.map(function (v) { return v === peak ? c('--n1i-bar-hi') : c('--n1i-bar'); }), borderColor: series.map(function (v) { return v === peak ? c('--n1i-bar-hi-edge') : c('--n1i-bar-edge'); }), borderWidth: { top: 1.5, left: 0, right: 0, bottom: 0 }, borderSkipped: 'bottom', borderRadius: 3, maxBarThickness: 9 }] },
        options: { layout: { padding: 0 }, scales: { x: { display: false }, y: { display: false, beginAtZero: true } },
          plugins: { tooltip: { callbacks: { title: function (it) { return ends[it[0].dataIndex] ? f.dayLong(ends[it[0].dataIndex]) : ''; }, label: function (it) { return 'Yeni takipçi: ' + f.int(it.parsed.y); } } } } }
      }; });
    }, function () {});
  }

  shell();
  N.height.start(root);
  var stopWatch = N.watchdog(function () {
    if (received) return;
    root.querySelector('[data-body]').innerHTML = ui.state('warn', 'Özet verisi gelmedi', 'Sayfa kodu bu bölüme veri göndermedi. Özet, diğer kaynakların ilk yüklemesi bittikten sonra bir kez gönderilir; bağlantı yavaşsa birkaç saniye sürebilir. Sorun sürerse sayfayı yenileyin.');
    document.getElementById('sum-recv').textContent = '';
    N.height.schedule();
  });
  N.bridge.listen(function (d) { stopWatch(); render(d); }, {
    accept: function (d) { return ('visitors' in d) || ('totalSpend' in d) || ('followers' in d); },
    onError: function () { root.querySelector('[data-body]').innerHTML = ui.state('error', 'Görüntüleme hatası', 'Gelen veri beklenen biçimde değil.'); }
  });
})();
