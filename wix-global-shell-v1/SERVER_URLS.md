# SERVER_URLS — 1N birleşik yayın paketi (Kariyer V1 + Global Menü V2 + bağımsız Header/Footer)

Bütün adresler jsDelivr GitHub adresidir ve **commit SHA ile sabittir** (dal adı ya da `@latest` yok). Wix'te yalnız **Server URL** ve **Tag Name** alanları kullanılır. **Bu paket, PR #4'teki Kariyer V1 adreslerinin yerine geçer** (Kariyer V1 adreslerini kullanmayın; aynı sayfalar burada daha yeni menüyle).

## A. Bağımsız Header / Footer / WhatsApp (tek Server URL, üç Tag Name)

Server URL (üç bileşende aynı):
```
https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/n1-global-shell-v1.js
```

| Bileşen | Tag Name |
|---|---|
| Bağımsız Header | `n1-global-header-v1` |
| Bağımsız Footer | `n1-global-footer-v1` |
| WhatsApp / Yukarı Çık (isteğe bağlı) | `n1-global-floating-v1` |

## B. Kariyer sayfaları (yeni oluşturulacak; aynı Server URL, farklı Tag Name)

Server URL:
```
https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/pages/n1-career-v2.js
```

| Sayfa | URL | Tag Name |
|---|---|---|
| İnsan Kaynakları | `/insan-kaynaklari` | `n1-insan-kaynaklari-v1` |
| Açık Pozisyonlar | `/acik-pozisyonlar` | `n1-acik-pozisyonlar-v1` |
| Staj Programları | `/staj-programlari` | `n1-staj-programlari-v1` |

`/insan-kaynaklari` ve `/staj-programlari` canlıda var ama yanlış Custom Element taşıyor (Veri Sahibi Başvuru Formu). Bu iki sayfada mevcut öğenin Server URL ve Tag Name değerlerini değiştirin (DEPLOYMENT §1).

## C. Global menü nedeniyle Server URL'i değişen mevcut sayfalar

### Ana Sayfa — `/` · Tag Name `n1-site-v1`
Yeni Server URL:
```
https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/sites/home/n1-site-wix-v661.js
```
Geri dönüş (bugün canlı):
```
https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@36a24d3d5af5be5e5493598af4375f070a26b002/wix-mobile-performance-v14/home/n1-site-wix-v659.js
```

### Kreatif Prodüksiyon — `/kreatif-produksiyon` · Tag Name `n1-kreatif-produksiyon-v23`
Yeni Server URL:
```
https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/sites/pages/wix-kreatif-produksiyon-v26/n1-kreatif-produksiyon-v26.js
```
Geri dönüş (bugün canlı):
```
https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@36a24d3d5af5be5e5493598af4375f070a26b002/wix-mobile-performance-v14/pages/wix-kreatif-produksiyon-v24/n1-kreatif-produksiyon-v24.js
```

### E-Ticaret Yönetimi — `/e-ticaret-yonetimi` · Tag Name `n1-e-ticaret-yonetimi-v23`
Yeni Server URL:
```
https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/sites/pages/wix-e-ticaret-yonetimi-v27/n1-e-ticaret-yonetimi-v27.js
```
Geri dönüş (bugün canlı):
```
https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@36a24d3d5af5be5e5493598af4375f070a26b002/wix-mobile-performance-v14/pages/wix-e-ticaret-yonetimi-v25/n1-e-ticaret-yonetimi-v25.js
```

### Sosyal Medya — `/sosyal-medya` · Tag Name `n1-sosyal-medya-v27`
Yeni Server URL:
```
https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/sites/pages/wix-sosyal-medya-v30/n1-sosyal-medya-v30.js
```
Geri dönüş (bugün canlı):
```
https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@36a24d3d5af5be5e5493598af4375f070a26b002/wix-mobile-performance-v14/pages/wix-sosyal-medya-v28/n1-sosyal-medya-v28.js
```

### Reklam Yönetimi — `/reklam-yonetimi` · Tag Name `n1-reklam-yonetimi-v23`
Yeni Server URL:
```
https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/sites/pages/wix-reklam-yonetimi-v26/n1-reklam-yonetimi-v26.js
```
Geri dönüş (bugün canlı):
```
https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@36a24d3d5af5be5e5493598af4375f070a26b002/wix-mobile-performance-v14/pages/wix-reklam-yonetimi-v24/n1-reklam-yonetimi-v24.js
```

### UI/UX Tasarım — `/ui-ux-tasarim` · Tag Name `n1-uiux-tasarim-v28`
Yeni Server URL:
```
https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/sites/pages/wix-uiux-tasarim-v32/n1-uiux-tasarim-v32.js
```
Geri dönüş (bugün canlı):
```
https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@36a24d3d5af5be5e5493598af4375f070a26b002/wix-mobile-performance-v14/pages/wix-uiux-tasarim-v30/n1-uiux-tasarim-v30.js
```

### Yapay Zekâ — `/yapay-zeka` · Tag Name `n1-yapay-zeka-v2`
Yeni Server URL:
```
https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/sites/pages/wix-yapay-zeka-v5/n1-yapay-zeka-v5.js
```
Geri dönüş (bugün canlı):
```
https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@36a24d3d5af5be5e5493598af4375f070a26b002/wix-mobile-performance-v14/pages/wix-yapay-zeka-v3/n1-yapay-zeka-v3.js
```

### Uygulama Geliştirme — `/uygulama-gelistirme` · Tag Name `n1-uygulama-gelistirme-v2`
Yeni Server URL:
```
https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/sites/pages/wix-uygulama-gelistirme-v5/n1-uygulama-gelistirme-v5.js
```
Geri dönüş (bugün canlı):
```
https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@36a24d3d5af5be5e5493598af4375f070a26b002/wix-mobile-performance-v14/pages/wix-uygulama-gelistirme-v3/n1-uygulama-gelistirme-v3.js
```

### Kısaca Biz — `/kisaca-biz` · Tag Name `n1-kisaca-biz-v1`
Yeni Server URL:
```
https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/sites/pages/wix-kisaca-biz-v3/n1-kisaca-biz-v3.js
```
Geri dönüş (bugün canlı):
```
https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@39f762f63a2af58a470e9712d8ca0895d6f73f9f/wix-global-menu-v12/pages/wix-kisaca-biz-v1/n1-kisaca-biz-v1.js
```

### Markalar — `/markalar` · Tag Name `n1-markalar-v11`
Yeni Server URL:
```
https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/sites/pages/wix-markalar-v13/n1-markalar-v13.js
```
Geri dönüş (bugün canlı):
```
https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@39f762f63a2af58a470e9712d8ca0895d6f73f9f/wix-global-menu-v12/pages/wix-markalar-v1/n1-markalar-v11.js
```

### Yasal sayfalar (5 sayfa, aynı dosya)
| Sayfa | Tag Name |
|---|---|
| Gizlilik Politikası | `n1-gizlilik-politikasi-v1` |
| KVKK Aydınlatma Metni | `n1-kvkk-aydinlatma-v1` |
| Çerez Politikası | `n1-cerez-politikasi-v1` |
| Kullanım Koşulları | `n1-kullanim-kosullari-v1` |
| Veri Sahibi Başvuru Formu | `n1-veri-sahibi-basvuru-v1` |

Yeni Server URL (5 sayfada):
```
https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/sites/pages/wix-yasal-sayfalar-v3/n1-yasal-sayfalar-v3.js
```
Geri dönüş (bugün canlı):
```
https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@39f762f63a2af58a470e9712d8ca0895d6f73f9f/wix-global-menu-v12/pages/wix-yasal-sayfalar-v1/n1-yasal-sayfalar-v1.js
```

## D. Bileşenlerin kendiliğinden yüklediği ortak dosyalar (Wix'e girilmez)
| Dosya | Adres |
|---|---|
| Header v14 (global menü V2) | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@9bbcefd65becbc196baebea26600060b01af406c/wix-global-shell-v1/modules/n1-header-v14.js` |
| Site işaretlemesi v16 (menü verisi, footer, WhatsApp) | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@9bbcefd65becbc196baebea26600060b01af406c/wix-global-shell-v1/site/n1-site-markup-v16.js` |
| Platform logoları (160/320 WebP) | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@9a8e261f72975ccc5d94d33dfe9e6313b4e8f5dd/wix-global-shell-v1/assets/platforms/` |

## E. Özel kod
| Giriş | Dosya |
|---|---|
| "Özel Yükleniyor % Script" → v13.1 (Kariyer V1'den; yalnız iki rota) | `wix-career-v1/wix-custom-code/LOADER-v13.1-ozel-yukleniyor.html` |

Bağımsız Header/Footer için **özel kod değişikliği gerekmez.** Menü Kapanış V1.3, test anahtarı, GA/GTM/Meta Pixel/Google Ads girişleri değişmez; müşteri panellerindeki "Sayfa Yükleniyor Script" girişine dokunulmaz.
