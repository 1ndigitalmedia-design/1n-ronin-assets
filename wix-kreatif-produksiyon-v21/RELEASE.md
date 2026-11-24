# 1N Digital Media — Kreatif Prodüksiyon V2.1

## Release
- Sayfa: `/kreatif-produksiyon`
- Wix Studio Custom Element Tag Name: `n1-kreatif-produksiyon-v21`
- Server URL: `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@2926dfca4cd03f63f7769b58ebf278224a9f1b39/wix-kreatif-produksiyon-v21/n1-kreatif-produksiyon-v21.js`
- GitHub: `main`; önceki V2 dosyası silinmedi veya üzerine yazılmadı.

## Bu sürümün değişiklikleri
- Hero video: `https://video.wixstatic.com/video/6dbf5e_8388dde9e33c490594eb19d4bbcf4eee/720p/mp4/file.mp4`.
- 'Fikir' bölümü yeni metin + açık liste + çerçevesiz SVG kompozisyonuyla yeniden düzenlendi.
- Hero yüklenirken önceki videoya ait statik poster gizlendi; 1N slate görünür.
- Hero süre göstergesi `loadedmetadata` olayında gerçek video süresine geçer; monitörün zaman çizelgesi önceki filmde kalır.
- Aynı sayfanın altındaki kurgu monitörü mevcut orijinal video bağlantısını kullanmaya devam eder (bölüm/ritim verileri korunur).
- Vurgu rengi `#A8CF62`. Mevcut Header, Footer, GSAP ve responsive kurallar korundu.

## Wix Studio'da yayına alma
1. Wix Studio editöründe `/kreatif-produksiyon` sayfasını açın.
2. Mevcut Kreatif Prodüksiyon Custom Element'i seçin.
3. **Choose Source → Server URL** alanında önceki V2 adresini yukarıdaki V2.1 adresiyle değiştirin.
4. **Tag Name** değerini `n1-kreatif-produksiyon-v21` olarak güncelleyin.
5. Eski V2 Custom Element'ini ikinci bir öğe olarak bırakmayın; bir Header/Footer/WhatsApp seti görünmelidir.
6. 390 px mobil, 820 px tablet ve masaüstünde video başlatma, Fikir bölümü, alt monitör ve Footer yüksekliklerini kontrol edin.
7. **Publish** ile kaydedilmiş Wix Studio değişikliklerini yayınlayın.

### Doğrulama sınırı
GitHub dosyası ve JavaScript sözdizimi doğrulandı. Wix Studio görsel editöründe kaynak değiştirme, gerçek cihaz görüntü testi ve canlı yayına alma bu GitHub işlemiyle otomatik gerçekleşmez. Kod yayımlandıktan sonra ayrıca test edilmelidir.

Video bağlantısı Wix CDN adresi olarak kullanıcı tarafından sağlandı; yeni videonun süresi ve gerçek oynatımı dış ağ kısıtı nedeniyle bağımsız olarak doğrulanamadı.
