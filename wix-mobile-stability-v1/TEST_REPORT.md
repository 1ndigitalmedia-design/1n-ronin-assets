# TEST_REPORT

**Önemli:** Playwright WebKit 26.6 (Linux/WPE) **gerçek iPhone Safari değildir.** V1.2'de de gerçek cihaz testi yapılmadı; mobil çökmenin çözüldüğü iddia edilmiyor.

## V1.2 — Global Menü ve Navigasyon Revizyonu (27 Kasım 2026)

Düzenek (`wix-global-menu-v12/qa/scripts/scen.js`): canlı HTML her istekte alınır. **A** canlı (bugünkü özel kodlarla); **B** Wix "Capa Navigasyonu" ve "V1.1 Test Anahtarı" blokları çıkarılmış + 11 sayfa v12 dosyalarıyla; **C** = B + stabilite v1.1.1. A da aynı yönlendirme katmanından geçer.

### 1. Kurulum doğrulaması (`scencheck.js`, Chromium)
| | A | B | C |
|---|---|---|---|
| Etkin nav (`__n1Nav`) | 1.0.1 | **yok** | **yok** |
| `N1_NAV_CONFIG` | var | yok | yok |
| Sayfadaki `n1-nav*` betiği (ana sayfa / kreatif) | 3 / 2 | **0 / 0** | **0 / 0** |
| Stabilite | — | — | 1.1.1 |
| Menüde Hizmetler | bağlantı (`#hizmetler-ozet`) | buton + 7 alt bağlantı | buton + 7 alt bağlantı |
| Ana sayfa `#hizmetler-ozet` bölümü / bağlantı | var / 7 | var / 7 | var / 7 |
| ScrollTrigger (ana sayfa / kreatif) | 13 / 26 | 13 / 26 | 13 / 26 |

### 2. Menü kullanılabilirliği (`menutest.js`, senaryo B) — **Chromium 93/93, WebKit 93/93**
Görünümler: masaüstü 1440×900, tablet 820×1180, tablet yatay 1180×820, mobil 390×844, küçük mobil 320×568. Dokunmatik profillerde gerçek dokunuş (`tap`).
Her görünümde: Hizmetler bir **buton** · dokununca/tıklayınca açılır, 7 bağlantı doğru sıra ve adreste · URL değişmez · tekrar basınca kapanır · dokunma alanı başlık ≥45 px, alt bağlantı ≥40 px · son alt bağlantıya ulaşılabilir (küçük mobil, masaüstü ve tablet yatayda panel kaydırılabilir) · İnsan Kaynakları alt menüsü aynen · klavye: Enter menüyü açar, ↓ Hizmetler'e gelir, Enter alt menüyü açar, Escape alt menüyü kapatır ve odak başlığa döner, ikinci Escape menüyü kapatır · masaüstü: fareyle üzerine gelince açılır, tıklama sabitler, ikinci tıklama kapatır · alt bağlantı → `/ui-ux-tasarim` standart gezinme · iç sayfa menüsünden → `/yapay-zeka` · geri/ileri doğru · header/logo/MENU görünür · 1N kaynaklı sayfa hatası 0.
Test sırasında bulunan ve düzeltilen 2 hata: NAVIGATION_REVISION_REPORT §1.
Ekran görüntüleri: `wix-global-menu-v12/screenshots/` (12 adet).

Eski adres `/#hizmetler-ozet` (B, bilgi): bölüm mevcut, tarayıcı standart çapa kaydırması yapıyor (ör. mobil y=906, masaüstü y=2781); özel header ofseti yok.

### 3. Çökme senaryosu döngüleri — A / B / C (`cycle3.js`, 21 döngü, 6 sn bekleme, eşleştirilmiş paralel)
| Motor | Senaryo | Ölçüm | Hatalı döngü / asılı / çökme | Geri dönüşte ATS reload | En büyük süreç ort. / maks. / son 15 ort. (MB) | Hizmet sayfası bekleme sonrası oynayan / tamponlu / toplam video | Header görünür |
|---|---|---|---|---|---|---|---|
| WebKit | A | 84 | 0 / 0 / 0 | 21/21 | 1464 / 1932 / 1650 | 0 / 53 / 60 | 84/84 |
| WebKit | B | 84 | 0 / 0 / 0 | 21/21 | 1446 / 1767 / 1628 | 0 / 52 / 60 | 84/84 |
| WebKit | C | 84 | 0 / 0 / 0 | 21/21 | 1454 / 1790 / 1682 | 0 / 53 / 60 | 84/84 |
| Chromium | A | 84 | 0 / 0 / 0 | 0/21 | 513 / 669 / 589 | 0 / 54 / 60 | 84/84 |
| Chromium | B | 84 | 0 / 0 / 0 | 0/21 | 468 / 603 / 479 | 0 / 54 / 60 | 84/84 |
| Chromium | C | 84 | 0 / 0 / 0 | 0/21 | 478 / 639 / 468 | 0 / 54 / 60 | 84/84 |

Yorum:
- Üç senaryoda da çökme, asılı kalma, hatalı döngü yok; header her ölçümde görünür.
- WebKit süreç belleği A/B/C arasında ±%1–2 (gürültü düzeyinde). **Özel çapa navigasyonunu kaldırmak emülasyonda bellek ya da kararlılık açısından ölçülebilir bir fark yaratmıyor.** Chromium'da B/C, A'dan ~%7–9 düşük.
- Video: hizmet sayfalarında bekleme sonrası oynayan video 0 (ekran dışında duraklatılıyor); tamponlu video sayısı üç senaryoda aynı (stabilite v1.1.1'de uzak-bırakma varsayılan kapalı).
- **ATS ölçümü hakkında:** yönlendirilen belgelerde sunucunun `Set-Cookie` başlıkları taşınmadığı için WebKit'te geri dönüşlerin 21/21'inde, Chromium'da 0/21'inde ATS yeniden yüklemesi görüldü. Bu, gerçek oranı temsil etmiyor (yönlendirmesiz önceki ölçümde 10 geri dönüşte 4). Üç senaryoda eşit olduğu için karşılaştırmayı bozmuyor. Wix güvenlik mekanizmasına dokunulmadı.

### 4. Menüden doğrudan gezinme + geri/ileri (`menuhop.js`)
Ana sayfa → (B/C: MENU → Hizmetler → alt bağlantı; A: aynı adreslere doğrudan gezinme) 7 hizmet sayfası → 7× geri → 7× ileri (22 adım).

| | WebKit | Chromium |
|---|---|---|
| A | 1. koşu: geri 7/7, **ileri 1/7** (6 `goForward` zaman aşımı); 2. ve 3. koşu: 22/22 | 22/22 |
| B | 22/22 (2 koşu) | 22/22 |
| C | 22/22 | 22/22 |

Tüm başarılı adımlarda yol sırası doğru ve header görünür. A'daki ileri geçmişi kaybı bir kez görüldü, iki tekrarda oluşmadı; nedeni belirlenemedi. Bu testte A'da gezinme yöntemi farklı olduğu için bellek değerleri A ile B/C arasında karşılaştırılmamalı.

### 5. Testlerin sınırları
- Gerçek iOS Safari/Chrome, gerçek BFCache, Düşük Güç Modu ve jetsam test edilemedi.
- ATS gerçek davranışı bu düzenekte temsil edilemedi (bkz. §3).
- Ölçüm kapsamı sınırları: §11 (V1.1) geçerli.

### 6. Fiziksel cihaz testi planı (sizin tarafınızdan, her aşamadan sonra)
Aynı iPhone, aynı Wi-Fi, Safari ve Chrome ayrı ayrı. DEPLOYMENT.md'deki her aşama yayınlandıktan sonra:
1. Ana sayfa → hizmet sayfası → geri hareketi → başka hizmet; 7 hizmet × 3 tur.
2. MENU → Hizmetler → 7 alt bağlantıyla sırayla gezinme, ardından geri ve ileri.
3. Uyarının çıktığı döngü numarası, iOS sürümü, tarayıcı ve cihaz modeli not edilir.

| Aşama | Ne değişir | Uyarı sürerse anlamı |
|---|---|---|
| 0 (A temiz) | hatalı V1.1 girişleri silinir | taban ölçüm |
| B | yeni menü, özel nav yok | çapa navigasyonu kök neden **değil** |
| C | + stabilite | stabilite yeterli değil → sıradaki aday: Ronin 2× film (MOBILE_MEDIA_BENCHMARK §5) |

---

# V1.1 TEST_REPORT


**Önemli:** Playwright WebKit 26.6 (Linux/WPE) testleri **gerçek iPhone Safari testi değildir.** V1.1'de de gerçek cihaz testi yapılmadı; kabul senaryosu §8'de, güvenli test yöntemi DEPLOYMENT.md "Aşama 1"de.

## V1.1 özeti (27 Kasım 2026)

| Test | Chromium | WebKit | Not |
|---|---|---|---|
| V1.1 işlevsel (kapsam, tanılama, varsayılan gözlemcisiz, BFCache ×2, ayrık video) | **13/13** | **13/13** | İlk turda 1 FAIL bulundu ve düzeltildi |
| Video davranışı (varsayılan ve `?n1far=1`) | **8/8 + 8/8** | **8/8 + 8/8** | Kullanıcı duraklatması korunuyor |
| Birim testi (uzak bırakma, src koruması, play() sarmalayıcı) | **5/5** | **5/5** | Yerel sayfa, `with_server.py` |
| Wix kod yapılandırmaları (test anahtarı / üretim / geri dönüş), gerçek CDN | **8/8** | **8/8** | Canlı HTML yeniden yazılarak |
| Nav yükleme sırası (7 senaryo) | korumayla 5/5 doğru; korumasız gecikmede **v1.0.1 kazandı** | korumayla 5/5 doğru | Koruma gerekli |
| Ön yükleme A/B (5 varyant × 3 tur) | Ana sayfa −2,2/−2,4 sn; iç sayfalarda fayda yok | — | PERFORMANCE_REPORT V1.1 |
| credentials include/omit | aynı önbellek isabeti | doğrulanamadı (WPE boyut vermiyor) | |
| Ronin medya benchmark | +44/+68/+95 MB | +71/+99/+129 MB | MOBILE_MEDIA_BENCHMARK |
| Uzun bekleme süreli 21 döngü (eşleştirilmiş) | bırakma çalışıyor; bellek farkı yok | bırakma çalışıyor; bellek düşmüyor (2 koşu) | Uzak-bırakma varsayılan kapalı |

## 9. V1.1 ayrıntılı test sonuçları
Ham çıktı: `qa/results/v11-functional-results.txt`, `navorder-*.json`.

### 9a. Kapsam
`/intelligence`, `/intelligence-admin`, `/dashboard`, `/ella-cikolata` (müşteri), `/iletisim` (izin listesinde değil) sayfalarında `__n1Stability.active=false`, `__n1Nav.active=false` (`reason:'scope'`): dinleyici, gözlemci, zamanlayıcı ve ağ isteği yok. Bu sayfaların kaynak dosyalarına dokunulmadı; yalnızca okuma amaçlı açıldılar.

### 9b. Yaşam döngüsü (sentetik BFCache, iki döngü arka arkaya)
`pagehide` → IO=yok, MO=yok, uzak zamanlayıcılar temiz. `pageshow(persisted)` → tek IO yeniden kuruldu, `starts=1` (tekrarsız), `bfRestores=2`; hero yeniden oynuyor. Uzaktayken DOM'dan çıkarılan video: 4,8 sn sonra zamanlayıcı yok, gözlem bırakıldı, `play` sarmalayıcısı yok, kaynak geri yüklenmedi.

### 9c. Tanılama
Normal ziyaretçi: `n1*` sessionStorage yazımı **0**, tanılama kutusu yok. `?n1diag=1` → ana sayfadan hizmet sayfasına geçişte tanılama açık kaldı ve önceki sayfanın `pagehide` günlüğü görünüyor. `?n1diag=0` kapatıyor.

### 9d. Nav yükleme sırası (madde 4)

| Senaryo | Chromium | WebKit |
|---|---|---|
| A koruma, gecikme yok | 1.0.3 · çapa OK | 1.0.3 · çapa OK |
| B koruma, yeni nav +6 sn (eski önce yüklenir) | **1.0.3** · çapa OK | 1.0.3 · çapa OK |
| C koruma YOK, yeni nav +6 sn | **1.0.1 etkin (çakışma raporlandı)** | 1.0.3 |
| D koruma, eski nav +6 sn | 1.0.3 | 1.0.3 |
| E koruma yok, gecikme yok | 1.0.3 | 1.0.3 |
| F koruma, yeni nav 404 | hiçbiri (yerel çapa) | hiçbiri |
| G koruma, yeni +3 sn, masaüstü | 1.0.3 · çapa OK | 1.0.3 · çapa OK |

Yöntem: canlı ana sayfa HTML'i test sırasında yeniden yazıldı (head'e koruma, body-end'de v1.0.1 → v1.0.3); ana sayfanın kendi yüklediği eski nav dahil gerçek sıra korundu.

### 9e. Test anahtarı ve yapılandırmalar (madde 9)
Normal ziyaretçi = canlı (nav 1.0.1, stabilite yok) · `?n1v11=1` → 1.0.3 + 1.1.0 · hizmet sayfasında ve geri dönüşte açık · `?n1v11=0` → canlı · üretim (01+02) → 1.0.3 + 1.1.0, /intelligence pasif · geri dönüş (05) → 1.0.1. İki motorda 8/8.

## 10. Uzun bekleme süreli 21 döngü (madde 7)
Yöntem (`qa/scripts/cycle2.js`): ana sayfa → hizmet i → 5 adımda en alta kaydırma + **6 sn bekleme** (4 sn bırakma eşiği + IO gecikmesi kapsanır) → ölçüm → geri → ana sayfada en alta kaydırma + 6 sn bekleme → ölçüm. Varyantlar **aynı anda, eşleştirilmiş** koşuldu (aynı CPU yükü); her koşu kendi tarayıcı süreç ağacını ölçer. Uzak-bırakmanın gerçekten tetiklendiği bu testte V1.0 testindeki 2,8 sn / 4 sn uyumsuzluğu giderildi.

| Koşu | Varyant | Hizmet sayfası bekleme sonrası tamponlu / toplam video | Bırakılan | En büyük süreç ort. / maks. / son 15 ort. (MB) | Hatalı döngü / asılı kalma / çökme |
|---|---|---|---|---|---|
| WebKit koşu 1 | canlı | 46 / 51 | 0 | 1433 / 1768 / 1642 | 3 / 1 / 0 |
| WebKit koşu 1 | V1.1 | 0 / 53 | 47 | 1556 / 2087 / 1890 | 3 / 0 / 0 |
| WebKit koşu 2 | canlı | 47 / 53 | 0 | 1524 / 1910 / 1760 | 3 / 0 / 0 |
| WebKit koşu 2 | V1.1 | 1 / 43 | 38 | 1499 / 1984 / 1763 | 5 / 0 / 0 |
| WebKit koşu 2 | V1.1 uzak-bırakma kapalı | 54 / 60 | 0 | 1432 / 1741 / 1614 | 0 / 0 / 0 |
| Chromium | canlı | 54 / 60 | 0 | 448 / 635 / 446 | 0 / 0 / 0 |
| Chromium | V1.1 | 0 / 60 | 54 | 446 / 634 / 423 | 0 / 0 / 0 |

Tek sayfa çalkantı deneyi (WebKit, `/uygulama-gelistirme`, 12 × en alt/en üst, 6,5 sn bekleme, 2 tekrar, `qa/results/churn/`): canlı 634–646 MB, V1.1 640–661 MB, uzak-bırakma kapalı 643–654 MB → bırakma/geri yükleme çalkantısı bellek sızdırmıyor.

**Sonuç ve karar:**
- Uzak-bırakma kaynakları gerçekten serbest bırakıyor (WebKit hizmet sayfalarında tamponlu video 46/51 → 0/53; Chromium 54/60 → 0/60).
- Buna rağmen WebKit süreç belleğinde ölçülebilir bir düşüş yok: iki koşuda V1.1 ortalaması canlının −%2 ile +%9 aralığında; canlının kendi koşular arası farkı %6 (1433 ↔ 1524 MB). Uzak-bırakma kapalı varyant kendi koşusunda en düşük (1432 MB), ancak tek örnek.
- Karar: **uzak-bırakma varsayılan KAPALI** (`?n1far=1` ile yalnızca test cihazında açılır). `pagehide`/BFCache bırakma ve geri yükleme korunur; hedeflediği BFCache yolu bu ortamda oluşmadığı için ölçülemedi ve fiziksel cihazda test edilmelidir.
- Asılı kalma: yalnızca canlı varyantta 1 kez (koşu 1, 17. döngü, kaydırma >30 sn). V1.0'daki ilk WebKit canlı koşusunda da 15. döngüde görülmüştü. Düzeltmeli varyantlarda 5 koşuda 0. Örneklem küçük; bu bir kanıt değil, gözlem.
- Hatalı döngülerin tamamı `domcontentloaded` 30 sn zaman aşımı (ortamda engelli üçüncü taraf hostlar); varyantlar arasında sistematik değil (0–5).
- Varsayılan yapılandırma (uzak kapalı) son kez doğrulandı: işlevsel 13/13, video 8/8 (iki motor, `?n1far=1` ile de 8/8), birim 5/5, yapılandırma 8/8.


## 11. Ölçüm kapsamının sınırları (V1.1 düzeltmesi)

V1.0 raporundaki "belge içi birikim yok" ifadesi **yalnızca ölçülen sayaçlar için** geçerlidir; tüm bellek sızıntısı olasılıklarının elendiği anlamına gelmez.

**Ölçülenler (belge başına, yükleme +6 sn ve kaydırma sonrası):** `window`/`document` üzerindeki addEventListener sayısı (sarmalanmış API ile), setInterval sayısı, IntersectionObserver/MutationObserver/ResizeObserver canlı örnek sayısı, rAF çağrı hızı, GSAP global zaman çizelgesi alt öğe sayısı, ScrollTrigger sayısı, video öğesi durumları, DOM düğüm sayısı, Chromium JS heap (CDP), süreç RSS.

**Ölçülmeyenler / ölçülemeyenler:**
- Öğe düzeyindeki dinleyiciler (`element.addEventListener`) — yalnızca window/document sarmalandı.
- setTimeout zincirleri, Promise zincirleri, kapanışlar (closure) içinde tutulan referanslar.
- Ayrık (detached) DOM ağaçları — heap snapshot alınmadı.
- Yerel (native) bellek: video çözücü yüzeyleri, GPU dokuları, görsel çözme önbelleği, WebKit bellek önbelleği; yalnızca süreç RSS üzerinden dolaylı izlendi.
- BFCache'te bekleyen belgelerin belleği — Playwright Chromium/WebKit'te BFCache geri yüklemesi oluşmadı; bu yol yalnızca sentetik olaylarla test edildi.
- iOS'a özgü davranışlar: jetsam eşikleri, VideoToolbox, Safari'nin süreç modeli, Düşük Güç Modu, bellek baskısı uyarıları.
- 21 döngüden uzun oturumlar, saatler süren açık sekme, sekmeler arası etkileşim.
- Wix'in kendi çalışma zamanı (thunderbolt) ve üçüncü taraf betikler (ortamda bir kısmı engelli: Sentry, Google Ads, Facebook, wixappcloud) — bunların bellek davranışı gerçek ortamdakinden farklı olabilir.
- Sayaçlar her gezinmede yeni belgeyle sıfırlandığı için, tam sayfa geçişlerinde belge içi sızıntıyı ancak tek bir belgedeki uzun süreli kullanım ortaya çıkarır; bu test kısa süreli (sayfa başına ~15–20 sn) yapıldı.

**Sonuç:** Ölçüm, belge içi sızıntının *ölçülen sayaçlarda* görülmediğini gösterir; süreç düzeyindeki birikim (WebKit) ölçülmüş ve kısmen açıklanmıştır. Diğer sızıntı türleri ne doğrulanmış ne de elenmiştir.


---

# V1.0 TEST_REPORT


**Önemli:** Playwright WebKit 26.6 (Linux/WPE) testleri **gerçek iPhone Safari testi değildir.** Gerçek cihazda test yapılmadı; kabul senaryosu §8'de.

"Düzeltmeli" testlerde yeni dosyalar canlı sayfaya `DOMContentLoaded` anında enjekte edildi (Wix bodyEnd `defer` özel kodunun çalıştığı an). Eski nav v1.0.1 bir yer tutucuyla devre dışı bırakıldı (= Wix'te v1.0.1 satırının v1.0.2 ile değiştirilmesi). İlk denemede Playwright `route` kullanılmıştı; bu yöntem HTTP önbelleğini kapattığı için zaman ölçümünü +8,5 sn bozuyordu. Bu sonuçlar **atıldı**, yöntem değiştirildi (`qa/scripts/build-inject.sh`).

Betikler: `qa/scripts/` · Ham sonuçlar: `qa/results/`

## 1. Özet

| Test | Chromium | WebKit | Sonuç |
|---|---|---|---|
| 21 döngü ana sayfa ↔ 7 hizmet sayfası, canlı | 21/21 döngü, 63/63 ölçüm | 19/21 döngü (2 adım `domcontentloaded` zaman aşımı) | Çökme 0 |
| 21 döngü, düzeltmeli | 21/21, 63/63 | 19/21 (aynı tür 2 zaman aşımı) | Çökme 0, asılı kalma 0 |
| İlk WebKit canlı koşusu | — | 14. döngüden sonra WebContent 1,6 GB'ta asılı kaldı | Tekrarlanmadı, kanıt `qa/results/base-webkit-run1-hang*` |
| Navigasyon (7 senaryo × 3 cihaz) | 22/24 (2 = Wix AbortError) | **27/27** | Geçti |
| Video davranışı (8 adım) | **8/8** | **8/8** | Geçti |
| Markalar slider (3 görünüm + döndürme) | Geçti | Geçti | Hata yeniden üretilemedi |
| Görsel regresyon (3 sayfa × 3 cihaz) | Geometri 9/9 aynı | — | Geçti |
| Genişletilmiş görünüm matrisi (14 ölçü × 2 sayfa) | **28/28** | — | Geçti |
| Konsol / yakalanmamış Promise (1N kaynaklı) | 0 / 0 | 0 / 0 | Geçti |
| Karışık içerik | 0 istek | — | Geçti |

## 2. Tekrarlı navigasyon döngüsü (21 döngü: ana sayfa → hizmet i → kaydır → geri)

Ölçüm: her yükleme +6 sn ve kaydırma sonrası. Sayaçlar: `qa/scripts/instrument.js`.

**Belge başına sayaçlar (ana sayfa, geri dönüş sonrası, 21 döngü boyunca):** window dinleyici 112–115, document dinleyici 42, interval 8, canlı IO 8 / MO 4 / RO 1, ScrollTrigger 13, video 5 (kaynaklı 1–2). Hizmet sayfaları da kendi içinde sabit. **Belge içi birikim yok.** Header/Logo/MENU 4 koşunun 244/244 ölçümünde görünür (yükleme + 6 sn sonrası; ilk saniyelerdeki gecikme §PERFORMANCE'ta ölçüldü).

| Metrik | Canlı | Düzeltmeli |
|---|---|---|
| Chromium toplam tarayıcı RSS ort./maks. | 1115 / 1298 MB | 1093 / 1322 MB |
| Chromium JS heap ort./maks. | 47 / 69 MB | 42 / 54 MB |
| WebKit WebContent süreci ort./maks. | 1486 / 1949 MB | 1465 / 1886 MB |
| WebKit son 15 ölçüm ort. | 1690 MB | 1626 MB |
| Yakalanmamış Promise (1N) | 0 | 0 |

Yorum: Düzeltmenin süreç belleğine etkisi emülasyonda **gürültü düzeyinde (~%4)**. Neden bu kadar küçük kaldığı ROOT_CAUSE_ANALYSIS.md §4'te açıklanıyor.

## 3. Navigasyon (Sorun 02) — `qa/results/nav-*.json`

| Senaryo | Mobil 390 | Tablet 820 | Masaüstü 1440 |
|---|---|---|---|
| Ana sayfa MENU → Hizmetler (hedef header altında) | ✓ top 76 / header 64 | ✓ 84/72 | ✓ 100/88 |
| İç sayfa MENU → Hizmetler → `/#hizmetler-ozet` | ✓ | ✓ | ✓ |
| Geri → hizmet sayfası | ✓ | ✓ | ✓ |
| İleri → `/#hizmetler-ozet` konumu | ✓ | ✓ | ✓ (**v1.0.1'de FAIL**: top 2781) |
| Yenileme: çapa temizlenir, en üst | ✓ | ✓ | ✓ |
| Doğrudan URL `/#hizmetler-ozet` | ✓ | ✓ | ✓ |
| `/n1-full-test` → 301 → `/` | ✓ | ✓ | ✓ |
| Aktif nav sürümü | 1.0.2 | 1.0.2 | 1.0.2 |

Chromium mobil/tablette `AbortError: Transition was skipped` görüldü; canlıda da var ve Wix View Transitions kaynaklı.

## 4. Video davranışı (Sorun 03) — `/kreatif-produksiyon`, `qa/scripts/videotest.js`

| Adım | Chromium | WebKit |
|---|---|---|
| Görünürken sessiz + inline oynuyor | ✓ | ✓ |
| Ekran dışına çıkınca duruyor | ✓ | ✓ |
| Geri gelince devam ediyor | ✓ | ✓ |
| Kullanıcı duraklattı | ✓ (t=10,21) | ✓ (t=7,31) |
| Uzakta 4 sn+ → kaynak bırakıldı (`readyState 0`) | ✓ | ✓ |
| Geri dönünce kullanıcı duraklatması korunuyor | ✓ | ✓ |
| Kaynak ve konum geri geldi | ✓ (10,21) | ✓ (7,31) |
| Kullanıcı tekrar oynatınca oynuyor | ✓ | ✓ |

Ana sayfa (`qa/scripts/func.js`): sayfa sonunda yukarıdaki 3 video bırakıldı. Başa dönünce Ronin hero geri yüklendi ve oynadı. Sentetik BFCache sonrası hero `playing / is-ready`, kareler ilerliyor (WebKit). Hata 0.

## 5. Markalar (Sorun 05) — `qa/scripts/marquee.js`, `rotate.js`

Canlı (sitewide-fix v11) ve eski v11 aynı sonucu verdi: 390×844, 820×1180, 1180×820 ve döndürme (844×390 ↔ 390×844, 1180×820 ↔ 820×1180) senaryolarında üç satır hareket ediyor. Satırlar sağ kenarı dolduruyor (`coversRight=true`). En büyük boşluk logolar arası normal aralık kadar (46/72/76 px). Uzaklaşıp dönünce satırlar devam ediyor. **Hata emülasyonda yeniden üretilemedi** → fiziksel cihazda §8-M ile kontrol edilmeli.

## 6. Görsel regresyon — `qa/results/vr-chromium.json`

Canlı ↔ düzeltmeli. Header çubuğu, logo, MENU, ilk başlık, font, 40 bölümün konum/yükseklikleri ve belge yüksekliği 9/9 kombinasyonda **birebir aynı**. Header şeridi piksel farkı: 0,00% (8 kombinasyon), mobil ana sayfada %1,02 (fark y=115–139 px: header altındaki Ronin filminin farklı karesi; header aynı).

## 7. Genişletilmiş matris — `qa/results/matrix.json`

320×640, 360×780, 375×812, 390×844, 414×896, 430×932, 844×390, 768×1024, 820×1180, 1024×1366, 1180×820, 1280×800, 1440×900, 1920×1080 × (`/`, `/kreatif-produksiyon`): yatay taşma 0, tek header (görünür), tek yüzen kontrol, 1N kaynaklı hata 0 → **28/28**. 1180×820'de emülasyon `pointer: fine` olduğundan modül pasifti; gerçek iPad yatayda aktif olmalı (§8-T).

## 8. Fiziksel cihaz kabul testi (yapılmadı — sizin tarafınızdan)

Hazırlık (V1.1): Wix'te DEPLOYMENT.md **Aşama 1 (test anahtarı)** uygulanıp yayınlandıktan sonra, test cihazında bir kez `https://www.reklam1n.com/?n1v11=1&n1diag=1` açın; aynı sekmede tüm sayfalarda V1.1 ve sol altta günlük açık kalır. Karşılaştırma için aynı testi `?n1v11=0` (V1.1 kapalı) ile de yapın.

**iPhone — Safari ve Chrome (ayrı ayrı):**
1. Ana sayfa → Hizmetler → bir hizmet sayfası → telefonun geri hareketi → başka hizmet. 7 hizmetin tamamı × 3 tur (21 döngü). Beklenen: "Bu sayfa pek çok hata ile karşılaştı" uyarısı **yok**.
2. Geri dönüşte günlükte `pageshow persisted=true` (BFCache) mi, `nav=reload` (Wix ATS) mı yazdığını not edin.
3. Her dönüşte Header, logo, MENU 1 sn içinde görünür mü?
4. Ronin filmi dönüşte oynuyor mu (poster takılı kalmamalı)?
5. Hizmet sayfasında videoyu elle durdurun → aşağı kaydırıp 5 sn bekleyin → geri çıkın: video durmuş kalmalı, aynı karede.
6. Düşük Güç Modu açıkken: video oynamazsa poster + oynat simgesi görünmeli, tek dokunuşla oynamalı.
7. MENU → Hizmetler (ana sayfada ve iç sayfada) → doğru bölüme iner mi? İleri/geri tuşları doğru konuma gider mi?
- (Mac varsa) Safari Web Inspector → Timelines → Memory: 21 döngüde "Page" belleğinin sürekli artıp artmadığını kaydedin.

**T — iPad dikey ve yatay:** 1–7 aynı. Yatayda `?n1diag=1` günlüğünde `mobil=true` görünmeli.

**M — Markalar:** iPhone ve iPad'de "Öne çıkan markalar" bölümünde 3 satırın da kaydığını, siyah boşluk olmadığını kontrol edin. Ekranı döndürüp tekrar bakın.

**Windows masaüstü:** Ana sayfa ve 2 hizmet sayfasında görünümün değişmediğini kontrol edin (modül masaüstünde pasif).

**V1.1 karşılaştırma planı (aynı cihaz, aynı Wi-Fi):** (1) `?n1v11=0` ile 21 döngü (bugünkü canlı), (2) `?n1v11=1` ile 21 döngü, (3) `?n1v11=1&n1far=1` ile 21 döngü. Her biri için uyarının çıktığı döngü numarası ve tanılama günlüğündeki `pageshow persisted=true` / `nav=reload` sayısı not edilir.

Sonuçları (cihaz modeli, iOS sürümü, tarayıcı, döngü sayısı, uyarı çıktı mı, günlük ekran görüntüsü) bildirin.
