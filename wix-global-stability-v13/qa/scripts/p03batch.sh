#!/bin/bash
cd "$(dirname "$0")"
run(){ timeout 2400 node p03back.js $1 $2 $3 >> p03/batch.log 2>&1; }
: > p03/batch.log
run webkit live normal & run chromium live normal & wait
run webkit v13 normal & run chromium v13 normal & wait
run webkit live slow & run webkit v13 slow & wait
run chromium live slow & run chromium v13 slow & wait
echo DONE >> p03/batch.log
