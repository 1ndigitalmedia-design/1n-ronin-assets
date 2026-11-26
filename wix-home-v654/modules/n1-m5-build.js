/*!
 * n1-m5-build — 1N Digital Media · ana sayfa MOBİL / TABLET işaretlemesi (v6.53 / V1.5; tasarım V1.4 ile aynı)
 * V1.5: Hizmetler cümlesindeki küçük oval medya Ronin posteri yerine kreatif prodüksiyon mini filmi (data-m5-mini).
 * Yalnızca mobil/tablet profilinde yüklenir. Giriş dosyası (n1-site-wix-v652) iskeleti etkisiz bir <template> içinde
 * hazırlar ve sayfaya eklemeden ÖNCE window.N1M4.build(frag, ctx) çağırır. Böylece:
 *   - Tek DOM: içerik iki kez eklenmez; her metin, bağlantı ve kimlik (id) mevcut iskeletten okunur, hiçbiri uydurulmaz.
 *   - Masaüstü bölüm modüllerinin kancaları (data-n1-*) mobilde data-n1m-* olur: modüller kendi tablolarını yayımlar
 *     (N1_METRICS, N1_SECTORS, N1_ECOSYSTEM) ve çıkar; mobil hareket n1-home-m4.js'tedir.
 *   - Bölüm sırası mobil anlatıya göre yeniden dizilir (kimlikler ve çapa bağlantıları değişmez).
 */
(function () {
  'use strict';
  var ARROW = '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false"><path d="M4.5 11.5l7-7M5.5 4.5h6v6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/></svg>';
  var SVC_LABEL = { 'kreatif-produksiyon': 'Kreatif Prodüksiyon', 'e-ticaret-yonetimi': 'E-Ticaret Yönetimi', 'sosyal-medya': 'Sosyal Medya',
    'reklam-yonetimi': 'Reklam Yönetimi', 'ui-ux-tasarim': 'UI-UX Tasarım', 'ai': 'Yapay Zekâ', 'uygulama': 'Uygulama Geliştirme' };
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function tx(el) { return el ? el.textContent.replace(/\s+/g, ' ').trim() : ''; }
  function nn(i) { return (i < 9 ? '0' : '') + (i + 1); }
  function eyebrow(text, extra, n) { return '<p class="m4-eye"' + (extra || '') + '>' + (n ? '<span class="m4-pn" aria-hidden="true">(' + n + ')</span>' : '<i aria-hidden="true"></i>') + '<span>' + esc(text) + '</span></p>'; }
  var lc = function (t) { return t.toLocaleLowerCase('tr-TR'); };
  var sc = function (t) { var l = lc(t); return l.charAt(0).toLocaleUpperCase('tr-TR') + l.slice(1); };

  function build(frag, ctx) {
    var main = frag.querySelector('main'); if (!main) return;
    var report = { built: [] };

    /* ── HERO · yeni Ronin filmi (native video; renk düzenlemesi dosyaya işlenmiş) ── */
    // Ronin kademesi: ekrandaki film genişliği (CSS px) × piksel yoğunluğu doğal 560 px'i belirgin aşıyorsa yapay 2× dosya;
    // Veri Tasarrufu ya da ≤ 2 GB bellek bildiren tarayıcılarda her zaman doğal dosya.
    var heroSrc = ctx.hero.src;
    if (ctx.hero.src2x) {
      var c = navigator.connection || {}, mem = navigator.deviceMemory, dpr = window.devicePixelRatio || 1;
      var filmCss = Math.min(innerWidth, (innerWidth > innerHeight ? innerHeight * 0.745 : innerWidth));
      if (!c.saveData && !(mem && mem <= 2) && filmCss * dpr > 840) heroSrc = ctx.hero.src2x + '|' + ctx.hero.src;   // 2× hata verirse doğal dosyaya geçer
    }
    report.heroSrc = heroSrc;
    var hero = document.createElement('section');
    hero.className = 'm4-hero'; hero.id = 'hero'; hero.setAttribute('aria-label', 'Giriş');
    hero.setAttribute('data-m4-film', '');
    hero.innerHTML =
      '<div class="m4-film"><div class="m4-film-box">' +
        '<img class="m4-film-poster" src="' + esc(ctx.hero.poster) + '" width="' + ctx.hero.w + '" height="' + ctx.hero.h + '" alt="" fetchpriority="high" decoding="async">' +
        '<video class="m4-film-v" muted playsinline loop preload="auto" disablepictureinpicture disableremoteplayback width="' + ctx.hero.w + '" height="' + ctx.hero.h + '"' +
          ' poster="' + esc(ctx.hero.poster) + '" data-src="' + esc(heroSrc) + '" aria-hidden="true" tabindex="-1"></video>' +
        '<span class="m4-film-shade" aria-hidden="true"></span>' +
      '</div></div>' +
      '<div class="m4-copy">' +
        '<div class="m4-hero-meta">' +
          '<p class="m4-slogan" lang="en" translate="no" aria-hidden="true"><span class="m4-sl">Workshops to</span> <span class="m4-sl m4-acc">Blow Your Mind.</span></p>' +
          '<p class="m4-sc-count" aria-hidden="true"><span class="m4-sc-i">01</span><span class="m4-sc-n"> / 04</span></p>' +
        '</div>' +
        '<div class="m4-hero-prog" aria-hidden="true"><i></i></div>' +
        '<div class="m4-scenes" aria-hidden="true" lang="en" translate="no">' +
          '<p class="m4-sc" data-sc="branding"><span class="m4-sc-w m4-acc">BRANDING</span></p>' +
          '<p class="m4-sc" data-sc="creative"><span class="m4-sc-w">CREATIVE</span></p>' +
          '<p class="m4-sc" data-sc="think"><span class="m4-sc-w">THINK <em class="m4-acc">BEYOND</em></span></p>' +
          '<p class="m4-sc" data-sc="create"><span class="m4-sc-w">CREATE <em class="m4-acc">IMPACT</em></span></p>' +
        '</div>' +
        '<h1 class="m4-sr" lang="en" translate="no">Workshops to Blow Your Mind. Branding. Creative. Think beyond. Create impact.</h1>' +
        '<div class="m4-hero-foot">' +
          '<a class="m4-cta" href="' + esc(ctx.hero.ctaHref) + '"><span>Projenizi Konuşalım</span><span class="m4-cta-ico" aria-hidden="true">' + ARROW + '</span></a>' +
          '<button class="m4-film-tg" type="button" aria-label="Ronin videosunu duraklat" aria-pressed="false"><span class="m4-tg-i" aria-hidden="true"></span></button>' +
        '</div>' +
      '</div>';
    var slot = frag.querySelector('#heroSlot') || main.firstElementChild;
    if (slot && slot.id === 'heroSlot') slot.replaceWith(hero); else main.insertBefore(hero, main.firstChild);
    var rt = frag.querySelector('ronin-type'); if (rt) rt.remove();
    report.built.push('hero');

    /* ── MANİFESTO · tek editoryal cümle bloğu + satır içi görsel "harf" ── */
    var glyph = '';
    var ab = frag.querySelector('section[data-n1-about]');
    if (ab) {
      var ss = [].slice.call(ab.querySelectorAll('.n1ab-s')).map(tx);
      var his = [].slice.call(ab.querySelectorAll('.n1ab-hi')).map(tx);
      var cta = ab.querySelector('.n1ab-cta');
      // Cümle düzeni (Türkçe yerel ayarıyla). Vurgular aynı kelimeler: HAREKETE, İZ BIRAKMASINI.
      var words = [];
      ss.forEach(function (s, i) {
        var t = (i === 0 || /[.!?]$/.test(ss[i - 1] || '')) ? sc(s) : lc(s);
        t.split(' ').forEach(function (w) { if (w) words.push(w); });
      });
      var hiWords = []; his.forEach(function (h) { lc(h).split(' ').forEach(function (w) { hiWords.push(w); }); });
      var html = words.map(function (w) {
        var bare = lc(w).replace(/[.,]/g, '');
        var hi = hiWords.indexOf(bare) >= 0;
        return '<span class="m4-w' + (hi ? ' m4-acc' : '') + '">' + esc(w) + '</span>';
      }).join(' ');
      ab.className = 'm4-mf'; ab.removeAttribute('data-n1-about'); ab.setAttribute('data-n1m-about', '');
      ab.innerHTML = '<div class="m4-wrap">' + eyebrow('Biz kimiz', '', '02') +
        '<p class="m4-mf-text" lang="tr">' + (glyph ? '<span class="m4-mf-glyph" aria-hidden="true"><img src="' + esc(glyph) + '" width="734" height="1084" alt="" loading="lazy" decoding="async"></span>' : '') + html + '</p>' +
        (cta ? '<a class="m4-link" data-link="' + esc(cta.getAttribute('data-link') || '') + '" href="' + esc(cta.getAttribute('href') || '#') + '"><span>' + esc(tx(cta)) + '</span>' + ARROW + '</a>' : '') +
        '</div>';
      report.built.push('manifesto');
    }

    /* ── HİZMETLER · kâğıt tonlu "stüdyo cümlesi": iskeletteki #hizmetler-ozet paragrafı (metin ve 7 bağlantı aynen) büyük
          editoryal tipografiyle; satır içi Ronin "harfi"; kaydırdıkça kelimeler mürekkep tonuna döner ── */
    var intro = frag.querySelector('#hakkimizda');
    var p = frag.querySelector('#hizmetler-ozet');
    if (intro && p) {
      var links = [].slice.call(p.querySelectorAll('a.sh-link'));
      [].slice.call(p.querySelectorAll('br.ib')).forEach(function (b) { b.remove(); });
      p.className = 'm4-svc-text'; p.removeAttribute('style'); ['data-highlight-dim', 'data-highlight-lift', 'data-highlight-a11y'].forEach(function (a) { p.removeAttribute(a); });
      links.forEach(function (a, i) {
        a.className = 'm4-svc-a'; a.setAttribute('data-n', nn(i));
        a.setAttribute('aria-label', SVC_LABEL[a.getAttribute('data-service')] || tx(a));
      });
      var acc = p.querySelector('.intro-acc'); if (acc) acc.className = 'm4-acc';
      // V1.5 · oval medya: kreatif prodüksiyon mini filmi (ses yok, satır içi, sınırlı süre döngü); poster aynı kadraj.
      if (ctx.mini && ctx.mini.src) {
        var g = document.createElement('span'); g.className = 'm4-glyph m5-mini'; g.setAttribute('data-m5-mini', ''); g.setAttribute('aria-hidden', 'true');
        g.innerHTML = '<img class="m5-mini-poster" src="' + esc(ctx.mini.poster) + '" width="320" height="165" alt="" loading="lazy" decoding="async">' +
          '<video class="m5-mini-v" muted playsinline loop preload="none" disablepictureinpicture disableremoteplayback width="640" height="360" data-src="' + esc(ctx.mini.src) + '" data-max-play="15" aria-hidden="true" tabindex="-1"></video>';
        p.insertBefore(g, p.firstChild);
      }
      intro.className = 'm4-svc m4-paper'; intro.removeAttribute('aria-label'); intro.setAttribute('aria-labelledby', 'm4-svc-h');
      intro.innerHTML = '<div class="m4-wrap"><div class="m4-svc-head"><h2 class="m4-eye m4-eye--paper" id="m4-svc-h"><span class="m4-pn" aria-hidden="true">(01)</span>Hizmetler</h2>' +
        '<p class="m4-svc-count" aria-hidden="true">' + (links.length < 10 ? '0' : '') + links.length + ' disiplin</p></div></div>';
      var w = document.createElement('div'); w.className = 'm4-wrap'; w.appendChild(p); intro.appendChild(w);
      var idx = document.createElement('div'); idx.className = 'm4-wrap m4-svc-foot'; idx.setAttribute('aria-hidden', 'true');
      idx.innerHTML = '<p>Tek ekip</p><p>Tek ritim</p><p>İzmir — Global</p>';
      intro.appendChild(idx);
      report.built.push('services');
    }

    /* ── PARTNERLİKLER · "ödül satırları" + AI · kompakt panel ── */
    var pk = frag.querySelector('section[data-n1k]');
    if (pk && pk.querySelector('.n1k-wall')) {
      var ttl = pk.querySelector('.n1k-title'), ttlTxt = (ttl && ttl.getAttribute('aria-label')) || tx(ttl);
      var wallTag = tx(pk.querySelector('.n1k-tag--wall'));
      var brands = [].map.call(pk.querySelectorAll('.n1k-wall .n1k-brand'), function (b) {
        var k = b.querySelector('.n1k-kind'); return { name: tx(b.querySelector('.n1k-word')), kind: tx(k), lang: (k && k.getAttribute('lang')) || 'en' };
      });
      var cert = pk.querySelector('.n1k-cert');
      var certTag = tx(cert && cert.querySelector('.n1k-tag')), certName = tx(cert && cert.querySelector('.n1k-cert-name')), certNote = tx(cert && cert.querySelector('.n1k-cert-note'));
      var ai = pk.querySelector('.n1k-ai');
      var BRAND = { GOOGLE: 'Google', META: 'Meta', WIX: 'Wix', TIKTOK: 'TikTok' };   // marka yazımı (görsel; aria-label özgün)
      var tc = function (w) { return BRAND[w.toUpperCase()] || w; };
      var html2 = '<div class="m4-wrap">' + eyebrow(wallTag, '', '05') +
        '<h2 class="m4-h2 m4-pk-title" id="n1k-title">' + esc(ttlTxt) + '</h2>' +
        '<ul class="m4-pk-list" lang="en" translate="no">' + brands.map(function (b, i) {
          return '<li class="m4-pk-row" aria-label="' + esc(b.name + ' ' + b.kind) + '"><span class="m4-pk-no" aria-hidden="true">' + nn(i) + '</span>' +
            '<span class="m4-pk-big" aria-hidden="true">' + esc(tc(b.name)) + '</span>' +
            '<span class="m4-pk-kind" aria-hidden="true"' + (b.lang === 'tr' ? ' lang="tr"' : '') + '>' + esc(b.kind) + '</span></li>';
        }).join('') + '</ul>' +
        (cert ? '<div class="m4-pk-cert">' + eyebrow(certTag) +
          '<p class="m4-pk-cert-name" lang="en" translate="no">' + esc(certName) + '</p><p class="m4-pk-note">' + esc(certNote) + '</p></div>' : '') +
        '</div>';
      if (ai) {
        var aiTag = tx(ai.querySelector('.n1k-tag')), aiTitle = tx(ai.querySelector('.n1k-ai-title'));
        var aiLines = [].map.call(ai.querySelectorAll('.n1k-ai-line .n1k-t'), tx), aiNote = tx(ai.querySelector('.n1k-ai-note'));
        var aiList = [].map.call(ai.querySelectorAll('.n1k-ai-list li'), tx);
        html2 += '<div class="m4-wrap"><div class="m4-ai">' +
          '<div class="m4-ai-top">' + eyebrow(aiTag, ' lang="tr"') + '<h3 class="m4-ai-title" lang="en" translate="no">' + esc(aiTitle) + '</h3></div>' +
          '<p class="m4-ai-line" lang="en" translate="no">' + aiLines.map(function (t, i) { return '<span class="m4-ai-l' + (i ? ' m4-acc' : '') + '">' + esc(t) + '</span>'; }).join(' ') + '</p>' +
          '<p class="m4-ai-note">' + esc(aiNote) + '</p>' +
          '<p class="m4-ai-inc" aria-hidden="true">Kapsam</p>' +
          '<ul class="m4-ai-list" lang="en" translate="no">' + aiList.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul></div></div>';
      }
      pk.className = 'm4-pk'; pk.removeAttribute('data-n1k'); pk.setAttribute('data-n1m-k', '');
      pk.innerHTML = html2;
      report.built.push('partners', 'ai');
    }

    /* ── İSTATİSTİKLER · M2 filminin alt kenarına oturan üç sütun ── */
    var st = frag.querySelector('section[data-n1-stats]');
    if (st && st.querySelector('.n1st-item')) {
      var rows = [].map.call(st.querySelectorAll('.n1st-item'), function (li) {
        var v = li.querySelector('.n1st-val'), u = li.querySelector('.n1st-unit'), pl = li.querySelector('.n1st-plus'), lb = li.querySelector('.n1st-label');
        return { value: v ? v.textContent.trim() : '', unit: u ? u.textContent.trim() : '', plus: !!pl, label: tx(lb) };
      });
      st.className = 'm4-st'; st.removeAttribute('data-n1-stats'); st.setAttribute('data-n1m-stats', '');
      st.innerHTML = '<div class="m4-wrap"><ul class="m4-st-list">' + rows.map(function (r) {
        return '<li class="m4-st-it"><p class="m4-st-num" aria-hidden="true"><span class="m4-st-val" data-value="' + esc(r.value) + '">' + esc(r.value) + '</span>' +
          (r.unit ? '<span class="m4-st-unit">' + esc(r.unit) + '</span>' : '') + '<span class="m4-st-plus">' + (r.plus ? '+' : '') + '</span></p>' +
          '<p class="m4-st-label" aria-hidden="true">' + esc(r.label) + '</p><span class="m4-sr">' + esc(r.value + r.unit + (r.plus ? '+' : '') + ' ' + r.label) + '</span></li>';
      }).join('') + '</ul></div>';
      report.built.push('stats');
    }

    /* ── MARKALAR · yatay kaydırılan jenerik şeridi (gerçek dokunmatik kaydırma, scroll-snap) ── */
    var mb = frag.querySelector('section[data-n1-brands]');
    if (mb) {
      var tag = tx(mb.querySelector('.n1b-tag')), title = tx(mb.querySelector('.n1b-title')), all = mb.querySelector('.n1b-all');
      var items = [].map.call(mb.querySelectorAll('.n1b-item'), function (li) {
        var h = li.querySelector('.n1b-name');
        return { name: (h && h.getAttribute('aria-label')) || tx(h), parts: [].map.call(li.querySelectorAll('.n1b-l'), function (l) { return { t: tx(l), lang: l.getAttribute('lang') }; }), bio: tx(li.querySelector('.n1b-bio')) };
      });
      mb.className = 'm4-br'; mb.removeAttribute('data-n1-brands'); mb.setAttribute('data-n1m-brands', '');
      mb.innerHTML = '<div class="m4-wrap m4-br-head"><div>' + eyebrow(tag, ' lang="en"', '04') + '<h2 class="m4-h2" id="n1b-title">' + esc(title) + '</h2></div>' +
        (all ? '<a class="m4-link" data-link="' + esc(all.getAttribute('data-link') || '') + '" href="' + esc(all.getAttribute('href') || '/markalar') + '"><span>' + esc(tx(all)) + '</span>' + ARROW + '</a>' : '') + '</div>' +
        '<div class="m4-br-vp" role="region" aria-label="Markalar, yatay liste" tabindex="0"><ul class="m4-br-track">' + items.map(function (b, i) {
          return '<li class="m4-br-it"><p class="m4-br-no" aria-hidden="true">' + nn(i) + ' / ' + nn(items.length - 1) + '</p>' +
            '<h3 class="m4-br-name" translate="no" aria-label="' + esc(b.name) + '">' + b.parts.map(function (pp) { return '<span aria-hidden="true"' + (pp.lang ? ' lang="' + pp.lang + '"' : '') + '>' + esc(pp.t) + '</span>'; }).join('') + '</h3>' +
            '<p class="m4-br-bio">' + esc(b.bio) + '</p></li>';
        }).join('') + '</ul></div>' +
        '<div class="m4-wrap m4-br-ctl"><p class="m4-br-cnt" aria-hidden="true">01 / ' + nn(items.length - 1) + '</p><div class="m4-br-prog" aria-hidden="true"><i></i></div>' +
        '<div class="m4-br-nav"><button type="button" class="m4-br-b" data-d="-1" aria-label="Önceki marka"><svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M10 3 5 8l5 5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/></svg></button>' +
        '<button type="button" class="m4-br-b" data-d="1" aria-label="Sonraki marka"><svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M6 3l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/></svg></button></div></div>';
      report.built.push('brands');
    }

    /* ── SEKTÖRLER · iki sütunlu ince çizgili dizin (13 sektör, bağlantı yoksa düz metin) ── */
    var sx = frag.querySelector('section[data-n1-sectors]');
    if (sx && sx.querySelector('.n1sec-item')) {
      var sTitle = [].map.call(sx.querySelectorAll('.n1sec-tl > span'), tx);
      var dsc = sx.querySelector('.n1sec-desc'), strong = dsc && dsc.querySelector('strong');
      var lead = strong ? tx(strong) : '', rest = dsc ? tx(dsc).replace(lead, '').trim() : '';
      var secs = [].map.call(sx.querySelectorAll('.n1sec-item'), function (li) { var nm = li.querySelector('.n1sec-name'); return { key: li.getAttribute('data-sector') || '', label: tx(nm), href: nm && nm.tagName === 'A' ? nm.getAttribute('href') : '' }; });
      sx.className = 'm4-sx'; sx.removeAttribute('data-n1-sectors'); sx.setAttribute('data-n1m-sectors', '');
      sx.innerHTML = '<div class="m4-wrap"><div class="m4-sx-head">' + eyebrow(sTitle.join(' '), '', '06') +
        '<h2 class="m4-h2 m4-sx-lead" id="n1sec-title">' + esc(lead) + '</h2><p class="m4-sx-desc">' + esc(rest) + '</p></div>' +
        '<ol class="m4-sx-list" lang="tr" aria-labelledby="n1sec-title">' + secs.map(function (s, i) {
          var nm = s.href ? '<a class="m4-sx-name" href="' + esc(s.href) + '">' + esc(s.label) + '</a>' : '<span class="m4-sx-name">' + esc(s.label) + '</span>';
          return '<li class="m4-sx-it" data-sector="' + esc(s.key) + '">' + nm + '<sup class="m4-sx-no" aria-hidden="true">' + nn(i) + '</sup></li>';
        }).join('') + '</ol></div>';
      report.built.push('sectors');
    }

    /* ── DIGITAL ECOSYSTEM · seçili işler sahnesi (projeler n1-home-m4'te N1_ECOSYSTEM'den çizilir) ── */
    var eco = frag.querySelector('section[data-n1-eco]');
    if (eco) {
      var etag = tx(eco.querySelector('.n1eco-tag')), etl = [].map.call(eco.querySelectorAll('.n1eco-title span'), tx), elead = tx(eco.querySelector('.n1eco-lead'));
      var ecta = eco.querySelector('.n1eco-cta');
      eco.className = 'm4-eco'; eco.removeAttribute('data-n1-eco'); eco.setAttribute('data-n1m-eco', '');
      // V1.5: bölüm başlığı sabit sahnenin içinde (sahne ekran yüksekliğini başlık + şerit + bilgi ile doldurur; altında boş alan kalmaz)
      eco.innerHTML = '<div class="m4-eco-pin"><div class="m4-wrap m4-eco-stage">' +
          '<div class="m4-eco-head">' + eyebrow(etag, ' lang="en"', '03') +
          '<h2 class="m4-h2" id="n1eco-title"><span>' + esc(etl[0] || '') + '</span> <span class="m4-acc">' + esc(etl[1] || '') + '</span></h2>' +
          '<p class="m4-eco-lead">' + esc(elead) + '</p></div>' +
          '<div class="m4-eco-info" aria-live="polite">' +
            '<p class="m4-eco-meta"><span class="m4-eco-count"></span><span class="m4-eco-domain"></span></p>' +
            '<h3 class="m4-eco-name" translate="no"></h3><p class="m4-eco-desc"></p>' +
            '<a class="m4-link m4-eco-cta" href="' + esc(ecta ? ecta.getAttribute('href') : '#') + '" target="_blank" rel="noopener noreferrer"><span>' + esc(ecta ? tx(ecta) : 'Projeyi Keşfet') + '</span>' + ARROW + '</a>' +
          '</div>' +
          '<div class="m4-eco-strip"><ul class="m4-eco-track" role="list"></ul><div class="m4-eco-prog" aria-hidden="true"><i></i></div></div>' +
        '</div></div>';
      report.built.push('ecosystem');
    }

    /* ── FİNAL CTA · karanlık sinematik iletişim alanı ── */
    var ct = frag.querySelector('section[data-n1-contact]');
    if (ct) {
      var ctag = tx(ct.querySelector('.n1ct-tag')), clines = [].map.call(ct.querySelectorAll('.n1ct-line'), tx), cdesc = tx(ct.querySelector('.n1ct-desc'));
      var ca = ct.querySelector('.n1ct-cta'), cimg = ct.querySelector('.n1ct-fig img');
      ct.className = 'm4-ct'; ct.removeAttribute('data-n1-contact'); ct.setAttribute('data-n1m-contact', '');
      ct.innerHTML = (cimg ? '<figure class="m4-ct-fig" aria-hidden="true"><img src="' + esc(cimg.getAttribute('src')) + '" width="734" height="1084" alt="" loading="lazy" decoding="async"></figure>' : '') +
        '<div class="m4-wrap m4-ct-copy">' + eyebrow(ctag, ' lang="en"', '07') +
        '<h2 class="m4-ct-title" id="n1ct-title">' + clines.map(function (l, i) { return '<span class="m4-ln' + (i ? ' m4-acc' : '') + '">' + esc(l) + '</span>'; }).join(' ') + '</h2>' +
        '<p class="m4-ct-desc">' + esc(cdesc) + '</p>' +
        (ca ? '<a class="m4-cta m4-cta--solid" data-link="' + esc(ca.getAttribute('data-link') || '') + '" href="' + esc(ca.getAttribute('href') || '/iletisim') + '"><span>' + esc(tx(ca)) + '</span><span class="m4-cta-ico" aria-hidden="true">' + ARROW + '</span></a>' : '') +
        '</div>';
      report.built.push('contact');
    }

    /* ── DATA TRANSPARENCY · metin karakter karakter aynı (yalnızca sınıflar) ── */
    var ga = frag.querySelector('section[data-n1-gads]');
    if (ga) { ga.classList.add('m4-ga'); ga.removeAttribute('data-n1-gads'); ga.setAttribute('data-n1m-gads', ''); report.built.push('gads'); }

    /* ── Videolar M2/M1: n1-video-m4 için işaret ── */
    ['samuray-video', 'video-bandi'].forEach(function (id) { var s = frag.querySelector('#' + id); if (s) s.classList.add('m4-film-band'); });

    /* ── Mobil anlatı sırası (kimlikler ve içerik aynı; yalnızca sıra) ── */
    var order = ['hero', 'hakkimizda', 'biz-kimiz', 'ekosistem', 'markalar', 'partnerlikler', 'samuray-video', 'gostergeler', 'showreel', 'sektorler', 'video-bandi', 'proje-baslat', 'google-ads-api'];
    var nodes = order.map(function (id) { return main.querySelector('#' + id); }).filter(Boolean);
    nodes.forEach(function (n) { main.appendChild(n); });
    // Perde: hero, sonraki bölümle birlikte bir kapta; hero kap içinde sticky, sonraki bölüm üstüne kayar (ek mesafe yok)
    if (nodes[0] && nodes[0].id === 'hero' && nodes[1]) {
      var cur = document.createElement('div'); cur.className = 'm4-curtain';
      main.insertBefore(cur, nodes[0]); cur.appendChild(nodes[0]); cur.appendChild(nodes[1]);
    }
    main.classList.add('m4-main');
    report.order = nodes.map(function (n) { return n.id; });
    window.__n1m4build = report;
    return report;
  }

  window.N1M4 = { build: build };
})();
