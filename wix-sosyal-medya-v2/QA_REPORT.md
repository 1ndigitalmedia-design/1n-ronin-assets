# QA Raporu — Sosyal Medya V2

Tarih: 24.11.2026 · Dosya: `n1-sosyal-medya-v2.js` (84.013 bayt, `node --check` hatasız)

## 1. Nasıl test edildi
| Ortam | Ne için |
|---|---|
| **Playwright + Chromium (headless)**, `preview.html` yerel sunucuda | 10 genişlikte otomatik ölçüm, etkileşim, dayanıklılık testleri. Bu ortamda Wix görselleri aynı ID'lerle, gerçek en/boy oranlarında **yer tutucu** görsellerle değiştirildi; video istekleri bilerek engellendi (yedek davranışını test etmek için). Header/Footer, fontlar ve GSAP gerçek adreslerinden yüklendi. |
| **Gerçek tarayıcı (Claude masaüstü uygulamasındaki Chromium paneli)** | Gerçek görsel ve videolarla görsel kontrol ve `screenshots/` klasöründeki 20 ekran görüntüsü (1440×900, 820×1180, 390×844). Bileşen `video.wixstatic.com` kaynağında açılan bir sekmeye yüklendi. |

## 2. Otomatik ölçümler — 10 genişlik
360, 375, 390, 430, 768, 820, 1024, 1366, 1440, 1920 px. Her genişlikte sayfa baştan sona kaydırıldı.

| Kontrol | Sonuç (10 genişliğin tamamı) |
|---|---|
| Yatay taşma (`scrollWidth` = pencere genişliği) | Yok |
| Footer altı boşluk | 0 px |
| Final bölümü → Footer arası boşluk | 0 px |
| Header / mobil panel / Footer / yüzen kontroller | 1 / 1 / 1 / 1 (çift katman yok) |
| GSAP / ScrollTrigger script sayısı | 1 / 1 |
| Pin / spacer | 0 |
| Kaydırma sonrası görünmez kalan metin | 0 |
| Hero'da görünmez öğe | 0 |
| Başlıkların birbirine veya medyaya çakışması | Yok (çok sayıda metin–görsel çifti ölçüldü) |
| Unicode ok (→ ← ↗ vb.) veya emoji | Yok |
| Yasak yeşil (#A1FF00 / #A2FF00) | Yok; tek vurgu #A8CF62 |
| `aria-hidden` olmayan SVG / adı olmayan düğme | 0 / 0 |
| Görsellerin yüklenmesi | Tamamı yüklendi (lazy olanlar kaydırınca) |
| "BAKIŞI" görsel dolgusu | Uygulandı |
| Konsol / sayfa hatası | Yok |

## 3. Etkileşim
| Kontrol | Sonuç |
|---|---|
| Neden sekmeleri — tıklama | Doğru panel açılıyor, `aria-selected`, `tabindex`, `aria-labelledby` güncelleniyor |
| Ok tuşları / End | Sonraki sekmeye ve son sekmeye geçiyor, odak taşınıyor |
| Önceki / sonraki düğmeleri | Döngüsel çalışıyor (5'ten sonra 1) |
| Telefonda aktif sekme | Yatay listede görünür alana kaydırılıyor |
| Telefonda görsel üzerinde kaydırma (swipe) | Kodda var; gerçek parmakla **test edilmedi** (bkz. bölüm 7) |
| "Bir fikir … dönüşür" kelime değişimi | 5 durumun tamamı kaydırmayla görüldü (01234) |
| CTA'lar | PROJENİZİ KONUŞALIM → `/iletisim`, TEKLİF AL → `/teklif-al`, ikisi de tıklanabilir (üstte başka katman yok) |
| Menü linkleri, logo | Onaylı Header'dan geliyor; adresler README'deki listeyle aynı |
| Yukarı Çık | En alttan tıklandı, sayfa başına döndü (10833 → 0) |

## 4. Dayanıklılık
| Senaryo | Sonuç |
|---|---|
| GSAP sayfada önceden yüklü + bileşeni 3 kez kaldırıp yeniden ekleme | Her kaldırmada ScrollTrigger 0, stil kaldırıldı, katmanlar 0/0/0/0, videolar durdu ve kaynakları bırakıldı. Her eklemede 1/1/1/1, GSAP script sayısı 1, sayfa yüksekliği aynı (11.733 px). Son durumda gizli metin 0, taşma yok. |
| `prefers-reduced-motion: reduce` (1440 ve 390) | Gizli metin 0, transform'u kalan öğe yok, kırpılmış (clip) medya yok, 5 sekme çalışıyor, video kendiliğinden oynamıyor |
| GSAP yüklenemiyor (cdnjs engellendi; 1440 ve 390) | Bütün içerik görünür, katmanlar 1/1/1/1, kırpılmış medya yok, hata yok |
| Yön değişimi (390×844 → 844×390 → 390×844) | Taşma yok, Footer boşluğu 0, gizli metin yok |

## 5. Video (gerçek tarayıcıda)
- 1440: hero 720p oynuyor; hareket bölümüne gelince hero durdu, hareket videosu (720p) oynadı → aynı anda tek video doğrulandı.
- 390: hero 480p seçildi. İkinci video bölüme yaklaşılana kadar kaynaksız kaldı.
- Video öznitelikleri: `muted`, `playsinline`, `autoplay` yok, hero `preload=metadata`, ikinci `preload=none`.
- Playwright'ta videolar engellendiğinde poster + "Video şu anda yüklenemedi…" notu göründü.

## 6. Gerçek tarayıcı ekran görüntüleri
`screenshots/` — gerçek görsel ve videolarla:
- 1440: hero, hikâye, neden (sekmeler), hareket, ritim, bakış (manifesto), final
- 820: hero, hikâye, neden, hareket, bakış, final
- 390: hero, hikâye, neden, hareket, ritim, bakış, final

Bu görüntüler incelendi; Türkçe harflerde (İ, Ş, Ğ, Ü, Ç, Â) kesilme görülmedi, hero'daki "fark" karışımı (başlık video üzerinden geçtiği yerde renk tersine dönüyor) gerçek videoda da çalışıyor.

## 7. Test EDİLMEYENLER / sınırlar (dürüst not)
- **Gerçek Wix Studio ortamı test edilmedi.** Custom Element'in Wix dış kutusu içindeki yüksekliği, Wix'in kendi kaydırma ve yükleme sırası, editör önizlemesi ve yayınlanmış site bu pakette doğrulanamadı. README'deki yükseklik notuna bakın; Test Site'ta kontrol şart.
- **Gerçek cihaz yok.** iPhone Safari, Android Chrome, iPad Safari'de test yapılmadı; telefon/tablet ölçüleri masaüstü Chromium'da emüle edildi. iOS Safari'de video otomatik oynatma politikası, `mix-blend-mode` ve `background-clip:text` davranışı cihazda ayrıca kontrol edilmeli.
- **Firefox ve Safari** test edilmedi (yalnızca Chromium).
- **Dokunmatik kaydırma (swipe)** gerçek parmakla denenmedi; yalnızca kodu ve klavye/düğme yolları test edildi.
- **Ekran okuyucu** (VoiceOver/NVDA) ile dinleme yapılmadı; yalnızca ARIA öznitelikleri ve odak sırası otomatik olarak kontrol edildi.
- **Performans ölçümü** (Lighthouse, LCP/CLS, yavaş ağ) yapılmadı.
- Gerçek tarayıcı paneli arka planda çalıştığı için zamanlayıcıları kısıtlıyordu; ekran görüntülerinde animasyonlar elle ilerletildi. Bu panelde, sayfa aşağı kaydırılmışken bileşen kaldırılıp yeniden eklendiğinde tetikleyici konumlarının eski kaydırma değeriyle hesaplandığı bir test ortamı yan etkisi görüldü; sayfa yenilenince sorun kalmadı. Aynı yeniden ekleme senaryosu Playwright'ta normal kaydırmayla 3 kez sorunsuz geçti. Yine de Wix'te sayfa geçişlerinde içerik görünürlüğü kontrol edilmeli.
- Header/Footer onaylı commit'ten yüklendi ama bu sayfada değiştirilmediği için ayrıca regresyon testi yapılmadı.
