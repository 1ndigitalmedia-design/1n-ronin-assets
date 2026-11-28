#!/usr/bin/env bash
# GLOBAL MENÜ V2.1 — Wix'te Server URL değiştirmeden ÖNCE çalıştırın (depo kökünden):
#   bash wix-global-shell-v1/wix-custom-code/verify-cdn-v21.sh
# Her depo adresi: 10 istek → 200 · MIME (JS application/javascript, CSS text/css, WebP image/webp) · CORS (Origin ile *) ·
# TAM içerik SHA-256 = o commit'teki depo dosyası (git show). Wix Medya partner görselleri: 200 + image/*.
# jsDelivr: yeni commit'in dosyaları ilk dakikalarda 403 dönebilir → 1-2 dk bekleyip tekrar çalıştırın.
J=https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets
cd "$(git rev-parse --show-toplevel 2>/dev/null || echo .)" || exit 1
F=f661795b75a011f8e882930df64a20f60a863cba; H=6df38aa58398670c8e2617632ef88b9895bfd4e9; M=9bbcefd65becbc196baebea26600060b01af406c
C648=d24fa373d6d76c0218b3f3b77897a8c2ace04e5e; CR=09612df97e85978976d13edbd79dad0adcc1d1f1
LIST="
$F wix-global-shell-v1/n1-global-shell-v1-1.js
$H wix-global-shell-v1/modules/n1-header-v15.js
$M wix-global-shell-v1/site/n1-site-markup-v16.js
$F wix-global-shell-v1/pages/n1-career-v3.js
$F wix-global-shell-v1/sites/home/n1-site-wix-v662.js
$F wix-global-shell-v1/sites/pages/wix-kreatif-produksiyon-v27/n1-kreatif-produksiyon-v27.js
$F wix-global-shell-v1/sites/pages/wix-e-ticaret-yonetimi-v28/n1-e-ticaret-yonetimi-v28.js
$F wix-global-shell-v1/sites/pages/wix-sosyal-medya-v31/n1-sosyal-medya-v31.js
$F wix-global-shell-v1/sites/pages/wix-reklam-yonetimi-v27/n1-reklam-yonetimi-v27.js
$F wix-global-shell-v1/sites/pages/wix-uiux-tasarim-v33/n1-uiux-tasarim-v33.js
$F wix-global-shell-v1/sites/pages/wix-yapay-zeka-v6/n1-yapay-zeka-v6.js
$F wix-global-shell-v1/sites/pages/wix-uygulama-gelistirme-v6/n1-uygulama-gelistirme-v6.js
$F wix-global-shell-v1/sites/pages/wix-kisaca-biz-v4/n1-kisaca-biz-v4.js
$F wix-global-shell-v1/sites/pages/wix-markalar-v14/n1-markalar-v14.js
$F wix-global-shell-v1/sites/pages/wix-yasal-sayfalar-v4/n1-yasal-sayfalar-v4.js
$H wix-global-shell-v1/assets/platforms/mono/01-zeyp.svg
$H wix-global-shell-v1/assets/platforms/mono/02-market.svg
$H wix-global-shell-v1/assets/platforms/mono/03-hemen-tikla.svg
$H wix-global-shell-v1/assets/platforms/mono/04-intelligence.svg
$C648 wix-full-v1/modules/n1-footer-v646.js
$C648 wix-full-v1/modules/n1-footer-v636.css
$C648 wix-full-v1/modules/n1-floating-controls-v632.js
$CR wix-studyo-v1/site/n1-inner-responsive-v6.css
"
T=$(mktemp -d); fail=0; n=0
while read -r sha path; do
  [ -z "$sha" ] && continue; n=$((n+1)); u="$J@$sha/$path"; r=""
  case "$path" in *.webp) want=image/webp;; *.svg) want=image/svg+xml;; *.css) want=text/css;; *) want=application/javascript;; esac
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
