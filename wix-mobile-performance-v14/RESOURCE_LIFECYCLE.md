# RESOURCE_LIFECYCLE — sayfalar arası kaynak yaşam döngüsü (P13)

İlke: **her bileşen yalnız kendi kaynaklarına sahiptir ve yalnız onları bırakır.** Genel bir sayfa temizleyicisi yok, sayfa yeniden yükleme yok, BFCache kapatılmadı. Stabilite modülü kapalı kaldı.

## 1. Canlıdaki (V1.3) durum: statik analiz + ölçüm
- **Ortak yardımcılar zaten iyi:**
  - `n1Listen(owner, el, type, fn, opt)` dinleyiciyi bileşenin `_cleanups` dizisine bağlar.
  - `disconnectedCallback` ScrollTrigger, gözlemci, zamanlayıcı ve dinleyicileri temizler.
  - E-Ticaret'teki tek `setInterval` görünürlüğe bağlı; `clearInterval` ve `_cleanups` ile temizleniyor.
  - Sayılar MEDIA_INVENTORY §5'te.
- **Eksik olan:** sayfa gizlenince (`pagehide`) videolar yalnız duraklatılıyordu, kaynakları tutuluyordu. BFCache'te bekleyen her belge kod çözücü ve video arabelleğini bellekte tutar. Ana sayfada bunlar Ronin 2× (1120×1504), mini ve bantlar; hizmet sayfalarında kahraman ve ikincil videolar.
- **Ölçüm** (`tests/life14.js`, gerçek gezinme): canlıda gizlenen sayfada video kaynağı tutuluyor (1/2), V1.4'te bırakılıyor (0/2).

## 2. V1.4 — hizmet sayfaları: `n1Life(owner)`
Yedi hizmet sayfasında `this._videos()` (UI/UX'te `this._feelVideo()`) çağrısından hemen sonra `n1Life(this)` çağrılır. Kaynak: `tools/build_pages.py` (yardımcı blok).

| Olay | Davranış |
|---|---|
| `pagehide` | Bileşenin kökündeki her kaynaklı `<video>`: `pause()`, `src` ve oynatma durumu `_n1Held`'e kaydedilir, `removeAttribute('src')` + `load()` (çözücü ve arabellek bırakılır). Zaten bırakılmış olana dokunmaz. |
| `pageshow` (`persisted`) | **Yakalama evresinde** çalışır, yani sayfanın kendi `pageshow` kurtarmasından önce kaynak geri gelir. Yalnız bırakılanlar geri yüklenir; `currentTime` korunur. Oynuyor idiyse, görünürse ve sekme açıksa `play()` çağrılır, `canplay`'de bir kez daha denenir (`load()` bekleyen sözü iptal edebilir). |
| `pageshow` (taze yükleme) | Hiçbir şey yapmaz. |

Güvenceler:
- **İdempotent:** `owner._n1Life` bayrağı ikinci kurulumu engeller, `_n1Held` aynı videonun iki kez bırakılmasını engeller.
- **Sahiplik:** yalnız `owner.querySelectorAll('video')`. Wix'in, ana sayfa modülünün ya da başka bileşenin videolarına dokunmaz.
- **Temizlik:** iki dinleyici de `n1Listen` ile `_cleanups`'a bağlıdır. Bileşen DOM'dan çıkınca (Wix sayfa değişimi, yeniden işleme) kaldırılır.
- **Kuşak / eski iş:** geri yüklemede `owner._on && owner.isConnected && !document.hidden` koşulu var. Kopmuş ya da kapalı bileşen oynatmaz.
- **Hafif profilde** ikincil `<video>` yok; bırakılacak tek şey kahraman videosu.

## 3. V1.4 — ana sayfa: `n1-video-m5-v14.js`
v13 ile aynı, iki ek dışında:
- **Yerel video bağlayıcı** (bantlar): `pagehide`'da mevcut `stop()` sonrası `held = {src, t}`, `removeAttribute('src')` + `load()`. `pageshow(persisted)`'ta önce kaynak geri, sonra mevcut kurtarma mantığı.
- **Kahraman / mini** (`S.held`): `pagehide`'da `pauseOurs()` sonrası aynı bırakma. `pageshow(persisted)`'ta mevcut mantıktan önce `preload='auto'` ile aynı kaynak geri yüklenir.

**Kaynak seçimi (Ronin 2× politikası) değişmedi.** Masaüstü ana sayfadaki iki geniş video bu modülün değil, başka bir modülün öğeleridir. Bırakılmazlar: masaüstü korunur ve masaüstünde bellek baskısı sorunu raporlanmadı.

## 4. Değiştirilmeyenler ve gerekçe
| Kaynak | Durum |
|---|---|
| GSAP / ScrollTrigger | `disconnectedCallback`'te `kill()` (V1.2/V1.3). BFCache'te belge donar, ScrollTrigger yeniden ölçüm yapar. Ana sayfada geri dönüş sonrası ST sayısı aynı (13; `tests/homediag.js`). |
| rAF döngüleri | Olay güdümlü; `document.hidden` iken durur. |
| Gözlemciler (IO/RO/MO) | `_cleanups` ile bağlantı kesilir. |
| `fetch` / zaman uyumsuz iş | Hizmet sayfalarında `fetch` yok (statik analiz: 0). |
| Canvas | Yok (`getContext` 0). |
| Sonsuz CSS animasyonları | Bkz. OPTIMIZATION_DECISIONS §4. |

## 5. Doğrulama (TEST_REPORT §4)
- **Benzetilmiş BFCache** (`tests/bfsynth.js`): belge içinde `PageTransitionEvent('pagehide'|'pageshow', {persisted:true})` × 3 döngü, 8 sayfa, mobil + masaüstü, Chromium ve WebKit.
  - **Gizlenince kaynaklı video 0** (masaüstü ana sayfa hariç, §3).
  - Dönüşte kaynak sayısı başlangıçla aynı.
  - Pencere ve belge dinleyici sayısı 3 döngüde **+0**; 1N hatası 0.
  - Chromium'da geri yüklenen videolar oynuyor. WebKit Linux headless ilk yüklemede de `currentTime`'ı ilerletmediği için oynatma orada ölçülemez (motor sınırı, `qa/life/bfdbg-*.log`).
- **Gerçek BFCache:** Playwright Wix sayfalarında BFCache'e girmiyor (her geri dönüş taze `back_forward`). Gerçek cihazdaki BFCache davranışı **fiziksel cihaz kabulünde** doğrulanacak (PHYSICAL_DEVICE_ACCEPTANCE).

> Bu değişiklik iPhone'daki çökme sorununu **çözülmüş saymaz**. Bellek baskısını azaltan, ölçülebilir bir adımdır; sonuç yalnız fiziksel cihazda doğrulanabilir.
