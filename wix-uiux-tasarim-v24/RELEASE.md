# UI/UX Tasarım V2.4 — His Bölümü Fotoğraf Yerine Video

## Kapsam

Sayfa: `/ui-ux-tasarim`.

Değiştirilen tek alan: **TASARIM YALNIZCA GÖRÜNMEZ. HİSSEDİLİR.** başlıklı bölümde, sağındaki "Bulmak / Anlamak / Yönlenmek" sorularıyla yan yana duran sol görsel.

- Eski görsel: `IM.synth` (Tuning/Saturation ekranlı görsel), HTML ve bu kaynağın image manifest girişinden tamamen çıkarıldı.
- Yeni 720p video: `https://video.wixstatic.com/video/6dbf5e_54840d234c7d41c9b1983c73164e3050/720p/mp4/file.mp4`.
- Video için poster, img fallback veya eski görsel gösterimi yoktur. İlk video karesi hazır olmadan bölüm koyu zeminle açılır.
- Video `muted`, `playsinline`, `loop`, `preload="metadata"` kullanır.
- Görünürlükte otomatik oynatma; alan görünmezken ve tarayıcı sekmesi arka plandayken duraklatma.
- SVG oynat/duraklat butonu klavye/dokunma erişimine sahiptir.
- `prefers-reduced-motion` veya `saveData` aktifse otomatik oynatma yapılmaz, manuel oynatılabilir.
- Video yüklenemezse fotoğrafa geri dönülmez; hata metni gösterilir.
- Mevcut sol medya alanı `4/5` oranını ve GSAP clip-path açılış efektini korur. `object-fit:cover` nedeniyle videonun gerçek kadrajı Wix Studio önizlemesinde kontrol edilmelidir.

## Dokunulmayanlar

- Hero'daki fare/dokunma ile iki PNG arasındaki hareketli dairesel maske.
- V2.1/V2.3 revizyonlarından gelen altı süreç görseli.
- Netlik/Akış/Geri Bildirim, Interface Lab, diğer UX içerikleri ve GSAP.
- Onaylı Header, Footer, floating controls, ana menü ve renk `#A8CF62`.

## Wix Studio için kaynak bilgileri

- **Sayfa:** `/ui-ux-tasarim`
- **Tag Name:** `n1-uiux-tasarim-v24`
- **Server URL:** `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@341b88d725b698a1ff997ce64a0570a40272c46a/wix-uiux-tasarim-v24/n1-uiux-tasarim-v24.js`

Yayımlama:
1. Wix Studio'da `/ui-ux-tasarim` sayfasına git.
2. **Mevcut** Custom Element'i seç; V2.3 öğesinin yanına ikinci kopya ekleme.
3. **Choose Source → Server URL** alanına yeni URL'yi yaz.
4. **Tag Name** alanına `n1-uiux-tasarim-v24` yaz.
5. Masaüstü, tablet ve mobil önizlemede videoyu, oynat/duraklat butonunu, kadrajı, Hero fare efektini ve Header/Footer'ı test et.
6. Uygunsa **Publish** ile canlıya al.

## Doğrulama sınırları

- GitHub'daki V2.4 JavaScript kaynak dosyası commit üzerinden tekrar okunarak doğrulandı.
- JavaScript sözdizimi kontrolü geçti; medya bölümünün HTML'inde görsel bulunmadığı ve doğrudan video URL'sinin yer aldığı doğrulandı.
- Gerçek video CDN oynatma testi ve Wix Studio masaüstü/tablet/mobil testi yapılmadı.
- GitHub yüklemesi Wix Studio Custom Element adresini kendiliğinden değiştirmez. **Bu oturumda Wix Studio ayarı ve canlı yayın güncellenmedi.**
