# CHANGELOG — V1.3 Global Stability & UI Fix

## [V1.3] — 27 Kasım 2026 · dal `mobile-stability-v1-audit`, Draft PR #2
Önceki sürümler: `wix-mobile-stability-v1/CHANGELOG.md` (V1.0–V1.2).

### Eklendi
- `n1-menu-close-v13.js` (`bb6ebc7`) — menü açıkken başka belgeye giden bağlantıda, `pageswap`/`pagehide`'da geçişsiz tam kapanış; BFCache dönüşünde doğrulama (P01). Wix Body-end girişi: `wix-custom-code/MENU-CLOSE-v13-body-end.html`.
- `home/n1-video-m5-v13.js` (`5c1bcf2`) — engellenmiş oynatmada dokunuşla yeniden deneme, bağlantı/düğme/form dokunuşlarını yok sayar (P02-A).
- `home/n1-site-wix-v658.js` (`b9c8fca`) — v657 + yalnız video modülü v13. Etiket `n1-site-v1`.
- `pages/wix-e-ticaret-yonetimi-v24/n1-e-ticaret-yonetimi-v24.js` (`997f951`) — v23 + yalnız `:491` filtre hedefi `none` → `grayscale(0) brightness(1)` (P02-B, WebKit çökmesi). Etiket `n1-e-ticaret-yonetimi-v23` değişmedi.
- `pages/wix-uiux-tasarim-v29/n1-uiux-tasarim-v29.js` (`d33a9ff`) — v28 + yalnız `.ux-screen--acc` başlangıç filtresi `grayscale(0)` (gri önizleme `grayscale(0) ↔ grayscale(1)`, `.4s` / `var(--ease)` aynı; P02-C, WebKit çökmesi). Etiket `n1-uiux-tasarim-v28` değişmedi.
- `wix-custom-code/LOADER-v13-ozel-yukleniyor.html` — ana sayfa rotası, View Transition katmanı, süresiz yoklama yok, BFCache temizliği, test kapatma (P04/P05). Canlının birebir yedeği: `LOADER-LIVE-BACKUP-ozel-yukleniyor.html`.
- `wix-custom-code/TEST-SWITCH-v13-head.html` — sekme bazlı varyantlar A–F, Ronin kaynak seçimi (2×/1,5×/1×/poster), tanılama kutusu (gerçek `currentSrc`, olası çökme kaydı). Normal ziyaretçide etkisiz.
- `test-media/ronin-m5-film-1.5x.mp4` (`756d6f8`) — yalnız test.
- `wix-custom-code/verify-cdn-v13.sh` — 20× 200/206 + bayt karşılaştırması.
- Raporlar: V1.3_ISSUE_REPORT, ROOT_CAUSE_ANALYSIS, MENU_FIX_REPORT, LOADER_FIX_REPORT, MOBILE_STABILITY_REPORT, MOBILE_MEDIA_BENCHMARK, TEST_REPORT, PERFORMANCE_REPORT, DEPLOYMENT (iPhone/iPad kabul listesi dahil), ROLLBACK.
- QA: `qa/` (betikler ve ham sonuçlar).

### Değişti (yalnız Wix'te uygulanınca)
- Ana Sayfa, E-Ticaret Yönetimi ve UI/UX Tasarım Custom Element Server URL'leri (etiketler aynı).
- "Özel Yükleniyor % Script" içeriği.
- "1N - Hizmetler Capa Navigasyonu" girişinin kaldırılması (V1.2'de planlanmıştı, canlıda hâlâ etkin).

### Bulundu
- Capa navigasyonu canlıda hâlâ etkin (devre dışı bildirilmişti).
- Playwright WebKit'te `filter: grayscale(…)` → `none` geçişi sekmeyi çökertiyor (bağımsız sayfada yeniden üretildi). E-Ticaret'te kaydırmayla, UI/UX'te "Gri tonlamalı önizle" anahtarıyla tetikleniyor.
- Önceki döngü testlerinin %20'lik atlamalı kaydırması bu hatayı yakalayamıyordu → kademeli kaydırma regresyonu eklendi.
- İki loader girişi kesişmeyen sayfalarda (müşteri sayfalarındaki giriş kapsam dışı).
- E-Ticaret 30,5 MP / ~29 MB görsel indiriyor (orijinal boyutlu küçük resimler).

### Değişmedi
- Ronin 2× kalite; stabilite modülü üretimde kapalı (yalnız test seçeneği).
- Tasarımlar, içerikler, tipografi, GSAP animasyonları, Header/Footer, Hizmetler bölümü ve 7'li alt menü, SEO, Google Ads / Meta Pixel.
- Diğer 12 sayfanın Custom Element adresleri; "Sayfa Yükleniyor Script" (müşteri sayfaları).
- `main`, `mobile-stability-clean-base-20261126`, `sitewide-mobile-fix-20261126`; Intelligence, müşteri panelleri, Wix backend deposu. Hiçbir dosya silinmedi.

### Açık
- Fiziksel iPhone/iPad doğrulaması: hiçbir mobil çökme çözülmüş olarak raporlanmıyor.
- Öneriler (yapılmadı): E-Ticaret küçük resimlerini Wix boyutlandırma adresleriyle sunmak; ana sayfa loader içerik sınırını 8 sn'den kısaltmak; hizmet sayfalarına `pagehide`'da video bırakma (stabilite modülü D ile cihazda test edilecek).
