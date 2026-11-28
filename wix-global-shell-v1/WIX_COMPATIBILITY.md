# WIX_COMPATIBILITY — Wix Studio uyumu ve doğrulama sınırları

| Konu | Durum | Kaynak / kanıt |
|---|---|---|
| Kurulum yöntemi | Custom Element: yalnız Server URL + Tag Name. Velo, Popup, Lightbox, sayfa kodu ve iframe mesajlaşması yok. | Bütün etiketler tek dosyada `customElements.define`. |
| Editör / Önizleme | Custom Element iframe içinde çizilir. Menü paneli kutuyla sınırlı görünebilir; bu hata değildir. | Wix Yardım Merkezi (Custom Element: editörde iframe, yayınlanmış sitede sayfa DOM'u). |
| Yayınlanmış site | Bileşen sayfanın DOM'undadır; panel `document.body`'de açılır (`position:fixed`, z-index 99990). | Wix bölüm yapısını taklit eden sayfada (sticky + `overflow:hidden` + `transform`) Chromium ve WebKit'te doğrulandı. **Gerçek Wix yayınında doğrulanmadı.** |
| 404 sayfası | Wix Studio'nun özel 404 sayfası `error404` slug'lı normal bir sayfadır; öğe eklenebilir. Durum kodu Wix'te kalır. | Wix Yardım: *Studio Editor: Creating a Custom 404 Page*. Canlıda `/error404` ve bilinmeyen adresler HTTP 404 döndürüyor (curl). **404'te Custom Element'in çizildiği canlıda doğrulanmadı.** Alternatif: DEPLOYMENT §6. |
| Genel CSS | Yok. Bütün kurallar etikete, `.n1-inner-page` / `.n1-inner-panel` sınıflarına ve `[data-n1-gs]`'e bağlı. | Kod incelemesi; Wix Forms alanı test sayfasında etkilenmedi. |
| Wix Forms | Ayrı Wix bölümünde durur; bileşenlerle çakışmaz. Menü paneli formun üstünde açılır. | Test sayfasındaki form yer tutucusu (gerçek Wix Forms değil). |
| Loader | İletişim/Akademi rotalarında loader yalnız Wix ana kabını bekler, bileşenleri beklemez. 404 rotada yok. Ek değişiklik gerekmez. | Loader v13.1 kodu (ROUTES). |
| Menü Kapanış V1.3 | Uyumlu: BFCache'te menü kapalı, bağlantıyla ayrılınca katman kalmıyor. | TEST_REPORT. |
| Wix gezinmesi (SPA) | Menü bağlantıları normal `<a href>`. Wix istemci gezinmesi ya da tam yükleme ikisi de çalışır. | Sayfa testleri: İletişim bağlantısı → /iletisim. |
| Ortak dosyalar | jsDelivr, commit SHA'ya sabit; 29 adres 200, doğru MIME, CORS `*`, içerik eşleşmesi. | CDN_VERIFICATION. |

## Doğrulanamayanlar (dürüst durum)
1. **Gerçek Wix yayını:** hiçbir değişiklik canlıya alınmadı (talimat gereği). Paneli ve footer yüksekliğini yayından sonra kontrol edin (DEPLOYMENT §9).
2. **Fiziksel cihaz:** iPhone, iPad ve Android'de test yapılmadı. Playwright WebKit iPhone Safari değildir; yalnız aynı motor ailesidir.
3. **Firefox:** test edilmedi.
4. **Dış bağlantılar:** ZEYP, Market, Hemen Tıkla ve A7 alan adlarına bu ortamdan erişilemiyor (vekil engeli). Yalnız `href`, `target` ve `rel` doğrulandı; hedef sayfaların açıldığı doğrulanmadı.
5. **Wix Forms:** gerçek form değil, yer tutucu bölümle test edildi.
