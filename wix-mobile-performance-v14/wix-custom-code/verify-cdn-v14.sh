#!/usr/bin/env bash
# V1.4 — Wix'te Server URL değiştirmeden ÖNCE çalıştırın (depo kökünden):
#   bash wix-mobile-performance-v14/wix-custom-code/verify-cdn-v14.sh
# Her V1.4 adresi için: durum kodu (JS: 20 istek, WebP: 3 istek) · Content-Type · CORS (Origin başlığıyla Access-Control-Allow-Origin)
# · Range isteğine 206 + Content-Range · TAM dosya içeriği o commit'teki depo dosyasıyla SHA-256 karşılaştırması (git show).
# jsDelivr: depo 50 MB'ı aştığı için yeni adresler ilk dakikalarda 403 dönebilir → 1-2 dk bekleyip tekrar çalıştırın.
J=https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets
cd "$(git rev-parse --show-toplevel 2>/dev/null || echo .)" || exit 1
P=36a24d3d5af5be5e5493598af4375f070a26b002; H=fbc905e6b07721d26a78eb84df56a076693ad7e2; S=274e02bbda53e00b186c4d1b82349edc9dd32009; A=7b57ebcfd7529b9c8b4ce69edad452347217839f
LIST="
$P wix-mobile-performance-v14/home/n1-site-wix-v659.js
$H wix-mobile-performance-v14/home/n1-video-m5-v14.js
$H wix-mobile-performance-v14/site/n1-site-markup-v14.js
$P wix-mobile-performance-v14/pages/wix-kreatif-produksiyon-v24/n1-kreatif-produksiyon-v24.js
$P wix-mobile-performance-v14/pages/wix-e-ticaret-yonetimi-v25/n1-e-ticaret-yonetimi-v25.js
$P wix-mobile-performance-v14/pages/wix-sosyal-medya-v28/n1-sosyal-medya-v28.js
$P wix-mobile-performance-v14/pages/wix-reklam-yonetimi-v24/n1-reklam-yonetimi-v24.js
$P wix-mobile-performance-v14/pages/wix-uiux-tasarim-v30/n1-uiux-tasarim-v30.js
$P wix-mobile-performance-v14/pages/wix-yapay-zeka-v3/n1-yapay-zeka-v3.js
$P wix-mobile-performance-v14/pages/wix-uygulama-gelistirme-v3/n1-uygulama-gelistirme-v3.js
$A wix-mobile-performance-v14/acceptance/n1-accept-v14.js
$(git ls-tree -r --name-only $S wix-mobile-performance-v14/media/stills | grep '\.webp$' | sed "s/^/$S /")
"
T=$(mktemp -d); fail=0; n=0
while read -r sha path; do
  [ -z "$sha" ] && continue; n=$((n+1))
  u="$J@$sha/$path"; r=""
  case "$path" in *.webp) N=3; wantct=image/webp;; *) N=20; wantct=application/javascript;; esac
  for i in $(seq $N); do c=$(curl -s -o /dev/null -w '%{http_code}' "$u"); [ "$c" = 200 ] && r="$r." || { r="${r}X($c)"; fail=1; }; done
  hd=$(curl -s -D - -o /dev/null -H "Origin: https://www.reklam1n.com" "$u" | tr -d '\r')
  ct=$(echo "$hd" | grep -i '^content-type:' | head -1 | cut -d' ' -f2- | cut -d';' -f1)
  co=$(echo "$hd" | grep -i '^access-control-allow-origin:' | head -1 | cut -d' ' -f2-)
  rg=$(curl -s -o /dev/null -w '%{http_code}' -H "Range: bytes=0-99" "$u"); cr=$(curl -s -D - -o /dev/null -H "Range: bytes=0-99" "$u" | tr -d '\r' | grep -i '^content-range:' | cut -d' ' -f2-)
  git show "$sha:$path" > "$T/repo" 2>/dev/null || { echo "?? $path: $sha depoda yok"; fail=1; continue; }
  curl -s "$u" > "$T/cdn"; a=$(sha256sum < "$T/repo" | cut -c1-16); b=$(sha256sum < "$T/cdn" | cut -c1-16)
  [ "$a" = "$b" ] && m="sha256=AYNI($a, $(wc -c < "$T/repo") B)" || { m="sha256=FARKLI(depo $a / cdn $b)"; fail=1; }
  [ "$ct" = "$wantct" ] || { ctm=" ⚠tür"; fail=1; }; [ "$co" = "*" ] || { com=" ⚠CORS"; fail=1; }; [ "$rg" = 206 ] || { rgm=" ⚠Range"; fail=1; }
  echo "$r ${path#wix-mobile-performance-v14/} @${sha:0:7} | $ct${ctm} | CORS $co${com} | Range $rg ($cr)${rgm} | $m"; ctm=; com=; rgm=
done <<< "$LIST"
rm -rf "$T"
echo "adres: $n"
[ $fail = 0 ] && echo "TAMAM: tüm adresler 200, doğru MIME, CORS *, Range 206 ve tam içerik eşleşiyor" || echo "BEKLEYİN/KONTROL: bazı adresler başarısız (403 ise 1-2 dk sonra tekrar)"
