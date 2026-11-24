# 1N Digital Media — Kısaca Biz V3 / Immersive Creative Experience

Wix Studio Custom Element · Sayfa: `/kisaca-biz`

| | |
|---|---|
| Dosya | `n1-kisaca-biz-v3.js` (tek giriş dosyası, ~97 KB, sıkıştırılmamış) |
| Tag name | `n1-kisaca-biz-v3` |
| Önceki sürüm | `n1-kisaca-biz-v2.js` — **değiştirilmedi** (commit `cd64fac`, SHA-1 `2fec684c…` aynen) |
| Bağımlılıklar | V2 ile aynı, commit'e sabit onaylı kaynaklar + GSAP 3.13.0 / ScrollTrigger (yalnızca sayfada yoksa) |

## Klasör

```
1N_Kisaca_Biz_V3_Creative_Experience/
├── n1-kisaca-biz-v3.js     Wix Studio Custom Element kaynağı
├── preview.html            Bağımsız önizleme (internet bağlantısı ister)
├── README.md               Bu dosya
├── QA_REPORT.md            Test sonuçları; test edilen / edilemeyen ayrımı
├── DESIGN_RATIONALE.md     Yaratıcı fikir, metaforlar, etkileşim kararları
└── screenshots/            Gerçek tarayıcı (Chrome, Playwright) ekran görüntüleri
```

## Wix Studio kurulumu (Test Site'ta)

1. GitHub'a yükleyin, örneğin `wix-kisaca-biz-v3/n1-kisaca-biz-v3.js` (bu teslimde GitHub'a yükleme yapılmadı).
2. jsDelivr adresini commit'e sabitleyin:
   `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@<COMMIT>/wix-kisaca-biz-v3/n1-kisaca-biz-v3.js`
3. Test Site'ta `/kisaca-biz` sayfasında mevcut V2 Custom Element'ini seçin (V2 sayfada kalabilir; V3'ü yeni bir element olarak eklemek de mümkün, ama **aynı sayfada ikisi birden görünür durumda olmamalı**):
   - **Server URL:** 2. adımdaki adres
   - **Tag name:** `n1-kisaca-biz-v3`
4. Element ayarları (V2 ile aynı):
   - Genişlik %100, X = 0, kenar boşlukları 0; içinde bulunduğu Bölüm'ün yüksekliği **Otomatik**.
   - Yükseklik içerikten gelir; sabit yükseklik vermeyin, "Orantılı ölçek" kullanmayın.
   - Sayfadaki Wix Header/Footer gizli kalmalı (Header, Footer ve WhatsApp / Yukarı Çık bu element içinden gelir).
5. Önizle → masaüstü, tablet, mobil kontrol → yayınla.

> Not: Wix Editor önizlemesi, Custom Element'i canlı sitedeki kadar doğru göstermeyebilir. Son kontrolü yayınlanmış Test Site'ta yapın.

## Mimari

- **Light DOM.** Onaylı Header/Footer modülleri light DOM'da çalıştığı için Shadow DOM kullanılmadı. Sayfaya özel bütün CSS `n1-kisaca-biz-v3` etiketiyle kapsamlıdır. Tek istisna Header'ın `body`'ye taşıdığı menü paneli: kurallar yalnızca `.n1h-panel[data-n1-kb]` (bu sayfanın paneli) için geçerli. Bu kural V2'den aynen alındı.
- **Korunanlar (V2'den aynen):**
  - Hero ve "Biz kimiz?": işaretleme, CSS, giriş zaman çizelgesi, imleç paralaksı.
  - Header + menü JSON düzenlemesi (logo/marka `/`, Hizmetler `/#hizmetler-ozet`).
  - Footer: tablet/mobil partner görseli ve güncel © yılı.
  - WhatsApp / Yukarı Çık; tablet/mobil Header-Footer düzeni.
- **Onaylı kaynaklar (commit'e sabit, V2 ile aynı):**
  - `d24fa373…/wix-home-v648/site/n1-site-markup-v648.js`
  - `d24fa373…/wix-home-v648/modules/n1-header-v648.js`
  - `d24fa373…/wix-full-v1/modules/n1-footer-v646.js`, `n1-footer-v636.css`, `n1-links-v646.js`, `n1-floating-controls-v632.js`
  - `09612df9…/wix-studyo-v1/site/n1-inner-responsive-v6.css`
- **Yükleme sırası:**
  1. CSS ve işaretleme hemen eklenir; ağ beklenmez.
  2. Footer CSS, iç sayfa CSS'i ve site işaretlemesi paralel yüklenir.
  3. Header / Footer / WhatsApp yerleştirilir.
  4. GSAP ve ScrollTrigger yalnızca `window.gsap` yoksa yüklenir.
  5. Ardından links, header, footer, floating modülleri yüklenir ve `_animate()` çalışır.
- **Tekillik:** Sayfada başka bir `n1-header` veya `n1-floating-controls` varsa yenisi eklenmez. Bu sayede çift Header, çift Footer ya da çift WhatsApp oluşmaz.

### Bölümler

| # | Bölüm | Kimlik | Not |
|---|---|---|---|
| 1 | Hero | `.kb-hero` | V2'den aynen |
| 2 | Biz kimiz? | `#kb-biz` | V2'den aynen |
| 3 | Ekip / Creative Engine | `#kb-ekip` | yeni |
| 4 | Bizim Standardımız | `#kb-standart` | yeni |
| 5 | Farklı disiplinler. Tek yaratıcı akıl. | `#kb-uzmanlik` | yeni |
| 6 | Manifesto | `.kv-man` | yeni |
| 7 | Final — Fikrin sınırı yok. | `.kv-fin` | yeni |

Yeni bölümlerin sınıfları `kv-` önekini taşır. Bölüm etiketlerinde numara kullanılmadı; korunan "Biz kimiz?" etiketi de numarasız. Tek numaralı dizi ilkelerdir (01–05).

### V2'den kaldırılanlar

- **Markalar bölümü tamamen kaldırıldı:**
  - `section.kb2-brands#kb-brands` HTML'i (8 marka satırı ve "Tüm markalar" bağlantısı dahil)
  - `.kb2-brands`, `.kb2-brand*`, `.kb2-sub-link` CSS'i ve tablet/mobil kuralları
  - `.kb2-brand` GSAP girişi
  - Kaynakta `kb2` / `kb-brands` / `brand-` dizgisi kalmadı (`grep` = 0).
- V2'nin diğer bütün `kb2-*` blokları: Team kartları ve kaydırma okları, `<details>` akordeon standartları, Expertise kartları, Impact. Ayrıca bunların CSS'i, `_creativeControls()` dinleyicileri ve GSAP girişleri.
- V1'den kalıp V2'de kullanılmayan ölü kod: çark (`.kb-wheel*`, `.kb-disc*`, `.kb-chord`, `.kb-node`), ilkeler (`.kb-pr*`, `.kb-glyph`), kültür (`.kb-field`, `.kb-dot`, `.kb-val*`), impact (`.kb-impact*`), `DISCIPLINES`, `wheelSvg()`, `glyph()`, `dotField()`, `_wheel()`.
- V2'nin "Birlikte üretelim" CTA bölümü kaldırıldı; yerini Final aldı (aynı `/iletisim` ve `/teklif-al` CTA'ları).
- **Korunan:** Header menüsündeki **Markalar → `/markalar`** bağlantısı. Menü verisi onaylı işaretlemeden olduğu gibi gelir.

### Bağlantılar

- **CTA:** Projenizi Konuşalım → `/iletisim`, Teklif Al → `/teklif-al`
- **Hizmetler:** Ana sayfadaki hizmet bağlantılarıyla aynı:
  - `/kreatif-produksiyon`
  - `/e-ticaret-yonetimi`
  - `/sosyal-medya`
  - `/reklam-yonetimi`
  - `/ui-ux-tasarim`
  - `/yapay-zeka`
  - `/uygulama-gelistirme`

## Hareket ve yaşam döngüsü

- **GSAP yapısı:**
  - Bütün animasyonlar tek bir `gsap.context()` içinde ve `gsap.matchMedia()` koşullarına bağlı.
  - Koşullar: `prefers-reduced-motion`, `min-width:1025px`, `hover:hover`, `max-width:767px`.
- **Pin ve spacer:** Pin yok, ScrollTrigger spacer yok. Ekip sahnesi CSS `position: sticky` ile listenin yanında durur ve ek yükseklik üretmez.
- **Creative Engine ticker'ı:**
  - Yalnızca sahne görünürken ve sekme açıkken çalışır (IntersectionObserver + `visibilitychange`).
  - Sahne ekrandan çıkınca `gsap.ticker` dinleyicisi kaldırılır.
- **Bağlantı kesilince (`disconnectedCallback`):**
  - `ctx.revert()` çalışır; bu tweenleri, ScrollTrigger'ları, matchMedia temizliklerini, ticker'ı ve IntersectionObserver'ı kapsar.
  - Bu kopyaya ait kalan ScrollTrigger'lar sonlandırılır; bunlara paylaşılan Footer modülününkiler de dahil.
  - Bu kopyanın öğelerini hedefleyen kök zaman çizelgeleri sonlandırılır. Footer modülünün kendi `matchMedia` timeline'ı, modül değiştirilmeden bu yolla temizlenir.
  - ResizeObserver ve olay dinleyicileri kaldırılır, `body` sınıfı geri alınır, stil etiketi son kopyayla birlikte kaldırılır.
- **Yenileme:**
  - Fontlar ve sayfa yüklemesi bitince bir kez `ScrollTrigger.refresh()` yapılır.
  - Sonra yalnızca element yüksekliği 2 px'ten fazla değişirse yenilenir (250 ms gecikmeli).
  - `orientationchange` olayında da yenilenir.
- **Hareket azaltma (`prefers-reduced-motion: reduce`):**
  - Giriş animasyonları, scrub'lar ve ticker çalışmaz.
  - Disiplin, ilke ve hizmet seçimi anında değişir.
  - CSS geçişleri de kısalır.
- **GSAP yüklenemezse:**
  - Bütün içerik görünür kalır; CSS'te hiçbir içerik gizlenmez.
  - Disiplin seçimi, ilke etkinleştirme ve Uzmanlık şeridi GSAP olmadan da çalışır (DOM + CSS).

## Önizleme

`preview.html` Wix'teki kullanımın aynısıdır: tek etiket ve tek script. Header, Footer, fontlar ve GSAP jsDelivr / cdnjs / Google Fonts'tan yüklendiği için internet bağlantısı ister. Dosyayı yerelde açmak yerine basit bir sunucu kullanın:

```
python3 -m http.server 8000
# http://localhost:8000/preview.html
```

`deps-base="<klasör>/"` özniteliği yalnızca Wix dışı önizleme içindir: jsDelivr dosyalarını aynı yol yapısıyla yerel klasörden okur. Wix'te kullanmayın.

## Kısıtlar

- Header/Footer modüllerinin kaynağına, ana sayfaya (v6.47/v6.48), Ronin'e ve diğer sayfalara dokunulmadı.
- Lenis veya ikinci bir GSAP kopyası yok. SplitText kullanılmadı; harf/kelime bölme el ile yapıldı ve ekran okuyucular için başlıkların tam metni gizli `kv-sr` etiketinde duruyor.
- Bütün yön ikonları satır içi SVG: aynı `viewBox="0 0 16 16"`, 1.5 çizgi, `aria-hidden`. Unicode ok veya emoji yok.
- Vurgu rengi yalnızca `#A8CF62`. `#A1FF00` / `#A2FF00` yeni CSS'te yok. Header logosundaki yeşil, onaylı Header modülünün kendi rengidir; dokunulmadı.