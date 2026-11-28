# MENU_UPDATE_REPORT — Global menü: İnsan Kaynakları

## 1. Önce (canlı, 28 Kasım 2026)
- Menü içeriği iki yerde tanımlı:
  - Her sayfanın yüklediği **site işaretlemesi** (markup v12, ana sayfada v14) içindeki `<n1-header>` JSON'u.
  - Header modülünün varsayılan menüsü.
- **İnsan Kaynakları** bağlantısı olmayan bir düğmeydi; yalnız alt menüyü açıyordu. Alt menü: "Ekibimize Katıl" → `/ekibimize-katil` (canlıda **404**), "Açık Pozisyonlar" → `/acik-pozisyonlar` (canlıda **404**).
- Header (v12) ve markup her sayfanın kendi kodunda **sabit commit SHA** ile yükleniyor (`162599e…`). Bu yüzden menü tek bir yerden değiştirilemez; menüyü taşıyan her sayfanın yeni adresle yayınlanması gerekir.
- **Footer'da kariyer bağlantısı yok** (iletişim + yasal bağlantılar). Değişiklik gerekmedi.
- Mobil ve tablette de aynı `n1-header` bileşeni kullanılıyor; iç sayfalar mobil görünümü kendi CSS'leriyle açıyor. Ayrı bir mobil menü bileşeni yok.

## 2. Sonra
```
İnsan Kaynakları  → /insan-kaynaklari          (başlık metni bağlantıdır)
  ├ Açık Pozisyonlar → /acik-pozisyonlar
  └ Staj Programları → /staj-programlari
```
- **"Ekibimize Katıl" menüden tamamen kaldırıldı.** Header varsayılan menüsünden ve markup JSON'undan. Sayfa metinlerinde de görünmüyor (testte `document.body.innerText` taraması).
- **Diğer başlıklar** (Kısaca Biz, Hizmetler + 7 alt sayfa, Markalar, Akademi, marka kartı) birebir aynı; testte karşılaştırıldı.

## 3. Header v13: bağlantı ve alt menü birbirini engellemez
`wix-career-v1/modules/n1-header-v13.js`, v12'den `tools/build_header.py` ile birebir eşleşmeli değişikliklerle üretildi.

| Durum | Davranış |
|---|---|
| Satır yapısı | "İnsan Kaynakları" metni `<a href="/insan-kaynaklari">`. Hemen sağında ayrı bir `<button class="n1h-subtog">`: v12'deki not alanının yerinde, "KARİYER" yazısı ve + işareti. `aria-expanded`, `aria-controls` ve `aria-label="İnsan Kaynakları alt menüsü"` taşır. |
| Masaüstü, fare | Başlığın ya da düğmenin üzerine gelince alt menü açılır (v12 ile aynı 90 ms gecikme). Başlığa tıklamak sayfaya gider; düğmeye tıklamak alt menüyü aç/kapa yapar. |
| Dokunmatik (tablet, mobil) | Başlığa dokunmak sayfaya gider, düğmeye dokunmak alt menüyü açar/kapatır. Hover kullanılmaz (v12 kuralı). Düğme dokunma hedefi ≥ 44 × 44 px (testte ölçüldü). |
| Klavye | Tab: başlık → düğme. Başlıkta ya da düğmede ← alt menüyü açıp ilk bağlantıya odaklanır. Alt menüde → kapatır ve düğmeye döner. Escape önce alt menüyü, sonra menüyü kapatır; odak MENU düğmesine döner. |
| Görsel | Satır v12'deki `.n1h-item` görünümünü korur (işaret noktası, 4 px kayma, koyu arka plan). Not yazısının rengi ve harf aralığı aynı. Açıkken + işareti 45° dönerek × olur. |
| V1.3 menü kapanışı | `n1-menu-close-v13.js` paneli DOM üzerinden kapatabilir. v13 her açılışta ve BFCache dönüşünde (`pageshow` persisted) alt menü durumunu sıfırlar; kalıntı vurgu ya da açık kart kalmaz. |
| Eski uyum | v13'e yeni JSON gelmezse (eski markup) davranış v12 ile aynıdır. v12 yeni JSON'u alırsa İK satırı v12'deki gibi alt menü düğmesi olur. Bağlantılar bozulmaz, yalnız başlık tıklanmaz. |

Menü tasarımı, açılış/kapanış hareketi, panel konumu, odak yönetimi, reduced-motion ve Escape/dışarı tıklama davranışları değişmedi.

## 4. Kapsam: menüyü taşıyan bütün sayfalar
Her dosyada **yalnız** iki adres değişir: header v12 → v13 ve markup v12/v14 → v15 (commit `f40415a`). Kaynak, canlıdaki en güncel sürümdür: ana sayfa ve hizmet sayfaları **V1.4** (`@36a24d3`, canlıda yayında); Kısaca Biz, Markalar ve Yasal sayfalar V1.2 dosyaları.

| Sayfa (yol) | CE etiketi (değişmez) | Canlı dosya | Yeni dosya |
|---|---|---|---|
| Ana Sayfa (`/`) | `n1-site-v1` | V1.4 `n1-site-wix-v659.js` | `sites/home/n1-site-wix-v660.js` |
| Kreatif Prodüksiyon | `n1-kreatif-produksiyon-v23` | V1.4 v24 | `sites/pages/wix-kreatif-produksiyon-v25/…v25.js` |
| E-Ticaret Yönetimi | `n1-e-ticaret-yonetimi-v23` | V1.4 v25 | `…/wix-e-ticaret-yonetimi-v26/…v26.js` |
| Sosyal Medya | `n1-sosyal-medya-v27` | V1.4 v28 | `…/wix-sosyal-medya-v29/…v29.js` |
| Reklam Yönetimi | `n1-reklam-yonetimi-v23` | V1.4 v24 | `…/wix-reklam-yonetimi-v25/…v25.js` |
| UI/UX Tasarım | `n1-uiux-tasarim-v28` | V1.4 v30 | `…/wix-uiux-tasarim-v31/…v31.js` |
| Yapay Zekâ | `n1-yapay-zeka-v2` | V1.4 v3 | `…/wix-yapay-zeka-v4/…v4.js` |
| Uygulama Geliştirme | `n1-uygulama-gelistirme-v2` | V1.4 v3 | `…/wix-uygulama-gelistirme-v4/…v4.js` |
| Kısaca Biz | `n1-kisaca-biz-v1` | V1.2 `n1-kisaca-biz-v1.js` | `…/wix-kisaca-biz-v2/n1-kisaca-biz-v2.js` |
| Markalar | `n1-markalar-v11` | V1.2 `n1-markalar-v11.js` | `…/wix-markalar-v12/n1-markalar-v12.js` |
| Yasal: Gizlilik, KVKK, Çerez, Kullanım Koşulları, Veri Sahibi Başvuru | (5 etiket, değişmez) | V1.2 `n1-yasal-sayfalar-v1.js` | `…/wix-yasal-sayfalar-v2/n1-yasal-sayfalar-v2.js` |
| **Yeni:** İnsan Kaynakları, Açık Pozisyonlar, Staj Programları | `n1-insan-kaynaklari-v1`, `n1-acik-pozisyonlar-v1`, `n1-staj-programlari-v1` | — | `pages/n1-career-v1.js` |

Doğrulama (`tools/build_sites.py`):
- Her dosyada eski header/markup adresi kalmadı.
- `customElements.define` listesi kaynakla aynı.
- `node --check` geçti.
- Kapsam dışı yan etki denetimi: TEST_REPORT §6.

**Kapsam dışı ve dokunulmayan sayfalar:**
- **Wix yerel sayfalar** (Akademi `/reklam-ajansi`, `/1n`, `/iletisim`, eski hizmet sayfaları): 1N header yok, Wix'in kendi menüsü var.
  - Wix menüsünde "Ekibimize Katıl" varsa Wix Editor → Site Menüsü'nden kaldırılmalıdır (DEPLOYMENT §5).
  - Canlı tarama (14 Wix yerel sayfa, gizli öğeler dahil; `tests/native-scan.js`, `qa/native-scan.log`) bu sayfalarda hiçbir kariyer bağlantısı ya da "Ekibimize Katıl" metni bulmadı.
- **Intelligence, müşteri panelleri:** değişmedi.

## 5. Merkezi güncelleme değerlendirmesi
İstenen "tüm sayfaları yeniden yayınlamadan merkezi güncelleme" incelendi. **Seçilmedi**, gerekçe:

1. **SHA sabit:** header ve markup adresleri her sayfanın kodunda sabit SHA ile duruyor. Görev kuralı gereği dal adı ya da `@latest` kullanılamaz; sabit SHA, tanım gereği yeni bir adres demektir.
2. **Özel kod yarış riski:** tek bir site geneli Özel Kod (Head) girişiyle header v13'ü önceden tanımlamak teknik olarak mümkün. Ancak Wix özel kodu sayfaya istemci tarafında ekliyor (canlı HTML'de JSON olarak duruyor). Sayfa bileşenlerinden **önce** çalışacağı garanti değil, yani header v12 ile yarış oluşur. Bu da "kontrolsüz müdahale" riskidir.
3. **Kalıcılık:** markup içindeki eski menü verisi yerinde kalır ve "Ekibimize Katıl" her yüklemede yeniden yazılmak zorunda olurdu.

Seçilen yöntem V1.2 global menü güncellemesiyle aynıdır: her sayfanın yeni sabit adresi. Wix'teki iş yalnız Server URL alanını değiştirmek ve tek bir **Yayınla**'dır. Wix yayınlama site geneli tek işlemdir; sayfa sayfa yayın gerekmez.
