# DEPLOYMENT — 1N birleşik yayın paketi: Wix Studio kurulumu (ana belge)

> **Hiçbir adım canlıya uygulanmadı** (Wix Save / Publish yok, PR birleştirilmedi). Adresler: **SERVER_URLS.md** · Geri dönüş: **ROLLBACK.md** · CDN: **CDN_VERIFICATION.md** · Wix davranışı: **WIX_COMPATIBILITY.md**.

## 0. Önce (2 dk)
1. Depo kökünde `bash wix-global-shell-v1/wix-custom-code/verify-cdn-shell.sh` → **TAMAM**.
2. Wix Studio → Site Geçmişi'nde mevcut sürümü not edin.
3. Bütün adımlar tek oturumda yapılır ve **tek Yayınla** ile canlıya alınır. Yarım kurulumda yayınlamayın (menü yeni sayfalara ve İletişim'e işaret eder).

## 1. Kariyer sayfaları (Kariyer V1 kurulumu; adresler bu pakettekiler)
| Sayfa | URL | Yeni mi? | Tag Name | Server URL | Öznitelik | SEO Title | Meta Description | Özel kod | Geri dönüş |
|---|---|---|---|---|---|---|---|---|---|
| İnsan Kaynakları | `/insan-kaynaklari` | **canlıda VAR, içerik yanlış** | `n1-insan-kaynaklari-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/pages/n1-career-v2.js` | yok | `İnsan Kaynakları | 1N Reklam ve Digital Media` | 1N Digital Media kariyer fırsatlarını keşfedin. Açık pozisyonlarımızı ve staj programlarımızı takip ederek yaratıcı dünyamıza adım atın. | Loader v13.1 sayfa seçimine ekle | ROLLBACK §3 |
| Açık Pozisyonlar | `/acik-pozisyonlar` | **yeni** (canlıda 404) | `n1-acik-pozisyonlar-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/pages/n1-career-v2.js` | yok | `Açık Pozisyonlar | 1N Reklam ve Digital Media` | 1N Digital Media bünyesindeki güncel iş fırsatlarını ve açık pozisyonları takip edin. Yeni kariyer duyurularımızı keşfedin. | Loader v13.1 sayfa seçimine ekle | ROLLBACK §3 |
| Staj Programları | `/staj-programlari` | **canlıda VAR, içerik yanlış** | `n1-staj-programlari-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/pages/n1-career-v2.js` | yok | `Staj Programları | 1N Reklam ve Digital Media` | 1N Digital Media staj programlarına ilişkin güncel duyuruları ve gelecekteki staj fırsatlarını bu sayfadan takip edin. | Loader v13.1 sayfa seçimine ekle | ROLLBACK §3 |

> **28 Kasım 2026 canlı tespiti:** `/insan-kaynaklari` ve `/staj-programlari` sayfaları Wix'te oluşturulmuş ve yayında. Ancak ikisinde de **"VERİ SAHİBİ BAŞVURU FORMU."** içeriği çiziliyor: Custom Element bir yasal sayfanın kopyası (Server URL `…@39f762f…/n1-yasal-sayfalar-v1.js`, Tag Name `n1-veri-sahibi-basvuru-v1`). Meta description yok. Menü eski (v12, İletişim yok). `/acik-pozisyonlar` hâlâ 404.
> Bu iki sayfada **yeni sayfa oluşturmayın**. Sayfadaki mevcut Custom Element'i seçin; **Server URL**'yi yukarıdaki kariyer adresiyle, **Tag Name**'i tablodaki etiketle değiştirin (`n1-insan-kaynaklari-v1` / `n1-staj-programlari-v1`). Wix'te tanımlı öznitelikleri silin (kariyer bileşeni öznitelik kullanmaz). Ardından SEO alanlarını tablodaki değerlerle doldurun. Yalnız **Açık Pozisyonlar** yeni sayfa olarak oluşturulur.

Her biri: Sayfalar → + Sayfa Ekle → boş sayfa · SEO Temelleri: slug ve tablodaki title/description (canonical boş) · Custom Element: Server URL + Tag Name, genişlik %100, yükseklik Auto · bu sayfalarda Wix'in kendi header/footer'ı gizli (Kısaca Biz ile aynı). Ayrıntı: `wix-career-v1/SEO_SETTINGS.md`.

## 2. Menü nedeniyle Server URL'i değişen mevcut sayfalar (11 dosya / 15 Custom Element)
Yalnız **Server URL** alanı değişir; Tag Name ve Wix'te tanımlı öznitelikler aynen kalır. Dosyalarda değişen tek şey Header v14 + site işaretlemesi v16 adresleri; V1.4 optimizasyonları, içerik, tasarım ve medya aynı.

| Sayfa | URL | Tag Name (değişmez) | Eski Server URL (bugün canlı = geri dönüş) | Yeni Server URL | Korunacak öznitelikler |
|---|---|---|---|---|---|
| Ana Sayfa | `/` | `n1-site-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@36a24d3d5af5be5e5493598af4375f070a26b002/wix-mobile-performance-v14/home/n1-site-wix-v659.js` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/sites/home/n1-site-wix-v661.js` | `assets-base`, `ronin-base`, `ronin-mobile-base`, `ronin-tier`, `hero-video`, `hero-poster`, `home-base`, `sticky-fix`, `debug` (tanımlı olanlar aynen) |
| Kreatif Prodüksiyon | `/kreatif-produksiyon` | `n1-kreatif-produksiyon-v23` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@36a24d3d5af5be5e5493598af4375f070a26b002/wix-mobile-performance-v14/pages/wix-kreatif-produksiyon-v24/n1-kreatif-produksiyon-v24.js` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/sites/pages/wix-kreatif-produksiyon-v26/n1-kreatif-produksiyon-v26.js` | `deps-base`, `cta-href` ve tanımlı diğerleri (aynen) |
| E-Ticaret Yönetimi | `/e-ticaret-yonetimi` | `n1-e-ticaret-yonetimi-v23` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@36a24d3d5af5be5e5493598af4375f070a26b002/wix-mobile-performance-v14/pages/wix-e-ticaret-yonetimi-v25/n1-e-ticaret-yonetimi-v25.js` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/sites/pages/wix-e-ticaret-yonetimi-v27/n1-e-ticaret-yonetimi-v27.js` | `deps-base`, `cta-href` ve tanımlı diğerleri (aynen) |
| Sosyal Medya | `/sosyal-medya` | `n1-sosyal-medya-v27` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@36a24d3d5af5be5e5493598af4375f070a26b002/wix-mobile-performance-v14/pages/wix-sosyal-medya-v28/n1-sosyal-medya-v28.js` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/sites/pages/wix-sosyal-medya-v30/n1-sosyal-medya-v30.js` | `deps-base`, `cta-href` ve tanımlı diğerleri (aynen) |
| Reklam Yönetimi | `/reklam-yonetimi` | `n1-reklam-yonetimi-v23` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@36a24d3d5af5be5e5493598af4375f070a26b002/wix-mobile-performance-v14/pages/wix-reklam-yonetimi-v24/n1-reklam-yonetimi-v24.js` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/sites/pages/wix-reklam-yonetimi-v26/n1-reklam-yonetimi-v26.js` | `deps-base`, `cta-href` ve tanımlı diğerleri (aynen) |
| UI/UX Tasarım | `/ui-ux-tasarim` | `n1-uiux-tasarim-v28` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@36a24d3d5af5be5e5493598af4375f070a26b002/wix-mobile-performance-v14/pages/wix-uiux-tasarim-v30/n1-uiux-tasarim-v30.js` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/sites/pages/wix-uiux-tasarim-v32/n1-uiux-tasarim-v32.js` | `deps-base`, `cta-href` ve tanımlı diğerleri (aynen) |
| Yapay Zekâ | `/yapay-zeka` | `n1-yapay-zeka-v2` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@36a24d3d5af5be5e5493598af4375f070a26b002/wix-mobile-performance-v14/pages/wix-yapay-zeka-v3/n1-yapay-zeka-v3.js` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/sites/pages/wix-yapay-zeka-v5/n1-yapay-zeka-v5.js` | `deps-base`, `cta-href` ve tanımlı diğerleri (aynen) |
| Uygulama Geliştirme | `/uygulama-gelistirme` | `n1-uygulama-gelistirme-v2` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@36a24d3d5af5be5e5493598af4375f070a26b002/wix-mobile-performance-v14/pages/wix-uygulama-gelistirme-v3/n1-uygulama-gelistirme-v3.js` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/sites/pages/wix-uygulama-gelistirme-v5/n1-uygulama-gelistirme-v5.js` | `deps-base`, `cta-href` ve tanımlı diğerleri (aynen) |
| Kısaca Biz | `/kisaca-biz` | `n1-kisaca-biz-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@39f762f63a2af58a470e9712d8ca0895d6f73f9f/wix-global-menu-v12/pages/wix-kisaca-biz-v1/n1-kisaca-biz-v1.js` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/sites/pages/wix-kisaca-biz-v3/n1-kisaca-biz-v3.js` | `deps-base`, `cta-href` ve tanımlı diğerleri (aynen) |
| Markalar | `/markalar` | `n1-markalar-v11` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@39f762f63a2af58a470e9712d8ca0895d6f73f9f/wix-global-menu-v12/pages/wix-markalar-v1/n1-markalar-v11.js` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/sites/pages/wix-markalar-v13/n1-markalar-v13.js` | `deps-base`, `cta-href` ve tanımlı diğerleri (aynen) |
| Gizlilik Politikası | (mevcut) | `n1-gizlilik-politikasi-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@39f762f63a2af58a470e9712d8ca0895d6f73f9f/wix-global-menu-v12/pages/wix-yasal-sayfalar-v1/n1-yasal-sayfalar-v1.js` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/sites/pages/wix-yasal-sayfalar-v3/n1-yasal-sayfalar-v3.js` | tanımlı olanlar (aynen) |
| KVKK Aydınlatma Metni | (mevcut) | `n1-kvkk-aydinlatma-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@39f762f63a2af58a470e9712d8ca0895d6f73f9f/wix-global-menu-v12/pages/wix-yasal-sayfalar-v1/n1-yasal-sayfalar-v1.js` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/sites/pages/wix-yasal-sayfalar-v3/n1-yasal-sayfalar-v3.js` | tanımlı olanlar (aynen) |
| Çerez Politikası | (mevcut) | `n1-cerez-politikasi-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@39f762f63a2af58a470e9712d8ca0895d6f73f9f/wix-global-menu-v12/pages/wix-yasal-sayfalar-v1/n1-yasal-sayfalar-v1.js` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/sites/pages/wix-yasal-sayfalar-v3/n1-yasal-sayfalar-v3.js` | tanımlı olanlar (aynen) |
| Kullanım Koşulları | (mevcut) | `n1-kullanim-kosullari-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@39f762f63a2af58a470e9712d8ca0895d6f73f9f/wix-global-menu-v12/pages/wix-yasal-sayfalar-v1/n1-yasal-sayfalar-v1.js` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/sites/pages/wix-yasal-sayfalar-v3/n1-yasal-sayfalar-v3.js` | tanımlı olanlar (aynen) |
| Veri Sahibi Başvuru Formu | (mevcut) | `n1-veri-sahibi-basvuru-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@39f762f63a2af58a470e9712d8ca0895d6f73f9f/wix-global-menu-v12/pages/wix-yasal-sayfalar-v1/n1-yasal-sayfalar-v1.js` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/sites/pages/wix-yasal-sayfalar-v3/n1-yasal-sayfalar-v3.js` | tanımlı olanlar (aynen) |

## 3. Bağımsız HEADER — `n1-global-header-v1`
| Ayar | Değer |
|---|---|
| Server URL | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/n1-global-shell-v1.js` |
| Tag Name | `n1-global-header-v1` |
| Gerekli öznitelik | yok (`deps-base` yalnız Wix dışı önizleme içindir; eklemeyin) |
| Masaüstü (> 1024 px) | genişlik **%%100**, yükseklik **88 px** |
| Tablet (768–1024 px) | genişlik **%100**, yükseklik **72 px** |
| Mobil (≤ 767 px) | genişlik **%100**, yükseklik **64 px** |
| Wix yerleşimi | Sayfanın en üst bölümü (ya da sayfanın Header alanı). Bölüm: tam genişlik (Stretch / Full width), yatay iç boşluk 0, kenar boşluğu 0. Öğe: bölüme sabitlenmiş (dock) üst-sol, genişlik %100, yükseklik yukarıdaki değerler (ya da Auto). İçerik genişliği (%90, kenarlarda %5) bileşenin içindedir; Wix'te ayrıca kenar boşluğu vermeyin. |
| Sabitleme / sticky | İsteğe bağlı. Kurumsal sayfalardaki gibi ekranın üstünde kalsın isterseniz Header bölümünü Wix'te **"Sabitle / Freeze"** (Studio: Header → Scroll effect: *Freeze* ya da bölüm *Sticky*) yapın. Bileşen kendisi `position:fixed` kullanmaz; Wix'in sabitlemesiyle çakışmaz. |
| Overflow | Wix'te ek ayar gerekmez: menü paneli bileşenin içinde değil, sayfanın gövdesinde (`document.body`, `position:fixed`) açılır; bölümün "taşmayı gizle" ayarı paneli kırpmaz. |
| Katman sırası | Header bölümünü sayfa içeriğinin üstünde bırakın (Wix varsayılanı). Menü paneli z-index 99990 ile içerik, Wix Forms ve footer'ın üzerindedir; yalnız Wix'in kendi sabit katmanları (ör. sohbet balonu) bunun üstünde olabilir. |
| Menü için ek Wix ayarı | yok: Popup, Lightbox, Velo dosyası, sayfa kodu ya da HTML Embed mesajlaşması gerekmez. |
| Önemli | Editörde ve Önizleme'de Custom Element iframe içinde çizilir; menü orada kutuya sıkışmış görünebilir. Menünün sayfanın üzerinde açıldığını **yayınlanmış sitede** kontrol edin (WIX_COMPATIBILITY.md). |

## 4. Bağımsız FOOTER — `n1-global-footer-v1`
| Ayar | Değer |
|---|---|
| Server URL | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@144d964a795e515e3b79f0e39c0eeee244a786f8/wix-global-shell-v1/n1-global-shell-v1.js` |
| Tag Name | `n1-global-footer-v1` |
| Gerekli öznitelik | yok |
| Masaüstü 1920 / 1440 px | genişlik %100 · ölçülen içerik yüksekliği **611 / 578 px** |
| Tablet 1024 / 820 px | genişlik %100 · **718 / 784 px** |
| Mobil 440 / 390 / 375 / 320 px | genişlik %100 · **892 / 867 / 844 / 856 px** |
| Wix yerleşimi | Sayfanın en alt bölümü: tam genişlik, iç/dış boşluk 0, arka plan #080A09. Öğe genişliği %100, yüksekliği **Auto** (önerilen; içerikten gelir). Auto kullanılamıyorsa her kırılma noktasında yukarıdaki yükseklikleri girin (yazı tipi farkı için +0–8 px pay bırakmayın; fazla yükseklik altta boşluk bırakır). |
| Alt boşluk olmaması için | Footer bölümü sayfanın son bölümü olsun; altında boş bölüm ya da Wix'in kendi footer'ı kalmasın (sayfa ayarlarında Wix footer'ını gizleyin); bölümün alt boşluğu 0; öğe yüksekliği Auto. |

## 5. WhatsApp / Yukarı Çık (isteğe bağlı) — `n1-global-floating-v1`
Sayfanın herhangi bir yerine (ör. footer bölümünün içine) 1×1 px'lik bir Custom Element olarak ekleyin; Server URL yukarıdakiyle aynı. Kontroller ekrana sabit katman olarak (`document.body`) eklenir, footer'ın içine sıkışmaz. Sayfada zaten WhatsApp katmanı varsa ikincisini oluşturmaz. Kurumsal (1N) sayfalara eklemeyin; onlar kendi katmanını getirir.

## 6. Sayfa kurulum sıraları
### İletişim — `/iletisim`
1. Sayfa ayarları → Wix'in genel Header ve Footer'ını bu sayfada gizleyin.
2. **Bölüm 1 (Header):** tam genişlik bölüm → Custom Element `n1-global-header-v1` (§3).
3. **Bölüm 2 (İçerik):** mevcut İletişim HTML V4 bölümü **olduğu gibi** (kod değişmez; HTML Embed genişliği %100, yüksekliği içeriğe göre).
4. **Bölüm 3 (Form):** ayrı, tam genişlik bir bölüm → **Wix Forms** formunuz. Bu bölüm İletişim içeriği ile Footer arasında, kendi bölümünde durur; HTML Embed'in içine konmaz.
5. **Bölüm 4 (Footer):** Custom Element `n1-global-footer-v1` (§4); isteğe bağlı aynı bölüme `n1-global-floating-v1` (§5).
6. Header, içerik, form ve footer ayrı bölümlerdir; birbirine binmez (test sayfasında doğrulandı, TEST_REPORT).

### Akademi — `/reklam-ajansi`
1. Mevcut içerik (blog, yazılar, görseller, Wix bileşenleri) **değişmez**.
2. Wix'in bu sayfadaki header'ını gizleyin; en üste tam genişlik bölüm → `n1-global-header-v1`.
3. Wix footer'ını gizleyin; en alta tam genişlik bölüm → `n1-global-footer-v1` (+ isteğe bağlı `n1-global-floating-v1`).
4. Menüde "Akademi" aktif görünür (adres tabanlı; ek ayar yok).

### Error 404
Wix Studio'da 404 sayfası, URL slug'ı **`error404`** olan normal bir sayfadır (Wix Yardım: *Studio Editor: Creating a Custom 404 Page*); öğe eklenebilir ve genel header/footer gizlenebilir. Wix durum kodunu (404) kendisi döndürür; bu kurulum durum kodunu ya da hatalı adreslerin davranışını değiştirmez (yönlendirme yok).
1. Sayfalar → mevcut 404 (error404) sayfası. İçerik tasarımına dokunmayın.
2. Genel header/footer'ı bu sayfada gizleyin; en üste `n1-global-header-v1`, en alta `n1-global-footer-v1` bölümlerini ekleyin.
3. **Doğrulama zorunlu:** Custom Element'in 404 sayfasında desteklendiği belgelerle uyumludur ancak canlı ortamda doğrulanmadı. Yayından sonra `https://www.reklam1n.com/olmayan-bir-adres` açın: header, menü ve footer görünmeli; `curl -I` hâlâ **404** döndürmeli.
4. **Wix 404 sayfasında Custom Element görünmezse (desteklenen alternatif):** bileşenleri kaldırın, sayfanın mevcut Wix header/footer'ını geri açın (bugünkü hâl). Bu, 404 durum kodunu ve içeriği korur; kurumsal görünüme en yakın desteklenen seçenek odur. Hiçbir yönlendirme kurmayın.

## 7. Özel kod: Loader
Kariyer V1'deki **Loader v13.1** (yalnız `/insan-kaynaklari` ve `/staj-programlari` rotaları) kurulacak: "Özel Yükleniyor % Script" içeriğini `wix-career-v1/wix-custom-code/LOADER-v13.1-ozel-yukleniyor.html` ile değiştirin; sayfa seçimine 3 kariyer sayfasını ekleyin. Yedek: `wix-global-stability-v13/wix-custom-code/LOADER-v13-ozel-yukleniyor.html`.
İletişim ve Akademi zaten loader rotalarında; loader bu sayfalarda yalnız Wix'in ana içerik kabını bekler (`#SITE_CONTAINER`/`main`), bağımsız bileşenleri **beklemez** → takılma yok. 404 rotalarda yok → loader çalışmaz. Bu yüzden **ek loader değişikliği gerekmez.** Müşteri panellerindeki "Sayfa Yükleniyor Script" girişine dokunmayın.

## 8. 301: `/ekibimize-katil` → `/insan-kaynaklari`
Panel → Ayarlar → SEO → **URL Yönlendirme Yöneticisi** → Yeni yönlendirme: `/ekibimize-katil` → `/insan-kaynaklari`, **301**. (`/ekibimize-katil` bugün 404; doğrudan eklenebilir. Editörde bu adresli gizli bir sayfa varsa silmeyin; slug'ını `ekibimize-katil-arsiv` yapıp yönlendirmeyi ekleyin.)

## 9. Yayından sonra 5 dakikalık kontrol
1. Kurumsal bir sayfada MENU: 6 başlık (İletişim dahil), İK → KARİYER + alt menüsü, Başlangıca Dön, A7 Prodüksiyon (yeni sekme), 4 logo (ZEYP, Market, Hemen Tıkla, Intelligence).
2. Telefonda menü ekranı aşmıyor (gerekirse kendi içinde kayar); bağlantıya dokununca menü kapanıyor; geri tuşunda menü kapalı.
3. İletişim / Akademi / 404: bağımsız header (Teklif Al yok, yeşil #A2FF00 logo), menü sayfanın üzerinde açılıyor, footer altta boşluk yok.
4. Ana sayfa: Ronin ve "Hikâyemizin Devamı" → /kisaca-biz; telefonda hizmet sayfalarında V1.4 kareleri yerinde.
