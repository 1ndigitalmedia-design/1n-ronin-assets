# 5 tekrar × 3 geçiş × (canlı, v13); prefetch AÇIK
for i in 1 2 3 4 5; do for spec in "h2k / /kreatif-produksiyon" "s2k /sosyal-medya /kreatif-produksiyon" "k2h /kreatif-produksiyon /"; do set -- $spec
 timeout 200 node p04frames.js b-live-$1-$i $2 $3 >/dev/null 2>&1; echo "live $1 $i: $(python3 p04analyze.py p04/b-live-$1-$i | tail -1)"
 INJLOADER=$PWD/inj-loader13.js timeout 200 node p04frames.js b-v13-$1-$i $2 $3 >/dev/null 2>&1; echo "v13  $1 $i: $(python3 p04analyze.py p04/b-v13-$1-$i | tail -1) | $(python3 p04analyze.py p04/b-v13-$1-$i | head -1 | cut -c1-90)"
done; done
