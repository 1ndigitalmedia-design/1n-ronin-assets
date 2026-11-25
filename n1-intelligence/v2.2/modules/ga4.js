/* 1N INTELLIGENCE — Google Analytics 4 modülü (#html3)
   Sözleşme (değişmedi):
     Velo → widget: { summary, daily, trafficSources, topPages, deviceBreakdown, rangeLabel, rangeKey }
       Her rapor GA4 Data API'nin ham yanıtıdır: { rows:[{dimensionValues,metricValues}] } veya { error:{...} }.
       summary.metricValues sırası: sessions, activeUsers, newUsers, screenPageViews, engagementRate, averageSessionDuration
       daily: dimension date (YYYYMMDD), metrics sessions, activeUsers
     widget → Velo: { action:'changeRange', range:'7'|'30'|'all' } */
(function () {
  'use strict';
  var N = window.N1I, f = N.fmt, esc = N.esc, ui = N.ui;
  var root = document.getElementById('n1i-root');
  var lineChart = null, showTable = false, last = null;

  var ctrl = N.rangeController({
    root: root,
    onPending: function () { var b = root.querySelector('[data-body]'); if (b) b.classList.add('is-stale'); setLoadingLine(true); },
    onInitialTimeout: function () { setLoadingLine(false); root.querySelector('[data-body]').innerHTML = ui.state('warn', 'Google Analytics verisi gelmedi', 'Sayfa kodu bu bölüme veri göndermedi. Wix sayfa kodu hata yakaladığında bölüme mesaj göndermiyor; bağlantı da yavaş olabilir.', '<button type="button" class="n1i-btn n1i-btn--sm" data-retry>' + N.icon('refresh') + 'Tekrar iste</button>'); N.height.schedule(); },
    onTimeout: function () { setLoadingLine(false); showBanner('error', 'Yeni aralığın verisi gelmedi', 'Ekrandaki sayılar önceki seçime aittir. Bağlantı yavaş olabilir veya Google Analytics yanıt vermemiş olabilir.', true); }
  });

  function shell() {
    root.innerHTML = '<section class="n1i-module" aria-labelledby="ga4-title">' +
      N.header({ icon: 'ga4', tone: 'teal', title: 'Google Analytics 4', meta: ['<span id="ga4-range">Son 7 gün</span>', '<span>Kaynak: GA4 Data API</span>', '<span id="ga4-recv" class="n1i-loading-line"><span class="n1i-spin"></span>Yükleniyor…</span>', ui.demoChip()], tools: ctrl.segHtml() }) +
      '<div data-banner></div><div data-body>' + ui.skelKpis(6) + '<div class="n1i-grid"><div class="n1i-col-8">' + ui.skelPanel(220) + '</div><div class="n1i-col-4">' + ui.skelPanel(220) + '</div></div></div>' +
      '</section>';
    root.querySelector('.n1i-module').querySelector('h2').id = 'ga4-title';
    root.querySelector('.n1i-kpis').style.setProperty('--n1i-kpi-desktop', '6');
  }
  function setLoadingLine(on) {
    var el = document.getElementById('ga4-recv'); if (!el) return;
    el.innerHTML = on ? '<span class="n1i-spin"></span>Yükleniyor…' : (last ? esc(last.recv) : '');
  }
  function showBanner(kind, title, text, retry) {
    var b = root.querySelector('[data-banner]');
    b.innerHTML = '<div class="n1i-banner">' + ui.state(kind, title, text, retry ? '<button type="button" class="n1i-btn n1i-btn--sm" data-retry>' + N.icon('refresh') + 'Tekrar dene</button>' : '') + '</div>';
    N.height.schedule();
  }
  root.addEventListener('click', function (e) {
    if (e.target.closest('[data-retry]')) { root.querySelector('[data-banner]').innerHTML = ''; ctrl.retry(); }
    if (e.target.closest('[data-toggle-table]')) { showTable = !showTable; if (last) renderTrend(last.data); }
  });

  function apiErr(rep) { return rep && rep.error ? (rep.error.status || rep.error.message || 'API hatası') : null; }
  function rows(rep) { return (rep && Array.isArray(rep.rows)) ? rep.rows : []; }

  var DEVICE = { desktop: 'Masaüstü', mobile: 'Mobil', tablet: 'Tablet', 'smart tv': 'Akıllı TV' };

  function render(d) {
    ctrl.done(d);
    root.querySelector('[data-banner]').innerHTML = '';
    var first = !last;
    last = { data: d, recv: ui.received() };
    var rEl = document.getElementById('ga4-range'); rEl.textContent = ui.rangeText(d, 'GA4 mülkünün veri başlangıcından'); rEl.title = ui.rangeTitle(d);
    setLoadingLine(false);

    var sErr = apiErr(d.summary), sRow = rows(d.summary)[0];
    var mv = sRow ? sRow.metricValues.map(function (m) { return m.value; }) : [];
    var tips = {
      sessions: '<b>Oturum</b>: Sitenize yapılan ziyaret sayısı. Aynı kişi birden çok kez gelirse her ziyaret ayrı sayılır.',
      users: '<b>Aktif kullanıcı</b>: GA4\'ün <i>activeUsers</i> metriği. Tarayıcı/cihaz bazlı tahmindir; tekil kişi sayısıyla birebir aynı değildir.',
      newUsers: '<b>Yeni kullanıcı</b>: Bu aralıkta siteye ilk kez gelen kullanıcılar (GA4 first_visit ölçümü).',
      views: '<b>Sayfa görüntüleme</b>: Sayfaların ve uygulama ekranlarının toplam açılma sayısı.',
      engage: '<b>Etkileşim oranı</b>: Etkileşimli oturumların tüm oturumlara oranı. GA4\'te 10 saniyeden uzun süren, dönüşüm olayı içeren veya en az 2 sayfa görüntülenen oturum etkileşimli sayılır.',
      dur: '<b>Ort. oturum süresi</b>: Oturumların ortalama etkileşim süresi (GA4 averageSessionDuration).'
    };
    var kp;
    if (sErr) {
      kp = '<div class="n1i-col-12">' + ui.state('error', 'Özet metrikler alınamadı', 'Google Analytics hata döndürdü (' + esc(sErr) + '). Bu bir sıfır değer değildir.') + '</div>';
      kp = '<div class="n1i-grid" style="margin-top:0">' + kp + '</div>';
    } else if (!sRow) {
      kp = ui.state('empty', 'Bu aralıkta kayıtlı ziyaret yok', 'GA4 bu aralık için satır döndürmedi. Ölçüm kodu çalışıyorsa bu, ziyaret olmadığı anlamına gelir.');
    } else {
      kp = '<div class="n1i-kpis n1i-kpis--strip n1i-kpis--6" style="--n1i-kpi-desktop:6">' +
        ui.kpi({ id: 'k-sessions', label: 'Oturum', value: f.int(mv[0]), compact: f.compact(mv[0]), tip: tips.sessions }) +
        ui.kpi({ id: 'k-users', label: 'Aktif kullanıcı', value: f.int(mv[1]), compact: f.compact(mv[1]), tip: tips.users }) +
        ui.kpi({ id: 'k-new', label: 'Yeni kullanıcı', value: f.int(mv[2]), compact: f.compact(mv[2]), tip: tips.newUsers }) +
        ui.kpi({ id: 'k-views', label: 'Sayfa görüntüleme', value: f.int(mv[3]), compact: f.compact(mv[3]), tip: tips.views }) +
        ui.kpi({ id: 'k-eng', label: 'Etkileşim oranı', value: f.pctRatio(mv[4]), tip: tips.engage }) +
        ui.kpi({ id: 'k-dur', label: 'Ort. oturum süresi', value: f.duration(mv[5]), tip: tips.dur }) +
        '</div>';
    }

    var body = root.querySelector('[data-body]');
    body.classList.remove('is-stale');
    body.innerHTML = kp +
      '<div class="n1i-grid">' +
      '<div class="n1i-panel n1i-col-8" data-trend></div>' +
      '<div class="n1i-col-4 n1i-stackcol"><div class="n1i-panel" data-device></div><div class="n1i-panel" data-sources></div></div>' +
      '<div class="n1i-panel n1i-col-12" data-pages></div>' +
      '</div>' +
      '<div class="n1i-foot"><p>GA4 tarih sınırları, mülkün raporlama saat dilimine göre hesaplanır. "Son 7 gün" seçimi GA4\'e 7daysAgo–today olarak gönderilir; bugünün yarım günü dahildir.</p></div>';

    if (!sErr && sRow) {
      [['k-sessions', mv[0], f.int], ['k-users', mv[1], f.int], ['k-new', mv[2], f.int], ['k-views', mv[3], f.int]].forEach(function (x) {
        if (first) N.motion.count(document.querySelector('#' + x[0] + ' [data-v]'), x[1], x[2]);
      });
    }
    renderTrend(d);
    renderShares(root.querySelector('[data-sources]'), 'Trafik kaynakları', 'Oturuma göre ilk 6 kaynak / mecra', d.trafficSources, Number(mv[0]), function (n) { return n === '(direct) / (none)' ? 'Doğrudan giriş (direct / none)' : n; }, 'oturum');
    renderDevices(d.deviceBreakdown);
    renderPages(d.topPages, Number(mv[3]));
    if (first) N.motion.enter(root.querySelectorAll('.n1i-kpi, .n1i-panel'));
    N.height.schedule();
  }

  function renderTrend(d) {
    var el = root.querySelector('[data-trend]'); if (!el) return;
    var err = apiErr(d.daily);
    var head = '<div class="n1i-panel__head"><div><h3 class="n1i-h2">Günlük oturum ve kullanıcı</h3><div class="n1i-panel__sub">Gün bazında · ' + esc(d.rangeLabel || 'Son 7 gün') + '</div></div>' +
      '<button type="button" class="n1i-btn n1i-btn--sm n1i-btn--ghost" data-toggle-table aria-pressed="' + showTable + '">' + N.icon(showTable ? 'chart' : 'table') + (showTable ? 'Grafik' : 'Tablo') + '</button></div>';
    if (err) { el.innerHTML = head + ui.state('error', 'Günlük trend alınamadı', 'Google Analytics hata döndürdü (' + esc(err) + ').'); return; }
    var r = rows(d.daily);
    if (!r.length) { el.innerHTML = head + ui.state('empty', 'Gösterilecek günlük veri yok', 'Bu aralıkta GA4 gün bazında satır döndürmedi.'); return; }
    var al = N.alignDays(r, function (x) { return x.dimensionValues[0].value; }, function (x) { return [Number(x.metricValues[0].value), Number(x.metricValues[1].value)]; }, [0, 0]);
    var sessions = al.values.map(function (v) { return v[0]; }), users = al.values.map(function (v) { return v[1]; });
    var todayKey = f.todayISO().replace(/-/g, ''), partial = al.keys[al.keys.length - 1] === todayKey;
    var tot = sessions.reduce(function (a, b) { return a + b; }, 0);
    var peakI = sessions.indexOf(Math.max.apply(null, sessions));
    var summary = 'Toplam ' + f.int(tot) + ' oturum (günlük toplamların toplamı). En yüksek gün: ' + al.labels[peakI] + ' (' + f.int(sessions[peakI]) + ').' + (partial ? ' Son gün (bugün) henüz tamamlanmadı ve kesikli çizilir.' : '');
    var legend = '<div class="n1i-legend" aria-hidden="true"><span class="n1i-legend__item" style="color:var(--n1i-c1)"><span class="n1i-legend__swatch"></span><span style="color:var(--n1i-text-2)">Oturum</span></span><span class="n1i-legend__item" style="color:var(--n1i-c2)"><span class="n1i-legend__swatch n1i-legend__swatch--dash"></span><span style="color:var(--n1i-text-2)">Aktif kullanıcı</span></span></div>';
    var table = '<div class="n1i-tablewrap" tabindex="0" role="region" aria-label="Günlük trend tablosu" style="max-height:320px"><table class="n1i-table"><thead><tr><th scope="col">Gün</th><th scope="col" class="is-num">Oturum</th><th scope="col" class="is-num">Aktif kullanıcı</th></tr></thead><tbody>' +
      al.keys.map(function (k, i) { return '<tr><td>' + f.dayLong(k) + (partial && i === al.keys.length - 1 ? ' (devam ediyor)' : '') + '</td><td class="is-num">' + f.int(sessions[i]) + '</td><td class="is-num">' + f.int(users[i]) + '</td></tr>'; }).join('') + '</tbody></table></div>';
    if (lineChart) { lineChart.destroy(); lineChart = null; }
    if (showTable) { el.innerHTML = head + table + '<p class="n1i-summary-text">' + summary + '</p>'; N.height.schedule(); return; }
    el.innerHTML = head + legend + '<div class="n1i-chartbox"><canvas role="img" aria-label="Günlük oturum ve aktif kullanıcı çizgi grafiği. ' + esc(summary) + '"></canvas></div><p class="n1i-summary-text">' + summary + ' GA4 boş günler için satır döndürmez; o günler 0 olarak çizilir.</p>';
    N.charts.load().then(function (Chart) {
      var cv = el.querySelector('canvas'); if (!cv) return;
      var c = N.charts.color;
      var dashLast = function (ctx) { return partial && ctx.p1DataIndex === sessions.length - 1 ? [4, 4] : undefined; };
      lineChart = N.charts.create(cv, function () { var c = N.charts.color; return {
        type: 'line',
        data: { labels: al.labels, datasets: [
          { label: 'Oturum', data: sessions, borderColor: c('--n1i-c1'), backgroundColor: N.charts.areaFill('--n1i-c1-fill'), fill: 'origin', pointBackgroundColor: c('--n1i-surface'), pointBorderColor: c('--n1i-c1'), pointBorderWidth: 2, borderWidth: 2.5, pointRadius: 0, pointHoverRadius: 5, tension: 0.35, segment: { borderDash: dashLast } },
          { label: 'Aktif kullanıcı', data: users, borderColor: c('--n1i-c2'), backgroundColor: c('--n1i-c2'), borderWidth: 2, borderDash: [6, 5], pointRadius: 0, pointHoverRadius: 5, tension: 0.35 }
        ] },
        options: {
          scales: { x: N.charts.axis({ grid: { display: false }, ticks: { color: c('--n1i-muted'), maxRotation: 0, autoSkip: true, maxTicksLimit: 8, font: { size: 12.5, weight: '500' } } }), y: N.charts.axis({ beginAtZero: true, ticks: { color: c('--n1i-muted'), precision: 0, maxTicksLimit: 5, callback: function (v) { return f.compact(v); }, font: { size: 12.5, weight: '500' } } }) },
          plugins: { tooltip: { callbacks: { title: function (it) { return f.dayLong(al.keys[it[0].dataIndex]) + (partial && it[0].dataIndex === al.keys.length - 1 ? ' (devam ediyor)' : ''); }, label: function (it) { return ' ' + it.dataset.label + ': ' + f.int(it.parsed.y); } } } }
        }
      }; });
    }, function () {
      showTable = true; renderTrend(d);
      el.insertAdjacentHTML('afterbegin', '<div class="n1i-banner">' + ui.state('info', 'Grafik kütüphanesi yüklenemedi', 'Veriler tablo olarak gösteriliyor.') + '</div>');
    });
    N.height.schedule();
  }

  function renderShares(el, title, sub, rep, total, rename, unit) {
    var err = apiErr(rep), r = rows(rep);
    var head = '<div class="n1i-panel__head"><div><h3 class="n1i-h2">' + esc(title) + '</h3><div class="n1i-panel__sub">' + esc(sub) + '</div></div></div>';
    if (err) { el.innerHTML = head + ui.state('error', title + ' alınamadı', 'Google Analytics hata döndürdü (' + esc(err) + ').'); return; }
    if (!r.length) { el.innerHTML = head + ui.state('empty', 'Bu aralıkta kayıt yok', ''); return; }
    var max = Math.max.apply(null, r.map(function (x) { return Number(x.metricValues[0].value) || 0; })) || 1;
    var html = '<ol class="n1i-shares">' + r.map(function (x) {
      var n = x.dimensionValues[0].value, v = Number(x.metricValues[0].value) || 0;
      var share = total > 0 ? v / total : null;
      return '<li class="n1i-share"><span class="n1i-share__name" title="' + esc(rename(n)) + '">' + esc(rename(n)) + '</span><span class="n1i-share__val n1i-num">' + f.int(v) + (share !== null ? '<small>' + f.pctRatio(share) + '</small>' : '') + '</span>' +
        '<span class="n1i-share__track" aria-hidden="true"><span class="n1i-share__fill" style="width:' + (v / max * 100).toFixed(1) + '%"></span></span></li>';
    }).join('') + '</ol>';
    var note = total > 0 ? '<p class="n1i-summary-text">Yüzdeler toplam ' + f.int(total) + ' ' + unit + ' içindeki paydır; yalnızca ilk ' + r.length + ' satır listelenir.</p>' : '';
    el.innerHTML = head + html + note;
    N.motion.bars(el.querySelectorAll('.n1i-share__fill'));
  }

  function renderDevices(rep) {
    var el = root.querySelector('[data-device]');
    var err = apiErr(rep), r = rows(rep);
    var head = '<div class="n1i-panel__head"><div><h3 class="n1i-h2">Cihaz dağılımı</h3><div class="n1i-panel__sub">Oturum payı</div></div></div>';
    if (err) { el.innerHTML = head + ui.state('error', 'Cihaz dağılımı alınamadı', 'Google Analytics hata döndürdü (' + esc(err) + ').'); return; }
    if (!r.length) { el.innerHTML = head + ui.state('empty', 'Bu aralıkta kayıt yok', ''); return; }
    var items = r.map(function (x) { return { name: DEVICE[x.dimensionValues[0].value] || x.dimensionValues[0].value, v: Number(x.metricValues[0].value) || 0 }; }).sort(function (a, b) { return b.v - a.v; });
    var tot = items.reduce(function (a, b) { return a + b.v; }, 0) || 1;
    var cols = ['--n1i-c1', '--n1i-c2', '--n1i-c3', '--n1i-c4', '--n1i-c5'];
    el.innerHTML = head + '<div class="n1i-stack" role="img" aria-label="' + esc(items.map(function (i) { return i.name + ' ' + f.pctRatio(i.v / tot); }).join(', ')) + '">' +
      items.map(function (i, k) { return '<span style="width:' + (i.v / tot * 100).toFixed(2) + '%;background:var(' + cols[k % cols.length] + ')"></span>'; }).join('') + '</div>' +
      '<ul class="n1i-shares">' + items.map(function (i, k) {
        return '<li class="n1i-share"><span class="n1i-share__name"><span style="display:inline-block;width:8px;height:8px;border-radius:2px;margin-right:8px;background:var(' + cols[k % cols.length] + ')"></span>' + esc(i.name) + '</span><span class="n1i-share__val n1i-num">' + f.pctRatio(i.v / tot) + '<small>' + f.int(i.v) + '</small></span></li>';
      }).join('') + '</ul>';
  }

  function renderPages(rep, totalViews) {
    var el = root.querySelector('[data-pages]');
    var err = apiErr(rep), r = rows(rep);
    var head = '<div class="n1i-panel__head"><div><h3 class="n1i-h2">En çok görüntülenen sayfalar</h3><div class="n1i-panel__sub">İlk 5 sayfa · görüntülemeye göre</div></div></div>';
    if (err) { el.innerHTML = head + ui.state('error', 'Sayfa listesi alınamadı', 'Google Analytics hata döndürdü (' + esc(err) + ').'); return; }
    if (!r.length) { el.innerHTML = head + ui.state('empty', 'Bu aralıkta kayıt yok', ''); return; }
    el.innerHTML = head + '<div class="n1i-tablewrap" tabindex="0" role="region" aria-label="En çok görüntülenen sayfalar"><table class="n1i-table"><thead><tr><th scope="col">Sayfa yolu</th><th scope="col" class="is-num">Görüntüleme</th><th scope="col" class="is-num">Pay</th></tr></thead><tbody>' +
      r.map(function (x) {
        var p = x.dimensionValues[0].value, v = Number(x.metricValues[0].value) || 0;
        return '<tr><td class="is-name">' + esc(p === '/' ? '/ (ana sayfa)' : p) + '</td><td class="is-num">' + f.int(v) + '</td><td class="is-num">' + (totalViews > 0 ? f.pctRatio(v / totalViews) : N.DASH) + '</td></tr>';
      }).join('') + '</tbody></table></div>';
  }

  shell();
  N.height.start(document.getElementById('n1i-root'));
  N.bridge.listen(function (d) {
    if (!ctrl.accept(d)) return;
    render(d);
  }, {
    accept: function (d) { return !!d.summary && typeof d.summary === 'object' && (!d.rangeKey || /^(7|30|all)$/.test(d.rangeKey)); },
    kind: function (d) { return 'r' + (d.rangeKey || '7'); },
    dedupe: function () { return !ctrl.isPending(); },
    onError: function () { root.querySelector('[data-banner]').innerHTML = ui.state('error', 'Görüntüleme hatası', 'Gelen veri beklenen biçimde değil.'); }
  });
})();
