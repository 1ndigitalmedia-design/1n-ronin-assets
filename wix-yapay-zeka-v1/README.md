> **25 Kasım 2026 — Güncel dağıtım durumu:** Orijinal `n1-yapay-zeka-v1.js` dosyası, preview, tasarım/medya/etkileşim/QA belgeleri GitHub `main` dalındaki `wix-yapay-zeka-v1/` klasörüne yüklendi. Kaynak commit: `e6a88e04fad47aa8c3891e4e41a6a207eb89ac7d`. Wix Studio Custom Element URL/Tag Name alanları bu oturumda değiştirilemedi; **AI V1 canlı yayında doğrulanmadı**. Yayın adımları için `RELEASE.md` dosyasını esas alın.

# 1N AI / Yapay Zekâ — V1 "Beyond the Prompt / Fikrin Ötesindeki Zekâ"

| | |
|---|---|
| Sayfa | `/yapay-zeka` (menü adı: AI) |
| Dosya | `n1-yapay-zeka-v1.js` (~102 KB, tek dosya, bağımlılıklarını kendisi yükler) |
| Custom Element etiketi | `n1-yapay-zeka-v1` (`customElements.define` ile kendini kaydeder) |
| Stil kimliği | `n1-ai1-style` (yalnızca bu etiket kapsamında, sınıf öneki `ai-`) |
| Sürüm | Bağımsız V1. GitHub'daki diğer hizmet sayfalarına, onaylı Header/Footer dosyalarına ve ana sayfa kaynaklarına dokunulmadı. |
| Medya | Brief'te verilen 3 video ve 5 görsel. Stok veya üretilmiş medya eklenmedi. |

## Wix Studio'ya ekleme
1. Dosyayı GitHub'da **yeni bir klasöre** yükleyin (öneri: `wix-yapay-zeka-v1/n1-yapay-zeka-v1.js`). Mevcut hiçbir dosyanın üzerine yazılmaz. (Bu paket hazırlanırken GitHub'a hiçbir şey gönderilmedi, Wix'te hiçbir şey değiştirilmedi.)
2. Commit'e sabitlenmiş jsDelivr adresini alın:
   `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@<commit>/wix-yapay-zeka-v1/n1-yapay-zeka-v1.js`
3. `/yapay-zeka` sayfasına bir Custom Element ekleyin: **Server URL** = bu adres, **Tag name** = `n1-yapay-zeka-v1`. İsterseniz önce ayrı bir test sayfasında deneyin.
4. Sayfada ayrıca Wix Header/Footer bölümü olmamalı. Bileşen onaylı Header/Footer'ı ve WhatsApp/Yukarı Çık düğmelerini kendisi ekler; sayfada zaten bir `n1-header`, `footer.n1ft` veya kontrol katmanı varsa ikincisini oluşturmaz.
5. Menüde "AI" bağlantısının `/yapay-zeka` adresine gittiğini kontrol edin (menü verisi onaylı Header dosyasından gelir; bu paket menüyü değiştirmez).
6. Önce Test Site'ta yayınlayıp masaüstü, tablet ve telefonda kontrol edin.

## Önemli: Custom Element dış kutusunun yüksekliği
Bileşen light DOM'da çalışır; sabit yükseklik, pin veya spacer kullanmaz; içerik doğal akışında büyür. Creative Lab'de yorum değiştirmek, karar kaydı ve görseller yüklenince yükseklik çalışırken değişebilir. Ancak **Wix Studio, Custom Element'i kendi oluşturduğu bir dış kutuya yerleştirir ve bu kutunun yüksekliği editördeki ayara bağlıdır.** Bileşenin JavaScript'i bu dış kutunun yüksekliğini her durumda değiştiremeyebilir. Bu nedenle:

- Öğeye ve bulunduğu bölüme **sabit piksel yükseklik vermeyin**; yükseklik "otomatik / içeriğe göre" olsun.
- Öğenin duyarlı davranışı "orantılı ölçek" olmasın; genişlik %100, kenar boşlukları 0.
- Yayınlanan sitede kontrol edin: Footer tam görünüyor mu, altında boşluk var mı, Lab'de yorum değişince içerik kesiliyor mu, masaüstü/tablet/telefon geçişinde yükseklik doğru mu?
- Wix bu kurulumda dış kutuyu otomatik büyütmezse kalıcı çözüm, sayfayı HTML Embed (iFrame) içine alıp yüksekliği `postMessage` ile ana sayfaya bildirmektir (Wix Özel Kod gerektirir). Bu yöntem bu pakette uygulanmadı; gerekirse ayrıca hazırlanır.

Yerel testlerde Footer altı boşluk 10 genişliğin tamamında 0 px ölçüldü, ancak bu ölçüm Wix dış kutusu olmadan yapıldı. **Gerçek Wix Studio testi yapılmadı ve şarttır.**

## Videolar
- Yalnızca verilen adresler ve çözünürlükler kullanılır (Hero 720p, diğer ikisi 1080p). 480p/720p/1080p varyant adresi **üretilmedi**; bu nedenle telefonda da aynı dosyalar iner. Daha hafif mobil sürüm istenirse, o çözünürlüğün Wix'te gerçekten var olduğu doğrulandıktan sonra eklenebilir.
- `muted`, `playsinline`, `loop`, `preload="none"`; `poster` ve `autoplay` özniteliği yok. Video ilk karesi gelene kadar yalnızca koyu zemin görünür; önce bir fotoğraf görünüp sonra videoya dönüşen bir katman yoktur.
- Oynatma IntersectionObserver ile yönetilir: **aynı anda en fazla bir video** oynar (ekranda en çok görünen). Sekme gizlenince hepsi durur.
- `prefers-reduced-motion` veya Veri Tasarrufu açıksa videolar kendiliğinden başlamaz; ilk kare gösterilir, oynat düğmesiyle elle başlatılır.
- Her videonun SVG ikonlu oynat/duraklat düğmesi vardır. Video yüklenemezse düğme devre dışı kalır ve "Video şu anda yüklenemedi." yazısı görünür; yerine görsel konmaz.

## Kullandığı onaylı kaynaklar (commit `d24fa373d6d76c0218b3f3b77897a8c2ace04e5e`, değiştirilmedi)
- Header `wix-home-v648/modules/n1-header-v648.js` + menü verisi `wix-home-v648/site/n1-site-markup-v648.js`
- Footer `wix-full-v1/modules/n1-footer-v646.js` + `n1-footer-v636.css`
- WhatsApp / Yukarı Çık `wix-full-v1/modules/n1-floating-controls-v632.js`, bağlantılar `n1-links-v646.js`
- İç sayfa duyarlı CSS `wix-studyo-v1/site/n1-inner-responsive-v6.css`

Menü: Kısaca Biz `/kisaca-biz`, Hizmetler `/#hizmetler-ozet`, Markalar `/markalar`, Akademi `/reklam-ajansi`, İnsan Kaynakları alt menüsü (`/ekibimize-katil`, `/acik-pozisyonlar`). Logo `/` adresine gider; Teklif Al davranışı korunur. Final CTA: PROJENİZİ KONUŞALIM `/iletisim`, TEKLİF AL `/teklif-al`.

## Mimari
- **Bölümler:** Hero (YAPAY ZEKÂ. / FİKRİN ÖTESİNDE.) → YARATICILIK İNSANLA BAŞLAR. → HAYAL ET. YÖNET. ÜRET. (5 alan) → YARATICILIĞI DENEYİMLE. (Creative Direction Mixer) → BİR FİKİR. SAYISIZ OLASILIK. (6 aşama) → HAREKET BİR ANLATIYA DÖNÜŞÜR. → ÜRETMEK YETMEZ. DOĞRU ÜRETMEK GEREKİR. (8 konu) → GELECEK TEKNOLOJİYLE DEĞİL. YARATICILIKLA ŞEKİLLENİR. → GELECEĞİ BİRLİKTE ÜRETELİM.
- **Bağımlılıklar:** GSAP 3.13.0 + ScrollTrigger (cdnjs), yalnızca sayfada yoksa ve bir kez yüklenir. Fontlar Barlow / Barlow Condensed. Başka kütüphane yok. Gerçek bir yapay zekâ API'si kullanılmaz.
- **Creative Lab** bir *Creative Direction Demo*dur: aynı iki mevcut görselin üç sanat yönetimi yorumunu gösterir; yeni görsel üretmez, sahte ilerleme çubuğu veya "üretiliyor" animasyonu yoktur. Ayrıntı `INTERACTION_SPEC.md`.
- **Animasyon:** Tamamı `gsap.context` + `gsap.matchMedia` içinde; pin, spacer, kaydırma kilidi, sürekli `requestAnimationFrame` döngüsü yok. Glitch yalnızca Gelecek bölümünde, kısa ve tek seferlik; telefonda kapalı (masaüstünde fareyle üzerine gelince en fazla 1,8 sn.de bir tekrar). `prefers-reduced-motion` açıkken her şey hemen son hâliyle görünür, glitch çalışmaz. Gizlenen öğeler `visibility` ile değil yalnızca `opacity` ile gizlenir; klavyeyle gelen kullanıcı henüz açılmamış bir bağlantıyı atlamaz.
- **Erişilebilirlik:** Tek `h1`; Lab yorumları doğal `input type=radio` + `label` (ok tuşları çalışır); değişiklik `aria-live` ile duyurulur; video düğmeleri `aria-label` taşır ve durumla güncellenir; bölüm (chapter) düğmeleri gerçek `button`. Etkileşimli hedefler en az 44×44 CSS piksel. İkonlar inline SVG ve `aria-hidden`; Unicode ok veya emoji yok.
- **Temizlik:** Bileşen kaldırılınca ScrollTrigger'lar, zaman çizelgeleri, Intersection/ResizeObserver'lar, video dinleyicileri ve zamanlayıcılar temizlenir, videolar durdurulup kaynakları bırakılır; eklenen stil ve Header/Footer katmanları kaldırılır (3 kez kaldır-ekle testinde sızıntı yok).
- **GSAP yüklenemezse:** Bütün içerik görünür, Lab ve videolar çalışır (test edildi).

## Önizleme
`preview.html` bir HTTP sunucusu üzerinden açılmalı (ör. bu klasörde `python3 -m http.server`). Header/Footer, fontlar, GSAP, görseller ve videolar internetten yüklenir.

## Paketteki diğer dosyalar
- `QA_REPORT.md` — yapılan testler, sonuçları ve yapılamayanlar
- `DESIGN_RATIONALE.md` — yaratıcı fikir, bölüm tasarımları, medya kararları ve son yaratıcı değerlendirme
- `INTERACTION_SPEC.md` — Creative Lab, video ve bölüm (chapter) davranışları, klavye/dokunma, glitch kuralları
- `ASSET_MANIFEST.md` — video ve görsel adresleri, içerikleri, kullanıldığı bölümler, yükleme davranışı
- `screenshots/` — gerçek tarayıcıda, gerçek medya ile alınmış 20 ekran görüntüsü (1440, 820, 390 px)
