# DESIGN_RATIONALE — AI / Yapay Zekâ V1 "Beyond the Prompt"

## Yaratıcı fikir: imleç
Bir yapay zekâ çalışmasının ilk görünen şeyi yanıp sönen bir imleçtir: bir soru yazılmayı bekler. Sayfanın tek tekrar eden motifi bu imleçtir; ama sayfa imlecin *ötesine* geçer.

- **Hero:** "YAPAY ZEKÂ." harf harf yazılır, imleç yanıp söner, sonra imleç pencere boyuna uzar ve ortadan açılarak videoyu gösterir. Yazı alanı bir pencereye dönüşür — "istemin ötesi" tam olarak budur. Kelimeler pencerenin iki yanına çekilir; altta "FİKRİN ÖTESİNDE." ve alt metin.
- **Bölüm etiketleri** (AI Creative Production, AI Creative Lab…) küçük bir imleç çizgisiyle biter: aynı dil sayfa boyunca sessizce sürer.
- **Final:** "GELECEĞİ BİRLİKTE ÜRETELİM." da yazılarak gelir ve imleç açık kalır: konuşma ziyaretçiye devredilir.

Böylece sayfanın kendi hikâyesi olur: **soru → yön → üretim → insan kontrolü → birlikte üretim.**

## Renk ve tipografi
- Zemin #080A09, metin #ECEBE5, tek vurgu #A8CF62. Başka yeşil (#A1FF00 / #A2FF00) yok; testte otomatik denetlendi. Mor-mavi "AI" paleti bilinçli olarak kullanılmadı: renk, medyanın kendisinden gelir.
- Barlow Condensed büyük, sıkı başlıklar; Barlow gövde. Türkçe karakterler (Ğ, İ, Ş, Ü, Â) için satır yüksekliği ve maske payı ayrıca ayarlandı; büyük harflerin noktaları ve şapkaları kesilmez, satırlar çakışmaz (10 genişlikte otomatik çakışma testi 0).
- Vurgu rengi her başlıkta yalnızca ikinci satırda/fiilde kullanılır (ÜRET., DENEYİMLE., DÖNÜŞÜR., ŞEKİLLENİR.): başlıkların okuma ritmi aynı kalır.

## Bölümler ve gerekçeleri
1. **Hero** — Dikey Hero videosu (mavi bloklu yüzey, turuncu ufuk) pencere içinde. Masaüstünde pencere ortada, kelimeler iki yanda; tablette pencere biraz daralır; telefonda kelimeler üstte, video altta tam genişlikte. Masaüstünde kaydırırken pencere hafifçe büyür, kelimeler dışa kayar (pin yok).
2. **YARATICILIK İNSANLA BAŞLAR.** — Tek görsel: ışıklı istem kutusu. Bu, bir insanın sorusunun kendisi; bölüm metnini tek kareyle anlatıyor. Yanında kısa, okunur metin.
3. **HAYAL ET. YÖNET. ÜRET.** — 5 alan, kart değil, editoryal bir dizi: her alanın kendi medyası ve kendi kadrajı var (4/5 dikey cam, kare video, 21/8 kapsül şeridi, 16/10 çapraz açılan dalga çerçeve, 5/1 ince gökyüzü şeridi). Arkada çok büyük, kontur hâlinde Türkçe anahtar kelime (GÖRSEL, VİDEO, İÇERİK, YÖN, DENEYİM). Hizmet kartı ızgarası kullanılmadı.
4. **YARATICILIĞI DENEYİMLE.** — Creative Direction Mixer. Sayfanın "oyuncak" kısmı ama dürüst bir oyuncak: üretim taklidi yapmaz; bir sanat yönetmeninin aynı malzemeyle verdiği kararların sonucu nasıl değiştirdiğini gösterir. Karar kaydı, değişen altı kararı yazılı olarak verir.
5. **BİR FİKİR. SAYISIZ OLASILIK.** — 6 aşama (IDEA → DELIVERY), kaydırmayla ilerleyen editoryal sıra; numaralar gerçek bir sıra olduğu için kullanıldı. HUMAN REVIEW aşaması dizinin ağırlık merkezi.
6. **HAREKET BİR ANLATIYA DÖNÜŞÜR.** — Hikâye videosu tek bir tuştan bir dünyaya gidiyor; bu yapı videonun kendisinden okunup 4 tıklanabilir bölüme çevrildi. Video oynarken etkin bölüm ve büyük kelime (GİRDİ / ÇOĞALMA / YAPI / DÜNYA) değişir.
7. **ÜRETMEK YETMEZ. DOĞRU ÜRETMEK GEREKİR.** — "ÜRETMEK YETMEZ." satırının üstü çizilir. 8 konu iddia değil **soru** olarak yazıldı (ör. "Bu çıktıyı yayına almadan önce bir uzman gözü onayladı mı?"). Sertifika, garanti, yüzde iddiası yok.
8. **GELECEK TEKNOLOJİYLE DEĞİL. YARATICILIKLA ŞEKİLLENİR.** — İki satır karşılıklı hizalanır; geniş dalga görseli bir kez kısa bir kanal ayrışması (glitch) yaşar. Sürekli glitch yok, telefonda kapalı, hareket azaltmada yok.
9. **GELECEĞİ BİRLİKTE ÜRETELİM.** — Yazılan başlık, açık kalan imleç, iki CTA.

## Medya kararları (özet; ayrıntı ASSET_MANIFEST.md)
- Her medya önce açılıp incelendi; yerleşimi içeriğine göre seçildi (dikey video dikey pencereye, kare video kare kadraja, anlatısı olan video bölüm listesine).
- Videolarda poster yok; önce fotoğraf görünüp sonra videoya dönüşme yok.
- Aynı anda en fazla bir video oynar.
- Dalga görseli üç yerde kullanıldı; her seferinde farklı kadraj ve işlemle. Elimizdeki 5 görsel için bilinçli bir tekrar, ama bir eleştiri noktası olarak not ediyorum.

## Hareket (GSAP)
- Bütün sahneler `gsap.matchMedia` ile masaüstü / tablet / telefon için ayrı kurulur; hareket azaltmada hiçbiri çalışmaz ve içerik son hâliyle görünür.
- Her bölümün kendine ait tek bir hareket fikri var: Hero'da yazma + pencere, Üretim'de kadraj açılışları (çapraz maske dahil), Lab'de FLIP ile yerleşim değişimi, Süreç'te dolan çizgiler, Hareket'te videoya bağlı bölüm ilerlemesi, Sorumluluk'ta üstü çizme, Gelecek'te harf aralığının kapanması + tek glitch, Final'de yazma.
- Pin, spacer, kaydırma kilidi yok. ScrollTrigger yalnızca `once` girişler ve hafif scrub (Hero, Gelecek görseli).

## Son yaratıcı değerlendirme (brief bölüm 23)

| Soru | Cevap |
|---|---|
| Sıradan bir AI hizmet sayfası gibi mi görünüyor? | Hayır. Robot/beyin/neon yok, hizmet kartı ızgarası yok; sayfanın kendi motifi (imleç → pencere) ve kendi anlatı çizgisi var. |
| 1N'in kreatif yeteneğini ve teknoloji yaklaşımını gösteriyor mu? | Kreatif yönü Hero, Üretim dizisi ve Lab gösteriyor; teknoloji yaklaşımını Süreç ve Sorumluluk bölümleri "insan kontrolü" ekseninde anlatıyor. Gerçek proje örneği olmadığı için yetenek iddiası yerine yaklaşım gösterildi. |
| Görseller ve videolar anlamlı kullanılmış mı? | Evet; her biri içeriğine göre yerleştirildi (ASSET_MANIFEST). Tek zayıf nokta: dalga görseli üç kez kullanıldı. |
| GSAP hareketleri yeterince yaratıcı mı? | Bölüm başına bir fikir, tekrar eden "her şey aşağıdan belirir" kalıbı yok. Hero açılışı ve Lab geçişi en güçlü iki an. |
| AI Creative Lab gerçekten çalışan bir deneyim mi? | Evet: fare, dokunma ve klavyeyle çalışır, GSAP olmadan da çalışır, ekran okuyucuya duyurur. Bir üretim değil, bir sanat yönetimi demosu olarak dürüstçe etiketlidir. |
| Hero ilk bakışta etkileyici mi? | Masaüstünde güçlü: yazılan başlık pencereye dönüşüyor. Telefonda daha sade (başlık üstte, video altta); bilinçli bir sadeleştirme. |
| Bölümler birbirinin kopyası gibi mi? | Hayır; düzenler farklı (pencere, editoryal dizi, demo sahnesi, numaralı sıra, video + bölüm listesi, soru listesi, karşılıklı tipografi, final). |
| Anlamsız geometrik kutular var mı? | Hayır. Kutular yalnızca işlevsel yerlerde: Lab yorum kartları ve CTA düğmeleri. |
| Masaüstü, tablet, mobil kompozisyonlar profesyonel mi? | 10 genişlikte taşma/çakışma 0; 390, 820, 1440 ekran görüntüleriyle gözle kontrol edildi. Gerçek telefon/tablet cihazında denenmedi. |
| Header/Footer korunmuş mu? | Evet, onaylı commit'teki modüller değiştirilmeden kullanılıyor; tek kopya. |
| İkinci renk #A8CF62 mi? | Evet; tek vurgu rengi. (İnsan × Zekâ görselinin kendi içindeki yeşil ışık fotoğrafın parçasıdır.) |
| Mobil ikonlar SVG mi? | Evet; bütün ikonlar inline SVG, dekoratif olanlar `aria-hidden`. Unicode ok/emoji 0. |
| Video yüklenirken istenmeyen görsel katman çıkıyor mu? | Hayır; poster yok, ilk kareye kadar yalnız zemin rengi. Hata durumunda da görsel konmuyor. |
| Gereksiz boşluk oluşuyor mu? | Yerel testte Footer altı boşluk 0. Wix dış kutusu yüksekliği gerçek Wix'te ayrıca kontrol edilmeli (README). |
| Gerçek tarayıcı ekran görüntüleriyle kalite kontrol yapılmış mı? | Evet; 20 ekran görüntüsü gerçek medya ile alındı ve bu kontrolde 4 sorun bulunup düzeltildi (QA_REPORT). Wix Studio içinde test yapılmadı. |
