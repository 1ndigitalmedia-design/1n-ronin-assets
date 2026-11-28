# SEO_SETTINGS — Kariyer sayfaları

Wix Studio'da her sayfa için **Sayfa Ayarları → SEO Temelleri** ekranına girilir. Custom Element `<head>`'e dokunmaz. Başlık, açıklama ve canonical Wix tarafından üretilir.

## 1. Sayfa başına
| Sayfa | URL slug (Wix "Sayfa URL'si") | SEO Title | Meta Description | H1 (sayfada, tek) |
|---|---|---|---|---|
| İnsan Kaynakları | `insan-kaynaklari` | `İnsan Kaynakları \| 1N Reklam ve Digital Media` | `1N Digital Media kariyer fırsatlarını keşfedin. Açık pozisyonlarımızı ve staj programlarımızı takip ederek yaratıcı dünyamıza adım atın.` | `İNSAN KAYNAKLARI.` |
| Açık Pozisyonlar | `acik-pozisyonlar` | `Açık Pozisyonlar \| 1N Reklam ve Digital Media` | `1N Digital Media bünyesindeki güncel iş fırsatlarını ve açık pozisyonları takip edin. Yeni kariyer duyurularımızı keşfedin.` | `AÇIK POZİSYONLAR.` |
| Staj Programları | `staj-programlari` | `Staj Programları \| 1N Reklam ve Digital Media` | `1N Digital Media staj programlarına ilişkin güncel duyuruları ve gelecekteki staj fırsatlarını bu sayfadan takip edin.` | `STAJ PROGRAMLARI.` |

(Tablodaki `\|` yalnız Markdown kaçışıdır. Wix'e düz `|` karakteri girilir.)

## 2. Başlık yapısı (sayfa kodunda)
- **Tek H1:** sayfanın büyük başlığı. Testte 3 sayfa × 3 profil × 2 motorda `document.querySelectorAll('h1').length === 1`.
- **H2:** yalnız İnsan Kaynakları sayfasındaki iki yönlendirme kartının başlıkları ("AÇIK POZİSYONLAR.", "STAJ PROGRAMLARI.").
- **Diğer metinler:** vurgu başlığı ve açıklama paragraftır (`<p>`). Ayrıca:
  - Header'ın kendi menü kartında `h3` bulunur (mevcut ortak bileşen).
  - Footer'da başlık sırası değişmedi.

## 3. Canonical
Wix her sayfa için canonical'ı yayınlanan adresten otomatik üretir:
- `https://www.reklam1n.com/insan-kaynaklari`
- `https://www.reklam1n.com/acik-pozisyonlar`
- `https://www.reklam1n.com/staj-programlari`

Kontrol: SEO Temelleri → Gelişmiş SEO → "Canonical URL" alanı **boş** (varsayılan) bırakılır. Elle başka adres girilmez.

**Bunu yapmayın:** `/ekibimize-katil` için canonical vermeyin; bu adres 301 ile `/insan-kaynaklari`'ya gider (DEPLOYMENT §4).

## 4. Yapmadıklarımız (bilerek)
- **JobPosting / yapılandırılmış veri yok.** Açık ilan bulunmuyor; sahte ilan verisi üretilmedi.
  - İleride gerçek ilan eklendiğinde JobPosting yalnız o ilan sayfasına, gerçek bilgilerle eklenmelidir: başlık, tarih, konum, istihdam türü.
- **Arama motoru indeksleme:** Wix varsayılanı "Bu sayfayı arama sonuçlarında göster" açık kalır.

## 5. Sitemap
Wix sayfa yayınlandığında `sitemap.xml`'e kendisi ekler; ek işlem yok.

## 6. Bilinen sınır
Sayfa içeriği Custom Element tarafından tarayıcıda oluşturulur. Wix sunucu HTML'inde H1 metni yer almaz; mevcut tüm 1N Custom Element sayfalarında da durum aynıdır.

Google sayfayı çizerek (rendering) okur. Başlık ve açıklama Wix SEO ayarlarından sunucu HTML'inde bulunur.
