/*!
 * n1-video-m4 — 1N Digital Media · mobil/tablet video denetleyicisi (v6.52 / V1.4)
 * Kapsam: yeni Ronin hero filmi ([data-m4-film]) + M2 (#samuray-video) + M1 (#video-bandi). Yalnızca mobil/tablette yüklenir.
 * Temel: V1.3'ün n1-video-mobile-v3 dosyası (iPhone düzeltmeleri aynen): katman yalnızca currentTime gerçekten ilerleyince
 * görünür; ret durumunda poster + erişilebilir "Videoyu oynat"; sonsuz deneme yok; ekran dışında/sekme gizliyken durur,
 * kaldığı yerden devam eder; BFCache dönüşü; hareket azaltma ve Veri Tasarrufu'nda otomatik oynatma yok.
 * V1.4 eklemeleri:
 *   - DURAKLAT/OYNAT düğmesi (WCAG 2.2.2: 5 sn'den uzun otomatik hareket). Kullanıcı duraklatırsa görünürlük değişse
 *     de kendiliğinden başlamaz.
 *   - Hero filmi öncelikli: kaynak hemen atanır (yaklaşma beklenmez); poster <img> ilk kare ilerleyince kalkar.
 *   - Kare zamanı olayı: her çizilen karede kökte 'm4:time' (detail.t) yayımlanır → hero sahne yazıları ekrandaki kareye bağlı.
 * Tek örnek: window.__n1v4.
 */
(function () {
  'use strict';
  var host = document.querySelector('n1-site-v1[data-n1-profile]');
  if (!host || host.getAttribute('data-n1-profile') === 'd') return;
  if (window.__n1v4 && window.__n1v4.destroy) { try { window.__n1v4.destroy(); } catch (e) {} }
  var roots = [].slice.call(host.querySelectorAll('[data-m4-film], [data-n1-samurai-video]'));
  if (!roots.length) return;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var saveData = !!(navigator.connection && navigator.connection.saveData);
  var offs = [], players = [];
  function on(t, ev, fn, o) { t.addEventListener(ev, fn, o); offs.push(function () { t.removeEventListener(ev, fn, o); }); }
  var PAUSE_ICON = '<svg viewBox="0 0 12 12" width="11" height="11" aria-hidden="true" focusable="false"><path d="M3 1.8h2v8.4H3zM7 1.8h2v8.4H7z" fill="currentColor"/></svg>';
  var PLAY_ICON = '<svg viewBox="0 0 12 12" width="11" height="11" aria-hidden="true" focusable="false"><path d="M3 1.6v8.8L10.2 6z" fill="currentColor"/></svg>';

  roots.forEach(function (root) {
    var video = root.querySelector('video'); if (!video || root.__n1v4) return;
    var isHero = root.hasAttribute('data-m4-film');
    var sources = (video.getAttribute('data-sources') || video.getAttribute('data-src') || '').split('|').map(function (s) { return s.trim(); }).filter(Boolean);
    var loopEnd = parseFloat(video.getAttribute('data-loop-end')) || 0;
    var S = { state: '', idx: -1, visible: false, near: false, pending: false, frames: 0, lastT: -1, lastAdvance: 0,
      attempts: 0, result: '—', error: '', events: [], ourPause: false, gestureArmed: false, userPaused: false };
    var timers = [];
    function log(ev) { S.events.push(ev + '@' + Math.round(performance.now())); if (S.events.length > 40) S.events.shift(); }
    function setState(st) { if (S.state === st) return; S.state = st; root.setAttribute('data-n1v-state', st); log('state:' + st); }

    // 1 · kaynak atanmadan ÖNCE: iOS'ta sessiz + satır içi oynatmanın koşulları (özellik ve öznitelik birlikte)
    video.muted = true; video.defaultMuted = true; video.setAttribute('muted', '');
    video.playsInline = true; video.setAttribute('playsinline', ''); video.setAttribute('webkit-playsinline', '');
    video.loop = true; video.controls = false; video.removeAttribute('controls');
    video.autoplay = false; video.removeAttribute('autoplay');
    video.preload = 'none';
    try { video.disableRemotePlayback = true; } catch (e) {}
    on(video, 'volumechange', function () { if (!video.muted) video.muted = true; });

    // 2 · erişilebilir oynatma düğmesi (yalnızca otomatik oynatma reddedilince / hareket azaltmada / akış durunca)
    var btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'n1v-play'; btn.setAttribute('aria-label', 'Videoyu oynat');
    btn.innerHTML = PLAY_ICON + '<span>Videoyu oynat</span>';
    root.appendChild(btn);
    // V1.4 · duraklat/oynat düğmesi (hero'da işaretlemede hazır, bantlarda burada eklenir)
    var tg = root.querySelector('.m4-film-tg');
    if (!tg) { tg = document.createElement('button'); tg.type = 'button'; tg.className = 'm4-film-tg n1v-tg'; tg.innerHTML = '<span class="m4-tg-i" aria-hidden="true"></span>'; root.appendChild(tg); }
    function tgSync() {
      var playing = !video.paused && !S.userPaused;
      tg.setAttribute('aria-pressed', S.userPaused ? 'true' : 'false');
      tg.setAttribute('aria-label', (S.userPaused || video.paused ? 'Videoyu oynat' : 'Videoyu duraklat') + (isHero ? ' (Ronin)' : ''));
      tg.classList.toggle('is-paused', !playing);
    }
    tgSync();

    function ready(v) { root.classList.toggle('is-ready', !!v); }
    function emit(t) { try { root.dispatchEvent(new CustomEvent('m4:time', { detail: { t: t } })); } catch (e) {} }
    function assign() {
      if (S.idx >= 0) return true;
      return next();
    }
    function next() {
      S.idx++;
      if (S.idx >= sources.length) { setState('error'); ready(false); return false; }
      video.preload = 'auto'; video.src = sources[S.idx]; log('src:' + S.idx);
      try { video.load(); } catch (e) {}
      if (S.state === 'idle') setState('loading');
      return true;
    }
    function attempt(reason) {
      if (!sources.length) return;
      if (S.pending) return;
      if (reason !== 'button' && reason !== 'gesture') {
        if (!S.visible || document.hidden) return;
        if (S.state === 'blocked' || S.state === 'error' || S.state === 'poster') return;   // otomatik yeniden deneme yok
        if (S.userPaused) return;                                                             // kullanıcı duraklattı
      }
      if (!assign()) return;
      S.pending = true; S.attempts++; log('play:' + reason);
      var p;
      try { p = video.play(); } catch (e) { p = null; S.pending = false; onReject(e); return; }
      if (p && p.then) p.then(function () { S.pending = false; S.result = 'ok'; log('play-ok'); if (S.state !== 'playing') setState('loading'); armWatch(); })
        .catch(function (err) { S.pending = false; onReject(err); });
      else { S.pending = false; armWatch(); }
    }
    function onReject(err) {
      var name = (err && err.name) || 'Error'; S.result = name; log('reject:' + name);
      if (name === 'AbortError') return;                 // kaynak değişti / load() kesti: olağan, yeniden denenmez
      if (name === 'NotSupportedError') { next(); return; }
      setState('blocked');                               // NotAllowedError vb.: poster + düğme, döngü yok
      if (!frames()) ready(false);
      armGesture();
    }
    function frames() { return S.frames >= 2; }
    // 3 · gerçek ilerleme: kare zamanı ilerlemeden video katmanı görünmez
    function advance(t) {
      if (t > S.lastT + 0.001 || (S.lastT > 0 && t < S.lastT - 0.5)) {   // ileri ya da döngü başına dönüş
        S.lastT = t; S.lastAdvance = performance.now(); S.frames++;
        if (frames() && !video.paused) { ready(true); if (S.state !== 'playing') setState('playing'); }
      }
      if (loopEnd > 0 && t >= loopEnd) { try { video.currentTime = 0.1; } catch (e) {} }   // V1.2: M2 siyah kuyruğu kırpılır
      emit(t);
    }
    if ('requestVideoFrameCallback' in HTMLVideoElement.prototype) {
      var onFrame = function (now, meta) { if (!root.isConnected || S.dead) return; advance(meta && meta.mediaTime != null ? meta.mediaTime : video.currentTime); video.requestVideoFrameCallback(onFrame); };
      video.requestVideoFrameCallback(onFrame);
    }
    on(video, 'timeupdate', function () { advance(video.currentTime + (loopEnd > 0 && !('requestVideoFrameCallback' in HTMLVideoElement.prototype) ? 0.12 : 0)); });
    var watchT = 0;
    function armWatch() {
      clearInterval(watchT);
      watchT = setInterval(function () {
        if (S.dead) return clearInterval(watchT);
        if (video.paused || !S.visible || document.hidden) return;
        var idle = performance.now() - (S.lastAdvance || 0);
        if (S.lastAdvance && idle > 2500 && S.state === 'playing') { setState('stalled'); ready(false); }   // akış durdu → poster
        if (!S.lastAdvance && S.attempts && idle > 6000 && S.state === 'loading') { setState('stalled'); }   // hiç kare gelmedi → düğme
      }, 1000);
    }
    on(video, 'loadedmetadata', function () { log('loadedmetadata'); });
    on(video, 'loadeddata', function () { log('loadeddata'); attempt('loadeddata'); });
    on(video, 'canplay', function () { log('canplay'); if (video.paused && S.state === 'loading') attempt('canplay'); });
    on(video, 'playing', function () { log('playing'); tgSync(); });
    on(video, 'waiting', function () { log('waiting'); });
    on(video, 'stalled', function () { log('stalled'); });
    on(video, 'pause', function () {
      log('pause'); tgSync();
      if (S.userPaused) { S.ourPause = false; setState('paused'); return; }
      if (S.ourPause) { S.ourPause = false; if (S.state === 'playing') setState('paused'); return; }
      // bizim istemediğimiz duraklama (iOS güç modu, sistem): görünür kare varsa kalır, oynatma yolu düğmeyle açılır
      if (S.visible && !document.hidden && S.state !== 'error') { setState('blocked'); armGesture(); }
    });
    on(video, 'error', function () { var me = video.error; S.error = me ? 'MediaError ' + me.code : 'hata'; log('error:' + S.error); ready(false); if (S.frames === 0 && next()) attempt('error-next'); else setState('error'); });

    function pauseOurs() { if (!video.paused) { S.ourPause = true; try { video.pause(); } catch (e) {} } }
    function armGesture() {
      if (S.gestureArmed) return; S.gestureArmed = true;
      // BİR sonraki gerçek dokunuş/tıklama (kaydırma hareketi pointerup üretmez → izin vermez, deneme de yapılmaz)
      var once = function (e) {
        if (e && e.target && e.target.closest && e.target.closest('.n1v-play')) return;   // düğmenin kendi işleyicisi var
        S.gestureArmed = false; window.removeEventListener('pointerup', once, true);
        if (S.visible && (S.state === 'blocked' || S.state === 'stalled')) attempt('gesture');
      };
      window.addEventListener('pointerup', once, true);
      offs.push(function () { window.removeEventListener('pointerup', once, true); });
    }
    on(tg, 'click', function () {
      if (!video.paused) { S.userPaused = true; S.ourPause = true; try { video.pause(); } catch (e) {} setState('paused'); tgSync(); return; }
      S.userPaused = false; S.visible = true;
      if (S.state === 'poster') setState('loading');
      attempt('button'); tgSync();
    });
    on(btn, 'click', function () {
      S.userPaused = false;
      if (S.state === 'stalled' && S.idx >= 0) { try { video.load(); } catch (e) {} }
      S.visible = true;
      if (S.state === 'poster') setState('loading');
      attempt('button');                                   // play() kullanıcı hareketinin içinde, eşzamanlı çağrılır (iOS)
    });

    if (reduce || saveData || !sources.length) {
      setState('poster'); root.classList.add('is-poster');
    } else setState('idle');

    // V1.4 · hero filmi öncelikli: kaynak hemen atanır (ilk ekran; yaklaşma beklenmez)
    if (isHero && S.state !== 'poster') { S.near = true; assign(); }
    // 4 · görünürlük: kaynak 1 ekran önce atanır; oynatma %15 görünürlükte; tamamen çıkınca duraklar
    if ('IntersectionObserver' in window) {
      var near = new IntersectionObserver(function (es) {
        if (S.near) { near.disconnect(); return; }
        if (!es.some(function (e) { return e.isIntersecting; })) return;
        S.near = true; near.disconnect();
        if (S.state !== 'poster') assign();
      }, { rootMargin: '100% 0px 100% 0px' });
      near.observe(root);
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          var vis = e.isIntersecting && e.intersectionRatio >= 0.15;
          if (!e.isIntersecting) { S.visible = false; pauseOurs(); return; }
          if (vis && !S.visible) { S.visible = true; if (S.state === 'paused' || S.state === 'loading' || S.state === 'idle') attempt('visible'); }
        });
      }, { threshold: [0, 0.15, 0.5] });
      io.observe(root);
      players.push(function () { near.disconnect(); io.disconnect(); });
    } else { S.visible = true; S.near = true; if (S.state !== 'poster') { assign(); attempt('no-io'); } }

    var onVis = function () { if (document.hidden) pauseOurs(); else if (S.visible) attempt('visibility'); };
    on(document, 'visibilitychange', onVis);
    on(window, 'pagehide', function () { pauseOurs(); });
    on(window, 'pageshow', function (e) {
      if (!e.persisted) return;                            // BFCache'ten dönüş: bekleyen söz ve durum sıfırlanır
      S.pending = false; S.lastAdvance = 0; S.frames = 0; ready(false);
      if (S.state !== 'poster' && S.state !== 'error') { setState('loading'); if (S.visible) attempt('pageshow'); }
    });

    root.__n1v4 = root.__n1vm = root.__n1sv = {
      video: video,
      state: function () { return { state: S.state, src: video.currentSrc, idx: S.idx, t: +video.currentTime.toFixed(3), paused: video.paused, ready: video.readyState,
        frames: S.frames, visible: S.visible, attempts: S.attempts, result: S.result, error: S.error, userPaused: S.userPaused, isReady: root.classList.contains('is-ready'), events: S.events.slice(-14) }; },
      setVisible: function (v) { S.visible = !!v; if (!v) pauseOurs(); else if (!S.userPaused && (S.state === 'paused' || S.state === 'loading' || S.state === 'idle')) attempt('visible'); }
    };
    players.push(function () {
      S.dead = true; clearInterval(watchT); timers.forEach(clearTimeout);
      try { video.pause(); video.removeAttribute('src'); video.load(); } catch (e) {}
      if (btn.isConnected) btn.remove(); if (tg.classList.contains('n1v-tg') && tg.isConnected) tg.remove(); root.classList.remove('is-ready', 'is-poster'); root.removeAttribute('data-n1v-state'); delete root.__n1v4;
    });
  });

  window.__n1v4 = {
    destroy: function () {
      offs.forEach(function (f) { try { f(); } catch (e) {} }); offs = [];
      players.forEach(function (f) { try { f(); } catch (e) {} }); players = [];
    }
  };
})();
