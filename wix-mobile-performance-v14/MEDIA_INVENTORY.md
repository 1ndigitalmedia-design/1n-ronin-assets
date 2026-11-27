# MEDIA_INVENTORY — V1.4 kurumsal sayfa medya envanteri

Kaynak: canlı tarama (27 Kasım 2026, Chromium CDP, profiller mobil 390×844 / tablet yatay 1180×820 / masaüstü 1440×900, sona kadar kademeli kaydırma), video sondaları (ilk 3 MB, `curl -r` + ffprobe) ve statik kaynak analizi. Makine okunur sürüm: `MEDIA_INVENTORY.json`. Ham veri: `qa/inventory/`.

> Medya baytları yalnız tamamlanan istekleri sayar; kısmi video indirmeleri eksik görünür. Video istek sayıları için `qa/net/*.json`, aktarılan bayt için `PERFORMANCE_BEFORE_AFTER.md`.

## 1. Sayfa özeti (canlı V1.3)

| Sayfa | CE etiketi | Wix yerel | Video (mob/masa) | Görsel | ST çalışma (mob) | Mobil medya MB | Mobil görsel MB | Masaüstü medya MB |
|---|---|---|---|---|---|---|---|---|
| `/` | `n1-site-v1` | hayır | 5/3 | 6 | 13 | 10.77 | 0.51 | 4.25 |
| `/kisaca-biz` | `n1-kisaca-biz-v1` | hayır | 0/0 | 1 | 4 | 0.0 | 0.16 | 0.0 |
| `/kreatif-produksiyon` | `n1-kreatif-produksiyon-v23` | hayır | 2/2 | 20 | 9 | 0.0 | 1.76 | 0.0 |
| `/e-ticaret-yonetimi` | `n1-e-ticaret-yonetimi-v23` | hayır | 3/3 | 18 | 15 | 2.59 | 27.61 | 2.59 |
| `/sosyal-medya` | `n1-sosyal-medya-v27` | hayır | 4/5 | 12 | 4 | 0.0 | 1.01 | 2.7 |
| `/reklam-yonetimi` | `n1-reklam-yonetimi-v23` | hayır | 3/3 | 9 | 8 | 0.63 | 0.77 | 0.83 |
| `/ui-ux-tasarim` | `n1-uiux-tasarim-v28` | hayır | 1/1 | 17 | 4 | 0.0 | 3.15 | 0.0 |
| `/yapay-zeka` | `n1-yapay-zeka-v2` | hayır | 3/3 | 13 | 13 | 11.46 | 0.54 | 11.46 |
| `/uygulama-gelistirme` | `n1-uygulama-gelistirme-v2` | hayır | 4/4 | 7 | 2 | 5.7 | 0.75 | 5.7 |
| `/markalar` | `n1-markalar-v11` | hayır | 0/0 | 1 | 2 | 0.0 | 0.16 | 0.0 |
| `/reklam-ajansi` | — | evet | 0/0 | 20 | 0 | 0.0 | 0.07 | 0.0 |
| `/1n` | — | evet | 0/0 | 29 | 0 | 0.0 | 0.23 | 0.0 |
| `/iletisim` | — | evet | 0/0 | 9 | 0 | 0.0 | 0.04 | 0.0 |
| `/kvkk-aydinlatma-metni` | `n1-kvkk-aydinlatma-v1` | hayır | 0/0 | 1 | 0 | 0.0 | 0.03 | 0.0 |
| `/cerez-politikasi` | `n1-cerez-politikasi-v1` | hayır | 0/0 | 1 | 0 | 0.0 | 0.03 | 0.0 |
| `/kullanim-kosullari` | `n1-kullanim-kosullari-v1` | hayır | 0/0 | 1 | 0 | 0.0 | 0.03 | 0.0 |
| `/gizlilik` | `n1-gizlilik-politikasi-v1` | hayır | 0/0 | 1 | 0 | 0.0 | 0.03 | 0.0 |
| `/veri-sahibi-basvuru-formu` | `n1-veri-sahibi-basvuru-v1` | hayır | 0/0 | 1 | 0 | 0.0 | 0.03 | 0.0 |
| `/dijital-pazarlama` | — | evet | 0/0 | 11 | 0 | 0.0 | 0.2 | 0.0 |
| `/google-reklam-yonetimi` | — | evet | 0/0 | 11 | 0 | 0.0 | 0.07 | 0.0 |
| `/facebook-reklam-yonetimi` | — | evet | 0/0 | 11 | 0 | 0.0 | 0.06 | 0.0 |
| `/instagram-reklam-yonetimi` | — | evet | 0/0 | 12 | 0 | 0.0 | 0.11 | 0.0 |
| `/tiktok-reklam-yonetimi` | — | evet | 0/0 | 10 | 0 | 0.0 | 0.05 | 0.0 |
| `/cgi-reklamlar` | — | evet | 1/1 | 10 | 0 | 0.65 | 0.05 | 3.47 |
| `/marka-danismanligi` | — | evet | 1/1 | 10 | 0 | 3.7 | 0.04 | 0.0 |
| `/online-ticaret-yonetimi` | — | evet | 0/0 | 10 | 0 | 0.0 | 0.05 | 0.0 |
| `/sosyal-medya-yonetimi` | — | evet | 0/0 | 10 | 0 | 0.0 | 0.18 | 0.0 |
| `/web-tasarim-ve-yazilim-programlama` | — | evet | 1/1 | 10 | 0 | 1.39 | 0.05 | 4.15 |
| `/ucretsiz-analiz` | — | evet | 0/0 | 9 | 0 | 0.0 | 0.04 | 0.0 |

## 2. Server URL (canlı) ve V1.4 dosyası

| Sayfa | Canlı Server URL | V1.4 |
|---|---|---|
| `/` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@b9c8fca79bee3d6ab9baca96d19e3888575c9c06/wix-global-stability-v13/home/n1-site-wix-v658.js` | `wix-mobile-performance-v14/home/n1-site-wix-v659.js` |
| `/kisaca-biz` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@39f762f63a2af58a470e9712d8ca0895d6f73f9f/wix-global-menu-v12/pages/wix-kisaca-biz-v1/n1-kisaca-biz-v1.js` | değişmedi |
| `/kreatif-produksiyon` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@39f762f63a2af58a470e9712d8ca0895d6f73f9f/wix-global-menu-v12/pages/wix-kreatif-produksiyon-v23/n1-kreatif-produksiyon-v23.js` | `wix-mobile-performance-v14/pages/wix-kreatif-produksiyon-v24/n1-kreatif-produksiyon-v24.js` |
| `/e-ticaret-yonetimi` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@997f951a4ae76ab2dd95440c4e8e597ffa682499/wix-global-stability-v13/pages/wix-e-ticaret-yonetimi-v24/n1-e-ticaret-yonetimi-v24.js` | `wix-mobile-performance-v14/pages/wix-e-ticaret-yonetimi-v25/n1-e-ticaret-yonetimi-v25.js` |
| `/sosyal-medya` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@39f762f63a2af58a470e9712d8ca0895d6f73f9f/wix-global-menu-v12/pages/wix-sosyal-medya-v27/n1-sosyal-medya-v27.js` | `wix-mobile-performance-v14/pages/wix-sosyal-medya-v28/n1-sosyal-medya-v28.js` |
| `/reklam-yonetimi` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@39f762f63a2af58a470e9712d8ca0895d6f73f9f/wix-global-menu-v12/pages/wix-reklam-yonetimi-v23/n1-reklam-yonetimi-v23.js` | `wix-mobile-performance-v14/pages/wix-reklam-yonetimi-v24/n1-reklam-yonetimi-v24.js` |
| `/ui-ux-tasarim` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@d33a9ffc77cd85f466fcc439518d2b74d639abda/wix-global-stability-v13/pages/wix-uiux-tasarim-v29/n1-uiux-tasarim-v29.js` | `wix-mobile-performance-v14/pages/wix-uiux-tasarim-v30/n1-uiux-tasarim-v30.js` |
| `/yapay-zeka` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@39f762f63a2af58a470e9712d8ca0895d6f73f9f/wix-global-menu-v12/pages/wix-yapay-zeka-v2/n1-yapay-zeka-v2.js` | `wix-mobile-performance-v14/pages/wix-yapay-zeka-v3/n1-yapay-zeka-v3.js` |
| `/uygulama-gelistirme` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@39f762f63a2af58a470e9712d8ca0895d6f73f9f/wix-global-menu-v12/pages/wix-uygulama-gelistirme-v2/n1-uygulama-gelistirme-v2.js` | `wix-mobile-performance-v14/pages/wix-uygulama-gelistirme-v3/n1-uygulama-gelistirme-v3.js` |
| `/markalar` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@39f762f63a2af58a470e9712d8ca0895d6f73f9f/wix-global-menu-v12/pages/wix-markalar-v1/n1-markalar-v11.js` | değişmedi |
| `/kvkk-aydinlatma-metni` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@39f762f63a2af58a470e9712d8ca0895d6f73f9f/wix-global-menu-v12/pages/wix-yasal-sayfalar-v1/n1-yasal-sayfalar-v1.js` | değişmedi |
| `/cerez-politikasi` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@39f762f63a2af58a470e9712d8ca0895d6f73f9f/wix-global-menu-v12/pages/wix-yasal-sayfalar-v1/n1-yasal-sayfalar-v1.js` | değişmedi |
| `/kullanim-kosullari` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@39f762f63a2af58a470e9712d8ca0895d6f73f9f/wix-global-menu-v12/pages/wix-yasal-sayfalar-v1/n1-yasal-sayfalar-v1.js` | değişmedi |
| `/gizlilik` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@39f762f63a2af58a470e9712d8ca0895d6f73f9f/wix-global-menu-v12/pages/wix-yasal-sayfalar-v1/n1-yasal-sayfalar-v1.js` | değişmedi |
| `/veri-sahibi-basvuru-formu` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@39f762f63a2af58a470e9712d8ca0895d6f73f9f/wix-global-menu-v12/pages/wix-yasal-sayfalar-v1/n1-yasal-sayfalar-v1.js` | değişmedi |

Wix yerel sayfalar (Custom Element yok, kod kapsamı dışında): `/reklam-ajansi`, `/1n`, `/iletisim`, `/dijital-pazarlama`, `/google-reklam-yonetimi`, `/facebook-reklam-yonetimi`, `/instagram-reklam-yonetimi`, `/tiktok-reklam-yonetimi`, `/cgi-reklamlar`, `/marka-danismanligi`, `/online-ticaret-yonetimi`, `/sosyal-medya-yonetimi`, `/web-tasarim-ve-yazilim-programlama`, `/ucretsiz-analiz`.

## 3. Videolar

### 3.1 Ana / kahraman videolar (mobilde korunur)

| Adres | Çözünürlük | Süre sn | Codec | Bit hızı kb/s | Boyut MB |
|---|---|---|---|---|---|
| `wix:6dbf5e_48741869fc89488392bce24c731dafa4/480p/mp4/file.mp4` | 768×450 | 4.37 | h264 Main | 644 | 0.34 |
| `wix:6dbf5e_809e8dea872246c7ae68b073341efafb/480p/mp4/file.mp4` | 768×450 | 5.12 | h264 Main | 844 | 0.63 |
| `wix:6dbf5e_ba9aa241bd914b07a97c4c315f153bfa/720p/mp4/file.mp4` | 1080×1080 | 15.90 | h264 High | 1864 | 3.78 |
| `wix:6dbf5e_8388dde9e33c490594eb19d4bbcf4eee/720p/mp4/file.mp4` | 1280×720 | 34.57 | h264 High | 2956 | 12.19 |
| `wix:6dbf5e_3c7918f906c1478f9149099d6d398635/720p/mp4/file.mp4` | 720×1280 | 3.18 | h264 High | 1162 | 0.47 |
| `wix:6dbf5e_67c5c858b42a4ce3b0e76195a59c8b3e/720p/mp4/file.mp4` | 720×1280 | 38.67 | h264 High | 2734 | 13.03 |
| `wix:6dbf5e_d0b5ab077fad434aa46a37dca1aa10b8/720p/mp4/file.mp4` | 1280×720 | 1.84 | h264 High | 3309 | 0.73 |
| `wix:6dbf5e_d0b5ab077fad434aa46a37dca1aa10b8/480p/mp4/file.mp4` | 854×480 | 1.84 | h264 Main | 1313 | 0.29 |
| `wix:6dbf5e_8da46d06b07a4784a27a413446f081f9/720p/mp4/file.mp4` | 720×1280 | 30.03 | h264 High | 1612 | 5.78 |
| `wix:6dbf5e_8957dee5671c411da297848f5ee956d0/720p/mp4/file.mp4` | 1280×720 | 7.04 | h264 High | 2547 | 2.14 |
| `cdn@f97db8edb37f1e1388f276d840e262fc8452b80a/wix-home-v656/media/ronin-m5-film-2x.mp4` | 1120×1504 | 18.04 | h264 High | 2800 | 6.03 |
| `cdn@f97db8edb37f1e1388f276d840e262fc8452b80a/wix-home-v656/media/ronin-m5-film.mp4` | 560×752 | 18.04 | h264 High | 1827 | 3.93 |

### 3.2 İkincil videolar (V1.4’te mobil/tablette WebP kare)

| Anahtar | Sayfa | Kaynak | Çözünürlük | Süre sn | Codec | kb/s | Boyut MB |
|---|---|---|---|---|---|---|---|
| `kreatif-monitor` | kreatif-produksiyon | `6dbf5e_2821f1bb754740f9bc6deb51f052cf8c/1080p` | 1920×1080 | 30.166667 | h264 | 3723 | 14.02 |
| `eticaret-store` | e-ticaret-yonetimi | `6dbf5e_382aee7841704e1c9e54539673ff9f63/480p` | 720×900 | 5.0 | h264 | 1233 | 0.74 |
| `eticaret-trio` | e-ticaret-yonetimi | `6dbf5e_efaf0298818c43b19c85c0c37bdb7f4a/720p` | 720×1280 | 5.643991 | h264 | 2002 | 1.39 |
| `reklam-manifesto` | reklam-yonetimi | `6dbf5e_d0b5ab077fad434aa46a37dca1aa10b8/720p` | 1280×720 | 1.835167 | h264 | 3309 | 0.73 |
| `reklam-karar` | reklam-yonetimi | `6dbf5e_3855bf1db1384a9c961782c650b3686d/1080p` | 1920×1080 | 5.013 | h264 | 4333 | 2.70 |
| `sosyal-hareket` | sosyal-medya | `6dbf5e_4892baa5590541faae6c24693b7fb00c/1080p` | 1920×1080 | 29.162467 | h264 | 6057 | 21.07 |
| `sosyal-final` | sosyal-medya | `6dbf5e_f14a9f803bc442838bfe159f0aa49e72/1080p` | 1920×1080 | 5.013 | h264 | 4333 | 2.70 |
| `sosyal-strateji` | sosyal-medya | `6dbf5e_044b3674636a4813b20f3f7dd8a402fe/480p` | 720×900 | 7.033333 | h264 | 442 | 0.42 |
| `uiux-feel` | ui-ux-tasarim | `6dbf5e_54840d234c7d41c9b1983c73164e3050/720p` | 720×1280 | 5.597007 | h264 | 1664 | 1.15 |
| `yapay-gen` | yapay-zeka | `6dbf5e_e177591c89e44710be97a52b3e6284f1/1080p` | 1080×1080 | 14.976 | h264 | 4448 | 7.95 |
| `yapay-story` | yapay-zeka | `6dbf5e_6c47eb3e5ef6409fb3285c7623d6054f/1080p` | 608×1080 | 14.976 | h264 | 1963 | 3.51 |
| `uygulama-web` | uygulama-gelistirme | `6dbf5e_58f4d602044e4af1972b2898b5a5694a/720p` | 720×1280 | 6.666667 | h264 | 1140 | 0.98 |
| `uygulama-screens` | uygulama-gelistirme | `6dbf5e_cbd02cfab44141d6838302d4f3b915c7/720p` | 720×1280 | 5.736009 | h264 | 1929 | 1.37 |
| `uygulama-motion` | uygulama-gelistirme | `6dbf5e_23811760080b45b7aa77526f31898777/720p` | 720×1280 | 11.356009 | h264 | 1073 | 1.55 |

Wix yerel sayfalardaki videolar (`/cgi-reklamlar`, `/marka-danismanligi`, `/web-tasarim-ve-yazilim-programlama`) Wix Video Player öğeleridir; kodla değiştirilemez, Wix Editor’de yönetilir (OPTIMIZATION_DECISIONS §5).

### 3.3 Video öznitelikleri (canlı, mobil)

| Sayfa | Sınıf | preload | autoplay | loop | muted | Mobil | Masaüstü |
|---|---|---|---|---|---|---|---|
| `/` | `m4-film-v` | auto | False | False | True | yükler | — |
| `/` | `m5-mini-v` | auto | False | True | True | yükler | — |
| `/` | `n1sv-video` | auto | False | True | True | yükler | — |
| `/` | `n1sr-video` | metadata | False | False | True | yükler | yükler |
| `/` | `n1sv-video` | auto | False | True | True | yükler | — |
| `/` | `n1sv-video` | auto | True | True | True | — | yükler |
| `/` | `n1sv-video` | auto | True | True | True | — | yükler |
| `/kreatif-produksiyon` | `kp-video` | auto | False | True | True | yükler | yükler |
| `/kreatif-produksiyon` | `kp-video` | auto | False | True | True | yükler | — |
| `/kreatif-produksiyon` | `kp-video` | auto | False | True | True | — | yükler |
| `/e-ticaret-yonetimi` | `ec-video` | auto | False | True | True | yükler | yükler |
| `/e-ticaret-yonetimi` | `ec-video` | auto | False | True | True | yükler | yükler |
| `/e-ticaret-yonetimi` | `ec-video` | auto | False | True | True | yükler | yükler |
| `/sosyal-medya` | `sm-video` | auto | False | True | True | yükler | yükler |
| `/sosyal-medya` | `sm-stg__img sm-stg__video is-on` | none | False | True | True | yükler | yükler |
| `/sosyal-medya` | `sm-video` | auto | False | True | True | yükler | yükler |
| `/sosyal-medya` | `sm-video` | none | False | True | True | yükler | yükler |
| `/sosyal-medya` | `sm-video` | metadata | True | True | True | — | yükler |
| `/reklam-yonetimi` | `ry-video` | auto | False | True | True | yükler | — |
| `/reklam-yonetimi` | `ry-dec__video` | auto | False | True | True | yükler | yükler |
| `/reklam-yonetimi` | `ry-video` | auto | False | True | True | yükler | — |
| `/reklam-yonetimi` | `ry-video` | auto | False | True | True | — | yükler |
| `/reklam-yonetimi` | `ry-video` | auto | False | True | True | — | yükler |
| `/ui-ux-tasarim` | `ux-feel__video` | metadata | False | True | True | yükler | yükler |
| `/yapay-zeka` | `` | auto | True | True | True | yükler | yükler |
| `/yapay-zeka` | `` | auto | False | True | True | yükler | yükler |
| `/yapay-zeka` | `` | auto | True | True | True | yükler | yükler |
| `/uygulama-gelistirme` | `` | auto | True | True | True | yükler | yükler |
| `/uygulama-gelistirme` | `` | auto | False | True | True | yükler | yükler |
| `/uygulama-gelistirme` | `` | auto | True | True | True | yükler | yükler |
| `/uygulama-gelistirme` | `` | auto | True | True | True | yükler | yükler |
| `/cgi-reklamlar` | `X9nqm0` | auto | True | True | True | yükler | — |
| `/cgi-reklamlar` | `X9nqm0` | auto | True | True | True | — | yükler |
| `/marka-danismanligi` | `X9nqm0` | auto | True | True | True | yükler | — |
| `/marka-danismanligi` | `X9nqm0` | auto | True | True | True | — | yükler |
| `/web-tasarim-ve-yazilim-programlama` | `X9nqm0` | auto | True | True | True | yükler | — |
| `/web-tasarim-ve-yazilim-programlama` | `X9nqm0` | auto | True | True | True | — | yükler |

## 4. Görseller (mobil)

| Sayfa | Adet | lazy | width/height | Aşırı büyük örnekler (doğal → görüntülenen) |
|---|---|---|---|---|
| `/` | 6 | 3 | 4 | 1080x1080→91x47 |
| `/kisaca-biz` | 1 | 1 | 0 |  |
| `/kreatif-produksiyon` | 20 | 18 | 0 | 640x426→126x84; 640x960→126x84; 640x960→126x84; 640x511→126x84 |
| `/e-ticaret-yonetimi` | 18 | 14 | 0 | 1672x941→390x371; 1672x941→390x371; 1672x941→390x371; 1254x1254→138x184 |
| `/sosyal-medya` | 12 | 11 | 0 |  |
| `/reklam-yonetimi` | 9 | 8 | 0 |  |
| `/ui-ux-tasarim` | 17 | 10 | 0 | 1122x1402→287x359 |
| `/yapay-zeka` | 13 | 13 | 12 |  |
| `/uygulama-gelistirme` | 7 | 7 | 6 |  |
| `/markalar` | 1 | 1 | 0 |  |
| `/reklam-ajansi` | 20 | 0 | 0 |  |
| `/1n` | 29 | 20 | 0 |  |
| `/iletisim` | 9 | 0 | 0 |  |
| `/kvkk-aydinlatma-metni` | 1 | 1 | 0 |  |
| `/cerez-politikasi` | 1 | 1 | 0 |  |
| `/kullanim-kosullari` | 1 | 1 | 0 |  |
| `/gizlilik` | 1 | 1 | 0 |  |
| `/veri-sahibi-basvuru-formu` | 1 | 1 | 0 |  |
| `/dijital-pazarlama` | 11 | 2 | 0 |  |
| `/google-reklam-yonetimi` | 11 | 2 | 0 |  |
| `/facebook-reklam-yonetimi` | 11 | 2 | 0 |  |
| `/instagram-reklam-yonetimi` | 12 | 3 | 0 |  |
| `/tiktok-reklam-yonetimi` | 10 | 1 | 0 |  |
| `/cgi-reklamlar` | 10 | 0 | 1 |  |
| `/marka-danismanligi` | 10 | 0 | 1 |  |
| `/online-ticaret-yonetimi` | 10 | 1 | 0 |  |
| `/sosyal-medya-yonetimi` | 10 | 1 | 0 |  |
| `/web-tasarim-ve-yazilim-programlama` | 10 | 0 | 1 |  |
| `/ucretsiz-analiz` | 9 | 0 | 0 |  |

## 5. Animasyon, dinleyici, zamanlayıcı, temizlik (statik analiz, canlı kaynak)

| Sayfa | gsap çağrısı | scrollTrigger | addEvt/removeEvt/n1Listen | setTimeout/setInterval/rAF | IO/RO/MO | disconnected | pagehide/pageshow/visibility | CSS filter / backdrop / infinite |
|---|---|---|---|---|---|---|---|---|
| `/` | 0 | 0 | 5/5/0 | 8/0/3 | 0/1/1 | 3 | 0/2/0 | 0/0/0 |
| `/kisaca-biz` | 12 | 11 | 9/6/8 | 4/0/2 | 0/1/0 | 2 | 0/3/0 | 4/4/0 |
| `/kreatif-produksiyon` | 29 | 16 | 10/6/8 | 5/0/2 | 2/2/0 | 1 | 0/3/2 | 6/4/0 |
| `/e-ticaret-yonetimi` | 40 | 29 | 7/4/8 | 7/1/2 | 6/1/0 | 1 | 0/3/3 | 9/6/0 |
| `/sosyal-medya` | 42 | 30 | 8/6/8 | 5/0/3 | 5/2/0 | 1 | 0/3/4 | 6/6/0 |
| `/reklam-yonetimi` | 49 | 34 | 8/5/8 | 5/0/2 | 4/1/0 | 1 | 0/3/4 | 11/6/1 |
| `/ui-ux-tasarim` | 35 | 24 | 6/3/8 | 10/0/4 | 3/1/0 | 1 | 0/3/2 | 7/4/1 |
| `/yapay-zeka` | 45 | 36 | 6/3/8 | 5/0/2 | 2/1/0 | 1 | 0/3/2 | 8/4/0 |
| `/uygulama-gelistirme` | 39 | 31 | 11/8/8 | 10/0/3 | 2/2/0 | 1 | 0/3/2 | 5/4/2 |
| `/markalar` | 13 | 3 | 5/2/9 | 9/0/2 | 0/2/0 | 1 | 0/4/0 | 5/4/0 |
| `/kvkk-aydinlatma-metni` | 0 | 0 | 5/3/8 | 5/0/2 | 0/0/0 | 1 | 0/3/0 | 4/4/0 |
| `/cerez-politikasi` | 0 | 0 | 5/3/8 | 5/0/2 | 0/0/0 | 1 | 0/3/0 | 4/4/0 |
| `/kullanim-kosullari` | 0 | 0 | 5/3/8 | 5/0/2 | 0/0/0 | 1 | 0/3/0 | 4/4/0 |
| `/gizlilik` | 0 | 0 | 5/3/8 | 5/0/2 | 0/0/0 | 1 | 0/3/0 | 4/4/0 |
| `/veri-sahibi-basvuru-formu` | 0 | 0 | 5/3/8 | 5/0/2 | 0/0/0 | 1 | 0/3/0 | 4/4/0 |

Ana sayfa satırı yalnız sarmalayıcıyı (`n1-site-wix-v658.js`) sayar; video modülü (`n1-video-m5-v13.js`), m5 yapımı ve ortak modüller ayrı dosyalardır.

## 6. BFCache / yaşam döngüsü riskleri (canlı)

| Sayfa | Risk | V1.4 |
|---|---|---|
| `/` | pagehide’da video kaynağı bırakılmıyor (canlı) | video modülü v14 bırakır/geri yükler (mobil) |
| `/kisaca-biz` | CSS filter ×4 (WebKit filter→none geçişi V1.3’te düzeltildi; yeni filtre eklenmedi) | değişmedi (gerekçe: RESOURCE_LIFECYCLE §4) |
| `/kisaca-biz` | backdrop-filter ×4 | değişmedi (gerekçe: RESOURCE_LIFECYCLE §4) |
| `/kreatif-produksiyon` | pagehide’da video kaynağı bırakılmıyor (canlı) | `n1Life` pagehide’da bırakır, pageshow’da geri yükler |
| `/kreatif-produksiyon` | CSS filter ×6 (WebKit filter→none geçişi V1.3’te düzeltildi; yeni filtre eklenmedi) | değişmedi (gerekçe: RESOURCE_LIFECYCLE §4) |
| `/kreatif-produksiyon` | backdrop-filter ×4 | değişmedi (gerekçe: RESOURCE_LIFECYCLE §4) |
| `/e-ticaret-yonetimi` | pagehide’da video kaynağı bırakılmıyor (canlı) | `n1Life` pagehide’da bırakır, pageshow’da geri yükler |
| `/e-ticaret-yonetimi` | setInterval ×1 | değişmedi (gerekçe: RESOURCE_LIFECYCLE §4) |
| `/e-ticaret-yonetimi` | CSS filter ×9 (WebKit filter→none geçişi V1.3’te düzeltildi; yeni filtre eklenmedi) | değişmedi (gerekçe: RESOURCE_LIFECYCLE §4) |
| `/e-ticaret-yonetimi` | backdrop-filter ×6 | değişmedi (gerekçe: RESOURCE_LIFECYCLE §4) |
| `/sosyal-medya` | pagehide’da video kaynağı bırakılmıyor (canlı) | `n1Life` pagehide’da bırakır, pageshow’da geri yükler |
| `/sosyal-medya` | CSS filter ×6 (WebKit filter→none geçişi V1.3’te düzeltildi; yeni filtre eklenmedi) | değişmedi (gerekçe: RESOURCE_LIFECYCLE §4) |
| `/sosyal-medya` | backdrop-filter ×6 | değişmedi (gerekçe: RESOURCE_LIFECYCLE §4) |
| `/reklam-yonetimi` | pagehide’da video kaynağı bırakılmıyor (canlı) | `n1Life` pagehide’da bırakır, pageshow’da geri yükler |
| `/reklam-yonetimi` | CSS filter ×11 (WebKit filter→none geçişi V1.3’te düzeltildi; yeni filtre eklenmedi) | değişmedi (gerekçe: RESOURCE_LIFECYCLE §4) |
| `/reklam-yonetimi` | backdrop-filter ×6 | değişmedi (gerekçe: RESOURCE_LIFECYCLE §4) |
| `/ui-ux-tasarim` | pagehide’da video kaynağı bırakılmıyor (canlı) | `n1Life` pagehide’da bırakır, pageshow’da geri yükler |
| `/ui-ux-tasarim` | CSS filter ×7 (WebKit filter→none geçişi V1.3’te düzeltildi; yeni filtre eklenmedi) | değişmedi (gerekçe: RESOURCE_LIFECYCLE §4) |
| `/ui-ux-tasarim` | backdrop-filter ×4 | değişmedi (gerekçe: RESOURCE_LIFECYCLE §4) |
| `/yapay-zeka` | pagehide’da video kaynağı bırakılmıyor (canlı) | `n1Life` pagehide’da bırakır, pageshow’da geri yükler |
| `/yapay-zeka` | CSS filter ×8 (WebKit filter→none geçişi V1.3’te düzeltildi; yeni filtre eklenmedi) | değişmedi (gerekçe: RESOURCE_LIFECYCLE §4) |
| `/yapay-zeka` | backdrop-filter ×4 | değişmedi (gerekçe: RESOURCE_LIFECYCLE §4) |
| `/uygulama-gelistirme` | pagehide’da video kaynağı bırakılmıyor (canlı) | `n1Life` pagehide’da bırakır, pageshow’da geri yükler |
| `/uygulama-gelistirme` | CSS filter ×5 (WebKit filter→none geçişi V1.3’te düzeltildi; yeni filtre eklenmedi) | değişmedi (gerekçe: RESOURCE_LIFECYCLE §4) |
| `/uygulama-gelistirme` | backdrop-filter ×4 | değişmedi (gerekçe: RESOURCE_LIFECYCLE §4) |
| `/markalar` | CSS filter ×5 (WebKit filter→none geçişi V1.3’te düzeltildi; yeni filtre eklenmedi) | değişmedi (gerekçe: RESOURCE_LIFECYCLE §4) |
| `/markalar` | backdrop-filter ×4 | değişmedi (gerekçe: RESOURCE_LIFECYCLE §4) |
| `/kvkk-aydinlatma-metni` | CSS filter ×4 (WebKit filter→none geçişi V1.3’te düzeltildi; yeni filtre eklenmedi) | değişmedi (gerekçe: RESOURCE_LIFECYCLE §4) |
| `/kvkk-aydinlatma-metni` | backdrop-filter ×4 | değişmedi (gerekçe: RESOURCE_LIFECYCLE §4) |
| `/cerez-politikasi` | CSS filter ×4 (WebKit filter→none geçişi V1.3’te düzeltildi; yeni filtre eklenmedi) | değişmedi (gerekçe: RESOURCE_LIFECYCLE §4) |
| `/cerez-politikasi` | backdrop-filter ×4 | değişmedi (gerekçe: RESOURCE_LIFECYCLE §4) |
| `/kullanim-kosullari` | CSS filter ×4 (WebKit filter→none geçişi V1.3’te düzeltildi; yeni filtre eklenmedi) | değişmedi (gerekçe: RESOURCE_LIFECYCLE §4) |
| `/kullanim-kosullari` | backdrop-filter ×4 | değişmedi (gerekçe: RESOURCE_LIFECYCLE §4) |
| `/gizlilik` | CSS filter ×4 (WebKit filter→none geçişi V1.3’te düzeltildi; yeni filtre eklenmedi) | değişmedi (gerekçe: RESOURCE_LIFECYCLE §4) |
| `/gizlilik` | backdrop-filter ×4 | değişmedi (gerekçe: RESOURCE_LIFECYCLE §4) |
| `/veri-sahibi-basvuru-formu` | CSS filter ×4 (WebKit filter→none geçişi V1.3’te düzeltildi; yeni filtre eklenmedi) | değişmedi (gerekçe: RESOURCE_LIFECYCLE §4) |
| `/veri-sahibi-basvuru-formu` | backdrop-filter ×4 | değişmedi (gerekçe: RESOURCE_LIFECYCLE §4) |
| `/cgi-reklamlar` | Wix yerel video (kod kapsamı dışında, Wix Editor’de yönetilir) | değişmedi (gerekçe: RESOURCE_LIFECYCLE §4) |
| `/marka-danismanligi` | Wix yerel video (kod kapsamı dışında, Wix Editor’de yönetilir) | değişmedi (gerekçe: RESOURCE_LIFECYCLE §4) |
| `/web-tasarim-ve-yazilim-programlama` | Wix yerel video (kod kapsamı dışında, Wix Editor’de yönetilir) | değişmedi (gerekçe: RESOURCE_LIFECYCLE §4) |
