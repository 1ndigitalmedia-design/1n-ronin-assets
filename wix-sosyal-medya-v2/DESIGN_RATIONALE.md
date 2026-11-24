# Tasarım Gerekçesi — Sosyal Medya V2 "Akışın Ötesinde"

## Ana fikir
Sosyal medya sayfaları genellikle telefon çerçeveleri, profil ızgaraları ve beğeni sayaçlarıyla anlatılır. Brief bunu açıkça istemiyordu; biz de sayfayı **bir platformun görüntüsü** olarak değil, **bir markanın zaman içinde süren hikâyesi** olarak kurduk. Her bölüm "akış" fikrini bir yerden kırar: dikey kare başlığın içinden geçer, görseller bir iple birbirine bağlanır, aynı sözcük yedi farklı biçimde yazılır, en sonda "akış" sözcüğü sönükleşip "bakış" görüntüyle dolar.

Kısaca Biz ve Kreatif Prodüksiyon kompozisyonları tekrar edilmedi; ana sayfadaki Ronin animasyonu taşınmadı.

## Renk ve tipografi
- Zemin #080A09, metin kırık beyaz, tek vurgu **#A8CF62**. Vurgu her bölümde tek bir yerde kullanıldı (ör. "AKIŞIN ÖTESİNDE.", aktif sekme çizgisi, "B" harfi), süsleme için değil.
- Barlow Condensed büyük başlıklarda, Barlow metinde. Türkçe büyük harflerde (İ, Ş, Ğ, Ü, Ç, Â) üst ve alt taşma olmaması için satır yüksekliği ve maske payı genişletildi.
- Etiketlerde tümü büyük harf + `text-transform` kullanılmadı: `lang=tr` altında "DİGİTAL" gibi hatalı dönüşümler oluşuyordu.

## Bölümler
**Hero — SOSYAL / MEDYA. / AKIŞIN / ÖTESİNDE.**
Çok büyük başlık, dikey bir video karesinin (klavyede yazan eller, "CLICK WITH LOVE") üzerinden geçer. Kesişen harfler `mix-blend-mode: difference` ile videoda renk değiştirir: yazı ve görüntü aynı anda okunur. Dikey kare akışı hatırlatır ama arayüz, profil veya sayaç yoktur. Kare dikey bir yarıktan açılır; harfler tek tek yükselir.

**Hikâye — SADECE PAYLAŞMIYORUZ. DEVAM EDEN BİR HİKÂYE KURUYORUZ.**
Üç fotoğraf ("Bir duruş.", "Bir renk.", "Bir diyalog.") masaüstünde ince bir SVG çizgiyle birbirine bağlanır; çizgi kaydırdıkça çizilir. Paylaşımların tek tek değil, ardışık okunduğunu anlatır. Yanında altı başlıklı sade bir liste: strateji, marka karakteri, hedef kitle, içerik düzeni, topluluk iletişimi, değerlendirme. Tablet ve telefonda çizgi kaldırıldı, görseller sade bir dizilimle akar.

**HER İÇERİĞİN BİR NEDENİ VAR.**
Beş aşama kart değil, **büyük tipografik bir sekme listesi** ve tek bir sahnedir. Aşama değişince görsel bir perdeyle silinir, metin kayar. Tıklama, ok tuşları, Home/End, önceki/sonraki düğmeleri ve dokunmatik kaydırma ile çalışır; hover'a bağlı hiçbir bilgi yok. Telefonda sekmeler yatay bir şerit olur, aktif olan görünür alana kaydırılır.

**İÇERİK HAREKETE GEÇTİĞİNDE.**
Slider yerine tek bir geniş video şeridi. Üstte "Bir fikir … dönüşür." cümlesinde orta kelime kaydırmayla değişir: kısa bir videoya, bir hikâye karesine, kaydırmalı bir gönderiye, canlı bir yayına, bir topluluk sorusuna. Böylece "her platformda farklı ifade" fikri hem metinle hem görüntüyle verilir. Video şeridi yatay bir yarıktan açılır; yanındaki bozulmuş (glitch) portre, fikrin biçim değiştirmesini anlatır.

**HER MARKANIN KENDİ RİTMİ VAR.**
Takvim veya panel yok. Yedi kavram (içerik stratejisi, editoryal takvim, feed ve story dengesi, kısa video anlatımı, kampanya iletişimi, topluluk etkileşimi, analiz ve optimizasyon) aynı sözcükle, **"KARAKTER"**, yedi farklı tipografik biçimde yazıldı: kalın, ince küçük harf, kontur, aralıklı, yeşil, kalın küçük harf, ters blok. Biçim değişir, karakter aynı kalır; tutarlılık mesajı tasarımın kendisidir.

**RAKAMLARIN ÖTESİNDE.**
Sahte metrik, grafik veya yüzde yok. Sabit duran bir başlık ve yanında altı "okuma" maddesi (ne ölçüldüğü değil, neyin anlaşılmaya çalışıldığı). Satır çizgileri kaydırmayla uzar.

**BİZ AKIŞI DEĞİL, BAKIŞI YÖNETİYORUZ.**
Manifesto; diğer bölümlerden farklı olarak görsel neredeyse yok, sahne tipografinin. Satırlar basamaklı kaydırılmış. "AKIŞI DEĞİL," gri ve sönük. Bir sonraki satırda yeşil "B" harfi kaydırdıkça genişler ve "AKIŞI" harflerinin içi bir fotoğrafla dolar: aynı harflerle yazılan iki sözcük arasındaki fark yalnızca bir harf ve bir bakıştır. Altta dar bir görsel şerit, ortadaki bir yarıktan açılır. Tarayıcı görsel dolguyu desteklemezse sözcük düz renkte kalır.

**MARKANIZIN HİKÂYESİNİ BİRLİKTE ANLATALIM.**
Sade final: başlık, alt metin, iki buton (PROJENİZİ KONUŞALIM → /iletisim, TEKLİF AL → /teklif-al) ve hero videosunun bir karesi. Sayfa başladığı görüntüyle kapanır: "Hikâye bir sonraki paylaşımda devam eder."

## Hareket ilkeleri
- Hareketler içeriği açıklamak için var: yarıktan açılan kareler (görünür olmak), çizilen çizgi (süreklilik), genişleyen harf (bakış). Her bölümde tek bir ana hareket.
- Pin yok, sayfa boyu yapay olarak uzatılmadı, kaydırma ele geçirilmedi.
- Hareket azaltma açıkken her şey hemen ve sabit görünür; GSAP hiç yüklenmese de sayfa eksiksiz okunur.

## Bilinçli olarak yapılmayanlar
- Telefon maketi, profil ızgarası, beğeni/yorum sayacı, sahte hesap adı, sahte yorum veya müşteri.
- Doğrulanmamış rakam ("%300 etkileşim" gibi).
- Kart ızgaraları ve slider.
