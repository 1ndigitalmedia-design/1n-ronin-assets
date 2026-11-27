#!/bin/bash
# kullanım: af.sh <webkit|chromium>
cd "$(dirname "$0")"; BR=$1; export DPR=3
job(){ local name=$1 scen=$2 qs=$3; SCEN13=$scen QS="$qs" timeout 3000 node cycle13.js $BR $name 21 v13c/$BR-$name.json >> v13c/$BR.log 2>&1; echo "$BR $name bitti $(date +%T)" >> v13c/$BR.log; }
job A A ""
job B V ""
job C V "?n1t=C"
job D V "?n1t=D"
job E V "?n1t=E"
job F1x V "?n1t=C,hero:1x"
echo ALLDONE >> v13c/$BR.log
