#!/usr/bin/env bash
# GLOBAL MENÜ V2.2 — Wix'te Server URL değiştirmeden ÖNCE çalıştırın (depo kökünden):
#   bash wix-global-shell-v1/wix-custom-code/verify-cdn-v22.sh
# Her depo adresi: 10 istek → 200 · MIME (JS application/javascript, CSS text/css, WebP image/webp) · CORS (Origin ile *) ·
# TAM içerik SHA-256 = o commit'teki depo dosyası (git show). Wix Medya partner görselleri: 200 + image/*.
# jsDelivr: yeni commit'in dosyaları ilk dakikalarda 403 dönebilir → 1-2 dk bekleyip tekrar çalıştırın.
J=https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets
cd "$(git rev-parse --show-toplevel 2>/dev/null || echo .)" || exit 1
R=2a124f910dd62638eaa85c8456b8435b17c28d2a; C=f7b29c2aa1005f836a6495fa3279ccc59255af6d
C648=d24fa373d6d76c0218b3f3b77897a8c2ace04e5e; CR=09612df97e85978976d13edbd79dad0adcc1d1f1
LIST="
$R wix-global-shell-v1/n1-global-shell-v1-2.js
$C wix-global-shell-v1/modules/n1-header-v16.js
$C wix-global-shell-v1/site/n1-site-markup-v17.js
$R wix-global-shell-v1/pages/n1-career-v4.js
$R wix-global-shell-v1/sites/home/n1-site-wix-v663.js
$R wix-global-shell-v1/sites/pages/wix-kreatif-produksiyon-v28/n1-kreatif-produksiyon-v28.js
$R wix-global-shell-v1/sites/pages/wix-e-ticaret-yonetimi-v29/n1-e-ticaret-yonetimi-v29.js
$R wix-global-shell-v1/sites/pages/wix-sosyal-medya-v32/n1-sosyal-medya-v32.js
$R wix-global-shell-v1/sites/pages/wix-reklam-yonetimi-v28/n1-reklam-yonetimi-v28.js
$R wix-global-shell-v1/sites/pages/wix-uiux-tasarim-v34/n1-uiux-tasarim-v34.js
$R wix-global-shell-v1/sites/pages/wix-yapay-zeka-v7/n1-yapay-zeka-v7.js
$R wix-global-shell-v1/sites/pages/wix-uygulama-gelistirme-v7/n1-uygulama-gelistirme-v7.js
$R wix-global-shell-v1/sites/pages/wix-kisaca-biz-v5/n1-kisaca-biz-v5.js
$R wix-global-shell-v1/sites/pages/wix-markalar-v15/n1-markalar-v15.js
$R wix-global-shell-v1/sites/pages/wix-yasal-sayfalar-v5/n1-yasal-sayfalar-v5.js
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
