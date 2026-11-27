# WIX_SUPPORT_REPORT — Geri/ileri gezinmesinde zorunlu ikinci sayfa yüklemesi (ATS)

Bu belge Wix Teknik Destek'e gönderilmek üzere hazırlandı. Türkçe özet + İngilizce destek metni içerir. Wix güvenlik mekanizmasını devre dışı bırakma ya da atlatma girişiminde bulunulmadı; yalnızca gözlem ve ölçüm yapıldı.

## 1. Özet (TR)
Sitede, tarayıcının geri/ileri tuşuyla dönülen ve BFCache'ten geri yüklenmeyen her sayfa, Wix'in satır içi `handleAccessTokens` betiği tarafından yaklaşık 200 ms içinde `location.reload()` ile **ikinci kez** yükleniyor (60 sn içinde en fazla 3 kez). Mobil cihazlarda bu, geri dönüşlerde ek ağ, CPU ve bellek tüketimine yol açıyor. iPhone'da tekrarlı gezinmede "Bu sayfa pek çok hata ile karşılaştı" uyarısı alıyoruz; bu yüklemenin uyarıya katkısını gerçek cihazda kanıtlayamadık, ancak emülasyonda ölçülebilir bellek artışı gördük.

## 2. Support ticket text (EN)

**Subject:** Back/forward navigation triggers a forced second page load (handleAccessTokens / "ATS") — mobile memory impact

**Site:** https://www.reklam1n.com/ · metaSiteId `68eed891-1403-4fc9-8313-82bd30dae05e` · observed site revision `2810` · observed 26–27 Nov 2026

**What happens**
1. Open any page (e.g. `/`), navigate to another page (e.g. `/kreatif-produksiyon`), press the browser Back button.
2. When the page is not restored from the back/forward cache, the document loads with `PerformanceNavigationTiming.type === "back_forward"`.
3. About 200 ms later the inline script `handleAccessTokens.inline.473e3296.bundle.min.js` calls `window.location.reload()`; the page loads a second time (`type === "reload"`).
4. This repeats up to 3 times per 60 s (counter in `sessionStorage["reload"]`, format `<timestamp>-<count>`); afterwards the console shows `ATS: Max reload attempts reached`.

**Relevant code (as served inline, minified):**
```
let S="client-session-bind",T="sec-fetch-unsupported" …
$=(t=m(S,k), m(T,k)||t ? w("removeItem")
   : (performance.getEntriesByType("navigation")[0]?.type==="back_forward")
     && (counter<3 ? (w("setItem",`${Date.now()}-${counter+1}`), window.location.reload())
                   : console.error("ATS: Max reload attempts reached")))
```
The reload happens when neither the `client-session-bind` nor the `sec-fetch-unsupported` cookie is present on a back/forward navigation.

**Evidence (automated browsers, no extensions)**

| Engine | Trace (sessionStorage-persisted event log) |
|---|---|
| Chromium 158 (Playwright) | `/kisaca-biz init nav=back_forward t=48ms` → `pagehide t=246ms` → `/kisaca-biz init nav=reload t=199ms` → `pageshow` |
| WebKit 26.6 (Playwright, Linux) | `/kisaca-biz init t=156` → `beforeunload t=229` → `/kisaca-biz init t=75` → `pageshow` (second document) |

Measured impact (WebKit, single WebContent process RSS, home ↔ service page, 10 round trips):
- navigation via `page.goto` (no back/forward): 742 → 890 MB (plateau)
- navigation via click + Back: 992 → 1136 MB (still rising); the forced reload occurred on 4 of 10 Back navigations.

Every Back navigation that is not served from bfcache therefore costs two full document loads (HTML, Wix runtime, custom elements, media requests) on mobile devices.

**Questions**
1. Is this reload the intended behaviour for back/forward navigations on sites without members login on the page?
2. Can the access tokens be refreshed without a full document reload (e.g. a fetch to `accessTokensUrl`), or can the document be made eligible for the back/forward cache so the reload is not needed?
3. Is there a supported site setting to reduce this behaviour on mobile? (We do **not** want to disable any security feature; we ask for the recommended configuration.)
4. Is the response header `cache-control: public,max-age=0,must-revalidate` on the HTML related to the missing `client-session-bind` cookie on history navigations?

**Environment notes:** Reproduced in Chromium and WebKit automation; physical iPhone (Safari and Chrome) shows "This webpage was reloaded because a problem occurred / A problem repeatedly occurred" after several home ↔ service page round trips. Custom Elements (third-party code hosted on jsDelivr) are used on these pages; the forced reload happens before any custom element code runs.

## 3. Ekler (bu depoda)
- `qa/scripts/bfprobe2.js` — olay izi betiği · `qa/scripts/growth2.js` — goto ↔ geri bellek karşılaştırması
- `qa/results/wix-custom-code-live.json` — canlı özel kod girişleri
- Göndermeden önce: kendi iPhone'unuzdan bir ekran kaydı ve, varsa, Safari Web Inspector konsol çıktısı (`ATS: Max reload attempts reached` satırı) eklenmesi önerilir.

## 4. Bizim tarafımızda yapılan
- Hiçbir Wix güvenlik ayarı ya da çerezi değiştirilmedi, atlatılmadı.
- Yalnızca ATS'nin 1N navigasyon modülündeki yan etkisi giderildi: yeniden yükleme artık "kullanıcı yenilemesi" sanılmıyor (nav v1.0.2/1.0.3).
