# LOADER_FIX_REPORT — PROBLEM 04 (flicker) · PROBLEM 05 (ana sayfada çalışmıyor) · Global loader denetimi

Tarih: 27 Kasım 2026 · **Wix'te değişiklik yapılmadı.**
Kopyala-yapıştır dosyası: `wix-global-stability-v13/wix-custom-code/LOADER-v13-ozel-yukleniyor.html`
Canlının birebir yedeği (geri dönüş): `wix-global-stability-v13/wix-custom-code/LOADER-LIVE-BACKUP-ozel-yukleniyor.html`

## 1. Canlıdaki gerçek kod ve sayfa seçimi (canlı HTML'den okundu)

Sitede **iki ayrı** loader özel kodu var. Sayfa kümeleri **kesişmiyor**: hiçbir sayfada iki loader birlikte çalışmıyor.

| Wix girişi | Konum | Sayfalar |
|---|---|---|
| "Sayfa Yükleniyor Script" | Head | 14 müşteri/panel sayfası: Ella Çikolata, Çelebi Kuyumculuk, E-Goldia, Esra Yıldırım, Focus Max, İlkay Kuyumculuk, Dashboard, Tino Furniture, Kartepe Kuyumculuk, Nora İşitme, Fırat Kuyumculuk, İpek Mobilya, Burak Jewellery, Çarşı Atölye → **kapsam dışı, dokunulmadı** |
| "Özel Yükleniyor % Script" (`#n1GlobalLoader`) | Head | 13 sayfa: Ana Sayfa (`jmx3t`, SEO adı `/n1-full-test`, `/` adresinde yayınlanıyor), Kreatif Prodüksiyon, E-Ticaret, Sosyal Medya, Reklam Yönetimi, UI-UX, AI, Uygulama, Markalar, Kısaca Biz, KVKK, Çerez Politikası, Kullanım Koşulları |
| — | — | Hiçbirinde değil: `/gizlilik`, `/veri-sahibi-basvuru-formu`, İletişim, Akademi, 1N Hakkında vb. |

Canlı "Özel Yükleniyor" kodu (yedek dosya) — önemli satırlar:
- `:109` `ROUTES` kümesi: **`'/'` yok** (ve `/markalar`, `/kisaca-biz`, `/gizlilik` de yok).
- `:154` `pageReady(path)`: ana sayfa için dal yok.
- `:251` 24 ms'lik sayaç; `:273` 12 sn güvenlik sınırı.
- `:308` `popstate`, `:311` **`setInterval(checkRoute, 500)` — sayfa ömrü boyunca hiç durmayan yoklama.**

## 2. PROBLEM 05 — Ana sayfada loader çalışmıyor

**Neden: kod.** Wix sayfa seçimi doğru (ana sayfa `jmx3t` seçili, kod ana sayfa HTML'inde var, `window.__n1GlobalLoaderInstalled` tanımlı). Ancak ana sayfanın yolu `/` ve `ROUTES` içinde `/` yok → `checkRoute()` loader oluşturmuyor (`:299`). Yalnız Wix ayarı değiştirmek çözmez; kod değişikliği gerekiyor.

**Düzeltme (v13):**
- `ROUTES`'a `'/'`, `'/markalar'`, `'/kisaca-biz'`, `'/gizlilik'` eklendi (son üçü sayfa seçiminde yoksa zararsız; varsa çalışır).
- `homeReady(sinceMs)` (`v13:189-199`): `n1-site-v1` kuruldu **ve** header logosu var **ve** Ronin hazır: mobil/tablet filmi ilk kareyi çizdi (`is-ready`) ya da `blocked/poster/error/user/done` durumunda (Düşük Güç Modu dahil) — masaüstünde `ronin-hero-v67` öğesi. **Videonun tamamı beklenmez.** 8 sn içerik sınırı + 12 sn mutlak sınır.
- Ronin'in başlaması loader'a bağlı değil: loader yalnız görsel katman; Ronin kodu ve oynatma loader'dan bağımsız çalışır (loader kapanınca film zaten oynuyor ya da poster/oynat durumunda).

**Ölçüm (Chromium kare analizi, ana sayfaya gelişte, 5 tekrar):** loader 312–528 ms'de görünür, 3,66–3,91 sn'de kapanır; arada içerik görünmez, flicker 0/5. Ronin her koşuda `playing` (P03 testlerinde de ana sayfaya her dönüşte `hero=playing`, ilerleyen `currentTime`).

**Wix ayarı (kod değil, isteğe bağlı):** `/gizlilik` ve `/veri-sahibi-basvuru-formu` diğer yasal sayfalar gibi loader istiyorsa "Özel Yükleniyor % Script" sayfa seçimine eklenmeli (bkz. DEPLOYMENT §3). `/veri-sahibi-basvuru-formu` için `ROUTES`'ta dal yok; eklenirse loader 12 sn sınırına kadar beklemesin diye **eklenmemesini** öneriyoruz.

## 3. PROBLEM 04 — Flicker (içerik kısa süre görünüp loader yeniden kapatıyor)

### Yeniden üretme
`p04frames.js`: Chromium CDP ekran yayını (her kare zaman damgalı), her karede lime `%` işareti (#A1FF00) ve loader zemini (#080A09) piksel oranıyla **LOADER / İÇERİK** sınıflandırması. Senaryolar: ana sayfa → Kreatif (h2k), Sosyal → Kreatif (s2k, menüden), Kreatif → ana sayfa (k2h). Wix'in `speculationrules` ön yüklemesi açık (gerçek kullanım).

### Kanıt — canlıda yakalanan iki flicker
```
live-home2kreatif:  İÇERİK@-242ms(23 kare) → LOADER@441ms(27) → İÇERİK@908ms(6 kare ≈100 ms) → LOADER@1008ms(115) → İÇERİK@3141ms
chk-live-h2k:       İÇERİK@-250ms(23)      → LOADER@700ms(1)  → İÇERİK@684ms(1)              → LOADER@717ms(118) → İÇERİK@3167ms
```
Kare şeridinde araya giren karelerde yeni sayfanın içeriği loader'ın **üstünde**, View Transition (Wix `@view-transition{navigation:auto}`, `types: OutIn`, sayfa grubu `.Y3K28_`) animasyonu sırasında çiziliyor.

### Mekanizma
Wix'in belge arası sayfa geçişinde adlandırılmış öğeler (sayfa grubu) **üst katmanda** (`::view-transition` sözde ağacı) çizilir; bu katman `z-index`'ten bağımsız olarak tüm sayfanın üstündedir. Loader adlandırılmadığı için kök görüntünün içinde kalır; geçiş sürerken sayfa grubunun anlık görüntüsü loader'ın üstüne biner → "içerik → loader" sıçraması. Geçiş ön yükleme zamanlamasına bağlı olduğu için **ara sıra** olur (ön yükleme kapalıyken 0 kez yeniden üretildi).

### Düzeltme (v13, `:101-113`)
`#n1GlobalLoader{view-transition-name:n1-global-loader}` + kendi grubunda animasyonsuz ve en üst sırada (`::view-transition-group(n1-global-loader){z-index:2147483647}`). Wix geçişi **iptal edilmez/atlanmaz**; yalnızca loader geçiş katmanında da üstte kalır. Tasarım, Montserrat Black, %01→%99 sayacı, kapanış animasyonu aynı. Ek bekleme yok.

Ek değişiklikler:
- `setInterval(checkRoute, 500)` kaldırıldı (Wix geçişleri tam sayfa yüklemesi; `popstate` + `pageshow` yeterli) → sayfa başına süresiz zamanlayıcı yok.
- `pageshow(persisted)`: BFCache'ten dönen sayfada yarım kalmış loader hemen kaldırılır (bayat loader yok).
- Test anahtarı: yalnız `sessionStorage 'n1t-loader'='off'` iken çalışmaz (normal ziyaretçi için tek bir okuma).
- `window.__n1GlobalLoaderInstalled = '1.3'` (canlı `'1'` / `true` yerine sürüm görünür).

### Sonuçlar (Chromium, ön yükleme açık)
| | Koşu | Flicker |
|---|---|---|
| Canlı (tekil + toplu) | 18 | **2** |
| v13 | 17 | **0** |
| v13 ana sayfaya gelişte loader | 5 | 5/5 görünür, 0 flicker |

**Sınır — dürüst değerlendirme:** Canlıdaki flicker seyrek (2/18), v13'te 0/17. Bu fark istatistiksel olarak tek başına kesin değildir (Fisher p≈0,49). Belirleyici deneme (`vtdet.js`: loader açıkken aynı belgede `document.startViewTransition({types:['OutIn']})`) canlı ve v13'te aynı sonucu verdi (loader üstte) → yapay aynı-belge geçişi belge arası Wix geçişini taklit edemedi. Mekanizma kare şeridine ve View Transition katman kurallarına dayanıyor; **gerçek iPhone'da doğrulanmalı** (ACCEPTANCE §3). iOS 18+ Safari belge arası View Transition'ı destekler; daha eski iOS'ta Wix geçişi yoksa düzeltme etkisizdir ama zararsızdır.

## 4. Loader'ın çökme hipotezi olarak test edilmesi
Test anahtarı `?n1t=E` (C + loader kapalı) ile A–F döngülerinde ayrı varyant olarak ölçüldü: sonuçlar TEST_REPORT §4. Loader yalnız bir DOM öğesi + 24 ms'lik sayaç; v13'te süresiz 500 ms yoklama da kalktı.

## 5. Kopyala-yapıştır
Wix Studio → Ayarlar → Özel Kod → "Özel Yükleniyor % Script" → Düzenle → içeriğin **tamamını** `LOADER-v13-ozel-yukleniyor.html` ile değiştir. Ayarlar aynı kalır: Head · seçili 13 sayfa · Her yeni sayfada yükle. Ayrıntı: DEPLOYMENT.md.
