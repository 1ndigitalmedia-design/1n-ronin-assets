# 1N Uygulama Geliştirme — V1 "Beyond the Screen / Ekranın Ötesinde Bir Deneyim"

| | |
|---|---|
| Sayfa | `/uygulama-gelistirme` (menü adı: Uygulama) |
| Dosya | `n1-uygulama-gelistirme-v1.js` (~173 KB okunur kaynak, gzip ile ~36 KB; tek dosya, bağımlılıklarını kendisi yükler) |
| Custom Element etiketi | `n1-uygulama-gelistirme-v1` (`customElements.define` ile kendini kaydeder; dosya ikinci kez yüklenirse yeniden tanımlamaz) |
| Stil kimliği | `n1-ap1-style` (yalnızca bu etiket kapsamında, sınıf öneki `ap-`) |
| Sürüm | Bağımsız V1. GitHub'daki diğer hizmet sayfalarına, onaylı Header/Footer dosyalarına ve ana sayfa kaynaklarına dokunulmadı. |
| Medya | Brief'te verilen 6 görsel ve 4 video (yalnızca verilen 720p adresleri). Stok veya üretilmiş medya eklenmedi. |

## Sayfa adresi (slug)
Onaylı site işaretlemesi (`n1-site-markup-v648.js`, commit `d24fa373…`) ana sayfadaki bağlantıyı `/uygulama-gelistirme` olarak veriyor; bu paket de bu adresi esas alır. **Canlı Wix sayfasının gerçek slug'ını buradan doğrulayamadım** (Wix'te sayfa listesine ve canlı siteye erişim kullanılmadı). Wix'te sayfa ayarlarından slug'ın `uygulama-gelistirme` olduğunu kontrol edin; Türkçe karakterli `/uygulama-geliştirme` varyantına geçmeyin, yönlendirmeleri değiştirmeyin.

## Wix Studio'ya ekleme
1. Dosyayı GitHub'da **yeni bir klasöre** yükleyin (öneri: `wix-uygulama-gelistirme-v1/n1-uygulama-gelistirme-v1.js`). Mevcut hiçbir dosyanın üzerine yazılmaz. (Bu paket hazırlanırken GitHub'a hiçbir şey gönderilmedi, Wix'te hiçbir şey değiştirilmedi.)
2. Commit'e sabitlenmiş jsDelivr adresini alın — bu **Server URL** olur:
   `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@<commit>/wix-uygulama-gelistirme-v1/n1-uygulama-gelistirme-v1.js`
3. `/uygulama-gelistirme` sayfasına bir Custom Element ekleyin: **Server URL** = bu adres, **Tag name** = `n1-uygulama-gelistirme-v1`. İsterseniz önce ayrı bir test sayfasında deneyin.
4. Sayfada ayrıca Wix Header/Footer bölümü olmamalı. Bileşen onaylı Header/Footer'ı ve WhatsApp/Yukarı Çık düğmelerini kendisi ekler; sayfada zaten bir `n1-header`, `footer.n1ft` veya kontrol katmanı varsa ikincisini oluşturmaz.
5. Önce Test Site'ta yayınlayıp masaüstü, tablet ve telefonda kontrol edin.

## Önemli: Custom Element dış kutusunun yüksekliği
Bileşen light DOM'da çalışır; sabit yükseklik, GSAP pin veya spacer kullanmaz; içerik doğal akışında büyür. Ancak App Lab'de görünüm değiştirmek (telefon → tarayıcı → panel), hizmet dizininde açıklama açılması ve görsellerin yüklenmesi yüksekliği çalışırken değiştirir. **Wix Studio, Custom Element'i kendi oluşturduğu bir dış kutuya yerleştirir ve bu kutunun yüksekliği editördeki ayara bağlıdır;** bileşenin JavaScript'i bu dış kutuyu her durumda büyütemeyebilir. Bu nedenle:

- Öğeye ve bulunduğu bölüme **sabit piksel yükseklik vermeyin**; yükseklik "otomatik / içeriğe göre" olsun.
- Öğenin duyarlı davranışı "orantılı ölçek" olmasın; genişlik %100, kenar boşlukları 0.
- Yayınlanan sitede kontrol edin: Footer tam görünüyor mu, altında boşluk var mı, Lab'de Dashboard'a geçince içerik kesiliyor mu, masaüstü/tablet/telefon geçişinde yükseklik doğru mu?
- Wix bu kurulumda dış kutuyu otomatik büyütmezse kalıcı çözüm, sayfayı HTML Embed (iFrame) içine alıp yüksekliği `postMessage` ile ana sayfaya bildirmektir (Wix Özel Kod gerektirir). Bu yöntem bu pakette uygulanmadı; gerekirse ayrıca hazırlanır.
- Süreç bölümündeki küçük ekran CSS `position: sticky` kullanır. Wix'in dış kapsayıcısı `overflow` ile bunu engellerse ekran normal akışta kalır; aşamalar yine çalışır, yalnızca ekran kaydırırken yerinde durmaz.

Yerel testlerde Footer altı boşluk 10 genişliğin tamamında 0–1 px ölçüldü, ancak bu ölçüm Wix dış kutusu olmadan yapıldı. **Gerçek Wix Studio testi yapılmadı ve şarttır.**

## Videolar
- Yalnızca verilen 720p adresleri kullanılır; 480p/1080p varyant adresi **üretilmedi**.
- `muted`, `playsinline`, `loop`, `preload="none"`; `poster` ve `autoplay` özniteliği yok. İlk kare gelene kadar yalnızca koyu zemin görünür; önce bir fotoğraf görünüp sonra videoya dönüşen bir katman yoktur.
- Oynatma IntersectionObserver ile yönetilir: **aynı anda en fazla bir video** oynar. Masaüstünde hizmet dizininde seçili olmayan paneldeki video oynamaz. Sekme gizlenince hepsi durur.
- `prefers-reduced-motion` veya Veri Tasarrufu açıksa videolar kendiliğinden başlamaz; ilk kare gösterilir, oynat düğmesiyle elle başlatılır.
- Her videonun SVG ikonlu oynat/duraklat düğmesi vardır. Video yüklenemezse düğme devre dışı kalır ve "Video şu anda yüklenemedi." yazısı görünür; yerine görsel konmaz.
- **Medya notları** (ayrıntı `ASSET_MANIFEST.md`): V1 videosunun bazı karelerinde Nike logosu, V3'te "Quarn" adlı bir konsept ürün adı görünür; görsel 1 ve 2'deki App Store / Google Play rozetleri kırpılarak kadraj dışında bırakıldı.

## Kullandığı onaylı kaynaklar (commit `d24fa373d6d76c0218b3f3b77897a8c2ace04e5e`, değiştirilmedi)
- Header `wix-home-v648/modules/n1-header-v648.js` + menü verisi `wix-home-v648/site/n1-site-markup-v648.js`
- Footer `wix-full-v1/modules/n1-footer-v646.js` + `n1-footer-v636.css`
- WhatsApp / Yukarı Çık `wix-full-v1/modules/n1-floating-controls-v632.js`, bağlantılar `n1-links-v646.js`
- İç sayfa duyarlı CSS `wix-studyo-v1/site/n1-inner-responsive-v6.css`

Menü: Kısaca Biz `/kisaca-biz`, Hizmetler `/#hizmetler-ozet`, Markalar `/markalar`, Akademi `/reklam-ajansi`, İnsan Kaynakları alt menüsü (`/ekibimize-katil`, `/acik-pozisyonlar`). Logo `/` adresine gider; Teklif Al `/teklif-al`. Final CTA: PROJENİZİ KONUŞALIM `/iletisim`, TEKLİF AL `/teklif-al`.

## Mimari
- **Bölümler:** Hero (FİKİRDEN ÜRÜNE. / ÇALIŞAN DENEYİMLER.) → ÖNCE İNSANI ANLARIZ. → BİR UYGULAMA. BİRDEN FAZLA DENEYİM. (Interactive App Lab) → FARKLI EKRANLAR. TEK BİR DÜŞÜNCE. (5 hizmet) → FİKİR KODLA BULUŞTUĞUNDA. (7 aşama) → HAREKET DENEYİMİN BİR PARÇASIDIR. → HER EKRANDA DOĞRU DENEYİM. → GÜZEL GÖRÜNMEK YETMEZ. DOĞRU ÇALIŞMALI. → BİR FİKRİN VAR MI?
- **Bağımlılıklar:** GSAP 3.13.0 + ScrollTrigger (cdnjs), yalnızca sayfada yoksa ve bir kez yüklenir. Fontlar Barlow / Barlow Condensed. Başka kütüphane yok. Sunucu, API veya veri tabanı yok.
- **Interactive App Lab** temsili bir üründür ("Atölye"): Mobile App, Web App ve Dashboard aynı örnek veriyi paylaşır, bütün kontroller gerçekten çalışır. Veri yalnızca sayfa açıkken bellekte tutulur. Kullanıcıdan gelen metin (arama) ve veriler DOM'a yalnızca `textContent` ile yazılır. Ayrıntı `INTERACTION_SPEC.md`.
- **Animasyon:** Tamamı `gsap.context` + `gsap.matchMedia` içinde; pin, spacer, kaydırma kilidi yok. Süreç tahtası GSAP'a bağlı değildir (pasif kaydırma dinleyicisi). `prefers-reduced-motion` açıkken içerik son hâliyle görünür, demolar animasyonsuz çalışır, hareket demosu "kapalı" başlar. Gizlenen öğeler `visibility` ile değil `opacity` ile gizlenir; klavyeyle gelen kullanıcı bir bağlantıyı atlamaz.
- **Erişilebilirlik:** Tek `h1`; App Lab görünümleri `tablist` (ok tuşları, Home/End); demo kontrolleri doğal `button`, `input`, `label`, `select`; anahtarlar `role=switch`; durum değişiklikleri `aria-live` ile duyurulur. Etkileşimli hedefler en az 44×44 px. İkonlar inline SVG ve `aria-hidden`; Unicode ok veya emoji yok.
- **Temizlik:** Bileşen kaldırılınca ScrollTrigger'lar, zaman çizelgeleri, Intersection/Resize gözlemcileri, kaydırma ve medya sorgusu dinleyicileri, zamanlayıcılar temizlenir; videolar durdurulup kaynakları bırakılır; eklenen stil ve Header/Footer katmanları kaldırılır (3 kez kaldır-ekle testinde sızıntı yok).
- **GSAP yüklenemezse:** Bütün içerik görünür; App Lab, hizmet dizini, süreç tahtası, mikro etkileşimler ve videolar çalışır (test edildi).

## Önizleme
`preview.html` bir HTTP sunucusu üzerinden açılmalı (ör. bu klasörde `python3 -m http.server`). Header/Footer, fontlar, GSAP, görseller ve videolar internetten yüklenir.

## Paketteki diğer dosyalar
- `QA_REPORT.md` — yapılan testler, sonuçları ve yapılamayanlar
- `DESIGN_RATIONALE.md` — konsept, sanat yönetimi, renk, tipografi, kompozisyon, GSAP tercihleri ve son yaratıcı değerlendirme
- `INTERACTION_SPEC.md` — App Lab ekranları, durumlar, düğmeler, geçişler, erişilebilirlik; diğer etkileşimler
- `ASSET_MANIFEST.md` — 6 görsel ve 4 videonun adresleri, içerikleri, bölüm eşleştirmeleri, kırpmalar
- `screenshots/` — gerçek tarayıcıda, gerçek medya ile alınmış 28 ekran görüntüsü (1440, 820, 390 px)