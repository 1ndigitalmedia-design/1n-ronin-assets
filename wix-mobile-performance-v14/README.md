# V1.4 — Mobil Performans, Kaynak Optimizasyonu ve Üretim Hazırlığı

**Dal:** `mobile-performance-v14`. **Taban:** `mobile-stability-v1-audit` (V1.3, Draft PR #2).

**Durum:** kod, test ve belgeler hazır. **Wix'e uygulanmadı, PR birleştirilmedi.** Fiziksel cihaz kabulü beklemede.

## Ne yapıldı (kısa)
| Kod | İş | Sonuç |
|---|---|---|
| P09 | Medya envanteri | `MEDIA_INVENTORY.md/.json`: 29 sayfa × 3 profil |
| P10 | İkincil videolar → WebP kare | 14 kare, 44 dosya (2,4 MB), çok boyutlu, animasyonsuz |
| P11 | Mobil ve tablette ikincil video indirilmez | `<video>` hiç oluşturulmaz; ağda doğrulandı (48/48) |
| P12 | Ekran dışı medya, GPU maliyetli CSS | Mevcut gözlemciler korundu; yeni filtre yok, V1.3 WebKit düzeltmeleri korundu |
| P13 | Sayfalar arası kaynak temizliği | `n1Life` (hizmet sayfaları) + video modülü v14 (ana sayfa): `pagehide`'da bırak, BFCache dönüşünde geri yükle |
| P14 | Wix uyumu | Etiket ve öznitelikler aynı; BFCache açık; döndürmede medya değişmez |
| P15 | Görseller | E-Ticaret: Wix boyutlandırma + `srcset` (34,8 → 1,7 MB mobil) |
| P08 | "Hikâyemizin Devamı" | `/studyo-hikayesi` (404) → `/kisaca-biz`; tek düğme, 3 profilde doğrulandı |
| §14 | Kabul testi | `?n1t=kabul14`: tek bağlantı, otomatik; benzetimde 9,1 dk |

## Klasör
```
home/            n1-site-wix-v659.js, n1-video-m5-v14.js
site/            n1-site-markup-v14.js
pages/           7 hizmet sayfası (Kreatif v24, E-Ticaret v25, Sosyal v28, Reklam v24, UI/UX v30, Yapay Zekâ v3, Uygulama v3)
media/stills/    WebP kareler + manifest + kare seçim betikleri + temas sayfaları
acceptance/      n1-accept-v14.js (kabul testi)
wix-custom-code/ TEST-SWITCH-v14-head.html, verify-cdn-v14.sh
tools/           build_pages.py, build_accept.py, build_switch.py, make_inventory.py, make_docs_media.py, make_perf.py, vis_compare.py
tests/           Playwright betikleri (ağ, bayt, görsel, BFCache, regresyon, bellek, bağlantı, kabul benzetimi, CDN yönlendirme)
qa/              ham sonuçlar
screenshots/     görsel regresyon görüntüleri (V1.3 ↔ V1.4)
```

## Belgeler
- **Kurulum:** DEPLOYMENT (ana belge) · SERVER_URLS · ROLLBACK · CDN_VERIFICATION · WIX_COMPATIBILITY.
- **Analiz ve karar:** MEDIA_INVENTORY · MOBILE_MEDIA_MAPPING · OPTIMIZATION_DECISIONS · RESOURCE_LIFECYCLE.
- **Doğrulama:** TEST_REPORT · VISUAL_REGRESSION_REPORT · PERFORMANCE_BEFORE_AFTER · HIKAYEMIZIN_DEVAMI_LINK_AUDIT · PHYSICAL_DEVICE_ACCEPTANCE.
- **Özet:** FINAL_REPORT.

## Yeniden üretim
```bash
python3 wix-mobile-performance-v14/tools/build_pages.py 274e02bbda53e00b186c4d1b82349edc9dd32009
```
```bash
bash wix-mobile-performance-v14/wix-custom-code/verify-cdn-v14.sh
```
```bash
cd wix-mobile-performance-v14/tests && node net14.js webkit v14 mobil /e-ticaret-yonetimi
```
