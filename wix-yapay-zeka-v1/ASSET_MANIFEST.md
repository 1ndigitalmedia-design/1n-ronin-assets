# ASSET_MANIFEST — AI / Yapay Zekâ V1

Bütün medya brief'te verilen dosyalardır. Her video ve görsel gerçek tarayıcıda açılıp incelendi; aşağıdaki içerik açıklamaları tahmin değil, görülen karelere dayanır. Bu medya **müşteri işi veya doğrulanmış referans olarak sunulmaz**; sayfada yaklaşımın atmosferini gösterir (Üretim bölümünün alt metni bunu açıkça söyler).

## Videolar

Yalnızca verilen adresler kullanılır. Başka çözünürlük adresi üretilmedi. Hiçbirinde `poster` yok; ilk kare gelene kadar zemin rengi (#080A09) görünür.

| # | Adres | Boyut · süre (tarayıcıda ölçüldü) | İçerik | Kullanıldığı yer | Neden |
|---|---|---|---|---|---|
| 1 | `https://video.wixstatic.com/video/6dbf5e_8da46d06b07a4784a27a413446f081f9/720p/mp4/file.mp4` | 720×1280 · 30,0 sn | Mavi, bloklu bir yüzeyin üzerinde süzülen kamera; ufukta turuncu-kırmızı ışık bandı; yer yer bulanık geçişler | **Hero**, "YAPAY" ile "ZEKÂ." arasındaki dikey pencere | Dikey kadraj imleçten açılan pencereye doğal oturuyor; soyut ve yön duygusu veren hareket "fikrin ötesine geçme" fikrini taşıyor, robot veya teknoloji klişesi içermiyor |
| 2 | `https://video.wixstatic.com/video/6dbf5e_e177591c89e44710be97a52b3e6284f1/1080p/mp4/file.mp4` | 1080×1080 · 15,0 sn | Açık zeminde renkli, şekerleme benzeri parçalar; ızgara dağılıp tek tek nesnelere ayrılıyor, sonra yoğun şeritlere diziliyor | **Üretim** 02 — AI VIDEO PRODUCTION (kare kadraj) | Tek bir yapının sayısız varyasyona dönüşmesi, video üretiminin "alternatif oluşturma" doğasını gösteriyor |
| 3 | `https://video.wixstatic.com/video/6dbf5e_6c47eb3e5ef6409fb3285c7623d6054f/1080p/mp4/file.mp4` | 608×1080 · 15,0 sn | Beyaz zeminde büyüteç simgeli tek bir tuş → tuşlar çoğalıyor → bloklardan beyaz bir yapı → pikselli bulut → karlı manzarada kutup ışıkları altında bir ağaç | **Hareket & Üretken Anlatı** | Videonun kendisi "girdiden dünyaya" bir anlatı; 4 bölüme (0 / 3 / 5 / 8,8 sn) ayrılıp tıklanabilir bölüm listesine bağlandı. İlk kare 1,2 sn'den gösterilir (0. saniye boş beyazdır) |

**Yükleme:** Hero videosu sayfa açılınca yüklenir (`preload` auto; hareket azaltma/veri tasarrufunda `metadata`). Diğer ikisi görünüme 600 px kala yüklenmeye başlar. Oynatma: aynı anda en fazla bir video; ekranda en az %35 görünen ve en çok görünen video oynar. Ayrıntı `INTERACTION_SPEC.md`.

## Görseller

Orijinal adres biçimi `https://static.wixstatic.com/media/6dbf5e_<id>~mv2.<uzantı>`. Sayfada Wix'in görsel servisiyle genişliğe göre istenir (orijinalden büyük istenmez, dosya türü korunur):
`…/6dbf5e_<id>~mv2.<uzantı>/v1/fit/w_<W>,h_<3W>,q_84,enc_auto/yapay-zeka.<uzantı>` — `srcset` 480/800/1200/1800/2400 w, `sizes` bölüme göre. Hero dışındaki bütün görseller `loading="lazy"`, `decoding="async"`, `width`/`height` öznitelikli (yer kayması olmaz).

| Ad | id · tür | Boyut | İçerik | Kullanıldığı yer | Kırpma / not |
|---|---|---|---|---|---|
| prompt | `3e07eec967bf47a2b71121d0ebe2542b` · png | 1448×1086 | Koyu panelli, yeşil ışıklı bir zeminde parlayan istem kutusu; içinde "How do large language models work?" yazıyor | **İnsan × Zekâ** ("YARATICILIK İNSANLA BAŞLAR.") | Bir sorunun / istemin kendisi: bölümün "her şey insanın sorusuyla başlar" fikrine birebir karşılık. Görselin kendi yeşil ışığı ve İngilizce yazısı vardır; bu yeşil görselin içindedir, arayüz rengi değildir. Kırpılmadı |
| glass | `bba6915d52c14a27acc0f7074c6d946b` · jpg | 4000×7112 | Kırmızı-turuncu yarı saydam cam, yuvarlak hatlı şekiller; mavi-sarı dalgalı dokular | **Üretim** 01 — AI VISUAL PRODUCTION | Dikey 4/5 kadraj; en zengin renk ve doku, "görsel üretim" başlığını taşıyor |
| capsules | `213b57a103524b5da4db006dcf318a75` · jpg | 4023×7152 | Beyaz, kuşbakışı zeminde dağılmış cam kapsüller, içlerinde renkli nesneler | **Üretim** 03 — AI CONTENT DEVELOPMENT | 21/8 yatay şerit; içerik "kapsüllere ayrılmış fikirler" gibi okunuyor |
| wave | `db1b918073474a1d9abc99edc81b8b88` · jpg | 7104×4000 | Siyah zeminde mavi dalgalı bir çerçeve; içinde kırmızı-kahve dokulu yüzey, turuncu ışık çizgileri | **Üretim** 04 — AI CREATIVE DIRECTION (16/10, çapraz açılış); **Lab** ikinci görsel; **Gelecek** (glitch kanal kopyalarıyla) | Çerçeve içinde çerçeve: yönetim ve sınır fikri. Üç yerde kullanıldı; Lab ve Gelecek'te farklı kadraj ve işlemle |
| sky | `ed75aad55db941a78d36e905680b6d77` · jpg | 6000×4000 | Mavi-mint gökyüzünde süzülen yarı saydam turkuaz form, altında pembe camsı silindir | **Üretim** 05 — AI-ENHANCED DIGITAL EXPERIENCES (5/1 ince şerit); **Lab** ana görseli (deneysel yorumda iki renk kanalı kopyasıyla) | Sakin, yüzen form; üç yorumda da tanınabilir kaldığı için karşılaştırmaya uygun |

**Lab'deki görseller:** Üç yorum (Cinematic / Editorial / Experimental) yalnızca bu iki görselin (sky + wave) farklı kadraj, oran, tipografi ve renk işlemiyle gösterilmesidir. Bunlar **temsili sanat yönetimi yorumlarıdır**; yeni görsel üretilmez ve Lab altında "Temsili yorum · mevcut görseller kullanılır, yeni görsel üretilmez" notu bulunur.

## Kullanılmayanlar
- Stok, ikon seti, logo dışı marka görseli, sahte müşteri logosu yok.
- Robot, beyin, devre kartı, neon parçacık, mor-mavi "AI" teması, sohbet botu ekranı yok.
