# PERFORMANCE_BEFORE_AFTER — V1.3 (canlı) ↔ V1.4, sayfa başına ölçüm

**Yalnız ölçülen değerler.**

**Yöntem:**
- Araç `tests/bytes14.js`; Chromium; CDP ağ olayları (yarım kalan video indirmeleri dahil; önbellek kapalı).
- Akış: sayfa açılır, 8 sn beklenir, 300 px adımlarla sona kadar kaydırılır, 3 sn beklenir.
- "Önce" canlı site, "sonra" aynı canlı sayfanın içinde V1.4 kodudur (`tests/route14.js`).
- Ham veri: `qa/bytes/*.json`, `qa/bytes/bytes.log`.
- Video istek sayıları `tests/net14.js` ölçümünden (`qa/net/`).

> **Okuma notu:**
> - Kahraman videoları akış hâlinde indirilir. Ölçüm penceresinde ne kadarının indiği her çalıştırmada değişir, bu yüzden **video MB tek ölçümde ±%15 oynar.** Ana sayfa ve masaüstündeki küçük artı/eksi değerler bu gürültüdür; kod ve istek sayısı aynıdır.
> - Kesin olan iki şey var: **video istek sayısı** ve **görsel baytı**.
> - LCP ve CLS tek ölçümdür; CLS değişimi ±0,01 içinde.
> - Bunlar iPhone ölçümü değildir.

## 1. Aktarılan veri
### Mobil (iPhone benzetimi 390×844 @3, Chromium)

| Sayfa | Video istekleri önce→sonra | Video MB önce→sonra | Görsel MB önce→sonra | Toplam MB önce→sonra | Toplam fark | CLS önce→sonra | LCP ms önce→sonra |
|---|---|---|---|---|---|---|---|
| `/` | 5→5 | 16.98 → 17.64 | 0.87 → 0.82 | 28.01 → 28.55 | +0.54 (+2%) | 0.0126 → 0.0138 | 3588 → 3720 |
| `/kreatif-produksiyon` | 2→1 | 14.78 → 10.92 | 2.60 → 2.91 | 25.88 → 22.34 | -3.53 (-14%) | 0.0549 → 0.0548 | 3216 → 2512 |
| `/e-ticaret-yonetimi` | 3→1 | 3.96 → 0.51 | 34.80 → 1.71 | 47.39 → 10.87 | -36.52 (-77%) | 0.0292 → 0.0299 | 2736 → 2848 |
| `/sosyal-medya` | 2→1 | 24.93 → 11.08 | 1.63 → 1.46 | 35.43 → 21.21 | -14.22 (-40%) | 0.0462 → 0.047 | 3440 → 2900 |
| `/reklam-yonetimi` | 2→1 | 4.49 → 0.34 | 1.16 → 1.38 | 14.38 → 10.45 | -3.93 (-27%) | 0.0415 → 0.0262 | 3476 → 2880 |
| `/ui-ux-tasarim` | 1→0 | 0.71 → 0.00 | 4.32 → 4.84 | 14.72 → 14.22 | -0.51 (-3%) | 0.0287 → 0.0287 | 2676 → 2316 |
| `/yapay-zeka` | 3→1 | 20.47 → 6.63 | 0.70 → 1.33 | 30.08 → 16.85 | -13.23 (-44%) | 0.023 → 0.023 | 3060 → 3740 |
| `/uygulama-gelistirme` | 4→1 | 7.82 → 3.23 | 1.14 → 1.35 | 17.77 → 13.80 | -3.96 (-22%) | 0.0031 → 0.0018 | 2936 → 2812 |
| **8 sayfa toplamı** | | | | **213.7 → 138.3** | **-75.4 MB (-35%)** | | |

### Tablet yatay (iPad benzetimi 1180×820 @2, dokunmatik, Chromium)

| Sayfa | Video istekleri önce→sonra | Video MB önce→sonra | Görsel MB önce→sonra | Toplam MB önce→sonra | Toplam fark | CLS önce→sonra | LCP ms önce→sonra |
|---|---|---|---|---|---|---|---|
| `/` | 5→5 | 25.01 → 29.71 | 0.82 → 0.80 | 35.72 → 40.69 | +4.98 (+14%) | 0.1518 → 0.155 | 4032 → 4468 |
| `/kreatif-produksiyon` | 2→1 | 20.20 → 12.24 | 2.92 → 2.84 | 32.92 → 25.52 | -7.40 (-22%) | 0.0812 → 0.0793 | 2832 → 2416 |
| `/e-ticaret-yonetimi` | 3→1 | 3.37 → 0.65 | 36.34 → 1.69 | 49.52 → 12.98 | -36.54 (-74%) | 0.1452 → 0.1452 | 2756 → 2604 |
| `/sosyal-medya` | 4→1 | 29.65 → 11.18 | 1.72 → 1.76 | 41.76 → 23.41 | -18.35 (-44%) | 0.1663 → 0.1662 | 3128 → 2520 |
| `/reklam-yonetimi` | 2→1 | 4.93 → 0.80 | 1.36 → 1.85 | 16.09 → 13.00 | -3.09 (-19%) | 0.1885 → 0.1873 | 2604 → 2552 |
| `/ui-ux-tasarim` | 1→0 | 0.09 → 0.00 | 4.28 → 4.72 | 13.98 → 14.74 | +0.76 (+5%) | 0.1039 → 0.1006 | 2592 → 2620 |
| `/yapay-zeka` | 3→1 | 21.19 → 7.97 | 1.35 → 1.84 | 32.46 → 19.63 | -12.83 (-40%) | 0.1001 → 0.1109 | 316 → 3056 |
| `/uygulama-gelistirme` | 4→1 | 7.85 → 2.78 | 1.05 → 1.35 | 18.60 → 14.06 | -4.54 (-24%) | 0.073 → 0.073 | 2824 → 2572 |
| **8 sayfa toplamı** | | | | **241.0 → 164.0** | **-77.0 MB (-32%)** | | |

### Masaüstü 1440×900 @1 (Chromium)

| Sayfa | Video istekleri önce→sonra | Video MB önce→sonra | Görsel MB önce→sonra | Toplam MB önce→sonra | Toplam fark | CLS önce→sonra | LCP ms önce→sonra |
|---|---|---|---|---|---|---|---|
| `/` | 3→3 | 16.81 → 17.33 | 0.49 → 0.46 | 40.32 → 43.27 | +2.95 (+7%) | 1.537 → 1.537 | 3556 → 2612 |
| `/kreatif-produksiyon` | 2→2 | 21.08 → 18.67 | 1.76 → 1.78 | 29.74 → 27.30 | -2.43 (-8%) | 0.0927 → 0.0928 | 3436 → 2972 |
| `/e-ticaret-yonetimi` | 3→3 | 3.22 → 3.01 | 36.47 → 0.92 | 46.54 → 10.75 | -35.79 (-77%) | 0.1628 → 0.1663 | 2888 → 2740 |
| `/sosyal-medya` | 4→4 | 30.11 → 32.26 | 1.19 → 1.30 | 38.04 → 40.44 | +2.40 (+6%) | 0.2033 → 0.2034 | 2940 → 2476 |
| `/reklam-yonetimi` | 2→2 | 4.61 → 4.89 | 1.11 → 1.22 | 12.60 → 13.18 | +0.57 (+5%) | 0.1933 → 0.1929 | 3252 → 2892 |
| `/ui-ux-tasarim` | 1→1 | 1.32 → 1.31 | 3.82 → 4.18 | 12.08 → 12.50 | +0.42 (+3%) | 0.1143 → 0.1367 | 2784 → 2476 |
| `/yapay-zeka` | 3→3 | 18.37 → 21.09 | 1.08 → 1.03 | 26.40 → 29.14 | +2.75 (+10%) | 0.1146 → 0.1169 | 3080 → 2732 |
| `/uygulama-gelistirme` | 4→4 | 7.24 → 8.41 | 0.92 → 0.91 | 14.98 → 16.23 | +1.26 (+8%) | 0.0857 → 0.0857 | 3064 → 2696 |
| **8 sayfa toplamı** | | | | **220.7 → 192.8** | **-27.9 MB (-13%)** | | |

### Yorum
- **Mobil:** 7 hizmet sayfasında video istekleri 17 → 6; ikincil video istekleri 11 → 0 (kalan 6 istek kahraman videoları; UI/UX'te kahraman yok). Mobil toplam aktarım −75,4 MB (−35 %, 8 sayfa).
  - En büyük kazanç E-Ticaret: −36,5 MB (−77 %). Görseller 34,80 → 1,71 MB, videolar 3,96 → 0,51 MB.
  - Sosyal −14,2 MB, Yapay Zekâ −13,2 MB.
- **Tablet yatay (iPad):** iPad yatay da hafif profilde. Ağır masaüstü medyası yüklenmez: −77,0 MB (−32 %).
- **Masaüstü:** videolar korunur (istek sayıları aynı). Tek kalıcı fark E-Ticaret görselleri: 36,47 → 0,92 MB, sayfa −77 %.
- **Ana sayfa:** kod ve medya politikası aynı, istek sayısı aynı (5 mobil / 3 masaüstü). MB farkları akış gürültüsüdür.

## 2. Bellek (Chromium mobil benzetimi — iPhone değeri DEĞİL)
`tests/mem14.js`: aynı sekmede ana sayfa ↔ 7 hizmet sayfası × 2 tur. Her ölçümden önce çöp toplama yapılır. Ham veri: `qa/mem/`.

| Ölçü | V1.3 | V1.4 |
|---|---|---|
| JS yığını, hizmet sayfaları (en az–en çok) | 18,6–19,3 MB | 18,7–19,7 MB (±1 MB; fark yok) |
| DOM düğümü, hizmet sayfası ortalaması | 2935 | **2646** (−10 %; `<video>` + kontroller yerine `<img>`) |
| Hizmet sayfasındaki `<video>` öğesi (2. tur, 7 sayfa toplamı) | 20 | **7** |
| 1. tur → 2. tur yığın / düğüm / dinleyici artışı | yok | yok (sızıntı belirtisi yok) |
| Renderer süreç RSS, 2. tur hizmet sayfası ortalaması¹ | 552 MB | 452 MB |

¹ RSS makinedeki tüm Chromium renderer süreçlerinin toplamıdır ve aynı anda çalışan diğer testlerden etkilenebilir. Yalnız yön göstergesidir. 1. tur canlı değerleri (769–1176 MB) eş zamanlı başka test nedeniyle kullanılmadı.

**iPhone Safari belleği ölçülemez** (Safari `performance.memory` vermez). Gerçek etki fiziksel cihaz kabulünde gözlenir.

## 3. Kod çözücü / oynatıcı yükü (hesaplanan, ölçülen istek sayısından)
Hafif profilde hizmet sayfası başına eş zamanlı olası video çözücü sayısı:
- Kreatif 2→1, E-Ticaret 3→1, Sosyal 4→1, Reklam 3→1, UI/UX 1→0, Yapay Zekâ 3→1, Uygulama 4→1.
- BFCache'te bekleyen belgede çözücü ve arabellek: V1.3'te tutuluyordu, V1.4'te 0 (RESOURCE_LIFECYCLE §5).
