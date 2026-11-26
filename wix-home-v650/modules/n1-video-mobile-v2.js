/*!
 * n1-video-mobile-v2 — 1N Digital Media · sinematik video bölümleri, MOBİL / TABLET oynatma (v6.50 / V1.2)
 * v1 (v6.49) ile aynı; tek fark: data-loop-end. M2 klibinin (#samuray-video) son ≈1,2 sn'si neredeyse tamamen siyah
 * (ölçülen ortalama parlaklık 7–8 / 255) ve döngünün her turunda ekranda boş siyah bir blok olarak görünüyordu. Döngü,
 * siyah kuyruk başlamadan (3,5 sn) başa döner. Klibin kendisi ve adresi değişmedi.
 * Masaüstü modülü (n1-samurai-video-v621.js) değişmedi ve masaüstünde aynen kullanılır. Bu dosya yalnızca mobil/tablet
 * profilinde onun yerine yüklenir; aynı işaretlemeyi ([data-n1-samurai-video] > video[data-sources]) ve aynı durum
 * sınıflarını (is-ready / is-error) kullanır.
 *
 * Farklar (mobil veri ve pil için):
 *   - Gecikmeli yükleme: kaynak, bölüm ekrana 1 ekran boyu yaklaşınca atanır (v621: sayfa yüklenince boşta atanır).
 *   - Yalnızca görünürken oynar; ekran dışında ve sekme gizliyken duraklar.
 *   - Poster: yükleyici bölümün arka planına ve video poster özniteliğine yazar; video oynayamazsa poster görünür kalır.
 *   - Otomatik oynatma engellenirse (iOS Düşük Güç Modu vb.) ilk dokunuşta yeniden denenir; yine olmazsa poster kalır.
 *   - prefers-reduced-motion: video yüklenmez, poster gösterilir.
 * Korunan Wix oynatma düzeltmeleri: muted + defaultMuted + playsinline/webkit-playsinline öznitelik ve özellik olarak,
 * kontrolsüz, loop, sesi açma girişimi geri alınır, play() sözü yakalanır.
 */
(function () {
  'use strict';
  var roots = document.querySelectorAll('n1-site-v1 [data-n1-samurai-video]');
  if (!roots.length) return;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  [].forEach.call(roots, function (root) {
    var video = root.querySelector('video'); if (!video || root.__n1vm) return;
    var sources = (video.getAttribute('data-sources') || '').split('|').map(function (s) { return s.trim(); }).filter(Boolean);
    var idx = -1, visible = false, started = false, playResult = '—', lastError = '';
    video.muted = true; video.defaultMuted = true; video.setAttribute('muted', '');
    video.playsInline = true; video.setAttribute('playsinline', ''); video.setAttribute('webkit-playsinline', '');
    video.loop = true; video.controls = false; video.removeAttribute('controls');
    video.removeAttribute('autoplay'); video.autoplay = false; video.preload = 'none';
    video.addEventListener('volumechange', function () { if (!video.muted) video.muted = true; });
    root.__n1vm = root.__n1sv = { video: video, state: function () { return { src: video.currentSrc, idx: idx, started: started, ready: video.readyState, paused: video.paused, play: playResult, error: lastError, visible: visible }; } };
    if (reduce || !sources.length) { root.classList.add('is-poster'); return; }

    function tryPlay() {
      if (!started || !visible || document.hidden) return;
      var p = video.play();
      if (p && p.then) p.then(function () { playResult = 'başarılı'; }).catch(function (err) { playResult = (err && err.name) || 'hata'; });
    }
    function next() {
      idx++;
      if (idx >= sources.length) { root.classList.add('is-error'); return; }
      video.preload = 'auto'; video.src = sources[idx]; video.load(); tryPlay();
    }
    video.addEventListener('error', function () { var me = video.error; lastError = me ? 'MediaError ' + me.code : 'hata'; next(); });
    video.addEventListener('playing', function () { root.classList.add('is-ready'); });
    // V1.2: siyah kuyruk kırpma — kare doğruluğunda (requestVideoFrameCallback), yoksa timeupdate ile
    var loopEnd = parseFloat(video.getAttribute('data-loop-end')) || 0;
    if (loopEnd > 0) {
      var back = function (t) { if (t >= loopEnd) { try { video.currentTime = 0.04; } catch (e) {} } };
      if ('requestVideoFrameCallback' in HTMLVideoElement.prototype) {
        var onFrame = function (now, meta) { back(meta && meta.mediaTime != null ? meta.mediaTime : video.currentTime); if (root.isConnected) video.requestVideoFrameCallback(onFrame); };
        video.requestVideoFrameCallback(onFrame);
      } else video.addEventListener('timeupdate', function () { back(video.currentTime + 0.12); });
    }
    video.addEventListener('loadeddata', tryPlay);

    if (!('IntersectionObserver' in window)) { started = true; visible = true; next(); return; }
    var near = new IntersectionObserver(function (es) {
      if (es.some(function (e) { return e.isIntersecting; })) { near.disconnect(); started = true; next(); }
    }, { rootMargin: '100% 0px 100% 0px' });
    near.observe(root);
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { visible = e.isIntersecting; if (visible) tryPlay(); else if (!video.paused) video.pause(); });
    }, { threshold: 0.05 });
    io.observe(root);
    var onVis = function () { if (document.hidden) { if (!video.paused) video.pause(); } else tryPlay(); };
    document.addEventListener('visibilitychange', onVis);
    // Otomatik oynatma reddedildiyse ilk dokunuş/tıklama bir kullanıcı hareketidir: bir kez yeniden dene
    var onGesture = function () { if (video.paused) tryPlay(); };
    window.addEventListener('touchend', onGesture, { passive: true }); window.addEventListener('click', onGesture, { passive: true });
    // Bölüm DOM'dan kalkınca (bileşen yeniden kurulursa / Wix sayfa geçişi) dinleyiciler bırakılır
    var mo = new MutationObserver(function () {
      if (root.isConnected) return; mo.disconnect(); near.disconnect(); io.disconnect();
      document.removeEventListener('visibilitychange', onVis); window.removeEventListener('touchend', onGesture); window.removeEventListener('click', onGesture);
      try { video.pause(); video.removeAttribute('src'); video.load(); } catch (e) {}
    });
    mo.observe(document.body, { childList: true, subtree: true });
  });
})();
