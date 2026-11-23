/* ==========================================================================
   1N — Black & White Cinematic Samurai Video oynatma (v6.21)
   v6.19 hatası: Claude önizleme sayfası CSP altında çalışır; dış adresten video
   (video.wixstatic.com) yüklenemez, tarayıcı isteği sessizce engeller. Kod ve URL
   sağlamdı. Çözüm: kaynak listesi — önce sayfanın kendi dosyası, sonra Wix adresi.
   Wix'te (CSP yok) yalnızca Wix adresi verilir; önizlemede yerel kopya kullanılır.

   Oynatma önce gelir: video <video autoplay muted loop playsinline> ile kendiliğinden
   oynar; ayrıca play() çağrılır ve sonucu kaydedilir. Görünürlük gözlemcisi yalnızca
   ekran dışındayken duraklatır, oynatmayı asla engellemez.
   ========================================================================== */
(function () {
  'use strict';
  var roots = document.querySelectorAll('[data-n1-samurai-video]');
  if (!roots.length) return;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  roots.forEach(function (root) {
    var video = root.querySelector('video');
    if (!video) return;
    var sources = (video.getAttribute('data-sources') || '').split('|').map(function (s) { return s.trim(); }).filter(Boolean);
    var idx = -1, visible = true, playResult = '—', cspBlocked = [], lastError = '';

    // sessiz + satır içi + kontrolsüz (özellik ve öznitelik olarak)
    video.muted = true; video.defaultMuted = true; video.setAttribute('muted', '');
    video.playsInline = true; video.setAttribute('playsinline', ''); video.setAttribute('webkit-playsinline', '');
    video.loop = true; video.controls = false; video.removeAttribute('controls');
    video.addEventListener('volumechange', function () { if (!video.muted) video.muted = true; });

    document.addEventListener('securitypolicyviolation', function (e) {
      if (sources.some(function (s) { return e.blockedURI && s.indexOf(e.blockedURI.split('?')[0].slice(0, 40)) === 0; }) || e.effectiveDirective === 'media-src') {
        cspBlocked.push(e.effectiveDirective + ' → ' + (e.blockedURI || '').slice(0, 60));
        draw();
      }
    });

    function next() {
      idx++;
      if (idx >= sources.length) { root.classList.add('is-error'); draw(); return; }
      video.src = sources[idx];
      video.load();
      tryPlay();
      draw();
    }
    video.addEventListener('error', function () {
      var me = video.error;
      lastError = (me ? 'MediaError ' + me.code + (me.message ? ' (' + me.message + ')' : '') : 'hata') + ' @ ' + short(sources[idx]);
      next();
    });

    function tryPlay() {
      if (reduce || !visible || document.hidden) return;
      var p = video.play();
      if (p && p.then) {
        p.then(function () { playResult = 'başarılı'; draw(); })
         .catch(function (err) { playResult = (err && err.name) + ': ' + (err && err.message || ''); draw(); });
      }
    }
    function ready() { root.classList.add('is-ready'); draw(); }
    video.addEventListener('playing', ready);
    video.addEventListener('loadeddata', function () { if (reduce) ready(); tryPlay(); });
    ['loadedmetadata', 'canplay', 'pause', 'play', 'waiting', 'stalled', 'progress'].forEach(function (ev) { video.addEventListener(ev, draw); });

    if (reduce) {
      video.removeAttribute('autoplay'); video.autoplay = false;
      // ilk kare siyah olduğu için son sahnenin sabit karesini göster
      var seekedOnce = false;
      video.addEventListener('canplay', function () {
        if (seekedOnce) return; seekedOnce = true;
        try { video.currentTime = Math.max(0, (video.duration || 6) - 0.4); } catch (e) {}
      });
    }

    // performans: yalnızca ekran dışındayken duraklat; görünür olunca devam
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          visible = e.isIntersecting;
          if (visible) tryPlay(); else if (!video.paused) video.pause();
          draw();
        });
      }, { threshold: 0 }).observe(root);
    }
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { if (!video.paused) video.pause(); } else tryPlay();
    });

    // --- Tanılama kutusu (yalnızca geliştirme: data-debug varsa) ---
    var panel = null;
    if (root.hasAttribute('data-debug') && location.hash === '#tani') {
      panel = document.createElement('pre');
      panel.className = 'n1sv-debug';
      root.appendChild(panel);
      setInterval(draw, 500);
    }
    function short(u) { return !u ? '—' : (u.length > 64 ? '…' + u.slice(-62) : u); }
    var NS = ['EMPTY', 'IDLE', 'LOADING', 'NO_SOURCE'], RS = ['NOTHING', 'METADATA', 'CURRENT_DATA', 'FUTURE_DATA', 'ENOUGH_DATA'];
    function draw() {
      if (!panel) return;
      panel.textContent =
        'kaynak      ' + short(video.currentSrc || video.getAttribute('src')) + '  (' + (idx + 1) + '/' + sources.length + ')\n' +
        'ağ durumu   ' + NS[video.networkState] + '\n' +
        'readyState  ' + video.readyState + ' ' + RS[video.readyState] + '\n' +
        'paused      ' + video.paused + '   muted ' + video.muted + '   t ' + video.currentTime.toFixed(2) + ' / ' + (video.duration || 0).toFixed(2) + '\n' +
        'görünür     ' + visible + '\n' +
        'play()      ' + playResult + '\n' +
        'hata        ' + (lastError || '—') + '\n' +
        'CSP         ' + (cspBlocked.length ? cspBlocked.join(' ; ') : '—');
    }

    root.__n1sv = { video: video, state: function () {
      return { src: video.currentSrc, idx: idx, ready: video.readyState, paused: video.paused, muted: video.muted, t: video.currentTime, play: playResult, error: lastError, csp: cspBlocked.slice() };
    } };

    // Kaynağı Hero'nun ilk açılışından sonra ata (window load + boşta); bölüm daha önce
    // ekrana yaklaşırsa hemen başla. Bu yalnızca başlangıç zamanını belirler, oynatmayı engellemez.
    var started = false;
    function start() { if (started) return; started = true; next(); }
    function startIdle() { (window.requestIdleCallback || function (f) { return setTimeout(f, 300); })(start, { timeout: 1500 }); }
    if (document.readyState === 'complete') startIdle(); else window.addEventListener('load', startIdle, { once: true });
    if ('IntersectionObserver' in window) {
      var nearIO = new IntersectionObserver(function (es) {
        if (es.some(function (e) { return e.isIntersecting; })) { start(); nearIO.disconnect(); }
      }, { rootMargin: '150% 0px 150% 0px' });
      nearIO.observe(root);
    }
  });
})();
