# CDN_VERIFICATION — Kariyer V1

**Betik:** `wix-custom-code/verify-cdn-career.sh` (depo kökünden). **Ham çıktı:** `qa/cdn-career.log`. **Sonuç: TAMAM, 14/14 adres.**

## Kontroller (her adres)
| Kontrol | Ölçüt | Sonuç |
|---|---|---|
| Durum | 20 istek → 200 | 14 × 20 = **280/280** |
| MIME | `application/javascript` | 14/14 |
| CORS | `Origin: https://www.reklam1n.com` ile `Access-Control-Allow-Origin: *` | 14/14 |
| Range | `Range: bytes=0-99` → 206 ya da tam dosya 200 | 206: 11, 200: 3 (jsDelivr bazı sıkıştırılmış betiklerde Range'i yok sayar; betikler Range ile yüklenmez) |
| Tam içerik | CDN'den inen dosyanın tamamı ile `git show <sha>:<yol>` SHA-256 karşılaştırması | **14/14 AYNI** |

## Adresler (SHA sabit, dal adı / `@latest` yok)
| Commit | Dosyalar |
|---|---|
| `f40415a3785e0172bdcc58189479253ff10cd17e` | `wix-career-v1/modules/n1-header-v13.js`, `wix-career-v1/site/n1-site-markup-v15.js` (sayfaların yüklediği ortak dosyalar) |
| `2aa9a9b483e53be78aebcd67f5af54e5ba485f90` | `wix-career-v1/pages/n1-career-v1.js` (3 yeni sayfa) ve `wix-career-v1/sites/…` altındaki 11 sayfa dosyası |

Tam liste ve kopyalanabilir Server URL'ler: SERVER_URLS.md.

## Gerçek CDN testi (tarayıcıda)
`tests/cdn-smoke.js`: yeni dosyaların hepsi doğrudan jsDelivr'dan yüklendi (yerel dosya yok). Canlı sitenin sayfaları kullanıldı; canlı Server URL'leri CDN'deki yeni adreslere yönlendirildi.

| Motor · profil | Sayfa | İK bağlantısı `/insan-kaynaklari` | Alt menü düğmesi | "Ekibimize" | Kariyer H1 | 1N hatası |
|---|---|---|---|---|---|---|
| WebKit mobil | `/`, `/reklam-yonetimi`, `/kisaca-biz`, `/markalar`, `/gizlilik`, 3 kariyer sayfası | 8/8 | 8/8 | 0 | 1 (kariyer sayfalarında) | 0 |
| Chromium masaüstü | aynı 8 sayfa | 8/8 | 8/8 | 0 | 1 | 0 |
| Chromium mobil (önceki commit `755f905`, içerik aynı) | aynı 8 sayfa | 8/8 | 8/8 | 0 | 1 | 0 |

Ham: `qa/cdn-smoke-*.log`. Yanıt kodları 200; adresler `@2aa9a9b…` ve `@f40415a…`.

## Not
jsDelivr, depo 50 MB'ı aştığı için yeni bir commit'in dosyalarına ilk dakikalarda 403 dönebilir. Wix'te adres değiştirmeden hemen önce betiği bir kez daha çalıştırın.
