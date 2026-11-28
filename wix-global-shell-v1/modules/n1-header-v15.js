/*!
 * n1-header — 1N Digital Media header (v15 · GLOBAL MENÜ V2.1; v14 tabanı)
 * v15: yalnız "Uygulama ve Platformlar": tek renkli gömülü SVG logolar (#BDBFB9, hover/odak #A2FF00), ortak koyu kutu #1A1C1B,
 *   kompakt ölçü (masaüstü 56 / tablet 52 / mobil 48 px kutu), başlıkla sola hizalı. Diğer her şey v14 ile aynıdır.
 * v14: İletişim satırı; A7 Prodüksiyon ve "Uygulama ve Platformlar" kartları (menü verisinden, logolar menü açılınca yüklenir);
 *   adres tabanlı aktif durum; no-cta özniteliği (bağımsız header'da Teklif Al yok); kısa ekran düzeni. Diğer her şey v13 ile aynıdır.
 * v13: hem "href" hem "sub" taşıyan başlık (İnsan Kaynakları) HİBRİT satırdır: başlık metni bağlantıdır (/insan-kaynaklari'ye gider),
 *   yanındaki ayrı düğme (not metni + işaret) alt menüyü açar/kapatır. Dokunmatikte bağlantı ve alt menü birbirini engellemez;
 *   farede başlığın üzerine gelince alt menü yine açılır, tıklama sayfaya gider. Diğer başlıklar, tasarım ve hareketler v12 ile aynıdır.
 *   V1.3 menü kapanış betiğiyle uyum: menü her açılışta ve BFCache dönüşünde alt menü durumu sıfırlanır.
 * v12: alt menülü başlık (Hizmetler, İnsan Kaynakları) tıklama/dokunma/Enter ile AÇILIR ve aynı başlığa tekrar
 *   basınca KAPANIR (v6.48'de ikinci basış kapatmıyordu). Fareyle üzerine gelince açılma yalnızca fare için; dokunmatik
 *   ekranda (hover:none / pointer:coarse) pointerenter hiç kullanılmaz; tıklama/dokunma ile çakışıp alt menüyü kapatmaz. Tasarım, CSS, işaretleme ve diğer davranışlar
 *   v6.48 ile birebir aynıdır.
 * v6.13: hafif cam etkili koyu butonlar; menü başlıklarında kısa ajans tanımları; "1N Digital Media" marka öğesi menünün altında.
 * v6.11'den farklar: küçük ve keskin köşeli logo; koyu, yarı saydam TEKLİF AL / MENU; menüde "1N Digital Media"
 * marka bağlantısı (Ana Sayfa yerine); altı ana başlık ve yanda açılan alt menü kartı.
 * Korunanlar: konumlar, %90 kapsayıcı, orta metin, MENU/CLOSE geçişi, kart yapısı/köşeleri, açılış-kapanış hareketi,
 * kaydırma gradienti, panelin body'ye taşınması (kırpılmaz), Escape / dışarı tıklama, odak yönetimi, reduced-motion.
 *
 * Menü içeriği öğenin içindeki JSON'dan okunur (kolay değiştirilir):
 *   <n1-header><script type="application/json">{"brand":{"text":"1N Digital Media","href":"#ust"},
 *     "items":[{"title":"Hizmetler","match":"#hizmetler","sub":[{"text":"Creative Studio"},{"text":"…","href":"#hizmetler"}]}]}</script></n1-header>
 *   href'i olmayan alt başlıklar bağlantı değildir (daha soluk görünür, tıklanmaz) — sahte URL üretilmez.
 * Alt menü: ana başlığın üzerine gelince (ya da tıklayınca / Enter, →) ana kartın solunda aynı stilde bir kart açılır;
 *   ana kart büyümez. ← veya Escape alt menüyü kapatır, ikinci Escape menüyü kapatır.
 */
(function () {
  'use strict';
  /* v15: tek renkli platform logoları (tools/build_platform_mono.py → assets/platforms/mono/*.svg; menü verisindeki görsel adıyla eşleşir) */
  const PLAT_ICONS = {"01-zeyp": "<svg viewBox=\"165.1 165.1 668.7 668.7\" fill=\"currentColor\" aria-hidden=\"true\" focusable=\"false\"><g transform=\"translate(0.000000,1000.000000) scale(1.000000,-1.000000)\" fill-opacity=\"0.42\"><path d=\"M495 753 c-69 -9 -107 -40 -125 -103 -5 -15 -5 -17 -4 -17 0 0 31 11\n69 24 135 46 133 45 169 49 5 0 8 1 8 1 0 0 -4 5 -8 9 -27 30 -64 42 -109 37z\nM273 692 c-5 -2 -28 -7 -51 -13 -24 -6 -43 -11 -43 -11 -2 -1 -1 -3 16 -50 2\n-6 7 -18 10 -26 2 -9 7 -21 10 -28 2 -7 5 -14 6 -16 1 -5 6 -19 15 -44 11 -30\n19 -52 25 -68 6 -17 7 -21 12 -34 2 -5 5 -15 8 -22 5 -15 7 -20 13 -37 2 -6 6\n-17 9 -25 3 -8 5 -15 6 -15 0 -1 21 4 45 10 24 6 50 12 56 13 l11 3 -6 16 c-5\n15 -5 16 -5 26 l0 10 4 3 c2 1 7 5 10 7 4 3 11 7 16 11 8 6 9 7 9 9 0 5 5 96\n6 106 0 6 0 7 -1 7 -1 -1 -17 -6 -37 -13 l-35 -12 -10 0 -10 1 -5 13 c-2 7 -4\n13 -5 12 0 0 0 -4 -1 -7 0 -4 -1 -7 -1 -7 -1 0 -1 0 -6 14 -2 6 -7 18 -10 28\n-3 9 -7 18 -8 21 -1 5 -8 22 -12 36 -3 5 -5 12 -6 16 -8 21 -10 26 -17 46 -4\n12 -8 22 -9 22 0 0 -5 -1 -9 -2z M604 575 c-21 -6 -56 -19 -56 -21 0 -1 14\n-62 15 -63 0 0 10 7 20 14 4 4 11 9 16 13 12 9 30 28 33 34 l3 6 -2 4 c-7 13\n-15 17 -29 13z M687 433 c-3 -3 -11 -9 -17 -15 -17 -13 -16 -12 -12 -11 2 1 5\n1 8 2 20 4 32 7 33 7 0 1 -5 22 -6 22 0 0 -3 -2 -6 -5z\"/></g><g transform=\"translate(0.000000,1000.000000) scale(1.000000,-1.000000)\"><path d=\"M611 696 c-35 -3 -32 -2 -167 -49 -52 -18 -97 -33 -101 -34 -4 -2 -6\n-3 -6 -4 0 -2 33 -99 34 -100 1 -1 24 7 111 37 46 16 109 37 116 39 10 2 26 2\n32 -1 14 -7 19 -25 12 -39 -4 -8 -21 -26 -34 -36 -29 -23 -53 -40 -81 -60 -10\n-7 -20 -14 -23 -16 -5 -4 -18 -13 -46 -33 -13 -10 -30 -21 -35 -25 -2 -2 -4\n-4 -4 -4 0 -1 4 -13 9 -28 5 -14 15 -41 21 -60 7 -20 12 -36 13 -36 1 -1 4 0\n44 9 12 3 33 7 47 10 31 8 49 12 54 13 2 0 7 2 12 3 4 0 13 2 20 4 6 2 16 4\n21 5 14 3 17 4 22 5 18 4 31 7 58 13 2 0 9 2 15 4 14 3 16 3 30 6 22 5 34 8\n36 9 1 1 -30 92 -32 97 -1 0 -4 0 -10 -1 -8 -3 -12 -3 -26 -6 -11 -3 -14 -4\n-28 -7 -7 -2 -20 -5 -29 -7 -10 -2 -19 -4 -21 -4 -2 0 -13 -3 -24 -5 -11 -3\n-25 -6 -31 -8 -14 -3 -17 -3 -10 2 27 17 78 60 96 80 10 11 11 14 19 25 23 32\n26 73 8 117 -22 56 -58 83 -111 85 -5 0 -10 0 -11 0z\"/></g></svg>", "02-market": "<svg viewBox=\"131.3 131.3 736.5 736.5\" fill=\"currentColor\" aria-hidden=\"true\" focusable=\"false\"><g transform=\"translate(0.000000,1000.000000) scale(1.000000,-1.000000)\"><path d=\"M679 803 c-16 -4 -33 -17 -40 -30 -1 -4 -28 -66 -59 -139 -34 -80\n-57 -134 -59 -136 -9 -11 -28 -12 -39 -3 -5 5 -2 -3 -44 97 -20 48 -37 90 -39\n93 -5 9 -16 20 -24 24 -15 8 -14 8 -70 8 l-50 0 -9 -4 c-20 -7 -35 -23 -40\n-43 -3 -11 -3 -403 0 -415 6 -26 26 -48 52 -57 11 -4 31 -4 42 0 26 8 45 28\n52 53 2 8 2 11 2 117 0 60 0 109 1 109 0 0 14 -37 31 -82 41 -107 39 -103 45\n-111 33 -51 108 -51 140 0 4 6 101 234 179 419 8 19 10 28 10 38 0 22 -15 47\n-35 57 -13 7 -32 9 -46 5z M784 680 c-4 -2 -6 -6 -65 -143 -66 -158 -66 -156\n-70 -183 -4 -21 -5 -75 -3 -93 10 -75 110 -91 143 -22 7 15 7 -1 7 228 0 140\n0 208 -1 209 -2 4 -8 6 -11 4z\"/></g></svg>", "03-hemen-tikla": "<svg viewBox=\"260.8 260.3 478.4 478.4\" fill=\"currentColor\" aria-hidden=\"true\" focusable=\"false\"><g transform=\"translate(0.000000,1000.000000) scale(1.000000,-1.000000)\"><path d=\"M362 695 c-2 -2 -16 -29 -17 -34 0 -3 3 -6 7 -6 2 0 3 2 11 17 9 19\n9 18 6 22 -3 2 -4 2 -7 1z M382 653 c-18 -9 -20 -11 -15 -16 2 -3 3 -3 21 6\n16 8 17 9 17 12 0 3 -3 6 -5 6 -1 0 -9 -4 -18 -8z M288 613 c-17 -9 -18 -9\n-18 -13 0 -7 5 -7 24 3 15 7 16 8 16 11 1 8 -3 8 -22 -1z M376 614 c-12 -2\n-18 -8 -22 -18 -2 -6 -2 -7 -3 -110 -1 -116 -1 -128 4 -141 14 -39 61 -53 94\n-28 12 10 67 67 71 74 11 21 -3 43 -28 43 -11 1 -15 -2 -41 -28 -24 -24 -26\n-25 -32 -22 -7 3 -6 0 -6 84 0 81 0 80 5 83 1 1 28 1 81 1 l78 0 3 -3 c7 -7 5\n-9 -31 -45 -17 -16 -30 -30 -30 -31 0 -2 143 -145 156 -156 14 -12 23 -15 35\n-10 14 5 23 21 20 35 -2 9 -8 16 -66 74 -32 31 -57 57 -57 57 0 1 9 10 20 21\n22 23 25 26 29 35 16 34 -5 77 -42 85 -8 1 -230 2 -238 0z M322 600 c-1 -1 -6\n-9 -10 -18 -8 -15 -8 -17 -7 -19 2 -3 7 -4 9 -1 2 2 16 31 16 33 0 4 -5 7 -8\n5z\"/></g></svg>", "04-intelligence": "<svg viewBox=\"164.9 166.4 641.1 641.1\" fill=\"currentColor\" aria-hidden=\"true\" focusable=\"false\"><g transform=\"translate(0.000000,1000.000000) scale(1.000000,-1.000000)\"><path d=\"M299 765 c-71 -8 -114 -84 -83 -148 37 -78 147 -80 186 -3 38 73 -21\n160 -103 151z M586 679 c-14 -1 -23 -3 -40 -8 -7 -2 -22 -10 -30 -15 -25 -17\n-41 -43 -55 -85 -10 -29 -12 -38 -24 -99 -3 -12 -4 -15 -5 -8 -1 5 -4 17 -5\n21 -2 6 -8 34 -10 44 -1 7 -6 26 -8 32 0 3 -1 7 -1 8 0 3 -2 2 -9 -5 -23 -20\n-56 -34 -85 -34 -4 0 -7 0 -7 -1 -1 0 0 -5 2 -11 1 -6 3 -15 5 -21 1 -7 4 -19\n6 -29 2 -10 5 -20 5 -22 1 -7 3 -12 4 -20 4 -14 8 -33 9 -38 1 -3 2 -8 3 -11\n2 -10 9 -39 11 -50 1 -5 1 -6 6 -28 2 -9 4 -18 5 -20 3 -13 4 -19 5 -20 1 0\n130 15 135 16 2 0 3 1 3 4 1 6 8 42 14 81 2 11 4 21 5 22 0 1 2 11 4 23 4 27\n4 28 8 48 2 9 4 19 4 22 1 9 7 33 10 47 7 27 15 43 24 48 17 10 37 4 45 -14 4\n-11 5 -15 20 -143 8 -66 14 -120 15 -120 0 -1 19 1 53 5 28 3 53 6 54 6 2 0 3\n1 4 1 1 2 -26 235 -29 255 -18 86 -69 126 -151 119z\"/></g></svg>"};
  const TAG = 'n1-header';
  if (customElements.get(TAG)) return;
  const EASE = 'cubic-bezier(.22,.8,.24,1)';
  const css = `
@media (min-width:901px){.site-container{width:var(--site-w,90%);margin-left:auto;margin-right:auto}}
${TAG}{position:fixed;top:0;left:0;right:0;z-index:900;display:block;pointer-events:none;font-family:Barlow,"Helvetica Neue",Arial,sans-serif;color:#e4e3dd}
${TAG}::before{content:"";position:absolute;left:0;right:0;top:0;height:150px;pointer-events:none;opacity:0;transition:opacity .6s ease;
  background:linear-gradient(to bottom,rgba(5,6,6,.86) 0%,rgba(5,6,6,.62) 38%,rgba(5,6,6,.24) 72%,rgba(5,6,6,0) 100%)}
${TAG}[data-scrolled]::before{opacity:1}
${TAG} .n1h-bar{position:relative;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;height:88px}
${TAG} .n1h-logo{justify-self:start;display:inline-flex;pointer-events:auto}
${TAG} .n1h-logo img{display:block;width:32px;height:32px;border-radius:0}
${TAG} .n1h-tag{margin:0;justify-self:center;font-size:11.5px;line-height:1;font-weight:400;letter-spacing:.22em;text-transform:uppercase;color:rgba(236,235,230,.78);white-space:nowrap}
${TAG} .n1h-right{justify-self:end;display:flex;gap:8px;pointer-events:auto}
${TAG} .n1h-btn{display:inline-flex;align-items:center;gap:10px;height:44px;padding:0 18px;border-radius:10px;font:500 12.5px/1 Barlow,Arial,sans-serif;letter-spacing:.12em;text-transform:uppercase;text-decoration:none;cursor:pointer;
  color:#e4e3dd;background:rgba(12,14,13,.46);border:1px solid rgba(228,227,221,.1);-webkit-backdrop-filter:blur(10px) saturate(115%);backdrop-filter:blur(10px) saturate(115%);transition:background-color .35s ease,border-color .35s ease,color .35s ease}
${TAG} .n1h-btn:hover{background:rgba(22,25,23,.62);border-color:rgba(228,227,221,.2);color:#f1f0ea}
${TAG} .n1h-cta{border-color:rgba(168,207,98,.24)}
${TAG} .n1h-cta:hover{border-color:rgba(168,207,98,.5)}
${TAG} .n1h-dot{width:6px;height:6px;border-radius:50%;background:var(--n1-accent,#A8CF62);flex:none;transition:transform .35s ${EASE}}
${TAG} .n1h-cta:hover .n1h-dot{transform:scale(1.35)}
${TAG} .n1h-menu{min-width:112px;justify-content:space-between}
${TAG}[data-open] .n1h-menu{background:rgba(24,27,25,.86);border-color:rgba(236,235,230,.16)}
${TAG} .n1h-lbl{position:relative;display:inline-block;height:13px;overflow:hidden}
${TAG} .n1h-lbl span{display:block;height:13px;transition:transform .45s ${EASE}}
${TAG}[data-open] .n1h-lbl span{transform:translateY(-13px)}
${TAG} .n1h-ico{position:relative;width:14px;height:14px;flex:none}
${TAG} .n1h-ico i{position:absolute;left:3px;width:8px;height:1.5px;background:currentColor;border-radius:1px;transition:transform .45s ${EASE},top .45s ${EASE}}
${TAG} .n1h-ico i:nth-child(1){top:4px}${TAG} .n1h-ico i:nth-child(2){top:9px}
${TAG}[data-open] .n1h-ico i:nth-child(1){top:6.25px;transform:rotate(45deg)}
${TAG}[data-open] .n1h-ico i:nth-child(2){top:6.25px;transform:rotate(-45deg)}
${TAG} .n1h-btn:focus-visible,${TAG} .n1h-logo:focus-visible{outline:2px solid #ecebe6;outline-offset:3px}
@media (max-width:900px){${TAG}{display:none}}

.n1h-panel{position:fixed;z-index:901;top:96px;right:calc((100% - var(--site-w,90%)) / 2);width:min(380px,var(--site-w,90%));display:grid;gap:8px;
  font-family:Barlow,"Helvetica Neue",Arial,sans-serif;visibility:hidden;pointer-events:none;transition:visibility 0s linear .42s}
.n1h-panel[data-open]{visibility:visible;pointer-events:auto;transition-delay:0s}
.n1h-panel{overflow:visible}
.n1h-panel .n1h-main{overflow:visible}
.n1h-card{background:#111312;color:#ecebe6;border-radius:14px;box-shadow:0 18px 40px rgba(0,0,0,.45);
  opacity:0;transform:translate3d(0,-10px,0) scale(.985);transform-origin:top right;
  transition:opacity .22s ease,transform .32s ${EASE};transition-delay:calc(var(--i,0) * 30ms)}
.n1h-panel[data-open] .n1h-card{opacity:1;transform:none;transition:opacity .34s ease,transform .5s ${EASE};transition-delay:calc(var(--i,0) * 55ms)}

/* marka öğesi: menünün alt kartı, ana sayfaya döner */
.n1h-brandcard{padding:8px}
.n1h-brand{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:14px 16px;border-radius:9px;color:var(--n1-accent,#A8CF62);text-decoration:none;transition:background-color .3s ease,color .3s ease}
.n1h-brand b{display:block;font:600 22px/1 "Barlow Condensed",Barlow,Arial,sans-serif;letter-spacing:.01em}
.n1h-brand small{display:block;margin-top:6px;font:400 12px/1 Barlow,Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:rgba(228,227,221,.45);transition:color .3s ease}
.n1h-brand .n1h-bline{display:block;height:1px;width:22px;background:currentColor;opacity:.6;transition:width .5s ${EASE},opacity .3s ease}
.n1h-brand:hover,.n1h-brand:focus-visible{background:#171b18;color:#C2E384;outline:none}
.n1h-brand:hover small,.n1h-brand:focus-visible small{color:rgba(228,227,221,.7)}
.n1h-brand:hover .n1h-bline,.n1h-brand:focus-visible .n1h-bline{width:56px;opacity:1}

.n1h-nav{list-style:none;margin:0;padding:10px}
.n1h-item{position:relative;display:flex;align-items:center;gap:14px;width:100%;min-height:50px;padding:0 14px;border:0;border-radius:9px;background:transparent;color:#ecebe6;cursor:pointer;text-align:left;
  font:500 27px/1 "Barlow Condensed",Barlow,Arial,sans-serif;letter-spacing:.005em;transition:background-color .25s ease,color .25s ease}
.n1h-item .n1h-mark{width:6px;height:6px;border-radius:50%;background:var(--n1-accent,#A8CF62);flex:none;transform:scale(0);opacity:0;transition:transform .35s ${EASE},opacity .25s ease}
.n1h-item .n1h-txt{flex:1;display:inline-block;transition:transform .35s ${EASE}}
.n1h-item .n1h-more{font:400 11.5px/1 Barlow,Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:rgba(228,227,221,.34);transition:transform .35s ${EASE},color .25s ease}
.n1h-item:hover,.n1h-item:focus-visible,.n1h-item[aria-expanded="true"]{background:#1a1d1b;outline:none}
.n1h-item:hover .n1h-txt,.n1h-item:focus-visible .n1h-txt,.n1h-item[aria-expanded="true"] .n1h-txt{transform:translateX(4px)}
.n1h-item:hover .n1h-more,.n1h-item[aria-expanded="true"] .n1h-more{transform:translateX(-3px);color:var(--n1-accent,#A8CF62)}
.n1h-item[data-current] .n1h-mark,.n1h-item:hover .n1h-mark,.n1h-item:focus-visible .n1h-mark,.n1h-item[aria-expanded="true"] .n1h-mark{transform:scale(1);opacity:1}
.n1h-row{display:flex;align-items:stretch;gap:4px}
.n1h-row>.n1h-item{flex:1;width:auto;min-width:0}
.n1h-subtog{flex:none;display:inline-flex;align-items:center;gap:9px;min-width:44px;padding:0 12px;border:0;border-radius:9px;background:transparent;cursor:pointer;
  font:400 11.5px/1 Barlow,Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:rgba(228,227,221,.34);transition:background-color .25s ease,color .25s ease}
.n1h-subtog .n1h-plus{position:relative;width:9px;height:9px;flex:none;transition:transform .35s ${EASE}}
.n1h-subtog .n1h-plus::before,.n1h-subtog .n1h-plus::after{content:"";position:absolute;left:0;top:4px;width:9px;height:1px;background:currentColor}
.n1h-subtog .n1h-plus::after{transform:rotate(90deg)}
.n1h-subtog:hover,.n1h-subtog:focus-visible,.n1h-subtog[aria-expanded="true"]{background:#1a1d1b;color:var(--n1-accent,#A8CF62);outline:none}
.n1h-subtog[aria-expanded="true"] .n1h-plus{transform:rotate(45deg)}
.n1h-item[data-exp]{background:#1a1d1b}
.n1h-item[data-exp] .n1h-txt{transform:translateX(4px)}
.n1h-item[data-exp] .n1h-mark{transform:scale(1);opacity:1}
.n1h-nav li.n1h-last{margin-top:6px}
.n1h-nav li.n1h-last .n1h-item{font-size:21px;color:rgba(228,227,221,.72);min-height:46px}
.n1h-nav li.n1h-last .n1h-item:hover,.n1h-nav li.n1h-last .n1h-item[aria-expanded="true"]{color:#ecebe6}

/* alt menü kartı: ana kartın solunda, aynı yüzey ve köşe */
.n1h-sub{position:absolute;right:calc(100% + 8px);top:0;width:300px;padding:10px;background:#111312;border-radius:14px;box-shadow:0 18px 40px rgba(0,0,0,.45);
  opacity:0;transform:translate3d(8px,0,0);visibility:hidden;pointer-events:none;transition:opacity .22s ease,transform .3s ${EASE},visibility 0s linear .3s}
.n1h-sub[data-open]{opacity:1;transform:none;visibility:visible;pointer-events:auto;transition:opacity .3s ease,transform .45s ${EASE},visibility 0s}
.n1h-panel[data-open] > .n1h-sub[data-open]{z-index:5;visibility:visible;opacity:1;pointer-events:auto;transform:none}
.n1h-sub h3{margin:6px 14px 8px;font:500 11px/1 Barlow,Arial,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:rgba(236,235,230,.45)}
.n1h-sub ul{list-style:none;margin:0;padding:0}
.n1h-sub a,.n1h-sub span.n1h-soon{display:flex;align-items:center;justify-content:space-between;gap:10px;min-height:42px;padding:0 14px;border-radius:8px;font:400 17px/1.15 Barlow,Arial,sans-serif;text-decoration:none}
.n1h-sub a{color:#ecebe6;transition:background-color .25s ease}
.n1h-sub a .n1h-st{transition:transform .35s ${EASE}}
.n1h-sub a:hover,.n1h-sub a:focus-visible{background:#1a1d1b;outline:none}
.n1h-sub a:hover .n1h-st,.n1h-sub a:focus-visible .n1h-st{transform:translateX(4px)}
.n1h-sub span.n1h-soon{color:rgba(228,227,221,.66);cursor:default}
.n1h-sub span.n1h-soon em{font-style:normal;font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:rgba(236,235,230,.3)}


/* v14 — A7 Prodüksiyon ve Uygulama ve Platformlar kartları: Başlangıca Dön kartıyla aynı yüzey, köşe ve tipografi ailesi */
.n1h-a7card{padding:8px}
.n1h-a7{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:13px 16px;border-radius:9px;color:#ecebe6;text-decoration:none;transition:background-color .3s ease,color .3s ease}
.n1h-a7 b{display:block;font:600 22px/1 "Barlow Condensed",Barlow,Arial,sans-serif;letter-spacing:.01em}
.n1h-a7 small{display:block;margin-top:6px;font:400 12px/1 Barlow,Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:rgba(228,227,221,.45);transition:color .3s ease}
.n1h-ext{display:grid;place-items:center;width:34px;height:34px;flex:none;border:1px solid rgba(228,227,221,.16);border-radius:9px;color:rgba(228,227,221,.7);transition:border-color .3s ease,color .3s ease,background-color .3s ease}
.n1h-ext svg{display:block;width:14px;height:14px;transition:transform .35s ${EASE}}
.n1h-a7:hover,.n1h-a7:focus-visible{background:#171b18;outline:none}
.n1h-a7:hover small,.n1h-a7:focus-visible small{color:rgba(228,227,221,.7)}
.n1h-a7:hover .n1h-ext,.n1h-a7:focus-visible .n1h-ext{border-color:var(--n1-accent,#A8CF62);color:var(--n1-accent,#A8CF62)}
.n1h-a7:hover .n1h-ext svg,.n1h-a7:focus-visible .n1h-ext svg{transform:translate(2px,-2px)}
.n1h-platcard{padding:14px 16px 16px}
.n1h-platcard h3{margin:0 0 11px;font:500 11px/1 Barlow,Arial,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:rgba(236,235,230,.45)}
/* v15: kompakt tek renkli platform logoları — kutular sola hizalı, kart genişliğine yayılmaz */
.n1h-plats{list-style:none;margin:0;padding:0;display:flex;flex-wrap:nowrap;justify-content:flex-start;gap:10px}
.n1h-plats li{flex:0 0 auto}
.n1h-plat{--pb:56px;--pi:32px;position:relative;display:grid;place-items:center;width:var(--pb);height:var(--pb);min-width:44px;min-height:44px;box-sizing:border-box;border-radius:8px;background:#1A1C1B;color:#BDBFB9;box-shadow:inset 0 0 0 1px rgba(189,191,185,.14);outline:none;transition:color .2s ease,box-shadow .2s ease}
.n1h-plat svg{display:block;width:var(--pi);height:var(--pi);pointer-events:none}
.n1h-plat img{display:block;width:var(--pi);height:var(--pi);object-fit:contain}
@media (hover:hover) and (pointer:fine){.n1h-plat:hover{color:#A2FF00;box-shadow:inset 0 0 0 1px rgba(162,255,0,.32)}}
.n1h-plat:focus-visible{color:#A2FF00;box-shadow:inset 0 0 0 1px rgba(162,255,0,.32),0 0 0 2px #111312,0 0 0 4px #A2FF00}
@media (max-width:1024px){.n1h-plat{--pb:52px;--pi:30px}}
@media (max-width:767px){.n1h-plats{gap:8px}.n1h-plat{--pb:48px;--pi:28px}}
.n1h-sr{position:absolute!important;width:1px!important;height:1px!important;overflow:hidden!important;clip:rect(0 0 0 0)!important;white-space:nowrap!important}
/* dar panelde (iç sayfa / ana sayfa mobil paneli) sıra: ana kart, alt menü, Başlangıca Dön, A7, platformlar */
.n1h-panel.n1-inner-panel .n1h-a7card{order:4}
.n1h-panel.n1-inner-panel .n1h-platcard{order:5}
/* kısa masaüstü ekranları: satırlar ve kartlar sıkışır */
@media (min-width:1025px) and (max-height:820px){
  .n1h-item{min-height:42px;font-size:24px}
  .n1h-nav{padding:8px}
  .n1h-brand{padding:11px 16px}
  .n1h-a7{padding:10px 16px}
  .n1h-platcard{padding:11px 16px 12px}
  .n1h-platcard h3{margin:0 0 10px}
}
/* çok kısa masaüstü ekranı: panel kendi içinde kayar, alt menü panelin içine (ana kartın altına) iner — kırpılma olmaz */
@media (min-width:1025px) and (max-height:640px){
  .n1h-panel{max-height:calc(100vh - 104px);overflow-y:auto;overflow-x:hidden;overscroll-behavior:contain}
  .n1h-panel .n1h-main{order:1}
  .n1h-panel .n1h-sub{position:static;width:auto;display:none;order:2;transform:none}
  .n1h-panel .n1h-sub[data-open]{display:block}
  .n1h-panel .n1h-brandcard{order:3}
  .n1h-panel .n1h-a7card{order:4}
  .n1h-panel .n1h-platcard{order:5}
}
@media (prefers-reduced-motion: reduce){.n1h-plat,.n1h-a7,.n1h-ext,.n1h-ext svg{transition-duration:0s!important}}

.n1h-foot{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:16px 18px 16px 24px}
.n1h-foot .n1h-dot{width:6px;height:6px;border-radius:50%;background:var(--n1-accent,#A8CF62)}
.n1h-foot p{margin:0;font-size:13px;line-height:1.35;color:rgba(236,235,230,.62)}
.n1h-foot a{flex:none;display:inline-flex;align-items:center;gap:10px;height:40px;padding:0 14px;border-radius:9px;background:#1a1d1b;color:#ecebe6;text-decoration:none;font:500 14px/1 Barlow,Arial,sans-serif;white-space:nowrap;transition:background-color .25s ease}
.n1h-foot a:hover,.n1h-foot a:focus-visible{background:#242825;outline:none}
@media (max-width:900px){.n1h-panel{display:none}}
@media (prefers-reduced-motion: reduce){
  ${TAG} *,${TAG}::before,.n1h-panel,.n1h-panel *{transition-duration:0s!important;transition-delay:0s!important}
}
`;
  const DEFAULT_MENU = {
    "brand": {
      "text": "1N Digital Media",
      "note": "Başlangıca dön",
      "href": "#ust"
    },
    "items": [
      {
        "title": "Kısaca Biz",
        "note": "Stüdyo",
        "href": "/kisaca-biz"
      },
      {
        "title": "Hizmetler",
        "note": "Disiplinler",
        "href": "#hizmetler-ozet",
        "match": "#hizmetler-ozet"
      },
      {
        "title": "Markalar",
        "note": "Seçili markalar",
        "href": "/markalar"
      },
      {
        "title": "Akademi",
        "note": "1N Academy",
        "href": "/reklam-ajansi"
      },
      {
        "title": "İnsan Kaynakları",
        "note": "Kariyer",
        "href": "/insan-kaynaklari",
        "sub": [
          {
            "text": "Açık Pozisyonlar",
            "href": "/acik-pozisyonlar"
          },
          {
            "text": "Staj Programları",
            "href": "/staj-programlari"
          }
        ]
      },
      {
        "title": "İletişim",
        "note": "Bize ulaşın",
        "href": "/iletisim"
      }
    ],
    "a7": { "text": "A7 Prodüksiyon", "note": "a7-1n.com", "href": "https://www.a7-1n.com/a7-produksiyon" },
    "platforms": {
      "title": "Uygulama ve Platformlar",
      "items": [
        { "name": "ZEYP", "href": "https://www.zeyp.com.tr/", "img": "https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@9a8e261f72975ccc5d94d33dfe9e6313b4e8f5dd/wix-global-shell-v1/assets/platforms/01-zeyp" },
        { "name": "Market — Canlı Piyasalar", "href": "https://www.carsialtin.com/faprika/canli-piyasalar/", "img": "https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@9a8e261f72975ccc5d94d33dfe9e6313b4e8f5dd/wix-global-shell-v1/assets/platforms/02-market" },
        { "name": "Hemen Tıkla", "href": "https://www.hementik.la/", "img": "https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@9a8e261f72975ccc5d94d33dfe9e6313b4e8f5dd/wix-global-shell-v1/assets/platforms/03-hemen-tikla" },
        { "name": "1N Intelligence", "href": "https://www.reklam1n.com/intelligence", "img": "https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@9a8e261f72975ccc5d94d33dfe9e6313b4e8f5dd/wix-global-shell-v1/assets/platforms/04-intelligence" }
      ]
    }
  };
  // v12: fareyle üzerine gelince açma yalnızca gerçekten hover yapabilen ince işaretçili cihazlarda (iPhone/iPad: kapalı;
  // dokunuş sonrası tarayıcının ürettiği uyumluluk 'mouse' olayları alt menüyü kapatıp açmasın)
  const N1H_CAN_HOVER = () => { try { return matchMedia('(hover: hover) and (pointer: fine)').matches; } catch (e) { return true; } };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  class N1Header extends HTMLElement {
    connectedCallback() {
      if (this._on) return; this._on = true;
      if (!document.getElementById('n1h-style')) { const s = document.createElement('style'); s.id = 'n1h-style'; s.textContent = css; document.head.appendChild(s); }
      const A = (n, d) => (this.hasAttribute(n) ? this.getAttribute(n) : d);
      if (this.hasAttribute('accent')) { this.style.setProperty('--n1-accent', this.getAttribute('accent')); document.documentElement.style.setProperty('--n1-accent', this.getAttribute('accent')); }
      let menu = DEFAULT_MENU;
      const js = this.querySelector('script[type="application/json"]');
      if (js) { try { menu = JSON.parse(js.textContent); } catch (e) { console.warn('[n1-header] menü JSON okunamadı; varsayılan kullanılıyor', e); } }
      this.menu = menu;
      const id = 'n1h-panel-' + Math.random().toString(36).slice(2, 7);
      this.innerHTML = `<div class="n1h-bar site-container">
  <a class="n1h-logo" href="${esc(A('logo-href', menu.brand && menu.brand.href || '#ust'))}" aria-label="1N Digital Media ana sayfa"><img src="${esc(A('logo', '1n-logo.svg'))}" alt="${esc(A('logo-alt', '1N Digital Media'))}" width="32" height="32"></a>
  <p class="n1h-tag">${esc(A('tagline', 'DIGITAL ADVERTISING AGENCY.'))}</p>
  <div class="n1h-right">
    ${this.hasAttribute('no-cta') ? '' : `<a class="n1h-btn n1h-cta" href="${esc(A('cta-href', '#iletisim'))}"><span class="n1h-dot" aria-hidden="true"></span>${esc(A('cta-text', 'Teklif Al'))}</a>`}
    <button class="n1h-btn n1h-menu" type="button" aria-expanded="false" aria-controls="${id}">
      <span class="n1h-lbl" aria-hidden="true"><span>Menu</span><span>Close</span></span><span class="n1h-sr" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">Menüyü aç</span>
      <span class="n1h-ico" aria-hidden="true"><i></i><i></i></span>
    </button>
  </div>
</div>`;
      const p = this.panel = document.createElement('div');
      p.className = 'n1h-panel'; p.id = id; p.setAttribute('role', 'dialog'); p.setAttribute('aria-label', 'Site menüsü'); p.inert = true;
      
      const items = menu.items || [];
      p.innerHTML = `<nav class="n1h-card n1h-main" style="--i:0;position:relative" aria-label="Ana menü">
  <ul class="n1h-nav">${items.map((it, i) => { const inner = `<span class="n1h-mark" aria-hidden="true"></span><span class="n1h-txt">${esc(it.title)}</span><span class="n1h-more" aria-hidden="true">${esc(it.note || '')}</span>`; const subs = (it.sub || []).length; const li = '<li>';   // v14: bütün satırlar aynı tipografi (İletişim dahil)
        if (it.href && subs) { // v13 hibrit: başlık bağlantı + ayrı alt menü düğmesi
          const lt = `<span class="n1h-mark" aria-hidden="true"></span><span class="n1h-txt">${esc(it.title)}</span>`;
          return `${li}<div class="n1h-row"><a class="n1h-item" href="${esc(it.href)}" data-i="${i}" data-sub="1">${lt}</a><button class="n1h-subtog" type="button" aria-expanded="false" aria-controls="${id}-s${i}" aria-label="${esc(it.title)} alt menüsü" data-i="${i}"><span aria-hidden="true">${esc(it.note || '')}</span><span class="n1h-plus" aria-hidden="true"></span></button></div></li>`; }
        return `${li}${it.href && !subs ? `<a class="n1h-item" href="${esc(it.href)}" data-i="${i}">${inner}</a>` : `<button class="n1h-item" type="button" aria-expanded="false" aria-controls="${id}-s${i}" data-i="${i}">${inner}</button>`}</li>`; }).join('')}</ul>
</nav>
  ${items.map((it, i) => `<div class="n1h-sub" id="${id}-s${i}" role="group" aria-label="${esc(it.title)}"><h3>${esc(it.title)}</h3><ul>${(it.sub || []).map((s) => s.href
        ? `<li><a href="${esc(s.href)}"><span class="n1h-st">${esc(s.text)}</span></a></li>`
        : `<li><span class="n1h-soon" aria-disabled="true">${esc(s.text)}</span></li>`).join('')}</ul></div>`).join('')}
<div class="n1h-card n1h-brandcard" style="--i:1"><a class="n1h-brand" href="${esc(menu.brand.href)}"><span><b>${esc(menu.brand.text)}</b><small>${esc(menu.brand.note || 'Başlangıca dön')}</small></span><span class="n1h-bline" aria-hidden="true"></span></a></div>${menu.a7 && menu.a7.href ? `<div class="n1h-card n1h-a7card" style="--i:2"><a class="n1h-a7" href="${esc(menu.a7.href)}" target="_blank" rel="noopener noreferrer"><span><b>${esc(menu.a7.text)}</b>${menu.a7.note ? `<small>${esc(menu.a7.note)}</small>` : ''}<span class="n1h-sr"> (yeni sekmede açılır)</span></span><span class="n1h-ext"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" aria-hidden="true" focusable="false"><path d="M5 11L11 5M6 5h5v5"/></svg></span></a></div>` : ''}${menu.platforms && (menu.platforms.items || []).length ? `<div class="n1h-card n1h-platcard" style="--i:3" role="group" aria-label="${esc(menu.platforms.title || 'Uygulama ve Platformlar')}"><h3>${esc(menu.platforms.title || 'Uygulama ve Platformlar')}</h3><ul class="n1h-plats">${menu.platforms.items.map((pl) => { const ext = !/^https?:\/\/(www\.)?reklam1n\.com(\/|$)/.test(pl.href) && /^https?:/.test(pl.href); const ico = PLAT_ICONS[String(pl.icon || pl.img || '').split('/').pop()]; return `<li><a class="n1h-plat" href="${esc(pl.href)}"${ext ? ' target="_blank" rel="noopener noreferrer"' : ''} aria-label="${esc(pl.name)}${ext ? ' (yeni sekmede açılır)' : ''}">${ico || `<img alt="" width="160" height="160" decoding="async" data-src="${esc(pl.img)}-160.webp" data-srcset="${esc(pl.img)}-160.webp 160w, ${esc(pl.img)}-320.webp 320w" sizes="32px">`}</a></li>`; }).join('')}</ul></div>` : ''}`;
      document.body.appendChild(p);
      this.btn = this.querySelector('.n1h-menu'); this.sr = this.querySelector('.n1h-sr');
      this.items = [...p.querySelectorAll('.n1h-item')]; this.subs = [...p.querySelectorAll('.n1h-sub')]; this.togs = [...p.querySelectorAll('.n1h-subtog')];
      this.btn.addEventListener('click', () => this.toggle());
      p.addEventListener('click', (e) => {
        const tg = e.target.closest('.n1h-subtog'); if (tg) { const i = +tg.dataset.i; if (this.sub === i && this._subBy !== 'hover') this._openSub(-1); else { this._openSub(i); this._subBy = 'click'; } return; }
        const it = e.target.closest('.n1h-item'); if (it) { if (it.tagName === 'A') { this.close(false); return; } const i = +it.dataset.i; if (this.sub === i && this._subBy !== 'hover') this._openSub(-1); else { this._openSub(i); this._subBy = 'click'; } return; }
        if (e.target.closest('a')) this.close(false);
      });
      // fareyle ana başlık üzerine gelince kısa gecikmeyle alt menü açılır (çaprazdan geçişte titremesin)
      this.items.forEach((it) => it.addEventListener('pointerenter', (e) => { if ((e.pointerType && e.pointerType !== 'mouse') || !N1H_CAN_HOVER()) return; clearTimeout(this._ht); this._ht = setTimeout(() => { const was = this.sub; this._openSub(it.tagName === 'A' && !it.dataset.sub ? -1 : +it.dataset.i); if (this.sub >= 0 && this.sub !== was) this._subBy = 'hover'; }, 90); }));
      this.togs.forEach((tg) => tg.addEventListener('pointerenter', (e) => { if ((e.pointerType && e.pointerType !== 'mouse') || !N1H_CAN_HOVER()) return; clearTimeout(this._ht); this._ht = setTimeout(() => { const was = this.sub; this._openSub(+tg.dataset.i); if (this.sub >= 0 && this.sub !== was) this._subBy = 'hover'; }, 90); }));
      p.querySelector('.n1h-brand').addEventListener('pointerenter', (e) => { if ((e.pointerType && e.pointerType !== 'mouse') || !N1H_CAN_HOVER()) return; clearTimeout(this._ht); this._ht = setTimeout(() => this._openSub(-1), 120); });
      p.addEventListener('keydown', (e) => {
        const it = e.target.closest('.n1h-item') || e.target.closest('.n1h-subtog');
        if (it && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
          if (e.key === 'ArrowLeft' && (it.tagName !== 'A' || it.dataset.sub)) { this._openSub(+it.dataset.i); const s=this.subs[+it.dataset.i]; const f=s && s.querySelector('a'); if(f)f.focus(); } else this._openSub(-1);
          e.preventDefault();
        } else if (e.target.closest('.n1h-sub') && e.key === 'ArrowRight') { const i = this.sub; this._openSub(-1); this._focusRow(i); e.preventDefault(); }
        else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          const list = [...this.items, p.querySelector('.n1h-brand')], k = list.indexOf(document.activeElement);
          if (k >= 0) { list[(k + (e.key === 'ArrowDown' ? 1 : list.length - 1)) % list.length].focus(); e.preventDefault(); }
        }
      });
      this._doc = (e) => { if (this.open && !p.contains(e.target) && !this.btn.contains(e.target)) this.close(false); };
      this._key = (e) => {
        if (e.key !== 'Escape' || !this.open) return; e.preventDefault();
        if (this.sub >= 0) { const i = this.sub; this._openSub(-1); this._focusRow(i); } else this.close(true);
      };
      document.addEventListener('pointerdown', this._doc); document.addEventListener('keydown', this._key);
      this._scroll = () => { if (!this._raf) this._raf = requestAnimationFrame(() => { this._raf = 0; this._update(); }); };
      addEventListener('scroll', this._scroll, { passive: true }); addEventListener('resize', this._scroll);
      this._ps = (e) => { if (e.persisted) this._resetSub(); }; addEventListener('pageshow', this._ps);
      this._targets = items.map((it) => (it.match && it.match.startsWith('#') ? document.getElementById(it.match.slice(1)) : null));
      this.sub = -1; this._markCurrent(); this._update();
    }
    _markCurrent() { // v14: bulunulan sayfanın satırı (ve alt bağlantısı) işaretlenir; ana sayfada kaydırma tabanlı işaret (match) korunur
      const norm = (h) => { try { const u = new URL(h, location.href); return u.origin === location.origin ? (u.pathname.replace(/\/+$/, '') || '/') : null; } catch (e) { return null; } };
      const here = norm(location.href); if (!here || here === '/') return;
      this._pathCur = -1;
      (this.menu.items || []).forEach((it, i) => {
        let hit = it.href && norm(it.href) === here;
        (it.sub || []).forEach((sb) => { if (sb.href && norm(sb.href) === here) hit = true; });
        if (hit) this._pathCur = i;
      });
      this.panel.querySelectorAll('a[href]').forEach((a) => { if (norm(a.getAttribute('href')) === here && !a.target) a.setAttribute('aria-current', 'page'); });
    }
    _loadLogos() { if (this._logos) return; this._logos = true; this.panel.querySelectorAll('img[data-src]').forEach((im) => { im.srcset = im.dataset.srcset; im.src = im.dataset.src; im.removeAttribute('data-src'); im.removeAttribute('data-srcset'); }); }
    disconnectedCallback() {
      this._on = false; removeEventListener('scroll', this._scroll); removeEventListener('resize', this._scroll); removeEventListener('pageshow', this._ps);
      document.removeEventListener('pointerdown', this._doc); document.removeEventListener('keydown', this._key); this.panel && this.panel.remove();
    }
    toggle() { this.open ? this.close(true) : this.show(); }
    show() {
      this._resetSub(); this._loadLogos();
      this.open = true; this.dataset.open = ''; this.panel.dataset.open = ''; this.panel.inert = false;
      this.btn.setAttribute('aria-expanded', 'true'); this.sr.textContent = 'Menüyü kapat';
      const first = this.panel.querySelector('.n1h-item'); requestAnimationFrame(() => first && first.focus({ preventScroll: true }));
    }
    close(returnFocus) {
      this._openSub(-1);
      this.open = false; delete this.dataset.open; delete this.panel.dataset.open; this.panel.inert = true;
      this.btn.setAttribute('aria-expanded', 'false'); this.sr.textContent = 'Menüyü aç';
      if (returnFocus) this.btn.focus({ preventScroll: true });
    }
    _openSub(i) {
      clearTimeout(this._ht);
      if (i >= 0 && !(this.menu.items[i].sub || []).length) i = -1;
      if (i === this.sub) return;
      if (i < 0) this._subBy = null;
      this.subs.forEach((s, k) => { if (k === i) s.dataset.open = ''; else delete s.dataset.open; });
      this.items.forEach((it, k) => { if (it.tagName === 'A') { if (k === i) it.dataset.exp = ''; else delete it.dataset.exp; } else it.setAttribute('aria-expanded', String(k === i)); });
      this.togs.forEach((tg) => tg.setAttribute('aria-expanded', String(+tg.dataset.i === i)));
      if (i >= 0) { // alt kartı ilgili satırın hizasına getir (ekran içinde kalacak şekilde)
        const main = this.panel.querySelector('.n1h-main'), row = this.items[i], s = this.subs[i];
        const top = row.getBoundingClientRect().top - this.panel.getBoundingClientRect().top - 10, maxTop = innerHeight - main.getBoundingClientRect().top - s.offsetHeight - 16;
        s.style.top = Math.max(0, Math.min(top, maxTop)) + 'px';
      }
      this.sub = i;
    }
    _resetSub() { // dış kapanıştan (V1.3 menü kapanışı, BFCache) sonra iç durumu DOM ile eşitle
      clearTimeout(this._ht); this.sub = -1; this._subBy = null;
      this.subs.forEach((s) => delete s.dataset.open);
      this.items.forEach((it) => { if (it.tagName === 'A') delete it.dataset.exp; else it.setAttribute('aria-expanded', 'false'); });
      this.togs.forEach((tg) => tg.setAttribute('aria-expanded', 'false'));
    }
    _focusRow(i) { const tg = this.togs.find((t) => +t.dataset.i === i); const el = tg || this.items[i]; el && el.focus(); }
    _update() {
      if (scrollY > 24) this.dataset.scrolled = ''; else delete this.dataset.scrolled;
      const y = innerHeight * 0.33; let cur = -1;
      this._targets.forEach((el, i) => { if (el) { const r = el.getBoundingClientRect(); if (r.top <= y && r.bottom > y) cur = i; } });
      if (cur < 0 && this._pathCur >= 0) cur = this._pathCur;
      this.items && this.items.forEach((it, i) => { if (i === cur) it.dataset.current = ''; else delete it.dataset.current; });
    }
  }
  customElements.define(TAG, N1Header);
})();
