#!/usr/bin/env python3
"""V1.4 kabul testi üretici: güvenilir V1.3.2 denetleyicisinden (n1-stress-v2.js @fca8623, değiştirilmeden) n1-accept-v14.js üretir.
Denetleyici mantığı (kira, rev, kuşak, sınıflandırma, location.replace kurtarma) birebir korunur; yalnız plan, otomatik başlatma,
V1.4 yapılandırma denetimleri ve rapor eklenir. Her değişiklik tam bir kez eşleşmeli."""
import os,sys
R=os.path.abspath(os.path.join(os.path.dirname(__file__),'..','..'))
s=open(os.path.join(R,'wix-global-stability-v13','stress','n1-stress-v2.js'),encoding='utf-8').read()
def rep(o,n,cnt=1):
    global s
    c=s.count(o)
    if c!=cnt: sys.exit('eşleşme %d≠%d: %r'%(c,cnt,o[:80]))
    s=s.replace(o,n)
def repall(o,n):
    global s
    if o not in s: sys.exit('yok: %r'%o)
    s=s.replace(o,n)
head_old=s[:s.index("(function () {")]
s=s[len(head_old):]
s='''/*!
 * n1-accept v14.0.0 — 1N Digital Media · V1.4 tek bağlantılı otomatik kabul testi (fiziksel iPhone / iPad / Android)
 * Kaynak: n1-stress-v2.js 2.0.0 (V1.3.2, @fca8623) — denetleyici çekirdeği değiştirilmeden (tools/build_accept.py ile üretilir).
 * Açılış: https://www.reklam1n.com/?n1t=kabul14  (test anahtarı v14 gerekir). Normal ziyaretçide hiçbir şey yüklenmez.
 * Plan: tek varyant "V1.4 üretim yapılandırması" (stabilite kapalı, Ronin 2×, loader açık) × 7 hizmet sayfası × {normal (sona kadar kaydır + geri), erken geri 1 sn}
 *       = 14 adım, tahmini 10–12 dk. Otomatik başlar: ana sayfa video ön kontrolü → plan → rapor.
 * Ek ölçüm (her hizmet sayfası, sona kaydırıldıktan sonra): hafif profil mi, V1.4 kodu yüklendi mi, kaynaklı video sayısı (beklenen en çok),
 *       WebP kare sayısı / yüklenen / kırık. Ana sayfa: video modülü v14, "Hikâyemizin Devamı" hedefi.
 * Ölçülemeyenler: bellek, GPU, kesin çökme nedeni (çökme yalnız "aday" olarak çıkarılır).
 */
'''+s
rep("if (window.__n1Stress2) return;","if (window.__n1Kabul14) return;")
rep("var VERSION = '2.0.0';","var VERSION = '14.0.0';")
repall("window.__n1Stress2","window.__n1Kabul14")
repall("'n1s2-","'n1k4-")
repall("'n1t-stress2'","'n1t-kabul14'")
repall("'N1 STRES ' + VERSION","'N1 KABUL V1.4 · ' + VERSION")
# plan: tek varyant
i=s.index("  var VARIANTS = {");j=s.index("  };",i)+4
s=s[:i]+"""  var VARIANTS = {
    P: { label: 'P · V1.4 üretim yapılandırması (stabilite kapalı, Ronin 2×, loader açık)', flags: {}, video: true }
  };"""+s[j:]
rep("var DEFAULT = { vars: ['B', 'D', 'R2', 'RP'], pages: ['/reklam-yonetimi', '/kreatif-produksiyon'], scen: ['n', 'e1000'], rep: 3 };",
    "var DEFAULT = { vars: ['P'], pages: ALL_PAGES.slice(), scen: ['n', 'e1000'], rep: 1 };")
# V1.4 denetimleri
rep("  function waitReady(cb, maxMs) {","""  /* ---------- V1.4 yapılandırma denetimi ---------- */
  var LITE = (function () { try { return matchMedia('(any-pointer: coarse) and (max-width: 1366px)').matches || matchMedia('(max-width: 900px) and (hover: none)').matches; } catch (e) { return false; } })();
  var MAXSRC = { '/kreatif-produksiyon': 1, '/e-ticaret-yonetimi': 1, '/sosyal-medya': 1, '/reklam-yonetimi': 1, '/ui-ux-tasarim': 0, '/yapay-zeka': 1, '/uygulama-gelistirme': 1 };
  function v14res() { try { return performance.getEntriesByType('resource').map(function (e) { return e.name; }); } catch (e) { return []; } }
  function v14page() {
    var vs = [].slice.call(document.querySelectorAll('video')), im = [].slice.call(document.querySelectorAll('img[data-n1-still]')), rs = v14res();
    var o = { lite: LITE ? 1 : 0, code: rs.some(function (n) { return /wix-mobile-performance-v14\\/pages\\//.test(n); }) ? 1 : 0, vids: vs.length,
      vSrc: vs.filter(function (v) { return !!(v.currentSrc || v.getAttribute('src')); }).length, max: MAXSRC[curPath()],
      stills: im.length, stillsOk: im.filter(function (i) { return i.complete && i.naturalWidth > 0; }).length,
      stillsBroken: im.filter(function (i) { return i.complete && i.naturalWidth === 0 && (i.currentSrc || i.getAttribute('src')); }).length,
      mp4: rs.filter(function (n) { return /\\.mp4(\\?|$)/.test(n); }).length };
    o.ok = (!LITE || (o.code && o.vSrc <= o.max && o.stills > 0 && !o.stillsBroken)) ? 1 : 0; return o;
  }
  function v14home() {
    var a = document.querySelector('a.n1ab-cta, a.m4-link[href*="kisaca"], a.m4-link[href*="studyo"]'), rs = v14res();
    var o = { m5v14: rs.some(function (n) { return /n1-video-m5-v14\\.js/.test(n); }) ? 1 : 0, home659: rs.some(function (n) { return /n1-site-wix-v659\\.js/.test(n); }) ? 1 : 0, cta: a ? a.getAttribute('href') : null };
    o.ok = (o.m5v14 && (!a || o.cta === '/kisaca-biz')) ? 1 : 0; return o;
  }
  function waitReady(cb, maxMs) {""")
rep("putResult(A, { homeReady: rd, homeVid: vs, videoOk: ok ? 1 : 0 });","putResult(A, { homeReady: rd, homeVid: vs, videoOk: ok ? 1 : 0, v14h: v14home() });")
rep("putResult(A, { scroll: { steps: n, ms: Date.now() - t0, y: Math.round(scrollY), H: H }, pageT: timing(), pageVidEnd: ve, errs: errs() });",
    "putResult(A, { scroll: { steps: n, ms: Date.now() - t0, y: Math.round(scrollY), H: H }, pageT: timing(), pageVidEnd: ve, errs: errs(), v14: v14page() });")
# otomatik başlatma: ana sayfada kurulum ekranı ilk kez açıldığında ön kontrol → başlat
rep("  function showSetup() {\n","""  var AUTO = (function () { try { var a = sessionStorage.getItem('n1k4-auto') === '1'; if (a) sessionStorage.removeItem('n1k4-auto'); return a; } catch (e) { return false; } })();
  function showSetup() {
    if (AUTO && curPath() === HOME) { AUTO = false; lsDel(K.pre); var tw = Date.now();   // kahraman videosu oluşana kadar bekle (en çok 25 sn), sonra ön kontrol → otomatik başlat
      (function waitHero() { var H = heroEl(); if ((H && H.v) || Date.now() - tw > 25000) return preflight(true); setTimeout(waitHero, 500); })(); }
""")
rep("  function preflight() {","  function preflight(auto) {")
rep("var H = heroEl(); if (!H || !H.v) { jset(K.pre, { autoplay: false, summary: 'hero video bulunamadı (masaüstü düzeni?)', t: Date.now() }); return showSetup(); }",
    "var H = heroEl(); if (!H || !H.v) { jset(K.pre, { autoplay: false, summary: 'hero video bulunamadı (masaüstü düzeni?)', t: Date.now() }); showSetup(); if (auto) { note('Kahraman videosu bulunamadı · test 3 sn içinde başlıyor (video sonucu geçersiz işaretlenir)'); setTimeout(function () { if (!readState() || !readState().run) startRun(DEFAULT, jget(K.pre, null)); }, 3000); } return; }")
rep("      jset(K.pre, o); ev('preflight', o); showSetup();\n","""      jset(K.pre, o); ev('preflight', o); showSetup();
      if (auto) { note(ok ? 'Video doğrulandı · test 2 sn içinde başlıyor' : 'Otomatik oynatma doğrulanmadı · 20 sn içinde "Dokunarak dene" ile ayırt edebilirsiniz; test yine başlayacak (video sonucu geçersiz işaretlenir)');
        setTimeout(function () { if (!readState() || !readState().run) startRun(DEFAULT, jget(K.pre, null)); }, ok ? 2000 : 20000); }
""")
# rapor
rep("out.push('# 1N V1.3.2 mobil stres testi — sonuç raporu');","out.push('# 1N V1.4 kabul testi — sonuç raporu');")
rep("    out.push('## Sorunlu denemeler');","""    var first1 = A.filter(function (x) { return x.attempt === 1; }), tE = A.map(function (x) { return x.tEnd || 0; }).reduce(function (a, b) { return Math.max(a, b); }, 0);
    out.push('## Süre');
    out.push('Başlangıç ' + (s0 && s0.startedAt ? new Date(s0.startedAt).toISOString() : '-') + ' · son deneme bitişi ' + (tE ? new Date(tE).toISOString() : '-') + ' · **gerçek süre ' + (s0 && s0.startedAt && tE ? ((tE - s0.startedAt) / 60000).toFixed(1) + ' dk' : '-') + '**');
    out.push('');
    out.push('## V1.4 yapılandırma doğrulaması (normal senaryo, 1. denemeler)');
    out.push('| Sayfa | Hafif profil | V1.4 kodu | Kaynaklı video / en çok | mp4 isteği | Kare (yüklenen/toplam, kırık) | Sonuç |'); out.push('|---|---|---|---|---|---|---|');
    ALL_PAGES.forEach(function (p) { var x = first1.filter(function (y) { return y.p === p && y.v14; })[0]; if (!x) return out.push('| ' + p + ' | – | – | – | – | – | ölçülmedi |'); var q = x.v14;
      out.push('| ' + p + ' | ' + (q.lite ? 'evet' : 'hayır (masaüstü: video beklenir)') + ' | ' + (q.code ? 'evet' : '**HAYIR**') + ' | ' + q.vSrc + ' / ' + q.max + ' | ' + q.mp4 + ' | ' + q.stillsOk + '/' + q.stills + ', ' + q.stillsBroken + ' | ' + (q.ok ? 'GEÇTİ' : '**KALDI**') + ' |'); });
    var hh = A.filter(function (x) { return x.v14h; }), h0 = hh[0] && hh[0].v14h;
    out.push(''); out.push('Ana sayfa: video modülü v14 ' + (h0 ? (h0.m5v14 ? 'yüklü' : '**YOK**') : '–') + ' · ana sayfa v659 ' + (h0 ? (h0.home659 ? 'yüklü' : 'görülmedi') : '–') + ' · "Hikâyemizin Devamı" → ' + (h0 ? (h0.cta || 'bağlantı bulunamadı') : '–') + ' · ' + hh.filter(function (x) { return x.v14h.ok; }).length + '/' + hh.length + ' ölçüm GEÇTİ');
    out.push('');
    out.push('## Sorunlu denemeler');""")
rep("'1N stres testi V1.3.2'","'1N V1.4 kabul testi'")
repall("'n1-stres2-'","'n1-kabul14-'")
rep("if (confirm('Kaydedilmiş bütün V1.3.2 sonuçları silinsin mi?'))","if (confirm('Kaydedilmiş bütün V1.4 kabul sonuçları silinsin mi?'))")
out=os.path.join(R,'wix-mobile-performance-v14','acceptance','n1-accept-v14.js')
open(out,'w',encoding='utf-8').write(s);print('yazıldı',out,len(s))
