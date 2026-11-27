# OPTIMIZATION_DECISIONS — V1.4 kararları ve gerekçeleri

Değişmez kurallar (görev §3): tasarım, masaüstü, Ronin 2× politikası, #A2FF00, tipografi, GSAP sahneleri, içerik ve bağlantılar (P08 hariç) aynı kalır. Kalıcı poster yok, çözünürlük düşürme yok, bölüm kaldırma yok.

## 1. Cihaz profili (bir kez, yükleme anında)
```js
N1_LITE = matchMedia('(any-pointer: coarse) and (max-width: 1366px)').matches
       || matchMedia('(max-width: 900px) and (hover: none)').matches
```
- **Hafif profil:** telefon ve tablet. Bunlara iPad yatay (1180–1366 px), klavye ya da izleme dörtgeni bağlı iPad (`any-pointer: coarse` dokunmatik ekranı yine görür) ve dar Android dahildir. Görevin "iPad yatay ağır masaüstü medyası almasın" kuralı bu profille sağlanır.
- **Masaüstü:** yalnız fare ya da izleme dörtgeni olan cihaz. Pencere genişliği ne olursa olsun videolar korunur. Dar masaüstü penceresinde de video vardır; bu, V1.3 ile aynı davranıştır.
- **Karar bir kez verilir:** döndürmede ya da yeniden boyutlandırmada medya yeniden seçilmez. Bu sayede ortaya video eklenmez, çözücü dalgalanması olmaz. Döndürme testinde 4 döndürmede yeni video isteği 0 çıktı (TEST_REPORT §5).
- **Neden genişlik değil:** iPad Pro yatay 1366 px, küçük dizüstü 1280 px olabilir. Yalnız genişliğe bakılsaydı bu iki cihaz yanlış profile düşerdi.

## 2. İkincil videolar → WebP kare (P10/P11)
| Karar | Gerekçe |
|---|---|
| Yalnız ikincil videolar | Kahraman (hero) videolar ve ana sayfa (Ronin 2×, mini, bantlar) tasarımın ana öğesi, kapsam dışı. |
| `<video>` hafif profilde **hiç oluşturulmaz** | Gizli `<video>`, `preload="none"` olsa bile WebKit'te öğe, medya oturumu ve bazen meta veri isteği demektir. Karar `src` atanmadan önce, HTML üretilirken verilir. |
| Kare = seçilmiş an, animasyonlu değil | Görev kuralı. Seçim temas sayfalarıyla yapıldı (MOBILE_MEDIA_MAPPING). |
| Çok boyutlu `srcset` + `sizes` | Cihaz yalnız gereken genişliği indirir. Büyütme yapılmadı; kaynak boyutu en büyük boyuttur. |
| WebP q84, method 6 | Göz kontrolünde bantlanma ya da blok yok; kare başına 6–177 KB. |
| Kutu aynı (`position:absolute; inset:0; object-fit:cover`) | Video kutusunun oranı ve kırpması korunur. Mobil belge yüksekliği ve CLS değişmedi (VISUAL_REGRESSION_REPORT). |
| Oynat düğmeleri hafif profilde yok | Kare oynatılamaz. Ölü düğme yanıltıcı olurdu. |
| Kreatif monitör: kare poster + dokunuşla video | Bölüm oynatıcısı etkileşimli bir öğe, kaldırılmadı. Otomatik oynatma ve yakın-yükleme kapalı. Video, kullanıcı bölüm ya da oynat düğmesine dokunduğunda kaynak alır. Bu, hafif profilde kaynaksız bırakılan tek `<video>` öğesidir; `src` yoktur, istek yoktur (ağ testi: Kreatif 2→1 istek). |
| Sürümlü klasör, SHA ile sabit | `media/stills/<sayfa>/…` @ `274e02b`. Geri dönüşte eski adresler çalışmaya devam eder. |

## 3. Görseller (P15)
- **E-Ticaret v25:** görseller orijinal boyutlu PNG idi (mobilde 34,8 MB, toplam 30,5 MP). Wix'in kendi dönüştürme adresi kullanıldı: `/v1/fit/w_W,h_3W,q_86,enc_auto/` ile `srcset` 240/480/960/1440 w, `src` 960. `enc_auto`, tarayıcının desteklediği biçimi (WebP/AVIF) seçer; `fit` en-boy oranını korur.
  - Ölçülen mobil görsel aktarımı 34,80 → 1,71 MB. Masaüstü (1440, DPR 1) 36,47 → 0,92 MB.
  - Masaüstü görüntülenen boyutlar ≤ 960 px. DPR 2 ekranlarda 1440 w seçilir; görünür keskinlik kaybı yok (VISUAL_REGRESSION_REPORT §2).
- **Diğer sayfalar:** görseller zaten Wix boyutlandırma adresleriyle ya da `loading="lazy"` ile sunuluyor (MEDIA_INVENTORY §4). Ek değişiklik, tasarım riski karşılığında ölçülebilir kazanç vermiyordu, bu yüzden yapılmadı.
- **CLS:** tüm WebP karelerde `width`/`height` var. Ölçülen CLS değişimi ±0,01 içinde (PERFORMANCE_BEFORE_AFTER).

## 4. Ekran dışı video, animasyon ve GPU (P12)
- **Ekran dışı videolar:** sayfaların kendi `IntersectionObserver` ve `n1MediaRatio` mantığı V1.3'te de görünmeyeni duraklatıyordu; korundu. Hafif profilde ikincil video kalmadığı için bu yük ortadan kalktı.
- **Sonsuz CSS animasyonları:** yalnız küçük öğelerde var:
  - Reklam: imleç yanıp sönmesi (`ry-blink`, `steps(1)`).
  - UI/UX: yükleme halkası (`ux-rot`).
  - Uygulama: düğme halkası (`ap-ring`) ve iskelet (`ap-sk`).

  Hepsi tek öğe, kompozit dostu ve tasarımın parçası; değiştirilmedi. GSAP `repeat:-1` yok, rAF döngüleri olay güdümlü.
- **CSS `filter` / `backdrop-filter`:** sayılar MEDIA_INVENTORY §5'te. V1.3'teki WebKit çökme düzeltmeleri korundu:
  - E-Ticaret `grayscale(0) brightness(1)`.
  - UI/UX `.ux-screen--acc` `grayscale(0)` ↔ `grayscale(1)`.

  **Hiçbir `filter: none` geçişi eklenmedi.** Yeni filtre, gölge ya da bulanıklık eklenmedi.

## 5. Yapılmayanlar (bilinçli)
| Konu | Neden |
|---|---|
| Kahraman videoları mobilde kare yapmak | Görev kuralı (kahramanlar korunur) ve tasarım. Kreatif ve Sosyal kahramanları büyük (12,8 MB / 13,7 MB, 720p, ~35–39 sn). Bu, sonraki karar için bir öneri: kısaltılmış mobil kodlama, aynı çözünürlükte daha düşük bit hızı. |
| Ana sayfa medya politikası | v658 ve Ronin 2× korunur. Yalnız gizlenince kaynak bırakma eklendi. |
| Wix yerel videolar (`/cgi-reklamlar`, `/marka-danismanligi`, `/web-tasarim-ve-yazilim-programlama`) | Wix Video Player öğeleri, kodla erişilemez. Wix Editor'de "otomatik oynat" ve "döngü" ayarları ya da kapak görseli ile yönetilir; canlı değişiklik onay gerektirir. |
| Stabilite modülünü genel açmak | Görev kuralı. Yararlı parçası (gizlenince video kaynağını bırakma) bileşen başına `n1Life` olarak entegre edildi. |
| BFCache'i kapatmak (`unload`, `Cache-Control: no-store`) | Görev kuralı. Geri dönüş hızını bozar. |
| Sonsuz CSS animasyonlarını durdurmak | Tasarım öğesi; ölçülebilir maliyeti yok. |
