#!/usr/bin/env bash
# Wix'te adres değiştirmeden ÖNCE çalıştırın: her yeni adres art arda 20 kez 200 dönmeli (jsDelivr 50 MB depo sınırı nedeniyle
# yeni adresler ilk dakikalarda bazı uç sunuculardan 403 dönebiliyor). Başarısız olan varsa 1-2 dk bekleyip tekrar çalıştırın.
J=https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets
P=39f762f63a2af58a470e9712d8ca0895d6f73f9f; H=162599ec580db98d848cf6670bcde7ee30bf97f5; S=be0c8b1454939989d175197be4ff6667f9e29c19
URLS="$J@$H/wix-global-menu-v12/site/n1-site-markup-v12.js $J@$H/wix-global-menu-v12/modules/n1-header-v12.js $J@$S/wix-mobile-stability-v1/n1-stability-v1.1.1.js"
for f in wix-home-v657/n1-site-wix-v657.js wix-kreatif-produksiyon-v23/n1-kreatif-produksiyon-v23.js wix-e-ticaret-yonetimi-v23/n1-e-ticaret-yonetimi-v23.js wix-sosyal-medya-v27/n1-sosyal-medya-v27.js wix-reklam-yonetimi-v23/n1-reklam-yonetimi-v23.js wix-uiux-tasarim-v28/n1-uiux-tasarim-v28.js wix-yapay-zeka-v2/n1-yapay-zeka-v2.js wix-uygulama-gelistirme-v2/n1-uygulama-gelistirme-v2.js wix-markalar-v1/n1-markalar-v11.js wix-kisaca-biz-v1/n1-kisaca-biz-v1.js wix-yasal-sayfalar-v1/n1-yasal-sayfalar-v1.js; do URLS="$URLS $J@$P/wix-global-menu-v12/pages/$f"; done
fail=0; for u in $URLS; do r=""; for i in $(seq 20); do c=$(curl -s -o /dev/null -w '%{http_code}' "$u"); [ "$c" = 200 ] && r="$r." || { r="${r}X"; fail=1; }; done; echo "$r ${u##*/}"; done
[ $fail = 0 ] && echo "TAMAM: tüm adresler 20/20" || echo "BEKLEYİN: bazı adresler henüz oturmadı, 1-2 dk sonra tekrar"
