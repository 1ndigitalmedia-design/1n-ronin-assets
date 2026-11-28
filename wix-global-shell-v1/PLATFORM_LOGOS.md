# PLATFORM_LOGOS — "Uygulama ve Platformlar"

> **V2.1 (güncel):** logolar artık **tek renkli gömülü SVG** sembolleri. Özgün PNG'lerden arka plan temizlenerek vektöre çevrildi (`assets/platforms/mono/`, üretim aracı `tools/build_platform_mono.py`).
> - Ortak koyu kutu #1A1C1B, logo #BDBFB9, hover ve odakta #A2FF00.
> - Kutu ölçüsü: masaüstü 56, tablet 52, mobil 48 px.
> - Ayrıntı: **PLATFORM_REVISION_V21.md**.
>
> Aşağıdaki renkli WebP dosyaları V2'nin dosyalarıdır. Silinmedi; V2 geri dönüşü bunları kullanır.

## Sıra ve hedefler
| # | Logo | Hedef | Açılış |
|---|---|---|---|
| 1 | ZEYP | https://www.zeyp.com.tr/ | yeni sekme, `rel="noopener noreferrer"` |
| 2 | Market | https://www.carsialtin.com/faprika/canli-piyasalar/ | yeni sekme, `rel="noopener noreferrer"` |
| 3 | Hemen Tıkla | https://www.hementik.la/ | yeni sekme, `rel="noopener noreferrer"` |
| 4 | 1N Intelligence | https://www.reklam1n.com/intelligence | aynı sekme (site içi) |

Intelligence sayfasına ve sistemine dokunulmadı; bu kart yalnızca bir bağlantı.

## Dosyalar
Kaynak, teslim paketindeki özgün PNG'lerdir (2000×2000, `assets/platforms/source/`). Paketteki optimize WebP'ler kalite kontrolünden geçtikten sonra **değiştirilmeden** kullanıldı.

| Dosya | Boyut | Bayt | SHA-256 (ilk 16) |
|---|---|---|---|
| `01-zeyp-160.webp` | 160×160 | 4390 B | `c33ea79d77297e26` |
| `01-zeyp-320.webp` | 320×320 | 10716 B | `8c79856b031d679b` |
| `02-market-160.webp` | 160×160 | 5838 B | `a9ed58c38420a7cb` |
| `02-market-320.webp` | 320×320 | 12172 B | `ee28b014d4a1604b` |
| `03-hemen-tikla-160.webp` | 160×160 | 1104 B | `acea8c1674d3e94a` |
| `03-hemen-tikla-320.webp` | 320×320 | 2390 B | `052b4fae5f489220` |
| `04-intelligence-160.webp` | 160×160 | 3926 B | `bdf9e8b6d72dde3d` |
| `04-intelligence-320.webp` | 320×320 | 8836 B | `57babf47030de6dc` |

## Kurallar
- Bütün logolar kare ve aynı boyutta. Her logo kendi arka plan rengini korur; `object-fit` gerekmiyor, çünkü kaynaklar zaten kare (esneme yok).
- Kutu boyutu: tek satırda 4 sütun, `repeat(4,minmax(0,96px))`. En fazla 96 px; ekran daraldıkça küçülür.
- `srcset` 160w/320w ve `sizes="96px"`: 2× ekranda bile en fazla 320 px'lik dosya iner. Mobilde 2000 px'lik özgün dosya **hiç indirilmez**.
- **Tembel yükleme:** görsellerin adresleri `data-src`/`data-srcset`'te bekler ve menü ilk açıldığında yüklenir. Testte menü açılmadan platform görseli isteği **0** ölçüldü.
- Masaüstünde ve bütün mobil genişliklerde (320 px dahil) tek satır (testte ölçüldü).
- Hover/odak: hafif çerçeve ve parlaklık, `:focus-visible` halkası. Hareket azaltma açıkken geçiş yok.
- Her bağlantının `aria-label` değeri logo adıdır; görsel `alt` değeri boştur (adı tekrar okutmamak için).
- Adres: `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@9a8e261…/wix-global-shell-v1/assets/platforms/` (tam SHA: CDN_VERIFICATION). 8 dosyanın tamamı 200, `image/webp`, CORS `*` ve içerik eşleşmesiyle doğrulandı.
