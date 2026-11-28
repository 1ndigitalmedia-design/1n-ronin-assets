# ROLLBACK — birleşik paket geri dönüşü

Her satır bağımsızdır. Wix Studio → sayfa → Custom Element → Server URL = aşağıdaki adres → Yayınla. Tag Name ve öznitelikler zaten değişmedi. Adresler 28 Kasım 2026'da canlıda kullanılanlardır (V1.4 yayında).

## 1. Mevcut sayfalar (menü)
| Sayfa | Tag | Geri dönüş Server URL |
|---|---|---|
| Ana Sayfa | `n1-site-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@36a24d3d5af5be5e5493598af4375f070a26b002/wix-mobile-performance-v14/home/n1-site-wix-v659.js` |
| Kreatif Prodüksiyon | `n1-kreatif-produksiyon-v23` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@36a24d3d5af5be5e5493598af4375f070a26b002/wix-mobile-performance-v14/pages/wix-kreatif-produksiyon-v24/n1-kreatif-produksiyon-v24.js` |
| E-Ticaret Yönetimi | `n1-e-ticaret-yonetimi-v23` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@36a24d3d5af5be5e5493598af4375f070a26b002/wix-mobile-performance-v14/pages/wix-e-ticaret-yonetimi-v25/n1-e-ticaret-yonetimi-v25.js` |
| Sosyal Medya | `n1-sosyal-medya-v27` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@36a24d3d5af5be5e5493598af4375f070a26b002/wix-mobile-performance-v14/pages/wix-sosyal-medya-v28/n1-sosyal-medya-v28.js` |
| Reklam Yönetimi | `n1-reklam-yonetimi-v23` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@36a24d3d5af5be5e5493598af4375f070a26b002/wix-mobile-performance-v14/pages/wix-reklam-yonetimi-v24/n1-reklam-yonetimi-v24.js` |
| UI/UX Tasarım | `n1-uiux-tasarim-v28` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@36a24d3d5af5be5e5493598af4375f070a26b002/wix-mobile-performance-v14/pages/wix-uiux-tasarim-v30/n1-uiux-tasarim-v30.js` |
| Yapay Zekâ | `n1-yapay-zeka-v2` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@36a24d3d5af5be5e5493598af4375f070a26b002/wix-mobile-performance-v14/pages/wix-yapay-zeka-v3/n1-yapay-zeka-v3.js` |
| Uygulama Geliştirme | `n1-uygulama-gelistirme-v2` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@36a24d3d5af5be5e5493598af4375f070a26b002/wix-mobile-performance-v14/pages/wix-uygulama-gelistirme-v3/n1-uygulama-gelistirme-v3.js` |
| Kısaca Biz | `n1-kisaca-biz-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@39f762f63a2af58a470e9712d8ca0895d6f73f9f/wix-global-menu-v12/pages/wix-kisaca-biz-v1/n1-kisaca-biz-v1.js` |
| Markalar | `n1-markalar-v11` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@39f762f63a2af58a470e9712d8ca0895d6f73f9f/wix-global-menu-v12/pages/wix-markalar-v1/n1-markalar-v11.js` |
| Yasal 5 sayfa | (5 etiket) | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@39f762f63a2af58a470e9712d8ca0895d6f73f9f/wix-global-menu-v12/pages/wix-yasal-sayfalar-v1/n1-yasal-sayfalar-v1.js` |

Header tek etikettir (`n1-header`); sürümler karışırsa sayfalar çalışmaya devam eder (eski header yeni menü verisini, yeni header eski veriyi işler), yalnız menü içeriği sayfaya göre farklı görünür. Tam geri dönüşte bütün satırları birlikte geri alın.

## 2. Bağımsız Header/Footer (İletişim, Akademi, 404)
Custom Element bölümlerini silin ve sayfa ayarlarında Wix'in genel header/footer'ını yeniden açın (bugünkü hâl). Başka adres yoktur.

## 3. Kariyer sayfaları
Açık Pozisyonlar → Yayından kaldır (silmeyin). İnsan Kaynakları ve Staj Programları kurulumdan önce canlıdaydı (yanlış içerikle). Onları yayından kaldırın ya da bugünkü değerlere dönün: Server URL `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@39f762f63a2af58a470e9712d8ca0895d6f73f9f/wix-global-menu-v12/pages/wix-yasal-sayfalar-v1/n1-yasal-sayfalar-v1.js`, Tag Name `n1-veri-sahibi-basvuru-v1`. Bugünkü hâl de hatalı olduğu için yayından kaldırmak önerilir. Önce §1'i geri alın (menü bu sayfalara işaret eder). 301 kaydını silin.

## 4. Loader
"Özel Yükleniyor % Script" → `wix-global-stability-v13/wix-custom-code/LOADER-v13-ozel-yukleniyor.html`; sayfa seçiminden kariyer sayfalarını çıkarın.

## 5. Önceki paketler (silinmedi)
Kariyer V1: `wix-career-v1/ROLLBACK.md` · V1.4: `wix-mobile-performance-v14/ROLLBACK.md` · V1.3: `wix-global-stability-v13/ROLLBACK.md` · tam kurtarma: `sitewide-mobile-fix-20261126` @ `f97db8e`.

## 6. Git
Dal `claude/happy-sagan-l6tbsc` (Kariyer V1 üzerine). Yalnız `wix-global-shell-v1/` eklendi; önceki klasörler, dallar ve `main` değişmedi; force push yok.
