#!/bin/bash
cd "$(dirname "$0")"
PG=/,/kreatif-produksiyon,/e-ticaret-yonetimi,/sosyal-medya,/reklam-yonetimi,/ui-ux-tasarim,/yapay-zeka,/uygulama-gelistirme
run(){ timeout 2400 node net14.js $1 $2 $3 $PG ../qa/net/$1-$2-$3.json >> ../qa/net/net.log 2>&1; }
: > ../qa/net/net.log
for prof in mobil tablet_yatay masaustu; do run chromium live $prof & run chromium v14 $prof & wait; done
for prof in mobil tablet_yatay masaustu; do run webkit live $prof & run webkit v14 $prof & wait; done
run chromium v14 android & run chromium v14 tablet & wait
echo DONE >> ../qa/net/net.log
