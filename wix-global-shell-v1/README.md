# wix-global-shell-v1 — Global Menü V2 + bağımsız Header/Footer (birleşik yayın paketi)

Kariyer V1'in (`wix-career-v1/`, PR #4) üzerine kuruldu ve **onun Server URL'lerinin yerine geçer**. Tek yayında:
- **Global Menü V2:** İletişim satırı, A7 Prodüksiyon kartı, Uygulama ve Platformlar kartı (4 logo), adres tabanlı aktif durum. Bütün kurumsal sayfalarda geçerli.
- **Bağımsız bileşenler:** `n1-global-header-v1`, `n1-global-footer-v1` ve isteğe bağlı `n1-global-floating-v1`. Tek Server URL; İletişim, Akademi ve 404 sayfaları için.
- **Kariyer sayfaları:** v2, aynı içerik, yeni menü.

**Wix'te Save/Publish yapılmadı, PR birleştirilmedi.**

## Nereden başlamalı
1. **FINAL_REPORT.md:** özet, test sonuçları, engeller.
2. **DEPLOYMENT.md:** Wix kurulumu (ana belge). Adresler **SERVER_URLS.md**'de, geri dönüş **ROLLBACK.md**'de.
3. `bash wix-global-shell-v1/wix-custom-code/verify-cdn-shell.sh` → TAMAM.

## Belgeler
| Belge | İçerik |
|---|---|
| FINAL_REPORT | Türkçe özet rapor |
| GLOBAL_MENU_REPORT | menü yapısı, kartlar, kapsam, kullanılan beceriler |
| HEADER_COMPONENT / FOOTER_COMPONENT | bileşen mimarisi, ölçüler, Wix ayarları |
| PLATFORM_LOGOS | logo sırası, dosyalar, kurallar |
| LINK_AUDIT | bütün bağlantılar ve canlı durum |
| WIX_COMPATIBILITY | editör/önizleme/yayın farkı, 404, doğrulanamayanlar |
| TEST_REPORT / VISUAL_REGRESSION_REPORT | test matrisi, görsel karşılaştırma |
| CDN_VERIFICATION | 29 adres doğrulaması |
| DEPLOYMENT / SERVER_URLS / ROLLBACK | kurulum, adresler, geri dönüş |

## Klasörler
| Yol | İçerik |
|---|---|
| `n1-global-shell-v1.js` | bağımsız bileşen paketi (üç etiket), `src/n1-global-shell-template.js`'den üretilir |
| `modules/n1-header-v14.js`, `site/n1-site-markup-v16.js` | ortak header ve menü verisi (`tools/build_header.py`, `tools/build_markup.py`) |
| `pages/n1-career-v2.js`, `sites/` | kariyer modülü ve 11 sayfa dosyası. Yalnız header ve menü adresleri değişti (`tools/build_all.py`). |
| `assets/platforms/` | 4 logo × 160/320 WebP + özgün PNG + manifest |
| `tools/` | üretim araçları; `urls.py` bütün adreslerin tek kaynağı; `make_docs.py` ve `make_reports.py` belgeleri üretir |
| `tests/` | Playwright testleri ve düzenek (`routeshell.js`, `shell-page.html`) |
| `qa/` | ham test sonuçları, CDN günlüğü, canlı görüntüler |
| `screenshots/` | teslim görselleri |
| `reference/` | teslim edilen menü paketi ve İletişim HTML V4 paketi (değiştirilmedi) |
| `wix-custom-code/verify-cdn-shell.sh` | tekrar çalıştırılabilir CDN doğrulaması |

## Yeniden üretim
Header ya da menü verisi değişirse:
```
python3 wix-global-shell-v1/tools/build_header.py <ASSET_SHA>
python3 wix-global-shell-v1/tools/build_markup.py <ASSET_SHA>
```
Bunları commit edin. Ardından bağımlıları yeniden üretip tekrar commit edin:
```
python3 wix-global-shell-v1/tools/build_all.py <O_COMMIT_SHA>
```
Son olarak `tools/urls.py`'yi güncelleyin ve `make_docs.py` ile belgeleri yeniden üretin. Sabit SHA kullanıldığı için her değişiklik yeni bir Server URL demektir.
