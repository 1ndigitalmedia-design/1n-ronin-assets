# TEST_REPORT — Global Shell V1 (Playwright Chromium + WebKit)

> Bu sonuçlar Playwright testleridir. **WebKit iPhone Safari değildir.** Fiziksel cihaz ve Firefox testi yapılmadı, gerçek Wix yayınında doğrulama yapılmadı (WIX_COMPATIBILITY).

**Toplam: 1156 kontrol geçti, 0 kaldı.** Ham sonuçlar `qa/test/*.json` ve `*.log` dosyalarında. Testler: `tests/shell-test.js`, `tests/pages-test.js`, `tests/active-test.js`.

## Düzenek
- **Canlı site + yerel dosya:** testler canlı `www.reklam1n.com` sayfalarını açar; `tests/routeshell.js` canlıdaki Server URL isteklerini bu paketin yerel dosyalarına yönlendirir. Böylece Wix'in gerçek DOM'u, Wix bileşenleri ve yükleyici ortamında yeni dosyalar çalışır.
- **Bağımsız bileşenler:** `/iletisim`, `/reklam-ajansi` ve 404 adreslerinde `tests/shell-page.html` açılır. Bu sayfa Wix bölüm yapısını taklit eder: sticky header bölümü, `overflow:hidden` ve `transform`. İçinde İletişim HTML V4 (iframe), Wix Forms yer tutucusu, Header CE ve Footer CE vardır.
- **Profiller:** masaüstü 1920/1440 × 900; tablet 1024/820 × 1366 (dokunmatik, 2×); mobil 440/390/375 × 844 ve 320 × 568 (dokunmatik, 2×, iOS UA). Chromium'da `isMobile` açıktır.

## 1. Bağımsız Header/Footer (shell-test, 40–41 kontrol × 16 çalıştırma)
| Genişlik | Chromium | WebKit | Header yük. | Footer yük. (Chromium / WebKit) | Panel üst–alt (iç kaydırma) | Platform kutusu |
|---|---|---|---|---|---|---|
| 1920 | 41/41 | 41/41 | 88 px | 611 / 611 px | 96–739 (sığıyor) | 84 px |
| 1440 | 41/41 | 41/41 | 88 px | 578 / 578 px | 96–739 (sığıyor) | 84 px |
| 1024 | 40/40 | 40/40 | 72 px | 718 / 718 px | 80–723 (sığıyor) | 84 px |
| 820 | 40/40 | 40/40 | 72 px | 784 / 784 px | 80–698 (sığıyor) | 96 px |
| 440 | 40/40 | 40/40 | 64 px | 892 / 892 px | 70–680 (sığıyor) | 88 px |
| 390 | 40/40 | 40/40 | 64 px | 867 / 867 px | 70–669 (sığıyor) | 77 px |
| 375 | 40/40 | 40/40 | 64 px | 844 / 844 px | 70–657 (kayar) | 73 px |
| 320 | 40/40 | 40/40 | 64 px | 856 / 856 px | 70–558 (kayar) | 61 px |

Her çalıştırmada doğrulanan kontroller:
- Header: Teklif Al yok
- Header: orijinal SVG logo kare zemini #A2FF00
- Header: dış genişlik %100, içerik %90 (±1 px), sol/sağ %5
- Header: yükseklik kurumsal ölçü (88/72/64)
- Header: DIGITAL ADVERTISING AGENCY. + Barlow + MENU düğmesi
- Tek header, tek panel
- Platform logoları menü açılmadan indirilmiyor
- MENU açıyor
- ana menü sırası ve adresleri (İletişim dahil)
- Ekibimize Katıl yok
- panel ekran içinde (gerekirse kendi içinde kayar), yatay taşma yok
- Başlangıca Dön → /
- A7 Prodüksiyon: adres, yeni sekme, noopener noreferrer
- Platformlar: sıra, adres, etiket
- Platformlar: dış bağlantılar yeni sekme + noopener noreferrer; Intelligence aynı sekme
- Platformlar: kare, eşit boyut, ≥ 44 px, tek satır, soldan sağa
- Platform logoları yüklendi (doğru dosya)
- İK alt menüsü açılıyor (2 bağlantı)
- Hizmetler alt menüsü (7) açılıyor
- klavye: A7 → 4 platform bağlantısı sırayla odaklanıyor, odak görünür
- Escape menüyü kapatıyor, odak MENU düğmesine
- kapanınca ekranda kart kalmıyor
- A7 tıklaması yeni sekme açıyor ve menü kapanıyor
- BFCache dönüşünde menü kapalı
- BFCache sonrası menü yeniden açılıyor
- yeniden bağlama ×3: tek header/panel/footer, dinleyici artışı yok
- Footer: dış genişlik %100, içerik %90 (±1 px)
- Footer: başlık, adres, telefon, e-posta (onaylı kaynak)
- Footer: 4 sosyal bağlantı SVG ikonlu (Facebook, Instagram, YouTube, LinkedIn)
- Footer: 5 yasal bağlantı
- Footer: 5 partner logosu görünür (TikTok, Meta, Google, Wix, Velo)
- Footer: TikTok logosu koyu zeminde görünür (gri)
- Footer: copyright
- Footer altında boşluk yok, yatay taşma yok
- WhatsApp / Yukarı Çık: tek katman (isteğe bağlı bileşen)
- video yok; platform logoları 160/320 WebP
- JS hatası yok
- Akademi: menüde Akademi aktif · 404: aktif öğe yok · her senaryoda JS hatası yok

## 2. Menünün mevcut sayfalardaki yeni sürümleri (pages-test)
Sayfalar: `/`, `/reklam-yonetimi`, `/kisaca-biz`, `/markalar`, `/gizlilik`, `/insan-kaynaklari`, `/staj-programlari`; ayrıca V1.4 koruma kontrolleri.

| Motor / genişlik | Sonuç |
|---|---|
| chromium 390 | 81/81 |
| chromium 1024 | 81/81 |
| chromium 1440 | 78/78 |
| webkit 320 | 81/81 |
| webkit 390 | 81/81 |
| webkit 1440 | 78/78 |

Kontroller (sayfa başına):
- A7 + 4 platform bağlantısı
- Başlangıca Dön → /
- Ekibimize Katıl yok
- JS hatası yok
- bütün satırlar aynı yazı boyutu (İletişim dahil)
- logolar menü açılmadan indirilmedi
- menü: 6 başlık, sıra ve adresler (İletişim dahil)
- normal kapanış: ekranda kart kalmıyor
- panel ekran içinde (gerekirse iç kaydırma), yatay taşma yok
- tarayıcı geri: menü açık kalmıyor
- İletişim bağlantısı /iletisim; menü kapalı, katman kalmıyor

V1.4 koruma:
- "Hikâyemizin Devamı" → /kisaca-biz
- E-Ticaret: WebP kare 2, kaynaklı video ≤ 1
- Ronin 2× kaynağı
- Ronin kademesi V1.4 kuralına uygun (film px × DPR > 840 → 2×, değilse doğal)
- mobil video modülü v14

## 3. Adres tabanlı aktif durum (active-test, gerçek adreslerde)
| Motor / genişlik | Sonuç |
|---|---|
| chromium 390 | 8/8 |
| chromium 1440 | 8/8 |
| webkit 390 | 8/8 |
| webkit 1440 | 8/8 |

| Adres | Vurgulanan satır | `aria-current` |
|---|---|---|
| `/insan-kaynaklari` | İnsan Kaynakları | İnsan Kaynakları |
| `/acik-pozisyonlar` | İnsan Kaynakları | Açık Pozisyonlar |
| `/staj-programlari` | İnsan Kaynakları | Staj Programları |
| `/reklam-ajansi` | Akademi | Akademi1N Academy |
| `/iletisim` | İletişim | İletişimBize ulaşın |
| `/kisaca-biz` | Kısaca Biz | Kısaca BizStüdyo |
| `/e-ticaret-yonetimi` | Hizmetler | E-Ticaret Yönetimi |
| `/bu-sayfa-yok-xyz` | — | — |

## 4. Testte bulunan sorunlar ve düzeltmeler
| # | Bulgu | Kök neden | Sonuç |
|---|---|---|---|
| 1 | 820 px tablette platform kutuları 174 px'e kadar büyüyordu | 4 sütun `1fr` | Kutu en fazla 96 px (`repeat(4,minmax(0,96px))`, `sizes="96px"`); header v14 @9bbcefd, bağımlılar @144d964 yeniden üretildi |
| 2 | Klavye testi odak ölçümünü panelden çıktıktan sonra yapıyordu | test adımı | ölçüm 4. Tab'a alındı (ürün değişmedi) |
| 3 | Kariyer sayfalarında "Kısaca Biz" aktif görünüyordu | test düzeneği kariyer sayfalarını `/kisaca-biz` kabuğunda açıyor | kontrol gerçek adreslerde çalışan `active-test.js`'e taşındı (8/8) |
| 4 | Mobil 390/320 px'de Ronin 1× dosyası (beklenen 2×) | test beklentisi yanlış: V1.4 kuralı `film px × DPR > 840` → 390×2=780 doğal dosya; DPR 3'te 2× | ölçümle doğrulandı (WebKit 390: DPR 2 → `ronin-m5-film.mp4`, DPR 3 → `ronin-m5-film-2x.mp4`; `qa/test/probe-art-ronin.json`); test kurala göre düzeltildi, ürün değişmedi |
| 5 | WebKit mobilde footer partner görseli yüklenmemiş ölçüldü | görsel `loading=lazy`; WebKit'in tembel yükleme eşiği Chromium'dan dar, test kaydırmadan ölçüyordu | footer'a kaydırınca WebKit 320/390'da yükleniyor (1080 px); test kullanıcı gibi kaydıracak şekilde düzeltildi |
| 6 | Birleşik İletişim görüntüsünde içerik 640 px'te kesik | test sayfasındaki iframe sabit yükseklikteydi | test sayfası içerik yüksekliğine uyar; Wix'te HTML Embed yüksekliği içeriğe göre verilmeli (DEPLOYMENT §6) |

## 5. Doğrulanmayanlar
- Gerçek Wix yayını (panel katmanı, 404 sayfasında CE, footer yüksekliği, Wix Forms).
- Fiziksel iPhone/iPad/Android, Firefox.
- Dış bağlantıların hedef sayfaları (A7, ZEYP, Market, Hemen Tıkla): ortamdan erişim yok; yalnız href/target/rel.
- Performans (FPS/CLS) bu aşamada ölçülmedi; bileşenlerde video/canvas/WebGL/sürekli animasyon yok (kod incelemesi).
