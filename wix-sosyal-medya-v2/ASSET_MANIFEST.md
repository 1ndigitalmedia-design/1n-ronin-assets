# Asset Manifest — Sosyal Medya V2

Bütün görsel ve videolar 1N'in kendi Wix medya havuzundan (`6dbf5e_…`) gelir. Yeni dosya yüklenmedi, harici stok kaynağı kullanılmadı. Görsellerin gerçek boyutları ve içerikleri tarayıcıda açılarak doğrulandı.

## Adres kalıpları
| Tür | Kalıp |
|---|---|
| Görsel | `https://static.wixstatic.com/media/6dbf5e_<id>~mv2.jpg/v1/fit/w_<W>,h_<3W>,q_82,enc_auto/sosyal-medya.jpg` — `srcset` 480 / 800 / 1200 / 1800 w, her yerde `sizes` tanımlı |
| Video | `https://video.wixstatic.com/video/6dbf5e_<id>/720p/mp4/file.mp4` (masaüstü/tablet) · `…/480p/mp4/file.mp4` (telefon ≤767 px, veri tasarrufu veya 2G) |
| Video posteri | Wix'in videodan ürettiği ilk kare: `https://static.wixstatic.com/media/6dbf5e_<id>f000.jpg/v1/fill/w_<W>,h_<H>,q_80/sosyal-medya.jpg` |

## Videolar
| Değişken | ID | Boyut / süre | İçerik | Bölüm | Neden |
|---|---|---|---|---|---|
| `V_HERO` | `e6722cf66dab428ea81f8b6b3418a49b` | 1080×1920 · 23,85 sn | Mor ışıkta klavyede yazan eller, "CLICK WITH LOVE" ışıklı pano | Hero (dikey "akış" karesi), Final (aynı videonun poster karesi) | Sosyal medyanın başladığı yer: bir cümle, bir klavye. Dikey format akışı çağrıştırır ama bir uygulama arayüzü değildir. |
| `V_MOTION` | `c2ed46fab1384b26adbbfc8e1f66cf36` | 1920×1080 · 10 sn | Siyah zeminde piksel LED ile çizilmiş platform simgeleri | İçerik Harekete Geçtiğinde | "Platformlar çok; markanın karakteri tek." mesajı. Platform arayüzü taklit etmeden "çok kanal" fikrini gösterir. |

**Not (onayınıza bırakılan nokta):** `V_MOTION` videosunda Facebook, X/Twitter, YouTube, Instagram, Pinterest vb. platformların logoları piksel ışık olarak görünür. Bu bir arayüz veya sahte hesap değil, havuzdaki hazır bir videodur; ama marka logoları içerdiği için yayın öncesi kontrol etmenizi öneririm. İstenirse aynı bölüm yalnızca `glitch` görseliyle veya başka bir videoyla çalışacak şekilde değiştirilebilir.

## Görseller
| Anahtar | ID | Orijinal boyut | İçerik | Bölüm |
|---|---|---|---|---|
| `hay` | `0ffe788738344eafab50d732134bc447` | 6240×4160 | Beyaz kıyafetle saman yığınına uzanmış kadın, bulutlu gök | Hikâye — "Bir duruş." |
| `tulle` | `c9d42b72e1ca4e8c9730b3db8bfcca93` | 3268×4902 | Turuncu fonda turkuaz tüllü etekle oturan kadın, trafik lambası | Hikâye — "Bir renk." |
| `duo` | `419bcc6a7c0044ac9328b7945436c0d2` | 2535×3802 | Sarı-mavi fon önünde birbirine bakan iki kadın | Hikâye — "Bir diyalog." |
| `light` | `247d5010ffcd42c582eeed4f32d3f13e` | 5472×3648 | Mavi-mor ışıkta siluetler, pembe ışık halkası | Neden — 01 Markayı Anlamak |
| `posters` | `01215c24e29744a2857318feb3150fdd` | 2543×4000 | Afiş kaplı duvar önünde siyah kıyafetli kadın | Neden — 02 Topluluğu Tanımak |
| `plan` | `2ab1dd8d04374e48b055233bb44fb463` | 4000×6000 | Masada tablet, ekranda görsel ızgara, kalemler | Neden — 03 Yayın Dilini Kurmak |
| `food` | `881c414e98294f6e909c0e084811f283` | 2832×4240 | Telefonla yemek tabağını fotoğraflayan el | Neden — 04 İletişimi Sürdürmek |
| `notebook` | `b0e0a51e3cfb41c6996e4fb90ccaea21` | 3712×5568 | Fotoğraf makinesi ve "Social Media Marketing" yazan defter | Neden — 05 Sonuçlardan Öğrenmek |
| `glitch` | `acd1a7ef22834d729d1399a3c4453a9b` | 2906×4372 | Renk kaymalı, bozulmuş (glitch) portre | İçerik Harekete Geçtiğinde — biçim değiştiren içerik |
| `fabric` | `3ae1864f9b4444c7a40d9f1809709c0c` | 6720×4480 | Gökyüzü önünde sarı kıyafetli kadın, turuncu kumaş, kaykay | Manifesto — "BAKIŞI" sözcüğünün içini doldurur (destek varsa) ve alttaki dar şerit |

## Kullanılmayanlar
- `6dbf5e_1c46…` — kapıda "HOW ARE WE DOING?" etiketi; üzerinde Facebook, Google ve Instagram logoları ve puan yıldızları var. Üçüncü taraf logoları ve "değerlendirme/yorum" çağrışımı yüzünden kullanılmadı (sahte değerlendirme izlenimi vermemek için).
- İncelenen diğer havuz görselleri tema (sosyal medya yönetimi), Kreatif Prodüksiyon ve E-Ticaret sayfalarıyla tekrar riski veya içerik uyumu nedeniyle seçilmedi.

## Yükleme ve yedek davranışı
- **Hero videosu:** `preload="metadata"`, poster önceden görünür. Yalnızca görünürken oynar. Video yüklenemezse poster karesi kalır, altında "Video şu anda yüklenemedi; filmin bir karesi gösteriliyor." notu çıkar.
- **Hareket videosu:** `preload="none"`; bölüme yaklaşılana kadar kaynak atanmaz. Görünür olduğunda hero videosu durur, bu video oynar (aynı anda tek video).
- **Hareket azaltma açıkken:** videolar kendiliğinden oynamaz; poster ve oynat düğmesi görünür.
- **Görseller:** Hero ve ilk ekran dışındakiler `loading="lazy"`, hepsi `decoding="async"`, `srcset` + `sizes` ile ekran genişliğine uygun boyut. Her görselin anlamlı Türkçe `alt` metni var.
- **"BAKIŞI" görsel dolgusu:** Yalnızca tarayıcı `background-clip:text` destekliyorsa uygulanır; desteklemiyorsa sözcük düz renk kalır ve okunur.
- **Bileşen kaldırılınca:** videolar durdurulur, `src` boşaltılır, ağ bağlantısı bırakılır.
