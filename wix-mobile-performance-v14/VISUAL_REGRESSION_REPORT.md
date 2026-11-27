# VISUAL_REGRESSION_REPORT — V1.3 (canlı) ↔ V1.4

**Araç:** `tests/vis14.js` (yakalama) ve `tools/vis_compare.py` (karşılaştırma). Ham sonuç: `qa/vis-compare.json`, `qa/vis.log`. Ekran görüntüleri: `screenshots/visual/` (5 kaydırma noktası × 8 sayfa × 3 profil × 2 sürüm = 240 görüntü; depoda JPEG, en çok 1000 px — piksel farkı ölçümü özgün PNG üzerinde yapıldı). Mobil ve tablet yan yana karşılaştırmaları: `screenshots/visual/compare/` (sol V1.3, sağ V1.4).

**Yöntem:**
- Chromium; profiller: masaüstü 1440×900, mobil 390×844 @2 (iPhone UA), tablet 820×1180 (dokunmatik).
- Sayfa sona kadar kaydırılıp başa dönülür; böylece tembel öğeler ve GSAP durumları oluşur.
- Ölçülenler:
  - belge yüksekliği;
  - yatay taşma;
  - görünür tüm `<video>` ve `img[data-n1-still]` kutularının konumu ve boyutu;
  - %0, 20, 40, 60, 80 kaydırma noktalarında piksel farkı (eşik 24/255). Ekran görüntüsünden önce videolar duraklatılıp 0. saniyeye alınır.

## 1. Sonuç özeti
| Profil | Sayfa | Belge yüksekliği V1.3 = V1.4 | Medya kutusu konum/boyut farkı | Yatay taşma |
|---|---|---|---|---|
| Masaüstü | 8/8 | **aynı** (12752, 10974, 11442, 11733, 13766, 15396, 15039, 15052) | **0 px** (8/8) | yok |
| Mobil | 8/8 | **aynı** (8995, 9266, 10609, 10547, 14781, 16549, 15536, 18613) | **0 px** (8/8) | yok |
| Tablet | 8/8 | **aynı** (10329, 9299, 10529, 11081, 12650, 15184, 13891, 15796) | **0 px** (8/8) | yok |

Kayma, boş alan ya da taşma oluşmadı. Her ikincil videonun kutusu V1.4'te aynı konum ve boyutta bir kareyle dolu.

## 2. Masaüstü (tasarım değişmez kuralı)
- Piksel farkı: sayfaların çoğunda kaydırma noktalarının ≥ 4/5'inde %0,00. Fark yalnız ilk ekranda, kahraman videosunun farklı bir karesinde görülür:
  - Kreatif %21,6. Kutu `[515,193,1368,718]` = kahraman videosu. Göz kontrolü: aynı sahne, farklı an (`screenshots/visual/kreatif-produksiyon-masaustu-*-0.png`).
  - Diğerleri < %2.
- E-Ticaret görselleri artık Wix boyutlandırma adresinden geliyor. %20–40 noktalarında fark %0,53 / %0,02; bu, yeniden örneklemenin piksel düzeyi farkıdır. Göz kontrolünde keskinlik kaybı yok.
- Masaüstünde video sayısı ve istekleri canlıyla aynı (TEST_REPORT §2).

## 3. Mobil / tablet: video → kare
Kontrol edilen yan yana sayfalar: E-Ticaret %20, Sosyal %40, Kreatif %60, Uygulama %80. Göz kontrolü:
- **Kutu ve kırpma:** aynı (`object-fit: cover`). Kenar, köşe yuvarlaklığı ve altyazı konumu aynı.
- **Keskinlik:** kareler kaynak videonun en yüksek kalitesinden alındı, büyütülmedi. 3× ekranda 720/960 w seçiliyor; bulanıklık yok.
- **Kare ↔ video yuvası:** Wix video kimlikleriyle eşleşiyor. Örnek: Uygulama 14209 px → `cbd02cfa` → `uygulama-screens`; Reklam 9393 px → `3855bf1d` → `reklam-karar` (MEDIA_INVENTORY §3).
- **Oynat/duraklat düğmeleri:** ikincil öğelerde kaldırıldı; kare oynatılamaz. Kreatif monitörde poster + oynat düğmesi kalır (dokunuşla video).
- **Piksel farkı:** yalnız kare olan bölgelerde (video karesi ↔ seçilmiş kare) ve kahraman videosunun anlık karesinde. Diğer noktalar %0.

## 4. Ana sayfa
- Ana sayfa medyası değişmedi. Mobil kutular aynı: 5 video, Ronin 2× 390×505.
- Tek görsel fark: "Hikâyemizin Devamı" bağlantısının hedefi (görünmez; HIKAYEMIZIN_DEVAMI_LINK_AUDIT).

## 5. Ölçülemeyenler
- Gerçek iPhone/iPad Safari görüntüsü (fiziksel cihaz kabulünde göz kontrolü: PHYSICAL_DEVICE_ACCEPTANCE §3).
- Animasyon sırasındaki ara kareler (GSAP; kod değişmedi).
