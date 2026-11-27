#!/usr/bin/env bash
# usage: build11.sh <warmMode> <guard:1|0>
M=$1; G=${2:-1}
echo "(function(){ if (window.top !== window) return;"
[ "$G" = 1 ] && echo "window.__n1Nav = window.__n1Nav || { pending: '1.0.3' };"
echo "function run(){"
cat /home/user/1n-ronin-assets/wix-mobile-stability-v1/n1-nav-v1.0.3.js; echo ";"
sed "s/var WARM_MODE = 'home';/var WARM_MODE = '$M';/" /home/user/1n-ronin-assets/wix-mobile-stability-v1/n1-stability-v1.1.js
echo "} if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run, {once:true}); else run(); })();"
