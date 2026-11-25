/* 1N INTELLIGENCE — Instagram modülü (#html8)
   Sözleşme (değişmedi): Velo → widget: getInstagramData() yanıtının tamamı
     { profile:{username, followers_count, follows_count, media_count} | {error} | null,
       insights:{ data:[{ values:[{value, end_time}] }] } | {error} | null,
       followerGrowthLast30Days, followerChangeToday, followerChangeLast7, engagementLast5, mediaError }
   Not: backend günlük seri alınamadığında değişimleri 0 olarak hesaplıyor; bu modül seri yoksa
   değişimi "doğrulanamadı" gösterir, 0 göstermez. */
(function () {
  'use strict';
  var N = window.N1I, f = N.fmt, esc = N.esc, ui = N.ui;
  var root = document.getElementById('n1i-root');
  var chart = null, received = false;

  function shell() {
    root.innerHTML = '<section class="n1i-module" aria-labelledby="ig-title">' +
      N.header({ icon: 'instagram', tone: 'rose', title: 'Instagram', meta: ['<span id="ig-user">Hesap</span>', '<span>Kaynak: Instagram Graph API</span>', '<span id="ig-recv" class="n1i-loading-line"><span class="n1i-spin"></span>Yükleniyor…</span>', ui.demoChip()] }) +
      '<div data-body>' + ui.skelKpis(4) + '<div class="n1i-grid"><div class="n1i-col-12">' + ui.skelPanel(160) + '</div></div></div></section>';
    root.querySelector('h2').id = 'ig-title';
  }
  function errText(e) { return e ? (e.message || e.type || 'API hatası') : null; }

  function render(d) {
    received = true;
    var first = !root.querySelector('[data-rendered]');
    document.getElementById('ig-recv').textContent = ui.received();
    var body = root.querySelector('[data-body]');
    body.setAttribute('data-rendered', '1');
    var p = d.profile, pErr = p && p.error ? errText(p.error) : (p ? null : (d.mediaError || 'Profil alınamadı'));
    var insErr = d.insights && d.insights.error ? errText(d.insights.error) : null;
    var values = (d.insights && d.insights.data && d.insights.data[0] && Array.isArray(d.insights.data[0].values)) ? d.insights.data[0].values : [];
    var seriesOk = !insErr && values.length > 0;
    document.getElementById('ig-user').textContent = p && p.username ? '@' + p.username : 'Hesap';

    if (pErr && !seriesOk) {
      body.innerHTML = ui.state('error', 'Instagram verisi alınamadı', 'Meta hata döndürdü (' + esc(pErr) + '). Bu bir sıfır değer değildir; erişim izni veya token süresi kontrol edilmelidir.');
      N.height.schedule(); return;
    }
    var html = '';
    if (pErr) html += '<div class="n1i-banner">' + ui.state('warn', 'Kısmi veri', 'Profil bilgisi alınamadı (' + esc(pErr) + '). Günlük takipçi serisi gösteriliyor.') + '</div>';
    if (insErr) html += '<div class="n1i-banner">' + ui.state('warn', 'Yeni takipçi verisi alınamadı', 'Günlük takipçi verisi Meta\'dan gelmedi (' + esc(insErr) + '). Yeni takipçi kartları 0 yerine "—" gösterir.') + '</div>';

    /* V2.2: dönem etiketi gelen günlük değer sayısından (sunucu n1iCoverage); yoksa değer sayısından burada hesaplanır. */
    var covDays = d.n1iCoverage && d.n1iCoverage.days ? d.n1iCoverage.days : values.length;
    var covLabel = covDays ? 'Son ' + covDays + ' gün · bugün hariç' : 'Günlük seri';
    var growthTip = '<b>Yeni takipçi</b>: Meta\'nın günlük <i>follower_count</i> değerlerinin toplamı. Bu metrik yeni takipleri sayar; takipten çıkmalar düşülmez, bu yüzden net değişim değildir. Meta bu veriyi bugün hariç en fazla son 30 gün için verir; gösterilen dönem gelen gün sayısıdır (' + covDays + ' gün).';
    function change(v, label, period) {
      if (!seriesOk || v === null || v === undefined) return ui.kpi({ label: label, value: N.DASH, state: 'na', foot: '<b>' + period + '</b> · doğrulanamadı', tip: growthTip });
      var ic = v > 0 ? ui.chip('pos', 'Yeni takip var', 'up') : v < 0 ? ui.chip('neg', 'Negatif değer', 'down') : ui.chip('', 'Yeni takip yok', 'flat');
      return ui.kpi({ label: label, value: v < 0 ? f.signed(v) : f.int(v), foot: '<b>' + period + '</b> ' + ic, tip: growthTip });
    }
    html += '<div class="n1i-kpis n1i-kpis--strip n1i-kpis--6" style="--n1i-kpi-desktop:6">' +
      ui.kpi({ id: 'ig-f', label: 'Takipçi', value: p && !p.error ? f.int(p.followers_count) : N.DASH, state: p && !p.error ? 'ok' : 'na', foot: '<b>Mevcut toplam</b>', tip: '<b>Takipçi</b>: Hesabı şu an takip eden hesap sayısı.' }) +
      change(d.followerGrowthLast30Days, 'Yeni takipçi', covLabel) +
      change(d.followerChangeLast7, 'Yeni takipçi', 'Son 7 gün') +
      ui.kpi({ label: 'Gönderi', value: p && !p.error ? f.int(p.media_count) : N.DASH, state: p && !p.error ? 'ok' : 'na', foot: '<b>Mevcut toplam</b>', tip: '<b>Gönderi</b>: Hesapta paylaşılan toplam gönderi sayısı.' }) +
      ui.kpi({ label: 'Takip edilen', value: p && !p.error ? f.int(p.follows_count) : N.DASH, state: p && !p.error ? 'ok' : 'na', foot: '<b>Mevcut toplam</b>', tip: '<b>Takip edilen</b>: Hesabın takip ettiği hesap sayısı.' }) +
      ui.kpi({ label: 'Son 5 gönderi etkileşimi', value: d.engagementLast5 === null || d.engagementLast5 === undefined ? N.DASH : f.int(d.engagementLast5), state: d.engagementLast5 === null || d.engagementLast5 === undefined ? 'na' : 'ok', foot: d.mediaError ? 'Gönderi verisi alınamadı' : 'beğeni + yorum', tip: '<b>Son 5 gönderi etkileşimi</b>: En son paylaşılan 5 gönderinin beğeni ve yorum toplamı. Tarih aralığına bağlı değildir; erişim (reach) değildir.' }) +
      '</div>';
    html += '<div class="n1i-grid"><div class="n1i-panel n1i-col-12" data-chart></div></div>' +
      '<div class="n1i-foot"><p>Erişim, gösterim ve gönderi bazlı performans oranları mevcut backend tarafından alınmadığı için gösterilmez; tahmin üretilmez.</p></div>';
    body.innerHTML = html;
    if (first && p && !p.error) N.motion.count(document.querySelector('#ig-f [data-v]'), p.followers_count, f.int);
    renderChart(values, seriesOk);
    if (first) N.motion.enter(root.querySelectorAll('.n1i-kpi, .n1i-panel'));
    N.height.schedule();
  }

  function renderChart(values, ok) {
    var el = root.querySelector('[data-chart]');
    var head = '<div class="n1i-panel__head"><div><h3 class="n1i-h2">Günlük yeni takipçi</h3><div class="n1i-panel__sub">Son 30 gün · bugün hariç · Meta follower_count</div></div></div>';
    if (!ok) { el.innerHTML = head + ui.state('info', 'Günlük seri yok', 'Meta bu hesap için günlük takipçi verisi döndürmedi. Geçmiş takipçi sayıları tahmin edilmez.'); return; }
    var keys = values.map(function (v) { return v.end_time ? String(v.end_time).slice(0, 10) : ''; });
    var nums = values.map(function (v) { return Number(v.value) || 0; });
    var tot = nums.reduce(function (a, b) { return a + b; }, 0), peak = Math.max.apply(null, nums), pk = nums.indexOf(peak);
    var summary = nums.length + ' gün içinde toplam ' + f.int(tot) + ' yeni takipçi. En yüksek gün ' + (keys[pk] ? f.dayLong(keys[pk]) : '—') + ' (' + f.int(peak) + '). Takipten çıkmalar bu sayıya dahil değildir.';
    el.innerHTML = head + '<div class="n1i-legend" aria-hidden="true"><span class="n1i-legend__item" style="color:var(--n1i-bar-edge)"><span class="n1i-legend__swatch n1i-legend__swatch--bar"></span><span style="color:var(--n1i-text-2)">Günlük yeni takipçi</span></span><span class="n1i-legend__item" style="color:var(--n1i-c1)"><span class="n1i-legend__swatch n1i-legend__swatch--bar"></span><span style="color:var(--n1i-text-2)">En yüksek gün</span></span></div>' +
      '<div class="n1i-chartbox n1i-chartbox--sm"><canvas role="img" aria-label="' + esc('Günlük yeni takipçi çubuk grafiği. ' + summary) + '"></canvas></div><p class="n1i-summary-text">' + esc(summary) + '</p>';
    N.charts.load().then(function (Chart) {
      var c = N.charts.color, cv = el.querySelector('canvas'); if (!cv) return;
      if (chart) chart.destroy();
      chart = N.charts.create(cv, function () { var c = N.charts.color; return {
        type: 'bar',
        data: { labels: keys.map(function (k) { return k ? f.dayShort(k) : ''; }), datasets: [{ label: 'Yeni takipçi', data: nums, backgroundColor: nums.map(function (v, i) { return v < 0 ? c('--n1i-neg') : (i === pk ? c('--n1i-bar-hi') : c('--n1i-bar')); }), borderColor: nums.map(function (v, i) { return i === pk ? c('--n1i-bar-hi-edge') : c('--n1i-bar-edge'); }), borderWidth: { top: 2, left: 0, right: 0, bottom: 0 }, borderSkipped: 'bottom', borderRadius: 6, maxBarThickness: 18 }] },
        options: { scales: { x: N.charts.axis({ grid: { display: false }, ticks: { color: c('--n1i-muted'), maxRotation: 0, autoSkip: true, maxTicksLimit: 8, font: { size: 12.5, weight: '500' } } }), y: N.charts.axis({ beginAtZero: true, ticks: { color: c('--n1i-muted'), precision: 0, maxTicksLimit: 4, font: { size: 12.5, weight: '500' } } }) },
          plugins: { tooltip: { callbacks: { title: function (it) { return keys[it[0].dataIndex] ? f.dayLong(keys[it[0].dataIndex]) : ''; }, label: function (it) { return 'Yeni takipçi: ' + f.int(it.parsed.y); } } } } }
      }; });
    }, function () {
      el.innerHTML = head + '<p class="n1i-summary-text">' + esc(summary) + '</p>';
    });
  }

  shell();
  N.height.start(root);
  var stop = N.watchdog(function () { if (received) return; root.querySelector('[data-body]').innerHTML = ui.state('warn', 'Instagram verisi gelmedi', 'Sayfa kodu bu bölüme veri göndermedi. Wix sayfa kodu hata yakaladığında bölüme mesaj göndermiyor. Sorun sürerse sayfayı yenileyin.'); document.getElementById('ig-recv').textContent = ''; N.height.schedule(); });
  N.bridge.listen(function (d) { stop(); render(d); }, {
    accept: function (d) { return ('profile' in d) || ('insights' in d) || ('followerGrowthLast30Days' in d); },
    onError: function () { root.querySelector('[data-body]').innerHTML = ui.state('error', 'Görüntüleme hatası', 'Gelen veri beklenen biçimde değil.'); }
  });
})();
