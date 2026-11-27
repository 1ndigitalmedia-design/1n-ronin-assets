# DEPLOYMENT — V1.4 Wix kurulum belgesi (ana belge)

> **Bu belgeyi uygulamadan önce onay gerekir.** Hiçbir adım canlıya uygulanmadı; PR birleştirilmedi.
> Adresler: SERVER_URLS.md · Geri dönüş: ROLLBACK.md · CDN: CDN_VERIFICATION.md.

## 0. Ön koşul
1. Depo kökünde `bash wix-mobile-performance-v14/wix-custom-code/verify-cdn-v14.sh` çalıştırın; çıktı **TAMAM** olmalı. 403 görürseniz 1–2 dk bekleyip tekrar çalıştırın (jsDelivr ısınması).
2. Wix Studio'da bir **site yedeği** alın (Site Geçmişi). Bu, adres değişikliğinden bağımsız ek bir güvencedir.

## 1. Sayfa başına kurulum tablosu
Her satırın akışı aynıdır: Wix Studio → ilgili sayfa → Custom Element seç → **Ayarlar → Server URL** (yalnız bu alan) → **Yayınla**.

**Değişmeyenler (8 öğenin hepsi için):**
- **Tag Name** (hiçbir satırda değişmez).
- **Öznitelikler:** Wix'te tanımlı değerler olduğu gibi kalır. Kod tarafından okunanlar:
  - Hizmet sayfaları: `deps-base`, `cta-href`.
  - Ana sayfa: `assets-base`, `ronin-base`, `ronin-mobile-base`, `ronin-tier`, `hero-video`, `hero-poster`, `home-base`, `sticky-fix`, `debug`.
  - Bunların dışında tanımlı başka bir öznitelik varsa (ör. `code-base`) o da değiştirilmeden kalır.
- **Özel kod:** gerekmez.

| # | Sayfa (yol) | CE Tag (değişmez) | Mevcut Server URL (V1.3, geri dönüş) | Yeni Server URL (V1.4) | Mobil / tablet etkisi | Masaüstü etkisi | Test durumu |
|---|---|---|---|---|---|---|---|
| 1 | Ana Sayfa (`/`) | `n1-site-v1` | `…@b9c8fca…/wix-global-stability-v13/home/n1-site-wix-v658.js` | `…@36a24d3…/wix-mobile-performance-v14/home/n1-site-wix-v659.js` | Medya aynı (Ronin 2×); gizlenince video kaynağı bırakılır; "Hikâyemizin Devamı" → `/kisaca-biz` | Görsel aynı; bağlantı → `/kisaca-biz` | Ağ ✔ · görsel ✔ · bağlantı ✔ · BFCache benzetimi ✔ · kaydırma ✔ |
| 2 | Kreatif Prodüksiyon | `n1-kreatif-produksiyon-v23` | `…@39f762f…/wix-global-menu-v12/pages/wix-kreatif-produksiyon-v23/n1-kreatif-produksiyon-v23.js` | `…@36a24d3…/pages/wix-kreatif-produksiyon-v24/n1-kreatif-produksiyon-v24.js` | Monitör: WebP kare; video yalnız dokunuşla | Aynı | ✔ (TEST_REPORT) |
| 3 | E-Ticaret Yönetimi | `n1-e-ticaret-yonetimi-v23` | `…@997f951…/wix-global-stability-v13/pages/wix-e-ticaret-yonetimi-v24/n1-e-ticaret-yonetimi-v24.js` | `…@36a24d3…/pages/wix-e-ticaret-yonetimi-v25/n1-e-ticaret-yonetimi-v25.js` | 2 ikincil video → kare; görseller boyutlandırılmış | Görseller boyutlandırılmış (srcset), videolar aynı | ✔ |
| 4 | Sosyal Medya | `n1-sosyal-medya-v27` | `…@39f762f…/pages/wix-sosyal-medya-v27/n1-sosyal-medya-v27.js` | `…@36a24d3…/pages/wix-sosyal-medya-v28/n1-sosyal-medya-v28.js` | 3 ikincil video → kare | Aynı | ✔ |
| 5 | Reklam Yönetimi | `n1-reklam-yonetimi-v23` | `…@39f762f…/pages/wix-reklam-yonetimi-v23/n1-reklam-yonetimi-v23.js` | `…@36a24d3…/pages/wix-reklam-yonetimi-v24/n1-reklam-yonetimi-v24.js` | Manifesto + karar → kare | Aynı | ✔ |
| 6 | UI/UX Tasarım | `n1-uiux-tasarim-v28` | `…@d33a9ff…/wix-global-stability-v13/pages/wix-uiux-tasarim-v29/n1-uiux-tasarim-v29.js` | `…@36a24d3…/pages/wix-uiux-tasarim-v30/n1-uiux-tasarim-v30.js` | FEEL → kare (video 0) | Aynı; gri anahtar aynı | ✔ |
| 7 | Yapay Zekâ | `n1-yapay-zeka-v2` | `…@39f762f…/pages/wix-yapay-zeka-v2/n1-yapay-zeka-v2.js` | `…@36a24d3…/pages/wix-yapay-zeka-v3/n1-yapay-zeka-v3.js` | 2 ikincil video → kare | Aynı | ✔ |
| 8 | Uygulama Geliştirme | `n1-uygulama-gelistirme-v2` | `…@39f762f…/pages/wix-uygulama-gelistirme-v2/n1-uygulama-gelistirme-v2.js` | `…@36a24d3…/pages/wix-uygulama-gelistirme-v3/n1-uygulama-gelistirme-v3.js` | 3 ikincil video → kare | Aynı | ✔ |

Tam adresler (kopyalanabilir): **SERVER_URLS.md**. Tablodaki `…` = `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets`, `@36a24d3…` = `@36a24d3d5af5be5e5493598af4375f070a26b002`. Yeni hizmet sayfası adresleri `…@36a24d3…/wix-mobile-performance-v14/pages/…` biçimindedir.

**Önerilen sıra:**
1. Önce Ana Sayfa'yı yayınlayın ve §4'teki kontrolleri yapın.
2. Ardından E-Ticaret'i yayınlayın (en büyük kazanç).
3. Sonra kalan 6 sayfayı yayınlayın.

Her yayından sonra §4 kontrolü yapın. Sorun çıkan sayfa yalnız kendi satırıyla geri alınır; satırlar birbirinden bağımsızdır.

## 2. Güncellenmeyen sayfalar
| Sayfa | Durum | Neden |
|---|---|---|
| `/kisaca-biz` (`n1-kisaca-biz-v1`) | değişmez | Video yok; tek görsel. |
| `/markalar` (`n1-markalar-v11`) | değişmez | Video yok. |
| Yasal 5 sayfa (`n1-yasal-sayfalar-v1.js`) | değişmez | Medya yok. |
| `/reklam-ajansi` (Akademi), `/1n`, `/iletisim`, `/ucretsiz-analiz`, `/dijital-pazarlama`, `/google-reklam-yonetimi`, `/facebook-reklam-yonetimi`, `/instagram-reklam-yonetimi`, `/tiktok-reklam-yonetimi`, `/online-ticaret-yonetimi`, `/sosyal-medya-yonetimi` | Wix yerel; kod yok | Kapsamdaki kod yok. |
| `/cgi-reklamlar`, `/marka-danismanligi`, `/web-tasarim-ve-yazilim-programlama` | Wix yerel **video** içerir | Wix Video Player; kodla değiştirilemez. İsteğe bağlı öneri: mobil düzende video öğesinde "otomatik oynat" kapatılabilir ya da yerine kapak görseli konabilir. Bu bir tasarım/editör kararıdır, onay gerekir. |
| Intelligence Dashboard, müşteri panelleri, İlkay Kuyumculuk ve diğer müşteri sayfaları | **kapsam dışı**, dokunulmadı | Görev §19. |

## 3. Özel kod (Custom Code)
- **Zorunlu değişiklik yok.** Menü kapanışı V1.3, Loader V1.3, Google Ads ve Meta Pixel girişleri olduğu gibi kalır.
- **İsteğe bağlı (kabul testi için):** "1N - V1.3 Test Anahtarı (HEAD)" girişinin içeriğini `wix-custom-code/TEST-SWITCH-v14-head.html` ile değiştirin. Konum, sayfa seçimi ve "her yeni sayfada yükle" aynı kalır.
  - v13.2'nin tüm işlevleri korunur. Normal ziyaretçide dosya yüklenmez.
  - Test bitince v13.2 içeriğine geri dönülebilir ya da giriş kaldırılabilir.

## 4. Yayın sonrası kontrol (her sayfa, telefon + masaüstü)
1. **Masaüstü:** sayfa V1.3 ile görsel olarak aynı, videolar oynuyor.
2. **Telefon / tablet:** ikincil video yerinde keskin bir kare var, kutu ve kırpma aynı, boş alan yok. Kahraman videosu oynuyor.
3. **Ana sayfa:** "Hikâyemizin Devamı" → `/kisaca-biz` açılıyor. Ronin 2× oynuyor.
4. **Gezinme:** Menü aç → Hizmetler → sayfa → Geri. Menü kapalı, loader kalmıyor.
5. **Kabul testi (fiziksel cihaz):** `https://www.reklam1n.com/?n1t=kabul14` → otomatik çalışır, ~10–12 dk. Rapor bitince "İndir (.md)". Ayrıntı: PHYSICAL_DEVICE_ACCEPTANCE.md.

## 5. Ne değişmez (güvence)
- **Tasarım ve görünüm:** tasarım, masaüstü, Ronin 2×, #A2FF00, tipografi, GSAP sahneleri, içerik ve SEO metinleri.
- **Gezinme ve kod:** Header/Footer, Hizmetler alt menüsü, menü kapanışı V1.3, Loader V1.3, çapa navigasyonun kapalı olması.
- **Kapsam dışı sistemler:** stabilite modülü kapalı. Google Ads, GTM, GA ve Meta Pixel değişmez. Müşteri ve dashboard sayfaları değişmez.
