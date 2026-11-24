# Sosyal Medya V2.3 — Hareket Bölümü Video Değişikliği

## Değişen bölüm

- Sayfa: `/sosyal-medya`
- Bölüm: **İçerik Harekete Geçtiğinde** (`.sm-motion figure.sm-band[data-sm="motion"]`)
- Yeni video: `https://video.wixstatic.com/video/6dbf5e_c530416b744a449cba5892bc85e2bdae/720p/mp4/file.mp4`
- Eski video `c2ed46fab1384b26adbbfc8e1f66cf36` artık kullanılmıyor.
- Hem masaüstü hem mobil yeni videonun tam olarak sağlanan **720p** adresini kullanır; doğrulanmamış 480p sürümü talep edilmez.

## Korunan öğeler

- Hero videosu: `67c5c858b42a4ce3b0e76195a59c8b3e`
- Strateji ilk aşama videosu: `044b3674636a4813b20f3f7dd8a402fe`
- Dört strateji fotoğrafı ve sekme değişim sistemi
- GSAP, video oynatma/durdurma, kullanıcı kontrolleri ve az hareket tercihi
- Onaylı Header/Footer, floating controls, `#A8CF62`

## Wix Studio kurulum bilgileri

- **Tag Name:** `n1-sosyal-medya-v23`
- **Server URL:** `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@8d4ceba85c4e3471212ca897b58f2a525e68277d/wix-sosyal-medya-v23/n1-sosyal-medya-v23.js`

1. Wix Studio editöründe `/sosyal-medya` sayfasını aç.
2. Sayfadaki mevcut Custom Element'i seç.
3. **Choose Source → Server URL** alanındaki mevcut V2.2 adresini yeni URL ile değiştir.
4. **Tag Name** alanını `n1-sosyal-medya-v23` yap.
5. V2.2 ve V2.3'ü aynı sayfaya ayrı ayrı ekleme.
6. Mobil, tablet ve masaüstünde yeni videonun kadrajını, oynat/duraklat düğmesini ve bölümden ayrılınca durmasını doğrula.
7. Testten sonra **Publish** ile canlıya al.

## Doğrulama ve sınırlamalar

- JavaScript sözdizimi kontrolü başarılı.
- GitHub'daki kaynağı yeniden okuyarak video ID'si, önceki değişiklikler ve Custom Element etiketini doğruladık.
- Video kaynağının canlı oynatımı, gerçek görüntü oranı ve Wix Studio üzerindeki görünüm henüz doğrulanmadı.
- GitHub'a dosya eklemek Wix Studio sayfasını güncellemez.
- Sadece Wix site yayınlama API'sini çağırmak da Custom Element'in editör kaynağını değiştirmez ve başka kaydedilmiş taslakları yayınlayabilir. Bu nedenle Custom Element kaynağı editörde güncellenmeden yayın işlemi yapılmadı.
