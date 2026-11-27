#!/usr/bin/env bash
# V1.3 — Wix'te adres/kod değiştirmeden ÖNCE çalıştırın (depo kökünden):
#   bash wix-global-stability-v13/wix-custom-code/verify-cdn-v13.sh
# Her adres art arda 20 kez istenir: JS → 200, mp4 → Range isteğine 206 beklenir.
# Ayrıca jsDelivr'in döndürdüğü içerik, o commit'teki depo dosyasıyla bayt bayt karşılaştırılır (git show).
# jsDelivr: depo 50 MB'ı aştığı için yeni adresler ilk dakikalarda 403 dönebilir → 1-2 dk bekleyip tekrar çalıştırın.
J=https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets
cd "$(git rev-parse --show-toplevel 2>/dev/null || echo .)" || exit 1
LIST="
bb6ebc7723625d137035b1074c6dca14c02fb296 wix-global-stability-v13/n1-menu-close-v13.js
b9c8fca79bee3d6ab9baca96d19e3888575c9c06 wix-global-stability-v13/home/n1-site-wix-v658.js
5c1bcf275b2f111b54595db829ab0be654906c6b wix-global-stability-v13/home/n1-video-m5-v13.js
997f951a4ae76ab2dd95440c4e8e597ffa682499 wix-global-stability-v13/pages/wix-e-ticaret-yonetimi-v24/n1-e-ticaret-yonetimi-v24.js
d33a9ffc77cd85f466fcc439518d2b74d639abda wix-global-stability-v13/pages/wix-uiux-tasarim-v29/n1-uiux-tasarim-v29.js
be0c8b1454939989d175197be4ff6667f9e29c19 wix-mobile-stability-v1/n1-stability-v1.1.1.js
3a9eda9040df3133f66727c27091e965646695be wix-global-stability-v13/stress/n1-stress-v1.js
756d6f87647bd1c2bfaa3da84f47dcfd31cea37d wix-global-stability-v13/test-media/ronin-m5-film-1.5x.mp4
f97db8edb37f1e1388f276d840e262fc8452b80a wix-home-v656/media/ronin-m5-film.mp4
f97db8edb37f1e1388f276d840e262fc8452b80a wix-home-v656/media/ronin-m5-film-2x.mp4
"
T=$(mktemp -d); fail=0
while read -r sha path; do
  [ -z "$sha" ] && continue
  u="$J@$sha/$path"; r=""
  case "$path" in *.mp4) want=206; rng=(-H "Range: bytes=0-1023");; *) want=200; rng=();; esac
  for i in $(seq 20); do c=$(curl -s -o /dev/null -w '%{http_code}' "${rng[@]}" "$u"); [ "$c" = "$want" ] && r="$r." || { r="${r}X($c)"; fail=1; }; done
  # içerik karşılaştırması
  git show "$sha:$path" > "$T/repo" 2>/dev/null || { echo "?? $path: $sha depoda yok"; fail=1; continue; }
  case "$path" in
    *.mp4) curl -s -H "Range: bytes=0-65535" "$u" > "$T/cdn"; head -c 65536 "$T/repo" > "$T/repo64"; cmp -s "$T/cdn" "$T/repo64" && m="içerik=AYNI(ilk 64 KB)" || { m="içerik=FARKLI"; fail=1; } ;;
    *) curl -s "$u" > "$T/cdn"; cmp -s "$T/cdn" "$T/repo" && m="içerik=AYNI($(wc -c < "$T/repo") B)" || { m="içerik=FARKLI"; fail=1; } ;;
  esac
  echo "$r $want ${path##*/} @${sha:0:7} $m"
done <<< "$LIST"
rm -rf "$T"
[ $fail = 0 ] && echo "TAMAM: tüm adresler 20/20 ve içerik eşleşiyor" || echo "BEKLEYİN/KONTROL: bazı adresler başarısız (403 ise 1-2 dk sonra tekrar)"
