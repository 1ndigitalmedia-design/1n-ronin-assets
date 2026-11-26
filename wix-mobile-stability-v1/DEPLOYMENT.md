# DEPLOYMENT — Wix'e uygulama (açık onayınızla, sizin tarafınızdan)

**Bu çalışmada Wix'te hiçbir şey değiştirilmedi ve yayınlanmadı.** Aşağıdaki adımlar onay verdiğinizde uygulanacaktır.

## 1. Değişecek tek yer: Wix özel kod girişi

**Wix Studio → Site Ayarları → Özel Kod (Custom Code) → "1N - Hizmetler Capa Navigasyonu" → Düzenle**

Mevcut içeriği **tamamen** aşağıdakiyle değiştirin:

```html
<script>
window.N1_NAV_CONFIG = {
  home: '/'
};
</script>

<script src="https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@102b76a46417417be9c87d5cc71ce210d8e1f791/wix-mobile-stability-v1/n1-nav-v1.0.2.js" defer></script>
<script src="https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@102b76a46417417be9c87d5cc71ce210d8e1f791/wix-mobile-stability-v1/n1-stability-v1.js" defer></script>
```

Ayarlar (mevcut girişle aynı):

| Ayar | Değer |
|---|---|
| Sayfalara ekle | **Tüm sayfalar** |
| Kod nereye yerleştirilsin | **Body - end** |
| Yükleme | **Her yeni sayfada yükle** (mevcut `loadOnce:false`) |
| Kategori | Essential (Temel) |

Notlar:
- `N1_NAV_CONFIG` satırı isteğe bağlıdır; tanımlı değilse varsayılan ana sayfa zaten `/`. Ana sayfa adresi `https://www.reklam1n.com/`, Hizmetler hedefi `https://www.reklam1n.com/#hizmetler-ozet`.
- Ana sayfa (`n1-site-wix-v656.js:468`) kendi içinde eski nav v1.0.1'i de yükler. Özel kod daha önce çalıştığı için v1.0.2 etkin olur, v1.0.1 `window.__n1Nav` korumasıyla çalışmadan çıkar. Testte aktif sürüm her cihazda `1.0.2` olarak doğrulandı. Konsolda `__n1Nav.version` ile kontrol edilebilir.
- `/n1-full-test` → 301 → `/` (Wix). Gereksiz yönlendirme zinciri yok. Nav içindeki `/n1-full-test` yalnızca eski bağlantılar için tanınan bir ana sayfa adı olarak duruyor ve zararsız.
- Ayrı bir özel kod girişi açmayın; nav ve stabilite aynı girişte, bu sırayla kalmalı.

## 2. Custom Element'ler — değişiklik YOK

Sayfa bazında Custom Element etiketleri ve Server URL'leri **aynı kalır** (DEPENDENCY_MAP.md §1). Bu sürüm hiçbir sayfa dosyasını değiştirmez.

| Sayfa | Tag Name | Server URL |
|---|---|---|
| Ana Sayfa `/` | `n1-site-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f97db8edb37f1e1388f276d840e262fc8452b80a/wix-home-v656/n1-site-wix-v656.js` |
| Kreatif Prodüksiyon | `n1-kreatif-produksiyon-v23` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f97db8edb37f1e1388f276d840e262fc8452b80a/wix-sitewide-mobile-fix-2026-11-26/wix-kreatif-produksiyon-v23/n1-kreatif-produksiyon-v23.js` |
| E-Ticaret Yönetimi | `n1-e-ticaret-yonetimi-v23` | `…@f97db8edb37f1e1388f276d840e262fc8452b80a/wix-sitewide-mobile-fix-2026-11-26/wix-e-ticaret-yonetimi-v23/n1-e-ticaret-yonetimi-v23.js` |
| Sosyal Medya | `n1-sosyal-medya-v27` | `…@f97db8ed…/wix-sitewide-mobile-fix-2026-11-26/wix-sosyal-medya-v27/n1-sosyal-medya-v27.js` |
| Reklam Yönetimi | `n1-reklam-yonetimi-v23` | `…@f97db8ed…/wix-sitewide-mobile-fix-2026-11-26/wix-reklam-yonetimi-v23/n1-reklam-yonetimi-v23.js` |
| UI/UX Tasarım | `n1-uiux-tasarim-v28` | `…@f97db8ed…/wix-sitewide-mobile-fix-2026-11-26/wix-uiux-tasarim-v28/n1-uiux-tasarim-v28.js` |
| Yapay Zekâ | `n1-yapay-zeka-v2` | `…@f97db8ed…/wix-sitewide-mobile-fix-2026-11-26/wix-yapay-zeka-v2/n1-yapay-zeka-v2.js` |
| Uygulama Geliştirme | `n1-uygulama-gelistirme-v2` | `…@f97db8ed…/wix-sitewide-mobile-fix-2026-11-26/wix-uygulama-gelistirme-v2/n1-uygulama-gelistirme-v2.js` |
| Markalar | `n1-markalar-v11` | `…@f97db8ed…/wix-sitewide-mobile-fix-2026-11-26/wix-markalar-v1/n1-markalar-v11.js` |
| Kısaca Biz | `n1-kisaca-biz-v1` | `…@f97db8ed…/wix-sitewide-mobile-fix-2026-11-26/wix-kisaca-biz-v1/n1-kisaca-biz-v1.js` |
| KVKK (ve diğer yasal sayfalar) | `n1-kvkk-aydinlatma-v1` (KVKK) | `…@f97db8ed…/wix-sitewide-mobile-fix-2026-11-26/wix-yasal-sayfalar-v1/n1-yasal-sayfalar-v1.js` |

(`…` = `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets`, `f97db8ed…` = `f97db8edb37f1e1388f276d840e262fc8452b80a`.)

## 3. Yayın sonrası kontrol (5 dk)
1. `https://www.reklam1n.com/?n1diag=1` telefonda açılınca sol altta `n1-stability 1.0.0 · mobil=true` görünmeli.
2. Masaüstü tarayıcı konsolunda `__n1Nav.version` → `"1.0.2"`, `__n1Stability.report().mobile` → `false`.
3. Ağ sekmesinde iki yeni dosya 200 dönmeli.
4. Ardından TEST_REPORT.md §8 fiziksel cihaz testi.

## 4. Bakım
Bir sayfanın Custom Element adresi değiştiğinde `n1-stability-v1.js` içindeki `WARM_PAGE` listesi güncellenip yeni commit SHA ile tekrar yayınlanmalıdır. Liste eski kalırsa işlev bozulmaz; yalnızca o sayfa için önbellek ısıtma boşa gider.

## 5. Pull Request
Bu dal için `mobile-stability-clean-base-20261126` dalına yönelik **Draft** PR açıldı. PR birleştirilmedi; birleştirme sizin onayınıza bağlıdır. Wix'in kullandığı adresler commit SHA ile sabit olduğundan birleştirme canlıyı etkilemez.
