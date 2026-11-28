# PLATFORM_REVISION_V21 — Global Menü V2.1: minimal platform logoları

**Wix'te Save/Publish yapılmadı, PR birleştirilmedi, force push yok, hiçbir dosya silinmedi.** Testler Playwright (Chromium + WebKit) ile yapıldı; WebKit iPhone değildir, gerçek Wix yayınında doğrulanmadı.

## 1. Değişiklik
Yalnız menüdeki **Uygulama ve Platformlar** bölümü değişti. Sıra, bağlantılar, yeni sekme davranışı, `rel` ve erişilebilir etiketler aynı kaldı.

| Özellik | V2 | V2.1 |
|---|---|---|
| Logo | renkli kare WebP (neon yeşil / beyaz / mor zemin) | arka planı temizlenmiş **tek renkli SVG sembol**, `fill=currentColor` |
| Kutu | 84–96 px, kart genişliğine yayılan | **56** (masaüstü) / **52** (tablet) / **48** (mobil) px, sola hizalı |
| Sembol | kutuyu dolduran görsel | 32 / 30 / 28 px, optik denge katsayısıyla |
| Aralık | 8 px | 10 / 10 / 8 px; başlık–satır arası 11 px |
| Renk | logonun kendi renkleri | zemin #1A1C1B, logo #BDBFB9, 1 px düşük kontrastlı çerçeve, köşe 8 px |
| Hover (masaüstü, fare) | 2 px yukarı kayma | logo #A2FF00, çerçeve rgba(162,255,0,.32); zemin koyu; 200 ms renk geçişi; büyüme, dönme ya da gölge yok |
| Klavye odağı | beyaz halka | #A2FF00 halka (`:focus-visible`) |
| Dokunmatik | hover kayması | hover kuralı `(hover:hover) and (pointer:fine)` ile yalnız farede; dokunma hedefi ≥ 44 px |
| Ağ | menü açılınca 4 WebP isteği | **0 istek** (semboller header'a gömülü, toplam yaklaşık 5 KB) |
| Kart yüksekliği (1440) | 133 px | 108 px |

## 2. Logo dosyaları
`assets/platforms/mono/`:
- `01-zeyp.svg` (2132 B)
- `02-market.svg` (824 B)
- `03-hemen-tikla.svg` (1022 B)
- `04-intelligence.svg` (1001 B)
- `manifest.json`

Önizleme: `screenshots/v21/logolar-monokrom-onizleme.png`.

**Yöntem** (`tools/build_platform_mono.py`; gri tonlama filtresi kullanılmadı):
1. Her logonun şekli, özgün 2000 px PNG'deki renk kümelerinden maskelendi.
2. Maske `potrace` ile vektöre çevrildi; şekiller yeniden çizilmedi.
3. **ZEYP:** arkadaki şekil %42 opaklıkta. Öndeki "2" çevresinde boşluk bırakıldı, böylece üst üste binen şekiller tek renkte birbirine karışmıyor.
4. **Hemen Tıkla:** tıklama çizgileri ayrı ve okunur kaldı.
5. Market ve Intelligence dolu şekiller olduğu için optik olarak yüzde 14 ve 9 küçültüldü; böylece görsel ağırlıklar dengelendi.

Özgün renkli PNG ve WebP dosyaları silinmedi.

**Biçim doğruluğu** (çizilen SVG ile özgün şekil arasındaki örtüşme, IoU; 1,0 tam örtüşme):

| Logo | IoU |
|---|---|
| 01-zeyp | 0.9412 |
| 01-zeyp (öndeki "2") | 0.993 |
| 02-market | 0.989 |
| 03-hemen-tikla | 0.9878 |
| 04-intelligence | 0.9937 |

ZEYP'in genel değeri, iki şekli ayırmak için bilerek bırakılan boşluk yüzünden daha düşük. Öndeki "2" tek başına 0,993.

## 3. Ortak kaynak
Logo sistemi **tek yerdedir**: header v15. Bu dosyayı hem kurumsal sayfalar hem bağımsız Header (`n1-global-header-v1`) aynı adresten yükler.
- Menü verisi v16 **değişmedi**: header v15 sembolü, menü verisindeki görsel adıyla eşleştirir.
- Footer, WhatsApp, A7, Başlangıca Dön, ana başlıklar, İK alt menüsü, aktif durumlar ve açılış/kapanış davranışı v14 ile aynı (`tools/build_header_v15.py` yalnız platform bölümünü değiştirir; 33 satır).

## 4. Merkezi güncelleme incelemesi
Her Wix sayfası, sabit SHA'lı kendi dosyasını yükler. O dosya header'ı (ve dolayısıyla logo stilini) yine sabit SHA ile yükler. jsDelivr'da sabit SHA'lı içerik değişmez.

Merkezi bir değişiklik için şu yollardan biri gerekirdi:
- dal ya da `@latest` adresi,
- değişebilen bir yapılandırma dosyası,
- genel Wix Özel Kodu,
- yüklenmiş header'a sonradan DOM ya da CSS müdahalesi.

Hepsi talimatla yasak. Ayrıca sürüm güvenliğini bozar ya da header ile yükleme yarışı yaratır.

**Sonuç: güvenli bir merkezi yol yok.** Mevcut mimari korundu. Değişecek Server URL'leri tek tabloda: DEPLOYMENT §2 (18 sayfa, ayrıca kurulduysa İletişim, Akademi ve 404'teki bağımsız bileşenler).

## 5. Sürümler ve commit'ler
| Dosya | V2 → V2.1 |
|---|---|
| Header | v14 → **v15** (`6df38aa`) |
| Bağımsız paket | `n1-global-shell-v1.js` → **`n1-global-shell-v1-1.js`** (sürüm 1.1.0; aynı 3 etiket) |
| Kariyer | v2 → v3 |
| Ana sayfa | v661 → v662 |
| Hizmet sayfaları | Kreatif v27, E-Ticaret v28, Sosyal v31, Reklam v27, UI/UX v33, Yapay Zekâ v6, Uygulama v6 |
| Kısaca Biz / Markalar / Yasal | v4 / v14 / v4 |

- **Yayın commit'i (Server URL'ler):** `f661795b75a011f8e882930df64a20f60a863cba`
- **Header v15 ve logolar:** `6df38aa58398670c8e2617632ef88b9895bfd4e9`

## 6. Hedefli test sonuçları
| Test | Sonuç |
|---|---|
| V2.1 matrisi: Chromium + WebKit × 1920, 1440, 1024, 820, 390, 375, 320 (14 çalıştırma; kurumsal sayfa + bağımsız header + tutarlılık) | **512 geçti, 0 kaldı** |
| Footer A/B: V2 ↔ V2.1 paketi, aynı koşul, 7 genişlik × 2 motor | **14/14 birebir aynı** (yükseklik, HTML, alt boşluk 0) |
| Gerçek CDN duman testi (yönlendirme yok) | 4/4 |
| CDN doğrulama (`verify-cdn-v21.sh`) | **TAMAM: 25 adres** (200, MIME, CORS *, SHA-256 eşleşmesi) |
| Git diff | V1.4, Ronin, kariyer V1 ve footer klasörlerinde 0 dosya değişti. V2 → V2.1 sayfa dosyalarında yalnız header adresi satırları değişti (sayfa başına 2 satır, ana sayfada 4). Ayrıntı: `qa/v21/git-diff-check.txt`. |

Kontrol edilenler:
- Sıra ve bağlantılar; yeni sekme ve `rel`; etiketler.
- Kutu ve sembol ölçüleri; tek satır; aralık; başlıkla hizalama.
- Renkler; renkli WebP indirilmemesi; panelde yatay taşma olmaması; kartın kompaktlığı.
- Hover ve hover'dan dönüş (masaüstü); dokunmatikte hover'ın devre dışı olması.
- Klavye odağı; menünün kapanması (kart kalmıyor) ve yeniden açılması.
- JS hatası olmaması; header v15'in yüklenmesi (v14 yüklenmiyor).
- Bağımsız header'da Teklif Al olmaması; kurumsal ve bağımsız logoların aynı olması; header üst bölümünün tutarlılığı.

**Test sırasında düzeltilen beklentiler (ürün değişmedi):**
- WebKit'te yoğun sayfada odak geçişi geç başlıyor; test 1,5 sn'ye kadar bekleyecek şekilde düzeltildi.
- 375 px'de logo konumunda %90 genişlik yuvarlamasından gelen 1 px fark var (V2'de de aynı).
- **V2 belgelerindeki tablet/mobil footer yükseklikleri tembel yüklenen görsel yüklenmeden ölçülmüştü.** Doğru değerler: 1024 → 821, 820 → 791, 375 → 865 px. DEPLOYMENT §4 düzeltildi.

## 7. Görseller (`screenshots/v21/`)
- Eski ↔ yeni yan yana: `karsilastirma-masaustu.png`, `karsilastirma-tablet.png`, `karsilastirma-mobil.png`.
- Tek tek: `platform-<profil>-eski.png` ve `platform-<profil>-yeni.png`.
- Tam menü: `menu-<profil>-eski.png` ve `menu-<profil>-yeni.png`.
- Durumlar: `platform-masaustu-yeni-hover.png`, `platform-masaustu-yeni-odak.png`.
- Bağımsız header: `bagimsiz-header-menu-<profil>.png`, `platform-<profil>-yeni-bagimsiz.png`.
