# DEPLOYMENT — Global Menü V2.1: Wix Studio güncellemesi (ana belge)

> **Hiçbir adım canlıya uygulanmadı** (Wix Save / Publish yok, PR birleştirilmedi). Adresler: **SERVER_URLS.md** · Geri dönüş: **ROLLBACK.md** · Rapor: **PLATFORM_REVISION_V21.md**.

## 0. Önce
1. Depo kökünde `bash wix-global-shell-v1/wix-custom-code/verify-cdn-v21.sh` komutunu çalıştırın; sonuç **TAMAM** olmalı (25 adres).
2. Bütün satırlar tek oturumda değiştirilir ve **tek Yayınla** ile canlıya alınır. Yarım kalırsa sayfaların bir kısmı eski (renkli) logoları gösterir. Bu bir hata üretmez, yalnız görünüm tutarsız kalır.

## 1. Merkezi güncelleme mümkün mü?
**Hayır, güvenli bir yolu yok.** Her sayfanın Server URL'si sabit SHA'lı bir dosyayı yükler. O dosya da header'ı ve logo stilini yine sabit SHA ile yükler. jsDelivr'da sabit SHA'lı bir adresin içeriği değişmez; merkezi bir değişiklik ancak şu yollardan biriyle yapılabilirdi:
- dal ya da `@latest` adresi,
- değişebilen bir yapılandırma dosyası,
- genel Wix Özel Kodu,
- sayfaya sonradan DOM müdahalesi.

Bunların hepsi talimatla yasak ve header yükleme yarışı ya da sürüm güvenliği riski taşıyor. Bu yüzden mevcut mimari korundu ve aşağıdaki satırların Server URL'si değişir. Ayrıntı: PLATFORM_REVISION_V21 §4.

## 2. Değiştirilecek Server URL'lerinin tamamı (tek tablo)
Yalnız **Server URL** alanı değişir. **Tag Name ve Wix'te tanımlı öznitelikler aynen kalır.** Bütün dosyalarda değişen tek şey header adresidir (v14 → v15).

| # | Sayfa | URL | Tag Name (değişmez) | Yeni Server URL (V2.1) | Şu anki Server URL (V2) = geri dönüş | Korunacak öznitelikler |
|---|---|---|---|---|---|---|
| 1 | Ana Sayfa | `/` | `n1-site-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/sites/home/n1-site-wix-v662.js` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/sites/home/n1-site-wix-v661.js` | `assets-base`, `ronin-base`, `ronin-mobile-base`, `ronin-tier`, `hero-video`, `hero-poster`, `home-base`, `sticky-fix`, `debug` (tanımlı olanlar aynen) |
| 2 | Kreatif Prodüksiyon | `/kreatif-produksiyon` | `n1-kreatif-produksiyon-v23` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/sites/pages/wix-kreatif-produksiyon-v27/n1-kreatif-produksiyon-v27.js` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/sites/pages/wix-kreatif-produksiyon-v26/n1-kreatif-produksiyon-v26.js` | `deps-base`, `cta-href` ve tanımlı diğerleri (aynen) |
| 3 | E-Ticaret Yönetimi | `/e-ticaret-yonetimi` | `n1-e-ticaret-yonetimi-v23` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/sites/pages/wix-e-ticaret-yonetimi-v28/n1-e-ticaret-yonetimi-v28.js` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/sites/pages/wix-e-ticaret-yonetimi-v27/n1-e-ticaret-yonetimi-v27.js` | `deps-base`, `cta-href` ve tanımlı diğerleri (aynen) |
| 4 | Sosyal Medya | `/sosyal-medya` | `n1-sosyal-medya-v27` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/sites/pages/wix-sosyal-medya-v31/n1-sosyal-medya-v31.js` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/sites/pages/wix-sosyal-medya-v30/n1-sosyal-medya-v30.js` | `deps-base`, `cta-href` ve tanımlı diğerleri (aynen) |
| 5 | Reklam Yönetimi | `/reklam-yonetimi` | `n1-reklam-yonetimi-v23` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/sites/pages/wix-reklam-yonetimi-v27/n1-reklam-yonetimi-v27.js` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/sites/pages/wix-reklam-yonetimi-v26/n1-reklam-yonetimi-v26.js` | `deps-base`, `cta-href` ve tanımlı diğerleri (aynen) |
| 6 | UI/UX Tasarım | `/ui-ux-tasarim` | `n1-uiux-tasarim-v28` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/sites/pages/wix-uiux-tasarim-v33/n1-uiux-tasarim-v33.js` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/sites/pages/wix-uiux-tasarim-v32/n1-uiux-tasarim-v32.js` | `deps-base`, `cta-href` ve tanımlı diğerleri (aynen) |
| 7 | Yapay Zekâ | `/yapay-zeka` | `n1-yapay-zeka-v2` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/sites/pages/wix-yapay-zeka-v6/n1-yapay-zeka-v6.js` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/sites/pages/wix-yapay-zeka-v5/n1-yapay-zeka-v5.js` | `deps-base`, `cta-href` ve tanımlı diğerleri (aynen) |
| 8 | Uygulama Geliştirme | `/uygulama-gelistirme` | `n1-uygulama-gelistirme-v2` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/sites/pages/wix-uygulama-gelistirme-v6/n1-uygulama-gelistirme-v6.js` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/sites/pages/wix-uygulama-gelistirme-v5/n1-uygulama-gelistirme-v5.js` | `deps-base`, `cta-href` ve tanımlı diğerleri (aynen) |
| 9 | Kısaca Biz | `/kisaca-biz` | `n1-kisaca-biz-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/sites/pages/wix-kisaca-biz-v4/n1-kisaca-biz-v4.js` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/sites/pages/wix-kisaca-biz-v3/n1-kisaca-biz-v3.js` | `deps-base`, `cta-href` ve tanımlı diğerleri (aynen) |
| 10 | Markalar | `/markalar` | `n1-markalar-v11` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/sites/pages/wix-markalar-v14/n1-markalar-v14.js` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/sites/pages/wix-markalar-v13/n1-markalar-v13.js` | `deps-base`, `cta-href` ve tanımlı diğerleri (aynen) |
| 11 | Gizlilik Politikası | (mevcut) | `n1-gizlilik-politikasi-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/sites/pages/wix-yasal-sayfalar-v4/n1-yasal-sayfalar-v4.js` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/sites/pages/wix-yasal-sayfalar-v3/n1-yasal-sayfalar-v3.js` | tanımlı olanlar (aynen) |
| 12 | KVKK Aydınlatma Metni | (mevcut) | `n1-kvkk-aydinlatma-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/sites/pages/wix-yasal-sayfalar-v4/n1-yasal-sayfalar-v4.js` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/sites/pages/wix-yasal-sayfalar-v3/n1-yasal-sayfalar-v3.js` | tanımlı olanlar (aynen) |
| 13 | Çerez Politikası | (mevcut) | `n1-cerez-politikasi-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/sites/pages/wix-yasal-sayfalar-v4/n1-yasal-sayfalar-v4.js` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/sites/pages/wix-yasal-sayfalar-v3/n1-yasal-sayfalar-v3.js` | tanımlı olanlar (aynen) |
| 14 | Kullanım Koşulları | (mevcut) | `n1-kullanim-kosullari-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/sites/pages/wix-yasal-sayfalar-v4/n1-yasal-sayfalar-v4.js` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/sites/pages/wix-yasal-sayfalar-v3/n1-yasal-sayfalar-v3.js` | tanımlı olanlar (aynen) |
| 15 | Veri Sahibi Başvuru Formu | (mevcut) | `n1-veri-sahibi-basvuru-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/sites/pages/wix-yasal-sayfalar-v4/n1-yasal-sayfalar-v4.js` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/sites/pages/wix-yasal-sayfalar-v3/n1-yasal-sayfalar-v3.js` | tanımlı olanlar (aynen) |
| 16 | İnsan Kaynakları | `/insan-kaynaklari` | `n1-insan-kaynaklari-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/pages/n1-career-v3.js` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/pages/n1-career-v2.js` | yok |
| 17 | Açık Pozisyonlar | `/acik-pozisyonlar` | `n1-acik-pozisyonlar-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/pages/n1-career-v3.js` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/pages/n1-career-v2.js` | yok |
| 18 | Staj Programları | `/staj-programlari` | `n1-staj-programlari-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/pages/n1-career-v3.js` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/pages/n1-career-v2.js` | yok |
| 19 | İletişim (yalnız bağımsız bileşen kurulduysa) | `/iletisim` | `n1-global-header-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/n1-global-shell-v1-1.js` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/n1-global-shell-v1.js` | yok |
| 20 | İletişim (yalnız bağımsız bileşen kurulduysa) | `/iletisim` | `n1-global-footer-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/n1-global-shell-v1-1.js` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/n1-global-shell-v1.js` | yok |
| 21 | İletişim (yalnız bağımsız bileşen kurulduysa) | `/iletisim` | `n1-global-floating-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/n1-global-shell-v1-1.js` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/n1-global-shell-v1.js` | yok |
| 22 | Akademi (yalnız bağımsız bileşen kurulduysa) | `/reklam-ajansi` | `n1-global-header-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/n1-global-shell-v1-1.js` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/n1-global-shell-v1.js` | yok |
| 23 | Akademi (yalnız bağımsız bileşen kurulduysa) | `/reklam-ajansi` | `n1-global-footer-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/n1-global-shell-v1-1.js` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/n1-global-shell-v1.js` | yok |
| 24 | Akademi (yalnız bağımsız bileşen kurulduysa) | `/reklam-ajansi` | `n1-global-floating-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/n1-global-shell-v1-1.js` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/n1-global-shell-v1.js` | yok |
| 25 | Error 404 (yalnız bağımsız bileşen kurulduysa) | `error404` | `n1-global-header-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/n1-global-shell-v1-1.js` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/n1-global-shell-v1.js` | yok |
| 26 | Error 404 (yalnız bağımsız bileşen kurulduysa) | `error404` | `n1-global-footer-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/n1-global-shell-v1-1.js` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/n1-global-shell-v1.js` | yok |
| 27 | Error 404 (yalnız bağımsız bileşen kurulduysa) | `error404` | `n1-global-floating-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/n1-global-shell-v1-1.js` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/n1-global-shell-v1.js` | yok |

Satır 1–18, uyguladığınız 18 sayfadır (ana sayfa, 7 hizmet, Kısaca Biz, Markalar, 5 yasal, 3 kariyer). İletişim, Akademi ve 404'e bağımsız Header/Footer/WhatsApp eklediyseniz, o öğelerin Server URL'si de aynı yeni pakete geçer; eklemediyseniz §3'teki kurulumda doğrudan yeni adresi kullanın.

## 3. Bağımsız HEADER — `n1-global-header-v1`
| Ayar | Değer |
|---|---|
| Server URL | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/n1-global-shell-v1-1.js` |
| Tag Name | `n1-global-header-v1` |
| Gerekli öznitelik | yok |
| Masaüstü (> 1024 px) | genişlik %100, yükseklik **88 px** |
| Tablet (768–1024 px) | genişlik %100, yükseklik **72 px** |
| Mobil (≤ 767 px) | genişlik %100, yükseklik **64 px** |
| Wix yerleşimi | sayfanın en üst bölümü, tam genişlik, iç ve dış boşluk 0; içerik genişliği (%90) bileşenin içinde |
| Sabitleme | isteğe bağlı (Wix "Freeze"); bileşen kendisi `position:fixed` kullanmaz |
| Overflow / katman | ek ayar yok; menü paneli `document.body`'de açılır (z-index 99990) |
| Not | Editör ve Önizleme'de Custom Element iframe içinde çizilir; menü kutuya sıkışmış görünebilir. Menüyü yayınlanmış sitede kontrol edin. |

## 4. Bağımsız FOOTER — `n1-global-footer-v1` (V2 ile birebir aynı)
| Ayar | Değer |
|---|---|
| Server URL | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/n1-global-shell-v1-1.js` |
| Tag Name | `n1-global-footer-v1` |
| Masaüstü 1920 / 1440 px | genişlik %100 · **611 / 578 px** |
| Tablet 1024 / 820 px | genişlik %100 · **821 / 791 px** |
| Mobil 390 / 375 / 320 px | genişlik %100 · **867 / 865 / 856 px** |
| Wix yerleşimi | son bölüm; iç ve dış boşluk 0; öğe yüksekliği **Auto** (önerilen); Wix footer'ı gizli |

> **Düzeltme:** V2 belgesindeki tablet/mobil footer yükseklikleri (1024: 718, 820: 784, 375: 844 px), tablet/mobil partner görseli tembel yüklenmeden ölçülmüştü. Yukarıdaki değerler görsel yüklendikten sonraki ölçümdür. V2 ve V2.1 footer'ı aynı koşulda birebir aynı çıktı (`qa/v21/footer-ab-*.json`). Yükseklik **Auto** kullanıyorsanız işlem gerekmez; elle yükseklik girdiyseniz bu değerleri kullanın.

## 5. WhatsApp / Yukarı Çık (isteğe bağlı) — `n1-global-floating-v1`
Aynı Server URL (`https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/n1-global-shell-v1-1.js`). Davranış değişmedi.

## 6. Sayfa kurulum sıraları (değişmedi)
- **İletişim `/iletisim`:** Wix header/footer gizli → Bölüm 1 Header CE → Bölüm 2 İletişim HTML V4 (değişmez; HTML Embed yüksekliği içeriğe göre) → Bölüm 3 Wix Forms → Bölüm 4 Footer CE (+ isteğe bağlı WhatsApp).
- **Akademi `/reklam-ajansi`:** içerik değişmez. En üste Header CE, en alta Footer CE. Menüde Akademi aktif görünür.
- **Error 404 (slug `error404`):** en üste Header CE, en alta Footer CE. Durum kodu Wix'te kalır, yönlendirme yok. Yayından sonra bilinmeyen bir adresle kontrol edin; CE görünmezse Wix header/footer'ını geri açın.

## 7. Kariyer sayfaları (canlı tespit, 28 Kasım 2026)
`/insan-kaynaklari` ve `/staj-programlari` daha önce yayında "Veri Sahibi Başvuru Formu" gösteriyordu. Kariyer Server URL'sini ve Tag Name'ini uyguladıysanız bu sorun giderilmiştir; V2.1'de yalnız Server URL `n1-career-v3.js` olur. SEO ayarları ve 301 kuralı değişmez.

## 8. Özel kod
Değişiklik yok. Loader v13.1 aynen kalır.

## 9. Yayından sonra 2 dakikalık kontrol
1. Kurumsal bir sayfada MENU'yü açın. "Uygulama ve Platformlar" bölümünde 4 küçük koyu kutu, tek renkli gri logolar olmalı. Masaüstünde fareyle üzerine gelince logo yeşile döner.
2. Telefonda: 4 logo tek satırda; dokununca doğru siteye gider (ZEYP, Market, Hemen Tıkla yeni sekmede; Intelligence aynı sekmede).
3. İletişim / Akademi / 404'te bağımsız header menüsünde aynı görünüm olmalı; footer değişmemiş olmalı.
