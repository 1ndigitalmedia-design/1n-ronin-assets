#!/usr/bin/env bash
# GLOBAL SHELL V1 — Wix'te Server URL değiştirmeden ÖNCE çalıştırın (depo kökünden):
#   bash wix-global-shell-v1/wix-custom-code/verify-cdn-shell.sh
# Her depo adresi: 10 istek → 200 · MIME (JS application/javascript, CSS text/css, WebP image/webp) · CORS (Origin ile *) ·
# TAM içerik SHA-256 = o commit'teki depo dosyası (git show). Wix Medya partner görselleri: 200 + image/*.
# jsDelivr: yeni commit'in dosyaları ilk dakikalarda 403 dönebilir → 1-2 dk bekleyip tekrar çalıştırın.
J=https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets
cd "$(git rev-parse --show-toplevel 2>/dev/null || echo .)" || exit 1
A=9a8e261f72975ccc5d94d33dfe9e6313b4e8f5dd; M=9bbcefd65becbc196baebea26600060b01af406c; P=144d964a795e515e3b79f0e39c0eeee244a786f8
C648=d24fa373d6d76c0218b3f3b77897a8c2ace04e5e; CR=09612df97e85978976d13edbd79dad0adcc1d1f1
LIST="
$P wix-global-shell-v1/n1-global-shell-v1.js
$M wix-global-shell-v1/modules/n1-header-v14.js
$M wix-global-shell-v1/site/n1-site-markup-v16.js
$P wix-global-shell-v1/pages/n1-career-v2.js
$P wix-global-shell-v1/sites/home/n1-site-wix-v661.js
$P wix-global-shell-v1/sites/pages/wix-kreatif-produksiyon-v26/n1-kreatif-produksiyon-v26.js
$P wix-global-shell-v1/sites/pages/wix-e-ticaret-yonetimi-v27/n1-e-ticaret-yonetimi-v27.js
$P wix-global-shell-v1/sites/pages/wix-sosyal-medya-v30/n1-sosyal-medya-v30.js
$P wix-global-shell-v1/sites/pages/wix-reklam-yonetimi-v26/n1-reklam-yonetimi-v26.js
$P wix-global-shell-v1/sites/pages/wix-uiux-tasarim-v32/n1-uiux-tasarim-v32.js
$P wix-global-shell-v1/sites/pages/wix-yapay-zeka-v5/n1-yapay-zeka-v5.js
$P wix-global-shell-v1/sites/pages/wix-uygulama-gelistirme-v5/n1-uygulama-gelistirme-v5.js
$P wix-global-shell-v1/sites/pages/wix-kisaca-biz-v3/n1-kisaca-biz-v3.js
$P wix-global-shell-v1/sites/pages/wix-markalar-v13/n1-markalar-v13.js
$P wix-global-shell-v1/sites/pages/wix-yasal-sayfalar-v3/n1-yasal-sayfalar-v3.js
$A wix-global-shell-v1/assets/platforms/01-zeyp-160.webp
$A wix-global-shell-v1/assets/platforms/01-zeyp-320.webp
$A wix-global-shell-v1/assets/platforms/02-market-160.webp
$A wix-global-shell-v1/assets/platforms/02-market-320.webp
$A wix-global-shell-v1/assets/platforms/03-hemen-tikla-160.webp
$A wix-global-shell-v1/assets/platforms/03-hemen-tikla-320.webp
$A wix-global-shell-v1/assets/platforms/04-intelligence-160.webp
$A wix-global-shell-v1/assets/platforms/04-intelligence-320.webp
$C648 wix-full-v1/modules/n1-footer-v646.js
$C648 wix-full-v1/modules/n1-footer-v636.css
$C648 wix-full-v1/modules/n1-floating-controls-v632.js
$CR wix-studyo-v1/site/n1-inner-responsive-v6.css
"
T=$(mktemp -d); fail=0; n=0
while read -r sha path; do
  [ -z "$sha" ] && continue; n=$((n+1)); u="$J@$sha/$path"; r=""
  case "$path" in *.webp) want=image/webp;; *.css) want=text/css;; *) want=application/javascript;; esac
  for i in $(seq 10); do c=$(curl -s -o /dev/null -w '%{http_code}' "$u"); [ "$c" = 200 ] && r="$r." || { r="${r}X($c)"; fail=1; }; done
  hd=$(curl -s -D - -o /dev/null -H "Origin: https://www.reklam1n.com" "$u" | tr -d '\r')
  ct=$(echo "$hd" | grep -i '^content-type:' | head -1 | cut -d' ' -f2- | cut -d';' -f1); co=$(echo "$hd" | grep -i '^access-control-allow-origin:' | head -1 | cut -d' ' -f2-)
  git show "$sha:$path" > "$T/repo" 2>/dev/null || { echo "?? $path: $sha depoda yok"; fail=1; continue; }
  curl -s "$u" > "$T/cdn"; a=$(sha256sum < "$T/repo" | cut -c1-16); b=$(sha256sum < "$T/cdn" | cut -c1-16)
  [ "$a" = "$b" ] && m="sha256=AYNI($a, $(wc -c < "$T/repo") B)" || { m="sha256=FARKLI(depo $a / cdn $b)"; fail=1; }
  w=""; [ "$ct" = "$want" ] || { w="$w ⚠tür($ct)"; fail=1; }; [ "$co" = "*" ] || { w="$w ⚠CORS"; fail=1; }
  echo "$r ${path} @${sha:0:7} | $ct | CORS $co | $m$w"
done <<< "$LIST"
for u in https://static.wixstatic.com/media/6dbf5e_800ff5a00ba244f9bb31761a6b2d713d~mv2.png https://static.wixstatic.com/media/6dbf5e_32b849155e954320a1f6479f27fd6ad2~mv2.png; do
  n=$((n+1)); res=$(curl -s -o /dev/null -w '%{http_code} %{content_type} %{size_download}' "$u"); echo "Wix Medya partner görseli | $res | ${u##*/}"; case "$res" in 200\ image/*) ;; *) fail=1;; esac
done
rm -rf "$T"; echo "adres: $n"
[ $fail = 0 ] && echo "TAMAM: tüm adresler 200, doğru MIME, CORS *, tam içerik eşleşiyor" || echo "BEKLEYİN/KONTROL: bazı adresler başarısız (403 ise 1-2 dk sonra tekrar)"
