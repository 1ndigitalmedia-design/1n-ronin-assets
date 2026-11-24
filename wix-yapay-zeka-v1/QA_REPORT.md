# QA_REPORT — AI / Yapay Zekâ V1

## Önce: yapılamayanlar
- **Wix Studio içinde test yapılmadı.** Wix editör veya yayınlama yetkisi kullanılmadı; Custom Element dış kutusunun yükseklik davranışı Wix'te doğrulanmalıdır (README).
- **Gerçek iOS/Android cihaz testi yapılmadı.** Telefon/tablet; Chromium'da dokunmatik + mobil emülasyonla test edildi. iOS Safari'nin otomatik oynatma ve Düşük Güç Modu davranışı denenmedi.
- **Ekran okuyucu (VoiceOver/NVDA) testi yapılmadı.** Yalnızca DOM düzeyinde erişilebilirlik denetimleri yapıldı.
- Lighthouse/ağ kısıtlamalı performans ölçümü yapılmadı.
- GitHub'a gönderim ve jsDelivr üzerinden yükleme denenmedi.

## Test ortamları
1. **Otomatik testler (Playwright, Chromium):** Yerel HTTP sunucusu, gerçek Header/Footer/GSAP/fontlar. Görsel istekleri yer tutucu görsellerle, video istekleri aynı boyutlarda yerel VP9 test videolarıyla (Range/206 destekli) karşılandı. Bu testler davranışı doğrular; gerçek medyanın görünümünü değil.
2. **Gerçek tarayıcı (Claude masaüstü uygulamasının dahili tarayıcısı):** Son paket, **gerçek Wix videoları ve görselleriyle** çalıştırıldı; ekran görüntüleri buradan alındı. Video çözünürlük/süre bilgileri burada ölçüldü.

## Otomatik test sonuçları (son derleme)
Genişlikler: 360, 375, 390, 430, 768, 820, 1024, 1366, 1440, 1920 — her birinde sayfa baştan sona kaydırıldı.

| Kontrol | Sonuç |
|---|---|
| JavaScript sözdizimi (`node --check`) | Geçti |
| Custom Element etiketi `n1-yapay-zeka-v1`, kayıt | Doğru |
| Yatay taşma | 10/10 genişlikte 0 |
| Footer altı boşluk / Final ile Footer arası | 10/10'da 0 px |
| Header / Footer / WhatsApp / Yukarı Çık katmanı sayısı | Hepsinde 1/1/1/1 |
| GSAP / ScrollTrigger yükleme | 1 / 1 (tek kez) |
| Pin / spacer | 0 |
| Kaydırma sonrası gizli kalan metin | 0 |
| Satır/harf çakışması (Türkçe karakterler dahil) | 0 |
| Unicode ok / emoji | 0 |
| #A1FF00 / #A2FF00 | Yok |
| `aria-hidden` olmayan dekoratif SVG / adı olmayan düğme | 0 / 0 |
| 44 px altı dokunma hedefi | 0 |
| Görünürde olup yüklenmemiş görsel | 0 |
| Konsol / sayfa hatası | 0 |
| Video adresleri | Yalnızca `8da46d…/720p`, `e17759…/1080p`, `6c47eb…/1080p` istendi |
| Video öznitelikleri | Üçünde `muted`, `playsinline`, `loop`; `poster` ve `autoplay` yok |
| Sayfa sonunda oynayan video | 0; sayfa başında yalnız Hero oynuyor |
| Lab: 3 yorum | Her biri sahneyi, karar kaydını, `aria-label`ı ve canlı bölgeyi doğru güncelliyor |
| Lab: klavye | Ok tuşu yorumu değiştiriyor |
| Lab: 100 hızlı değişim | Son yorum doğru, sahnede kalıntı stil yok |
| Bölüm (chapter) tıklama | DÜNYA → video 10,2 sn, etkin bölüm ve kelime doğru, video oynuyor |
| Video duraklat düğmesi | Çalışıyor, etiket "Videoyu oynat" olarak güncelleniyor |
| CTA'lar | Tıklanabilir (hit-test), `/iletisim` ve `/teklif-al` |
| Video düğmeleri sabit kontrollerin altında mı | 10/10 genişlikte üç düğme de tıklanabilir (ayrı hit-test) |
| Menü | Masaüstü bağlantılar, Esc ile kapanma, menüde klavye odağı; telefonda menü açılıyor, İK alt menüsü (`/ekibimize-katil`, `/acik-pozisyonlar`) görünüyor; Yukarı Çık sona → 0 |

## Ek senaryolar
| Senaryo | Sonuç |
|---|---|
| Eşzamanlı oynatma (sayfa boyunca) | En fazla 1 video; üçü de sırasıyla oynadı |
| Sekme gizlendi | Oynayan video 0 |
| 3 kez kaldır-ekle | ScrollTrigger 22 → 0 → 22; katmanlar kaldırılıp geri geliyor; videolar bırakıldı; hata yok |
| `prefers-reduced-motion` (1440, 390) | Gizli öğe 0, kalıntı transform/clip yok, oynayan video 0, Hero ilk karesi görünüyor |
| GSAP yüklenemedi (1440, 390) | Bütün içerik görünür, Lab çalışıyor |
| Video yüklenemedi | Üç videoda "Video şu anda yüklenemedi.", düğmeler devre dışı, video kutularında görsel yok |
| Veri Tasarrufu | Otomatik oynatma yok, Hero `preload=metadata` ve ilk kare görünür, elle oynatma çalışıyor |
| Yön değişimi (390 ↔ 844) | Taşma/çakışma/boşluk 0, hata yok |
| Debug paneli / `console.log` | Kaynakta yok |
| Klavye Tab sırası | Sırayla, atlanan kontrol yok |

## Gerçek tarayıcı kontrolü ve bulunan sorunlar
Ekran görüntüleri 1440×900, 820×1180 ve 390×844'te gerçek medya ile alındı (20 adet, `screenshots/`). Bu inceleme sırasında bulunup düzeltilen sorunlar:
1. 1440×900'de Hero alt metni ekranın altında kalıyordu → 1025 px+ ve 820 px+ yükseklikte metin pencerenin yanına alındı.
2. Telefonda Experimental yorumunda küçük görsel başlığın üstüne biniyordu → konumu değiştirildi.
3. Editorial karar kaydı "üç satırlık başlık" diyordu, sahnede başlık iki satır → metin düzeltildi.
4. 390 px'te Hero videosunun duraklat düğmesi sabit WhatsApp düğmesinin altında kalıyordu → 1024 px ve altında tam genişlikli videolarda düğme sola alındı; Hareket videosunda (sol alttaki büyük kelimeyle çakışmasın diye) sağda bırakıldı. Ardından bütün otomatik testler yeniden çalıştırıldı.

Not: 820 px ekran görüntüleri 4. düzeltmeden önce alındı; o genişlikte düğmeler çakışmadığı için görüntüdeki tek fark, düğmenin sağda görünmesidir. 390 px görüntüleri düzeltilmiş hâli gösterir (düzeltme tarayıcıda aynı CSS kuralıyla uygulanarak).

## Bilinen sınırlar
- Telefonda da 720p/1080p videolar iner (daha düşük çözünürlük adresi verilmedi ve üretilmedi).
- Hareket bölümündeki büyük kelime `mix-blend-mode: difference` kullanır; videonun çok açık karelerinde koyu görünür. Bilgi taşımaz, bölüm adı listede de yazılı.
- Dalga görseli üç bölümde kullanıldı.
