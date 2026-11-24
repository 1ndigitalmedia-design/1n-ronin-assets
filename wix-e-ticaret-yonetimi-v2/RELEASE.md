# 1N Digital Media — E-Ticaret Yönetimi V2 (7 revizyon)

**Sayfa:** `/e-ticaret-yonetimi`  
**Custom Element Tag Name:** `n1-e-ticaret-yonetimi-v2`  
**Giriş JS:** `n1-e-ticaret-yonetimi-v2.js`

**Wix Studio Server URL:** `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f388a8694a6a89b4872524a1740c5e5dc5130ad2/wix-e-ticaret-yonetimi-v2/n1-e-ticaret-yonetimi-v2.js`

## Değiştirilen 7 öğe
1. Hero video: `https://video.wixstatic.com/video/6dbf5e_3c7918f906c1478f9149099d6d398635/720p/mp4/file.mp4`
2. “Satış Bir Deneyimdir” ana görsel: `https://static.wixstatic.com/media/6dbf5e_736b08d9f4c148e4b78def3e47ecfd39~mv2.png`; tek seferlik, ekran görünürken tetiklenen ve hover ile yeniden oynatılabilen kısa GSAP gerektirmeyen CSS glitch efekti. `prefers-reduced-motion` durumunda tamamen kapalı.
3. Aynı bölümün altındaki sol görsel yerine video: `https://video.wixstatic.com/video/6dbf5e_382aee7841704e1c9e54539673ff9f63/480p/mp4/file.mp4`
4. Aynı bölümün altındaki sağ görsel: `https://static.wixstatic.com/media/6dbf5e_8ecaf4f6560a46adb6a404eb53575d3d~mv2.png`
5. İçerik/Büyüme/Performans ortadaki video: `https://video.wixstatic.com/video/6dbf5e_efaf0298818c43b19c85c0c37bdb7f4a/720p/mp4/file.mp4`
6. Üçlü alandaki sol İçerik görseli: `https://static.wixstatic.com/media/6dbf5e_568ef15bfc7e44b68318936d0c4d656f~mv2.jpg`
7. Üçlü alandaki sağ Performans görseli: `https://static.wixstatic.com/media/6dbf5e_142b71494f64426ab1f11eea90de5652~mv2.png`

## Korunan özellikler
- Onaylı Header, Footer, menü, WhatsApp ve Yukarı Çık sistemleri.
- `#080A09` / `#A8CF62` tasarım sistemi, mevcut GSAP ve ScrollTrigger animasyonları.
- Diğer sayfalar ve GitHub'daki mevcut V1 değişmedi.
- Üç video, görünürlük ve sayfa arka plan durumuna göre oynatılır/durdurulur; kullanıcı tarafından duraklatılabilir. Sadece kullanıcının ilettiği URL çözünürlükleri kullanılır.
- Telefon, tablet ve masaüstü kırılımları.

## Kontroller
- `node --check` **başarılı**.
- Sistem Chromium / Playwright ile 360, 375, 390, 430, 768, 820, 1024, 1366, 1440, 1920 px ekran genişliklerinde offline DOM/CSS testi: **0 yatay taşma**, 3 video alanı, 4 yeni görsel slotu ve doğru metin iskeleti.
- Chromium masaüstünde glitch sahneye girince aktif oluyor, 930ms sonra duruyor, hover ile yeniden tetikleniyor.
- Reduced-motion'da glitch gizli.

**Limitler:** Offline tarayıcı testinde video ve resim HTTP(S) yüklemeleri engellendi. Gerçek videoların oynatılması, CDN durumları, GSAP CDN modülleri, gerçek Wix Studio Header/Footer ve dış kapsayıcı yüksekliği test edilmedi. Wix Studio test sitesi ve canlı cihazlarda ayrıca doğrulanmalıdır.

## Wix Studio
1. `/e-ticaret-yonetimi` sayfasını açın.
2. Mevcut Custom Element'in **Server URL** adresini bu release'in commit'e sabitlenmiş yeni V2 URL'siyle değiştirin.
3. **Tag Name:** `n1-e-ticaret-yonetimi-v2`.
4. Önceki `n1-e-ticaret-yonetimi-v1` bileşenini aynı sayfada ikinci kez bırakmayın.
5. Video, görsel, glitch, responsive ve Footer testlerini tamamlayıp **Publish** ile siteyi güncelleyin.

**Önemli:** GitHub'a sürüm yüklemek Wix Studio editöründeki Custom Element Server URL alanını otomatik değiştirmez. Wix editör güncellenmeden tek başına Publish yeni sürümü canlı yapmaz.