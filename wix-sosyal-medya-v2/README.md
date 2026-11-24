# 1N Sosyal Medya — V2 "Beyond the Feed / Akışın Ötesinde"

| | |
|---|---|
| Sayfa | `/sosyal-medya` |
| Dosya | `n1-sosyal-medya-v2.js` (~83 KB, tek dosya, bağımlılıklarını kendisi yükler) |
| Custom Element etiketi | `n1-sosyal-medya-v2` |
| Stil kimliği | `n1-sm2-style` (yalnızca bu etiket kapsamında, sınıf öneki `sm-`) |
| Sürüm | Bağımsız V2. GitHub'daki Sosyal Medya V1 dosyasına dokunulmadı, onun yerine geçmez; yeni bir dosya olarak eklenir. |

## Wix Studio'ya ekleme
1. Dosyayı GitHub'da **yeni bir klasöre** yükleyin (öneri: `wix-sosyal-medya-v2/n1-sosyal-medya-v2.js`). Mevcut hiçbir dosyanın üzerine yazılmaz. V1 olduğu yerde kalır.
2. Commit'e sabitlenmiş jsDelivr adresini alın:
   `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@<commit>/wix-sosyal-medya-v2/n1-sosyal-medya-v2.js`
3. `/sosyal-medya` sayfasına bir Custom Element ekleyin: **Server URL** = bu adres, **Tag name** = `n1-sosyal-medya-v2`. (V1 aynı sayfadaysa, V2'yi test ederken V1 öğesini sayfadan kaldırın veya V2'yi önce ayrı bir test sayfasında deneyin.)
4. Bölüm ve öğe yüksekliğini **otomatik / içeriğe göre** bırakın; sabit piksel yükseklik vermeyin. Sayfada ayrıca Wix Header/Footer bölümü olmamalı.
5. Önce Test Site'ta yayınlayıp masaüstü, tablet ve telefonda kontrol edin.

## Önemli: Custom Element dış kutusunun yüksekliği
Bileşen light DOM'da çalışır ve içeriği doğal akışında büyür. Ancak **Wix Studio, Custom Element'i kendi oluşturduğu bir dış kutu (wrapper) içine yerleştirir ve bu kutunun yüksekliğini editördeki ayara göre belirler.** Bileşenin JavaScript'i bu dış kutunun yüksekliğini her durumda değiştiremeyebilir:

- Editörde öğeye sabit bir yükseklik verilmişse, içerik bu kutudan taşabilir veya altta boşluk kalabilir.
- Yükseklik "otomatik / içeriğe sığdır" olarak ayarlanırsa normalde sorun çıkmaz; fakat bu, Wix'in kendi davranışına bağlıdır ve yerel önizlemede test edilemez.

Bu nedenle sayfanın **gerçek Wix ortamında (Test Site) mutlaka denenmesi gerekir**: sayfa sonunda Footer'dan sonra boşluk kalıp kalmadığı, Footer'ın tam görünüp görünmediği ve masaüstü/tablet/telefon geçişlerinde yüksekliğin doğru güncellenip güncellenmediği kontrol edilmelidir. Yerel testlerde (bkz. QA_REPORT.md) Footer altı boşluk 0 px ölçüldü, ancak bu ölçüm Wix dış kutusu olmadan yapıldı.

## Kullandığı onaylı kaynaklar (commit `d24fa373…`, değiştirilmedi)
- Header `wix-home-v648/modules/n1-header-v648.js` + menü verisi `wix-home-v648/site/n1-site-markup-v648.js`
- Footer `wix-full-v1/modules/n1-footer-v646.js` + `n1-footer-v636.css`
- WhatsApp / Yukarı Çık `wix-full-v1/modules/n1-floating-controls-v632.js`, bağlantılar `n1-links-v646.js`
- İç sayfa duyarlı CSS `wix-studyo-v1/site/n1-inner-responsive-v6.css` (diğer iç sayfalarla aynı)

Menü: Kısaca Biz `/kisaca-biz`, Hizmetler `/#hizmetler-ozet`, Markalar `/markalar`, Akademi `/reklam-ajansi`, İnsan Kaynakları alt menüsü (`/ekibimize-katil`, `/acik-pozisyonlar`). Logo `/` adresine gider. Sayfada zaten bir `n1-header`, `footer.n1ft` veya kontrol katmanı varsa bileşen ikincisini oluşturmaz.

## Mimari
- **Bölümler:** Hero → Hikâye → Her İçeriğin Bir Nedeni Var (5 aşamalı etkileşimli sekme) → İçerik Harekete Geçtiğinde (video) → Her Markanın Kendi Ritmi Var (7 kavram) → Rakamların Ötesinde → Biz Akışı Değil Bakışı Yönetiyoruz (manifesto) → Final CTA.
- **Bağımlılıklar:** GSAP 3.13.0 + ScrollTrigger (cdnjs), yalnızca sayfada yoksa ve yalnızca bir kez yüklenir. Fontlar Barlow / Barlow Condensed. Başka kütüphane yok.
- **Animasyon:** Tamamı `gsap.context` + `gsap.matchMedia` içinde. Pin ve spacer yok, ağır smooth-scroll yok. `prefers-reduced-motion` açıkken hareketler kapanır, içerik doğrudan görünür.
- **Video:** İki video; yalnızca görünür olan oynar (IntersectionObserver), aynı anda tek video. İkinci video yaklaşılana kadar yüklenmez. Telefonda veya veri tasarrufu açıkken 480p, diğerlerinde 720p. Otomatik oynatma özniteliği yok; `muted` + `playsinline`. Her videoda duraklat/oynat düğmesi var. Video yüklenemezse poster karesi ve kısa bir not görünür.
- **Erişilebilirlik:** Sekmeler `role=tablist/tab/tabpanel`, ok tuşları + Home/End, önceki/sonraki düğmeleri, dokunmatik kaydırma; hover'a bağımlı içerik yok. Bütün ikonlar inline SVG ve `aria-hidden`.
- **Temizlik:** Bileşen kaldırılınca ScrollTrigger'lar, zaman çizelgeleri, Intersection/ResizeObserver'lar, zamanlayıcılar ve dinleyiciler temizlenir; videolar durdurulur ve kaynakları bırakılır; eklenen stil ve header/footer katmanları kaldırılır.
- **GSAP yüklenemezse:** Bütün içerik görünür ve kullanılabilir kalır (test edildi).

## Önizleme
`preview.html` bir HTTP sunucusu üzerinden açılmalı (ör. bu klasörde `python3 -m http.server`). Header/Footer, fontlar, GSAP, video ve görseller internetten yüklenir; dosya `file://` ile açılırsa bazı kaynaklar yüklenmeyebilir.

## Paketteki diğer dosyalar
- `QA_REPORT.md` — yapılan testler ve yapılamayanlar
- `DESIGN_RATIONALE.md` — tasarım kararları
- `ASSET_MANIFEST.md` — kullanılan görsel/video adresleri, bölümleri, yükleme ve yedek davranışı
- `screenshots/` — gerçek tarayıcıda, gerçek görsel ve videolarla alınmış ekran görüntüleri (1440, 820, 390 px)
