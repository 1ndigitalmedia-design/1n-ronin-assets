# DEPLOYMENT — V1.3 Global Stability & UI Fix

**Hiçbir adım uygulanmadı.** Her aşama sizin onayınızla, Wix Studio'da sizin tarafınızdan yapılır. Her aşamada **tek değişiklik**; sonraki aşamaya iPhone/iPad kabul listesi (§5) geçtikten sonra geçin.

## 0. Yayın öncesi zorunlu kontrol
```bash
bash wix-global-stability-v13/wix-custom-code/verify-cdn-v13.sh
```
Beklenen son satır: `TAMAM: tüm adresler 20/20 ve içerik eşleşiyor` (27 Kasım'da 8 adres × 20 istek, 160/160 başarılı, E-Ticaret v24 dahil bayt eşleşmesi doğrulandı).

## 1. Canlı durum (27 Kasım, canlı HTML'den doğrulandı)

| Öğe | Durum |
|---|---|
| 15 sayfanın Custom Element adresleri | V1.2 adresleri (`39f762f` sayfalar, `162599e` header/markup) — doğru yayınlanmış |
| "1N - Hizmetler Capa Navigasyonu" (Body-end, Tüm sayfalar) | **Hâlâ etkin** — 15 sayfanın hepsinde `n1-nav-v1.js@b35d9875` yükleniyor, `__n1Nav` v1.0.1 etkin. Devre dışı bırakıldığı bildirilmişti; canlıda değil (V1.3_ISSUE_REPORT §0) |
| "1N - V1.1 Test Anahtarı (HEAD)", Head "Capa Navigasyonu" | Canlıda yok (kaldırılmış) |
| "Özel Yükleniyor % Script" (Head, 13 sayfa) | Canlı v1 (ana sayfada çalışmıyor, flicker) |
| "Sayfa Yükleniyor Script" (Head, 14 müşteri sayfası) | Kapsam dışı — **dokunmayın** |

## 2. Aşamalar

| Aşama | Wix'te yapılacak tek değişiklik | Dosya | Beklenen | Geri dönüş |
|---|---|---|---|---|
| **T** Test anahtarı | Yeni özel kod: **Head · Tüm sayfalar · Her yeni sayfada yükle · listede en üste** | `wix-custom-code/TEST-SWITCH-v13-head.html` | Normal ziyaretçide etkisiz (yalnız URL + sessionStorage okuması). `?n1t=…` ile o sekmede varyant | Girişi sil |
| **1** Capa nav kaldırma | "1N - Hizmetler Capa Navigasyonu" (Body-end) girişini **sil** (ya da kapat) | — | `n1-nav-v1.js` hiçbir sayfada yüklenmez (V1.2 Aşama B'nin tamamlanması) | `wix-global-menu-v12/wix-custom-code/A-rollback-original-nav-body-end.html` |
| **2** Menü kapanışı | Yeni özel kod: **Body - end · Tüm sayfalar · Her yeni sayfada yükle**, ad: "1N - Menü Kapanış V1.3" | `wix-custom-code/MENU-CLOSE-v13-body-end.html` | P01 düzelir | Girişi sil |
| **3** Loader v13 | "Özel Yükleniyor % Script" içeriğini **tamamen** değiştir (ayarlar aynı: Head · seçili 13 sayfa) | `wix-custom-code/LOADER-v13-ozel-yukleniyor.html` | P04 flicker yok, P05 ana sayfada loader | İçeriği `LOADER-LIVE-BACKUP-ozel-yukleniyor.html` ile değiştir |
| **4** Ana sayfa v658 | Yalnız **Ana Sayfa** Custom Element Server URL (aşağıda) | — | P02 dokunuşta engellenmiş film başlatılmaz | Eski URL'ye dön |
| **4b** E-Ticaret v24 | Yalnız **E-Ticaret Yönetimi** Custom Element Server URL (aşağıda) | — | Kademeli kaydırmada WebKit çökmesi yok (Playwright'ta doğrulandı) | Eski URL'ye dön |
| **5** (karar) Stabilite | Yalnız iPhone testinde D, C'den iyi çıkarsa: Body-end `<script src="…n1-stability-v1.1.1.js" defer>` | `wix-global-menu-v12/wix-custom-code/C-stability-only-body-end.html` | — | Girişi sil |

Aşama 4'ten **önce** v658 aynı iPhone'da Wix'e dokunmadan denenebilir: `https://www.reklam1n.com/?n1t=C,diag:1` (test anahtarı v658'i Wix'in v657'sinden önce tanımlar; tanılama kutusunda "ana v658: EVET").

### Değişen Custom Element'ler (yalnız 2 sayfa)

| Sayfa | Etiket (değişmez) | Eski Server URL (canlı) | Yeni Server URL |
|---|---|---|---|
| Ana Sayfa | `n1-site-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@39f762f63a2af58a470e9712d8ca0895d6f73f9f/wix-global-menu-v12/pages/wix-home-v657/n1-site-wix-v657.js` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@b9c8fca79bee3d6ab9baca96d19e3888575c9c06/wix-global-stability-v13/home/n1-site-wix-v658.js` |
| E-Ticaret Yönetimi | `n1-e-ticaret-yonetimi-v23` (**değişmez**; v24 dosyası aynı etiketi tanımlar) | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@39f762f63a2af58a470e9712d8ca0895d6f73f9f/wix-global-menu-v12/pages/wix-e-ticaret-yonetimi-v23/n1-e-ticaret-yonetimi-v23.js` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@997f951a4ae76ab2dd95440c4e8e597ffa682499/wix-global-stability-v13/pages/wix-e-ticaret-yonetimi-v24/n1-e-ticaret-yonetimi-v24.js` |

Diğer 13 sayfanın adresi, etiketleri ve öznitelikleri **değişmez**. Wix'te yalnız "Server URL" alanı değişir; "Tag name" alanına dokunmayın.
- v658 = v657 + yalnızca mobil video denetleyicisi `n1-video-m5-v13.js@5c1bcf2` (ROOT_CAUSE §P02-A).
- v24 = v23 + yalnızca `:491` filtre hedefi `none` → `grayscale(0) brightness(1)` (ROOT_CAUSE §P02-B). Görsel eşdeğerlik doğrulandı (TEST_REPORT §6).

### Onay bekleyen (yapılmadı)
- **UI/UX v29:** aynı filtre deseni "Gri tonlamalı önizle" anahtarında (Playwright WebKit 3/7 çökme; düzeltme denemesiyle 0/6). Onaylarsanız tek satırlık sürüm hazırlanır; Server URL değişikliği gerekir.

## 3. Wix ayarı (kod değil, isteğe bağlı)
- `/gizlilik` loader istiyorsa "Özel Yükleniyor % Script" sayfa seçimine **Gizlilik** sayfasını ekleyin (v13'te rota hazır). `/veri-sahibi-basvuru-formu` eklenmemeli (rota yok).
- "Sayfa Yükleniyor Script" (müşteri sayfaları): değişiklik yok.

## 4. Test anahtarı kullanımı (yalnız o sekme; normal ziyaretçiyi etkilemez)
| Adres | Ne test edilir |
|---|---|
| `/?n1t=A,diag:1` | Menü düzeltmesi kapalı (V1.2 menü davranışı) |
| `/?n1t=B,diag:1` | Yayındaki V1.3 (aşamalar uygulandıkça) |
| `/?n1t=C,diag:1` | B + ana sayfa v658 |
| `/?n1t=D,diag:1` | C + stabilite v1.1.1 |
| `/?n1t=E,diag:1` | C + loader kapalı |
| `/?n1t=C,hero:2x,diag:1` · `hero:1.5x` · `hero:1x` · `hero:poster` | Ronin kaynağı (yalnız seçilen tek dosya iner; kutu gerçekte oynayan dosyayı ve çözünürlüğü gösterir: 2x=1120×1504, 1.5x=840×1128, 1x=560×752, poster-only) |
| `/?n1t=0` | Test anahtarını kapat |

Tanılama kutusu son satırı: "olası çökme/kayıp" — bir sayfa `pagehide` görmeden kaybolduysa (Safari sekmeyi yeniden yüklediğinde) sayaç artar. **İpucudur, kanıt değildir.** Ekran görüntüsünü bize iletin.

## 5. iPhone / iPad kabul listesi (aşama aşama)
Cihaz, iOS sürümü, Safari/Chrome ve Düşük Güç Modu durumunu not edin. Her senaryo **en az 3 kez**.

**§1 Menü (Aşama 2 sonrası)**
1. Herhangi bir hizmet sayfası → MENU → Hizmetler → başka hizmet. Geçiş anında "Başlangıca Dön" kartı ve × simgesi **görünmemeli**.
2. Aynısı İnsan Kaynakları alt menüsüyle ve "Başlangıca Dön" kartıyla.
3. Yeni sayfada geri → eski sayfada menü kapalı, MENU simgesi normal (≡).
4. MENU aç/kapa animasyonu eskisi gibi (tasarım değişmemeli). iPad yatay/dikey tekrar.

**§2.2 E-Ticaret kaydırma (Aşama 4b öncesi VE sonrası — en önemli ayırt edici test)**
1. `/e-ticaret-yonetimi` aç, 10 sn bekle. Parmakla **yavaşça**, ekran ekran sonuna kadar kaydır (özellikle "UÇTAN UCA YÖNETİM." listesi: satırlar sırayla renklenir). Sonra yavaşça başa dön.
2. Aşama 4b'den **önce** (v23) sekme çöküyor / "Bu web sayfası yeniden yüklendi" görünüyorsa → bulgu iPhone'da da geçerli; **sonra** (v24) aynı test 5 kez temiz olmalı.
3. iPad dikey ve yatayda tekrar. Düşük Güç Modu açık/kapalı.
4. UI/UX sayfasında "Gri tonlamalı önizle" anahtarına her seferinde 1 sn bekleyerek 10 kez bas (UI/UX v29 kararı için).

**§2 Geçiş ve erken geri (her aşama sonrası, özellikle Aşama 1 ve 4)**
1. Ana sayfa → Hizmetler bölümündeki 7 bağlantının her biri → sayfa açılınca geri.
2. Aynı bağlantılara bas, **sayfa yüklenirken** (≈0,5 / 1 / 2 sn) geri.
3. 10 tur ana sayfa ↔ hizmet. Safari "Bu web sayfası yeniden yüklendi" ya da beyaz ekran görülürse saati ve tanılama kutusunu not edin.
4. Düşük Güç Modu açıkken 1-3.

**§3 Loader (Aşama 3 sonrası)**
1. Ana sayfayı yeni sekmede aç → `%01…%99` loader görünmeli, sonra Ronin.
2. Ana sayfa ↔ Kreatif, Sosyal → Kreatif (menüden): içerik bir an görünüp loader'ın tekrar gelmesi (flicker) **olmamalı**.
3. Hizmet sayfası yüklenirken geri → ana sayfada loader takılı kalmamalı.

**§4 Ronin kaynağı (yalnız test anahtarıyla, üretim değişmez)**
`?n1t=C,hero:2x,diag:1` → 10 tur §2.3; sonra `hero:1.5x`, `hero:1x`, `hero:poster` ile tekrar. Hangi varyantta çökme kayboluyorsa bize iletin; kalite kararı buna göre verilecek.

**§5 Genel**
Header, logo, MENU, footer, WhatsApp, yukarı çık düğmesi, Markalar, GSAP animasyonları, Ronin oynatma/duraklat düğmesi, Hizmetler bölümü videoları.

## 6. Adım adım Wix kurulumu (her adımdan sonra Yayınla + §5 kontrolü)

Varsayılan üretim yapılandırması: menü kapanışı + loader v13 + ana sayfa v658 + E-Ticaret v24. **Stabilite modülü kapalı, Ronin 2×.** Stabilite ve alternatif Ronin kaynakları yalnız test anahtarıyla.

0. Depo kökünde `bash wix-global-stability-v13/wix-custom-code/verify-cdn-v13.sh` → `TAMAM`.
1. **Test anahtarı:** Ayarlar → Özel Kod → + Özel Kod Ekle → `wix-custom-code/TEST-SWITCH-v13-head.html` dosyasının **tamamını** yapıştır → Ad: `1N - V1.3 Test Anahtarı (HEAD)` → Tüm sayfalar · Her yeni sayfada yükle → Konum: **Head** → Kaydet. Head listesinde **en üste** taşı. Yayınla. Kontrol: `https://www.reklam1n.com/?n1t=B,diag:1` → sağ altta kutu.
2. **Capa nav kaldırma:** "1N - Hizmetler Capa Navigasyonu" (Body - end) → Sil (ya da Kapat). Yayınla. Kontrol: kutuda `nav: yok`.
3. **Menü kapanışı:** + Özel Kod Ekle → aşağıdaki 1 satırı yapıştır (dosya: `wix-custom-code/MENU-CLOSE-v13-body-end.html`) → Ad: `1N - Menü Kapanış V1.3` → Tüm sayfalar · Her yeni sayfada yükle → **Body - end**. Yayınla. Kontrol: kutuda `menü: 1.3.0`; §5.1.
   ```html
   <script src="https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@bb6ebc7723625d137035b1074c6dca14c02fb296/wix-global-stability-v13/n1-menu-close-v13.js" defer></script>
   ```
4. **Loader v13:** "Özel Yükleniyor % Script" → Düzenle → içeriği tamamen sil → `wix-custom-code/LOADER-v13-ozel-yukleniyor.html` dosyasının **tamamını** yapıştır. Sayfa seçimi ve Head konumu **aynı** kalır. ("Sayfa Yükleniyor Script" girişine dokunmayın.) Yayınla. Kontrol: kutuda `loader: 1.3`; §5.3.
5. **Ana sayfa:** Ana Sayfa → Custom Element `n1-site-v1` → Ayarlar → Server URL = §2 tablosundaki yeni adres. Tag name değişmez. Yayınla. Kontrol: kutuda `ana v658: EVET`, `Ronin: ronin-m5-film-2x.mp4 1120×1504`; §5.2.
6. **E-Ticaret:** E-Ticaret Yönetimi → Custom Element `n1-e-ticaret-yonetimi-v23` → Server URL = §2 tablosundaki v24 adresi. Tag name **değişmez**. Yayınla. Kontrol: §5.2.2.
7. (Yalnız iPhone testinde D, C'den açıkça iyi çıkarsa ve sizin kararınızla) stabilite girişi — Aşama 5.

Her adımda sorun → ROLLBACK.md'deki ilgili satır. Test anahtarı (1) test süresince kalabilir; normal ziyaretçiyi etkilemez. Testler bitince silinebilir.
