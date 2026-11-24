# E-Ticaret Yönetimi V1 — QA raporu

Tarih: 24 Kasım 2026 · Dosya: `n1-e-ticaret-yonetimi-v1.js` · Etiket: `n1-e-ticaret-yonetimi-v1`

## 1. Kullanılan videolar
| Video | Özellik (gerçek tarayıcıda ölçüldü) | Kullanım |
|---|---|---|
| `6dbf5e_ceba6b184ed3498287c9adfc7d198afe` | 608×1080, 12,05 sn, dikey. Wix'te 360p / 480p / 720p / 1080p sürümleri var. | Hero. Masaüstü ve tablette 720p, mobilde 480p. |
| `6dbf5e_abd33fe475d24d2f8e93bcc762b7d4a5` | 720×1280, 11,48 sn, dikey. 360p / 480p / 720p var, 1080p yok (403). | İçerik / Performans / Büyüme sahnesinin merkezi. Masaüstü ve tablette 720p, mobilde 480p. |

- İkisi de `muted` + `playsinline`. `autoplay` özniteliği yok; video, görünür olduğunda JavaScript ile başlatılır.
- Aynı anda tek video oynar; ekran dışındaki durur, sekme gizlenince ikisi de durur.
- İkinci video bölüme 500 px yaklaşılmadan indirilmez.
- Hareket azaltma veya veri tasarrufu açıksa otomatik oynatma yok; yalnızca meta veri iner, kullanıcı oynat düğmesiyle başlatabilir.
- Poster olarak Wix'in videodan ürettiği gerçek kare (f000) kullanılır. Video yüklenemezse poster kalır ve kısa bir durum metni çıkar (test edildi: video engellendiğinde iki ekran da `is-failed + poster`).

## 2. Seçilen görseller ve nedenleri
9 görselin hepsi kullanıldı; her biri bir göreve bağlı. Ayrıntılı tablo `DESIGN_RATIONALE.md` içinde. Özet:
- **Vitrin sokağı** (`b3b2…`): Deneyim bölümünün ana karesi. "Görmeden önce hisseder" fikrini bir dükkân vitriniyle anlatır.
- **Butik** (`c24b…`) ve **duvar önündeki telefon** (`9d12…`): Deneyim'deki iki destek karesi; fiziksel mağazadan cebe geçiş.
- **Görsel düzenleme** (`7aa4…`) ve **analiz paneli** (`75cf…`): Omurga sahnesinde "İçerik" ve "Performans".
- **Ürün sayfası açık telefon** (`bb2c…`): Final CTA'nın yanında.
- Sekiz kapsam kalemi için de aynı havuzdan detay kırpımları kullanıldı (ürün listesi, butik askıları, ödeme ekranı, rapor vb.).
- **Bilinçli kısıtlar:**
  - Ödeme logosu belirgin olan `e1dc…` final görseli olarak denendi, sonra değiştirildi; bir marka iş birliği izlenimi vermesin diye yalnızca küçük kalem görseli olarak kaldı.
  - En klişe kare olan grafik raporu (`ac2f…`) de yalnızca küçük kalem görseli.
- Görseller Wix CDN'den `fit/w_W,h_3W` dönüşümüyle ve `srcset` (240–2400 px) ile isteniyor. Orijinaller 2775–6720 px aralığında.

## 3. Test edilen genişlikler ve sonuçlar
Playwright / Chromium, 360×740, 375×812, 390×844, 430×932, 768×1024, 820×1180, 1024×1366, 1366×768, 1440×900, 1920×1080. Bu testlerde yer tutucu görseller kullanıldı; gerçek görsellerle yapılan test 5. maddede.

| Kontrol | Sonuç (10 genişlik) |
|---|---|
| Yatay taşma (`scrollWidth` = genişlik) | Yok |
| Başlık satırı çakışması, Türkçe harf kesilmesi | 0 |
| Metin ile video / görsel / altyazı çakışması (hero, deneyim, kalem satırları, adımlar, şerit) | 0 |
| Gizli kalan metin (kaydırma sonrası) | 0 |
| Header / panel / Footer / kontrol katmanı | 1 / 1 / 1 / 1 (çift oluşmuyor) |
| GSAP / ScrollTrigger script sayısı | 1 / 1 |
| Pin / spacer | 0 |
| Footer altında boşluk, final ile Footer arası | 0 / 0 px |
| CTA'lar tıklanabilir ve taşmıyor | Evet (`/iletisim`, `/teklif-al`) |
| Unicode ok / emoji (sayfa metni ve kaynak) | 0; bütün oklar inline SVG, `aria-hidden` |
| #A1FF00 / #A2FF00 | Yok |
| Kapsam: ortadaki kalem etkinleşiyor | 8/8 kalem sırayla |
| Akış: yapışkan şerit header'ın hemen altında, doğru adım etkin | Evet |
| Menü: açılış, İnsan Kaynakları alt menüsü (`/ekibimize-katil`, `/acik-pozisyonlar`), Esc ve klavye odağı (masaüstü), menüden sonra kaydırma (dokunmatik) | Geçti |
| Konsol hatası | Yok |

**Dayanıklılık testleri (hepsi geçti):**
- GSAP sayfada önceden yüklüyken bileşeni 3 kez kaldırıp geri eklemek: her kaldırmada tetikleyiciler 0'a iniyor, stil kaldırılıyor, video kaynakları bırakılıyor. Her eklemede katmanlar 1/1/1/1 ve tetikleyici sayısı aynı.
- Yukarı Çık düğmesi en üste götürüyor.
- Hareket azaltma (1440 ve 390): gizli metin 0, kepenk açık, video otomatik başlamıyor.
- GSAP hiç yüklenemiyor (1440 ve 390): bütün içerik görünür, kepenk açık, fiiller dolu.
- Yön değişimi 390↔844: taşma ve boşluk yok.

## 4. Mobil ve tablet kararları
**Mobil (≤767):**
- Hero tek sütun. Başlık ~21vw. Video ekranın %60'ı genişliğinde ve sağa yaslı; altyazısı solunda.
- Alışveriş yolu iki satıra kırılır.
- Kepenkli vitrin karesi kenardan kenara.
- Kapsam satırları küçük kare + etiket + başlık + açıklama düzeninde.
- Adım şeridinde yalnızca numaralar; etkin adımın adı görünür.
- Omurga sahnesinde yan görseller filmin arkasına küçük açılarla yerleşir ve yaklaşma mesafesi kısalır.
- Final görseli gizlenir, CTA'lar tam genişlik.
- Parallax ve imleç efektleri kapalı. Video 480p.

**Tablet (768–1024):**
- Başlık tam genişlik; altında solda metin, sağda dikey video.
- Deneyim'deki üç cümle yan yana üç sütun.
- Kapsam satırları iki satırlı düzende.
- Omurga sahnesi üst üste binen üç kadraj.
- Header, diğer iç sayfalardaki gibi sabit.

## 5. GSAP yaklaşımı
- Bütün kod tek bir `gsap.context` içinde. Kırılımlar ve hareket azaltma `gsap.matchMedia` ile yönetiliyor, nesne koşullu form kullanılıyor (`m` / `t` / `d`).
- Kaydırmaya bağlı (scrub) olanlar: kepenk, fiil dolumu, Omurga'daki yaklaşma, dağınık harflerin hizalanması, hafif parallax.
- Bir kez oynayanlar: başlık maskeleri, kalem satırları, final.
- Pin yok, spacer yok. Yapışkanlık için CSS `position: sticky` kullanıldı.
- Etkin kalem, adım şeridi ve alışveriş yolu GSAP'ten bağımsız (IntersectionObserver ve zamanlayıcı). GSAP yüklenemezse de çalışırlar.
- Fontlar ve sayfa yüklenince ScrollTrigger yenilenir; yükseklik değişince ResizeObserver ile gecikmeli yenileme yapılır.

## 6. Gerçek tarayıcı testi
Claude'un yerleşik tarayıcısında, gerçek Wix CDN görselleri ve gerçek videolarla yapıldı:
- **Genişlikler:** 1440×900, 820×1180 ve 390×844.
- **Videolar:** iki video da indi ve oynadı (hero 720p/480p, omurga 720p); ilerleme çizgisi ilerliyor.
- **Görseller:** 16 görsel yüklendi.
- **Bu testte bulunan ve düzeltilen hata:** GSAP, kepengin CSS'teki açık konumunu piksel olarak okuyordu ve kepenk hiç görünmüyordu.
- **Bu testte verilen karar:** final görseli değiştirildi (ödeme logosu, bkz. madde 2).

`screenshots/` klasöründe 23 görüntü var: 1440 için 10, 820 için 6, 390 için 7. Hero, orta bölümler ve final CTA her genişlikte var.

## 7. Test edilemeyenler (açık not)
- **Wix Studio editörü ve canlı / Test Site:** dosya Wix'e ve GitHub'a yüklenmedi (onay olmadan değişiklik yok). Wix kapsayıcılarında `overflow: hidden` varsa Akış'taki yapışkan şerit çalışmayabilir. İlk kontrol noktası bu.
- **Gerçek cihazlar** (iPhone Safari, Android Chrome) test edilmedi; mobil, masaüstü Chromium'da öykünmeyle denendi. iOS'ta düşük güç modunda otomatik oynatma engellenebilir; bu durumda poster ve oynat düğmesi kalır.
- **Ekran görüntülerinin çözünürlüğü:** 1440 görüntüleri 800 px genişliğe küçültülmüş. Tarayıcı paneli arka planda çalıştığı için animasyonlar ekran görüntüsünden önce elle ilerletildi. Bir iki karede çizgi geçişleri ara aşamada yakalanmış olabilir.
- **Kod sürümü:** gerçek tarayıcıda çalışan sürüm, kepenk ve final görseli düzeltmelerinin küçültülmüş koda metin olarak uygulanmış hâlidir. Kaynak dosya düzeltmelerden sonra yeniden doğrulandı ve Playwright QA'sı son dosyada tekrar çalıştırıldı.
- **Yüksek yoğunluklu ekranlarda (DPR 2–3) keskinlik** yalnızca `srcset` hesabıyla doğrulandı. Wix CDN istenenden biraz küçük dosya döndürebiliyor (ör. 480 isteğine 432 px).
- **Görsel kullanım hakları:** görsellerdeki üçüncü taraf markaların (tabela, ekranlardaki ürünler) kullanım hakkı bu testin kapsamında değil.
