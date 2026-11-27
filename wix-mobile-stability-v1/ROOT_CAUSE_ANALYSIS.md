# ROOT_CAUSE_ANALYSIS — Sorun 01: iPhone'da tekrarlı ana sayfa ↔ hizmet sayfası gezinmesinde çökme

## V1.1 güncellemesi (27 Kasım 2026)

**Durum değişmedi: kesin kök neden gerçek cihazda doğrulanamadı; çökmenin çözüldüğü iddia edilmiyor.**

Yeni kanıtlar:
1. **Wix ATS koşulu netleşti.** `handleAccessTokens.inline.473e3296.bundle.min.js` yalnızca `client-session-bind` ve `sec-fetch-unsupported` çerezlerinin ikisi de yokken ve gezinme tipi `back_forward` ise yeniden yüklüyor; sayaç `sessionStorage["reload"]`'da tutuluyor, 60 sn'de en fazla 3 kez. Aynı betik `client-session-bind` çerezini geçmiş tarihli (1970) bir değerle yeniden yazıyor, yani okuduktan sonra siliyor gibi görünüyor (küçültülmüş koddan çıkarım). Bu, HTTP önbelleğinden geri gelen belgede erişim belirteçlerini yenilemek için tasarlanmış bir davranış gibi görünüyor. Wix'e iletilecek kanıtlı rapor: WIX_SUPPORT_REPORT.md.
2. **Ronin 2× filmin maliyeti ölçüldü.** WebKit süreç belleği oynatma sırasında postere göre 2× +129 MB, 1× +71 MB (fark +58 MB, 3/3 tekrar). Safari `deviceMemory` sağlamadığı için tüm iPhone'lar 2× alıyor. Ana sayfa, iPhone'da en büyük tekil bellek kalemi olan bu filmle açılıyor ve geri dönüşlerde (ATS nedeniyle) iki kez yükleniyor. Bu, kök neden adayları arasında öne çıkıyor; **kanıtlanmış değil**.
3. **Uzun bekleme süreli 21 döngü (uzak-bırakma eşiği kapsandı):** TEST_REPORT.md §10 — uzak-bırakma kaynakları serbest bıraktı (WebKit tamponlu video 46/51 → 0/53) ama iki eşleştirilmiş WebKit koşusunda süreç belleğini düşürmedi (canlı 1433/1524, V1.1 1556/1499, uzak-kapalı 1432 MB ortalama). Bu yüzden V1.1'de varsayılan olarak kapatıldı. Video tamponlarının tutulması, emülasyonda süreç belleğini belirleyen ana etken olarak **doğrulanmadı**. Asıl hedef olan BFCache'te bekleyen sayfa yolu ise burada ölçülemedi.

### Ölçüm kapsamının sınırları
V1.0'daki "belge içi birikim yok" sonucu yalnızca ölçülen sayaçlar için geçerlidir (window/document dinleyicileri, interval, IO/MO/RO, rAF hızı, GSAP/ScrollTrigger sayısı, video durumları, DOM düğümü, JS heap, süreç RSS). Ölçülmeyenler: öğe düzeyindeki dinleyiciler, setTimeout/Promise zincirleri, kapanışlarda tutulan referanslar, ayrık DOM ağaçları (heap snapshot alınmadı), çözücü/GPU/görsel önbelleği gibi yerel bellek (yalnızca RSS ile dolaylı), BFCache'te bekleyen belgeler (oluşmadı), iOS jetsam/VideoToolbox/Düşük Güç Modu, saatler süren oturumlar, engelli üçüncü taraf betikler. Bu türlerdeki sızıntılar **ne doğrulandı ne de elendi**. Ayrıntı: TEST_REPORT.md §11.

### Sonraki ayırt edici deney (gerçek cihaz)
Test anahtarıyla (`?n1v11=1&n1diag=1`) aynı iPhone'da 21 döngü: (a) V1.1 kapalı, (b) V1.1 açık. Uyarının çıktığı döngü numarası ve tanılama günlüğündeki `pageshow persisted` / `nav=reload` oranı not edilmeli. Uyarı (b)'de de sürerse sıradaki deney: tasarım onayıyla 1,5× film (MOBILE_MEDIA_BENCHMARK.md §5-C).

---

## V1.0 analizi

## 0. Sonuç (kısa)

**Kesin kök neden gerçek cihazda doğrulanamadı.** Bu ortamda iPhone yok. Playwright WebKit (Linux/WPE) testlerinde çökme ya da "Bu sayfa pek çok hata ile karşılaştı" uyarısı **yeniden üretilemedi**. Bir koşuda WebContent süreci 1,6 GB'ta asılı kaldı, ancak bu ikinci koşuda tekrar etmedi.

Ölçümlerle desteklenen en güçlü açıklama, **tek bir WebContent sürecinde bellek birikimi**dir. iOS bu süreç belirli bir sınırı aşınca onu sonlandırır (jetsam) ve Safari bu durumda tam olarak bu uyarıyı gösterir. Birikime katkı veren, ölçülmüş üç etken var:

1. **Wix ATS'nin çift yüklemesi (Wix kaynaklı, en büyük ölçülen etken):** BFCache'ten dönülmeyen her geri/ileri gezinmesinde sayfa önce `back_forward` olarak yükleniyor, ~200 ms sonra Wix'in güvenlik betiği `location.reload()` çağırıyor (60 sn'de 3 kereye kadar). WebKit'te "tıkla + geri" yolu, aynı sayfalar arasında `goto` yoluna göre **+150–250 MB** daha fazla bellek kullandı ve büyümeye devam etti.
2. **1N video kaynaklarının sayfadan ayrılırken bırakılmaması (bizim kodumuz):** videolar yalnızca duraklatılıyor. BFCache'e giren sayfada çözücü ve tamponlar bellekte kalıyor. Kaydırılıp geçilen videolar da tamponunu tutuyor.
3. **Sayfaların doğal ağırlığı:** videolu 1N sayfaları WebKit'te videosuz olanlara göre ~+180 MB süreç belleğiyle plato yapıyor. Ana sayfa en ağır sayfa (Ronin filmi + 5 video + 13 ScrollTrigger).

Bellek sızıntısı (aynı belge içinde birikme) **yok**: Gezinmeler tam sayfa yüklemesi (SPA değil). Her yeni belgede sayaçlar sıfırdan başlıyor ve 21 döngü boyunca sabit kalıyor.

## 1. Hipotezler ve test sonuçları

| Hipotez | Test | Sonuç |
|---|---|---|
| H1: Wix sayfa geçişi SPA, bileşenler aynı belgede birikiyor | `window` işareti + `performance.navigation.type` | **Reddedildi.** Her geçiş tam sayfa (`navigate` / `back_forward` / `reload`) |
| H2: Aynı belgede dinleyici/observer/interval sızıntısı | 21 döngüde belge başına sayaçlar | **Reddedildi.** Ana sayfa her dönüşte window dinleyici 112–115, interval 8, IO 8, ST 13; hizmet sayfaları kendi içinde sabit |
| H3: Sürekli rAF döngüsü | Yığın izi | GSAP ScrollTrigger'ın kendi `_rafBugFix` döngüsü. Boş geri çağırma, bellek etkisi yok. **Kök neden değil** |
| H4: Geri tuşunda ek yükleme | sessionStorage olay izi | **Doğrulandı.** Wix ATS `back_forward` → `reload` (Chromium ve WebKit) |
| H5: Tek süreçte bellek birikimi | WebKit süreç RSS, 21 döngü | **Doğrulandı (emülasyonda).** 1040 MB → 1690–1780 MB (son döngüler) |
| H6: Geri yolunun birikime katkısı | `goto` ↔ `tıkla+geri` karşılaştırması | **Doğrulandı.** goto 742→890 MB (plato), geri 992→1136 MB (artış sürüyor; 10 dönüşün 4'ünde ATS reload) |
| H7: Videoların bırakılmaması | Kod + sayaç | **Doğrulandı (kod).** pagehide'da yalnız pause; sayfa sonunda tamponların %90'ı dolu |
| H8: BFCache geri yüklemesinde bileşenlerin bozulması | Sentetik `pageshow(persisted)` | Ana sayfa ve hizmet sayfası sağlıklı (header/panel kurtarma mevcut) |
| H9: Tek sayfanın tek başına aşırı ağır olması | GPU katman alanı, çözülmüş görsel Mpx | En ağır: katman 17 Mpx (DPR3), görseller ≤ 30 Mpx (e-ticaret). Tek başına çökme düzeyinde değil |

## 2. Wix ATS çift yüklemesi (Wix kaynaklı)

Canlı HTML'de satır içi Wix kodu (kısaltılmış):
`"back_forward"===(performance.getEntriesByType("navigation")[0]?.type) && (counter<3 ? (setItem(Date.now()+"-"+(counter+1)), window.location.reload()) : console.error("ATS: Max reload attempts reached"))`

Etki: Geri tuşu BFCache'ten dönmezse sayfa iki kez yüklenir; geçici bellek tepesi ve süre artar. Bu kod Wix'e ait, 1N tarafından değiştirilemez. Wix destekle paylaşılması önerilir. ATS'nin 1N tarafındaki yan etkisi (çapa kaybı) nav v1.0.2 ile giderildi.

## 3. 1N kodundaki medya yaşam döngüsü (bizim kontrolümüzde)

| Dosya | pagehide | Kaynak bırakma | Not |
|---|---|---|---|
| `wix-home-v656/modules/n1-video-m5.js` | `:155`, `:344` yalnızca pause | `:158`, `:359` yalnızca `destroy()` | `destroy` tam geçişte çağrılmaz |
| kreatif-produksiyon-v23 | yok | `:992` (`_cleanups`, `disconnectedCallback :1268`) | |
| e-ticaret-yonetimi-v23 | yok | `:974` (`disconnectedCallback :1191`) | |
| sosyal-medya-v27 | yok | `:929` (`:1250`) | |
| reklam-yonetimi-v23 | yok | `:648` (`:979`) | |
| uiux-tasarim-v28 | yok | `:713` (`:1096`) | |
| yapay-zeka-v2 | yok | `:643` (`:949`) | |
| uygulama-gelistirme-v2 | yok | `:695` (`:1360`) | |

(Satırlar `wix-sitewide-mobile-fix-2026-11-26/` altındaki canlı dosyalara aittir.)

**Çözüm (F-01/F-02):** Sayfa dosyalarına dokunmadan site geneli `n1-stability-v1.js`. `pagehide`'da 1N videolarının kaynağını bırakır, `pageshow(persisted)`'ta geri yükler. Ekranın ≈1,5 ekran dışında ≥4 sn duraklatılmış bekleyen videoları bırakır, yaklaşınca geri yükler.

## 4. Ölçülen etki ve dürüst değerlendirme

- WebKit süreç RSS (21 döngü): canlı ort. 1486 / maks. 1949 / son 15 ort. 1690 MB; düzeltmeli 1465 / 1886 / 1626 MB. **Fark ≈%4, gürültü düzeyinde.** Emülasyonda medya bırakmanın süreç belleğine etkisi anlamlı ölçülemedi. Olası nedenler: (a) bu testte BFCache geri yüklemesi oluşmadı, yani asıl hedeflenen yol (BFCache'te bekleyen sayfalardaki çözücüler) Linux WebKit'te çalışmadı; (b) WPE/GStreamer'ın çözücü bellek modeli iOS VideoToolbox'tan farklı; (c) döngü testinde kaydırma sonrası bekleme süresi (2,8 sn) uzak-bırakma eşiğinden (4 sn) kısaydı.
- Düzeltmenin işlevsel doğruluğu kanıtlandı: kaynaklar gerçekten serbest kalıyor (`readyState 0`), geri yükleniyor, Ronin hero kareleri ilerliyor, konum ve kullanıcı duraklatması korunuyor (TEST_REPORT.md §4).
- **Gerçek iPhone'da çökme sorununun çözülüp çözülmediği bilinmiyor.** Bunu yalnızca fiziksel cihaz kabul testi gösterebilir (TEST_REPORT.md §8). `?n1diag=1` ekran günlüğü bu test için eklendi.

## 5. Kalan riskler / öneriler

1. Wix ATS çift yüklemesi için Wix destek bileti (site ID ile). Bizim tarafta değiştirilemez.
2. Fiziksel cihazda Safari Web Inspector → Timelines → Memory ile ana sayfa ↔ hizmet döngüsü sırasında "Page" belleğini izleyin.
3. Çökme sürerse sonraki aday: ana sayfa mobil hero filminin 2× dosyası (`ronin-m5-film-2x.mp4`, 6,3 MB). `wix-home-v656/modules/n1-m5-build.js:34` düşük bellek koşulunu `navigator.deviceMemory` ile kontrol ediyor. **Safari bu API'yi desteklemediği için koşul iPhone'da hiç devreye girmiyor** ve `filmCss × DPR > 840` olduğundan (DPR 3) iPhone'da her zaman 2× dosya seçiliyor. 1× ile sınırlamak video kalitesini değiştireceği için bu çalışmada yapılmadı; onayınız gerekir.
