# QA Raporu — Kısaca Biz V3

Test tarihi: 24.11.2026 · Tarayıcı: Google Chrome (headless, Playwright) · Kaynak: `n1-kisaca-biz-v3.js` (bu paketteki son hâl)

## Test ortamı

- **Bileşen:** `preview.html` üzerinden yüklendi. Bu, Wix'teki kullanımın aynısıdır: tek etiket ve tek script.
- **Paylaşılan dosyalar:** Header, Footer, WhatsApp ve iç sayfa CSS'i, GitHub'daki aynı commit'lerden (`d24fa373…`, `09612df9…`) indirilen yerel kopyalardan sunuldu. Sandbox jsDelivr'e erişemediği için istekler bu kopyalara yönlendirildi.
- **GSAP:** 3.13.0 ve ScrollTrigger, cdnjs dosyalarının yerel kopyalarından yüklendi.
- **Fontlar:** Barlow ve Barlow Condensed yerel kopyadan yüklendi.
- **Dokunmatik:** 1024 px ve altında `has_touch`, 767 px ve altında `is_mobile` ile denendi.

## 1. Responsive — 10 genişlik (hepsi gerçek tarayıcıda)

Her genişlikte yapılanlar:
- Sayfa baştan sona kaydırıldı, animasyonların bitmesi beklendi.
- Header, Footer, WhatsApp, GSAP, taşma, gizli metin ve satır çakışması ölçüldü.
- Etkileşimler (bölüm 3) ve menü (bölüm 4) çalıştırıldı.

| Genişlik | Sayfa yük. | Yatay taşma | Footer alt boşluk | Final→Footer | Header/Panel/Footer/WhatsApp | GSAP/ST script | Pin-spacer | Gizli metin | Satır çakışması | Hata |
|---|---|---|---|---|---|---|---|---|---|---|
| 360 | 6 688 | yok (360) | 0 | 0 | 1/1/1/1 | 1/1 | 0 | 0 | 0 | 0 |
| 375 | 6 736 | yok | 0 | 0 | 1/1/1/1 | 1/1 | 0 | 0 | 0 | 0 |
| 390 | 6 782 | yok | 0 | 0 | 1/1/1/1 | 1/1 | 0 | 0 | 0 | 0 |
| 430 | 6 921 | yok | 0 | 0 | 1/1/1/1 | 1/1 | 0 | 0 | 0 | 0 |
| 768 | 6 601 | yok | 0 | 0 | 1/1/1/1 | 1/1 | 0 | 0 | 0 | 0 |
| 820 | 6 727 | yok | 0 | 0 | 1/1/1/1 | 1/1 | 0 | 0 | 0 | 0 |
| 1024 | 7 051 | yok | 0 | 0 | 1/1/1/1 | 1/1 | 0 | 0 | 0 | 0 |
| 1366 | 7 986 | yok | 0 | 0 | 1/1/1/1 | 1/1 | 0 | 0* | 0 | 0 |
| 1440 | 8 403 | yok | 0 | 0 | 1/1/1/1 | 1/1 | 0 | 0* | 0 | 0 |
| 1920 | 10 449 | yok | 0 | 0 | 1/1/1/1 | 1/1 | 0 | 0* | 0 | 0 |

\* Masaüstünde ölçüm aracı yalnızca `.kv-cap__d`'yi gizli buldu. Bu bilinçli bir tercih: masaüstünde disiplin açıklaması solda listede görünür, sahne altındaki kopyası `display:none`. Tablet ve mobilde görünür.

**Ek kontroller (10 genişliğin tamamında):**
- Kaldırılan Markalar bölümünden DOM'da kalan öğe: 0. Kaynakta `kb2`, `kb-brands`, `brand-` dizgisi: 0.
- V3 stilinde `#A1FF00` / `#A2FF00`: 0.
- Unicode ok karakteri: 0. `aria-hidden` olmayan dekoratif SVG: 0.
- Final CTA'ları `/iletisim` ve `/teklif-al`. `elementFromPoint` ile ikisinin de üstünde başka katman olmadığı doğrulandı.
- Ekip başlığı ve manifesto kelime/harf parçaları, bölüm ekran ortasına geldiğinde %100 görünür.

**Bölüm yükseklikleri (px):**

| | Ekip | Standart | Uzmanlık | Manifesto | Final |
|---|---|---|---|---|---|
| 390 | 1 057 | 1 689 | 929 | 463 | 592 |
| 820 | 1 031 | 1 408 | 1 038 | 667 | 690 |
| 1440 | 1 762 | 1 517 | 1 159 | 1 041 | 897 |

Yükseklik içerikten gelir; boşluk üreten spacer yok.

## 2. Görsel kontrol (ekran görüntüleri)

`screenshots/` klasöründe her bölüm için gerçek tarayıcı görüntüleri var. Genişlikler: **390, 820, 1440** (zorunlu) ile 360, 1024 ve 1920. Görüntüler tek tek incelendi.

Ek görüntüler:
- `1440-09-` ve `390-09-creative-engine-7-bicim.png`: yedi disiplinin sahnesi. 1440'ta ek olarak imleç itmesi.
- `1440-10-standart-hover.png`: ilke satırında imleci izleyen geometri ve diğer satırların geri çekilmesi.
- `1440-11-uzmanlik-hover.png`: genişleyen hizmet şeridi.
- `390-11-uzmanlik-kaydirma.png`: mobil kaydırmalı vitrin.
- `1440-12-hareket-azaltma-sahne.png`: hareket azaltma açıkken sahne.
- `1440-13-gsap-yok-uzmanlik.png`: GSAP yüklenemediğinde Uzmanlık şeridi.

İnceleme sırasında bulunup düzeltilen sorunlar:
- **Parçaların solması:** Uzmanlık panelleri ile sahne parçaları aynı sınıfı (`.kv-p`) paylaşıyordu; panel girişi sahne parçalarını soldurdu. Parçaların sınıfı `.kv-pt` yapıldı.
- **Sahne adı taşması:** Sahnedeki büyük disiplin adı uzun kelimelerde taşıyordu. Font boyutu sahne genişliğine bağlandı (container query, `16cqw`).
- **Manifesto zamanlaması:** Manifesto birleşmesi geç bitiyordu. Bitiş noktası, bölüm ekran ortasına geldiği ana çekildi.
- **Sahne etiketi:** Etiket köşe işaretinin üstüne biniyordu; alta taşındı.

## 3. Etkileşim testleri

| Test | Masaüstü (1366/1440/1920) | Tablet + mobil (360–1024) |
|---|---|---|
| Engine: disiplin tıklama | ✓ Teknoloji seçildi | ✓ |
| Engine: klavye (Aşağı ok) | ✓ odak ve sahne Performans'a geçti | — |
| Engine: liste üzerinde hover | ✓ Kreatif'e geçti | — (hover yok) |
| Engine: kaydırma ile seçim (yapışkan sahne) | ✓ görüntüde doğrulandı (1440) | — |
| Engine: SVG ok butonu | — (masaüstünde gizli) | ✓ Teknoloji → Performans |
| Engine: sahnede yatay kaydırma | — | ✓ Performans → Prodüksiyon |
| Engine: aktif çip görünür alanda | — | ✓ |
| Engine: imleç itmesi | ✓ görüntüde doğrulandı | — |
| Standart: hover'da geometri + çizgi + diğerleri geri çekilir | ✓ (`is-on`, opaklık 1, `--gx` imleci izliyor) | — |
| Standart: imleç çıkınca kapanır | ✓ (0 aktif) | — |
| Standart: ekran ortasındaki ilke etkin | — | ✓ |
| Standart: dokunarak etkinleştirme | — | ✓ |
| Uzmanlık: hover ile genişleme, metin panelden taşmıyor | ✓ (UI/UX, 666 px, `aria-expanded=true`) | — |
| Uzmanlık: klavye (Tab + Enter) | ✓ 07 açıldı | — |
| Uzmanlık: SVG oklarla kaydırma, sayaç ve ilerleme çubuğu | — | ✓ (03 / 07, sayfa taşması yok) |

## 4. Header / menü / WhatsApp / Yukarı Çık (onaylı modüller, değiştirilmedi)

- **Masaüstü:**
  - Menü açılıyor.
  - İnsan Kaynakları alt menüsü `/ekibimize-katil` ve `/acik-pozisyonlar` ile görünür; Hizmetler'e geçince kapanıyor.
  - Escape menüyü kapatıyor; klavyeyle açınca odak menüye geçiyor.
- **Dokunmatik (360–1024):** Menü ekran içinde açılıyor, alt menü görünür.
- **Yukarı Çık:**
  - 360: 5 905 → 0
  - 390: 5 873 → 0
  - 820: 5 521 → 0
  - 1024: 5 685 → 0
  - 1440: 7 503 → 0
- **Menü verisi:** Onaylı v6.48 verisi kullanılıyor. Markalar → `/markalar` korunuyor; logo ve marka `/`, Hizmetler `/#hizmetler-ozet`.

## 5. Dayanıklılık

| Test | Sonuç |
|---|---|
| Sayfada GSAP zaten varken (ana sayfadan geçiş benzetimi) | GSAP script sayısı 1, ikinci kopya yüklenmedi ✓ |
| 3 kez kaldır / yeniden ekle (Wix sayfa geçişi benzetimi) | Her eklemede 1 Header, 1 Panel, 1 Footer, 1 WhatsApp, 17 ScrollTrigger, yükseklik 8 403. Her kaldırmada hepsi 0, stil etiketi kaldırıldı, `body` sınıfı geri alındı ✓ |
| Ticker temizliği | Sahne görünürken `running=true`, ekran dışında `false`. Kaldırıldıktan sonra `running=false` ve zaman ilerlemiyor ✓ |
| Tween birikmesi | İlk ölçümde Footer modülünün kendi `matchMedia` timeline'ı her yeniden eklemede 4 tween bırakıyordu (V2'de de var). Bu kopyayı hedefleyen kök timeline'lar bağlantı kesilince sonlandırılıyor; 3 döngü sonunda kalan 1 (GSAP'in iç zaman çizelgesi, artmıyor) ✓ |
| `prefers-reduced-motion` (1440, 390) | Gizli içerik 0; dönüşümlü metin parçası 0; disiplin seçimi anında değişiyor; hata 0 ✓ |
| GSAP / ScrollTrigger yüklenemezse (1440, 390) | İçerik görünür, 1 Header / 1 Footer / 1 WhatsApp. Disiplin seçimi ve Uzmanlık şeridi çalışıyor. Tek uyarı beklenen konsol mesajı, hata 0 ✓ |
| Ekran yönü 390×844 → 844×390 → 390×844 | Taşma yok, footer boşluğu 0, gizli metin 0, satır çakışması yok, hata 0 ✓ |

## 6. Performans notları (ölçülen + tasarım kararı)

- **Sürekli animasyon:** Yalnızca Creative Engine'de var. 42 SVG `rect` her karede tek `transform` ve `opacity` niteliğiyle güncellenir.
  - Sahne görünmezken veya sekme arka plandayken ticker kaldırılır.
  - Hareket azaltmada hiç çalışmaz.
- **Uzmanlık şeridi:** Masaüstündeki genişleme `flex-grow` geçişidir; yalnızca 7 öğe ve yalnızca etkileşimde. Diğer bütün animasyonlar `transform` / `opacity` / SVG `stroke-dashoffset`.
- **Pin ve spacer:** Pin yok, spacer yok. Toplam ScrollTrigger sayısı (Footer modülününkiler dahil): mobil 14, tablet 16, masaüstü 17–18.

## 7. Test EDİLEMEYENLER (açıkça)

- **Wix Studio:** Editor, önizleme ve yayınlanmış Test Site'ta çalıştırılmadı. Talimat gereği Wix'e ve GitHub'a hiçbir şey yüklenmedi. Wix kapsayıcısının gerçek davranışı (Bölüm "Otomatik" yükseklik, Wix'in kendi kaydırma kapsayıcısı) Test Site'ta kontrol edilmeli.
- **Gerçek cihazlar:** iOS Safari ve Android Chrome'da denenmedi. Dokunmatik testler Chrome'un dokunma emülasyonuyla yapıldı; gerçek parmakla kaydırma ivmesi, iOS adres çubuğunun `100vh` değişimi ve Safari'nin `container-type` / `cqw` desteği cihazda doğrulanmalı. Safari 16 ve üstü bunları destekler.
- **Diğer motorlar:** Firefox ve WebKit motorlarıyla test yapılmadı; yalnızca Chrome kullanıldı.
- **Canlı ağ:** jsDelivr, cdnjs, Google Fonts ve `static.wixstatic.com` gerçek ağdan yüklenmedi (sandbox erişemiyor); aynı commit'lerin yerel kopyaları kullanıldı. Footer partner görseli sandbox'ta yerel kopyadan gösterildi.
- **Erişilebilirlik:** Gerçek bir ekran okuyucuyla (VoiceOver/NVDA) dinlenmedi. Yapısal kontroller yapıldı:
  - tek H1, başlık sırası
  - gizli tam metin (`kv-sr`)
  - `aria-pressed`, `aria-expanded`, `aria-live`
  - klavye ile seçim ve odak çerçevesi
- **Profil ölçümü:** Düşük güçlü cihazlarda FPS veya CPU ölçümü ve Lighthouse yapılmadı.
- **Referans site:** lusion.co/about bu ortamın izinli adres listesinde olmadığı için açılamadı. Tasarım kararları sayfanın kamuya açık tanımlarına ve genel prensiplere dayanır (bkz. DESIGN_RATIONALE.md).

## 8. Bilinen sınırlar / öneriler

- Creative Engine'in masaüstü kaydırma seçimi, listenin ekranın %58 çizgisinden geçen satırına bağlı. Kullanıcı bir satıra tıklarsa seçim tıklanana geçer; sonraki kaydırmada yeniden kaydırma konumuna döner. Bu bilinçli bir tercih.
- Footer modülü her bağlanışta kendi `gsap.matchMedia()` örneğini oluşturuyor ve bunu geri alma fonksiyonu dışarıya açık değil. V3 bu örneğin tweenlerini temizliyor, ama dinleyicinin kendisini kaldıramıyor. Footer modülüne dokunulmadığı için bu, V2'den devralınmış küçük bir durum.