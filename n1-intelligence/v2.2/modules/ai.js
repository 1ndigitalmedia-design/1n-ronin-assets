/* 1N INTELLIGENCE — AI Rapor Asistanı (#html16)
   Sözleşme (değişmedi):
     widget → Velo: { action:'askAI', question }
     Velo → widget: { action:'aiAnswer', answer }
   Velo, getAIAnswer() için sayfadaki dashboardContext nesnesini kullanır; bu bileşen veri bağlamı göndermez,
   API anahtarı tutmaz. Analiz yalnızca mevcut backend üzerinden yapılır.
   Ek koruma: tek seferde bir soru; yanıt beklenmiyorken gelen aiAnswer yok sayılır; 60 sn içinde yanıt
   gelmezse hata ve tekrar deneme; bilinen hata metinleri hata olarak gösterilir. */
(function () {
  'use strict';
  var N = window.N1I, esc = N.esc, ui = N.ui;
  var root = document.getElementById('n1i-root');
  var MAX = 500, TIMEOUT = (N.cfg.demo && /[?&]timeout=\d/.test(location.search)) ? N.cfg.responseTimeoutMs : ((N.cfg.options && N.cfg.options.aiTimeoutMs) || 60000);
  var waiting = null, timer = 0, lastQuestion = '', busy = false;
  var ERRORS = ['Bir hata oluştu, lütfen tekrar deneyin.', 'Şu anda cevap veremiyorum, lütfen daha sonra tekrar deneyin.', 'Bağlantı hatası oluştu, lütfen tekrar deneyin.', 'Bir cevap alınamadı.'];
  var SUGGEST = (N.cfg.options && N.cfg.options.suggestions) || [
    'Son 7 günlük reklam performansımı analiz et.',
    'Google Ads ve Meta Ads sonuçlarını karşılaştır.',
    'Web sitemin trafik kaynaklarını değerlendir.',
    'En başarılı kampanyalarımı açıkla.'
  ];

  var MARK = '<span class="n1i-ai__av" aria-hidden="true" translate="no">1N</span>';
  root.innerHTML = '<section class="n1i-module n1i-ai" aria-labelledby="ai-title">' +
    N.header({ icon: 'ai', tone: 'lime', title: 'AI rapor asistanı', meta: ['<span>Bu sayfadaki rapor verileriyle yanıt verir</span>', ui.demoChip()] }) +
    '<div class="n1i-card n1i-ai__card">' +
    '<div class="n1i-ai__intro" id="ai-intro">' + MARK + '<div><p class="n1i-ai__name">1N Asistan</p><p class="n1i-ai__lead">Bu sayfadaki Analytics, Meta Ads, Google Ads, Instagram ve iş takip verileriyle sorularınızı yanıtlar. Veride olmayan bir bilgiyi tahmin etmez.</p></div></div>' +
    '<div class="n1i-ai__log" role="log" aria-live="polite" aria-relevant="additions" aria-label="Sohbet" id="ai-log"></div>' +
    '<div class="n1i-ai__suggest" id="ai-suggest" aria-label="Örnek sorular">' + SUGGEST.map(function (s) { return '<button type="button" class="n1i-ai__chip" data-q="' + esc(s) + '">' + N.icon('chart') + '<span>' + esc(s) + '</span></button>'; }).join('') + '</div>' +
    '<form class="n1i-ai__form n1i-glass" id="ai-form" novalidate><label for="ai-q" class="n1i-sr">Sorunuz</label>' +
    '<textarea id="ai-q" rows="1" maxlength="' + MAX + '" placeholder="Raporlarınızla ilgili bir soru yazın…" autocomplete="off" enterkeyhint="send"></textarea>' +
    '<div class="n1i-ai__bar"><span id="ai-hint">Enter gönderir · Shift+Enter yeni satır</span><span class="n1i-ai__right"><span id="ai-count" class="n1i-num">0 / ' + MAX + '</span>' +
    '<button type="submit" class="n1i-ai__send" id="ai-send" aria-label="Soruyu gönder" disabled>' + N.icon('send') + '</button></span></div></form>' +
    '</div>' +
    '<p class="n1i-summary-text" style="margin-top:12px">Yanıtlar yapay zekâ tarafından üretilir ve yalnızca bu sayfaya yüklenen verilere dayanır. Önemli kararlar öncesinde sayıları ilgili bölümden kontrol edin. DM ve WhatsApp satışları verilerde yer almaz.</p>' +
    '</section>';
  root.querySelector('h2').id = 'ai-title';

  var css = document.createElement('style');
  css.textContent =
    '.n1i-ai__card{display:flex;flex-direction:column;gap:18px}' +
    '.n1i-ai__av{width:34px;height:34px;border-radius:11px;display:grid;place-items:center;flex:none;background:var(--n1i-accent);color:var(--n1i-accent-ink);font-family:var(--n1i-font-display);font-weight:600;font-size:14px;letter-spacing:.02em;box-shadow:inset 0 1px 0 rgba(255,255,255,.5)}' +
    '.n1i-ai__intro{display:flex;gap:14px;align-items:flex-start}' +
    '.n1i-ai__name{margin:2px 0 3px;font-weight:600;font-size:15px}' +
    '.n1i-ai__lead{margin:0;color:var(--n1i-text-2);font-size:15px;line-height:1.6;max-width:68ch}' +
    '.n1i-ai__log{display:flex;flex-direction:column;gap:20px}' +
    '.n1i-ai__log:empty{display:none}' +
    '.n1i-ai__row{display:flex;gap:14px;align-items:flex-start;min-width:0}' +
    '.n1i-ai__row--user{justify-content:flex-end}' +
    '.n1i-ai__body{min-width:0;flex:0 1 auto;max-width:72ch}' +
    '.n1i-ai__meta{display:flex;align-items:baseline;gap:8px;margin:2px 0 4px;font-size:var(--n1i-fs-xs);color:var(--n1i-muted);font-weight:500}' +
    '.n1i-ai__meta b{color:var(--n1i-text);font-size:14px;font-weight:600}' +
    '.n1i-ai__text{font-size:15.5px;line-height:1.68;color:var(--n1i-text);overflow-wrap:anywhere}' +
    '.n1i-ai__text p{margin:0 0 10px}.n1i-ai__text p:last-child{margin:0}' +
    '.n1i-ai__text ul{margin:2px 0 12px;padding-left:20px}.n1i-ai__text li{margin:3px 0}.n1i-ai__text li::marker{color:var(--n1i-accent-text)}' +
    '.n1i-ai__text b{font-weight:600}' +
    '.n1i-ai__bubble{max-width:min(620px,86%);padding:12px 16px;border-radius:20px 20px 6px 20px;background:var(--n1i-bubble-user);color:var(--n1i-bubble-user-text);font-size:15.5px;line-height:1.55;overflow-wrap:anywhere;box-shadow:0 1px 2px rgba(0,0,0,.08),0 8px 20px -8px rgba(0,0,0,.25)}' +
    '.n1i-ai__bubble p{margin:0}' +
    '.n1i-ai__typing{display:inline-flex;align-items:center;gap:10px;color:var(--n1i-text-2);font-size:15px;padding:6px 0}' +
    '.n1i-ai__dots{display:inline-flex;gap:4px}.n1i-ai__dots i{width:6px;height:6px;border-radius:50%;background:var(--n1i-accent-text);opacity:.35;animation:n1i-dot 1.1s ease-in-out infinite}' +
    '.n1i-ai__dots i:nth-child(2){animation-delay:.15s}.n1i-ai__dots i:nth-child(3){animation-delay:.3s}' +
    '@keyframes n1i-dot{0%,80%,100%{opacity:.3;transform:translateY(0)}40%{opacity:1;transform:translateY(-2px)}}' +
    '.n1i-ai__err{border-radius:16px;padding:12px 14px;background:var(--n1i-neg-bg);color:var(--n1i-text);display:flex;gap:10px;align-items:flex-start}' +
    '.n1i-ai__err > svg{width:18px;height:18px;color:var(--n1i-neg);flex:none;margin-top:3px}' +
    '.n1i-ai__err p{margin:0 0 8px}' +
    '.n1i-ai__suggest{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:10px}' +
    '.n1i-ai__chip{appearance:none;display:flex;align-items:center;gap:10px;border:1px solid var(--n1i-line);background:var(--n1i-surface);color:var(--n1i-text);border-radius:16px;padding:12px 14px;font-size:14px;font-weight:500;line-height:1.35;text-align:left;min-height:52px;transition:border-color var(--n1i-dur-fast) var(--n1i-ease),background-color var(--n1i-dur-fast) var(--n1i-ease),transform var(--n1i-dur-fast) var(--n1i-ease)}' +
    '.n1i-ai__chip svg{width:16px;height:16px;flex:none;color:var(--n1i-accent-text)}' +
    '.n1i-ai__chip:hover{border-color:var(--n1i-line-strong);background:var(--n1i-surface-2)}.n1i-ai__chip:active{transform:scale(.99)}' +
    '.n1i-ai__chip:disabled{opacity:.5;cursor:not-allowed}' +
    '.n1i-ai__form{border-radius:24px;padding:10px 10px 10px 16px;display:grid;gap:4px}' +
    '.n1i-ai__form textarea{width:100%;min-height:48px;max-height:180px;resize:none;border:0;background:transparent;color:var(--n1i-text);padding:10px 0 4px;font-size:16px;line-height:1.5;outline:none}' +
    '.n1i-ai__form textarea::placeholder{color:var(--n1i-muted)}' +
    '.n1i-ai__form:focus-within{border-color:var(--n1i-accent-ring);box-shadow:0 0 0 3px var(--n1i-accent-soft),var(--n1i-shadow-glass)}' +
    '.n1i-ai__bar{display:flex;align-items:center;justify-content:space-between;gap:10px;color:var(--n1i-muted);font-size:var(--n1i-fs-xs);font-weight:500}' +
    '.n1i-ai__right{display:inline-flex;align-items:center;gap:12px}' +
    '.n1i-ai__send{width:44px;height:44px;border-radius:50%;border:0;display:grid;place-items:center;background:var(--n1i-ink);color:var(--n1i-on-ink);transition:transform var(--n1i-dur-fast) var(--n1i-ease),opacity var(--n1i-dur-fast) var(--n1i-ease),background-color var(--n1i-dur-fast) var(--n1i-ease)}' +
    '.n1i-ai__send svg{width:18px;height:18px}' +
    '.n1i-ai__send:hover:not(:disabled){background:var(--n1i-ink-hover)}.n1i-ai__send:active:not(:disabled){transform:scale(.94)}' +
    '.n1i-ai__send:disabled{opacity:.32;cursor:not-allowed}' +
    '.n1i-ai__send:focus-visible{outline-offset:3px;border-radius:50%}' +
    '@media (prefers-reduced-motion:reduce){.n1i-ai__dots i{animation:none;opacity:.8}}' +
    '@media (max-width:479px){#ai-hint{display:none}.n1i-ai__bar{justify-content:flex-end}.n1i-ai__row{gap:10px}.n1i-ai__av{width:30px;height:30px;font-size:13px;border-radius:10px}.n1i-ai__text{font-size:15.5px}.n1i-ai__suggest{grid-template-columns:1fr}.n1i-ai__bubble{max-width:92%}}';
  document.head.appendChild(css);

  var intro = document.getElementById('ai-intro'), log = document.getElementById('ai-log'), form = document.getElementById('ai-form'), ta = document.getElementById('ai-q'), send = document.getElementById('ai-send'), count = document.getElementById('ai-count');

  /* Güvenli biçim: önce kaçış, sonra yalnızca **kalın**, satır ve madde işaretleri. HTML yorumlanmaz. */
  function formatAnswer(text) {
    var lines = String(text || '').replace(/\r/g, '').split('\n'), out = [], list = null;
    lines.forEach(function (l) {
      var t = l.trim();
      var li = t.match(/^[-*•]\s+(.*)$/) || t.match(/^\d+[.)]\s+(.*)$/);
      if (li) { if (!list) { list = []; } list.push(li[1]); return; }
      if (list) { out.push('<ul>' + list.map(function (x) { return '<li>' + inline(x) + '</li>'; }).join('') + '</ul>'); list = null; }
      if (t) out.push('<p>' + inline(t) + '</p>');
    });
    if (list) out.push('<ul>' + list.map(function (x) { return '<li>' + inline(x) + '</li>'; }).join('') + '</ul>');
    return out.join('');
  }
  function inline(t) { return esc(t).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/^#{1,4}\s*/, ''); }

  function now() { return N.fmt.timeTR(new Date()); }
  function add(kind, html, extra) {
    var div = document.createElement('div');
    if (kind === 'user') {
      div.className = 'n1i-ai__row n1i-ai__row--user';
      div.innerHTML = '<div class="n1i-ai__bubble"><span class="n1i-sr">Siz: </span>' + html + '</div>';
    } else {
      div.className = 'n1i-ai__row' + (extra ? ' ' + extra : '');
      div.innerHTML = MARK + '<div class="n1i-ai__body"><div class="n1i-ai__meta"><b>1N Asistan</b><span>' + now() + '</span></div><div class="n1i-ai__text">' + html + '</div></div>';
    }
    log.appendChild(div);
    intro.hidden = true;
    N.motion.enter([div]);
    N.height.schedule();
    return div;
  }
  function setBusy(b) {
    send.disabled = b || !ta.value.trim(); ta.setAttribute('aria-busy', String(b)); busy = b;
    document.querySelectorAll('.n1i-ai__chip').forEach(function (c) { c.disabled = b; });
  }
  function ask(q) {
    q = String(q || '').trim().slice(0, MAX);
    if (!q || waiting) return;
    lastQuestion = q;
    add('user', '<p>' + esc(q) + '</p>');
    ta.value = ''; resize(); updateCount();
    setBusy(true);
    waiting = add('ai', '<span class="n1i-ai__typing" role="status"><span class="n1i-ai__dots" aria-hidden="true"><i></i><i></i><i></i></span>Veriler inceleniyor, yanıt hazırlanıyor…</span>');
    clearTimeout(timer);
    timer = setTimeout(function () { fail('Yanıt ' + Math.round(TIMEOUT / 1000) + ' saniye içinde gelmedi.'); }, TIMEOUT);
    if (!N.bridge.send({ action: 'askAI', question: q })) fail('Bu bileşen bir Wix sayfasına yerleştirilmediği için soru gönderilemedi.');
  }
  function fail(reason) {
    clearTimeout(timer);
    if (waiting) { waiting.remove(); waiting = null; }
    add('ai', '<div class="n1i-ai__err" role="alert">' + N.icon('error') + '<div><p><b>Yanıt alınamadı.</b> ' + esc(reason) + '</p><button type="button" class="n1i-btn n1i-btn--sm" data-retry>' + N.icon('refresh') + 'Tekrar dene</button></div></div>', 'n1i-ai__row--err');
    setBusy(false);
  }
  function answer(text) {
    if (!waiting) return; // beklenmeyen veya tekrar eden yanıt
    clearTimeout(timer);
    waiting.remove(); waiting = null;
    var s = String(text || '').trim();
    if (!s || ERRORS.indexOf(s) > -1) { fail(s || 'Boş yanıt geldi.'); return; }
    add('ai', formatAnswer(s));
    setBusy(false);
    /* Mobilde klavyeyi yeniden açmamak için yalnızca işaretçi olan cihazlarda odak */
    if (window.matchMedia && window.matchMedia('(pointer:fine)').matches) ta.focus({ preventScroll: true });
  }
  function resize() { ta.style.height = 'auto'; ta.style.height = Math.min(ta.scrollHeight, 180) + 'px'; N.height.schedule(); }
  function updateCount() { count.textContent = ta.value.length + ' / ' + MAX; if (!busy) send.disabled = !ta.value.trim(); }

  form.addEventListener('submit', function (e) { e.preventDefault(); ask(ta.value); });
  ta.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) { e.preventDefault(); ask(ta.value); } });
  ta.addEventListener('input', function () { resize(); updateCount(); });
  root.addEventListener('click', function (e) {
    var c = e.target.closest('[data-q]'); if (c) { ask(c.getAttribute('data-q')); return; }
    var r = e.target.closest('[data-retry]'); if (r) { var m = r.closest('.n1i-ai__row'); if (m) m.remove(); var u = log.querySelectorAll('.n1i-ai__row--user'); if (u.length) u[u.length - 1].remove(); ask(lastQuestion); }
  });

  N.height.start(root);
  N.bridge.listen(function (d) { answer(d.answer); }, {
    accept: function (d) { return d.action === 'aiAnswer' && (typeof d.answer === 'string' || d.answer === undefined || d.answer === null); },
    dedupe: function () { return false; }
  });
})();
