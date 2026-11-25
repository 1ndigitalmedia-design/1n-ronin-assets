# 1N Digital Media — Markalar V1 (/markalar)

Markalar sayfası, tek bir Wix Studio Custom Element (`n1-markalar-v1`) olarak hazırlandı. Marka verisi ayrı bir dosyada tutulur.

**Durum**
- Ana JS ve veri dosyası GitHub main'e yüklendi; kaynaklar birlikte `52887065746fb9eaaecb470a2ff199335d3790f8` commit'inde doğrulandı.
- Wix Studio içinde test yapılmadı.
- Kurulum adımları: WIX_SETUP.md.

## Vurgu rengi

Brief'te vurgu rengi **#A2FF00** yazıyor. Bu konuda size bir soru sordum ama cevap gelmedi. Önceki bütün sayfalarda tek vurgu rengi **#A8CF62** olduğu ve #A2FF00'ın açıkça yasaklandığı için, yayındaki sayfalarla tutarlı kalmak adına #A8CF62 kullanıldı.

Renk tek bir değişkende tutuluyor: `--acc:#A8CF62`. Buton kenarında ve hover zemininde de `rgba(168,207,98,…)` değerleri var. #A2FF00 istenirse yalnızca bu değerler değiştirilir; yeni bir derleme yapabilirim.

## Dosyalar

| Dosya | Açıklama |
|---|---|
| `n1-markalar-v1.js` | Üretim kaynağı: Custom Element, CSS ve GSAP hareketleri. Okunabilir; küçültülmedi. |
| `n1-markalar-data-v1.js` | Merkezi marka verisi (112 kayıt). Excel'den üretildi. Alanlar: `id`, `order`, `name`, `sector`, `group`, `featured`, `logo`, `projectUrl`. |
| `build_data.py` | Excel'den veri dosyasını yeniden üretir ve "Sektör Özeti" sayfasıyla karşılaştırır. |
| `preview.html` | Yerel önizleme. Bir sunucu üzerinden açılmalı. |
| `WIX_SETUP.md` | Tag, URL, adım adım Wix ayarları, SEO ve sınırları. |
| `DATA_VALIDATION.md` | Veri doğrulama, Excel'de olduğu gibi bırakılan yazımlar, eksik logo listesi. |
| `QA_REPORT.md` | Arama, filtre, responsive, tarayıcı, performans ve yaşam döngüsü testleri; sınırlamalar. |
| `screenshots/` | Masaüstü (1440), tablet (834) ve mobil (390) tam sayfa görüntüleri ve durum görüntüleri. |

Bu paketteki dosyaların hepsi yeni oluşturuldu. Mevcut sayfalarda, Header/Footer'da ve depoda hiçbir dosya değiştirilmedi.

## Sayfa yapısı

1. **Hero**
   - "MARKALAR / BRANDS" etiketi ve iki satırlık "BİRLİKTE DEĞER / ÜRETİYORUZ." başlığı. Vurgu yalnızca sondaki noktada.
   - Brief'teki açıklama metni.
   - **112** MARKA VE PROJE ve **20** FARKLI SEKTÖR. Sayılar veriden hesaplanır.
   - İstatistikler kart değil; ince bir çizginin altında büyük rakamlar olarak duruyor.
   - Hero tam ekran değil; 1440 px'te öne çıkan markalar ilk kaydırmada başlar.
   - Görsel kullanılmadı: arşivde doğrulanmış marka veya prodüksiyon görseli bulunmadı.
2. **Öne çıkan markalar** (SELECTED BRANDS & PROJECTS)
   - 22 öncelikli kayıt, Excel sırasıyla.
   - Kutusuz bir editoryal dizin: üst çizgi, sıra numarası, büyük Barlow Condensed ad ve sektör.
   - Sütun sayısı genişliğe göre değişir:

     | Genişlik | Sütun |
     |---|---|
     | 2200 px ve üzeri | 6 |
     | 1280 px ve üzeri | 5 |
     | 1025–1279 px | 4 |
     | Tablet | 3 |
     | Telefon | 2 |
   - Hover'da üst çizgi vurgu rengiyle soldan çizilir ve numara renklenir. Yalnızca fareli cihazlarda; dokunmatik ekranda hover'a bağlı işlev yok.
   - Logo alanı hazır ama boş: doğrulanmış logo yok.
3. **Farklı sektörler. Ortak vizyon.** (INDUSTRIES & BRANDS)
   - Kalan 90 kayıt, 18 sektör grubunda. Grup sırası Excel'deki ilk görünme sırasıdır.
   - Masaüstünde sektör adı ve sayısı solda yapışkandır (sticky); adlar sağda 3 sütun. Tablet 3, telefon 2 sütun.
   - **Arama:**
     - Türkçe karakterlere duyarlı: İ/i, I/ı doğru eşleşir.
     - Büyük/küçük harf ve aksan duyarsız: "celik" yazınca "Çelik", "alacati" yazınca "Alaçatı" bulunur.
     - Kısmi eşleşme yapar ve eşleşen kısmı vurgular.
     - Sonuç sayısı canlı bölgede duyurulur. Temizle düğmesi ve Esc tuşu aramayı sıfırlar.
     - Arama 112 kaydın tamamında yapılır. Öne çıkan eşleşmeler, sonuç listesinin başında "Öne çıkan markalarda" grubunda gösterilir; üstteki vitrin değişmez.
   - **Sektör filtresi:**
     - Tablet ve masaüstünde düğme grubu; ok tuşları, Home ve End ile gezilebilir.
     - Telefonda tek bir sektör seçim kutusu.
     - Filtre öne çıkan vitrinini etkilemez.
   - **Boş sonuç:** "Aramanıza uygun marka veya proje bulunamadı."
4. **CTA** (NEXT COLLABORATION)
   - "SIRADAKİ MARKA / SİZİN MARKANIZ / OLSUN." başlığı, brief'teki açıklama ve "BİRLİKTE ÇALIŞALIM" düğmesi.
   - Düğme sitedeki iletişim sayfası `/iletisim`'e gider. Bu bağlantı onaylı site menüsünde zaten var. Header'daki "Teklif Al" `/teklif-al`'a gitmeye devam eder.

**Kullanılmayan öğeler:** Geometrik şekil, 3D, glow, degrade, partikül, dekoratif ızgara, sahte gösterge, aynı tip kart ve sahte logo yok. Bölümler fonksiyonel ince çizgilerle ayrılıyor.

**Kayıtların niteliği:** Listede markalar ile proje adları (trailer, aftermovie, festival vb.) birlikte bulunduğu için, sayfada kayıtların tamamı "müşteri" olarak nitelendirilmedi. Kullanılan terimler "Markalar ve Projeler", "Öne Çıkan Markalar" ve "Sektörel" oldu. İş birliği süresi, kapsam veya başarı bilgisi yazılmadı.

## Mimari

- **Custom Element:** Light DOM, sınıf öneki `mk-`, stil etiketi `n1-mk1-style`. Diğer sayfalarla ad çakışması yok. Tüm CSS `n1-markalar-v1` etiketiyle sınırlıdır.
- **Header ve Footer:** Önceki iç sayfalarla aynı entegrasyon. Onaylı commit `d24fa373…` modülleri (Header v6.48, Footer, WhatsApp / Yukarı Çık) değiştirilmeden yüklenir.
- **Veri:** Bileşen kendi dosyasının yanındaki `n1-markalar-data-v1.js` dosyasını yükler. İstenirse `data-src` özniteliğiyle başka bir adres verilebilir. Veri yüklenemezse sayfada bir hata mesajı gösterilir.
- **GSAP:** 3.13.0 (mevcut sayfalarla aynı sürüm) ile ScrollTrigger ve Flip, cdnjs'den yalnızca sayfada yoksa yüklenir. Flip, GSAP 3.13 ile ücretsizdir; yerel testte 3.13.0 Flip dosyasıyla doğrulandı.
- **Yükseklik:** Wix içinde iFrame yok; içerik sayfada akar. ResizeObserver, font yükleme ve `load` sonrası, filtre ve arama sonrası ve cihaz yönü değişince `ScrollTrigger.refresh()` çağrılır.

## Kullanılan Skills

| Skill | Nerede kullanıldı |
|---|---|
| `frontend-design` (SKILL.md) | **Tasarım planı:** renk, tip, düzen ve ilke belirlendi, ardından jenerik varsayılanlara karşı gözden geçirildi. Brief'teki tipografik hero ve editoryal dizin, kartsız düzen, vurgu renginin tek noktada kullanılması. Ekran görüntüleriyle öz eleştiri yapıldı: filtre geçişinde uzaktan kayan satırlar ve kırılım değişince içeriğin yeniden gizlenmesi bu yolla bulunup düzeltildi. |
| `gsap` (SKILL.md ve `references/gsap-plugins.md` Flip bölümü, `references/gsap-scrolltrigger.md` batch, refresh ve temizlik) | **Hareket mimarisi:** `gsap.context`, `matchMedia` ile hareket azaltma ve kırılım dalları. `Flip.getState()` → DOM değişikliği → `Flip.from()`. Sektör satırlarında `ScrollTrigger.batch`. Yerleşim değişince `refresh()`. |
| `design-motion-principles` (SKILL.md) | **"Sıklık kapısı":** Yazarken arama animasyonsuz (sık eylem); sektör seçimi ve temizleme Flip ile (seyrek eylem). Bağlam portföy olduğu için 0,4–0,5 sn'lik cilalı geçişler; sonsuz veya dekoratif hareket yok. |
| `webapp-testing` | Playwright ile testler: 12 genişlik, veri, arama ve filtre senaryoları, yaşam döngüsü. |

Kullanılmayan, ilgisiz olduğu için açılmayan skill'ler:
- `wix-html-embed-auto-height`: iFrame yöntemi içindir. Mevcut mimari Custom Element olduğundan uygulanmadı.
- `gsap-vault`: Hazır efekt kullanılmadı.

Brief'teki diğer yetkinlik adlarıyla (Browser Testing, Wix Studio Integration vb.) birebir eşleşen ayrı bir skill dosyası ortamda yok.

## Kullanılan GSAP özellikleri

| Özellik | Kullanım |
|---|---|
| `gsap.timeline` | Hero, bölüm başlıkları, öne çıkan dizin, CTA |
| `gsap.context` | Tüm hareketler tek context'te; kaldırılınca `revert()` |
| `gsap.matchMedia` | Hareket azaltma; ≥768 / ≤767 için ayrı süre ve stagger. Telefonda sektör satırı animasyonu yok. |
| ScrollTrigger (`once`) | Bölüm başına bir tetikleyici; öne çıkan 22 kayıt için **tek** tetikleyici |
| `ScrollTrigger.batch` | Sektör satırları; sektör başına bir tetikleyici, marka başına değil. Yalnızca ≥768 px. |
| Masked text reveal | Başlık satırları (`yPercent` ile maske içinden) |
| Opacity / translate reveal | Açıklama, adlar, CTA |
| Stagger | Öne çıkan dizin, sektör satırları, Flip ile gelen öğeler |
| Animated counter | 112 ve 20. DOM'da baştan son değer var; sayaç yalnızca görsel, ekran okuyucu sabit metni okur. |
| CSS değişkeni tween'i | Dizin çizgilerinin soldan çizilmesi (`--mk-rule`) |
| GSAP Flip | Sektör seçimi ve arama temizleme sonrası yeniden yerleşim. Yalnızca ekrandakiler kayar; uzaktan gelecek olanlar yerinde belirir. |
| `ScrollTrigger.refresh` | Font, `load`, ResizeObserver, filtre ve arama sonrası (gecikmeli, tek çağrı) |