# DEPLOYMENT

## V1.2 — Global Menü ve Navigasyon Revizyonu (27 Kasım 2026)

**Wix'te hiçbir şey değiştirilmedi.** Aşağıdaki adımlar onayınla, sırayla ve **her aşamada tek değişiklik** olacak şekilde uygulanır. Her aşamadan sonra fiziksel iPhone/iPad testi yapılır (TEST_REPORT.md V1.2 §6). Ayrıntılı gerekçe: `wix-global-menu-v12/NAVIGATION_REVISION_REPORT.md`.

Commit'ler: header/markup v12 **`162599ec580db98d848cf6670bcde7ee30bf97f5`** · sayfa dosyaları **`39f762f63a2af58a470e9712d8ca0895d6f73f9f`** · stabilite v1.1.1 **`be0c8b1454939989d175197be4ff6667f9e29c19`**.

### Ön kontrol (her aşamadan önce, zorunlu)
```bash
bash wix-global-menu-v12/wix-custom-code/verify-cdn.sh
```
Tüm adresler 20/20 olmalı. jsDelivr, 50 MB'ı aşan bu depoda yeni adresleri ilk dakikalarda bazı uç sunuculardan 403 ile döndürebiliyor; gözlenen ısınma süresi ~1 dk.

### Aşama 0 — Temizlik (canlıyı planlanan "A" durumuna döndürür)
Canlıda şu an hatalı V1.1 test girişleri var (NAVIGATION_REVISION_REPORT §0). Wix Studio → Site Ayarları → Özel Kod:
1. **Sil:** Konumu **Head** olan "1N - Hizmetler Capa Navigasyonu" girişi.
2. **Sil:** "1N - V1.1 Test Anahtarı (HEAD)" girişi.
3. **Bırak:** Konumu **Body - end** olan "1N - Hizmetler Capa Navigasyonu" girişi; içeriği `wix-mobile-stability-v1/wix-custom-code/05-rollback-body-end.html` ile birebir aynı olmalı.
4. Yayınla. → Senaryo A (mevcut canlı navigasyon). İsteğe bağlı: bu durumda bir cihaz tabanı ölçümü.

### Aşama B — Yeni menü, özel nav yok, stabilite yok
1. Aşağıdaki 11 Custom Element'in **Server URL**'lerini "YENİ" sütunuyla değiştir; **Tag Name'ler değişmez**.
2. **Sil:** Body-end "1N - Hizmetler Capa Navigasyonu" girişi. Artık hiçbir 1N navigasyon özel kodu kalmaz.
3. "Sayfa Yükleniyor Script" ve "Özel Yükleniyor % Script" girişlerine dokunulmaz.
4. Yayınla.

| Sayfa | Tag Name (değişmez) | YENİ Server URL (Aşama B/C) | Eski Server URL (geri dönüş) |
|---|---|---|---|
| Ana Sayfa `/` | `n1-site-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@39f762f63a2af58a470e9712d8ca0895d6f73f9f/wix-global-menu-v12/pages/wix-home-v657/n1-site-wix-v657.js` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f97db8edb37f1e1388f276d840e262fc8452b80a/wix-home-v656/n1-site-wix-v656.js` |
| Kreatif Prodüksiyon | `n1-kreatif-produksiyon-v23` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@39f762f63a2af58a470e9712d8ca0895d6f73f9f/wix-global-menu-v12/pages/wix-kreatif-produksiyon-v23/n1-kreatif-produksiyon-v23.js` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f97db8edb37f1e1388f276d840e262fc8452b80a/wix-sitewide-mobile-fix-2026-11-26/wix-kreatif-produksiyon-v23/n1-kreatif-produksiyon-v23.js` |
| E-Ticaret Yönetimi | `n1-e-ticaret-yonetimi-v23` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@39f762f63a2af58a470e9712d8ca0895d6f73f9f/wix-global-menu-v12/pages/wix-e-ticaret-yonetimi-v23/n1-e-ticaret-yonetimi-v23.js` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f97db8edb37f1e1388f276d840e262fc8452b80a/wix-sitewide-mobile-fix-2026-11-26/wix-e-ticaret-yonetimi-v23/n1-e-ticaret-yonetimi-v23.js` |
| Sosyal Medya | `n1-sosyal-medya-v27` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@39f762f63a2af58a470e9712d8ca0895d6f73f9f/wix-global-menu-v12/pages/wix-sosyal-medya-v27/n1-sosyal-medya-v27.js` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f97db8edb37f1e1388f276d840e262fc8452b80a/wix-sitewide-mobile-fix-2026-11-26/wix-sosyal-medya-v27/n1-sosyal-medya-v27.js` |
| Reklam Yönetimi | `n1-reklam-yonetimi-v23` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@39f762f63a2af58a470e9712d8ca0895d6f73f9f/wix-global-menu-v12/pages/wix-reklam-yonetimi-v23/n1-reklam-yonetimi-v23.js` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f97db8edb37f1e1388f276d840e262fc8452b80a/wix-sitewide-mobile-fix-2026-11-26/wix-reklam-yonetimi-v23/n1-reklam-yonetimi-v23.js` |
| UI/UX Tasarım | `n1-uiux-tasarim-v28` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@39f762f63a2af58a470e9712d8ca0895d6f73f9f/wix-global-menu-v12/pages/wix-uiux-tasarim-v28/n1-uiux-tasarim-v28.js` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f97db8edb37f1e1388f276d840e262fc8452b80a/wix-sitewide-mobile-fix-2026-11-26/wix-uiux-tasarim-v28/n1-uiux-tasarim-v28.js` |
| AI (Yapay Zekâ) | `n1-yapay-zeka-v2` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@39f762f63a2af58a470e9712d8ca0895d6f73f9f/wix-global-menu-v12/pages/wix-yapay-zeka-v2/n1-yapay-zeka-v2.js` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f97db8edb37f1e1388f276d840e262fc8452b80a/wix-sitewide-mobile-fix-2026-11-26/wix-yapay-zeka-v2/n1-yapay-zeka-v2.js` |
| Uygulama Geliştirme | `n1-uygulama-gelistirme-v2` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@39f762f63a2af58a470e9712d8ca0895d6f73f9f/wix-global-menu-v12/pages/wix-uygulama-gelistirme-v2/n1-uygulama-gelistirme-v2.js` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f97db8edb37f1e1388f276d840e262fc8452b80a/wix-sitewide-mobile-fix-2026-11-26/wix-uygulama-gelistirme-v2/n1-uygulama-gelistirme-v2.js` |
| Markalar | `n1-markalar-v11` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@39f762f63a2af58a470e9712d8ca0895d6f73f9f/wix-global-menu-v12/pages/wix-markalar-v1/n1-markalar-v11.js` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f97db8edb37f1e1388f276d840e262fc8452b80a/wix-sitewide-mobile-fix-2026-11-26/wix-markalar-v1/n1-markalar-v11.js` |
| Kısaca Biz | `n1-kisaca-biz-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@39f762f63a2af58a470e9712d8ca0895d6f73f9f/wix-global-menu-v12/pages/wix-kisaca-biz-v1/n1-kisaca-biz-v1.js` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f97db8edb37f1e1388f276d840e262fc8452b80a/wix-sitewide-mobile-fix-2026-11-26/wix-kisaca-biz-v1/n1-kisaca-biz-v1.js` |
| Yasal sayfalar (KVKK, Çerez, Kullanım Koşulları, Gizlilik, Veri Sahibi Başvuru) | her sayfanın mevcut etiketi (ör. `n1-kvkk-aydinlatma-v1`) — değişmez | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@39f762f63a2af58a470e9712d8ca0895d6f73f9f/wix-global-menu-v12/pages/wix-yasal-sayfalar-v1/n1-yasal-sayfalar-v1.js` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f97db8edb37f1e1388f276d840e262fc8452b80a/wix-sitewide-mobile-fix-2026-11-26/wix-yasal-sayfalar-v1/n1-yasal-sayfalar-v1.js` |

Ana sayfa öğesinin `code-base`, `assets-base`, `ronin-base` öznitelikleri değişmez. v657 mobil dosyaları ve Ronin medyasını canlı v6.56 adresinden okur (aynı dosyalar).

### Aşama C — B + yalnız stabilite modülü
1. Yeni özel kod girişi: ad "1N - Stabilite", **Body - end**, Tüm sayfalar (ya da yalnız kurumsal sayfalar), "Her yeni sayfada yükle", içerik `wix-global-menu-v12/wix-custom-code/C-stability-only-body-end.html`:
```html
<script src="https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@be0c8b1454939989d175197be4ff6667f9e29c19/wix-mobile-stability-v1/n1-stability-v1.1.1.js" defer></script>
```
2. Yayınla. (Nav koruma satırı, `N1_NAV_CONFIG` ve test anahtarı **eklenmez**.)

### Yayın sonrası 5 dk kontrol (B ve C)
- Konsol: `typeof __n1Nav` → `"undefined"`, `typeof N1_NAV_CONFIG` → `"undefined"`; C'de `__n1Stability.version` → `"1.1.1"`, B'de `undefined`.
- Ağ sekmesinde `n1-nav` içeren istek **0**.
- MENU → Hizmetler: 7 alt bağlantı; tekrar basınca kapanır; bağlantılar hizmet sayfalarını açar.
- Ana sayfadaki Hizmetler bölümü ve 7 bağlantısı yerinde.

---

## V1.1 (yayınlanmadı / canlıda hatalı yapılandırıldı — V1.2 ile geçersiz)


**Bu çalışmada Wix'te hiçbir şey değiştirilmedi ve yayınlanmadı.** Yapıştırılacak kodlar elle yazım hatası olmasın diye dosya olarak hazır: `wix-custom-code/`.

Kod commit'i (CDN sabitlemesi): `bdd12eb7eeb1abdd3c0fada821f5ff3d19d206a2` — iki dosya da jsDelivr'den 200 ve depo ile bayt düzeyinde aynı doğrulandı.

## Aşama 1 — Gerçek cihaz testi (önerilen; normal ziyaretçiyi etkilemez)

Amaç: V1.1'i yalnızca test eden iPhone/iPad'de çalıştırmak. Diğer ziyaretçiler bugünkü canlı davranışı görmeye devam eder.

| Wix girişi | Konum | Sayfalar | Yükleme | İçerik |
|---|---|---|---|---|
| **YENİ** "1N - V1.1 Test Anahtarı (HEAD)" | Head | Tüm sayfalar | Her yeni sayfada | `wix-custom-code/03-test-switch-head.html` |
| Mevcut "1N - Hizmetler Capa Navigasyonu" | Body - end | Tüm sayfalar | Her yeni sayfada | `wix-custom-code/04-test-switch-body-end.html` |

- Test cihazında **bir kez** `https://www.reklam1n.com/?n1v11=1` açın; aynı sekme boyunca tüm sayfalarda V1.1 çalışır. Tanılama için `?n1v11=1&n1diag=1`.
- Uzak-bırakmanın gerçek cihazdaki etkisini ayrıca karşılaştırmak için aynı sekmede `?n1far=1` (açık) / `?n1far=0` (kapalı, varsayılan).
- Kapatmak için `?n1v11=0`. Sekmeyi kapatmak da sıfırlar (sessionStorage).
- Normal ziyaretçide: head'de bayrak okuyan tek satır, body-end'de bugünkü v1.0.1 betiği ve hiçbir şey yüklemeyen bir satır içi kontrol. Playwright doğrulaması TEST_REPORT.md §9'da: normal yolda nav 1.0.1 ve stabilite yok, test yolunda 1.0.3 + 1.1.0.

**Alternatif (sıfır canlı değişiklik):** Wix → Site İşlemleri → Siteyi Çoğalt → çoğaltılan sitede Aşama 2 kodları → ücretsiz `wixsite.com` adresinde test. Dezavantajlar: özel alan adı, çerezler ve ATS davranışı birebir aynı olmayabilir; reklam/izleme kodları test sitesinden de tetiklenir (filtrelenmeli); içerik kopyası güncel tutulmalı.

## Aşama 2 — Üretim (fiziksel cihaz testi başarılıysa)

| Wix girişi | Konum | Sayfalar | Yükleme | İçerik |
|---|---|---|---|---|
| "1N - Nav Koruma (HEAD)" (Aşama 1'deki test anahtarı girişinin yerine) | Head | Tüm sayfalar | Her yeni sayfada | `wix-custom-code/01-production-head.html` |
| "1N - Hizmetler Capa Navigasyonu" | Body - end | Tüm sayfalar | Her yeni sayfada | `wix-custom-code/02-production-body-end.html` |

Neden head girişi şart (nav yükleme sırası riski): Ana sayfa `n1-site-wix-v656.js:468` eski v1.0.1'i kendisi de yüklüyor. Chromium testinde yeni nav 6 sn geciktiğinde, head koruması olmadan **v1.0.1 etkin oldu** (TEST_REPORT.md §3b-C). Koruma varken tüm sıralamalarda v1.0.3 etkin. Head koruması tek satırlık satır içi bir işarettir; ağ isteği yapmaz.

Kapsam: İki modül de kendi içinde yalnızca kurumsal rotalarda çalışır (izin listesi: `/`, 7 hizmet sayfası, `/markalar`, `/kisaca-biz`, yasal sayfalar). Intelligence, admin, giriş, hesap, panel ve müşteri sayfalarında hiçbir dinleyici kurmaz. Ek güvence için Wix'te bu girişlerin "Sayfalara ekle" ayarı **"Seçili sayfalar"** yapılıp yalnızca bu kurumsal sayfalar seçilebilir; bu yapılırsa ana sayfa ve tüm hizmet/yasal sayfaların seçili olduğundan emin olun.

## Custom Element'ler — değişiklik YOK
Sayfa etiketleri ve Server URL'leri aynı kalır (DEPENDENCY_MAP.md §1). V1.1 hiçbir sayfa dosyasını değiştirmez.

## Yayın sonrası 5 dk kontrol
1. Telefonda `https://www.reklam1n.com/?n1diag=1` → sol altta `n1-stability 1.1.0 · mobil=true · n1Nav=1.0.3`.
2. Masaüstü konsol: `__n1Nav.version` → `"1.0.3"`, `__n1NavConflict` → `undefined`, `__n1Stability.report().mobile` → `false`.
3. `https://www.reklam1n.com/intelligence` (yalnızca konsol kontrolü): `__n1Stability.active` → `false`, `__n1Nav.active` → `false`.
4. TEST_REPORT.md §8 fiziksel cihaz senaryosu.

## Bakım
- Ana sayfanın Custom Element adresi değişirse `n1-stability-v1.1.js` içindeki `WARM_HOME` listesi güncellenmeli. Liste eski kalırsa işlev bozulmaz, yalnızca ön yükleme boşa gider.
- Yeni bir kurumsal sayfa eklenirse iki dosyadaki `SCOPE_ALLOW` listesine eklenmeli.

## Pull Request
Draft PR #2 güncellendi; birleştirilmedi. Wix adresleri commit SHA ile sabit olduğu için birleştirme canlıyı etkilemez.
