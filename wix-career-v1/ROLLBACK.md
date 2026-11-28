# ROLLBACK — Kariyer V1 geri dönüş

Her satır bağımsız geri alınır: Wix Studio → sayfa → Custom Element → Ayarlar → **Server URL** = aşağıdaki adres → **Yayınla**. Tag Name ve öznitelikler zaten değişmemiştir. Adresler bugün canlıda kullanılanlardır (canlı sayfaların yüklediği betikler, 28 Kasım 2026; `tests/live-urls.js`).

## 1. Mevcut sayfalar
| Sayfa | Tag (değişmez) | Geri dönüş Server URL | Sonuç |
|---|---|---|---|
| Ana Sayfa | `n1-site-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@36a24d3d5af5be5e5493598af4375f070a26b002/wix-mobile-performance-v14/home/n1-site-wix-v659.js` | V1.4 (eski menü) |
| Kreatif Prodüksiyon | `n1-kreatif-produksiyon-v23` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@36a24d3d5af5be5e5493598af4375f070a26b002/wix-mobile-performance-v14/pages/wix-kreatif-produksiyon-v24/n1-kreatif-produksiyon-v24.js` | V1.4 (eski menü) |
| E-Ticaret Yönetimi | `n1-e-ticaret-yonetimi-v23` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@36a24d3d5af5be5e5493598af4375f070a26b002/wix-mobile-performance-v14/pages/wix-e-ticaret-yonetimi-v25/n1-e-ticaret-yonetimi-v25.js` | V1.4 (eski menü) |
| Sosyal Medya | `n1-sosyal-medya-v27` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@36a24d3d5af5be5e5493598af4375f070a26b002/wix-mobile-performance-v14/pages/wix-sosyal-medya-v28/n1-sosyal-medya-v28.js` | V1.4 (eski menü) |
| Reklam Yönetimi | `n1-reklam-yonetimi-v23` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@36a24d3d5af5be5e5493598af4375f070a26b002/wix-mobile-performance-v14/pages/wix-reklam-yonetimi-v24/n1-reklam-yonetimi-v24.js` | V1.4 (eski menü) |
| UI/UX Tasarım | `n1-uiux-tasarim-v28` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@36a24d3d5af5be5e5493598af4375f070a26b002/wix-mobile-performance-v14/pages/wix-uiux-tasarim-v30/n1-uiux-tasarim-v30.js` | V1.4 (eski menü) |
| Yapay Zekâ | `n1-yapay-zeka-v2` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@36a24d3d5af5be5e5493598af4375f070a26b002/wix-mobile-performance-v14/pages/wix-yapay-zeka-v3/n1-yapay-zeka-v3.js` | V1.4 (eski menü) |
| Uygulama Geliştirme | `n1-uygulama-gelistirme-v2` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@36a24d3d5af5be5e5493598af4375f070a26b002/wix-mobile-performance-v14/pages/wix-uygulama-gelistirme-v3/n1-uygulama-gelistirme-v3.js` | V1.4 (eski menü) |
| Kısaca Biz | `n1-kisaca-biz-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@39f762f63a2af58a470e9712d8ca0895d6f73f9f/wix-global-menu-v12/pages/wix-kisaca-biz-v1/n1-kisaca-biz-v1.js` | V1.2 (eski menü) |
| Markalar | `n1-markalar-v11` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@39f762f63a2af58a470e9712d8ca0895d6f73f9f/wix-global-menu-v12/pages/wix-markalar-v1/n1-markalar-v11.js` | V1.2 (eski menü) |
| Yasal 5 sayfa (Gizlilik Politikası, KVKK Aydınlatma Metni, Çerez Politikası, Kullanım Koşulları, Veri Sahibi Başvuru Formu) | (5 etiket) | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@39f762f63a2af58a470e9712d8ca0895d6f73f9f/wix-global-menu-v12/pages/wix-yasal-sayfalar-v1/n1-yasal-sayfalar-v1.js` | V1.2 (eski menü) |

**Bütünlük notu:** Header tek bir etikettir (`n1-header`). Menü sürümleri karışırsa (bir sayfa v12, diğeri v13) sayfalar yine çalışır. v13 eski menü verisini, v12 yeni menü verisini işleyebilir (MENU_UPDATE_REPORT §3). Yalnız menü içeriği sayfaya göre farklı görünür. Tam geri dönüşte bütün satırları birlikte geri alın.

## 2. Yeni sayfalar
- **Sayfalar:** İnsan Kaynakları, Açık Pozisyonlar, Staj Programları. Sayfa Ayarları → "Yayından kaldır" ya da sayfayı gizleyin. **Silmeyin**, yeniden açmak kolay olsun.
- **Sıra:** menü bu sayfalara işaret ettiği için önce §1'deki sayfaları geri alın.
- **301:** Wix URL Yönlendirme Yöneticisi'ndeki `/ekibimize-katil → /insan-kaynaklari` kaydını silin ya da hedefini değiştirin.

## 3. Özel kod
"Özel Yükleniyor % Script" içeriğini `wix-global-stability-v13/wix-custom-code/LOADER-v13-ozel-yukleniyor.html` (V1.3) ile değiştirin. Sayfa seçiminden 3 kariyer sayfasını çıkarın.

## 4. Daha eski geri dönüş noktaları (değişmedi)
V1.4: `wix-mobile-performance-v14/ROLLBACK.md` · V1.3: `wix-global-stability-v13/ROLLBACK.md` · V1.2: `wix-mobile-stability-v1/ROLLBACK.md` · tam kurtarma: `sitewide-mobile-fix-20261126` @ `f97db8e`.

## 5. Git
- **Dal:** `claude/happy-sagan-l6tbsc`, tabanı `mobile-performance-v14` @ `624430a`. İleri sarma yapıldı; geçmiş yeniden yazılmadı.
- **Dosyalar:** yalnız yeni `wix-career-v1/` klasörü eklendi. Hiçbir eski dosya değiştirilmedi ya da silinmedi.
- **Dokunulmayan dallar:** `main`, V1.4 dalı, kurtarma dalları.
- Force push yok.
