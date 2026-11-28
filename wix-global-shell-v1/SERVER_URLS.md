# SERVER_URLS — 1N Global Menü V2.2

Menünün alt bölümünde "Uygulama ve Platformlar" kartı kaldırıldı; yerine A7 Prodüksiyon kartıyla aynı tasarımda **1N Intelligence** kartı geldi. Kartlar: Başlangıca Dön · A7 Prodüksiyon · 1N Intelligence.

- Bütün adresler jsDelivr GitHub adresidir ve **commit SHA ile sabittir** (dal adı ya da `@latest` yok).
- Wix'te yalnız **Server URL** alanı değişir. **Tag Name ve öznitelikler değişmez.**
- V2.2, canlıdaki V2.1 adreslerinin (`@f661795`) yerine geçer. V2.1 adresleri geri dönüş olarak kalır.

## A. Bağımsız Header / Footer / WhatsApp (tek Server URL, üç Tag Name)

Yeni Server URL (dosya adı: `n1-global-shell-v1-2.js`):
```
https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@2a124f910dd62638eaa85c8456b8435b17c28d2a/wix-global-shell-v1/n1-global-shell-v1-2.js
```

| Bileşen | Tag Name (değişmez) |
|---|---|
| Bağımsız Header | `n1-global-header-v1` |
| Bağımsız Footer | `n1-global-footer-v1` |
| WhatsApp / Yukarı Çık (isteğe bağlı) | `n1-global-floating-v1` |

Footer ve WhatsApp kodu değişmedi: paket V2.1'e göre yalnız sürüm numarası ve header/menü verisi adreslerinde farklı. Footer v646/v636 ve WhatsApp v632 modülleri aynı adreslerden (`@d24fa37`) yüklenir.

Geri dönüş (V2.1):
```
https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/n1-global-shell-v1-1.js
```

## B. Kariyer sayfaları (aynı Server URL, farklı Tag Name)

Yeni Server URL:
```
https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@2a124f910dd62638eaa85c8456b8435b17c28d2a/wix-global-shell-v1/pages/n1-career-v4.js
```

| Sayfa | URL | Tag Name (değişmez) |
|---|---|---|
| İnsan Kaynakları | `/insan-kaynaklari` | `n1-insan-kaynaklari-v1` |
| Açık Pozisyonlar | `/acik-pozisyonlar` | `n1-acik-pozisyonlar-v1` |
| Staj Programları | `/staj-programlari` | `n1-staj-programlari-v1` |

Geri dönüş (V2.1):
```
https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/pages/n1-career-v3.js
```

## C. Mevcut sayfalar

### Ana Sayfa — `/` · Tag Name `n1-site-v1`
Yeni Server URL (V2.2):
```
https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@2a124f910dd62638eaa85c8456b8435b17c28d2a/wix-global-shell-v1/sites/home/n1-site-wix-v663.js
```
Geri dönüş (V2.1, şu an canlı):
```
https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/sites/home/n1-site-wix-v662.js
```

### Kreatif Prodüksiyon — `/kreatif-produksiyon` · Tag Name `n1-kreatif-produksiyon-v23`
Yeni Server URL (V2.2):
```
https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@2a124f910dd62638eaa85c8456b8435b17c28d2a/wix-global-shell-v1/sites/pages/wix-kreatif-produksiyon-v28/n1-kreatif-produksiyon-v28.js
```
Geri dönüş (V2.1, şu an canlı):
```
https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/sites/pages/wix-kreatif-produksiyon-v27/n1-kreatif-produksiyon-v27.js
```

### E-Ticaret Yönetimi — `/e-ticaret-yonetimi` · Tag Name `n1-e-ticaret-yonetimi-v23`
Yeni Server URL (V2.2):
```
https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@2a124f910dd62638eaa85c8456b8435b17c28d2a/wix-global-shell-v1/sites/pages/wix-e-ticaret-yonetimi-v29/n1-e-ticaret-yonetimi-v29.js
```
Geri dönüş (V2.1, şu an canlı):
```
https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/sites/pages/wix-e-ticaret-yonetimi-v28/n1-e-ticaret-yonetimi-v28.js
```

### Sosyal Medya — `/sosyal-medya` · Tag Name `n1-sosyal-medya-v27`
Yeni Server URL (V2.2):
```
https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@2a124f910dd62638eaa85c8456b8435b17c28d2a/wix-global-shell-v1/sites/pages/wix-sosyal-medya-v32/n1-sosyal-medya-v32.js
```
Geri dönüş (V2.1, şu an canlı):
```
https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/sites/pages/wix-sosyal-medya-v31/n1-sosyal-medya-v31.js
```

### Reklam Yönetimi — `/reklam-yonetimi` · Tag Name `n1-reklam-yonetimi-v23`
Yeni Server URL (V2.2):
```
https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@2a124f910dd62638eaa85c8456b8435b17c28d2a/wix-global-shell-v1/sites/pages/wix-reklam-yonetimi-v28/n1-reklam-yonetimi-v28.js
```
Geri dönüş (V2.1, şu an canlı):
```
https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/sites/pages/wix-reklam-yonetimi-v27/n1-reklam-yonetimi-v27.js
```

### UI/UX Tasarım — `/ui-ux-tasarim` · Tag Name `n1-uiux-tasarim-v28`
Yeni Server URL (V2.2):
```
https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@2a124f910dd62638eaa85c8456b8435b17c28d2a/wix-global-shell-v1/sites/pages/wix-uiux-tasarim-v34/n1-uiux-tasarim-v34.js
```
Geri dönüş (V2.1, şu an canlı):
```
https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/sites/pages/wix-uiux-tasarim-v33/n1-uiux-tasarim-v33.js
```

### Yapay Zekâ — `/yapay-zeka` · Tag Name `n1-yapay-zeka-v2`
Yeni Server URL (V2.2):
```
https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@2a124f910dd62638eaa85c8456b8435b17c28d2a/wix-global-shell-v1/sites/pages/wix-yapay-zeka-v7/n1-yapay-zeka-v7.js
```
Geri dönüş (V2.1, şu an canlı):
```
https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/sites/pages/wix-yapay-zeka-v6/n1-yapay-zeka-v6.js
```

### Uygulama Geliştirme — `/uygulama-gelistirme` · Tag Name `n1-uygulama-gelistirme-v2`
Yeni Server URL (V2.2):
```
https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@2a124f910dd62638eaa85c8456b8435b17c28d2a/wix-global-shell-v1/sites/pages/wix-uygulama-gelistirme-v7/n1-uygulama-gelistirme-v7.js
```
Geri dönüş (V2.1, şu an canlı):
```
https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/sites/pages/wix-uygulama-gelistirme-v6/n1-uygulama-gelistirme-v6.js
```

### Kısaca Biz — `/kisaca-biz` · Tag Name `n1-kisaca-biz-v1`
Yeni Server URL (V2.2):
```
https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@2a124f910dd62638eaa85c8456b8435b17c28d2a/wix-global-shell-v1/sites/pages/wix-kisaca-biz-v5/n1-kisaca-biz-v5.js
```
Geri dönüş (V2.1, şu an canlı):
```
https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/sites/pages/wix-kisaca-biz-v4/n1-kisaca-biz-v4.js
```

### Markalar — `/markalar` · Tag Name `n1-markalar-v11`
Yeni Server URL (V2.2):
```
https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@2a124f910dd62638eaa85c8456b8435b17c28d2a/wix-global-shell-v1/sites/pages/wix-markalar-v15/n1-markalar-v15.js
```
Geri dönüş (V2.1, şu an canlı):
```
https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/sites/pages/wix-markalar-v14/n1-markalar-v14.js
```

### Yasal sayfalar (5 sayfa, aynı dosya)
| Sayfa | Tag Name (değişmez) |
|---|---|
| Gizlilik Politikası | `n1-gizlilik-politikasi-v1` |
| KVKK Aydınlatma Metni | `n1-kvkk-aydinlatma-v1` |
| Çerez Politikası | `n1-cerez-politikasi-v1` |
| Kullanım Koşulları | `n1-kullanim-kosullari-v1` |
| Veri Sahibi Başvuru Formu | `n1-veri-sahibi-basvuru-v1` |

Yeni Server URL (5 sayfada):
```
https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@2a124f910dd62638eaa85c8456b8435b17c28d2a/wix-global-shell-v1/sites/pages/wix-yasal-sayfalar-v5/n1-yasal-sayfalar-v5.js
```
Geri dönüş (V2.1):
```
https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/sites/pages/wix-yasal-sayfalar-v4/n1-yasal-sayfalar-v4.js
```

## D. Bileşenlerin kendiliğinden yüklediği ortak dosyalar (Wix'e girilmez)
| Dosya | Adres |
|---|---|
| Header v16 (Global Menü V2.2) | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f7b29c2aa1005f836a6495fa3279ccc59255af6d/wix-global-shell-v1/modules/n1-header-v16.js` |
| Menü verisi v17 (Intelligence kartı; footer ve WhatsApp işaretlemesi aynı) | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f7b29c2aa1005f836a6495fa3279ccc59255af6d/wix-global-shell-v1/site/n1-site-markup-v17.js` |

## E. Özel kod
Değişiklik yok. Loader v13.1, Menü Kapanış V1.3, GA/GTM/Meta Pixel/Google Ads girişleri ve müşteri panellerindeki "Sayfa Yükleniyor Script" girişi aynı kalır.
