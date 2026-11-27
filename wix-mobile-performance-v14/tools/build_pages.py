#!/usr/bin/env python3
"""V1.4 sayfa üretici: canlı sürümlerden V1.4 sürümlerini üretir (kaynak dosyalar değiştirilmez).
Her değişiklik birebir metin eşleşmesiyle yapılır ve tam bir kez bulunmazsa betik durur (sessiz kayma yok).
Kullanım: python3 build_pages.py <MEDIA_SHA>
"""
import json, os, sys, re

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
MEDIA_SHA = sys.argv[1]
OUT = os.path.join(ROOT, 'wix-mobile-performance-v14', 'pages')
MAN = json.load(open(os.path.join(ROOT, 'wix-mobile-performance-v14', 'media', 'stills', 'stills-manifest.json')))

def stills_for(prefix):
    m = {}
    for k, v in MAN.items():
        if k.startswith(prefix):
            ws = [f['w'] for f in v['files']]
            w, h = v['sourceWxH'].split('x')
            m[k] = {'w': int(w), 'h': int(h), 'ws': ws}
    return m

def helper(page_dir, still_prefix):
    base = 'https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@%s/wix-mobile-performance-v14/media/stills/%s/' % (MEDIA_SHA, page_dir)
    return '''
  /* ---------- V1.4 · cihaz profili, mobil sabit kareler, belge yaşam döngüsü (wix-mobile-performance-v14/RESOURCE_LIFECYCLE.md) ---------- */
  // Hafif profil = telefon ve tablet (iPad yatay, izleme dörtgenli iPad dahil; dokunmatik ekran her zaman vardır). Sayfa açılışında BİR KEZ belirlenir:
  // döndürme ya da pencere boyutu değişince medya yeniden seçilmez (yükleme/çözücü dalgalanması olmaz). Masaüstü (yalnız fare/izleme dörtgeni) her genişlikte videoyu korur.
  var N1_LITE = (function () { try { return matchMedia('(any-pointer: coarse) and (max-width: 1366px)').matches || matchMedia('(max-width: 900px) and (hover: none)').matches; } catch (e) { return false; } })();
  var N1_STILLS = '%s';
  var N1_STILL = %s;
  // İkincil video yerine yüksek kaliteli WebP kare (MOBILE_MEDIA_MAPPING.md). <video> öğesi hiç oluşturulmaz: istek, ön yükleme ve kod çözücü yok.
  function n1StillHtml(key, alt, cls, sizes, extra) {
    var s = N1_STILL[key], mid = s.ws.filter(function (w) { return w <= 960; }).pop() || s.ws[0];
    return '<img class="' + (cls || 'n1-still') + '" data-n1-still="' + key + '"' + (extra || '') + ' alt="' + (alt || '') + '" decoding="async" loading="lazy" width="' + s.w + '" height="' + s.h +
      '" src="' + N1_STILLS + key + '-' + mid + '.webp" srcset="' + s.ws.map(function (w) { return N1_STILLS + key + '-' + w + '.webp ' + w + 'w'; }).join(', ') + '" sizes="' + (sizes || '(max-width: 900px) 100vw, 60vw') + '">';
  }
  (function () {
    if (!N1_LITE || document.getElementById('n1-still-v14')) return;
    var s = document.createElement('style'); s.id = 'n1-still-v14';
    s.textContent = '.n1-still{position:absolute;inset:0;display:block;width:100%%;height:100%%;object-fit:cover;opacity:1;visibility:visible}';
    (document.head || document.documentElement).appendChild(s);
  })();
  // Belge yaşam döngüsü: sayfa gizlenirken (gezinme ya da BFCache) bu bileşenin videoları durdurulur ve kaynakları bırakılır (kod çözücü + arabellek);
  // BFCache dönüşünde yalnız bırakılanlar geri yüklenir, görünür ve oynuyor idiyse yeniden oynar. İdempotent: birden çok pagehide/pageshow güvenli.
  // Yalnız kendi kökündeki <video> öğelerine dokunur (Wix ve diğer bileşenler etkilenmez). Dinleyiciler bileşenin temizliğine (_cleanups) bağlıdır.
  function n1Life(owner) {
    if (owner._n1Life) return; owner._n1Life = true;
    var held = [];
    function release() {
      [].forEach.call(owner.querySelectorAll('video'), function (v) {
        if (v._n1Held) return; var src = v.getAttribute('src'); if (!src) return;
        v._n1Held = { src: src, play: !v.paused && !v.ended, t: v.currentTime || 0, preload: v.preload };
        try { v.pause(); } catch (e) {} v.removeAttribute('src'); try { v.load(); } catch (e) {}
        held.push(v);
      });
    }
    function restore(e) {
      if (!e.persisted) return;
      held.splice(0).forEach(function (v) {
        var h = v._n1Held; v._n1Held = null; if (!h || !v.isConnected || v.getAttribute('src')) return;
        v.preload = h.preload || 'metadata'; v.setAttribute('src', h.src);
        if (h.t > .05) v.addEventListener('loadedmetadata', function () { try { v.currentTime = h.t; } catch (x) {} }, { once: true });
        try { v.load(); } catch (x) {}
        if (!h.play) return;
        var go = function () { if (owner._on && owner.isConnected && !document.hidden && v.paused && n1MediaRatio(v) >= .08) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } };
        go(); v.addEventListener('canplay', go, { once: true });   // load() bekleyen play() sözünü iptal edebilir: hazır olunca bir kez daha
      });
    }
    n1Listen(owner, window, 'pagehide', release);
    n1Listen(owner, window, 'pageshow', restore, true);   // yakalama evresi: sayfanın kendi pageshow kurtarmasından ÖNCE kaynak geri gelir
    owner._cleanups.push(function () { owner._n1Life = false; held.length = 0; });
  }
''' % (base, json.dumps(stills_for(still_prefix), separators=(',', ':')))

def apply(src_rel, out_rel, header, page_dir, still_prefix, reps, tag_expect):
    s = open(os.path.join(ROOT, src_rel), encoding='utf-8').read()
    assert ("var TAG = '%s'" % tag_expect) in s, 'TAG?'
    m = re.search(r"\n  function n1MobileRepair\(\)\{[^\n]*\}\n", s)
    assert m, 'n1MobileRepair satırı yok'
    s = s[:m.end()] + helper(page_dir, still_prefix) + s[m.end():]
    for old, new in reps:
        n = s.count(old)
        assert n == 1, '%s: %d eşleşme → %r' % (out_rel, n, old[:90])
        s = s.replace(old, new)
    s = header + '\n' + s
    p = os.path.join(OUT, out_rel); os.makedirs(os.path.dirname(p), exist_ok=True)
    open(p, 'w', encoding='utf-8').write(s)
    print('yazıldı', out_rel, len(s))

LIFE = ('this._videos();', 'this._videos(); n1Life(this);')

# ---------- E-Ticaret v24 → v25 ----------
apply('wix-global-stability-v13/pages/wix-e-ticaret-yonetimi-v24/n1-e-ticaret-yonetimi-v24.js',
      'wix-e-ticaret-yonetimi-v25/n1-e-ticaret-yonetimi-v25.js',
      '/* MOBILE PERFORMANCE V1.4 — n1-e-ticaret-yonetimi-v25.js = v24 (WebKit filtre düzeltmesi korunur) + telefon/tablette ikincil videolar (mağaza, büyüme) yerine WebP kare; belge yaşam döngüsü; içerik görselleri Wix boyutlandırma srcset. Tag name DEĞİŞMEDİ: n1-e-ticaret-yonetimi-v23. */',
      'e-ticaret-yonetimi', 'eticaret-', [
  ("  function screen(id, label, eager) {\n",
   "  function screen(id, label, eager, still) {\n    if (N1_LITE && still) return '<div class=\"ec-screen\">' + n1StillHtml(still, label, null, '(max-width:1024px) 60vw, 30vw') + '</div>';   // V1.4\n"),
  ("screen(V_STORE, 'Mağaza deneyimi videosu, sessiz oynatım', false)", "screen(V_STORE, 'Mağaza deneyimi videosu, sessiz oynatım', false, 'eticaret-store')"),
  ("screen(V_TRIO, 'E-ticaret büyüme videosu, sessiz oynatım', false)", "screen(V_TRIO, 'E-ticaret büyüme videosu, sessiz oynatım', false, 'eticaret-trio')"),
  ("        var scr = fig.querySelector('.ec-screen'), v = scr.querySelector('video'), btn = fig.querySelector('.ec-play'), err = scr.querySelector('.ec-screen__err'), prog = scr.querySelector('.ec-screen__prog i');\n",
   "        var scr = fig.querySelector('.ec-screen'), v = scr.querySelector('video'), btn = fig.querySelector('.ec-play'), err = scr.querySelector('.ec-screen__err'), prog = scr.querySelector('.ec-screen__prog i');\n        if (!v) return { fig: fig, scr: scr, still: true };   // V1.4: telefon/tablette sabit kare (video yok)\n"),
  ("near.observe(store.fig); near.observe(trio.fig);", "if (!store.still) near.observe(store.fig); if (!trio.still) near.observe(trio.fig);"),
  ("  function remotePic(url, cls, alt, sizes, pos, eager) {\n    return '<img class=\"' + cls + '\" src=\"' + esc(url) + '\" alt=\"' + esc(alt) + '\" sizes=\"' + esc(sizes) + '\"' +",
   "  // V1.4: özgün boyutlu PNG/JPG yerine Wix görsel hizmetinden ekran boyutuna uygun sürüm (fit: kırpmasız, büyütmesiz; enc_auto → tarayıcıya göre WebP/AVIF)\n  function remoteSet(url) { var ext = /\\.jpe?g$/i.test(url) ? 'jpg' : 'png'; return [240, 480, 960, 1440].map(function (w) { return url + '/v1/fit/w_' + w + ',h_' + (w * 3) + ',q_86,enc_auto/e-ticaret-yonetimi.' + ext + ' ' + w + 'w'; }).join(', '); }\n  function remotePic(url, cls, alt, sizes, pos, eager) {\n    var ext = /\\.jpe?g$/i.test(url) ? 'jpg' : 'png';\n    return '<img class=\"' + cls + '\" src=\"' + esc(url + '/v1/fit/w_960,h_2880,q_86,enc_auto/e-ticaret-yonetimi.' + ext) + '\" srcset=\"' + esc(remoteSet(url)) + '\" alt=\"' + esc(alt) + '\" sizes=\"' + esc(sizes) + '\"' +"),
  LIFE,
], 'n1-e-ticaret-yonetimi-v23')

# ---------- Sosyal Medya v27 → v28 ----------
apply('wix-global-menu-v12/pages/wix-sosyal-medya-v27/n1-sosyal-medya-v27.js',
      'wix-sosyal-medya-v28/n1-sosyal-medya-v28.js',
      '/* MOBILE PERFORMANCE V1.4 — n1-sosyal-medya-v28.js = v27 + telefon/tablette ikincil videolar (hareket, kapanış, strateji) yerine WebP kare; belge yaşam döngüsü. Tag name DEĞİŞMEDİ: n1-sosyal-medya-v27. */',
      'sosyal-medya', 'sosyal-', [
  ("  function screen(id, r, label, eager, sizes, fallbackId) {\n",
   "  function screen(id, r, label, eager, sizes, fallbackId, still) {\n    if (N1_LITE && still) return '<div class=\"sm-scrbox\"><div class=\"sm-screen\">' + n1StillHtml(still, label, null, sizes) + '</div></div>';   // V1.4\n"),
  ("false, '(max-width:1024px) 100vw, 90vw')", "false, '(max-width:1024px) 100vw, 90vw', null, 'sosyal-hareket')"),
  ("'(max-width:767px) 80vw, 22vw', V_HERO_FINAL_STILL)", "'(max-width:767px) 80vw, 22vw', V_HERO_FINAL_STILL, 'sosyal-final')"),
  ("        var scr = fig.querySelector('.sm-screen'), v = scr.querySelector('video'), btn = fig.querySelector('.sm-play'), err = scr.querySelector('.sm-screen__err'), prog = scr.querySelector('.sm-screen__prog i');\n",
   "        var scr = fig.querySelector('.sm-screen'), v = scr.querySelector('video'), btn = fig.querySelector('.sm-play'), err = scr.querySelector('.sm-screen__err'), prog = scr.querySelector('.sm-screen__prog i');\n        if (!v) return { fig: fig, scr: scr, still: true };   // V1.4: telefon/tablette sabit kare (video yok)\n"),
  ("near.observe(motion.fig);", "if (!motion.still) near.observe(motion.fig);"),
  ("nearFinal.observe(finalVideo.fig);", "if (!finalVideo.still) nearFinal.observe(finalVideo.fig);"),
  ("      '<video class=\"sm-stg__img sm-stg__video is-on\" data-i=\"0\" muted playsinline webkit-playsinline loop preload=\"none\" aria-label=\"Markayı anlamak strateji videosu, sessiz\"></video>' +",
   "      (N1_LITE ? n1StillHtml('sosyal-strateji', 'Markayı anlamak: strateji görseli', 'sm-stg__img is-on', '(max-width:767px) 100vw, (max-width:1024px) 46vw, 30vw', ' data-i=\"0\"') :   // V1.4\n      '<video class=\"sm-stg__img sm-stg__video is-on\" data-i=\"0\" muted playsinline webkit-playsinline loop preload=\"none\" aria-label=\"Markayı anlamak strateji videosu, sessiz\"></video>') +"),
  ("      '<button type=\"button\" class=\"sm-stg__vbtn is-active\" aria-label=\"Strateji videosunu oynat\" aria-pressed=\"false\">' + I.play + I.pause + '</button>' +",
   "      (N1_LITE ? '' : '<button type=\"button\" class=\"sm-stg__vbtn is-active\" aria-label=\"Strateji videosunu oynat\" aria-pressed=\"false\">' + I.play + I.pause + '</button>') +"),
  ("          btn = media.querySelector('.sm-stg__vbtn'), err = media.querySelector('.sm-stg__video-error');\n",
   "          btn = media.querySelector('.sm-stg__vbtn'), err = media.querySelector('.sm-stg__video-error');\n      if (!v) return;   // V1.4: telefon/tablette sabit kare\n"),
  LIFE,
], 'n1-sosyal-medya-v27')

# ---------- Reklam Yönetimi v23 → v24 ----------
apply('wix-global-menu-v12/pages/wix-reklam-yonetimi-v23/n1-reklam-yonetimi-v23.js',
      'wix-reklam-yonetimi-v24/n1-reklam-yonetimi-v24.js',
      '/* MOBILE PERFORMANCE V1.4 — n1-reklam-yonetimi-v24.js = v23 + telefon/tablette ikincil videolar (manifesto kopyası, karar 1080p) yerine WebP kare; karar videosu artık işaretlemede kaynakla gelmez; belge yaşam döngüsü. Tag name DEĞİŞMEDİ: n1-reklam-yonetimi-v23. */',
      'reklam-yonetimi', 'reklam-', [
  ("  function screen(r, label, eager, sizes, cls) {\n    var ko = !!cls;   // manifestodaki kopya dekoratif: ekran okuyucudan gizli\n",
   "  function screen(r, label, eager, sizes, cls, still) {\n    var ko = !!cls;   // manifestodaki kopya dekoratif: ekran okuyucudan gizli\n    if (N1_LITE && still) return '<div class=\"ry-screen' + (cls ? ' ' + cls : '') + ' is-started\"' + (ko ? ' aria-hidden=\"true\"' : '') + '>' + n1StillHtml(still, ko ? '' : label, null, sizes) + '</div>';   // V1.4\n"),
  ("false, '100vw', 'ry-screen--ko')", "false, '100vw', 'ry-screen--ko', 'reklam-manifesto')"),
  ("        var v = scr.querySelector('video'), err = scr.parentNode.querySelector('.ry-screen__err');\n",
   "        var v = scr.querySelector('video'), err = scr.parentNode.querySelector('.ry-screen__err');\n        if (!v) { if (btn) btn.hidden = true; return { fig: watch, scr: scr, still: true }; }   // V1.4: telefon/tablette sabit kare\n"),
  ("near.observe(man.fig);", "if (!man.still) near.observe(man.fig);"),
  ("          '<video class=\"ry-dec__video\" muted playsinline webkit-playsinline loop preload=\"metadata\" src=\"' + V_DEC + '\" aria-label=\"Reklam verilerini ve analitik kararları anlatan video; sessiz oynatım\"></video>' +",
   "          (N1_LITE ? n1StillHtml('reklam-karar', 'Reklam verilerini ve analitik kararları anlatan görsel', 'ry-dec__video', '(max-width:767px) 100vw, 60vw') :   // V1.4: kaynak işaretlemeye hiç yazılmaz\n          '<video class=\"ry-dec__video\" muted playsinline webkit-playsinline loop preload=\"metadata\" src=\"' + V_DEC + '\" aria-label=\"Reklam verilerini ve analitik kararları anlatan video; sessiz oynatım\"></video>') +"),
  ("        '<button type=\"button\" class=\"ry-play ry-dec__play\" aria-label=\"Videoyu oynat\" aria-pressed=\"true\">' + I.pause + I.play + '</button>' +",
   "        (N1_LITE ? '' : '<button type=\"button\" class=\"ry-play ry-dec__play\" aria-label=\"Videoyu oynat\" aria-pressed=\"true\">' + I.pause + I.play + '</button>') +"),
  ("          conn = navigator.connection || {}, reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;\n      v.defaultMuted",
   "          conn = navigator.connection || {}, reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;\n      if (!v) return;   // V1.4: telefon/tablette sabit kare\n      v.defaultMuted"),
  LIFE,
], 'n1-reklam-yonetimi-v23')

# ---------- UI/UX v29 → v30 ----------
apply('wix-global-stability-v13/pages/wix-uiux-tasarim-v29/n1-uiux-tasarim-v29.js',
      'wix-uiux-tasarim-v30/n1-uiux-tasarim-v30.js',
      '/* MOBILE PERFORMANCE V1.4 — n1-uiux-tasarim-v30.js = v29 (WebKit gri önizleme düzeltmesi korunur) + telefon/tablette "His" videosu yerine WebP kare (kaynak işaretlemeye yazılmaz); belge yaşam döngüsü. Tag name DEĞİŞMEDİ: n1-uiux-tasarim-v28. */',
      'ui-ux-tasarim', 'uiux-', [
  ("        '<video class=\"ux-feel__video\" src=\"' + FEEL_VIDEO + '\" muted playsinline webkit-playsinline loop preload=\"metadata\" aria-label=\"UI/UX tasarım deneyimini anlatan sessiz video\"></video>' +",
   "        (N1_LITE ? n1StillHtml('uiux-feel', 'UI/UX tasarım deneyimini anlatan görsel', 'ux-feel__video', '(max-width:900px) 100vw, 50vw') :   // V1.4\n        '<video class=\"ux-feel__video\" src=\"' + FEEL_VIDEO + '\" muted playsinline webkit-playsinline loop preload=\"metadata\" aria-label=\"UI/UX tasarım deneyimini anlatan sessiz video\"></video>') +"),
  ("        '<button class=\"ux-feel__play\" type=\"button\" aria-label=\"Videoyu oynat\" aria-pressed=\"false\">' + I.play + I.pause + '</button>' +",
   "        (N1_LITE ? '' : '<button class=\"ux-feel__play\" type=\"button\" aria-label=\"Videoyu oynat\" aria-pressed=\"false\">' + I.play + I.pause + '</button>') +"),
  ("          err = media.querySelector('.ux-feel__error'), conn = navigator.connection || {};\n",
   "          err = media.querySelector('.ux-feel__error'), conn = navigator.connection || {};\n      if (!v) return;   // V1.4: telefon/tablette sabit kare\n"),
  ("this._feelVideo();", "this._feelVideo(); n1Life(this);"),
], 'n1-uiux-tasarim-v28')

# ---------- Yapay Zekâ v2 → v3 ----------
apply('wix-global-menu-v12/pages/wix-yapay-zeka-v2/n1-yapay-zeka-v2.js',
      'wix-yapay-zeka-v3/n1-yapay-zeka-v3.js',
      '/* MOBILE PERFORMANCE V1.4 — n1-yapay-zeka-v3.js = v2 + telefon/tablette ikincil videolar (üretim, hikâye) yerine WebP kare; hero videosu korunur; belge yaşam döngüsü. Tag name DEĞİŞMEDİ: n1-yapay-zeka-v2. */',
      'yapay-zeka', 'yapay-', [
  ("  function vid(key, cls, label) {\n    var v = VID[key];\n",
   "  function vid(key, cls, label) {\n    var v = VID[key];\n    if (N1_LITE && key !== 'hero' && N1_STILL['yapay-' + key]) return '<div class=\"ai-vid ' + cls + ' is-ready\" data-still=\"' + key + '\" style=\"--ar:' + v.w + '/' + v.h + '\">' + n1StillHtml('yapay-' + key, label) + '</div>';   // V1.4\n"),
  ("        var key = box.getAttribute('data-v'), meta = VID[key], v = box.querySelector('video'), btn = box.querySelector('.ai-play'), err = box.querySelector('.ai-vid__err');\n",
   "        var key = box.getAttribute('data-v'), meta = VID[key], v = box.querySelector('video'), btn = box.querySelector('.ai-play'), err = box.querySelector('.ai-vid__err');\n        if (!v) return;   // V1.4: telefon/tablette sabit kare\n"),
  LIFE,
], 'n1-yapay-zeka-v2')

# ---------- Uygulama Geliştirme v2 → v3 ----------
apply('wix-global-menu-v12/pages/wix-uygulama-gelistirme-v2/n1-uygulama-gelistirme-v2.js',
      'wix-uygulama-gelistirme-v3/n1-uygulama-gelistirme-v3.js',
      '/* MOBILE PERFORMANCE V1.4 — n1-uygulama-gelistirme-v3.js = v2 + telefon/tablette ikincil videolar (web, ekranlar, hareket) yerine WebP kare; hero videosu korunur; belge yaşam döngüsü. Tag name DEĞİŞMEDİ: n1-uygulama-gelistirme-v2. */',
      'uygulama-gelistirme', 'uygulama-', [
  ("  function vid(key, cls, label, note) {\n    var m = VID[key];\n",
   "  function vid(key, cls, label, note) {\n    var m = VID[key];\n    if (N1_LITE && key !== 'hero' && N1_STILL['uygulama-' + key]) return '<div class=\"ap-vid ' + cls + ' is-ready\" data-still=\"' + key + '\" style=\"--ar:' + m.w + '/' + m.h + '\">' + n1StillHtml('uygulama-' + key, label) + (note ? '<p class=\"ap-vid__note\">' + note + '</p>' : '') + '</div>';   // V1.4\n"),
  ("        var key = box.getAttribute('data-v'), meta = VID[key], v = box.querySelector('video'), btn = box.querySelector('.ap-play'), err = box.querySelector('.ap-vid__err');\n",
   "        var key = box.getAttribute('data-v'), meta = VID[key], v = box.querySelector('video'), btn = box.querySelector('.ap-play'), err = box.querySelector('.ap-vid__err');\n        if (!v) return;   // V1.4: telefon/tablette sabit kare\n"),
  LIFE,
], 'n1-uygulama-gelistirme-v2')

# ---------- Kreatif Prodüksiyon v23 → v24 ----------
apply('wix-global-menu-v12/pages/wix-kreatif-produksiyon-v23/n1-kreatif-produksiyon-v23.js',
      'wix-kreatif-produksiyon-v24/n1-kreatif-produksiyon-v24.js',
      '/* MOBILE PERFORMANCE V1.4 — n1-kreatif-produksiyon-v24.js = v23 + telefon/tablette bölümlü monitör filmi kendiliğinden oynamaz/önden inmez (WebP kare gösterilir; bölüm/oynat dokunuşunda iner); belge yaşam döngüsü. Tag name DEĞİŞMEDİ: n1-kreatif-produksiyon-v23. */',
      'kreatif-produksiyon', 'kreatif-', [
  ("          '<img class=\"kp-poster\" alt=\"\" decoding=\"async\" loading=\"lazy\" src=\"' + poster(1280) + '\" srcset=\"' + poster(768) + ' 768w, ' + poster(1280) + ' 1280w\" sizes=\"(max-width:1024px) 100vw, 60vw\">' +",
   "          (N1_LITE ? n1StillHtml('kreatif-monitor', '', 'kp-poster', '(max-width:1024px) 100vw, 60vw') :   // V1.4\n          '<img class=\"kp-poster\" alt=\"\" decoding=\"async\" loading=\"lazy\" src=\"' + poster(1280) + '\" srcset=\"' + poster(768) + ' 768w, ' + poster(1280) + ' 1280w\" sizes=\"(max-width:1024px) 100vw, 60vw\">') +"),
  ("      hero.auto = mon.auto = autoOK;\n", "      hero.auto = mon.auto = autoOK;\n      if (N1_LITE) mon.auto = false;   // V1.4: telefon/tablette bölümlü film yalnız kullanıcı oynatınca (bölüm/oynat) iner\n"),
  ("      near.observe(mon.scr);\n", "      if (!N1_LITE) near.observe(mon.scr);\n"),
  LIFE,
], 'n1-kreatif-produksiyon-v23')
