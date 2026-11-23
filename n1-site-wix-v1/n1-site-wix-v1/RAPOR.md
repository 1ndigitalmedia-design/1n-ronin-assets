# n1-site-wix-v1 — teknik rapor (Aşama 04)

**Referans:** v6.47. Çalışma alanında v6.47'den sonra onaylanıp güncellenen başka bir sürüm yok. v6.47 dosyalarının 61'i SHA-256 ile doğrulandı, hiçbiri değişmedi. Aşama 03 paketi (`n1-site-test`) değiştirilmedi.

## 1. Mimari
- **Tek giriş noktası:** `n1-site-wix-v1.js`, Custom Element `<n1-site-v1>`. Modüller **ayrı dosyalarda** kalır; giriş dosyası onları v6.47 sırasıyla yükleyip başlatır. Kod tek bir dev bloğa dönüştürülmedi.
- **Modüller:** `modules/` altındaki 30 dosya v6.47 ile **bayt bayt aynı**. Tek istisna `n1-ecosystem-v647-wix.js`: yalnızca 4 ikon yolu `window.N1_ASSET_BASE` ile öneklendi, çünkü bunlar Wix'te sayfa adresine göre çözülüp kırılacaktı.
- **Sayfa iskeleti:** `site/n1-site-markup-v1.js` (okunur hali `kaynak/n1-site-markup-v1.html`). v6.47 `<body>` içeriği ile aynı; yalnızca şu üç değişiklik var:
  - Header'ın `accent` özniteliği kaldırıldı; `html` etiketine stil yazıyordu, değer kapsamlı CSS'te.
  - Video kaynakları yalnızca Wix adresleri.
  - Wix adresi olmayan görseller `{{ASSETS}}` önekli.
- **Kapsamlı stil:** `site/n1-site-base-v1.css`. v6.47 `index.html` genel stili, 67 genel seçici dahil, `css_scope.py` ile kapsama alındı. Kurallar:
  - özgüllük `:where()` ile v6.47 ile aynı;
  - `html`/`body`'ye kural yazılmaz;
  - `.has-js` html yerine bileşen kökünde;
  - `*{box-sizing}` normal özgüllükte, Wix'in genel kurallarına yenilmesin diye.
- **Üretim:** `kaynak/uretim/` (build.py, css_scope.py, entry.src.js). Paket v6.47'den yeniden üretilebilir.

## 2. Bağımlılık sırası
1. Google Fonts (Barlow, Barlow Condensed, Montserrat 700) — yoksa eklenir.
2. CSS: `site/n1-site-base-v1.css` → `n1-partners-v617` → `n1-samurai-video-v632` → `n1-stats-v632` → `n1-video-band-v633` → `n1-contact-cta-v634` → `n1-about-v635` → `n1-footer-v636` → `n1-ecosystem-v647` → `n1-gads-v643` → `n1-brands-v625` → `n1-showreel-v628` → `n1-sectors-v630`. Hepsi yüklenince iskelet yazılır.
3. İskelet:
   - `<template>` içinde hazırlanır;
   - Header ve yüzen kontroller **doğrudan body'de tek kez** kurulur;
   - Ronin `#heroSlot` yerine v6.47 öznitelikleriyle (.bin paketler) kurulur;
   - geri kalanı bileşene eklenir.
4. GSAP 3.13.0 → ScrollTrigger → SplitText (cdnjs). Sayfada zaten varsa **tekrar yüklenmez**; farklı bir sürüm varsa tanılamada uyarı verir.
5. JS (v6.47 sırası): `ronin-hero-v67` → `n1-header-v613` → `ronin-type-v613` → `n1-links-v646` → `n1-service-links-v644` → `js/gsap-vault-mit-v629` → `n1-partners-v617` → `n1-samurai-video-v621` → `n1-stats-v632` → `n1-contact-cta-v644` → `n1-about-v644` → `n1-footer-v646` → `n1-ecosystem-v647-wix` → `n1-gads-v643` → `n1-brands-v625` → `n1-showreel-v628` → `n1-sectors-v630` → `js/onizleme.js` → `n1-floating-controls-v632`.
6. Fontlar hazır ve sayfa yüklenmiş olunca **tek** `ScrollTrigger.refresh()`. Sonrasında yalnızca bileşen yüksekliği gerçekten değişirse (>2 px; görsel/video yüklenmesi, Wix yerleşimi) 250 ms gecikmeli bir yenileme. Sürekli döngü yok.
- **Pakete alınmayanlar:** `js/onizleme-baglanti-v644.js` (Claude önizlemesine özel bağlantı engelleme), `js/gsap-vault-mit-v614.js` (v6.47'de de kullanılmıyordu).
- `js/onizleme.js` adına rağmen sitenin parçasıdır: bölüm başlıklarının satır açılışını yapar.

## 3. Sayfa yüksekliği ve boşluk
- Bileşen hiçbir sabit yükseklik veya `min-height` koymaz; yükseklik bölümlerin gerçek akışından gelir.
  - Ronin'in kaydırma izi: `300 × 1svh`.
  - Ecosystem pin'inin `pinSpacing`'i, v6.47'deki gibi ScrollTrigger tarafından eklenir.
- **Yerel ölçüm:** bileşen = kapsayıcı = bölümler toplamı; footer'ın altı = bileşenin altı (0 px); sonraki Wix bölümüyle arada 0 px. Sayfa yüksekliği v6.47 ile **birebir aynı**:

| Genişlik | v6.47 | Paket | Ecosystem pin (başlangıç → bitiş, spacer) |
|---|---|---|---|
| 1366 | 11.473 | 11.473 | 8167 → 9434, 1774 |
| 1440 | 12.752 | 12.752 | 8991 → 10476, 2079 |
| 1920 | 15.517 | 15.517 | 11027 → 12809, 2495 |

- **Tanılama** (`debug`) yalnızca okur:
  - bileşen / kapsayıcı / bölümler toplamı;
  - bileşenden sonra kalan sayfa;
  - pin ve spacer;
  - sticky'yi bozabilecek üst öğeler (`overflow` hidden/auto/scroll);
  - kesen üst öğeler;
  - ScrollTrigger ve dinleyici sayıları.
- `sticky-fix` **varsayılan kapalı**; Wix kapsayıcılarına otomatik müdahale yok.

## 4. Header, yüzen kontroller, temizlik
- **Tek kopya:** Header ve yüzen kontroller v6.47'deki gibi body seviyesinde ve tek kopya. Önce `<template>` içinde hazırlandıkları için yanlış yerde bir kez kurulup menü verisini tüketmeleri önlendi (yeniden kurulumda bulunan hata, düzeltildi).
- **Body'ye eklenen öğeler:** modüllerin body'ye eklediği öğeler (menü paneli, yüzen kontrol kökü, Markalar ve Showreel imleçleri) `data-n1-owner` ile işaretlenir. Bileşen kaldırılınca hepsi kalkar.
- **Olay dinleyicileri:** yalnızca **bu paketin dosyalarından** eklenenler kaydedilip kaldırılır. Çağıran, çağrı yığınından belirlenir. Wix'in dinleyicilerine dokunulmaz (testte doğrulandı).
- **Diğer temizlik:**
  - bileşene bağlı ScrollTrigger'lar hemen, SplitText'in gecikmeli yeniden bölmeleri için 4 kısa süpürmeyle temizlenir;
  - modüllerin `html` etiketine eklediği sınıf (`has-scroll-highlight`) ve ScrollTrigger'ın yazdığı `scroll-behavior` geri alınır;
  - eklenen `<script>` etiketleri kaldırılır.
- **Ölçüm:**

| | Kurulum | Kaldırınca | Tekrar | 2. döngü |
|---|---|---|---|---|
| Header / panel / yüzen | 1 / 1 / 1 | 0 / 0 / 0 | 1 / 1 / 1 | 1 / 1 / 1 |
| ScrollTrigger | 14 | 0 (4,5 sn sonra da 0) | 14 | 14 |
| Kayıtlı paket dinleyicisi | 62 | kaldırıldı | 55 | 55 |
| Menü bağlantısı | 19 | — | 19 | 19 |
| Wix'in dinleyicileri | — | çalışıyor | — | — |

## 5. Bölüm testleri (yerel, 1366 / 1440 / 1920 — hepsi geçti, konsol hatası yok)
| Bölüm | Sonuç |
|---|---|
| 01 Ronin | Sticky sahne top = 0. Kareler 111 → 237 → 479, geri kaydırınca 137. 498 kare yüklendi. |
| 02 Header | MENU açılıyor (`aria-expanded=true`), Escape ile kapanıyor; 19 alt bağlantı; TEKLİF AL → `/teklif-al`. |
| 03 Scroll Text Highlight | 44 kelime; ortalama opaklık kaydırdıkça 0,68 → 1,00. 7 hizmet bağlantısı doğru. |
| 04 Partnerlikler | v6.47 ile piksel düzeyinde aynı. |
| 05 / 10 Samuray videoları | Wix adreslerinden yükleniyor (testte yerel kopyaya yönlendirildi). Görünürken oynuyor, ekran dışında duruyor (v6.47 davranışı). |
| 06 İstatistikler | Sayaçlar çalışıyor (karşılaştırma ekranında sayım ortası). |
| 07 Markalar | 10 marka; SÜRÜKLEYİN imleci; sürükleme ≈ −1250 px; TÜM MARKALARI GÖR → `/markalar`. |
| 08 Showreel | Mevcut video; açılınca sesli oynuyor, Escape ile duruyor. v6.47 ile aynı. |
| 09 Sektörler | v6.47 ile piksel düzeyinde aynı. |
| 11 Biz Kimiz | v6.47 ile aynı; HİKÂYEMİZİN DEVAMI → `/studyo-hikayesi`. |
| 12 Ecosystem | Pin + snap; tekerlekle 0 → 1 → 2 → 3; gri kare ikonlar aktarım klasöründen; 4 dış bağlantı `_blank` + `noopener noreferrer`. |
| 13 THE NEXT MOVE | Görsel aktarım klasöründen; PROJENİZİ KONUŞALIM → `/iletisim`. |
| 14 Google Ads API | Metin eksiksiz (431 karakter), gerçek HTML. |
| 15 Footer | 5 yasal + 4 sosyal bağlantı; 5 partner logosu aktarım klasöründen; altında boşluk yok. |
| 16 WhatsApp / Yukarı Çık | Tek kopya, body seviyesinde. |

**Görsel karşılaştırma (v6.47 ile aynı kaydırma konumlarında, 14 ekran × 3 genişlik):** bölümlerin çoğunda fark %0,0–0,3. %1'in üstündeki farkların hepsi zamanlamadan geliyor; bunları tek tek inceledim:
- iki samuray videosunun o anki karesi;
- sayaçların sayım ortası;
- Ecosystem listesinin yumuşak hareket anı;
- Ronin yazı katmanı (aşağıdaki not).

**Önemli not — Ronin yazı boyutu (v6.47'nin kendi davranışı):**
- `ronin-type` yazı boyutunu bir kez ölçüyor ve font yüklendikten sonra yeniden ölçmüyor.
- v6.47 önizlemesinde ölçüm font yüklenmeden yapıldığında yazı 75,6 px kalıyor. Aynı sayfada ölçüm yeniden çalıştırılınca 101,3 px oluyor; modülün kutuya sığdırma hesabının amaçladığı boyut bu.
- Pakette modüller fontlar hazırken başladığı için 101,3 px görünüyor.
- Modül değiştirilmedi. Hangi boyutun onaylı görünüm olduğuna sizin karar vermeniz gerekiyor:
  - (a) 101,3 px kalsın; ölçümü fontlar yüklenince bir kez daha çalıştırmak için tek satırlık bir ekleme ile her açılışta aynı sonuç alınır;
  - (b) v6.47 önizlemesinde gördüğünüz küçük boyut sabitlensin.

**Responsive:** 1366 / 1440 / 1920'de mobil kırılma noktaları devreye girmiyor. Görünüm v6.47 ile aynı olduğu için masaüstünü etkilemedikleri doğrulandı. Mobil kurallar değiştirilmedi.

**Wix benzeri genel kurallar** (`?hostile=1`: Times font, `*{box-sizing:content-box}`, a/img/section/h1–h3/p/ul/button sıfırlamaları):
- Görünüm değişmedi; fark %0,0–0,13.
- Bulunan tek etki (`img{border}`) için varsayılan değer kapsamlı CSS'te açıkça yazıldı.
- Wix'e ait bir `.site-container` öğesi etkilenmedi.

## 6. Riskler ve uyumluluk
1. **Wix sarmalayıcıları:** bölüm veya kutuda `overflow: hidden/auto` olursa Ronin sticky'si ve Ecosystem pin'i bozulur. Tanılama bunu gösterir; düzeltme ayrı onayla uygulanır.
2. **Otomatik yükseklik:** Aşama 03'te çalıştı. Tam sayfada (~12.700 px) Wix'in kutu yüksekliğini sınırlamadığı doğrulanmalı.
3. **Wix sayfa geçişleri:** iç bağlantılar (`/teklif-al` vb.) tam sayfa yüklemesiyle açılır. Bileşen kaldırılırsa temizlik çalışır (test edildi). Hedef sayfalar Wix'te yoksa 404 olur.
4. **Wix'in yüksek özgüllüklü genel stilleri:** sınıf + etiket gibi kurallar modül sınıflarını ezebilir. Yerel benzetimde görülmedi; Wix'te görsel karşılaştırmayla kontrol edilmeli.
5. **Çapalar ve id'ler:** `#ust`, `#hero`, `#iletisim`, `#footer` vb. v6.47 ile aynı. Wix sayfasında aynı id varsa çakışır (tanılamada kontrol edilebilir).
6. **GSAP:** sayfada başka bir GSAP sürümü varsa yeniden yüklenmez; uyarı verir.
7. **Video otomatik oynatma:** Wix adresleri yerelde gerçek Wix'ten değil, kopyalarından oynatıldı. `muted playsinline` ile otomatik oynatma Wix'te doğrulanmalı.
8. **Global izler:**
   - fontlar ve CSS `<head>`'de kalır (tekrar eklenmez);
   - Custom Element tanımları geri alınamaz (tarayıcı kısıtı);
   - modüllerin `gsap.matchMedia` kayıtları sayfada kalır, ama öğeleri olmadığı için etkisizdir.

## 7. Wix Test Site kontrol listesi
1. Tanılama: bileşen = kapsayıcı = bölümler toplamı; sticky uyarısı yok; header 1, yüzen 1; ScrollTrigger 14; pin satırı var.
2. Ronin ileri/geri; sahne yapışık; poster → ilk kare.
3. Menü aç/kapa (tıklama, Escape, dışarı tıklama); bağlantılar.
4. Scroll Text Highlight, Partnerlikler, iki video, sayaçlar.
5. Markalar sürükleme + imleç; Showreel aç/oynat/kapat; Sektörler; Biz Kimiz.
6. Ecosystem pin/snap ve çıkışta sayfanın devam etmesi.
7. THE NEXT MOVE, Google Ads metni, Footer; **sayfa sonunda boşluk olmaması**.
8. Konsol ve ağ: hata yok; Ronin yalnızca bir seri (Bx veya Bd) indiriyor; GSAP ve fontlar birer kez yükleniyor.

## 8. SEO planı (bu aşamada ayar değiştirilmedi)
- Metinler bileşende gerçek HTML: başlıklar (h1–h3), paragraflar, `<a href>` bağlantılar, Google Ads metni. Ancak içerik JavaScript ile oluşuyor.
- Wix'te Custom Element SEO'su Velo `seoMarkup` ile yapılır. Plan:
  1. İskeletteki başlıkları, gövde metinlerini, bağlantıları ve Google Ads API metnini **birebir** içeren bir SEO işaretlemesini derleme adımında üretmek. Fazla veya farklı içerik olmamalı (cloaking riski).
  2. Velo sayfa kodunda bunu `seoMarkup` olarak vermek.
  3. Wix sayfa başlığını ve açıklamasını mevcut SEO ayarlarından korumak.
  4. Test Site'ta dizine kapalı kalmak; canlıya geçişte ayrı onay.
- Görseller: alt / aria-label değerleri v6.47 ile aynı.
- Dekoratif Ronin yazıları `aria-hidden`.

## 9. Performans
- **Giriş dosyası** 22 KB; modüller + iskelet + stil toplam ~370 KB (sıkıştırmasız). Modüllerin hazır olma süresi (yerel) 0,7–0,9 sn.
- **Ronin:** poster önce görünür; a0 → a → b paketleri aşamalı iner. Seri ekran çözünürlüğüne göre tek (Bx 15,7 MB / Bd 12,4 MB). Bellekte en fazla 24 + 6 çözülmüş kare tutulur. Değişiklik yapılmadı.
- **Videolar:** iki samuray videosu v6.47'deki gibi `preload="auto"` + `autoplay`; Showreel `preload="none"` ve yakınlaşınca yüklenir.
  - **Öneri (onaysız uygulanmadı):** samuray videolarında `preload="metadata"` ile ilk açılış hafifler; görüntü kalitesi değişmez.
- **Fontlar:** `display=swap`. Ronin yazı katmanının fonttan sonra bir kez yeniden ölçülmesi önerilir (5. bölümdeki not).
- **GSAP:** tek sürüm, tek yükleme. 14 tetikleyici, 1 pin. Kontrollü refresh (fontlar + yükleme, sonrasında yalnızca gerçek yükseklik değişikliğinde).
- **Dinleyiciler:** paket dinleyicileri kayıtlı ve kaldırılabilir. Tekrar kurulumda sayı artmıyor (55 → 55).
- **Mobil için ileride:** küçük Ronin serisi (m, 5,8 MB) hazır; samuray videolarının mobil kaynakları ve Ecosystem'in tıklama modu (pin yalnız ≥1024 px) mobil aşamada ele alınacak.
