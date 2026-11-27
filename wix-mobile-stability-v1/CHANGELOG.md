# CHANGELOG — Mobile Stability & Technical Optimization

## [V1.1] — 27 Kasım 2026 · aynı dal `mobile-stability-v1-audit`, Draft PR #2

### Eklendi
- `n1-stability-v1.1.js` **v1.1.0** (`4d1b75d`, `1bd1f1e`): kurumsal kapsam (izin + red listesi), yaşam döngüsü temizliği ve tekrarsız BFCache yeniden kurulumu, ayrık video yönetimi, profil geçişi, yalnız ana sayfa ön yüklemesi, `credentials:'omit'`, `?n1diag=1` ile sınırlı ve sekme boyunca kalıcı tanılama, bileşen src koruması.
- `n1-nav-v1.0.3.js`: head satır içi koruma protokolü (`{pending:'1.0.3'}`), çakışma raporu (`__n1NavConflict`), kurumsal kapsam.
- `wix-custom-code/01–05`: üretim (head + body-end), test anahtarı (`?n1v11=1`), geri dönüş (canlıyla birebir).
- `WIX_SUPPORT_REPORT.md`, `MOBILE_MEDIA_BENCHMARK.md`, `proposals/ronin-source-select-proposal.js` (üretimde kullanılmıyor).
- QA: A/B ön yükleme, nav yükleme sırası, test anahtarı, credentials, medya benchmark, birim testi, uzun bekleme süreli 21 döngü.

### Değişti
- Uzak-bırakma (ekran dışı video kaynağını bırakma) **varsayılan kapalı** (`bdd12eb`): 2 eşleştirilmiş WebKit koşusunda süreç belleğini düşürmedi; yalnızca `?n1far=1` ile test cihazında açılır.
- Ön yükleme 36 URL'den yalnız ana sayfanın 21 URL'sine indi (iç sayfa/ortak listeler fayda göstermedi).
- Raporlar: ölçüm kapsamının sınırları açıkça yazıldı; V1.0'daki "birikim yok" ifadesi yalnızca ölçülen sayaçlarla sınırlandırıldı.

### Değişmedi
- Canlıdaki tüm dosyalar, Custom Element etiketleri/adresleri, tasarım, Ronin animasyonu, video kalitesi (2× korunuyor), Header, Footer, SEO, reklam/izleme kodları, Intelligence ve tüm kapsam dışı alanlar. `main`, temiz taban ve kurtarma dalları.

### Bilinen / açık
- Gerçek iPhone/iPad testi yapılmadı; çökmenin çözüldüğü iddia edilmiyor.
- Ronin 2× bellek maliyeti (+58 MB, WebKit) — karar bekliyor.
- Wix ATS çift yüklemesi — Wix desteğe iletilmeli.


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
