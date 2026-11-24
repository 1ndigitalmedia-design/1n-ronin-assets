# QA Raporu — Kreatif Prodüksiyon V2

Test tarihi: 24.11.2026 · Kaynak: bu paketteki `n1-kreatif-produksiyon-v2.js`

İki ortamda test edildi:

| Ortam | Ne sağlar | Sınırı |
|---|---|---|
| **A. Sandbox Chrome (Playwright, headless)** | 10 genişlik, menü, etkileşim, dayanıklılık testleri | Sandbox `video.wixstatic.com` ve `static.wixstatic.com` adreslerine erişemiyor (proxy 403). Header/Footer/GSAP aynı commit'lerin yerel kopyalarından sunuldu. Video ve poster bu ortamda **yüklenemiyor**; bu yüzden hata/yedek yolu burada test edildi. |
| **B. Gerçek tarayıcı (Claude masaüstü uygulamasının yerleşik tarayıcısı, sizin bilgisayarınızda)** | Gerçek ağ: Header/Footer jsDelivr'den, GSAP cdnjs'ten, video ve poster Wix'ten | Bileşen, videonun kendi alanında (`video.wixstatic.com`) boş bir sayfaya enjekte edildi; kod gzip doğrulamasıyla birebir aktarıldı. Tarayıcı paneli gizliydi: sayfa görünür sayıldı ama `requestAnimationFrame` çalışmadığı için GSAP giriş animasyonları yarıda kaldı (gerçek kullanımda olmaz). |

## 1. Video analizi (gerçek tarayıcı, B)

| Özellik | Ölçülen |
|---|---|
| Süre | 30,17 sn |
| Çözünürlük / oran | 1920×1080, 16:9 |
| Ses izi | Var (decode edilen ses baytı > 0) |
| Sürümler | 1080p 14,7 MB · 720p 8,1 MB · 480p 3,9 MB (360p yok) · CORS `*` |
| Wix poster kareleri | f000, f001 (siyah) · f002 (karlı dağ sırtı) · f003 (glitch "TRAILER") |
| Parlaklık ölçümü | Her 0,25 sn'de bir, toplam 121 örnek. Bu veri sayfadaki ritim çizgisinin kendisi. |

Kareler `video-analizi/` klasöründe. Bölüm zamanları kare kare incelenerek çıkarıldı; ayrıntı DESIGN_RATIONALE.md'de.

## 2. Gerçek video testleri (B — gerçek ağ, gerçek video)

| Test | Sonuç |
|---|---|
| Header, Footer, WhatsApp, GSAP gerçek CDN'den | ✓ 1/1/1, GSAP yüklendi, hata 0 |
| Wix poster (f002) | ✓ yüklendi |
| 1440 px: hero otomatik oynatma | ✓ 1080p, `muted`, oynuyor, 1920×1080, zaman kodu canlı (00:08.40) |
| İlk denemede bulunan hata | Hero videosu başlamadı. Görünürlük oranı, açılıştaki `clip-path` animasyonu nedeniyle 0,08 ölçüldü. Kırpılmayan dış kutu gözlenecek şekilde düzeltildi; ardından ✓ |
| Monitöre kaydırma | ✓ Hero durdu; monitör videosu o anda yüklendi ve oynadı |
| Bölüm tıklama (Serbest düşüş) | ✓ 20,76 sn'ye atladı. Ekrandaki kare gerçekten serbest düşüş (`screenshots/gercek-tarayici/`); ritim çizgisi senkron |
| Zaman çizgisi klavye (Home) | ✓ başa sardı, bölüm "Açılış" |
| Ses aç/kapat | ✓ monitör sesi açıldı, `aria-label` "Sesi kapat" oldu; hero sessiz kaldı |
| Kullanıcı duraklatması | ✓ duraklatılan monitör, görünür olunca kendiliğinden yeniden başlamadı |
| Yukarı dönüş | ✓ Hero yeniden oynadı, monitör duraklı |
| Formatlar görseli | ✓ gerçek Wix karesi (1280 px) yüklendi |
| Bileşen kaldırma | ✓ İki video durdu, `src` kaldırıldı (`networkState` 0). ScrollTrigger 0, Header/panel/WhatsApp 0, stil etiketi ve `body` sınıfı kaldırıldı |
| 375 px mobil (Android emülasyonu) | ✓ 480p seçildi (854×480) ve oynuyor; yatay taşma yok; katmanlar 1/1/1 |

## 3. Responsive — 10 genişlik (A)

Her genişlikte sayfa baştan sona kaydırıldı, ardından ölçüm yapıldı.

| Genişlik | Sayfa yük. | Taşma | Footer alt boşluk | Final→Footer | Header/Panel/Footer/WA | GSAP/ST | Pin | Gizli metin | Satır/blok çakışması | Hata |
|---|---|---|---|---|---|---|---|---|---|---|
| 360 | 8 506 | yok | 0 | 0 | 1/1/1/1 | 1/1 | 0 | 0 | 0 | 0 |
| 375 | 8 638 | yok | 0 | 0 | 1/1/1/1 | 1/1 | 0 | 0 | 0 | 0 |
| 390 | 8 685 | yok | 0 | 0 | 1/1/1/1 | 1/1 | 0 | 0 | 0 | 0 |
| 430 | 9 044 | yok | 0 | 0 | 1/1/1/1 | 1/1 | 0 | 0 | 0 | 0 |
| 768 | 8 831 | yok | 0 | 0 | 1/1/1/1 | 1/1 | 0 | 0 | 0 | 0 |
| 820 | 8 951 | yok | 0 | 0 | 1/1/1/1 | 1/1 | 0 | 0 | 0 | 0 |
| 1024 | 9 635 | yok | 0 | 0 | 1/1/1/1 | 1/1 | 0 | 0 | 0 | 0 |
| 1366 | 9 736 | yok | 0 | 0 | 1/1/1/1 | 1/1 | 0 | 0 | 0 | 0 |
| 1440 | 10 218 | yok | 0 | 0 | 1/1/1/1 | 1/1 | 0 | 0 | 0 | 0 |
| 1920 | 12 868 | yok | 0 | 0 | 1/1/1/1 | 1/1 | 0 | 0 | 0 | 0 |

Satır çakışması kontrolü şunları kapsadı:
- bütün başlık maskeleri (Türkçe İ, Ş, Ğ, Ü payıyla)
- felsefe satırları
- hero alt başlığı ile kontroller ve hero alt şeridi ile kontroller
- tablet ve mobilde başlık ile video kadrajı

**Ek kontroller (10 genişliğin tamamında):**
- Unicode ok: 0. `aria-hidden` olmayan dekoratif SVG: 0. `#A1FF00` / `#A2FF00`: yok.
- Final CTA'ları `/iletisim` ve `/teklif-al`; ikisinin de üzerinde başka katman yok (`elementFromPoint`).
- **Video kaynağı seçimi:** 360–430 → 480p · 768–1024 → 720p · 1366–1920 → 1080p.
- **Formatlar:** Yedi oranın tamamı ölçüldü (2.39 · 0.8 · 0.56 · 1.5 · 1.78 · 1.78 · 1). Kadraj her genişlikte kutunun içinde kalıyor.
  - Masaüstünde klavye okları ile seçim çalışıyor; tablet ve mobilde aktif çip görünür alanda.
- **Monitör:** Bölüm tıklaması → "Zirve", 00:15. Zaman çizgisi klavye ile çalışıyor.
- **Menü:**
  - Masaüstünde açılıyor; İnsan Kaynakları alt menüsü görünür; Escape kapatıyor; klavye odağı menüye geçiyor.
  - Dokunmatikte açılıyor, alt menü görünür.
- **Yukarı Çık (dokunmatik):** 360: 7 770 → 0 · 390: 7 869 → 0 · 820: 7 771 → 0 · 1024: 8 269 → 0. Masaüstü (1440): 9 318 → 0.

## 4. Dayanıklılık (A)

| Test | Sonuç |
|---|---|
| Sayfada GSAP zaten varken | GSAP script 1, ikinci kopya yok ✓ |
| 3 kez kaldır / yeniden ekle | Her eklemede katmanlar 1/1/1/1, yükseklik 10 218. Her kaldırmada katmanlar 0/0/0/0, ScrollTrigger 0, kök zaman çizelgesi 1 (GSAP'in kendi iç zaman çizelgesi; artmıyor), videolar duruyor ve `src` boş, stil ve `body` sınıfı kaldırılmış ✓ |
| `prefers-reduced-motion` (1440, 390) | Gizli metin 0; dönüşümlü metin 0. Video otomatik oynamıyor (`preload="metadata"`); monitör hiç indirilmiyor (`preload="none"`). Format seçimi anında değişiyor (9:16 = 0.56) ✓ |
| GSAP / ScrollTrigger yüklenemezse (1440, 390) | İçerik görünür, katmanlar 1/1/1/1, taşma yok. Format seçimi ve bölüm seçimi çalışıyor ✓ |
| Video ve poster yüklenemezse | Poster kaldırılıyor, "1N" slate ve durum mesajı görünüyor, kontroller devre dışı. Sayfa siyah boş kalmıyor ✓ (bütün sandbox görüntüleri bu durumu gösterir) |
| Video yüklenmeden bölüm seçimi | İlk testte hata bulundu: yükleme başlarken gelen `timeupdate` seçimi "Açılış"a sıfırlıyordu. Bekleyen hedef zaman saklanacak şekilde düzeltildi; ardından ✓ "Yörünge", 00:09.40 |
| Ekran yönü 390×844 → 844×390 → 390×844 | Taşma yok, footer boşluğu 0, gizli metin 0, çakışma yok ✓ |

## 5. Erişilebilirlik (yapısal)

- **Başlık yapısı:** Tek H1; her bölümde H2, sahne ve format başlıklarında H3. Bölünmüş başlıkların tam metni ekran okuyucu için gizli bir etiketle verildi.
- **Video:**
  - Her iki `<video>` öğesinde `aria-label` var.
  - Kontrol düğmelerinde `aria-pressed` ve duruma göre değişen `aria-label` var.
  - Hata mesajı `role="status"` ile bildiriliyor.
- **Etkileşimler:**
  - Bölüm ve format listeleri gerçek düğmeler; formatta `aria-pressed` var.
  - Format bilgisi ve monitördeki aktif bölüm `aria-live="polite"`.
  - Zaman çizgisi `role="slider"`: `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-valuetext` ve klavye desteği var.
- **Odak ve dokunma:** Odak çerçevesi `#A8CF62`, 2 px. Dokunma hedefleri en az 44 px.

## 6. Performans

- **Sürekli animasyon yok:** `gsap.ticker` kullanılmıyor.
  - Scrub'lar yalnızca kaydırmada çalışır.
  - Zaman kodu `requestVideoFrameCallback` ile yalnızca video oynarken güncellenir; destek yoksa `timeupdate` kullanılır.
- **Video:**
  - Aynı anda en fazla bir video oynuyor.
  - Monitör videosu ancak yaklaşınca iniyor.
  - Mobilde 3,9 MB'lık 480p sürüm seçiliyor; hareket azaltmada otomatik indirme yok.
- **Kalıcı ScrollTrigger sayısı:** Tek seferlik giriş animasyonları tetiklenince kendini kaldırdığı için mobilde 5, tablette 6–7, masaüstünde 6.
- Sandbox'ta Lighthouse veya düşük güçlü cihaz profili ölçülmedi.

## 7. Test EDİLEMEYENLER (açıkça)

- **Wix Studio:**
  - Editor, önizleme ve yayınlanmış Test Site'ta çalıştırılmadı; Wix'e ve GitHub'a hiçbir şey yüklenmedi.
  - Kapsayıcı yüksekliği (Bölüm "Otomatik") ve Wix'in kendi kaydırma kapsayıcısıyla etkileşim Test Site'ta doğrulanmalı.
  - V1/V3'te aynı yöntem sorunsuz çalıştı; bu sayfada denenmedi.
- **Gerçek cihazlar:** iPhone Safari ve gerçek Android cihazda test yapılmadı.
  - iOS'ta düşük güç modu otomatik oynatmayı engelleyebilir. Bu durumda poster ve oynat düğmesi kalır; kod bu durumu destekliyor ama cihazda doğrulanmadı.
- **Diğer motorlar:** Firefox ve WebKit ile test yapılmadı.
- **Gizli panel kısıtı:** Gerçek videolu testte giriş animasyonlarının sonu ve hover/scrub görsel geçişleri gözlenemedi (`requestAnimationFrame` durgundu). Bu animasyonların sonuçları sandbox'ta ölçüldü.
- **Ses:** Sesin gerçekten duyulduğu (hoparlör) doğrulanmadı; yalnızca `muted=false` durumu ölçüldü.
- **Erişilebilirlik:** Gerçek bir ekran okuyucuyla dinlenmedi.

## 8. Önemli içerik notu (karar sizde)

Video, 1N'in kendi çekimlerinden çok bir **After Effects glitch trailer şablonu önizlemesine** benziyor:
- Videoda okunan metinler: "1N_Digital_Media", "PRESENTS", "IMAGINATION", "BRUTALIZE", **"AFTER EFFECTS"**, **"GLITCH TRAILER"**, "Professional B2B · B2C · C2C MANAGEMENT".
- Görüntülerin bir kısmı stok görünümlü: roket fırlatma, uzaydan Dünya, dağcılar, serbest düşüş.

Bu nedenle:
1. Videonun kullanım hakkını (şablon ve stok görüntü lisansları) teyit etmenizi öneririm.
2. Sayfa metinleri videonun 1N tarafından çekildiğini iddia etmez. Bölüm adları yalnızca ekranda görüneni tanımlar; müşteri, proje veya başarı iddiası yoktur.
3. 1N'in kendi prodüksiyonundan bir film hazır olduğunda yalnızca `VIDEO_URL`, `VIDEO.md`, `VIDEO.sd`, `POSTER_ID`, `CHAPTERS` ve `RHYTHM` değerlerini değiştirmek yeterli; tasarım aynı kalır. `RHYTHM`, yeni videodan aynı yöntemle yeniden ölçülmeli.
