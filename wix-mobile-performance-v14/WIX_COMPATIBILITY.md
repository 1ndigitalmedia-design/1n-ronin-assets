# WIX_COMPATIBILITY — Wix Studio uyumluluğu (P14)

| Konu | V1.4 davranışı | Kanıt |
|---|---|---|
| **Custom Element Tag Name** | Hiçbir etiket değişmedi: `n1-site-v1`, `n1-kreatif-produksiyon-v23`, `n1-e-ticaret-yonetimi-v23`, `n1-sosyal-medya-v27`, `n1-reklam-yonetimi-v23`, `n1-uiux-tasarim-v28`, `n1-yapay-zeka-v2`, `n1-uygulama-gelistirme-v2`. Wix'te yalnız **Server URL** değişir. | `grep customElements.define pages/*/*.js` |
| **Öznitelikler** (`code-base`, `assets-base`, `ronin-base`, `hero-video` …) | Okuma kodu değişmedi. Wix'teki öznitelik değerleri olduğu gibi kalır. | `tools/build_pages.py` yalnız medya ve yaşam döngüsü satırlarını değiştirir |
| **CE yeniden kaydı** | `customElements.get(tag)` koruması (V1.2) korunur. Aynı etiket iki kez tanımlanmaz; ana sayfa v659 kendi `SELF` kalıbıyla çift yüklemeyi engeller. | `home/n1-site-wix-v659.js` SELF = v659 |
| **Mükerrer betik** | V1.4 dosyaları tek Server URL'den yüklenir. Sabit karelerin CSS'i `#n1-still-v14` kimliğiyle bir kez eklenir. | Ağ testinde her V1.4 dosyası 1 kez (`qa/net/*.json` `routed`) |
| **Wix ATS / Wix yeniden yüklemesi** | Bileşen `connectedCallback`'te kurulur, `disconnectedCallback`'te `_cleanups` ile temizlenir. `n1Life` dinleyicileri de buna bağlı, ikinci kurulum idempotent. | RESOURCE_LIFECYCLE §2 |
| **BFCache** | Kapatılmadı (`unload` yok, `no-store` yok). `pagehide`'da kaynak bırakılır, `pageshow(persisted)`'ta geri yüklenir. Taze yüklemede etkisiz. | `tests/bfsynth.js` |
| **History / geri** | `history` API'si kullanılmadı. Menü kapanışı V1.3 (`bb6ebc7`) ve loader V1.3 değişmedi. | `tests/reg14.js menu`: menü → E-Ticaret → geri, panel kapalı |
| **Eski zaman uyumsuz iş** | Geri yüklemede `owner._on && owner.isConnected && !document.hidden` koşulu. Kopmuş bileşen oynatmaz. | — |
| **Loader / menü** | Dokunulmadı. V1.3 loader (`LOADER-v13-ozel-yukleniyor.html`) ve menü kapanışı aynen kalır. | `reg14 menu`: mobil loader artığı 0 |
| **Yönlendirme (orientation)** | Profil bir kez belirlenir, döndürmede medya değişmez, yeni video isteği olmaz. | `reg14 rotate` |
| **Anchor (çapa) navigasyon** | Devre dışı kalır (V1.3 kararı). V1.4 yeni bir çapa betiği eklemez. | — |
| **Wix yerel sayfalar** | Kapsamda kod değişikliği yok: `/reklam-ajansi` (Akademi), `/1n`, `/iletisim`, eski hizmet sayfaları. Yerel videolar Wix Editor'de yönetilir. | MEDIA_INVENTORY §1 |
| **CDN** | jsDelivr GitHub, commit SHA ile sabit (dal adı yok). `@latest` yok, önbellek kayması yok. | CDN_VERIFICATION |
| **Kapsam dışı** | Intelligence Dashboard, müşteri panelleri, İlkay Kuyumculuk, backend, GTM, GA, Meta Pixel, Google Ads, dönüşüm etiketleri, oturum sistemleri: hiçbiri değişmedi; V1.4 dosyalarında bunlara referans yok. | `grep -iE "gtag\|fbq\|dataLayer\|intelligence\|ilkay" pages home site` → 0 yeni satır (FINAL_REPORT §6) |

## Test anahtarı v14 (yalnız kabul testi için)
- `wix-custom-code/TEST-SWITCH-v14-head.html` = v13.2 + `?n1t=kabul14`. A–F, `stress2`, `stress` birebir korunur.
- **Normal ziyaretçide:** URL, sessionStorage ve 2 localStorage okuması yapılır; hiçbir dosya yüklenmez, zamanlayıcı ya da gözlemci kurulmaz.
- Test modu yalnız ana sayfa ve 7 hizmet sayfasında etkindir. Müşteri ve dashboard sayfalarında bayrak uygulanmaz.
- Kurulum isteğe bağlıdır ve onay gerektirir (DEPLOYMENT §3). Kabul testinden sonra v13.2'ye geri alınabilir ya da kaldırılabilir.
