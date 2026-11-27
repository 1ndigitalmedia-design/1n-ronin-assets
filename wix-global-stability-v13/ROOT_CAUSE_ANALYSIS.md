# ROOT_CAUSE_ANALYSIS — V1.3

Tarih: 27 Kasım 2026 · Dal `mobile-stability-v1-audit` · Draft PR #2
**Gerçek iPhone/iPad'de doğrulama yapılmadı.** Aşağıda "kanıtlandı" yalnızca belirtilen test ortamı (Playwright WebKit / Chromium, Linux) içindir. Playwright WebKit iOS Safari değildir: çizim altyapısı, bellek sınırları ve süreç yönetimi farklıdır.

| # | Sorun | Kök neden | Kanıt düzeyi | Düzeltme |
|---|---|---|---|---|
| P01 | Menü geçişte tam kapanmıyor | Kapanış yalnız CSS geçişiyle; tarayıcı geçiş başlamadan önceki kareyi gösteriyor | **Kanıtlandı** (2 motor × 4 görünüm, 8/8 kalıntı → 0/8) | `n1-menu-close-v13.js` |
| P02-A | Ana sayfa → hizmet geçişinde mobil çökme | Doğrudan neden **bulunamadı**. Bulunan hata: Düşük Güç Modu'nda Hizmetler bağlantısına dokunuş, engellenmiş 2× Ronin filmini başlatıyordu | Hata kanıtlandı; çökmeyle bağı **kanıtlanmadı** | Ana sayfa v658 |
| P02-B | (Yeni) E-Ticaret sayfasında sekme çökmesi | WebKit'te `filter: grayscale(…)` → `none` geçişi | **Kanıtlandı, yalnız Playwright WebKit'te** (deterministik, 30 satırlık bağımsız sayfa) | E-Ticaret v24 |
| P02-C | (Yeni) UI/UX sayfası | Aynı desen, yalnız "Gri tonlamalı önizle" anahtarına basınca | Playwright WebKit 3/7 çökme | **Öneri: UI/UX v29, onay bekliyor** |
| P03 | Yüklenirken geri basınca çökme | Emülasyonda yeniden üretilemedi (392 döngü, 0 çökme). Güçlü adaylar: hizmet sayfalarında `pagehide`'da video kaynaklarının bırakılmaması; erken geri dönüşte Wix ATS'nin ana sayfayı ikinci kez yüklemesi | Aday mekanizmalar (kanıt değil) | Kontrollü test: varyant D (stabilite) |
| P04 | Loader flicker | Wix belge arası View Transition'ında sayfa grubunun loader'ın üstüne çizilmesi | Kare analizi (canlı 2/18 → v13 0/17); istatistiksel olarak kesin değil | Loader v13 |
| P05 | Ana sayfada loader yok | `ROUTES` içinde `/` yok | **Kanıtlandı** (kod + 5/5 ölçüm) | Loader v13 |

---

## P01 — Menü
Ayrıntı: MENU_FIX_REPORT.md. `n1-header-v12.js:57` (panel 420 ms görünür kalır), `:63` + `:196` (kart gecikmesi), `:49` (simge 450 ms döner), `:203` (bağlantıda `close(false)` ile gezinme aynı anda). WebKit'te son kare: `data-open=false` ama "Başlangıca Dön" opacity 1,00 ve simge ×.

## P02-A — Ana sayfa Hizmetler bağlantıları
**Sabit nav hipotezi:** V1.2'de "devre dışı" bildirilen Capa navigasyonu canlıda **hâlâ etkin** (15/15 sayfada `n1-nav-v1.js@b35d9875`, `__n1Nav` 1.0.1). iPhone testleri nav açıkken yapıldı. Emülasyonda nav açık/kapalı (A ↔ B) arasında ölçülebilir fark yok (TEST_REPORT §4).

**Bulunan hata:** `wix-home-v656/modules/n1-video-m5.js` `onGesture`: oynatma engellenmişse (Düşük Güç Modu, iOS kısıtlaması) **her** dokunuşta filmler yeniden başlatılmaya çalışılıyor. Hizmetler bağlantısına dokunuş da sayılıyor → sayfa terk edilirken 2× (1120×1504) Ronin filmi `play()` + kod çözücü açılıyor.
- Yeniden üretme (`p02gesture.js`, `play()` kullanıcı etkileşimi olmadan reddedilir): canlı v657 Chromium ve WebKit'te **dokunuşta 1 `play()`** (`ronin-m5-film.mp4`). v658 (`n1-video-m5-v13.js`): **0**.
- Düzeltme: `onGesture` bağlantı/düğme/form öğelerine dokunuşu yok sayar (1 satır). Engellenmiş film, sayfadaki başka bir yere dokunuşta eskisi gibi başlar.
- **Sınır:** Bu hatanın iPhone çökmesine neden olduğu kanıtlanmadı; yalnızca sayfadan ayrılma anındaki gereksiz bir kod çözücü yükünü kaldırır.

## P02-B — E-Ticaret: WebKit sekme çökmesi (yeni bulgu)
**Nasıl bulundu:** Sayfa kaynak profili (`p02pages.js`) sırasında WebKit'te e-ticaret sayfası kaydırılırken kapandı. Önceki bütün döngü testleri (V1.0–V1.3 A–F) sayfayı **%20'lik 5 atlamayla** kaydırıyordu: bu atlamalar tetikleyici ara konumlardan geçmediği için çökme hiç görülmedi. Kullanıcı gibi kademeli kaydırmada **her seferinde** oluşuyor.

**İzolasyon (WebKit, 390×844):**
| Deneme | Sonuç |
|---|---|
| Kademeli kaydırma (250 px / 350 ms), 8 sayfa × 2 | Yalnız e-ticaret çöküyor (2/2), hep y≈4000–4250 px |
| Aynı sayfa, 5 büyük atlama | 0/3 çökme |
| Chromium | 0/2 çökme |
| Videolar engelli / büyük görseller engelli / GSAP engelli / DPR 1 / iPhone UA / ana sayfadan gelerek / Wix belge yönlendirmesiyle | Hepsinde çöküyor |
| Bölüm gizleme: `#ec-akis`, `#ec-buyume`, `#ec-deneyim` | Çöküyor |
| `#ec-kapsam` gizli | **Çökmüyor** |
| `.ec-line__img` filtresi yok / geçişi yok / görsel gizli | **Çökmüyor** |
| `.ec-line__img` ölçek (transform) yok | Çöküyor |
| Küçük görseller (192×240) | Çöküyor → görsel boyutu değil |
| **Bağımsız 30 satırlık sayfa** (8 görsel, aynı CSS, aynı IntersectionObserver mantığı) | `grayscale(1) brightness(.42)` → `none`: **çöküyor**; `grayscale(1)` → `none`: **çöküyor**; `brightness(.42)` → `none`: çökmüyor; hedef `grayscale(0) brightness(1)` ya da `grayscale(0)`: **çökmüyor**; geçiş yok: çökmüyor |

**Kök neden:** `wix-global-menu-v12/pages/wix-e-ticaret-yonetimi-v23/n1-e-ticaret-yonetimi-v23.js`
- `:490` `.ec-line__img{filter:grayscale(1) brightness(.42); … transition:transform 1.1s, filter .7s}`
- `:491` `.ec-line.is-on .ec-line__img{filter:none; …}`
- `:1004-1017` `_lines()`: kaydırma ortasındaki satıra `is-on` verilir → her satır değişiminde iki görselde `grayscale(1) brightness(.42)` ↔ `none` geçişi başlar.

WebKit, `grayscale` içeren bir filtre listesini `none` ile ara değerlerken (interpolation) çöküyor; aynı işlev listesine (`grayscale(0) brightness(1)`) geçişte çökmüyor. Bu bir **tarayıcı motoru hatası**; site kodu yalnızca tetikleyicisi.

**Düzeltme (E-Ticaret v24):** yalnız `:491` → `filter:grayscale(0) brightness(1)`. Matematiksel olarak `none` ile aynı görüntü. Doğrulama: TEST_REPORT §6.

**iPhone ile ilişkisi — ayrı değerlendirme:**
- Kanıtlanan: Playwright WebKit (Linux, WebKit 2359 / Safari 26.6 eşdeğeri) bu desende deterministik olarak çöküyor.
- Bilinmeyen: iOS Safari'nin aynı hatayı verip vermediği. Filtre ara değerleme (WebCore) kodu platformlar arası ortak, ancak çizim (Linux: Skia; iOS: Core Animation/Core Image) farklı. **iPhone çökmesinin nedeni olduğu iddia edilmiyor.** Bu, sitede WebKit'i deterministik olarak çökerten tek desen olduğu için güçlü bir aday; kabul listesine özel senaryo eklendi (DEPLOYMENT §5.2).

## P02-C — UI/UX: aynı desen (yeni bulgu, onay bekliyor)
`wix-global-menu-v12/pages/wix-uiux-tasarim-v28/n1-uiux-tasarim-v28.js:486` `.ux-screen--acc{transition:filter .4s}` (temel durum filtre yok = `none`) ↔ `.ux-screen--acc.is-gray{filter:grayscale(1)}`; `:967` "Gri tonlamalı önizle" anahtarı. Kaydırma tetiklemez; yalnız kullanıcı anahtara basınca.
- Playwright WebKit, geçiş tamamlanacak aralıklarla (800 ms) 12 tıklama: canlı **3/7 çökme**; test enjeksiyonuyla `.ux-screen--acc{filter:grayscale(0)}`: **0/6**. 250 ms aralıkla (geçiş yarıda kesilir): 0/3.
- **Öneri:** UI/UX v29 (tek satır, görsel eşdeğer). Kapsam dışı olduğu için **yapılmadı**; onayınızı bekliyor.

## P03 — Yüklenirken geri
Matris (TEST_REPORT §3): 7 sayfa × 7 zaman (0,25–5 sn + tam yükleme) × canlı/v13 × normal/yavaş ağ × 2 motor = **392 döngü, 0 çökme, 0 takılma, 0 1N hatası**. Emülasyonda yeniden üretilemedi.

Kod denetiminde bulunan aday mekanizmalar (kanıt değil):
1. **Videolar sayfa gizlenince bırakılmıyor:** 7 sayfada hero `src` + `preload=auto` bağlanma sırasında senkron atanıyor (ör. kreatif `:991`); Reklam `:367` 1080p, UI/UX `:252` 720p kaynak doğrudan işaretlemede. Hiçbir sayfada `pagehide`/`freeze` işleyicisi yok; `visibilitychange` yalnız duraklatıyor. Belge BFCache'e girerse `disconnectedCallback` çalışmaz → temizlik yapılmaz. (Stabilite modülü tam olarak bunu yapar → varyant D.)
2. **Erken geri + Wix ATS:** ≤1 sn içinde geri basınca ana sayfa çoğu zaman `reload` ile ikinci kez yükleniyor (WebKit canlı 25/49, Chromium 11/49). Ağır ana sayfa iki kez art arda kuruluyor. Wix kodu; atlatılmadı (kısıt).
3. Küçük: UI/UX temizliği `src`'yi kaldırıyor ama `load()` çağırmıyor (`:715`); footer modülü her yeniden girişte `gsap.matchMedia` + `scroll` dinleyicisi bırakıyor (`n1-footer-v646.js:77-103`).

Ölçülen: yarım kalan bağlanma, gecikmeli CDN (1,2 sn/betik) ve gecikmeli video (3 sn) koşullarında da çökme/takılma/1N hatası yok; geri dönüşte bayat loader yok (v13 ana sayfada Ronin hazır olana kadar en çok ~9,5 sn bekler — kodlanmış üst sınır, LOADER_FIX_REPORT).

## P04 / P05 — Loader
Ayrıntı: LOADER_FIX_REPORT.md.

## Global loader ilişkisi
İki loader girişi kesişmeyen sayfa kümelerinde: "Sayfa Yükleniyor Script" 14 müşteri/panel sayfasında (dokunulmadı), "Özel Yükleniyor % Script" 13 1N sayfasında. Hiçbir sayfada iki loader yok. Çökme hipotezi olarak loader kapalı (varyant E): bellek ve kararlılıkta fark yok (TEST_REPORT §4).
