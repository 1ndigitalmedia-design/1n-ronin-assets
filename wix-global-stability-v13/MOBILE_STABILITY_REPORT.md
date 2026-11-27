# MOBILE_STABILITY_REPORT — V1.3 (P02 · P03 · varyantlar A–F)

**Fiziksel iPhone/iPad'de hiçbir şey doğrulanmadı. Bildirilen iPhone çökmesi çözülmüş olarak raporlanmıyor.** Playwright WebKit iOS Safari değildir (bkz. "Ölçülemeyenler").

## 1. İki ayrı değerlendirme

| | Playwright WebKit (Linux) | Fiziksel iPhone (bildirilen) |
|---|---|---|
| Ne biliyoruz | E-Ticaret sayfasında kademeli kaydırmada ve UI/UX'te "Gri tonlamalı önizle" anahtarında **sekme çökmesi**; neden aynı CSS filtre geçişi deseni (`grayscale` ↔ `none`); v24 ve v29 ile 0 çökme | Ana sayfa Hizmetler bağlantılarından hizmet sayfasına geçişte ve hizmet sayfası yüklenirken geri basınca çökme |
| Durum | **Giderildi (E-Ticaret v24, UI/UX v29 — yalnız bu ortamda)** | **Doğrulanmadı / açık.** Hangi sayfada ve hangi anda olduğu bilinmiyor |
| Bağlantı | Aynı motor ailesi (WebKit). Filtre ara değerleme kodu ortak olabilir; çizim altyapısı farklı | Bu hatanın iPhone çökmesinin nedeni olup olmadığı **ancak cihaz testiyle** anlaşılır (DEPLOYMENT §5.2) |

## 2. P02 — Ana sayfa → hizmet sayfası

### 2.1 Doğrulanan durum
- Özel Capa navigasyonu **canlıda hâlâ etkin** (Body-end girişi, 15/15 sayfa). iPhone testleri nav açıkken yapıldı. DEPLOYMENT Aşama 1 ile kaldırılır.
- Bağlantılar standart `<a href>`; tıklamada JS yönlendirme yok (menü düzeltmesi dahil, `preventDefault` yok). Tek tıklamada tek gezinme (P03 düzeneğinde 392/392 tek `commit`).

### 2.2 İncelenen alanlar ve sonuç
| Alan | Bulgu |
|---|---|
| Tıklama/dokunma işleyicileri | Ana sayfa video denetleyicisi engellenmiş oynatmada her dokunuşta `play()` deniyor → bağlantı dokunuşunda 2× film başlatılıyordu. **v658 ile düzeltildi** (canlı 1 `play()` → 0) |
| Video önizlemeleri / kod çözücüler | Sayfa profili (§5): her sayfada 1–5 video, ilk ekranda en çok 1 oynuyor; 1080p kaynaklar (Sosyal, Reklam, AI) kaydırma yaklaşınca yükleniyor |
| GSAP / ScrollTrigger | ST sayısı 2–15/sayfa; temizlik `disconnectedCallback`'te (gsap.context revert + ST kill). Footer modülü `gsap.matchMedia`'yı geri almıyor (küçük sızıntı, yalnız aynı belgede yeniden girişte) |
| Custom Element yaşam döngüsü | 7 sayfa aynı şablon: epoch + `n1Alive()` koruması (yalnız mobil onarım yolunda `isConnected`); `pagehide`/`freeze` işleyicisi yok |
| Promise'ler | Bütün `play()` çağrıları `n1Play` üzerinden ve yakalanıyor |
| Wix ATS | Erken geri dönüşte ana sayfa ikinci kez yükleniyor (WebKit canlı 25/49) — Wix kodu, atlatılmadı |
| Header/footer/loader | Menü kapanışı ve loader v13 düzeltildi; loader kapalı varyant (E) farksız |
| GPU / bellek | **E-Ticaret: CSS filtre geçişi WebKit'i çökertiyor (v24)**. E-Ticaret ayrıca 20 görsel / 30,5 MP / ~29 MB indiriyor (diğer sayfalar 5–10 MP, 2–4 MB) — çökmenin nedeni değil (görseller engellenince de çöküyordu) ama iOS bellek baskısı için en ağır sayfa |

## 3. P03 — Yüklenirken geri (özet; ayrıntı TEST_REPORT §3)
392 döngü, 0 çökme, 0 takılma, 0 1N hatası, 392/392 ana sayfaya dönüş, menü açık kalma 0, bayat loader 0. Aday mekanizmalar (ROOT_CAUSE §P03): videoların `pagehide`'da bırakılmaması, Wix ATS çift yüklemesi.

## 4. Varyantlar A–F (21 döngü / varyant, 390×844, DPR 3, ana sayfa ↔ 7 hizmet, iki yönde kaydırma + 6 sn bekleme)

Tüm varyantlar aynı Wix belge yönlendirmesinden geçti; A canlı HTML aynen, B–F V1.3 özel kodu uygulanmış HTML + test anahtarı. Her koşunun sonunda yapılandırma sayfadan okunarak doğrulandı.

**WebKit**
| Varyant | Döngü | Hata / takılma / çökme | En büyük süreç ort / maks (MB) | Doğrulanan yapılandırma |
|---|---|---|---|---|
| A canlı V1.2 | 21/21 | 0/0/0 | 1986 / 2747 | nav 1.0.1, loader v1, 2× |
| B menü + loader v13, nav yok | 19/21 | 2/2/0 (ana sayfa kaydırma >40 sn) | 1851 / 2267 | menü 1.3.0, loader 1.3, nav yok |
| C B + v658 | 21/21 · tekrar 21/21 | 0/0/0 · 0/0/0 | 2047 / 2837 · 2024 / 2878 | + v658 |
| D C + stabilite | 7/21 · 21/21 · 21/21 | 14/–/0 · 0/0/0 · 0/0/0 | — · 2027 / 2851 · 2044 / 3025 | + stab 1.1.1 |
| E C + loader kapalı | 21/21 | 0/0/0 | 2032 / 2817 | loader 1.3-off |
| F1x C + Ronin 1× | 21/21 | 0/0/0 | 1996 / 2815 | hero `ronin-m5-film.mp4` |

**Chromium**
| Varyant | Döngü | Hata/takılma/çökme | En büyük süreç ort / maks (MB) | JS heap |
|---|---|---|---|---|
| A | 21/21 | 0/0/0 | 494 / 603 | 39 |
| B | 21/21 | 0/0/0 | 512 / 623 | 39 |
| C | 21/21 | 0/0/0 | 512 / 640 | 39 |
| D | 21/21 | 0/0/0 | 521 / 654 | 41 |
| E | 21/21 | 0/0/0 | 504 / 651 | 39 |
| F1x | 21/21 | 0/0/0 | 491 / 643 | 39 |

**Yorum**
- Bellek farkları ±%5 (gürültü). Hiçbir varyant (nav kaldırma, menü, loader, v658, stabilite, Ronin 1×) emülasyonda ölçülebilir bellek/kararlılık farkı yaratmıyor.
- D'nin ilk koşusu 8. döngüden itibaren gezinmenin hiç tamamlanmadığı bir takılma yaşadı; aynı koşullarda iki tekrar 42/42 temiz. Neden belirlenemedi (tek seferlik). B'deki 2 takılma ana sayfa kaydırmasında (>40 sn) ve tekrarlanmadı.
- **Önemli kapsam açığı:** bu döngüler sayfayı %20'lik 5 atlamayla kaydırıyordu; E-Ticaret çökmesini bu yüzden yakalayamadılar. V1.3'te kademeli kaydırma regresyonu eklendi (TEST_REPORT §6).

## 5. Sayfa kaynak profili (390×844, DPR 3, 9 sn bekleme + 8 adımda sona kadar kaydırma)
| Sayfa | Video (oynayan ilk ekran) | Çözülmüş video MP (sonda) | En büyük video | ST | Görsel (MP) | DOM | İndirilen (Chromium) | Süreç maks WebKit / Chromium (MB) |
|---|---|---|---|---|---|---|---|---|
| Ana sayfa | 5 (1) | 4,1 | 1920×1080 | 13 | 7 (8,3) | 950 | 7,8 MB | 982 / 443 |
| Kreatif | 2 (1) | 1,33 | 1280×720 | 9 | 21 (9,6) | 1095 | 2,9 MB | 1088 / 473 |
| E-Ticaret | 3 (1) | 2,49 | 720×1280 | 15 | **20 (30,5)** | 801 | **29,4 MB** | **çöktü** / 509 |
| Sosyal Medya | 4 (1) | 3,64 | 1920×1080 | 4 | 14 (5,1) | 738 | 2,1 MB | 1093 / 469 |
| Reklam | 3 (0–1) | 2,89 | 1920×1080 | 8–9 | 10 (4,7) | 824 | 1,9 MB | 1078 / 413 |
| UI/UX | 1 (0) | 0,92 | 720×1280 | 4–5 | 18 (8,7) | 989 | 4,3 MB | 1154 / 401 |
| AI | 3 (1) | 2,74 | 1080×1080 | 13 | 14 (5,2) | 885 | 1,7 MB | 1022 / 436 |
| Uygulama | 4 (1) | 3,69 | 1280×720 | 2 | 8 (5,1) | 1187 | 1,9 MB | 1090 / 415 |

E-Ticaret görselleri: "Uçtan Uca Yönetim" satır küçük resimleri 1122×1402 PNG orijinalleri 64×80 px'te, bir JPG 2160×2700 orijinali 140×175 px'te gösteriliyor (Wix boyutlandırma adresi kullanılmıyor). **Öneri (yapılmadı, tasarım/görsel kapsamında):** Wix `/v1/fill/w_…` adresleriyle görüntü boyutunda sunmak — ~25 MB daha az indirme, ~100 MB daha az çözülmüş görsel belleği.

## 6. Teknik kararlar
| Karar | Gerekçe |
|---|---|
| Ana sayfa v658 üretime | Düşük Güç Modu'nda gereksiz 2× film başlatmayı kaldırır; başka fark yok |
| E-Ticaret v24 üretime (onaylandı) | Playwright WebKit'te deterministik çökmeyi giderir; görsel eşdeğer |
| UI/UX v29 üretime (onaylandı) | Aynı desen, kullanıcı etkileşimiyle; Playwright WebKit'te v28 5/11 → v29 0/9; görsel eşdeğer |
| Stabilite modülü | **Üretimde etkin değil.** Yalnız `?n1t=D` test seçeneği. Emülasyonda fayda ölçülmedi; iPhone testinde D, C'den iyiyse karar verilir |
| Ronin | **2× korunuyor.** 1,5×/1×/poster yalnız test anahtarıyla |
| Capa nav kaldırma | V1.2 kararının tamamlanması; ölçülebilir zararı yok, karmaşıklığı azaltır |

## 7. Ölçülemeyenler
iOS Safari bellek sınırı ve "sayfa yeniden yüklendi" davranışı, Core Animation/Metal kod çözücü sınırları, Düşük Güç Modu ve termal kısma, gerçek ağ (LTE) zamanlaması, iOS'ta View Transition ve BFCache ayrıntıları, Wix ATS'nin gerçek cihaz çerezleriyle davranışı, iPhone'da hangi sayfada çökme olduğu.
