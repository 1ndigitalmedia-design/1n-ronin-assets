# 1N Digital Media — 16 İç Sayfa / Wix Studio Kurulum

**Sürüm:** v1 · **Yayın öncesi durum:** GitHub kodları hazır; Wix Studio Custom Element kurulumu ve canlı test gereklidir.

Bu paket mevcut **Ana Sayfa v6.47**, **Stüdyo Hikâyesi v10** ve **Yaratıcı Bakışımız v2** dosyalarını değiştirmez.
Ortak runtime: `modules/n1-inner-pages-runtime-v1.js` (sayfa dosyaları tarafından otomatik yüklenir). Başka bir modülü elle eklemeyin.

## Ayrı Sunucu Kaynak Dosyaları

| Sayfa | URL / Slug | Custom Element Tag | Server URL |
| --- | --- | --- | --- |
| Çalışma Ritmimiz | `/calisma-ritmimiz` | `n1-ritim-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@4d57afcb068489b39fc47d3443140841d639b0b1/wix-ic-sayfalar-v1/pages/n1-calisma-ritmimiz-v1.js` |
| Kreatif Stüdyo | `/kreatif-studyo` | `n1-kreatif-studyo-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@4d57afcb068489b39fc47d3443140841d639b0b1/wix-ic-sayfalar-v1/pages/n1-kreatif-studyo-v1.js` |
| Marka Deneyimi | `/marka-deneyimi` | `n1-marka-deneyimi-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@4d57afcb068489b39fc47d3443140841d639b0b1/wix-ic-sayfalar-v1/pages/n1-marka-deneyimi-v1.js` |
| Dijital Performans | `/dijital-performans` | `n1-dijital-performans-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@4d57afcb068489b39fc47d3443140841d639b0b1/wix-ic-sayfalar-v1/pages/n1-dijital-performans-v1.js` |
| Sosyal Medya & İçerik | `/sosyal-medya-icerik` | `n1-sosyal-icerik-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@4d57afcb068489b39fc47d3443140841d639b0b1/wix-ic-sayfalar-v1/pages/n1-sosyal-medya-icerik-v1.js` |
| Web & E-Ticaret | `/web-e-ticaret` | `n1-web-ticaret-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@4d57afcb068489b39fc47d3443140841d639b0b1/wix-ic-sayfalar-v1/pages/n1-web-e-ticaret-v1.js` |
| Yapay Zekâ & İnovasyon | `/yapay-zeka-inovasyon` | `n1-ai-inovasyon-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@4d57afcb068489b39fc47d3443140841d639b0b1/wix-ic-sayfalar-v1/pages/n1-yapay-zeka-inovasyon-v1.js` |
| Workshops | `/workshops` | `n1-workshops-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@4d57afcb068489b39fc47d3443140841d639b0b1/wix-ic-sayfalar-v1/pages/n1-workshops-v1.js` |
| İçgörüler | `/icgoruler` | `n1-icgoruler-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@4d57afcb068489b39fc47d3443140841d639b0b1/wix-ic-sayfalar-v1/pages/n1-icgoruler-v1.js` |
| Kreatif Prodüksiyon | `/kreatif-produksiyon` | `n1-kreatif-produksiyon-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@4d57afcb068489b39fc47d3443140841d639b0b1/wix-ic-sayfalar-v1/pages/n1-kreatif-produksiyon-v1.js` |
| E-Ticaret Yönetimi | `/e-ticaret-yonetimi` | `n1-eticaret-yonetimi-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@4d57afcb068489b39fc47d3443140841d639b0b1/wix-ic-sayfalar-v1/pages/n1-e-ticaret-yonetimi-v1.js` |
| Sosyal Medya | `/sosyal-medya` | `n1-sosyal-medya-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@4d57afcb068489b39fc47d3443140841d639b0b1/wix-ic-sayfalar-v1/pages/n1-sosyal-medya-v1.js` |
| Reklam Yönetimi | `/reklam-yonetimi` | `n1-reklam-yonetimi-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@4d57afcb068489b39fc47d3443140841d639b0b1/wix-ic-sayfalar-v1/pages/n1-reklam-yonetimi-v1.js` |
| UI-UX Tasarım | `/ui-ux-tasarim` | `n1-uiux-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@4d57afcb068489b39fc47d3443140841d639b0b1/wix-ic-sayfalar-v1/pages/n1-ui-ux-tasarim-v1.js` |
| AI / Yapay Zekâ | `/yapay-zeka` | `n1-yapay-zeka-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@4d57afcb068489b39fc47d3443140841d639b0b1/wix-ic-sayfalar-v1/pages/n1-yapay-zeka-v1.js` |
| Uygulama Geliştirme | `/uygulama-gelistirme` | `n1-uygulama-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@4d57afcb068489b39fc47d3443140841d639b0b1/wix-ic-sayfalar-v1/pages/n1-uygulama-gelistirme-v1.js` |

## Wix Studio kurulumu

1. Wix Studio'da ilgili slug ile **normal bir site sayfası** oluşturun veya var olan sayfayı açın.
2. **Add Elements → Embed & Social → Custom Element** üzerinden bir element ekleyin.
3. **Choose Source → Server URL** bölümüne tablodaki **o sayfanın URL'sini** yapıştırın.
4. **Tag Name** alanına aynı satırdaki `n1-...-v1` değerini girin.
5. Custom Element'i tam genişliğe uzatıp, kapsayıcı bölümün yüksekliğini içeriği kesmeyecek biçimde ayarlayın. Başka bir sayfanın Custom Element kodunu kullanmayın.
6. Mevcut Wix üst/alt alanları ayrıca açıksa sayfa için çifte header/footer oluşturmayın.
7. Önce Test Site üzerinde 360, 375, 768, 820 ve 1440 piksel genişliklerinde kontrol edin. Sonra Publish yapın.

## Tasarım ve icon standardı

- Tüm dekoratif/yön okları ve yüzen WhatsApp/Yukarı Çık ikonları **inline SVG** kullanır; Unicode ok veya emoji yoktur.
- 16 sayfanın her birinin kendi hero görsel sistemi, sloganı, çalışma kapsamı, üç ilkesi, süreç akışı ve CTA'sı vardır.
- Shared Header/Footer/route haritası pinlenmiş onaylı modüllerden alınır. Yeni GSAP veya Lenis kopyası eklenmez.
- Animasyonlar CSS ile çalışır; reduced-motion tercihi desteklenir.
- İçerikler kreatif strateji taslaklarıdır; marka özelinde gerçek referanslar, müşteri sonuçları veya sayısal başarı iddiaları üretilmemiştir.

## Kontrol listesi

- [ ] 16 Wix sayfası var, her sayfanın URL slug'ı doğru
- [ ] Her sayfada yalnızca o sayfaya ait Custom Element ve doğru tag kullanılmış
- [ ] Sayfa yüksekliği yeterli; mobilde altta geniş boşluk ya da kesilme yok
- [ ] Header/MENU açılıyor, footer ve linkler doğru
- [ ] Mobil ve tablette bütün oklar SVG, emoji görünümü yok
- [ ] WhatsApp ve Yukarı Çık butonları erişilebilir ve görünür
- [ ] Yükleyici başka bir sayfa loader'ıyla çakışmıyor
- [ ] Test Site onayı ve ardından canlı yayın

**Not:** GitHub'a yükleme, Wix Studio görsel editöründe Custom Element'in otomatik olarak eklenmesi veya Wix'in canlı yayınlanması anlamına gelmez.
