# QA_REPORT — Markalar V1

Bu rapor yalnızca gerçekten çalıştırılan testleri içerir.

## Test ortamı

- **Tarayıcı:** Google Chrome (Playwright, headless). Testler masaüstü, tablet ve telefon **emülasyonu** olarak çalıştı; telefon ve tablet emülasyonunda dokunmatik ve mobil bayrakları açıktı. Gerçek cihaz testi **değildir**.
- **Kurulamayan tarayıcılar:** Firefox ve WebKit (Safari motoru) bu ortama kurulamadı; indirme ağ kısıtı nedeniyle başarısız oldu.
- **Kaynaklar:**
  - Header/Footer: onaylı commit `d24fa373…` dosyalarının yerel kopyası.
  - GSAP: 3.13.0, ScrollTrigger 3.13.0 ve Flip 3.13.0'ın yerel kopyaları; cdnjs adresleri yönlendirildi.
  - Fontlar: yerel kopyalar.
- **Wix:** Wix Studio içinde test yapılmadı.

## 1. Veri doğruluğu

Ayrıntı: DATA_VALIDATION.md. Excel, sayfanın DOM'uyla otomatik karşılaştırıldı (1440 ve 390 px).

| Kontrol | Sonuç |
|---|---|
| Excel 112 kayıt; sayfada 112 kayıt | Eksik 0, fazla 0, yinelenen 0 |
| Öne çıkan 22 kayıt | Sıra ve sektörler Excel ile birebir |
| Sektörel gruplar | 18 grup; içerik ve sıra Excel ile birebir, grup sayıları doğru |
| Hero sayıları | 112 MARKA VE PROJE, 20 FARKLI SEKTÖR. Veriden hesaplanıyor. |
| Türkçe karakterli adlar | Tamamı sayfada aynen var |
| Sektör filtresi seçenekleri | 19: TÜM SEKTÖRLER ve 18 sektör |

## 2. Marka arama testleri

Her iki genişlikte (1440 ve 390 px) aynı sonuç alındı.

| Aranan | Sonuç sayısı | Not |
|---|---|---|
| istinye / İSTİNYE / ISTINYE | 1 | Üçü de "İstinye Kuyumculuk"u buluyor (İ/i ve I/ı eşlemesi) |
| kuyum / KUYUMCULUK | 18 | Büyük/küçük harf duyarsız; eşleşen kısım vurgulu |
| çelik / celik | 2 | Aksan duyarsız |
| alaçatı / alacati | 4 | |
| total | 2 | İkisi de öne çıkan; "Öne çıkan markalarda" grubunda gösteriliyor |
| oyak enerji | 1 | Boşluklu arama |
| "  ege " | 4 | Baştaki ve sondaki boşluk yok sayılıyor |
| ü | 54 | Aksan duyarsız olduğu için "u" içeren adları da buluyor (bilinçli davranış) |
| zzzz | 0 | Mesaj gösterildi: "Aramanıza uygun marka veya proje bulunamadı." |
| Temizle düğmesi | 90 kayıt geri geldi | Düğme gizlendi, odak arama kutusuna döndü |
| Esc tuşu | 90 kayıt geri geldi | Kutu boşaldı |

- Sonuç sayısı canlı bölgede (`role=status`) duyuruluyor.
- Aramadan sonra Footer altı boşluk 0 px.
- Arama sırasında öne çıkan vitrin değişmedi: 22/22 görünür kaldı.

## 3. Sektör filtreleme testleri

Masaüstünde düğmelerle, telefonda seçim kutusuyla yapıldı.

| İşlem | Sonuç |
|---|---|
| Kuyumculuk / Hukuk / İnşaat / Tüm | 26 / 1 / 10 / 90 kayıt. Her seçimde GSAP Flip 1 kez çalıştı. Düğme durumu ve seçim kutusu senkron. Footer altı boşluk 0. |
| Sektör + arama ("ilkay") | Yalnızca İlkay Kuyumculuk |
| Sektör + sektör dışı arama ("total") | Boş sonuç mesajı |
| Sıfırlama | 90 kayıt, 18 grup |
| Art arda 6 hızlı seçim (120 ms arayla) | Son durum doğru (90). Takılı kalan satır içi stil 0. Boşluk 0. |
| Filtre sayfayı kısalttıktan sonra CTA | Tam görünür (ScrollTrigger yenileme sonrası) |
| Öne çıkan vitrin | Filtrelemeden etkilenmedi (22/22) |

## 4. Responsive testleri

Genişlikler: 2560, 1920, 1440, 1280, 1024, 834, 768, 430, 414, 390, 375, 320 px.

| Kontrol | Sonuç |
|---|---|
| Yatay taşma | 12/12 genişlikte yok |
| Kesilen veya kutusundan taşan ad | 0 |
| Üst üste binen öğe (öne çıkan dizin ve ad listeleri) | 0 |
| Footer altı boşluk | 0–1 px |
| Header / Footer / WhatsApp sayısı | 1 / 1 / 1 |
| H1 / H2 / H3 | 1 / 3 / 19 |
| Header ile içerik çakışması | Yok (H1, Header'ın altında başlıyor) |
| 44 px altı dokunma hedefi | 0 |
| 12,5 px altı metin | 0 (son düzeltmeden sonra) |
| Kaydırma sonrası görünmez kalan içerik | 0 |

Öne çıkan dizin / ad listesi sütun sayıları:

| Genişlik | Öne çıkan | Ad listesi |
|---|---|---|
| 2560 | 6 | 3 |
| 1280–1920 | 5 | 3 |
| 768–1024 | 3 | 3 |
| 320–430 | 2 | 2 |

Filtre arayüzü 768 px ve üzerinde düğmeler, altında seçim kutusu. Masaüstünde tablet düzeni görünmüyor.

**Kırılım değişimi:**
- 1440 → 820 → 390 → 1440 → 1024 geçişlerinde taşma ve boşluk oluşmadı.
- Önceden görülen içerik yeniden gizlenmedi.
- Sorun: Bu test ilk turda, kırılım değişince bölümlerin yeniden gizlendiğini gösterdi.
- Düzeltme: Görülen bölümler artık işaretleniyor ve tekrar gizlenmiyor.

## 5. GSAP ve yaşam döngüsü

| Kontrol | Sonuç |
|---|---|
| GSAP, ScrollTrigger ve Flip | Gerçekten kullanılıyor. Flip testi, `Flip.from` çağrısı sayılarak yapıldı. |
| ScrollTrigger sayısı | İlk yüklemede toplam 23. Bunun 22'si bu sayfaya ait: 2 bölüm başlığı, öne çıkan dizin için 1, 18 sektör satırı ve CTA için 1. Kalan 1 tanesi onaylı Footer'ın kendi tetikleyicisi. Telefonda sektör satırı tetikleyicisi yok. Marka başına tetikleyici yok. Sayfanın tetikleyicilerinin tümü `once`; tetiklenince kendini kapatır (kaydırma sonrası 1–2 kalıyor). |
| 3 kez kaldırıp yeniden ekleme | Her seferinde Header, Footer, WhatsApp, stil etiketi ve veri betiği 1'er; ScrollTrigger 23 (22 sayfa + 1 Footer); 112 ad. GSAP betikleri tekrar yüklenmedi. |
| Tamamen kaldırma | ScrollTrigger 0, stil etiketi 0, Header 0. Globalde 1 `delayedCall` kaldı; hedefi bu sayfanın öğesi değil. |
| Hareket azaltma | Gizli öğe 0, sayaç doğrudan 112, filtre animasyonsuz çalışıyor |
| GSAP yüklenemezse | 112 ad görünür, gizli öğe 0, arama çalışıyor; konsolda açıklayıcı uyarı |
| Veri dosyası yüklenemezse | "Markalar sayfası yüklenemedi. Lütfen sayfayı yenileyin." |
| Klavye | Arama kutusu → Tab → sektör düğmeleri; ok, Home ve End ile gezinme; Enter ve Boşluk ile seçim. Odak çizgisi görünür (#A8CF62). |
| CTA | `/iletisim`, "BİRLİKTE ÇALIŞALIM". Sayfadaki tek bağlantı bu; sahte marka bağlantısı yok. |

## 6. Performans

| Ölçüm | Değer |
|---|---|
| Cumulative Layout Shift (tarayıcının `layout-shift` girdileri, yerel test, yükleme + 300 ms) | Masaüstü 0,044–0,073; tablet 0,018–0,021; telefon 0 |

- Masaüstündeki değer büyük olasılıkla font değişiminden kaynaklanıyor; bu ayrıca doğrulanmadı.
- Gerçek ağ koşullarında değerler farklı olacaktır.
- Lighthouse, LCP, INP ve yükleme süresi **ölçülmedi**.

**Dosya boyutları**
- `n1-markalar-v1.js`: yaklaşık 56 KB, küçültülmemiş. Brief gereği minification yapılmadı.
- `n1-markalar-data-v1.js`: yaklaşık 27 KB.

**DOM**
- Arama sonuçlarındaki öne çıkan grup için 22 ek liste öğesi var.
- Sayfada görsel yok.

## 7. Bilinen sınırlar ve riskler

- **Wix:** Custom Element'in Wix dış kutusundaki yükseklik davranışı, Wix önizlemesi ve canlı yayın test edilmedi. Yerel testte yükseklik içerikle birlikte doğru değişiyor.
- **Tarayıcılar:** Safari, iOS Safari, Firefox, Edge ve gerçek Android Chrome'da test yapılmadı. Edge, Chrome ile aynı motoru kullanıyor ama ayrıca denenmedi.
- **Sticky:** Sektör başlıkları masaüstünde sticky. Wix bir üst öğede `overflow` kullanırsa sticky çalışmayabilir; liste yine kullanılabilir.
- **SEO:** Marka adları JavaScript ile oluşuyor; Wix sunucu HTML'inde yer almıyor (bkz. WIX_SETUP.md).
- **Test ortamı hatası:** Footer'daki iş ortağı görseli (static.wixstatic.com) test ortamında engellendiği için bazı genişliklerde konsolda "Failed to load resource" görünüyor. Gerçek adres onaylı Footer'a ait; bu sayfadan kaynaklanmıyor.
- **Vurgu rengi:** #A8CF62 kullanıldı; brief'teki #A2FF00 sizin onayınızı bekliyor (bkz. README).
- **Excel yazımları:** Olası yazım hataları olduğu gibi bırakıldı (DATA_VALIDATION.md).