# 1N Digital Media — Kısaca Biz (Wix Studio Custom Element) · V1

| | |
|---|---|
| Sayfa | `/kisaca-biz` |
| Tag name | `n1-kisaca-biz-v1` |
| Giriş dosyası | `n1-kisaca-biz-v1.js` (tek dosya; sayfaya özel bütün CSS ve JS bunun içinde) |
| Önizleme | `preview.html` (Wix dışında; internet bağlantısı gerekir) |

## 1. Dosyalar

```
1N_Kisaca_Biz_Wix_Studio_V1/
├── n1-kisaca-biz-v1.js   Custom Element (üretim dosyası)
├── preview.html          Bağımsız önizleme: aynı giriş dosyasını kullanır
├── README.md             Bu belge
├── QA_REPORT.md          Test sonuçları ve riskler
└── screenshots/          QA ekran görüntüleri (390 / 820 / 1440 px, tam sayfa)
```

## 2. GitHub ve Wix Studio kurulumu

1. **Yükleme:** Klasörü depoya, örneğin `wix-kisaca-biz-v1/` altına yükleyin.
   - `main` dalında mevcut dosyaların hiçbiri değişmez; yalnızca yeni klasör eklenir.
2. **Server URL'i hazırlayın:** commit'e sabitlenmiş jsDelivr adresini kullanın:
   ```
   https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@<COMMIT>/wix-kisaca-biz-v1/n1-kisaca-biz-v1.js
   ```
   Dal adı yerine commit kullanın; jsDelivr önbelleği dal adreslerinde eski sürümü gösterebilir.
3. **Wix Studio'da sayfa ve öğe:**
   - `/kisaca-biz` sayfasını açın.
   - Bir bölüm ekleyin ve içine **Custom Element** koyun.
   - **Server URL:** 2. adımdaki adres.
   - **Tag name:** `n1-kisaca-biz-v1`
   - Öznitelik gerekmez (`deps-base` yalnızca Wix dışı önizleme içindir; Wix'te eklemeyin).
4. **Boyutlandırma:**
   - Custom Element genişliği %100, kenar boşlukları 0.
   - Yükseklik **Auto** (içerikten gelir).
   - Bölümün yüksekliği de **Auto**.
   - Sabit piksel yükseklik vermeyin; orantılı ölçek kullanmayın.
5. **Sayfa düzeyi öğeler:**
   - Bu sayfada Wix'in kendi Header/Footer'ı veya başka bir WhatsApp öğesi kullanılmamalıdır; bileşen bunları kendisi getirir.
   - Sayfada zaten bir `n1-header` veya `n1-floating-controls` varsa bileşen ikincisini **oluşturmaz**.
6. **Yayınlama:** Önce Test Site'ta yayınlayıp `QA_REPORT.md` bölüm 6'daki listeyi kontrol edin.

## 3. Kullanılan onaylı kaynaklar (değiştirilmeden yüklenir)

Bütün adresler commit'e sabitlenmiştir.

| Kaynak | Adres (commit) |
|---|---|
| Menü + Footer + WhatsApp işaretlemesi | `wix-home-v648/site/n1-site-markup-v648.js` @ `d24fa37` |
| Header | `wix-home-v648/modules/n1-header-v648.js` @ `d24fa37` |
| Footer JS / CSS | `wix-full-v1/modules/n1-footer-v646.js`, `n1-footer-v636.css` @ `d24fa37` |
| Bağlantı haritası | `wix-full-v1/modules/n1-links-v646.js` @ `d24fa37` |
| WhatsApp + Yukarı Çık | `wix-full-v1/modules/n1-floating-controls-v632.js` @ `d24fa37` |
| Footer partner logoları | `wix-full-v1/aktarim-medya/img/partners/` @ `d24fa37` |
| Tablet/mobil iç sayfa düzeni | `wix-studyo-v1/site/n1-inner-responsive-v6.css` @ `09612df` (Stüdyo Hikâyesi'nde onaylandı) |
| Tablet/mobil partner görseli | Stüdyo Hikâyesi'nde kullanılan iki `static.wixstatic.com` görseli; yüklenemezse orijinal 5 logo gösterilir |
| GSAP 3.13.0 + ScrollTrigger | cdnjs; **yalnızca sayfada yoksa** yüklenir |
| Fontlar | Google Fonts: Barlow, Barlow Condensed |

## 4. Menü

Menü, onaylı v6.48 JSON verisinden okunur. Bu sayfaya özel yalnızca şu bağlantılar değiştirilir; Header kodu değişmez:

| Öğe | Bağlantı |
|---|---|
| Logo ve "1N Digital Media" marka satırı | `/` |
| Hizmetler | `/#hizmetler-ozet` (sayfa içi `#hizmetler-ozet` yerine) |
| Kısaca Biz | `/kisaca-biz` |
| Markalar | `/markalar` |
| Akademi | `/reklam-ajansi` |
| İnsan Kaynakları (alt menü) | `/ekibimize-katil`, `/acik-pozisyonlar` |
| Teklif Al | `/teklif-al` (onaylı işaretlemedeki değer) |

Yalnızca İnsan Kaynakları'nın alt menüsü vardır.

## 5. Mimari notları

- **DOM ve stil kapsamı:**
  - Light DOM kullanılır; paylaşılan Header/Footer modülleri light DOM'da çalışır.
  - Sayfaya özel CSS `n1-kisaca-biz-v1` etiketiyle kapsamlanmıştır; sıfırlamalar `:where()` ile sıfır özgüllüktedir.
  - Header paneli `body` seviyesindedir ve kurallar yalnızca bu sayfanın paneline (`data-n1-kb`) uygulanır.
- **Yükseklik:** İçerikten gelir. Sayfa geneli `100vh`, sabit yükseklik, pin veya scroll kilidi yoktur, bu yüzden ScrollTrigger boşluk (pin-spacer) yüksekliği oluşmaz.
- **GSAP:**
  - Bütün animasyonlar `gsap.context()` + `gsap.matchMedia()` içindedir.
  - Bileşen sayfadan kaldırılınca (Wix sayfa geçişi) context geri alınır. Bu sayfaya ait ScrollTrigger'lar, ResizeObserver, olay dinleyicileri, eklenen stil ve body sınıfı temizlenir.
  - Header paneli ve WhatsApp katmanı kendi modüllerinin `disconnectedCallback`'iyle kaldırılır.
- **Yeniden bağlanma:**
  - Custom Element modülleri (Header, WhatsApp) bir kez yüklenir.
  - Footer ve bağlantı haritası gibi IIFE modülleri, ana sayfa bileşenindeki gibi her bağlanışta yeniden çalıştırılır.
- **Yenileme:** `ScrollTrigger.refresh()` fontlar ve sayfa yüklemesi bitince bir kez çalışır. Sonra yalnızca bileşen yüksekliği 2 px'ten fazla değişirse, 250 ms gecikmeyle tekrar çalışır.
- **Erişilebilirlik ve hareket:**
  - `prefers-reduced-motion: reduce` açıkken hiçbir animasyon kurulmaz; içerik doğrudan görünür.
  - İçerik CSS ile hiç gizlenmez; GSAP yüklenemezse sayfa animasyonsuz ama eksiksiz görünür.
- **İkonlar:** Bütün yön ikonları satır içi SVG'dir. Kodda Unicode ok veya emoji yoktur.

## 6. Önizleme

- **Tarayıcıda:** `preview.html`'i bir yerel sunucuyla açın (ör. `npx serve` veya `python3 -m http.server`). Dosya `file://` ile de açılabilir, ancak bazı tarayıcılar yerel betikleri kısıtlar.
- **Çevrimdışı test:** `<n1-kisaca-biz-v1 deps-base="./yerel-kopya/">` ile jsDelivr yerine aynı yol yapısındaki yerel bir kopyadan yükleme yapılabilir. Klasör yapısı: `yerel-kopya/gh@<commit>/<yol>`. Wix'te kullanılmaz.

## 7. Bilinmesi gerekenler

- **Footer telif yılı:** Onaylı işaretlemede "© 2023" yazar. Bu sayfada yılı güncel yıla çevirir; Footer tasarımı ve diğer içerik değişmez.
- **Tablet/mobil menü örtüsü:** Menü açıkken panelin arkasına hafif bir koyu örtü eklenir (yalnızca bu sayfada, ≤1024 px).
  - Neden: kartlar arasındaki boşluklarda sayfa metni görünmesin.
  - Header çubuğu açık kalır; dışarı dokununca menü Header'ın kendi davranışıyla kapanır.
- **Disiplin sayfaları:** Disiplin çarkındaki 7 bağlantı (`/kreatif-produksiyon`, `/e-ticaret-yonetimi`, `/sosyal-medya`, `/reklam-yonetimi`, `/ui-ux-tasarim`, `/yapay-zeka`, `/uygulama-gelistirme`) proje rota listesinden alınmıştır. Bu sayfaların Wix'te var olduğu doğrulanmadı.