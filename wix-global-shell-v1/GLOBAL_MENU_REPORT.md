# GLOBAL_MENU_REPORT — Global Menü V2 (header v14 + menü verisi v16)

## Menü yapısı (bütün sayfalarda aynı)
| # | Başlık | Not | Hedef |
|---|---|---|---|
| 1 | Kısaca Biz | (aynı) | `/kisaca-biz` |
| 2 | Hizmetler | (aynı) | 7 sayfalık alt menü (değişmedi) |
| 3 | Markalar | (aynı) | `/markalar` |
| 4 | Akademi | (aynı) | `/reklam-ajansi` |
| 5 | İnsan Kaynakları | KARİYER | `/insan-kaynaklari`. Alt menü: Açık Pozisyonlar, Staj Programları |
| 6 | **İletişim** (yeni) | BİZE ULAŞIN | `/iletisim` |

- **Ekibimize Katıl yok.**
- İK satırı kariyer sürümündeki gibi melezdir. Başlık bir bağlantıdır; sağdaki ayrı `+` düğmesi alt menüyü açar. Dokunmatikte düğme bağlantıyı, bağlantı da düğmeyi engellemez (testte ikisi ayrı ayrı denendi).
- **Aynı boyut:** İletişim satırı diğer satırlarla aynı yazı tipini, satır yüksekliğini, rengi, hover ve aktif stili kullanır. Önceki sürümdeki "son satır" küçültmesi (`n1h-last`) kaldırıldı. Testte 6 satırın yazı boyutunun aynı olduğu ölçüldü.

## Kartlar
Kartlar, sağ sütunda (mobilde altta) şu sırayla durur:
1. **1N Digital Media — Başlangıca Dön:** her sayfadan `/`, ana sayfada `#ust`.
2. **A7 Prodüksiyon:**
   - Koyu kart (referanstaki gri kutu değil); kartın tamamı tıklanır.
   - Küçük dış bağlantı oku var.
   - `https://www.a7-1n.com/a7-produksiyon` adresini `target="_blank" rel="noopener noreferrer"` ile yeni sekmede açar.
   - Ekran okuyucuya "(yeni sekmede açılır)" bilgisi verilir.
3. **Uygulama ve Platformlar:** 4 kare logo, tek satır (PLATFORM_LOGOS.md).

## Aktif durum
Adrese göre belirlenir:
- Bulunulan sayfanın satırı vurgulanır (`data-current`) ve bağlantısı `aria-current="page"` alır.
- Kariyer sayfalarında İnsan Kaynakları, hizmet sayfalarında Hizmetler vurgulanır.
- Ana sayfada ve 404'te hiçbir satır vurgulanmaz.

## Boyut ve kapanış
- **Kısa ekran (masaüstü, ≤ 820 px yükseklik):** satır ve kart aralıkları sıkışır. 1440×900'de panel kaydırmasız sığar.
- **640 px altı yükseklik ve telefonlar:** panel kendi içinde kayar ve alt menü satırın altında açılır. Yatay taşma yok, arka plan kaymaz (`overscroll-behavior:contain`). 320×568'de de ölçüldü.
- **MENU/CLOSE korunur.** Normal kapanışta (MENU, Escape ya da dışarı dokunma) ekranda kart kalmaz.
- **Bağlantıyla kapanış:** İletişim'e gidildiğinde panel kapanır ve katman kalmaz. Tarayıcı geri tuşunda menü kapalı gelir (BFCache). Bu iki durum ayrı ayrı test edildi. V1.3'teki kart kalıntısı hatası tekrar oluşmadı.
- **Logolar** menü ilk açıldığında yüklenir. Menü hiç açılmazsa platform görseli indirilmez.

## Kapsam (hangi sayfalar)
Menü her sayfaya kendi sabit SHA'lı Server URL'si üzerinden geldiği için tek bir merkezden değiştirilemez. Merkezî özel kod (head) yöntemi değerlendirildi ve **reddedildi**: Wix özel kodu istemci tarafında ve geç ekler, bu da sayfa header'ıyla yarış yaratır ve ikinci bir header riski taşır.

Bu yüzden menüyü taşıyan bütün dosyaların yeni sürümü üretildi. Dosyalarda **yalnız** header ve menü verisi adresleri değişti (`build_all.py`, eski adres kalmadığını ve etiket listelerinin aynı olduğunu doğrular):

| Dosya | Sayfalar | Sürüm |
|---|---|---|
| Ana sayfa | `/` | v661 |
| Hizmet sayfaları | Kreatif, E-Ticaret, Sosyal, Reklam, UI/UX, Yapay Zekâ, Uygulama | v26, v27, v30, v26, v32, v5, v5 |
| Kısaca Biz | `/kisaca-biz` | v3 |
| Markalar | `/markalar` | v13 |
| Yasal | 5 yasal sayfa | v3 |
| Kariyer | 3 kariyer sayfası | v2 |
| Bağımsız header | İletişim, Akademi, 404 | (yeni) |

V1.4 optimizasyonları (mobil WebP kareler, kaynak temizliği, BFCache), ana sayfa tasarımı, Ronin, videolar ve "Hikâyemizin Devamı → /kisaca-biz" bağlantısı aynı kaldı. Kurulum tablosu: DEPLOYMENT §2.

## Kullanılan beceriler (dürüst durum)
- **Kariyer V1 aşamasında yüklendi ve uygulandı:** `industrial-brutalist-ui`, `minimalist-ui`. Kart dili (1 px çizgi, keskin köşe, tipografik vurgu) bu aşamada da aynı şekilde sürdürüldü.
- **Bu aşamada yeni bir beceri yüklenmedi.** Webapp Testing ve Responsive Mobile QA yöntemleri (Playwright matrisi, profil seti) önceki aşamalardaki test düzeneğiyle uygulandı, ancak beceri dosyaları bu aşamada yeniden açılmadı.
- **Kullanılmadı:** GSAP (bilerek; ağır bağımlılık yasak), High End Visual Design, UI/UX Pro Max, Frontend Design ve Wix HTML Embed auto-height. HTML Embed kullanılmadığı için İletişim HTML V4 kodu değiştirilmedi.
