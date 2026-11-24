# Reklam Yönetimi V2.1 — Analiz Paneli Görseli Yerine 1080p Video

## Güncelleme kapsamı

- Sayfa: `/reklam-yonetimi`
- Bölüm: **VERİYİ OKUMAK YETMEZ. KARARA DÖNÜŞTÜRMEK GEREKİR.**
- Değişen öğe: Analitik panel fotoğrafı, `.ry-dec__fig .ry-dec__frame`
- Yeni video: `https://video.wixstatic.com/video/6dbf5e_3855bf1db1384a9c961782c650b3686d/1080p/mp4/file.mp4`
- Sadece sağlanan **1080p** kaynak kullanılır. Doğrulanmamış 720p/480p kaynak üretilmez.
- Eski analitik fotoğraf, video başlamadan önce ve yükleme hatasında yedek görseldir.
- Alanın `21/9` masaüstü, `16/9` tablet ve `4/3` mobil CSS oranları korunur. Video `object-fit: cover` ile kırpılabilir; gerçek kadraj Wix önizlemesinde denetlenmeli.
- GSAP ile ekranın bulanıktan netleştiği geçiş artık medya kapsayıcısına uygulanır.
- Video sessiz, `playsinline`, döngülü ve görünüre girdiğinde otomatik oynar; sayfa/alan görünmezse durur.
- SVG oynat/duraklat kontrolü eklenmiştir.
- `prefers-reduced-motion` veya veri tasarrufu etkinse otomatik oynatılmaz; kullanıcı manuel başlatabilir.
- Yeni sürümde ayrı etiket ve `STYLE_ID=n1-ry21-style` vardır; V2'nin CSS'i ve dosyaları değiştirilmedi.

## Korunanlar

- Hero ve manifesto videosu: `d0b5ab077fad434aa46a37dca1aa10b8`
- Performans sistemi, kreatif karşılaştırma, Google/Meta ve tüm metinler
- GSAP/ScrollTrigger, mevcut Header/Footer/menü/WhatsApp/yukarı çık
- `#080A09` ana renk ve `#A8CF62` vurgu rengi

## Wix Studio bilgileri

- **Sayfa:** `/reklam-yonetimi`
- **Server URL:** `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@e639337a1a5ab8e8f8894723525743762fc5e2a2/wix-reklam-yonetimi-v21/n1-reklam-yonetimi-v21.js`
- **Tag Name:** `n1-reklam-yonetimi-v21`

### Yayınlama adımları

1. Wix Studio'da `/reklam-yonetimi` sayfasını aç.
2. Mevcut Custom Element'i seç; aynı sayfaya ikinci bir kopya ekleme.
3. **Choose Source → Server URL** alanına yeni URL'yi gir.
4. **Tag Name** değerini `n1-reklam-yonetimi-v21` yap.
5. Masaüstü, tablet ve mobil görünümlerde video kadrajı, oynat/duraklat, bölümde GSAP geçişi, Header/Footer ve doğal sayfa yüksekliğini kontrol et.
6. Önizleme doğruysa **Publish** ile canlıya al.

## QA ve dağıtım sınırları

- JavaScript sözdizimi kontrolü yapıldı.
- Kaynak kodunda yeni video, yedek fotoğraf, stil kimliği ve GSAP bağlantısı doğrulandı.
- GitHub kaynak dosyası yayınlandı, ancak gerçek Wix Studio ekranında oynatma ve CDN medya kaynağı bu oturumda doğrulanmadı.
- **Wix Studio Custom Element kaynak alanı bu işlemle değiştirilmedi, canlı sayfa henüz güncellenmedi.**
- Kaynak alanı yenilenmeden yalnızca Wix site Publish API'sini çağırmak yeni tasarımı bağlamaz; üstelik başka kaydedilmiş taslakları yayınlayabilir. Bu nedenle tek başına yayın işlemi yapılmadı.
