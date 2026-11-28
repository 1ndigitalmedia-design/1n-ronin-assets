# DESIGN_GUIDE — Kariyer bölümü (İnsan Kaynakları · Açık Pozisyonlar · Staj Programları)

**Dil:** high-end minimalist, editoryal, endüstriyel brütalist. Güç tipografiden ve boşluktan gelir. Süs, fotoğraf, ikon kalabalığı, gradyan, cam efekti, daire ya da rastgele çizgi yok. Ekran görüntüleri: `screenshots/`.

## 1. Referans (mevcut site)
- **Header, Footer, WhatsApp / Yukarı Çık:** ortak bileşenler, birebir. Header v13'te değişen tek şey İnsan Kaynakları satırının davranışı (MENU_UPDATE_REPORT).
- **Tipografi:** sitenin kendi aileleri.
  - **Barlow Condensed 700:** dev başlıklar.
  - **Barlow Condensed 500–600:** vurgu ve durum metni.
  - **Barlow 400–500:** gövde, etiket ve bağlantılar.
- **Boşluk sistemi:** iç sayfalardaki `%90` kapsayıcı (`.cr-wrap`) ve `--gap: clamp(16px, 2vw, 32px)`. 12 sütunlu açıklama ızgarası (Kısaca Biz ile aynı mantık).
- **Mikro tipografi:** büyük harf, `letter-spacing .22em`, 12 px. Örnek: "01 / KARİYER". Sitedeki bölüm etiketleriyle aynı dil.

## 2. Renk
| Belirteç | Değer | Kullanım |
|---|---|---|
| `--bg` | `#080A09` | sayfa zemini (brief) |
| `--g1` | `#0D0F0E` | koyu yönlendirme kartı |
| `--ink` | `#ECEBE5` | başlık ve ana metin (sitedeki değer) |
| `--soft` / `--mute` / `--dim` | `#BDBCB5` / `#9A9B95` / `#6E706A` | gövde / etiket / yol metni |
| `--line` / `--line2` | `rgba(228,227,221,.14)` / `.08` | 1 px bölme çizgileri |
| `--acc` | **`#A2FF00`** | kurumsal vurgu (brief): başlık noktası, numaralar, Açık Pozisyonlar kartı zemini, sayaç çizgisi, odak çerçevesi |
| `--acc-ink` | `#080A09` | `#A2FF00` üzerindeki metin (kontrast ≈ 16:1) |

Not: ortak Header ve Footer kendi vurgu tonlarını (`#A8CF62`) korur. Bu bileşenlere dokunulmadı. Kariyer sayfalarının içeriğinde brief'teki `#A2FF00` kullanıldı.

## 3. Sayfalar
### İnsan Kaynakları (`/insan-kaynaklari`)
1. **Meta satırı:** "01 / KARİYER" solda, `reklam1n.com/insan-kaynaklari` sağda (yalnız masaüstü/tablet). Altında 1 px çizgi.
2. **H1:** iki satır, "İNSAN" / "KAYNAKLARI" ve vurgu renginde nokta. Boyut `clamp(46px, 11.6vw, 204px)`; mobilde `clamp(42px, 14.4vw, 66px)`. Satır aralığı .9 ve satırlar arası .12em: Ç kuyruğu ile İ noktası çakışmaz.
3. **Vurgu + açıklama:** ince çizginin altında. Masaüstünde 6 + 5 sütun; tablet ve mobilde alt alta.
4. **İki büyük yönlendirme kartı.** İkisi de bağlantının tamamıdır (`<a>`; içinde `h2`). Boyut ve ağırlık eşittir.
   - **01 / CAREER — AÇIK POZİSYONLAR.** Zemin `#A2FF00`, metin koyu. Sağ üstte 52 px çerçeveli ↗ ok.
   - **02 / INTERNSHIP — STAJ PROGRAMLARI.** Zemin `#0D0F0E`, 1 px çerçeve, beyaz tipografi. Numara, ok ve nokta `#A2FF00`.
   - Düzen: masaüstü ve tablet (≥ 700 px) yan yana, mobil alt alta (12 px aralık). Köşeler keskin (0 px): endüstriyel blok.

### Açık Pozisyonlar ve Staj Programları
Aynı aile. Kahraman bölümü (meta, H1, vurgu, açıklama) aynıdır, ardından:
- **Durum alanı:** 1 px çerçeveli tipografik blok.
  - Solda dev **"00"** sayacı (Barlow Condensed 700, içi boş, `#A2FF00` çizgi) ve "AÇIK POZİSYON" / "AKTİF PROGRAM" etiketi.
  - Sağda ince çizgi, "■ DURUM" ve durum cümlesi:
    - Açık Pozisyonlar: "Şu anda açık pozisyon bulunmuyor."
    - Staj Programları: "Staj başvuruları şu anda kapalı."
  - Sayaç veri dizisinden hesaplanır; bugün 0 olduğu için gerçek bilgidir.
- **"← İNSAN KAYNAKLARINA DÖN":** büyük harf, vurgu renginde ok, ince alt çizgi.

Bu sayfalarda ilan kartı, form, CV yükleme, e-posta toplama ya da başvuru düğmesi **yok**.

## 4. Etkileşim ve hareket
- **Hover** yalnız `(hover:hover) and (pointer:fine)` cihazlarda:
  - Açık kart: ok kutusu tersine döner (koyu zemin, yeşil ok).
  - Koyu kart: çerçeve yeşile döner, ok kutusu dolar.
  - Ok 3 px çapraz kayar.
  - Mobilde hover'a bağlı hiçbir işlev yok.
- **Odak:** `:focus-visible` 2 px `#A2FF00` çerçeve (kartlarda 6 px dışarıda). Klavye testinde doğrulandı.
- **GSAP** (yalnız çekirdek 3.13, sayfada yoksa yüklenir):
  - Kahraman öğeleri bir kez yumuşak girer (0,9 sn, y 18 → 0).
  - Kartlar ve durum alanı görünür olunca (IntersectionObserver) bir kez girer.
  - Hiçbir döngü, ScrollTrigger ya da sürekli animasyon yok. `prefers-reduced-motion: reduce`'da hiç çalışmaz.
  - GSAP yüklenemezse içerik zaten son hâlindedir; CSS ile gizlenen bir şey yok.
  - Klavye odağı gizli bir öğeye düşerse animasyon iptal edilir ve öğe görünür.

## 5. Performans bütçesi (ölçülen, TEST_REPORT)
- **Medya:** video, canvas, WebGL ve görsel dosyası yok (Footer'daki mevcut partner görseli hariç). Medya isteği 0.
- **Bileşen betiği:** 33,8 KB (sıkıştırmasız), tek dosya, üç sayfa ortak.
- **Ek kütüphane:** yalnız GSAP çekirdeği (zaten sitenin ortak kütüphanesi; diğer sayfalardan gelindiğinde önbellekte).

## 6. Kullanılan beceriler (dürüst beyan)
| Beceri | Durum | Nasıl kullanıldı |
|---|---|---|
| `industrial-brutalist-ui` | **yüklendi** | Izgara, 1 px görünür bölme, keskin köşe, büyük harf ve sıkı satır aralıklı dev başlık, mikro tipografi etiketleri, ölçek kontrastı. Renk ve font önerileri (kırmızı vurgu, monospace) kurumsal kimlik nedeniyle **uygulanmadı**. |
| `minimalist-ui` | **yüklendi** | Bol beyaz alan, kısıtlı renk, sade metin, yalnız `transform` / `opacity` ile hareket, IntersectionObserver ile giriş, emoji ve klişe metin yok. Açık zemin ve pastel renk önerileri marka nedeniyle **uygulanmadı**. |
| `responsive-mobile-qa`, `webapp-testing`, `gsap` | V1.0 aşamasında yüklenmişti; bu aşamada **yeniden yüklenmedi** | Yöntemleri uygulandı: cihaz profilleri, Playwright test düzeni, `gsap.context` + `matchMedia` temizliği. |
| `frontend-design`, `high-end-visual-design`, `ui-ux-pro-max` | ortamda var, **yüklenmedi** | Kullanılmadı. |
