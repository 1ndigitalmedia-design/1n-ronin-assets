# 1N Digital Media — Kreatif Prodüksiyon V2 / Cinematic Editorial Experience

Wix Studio Custom Element · Sayfa: `/kreatif-produksiyon`

| | |
|---|---|
| Dosya | `n1-kreatif-produksiyon-v2.js` (tek giriş dosyası, ~90 KB, sıkıştırılmamış) |
| Tag name | `n1-kreatif-produksiyon-v2` |
| Önceki sürümler | Değiştirilmedi (bu yeni, bağımsız bir dosya) |
| Ana video | `https://video.wixstatic.com/video/6dbf5e_2821f1bb754740f9bc6deb51f052cf8c/1080p/mp4/file.mp4` |

## Klasör

```
1N_Kreatif_Produksiyon_V2_Cinematic/
├── n1-kreatif-produksiyon-v2.js   Wix Studio Custom Element kaynağı
├── preview.html                   Bağımsız önizleme (internet ister, bir sunucu üzerinden açın)
├── README.md / QA_REPORT.md / DESIGN_RATIONALE.md
├── screenshots/                   Sandbox Chrome görüntüleri (6 genişlik)
│   └── gercek-tarayici/           Gerçek ağ + gerçek video ile alınan görüntüler
└── video-analizi/                 Videonun incelenen kareleri (kaynak videodan, değiştirilmeden)
```

## Wix Studio kurulumu (Test Site'ta)

1. Dosyayı GitHub'a yükleyin, örneğin `wix-kreatif-produksiyon-v2/n1-kreatif-produksiyon-v2.js`. Bu teslimde GitHub'a hiçbir şey yüklenmedi.
2. Commit'e sabitlenmiş jsDelivr adresini kullanın:
   `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@<COMMIT>/wix-kreatif-produksiyon-v2/n1-kreatif-produksiyon-v2.js`
3. `/kreatif-produksiyon` sayfasına bir **Custom Element** ekleyin:
   - **Server URL:** 2. adımdaki adres
   - **Tag name:** `n1-kreatif-produksiyon-v2`
4. Yerleşim (Kısaca Biz V3 ile aynı):
   - Element genişliği %100, X = 0, kenar boşlukları 0.
   - İçinde bulunduğu Bölüm'ün yüksekliği **Otomatik**. Sabit yükseklik vermeyin, "Orantılı ölçek" kullanmayın.
   - Sayfadaki Wix Header/Footer gizli kalmalı. Header, Footer, WhatsApp ve Yukarı Çık bu element içinden gelir.
5. Önizleyin, sonra Test Site'ta yayınlayıp masaüstü, tablet ve mobilde kontrol edin.

## Mimari

- **Light DOM, Kısaca Biz V3 ile aynı entegrasyon.** Onaylı v6.48 kaynakları commit'e sabit adreslerden aynen yüklenir:
  - `d24fa373…/wix-home-v648/site/n1-site-markup-v648.js` — işaretleme
  - `d24fa373…/wix-home-v648/modules/n1-header-v648.js` — Header + menü
  - `d24fa373…/wix-full-v1/modules/n1-footer-v646.js` ve `n1-footer-v636.css`
  - `n1-links-v646.js`, `n1-floating-controls-v632.js` (WhatsApp / Yukarı Çık)
  - `09612df9…/wix-studyo-v1/site/n1-inner-responsive-v6.css` (iç sayfa tablet/mobil düzeni)
- **Menü:** Onaylı veri kullanılır. Kısaca Biz `/kisaca-biz`, Hizmetler `/#hizmetler-ozet`, Markalar `/markalar`, Akademi `/reklam-ajansi`, İnsan Kaynakları alt menüsü (`/ekibimize-katil`, `/acik-pozisyonlar`). Logo ve marka `/` adresine gider.
- **Tekillik:** Sayfada başka bir `n1-header` veya `n1-floating-controls` varsa yenisi eklenmez. Böylece çift Header, çift Footer ya da çift WhatsApp oluşmaz.
- **CSS kapsamı:** Bütün CSS `n1-kreatif-produksiyon-v2` etiketiyle kapsamlıdır. `body`'ye taşınan menü panelinde yalnızca bu sayfanın paneli (`[data-n1-kp]`) etkilenir. Stil etiketi `#n1-kp2-style`, son kopya kaldırılınca silinir.
- **GSAP:** 3.13.0 ve ScrollTrigger yalnızca `window.gsap` yoksa cdnjs'ten yüklenir. SplitText ve Lenis yok.
  - Bütün animasyonlar `gsap.context()` ve `gsap.matchMedia()` içinde.
  - Pin, spacer ve gsap.ticker kullanılmıyor.
  - Hero kadrajı CSS `transform` ile scrub edilir; sayfa yüksekliği içerikten gelir.

### Video bileşeni

| Konu | Uygulama |
|---|---|
| Kaynak | 1080p URL kodda açıkça yazılı (`VIDEO_URL`). Wix aynı videoyu 720p (8,1 MB) ve 480p (3,9 MB) olarak da sunar. |
| Kalite seçimi | Masaüstünde 1080p, tablette (≤1024) 720p, mobilde (≤767) veya `saveData` / 2G bağlantıda 480p. |
| Otomatik oynatma | `muted` + `playsinline`, `autoplay` niteliği yok. JS ile, kadraj en az %35 görünürken başlar. Ses yalnızca kullanıcı açarsa. |
| Tek oynatıcı kuralı | Hero ve monitör ayrı `<video>` öğeleridir ama biri oynarken diğeri duraklatılır. Ekran dışındaki video ve gizli sekmedeki videolar durur. |
| Gecikmeli yükleme | Hero, görünür olunca indirilir. Monitör videosu bölüme 400 px yaklaşınca indirilir (`preload="none"`). |
| Poster | Wix'in bu video için ürettiği gerçek kare `f002` (karlı dağ sırtı), Wix görsel servisiyle 768/1280/1920 px. |
| Yükleme hatası | Video yüklenmezse poster kalır, kontroller devre dışı olur ve kısa bir durum mesajı görünür. Poster de yüklenmezse tasarlanmış "1N" slate görünür; sayfa siyah kalmaz. |
| Hareket azaltma | Otomatik oynatma yok. Yalnızca meta veri iner; video kullanıcı oynatınca başlar. |
| Kontroller | SVG oynat/duraklat ve ses aç/kapat düğmeleri (`aria-pressed`, değişen `aria-label`), zaman kodu. |
| Bölümler ve zaman çizgisi | Videonun incelenmiş 9 bölümü. Ritim çizgisi `role="slider"`; ok tuşları, PageUp/Down ve Home/End ile kullanılır, sürükleyerek de sarılır. |
| Kaldırılınca | Videolar durdurulur, `src` kaldırılır ve `load()` ile kaynak bırakılır. Observer'lar ve dinleyiciler temizlenir. |

### Bölümler

| # | Bölüm | Kimlik |
|---|---|---|
| 01 | Açılış karesi (Hero + video) | `.kp-hero` |
| 02 | Her güçlü kare bir fikirle başlar | `#kp-fikir` |
| 03 | Bir fikrin yolculuğu (storyboard) | `#kp-surec` |
| 04 | Hareket bir anlatım dilidir (monitör) | `#kp-hareket` |
| 05 | Her formatta aynı yaratıcı bakış | `#kp-formatlar` |
| 06 | Sadece görüntü üretmiyoruz. Hikâye inşa ediyoruz. | `.kp-phil` |
| 07 | Final CTA | `.kp-fin` |

CTA bağlantıları: Projenizi Konuşalım `/iletisim`, Teklif Al `/teklif-al`.

## Önizleme

`preview.html` Wix'teki kullanımın aynısıdır: tek etiket, tek script. Dosyayı çift tıklayarak değil, bir sunucu üzerinden açın:

```
python3 -m http.server 8000
# http://localhost:8000/preview.html
```

`deps-base="<klasör>/"` özniteliği yalnızca Wix dışı önizleme içindir: jsDelivr dosyalarını yerel bir klasörden okur. Wix'te kullanmayın.

## Kısıtlar

- Header/Footer modüllerine, ana sayfaya, Ronin'e, Kısaca Biz V3'e ve diğer sayfalara dokunulmadı.
- Vurgu rengi yalnızca `#A8CF62`; yeni CSS'te `#A1FF00` / `#A2FF00` yok. Header logosundaki yeşil, onaylı Header modülünün kendi rengidir.
- Bütün yön ve kontrol ikonları satır içi SVG: aynı `viewBox="0 0 16 16"`, 1,5 çizgi, `aria-hidden`. Unicode ok veya emoji yok.
- Debug paneli ya da üretimde görünen test öğesi yok.
