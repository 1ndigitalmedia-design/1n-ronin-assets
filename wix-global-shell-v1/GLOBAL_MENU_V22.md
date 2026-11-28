# GLOBAL_MENU_V22 — Global Menü V2.2: 1N Intelligence kartı

**Wix'te Save/Publish yapılmadı, PR birleştirilmedi, force push yok, hiçbir dosya silinmedi.** Testler Playwright (Chromium + WebKit) ile yapıldı; WebKit iPhone değildir, gerçek Wix yayınında doğrulanmadı.

## 1. Değişiklik
- **Kaldırılan:** menünün alt bölümündeki "Uygulama ve Platformlar" kartı. ZEYP, Market, Hemen Tıkla ve 1N Intelligence logoları ile bağlantı kutuları da kaldırıldı.
- **Eklenen:** **1N Intelligence** kartı.
  - Alt açıklama: "DİJİTAL ZEKA PLATFORMU".
  - Adres: `https://www.reklam1n.com/intelligence`; aynı sekmede açılır; kartın tamamı tıklanır; logo yok.
  - A7 Prodüksiyon kartının **aynı CSS sınıflarını** kullanır (`n1h-a7card` / `n1h-a7`). Bu yüzden tasarım, ölçü, tipografi, köşe, zemin, iç boşluk, hover ve sağdaki ok düğmesi yapı gereği birebir aynı.
- **Kart sırası:** 1N Digital Media — Başlangıca Dön · A7 Prodüksiyon · 1N Intelligence.
- **Ortak kaynak:** header v16 ve menü verisi v17. Kurumsal menü ve bağımsız Header (İletişim, Akademi, 404) aynı dosyaları kullanır.
- **Dokunulmayanlar:**
  - Ana sayfa (alttaki uygulama tanıtım alanı dahil), Ronin, V1.4, hizmet ve kariyer sayfaları.
  - Footer, bağımsız header üst bölümü, WhatsApp/Yukarı Çık, 404 içeriği.
  - Loader v13.1, SEO, 301.
  - Intelligence Dashboard, müşteri panelleri, takip kodları.
- **Depoda kalanlar:** renkli logolar (`assets/platforms/`) ve tek renkli logolar (`assets/platforms/mono/`) silinmedi.

## 2. Sürümler ve commit'ler
| Dosya | V2.1 → V2.2 |
|---|---|
| Header | v15 → **v16** |
| Menü verisi | v16 → **v17** (yalnız menü JSON'u: `platforms` yerine `intel`) |
| Bağımsız paket | `n1-global-shell-v1-1.js` → **`n1-global-shell-v1-2.js`** (1.2.0; aynı 3 etiket) |
| Kariyer | v3 → v4 |
| Ana sayfa | v662 → v663 |
| Hizmet sayfaları | Kreatif v28, E-Ticaret v29, Sosyal v32, Reklam v28, UI/UX v34, Yapay Zekâ v7, Uygulama v7 |
| Kısaca Biz / Markalar / Yasal | v5 / v15 / v5 |

- **Yayın commit'i (Server URL'ler):** `2a124f910dd62638eaa85c8456b8435b17c28d2a`
- **Header v16 ve menü verisi v17:** `f7b29c2aa1005f836a6495fa3279ccc59255af6d`

Sayfa dosyalarında değişen tek şey header ve menü verisi adresleridir (`tools/build_v22.py` bunu doğrular).

## 3. Hedefli test sonuçları
| Test | Sonuç |
|---|---|
| V2.2 matrisi: Chromium + WebKit × 1920, 1440, 1024, 820, 390, 375, 320 (14 çalıştırma; kurumsal sayfa + bağımsız header + tutarlılık) | **428 geçti, 0 kaldı** |
| Gerçek CDN duman testi (yönlendirme yok; header v16, menü verisi v17, footer v646 ve WhatsApp v632 CDN'den) | 4/4 |
| CDN doğrulama (`verify-cdn-v22.sh`) | **TAMAM: 21 adres** (200, MIME, CORS *, SHA-256 eşleşmesi) |
| Footer ve WhatsApp kodu | Paket farkı yalnız sürüm numarası ve header/menü verisi adresleri (`qa/v22/bundle-diff.txt`). Footer yüksekliği V2.1 ölçümüyle aynı, WhatsApp tek katman. Paket dışındaki klasörlerde 0 dosya değişti. |

Kontrol edilenler:
- Header v16 ve menü verisi v17'nin yüklenmesi (eski sürüm yok).
- Alt kartların yalnız üç kart olması ve sırası; platform kartı, logo ve bağlantı kutularının olmaması; logo dosyası indirilmemesi.
- Intelligence kartı: başlık, açıklama, adres; aynı sekme; kartın tamamının bağlantı olması.
- A7'nin değişmemesi (yeni sekme, `noopener noreferrer`).
- A7 ile **ölçü eşliği**: genişlik, yükseklik, x konumu. 1440'ta ikisi de 380×82 px; 390'da ikisi de 351×82 px.
- A7 ile **stil eşliği**: iç boşluk, köşe, zemin, tipografi, ok düğmesi.
- Hover'ın A7 ile aynı olması; klavyede A7'den Tab ile Intelligence'a geçilmesi.
- Normal kapanış (kart kalmıyor); Intelligence tıklamasıyla aynı sekmede `/intelligence` açılması ve menünün kapanması.
- Panelde yatay taşma olmaması; JS hatası olmaması.
- Bağımsız header'da Teklif Al olmaması ve yüksekliğin aynı kalması; footer yüksekliği ve WhatsApp; kurumsal ve bağımsız kartın aynı olması.

## 4. Ekran görüntüleri (`screenshots/v22/`)
- Yeni menü: `menu-masaustu.png`, `menu-tablet.png`, `menu-mobil.png`.
- Hover: `menu-masaustu-intelligence-hover.png`.
- Bağımsız header: `bagimsiz-header-menu-masaustu.png`, `bagimsiz-header-menu-mobil.png`.
- Alt kartlar, V2.1 (sol) ↔ V2.2 (sağ): `karsilastirma-masaustu.png`, `karsilastirma-tablet.png`, `karsilastirma-mobil.png`.

## 5. Kurulum ve geri dönüş
- Değişecek Server URL'leri (18 sayfa ve bağımsız bileşenler) tek tabloda: **DEPLOYMENT.md §2**. Kopyalanabilir adresler: **SERVER_URLS.md**.
- V2.1 geri dönüş adresleri: **ROLLBACK.md §1**.
