#!/bin/bash
cd "$(dirname "$0")"; : > grad24.jsonl; : > grad24.log
eng(){ BR=$1
  for p in / /kreatif-produksiyon /e-ticaret-yonetimi /sosyal-medya /reklam-yonetimi /ui-ux-tasarim /yapay-zeka /uygulama-gelistirme; do timeout 1200 node grad24.js $BR $p 150 v24 2 >> grad24.log 2>&1; done
  for s in 100 250; do timeout 900 node grad24.js $BR /e-ticaret-yonetimi $s v24 2 >> grad24.log 2>&1; done
  for s in 100 250; do timeout 600 node grad24.js $BR /e-ticaret-yonetimi $s v23 1 >> grad24.log 2>&1; done
}
eng webkit & eng chromium & wait; echo DONE >> grad24.log
