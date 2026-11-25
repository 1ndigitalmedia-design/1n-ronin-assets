# 1N Digital Media — Servis sayfalarında kaydırma ile sessiz video autoplay düzeltmesi

Tarih: 25 Kasım 2026.

## Durum

**7 mevcut video içeren sayfanın yeni Custom Element JS sürümü GitHub main'e kaydedildi.**

Kısaca Biz `/kisaca-biz` sayfası incelendi: `wix-kisaca-biz-v1/n1-kisaca-biz-v1.js` içinde HTML5 video veya MP4 kaynak bulunamadı. Görsel hareketleri GSAP/SVG tabanlı. Bu sayfa için yeni video uydurulmadı ve kaynak değiştirilmedi. Wix Studio'da ayrıca eklenmiş native video varsa bu JS üzerinden otomatik yönetilemez.

## Uygulanan teknik değişiklikler

- Görünürlük eşiği tipik 0.25–0.35 seviyesinden 0.08'e çekildi; büyük medya konteynerleri ve dar mobil ekranlarda da oynatma tetiklenebilir.
- İlk kurulumda video muted/defaultMuted ve playsInline olarak ayarlanır; `webkit-playsinline` mobil Safari uyumluluğu için eklendi.
- Video yalnızca ilgili oynatma fonksiyonu çağrıldığında `autoplay=true` olur; ekrana yaklaşırken önceden yüklenen kaynakların sayfa dışında istemsiz başlaması hedeflenmez.
- Video görünür olmaktan çıktığında pause ve autoplay=false uygulanır.
- Ekranda kalmaya devam eden videolara `canplay` olayında yeniden oynatma denemesi uygulanır.
- Hero videolarının otomatik oynatma için gereken dosya yüklemesi erkene alındı; diğer klipler lazy load davranışını korur.
- Sayfa özelindeki ayrı medya oynatıcıları da kapsandı: Sosyal Medya strateji videosu, Reklam Yönetimi karar sahnesi.
- Kaynak video URL'leri, metinler, görseller, site header/footer ve GSAP tasarımı değiştirilmedi.
- Kullanıcı duraklatması ile `prefers-reduced-motion` ve `saveData` tercihlerine saygı korunur.

## Wix Studio — sayfa başına tek Custom Element

Her satırdaki Server URL ve Tag Name mevcut sayfanın Custom Element kaynağına yazılmalıdır. Aynı sayfaya ikinci bir Custom Element eklemeyin.

| Sayfa | Slug | Tag Name | Kaynak | Server URL |
|---|---|---|---|---|
| Kreatif Prodüksiyon | `/kreatif-produksiyon` | `n1-kreatif-produksiyon-v23` | [GitHub source](https://github.com/1ndigitalmedia-design/1n-ronin-assets/blob/2c5634cfb9e9ad8d67898ef7874f5b84da6aeae6/wix-kreatif-produksiyon-v23/n1-kreatif-produksiyon-v23.js) | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@2c5634cfb9e9ad8d67898ef7874f5b84da6aeae6/wix-kreatif-produksiyon-v23/n1-kreatif-produksiyon-v23.js` |
| E-Ticaret Yönetimi | `/e-ticaret-yonetimi` | `n1-e-ticaret-yonetimi-v23` | [GitHub source](https://github.com/1ndigitalmedia-design/1n-ronin-assets/blob/cb5de622120fd1881afa8ca2ac05b05d57185689/wix-e-ticaret-yonetimi-v23/n1-e-ticaret-yonetimi-v23.js) | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@cb5de622120fd1881afa8ca2ac05b05d57185689/wix-e-ticaret-yonetimi-v23/n1-e-ticaret-yonetimi-v23.js` |
| Sosyal Medya | `/sosyal-medya` | `n1-sosyal-medya-v27` | [GitHub source](https://github.com/1ndigitalmedia-design/1n-ronin-assets/blob/6a1ba411cdafb0959f40d13f4375368585e29acb/wix-sosyal-medya-v27/n1-sosyal-medya-v27.js) | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@6a1ba411cdafb0959f40d13f4375368585e29acb/wix-sosyal-medya-v27/n1-sosyal-medya-v27.js` |
| Reklam Yönetimi | `/reklam-yonetimi` | `n1-reklam-yonetimi-v23` | [GitHub source](https://github.com/1ndigitalmedia-design/1n-ronin-assets/blob/e7515f38064aeeff15a0144655b80db467ee15bb/wix-reklam-yonetimi-v23/n1-reklam-yonetimi-v23.js) | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@e7515f38064aeeff15a0144655b80db467ee15bb/wix-reklam-yonetimi-v23/n1-reklam-yonetimi-v23.js` |
| UI/UX Tasarım | `/ui-ux-tasarim` | `n1-uiux-tasarim-v28` | [GitHub source](https://github.com/1ndigitalmedia-design/1n-ronin-assets/blob/c3eadb4f9c3d96aa6d1c9049e6f0fc1a687b0fff/wix-uiux-tasarim-v28/n1-uiux-tasarim-v28.js) | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@c3eadb4f9c3d96aa6d1c9049e6f0fc1a687b0fff/wix-uiux-tasarim-v28/n1-uiux-tasarim-v28.js` |
| Yapay Zekâ | `/yapay-zeka` | `n1-yapay-zeka-v2` | [GitHub source](https://github.com/1ndigitalmedia-design/1n-ronin-assets/blob/6fbb66d65ee86db0dfde33c7d3f032a740d1edb4/wix-yapay-zeka-v2/n1-yapay-zeka-v2.js) | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@6fbb66d65ee86db0dfde33c7d3f032a740d1edb4/wix-yapay-zeka-v2/n1-yapay-zeka-v2.js` |
| Uygulama Geliştirme | `/uygulama-gelistirme` | `n1-uygulama-gelistirme-v2` | [GitHub source](https://github.com/1ndigitalmedia-design/1n-ronin-assets/blob/bfee60c9b728fdd3d1461fbd35d4958d718ef28f/wix-uygulama-gelistirme-v2/n1-uygulama-gelistirme-v2.js) | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@bfee60c9b728fdd3d1461fbd35d4958d718ef28f/wix-uygulama-gelistirme-v2/n1-uygulama-gelistirme-v2.js` |

## Kabul testi (Wix Studio + canlı tarayıcı)

- Masaüstü, tablet, iPhone Safari ve Android Chrome'da videonun görünürken sessiz başladığını kontrol et.
- Video dışarı kaydırılınca durduğunu, geri dönerken kullanıcı tarafından elle durdurulmamışsa oynadığını test et.
- Bir sayfada birden fazla video aynı anda varsa otomatik oynatma çakışmasını kontrol et.
- Kullanıcının Play/Pause kontrolünü ve manuel sessiz açma tercihini kontrol et.
- Reduced Motion veya tarayıcı Veri Tasarrufu açıkken otomatik oynatmanın devre dışı kalması amaçlanan davranıştır.
- Tarayıcı veya işletim sistemi Low Power / media autoplay blokajı varsa kod her durumda otomatik oynatmayı garanti edemez.
- Hero, süreç videoları, GSAP ScrollTrigger, Header ve Footer'ın düzgün çalıştığını doğrula.
- Video alanı önce poster/kare gösteriyorsa ilk görüntü gelene kadar bu davranış kaynak tasarımına bağlı kalabilir; bu revizyonda poster kaynakları değiştirilmedi.

## Doğrulanan / doğrulanmayan

- Yedi JS dosyası GitHub'dan yeniden okundu; video kaynak mantığı ve tag değişimleri doğrulandı.
- Yedi JS dosyası JavaScript parse kontrolünden geçti.
- Gerçek cihazlarda oynatma denemesi ve Wix Studio Custom Element kaynaklarının editörden değiştirilmesi bu oturumda yapılmadı.
- Wix'in mevcut canlı sitenin Published durumda olması, yeni sürümlerin canlıda olduğu anlamına gelmez.
- GitHub'a kod yüklemek Wix Studio yayınını kendiliğinden gerçekleştirmez. Kaynakları editörde güncellemeden site Publish yapmak yeni sürümleri canlıya almaz.
