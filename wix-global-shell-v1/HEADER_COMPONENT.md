# HEADER_COMPONENT — `n1-global-header-v1`

Bağımsız kurumsal header. İletişim, Akademi ve 404 gibi kurumsal kodun bulunmadığı Wix sayfalarına yalnız **Server URL + Tag Name** ile eklenir. Velo, Popup, Lightbox, sayfa kodu ve iframe mesajlaşması kullanılmaz. Adres: SERVER_URLS.md §A.

## İçerik
| Konum | Öğe |
|---|---|
| Sol | 1N SVG logosu, kare, dolgu **#A2FF00** (testte `fill` okunarak doğrulandı; #42B300 kullanılmaz). Bağlantı `/`. |
| Orta | `DIGITAL ADVERTISING AGENCY.` (kurumsal header'la aynı yazı tipi ve boyut) |
| Sağ | `MENU` / `CLOSE` düğmesi |
| Yok | **Teklif Al** (bileşen `no-cta` ile çizer; kurumsal sayfaların header'ı değişmedi, onlarda Teklif Al duruyor) |

## Ölçüler
| Kırılma | Yükseklik | İçerik genişliği | Arka plan |
|---|---|---|---|
| > 1024 px | 88 px | %90 (kenarlarda %5), en büyük genişlik sınırı **yok** (1280 sınırı kaldırıldı) | #080A09, tam genişlik |
| 768–1024 px | 72 px | %90 | aynı |
| ≤ 767 px | 64 px | %90 | aynı |

Yükseklikler kurumsal sayfaların header çubuğuyla ölçülerek karşılaştırıldı (VISUAL_REGRESSION_REPORT §2).

## Mimari
- **Tek kaynak menü:** bileşen ortak `n1-header` modülünü (**header v14**) ve menü verisini (**site işaretlemesi v16**) yükler. Bunlar kurumsal sayfalarla aynı dosyalardır, bu yüzden menü iki yerde ayrı ayrı tutulmaz. İki dosya da commit SHA ile sabittir.
- **Panel:** header v14 menü panelini `document.body`'ye taşır (`position:fixed`). Panel Wix bölümünün `overflow:hidden`, `transform` ve sticky kaplarından etkilenmez. Bağımsız header'da panelin `z-index` değeri 99990'dır ve `[data-n1-gs]` ile işaretlidir. Üst konumu tablette 80 px, mobilde 72 px; mobilde arka plan karartması vardır.
- **Kapsam:** CSS kuralları yalnız etikete, ortak `.n1-inner-page` / `.n1-inner-panel` sınıflarına ve `[data-n1-gs]`'e bağlıdır. Wix bileşenlerine genel CSS uygulanmaz. Ortak duyarlı CSS (`n1-inner-responsive-v6.css` @09612df) de aynı kapsamdadır.
- **Çift header koruması:** sayfada başka bir `n1-header` ya da ikinci bir `n1-global-header-v1` varsa bileşen çizim yapmaz ve `data-n1-gs-skip` yazar. Kurumsal sayfaya yanlışlıkla eklenirse ikinci bir menü oluşmaz.
- **Tekrar yükleme yok:** ortak dosyalar `window.__n1GlobalShell` önbelleğinden bir kez yüklenir. Header ve footer aynı sayfadaysa site işaretlemesi bir kez indirilir.
- **Yaşam döngüsü:**
  - `disconnectedCallback` dinleyicileri ve paneli temizler.
  - Epoch koruması geç gelen yüklemelerin eski örneğe yazmasını engeller.
  - 3 kez sök/tak testinde dinleyici sayısı artmadı (TEST_REPORT).
- **BFCache:** `pageshow` (persisted) olayında menü kapanır ve alt menü sıfırlanır. Menü Kapanış V1.3 ile uyumludur.
- **Kaydırma kilidi:** kullanılmaz. Panel gerekirse kendi içinde kayar (`overscroll-behavior:contain`); dışarı dokunmak ve Escape menüyü kapatır.
- **Erişilebilirlik:**
  - Düğmede `aria-expanded` ve `aria-controls`.
  - Tab sırası panelin içinde başlar, Escape kapatır.
  - Alt menü düğmeleri klavyeyle açılır.
  - `prefers-reduced-motion` açıkken geçişler kapanır.
- **Performans:** video, canvas, WebGL, GSAP ve sürekli animasyon yok. Platform logoları menü ilk açıldığında yüklenir. Paket boyutu 17,0 KB (gzip 5,9 KB), header v14 33,1 KB.

## Wix ayarları
Kurulum tablosu: DEPLOYMENT.md §3. Bölüm tam genişlik, iç ve dış boşluk 0. Sabitleme isteğe bağlıdır (Wix "Freeze"). Overflow için ek ayar gerekmez.

## Editör / Önizleme ile yayınlanmış site farkı
Wix Studio, Custom Element'i editörde ve Önizleme'de bir iframe içinde çizer; yayınlanmış sitede ise sayfanın DOM'una yerleştirir (Wix Yardım Merkezi). Bu yüzden:
- **Editör/Önizleme:** menü paneli bileşenin kutusuyla sınırlı ya da kırpılmış görünebilir. Bu beklenen bir durumdur.
- **Yayınlanmış site:** panel `document.body`'de açılır ve sayfanın üzerinde durur. Bu, Wix'in bölüm yapısını taklit eden test sayfasında (sticky + `overflow:hidden` + `transform`) Chromium ve WebKit'te doğrulandı. **Gerçek Wix yayınında doğrulanmadı;** ilk yayından sonra kontrol edilmeli (DEPLOYMENT §9).

## Not
Paketin başlık yorumunda üretim aracı `tools/build_shell.py` olarak geçiyor; doğru ad `tools/build_all.py`. Yalnız yorumdaki ad yanlış, davranış etkilenmiyor. Düzeltmek bütün sabit adresleri değiştireceği için bu sürümde bırakıldı.
