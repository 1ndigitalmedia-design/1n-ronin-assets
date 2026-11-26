#!/usr/bin/env bash
# Test paketini üretir: canlı Wix özel kodunda n1-nav v1.0.1 yerine v1.0.2 + n1-stability-v1 yüklenmiş gibi
# (DOMContentLoaded anında = bodyEnd "defer" betik zamanı). Kullanım: bash build-inject.sh > inject-all.js
R="$(cd "$(dirname "$0")/../../.." && pwd)"
echo "(function(){ if (window.top !== window) return; window.__n1Nav = { placeholder: true }; function run(){ if (window.__n1Nav && window.__n1Nav.placeholder) delete window.__n1Nav;"
cat "$R/wix-mobile-stability-v1/n1-nav-v1.0.2.js"; echo ";"; cat "$R/wix-mobile-stability-v1/n1-stability-v1.js"
echo "} if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run, {once:true}); else run(); })();"
