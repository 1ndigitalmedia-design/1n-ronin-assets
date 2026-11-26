/*!
 * n1-video-m5 — 1N Digital Media · mobil/tablet video denetleyicisi (v6.53 / V1.5)
 * Kapsam: Ronin hero filmi [data-m4-film], M2/M1 bantları [data-n1-samurai-video], Hizmetler mini filmi [data-m5-mini].
 * Yalnızca mobil/tablet profilinde yüklenir. Tek örnek: window.__n1v5.
 *
 * V1.4 → V1.5 (gerçek iPhone Safari bulgularına göre; V1.4 kodundaki kök nedenler):
 *  1  "Videoyu oynat" büyük düğmesi kaldırıldı. Ret (NotAllowedError — iOS Düşük Güç Modu vb.) ve akış durması artık
 *     yalnızca posteri bırakır; küçük oynat/duraklat düğmesi "oynat" simgesine döner. Oynatma tek bir GERÇEK dokunuşta
 *     (touchend/click; kaydırma sayılmaz) senkron play() ile yeniden denenir. Sonsuz deneme yok.
 *  2  V1.4'te sistemin (iOS) başlattığı duraklama "blocked" sayılıyor ve görünürlük geri gelince bir daha denenmiyordu →
 *     donmuş kare. Artık "sistem duraklaması": poster öne alınır, video görünür/sekme açıkken sınırlı sayıda yeniden denenir.
 *  3  V1.4'te ilerleme durunca video katmanı gizlenip DÜĞME gösteriliyor, simge ise video.paused'a bakıyordu → donmuş karede
 *     "duraklat" simgesi. Artık simge yalnızca kareler gerçekten ilerlerken "duraklat"tır.
 *  4  M2 döngüsü oynarken currentTime atlatılarak yapılıyordu (iOS'ta oynatma sırasında atlama donmaya yol açabilir).
 *     Artık TÜM filmler denetimli döngüyle döner (yerel loop kapalı): duraklat → atla → 'seeked' → oynat; bitişe 0,1 sn kala ya da
 *     'ended' olayında. M2'nin ilk siyah karesi (0 s) atlanır (data-loop-start). WebKit (GStreamer) testinde yerel loop'un dosya
 *     sonunda 'waiting'de takıldığı görüldü; aynı risk iOS için de denetimli döngüyle kapatıldı.
 *  4b Takılma kurtarma: oynuyor görünüp 3 sn kare gelmezse (veri hazırken) tek bir denetimli yeniden başlatma (10 sn'de en fazla 1).
 *  5  Aynı anda en fazla bir büyük film oynar (hero, M2, M1): yenisi başlarken diğerleri duraklatılır (çözücü/bellek).
 *  6  Hero 2× dosyası 9 sn içinde tek kare veremezse doğal dosyaya bir kez geçilir.
 */
(function () {
  'use strict';
  var host = document.querySelector('n1-site-v1[data-n1-profile]');
  if (!host || host.getAttribute('data-n1-profile') === 'd') return;
  if (window.__n1v5 && window.__n1v5.destroy) { try { window.__n1v5.destroy(); } catch (e) {} }
  function visibleNow(el){var r=el.getBoundingClientRect();var w=Math.max(0,Math.min(innerWidth,r.right)-Math.max(0,r.left)),h=Math.max(0,Math.min(innerHeight,r.bottom)-Math.max(0,r.top));return !!(el.isConnected&&r.width&&r.height&&w*h/(r.width*r.height)>=.15);}
  var roots = [].slice.call(host.querySelectorAll('[data-m4-film], [data-n1-samurai-video], [data-m5-mini]'));
  if (!roots.length) return;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var saveData = !!(navigator.connection && navigator.connection.saveData);
  var hasRVFC = 'requestVideoFrameCallback' in HTMLVideoElement.prototype;
  var offs = [], players = [];
  function on(t, ev, fn, o) { t.addEventListener(ev, fn, o); offs.push(function () { t.removeEventListener(ev, fn, o); }); }

  /* ortak kullanıcı hareketi: engellenen oynatıcılar tek dokunuşta (senkron) denenir */
  var gestureArmed = false;
  function onGesture(e) {
    if (e && e.target && e.target.closest && e.target.closest('.m4-film-tg')) return;   // düğmenin kendi işleyicisi var
    var waiting = players.filter(function (p) { return p.wantsGesture(); });
    if (!waiting.length) return disarm();
    waiting.forEach(function (p) { p.tryNow('gesture'); });
  }
  function arm() { if (gestureArmed) return; gestureArmed = true; document.addEventListener('touchend', onGesture, true); document.addEventListener('click', onGesture, true); }
  function disarm() { if (!gestureArmed) return; gestureArmed = false; document.removeEventListener('touchend', onGesture, true); document.removeEventListener('click', onGesture, true); }
  offs.push(disarm);

  /* tek büyük film kuralı */
  function claim(me) { players.forEach(function (p) { if (p !== me && p.big && p.isPlaying()) p.yield(); }); }


  /* v6.55: native HTML video for the two bands and the decorative mini.
     Avoid manual seek/pause/restart loops and transparent video surfaces on WebKit.
     The original hero controller is left intact. */
  function bindNative(root, video, isMini) {
    var source = (video.getAttribute('data-sources') || video.getAttribute('data-src') || '').split('|')[0].trim();
    if (!source) return;
    var poster = isMini ? root.querySelector('.m5-mini-poster') : document.createElement('img');
    if (!isMini) {
      poster.className = 'n1v-band-poster'; poster.alt = ''; poster.setAttribute('aria-hidden','true');
      poster.src = video.getAttribute('poster') || ''; root.appendChild(poster);
    } else if (poster) video.poster = poster.src;
    root.classList.add('n1v-native');
    video.muted = true; video.defaultMuted = true; video.setAttribute('muted','');
    video.playsInline = true; video.setAttribute('playsinline',''); video.setAttribute('webkit-playsinline','');
    video.loop = true; video.autoplay = false; video.preload = 'metadata'; video.controls = false;
    video.removeAttribute('controls');
    var tg = null, visible = false, userPaused = false, dead = false, assigned = false, pending = false,
      state = 'idle', lastTime = -1, lastProgress = 0, startedAt = 0, retries = 0, generation = 0,
      started = false, played = 0, done = false, yielded = false, events = [];
    var limit = isMini ? 15 : 0, cut = parseFloat(video.getAttribute('data-loop-end')) || 0;
    var start = parseFloat(video.getAttribute('data-loop-start')) || 0;
    if (!isMini) {
      tg = document.createElement('button'); tg.type = 'button'; tg.className = 'm4-film-tg n1v-tg is-paused';
      tg.innerHTML = '<span class="m4-tg-i" aria-hidden="true"></span>'; root.appendChild(tg);
    }
    function log(e){events.push(e); if(events.length>20)events.shift();}
    function render(s, show) {
      state=s; root.setAttribute('data-n1v-state',s);
      root.classList.toggle('is-ready',!!show);
      if(tg){tg.classList.toggle('is-paused',s!=='playing');tg.setAttribute('aria-label',s==='playing'?'Videoyu duraklat':'Videoyu oynat');}
    }
    function assign() {
      if(assigned)return; assigned=true; video.src=source;
      // Do not call load() after assigning src: Safari can abort the pending play request.
    }
    function stop(s, retain) {
      generation++; pending=false; video.autoplay=false; video.removeAttribute('autoplay');
      if(!video.paused)video.pause();
      render(s,retain && started);
    }
    function play(reason, manual) {
      if(dead||pending||!visible||document.hidden||userPaused||done||yielded||(!manual&&(reduce||saveData)))return;
      if(!manual&&state==='blocked')return;
      if(!video.paused&&state==='playing')return;
      if(!isMini)claim(P);
      video.muted=true; video.defaultMuted=true; video.playsInline=true;
      video.autoplay=true; video.setAttribute('autoplay',''); video.preload='auto';
      assign(); pending=true; startedAt=performance.now(); lastProgress=startedAt; lastTime=-1;
      var token=++generation; render('loading',false); log('play:'+reason);
      try {
        var promise=video.play();
        if(promise&&promise.then)promise.then(function(){if(token===generation)pending=false;},function(err){
          if(dead||token!==generation)return; pending=false; log(err&&err.name||'play-error'); render('blocked',false); arm();
        }); else pending=false;
      } catch(err){pending=false; render('blocked',false); arm();}
    }
    function tick() {
      if(dead||!visible||document.hidden||video.paused||video.seeking||video.readyState<2||userPaused||yielded||done)return;
      var t=video.currentTime;
      if(lastTime<0){lastTime=t;return;}
      var delta=t-lastTime;
      if(delta>0.015||delta<-.1){
        if(delta>0)played+=Math.min(delta,1);
        lastTime=t;lastProgress=performance.now();started=true;pending=false;
        // M2's black tail: retain matching poster during that part; native loop continues without seeking.
        render('playing', !(cut && t>=cut) && !(start && t<start));
        if(limit && played>=limit){done=true;stop('done',false);}
      }
    }
    on(video,'timeupdate',tick);
    on(video,'playing',function(){log('playing');});
    on(video,'error',function(){if(dead)return;pending=false;log('media-error');render('error',false);});
    on(video,'pause',function(){if(dead||userPaused||done||yielded||!visible||document.hidden)return;if(state==='playing')render('buffering',false);});
    var watch=setInterval(function(){
      if(dead||!visible||document.hidden||userPaused||done||yielded||state==='blocked'||state==='error'||state==='poster')return;
      tick();
      if((state==='loading'||state==='playing'||state==='buffering')&&performance.now()-lastProgress>5000){
        stop('buffering',false);
        if(retries++<1){play('bounded-retry',false);}
        else{render('blocked',false);arm();}
      }
    },250);
    if(tg)on(tg,'click',function(){
      if(state==='playing'){userPaused=true;stop('user',true);}
      else{userPaused=false;yielded=false;retries=0;visible=true;render('idle',false);play('button',true);}
    });
    var P={big:!isMini,root:root,isPlaying:function(){return !video.paused;},
      yield:function(){yielded=true;stop('paused',false);},
      wantsGesture:function(){return visible&&!userPaused&&!done&&state==='blocked';},
      tryNow:function(){yielded=false;retries=0;render('idle',false);play('gesture',true);}
    };
    players.push(P);
    function setVisible(v){
      v=!!v;if(v===visible)return;visible=v;
      if(!visible){yielded=false;stop(userPaused?'user':done?'done':'paused',false);if(isMini){done=false;played=0;}}
      else if(!userPaused&&!done){yielded=false;retries=0;if(reduce||saveData)render('poster',false);else{render('idle',false);play('visible',false);}}
    }
    render(reduce||saveData?'poster':'idle',false);
    if('IntersectionObserver' in window){
      var io=new IntersectionObserver(function(es){es.forEach(function(e){setVisible(e.isIntersecting&&e.intersectionRatio>=.15);});},{threshold:[0,.15,.5]});
      io.observe(root);offs.push(function(){io.disconnect();});
    }else setVisible(true);
    on(document,'visibilitychange',function(){if(document.hidden)stop(userPaused?'user':done?'done':'paused',false);else if(visible&&!userPaused&&!done){yielded=false;render('idle',false);play('visibility',false);}});
    on(window,'pagehide',function(){stop(userPaused?'user':done?'done':'paused',false);});
    on(window,'pageshow',function(e){if(!e.persisted)return;var now=visibleNow(root);visible=now;yielded=false;retries=0;if(!now){stop(userPaused?'user':done?'done':'paused',false);return;}if(!userPaused&&!done){render('idle',false);play('pageshow',false);}});
    root.__n1v5=root.__n1v4=root.__n1vm=root.__n1sv={video:video,setVisible:setVisible,state:function(){return {state:state,src:video.currentSrc,t:video.currentTime,paused:video.paused,ready:video.readyState,visible:visible,events:events.slice(),isReady:root.classList.contains('is-ready')};}};
    offs.push(function(){dead=true;clearInterval(watch);stop('idle',false);video.removeAttribute('src');try{video.load();}catch(e){}if(tg)tg.remove();if(!isMini&&poster)poster.remove();root.classList.remove('n1v-native','is-ready','is-poster');root.removeAttribute('data-n1v-state');delete root.__n1v5;delete root.__n1v4;delete root.__n1vm;delete root.__n1sv;});
  }

  roots.forEach(function (root) {
    var video = root.querySelector('video'); if (!video || root.__n1v5) return;
    var isHero = root.hasAttribute('data-m4-film'), isMini = root.hasAttribute('data-m5-mini');
    if (!isHero) { bindNative(root, video, isMini); return; }
    var isBand = false;
    var sources = (video.getAttribute('data-sources') || video.getAttribute('data-src') || '').split('|').map(function (s) { return s.trim(); }).filter(Boolean);
    var loopStart = parseFloat(video.getAttribute('data-loop-start')) || 0, loopEnd = parseFloat(video.getAttribute('data-loop-end')) || 0, loopAuto = !loopEnd;
    var nativeLoop = isBand && !loopEnd;
    var maxPlay = parseFloat(video.getAttribute('data-max-play')) || 0;            // mini: toplam oynatma sınırı (sn)
    var S = { state: '', idx: -1, visible: false, near: false, pending: false, frames: 0, lastT: -1, lastAdv: 0, everFrames: false,
      attempts: 0, result: '—', error: '', events: [], ourPause: false, user: false, sysRetries: 0, loopSeek: false, played: 0, loadT: 0, dead: false };
    function log(ev) { S.events.push(ev + '@' + Math.round(performance.now())); if (S.events.length > 40) S.events.shift(); }
    function setState(st) { if (S.state === st) return; S.state = st; root.setAttribute('data-n1v-state', st); log('state:' + st); tgSync(); }
    function ready(v) { root.classList.toggle('is-ready', !!v); }
    if (isBand) {
      var poster = document.createElement('img'); poster.className = 'n1v-band-poster'; poster.alt = ''; poster.setAttribute('aria-hidden','true');
      poster.src = video.getAttribute('poster') || ''; root.appendChild(poster); offs.push(function(){poster.remove();});
    }

    // 1 · kaynak atanmadan ÖNCE iOS satır içi sessiz oynatma koşulları (özellik + öznitelik)
    video.muted = true; video.defaultMuted = true; video.setAttribute('muted', '');
    video.playsInline = true; video.setAttribute('playsinline', ''); video.setAttribute('webkit-playsinline', '');
    video.loop = nativeLoop; video.controls = false; video.removeAttribute('controls');
    video.autoplay = false; video.removeAttribute('autoplay');
    video.preload = 'none';
    try { video.disableRemotePlayback = true; } catch (e) {}
    on(video, 'volumechange', function () { if (!video.muted) video.muted = true; });
    // V1.4'ten kalmış olabilecek büyük düğme (eski önbellek) kaldırılır
    [].forEach.call(root.querySelectorAll('.n1v-play'), function (b) { b.remove(); });

    // 2 · küçük oynat/duraklat (hero'da işaretlemede hazır; bantlarda burada eklenir; mini filmde yok)
    var tg = isMini ? null : root.querySelector('.m4-film-tg');
    if (!tg && !isMini) { tg = document.createElement('button'); tg.type = 'button'; tg.className = 'm4-film-tg n1v-tg'; tg.innerHTML = '<span class="m4-tg-i" aria-hidden="true"></span>'; root.appendChild(tg); }
    function tgSync() {
      if (!tg) return;
      var playing = S.state === 'playing';
      tg.classList.toggle('is-paused', !playing);
      tg.setAttribute('aria-pressed', S.user ? 'true' : 'false');
      tg.setAttribute('aria-label', (playing ? 'Videoyu duraklat' : 'Videoyu oynat') + (isHero ? ' (Ronin)' : ''));
    }

    function emit(t) { if (isHero) { try { root.dispatchEvent(new CustomEvent('m4:time', { detail: { t: t } })); } catch (e) {} } }
    function assign() { return S.idx >= 0 || next(); }
    function next() {
      S.idx++;
      if (S.idx >= sources.length) { setState('error'); ready(false); return false; }
      video.preload = 'auto'; video.src = sources[S.idx]; S.loadT = performance.now(); log('src:' + S.idx);
      try { video.load(); } catch (e) {}
      if (S.state === 'idle' || S.state === '') setState('loading');
      return true;
    }
    function canAuto() { return S.visible && !document.hidden && !S.user && S.state !== 'poster' && S.state !== 'error' && S.state !== 'done'; }
    function play(reason) {
      if (!sources.length || S.pending || S.dead) return;
      if (!assign()) return;
      if (loopStart && video.readyState >= 1 && video.currentTime < loopStart) { try { video.currentTime = loopStart; } catch (e) {} }
      if (P.big) claim(P);
      S.pending = true; S.playT = performance.now(); S.attempts++; log('play:' + reason);
      var p; try { p = video.play(); } catch (e) { S.pending = false; reject(e); return; }
      if (p && p.then) p.then(function () { S.pending = false; S.result = 'ok'; log('play-ok'); if (S.state !== 'playing') setState('loading'); })
        .catch(function (err) { S.pending = false; reject(err); });
      else S.pending = false;
    }
    function reject(err) {
      var name = (err && err.name) || 'Error'; S.result = name; log('reject:' + name);
      if (name === 'AbortError') return;                       // load()/kaynak değişimi kesti: olağan
      if (name === 'NotSupportedError') { if (next()) play('next'); return; }
      setState('blocked'); ready(false); arm();                // poster kalır; küçük düğme "oynat"; tek gerçek dokunuşta denenir
    }
    function attempt(reason) { if (canAuto() && S.state !== 'blocked' && !S.yielded) play(reason); }
    function pauseOurs(st) { if (!video.paused) { S.ourPause = true; try { video.pause(); } catch (e) {} } if (st && S.state !== 'user' && S.state !== 'blocked' && S.state !== 'poster') setState(st); }

    // 3 · gerçek ilerleme: yalnızca kare zamanı ilerlerken "playing"; aksi hâlde poster
    function advance(t) {
      if (S.loopSeek || video.seeking || (isBand && video.readyState < 2)) return;
      if (t > S.lastT + 0.001 || (S.lastT > 0 && t < S.lastT - 0.5)) {
        if (S.lastT >= 0 && t > S.lastT) S.played += Math.min(0.5, t - S.lastT);
        S.lastT = t; S.lastAdv = performance.now(); S.frames++;
        if (S.frames >= 2 && !video.paused) { S.everFrames = true; ready(true); if (S.state !== 'playing') setState('playing'); }
      }
      if (loopEnd > 0 && t >= loopEnd && !video.paused) loopNow();   // duraklat → atla → seeked → oynat (güvenli döngü)
      if (maxPlay && S.played >= maxPlay && !video.paused) { S.loopSeek = false; pauseOurs('done'); ready(false); return; }   // mini: hareket süresi sınırlı; poster (aynı kadraj)
      emit(t);
    }
    function loopNow() {
      if (S.loopSeek) return;
      S.loopSeek = true; S.seekT = performance.now(); S.ourPause = !video.paused;
      if (isBand) { ready(false); setState('loading'); S.frames = 0; }
      try { if (!video.paused) video.pause(); video.currentTime = loopStart || 0; } catch (e) { S.loopSeek = false; }
    }
    on(video, 'ended', function () { log('ended'); loopNow(); });
    on(video, 'seeked', function () {
      if (!S.loopSeek) return; S.loopSeek = false; S.ourPause = false; S.lastT = video.currentTime; S.lastAdv = performance.now();
      if (canAuto()) play('loop'); else setState('paused');
    });
    if (hasRVFC) {
      var onFrame = function (now, meta) { if (S.dead) return; advance(meta && meta.mediaTime != null ? meta.mediaTime : video.currentTime); video.requestVideoFrameCallback(onFrame); };
      video.requestVideoFrameCallback(onFrame);
    }
    on(video, 'timeupdate', function () { if (!hasRVFC) advance(video.currentTime); else if (isBand && !video.paused && !video.seeking && !S.loopSeek && loopEnd > 0 && video.currentTime >= loopEnd) loopNow(); });
    // 4 · bekçi: oynuyor görünüp kare ilerlemiyorsa poster + "oynat" simgesi; ilk kare hiç gelmezse (hero) doğal dosyaya geç
    var watch = setInterval(function () {
      if (S.dead) return;
      if (!S.visible || document.hidden || S.user || S.yielded || S.state === 'poster' || S.state === 'done' || S.state === 'blocked' || S.state === 'error') return;
      if (isBand) {
        var clock = performance.now();
        var stuck = S.loopSeek ? clock - S.seekT > 3500 : S.pending ? clock - S.playT > 7000 : (S.state === 'loading' || S.state === 'buffering' || S.state === 'paused' || S.state === 'playing') && clock - (S.lastAdv || S.playT || S.loadT || clock) > 4500;
        if (stuck) {
          ready(false); setState('buffering');
          if ((S.recoveries || 0) < 1) { S.recoveries = (S.recoveries || 0) + 1; S.pending = false; S.loopSeek = false; S.frames = 0; S.lastT = -1; S.lastAdv = 0; S.ourPause = false; try { video.pause(); video.load(); } catch(e){} play('band-recover'); }
          else { pauseOurs('paused'); setState('blocked'); arm(); }
          return;
        }
      }
      if (video.paused || S.loopSeek) return;
      var now = performance.now(), idle = now - (S.lastAdv || S.loadT || now);
      if (S.state === 'playing' && idle > 2500) { setState('buffering'); ready(false); }
      if (S.state === 'buffering' && idle > 3000 && video.readyState >= 2 && now - (S.kickT || 0) > 10000) { S.kickT = now; log('kick'); loopNow(); }   // takılma kurtarma (sınırlı)
      if (!S.everFrames && (S.state === 'loading' || S.state === 'buffering') && now - S.loadT > 9000 && S.idx < sources.length - 1) { log('slow-src'); if (next()) play('fallback'); }
    }, 1000);
    on(video, 'loadedmetadata', function () {
      log('loadedmetadata');
      if (loopAuto && !nativeLoop && isFinite(video.duration) && video.duration > 1) loopEnd = video.duration - 0.1;   // dosya sonuna 0,1 sn kala döngü
      if (loopStart && video.currentTime < loopStart) { try { video.currentTime = loopStart; } catch (e) {} }
    });
    on(video, 'loadeddata', function () { log('loadeddata'); if (video.paused) attempt('loadeddata'); });
    on(video, 'canplay', function () { log('canplay'); if (video.paused && (S.state === 'loading' || S.state === 'buffering')) attempt('canplay'); });
    on(video, 'playing', function () { log('playing'); S.sysRetries = 0; disarmIfDone(); });
    on(video, 'waiting', function () { log('waiting'); });
    on(video, 'stalled', function () { log('stalled'); });
    on(video, 'suspend', function () { log('suspend'); });
    on(video, 'pause', function () {
      log('pause');
      if (S.loopSeek) return;
      if (S.ourPause) { S.ourPause = false; if (S.state === 'user') return;   // kullanıcı duraklattı: kare ekranda kalır
        if (S.state === 'playing' || S.state === 'buffering' || S.state === 'loading') setState('paused'); ready(false); return; }
      if (S.user || S.state === 'done') return;
      // sistemin duraklatması (iOS: görünmezlik, güç, bellek): poster öne; görünür ve açıksa sınırlı yeniden deneme
      setState('paused'); ready(false);
      if (canAuto() && !S.yielded && S.sysRetries < 2) { S.sysRetries++; setTimeout(function () { if (!S.dead && video.paused) attempt('sys-retry'); }, 450); }
    });
    on(video, 'error', function () { var me = video.error; S.error = me ? 'MediaError ' + me.code : 'hata'; log('error:' + S.error); ready(false); if (!S.everFrames && next()) play('error-next'); else setState('error'); });
    function disarmIfDone() { if (!players.some(function (p) { return p.wantsGesture(); })) disarm(); }

    if (tg) on(tg, 'click', function () {
      if (S.state === 'playing') { S.user = true; pauseOurs(); setState('user'); return; }
      S.user = false; S.yielded = false; S.recoveries = 0; S.visible = true; if (S.state === 'poster' || S.state === 'blocked' || S.state === 'done') setState('loading');
      play('button');                                         // dokunuşun içinde, senkron
    });

    var P = {
      big: !isMini, root: root,
      isPlaying: function () { return !video.paused && !S.loopSeek; },
      yield: function () { S.yielded = true; pauseOurs('paused'); ready(false); },
      wantsGesture: function () { return S.state === 'blocked' && S.visible; },
      tryNow: function (r) { S.user = false; S.yielded = false; S.recoveries = 0; setState('loading'); play(r); }
    };
    players.push(P);

    if (reduce || saveData || !sources.length) { setState('poster'); root.classList.add('is-poster'); }
    else setState('idle');

    // 5 · görünürlük: hero hemen; diğerleri bir ekran önce kaynak alır; %15 görünürlükte oynar; tamamen çıkınca durur
    if (isHero && S.state !== 'poster') { S.near = true; assign(); }
    if ('IntersectionObserver' in window) {
      var near = new IntersectionObserver(function (es) {
        if (S.near) { near.disconnect(); return; }
        if (!es.some(function (e) { return e.isIntersecting; })) return;
        S.near = true; near.disconnect(); if (S.state !== 'poster') assign();
      }, { rootMargin: '100% 0px 100% 0px' });
      near.observe(root);
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          var vis = e.isIntersecting && e.intersectionRatio >= 0.15;
          if (!vis) { if (S.visible) { S.visible = false; S.yielded = false; pauseOurs('paused'); } return; }
          if (vis && !S.visible) { S.visible = true; S.yielded = false; S.recoveries = 0; S.sysRetries = 0; if (S.state === 'paused' || S.state === 'loading' || S.state === 'idle' || S.state === 'buffering') attempt('visible'); }
        });
      }, { threshold: [0, 0.15, 0.5] });
      io.observe(root);
      offs.push(function () { near.disconnect(); io.disconnect(); });
    } else { S.visible = true; S.near = true; if (S.state !== 'poster') { assign(); attempt('no-io'); } }

    on(document, 'visibilitychange', function () { if (document.hidden) pauseOurs(); else if (S.visible && S.state === 'paused') attempt('visibility'); });
    on(window, 'pagehide', function () { pauseOurs(); });
    on(window, 'pageshow', function (e) {
      if (!e.persisted) return;                               // BFCache dönüşü: söz ve sayaçlar sıfırlanır
      S.visible=visibleNow(root);
      S.pending = false; S.lastAdv = 0; S.frames = 0; S.sysRetries = 0; ready(false);
      if (S.state !== 'poster' && S.state !== 'error' && S.state !== 'user') { setState('paused'); if (S.visible) attempt('pageshow'); }
    });

    root.__n1v5 = root.__n1v4 = root.__n1vm = root.__n1sv = {
      video: video,
      state: function () { return { state: S.state, src: video.currentSrc, idx: S.idx, t: +video.currentTime.toFixed(3), paused: video.paused, ready: video.readyState,
        frames: S.frames, visible: S.visible, attempts: S.attempts, result: S.result, error: S.error, user: S.user, played: +S.played.toFixed(2), isReady: root.classList.contains('is-ready'), events: S.events.slice(-16) }; },
      setVisible: function (v) { v = !!v; if (v === S.visible) return; S.visible = v; if (!v) pauseOurs('paused'); else { S.yielded = false; S.recoveries = 0; attempt('visible'); } }
    };
    offs.push(function () {
      S.dead = true; clearInterval(watch);
      try { video.pause(); video.removeAttribute('src'); video.load(); } catch (e) {}
      if (tg && tg.classList.contains('n1v-tg') && tg.isConnected) tg.remove();
      root.classList.remove('is-ready', 'is-poster'); root.removeAttribute('data-n1v-state');
      delete root.__n1v5; delete root.__n1v4; delete root.__n1vm; delete root.__n1sv;
    });
  });

  window.__n1v5 = window.__n1v4 = {
    players: players,
    destroy: function () { offs.forEach(function (f) { try { f(); } catch (e) {} }); offs = []; players = []; }
  };
})();
