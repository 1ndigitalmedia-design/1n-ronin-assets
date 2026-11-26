# CHANGELOG — Mobile Stability & Technical Optimization V1.0

## [V1.0] — 26 Kasım 2026 · dal `mobile-stability-v1-audit` (taban `876de80`)

### Eklendi
- `wix-mobile-stability-v1/n1-stability-v1.js` **v1.0.0** (`bbdea4a`, `2154e7e`) — site geneli mobil/tablet kararlılık katmanı:
  - `pagehide`'da 1N videolarının kaynağını bırakma, `pageshow(persisted)`'ta geri yükleme (F-01).
  - Ekranın ≈1,5 ekran dışında ≥4 sn duraklatılmış videoların kaynağını bırakma / yaklaşınca geri yükleme, `play()` güvenliği (F-02).
  - Ortak ve sayfaya özgü canlı bağımlılıkları Wix hidrasyonu sırasında önbelleğe ısıtma (F-04): ana sayfa header'ı −1,8 / −2,2 sn.
  - `?n1diag=1` tanılama, `window.__n1Stability.report()` (F-06).
- `wix-mobile-stability-v1/n1-nav-v1.0.2.js` (`102b76a`) — Wix ATS yeniden yüklemesinde `/#hizmetler-ozet` çapasının korunması (F-03).
- `wix-studyo-v1/site/n1-inner-responsive-v6.css` (`dd8e6d4`) — canlı iç sayfa bağımlılığı, `09612df9` ile bayt düzeyinde aynı (F-05).
- `wix-mobile-stability-v1/qa/` — test betikleri ve ham ölçüm sonuçları.
- Raporlar: AUDIT_REPORT, ROOT_CAUSE_ANALYSIS, FIX_REPORT, TEST_REPORT, PERFORMANCE_REPORT, DEPENDENCY_MAP, DEPLOYMENT, ROLLBACK, CHANGELOG.

### Değişmedi
- Canlıda kullanılan hiçbir dosya; tüm Custom Element etiketleri ve Server URL'leri; tasarım, metin, bağlantı, SEO, reklam/izleme kodları, Ronin animasyonu ve video kalitesi.
- `n1-intelligence/`, Intelligence Dashboard, müşteri verileri, giriş sistemi, Google Ads API, Wix backend.
- `main`, `mobile-stability-clean-base-20261126` ve kurtarma dalları.

### Silinmedi
- Hiçbir dosya ya da klasör silinmedi. Eski sürüm klasörlerinin silinmesi, canlı bağımlılık haritası (DEPENDENCY_MAP.md) onaylanana kadar ertelendi.

### Bilinen / açık
- Sorun 01: gerçek iPhone'da doğrulanmadı. Emülasyonda bellek etkisi gürültü düzeyinde (ROOT_CAUSE_ANALYSIS.md §4).
- Sorun 05: emülasyonda yeniden üretilemedi.
- Wix kaynaklı: ATS çift yüklemesi, View Transition `AbortError`.
- Onay bekleyen öneriler: PERFORMANCE_REPORT.md §4.
