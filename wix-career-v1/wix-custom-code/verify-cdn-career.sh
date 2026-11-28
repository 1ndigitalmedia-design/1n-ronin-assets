#!/usr/bin/env bash
# KARİYER V1 — Wix'te Server URL değiştirmeden ÖNCE çalıştırın (depo kökünden):
#   bash wix-career-v1/wix-custom-code/verify-cdn-career.sh
# Her adres: 20 istek → 200 · Content-Type application/javascript · CORS (Origin ile Access-Control-Allow-Origin: *)
# · Range (206 ya da tam dosya 200; betikler Range ile yüklenmez) · TAM içerik SHA-256 = o commit'teki depo dosyası (git show).
# jsDelivr: depo 50 MB'ı aştığı için yeni commit'in dosyaları ilk dakikalarda 403 dönebilir → 1-2 dk bekleyip tekrar çalıştırın.
J=https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets
cd "$(git rev-parse --show-toplevel 2>/dev/null || echo .)" || exit 1
M=f40415a3785e0172bdcc58189479253ff10cd17e; P=2aa9a9b483e53be78aebcd67f5af54e5ba485f90
LIST="
$M wix-career-v1/modules/n1-header-v13.js
$M wix-career-v1/site/n1-site-markup-v15.js
$P wix-career-v1/pages/n1-career-v1.js
$P wix-career-v1/sites/home/n1-site-wix-v660.js
$P wix-career-v1/sites/pages/wix-kreatif-produksiyon-v25/n1-kreatif-produksiyon-v25.js
$P wix-career-v1/sites/pages/wix-e-ticaret-yonetimi-v26/n1-e-ticaret-yonetimi-v26.js
$P wix-career-v1/sites/pages/wix-sosyal-medya-v29/n1-sosyal-medya-v29.js
$P wix-career-v1/sites/pages/wix-reklam-yonetimi-v25/n1-reklam-yonetimi-v25.js
$P wix-career-v1/sites/pages/wix-uiux-tasarim-v31/n1-uiux-tasarim-v31.js
$P wix-career-v1/sites/pages/wix-yapay-zeka-v4/n1-yapay-zeka-v4.js
$P wix-career-v1/sites/pages/wix-uygulama-gelistirme-v4/n1-uygulama-gelistirme-v4.js
$P wix-career-v1/sites/pages/wix-kisaca-biz-v2/n1-kisaca-biz-v2.js
$P wix-career-v1/sites/pages/wix-markalar-v12/n1-markalar-v12.js
$P wix-career-v1/sites/pages/wix-yasal-sayfalar-v2/n1-yasal-sayfalar-v2.js
"
T=$(mktemp -d); fail=0; n=0
while read -r sha path; do
  [ -z "$sha" ] && continue; n=$((n+1)); u="$J@$sha/$path"; r=""
  for i in $(seq 20); do c=$(curl -s -o /dev/null -w '%{http_code}' "$u"); [ "$c" = 200 ] && r="$r." || { r="${r}X($c)"; fail=1; }; done
  hd=$(curl -s -D - -o /dev/null -H "Origin: https://www.reklam1n.com" "$u" | tr -d '\r')
  ct=$(echo "$hd" | grep -i '^content-type:' | head -1 | cut -d' ' -f2- | cut -d';' -f1)
  co=$(echo "$hd" | grep -i '^access-control-allow-origin:' | head -1 | cut -d' ' -f2-)
  rg=$(curl -s -o /dev/null -w '%{http_code}' -H "Range: bytes=0-99" "$u")
  git show "$sha:$path" > "$T/repo" 2>/dev/null || { echo "?? $path: $sha depoda yok"; fail=1; continue; }
  curl -s "$u" > "$T/cdn"; a=$(sha256sum < "$T/repo" | cut -c1-16); b=$(sha256sum < "$T/cdn" | cut -c1-16)
  [ "$a" = "$b" ] && m="sha256=AYNI($a, $(wc -c < "$T/repo") B)" || { m="sha256=FARKLI(depo $a / cdn $b)"; fail=1; }
  w=""; [ "$ct" = application/javascript ] || { w="$w ⚠tür"; fail=1; }; [ "$co" = "*" ] || { w="$w ⚠CORS"; fail=1; }
  if [ "$rg" != 206 ] && [ "$rg" != 200 ]; then w="$w ⚠Range"; fail=1; fi
  echo "$r ${path#wix-career-v1/} @${sha:0:7} | $ct | CORS $co | Range $rg | $m$w"
done <<< "$LIST"
rm -rf "$T"; echo "adres: $n"
[ $fail = 0 ] && echo "TAMAM: tüm adresler 20/20 200, application/javascript, CORS *, Range yanıtı ve tam içerik eşleşiyor" || echo "BEKLEYİN/KONTROL: bazı adresler başarısız (403 ise 1-2 dk sonra tekrar)"
