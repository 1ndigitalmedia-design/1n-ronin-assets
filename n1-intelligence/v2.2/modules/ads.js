/* 1N INTELLIGENCE — Reklam modülü: Meta Ads (#html5) ve Google Ads (#html17)
   Aynı tasarım, ayrı veri kaynağı. Hangi platformun çizileceği N1I_CONFIG.module ile seçilir ('meta' | 'gads').
   Sözleşme (değişmedi):
     Velo → widget: { campaigns:[...], daily:[...], campaignsError, dailyError, rangeLabel, rangeKey }
       Meta campaigns: { campaign_id, campaign_name, impressions, clicks, ctr(%), spend, cpc, actions:[{action_type,value}], action_values:[...] } (sayılar metin)
       Meta daily: { date_start:'YYYY-MM-DD', impressions, clicks, spend, actions }
       Google campaigns: { campaign_id, campaign_name, impressions, clicks, ctr(oran 0–1), spend, cpc, conversions, conversionsValue }
       Google daily: { date:'YYYY-MM-DD', impressions, clicks, spend }
     widget → Velo: { action:'changeRange', range:'7'|'30'|'all' } */
(function () {
  'use strict';
  var N = window.N1I, f = N.fmt, esc = N.esc, ui = N.ui;
  var root = document.getElementById('n1i-root');
  var isMeta = N.cfg.module === 'meta';
  var P = isMeta ? {
    key: 'meta', title: 'Meta Ads', icon: 'meta', source: 'Meta Marketing API (Insights)',
    dayKey: function (r) { return r.date_start; },
    ctrRatio: function (c) { return c.ctr !== undefined && c.ctr !== null && c.ctr !== '' ? Number(c.ctr) / 100 : null; },
    clicksLabel: 'Tıklama (tümü)',
    clicksTip: '<b>Tıklama (tümü)</b>: Meta\'nın <i>clicks</i> alanı. Bağlantı tıklamalarının yanında profil, beğeni, genişletme gibi tıklamaları da içerir. Bağlantı tıklaması ayrıca gösterilir (varsa).'
  } : {
    key: 'gads', title: 'Google Ads', icon: 'gads', source: 'Google Ads API (GAQL)',
    dayKey: function (r) { return r.date; },
    ctrRatio: function (c) { return c.ctr !== undefined && c.ctr !== null && c.ctr !== '' ? Number(c.ctr) : null; },
    clicksLabel: 'Tıklama',
    clicksTip: '<b>Tıklama</b>: Google Ads <i>metrics.clicks</i>. Reklama yapılan tıklamalar.'
  };

  /* Meta eylem türleri: yalnızca açıkça tanımlı olanlar gösterilir; hepsi toplanmaz.
     Satın alma için Meta aynı olayı birden çok türde döndürebildiği için ilk bulunan TEK tür kullanılır. */
  var META_ACTIONS = [
    { id: 'msg', label: 'Mesajlaşma başlatma', types: ['onsite_conversion.messaging_conversation_started_7d'], tip: '<b>Mesajlaşma başlatma</b>: Reklamdan başlatılan Messenger / Instagram DM / WhatsApp konuşmaları (Meta, 7 günlük ilişkilendirme). Satış anlamına gelmez.' },
    { id: 'purchase', label: 'Satın alma (Pixel / Meta)', types: ['omni_purchase', 'purchase', 'offsite_conversion.fb_pixel_purchase'], value: true, tip: '<b>Satın alma</b>: Meta\'nın raporladığı satın alma olayları (site Pixel\'i / Conversions API). DM ve WhatsApp üzerinden yapılan satışları içermez; işletmenin toplam satışı değildir.' },
    { id: 'lead', label: 'Potansiyel müşteri', types: ['lead', 'onsite_conversion.lead_grouped', 'offsite_conversion.fb_pixel_lead'], tip: '<b>Potansiyel müşteri</b>: Form doldurma (Lead) olayları.' },
    { id: 'link', label: 'Bağlantı tıklaması', types: ['link_click'], tip: '<b>Bağlantı tıklaması</b>: Reklamdaki bağlantıya yapılan tıklamalar (Meta link_click).' }
  ];
  function pickAction(list, types) {
    if (!Array.isArray(list)) return null;
    for (var i = 0; i < types.length; i++) {
      for (var j = 0; j < list.length; j++) if (list[j] && list[j].action_type === types[i]) return Number(list[j].value) || 0;
    }
    return null;
  }

  var trendChart = null, metric = 'spend', sortKey = 'spend', sortDir = -1, last = null, showTable = false;
  var ctrl = N.rangeController({
    root: root,
    allLabel: '3 yıl',
    onPending: function () { var b = root.querySelector('[data-body]'); if (b) b.classList.add('is-stale'); setLoading(true); },
    onInitialTimeout: function () { setLoading(false); root.querySelector('[data-body]').innerHTML = ui.state('warn', P.title + ' verisi gelmedi', 'Sayfa kodu bu bölüme veri göndermedi. Wix sayfa kodu hata yakaladığında bölüme mesaj göndermiyor; bağlantı da yavaş olabilir.', '<button type="button" class="n1i-btn n1i-btn--sm" data-retry>' + N.icon('refresh') + 'Tekrar iste</button>'); N.height.schedule(); },
    onTimeout: function () { setLoading(false); banner('error', 'Yeni aralığın verisi gelmedi', 'Ekrandaki sayılar önceki seçime aittir.', true); }
  });

  function shell() {
    root.innerHTML = '<section class="n1i-module" aria-labelledby="ads-title">' +
      N.header({ icon: P.icon, tone: isMeta ? 'sky' : 'sand', title: P.title, meta: ['<span id="ads-range">Son 7 gün</span>', '<span>Kaynak: ' + esc(P.source) + '</span>', '<span id="ads-status"></span>', '<span id="ads-recv" class="n1i-loading-line"><span class="n1i-spin"></span>Yükleniyor…</span>', ui.demoChip()], tools: ctrl.segHtml() }) +
      '<div data-banner></div><div data-body>' + ui.skelKpis(4) + '<div class="n1i-grid"><div class="n1i-col-12">' + ui.skelPanel(220) + '</div></div></div></section>';
    root.querySelector('h2').id = 'ads-title';
  }
  function setLoading(on) { var el = document.getElementById('ads-recv'); if (el) el.innerHTML = on ? '<span class="n1i-spin"></span>Yükleniyor…' : (last ? esc(last.recv) : ''); }
  function banner(kind, title, text, retry) {
    root.querySelector('[data-banner]').innerHTML = '<div class="n1i-banner">' + ui.state(kind, title, text, retry ? '<button type="button" class="n1i-btn n1i-btn--sm" data-retry>' + N.icon('refresh') + 'Tekrar dene</button>' : '') + '</div>';
    N.height.schedule();
  }
  function errText(e) { if (!e) return null; if (typeof e === 'string') return e; return e.message || e.status || e.error_user_msg || 'API hatası'; }

  function aggregate(campaigns) {
    var t = { impressions: 0, clicks: 0, spend: 0, conversions: 0, convValue: 0, actions: {}, actionValues: {} };
    var hasConv = false;
    campaigns.forEach(function (c) {
      t.impressions += Number(c.impressions) || 0;
      t.clicks += Number(c.clicks) || 0;
      t.spend += Number(c.spend) || 0;
      if (isMeta) {
        META_ACTIONS.forEach(function (a) {
          var v = pickAction(c.actions, a.types);
          if (v !== null) t.actions[a.id] = (t.actions[a.id] || 0) + v;
          if (a.value) { var vv = pickAction(c.action_values, a.types); if (vv !== null) t.actionValues[a.id] = (t.actionValues[a.id] || 0) + vv; }
        });
      } else {
        if (c.conversions !== undefined && c.conversions !== null) { hasConv = true; t.conversions += Number(c.conversions) || 0; t.convValue += Number(c.conversionsValue) || 0; }
      }
    });
    t.hasConv = hasConv;
    t.ctr = t.impressions > 0 ? t.clicks / t.impressions : null;
    t.cpc = t.clicks > 0 ? t.spend / t.clicks : null;
    t.cpm = t.impressions > 0 ? t.spend / t.impressions * 1000 : null;
    return t;
  }

  function render(d) {
    ctrl.done(d);
    root.querySelector('[data-banner]').innerHTML = '';
    var first = !last;
    last = { data: d, recv: ui.received() };
    setLoading(false);
    var rEl = document.getElementById('ads-range'); rEl.textContent = ui.rangeText(d, 'son 1095 gün'); rEl.title = ui.rangeTitle(d);

    var cErr = errText(d.campaignsError), dErr = errText(d.dailyError);
    var campaigns = Array.isArray(d.campaigns) ? d.campaigns : [];
    var daily = Array.isArray(d.daily) ? d.daily : [];
    var t = aggregate(campaigns);

    // Durum: bugün gösterim var mı? (günlük veri yoksa durum gösterilmez)
    var st = document.getElementById('ads-status');
    if (!dErr && daily.length) {
      var today = f.todayISO();
      var row = daily.filter(function (r) { return P.dayKey(r) === today; })[0];
      var live = !!(row && Number(row.impressions) > 0);
      st.innerHTML = live ? ui.chip('pos', 'Bugün gösterim var', 'ok') : ui.chip('', 'Bugün gösterim yok', 'clock');
    } else st.innerHTML = '';

    var body = root.querySelector('[data-body]');
    body.classList.remove('is-stale');
    var html = '';
    if (cErr && dErr) {
      body.innerHTML = ui.state('error', P.title + ' verisi alınamadı', 'Kampanya ve günlük sorgular hata döndürdü (' + esc(cErr) + '). Ekranda sıfır gösterilmez; bu bir veri alınamama durumudur.', '<button type="button" class="n1i-btn n1i-btn--sm" data-retry>' + N.icon('refresh') + 'Tekrar dene</button>');
      N.height.schedule(); return;
    }
    if (cErr) html += '<div class="n1i-banner">' + ui.state('warn', 'Kısmi veri', 'Kampanya kırılımı alınamadı (' + esc(cErr) + '). Özet kartlar kampanyalardan hesaplandığı için gösterilmiyor; günlük grafik hesap seviyesindeki veriden çizilir.') + '</div>';
    if (!cErr) {
      var kp = [
        ui.kpi({ id: 'a-spend', label: 'Harcama', value: f.money(t.spend), compact: f.moneyShort(t.spend), tip: '<b>Harcama</b>: Seçilen aralıkta reklamlara harcanan tutar (platformun raporladığı, hesap para birimi TL kabul edilmiştir).' }),
        ui.kpi({ id: 'a-impr', label: 'Gösterim', value: f.int(t.impressions), compact: f.compact(t.impressions), tip: '<b>Gösterim</b>: Reklamların ekranda görüntülenme sayısı.' }),
        ui.kpi({ id: 'a-clicks', label: P.clicksLabel, value: f.int(t.clicks), compact: f.compact(t.clicks), tip: P.clicksTip }),
        ui.kpi({ label: 'CTR', value: f.pctRatio(t.ctr, 2), foot: t.ctr === null ? 'Gösterim yok' : 'tıklama ÷ gösterim', tip: '<b>CTR</b>: Toplam tıklama ÷ toplam gösterim. Kampanya oranlarının ortalaması değildir.' }),
        ui.kpi({ label: isMeta ? 'CPC (tümü)' : 'Ort. TBM (CPC)', value: f.money(t.cpc), compact: f.moneyShort(t.cpc), foot: t.cpc === null ? 'Tıklama yok' : 'harcama ÷ tıklama', tip: '<b>CPC</b>: Toplam harcama ÷ toplam tıklama.' }),
        ui.kpi({ label: 'CPM', value: f.money(t.cpm), compact: f.moneyShort(t.cpm), foot: t.cpm === null ? 'Gösterim yok' : '1.000 gösterim başına', tip: '<b>CPM</b>: 1.000 gösterim başına maliyet = harcama ÷ gösterim × 1.000.' })
      ];
      if (!isMeta) {
        kp.push(ui.kpi({ label: 'Dönüşüm (platform)', value: t.hasConv ? f.dec1(t.conversions) : N.DASH, foot: 'Google Ads\'in raporladığı', tip: '<b>Dönüşüm</b>: Google Ads\'te tanımlı dönüşüm işlemleri. Kesirli olabilir (veriye dayalı ilişkilendirme). İşletmenin toplam satışı değildir.' }));
        kp.push(ui.kpi({ label: 'Dönüşüm değeri (platform)', value: t.hasConv ? f.money(t.convValue) : N.DASH, foot: 'ROAS hesaplanmaz', tip: '<b>Dönüşüm değeri</b>: Dönüşümlere Google Ads\'te atanmış değerlerin toplamı. Gerçek ciro değildir; mağaza, telefon ve DM satışlarını içermez.' }));
      }
      html += '<div class="n1i-kpis n1i-kpis--strip' + (isMeta ? ' n1i-kpis--6' : '') + '" style="--n1i-kpi-desktop:' + (isMeta ? 6 : 4) + '">' + kp.join('') + '</div>';
      if (isMeta) html += actionsPanel(t);
    }
    html += '<div class="n1i-grid"><div class="n1i-panel n1i-col-12" data-trend></div>' + (cErr ? '' : '<div class="n1i-panel n1i-col-12 n1i-responsive-table" data-campaigns></div>') + '</div>';

    // Hesap seviyesindeki günlük toplam ile kampanya toplamı farkı (Meta: silinmiş/arşivlenmiş kampanyalar listede yok)
    var dailySpend = daily.reduce(function (a, r) { return a + (Number(r.spend) || 0); }, 0);
    var foot = [];
    if (!cErr && !dErr && daily.length && Math.abs(dailySpend - t.spend) > Math.max(1, t.spend * 0.01)) {
      foot.push('Günlük grafikteki hesap toplamı ' + f.money(dailySpend) + ', kampanya tablosunun toplamı ' + f.money(t.spend) + '. Fark, listeden çıkarılan silinmiş/arşivlenmiş kampanyalardan veya saat dilimi farkından kaynaklanabilir.');
    }
    foot.push(isMeta ? 'Meta ve Google Ads metrik tanımları birebir aynı değildir; iki platformun sayıları doğrudan toplanmamalıdır.' : 'Tarih aralığı Wix sayfa kodunda UTC tarihiyle hesaplanır; Google Ads hesabının saat dilimine göre gün sınırı farklı olabilir.');
    foot.push('DM ve WhatsApp üzerinden yapılan satışlar reklam platformu verisine yansımayabilir; bu nedenle ROAS veya kesin yatırım getirisi hesaplanmaz.');
    html += '<div class="n1i-foot">' + foot.map(function (x) { return '<p>' + esc(x) + '</p>'; }).join('') + '</div>';
    body.innerHTML = html;

    if (first && !cErr) {
      N.motion.count(document.querySelector('#a-impr [data-v]'), t.impressions, f.int);
      N.motion.count(document.querySelector('#a-clicks [data-v]'), t.clicks, f.int);
    }
    renderTrend(daily, dErr);
    if (!cErr) renderCampaigns(campaigns, t);
    if (first) N.motion.enter(root.querySelectorAll('.n1i-kpi, .n1i-panel'));
    N.height.schedule();
  }

  function actionsPanel(t) {
    var found = META_ACTIONS.filter(function (a) { return t.actions[a.id] !== undefined; });
    var head = '<div class="n1i-subhead"><h3 class="n1i-h2">Platformun bildirdiği eylemler</h3><p class="n1i-panel__sub">Yalnızca API yanıtında açıkça tanımlı eylem türleri</p></div>';
    if (!found.length) return head + ui.state('empty', 'Bu aralıkta tanımlı bir dönüşüm eylemi yok', 'Mesajlaşma, satın alma, form veya bağlantı tıklaması eylemi raporlanmadı.');
    var n = found.length + (t.actionValues.purchase !== undefined ? 1 : 0);
    return head + '<div class="n1i-kpis n1i-kpis--strip n1i-kpis--soft" style="--n1i-kpi-desktop:' + Math.min(4, n) + '">' +
      found.map(function (a) { return ui.kpi({ label: a.label, value: f.int(t.actions[a.id]), compact: f.compact(t.actions[a.id]), tip: a.tip }); }).join('') +
      (t.actionValues.purchase !== undefined ? ui.kpi({ label: 'Satın alma değeri (Pixel)', value: f.money(t.actionValues.purchase), compact: f.moneyShort(t.actionValues.purchase), foot: 'Gerçek ciro değildir', tip: '<b>Satın alma değeri</b>: Pixel / Conversions API ile gönderilen satın alma tutarları. DM, WhatsApp ve mağaza satışlarını içermez.' }) : '') +
      '</div>';
  }

  var METRICS = [{ key: 'spend', label: 'Harcama' }, { key: 'clicks', label: 'Tıklama' }, { key: 'impressions', label: 'Gösterim' }];
  function renderTrend(daily, dErr) {
    var el = root.querySelector('[data-trend]'); if (!el) return;
    var head = '<div class="n1i-panel__head" style="flex-wrap:wrap"><div><h3 class="n1i-h2">Günlük ' + esc(METRICS.filter(function (m) { return m.key === metric; })[0].label.toLowerCase()) + '</h3><div class="n1i-panel__sub">Hesap seviyesi · gün bazında</div></div>' +
      '<div style="display:flex;gap:8px;flex-wrap:wrap">' + ui.seg('metric', METRICS, metric, 'Grafikte gösterilen metrik') + '<button type="button" class="n1i-btn n1i-btn--sm n1i-btn--ghost" data-toggle-table aria-pressed="' + showTable + '">' + N.icon(showTable ? 'chart' : 'table') + (showTable ? 'Grafik' : 'Tablo') + '</button></div></div>';
    if (trendChart) { trendChart.destroy(); trendChart = null; }
    if (dErr) { el.innerHTML = head + ui.state('error', 'Günlük veri alınamadı', esc(dErr)); return; }
    if (!daily.length) { el.innerHTML = head + ui.state('empty', 'Bu aralıkta günlük veri yok', 'Reklam yayınlanmadıysa platform gün satırı döndürmez.'); return; }
    var al = N.alignDays(daily, P.dayKey, function (r) { return { spend: Number(r.spend) || 0, clicks: Number(r.clicks) || 0, impressions: Number(r.impressions) || 0 }; }, { spend: 0, clicks: 0, impressions: 0 });
    var vals = al.values.map(function (v) { return v[metric]; });
    var isMoney = metric === 'spend';
    var fmtV = isMoney ? f.money : f.int;
    var todayKey = f.todayISO().replace(/-/g, ''), partial = al.keys[al.keys.length - 1] === todayKey;
    var tot = vals.reduce(function (a, b) { return a + b; }, 0);
    var summary = 'Toplam ' + fmtV(tot) + '. Ortalama günlük ' + fmtV(tot / (vals.length || 1)) + '.' + (partial ? ' Bugün henüz tamamlanmadı (kesikli).' : '') + ' Kayıt olmayan günler 0 olarak çizilir.';
    if (showTable) {
      el.innerHTML = head + '<div class="n1i-tablewrap" tabindex="0" role="region" aria-label="Günlük veri tablosu" style="max-height:320px"><table class="n1i-table"><thead><tr><th scope="col">Gün</th><th class="is-num" scope="col">Harcama</th><th class="is-num" scope="col">Tıklama</th><th class="is-num" scope="col">Gösterim</th></tr></thead><tbody>' +
        al.keys.map(function (k, i) { var v = al.values[i]; return '<tr><td>' + f.dayLong(k) + '</td><td class="is-num">' + f.money(v.spend) + '</td><td class="is-num">' + f.int(v.clicks) + '</td><td class="is-num">' + f.int(v.impressions) + '</td></tr>'; }).join('') +
        '</tbody></table></div><p class="n1i-summary-text">' + esc(summary) + '</p>';
      N.height.schedule(); return;
    }
    el.innerHTML = head + '<div class="n1i-chartbox"><canvas role="img" aria-label="' + esc('Günlük ' + metric + ' çizgi grafiği. ' + summary) + '"></canvas></div><p class="n1i-summary-text">' + esc(summary) + '</p>';
    N.charts.load().then(function (Chart) {
      var cv = el.querySelector('canvas'); if (!cv) return;
      var colVar = isMoney ? '--n1i-c1' : (metric === 'clicks' ? '--n1i-c2' : '--n1i-c3');
      trendChart = N.charts.create(cv, function () { var c = N.charts.color; return {
        type: 'line',
        data: { labels: al.labels, datasets: [{ label: METRICS.filter(function (m) { return m.key === metric; })[0].label, data: vals, borderColor: c(colVar), backgroundColor: isMoney ? N.charts.areaFill('--n1i-c1-fill') : 'transparent', fill: isMoney ? 'origin' : false, pointBackgroundColor: c('--n1i-surface'), pointBorderColor: c(colVar), pointBorderWidth: 2, borderWidth: 2.5, pointRadius: 0, pointHoverRadius: 5, tension: 0.35, segment: { borderDash: function (ctx) { return partial && ctx.p1DataIndex === vals.length - 1 ? [4, 4] : undefined; } } }] },
        options: {
          scales: { x: N.charts.axis({ grid: { display: false }, ticks: { color: c('--n1i-muted'), maxRotation: 0, autoSkip: true, maxTicksLimit: 8, font: { size: 12.5, weight: '500' } } }), y: N.charts.axis({ beginAtZero: true, ticks: { color: c('--n1i-muted'), maxTicksLimit: 5, callback: function (v) { return isMoney ? f.moneyShort(v) : f.compact(v); }, font: { size: 12.5, weight: '500' } } }) },
          plugins: { tooltip: { callbacks: { title: function (it) { return f.dayLong(al.keys[it[0].dataIndex]); }, label: function (it) { return ' ' + it.dataset.label + ': ' + fmtV(it.parsed.y); } } } }
        }
      }; });
    }, function () { showTable = true; renderTrend(daily, dErr); });
    N.height.schedule();
  }

  function campaignRow(c) {
    var r = { name: c.campaign_name || '(adsız kampanya)', spend: Number(c.spend) || 0, impressions: Number(c.impressions) || 0, clicks: Number(c.clicks) || 0 };
    r.ctr = r.impressions > 0 ? r.clicks / r.impressions : null;
    r.cpc = r.clicks > 0 ? r.spend / r.clicks : null;
    if (isMeta) { r.msg = pickAction(c.actions, META_ACTIONS[0].types); r.purchase = pickAction(c.actions, META_ACTIONS[1].types); }
    else { r.conv = c.conversions === undefined || c.conversions === null ? null : Number(c.conversions); }
    return r;
  }
  function renderCampaigns(campaigns, t) {
    var el = root.querySelector('[data-campaigns]'); if (!el) return;
    var head = '<div class="n1i-panel__head"><div><h3 class="n1i-h2">Kampanyalar</h3><div class="n1i-panel__sub">' + f.int(campaigns.length) + ' kampanya · sıralamak için sütun başlığına dokunun</div></div></div>';
    if (!campaigns.length) { el.innerHTML = head + ui.state('empty', 'Bu aralıkta harcama yapan kampanya yok', 'Platform bu aralık için kampanya satırı döndürmedi.'); return; }
    var rows = campaigns.map(campaignRow);
    rows.sort(function (a, b) { var x = a[sortKey], y = b[sortKey]; if (sortKey === 'name') return sortDir * String(x).localeCompare(String(y), 'tr'); return sortDir * ((x === null ? -1 : x) - (y === null ? -1 : y)); });
    var cols = [{ k: 'name', l: 'Kampanya' }, { k: 'spend', l: 'Harcama', n: 1 }, { k: 'impressions', l: 'Gösterim', n: 1 }, { k: 'clicks', l: P.clicksLabel, n: 1 }, { k: 'ctr', l: 'CTR', n: 1 }, { k: 'cpc', l: 'CPC', n: 1 }];
    if (isMeta) { cols.push({ k: 'msg', l: 'Mesaj başlatma', n: 1 }); cols.push({ k: 'purchase', l: 'Satın alma', n: 1 }); } else cols.push({ k: 'conv', l: 'Dönüşüm', n: 1 });
    function cell(r, k) {
      if (k === 'spend' || k === 'cpc') return f.money(r[k]);
      if (k === 'ctr') return f.pctRatio(r[k], 2);
      if (k === 'conv') return r.conv === null ? N.DASH : f.dec1(r.conv);
      if (k === 'msg' || k === 'purchase') return r[k] === null ? N.DASH : f.int(r[k]);
      return f.int(r[k]);
    }
    var th = cols.map(function (c) {
      var s = sortKey === c.k ? (sortDir < 0 ? 'descending' : 'ascending') : null;
      return '<th scope="col"' + (c.n ? ' class="is-num"' : '') + (s ? ' aria-sort="' + s + '"' : '') + '><button type="button" class="n1i-th-btn" data-sort="' + c.k + '"' + (s ? ' aria-sort="' + s + '"' : '') + '>' + esc(c.l) + (s ? N.icon(sortDir < 0 ? 'down' : 'up', 'n1i-sorticon') : '') + '</button></th>';
    }).join('');
    var tb = rows.map(function (r) { return '<tr>' + cols.map(function (c) { return c.k === 'name' ? '<td class="is-name">' + esc(r.name) + '</td>' : '<td class="is-num">' + cell(r, c.k) + '</td>'; }).join('') + '</tr>'; }).join('');
    var tf = '<tr><td>Toplam</td><td class="is-num">' + f.money(t.spend) + '</td><td class="is-num">' + f.int(t.impressions) + '</td><td class="is-num">' + f.int(t.clicks) + '</td><td class="is-num">' + f.pctRatio(t.ctr, 2) + '</td><td class="is-num">' + f.money(t.cpc) + '</td>' +
      (isMeta ? '<td class="is-num">' + (t.actions.msg !== undefined ? f.int(t.actions.msg) : N.DASH) + '</td><td class="is-num">' + (t.actions.purchase !== undefined ? f.int(t.actions.purchase) : N.DASH) + '</td>' : '<td class="is-num">' + (t.hasConv ? f.dec1(t.conversions) : N.DASH) + '</td>') + '</tr>';
    var cards = rows.map(function (r) {
      var extra = isMeta ? '<div><dt>Mesaj</dt><dd>' + cell(r, 'msg') + '</dd></div><div><dt>Satın alma</dt><dd>' + cell(r, 'purchase') + '</dd></div>' : '<div><dt>Dönüşüm</dt><dd>' + cell(r, 'conv') + '</dd></div>';
      return '<li class="n1i-ccard"><div class="n1i-ccard__name">' + esc(r.name) + '</div><dl><div><dt>Harcama</dt><dd>' + cell(r, 'spend') + '</dd></div><div><dt>Gösterim</dt><dd>' + cell(r, 'impressions') + '</dd></div><div><dt>Tıklama</dt><dd>' + cell(r, 'clicks') + '</dd></div><div><dt>CTR</dt><dd>' + cell(r, 'ctr') + '</dd></div><div><dt>CPC</dt><dd>' + cell(r, 'cpc') + '</dd></div>' + extra + '</dl></li>';
    }).join('');
    el.innerHTML = head + '<div class="n1i-tablewrap" tabindex="0" role="region" aria-label="Kampanya tablosu"><table class="n1i-table"><thead><tr>' + th + '</tr></thead><tbody>' + tb + '</tbody><tfoot>' + tf + '</tfoot></table></div><ul class="n1i-cards" aria-label="Kampanyalar">' + cards + '</ul>';
  }

  root.addEventListener('click', function (e) {
    var m = e.target.closest('[data-metric]');
    if (m && last) { metric = m.getAttribute('data-metric'); renderTrend(last.data.daily || [], errText(last.data.dailyError)); return; }
    var s = e.target.closest('[data-sort]');
    if (s && last) { var k = s.getAttribute('data-sort'); if (sortKey === k) sortDir = -sortDir; else { sortKey = k; sortDir = k === 'name' ? 1 : -1; } renderCampaigns(last.data.campaigns || [], aggregate(last.data.campaigns || [])); var nb = root.querySelector('[data-sort="' + k + '"]'); if (nb) nb.focus(); N.height.schedule(); return; }
    if (e.target.closest('[data-toggle-table]') && last) { showTable = !showTable; renderTrend(last.data.daily || [], errText(last.data.dailyError)); return; }
    if (e.target.closest('[data-retry]')) { root.querySelector('[data-banner]').innerHTML = ''; ctrl.retry(); }
  });

  shell();
  N.height.start(root);
  N.bridge.listen(function (d) { if (!ctrl.accept(d)) return; render(d); }, {
    accept: function (d) { return Array.isArray(d.campaigns) && (!d.rangeKey || /^(7|30|all)$/.test(d.rangeKey)); },
    kind: function (d) { return 'r' + (d.rangeKey || '7'); },
    dedupe: function () { return !ctrl.isPending(); },
    onError: function () { banner('error', 'Görüntüleme hatası', 'Gelen veri beklenen biçimde değil.'); }
  });
})();
