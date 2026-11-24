# V22 — QA raporu

Tarih: 24 Kasım 2026 · Dosya: `n1-kreatif-produksiyon-v22.js` · Etiket: `n1-kreatif-produksiyon-v22`

## 1. Seçilen görseller ve nedenleri
Havuzdaki 11 görselden 10'u kullanıldı. Ayrıntılı gerekçeler `DESIGN_RATIONALE.md` içinde.

**Fikir (6 kare, sırayla tek kadrajda):**
| Anahtar kelime | Wix ID (6dbf5e_…) | Neden |
|---|---|---|
| Kamera | `ba8a6d60…` | Aynada kendini çeken fotoğrafçı: kameranın kendisi, "kadraj içinde kadraj". |
| Strateji | `3eaef254…` | Elleri iplerle örülü kadın: bağlantıları kurmak. |
| Işık | `00b6b548…` | Yelpazeden süzülen ışık ve gölge: ışığın neyi gösterip gizlediği. |
| Kompozisyon | `5f327cc9…` | Turuncu/turkuaz çizgisel yapı: çizgi, renk, ölçek. |
| Hareket | `7a7441e1…` | Rüzgârda savrulan pelerin: donmuş hareket. |
| Kurgu | `5b4e4092…` | Kâğıt başlıklı model, kırmızı zemin: grafik, kesin "son karar". |

**Storyboard (4 sahne):** Sahne 01 Creative Direction `0c8b5660…` (kırmızı kemer, üç kadın — renk dünyası), Sahne 02 Pre-Production `459992a3…` (kırmızı ışıklı set), Sahne 03 Production `634da616…` (ışık stantları, DJ — çekim günü), Sahne 04 Post-Production `68aff52a…` (neon, renk).

**Kullanılmayan:** `de17…` mavi tonlu kare — sıcak kırmızı-turuncu paletin dışında kaldı.

Görsellerin orijinal boyutları gerçek tarayıcıda okundu (1633×2450 ile 7360×4912 arası); hepsi Wix CDN'den `fit/w_W,h_3W` dönüşümüyle, 640/1000/1500/2000 px `srcset` ile isteniyor. Yatay kareler 4:5 kadraja `cover` ile oturduğu için `sizes` her kare için oranına göre büyütüldü (yatayda ×1,88, Kompozisyon'da ×1,56).

## 2. Fikir nasıl yeniden tasarlandı
- Solda V21'in metni korunuyor (kelime kelime aydınlanan paragraf + açıklama).
- Sağda (mobilde üstte, yapışkan) tek bir 4:5 ana kare; köşesine taşan "Sıradaki kare" önizlemesi; altında sayaç, başlık ve tek cümlelik açıklama; en altta 5 anahtar kelime düğmesi.
- Kaydırma metin boyunca ilerledikçe kare Kamera → Strateji → Işık → Kompozisyon → Hareket → Kurgu sırasıyla değişir; her geçişin kendine ait bir açılışı var (perde, merkezden açılış + ışık patlaması, soldan silme, yatay kayma, sert kesme). Geri kaydırmada sert kesme.
- Düğmelerle istenen kareye doğrudan gidilir (`aria-pressed`, altyazı `aria-live`).
- Galeri, slider, grid, kart veya kalın kenarlık kullanılmadı.

## 3. Kaldırılan wireframe öğeleri
- Fikir: `ideaSvg()` ve `BOARD` SVG dizisi; dış çizgili/üst üste binen dikdörtgenler, daireler, kesikli bağlantı çizgileri, HUD etiketleri (`kp-idea__canvas`, `kp-idea__svg`, `kp-idea__eyebrow`, `kp-idea__keys`, tüm `.kp-d-*` sınıfları) ve bunların GSAP animasyonları.
- Storyboard: tel kafes SVG kareler (`kp-board__svg`, `.kp-b-*`), karelerdeki köşe parantezleri (`brackets()` çağrısı) ve SVG çizim animasyonları.
- Derleme betiği bu adların hiçbirinin dosyada kalmadığını doğruluyor; QA'da Fikir ve storyboard içinde `svg` / köşe işareti sayısı 10 genişliğin hepsinde **0**.
- **Bilerek korunanlar:** hero, monitör, formatlar ve kapanıştaki köşe işaretleri ile format kılavuz çizgileri (işlevsel; hero ve video altyapısı korunacaktı).

## 4. Test edilen genişlikler
360×740, 375×812, 390×844, 430×932, 768×1024, 820×1180, 1024×1366, 1366×768, 1440×900, 1920×1080 (Playwright/Chromium, yer tutucu görsellerle):

| Kontrol | Sonuç (10 genişlik) |
|---|---|
| Yatay taşma (`scrollWidth` = genişlik) | Yok |
| Gizli kalan metin / satır çakışması (İ, Ş, Ğ, Ü) | 0 / 0 |
| Fikir + storyboard içinde SVG/köşe işareti | 0 |
| 10 görselin yüklenmesi ve `object-fit: cover` | 10/10 |
| Kaydırmada Fikir'in 6 karesinin hepsine ulaşılması | Evet |
| Düğme ile kare seçimi (Kompozisyon) | Ana kare, altyazı ve önizleme doğru |
| Önizleme karesinin metin/altyazı ile çakışması | Yok (ayrıca 768×520, 820×520, 1024×520'de) |
| Pin / ScrollTrigger sayısı | 0 pin / 9–12 tetikleyici |
| Header/Footer/panel/kontroller katmanı | 1/1/1/1 |
| Footer altı ve kapanış–footer arası boşluk | 0 / 0 |
| Konsol hatası | Yok |
| Unicode ok / emoji, #A1FF00 / #A2FF00, Lenis | Yok |

Dayanıklılık: GSAP önceden yüklüyken 3 kez kaldır/ekle (stil, tetikleyici, video kaynakları temizleniyor; GSAP tek kez yükleniyor), `prefers-reduced-motion` (1440 ve 390), GSAP hiç yüklenemediğinde (1440 ve 390, düğmeler yine çalışıyor), yön değişimi 844↔390 — hepsinde gizli metin 0, hata 0.

**Gerçek görsellerle tarayıcı testi:** Claude'un yerleşik tarayıcısında, gerçek Wix CDN görselleriyle 1440×900, 820×520 ve 390×844'te Fikir ve storyboard kontrol edildi; `screenshots/` klasöründeki kareler buradan.

## 5. Mobil ve tablet optimizasyonu
- **Mobil (≤767):** kare metnin üstüne alınır ve header'ın altında (`top: 64px`) yapışkan kalır; metin altından kayar, alt kenarda yumuşak bir karartma geçişi var. Kare yüksekliği `min(ekran − 40px, 42vh)` — 360×740'ta da metne yer kalır. Önizleme sağ alta küçülür, düğme satırı tek satır ve yatay kaydırılabilir. Hover'a bağlı hiçbir şey yok; parallax kapalı.
- **Tablet (768–1024):** iki sütun korunur; önizleme metin sütununa en fazla %5 taşar (ilk testte açıklama paragrafının son kelimelerini örttüğü görüldü ve düzeltildi).
- Görsel ağırlığı: yalnızca ilk kare hemen yüklenir; diğerleri `lazy`, `srcset` ile cihaz genişliğine uygun boyut seçilir.

## 6. Test edilemeyenler (dürüst not)
- **Wix Studio editörü ve canlı/Test Site** — dosya Wix'e yüklenmedi (onayınız olmadan değişiklik yapılmadı). Mobildeki yapışkan kare, Wix'in üst kapsayıcılarında `overflow: hidden` varsa çalışmayabilir; Test Site'ta telefonda ilk kontrol edilecek nokta bu.
- **Gerçek cihazlar** (iPhone Safari, Android Chrome) — yalnızca masaüstü Chromium'da mobil öykünmesiyle test edildi.
- **Gerçek görsellerle ekran görüntüleri:** tarayıcı paneli küçük olduğu için 1440 ve 820 görüntüleri 800 px genişliğe küçültülmüş durumda; 820 testi 520 px yükseklikte yapıldı. Tam boy düzen ölçümleri Playwright'ta yer tutucu görsellerle yapıldı (çalışma ortamı Wix CDN'e erişemiyor).
- **Tarayıcıdaki test kodu:** yerleşik tarayıcıda çalışan sürüm, son düzeltmelerin (görsel boyutları ve tablet önizleme konumu) aynı küçültülmüş koda metin olarak uygulanmış halidir; kaynak dosya bu düzeltmelerden sonra yeniden derlendi ve Playwright QA'sı son dosya üzerinde tekrar çalıştırıldı.
- **Video oynatma:** V21'den değişmeden alındı; bu turda video yalnızca kaynak seçimi ve hata durumu (yedek kare) açısından test edildi, gerçek oynatma bu ortamda yapılamadı.
- **Yüksek yoğunluklu ekran keskinliği (DPR 2–3):** Wix CDN istenen genişlikten biraz küçük dosya döndürüyor (ör. 640 isteğine 576 px). Retina ekranda `srcset` daha büyük sürümü seçer, ancak bu yalnızca DPR 1 öykünmesiyle doğrulandı; gerçek cihazda göz kontrolü önerilir.
