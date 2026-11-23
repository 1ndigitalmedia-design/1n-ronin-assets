/* ==========================================================================
   1N — Interactive Cinematic Showreel (v6.28 — "Kesik" kapak + imleç düzeltmesi)
   Mevcut GSAP 3.13.0 (timeline, quickTo, ticker). Ek eklenti, Lenis, pin yok.

   KAYNAK (merkezi): section[data-sources] — '|' ile sıralı liste. Önizlemede
   önce kendi dosyası (Artifact CSP dış videoyu engeller), Wix'te yalnızca Wix adresi.
   Video değişince yalnızca data-sources ve isteğe bağlı data-thumbs güncellenir.

   DURUMLAR: preview → opening → watch → closing → preview
   - Önizleme: sessiz döngü (data-preview="başlangıç,bitiş" saniye aralığı).
   - İzleme: ilk açılışta 0'dan; kapatılınca gerçek currentTime saklanır
     (watchTime). Önizleme döngüsü bu değeri ASLA değiştirmez. Yeniden açılınca
     aynı video öğesi, kaynak yeniden yüklenmeden watchTime'a sarılır.
   - Video sona erdiyse yeniden açılışta baştan başlar.
   ========================================================================== */
(function () {
  'use strict';
  var root = document.querySelector('[data-n1-showreel]');
  if (!root || !window.gsap) return;

  var stage = root.querySelector('.n1sr-stage');
  var video = root.querySelector('.n1sr-video');
  var openBtn = root.querySelector('.n1sr-open');
  var hit = root.querySelector('.n1sr-hit');
  var ui = root.querySelector('.n1sr-ui');
  var bar = root.querySelector('.n1sr-bar');
  var closeBtn = root.querySelector('.n1sr-close');
  var ppBtn = root.querySelector('.n1sr-pp');
  var sndBtn = root.querySelector('.n1sr-snd');
  var track = root.querySelector('.n1sr-track');
  var fill = root.querySelector('.n1sr-fill');
  var buf = root.querySelector('.n1sr-buf');
  var head = root.querySelector('.n1sr-head');
  var timeEl = root.querySelector('.n1sr-time');
  var peek = root.querySelector('.n1sr-peek');
  var thumb = root.querySelector('.n1sr-thumb');
  var peekTime = root.querySelector('.n1sr-peek-time');
  var title = root.querySelector('.n1sr-title');
  var cover = root.querySelector('.n1sr-cover');
  var word = root.querySelector('.n1sr-word'), echo = root.querySelector('.n1sr-echo');
  var halfT = root.querySelector('.n1sr-half--t'), halfB = root.querySelector('.n1sr-half--b');
  var hpT = halfT.querySelector('.n1sr-hp'), hpB = halfB.querySelector('.n1sr-hp');
  var shard = root.querySelector('.n1sr-shard'), blade = root.querySelector('.n1sr-blade');
  var spot = root.querySelector('.n1sr-spot');
  var live = root.querySelector('.n1sr-live');

  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  var sources = (root.getAttribute('data-sources') || '').split('|').map(function (s) { return s.trim(); }).filter(Boolean);
  var pv = (root.getAttribute('data-preview') || '0,0').split(',').map(parseFloat);
  var thumbs = root.getAttribute('data-thumbs');
  var tm = (root.getAttribute('data-thumbs-meta') || '2,10,192,108').split(',').map(parseFloat); // adım, sütun, w, h

  var state = 'preview', srcIdx = -1, loaded = false, visible = false;
  var watchTime = 0, ended = false, userMuted = false, volume = 0.6;
  var seeking = false, seekVal = 0, wasPlaying = false, tl = null;
  var log = [];  // test/tanılama: son olaylar

  root.setAttribute('data-state', 'preview');
  video.muted = true; video.defaultMuted = true; video.playsInline = true; video.controls = false;
  video.removeAttribute('controls');

  // ---------- kaynak yükleme (yaklaşınca) ----------
  function nextSource() {
    srcIdx++;
    if (srcIdx >= sources.length) { root.classList.add('is-error'); return; }
    video.src = sources[srcIdx];
    video.load();
  }
  video.addEventListener('error', function () { log.push('error@' + srcIdx); nextSource(); });
  // v6.27: kapak açıkken video oynatılmaz. Bölüme yaklaşınca yalnızca meta veri (süre),
  // kapağa fare girince / odaklanınca / tıklanınca tam önyükleme — açılışta siyah ekran beklemesi olmasın.
  function load() { if (loaded) return; loaded = true; video.preload = 'metadata'; nextSource(); }
  function warm() { load(); if (video.preload !== 'auto') { video.preload = 'auto'; try { if (video.readyState < 3) video.load(); } catch (e) {} } }
  video.addEventListener('loadedmetadata', function () {
    renderTime(state === 'preview' ? watchTime : video.currentTime);
    track.setAttribute('aria-valuemax', Math.round(video.duration));
  });
  video.addEventListener('loadeddata', function () { root.classList.add('is-ready'); });
  video.addEventListener('playing', function () { root.classList.add('is-ready'); });

  // önizleme döngüsü yalnızca önizleme durumunda
  video.addEventListener('timeupdate', function () {
    return; // v6.27: önizleme döngüsü yok
    if (state !== 'preview' || !(pv[1] > pv[0])) return;
    if (video.currentTime >= pv[1] || video.currentTime < pv[0] - 0.5) video.currentTime = pv[0];
  });
  video.addEventListener('ended', function () {
    if (state === 'preview') return;
    ended = true; setPP(); log.push('ended');
  });
  video.addEventListener('play', setPP);
  video.addEventListener('pause', setPP);

  function previewPlay() {
    return; // v6.27: kapak modunda video oynatılmaz
    if (state !== 'preview' || !visible || document.hidden || reduce) return;
    video.muted = true;
    var p = video.play(); if (p && p.catch) p.catch(function () {});
  }
  function previewPause() { if (state === 'preview' && !video.paused) video.pause(); }

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { if (es.some(function (e) { return e.isIntersecting; })) load(); },
      { rootMargin: '100% 0px 100% 0px' }).observe(root);
    new IntersectionObserver(function (es) {
      visible = es[0].isIntersecting;
      if (state !== 'preview') return;           // izleme sırasında görünürlük kontrolü devre dışı
      if (visible) { load(); previewPlay(); glitchSchedule(); } else { previewPause(); glitchStop(); }
    }, { threshold: 0.15 }).observe(root);
  } else { load(); visible = true; }
  document.addEventListener('visibilitychange', function () {
    if (state === 'preview') { if (document.hidden) previewPause(); else previewPlay(); }
  });

  // ---------- zaman biçimi ----------
  function fmt(s) { s = Math.max(0, Math.floor(s || 0)); var m = Math.floor(s / 60); s = s % 60; return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s; }
  function dur() { return isFinite(video.duration) ? video.duration : 0; }

  // ---------- glitch ----------
  var gTimer = null, gTl = null;
  // v6.28 "kesme" anı: yarılar kesik boyunca zıt yönlere kayar, ince bir dilim sinyal gibi
  // sıçrar, bıçak ağzı parlar; ~0,7 sn sonunda her şey keskin biçimde hizaya oturur.
  function glitch(strength) {
    if (reduce) return;
    strength = strength || 1;
    if (gTl) gTl.kill();
    var dir = Math.random() < .5 ? -1 : 1, d = (22 + Math.random() * 18) * strength * dir;
    var s1 = 20 + Math.random() * 50;
    gTl = gsap.timeline({ onComplete: function () {
      gsap.set([halfT, halfB], { x: 0, skewX: 0 }); gsap.set(shard, { opacity: 0, x: 0 }); gsap.set(blade, { opacity: .55, scaleX: 1 });
    } });
    gTl.to(blade, { opacity: 1, scaleX: 1.02, duration: .08, ease: 'none' }, 0)
       .to(halfT, { x: d, skewX: -1.2 * dir, duration: .14, ease: 'power4.out' }, .02)
       .to(halfB, { x: -d * .55, skewX: .8 * dir, duration: .14, ease: 'power4.out' }, .02)
       .set(shard, { opacity: .9, x: -d * 1.3, clipPath: 'inset(' + s1 + '% 0 ' + (100 - s1 - 4) + '% 0)' }, .05)
       .set(shard, { x: d * .8, clipPath: 'inset(' + (s1 + 9) + '% 0 ' + (100 - s1 - 12) + '% 0)' }, .11)
       .set(shard, { opacity: 0 }, .17)
       .to([halfT, halfB], { x: 0, skewX: 0, duration: .5, ease: 'expo.inOut' }, .22)
       .to(blade, { opacity: .55, scaleX: 1, duration: .45, ease: 'power2.out' }, .3);
  }
  function glitchSchedule() {
    glitchStop(); if (reduce) return;
    gTimer = setTimeout(function () { if (state === 'preview' && visible) glitch(1); glitchSchedule(); }, 4200 + Math.random() * 3800);
  }
  function glitchStop() { clearTimeout(gTimer); gTimer = null; }

  // ---------- SHOWREEL İZLE imleci (v6.28 düzeltme) ----------
  // HATA NEDENİ (v6.26–6.27): daire yalnızca açma düğmesinin 'pointerenter' olayıyla
  // açılıyordu. Kapanış animasyonu sürerken düğme yeniden görünür olunca tarayıcı girişi
  // tam o anda bir kez bildiriyor, kod ise "durum henüz önizleme değil" diye yok sayıyordu;
  // fare zaten içeride olduğu için olay bir daha gelmiyor, daire alandan çıkıp girilene
  // kadar görünmüyordu (açılış/kapanış sırasında girildiğinde de aynısı).
  // ÇÖZÜM: tek seferlik giriş/çıkış olayları yerine farenin son konumu her harekette,
  // kaydırmada ve durum değişiminde 'elementFromPoint' ile test edilir: o noktada en üstte
  // tıklanabilir kapak (.n1sr-open) varsa daire görünür, yoksa gizlenir. Dekoratif
  // katmanlar ve imleçler pointer-events:none olduğu için teste karışmaz; header'ın
  // tıklanabilir öğeleri kapağın üstündeyse daire orada (doğru olarak) gizlenir.
  var cursor = null, cx, cy, inside = false, lastX = -1, lastY = -1, hitRaf = 0;
  var spx, spy, pT, pB, pE;
  if (fine) {
    root.classList.add('has-cursor');
    cursor = document.createElement('div');
    cursor.className = 'n1sr-cursor';
    cursor.setAttribute('aria-hidden', 'true');
    cursor.innerHTML = '<span class="n1sr-cursor-ring"></span><span lang="tr">SHOWREEL<br>İZLE</span>';
    document.body.appendChild(cursor);
    cx = gsap.quickTo(cursor, 'x', { duration: 0.5, ease: 'power3.out' });
    cy = gsap.quickTo(cursor, 'y', { duration: 0.5, ease: 'power3.out' });
    spx = gsap.quickTo(spot, 'x', { duration: 0.9, ease: 'power3.out' });
    spy = gsap.quickTo(spot, 'y', { duration: 0.9, ease: 'power3.out' });
    pT = gsap.quickTo(hpT, 'x', { duration: 0.9, ease: 'power3.out' });
    pB = gsap.quickTo(hpB, 'x', { duration: 0.9, ease: 'power3.out' });
    pE = gsap.quickTo(echo, 'x', { duration: 1.2, ease: 'power3.out' });
    window.addEventListener('pointermove', function (e) {
      if (e.pointerType && e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
      lastX = e.clientX; lastY = e.clientY;
      if (inside) follow();
      scheduleHit();
    }, { passive: true });
    window.addEventListener('scroll', scheduleHit, { passive: true });
    window.addEventListener('resize', scheduleHit);
    document.documentElement.addEventListener('pointerleave', function () { lastX = lastY = -1; setInside(false); });
    window.addEventListener('blur', function () { setInside(false); });
    openBtn.addEventListener('pointerdown', function () { if (inside) gsap.to(cursor, { scale: 0.9, duration: 0.25, overwrite: 'auto' }); });
  }
  function scheduleHit() { if (!hitRaf) hitRaf = requestAnimationFrame(hitTest); }
  function hitTest() {
    hitRaf = 0;
    if (!cursor) return;
    if (lastX < 0 || state !== 'preview') { setInside(false); return; }
    var el = document.elementFromPoint(lastX, lastY);
    setInside(!!(el && (el === openBtn || openBtn.contains(el))));
  }
  function follow() {
    cx(lastX); cy(lastY);
    var r = stage.getBoundingClientRect(), nx = (lastX - r.left) / r.width - 0.5;
    spx(lastX - r.left); spy(lastY - r.top);
    if (!reduce) { pT(nx * 18); pB(-nx * 18); pE(-nx * 10); }
  }
  function setInside(on) {
    if (on === inside || !cursor) return;
    inside = on;
    root.classList.toggle('is-cursor-in', on);
    if (on) {
      if (typeof introCheck === 'function') introCheck();
      gsap.set(cursor, { x: lastX, y: lastY });
      var r = stage.getBoundingClientRect(); gsap.set(spot, { x: lastX - r.left, y: lastY - r.top });
      gsap.to(cursor, { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
      gsap.to(spot, { opacity: 1, duration: 0.6, ease: 'power2.out', overwrite: 'auto' });
      warm(); glitch(0.8);
    } else {
      hideCursor();
      gsap.to(spot, { opacity: 0, duration: 0.5, ease: 'power2.out', overwrite: 'auto' });
      if (pT) { pT(0); pB(0); pE(0); }
    }
  }
  function hideCursor() { if (cursor) gsap.to(cursor, { opacity: 0, scale: 0.4, duration: 0.35, ease: 'power2.in', overwrite: 'auto' }); }

  // ---------- kaydırma kilidi (kaydırma çubuğu kalır, sayfa konumu değişmez) ----------
  function block(e) { if (state !== 'preview') e.preventDefault(); }
  function lock(on) {
    var m = on ? 'addEventListener' : 'removeEventListener';
    window[m]('wheel', block, { passive: false });
    window[m]('touchmove', block, { passive: false });
  }

  // ---------- AÇ ----------
  function open() {
    if (state === 'watch' || state === 'opening') return;
    introFinish();
    load();
    var fromClosing = state === 'closing';
    if (tl) tl.kill();
    glitchStop(); if (!fromClosing) glitch(1.2);
    setInside(false);
    state = 'opening'; root.setAttribute('data-state', 'opening'); log.push('open@' + watchTime.toFixed(2));
    lock(true);

    // izleme zamanını uygula (meta veri hazır değilse hazır olunca)
    var target = ended ? 0 : watchTime; ended = false;
    applyTime(target);
    video.muted = userMuted; video.volume = volume; setSnd();
    var p = video.play();
    if (p && p.catch) p.catch(function () { video.muted = true; userMuted = true; setSnd(); var q = video.play(); if (q && q.catch) q.catch(function () {}); });

    var r = stage.getBoundingClientRect();
    if (!fromClosing) gsap.set(stage, { position: 'fixed', top: r.top, left: r.left, width: r.width, height: r.height, zIndex: 1200 });
    tl = gsap.timeline({ defaults: { ease: 'power3.inOut' }, onComplete: function () {
      state = 'watch'; root.setAttribute('data-state', 'watch'); ppBtn.focus({ preventScroll: true }); announce('Showreel izleme modu');
    } });
    tl.to(title, { autoAlpha: 0, scale: 0.96, duration: reduce ? 0.01 : 0.4, ease: 'power2.in' }, 0)
      .to(cover, { autoAlpha: 0, duration: reduce ? 0.01 : 0.6, ease: 'power2.inOut' }, reduce ? 0 : 0.18)
      .to(stage, { top: 0, left: 0, width: innerWidth, height: innerHeight, duration: reduce ? 0.01 : 0.9 }, reduce ? 0 : 0.08)
      .fromTo(ui, { autoAlpha: 0 }, { autoAlpha: 1, duration: reduce ? 0.01 : 0.5, ease: 'power2.out', immediateRender: false }, reduce ? 0 : 0.7)
      .fromTo(bar, { y: 24 }, { y: 0, duration: reduce ? 0.01 : 0.6, ease: 'power3.out', immediateRender: false }, reduce ? 0 : 0.7)
      .fromTo(track.querySelector('.n1sr-rail'), { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: reduce ? 0.01 : 0.8, ease: 'power3.out', immediateRender: false, clearProps: 'clipPath' }, reduce ? 0 : 0.75);
    gsap.ticker.add(tick);
  }
  function applyTime(t) {
    if (video.readyState >= 1) { try { video.currentTime = t; } catch (e) {} }
    else video.addEventListener('loadedmetadata', function once() { try { video.currentTime = t; } catch (e) {} }, { once: true });
  }

  // ---------- KAPAT ----------
  function close() {
    if (state === 'preview' || state === 'closing') return;
    if (tl) tl.kill();
    // gerçek konumu kaydet (seek sürüyorsa sürüklenen değer)
    watchTime = seeking ? seekVal : video.currentTime;
    if (ended || (dur() && watchTime >= dur() - 0.25)) { ended = true; }
    seeking = false; root.classList.remove('is-seeking');
    video.pause();
    state = 'closing'; root.setAttribute('data-state', 'closing'); log.push('close@' + watchTime.toFixed(2));
    var r = root.getBoundingClientRect();
    tl = gsap.timeline({ defaults: { ease: 'power3.inOut' }, onComplete: function () {
      gsap.set(stage, { clearProps: 'position,top,left,width,height,zIndex' });
      state = 'preview'; root.setAttribute('data-state', 'preview'); lock(false);
      gsap.ticker.remove(tick);
      video.muted = true;
      glitch(1); glitchSchedule(); scheduleHit();
      openBtn.focus({ preventScroll: true }); announce('Showreel kapatıldı, ' + fmt(watchTime) + ' konumu kaydedildi');
    } });
    tl.to(ui, { autoAlpha: 0, duration: reduce ? 0.01 : 0.3, ease: 'power2.out' }, 0)
      .to(stage, { top: r.top, left: r.left, width: r.width, height: r.height, duration: reduce ? 0.01 : 0.8 }, reduce ? 0 : 0.12)
      .to(cover, { autoAlpha: 1, duration: reduce ? 0.01 : 0.55, ease: 'power2.out' }, reduce ? 0 : 0.5)
      .to(title, { autoAlpha: 1, scale: 1, duration: reduce ? 0.01 : 0.5, ease: 'power3.out' }, reduce ? 0 : 0.8);
  }

  // ---------- oynatıcı ----------
  var ICON_PLAY = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4.5 2.8v10.4L13 8z" fill="currentColor"/></svg>';
  var ICON_PAUSE = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.5h2.6v11H4zM9.4 2.5H12v11H9.4z" fill="currentColor"/></svg>';
  var ICON_REPLAY = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.2 6.2A5 5 0 1 1 3 9.6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M2.6 2.8v3.8h3.8" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var ICON_SND = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2.5 6h2.6L8.5 3v10L5.1 10H2.5z" fill="currentColor"/><path d="M10.6 5.6a3.4 3.4 0 0 1 0 4.8M12.4 3.8a6 6 0 0 1 0 8.4" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>';
  var ICON_MUTE = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2.5 6h2.6L8.5 3v10L5.1 10H2.5z" fill="currentColor"/><path d="M10.5 6l4 4M14.5 6l-4 4" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>';
  function setPP() {
    if (!ppBtn) return;
    var isEnd = ended && video.paused;
    ppBtn.innerHTML = isEnd ? ICON_REPLAY : (video.paused ? ICON_PLAY : ICON_PAUSE);
    ppBtn.setAttribute('aria-label', isEnd ? 'Yeniden oynat' : (video.paused ? 'Oynat' : 'Duraklat'));
  }
  function setSnd() {
    sndBtn.innerHTML = video.muted ? ICON_MUTE : ICON_SND;
    sndBtn.setAttribute('aria-label', video.muted ? 'Sesi aç' : 'Sesi kapat');
  }
  function togglePlay() {
    if (state !== 'watch' && state !== 'opening') return;
    if (ended && video.paused) { ended = false; video.currentTime = 0; }
    if (video.paused) { var p = video.play(); if (p && p.catch) p.catch(function () {}); } else video.pause();
  }
  function toggleMute() { userMuted = !video.muted; video.muted = userMuted; if (!userMuted && video.volume === 0) video.volume = volume; setSnd(); }
  function seekBy(d) { var t = Math.max(0, Math.min(dur(), video.currentTime + d)); video.currentTime = t; ended = false; renderTime(t); }

  // ilerleme: gerçek currentTime (sürüklerken sürüklenen değer)
  function renderTime(t) {
    var D = dur(); var p = D ? Math.max(0, Math.min(1, t / D)) : 0;
    var w = track.clientWidth;
    fill.style.transform = 'scaleX(' + p + ')';
    head.style.transform = 'translateX(' + (p * w) + 'px)';
    timeEl.innerHTML = fmt(t) + ' <span>/ ' + fmt(Math.ceil(D - 0.05)) + '</span>';
    // gösterge kenarlarda taşmasın
    var half = timeEl.offsetWidth / 2, x = p * w, tx = -50;
    if (x < half) tx = -(x / timeEl.offsetWidth) * 100;
    else if (w - x < half) tx = -100 + ((w - x) / timeEl.offsetWidth) * 100;
    timeEl.style.setProperty('--tx', tx + '%');
    track.setAttribute('aria-valuenow', Math.floor(t));
    track.setAttribute('aria-valuetext', fmt(t) + ' / ' + fmt(Math.ceil(D - 0.05)));
    if (video.buffered && video.buffered.length && D) buf.style.transform = 'scaleX(' + (video.buffered.end(video.buffered.length - 1) / D) + ')';
  }
  function tick() { if (state === 'preview') return; renderTime(seeking ? seekVal : video.currentTime); }

  function posToTime(clientX) { var r = track.getBoundingClientRect(); return Math.max(0, Math.min(1, (clientX - r.left) / r.width)) * dur(); }
  function showPeek(clientX) {
    var r = track.getBoundingClientRect(), x = Math.max(0, Math.min(r.width, clientX - r.left)), t = posToTime(clientX);
    var half = 82; x = Math.max(half, Math.min(r.width - half, x));
    peek.style.left = x + 'px';
    peekTime.textContent = fmt(t);
    if (thumbs) {
      var i = Math.min(Math.floor(t / tm[0]), Math.floor(dur() / tm[0]));
      var col = i % tm[1], row = Math.floor(i / tm[1]), s = 160 / tm[2];
      thumb.style.backgroundImage = 'url("' + thumbs + '")';
      thumb.style.backgroundSize = (tm[1] * tm[2] * s) + 'px auto';
      thumb.style.backgroundPosition = (-col * tm[2] * s) + 'px ' + (-row * tm[3] * s) + 'px';
    }
    root.classList.add('has-peek-time');
  }
  track.addEventListener('pointermove', function (e) { showPeek(e.clientX); if (seeking) { seekVal = posToTime(e.clientX); video.currentTime = seekVal; } });
  track.addEventListener('pointerleave', function () { if (!seeking) root.classList.remove('has-peek-time'); });
  track.addEventListener('pointerdown', function (e) {
    e.stopPropagation();
    seeking = true; root.classList.add('is-seeking'); wasPlaying = !video.paused; video.pause();
    seekVal = posToTime(e.clientX); video.currentTime = seekVal; ended = false;
    track.setPointerCapture(e.pointerId); showPeek(e.clientX);
  });
  function endSeek(e) {
    if (!seeking) return;
    seeking = false; root.classList.remove('is-seeking'); root.classList.remove('has-peek-time');
    video.currentTime = seekVal; log.push('seek@' + seekVal.toFixed(2));
    try { track.releasePointerCapture(e.pointerId); } catch (_) {}
    if (wasPlaying) { var p = video.play(); if (p && p.catch) p.catch(function () {}); }
  }
  track.addEventListener('pointerup', endSeek);
  track.addEventListener('pointercancel', endSeek);
  track.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { e.preventDefault(); seekBy(5); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); seekBy(-5); }
    if (e.key === 'Home') { e.preventDefault(); seekBy(-1e6); }
    if (e.key === 'End') { e.preventDefault(); seekBy(1e6); }
  });

  // oynatıcı içindeki tıklamalar izleme modunu kapatmaz
  bar.addEventListener('click', function (e) { e.stopPropagation(); });
  ui.querySelector('.n1sr-ui-top').addEventListener('click', function (e) { e.stopPropagation(); });
  ppBtn.addEventListener('click', togglePlay);
  sndBtn.addEventListener('click', toggleMute);
  closeBtn.addEventListener('click', close);
  openBtn.addEventListener('click', open);
  openBtn.addEventListener('pointerenter', warm);
  openBtn.addEventListener('focus', warm);
  hit.addEventListener('click', function () { if (state === 'watch' || state === 'opening') close(); });

  document.addEventListener('keydown', function (e) {
    if (state === 'preview') return;
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    var tag = (e.target && e.target.tagName) || '';
    if (e.target === track) return;
    if (e.key === ' ' || e.key === 'k' || e.key === 'K') { if (tag === 'BUTTON' && e.key === ' ') return; e.preventDefault(); togglePlay(); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); seekBy(5); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); seekBy(-5); }
    else if (e.key === 'm' || e.key === 'M') { e.preventDefault(); toggleMute(); }
    else if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'].indexOf(e.key) > -1) e.preventDefault();
  });
  window.addEventListener('resize', function () {
    if (state === 'watch') gsap.set(stage, { width: innerWidth, height: innerHeight });
    renderTime(seeking ? seekVal : video.currentTime);
  });

  function announce(msg) { if (live) live.textContent = msg; }

  // kesik açısı: bıçak çizgisi yarıları ayıran poligonla aynı eğimde olsun
  function setAngle() {
    // güvenlik: font yüklenemez ve yedek font geniş kalırsa kelime sahnenin %86'sını aşmasın
    title.style.fontSize = '';
    var sw = stage.clientWidth, ww = word.offsetWidth;
    if (sw && ww > sw * 0.86) title.style.fontSize = (parseFloat(getComputedStyle(title).fontSize) * (sw * 0.86 / ww)).toFixed(1) + 'px';
    var w = word.offsetWidth, h = halfT.offsetHeight; if (!w) return;
    var ang = -Math.atan2(0.12 * h, w) * 180 / Math.PI;   // --cut-a 56% → --cut-b 44%
    gsap.set(blade, { rotation: ang });   // GSAP dönüşümü yönetir (scaleX animasyonlarıyla çakışmaz)
  }
  setAngle(); window.addEventListener('resize', setAngle);
  if (document.fonts) {
    if (document.fonts.ready) document.fonts.ready.then(setAngle);
    if (document.fonts.addEventListener) document.fonts.addEventListener('loadingdone', setAngle);
  }

  // giriş: bıçak soldan sağa çizilir, iki yarı zıt yönlerden "kınından çıkar", yankı belirir
  // v6.28b: giriş yalnızca IntersectionObserver'a bağlı kalmaz. Sayfa doğrudan #showreel'e
  // atladığında gözlemci bazen hiç "göründü" bildirmiyordu ve başlık gizli kalıyordu.
  // Artık giriş tek seferlik bir fonksiyon: gözlemci, kaydırma/boyut kontrolü, imleç girişi,
  // açılış ve 2.5 sn'lik güvenlik zamanlayıcısı onu tetikler; hangisi önce gelirse.
  var introDone = reduce, introTl = null;
  function inView() { var r = root.getBoundingClientRect(), vh = window.innerHeight || 0; return r.bottom > vh * 0.15 && r.top < vh * 0.85; }
  function playIntro(instant) {
    if (introDone) return; introDone = true;
    window.removeEventListener('scroll', introCheck); window.removeEventListener('resize', introCheck);
    if (io) io.disconnect();
    if (instant) { gsap.set([halfT, halfB], { x: 0, autoAlpha: 1 }); gsap.set(echo, { autoAlpha: 1 }); gsap.set(blade, { scaleX: 1, opacity: .55, transformOrigin: '50% 50%' }); return; }
    introTl = gsap.timeline({ onComplete: function () { gsap.set(blade, { transformOrigin: '50% 50%' }); } })
      .to(blade, { scaleX: 1, duration: .9, ease: 'power3.inOut' }, 0)
      .to(halfT, { x: 0, autoAlpha: 1, duration: 1.1, ease: 'expo.out' }, .45)
      .to(halfB, { x: 0, autoAlpha: 1, duration: 1.1, ease: 'expo.out' }, .55)
      .to(blade, { opacity: .55, duration: .6, ease: 'power2.out' }, 1.0)
      .to(echo, { autoAlpha: 1, duration: 1.2, ease: 'power2.out' }, .9);
  }
  function introCheck() { if (!introDone && inView()) playIntro(); }
  function introFinish() { if (!introDone) playIntro(true); else if (introTl && introTl.isActive()) introTl.progress(1); }
  var io = null;
  if (!reduce) {
    gsap.set(blade, { scaleX: 0, transformOrigin: '0% 50%', opacity: .9 });
    gsap.set(halfT, { x: -70, autoAlpha: 0 }); gsap.set(halfB, { x: 70, autoAlpha: 0 }); gsap.set(echo, { autoAlpha: 0 });
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(function (es) { if (es[0].isIntersecting) playIntro(); }, { threshold: [0, 0.35] });
      io.observe(root);
    }
    window.addEventListener('scroll', introCheck, { passive: true }); window.addEventListener('resize', introCheck);
    requestAnimationFrame(introCheck); setTimeout(introCheck, 400);
    setTimeout(introCheck, 2500);
  }

  setPP(); setSnd(); renderTime(0);
  root.__n1sr = {
    open: open, close: close, glitch: function (s) { glitch(s); return gTl; }, cursorOn: function () { return inside; },
    state: function () { return { state: state, t: +video.currentTime.toFixed(2), watchTime: +watchTime.toFixed(2), paused: video.paused, muted: video.muted, dur: dur(), ready: video.readyState, src: video.currentSrc, ended: ended, log: log.slice(-12) }; }
  };
})();
