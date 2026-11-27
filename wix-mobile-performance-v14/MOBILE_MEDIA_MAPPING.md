# MOBILE_MEDIA_MAPPING — ikincil video → WebP kare eşlemesi

Kare seçimi: her video için aday kareler (`media/stills/candidates.json`, temas sayfaları `media/stills/contact-sheets/`) görsel olarak incelendi; anlatıyı en iyi taşıyan, bulanık/geçiş karesi olmayan an seçildi. Üretim: `frames.py` (ffmpeg tek kare, kaynak en yüksek mevcut kalite) → `make_webp.py` (WebP q84, method 6, **animasyonlu değil**, büyütme yok). Klasör sürümlü: `wix-mobile-performance-v14/media/stills/<sayfa>/<anahtar>-<genişlik>.webp`, CDN’de commit SHA ile sabit.

Kural: yalnız **hafif profil** (telefon + tablet, iPad yatay dahil) kare alır. Masaüstü aynı videoları birebir aynı şekilde yükler. Ana sayfa kahraman/Ronin ve hizmet sayfası kahraman videoları mobilde de video kalır.

| Anahtar | Sayfa | Kaynak video (Wix id / kalite) | Kare sn | Gerekçe | Boyutlar (px → KB) | Video MB (önce) |
|---|---|---|---|---|---|---|
| `kreatif-monitor` | kreatif-produksiyon | `6dbf5e_2821f1bb754740f9bc6deb51f052cf8c` / 1080p 1920x1080 | 1.21 | 1N_Digital_Media başlık karesi; glitch dili, temiz, marka | 480→14, 720→25, 960→34, 1280→47, 1920→67 | 14.02 |
| `eticaret-store` | e-ticaret-yonetimi | `6dbf5e_382aee7841704e1c9e54539673ff9f63` / 480p 720x900 | 0.55 | menü sayfaları en düz ve okunur hâlde | 480→19, 720→32 | 0.74 |
| `eticaret-trio` | e-ticaret-yonetimi | `6dbf5e_efaf0298818c43b19c85c0c37bdb7f4a` / 720p 720x1280 | 1.69 | kasklı figür, keskin, koyu zemin | 480→34, 720→58 | 1.39 |
| `reklam-manifesto` | reklam-yonetimi | `6dbf5e_d0b5ab077fad434aa46a37dca1aa10b8` / 720p 1280x720 | 0.25 | bütün panolar dolu, "AND SOLUTIONS EMERGE" | 480→17, 720→28, 960→41, 1280→55 | 0.73 |
| `reklam-karar` | reklam-yonetimi | `6dbf5e_3855bf1db1384a9c961782c650b3686d` / 1080p 1920x1080 | 1.5 | vitrin, en keskin kare | 480→18, 720→35, 960→54, 1280→82, 1920→148 | 2.70 |
| `sosyal-hareket` | sosyal-medya | `6dbf5e_4892baa5590541faae6c24693b7fb00c` / 1080p 1920x1080 | 1.17 | ekranlı oda kompozisyonu (arka plan kullanımına uygun) | 480→22, 720→39, 960→56, 1280→82, 1920→129 | 21.07 |
| `sosyal-final` | sosyal-medya | `6dbf5e_f14a9f803bc442838bfe159f0aa49e72` / 1080p 1920x1080 | 1.5 | vitrin, en keskin kare (reklam-karar ile aynı dosya) | 480→18, 720→35, 960→54, 1280→82, 1920→148 | 2.70 |
| `sosyal-strateji` | sosyal-medya | `6dbf5e_044b3674636a4813b20f3f7dd8a402fe` / 480p 720x900 | 0.28 | ERA formu düzgün, deformasyonsuz | 480→6, 720→11 | 0.42 |
| `uiux-feel` | ui-ux-tasarim | `6dbf5e_54840d234c7d41c9b1983c73164e3050` / 720p 720x1280 | 5.11 | sporcu + arayüz, aydınlık, keskin | 480→22, 720→36 | 1.15 |
| `yapay-gen` | yapay-zeka | `6dbf5e_e177591c89e44710be97a52b3e6284f1` / 1080p 1080x1080 | 0.0 | tasarımcının belirlediği ilk kare (first:0); düzenli ızgara | 480→58, 720→100, 960→147, 1080→177 | 7.95 |
| `yapay-story` | yapay-zeka | `6dbf5e_6c47eb3e5ef6409fb3285c7623d6054f` / 1080p 608x1080 | 12.61 | ağaç ve kutup ışıkları; hikâyenin doruk karesi | 480→37, 608→59 | 3.51 |
| `uygulama-web` | uygulama-gelistirme | `6dbf5e_58f4d602044e4af1972b2898b5a5694a` / 720p 720x1280 | 4.04 | monitörde pano arayüzü, keskin | 480→31, 720→55 | 0.98 |
| `uygulama-screens` | uygulama-gelistirme | `6dbf5e_cbd02cfab44141d6838302d4f3b915c7` / 720p 720x1280 | 4.56 | elde telefon, aydınlık, keskin | 480→19, 720→33 | 1.37 |
| `uygulama-motion` | uygulama-gelistirme | `6dbf5e_23811760080b45b7aa77526f31898777` / 720p 720x1280 | 4.47 | GCT Balance telefon, net arayüz | 480→25, 720→40 | 1.55 |

Not: `sosyal-final` ve `reklam-karar` aynı kaynak dosyadır (md5 aynı); kareleri ayrı tutuldu (sayfa klasörü bağımsızlığı).

## Sayfa koduna entegrasyon

| Sayfa | Öğe | Masaüstü | Hafif profil |
|---|---|---|---|
| Kreatif Prodüksiyon | Monitör (bölüm oynatıcısı) | otomatik oynar | `kreatif-monitor` kare poster; video yalnız kullanıcı bölüm/oynat dokunuşunda kaynak alır (otomatik/yakın-yükleme kapalı) |
| E-Ticaret | Mağaza ekranı, üçlü ekran | video | `eticaret-store`, `eticaret-trio` (video öğesi oluşturulmaz) |
| Sosyal Medya | Hareket, final, strateji | video | `sosyal-hareket`, `sosyal-final`, `sosyal-strateji`; oynat düğmesi çıkarıldı |
| Reklam Yönetimi | Manifesto ekranı, karar videosu | video | `reklam-manifesto`, `reklam-karar`; düğmeler gizli |
| UI/UX | FEEL videosu | video | `uiux-feel`; oynat düğmesi çıkarıldı (gri önizleme anahtarı masaüstünde aynı) |
| Yapay Zekâ | Üretim, hikâye | video | `yapay-gen`, `yapay-story` |
| Uygulama Geliştirme | Web, ekranlar, hareket | video | `uygulama-web`, `uygulama-screens`, `uygulama-motion` |

Görsel: `<img data-n1-still loading="lazy" decoding="async" srcset="… 480w, 720w, … " sizes="…" width height>`; ilk ekrandaki kareler `loading="eager"`. Kutu oranı eski video kutusuyla aynı (`position:absolute; inset:0; object-fit:cover`) → düzen kayması yok (CLS ölçümü PERFORMANCE_BEFORE_AFTER).

Toplam: 14 ikincil video kaynağı (60.27 MB, ilk kalite) ↔ en büyük WebP’lerin toplamı 1.02 MB; tüm WebP klasörü 2,4 MB (cihaz yalnız `sizes`’a uyan tek boyutu indirir).
