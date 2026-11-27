# CDN_VERIFICATION — V1.4 CDN doğrulaması

**Betik:** `wix-custom-code/verify-cdn-v14.sh` (depo kökünden çalıştırılır). **Son çalıştırma:** 27 Kasım 2026 ~23:50 UTC. **Ham çıktı:** `qa/cdn-v14.log`. **Sonuç: TAMAM — 55/55 adres.**

## Kontroller (her adres)
| Kontrol | Ölçüt | Sonuç |
|---|---|---|
| Durum | JS 20 istek, WebP 3 istek → hepsi 200 | 11 JS × 20 = 220/220 · 44 WebP × 3 = 132/132 |
| MIME | JS `application/javascript`, WebP `image/webp` | 55/55 |
| CORS | `Origin: https://www.reklam1n.com` ile `Access-Control-Allow-Origin: *` | 55/55 |
| Range | WebP: `Range: bytes=0-99` → 206 + `Content-Range` | 44/44 |
| | JS: 206 ya da 200 | 206: 5, 200 (tam dosya): 6. jsDelivr sıkıştırılmış betiklerde Range'i bazen yok sayıyor; betikler Range ile yüklenmediği için etkisi yok |
| Tam içerik | CDN'den inen dosyanın tamamı ile `git show <sha>:<yol>` SHA-256 karşılaştırması | **55/55 AYNI** |

## Adresler
| Tür | Commit | Adet |
|---|---|---|
| Sayfalar + ana sayfa v659 | `36a24d3d5af5be5e5493598af4375f070a26b002` | 8 |
| Video modülü v14, site işaretlemesi v14 | `fbc905e6b07721d26a78eb84df56a076693ad7e2` | 2 |
| Kabul testi betiği | `7b57ebcfd7529b9c8b4ce69edad452347217839f` | 1 |
| WebP kareler | `274e02bbda53e00b186c4d1b82349edc9dd32009` | 44 |

Tümü SHA ile sabit; dal adı ya da `@latest` yok. Tam liste: SERVER_URLS.md.

## Gerçek CDN testi (tarayıcıda)
`tests/routecdn.js`: canlı sitenin sayfalarında Wix'in yüklediği V1.3 Server URL'leri, jsDelivr'daki V1.4 adreslerine yönlendirildi. Hiçbir dosya yerelden sunulmadı; kareler ve alt modüller CDN'den geldi.
- WebKit ve Chromium × mobil ve masaüstü × 8 sayfa: **32/32 GEÇTİ**.
- Mobilde ikincil video isteği 0, kareler CDN'den yüklendi. Masaüstü istekleri canlıyla aynı. 1N hatası 0.
- Ayrıntı: TEST_REPORT §3, `qa/net/cdn-real.log`.

## Not
jsDelivr, depo 50 MB'ı aştığı için yeni bir commit'in dosyalarına ilk dakikalarda 403 dönebilir. İlk çalıştırmada (`qa/cdn-v14-run1.log`) 2 WebP dosyası 403 döndü; birkaç dakika sonra 55/55 oldu. Wix'te adres değiştirmeden önce betiği bir kez daha çalıştırın.
