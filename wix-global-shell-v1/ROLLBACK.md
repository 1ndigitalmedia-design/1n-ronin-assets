# ROLLBACK — Global Menü V2.2 geri dönüşü

Her satır bağımsızdır: Wix Studio → sayfa → Custom Element → Server URL alanına aşağıdaki adresi girin → Yayınla. Tag Name ve öznitelikler değişmedi.

## 1. V2.2 → V2.1 (tek renkli platform logoları; bugün canlı olan adresler)
| Sayfa | Tag | Geri dönüş Server URL (V2.1) |
|---|---|---|
| Ana Sayfa | `n1-site-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/sites/home/n1-site-wix-v662.js` |
| Kreatif Prodüksiyon | `n1-kreatif-produksiyon-v23` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/sites/pages/wix-kreatif-produksiyon-v27/n1-kreatif-produksiyon-v27.js` |
| E-Ticaret Yönetimi | `n1-e-ticaret-yonetimi-v23` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/sites/pages/wix-e-ticaret-yonetimi-v28/n1-e-ticaret-yonetimi-v28.js` |
| Sosyal Medya | `n1-sosyal-medya-v27` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/sites/pages/wix-sosyal-medya-v31/n1-sosyal-medya-v31.js` |
| Reklam Yönetimi | `n1-reklam-yonetimi-v23` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/sites/pages/wix-reklam-yonetimi-v27/n1-reklam-yonetimi-v27.js` |
| UI/UX Tasarım | `n1-uiux-tasarim-v28` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/sites/pages/wix-uiux-tasarim-v33/n1-uiux-tasarim-v33.js` |
| Yapay Zekâ | `n1-yapay-zeka-v2` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/sites/pages/wix-yapay-zeka-v6/n1-yapay-zeka-v6.js` |
| Uygulama Geliştirme | `n1-uygulama-gelistirme-v2` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/sites/pages/wix-uygulama-gelistirme-v6/n1-uygulama-gelistirme-v6.js` |
| Kısaca Biz | `n1-kisaca-biz-v1` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/sites/pages/wix-kisaca-biz-v4/n1-kisaca-biz-v4.js` |
| Markalar | `n1-markalar-v11` | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/sites/pages/wix-markalar-v14/n1-markalar-v14.js` |
| Yasal 5 sayfa | (5 etiket) | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/sites/pages/wix-yasal-sayfalar-v4/n1-yasal-sayfalar-v4.js` |
| Kariyer 3 sayfa | (3 etiket) | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/pages/n1-career-v3.js` |
| Bağımsız Header/Footer/WhatsApp | (3 etiket) | `https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f661795b75a011f8e882930df64a20f60a863cba/wix-global-shell-v1/n1-global-shell-v1-1.js` |

Sürümler karışırsa (bazı sayfalar V2.1, bazıları V2.2) sayfalar çalışmaya devam eder; yalnız menünün son kartı sayfadan sayfaya farklı görünür.

## 2. Daha eski sürümler
- **V2.1 → V2 (renkli logolar):** `make_docs_v21.py` çıktısı; git geçmişinde `ROLLBACK.md` @224531b.
- **V2 → V1.4:** git geçmişinde `ROLLBACK.md` @7486d81.
- Önceki paketler silinmedi: `wix-career-v1/ROLLBACK.md` · `wix-mobile-performance-v14/ROLLBACK.md` · `wix-global-stability-v13/ROLLBACK.md` · tam kurtarma: `sitewide-mobile-fix-20261126` @ `f97db8e`.

## 3. Git
Dal `claude/happy-sagan-l6tbsc`. V2.2 yalnız yeni dosyalar ekledi: header v16, menü verisi v17, paket v1.2, kariyer v4 ve 11 sayfa sürümü. V2.1 ve V2 dosyaları ile özgün renkli ve tek renkli logo dosyaları (`assets/platforms/`, `assets/platforms/mono/`) silinmedi. Force push yapılmadı.
