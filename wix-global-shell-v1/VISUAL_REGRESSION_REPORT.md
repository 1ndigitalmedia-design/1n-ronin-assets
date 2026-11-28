# VISUAL_REGRESSION_REPORT — görsel karşılaştırma (Chromium)

Ekran görüntüleri: `screenshots/`. Ölçümler: `qa/visual-compare.json` (`tests/visuals.js`). Konum `[x, y, genişlik, yükseklik]` px.

## 1. Menü: önce (bugün canlı V1.4) ↔ sonra
| Görünüm | Önce | Sonra |
|---|---|---|
| Masaüstü 1440 | `global-menu-masaustu-ONCE-canli.png` | `global-menu-masaustu.png` |
| Mobil 390 | `global-menu-mobil-ONCE-canli.png` | `global-menu-mobil.png` |
| İK alt menüsü | — | `global-menu-ik-alt-menu-masaustu.png`, `-mobil.png` |
| A7 + Platformlar | — | `a7-ve-platformlar-masaustu.png`, `-mobil.png` |

Değişen: İletişim satırı (diğerleriyle aynı boyut), İK "KARİYER +" ve bağlantılı başlık, Ekibimize Katıl yok, A7 Prodüksiyon ve Uygulama ve Platformlar kartları. Değişmeyen: diğer satırların tasarımı, Başlangıca Dön kartı, renkler, yazı tipleri, MENU/CLOSE.

## 2. Kurumsal header ↔ bağımsız header
| Profil | Ölçü | Kurumsal | Bağımsız |
|---|---|---|---|
| masaustu | h | `88` | `88` |
| masaustu | bar | `[72, 0, 1296, 88]` | `[72, 0, 1296, 88]` |
| masaustu | logo | `[72, 28, 32, 32]` | `[72, 28, 32, 32]` |
| masaustu | tag | `[607, 38, 225, 12]` | `[607, 38, 225, 12]` |
| masaustu | tagFont | `11.5px / 11.5px Barlow, "Helvetica Neue", Arial, sans-serif` | `11.5px / 11.5px Barlow, "Helvetica Neue", Arial, sans-serif` |
| masaustu | menu | `[1256, 22, 112, 44]` | `[1256, 22, 112, 44]` |
| masaustu | cta | `True` | `False` |
| tablet | h | `72` | `72` |
| tablet | bar | `[24, 0, 772, 72]` | `[41, 0, 738, 72]` |
| tablet | logo | `[24, 20, 32, 32]` | `[41, 20, 32, 32]` |
| tablet | tag | `[325, 30, 170, 12]` | `[325, 30, 170, 12]` |
| tablet | tagFont | `500 10px / 12px Barlow, Arial, sans-serif` | `500 10px / 12px Barlow, Arial, sans-serif` |
| tablet | menu | `[754, 16, 42, 40]` | `[737, 14, 42, 44]` |
| tablet | cta | `False` | `False` |
| mobil | h | `64` | `64` |
| mobil | bar | `[20, 0, 350, 64]` | `[20, 0, 351, 64]` |
| mobil | logo | `[20, 17, 30, 30]` | `[20, 17, 30, 30]` |
| mobil | tag | `[139, 28, 113, 9]` | `[139, 28, 113, 9]` |
| mobil | tagFont | `500 7.41px / 8.892px Barlow, Arial, sans-serif` | `500 7.41px / 8.892px Barlow, Arial, sans-serif` |
| mobil | menu | `[330, 12, 40, 40]` | `[331, 12, 40, 40]` |
| mobil | cta | `False` | `False` |

Sonuç: masaüstü ve mobilde birebir aynı (mobil 1 px fark kaydırma çubuğu/yuvarlamadan). Tablette bağımsız header **%90 içerik** kuralını uygular (kenar 41 px); kurumsal tablet header 24 px kenar boşluğu kullanır. Bu fark brief gereğidir. Bağımsız header'da Teklif Al yok (kurumsal masaüstünde var).

Görüntüler: `kurumsal-header-*.png` ↔ `bagimsiz-header-*.png`; menü açık: `bagimsiz-header-menu-*.png`.

## 3. Kurumsal footer ↔ bağımsız footer
| Profil | Ölçü | Kurumsal | Bağımsız |
|---|---|---|---|
| masaustu | h | `578` | `578` |
| masaustu | brand | `[72, 136, 472, 48, '51.84px', '"Barlow Condensed"']` | `[72, 136, 472, 48, '51.84px', '"Barlow Condensed"']` |
| masaustu | top | `[72, 82, 1296, 282, '15px', 'Barlow']` | `[72, 82, 1296, 282, '15px', 'Barlow']` |
| masaustu | legal | `[1066, 166, 302, 138, '14.5px', 'Barlow']` | `[1066, 166, 302, 138, '14.5px', 'Barlow']` |
| masaustu | art | `[0, -322, 0, 0, '15px', 'Barlow']` | `[0, -322, 0, 0, '15px', 'Barlow']` |
| masaustu | copy | `[72, 526, 309, 22, '13.5px', 'Barlow']` | `[72, 526, 309, 22, '13.5px', 'Barlow']` |
| tablet | h | `784` | `784` |
| tablet | brand | `[41, 178, 738, 37, '40px', '"Barlow Condensed"']` | `[41, 178, 738, 37, '40px', '"Barlow Condensed"']` |
| tablet | top | `[41, 107, 738, 450, '15px', 'Barlow']` | `[41, 107, 738, 450, '15px', 'Barlow']` |
| tablet | legal | `[431, 349, 349, 138, '14.5px', 'Barlow']` | `[431, 349, 349, 138, '14.5px', 'Barlow']` |
| tablet | art | `[41, 557, 738, 142, '15px', 'Barlow']` | `[41, 557, 738, 142, '15px', 'Barlow']` |
| tablet | copy | `[41, 726, 309, 22, '13.5px', 'Barlow']` | `[41, 726, 309, 22, '13.5px', 'Barlow']` |
| mobil | h | `867` | `867` |
| mobil | brand | `[20, 115, 350, 41, '45px', '"Barlow Condensed"']` | `[20, 115, 351, 41, '45px', '"Barlow Condensed"']` |
| mobil | top | `[20, 77, 350, 609, '15px', 'Barlow']` | `[20, 77, 351, 609, '15px', 'Barlow']` |
| mobil | legal | `[20, 486, 350, 170, '14.5px', 'Barlow']` | `[20, 486, 351, 170, '14.5px', 'Barlow']` |
| mobil | art | `[20, 686, 350, 108, '15px', 'Barlow']` | `[20, 686, 351, 108, '15px', 'Barlow']` |
| mobil | copy | `[20, 817, 309, 22, '13.5px', 'Barlow']` | `[20, 817, 309, 22, '13.5px', 'Barlow']` |

Sonuç: yükseklik, marka, üst blok, yasal blok, partner görseli ve copyright konumları/yazı tipleri **üç profilde aynı** (mobilde 1 px genişlik farkı yuvarlama). Görüntüler: `kurumsal-footer-*.png` ↔ `bagimsiz-footer-*.png`.

## 4. Birleşik sayfalar (test sayfasında)
`birlesik-iletisim-{masaustu,tablet,mobil}.png`: Header CE → İletişim HTML V4 (değişmeden) → Wix Forms bölümü (yer tutucu) → Footer CE. `birlesik-akademi-*.png`, `birlesik-404-*.png`: içerik yer tutucusu + Header/Footer CE. Bölümler birbirine binmiyor; footer altında boşluk yok. **Gerçek Wix sayfaları değil**, Wix bölüm yapısının benzetimi.
