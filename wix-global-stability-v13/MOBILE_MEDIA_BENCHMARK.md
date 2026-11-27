# MOBILE_MEDIA_BENCHMARK — V1.3 · Ronin kaynak varyantları

**Üretim kalitesi değişmedi: Ronin 2× korunuyor.** 1,5× / 1× / poster yalnız test anahtarıyla, yalnız o sekmede.

## 1. Kaynaklar
| Varyant | Dosya | Çözünürlük | Kod çözücü | Boyut | Süre | Adres |
|---|---|---|---|---|---|---|
| 2× (üretim, DPR×genişlik > 840'ta seçilir; iPhone'da hep) | `wix-home-v656/media/ronin-m5-film-2x.mp4` | 1120×1504 | H.264 High | 6,32 MB | 18,04 sn | `@f97db8ed…` |
| 1,5× (yalnız test) | `wix-global-stability-v13/test-media/ronin-m5-film-1.5x.mp4` | 840×1128 | H.264 High | 5,11 MB | 18,04 sn | `@756d6f87…` |
| 1× (üretimde düşük DPR / 2× hata verirse) | `wix-home-v656/media/ronin-m5-film.mp4` | 560×752 | H.264 High | 4,13 MB | 18,04 sn | `@f97db8ed…` |
| Poster (yalnız test) | film yok, `data:` kaynak → ağ isteği yok | — | — | 0 | — | — |

## 2. Test mekanizması (iPhone'da güvenli)
`?n1t=C,hero:2x,diag:1` · `hero:1.5x` · `hero:1x` · `hero:poster` (test anahtarı, DEPLOYMENT §4).
- Anahtar `n1-site-v1` öğesine `hero-video` özniteliğini, öğe oluşturulur oluşturulmaz (MutationObserver, 30 sn sonra kapanır) yazar. Bu öznitelik ana sayfa kodunda zaten var: verildiğinde **yalnız o dosya** kullanılır, 2× yedeği devre dışı kalır (`n1-site-wix-v658.js:582`, `n1-m5-build.js:30-34`).
- **Aynı anda birden çok kaynak indirilmez:** her varyantta ağda tek bir film isteği görüldü (aşağıda).
- Tanılama kutusu `video.currentSrc` + `videoWidth×videoHeight` gösterir → hangi dosyanın **gerçekten** oynadığı ekranda görülür.

### Doğrulama (Playwright WebKit, 390×844 DPR 3)
| Adres | İndirilen film | Kutu: kaynak / çözünürlük / durum |
|---|---|---|
| parametresiz | `ronin-m5-film-2x.mp4` | (kutu yok, test kapalı) |
| `?n1t=C,hero:1.5x,diag:1` | yalnız `ronin-m5-film-1.5x.mp4` | 1.5x / **840×1128** / playing |
| `?n1t=D,hero:1x,diag:1` | yalnız `ronin-m5-film.mp4` | 1x / **560×752** / playing |
| `?n1t=E,hero:2x,diag:1` | yalnız `ronin-m5-film-2x.mp4` | 2x / **1120×1504** / playing |
| `?n1t=A,hero:poster,diag:1` | **hiç film yok** | poster-only / 0×0 / error (poster görünür) |

## 3. Bellek (emülasyon)
21 döngü, aynı koşullar, C (2×) ↔ F1x (1×):
| Motor | C 2× ort / maks | F1x 1× ort / maks |
|---|---|---|
| WebKit en büyük süreç (MB) | 2047 / 2837 (tekrar 2024 / 2878) | 1996 / 2815 |
| Chromium en büyük süreç (MB) | 512 / 640 | 491 / 643 |

Fark ~%2–4, gürültü düzeyinde. V1.1 ölçümü (tek yükleme, WebKit): 2× +58 MB. **Sonuç:** emülasyon, Ronin kalitesini düşürmenin anlamlı bir kararlılık kazancı sağladığını göstermiyor. Karar fiziksel cihaz testine bırakıldı (DEPLOYMENT §5.4): hangi varyantta çökme kayboluyorsa o zaman değerlendirilir.

## 4. Diğer sayfaların medyası (bilgi)
Sayfa profili MOBILE_STABILITY_REPORT §5. Videolar sayfa kodunda sabit çözünürlüklü (720p/1080p); bu sürümde değiştirilmedi.
