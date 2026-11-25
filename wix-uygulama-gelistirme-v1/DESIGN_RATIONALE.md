# DESIGN_RATIONALE — Uygulama Geliştirme V1 "Beyond the Screen"

## Konsept: ekran çerçevesi
Bir uygulama önce bir ekran olarak hayal edilir: köşeleri belli, sınırlı bir dikdörtgen. Sayfa bu çerçeveyi tekrar eden tek motif olarak kullanır — ama içerik her seferinde o çerçevenin **dışına taşar**. Fikir ekranda kalmaz; kullanılan, çalışan bir deneyime dönüşür.

- **Hero:** Video önce ortada küçük bir "ekran" olarak, yeşil köşe çizgileriyle açılır; sonra çerçeve büyüyerek kaybolur ve video tam genişliğe taşar. Aynı anda "FİKİRDEN / ÜRÜNE." konturdan dolguya geçer: taslak harfler ürünleşir. Videonun kendisi de aynı hikâyeyi anlatır: su damlaları ve bir ışık çizgisi, dönen bir sıvı küre, sonunda bir telefon.
- **Köşe işareti** (⌜ ⌟ biçiminde küçük SVG) her bölüm etiketinde, App Lab simülatörünün çevresinde ve hizmet sahnesinin köşelerinde tekrar eder.
- **Final:** Sorunun soru işaretinden birincil düğmeye noktalı bir çizgi iner: fikir bir eyleme bağlanır.

Bu motif Yapay Zekâ sayfasının imleç/pencere fikrinden ve UI/UX sayfasının demo düzeninden bilinçli olarak farklıdır.

## Renk ve tipografi
- Zemin #080A09, metin kırık beyaz #ECEBE5 ve gri tonlar, tek arayüz vurgusu #A8CF62. #A1FF00 / #A2FF00 yok (otomatik denetlendi). Durumlar yeni renk eklenmeden, biçim + yazı ile ayrıştırıldı (boş daire, yarım dolu, kesik halka, dolu).
- Görsellerdeki sarı-yeşil ışık ve V3'teki parlak yeşil medyanın kendi içindedir; arayüzde kullanılmadı.
- Barlow Condensed büyük, sıkı başlıklar; Barlow gövde ve arayüz metni. Türkçe büyük harflerin noktaları ve şapkaları için satır ve maske payı ayarlandı (Hero'daki kontur → dolgu efektinde de "İ" ve "Ü" noktalarının dolması ayrıca düzeltildi).
- Büyük–küçük ölçek ilişkisi: dev başlıkların yanında küçük, okunur gövde metni ve geniş boşluk; hiçbir bölüm aynı iki sütunlu kart düzenini tekrar etmez.

## Bölümler ve gerekçeleri
1. **Hero** — Tam genişlik sinematik video (yatay kadraj, telefonun olduğu sağ-orta korunur). Telefonda başlık üstte, video altta 4:5. Masaüstünde kaydırırken video hafifçe yaklaşır, başlık yukarı kayar (pin yok).
2. **ÖNCE İNSANI ANLARIZ.** — Geniş, kulaklıklı insan görseli; yüzünden başlayan bir daireyle açılır (önce insan). Altı konu madde listesi yerine **tek bir cümle** olarak yazıldı ve okundukça aydınlanır; altında her konunun sorusu.
3. **BİR UYGULAMA. BİRDEN FAZLA DENEYİM.** — Sayfanın merkezi. Aynı veriyle üç gerçek arayüz; görünüm değişince simülatörün kendisi telefondan tarayıcıya, tarayıcıdan panele dönüşür. Bir görünümde yapılan değişikliğin diğerinde görünmesi bölümün mesajını kanıtlar.
4. **FARKLI EKRANLAR. TEK BİR DÜŞÜNCE.** — Başlığın iki yarısı karşı yönlerden gelir. Masaüstünde hizmet kartı yerine bir **dizin + sahne**: solda büyük adlar, sağda tek büyük medya; seçilen hizmetin medyası silinerek gelir. Telefon ve tablette beş hizmet medyasıyla tam görünür (işlevsiz düğme bırakılmaz).
5. **FİKİR KODLA BULUŞTUĞUNDA.** — Yedi aşama ve yanında küçük bir ürün ekranı; okudukça ekran sorulardan akış şemasına, tel çerçeveye, tıklanabilir prototipe, gerçek içeriğe, test etiketlerine ve v1.1'e evrilir. Yedi kutu yerine bir ürünün büyüme hikâyesi. Pin yok; CSS sticky.
6. **HAREKET DENEYİMİN BİR PARÇASIDIR.** — Pastel arayüz videosu ile beş gerçek mikro etkileşim yan yana. "Hareket" anahtarı kapatılınca aynı işlemler animasyonsuz olur: hareketin süs değil, bilgi olduğu karşılaştırmayla görülür. Yükleme örneğinin bir canlandırma olduğu ekranda yazılıdır.
7. **HER EKRANDA DOĞRU DENEYİM.** — Konsept ürünün telefon, masaüstü, büyük ekran ve saatte göründüğü video; yanında üç kullanım bağlamı (yolda, toplantıda, masada). Seçilen bağlamla cihaz şeması ve dört tasarım kararı birlikte değişir. App Lab'in tekrarı değil: ürünü değil kararları gösterir.
8. **GÜZEL GÖRÜNMEK YETMEZ. DOĞRU ÇALIŞMALI.** — Sağlam bir zeminde duran telefon görseli; sekiz ilke, her biri çizilerek beliren bir kontrol işaretiyle. Altında: bunların sertifika, ölçüm sonucu veya garanti olmadığı yazılı.
9. **BİR FİKRİN VAR MI?** — Soru iki satırda karşı yönlerden gelir, soru işareti yerine oturur; noktalı çizgi birincil düğmeye bağlanır. AI sayfasının yazılan başlığından farklı.

## Medya kararları (özet; ayrıntı ASSET_MANIFEST.md)
- Her medya açılıp kare kare incelendi; yerleşim içeriğe göre: sıvıdan telefona dönüşen video Hero'ya, telefondan monitöre geçen video Web Applications'a, çok ekranlı konsept video "Her ekranda"ya, dönüşen arayüz kartları Hareket'e.
- Altı görselin her biri bir kez, farklı kompozisyonda kullanıldı. Mağaza rozetleri (gerçekte olmayan bir yayın izlenimi vermesin diye) kırpıldı.
- Videolarda poster yok; aynı anda en fazla bir video oynar.

## Hareket (GSAP)
Her bölümün kendine ait tek bir hareket fikri var; aynı fade-up tekrar edilmez:
Hero kontur→dolgu + çerçeveden taşma · İnsan daire açılışı + kaydırmaya bağlı cümle aydınlanması · Lab satırların soldan gelişi, simülatör boyut dönüşümü (FLIP), kartların sütunlar arasında kayması · Hizmetler karşı yönlü başlıklar, sahne silme geçişi · Süreç satır silme + durum geçişleri · Hareket demoya bağlı mikro animasyonlar · Gerçek hayat SVG çizgi çizimi · Kalite alttan açılan görsel, çizilen alt çizgi ve kontrol işaretleri · Final karşı yönlü kinetik başlık + bağlantı çizgisi.
Pin, spacer, kaydırma kilidi, sürekli glitch veya sürekli dönen şekil yok. Sürekli pahalı blur/filter animasyonu yok.

## Son yaratıcı değerlendirme (brief bölüm 22)

| Soru | Cevap |
|---|---|
| Sıradan bir yazılım şirketi sitesi gibi mi? | Hayır. SaaS kart ızgarası, boş telefon mockup'ı, genel teknoloji ikonu yok; sayfanın kendi motifi (ekran çerçevesinden taşma) ve gerçek çalışan bir ürün demosu var. |
| 1N'in yaratıcı teknoloji yaklaşımını gösteriyor mu? | Yaklaşımı anlatmak yerine gösteriyor: aynı verinin üç arayüzü, ürünün aşama aşama gelişimi, hareketi açıp kapatma, bağlama göre değişen kararlar. Gerçek müşteri işi olmadığı için yetenek iddiası yerine çalışan örnekler kullanıldı. |
| Hero ilk bakışta etkileyici mi? | Masaüstünde güçlü: küçük ekranın taşması ve taslaktan dolguya geçen başlık videonun kendi dönüşümüyle aynı anda. Telefonda daha sade (başlık üstte, video altta). |
| Dört video yaratıcı kompozisyonlara dönüştürüldü mü? | Evet, her biri içeriğine göre farklı bir rolde (tam genişlik sahne, hizmet sahnesi, demo yanında dikey video, bağlam seçicinin yanında dikey video). Zayıf nokta: V1'deki Nike logosu ve V3'teki "Quarn" adı medyanın içinde; işaretlendi. |
| Altı görsel dengeli kullanıldı mı? | Evet, her biri bir kez ve farklı oranda (2:1 geniş, 4:5 sahne, 5:4, 941:1500 dikey). |
| App Lab gerçek bir deneyim sunuyor mu? | Evet: alt menü, liste, detay, durum, görevler, geri düğmesi, arama, filtreler, pano, ilerleme görünümü, kart taşıma ve görünümler arası ortak veri gerçekten çalışır; temsili olduğu açıkça yazılıdır. |
| Butonlar ve navigasyon çalışıyor mu? | Otomatik testlerde App Lab'in bütün kontrolleri, hizmet dizini, süreç düğmeleri, beş mikro etkileşim, bağlam seçici, video düğmeleri, CTA'lar ve Header menüsü 10 genişlikte denendi. |
| GSAP dekorasyon mu, anlatım mı? | Anlatım: hareketlerin çoğu bir durum değişimini gösteriyor (görünüm dönüşümü, kart taşıma, aşama geçişi, işlem sonucu). Hareket bölümü bunu doğrudan karşılaştırmalı gösteriyor. |
| UI/UX ve AI sayfalarından yeterince farklı mı? | Evet: motif (çerçeve), Hero koreografisi, ana demo türü (çok görünümlü ürün simülatörü), hizmet düzeni (dizin + sahne) ve final farklı. |
| #A8CF62 korunmuş mu? | Evet, tek arayüz vurgu rengi. |
| Header/Footer birebir korunmuş mu? | Evet, onaylı commit'teki modüller değiştirilmeden; tek kopya. |
| Mobil ve tablet masaüstü kadar iyi mi? | Ayrı düzen kararları alındı (Hero sırası, Lab dar görünümleri, hizmetlerin alt alta dizilmesi, süreç tahtasının boyutu). Tabletteki büyük süreç tahtası ekran görüntülerinde fark edilip küçültüldü. Gerçek cihazda denenmedi. |
| Görsel katmanlarda hizalama/kırpma problemi var mı? | Otomatik çakışma/taşma testleri 10 genişlikte 0. Masaüstünde görsel 2'nin rozet kenarı ekran görüntüsünde fark edilip kırpma sıkılaştırıldı. |
| Videolar aynı anda oynuyor mu? | Hayır; en fazla bir video. |
| Mobil ikonlar gerçek SVG mi? | Evet; Unicode ok/emoji 0. |
| Sayfa sonunda boşluk var mı? | Yerel testte Footer altı 0–1 px, Final ile Footer arası 0. Wix dış kutusu ayrıca kontrol edilmeli (README). |
| Wix Studio Custom Element olarak çalışabilir mi? | Tek dosya, `customElements.define`, light DOM, kapsamlı CSS ve idempotent Header/Footer ile Custom Element olarak hazır; ancak **Wix Studio içinde test edilmedi**. |