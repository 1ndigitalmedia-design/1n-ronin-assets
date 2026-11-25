/* 1N Intelligence V2.2 | Wix Custom Element | public presentation only */
(function(){'use strict';const TAG='n1-intelligence';if(customElements.get(TAG))return;
const STYLE="/* =====================================================================\n   1N INTELLIGENCE V2.1 — Tasarım tokenları (2.1.0)\n   Light First · Dual Theme · Premium Glass\n   - Varsayılan tema AÇIK'tır. İşletim sistemi tercihi (prefers-color-scheme) KULLANILMAZ.\n   - Tema yalnızca <.n1-shell data-theme=\"dark\"> ile değişir; bu öznitelik merkezi tema\n     protokolüyle (Velo → bütün embed'ler) ayarlanır. Bileşenler kendi temasını seçmez.\n   - Bütün bileşenler aynı token adlarını kullanır; iki tema iki ayrı uygulama değildir.\n   ===================================================================== */\n.n1-shell,\n.n1-shell[data-theme=\"light\"] {\n  color-scheme: light;\n\n  /* Zemin ve yüzeyler */\n  --n1i-bg: #F3F5F7;                         /* ana arka plan */\n  --n1i-bg-2: #F8F9FA;                       /* ikincil arka plan */\n  --n1i-surface: #FFFFFF;                    /* ana kart */\n  --n1i-surface-2: #F8F9FA;                  /* kart içi alan, tablo başlığı */\n  --n1i-surface-3: #EEF1EF;                  /* gömük alan, segment izi */\n  --n1i-glass: rgba(255, 255, 255, 0.58);    /* cam yüzey (arkası görünür) */\n  --n1i-glass-strong: rgba(255, 255, 255, 0.80); /* açılır menü, tooltip: okunurluk önce */\n  --n1i-glass-fallback: #FFFFFF;\n  --n1i-glass-border: rgba(255, 255, 255, 0.85); /* camın iç kenar ışığı */\n  --n1i-glass-edge: rgba(22, 26, 25, 0.08);  /* camın dış ince çizgisi */\n  --n1i-glass-highlight: rgba(255, 255, 255, 0.95);\n  --n1i-glass-sheen: linear-gradient(180deg, rgba(255, 255, 255, 0.70) 0%, rgba(255, 255, 255, 0) 46%);\n  --n1i-glass-tint: rgba(243, 245, 247, 0.35); /* açık zeminde camı hafifçe soğutur */\n  --n1i-wash-1: rgba(162, 255, 0, 0.16);     /* özet ve navigasyon arkasındaki yumuşak ışık */\n  --n1i-wash-2: rgba(120, 180, 230, 0.14);\n  --n1i-overlay: rgba(22, 26, 25, 0.28);\n\n  /* Metin */\n  --n1i-text: #161A19;                       /* 17.6:1 beyaz üzerinde */\n  --n1i-text-2: #3A423E;                     /* 10.4:1 */\n  --n1i-muted: #606A65;                      /* 5.6:1 (AA) */\n  --n1i-faint: #8A938E;                      /* yalnızca metin dışı (3.2:1) */\n  --n1i-on-ink: #FFFFFF;                     /* koyu dolgu üzerindeki metin */\n\n  /* Çizgi */\n  --n1i-line: #E1E6E3;\n  --n1i-line-soft: #EDF0EE;\n  --n1i-line-strong: #C9D1CC;\n  --n1i-grid: rgba(22, 26, 25, 0.06);\n\n  /* Kurumsal vurgu: #A2FF00 yalnızca dolgu/yüzey olarak; açık zeminde metin rengi DEĞİL */\n  --n1i-accent: #A2FF00;\n  --n1i-accent-ink: #161A19;                 /* lime üzerindeki metin (14.1:1) */\n  --n1i-accent-text: #4B7A14;                /* açık zeminde okunur yeşil (5.1:1) */\n  --n1i-accent-soft: rgba(162, 255, 0, 0.18);\n  --n1i-accent-ring: #4B7A14;\n  --n1i-ink: #161A19;                        /* seçili pill, birincil düğme */\n  --n1i-ink-hover: #2A302E;\n  /* V2.1 rafine vurgu kartı: tam lime dolgu yerine lime ışıklı yüzey + lime işaret */\n  --n1i-accent-surface: linear-gradient(150deg, rgba(162, 255, 0, 0.30) 0%, rgba(162, 255, 0, 0.12) 55%, rgba(255, 255, 255, 0.9) 100%), #FFFFFF;\n  --n1i-accent-edge: rgba(87, 141, 25, 0.28);\n  --n1i-accent-value: #161A19;\n  --n1i-bubble-user: #161A19;  --n1i-bubble-user-text: #FFFFFF;\n\n  /* Durumlar (her zaman ikon + metin ile) */\n  --n1i-pos: #2F7D32;  --n1i-pos-bg: #E7F5E8;\n  --n1i-neg: #B3261E;  --n1i-neg-bg: #FCEAE8;\n  --n1i-warn: #8A5A00; --n1i-warn-bg: #FFF3D6;\n  --n1i-info: #1F5F99; --n1i-info-bg: #E4F0FB;\n  --n1i-neutral-bg: #EEF1EF;\n\n  /* İkon yüzeyleri (pastel, modül kimliği) — metin rengi ile birlikte 5:1 üzeri */\n  --n1i-tile-lime: #E6F7D4;  --n1i-tile-lime-ink: #3F6E0F;\n  --n1i-tile-sky: #E3EEFA;   --n1i-tile-sky-ink: #2D5F92;\n  --n1i-tile-sand: #FBF0DC;  --n1i-tile-sand-ink: #8A5A12;\n  --n1i-tile-lilac: #EEE9FA; --n1i-tile-lilac-ink: #5B47A0;\n  --n1i-tile-rose: #FBE7EC;  --n1i-tile-rose-ink: #A23A55;\n  --n1i-tile-teal: #DFF3EF;  --n1i-tile-teal-ink: #1F6E64;\n\n  /* Grafik (beyaz zeminde çizgi ≥ 3:1) */\n  --n1i-c1: #578D19;        /* birincil seri çizgisi */\n  --n1i-c1-fill: rgba(162, 255, 0, 0.22);\n  --n1i-c2: #3E6C9E;\n  --n1i-c3: #9A6A12;\n  --n1i-c4: #8A6FC7;\n  --n1i-c5: #1F7F74;\n  --n1i-c6: #C2533F;\n  --n1i-bar: #D3DCD6;       /* sakin çubuk dolgusu */\n  --n1i-bar-edge: #7E8A83;  /* çubuk üst kenarı (3:1) */\n  --n1i-bar-hi: #A2FF00;    /* öne çıkan çubuk */\n  --n1i-bar-hi-edge: #4B7A14;\n  --n1i-bar-partial: rgba(162, 255, 0, 0.35);\n  --n1i-tooltip-bg: rgba(255, 255, 255, 0.86);   /* cam tooltip; arkası bulanık */\n  --n1i-tooltip-solid: #FFFFFF;                  /* backdrop-filter yoksa */\n  --n1i-tooltip-text: #161A19;\n  --n1i-tooltip-muted: #3A423E;                  /* 10.4:1 */\n\n  /* Gölge */\n  --n1i-shadow-1: 0 1px 2px rgba(22, 26, 25, 0.04), 0 8px 24px -6px rgba(22, 26, 25, 0.06);\n  --n1i-shadow-2: 0 2px 6px rgba(22, 26, 25, 0.05), 0 22px 48px -12px rgba(22, 26, 25, 0.16);\n  --n1i-shadow-glass: inset 0 1px 0 var(--n1i-glass-highlight), inset 0 0 0 1px rgba(255, 255, 255, 0.35), 0 1px 2px rgba(22, 26, 25, 0.05), 0 14px 36px -10px rgba(22, 26, 25, 0.14);\n}\n\n.n1-shell[data-theme=\"dark\"] {\n  color-scheme: dark;\n  --n1i-bg: #080A09;\n  --n1i-bg-2: #0D100E;\n  --n1i-surface: #141716;\n  --n1i-surface-2: #1B211D;\n  --n1i-surface-3: #222923;\n  --n1i-glass: rgba(27, 33, 29, 0.62);\n  --n1i-glass-strong: rgba(24, 29, 26, 0.88);\n  --n1i-glass-fallback: #171B18;\n  --n1i-glass-border: rgba(238, 237, 232, 0.10);\n  --n1i-glass-edge: rgba(0, 0, 0, 0.45);\n  --n1i-glass-highlight: rgba(238, 237, 232, 0.08);\n  --n1i-glass-sheen: linear-gradient(180deg, rgba(238, 237, 232, 0.06) 0%, rgba(238, 237, 232, 0) 40%);\n  --n1i-glass-tint: rgba(8, 10, 9, 0.20);\n  --n1i-wash-1: rgba(162, 255, 0, 0.07);\n  --n1i-wash-2: rgba(120, 180, 230, 0.06);\n  --n1i-overlay: rgba(0, 0, 0, 0.5);\n\n  --n1i-text: #EEEDE8;\n  --n1i-text-2: #CFD2CD;\n  --n1i-muted: #9EA39E;\n  --n1i-faint: #5E6660;\n  --n1i-on-ink: #0B1000;\n\n  --n1i-line: #303830;\n  --n1i-line-soft: #232A24;\n  --n1i-line-strong: #3E473F;\n  --n1i-grid: rgba(238, 237, 232, 0.07);\n\n  --n1i-accent: #A2FF00;\n  --n1i-accent-ink: #0B1000;\n  --n1i-accent-text: #A2FF00;\n  --n1i-accent-soft: rgba(162, 255, 0, 0.12);\n  --n1i-accent-ring: #A2FF00;\n  --n1i-ink: #A2FF00;\n  --n1i-ink-hover: #B4FF33;\n  --n1i-accent-surface: linear-gradient(150deg, rgba(162, 255, 0, 0.16) 0%, rgba(162, 255, 0, 0.05) 60%, rgba(20, 23, 22, 0.9) 100%), #141716;\n  --n1i-accent-edge: rgba(162, 255, 0, 0.26);\n  --n1i-accent-value: #A2FF00;\n  --n1i-bubble-user: #2A322C;  --n1i-bubble-user-text: #EEEDE8;   /* koyu temada neon dolgu yerine sakin yüzey */\n\n  --n1i-pos: #6FD08C;  --n1i-pos-bg: rgba(111, 208, 140, 0.13);\n  --n1i-neg: #FF8A7A;  --n1i-neg-bg: rgba(255, 138, 122, 0.13);\n  --n1i-warn: #F2B84B; --n1i-warn-bg: rgba(242, 184, 75, 0.13);\n  --n1i-info: #8EC3EA; --n1i-info-bg: rgba(142, 195, 234, 0.13);\n  --n1i-neutral-bg: rgba(238, 237, 232, 0.07);\n\n  --n1i-tile-lime: rgba(162, 255, 0, 0.12);   --n1i-tile-lime-ink: #C8F27A;\n  --n1i-tile-sky: rgba(142, 195, 234, 0.14);  --n1i-tile-sky-ink: #A9D2F0;\n  --n1i-tile-sand: rgba(217, 195, 138, 0.14); --n1i-tile-sand-ink: #E3CF9C;\n  --n1i-tile-lilac: rgba(183, 166, 224, 0.15); --n1i-tile-lilac-ink: #C9BCEB;\n  --n1i-tile-rose: rgba(227, 166, 160, 0.15); --n1i-tile-rose-ink: #EDBDB8;\n  --n1i-tile-teal: rgba(127, 211, 196, 0.14); --n1i-tile-teal-ink: #9FE0D4;\n\n  --n1i-c1: #A2FF00;\n  --n1i-c1-fill: rgba(162, 255, 0, 0.10);\n  --n1i-c2: #8EC3EA;\n  --n1i-c3: #D9C38A;\n  --n1i-c4: #B7A6E0;\n  --n1i-c5: #7FD3C4;\n  --n1i-c6: #E3A6A0;\n  --n1i-bar: #3A443D;\n  --n1i-bar-edge: #6B766E;\n  --n1i-bar-hi: #A2FF00;\n  --n1i-bar-hi-edge: #A2FF00;\n  --n1i-bar-partial: rgba(162, 255, 0, 0.30);\n  --n1i-tooltip-bg: rgba(27, 33, 29, 0.86);\n  --n1i-tooltip-solid: #1B211D;\n  --n1i-tooltip-text: #EEEDE8;\n  --n1i-tooltip-muted: #CFD2CD;\n\n  --n1i-shadow-1: 0 1px 0 rgba(238, 237, 232, 0.03) inset, 0 10px 28px rgba(0, 0, 0, 0.35);\n  --n1i-shadow-2: 0 1px 0 rgba(238, 237, 232, 0.05) inset, 0 20px 48px rgba(0, 0, 0, 0.5);\n  --n1i-shadow-glass: inset 0 1px 0 var(--n1i-glass-highlight), 0 1px 2px rgba(0, 0, 0, 0.4), 0 18px 40px -12px rgba(0, 0, 0, 0.6);\n}\n\n/* Temadan bağımsız tokenlar */\n.n1-shell {\n  --n1i-font: 'Barlow', 'Helvetica Neue', Arial, sans-serif;\n  --n1i-font-display: 'Barlow Condensed', 'Barlow', 'Arial Narrow', Arial, sans-serif;\n  /* V2.1: küçük metinler büyütüldü (eksen, kaynak, tarih, tablo başlığı ≥ 12.5 px) */\n  --n1i-fs-xs: 12.5px; --n1i-fs-sm: 13.5px; --n1i-fs-base: 15px; --n1i-fs-md: 16.5px;\n  --n1i-fs-lg: 20px; --n1i-fs-title: 25px;\n  --n1i-fs-kpi: 32px; --n1i-fs-kpi-lg: 44px; --n1i-fs-hero: 60px;\n  --n1i-fs-axis: 12.5px;\n  --n1i-lh-tight: 1.08; --n1i-lh: 1.5;\n  --n1i-fw-regular: 400; --n1i-fw-medium: 500; --n1i-fw-semibold: 600;\n\n  --n1i-s1: 4px; --n1i-s2: 8px; --n1i-s3: 12px; --n1i-s4: 16px; --n1i-s5: 20px;\n  --n1i-s6: 24px; --n1i-s7: 28px; --n1i-s8: 32px; --n1i-s10: 40px; --n1i-s12: 48px; --n1i-s16: 64px;\n\n  --n1i-r-xs: 6px; --n1i-r-sm: 10px; --n1i-r-md: 14px; --n1i-r-lg: 20px; --n1i-r-xl: 26px; --n1i-r-pill: 999px;\n  --n1i-blur: 20px; --n1i-blur-strong: 28px;\n\n  --n1i-dur-fast: 140ms; --n1i-dur: 220ms; --n1i-dur-theme: 280ms; --n1i-dur-slow: 360ms;\n  --n1i-ease: cubic-bezier(0.22, 0.8, 0.24, 1);\n\n  --n1i-bp-sm: 480px; --n1i-bp-md: 720px; --n1i-bp-lg: 1024px; --n1i-bp-xl: 1440px;\n  --n1i-max: 1360px;\n\n  --n1i-z-base: 0; --n1i-z-sticky: 10; --n1i-z-dropdown: 30; --n1i-z-tooltip: 40; --n1i-z-overlay: 50;\n}\n\n/* V1 uyumluluk adları (modüllerde kalan eski adlar için; yeni kodda kullanmayın) */\n.n1-shell {\n  --n1i-border: 1px solid var(--n1i-line);\n  --n1i-border-soft: 1px solid var(--n1i-line-soft);\n  --n1i-panel: var(--n1i-surface);\n  --n1i-panel-raised: var(--n1i-surface-2);\n  --n1i-panel-sunken: var(--n1i-surface-2);\n  --n1i-fs-2xl: var(--n1i-fs-kpi-lg);\n}\n\n/* =====================================================================\n   1N INTELLIGENCE V2.1 — Ortak bileşen stilleri (2.1.0)\n   Her HTML Embed (iFrame) yükler. @media sorguları iFrame genişliğine göre\n   çalışır (Wix içindeki gerçek bileşen genişliği).\n   Tema: renkler yalnızca n1i-tokens.css değişkenlerinden gelir.\n   ===================================================================== */\n*, *::before, *::after { box-sizing: border-box; }\n[hidden] { display: none !important; }\n.n1-shell { -webkit-text-size-adjust: 100%; text-size-adjust: 100%; background: var(--n1i-bg); }\n.n1-shell, .n1-body { margin: 0; padding: 0; }\n.n1-body {\n  background: var(--n1i-bg);\n  color: var(--n1i-text);\n  font-family: var(--n1i-font);\n  font-size: var(--n1i-fs-base);\n  line-height: var(--n1i-lh);\n  -webkit-font-smoothing: antialiased;\n  overflow-x: hidden;\n  -webkit-tap-highlight-color: transparent;\n}\nbutton, input, select, textarea { font: inherit; color: inherit; }\nbutton, a, [role=\"button\"] { touch-action: manipulation; }\nbutton { cursor: pointer; }\nimg, svg { display: block; }\n.n1i-sr { position: absolute !important; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }\n.n1i-num { font-variant-numeric: tabular-nums lining-nums; font-feature-settings: \"tnum\" 1, \"lnum\" 1; }\n:focus-visible { outline: 2px solid var(--n1i-accent-ring); outline-offset: 2px; border-radius: var(--n1i-r-xs); }\n\n/* ---------- Tema bekleme ve geçiş ----------\n   Tema bilgisi gelene kadar (en fazla ~450 ms) içerik gizli kalır: açık↔koyu\n   parlaması olmaz. Geçişte yalnızca renk özellikleri animasyonludur. */\n.n1-shell.n1i-theme-wait .n1-body { opacity: 0; }\n.n1-shell.n1i-theme-wait { background: transparent; }\n.n1-shell.n1i-theme-anim .n1-body, .n1-shell.n1i-theme-anim .n1-body * {\n  transition-property: background-color, border-color, color, fill, stroke, box-shadow, outline-color !important;\n  transition-duration: var(--n1i-dur-theme) !important;\n  transition-timing-function: var(--n1i-ease) !important;\n}\n.n1-body { transition: opacity 160ms var(--n1i-ease); }\n\n/* ---------- Kök ve bölüm ---------- */\n.n1i-root { padding: var(--n1i-s6) var(--n1i-s4) var(--n1i-s8); max-width: var(--n1i-max); margin: 0 auto; }\n@media (min-width: 720px) { .n1i-root { padding: var(--n1i-s8) var(--n1i-s8) var(--n1i-s10); } }\n@media (min-width: 1280px) { .n1i-root { padding-left: var(--n1i-s10); padding-right: var(--n1i-s10); } }\n.n1i-module { position: relative; }\n\n.n1i-head { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--n1i-s4) var(--n1i-s5); margin-bottom: var(--n1i-s5); }\n.n1i-head__title { display: flex; align-items: center; gap: var(--n1i-s4); min-width: 0; }\n.n1i-head__icon { width: 44px; height: 44px; border-radius: 14px; display: grid; place-items: center; flex: none; background: var(--n1i-tile, var(--n1i-tile-lime)); color: var(--n1i-tile-ink, var(--n1i-tile-lime-ink)); }\n.n1i-head__icon svg { width: 20px; height: 20px; }\n.n1i-h1 { font-family: var(--n1i-font); font-weight: var(--n1i-fw-semibold); font-size: var(--n1i-fs-title); line-height: 1.15; letter-spacing: -0.01em; margin: 0; text-wrap: balance; }\n.n1i-h2 { font-weight: var(--n1i-fw-semibold); font-size: var(--n1i-fs-md); line-height: 1.3; margin: 0; letter-spacing: -0.005em; }\n.n1i-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 10px; margin-top: 5px; color: var(--n1i-muted); font-size: var(--n1i-fs-sm); font-weight: var(--n1i-fw-medium); }\n.n1i-meta__sep { width: 3px; height: 3px; border-radius: 50%; background: var(--n1i-faint); }\n.n1i-head__tools { display: flex; flex-wrap: wrap; align-items: center; gap: var(--n1i-s2); }\n@media (max-width: 479px) { .n1i-head__icon { width: 40px; height: 40px; border-radius: 12px; } .n1i-h1 { font-size: 21px; } .n1i-head__tools { width: 100%; } }\n\n/* Modül tonları (ikon yüzeyi) */\n[data-tone=\"lime\"] { --n1i-tile: var(--n1i-tile-lime); --n1i-tile-ink: var(--n1i-tile-lime-ink); }\n[data-tone=\"sky\"] { --n1i-tile: var(--n1i-tile-sky); --n1i-tile-ink: var(--n1i-tile-sky-ink); }\n[data-tone=\"sand\"] { --n1i-tile: var(--n1i-tile-sand); --n1i-tile-ink: var(--n1i-tile-sand-ink); }\n[data-tone=\"lilac\"] { --n1i-tile: var(--n1i-tile-lilac); --n1i-tile-ink: var(--n1i-tile-lilac-ink); }\n[data-tone=\"rose\"] { --n1i-tile: var(--n1i-tile-rose); --n1i-tile-ink: var(--n1i-tile-rose-ink); }\n[data-tone=\"teal\"] { --n1i-tile: var(--n1i-tile-teal); --n1i-tile-ink: var(--n1i-tile-teal-ink); }\n\n/* ---------- Kart ---------- */\n.n1i-panel, .n1i-card { min-width: 0; background: var(--n1i-surface); border: 1px solid var(--n1i-line-soft); border-radius: var(--n1i-r-lg); padding: var(--n1i-s6); box-shadow: var(--n1i-shadow-1); }\n@media (min-width: 1024px) { .n1i-panel, .n1i-card { padding: var(--n1i-s7); } }\n@media (max-width: 479px) { .n1i-panel, .n1i-card { padding: var(--n1i-s5); border-radius: 18px; } }\n.n1i-panel__head { display: flex; align-items: flex-start; justify-content: space-between; flex-wrap: wrap; gap: var(--n1i-s3); margin-bottom: var(--n1i-s5); }\n.n1i-panel__sub { color: var(--n1i-muted); font-size: var(--n1i-fs-sm); margin-top: 2px; }\n\n/* ---------- Izgara ---------- */\n.n1i-grid { display: grid; gap: var(--n1i-s4); grid-template-columns: repeat(12, minmax(0, 1fr)); margin-top: var(--n1i-s4); }\n@media (min-width: 1024px) { .n1i-grid { gap: var(--n1i-s5); margin-top: var(--n1i-s5); } }\n.n1i-col-12 { grid-column: span 12; } .n1i-col-8 { grid-column: span 8; } .n1i-col-7 { grid-column: span 7; }\n.n1i-col-6 { grid-column: span 6; } .n1i-col-5 { grid-column: span 5; } .n1i-col-4 { grid-column: span 4; }\n@media (max-width: 1023px) { .n1i-col-8, .n1i-col-7, .n1i-col-5, .n1i-col-4 { grid-column: span 12; } }\n@media (max-width: 719px) { .n1i-col-6 { grid-column: span 12; } }\n\n/* ---------- KPI ---------- */\n.n1i-kpis { display: grid; gap: var(--n1i-s4); grid-template-columns: repeat(var(--n1i-kpi-cols, var(--n1i-kpi-desktop, 4)), minmax(0, 1fr)); }\n@media (max-width: 1023px) { .n1i-kpis { --n1i-kpi-cols: 3; } }\n@media (min-width: 480px) and (max-width: 1023px) { .n1i-kpis:has(> .n1i-kpi:nth-child(4):last-child) { --n1i-kpi-cols: 2; } }\n@media (max-width: 719px) { .n1i-kpis { --n1i-kpi-cols: 2; } }\n@media (max-width: 359px) { .n1i-kpis { --n1i-kpi-cols: 1; } }\n.n1i-kpi { position: relative; min-width: 0; padding: var(--n1i-s5) var(--n1i-s6); border-radius: var(--n1i-r-lg); background: var(--n1i-surface); border: 1px solid var(--n1i-line-soft); box-shadow: var(--n1i-shadow-1); display: flex; flex-direction: column; gap: 8px; }\n.n1i-kpi__top { display: flex; align-items: center; justify-content: space-between; gap: 6px; min-height: 28px; }\n.n1i-kpi__label { color: var(--n1i-text-2); font-size: var(--n1i-fs-sm); font-weight: var(--n1i-fw-semibold); line-height: 1.3; letter-spacing: -0.003em; }\n.n1i-kpi__value { font-size: var(--n1i-fs-kpi); font-weight: var(--n1i-fw-semibold); line-height: var(--n1i-lh-tight); letter-spacing: -0.025em; overflow-wrap: anywhere; max-width: 100%; }\n/* Kısa biçimi olan sayılar tek satırda kalır; sığmazsa fitNumbers önce bir kademe küçültür, sonra kısa biçime geçer */\n.n1i-kpi__value[data-full] { white-space: nowrap; overflow: hidden; }\n.n1i-kpi__value small { font-size: max(0.5em, 12.5px); font-weight: var(--n1i-fw-medium); color: var(--n1i-muted); margin-left: 4px; letter-spacing: 0; }\n.n1i-kpi__foot { color: var(--n1i-muted); font-size: var(--n1i-fs-xs); line-height: 1.45; font-weight: var(--n1i-fw-medium); margin-top: auto; padding-top: 2px; display: flex; flex-wrap: wrap; align-items: center; gap: 4px 6px; }\n.n1i-kpi__foot b { color: var(--n1i-text-2); font-weight: var(--n1i-fw-semibold); }\n.n1i-kpi--na .n1i-kpi__value { color: var(--n1i-muted); }\n.n1i-kpi--err { border-color: var(--n1i-neg-bg); box-shadow: inset 0 0 0 1px var(--n1i-neg-bg), var(--n1i-shadow-1); }\n.n1i-kpi--lg .n1i-kpi__value { font-size: var(--n1i-fs-kpi-lg); }\n@media (max-width: 479px) { .n1i-kpi { padding: var(--n1i-s4); } .n1i-kpi__value { font-size: 24px; } .n1i-kpi--lg .n1i-kpi__value { font-size: 34px; } }\n\n/* Şerit: birden çok metrik tek kartta, aralarında ince ayraç */\n.n1i-kpis--strip { gap: 0; background: var(--n1i-surface); border: 1px solid var(--n1i-line-soft); border-radius: var(--n1i-r-lg); box-shadow: var(--n1i-shadow-1); overflow: hidden; }\n.n1i-kpis--strip > .n1i-kpi { background: transparent; border: 0; border-radius: 0; box-shadow: none; padding: var(--n1i-s6) var(--n1i-s6); }\n.n1i-kpis--strip > .n1i-kpi + .n1i-kpi { box-shadow: inset 1px 0 0 var(--n1i-line); }\n.n1i-kpis--strip > .n1i-kpi:first-child .n1i-kpi__value { font-size: var(--n1i-fs-kpi-lg); }\n@media (max-width: 1023px) {\n  .n1i-kpis--strip > .n1i-kpi { box-shadow: inset 0 -1px 0 var(--n1i-line), inset 1px 0 0 var(--n1i-line) !important; }\n}\n@media (max-width: 479px) { .n1i-kpis--strip > .n1i-kpi { padding: var(--n1i-s4); } .n1i-kpis--strip > .n1i-kpi:first-child .n1i-kpi__value { font-size: 30px; } }\n\n/* Vurgu kartı (sayfada tek). V2.1: tam lime dolgu yerine lime ışıklı yüzey, lime kenar çizgisi ve\n   değer başında lime işaret. Kurumsal renk korunur, görsel ağırlık azalır. Metin her temada ≥ 4.5:1. */\n.n1i-kpi--accent { background: var(--n1i-accent-surface); border-color: var(--n1i-accent-edge); color: var(--n1i-text); box-shadow: inset 0 1px 0 var(--n1i-glass-highlight), var(--n1i-shadow-1); }\n.n1i-kpi--accent .n1i-kpi__value { color: var(--n1i-accent-value); }\n.n1i-kpi--accent .n1i-kpi__label::before { content: \"\"; display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: var(--n1i-accent); box-shadow: 0 0 0 3px var(--n1i-accent-soft); margin-right: 8px; vertical-align: 1px; }\n\n/* ---------- Etiket / durum çipleri ---------- */\n.n1i-chip { display: inline-flex; align-items: center; gap: 6px; min-height: 26px; padding: 0 10px; border-radius: var(--n1i-r-pill); font-size: var(--n1i-fs-xs); font-weight: var(--n1i-fw-semibold); background: var(--n1i-neutral-bg); color: var(--n1i-text-2); white-space: nowrap; }\n.n1i-chip svg { width: 13px; height: 13px; flex: none; }\n.n1i-chip--pos { background: var(--n1i-pos-bg); color: var(--n1i-pos); }\n.n1i-chip--neg { background: var(--n1i-neg-bg); color: var(--n1i-neg); }\n.n1i-chip--warn { background: var(--n1i-warn-bg); color: var(--n1i-warn); }\n.n1i-chip--info { background: var(--n1i-info-bg); color: var(--n1i-info); }\n.n1i-chip--accent { background: var(--n1i-accent-soft); color: var(--n1i-accent-text); }\n.n1i-chip--demo { background: var(--n1i-warn-bg); color: var(--n1i-warn); border: 1px dashed currentColor; letter-spacing: 0.06em; }\n\n/* ---------- Segment (tarih aralığı, metrik) — kayan gösterge ---------- */\n.n1i-seg { position: relative; display: inline-flex; padding: 4px; gap: 2px; border-radius: var(--n1i-r-pill); background: var(--n1i-surface); border: 1px solid var(--n1i-line); box-shadow: var(--n1i-shadow-1); max-width: 100%; isolation: isolate; }\n@supports ((-webkit-backdrop-filter: blur(1px)) or (backdrop-filter: blur(1px))) { .n1i-seg { background: var(--n1i-glass-sheen), var(--n1i-glass); border-color: var(--n1i-glass-edge); box-shadow: var(--n1i-shadow-glass); -webkit-backdrop-filter: blur(var(--n1i-blur)) saturate(160%); backdrop-filter: blur(var(--n1i-blur)) saturate(160%); } }\n.n1-shell.n1i-no-glass .n1i-seg { background: var(--n1i-surface); border-color: var(--n1i-line); box-shadow: var(--n1i-shadow-1); -webkit-backdrop-filter: none; backdrop-filter: none; }\n.n1i-seg__ind { position: absolute; z-index: -1; top: 4px; bottom: 4px; left: 4px; width: 0; border-radius: var(--n1i-r-pill); background: var(--n1i-ink); opacity: 0; box-shadow: 0 1px 2px rgba(0,0,0,.12), 0 4px 10px -2px rgba(0,0,0,.18); }\n.n1i-seg__btn { appearance: none; border: 0; background: transparent; color: var(--n1i-text-2); min-height: 38px; padding: 0 16px; border-radius: var(--n1i-r-pill); font-size: var(--n1i-fs-sm); font-weight: var(--n1i-fw-semibold); white-space: nowrap; transition: color var(--n1i-dur-fast) var(--n1i-ease), background-color var(--n1i-dur-fast) var(--n1i-ease); }\n.n1i-seg__btn:hover { color: var(--n1i-text); }\n.n1i-seg__btn[aria-pressed=\"true\"] { color: var(--n1i-on-ink); background: var(--n1i-ink); }\n.n1i-seg.has-ind .n1i-seg__btn[aria-pressed=\"true\"] { background: transparent; }\n.n1i-seg.has-ind .n1i-seg__ind { opacity: 1; }\n.n1i-seg--sm .n1i-seg__btn { min-height: 32px; padding: 0 12px; font-size: var(--n1i-fs-xs); }\n@media (max-width: 479px) { .n1i-seg { width: 100%; } .n1i-seg__btn { flex: 1; padding: 0 8px; min-height: 40px; } }\n\n/* ---------- Düğmeler ---------- */\n.n1i-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 42px; padding: 0 18px; border-radius: var(--n1i-r-pill); border: 1px solid var(--n1i-line); background: var(--n1i-surface); color: var(--n1i-text); font-size: var(--n1i-fs-sm); font-weight: var(--n1i-fw-semibold); text-decoration: none; transition: border-color var(--n1i-dur-fast) var(--n1i-ease), background-color var(--n1i-dur-fast) var(--n1i-ease), transform var(--n1i-dur-fast) var(--n1i-ease); }\n.n1i-btn:hover { border-color: var(--n1i-line-strong); background: var(--n1i-surface-2); }\n.n1i-btn:active { transform: scale(0.98); }\n.n1i-btn svg { width: 16px; height: 16px; flex: none; }\n.n1i-btn--primary { background: var(--n1i-ink); color: var(--n1i-on-ink); border-color: var(--n1i-ink); }\n.n1i-btn--primary:hover { background: var(--n1i-ink-hover); border-color: var(--n1i-ink-hover); }\n.n1i-btn--ghost { background: transparent; border-color: transparent; color: var(--n1i-text-2); }\n.n1i-btn--ghost:hover { background: var(--n1i-neutral-bg); border-color: transparent; }\n.n1i-btn--sm { min-height: 34px; padding: 0 12px; font-size: var(--n1i-fs-xs); }\n.n1i-iconbtn { width: 30px; height: 30px; display: inline-grid; place-items: center; border-radius: 50%; border: 0; background: transparent; color: var(--n1i-muted); padding: 0; flex: none; transition: background-color var(--n1i-dur-fast) var(--n1i-ease), color var(--n1i-dur-fast) var(--n1i-ease); }\n.n1i-iconbtn:hover { color: var(--n1i-text); background: var(--n1i-neutral-bg); }\n.n1i-iconbtn svg { width: 16px; height: 16px; }\n\n/* ---------- Grafik ---------- */\n.n1i-chartbox { position: relative; height: 260px; }\n.n1i-chartbox--sm { height: 190px; }\n@media (min-width: 1440px) { .n1i-chartbox { height: 300px; } }\n@media (max-width: 479px) { .n1i-chartbox { height: 220px; } }\n.n1i-legend { display: flex; flex-wrap: wrap; gap: 6px 18px; margin-bottom: var(--n1i-s3); color: var(--n1i-text-2); font-size: var(--n1i-fs-sm); font-weight: var(--n1i-fw-medium); }\n.n1i-legend__item { display: inline-flex; align-items: center; gap: 7px; }\n.n1i-legend__swatch { width: 16px; height: 0; border-top: 2.5px solid currentColor; border-radius: 2px; }\n.n1i-legend__swatch--dash { border-top-style: dashed; }\n.n1i-legend__swatch--bar { height: 10px; border: 0; border-radius: 3px; background: currentColor; width: 10px; }\n.n1i-summary-text { color: var(--n1i-muted); font-size: var(--n1i-fs-sm); margin: var(--n1i-s3) 0 0; line-height: 1.55; max-width: 90ch; }\n\n/* ---------- Oran çubukları ---------- */\n.n1i-shares { list-style: none; margin: 0; padding: 0; display: grid; gap: 14px; }\n.n1i-share { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 6px 12px; align-items: baseline; }\n.n1i-share__name { color: var(--n1i-text); font-size: var(--n1i-fs-sm); font-weight: var(--n1i-fw-medium); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0; }\n.n1i-share__val { color: var(--n1i-text); font-size: var(--n1i-fs-sm); font-weight: var(--n1i-fw-semibold); text-align: right; }\n.n1i-share__val small { color: var(--n1i-muted); margin-left: 6px; font-size: var(--n1i-fs-xs); font-weight: var(--n1i-fw-medium); }\n.n1i-share__track { grid-column: 1 / -1; height: 8px; border-radius: 8px; background: var(--n1i-surface-3); overflow: hidden; }\n.n1i-share__fill { height: 100%; border-radius: 8px; background: var(--n1i-bar-edge); transform-origin: 0 50%; }\n.n1i-share:first-child .n1i-share__fill { background: var(--n1i-c1); }\n.n1i-stack { display: flex; height: 14px; border-radius: 8px; overflow: hidden; gap: 3px; margin: 4px 0 var(--n1i-s5); }\n.n1i-stack > span { display: block; height: 100%; min-width: 3px; border-radius: 4px; }\n\n/* ---------- Tablo ---------- */\n.n1i-tablewrap { overflow-x: auto; -webkit-overflow-scrolling: touch; overscroll-behavior-x: contain; border-radius: var(--n1i-r-md); border: 1px solid var(--n1i-line-soft); }\n.n1i-tablewrap:focus-visible { outline-offset: 0; }\n.n1i-table { width: 100%; border-collapse: collapse; font-size: 14px; }\n.n1i-table th, .n1i-table td { padding: 14px 16px; border-bottom: 1px solid var(--n1i-line-soft); text-align: left; vertical-align: middle; }\n.n1i-table thead th { position: sticky; top: 0; background: var(--n1i-surface-2); color: var(--n1i-text-2); font-weight: var(--n1i-fw-semibold); font-size: var(--n1i-fs-xs); white-space: nowrap; }\n.n1i-table tbody tr:last-child td { border-bottom: 0; }\n.n1i-table tbody tr:hover td { background: var(--n1i-bg-2); }\n.n1i-table .is-num { text-align: right; white-space: nowrap; font-variant-numeric: tabular-nums; }\n.n1i-table .is-name { min-width: 200px; max-width: 440px; overflow-wrap: anywhere; font-weight: var(--n1i-fw-medium); }\n.n1i-table tfoot td { color: var(--n1i-text); font-weight: var(--n1i-fw-semibold); border-top: 1px solid var(--n1i-line); background: var(--n1i-surface-2); }\n.n1i-th-btn { appearance: none; border: 0; background: none; padding: 0; min-height: 32px; color: inherit; font: inherit; display: inline-flex; align-items: center; gap: 4px; }\n.n1i-table thead th:has(.n1i-th-btn) { padding-top: 4px; padding-bottom: 4px; }\n.n1i-table thead th.is-num .n1i-th-btn { justify-content: flex-end; width: 100%; }\n.n1i-th-btn[aria-sort] { color: var(--n1i-text); }\n.n1i-sorticon { width: 12px; height: 12px; }\n\n/* Mobil kartlar */\n.n1i-cards { display: none; list-style: none; padding: 0; margin: 0; gap: var(--n1i-s3); }\n.n1i-ccard { border: 1px solid var(--n1i-line-soft); border-radius: var(--n1i-r-md); padding: var(--n1i-s4); background: var(--n1i-surface-2); }\n.n1i-ccard__name { font-weight: var(--n1i-fw-semibold); overflow-wrap: anywhere; margin-bottom: var(--n1i-s3); }\n.n1i-ccard dl { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; margin: 0; }\n.n1i-ccard dt { color: var(--n1i-muted); font-size: var(--n1i-fs-xs); }\n.n1i-ccard dd { margin: 0; font-size: var(--n1i-fs-sm); font-weight: var(--n1i-fw-semibold); font-variant-numeric: tabular-nums; }\n@media (max-width: 639px) { .n1i-responsive-table .n1i-tablewrap { display: none; } .n1i-responsive-table .n1i-cards { display: grid; } }\n@media (max-width: 359px) { .n1i-ccard dl { grid-template-columns: repeat(2, minmax(0, 1fr)); } }\n\n/* ---------- Durumlar ---------- */\n.n1i-skel { position: relative; overflow: hidden; background: var(--n1i-surface-3); border-radius: var(--n1i-r-xs); }\n.n1i-skel::after { content: \"\"; position: absolute; inset: 0; transform: translateX(-100%); background: linear-gradient(90deg, transparent, var(--n1i-glass-strong), transparent); animation: n1i-shimmer 1.4s ease-in-out infinite; }\n@keyframes n1i-shimmer { to { transform: translateX(100%); } }\n.n1i-skel--text { height: 12px; margin: 6px 0; }\n.n1i-skel--value { height: 30px; width: 60%; margin-top: 10px; }\n.n1i-state { display: flex; align-items: flex-start; gap: var(--n1i-s3); padding: var(--n1i-s5); border-radius: var(--n1i-r-md); background: var(--n1i-surface-2); border: 1px solid var(--n1i-line-soft); color: var(--n1i-text-2); font-size: var(--n1i-fs-sm); }\n.n1i-state > svg { width: 20px; height: 20px; flex: none; margin-top: 1px; }\n.n1i-state__body { min-width: 0; flex: 1; }\n.n1i-state__title { color: var(--n1i-text); font-weight: var(--n1i-fw-semibold); margin: 0 0 2px; }\n.n1i-state__text { margin: 0; color: var(--n1i-muted); }\n.n1i-state__actions { margin-top: var(--n1i-s3); display: flex; gap: var(--n1i-s2); flex-wrap: wrap; }\n.n1i-state--error { background: var(--n1i-neg-bg); border-color: transparent; }\n.n1i-state--error > svg { color: var(--n1i-neg); }\n.n1i-state--warn { background: var(--n1i-warn-bg); border-color: transparent; }\n.n1i-state--warn > svg { color: var(--n1i-warn); }\n.n1i-state--info > svg { color: var(--n1i-info); }\n.n1i-state--empty > svg { color: var(--n1i-muted); }\n.n1i-banner { margin-bottom: var(--n1i-s4); }\n.is-stale { opacity: 0.5; pointer-events: none; transition: opacity var(--n1i-dur) var(--n1i-ease); }\n.n1i-loading-line { display: inline-flex; align-items: center; gap: 6px; color: var(--n1i-muted); font-size: var(--n1i-fs-xs); }\n.n1i-spin { width: 12px; height: 12px; border-radius: 50%; border: 2px solid var(--n1i-line); border-top-color: var(--n1i-text-2); animation: n1i-rot 0.8s linear infinite; }\n@keyframes n1i-rot { to { transform: rotate(360deg); } }\n\n/* ---------- Açıklama kutusu ---------- */\n.n1i-tip { position: relative; display: inline-flex; }\n.n1i-tip__pop { position: absolute; z-index: var(--n1i-z-tooltip); top: calc(100% + 8px); right: -8px; width: min(300px, 80vw); padding: 13px 15px; border-radius: var(--n1i-r-md); background: var(--n1i-tooltip-solid); border: 1px solid var(--n1i-glass-edge); color: var(--n1i-tooltip-muted); font-size: var(--n1i-fs-sm); line-height: 1.55; box-shadow: var(--n1i-shadow-2); text-align: left; font-weight: var(--n1i-fw-regular); letter-spacing: 0; transform-origin: 100% 0; }\n@supports ((-webkit-backdrop-filter: blur(1px)) or (backdrop-filter: blur(1px))) { .n1i-tip__pop { background: var(--n1i-glass-sheen), var(--n1i-tooltip-bg); -webkit-backdrop-filter: blur(var(--n1i-blur-strong)) saturate(170%); backdrop-filter: blur(var(--n1i-blur-strong)) saturate(170%); box-shadow: inset 0 1px 0 var(--n1i-glass-highlight), var(--n1i-shadow-2); } }\n.n1-shell.n1i-no-glass .n1i-tip__pop { background: var(--n1i-tooltip-solid); -webkit-backdrop-filter: none; backdrop-filter: none; }\n.n1i-tip__pop b, .n1i-tip__pop i { color: var(--n1i-tooltip-text); font-weight: var(--n1i-fw-semibold); }\n.n1i-tip--left .n1i-tip__pop { right: auto; left: -8px; transform-origin: 0 0; }\n\n/* ---------- Cam yüzey (V2.1) ----------\n   Cam yalnızca arkasında içerik/ışık olan katmanlarda: navigasyon, tema ve aralık kontrolleri,\n   açılır menü, açıklama kutusu, AI yazma alanı, seçili KPI kartları, geçici bildirim.\n   Yoğun tablo ve grafik kartları opak kalır (okunurluk). Yapı: yarı saydam dolgu + üstten ışık\n   (sheen) + iç kenar ışığı + dış ince çizgi + yumuşak gölge. backdrop-filter yoksa opak yedek. */\n.n1i-glass { background: var(--n1i-glass-fallback); border: 1px solid var(--n1i-glass-edge); box-shadow: var(--n1i-shadow-1); }\n@supports ((-webkit-backdrop-filter: blur(1px)) or (backdrop-filter: blur(1px))) {\n  .n1i-glass { background: var(--n1i-glass-sheen), var(--n1i-glass); border-color: var(--n1i-glass-edge); box-shadow: var(--n1i-shadow-glass); -webkit-backdrop-filter: blur(var(--n1i-blur)) saturate(160%); backdrop-filter: blur(var(--n1i-blur)) saturate(160%); }\n  .n1i-glass--strong { background: var(--n1i-glass-sheen), var(--n1i-glass-strong); -webkit-backdrop-filter: blur(var(--n1i-blur-strong)) saturate(170%); backdrop-filter: blur(var(--n1i-blur-strong)) saturate(170%); }\n}\n.n1-shell.n1i-no-glass .n1i-glass, .n1-shell.n1i-no-glass .n1i-glass--strong { background: var(--n1i-glass-fallback); border-color: var(--n1i-line); box-shadow: var(--n1i-shadow-1); -webkit-backdrop-filter: none; backdrop-filter: none; }\n/* Mobilde bulanıklık yarıçapı düşürülür (GPU maliyeti) */\n@media (max-width: 719px) { .n1-shell { --n1i-blur: 14px; --n1i-blur-strong: 18px; } }\n/* Camın arkasındaki yumuşak ışık (yalnızca özet ve çalışma alanı). Dekoratif şekil değil; tek, sabit, hareketsiz. */\n.n1i-wash { position: relative; isolation: isolate; }\n.n1i-wash::before { content: \"\"; position: absolute; z-index: -1; inset: -8px -8px auto -8px; height: 78%; border-radius: var(--n1i-r-xl); background: radial-gradient(60% 80% at 12% 10%, var(--n1i-wash-1), transparent 70%), radial-gradient(50% 70% at 88% 0%, var(--n1i-wash-2), transparent 70%); pointer-events: none; }\n\n/* ---------- Form ---------- */\n.n1i-input, .n1i-select { min-height: 44px; width: 100%; padding: 0 14px; border-radius: var(--n1i-r-md); border: 1px solid var(--n1i-line); background-color: var(--n1i-surface); color: var(--n1i-text); font-size: 15px; }\n.n1i-input::placeholder { color: var(--n1i-muted); }\n.n1i-input:focus-visible, .n1i-select:focus-visible { outline: 2px solid var(--n1i-accent-ring); outline-offset: 0; }\n.n1i-select { appearance: none; padding-right: 36px; background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23808A85' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\"); background-repeat: no-repeat; background-position: right 14px center; }\n.n1i-field { display: grid; gap: 6px; min-width: 0; }\n.n1i-field label { color: var(--n1i-muted); font-size: var(--n1i-fs-xs); font-weight: var(--n1i-fw-semibold); }\n.n1i-searchbox { position: relative; }\n.n1i-searchbox svg { position: absolute; left: 14px; top: 50%; width: 16px; height: 16px; transform: translateY(-50%); color: var(--n1i-muted); pointer-events: none; }\n.n1i-searchbox .n1i-input { padding-left: 40px; }\n\n/* ---------- Dipnot ---------- */\n.n1i-foot { margin-top: var(--n1i-s5); color: var(--n1i-muted); font-size: var(--n1i-fs-sm); line-height: 1.55; display: grid; gap: 4px; max-width: 110ch; }\n.n1i-foot p { margin: 0; }\n\n/* ---------- İkonlar (genel boyut) ---------- */\n.n1i-module li > span > svg { width: 16px; height: 16px; }\n\n/* ---------- Hareket azaltma ---------- */\n@media (prefers-reduced-motion: reduce) {\n  *, *::before, *::after { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; scroll-behavior: auto !important; }\n  .n1i-skel::after { display: none; }\n}\n\n/* ---------- V2 ek bileşenler ---------- */\n@media (max-width: 1279px) { .n1i-kpis--6 { --n1i-kpi-cols: 3; } }\n@media (max-width: 719px) { .n1i-kpis--6 { --n1i-kpi-cols: 2; } }\n@media (max-width: 359px) { .n1i-kpis--6 { --n1i-kpi-cols: 1; } }\n.n1i-kpis--soft { background: var(--n1i-surface-2); box-shadow: none; }\n.n1i-subhead { display: flex; align-items: baseline; justify-content: space-between; flex-wrap: wrap; gap: 4px 12px; margin: var(--n1i-s6) 0 var(--n1i-s3); }\n.n1i-subhead .n1i-panel__sub { margin: 0; }\n/* Genel özet: V2.1 bento. Sol: ziyaretçi (ana kart). Sağ: oturum + tıklama (içerik yüksekliğinde,\n   boş alan yok), vurgu kartı (harcama), Instagram. Kart boyutları veri önemine göre. */\n.n1i-hero { display: grid; gap: var(--n1i-s4); grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); align-items: stretch; }\n@media (min-width: 1024px) { .n1i-hero { gap: var(--n1i-s5); } }\n@media (max-width: 1023px) { .n1i-hero { grid-template-columns: 1fr; } }\n.n1i-hero__main { display: flex; flex-direction: column; border-radius: var(--n1i-r-xl); padding: var(--n1i-s7); min-width: 0; }\n.n1i-hero__side { display: grid; gap: var(--n1i-s4); grid-template-columns: repeat(2, minmax(0, 1fr)); align-content: start; }\n@media (min-width: 1024px) { .n1i-hero__side { gap: var(--n1i-s5); } }\n.n1i-hero__side > .n1i-span2 { grid-column: 1 / -1; }\n@media (max-width: 359px) { .n1i-hero__side { grid-template-columns: 1fr; } }\n.n1i-hero__value { font-size: var(--n1i-fs-hero); font-weight: var(--n1i-fw-semibold); letter-spacing: -0.035em; line-height: 0.98; margin: 10px 0 6px; }\n@media (max-width: 479px) { .n1i-hero__main { padding: var(--n1i-s5); } .n1i-hero__value { font-size: 44px; } }\n.n1i-hero .n1i-kpi { border-radius: var(--n1i-r-xl); }\n.n1i-hero__side .n1i-kpi__value { font-size: 34px; }\n.n1i-kpi__aside { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; padding-top: 10px; margin-top: 2px; border-top: 1px solid var(--n1i-line-soft); color: var(--n1i-muted); font-size: var(--n1i-fs-xs); font-weight: var(--n1i-fw-medium); }\n.n1i-kpi__aside b { color: var(--n1i-text); font-size: var(--n1i-fs-sm); font-weight: var(--n1i-fw-semibold); }\n.n1i-kpi--accent .n1i-kpi__aside { border-top-color: var(--n1i-accent-edge); }\n.n1i-kpi__row { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; flex-wrap: wrap; }\n.n1i-mini { height: 64px; margin-top: 8px; position: relative; flex: 1 1 200px; min-width: 160px; }\n@media (max-width: 479px) { .n1i-hero__side .n1i-kpi__value { font-size: 26px; } }\n/* Durum dağılımı (iş takip) */\n.n1i-dist { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: var(--n1i-s4); margin-top: var(--n1i-s2); }\n@media (max-width: 719px) { .n1i-dist { grid-template-columns: repeat(2, minmax(0, 1fr)); } }\n.n1i-dist__item { display: grid; gap: 4px; }\n.n1i-dist__label { display: inline-flex; align-items: center; gap: 8px; color: var(--n1i-text-2); font-size: var(--n1i-fs-sm); font-weight: var(--n1i-fw-medium); }\n.n1i-dist__dot { width: 10px; height: 10px; border-radius: 3px; flex: none; }\n.n1i-dist__value { font-size: 28px; font-weight: var(--n1i-fw-semibold); letter-spacing: -0.02em; line-height: 1.1; }\n\n.n1i-stackcol { display: grid; gap: var(--n1i-s4); align-content: start; }\n@media (min-width: 1024px) { .n1i-stackcol { gap: var(--n1i-s5); } }\n\n/* ---------- V2.1 ek bileşenler ---------- */\n/* Grafik tooltip'i (HTML, cam). Chart.js dış tooltip işleyicisi tarafından doldurulur. */\n.n1i-ctip { position: absolute; z-index: var(--n1i-z-tooltip); pointer-events: none; min-width: 150px; max-width: 260px; padding: 11px 13px; border-radius: 14px; background: var(--n1i-tooltip-solid); border: 1px solid var(--n1i-glass-edge); color: var(--n1i-tooltip-text); box-shadow: var(--n1i-shadow-2); font-size: var(--n1i-fs-sm); line-height: 1.4; opacity: 0; transform: translateY(4px); transition: opacity 120ms var(--n1i-ease), transform 120ms var(--n1i-ease), left 90ms linear, top 90ms linear; }\n@supports ((-webkit-backdrop-filter: blur(1px)) or (backdrop-filter: blur(1px))) { .n1i-ctip { background: var(--n1i-glass-sheen), var(--n1i-tooltip-bg); -webkit-backdrop-filter: blur(var(--n1i-blur-strong)) saturate(170%); backdrop-filter: blur(var(--n1i-blur-strong)) saturate(170%); box-shadow: inset 0 1px 0 var(--n1i-glass-highlight), var(--n1i-shadow-2); } }\n.n1-shell.n1i-no-glass .n1i-ctip { background: var(--n1i-tooltip-solid); -webkit-backdrop-filter: none; backdrop-filter: none; }\n.n1i-ctip.is-on { opacity: 1; transform: none; }\n.n1i-ctip__title { color: var(--n1i-tooltip-muted); font-size: var(--n1i-fs-xs); font-weight: var(--n1i-fw-semibold); margin-bottom: 6px; }\n.n1i-ctip__row { display: flex; align-items: baseline; justify-content: space-between; gap: 14px; }\n.n1i-ctip__row + .n1i-ctip__row { margin-top: 4px; }\n.n1i-ctip__name { display: inline-flex; align-items: center; gap: 7px; color: var(--n1i-tooltip-muted); }\n.n1i-ctip__sw { width: 8px; height: 8px; border-radius: 3px; flex: none; }\n.n1i-ctip__val { font-weight: var(--n1i-fw-semibold); font-size: 15px; font-variant-numeric: tabular-nums; color: var(--n1i-tooltip-text); }\n@media (prefers-reduced-motion: reduce) { .n1i-ctip { transition: none; } }\n\n/* Uzun sayılar: kart dar gelirse kısa biçime geçer (12,3 Mn TL); tam değer erişilebilir etikette ve title'da */\n.n1i-kpi__value[data-compact-on] { cursor: help; }\n\n/* Geçici bildirim (cam) */\n.n1i-toast { display: inline-flex; align-items: center; gap: 8px; padding: 9px 14px; border-radius: var(--n1i-r-pill); font-size: var(--n1i-fs-sm); font-weight: var(--n1i-fw-medium); color: var(--n1i-text); }\n.n1i-toast svg { width: 16px; height: 16px; color: var(--n1i-warn); flex: none; }\n\n/* Odak görünürlüğü: koyu dolgulu seçili öğelerde halka dışarıda */\n.n1i-seg__btn:focus-visible, .n1i-btn:focus-visible { outline-offset: 3px; border-radius: var(--n1i-r-pill); }\n\n/* Güvenli alan (çentikli cihazlar; Wix iFrame içinde çoğunlukla 0) */\n@supports (padding: max(0px)) { .n1i-root { padding-left: max(var(--n1i-s4), env(safe-area-inset-left)); padding-right: max(var(--n1i-s4), env(safe-area-inset-right)); } }\n@media (min-width: 720px) { @supports (padding: max(0px)) { .n1i-root { padding-left: max(var(--n1i-s8), env(safe-area-inset-left)); padding-right: max(var(--n1i-s8), env(safe-area-inset-right)); } } }\n@media (min-width: 1280px) { @supports (padding: max(0px)) { .n1i-root { padding-left: var(--n1i-s10); padding-right: var(--n1i-s10); } } }\n\n/* V2.2 — erişim kodu doğrulanmadan bölüm kilidi */\n.n1i-lockveil { display: none; }\n.n1-shell.n1i-locked .n1i-lockveil { display: flex; align-items: center; gap: 12px; box-sizing: border-box; margin: 10px auto; width: calc(100% - 2 * var(--n1i-s4)); max-width: calc(var(--n1i-max) - 2 * var(--n1i-s10)); padding: 12px 18px 12px 12px; border-radius: var(--n1i-r-lg, 20px); color: var(--n1i-muted); font-size: var(--n1i-fs-base); font-weight: 500; opacity: .86; }\n.n1i-lockveil__t { color: var(--n1i-text-2); font-weight: 600; flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\n.n1i-lockveil__s { display: inline-flex; align-items: center; gap: 6px; font-size: var(--n1i-fs-sm); white-space: nowrap; }\n.n1i-lockveil__s svg { width: 15px; height: 15px; }\n@media (max-width: 479px) { .n1i-lockveil__s span { display: none; } }\n.n1-shell.n1i-locked #n1i-root { display: none; }\n.n1i-lockveil__ic { width: 36px; height: 36px; border-radius: 12px; display: grid; place-items: center; background: var(--n1i-surface); color: var(--n1i-text-2); flex: none; box-shadow: inset 0 0 0 1px var(--n1i-line-soft); }\n.n1i-lockveil__ic svg { width: 18px; height: 18px; }\n@media (min-width: 720px) { .n1-shell.n1i-locked .n1i-lockveil { width: calc(100% - 2 * var(--n1i-s8)); } }\n@media (min-width: 1280px) { .n1-shell.n1i-locked .n1i-lockveil { width: calc(100% - 2 * var(--n1i-s10)); } }\n\n:host{display:block;width:100%;min-width:0} .n1-shell{display:block;width:100%;min-height:100%;isolation:isolate}.n1-body{min-height:0;overflow-x:hidden}[hidden]{display:none!important}#n1-nav{position:sticky;top:0;z-index:20;padding:8px 0 6px}#n1-area>.n1i-root{padding-top:8px}#n1-status{margin:8px auto;max-width:1280px;padding:8px 20px;color:var(--n1i-muted)}";
class Intelligence extends HTMLElement{
 static get observedAttributes(){return ['n1-response'];}
 connectedCallback(){if(this._started)return;this._started=true;const host=this;const shadow=this.shadowRoot||this.attachShadow({mode:'open'});shadow.innerHTML='';const style=document.createElement('style');style.textContent=STYLE;shadow.appendChild(style);const shell=document.createElement('div');shell.className='n1-shell';shell.setAttribute('data-theme','light');shell.innerHTML='<div class="n1-body"><header id="n1-nav" class="n1i-root"></header><p id="n1-status" role="status">1N Intelligence — yükleniyor…</p><main id="n1-area" hidden></main></div>';shadow.appendChild(shell);const realDocument=document;const controller=new AbortController();this._abort=controller;const doc={documentElement:shell,body:shell.querySelector('.n1-body'),getElementById:id=>shadow.getElementById(id),querySelector:s=>shadow.querySelector(s),querySelectorAll:s=>shadow.querySelectorAll(s),createElement:realDocument.createElement.bind(realDocument),head:{appendChild:el=>(el.tagName==='SCRIPT'?realDocument.head:shadow).appendChild(el)},addEventListener:(t,fn,o)=>shadow.addEventListener(t,fn,{...(typeof o==='object'?o:{}),signal:controller.signal}),fonts:realDocument.fonts,get activeElement(){return shadow.activeElement;}};
const runtime={N1I_CONFIG:{module:'workspace',client:{name:'Demo Test Mağazası (SAHTE)'},currency:'TRY',timeZone:'Europe/Istanbul',heightMessages:false,motion:true}};const listenWindow=(t,fn,o)=>window.addEventListener(t,fn,{...(typeof o==='object'?o:{}),signal:controller.signal});const noopListener=()=>{};
try{(function(document){
/* =====================================================================
   1N INTELLIGENCE V2.1 — Ortak çekirdek (2.1.0)
   V2: merkezi tema protokolü (açık öncelikli), grafik tema kaydı, kayan segment göstergesi.
   V2.1: cam grafik tooltip'i (HTML), çizgi grafiklerde dikey kılavuz, uzun sayıların kartta
         otomatik kısa biçime geçmesi, okunur eksen yazıları, açıklama kutusu mikro hareketi.
   Her HTML Embed (iFrame) bu dosyayı bir kez yükler.
   İçerik: yapılandırma, biçimlendirme (tr-TR), güvenli mesaj köprüsü,
   yükseklik bildirimi, durum bileşenleri, açıklama balonları,
   Chart.js 4.4.0 ve GSAP 3.13.0 için tembel ve sabit sürümlü yükleme.
   Bu dosyada müşteri verisi, hesap kimliği veya gizli bilgi YOKTUR.
   ===================================================================== */
(function () {
  'use strict';
  if (runtime.N1I) return; // aynı iFrame'de ikinci kez yüklenirse yok say

  var VERSION = '2.2.0';
  var CDN = {
    chart: 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js',
    gsap: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js'
  };

  /* ---------------- Yapılandırma ----------------
     runtime.N1I_CONFIG embed kodunda tanımlanır (gizli bilgi içermez).
     demo yalnızca prototip sayfası URL'sinde ?demo=1 varsa açılır; üretim
     embed kodunda demo verisi yoktur ve demo bayrağı yapılandırmadan açılamaz. */
  var qs = new URLSearchParams();
  var userCfg = runtime.N1I_CONFIG || {};
  var cfg = {
    module: userCfg.module || document.documentElement.getAttribute('data-n1i-module') || 'unknown',
    client: userCfg.client || {},
    timeZone: userCfg.timeZone || 'Europe/Istanbul',
    currency: userCfg.currency || 'TRY',
    allowedOrigins: Array.isArray(userCfg.allowedOrigins) ? userCfg.allowedOrigins : [],
    heightMessages: userCfg.heightMessages !== false,
    motion: userCfg.motion !== false,
    responseTimeoutMs: userCfg.responseTimeoutMs || 30000,
    demo: qs.get('demo') === '1',
    noGlass: qs.get('noglass') === '1',
    options: userCfg.options || {}
  };
  if (cfg.noGlass) document.documentElement.classList.add('n1i-no-glass');
  // Yalnızca prototipte (demo=1) bekleme süresi test için kısaltılabilir.
  if (cfg.demo && /^\d{3,6}$/.test(qs.get('timeout') || '')) cfg.responseTimeoutMs = Number(qs.get('timeout'));

  /* ---------------- Biçimlendirme (Türkçe) ---------------- */
  var nfInt = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 0 });
  var nf1 = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  var nf2 = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  var nfCompact = new Intl.NumberFormat('tr-TR', { notation: 'compact', maximumFractionDigits: 1 });
  function isNum(v) { return v !== null && v !== undefined && v !== '' && isFinite(Number(v)); }
  var DASH = '—';
  var fmt = {
    isNum: isNum,
    int: function (v) { return isNum(v) ? nfInt.format(Math.round(Number(v))) : DASH; },
    dec1: function (v) { return isNum(v) ? nf1.format(Number(v)) : DASH; },
    dec2: function (v) { return isNum(v) ? nf2.format(Number(v)) : DASH; },
    compact: function (v) { return isNum(v) ? nfCompact.format(Number(v)) : DASH; },
    signed: function (v) { if (!isNum(v)) return DASH; v = Math.round(Number(v)); return (v > 0 ? '+' : v < 0 ? '−' : '') + nfInt.format(Math.abs(v)); },
    /* Para: sembol sonda, TL. Hesap para birimi platformdan gelmediği için cfg.currency varsayılır. */
    money: function (v) { return isNum(v) ? nf2.format(Number(v)) + ' ' + (cfg.currency === 'TRY' ? 'TL' : cfg.currency) : DASH; },
    moneyShort: function (v) { return isNum(v) ? nfCompact.format(Number(v)) + ' ' + (cfg.currency === 'TRY' ? 'TL' : cfg.currency) : DASH; },
    /* Yüzde: oran (0–1) verilir. 0.1'in altı "<%0,1" olarak yazılır. */
    pctRatio: function (r, digits) {
      if (!isNum(r)) return DASH;
      var p = Number(r) * 100, d = digits === undefined ? 1 : digits;
      if (p > 0 && p < 0.1) return '<%0,1';
      return '%' + new Intl.NumberFormat('tr-TR', { minimumFractionDigits: d, maximumFractionDigits: d }).format(p);
    },
    duration: function (sec) {
      if (!isNum(sec)) return DASH;
      var s = Math.round(Number(sec)), m = Math.floor(s / 60), r = s % 60;
      return m > 0 ? m + ' dk ' + r + ' sn' : r + ' sn';
    },
    /* 'YYYYMMDD' veya 'YYYY-MM-DD' → Date (UTC öğlen, saat dilimi kaymasından etkilenmez) */
    parseDay: function (s) {
      if (!s) return null;
      var t = String(s).replace(/-/g, '');
      if (!/^\d{8}$/.test(t)) return null;
      return new Date(Date.UTC(+t.slice(0, 4), +t.slice(4, 6) - 1, +t.slice(6, 8), 12));
    },
    dayKey: function (d) { return d.getUTCFullYear() + String(d.getUTCMonth() + 1).padStart(2, '0') + String(d.getUTCDate()).padStart(2, '0'); },
    dayShort: function (s) { var d = fmt.parseDay(s); return d ? new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'short', timeZone: 'UTC' }).format(d) : DASH; },
    dayLong: function (s) { var d = fmt.parseDay(s); return d ? new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(d) : DASH; },
    dateTR: function (date) { return new Intl.DateTimeFormat('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: cfg.timeZone }).format(date); },
    timeTR: function (date) { return new Intl.DateTimeFormat('tr-TR', { hour: '2-digit', minute: '2-digit', timeZone: cfg.timeZone }).format(date); },
    /* Yapılandırılmış saat dilimine göre bugünün 'YYYY-MM-DD' karşılığı */
    todayISO: function (now) {
      var p = new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: cfg.timeZone }).formatToParts(now || new Date());
      var o = {}; p.forEach(function (x) { o[x.type] = x.value; });
      return o.year + '-' + o.month + '-' + o.day;
    }
  };

  function esc(v) {
    return String(v === null || v === undefined ? '' : v)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /* ---------------- İkonlar (satır içi SVG, 24 ızgara, 1.5 çizgi) ---------------- */
  var P = {
    summary: '<path d="M4 13h4v7H4zM10 8h4v12h-4zM16 4h4v16h-4z"/>',
    ga4: '<path d="M4 19V9M10 19V5M16 19v-7M3 19h18"/>',
    meta: '<path d="M3 15c2-7 5-9 7-5l4 7c2 3 5 1 6-3s-1-8-4-6-5 7-9 10"/>',
    gads: '<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>',
    instagram: '<rect x="4" y="4" width="16" height="16" rx="5"/><circle cx="12" cy="12" r="3.5"/><circle cx="17" cy="7" r="0.6"/>',
    sheets: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>',
    ai: '<path d="M12 3l1.8 4.7L18.5 9.5 13.8 11.3 12 16l-1.8-4.7L5.5 9.5l4.7-1.8z"/><path d="M18 15l.8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8z"/>',
    domain: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',
    drive: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    glossary: '<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h11"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8v.01"/>',
    alert: '<path d="M12 4l9 16H3z"/><path d="M12 10v4M12 17v.01"/>',
    error: '<circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/>',
    ok: '<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.6 2.5L16 9.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    empty: '<rect x="4" y="5" width="16" height="14" rx="2"/><path d="M4 13h4l2 2h4l2-2h4"/>',
    refresh: '<path d="M20 11a8 8 0 1 0-2.3 5.7M20 5v6h-6"/>',
    up: '<path d="M12 19V5M6 11l6-6 6 6"/>',
    down: '<path d="M12 5v14M6 13l6 6 6-6"/>',
    flat: '<path d="M5 12h14"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4 4"/>',
    send: '<path d="M5 12h13M13 6l6 6-6 6"/>',
    external: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    chevron: '<path d="M6 9l6 6 6-6"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    lock: '<rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 20a8 8 0 0 1 16 0"/>',
    table: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M9 10v9"/>',
    chart: '<path d="M4 17l5-5 4 3 7-8"/>',
    calendar: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>'
  };
  function icon(name, cls) {
    return '<svg class="' + (cls || '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + (P[name] || P.info) + '</svg>';
  }

  /* ---------------- Güvenli mesaj köprüsü ----------------
     Gelen: yalnızca üst pencereden (event.source === window.parent),
     izin listesi tanımlıysa yalnızca o origin'lerden, nesne tipinde ve
     modülün şema kontrolünden geçen mesajlar işlenir. Aynı içerikli
     mesaj ikinci kez gelirse yeniden çizilmez.
     Giden: mevcut sözleşmedeki mesajlar ({action:'changeRange'}, {action:'askAI'})
     değiştirilmeden gönderilir. Hedef origin, tarayıcı destekliyorsa üst
     sayfanın origin'idir; değilse '*' (mevcut davranış). */
  var bridge = (function () {
    var lastSig = {};
    function parentOrigin() {
      try { if (location.ancestorOrigins && /^https?:\/\//.test(location.ancestorOrigins[0])) return location.ancestorOrigins[0]; } catch (e) {}
      return '*';
    }
    function sig(d) { try { return JSON.stringify(d); } catch (e) { return String(Math.random()); } }
    function listen(handler, opts) {
      opts = opts || {};
      noopListener('message', function (e) {
        if (false && e.source !== window.parent) return;
        if (cfg.allowedOrigins.length && cfg.allowedOrigins.indexOf(e.origin) === -1) { stats.rejectedOrigin++; return; }
        var d = e.data;
        if (!d || typeof d !== 'object' || Array.isArray(d)) { stats.rejectedShape++; return; }
        if (d.type === 'N1I_HEIGHT' || d.type === 'N1I_NAV' || d.action === 'n1iTheme' || d.action === 'n1iLocked' || d.action === 'n1iUnlocked') return; // kendi protokolümüz, veri değil
        if (opts.accept && !opts.accept(d)) { stats.rejectedShape++; return; }
        var key = opts.kind ? opts.kind(d) : 'default';
        var s = sig(d);
        var isDup = lastSig[key] === s;
        lastSig[key] = s;
        if (isDup && (!opts.dedupe || opts.dedupe(d))) { stats.duplicates++; return; }
        stats.accepted++;
        try { handler(d, e); } catch (err) { stats.renderErrors++; console.error('[1N Intelligence] çizim hatası', err); if (opts.onError) opts.onError(err); }
      });
    }
    function forget(key) { delete lastSig[key || 'default']; }
    function send(msg) {
      if (true) return false;
      window.parent.postMessage(msg, parentOrigin());
      return true;
    }
    var stats = { accepted: 0, duplicates: 0, rejectedShape: 0, rejectedOrigin: 0, renderErrors: 0 };
    return { listen: listen, send: send, forget: forget, stats: stats, parentOrigin: parentOrigin };
  })();

  /* ---------------- Yükseklik bildirimi (yalnızca iFrame için) ----------------
     Wix HTML Embed bir iFrame'dir ve kendi yüksekliğini değiştiremez.
     İçerik yüksekliği üst sayfaya bildirilir; üst sayfadaki Özel Kod
     (embeds/wix-custom-code-auto-height.html) iFrame'i bu yüksekliğe ayarlar.
     Döngü önleme: içerik iFrame yüksekliğine bağlı değildir (100vh yok),
     2 px altındaki değişiklikler gönderilmez. */
  var height = (function () {
    var last = 0, timer = 0, root = null;
    function measure() {
      if (runtime.N1I && runtime.N1I.seg) runtime.N1I.seg.sync(document, true, true);
      if (!root) return;
      var veil = document.documentElement.classList.contains('n1i-locked') ? document.querySelector('.n1i-lockveil') : null;
      var target = veil || root;
      if (!veil) fitNumbers(root);
      var r = target.getBoundingClientRect();
      var h = Math.ceil(Math.max(r.height, target.scrollHeight) + (veil ? 32 : 0) + (parseFloat(getComputedStyle(document.body).paddingBottom) || 0));
      if (!isFinite(h) || h < 1 || Math.abs(h - last) < 2) return;
      last = h;
      if (false) window.parent.postMessage({ type: 'N1I_HEIGHT', module: cfg.module, height: h }, '*');
    }
    function schedule() { clearTimeout(timer); timer = setTimeout(measure, 60); }
    function start(el) {
      if (!cfg.heightMessages) return;
      root = el;
      if ('ResizeObserver' in window) new ResizeObserver(schedule).observe(el);
      listenWindow('resize', schedule);
      listenWindow('load', schedule);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(schedule);
      measure(); setTimeout(schedule, 400); setTimeout(schedule, 1500);
    }
    return { start: start, now: measure, schedule: schedule, last: function () { return last; } };
  })();

  /* ---------------- Komut dosyası yükleme ---------------- */
  var loaded = {};
  function loadScript(src, test, timeoutMs) {
    if (test()) return Promise.resolve();
    if (loaded[src]) return loaded[src];
    loaded[src] = new Promise(function (res, rej) {
      var s = document.createElement('script');
      s.src = src; s.async = true; s.crossOrigin = 'anonymous';
      var t = setTimeout(function () { rej(new Error('timeout ' + src)); }, timeoutMs || 12000);
      s.onload = function () { clearTimeout(t); test() ? res() : rej(new Error('missing ' + src)); };
      s.onerror = function () { clearTimeout(t); rej(new Error('load ' + src)); };
      document.head.appendChild(s);
    });
    loaded[src].catch(function () { delete loaded[src]; });
    return loaded[src];
  }

  /* ---------------- Uzun sayılar (V2.1) ----------------
     data-full / data-compact taşıyan değerler kart dar gelirse kısa biçime geçer (ör. 12,3 Mn TL).
     Tam değer aria-label ve title'da kalır; genişleyince tam biçime döner. Yazı küçültülmez. */
  function unitHtml(t) { return String(t).replace(/ TL$/, '<small>TL</small>'); }
  function fitNumbers(scope, force) {
    (scope || document).querySelectorAll('[data-full]').forEach(function (el) {
      var cw = String(el.clientWidth);
      if (!force && el.getAttribute('data-fit-w') === cw) return;
      el.setAttribute('data-fit-w', cw);
      var full = el.getAttribute('data-full'), comp = el.getAttribute('data-compact');
      el.innerHTML = unitHtml(full); el.removeAttribute('data-compact-on'); el.removeAttribute('title'); el.style.fontSize = '';
      el.setAttribute('aria-label', full);
      if (el.scrollWidth <= el.clientWidth + 1) return;
      /* 1. adım: büyük vurgu sayılarında (≥ 36 px) bir kademe küçült; 2. adım: kısa biçim */
      var fs = parseFloat(getComputedStyle(el).fontSize);
      if (fs >= 36) { el.style.fontSize = Math.round(fs * 0.76) + 'px'; if (el.scrollWidth <= el.clientWidth + 1) return; }
      if (comp) { el.innerHTML = unitHtml(comp); el.setAttribute('data-compact-on', '1'); el.title = full; }
    });
  }

  /* ---------------- Hareket (GSAP 3.13.0, isteğe bağlı) ----------------
     GSAP yüklenemezse veya kullanıcı hareketi azaltmışsa hiçbir şey
     beklenmez; içerik zaten görünür ve son değerindedir. */
  var reduceMQ = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
  var motion = {
    allowed: function () { return cfg.motion && !reduceMQ.matches; },
    gsap: function () {
      if (!motion.allowed()) return Promise.resolve(null);
      return loadScript(CDN.gsap, function () { return !!window.gsap; }, 8000).then(function () { return window.gsap; }, function () { return null; });
    },
    /* Kısa giriş: yalnızca ilk veri geldiğinde, 240 ms, 6 px. */
    enter: function (els) {
      var list = Array.prototype.slice.call(els || []).filter(Boolean);
      if (!list.length) return;
      motion.gsap().then(function (g) {
        if (!g) return;
        g.fromTo(list, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.34, ease: 'power3.out', stagger: 0.04, clearProps: 'opacity,transform' });
      });
    },
    /* Sayı geçişi: yalnızca ilk yüklemede; erişilebilir değer hemen aria-label'a yazılır. */
    count: function (el, value, formatter) {
      if (!el || !isNum(value)) return;
      var unit = function (t) { return String(t).replace(/ TL$/, '<small>TL</small>'); };
      var final = unit(formatter(value));
      el.setAttribute('aria-label', final.replace(/<[^>]+>/g, ''));
      el.innerHTML = final;
      fitNumbers(el.parentNode, true);
      if (el.getAttribute('data-counted') === '1' || Math.abs(Number(value)) < 10 || el.hasAttribute('data-compact-on')) return;
      el.setAttribute('data-counted', '1');
      motion.gsap().then(function (g) {
        if (!g) return;
        var o = { v: 0 };
        g.to(o, { v: Number(value), duration: 0.5, ease: 'power2.out', onUpdate: function () { el.innerHTML = unit(formatter(o.v)); }, onComplete: function () { el.innerHTML = final; fitNumbers(el.parentNode, true); } });
      });
    },
    /* Oran çubukları: soldan doluş, 300 ms. */
    bars: function (els) {
      var list = Array.prototype.slice.call(els || []);
      if (!list.length) return;
      motion.gsap().then(function (g) { if (g) g.from(list, { scaleX: 0, duration: 0.3, ease: 'power2.out', stagger: 0.02, clearProps: 'transform' }); });
    }
  };

  /* ---------------- Grafikler (Chart.js 4.4.0, mevcut altyapı) ---------------- */
  function css(name) { return getComputedStyle(document.documentElement).getPropertyValue(name).trim(); }
  var charts = {
    registry: [],
    load: function () {
      return loadScript(CDN.chart, function () { return !!window.Chart; }, 12000).then(function () { charts.theme(window.Chart); return window.Chart; });
    },
    /* Chart.js varsayılanları güncel tema tokenlarından okunur; tema değişince yeniden çağrılır. */
    theme: function (Chart) {
      Chart = Chart || window.Chart; if (!Chart) return;
      Chart.defaults.font.family = "'Barlow', 'Helvetica Neue', Arial, sans-serif";
      Chart.defaults.font.size = 12.5;
      Chart.defaults.font.weight = '500';
      Chart.defaults.color = css('--n1i-muted');
      Chart.defaults.borderColor = css('--n1i-grid');
      Chart.defaults.locale = 'tr-TR';
      Chart.defaults.animation = motion.allowed() ? { duration: 360, easing: 'easeOutQuart' } : false;
      /* Renk animasyonu kapalı: degrade dolgular (CanvasGradient) ara değer hesaplanamaz; tema geçişi zaten anlıktır. */
      if (Chart.defaults.animations) Chart.defaults.animations.colors = false;
      Chart.defaults.plugins.legend.display = false; // açıklama HTML olarak çizilir
      var tt = Chart.defaults.plugins.tooltip;
      /* V2.1: tooltip HTML olarak çizilir (cam yüzey, büyük değer, okunur yazı) */
      tt.enabled = false; tt.external = charts.externalTooltip;
      tt.displayColors = true; tt.usePointStyle = true;
      Chart.defaults.interaction = { mode: 'index', intersect: false };
      Chart.defaults.maintainAspectRatio = false;
      Chart.defaults.responsive = true;
      var el = Chart.defaults.elements;
      el.line.borderWidth = 2.25; el.line.tension = 0.32; el.line.borderCapStyle = 'round'; el.line.borderJoinStyle = 'round';
      el.point.radius = 0; el.point.hoverRadius = 5; el.point.hitRadius = 14; el.point.hoverBorderWidth = 2.5;
      el.point.hoverBackgroundColor = css('--n1i-surface');
      el.bar.borderRadius = 6;
      if (!charts._plugin) { charts._plugin = true; Chart.register(charts.crosshair); }
    },
    /* Çizgi grafiklerde etkin noktada ince dikey kılavuz (okuma kolaylığı). */
    crosshair: {
      id: 'n1iCrosshair',
      afterDatasetsDraw: function (chart) {
        if (chart.config.type !== 'line' || !chart.tooltip) return;
        var a = chart.tooltip.getActiveElements ? chart.tooltip.getActiveElements() : [];
        if (!a || !a.length) return;
        var x = a[0].element.x, area = chart.chartArea, ctx = chart.ctx;
        ctx.save(); ctx.strokeStyle = css('--n1i-line-strong'); ctx.lineWidth = 1; ctx.setLineDash([3, 3]);
        ctx.beginPath(); ctx.moveTo(x, area.top); ctx.lineTo(x, area.bottom); ctx.stroke(); ctx.restore();
      }
    },
    /* Dış tooltip: başlık + her seri için ad / değer. Etiket geri çağrılarının " Ad: değer" çıktısı ayrıştırılır. */
    externalTooltip: function (context) {
      var chart = context.chart, tt = context.tooltip, host = chart.canvas.parentNode;
      var el = host.querySelector(':scope > .n1i-ctip');
      if (!el) { el = document.createElement('div'); el.className = 'n1i-ctip'; el.setAttribute('aria-hidden', 'true'); host.appendChild(el); }
      if (!tt || tt.opacity === 0) { el.classList.remove('is-on'); return; }
      var rows = (tt.body || []).map(function (b, i) {
        var line = (b.lines || []).join(' ').trim(), k = line.lastIndexOf(': ');
        var name = k > -1 ? line.slice(0, k) : '', val = k > -1 ? line.slice(k + 2) : line;
        var col = tt.labelColors && tt.labelColors[i] ? (tt.labelColors[i].borderColor || tt.labelColors[i].backgroundColor) : 'transparent';
        if (typeof col !== 'string') col = 'transparent';
        return '<div class="n1i-ctip__row"><span class="n1i-ctip__name">' + (name ? '<span class="n1i-ctip__sw" style="background:' + esc(col) + '"></span>' + esc(name) : '') + '</span><span class="n1i-ctip__val">' + esc(val) + '</span></div>';
      }).join('');
      var title = (tt.title || []).join(' ');
      el.innerHTML = (title ? '<div class="n1i-ctip__title">' + esc(title) + '</div>' : '') + rows;
      var hw = host.clientWidth, hh = host.clientHeight, w = el.offsetWidth, h = el.offsetHeight;
      var x = tt.caretX + 14; if (x + w > hw) x = tt.caretX - w - 14; if (x < 0) x = Math.max(0, Math.min(hw - w, tt.caretX - w / 2));
      var y = Math.max(-8, Math.min(hh - h + 8, tt.caretY - h / 2));
      el.style.left = Math.round(x) + 'px'; el.style.top = Math.round(y) + 'px';
      el.classList.add('is-on');
    },
    color: css,
    /* Alan dolgusu: üstte token rengi, altta saydam (çizgi grafikler). Tema değişince yeniden okunur. */
    areaFill: function (varName) {
      return function (ctx) {
        var ch = ctx.chart, a = ch.chartArea; if (!a) return css(varName);
        var g = ch.ctx.createLinearGradient(0, a.top, 0, a.bottom);
        g.addColorStop(0, css(varName)); g.addColorStop(1, 'rgba(0,0,0,0)'); return g;
      };
    },
    axis: function (extra) {
      return Object.assign({ grid: { color: css('--n1i-grid'), drawTicks: false }, border: { display: false, dash: [3, 4] }, ticks: { color: css('--n1i-muted'), padding: 10, font: { size: 12.5, weight: '500' } } }, extra || {});
    },
    /* Grafik oluşturma: build() güncel tokenlarla TAM yapılandırma döndürür.
       Tema değişince yalnızca renk ve seçenekler yeniden uygulanır; veri dizileri aynen kalır. */
    create: function (canvas, build) {
      var cfg = build();
      var chart = new window.Chart(canvas, cfg);
      charts.registry.push({ chart: chart, build: build });
      return chart;
    },
    retheme: function () {
      if (!window.Chart) return;
      charts.theme(window.Chart);
      charts.registry = charts.registry.filter(function (r) { return r.chart.canvas && r.chart.canvas.isConnected; });
      charts.registry.forEach(function (r) {
        var cfg = r.build();
        r.chart.data.datasets.forEach(function (ds, i) {
          var nd = cfg.data.datasets[i]; if (!nd) return;
          Object.keys(nd).forEach(function (k) { if (k !== 'data' && k !== 'label') ds[k] = nd[k]; });
        });
        window.Chart.helpers.merge(r.chart.options, cfg.options);
        r.chart.update('none');
      });
    }
  };

  /* ---------------- Durum bileşenleri ---------------- */
  var ui = {
    icon: icon,
    state: function (kind, title, text, actionsHtml) {
      var ic = { error: 'error', warn: 'alert', info: 'info', empty: 'empty', ok: 'ok' }[kind] || 'info';
      return '<div class="n1i-state n1i-state--' + kind + '" role="' + (kind === 'error' ? 'alert' : 'status') + '">' + icon(ic) +
        '<div class="n1i-state__body"><p class="n1i-state__title">' + esc(title) + '</p>' + (text ? '<p class="n1i-state__text">' + text + '</p>' : '') +
        (actionsHtml ? '<div class="n1i-state__actions">' + actionsHtml + '</div>' : '') + '</div></div>';
    },
    skelKpis: function (n) {
      var h = '';
      for (var i = 0; i < n; i++) h += '<div class="n1i-kpi" aria-hidden="true"><div class="n1i-skel n1i-skel--text" style="width:55%"></div><div class="n1i-skel n1i-skel--value"></div><div class="n1i-skel n1i-skel--text" style="width:40%"></div></div>';
      return '<div class="n1i-kpis">' + h + '</div>';
    },
    skelPanel: function (h) { return '<div class="n1i-panel" aria-hidden="true"><div class="n1i-skel n1i-skel--text" style="width:30%"></div><div class="n1i-skel" style="height:' + (h || 200) + 'px;margin-top:12px"></div></div>'; },
    chip: function (kind, text, ic) { return '<span class="n1i-chip' + (kind ? ' n1i-chip--' + kind : '') + '">' + (ic ? icon(ic) : '') + esc(text) + '</span>'; },
    demoChip: function () { return cfg.demo ? '<span class="n1i-chip n1i-chip--demo" title="Bu alandaki bütün sayılar örnek veridir">DEMO VERİ</span>' : ''; },
    /* Açıklama: düğme + açılır kutu. Klavye: Enter/Space açar, Esc kapatır. */
    tip: function (html, label, left) {
      var id = 'tip' + Math.random().toString(36).slice(2, 8);
      return '<span class="n1i-tip' + (left ? ' n1i-tip--left' : '') + '"><button type="button" class="n1i-iconbtn" aria-expanded="false" aria-controls="' + id + '" aria-label="' + esc(label || 'Açıklama') + '" data-n1i-tip>' + icon('info') + '</button>' +
        '<span class="n1i-tip__pop" id="' + id + '" role="tooltip" hidden>' + html + '</span></span>';
    },
    kpi: function (o) {
      // o: {id, label, value(metin), compact(kısa metin, isteğe bağlı), foot(html), aside(html), tip(html), state:'ok'|'na'|'err', cls}
      var cls = 'n1i-kpi' + (o.state === 'na' ? ' n1i-kpi--na' : '') + (o.state === 'err' ? ' n1i-kpi--err' : '') + (o.cls ? ' ' + o.cls : '');
      return '<div class="' + cls + '"' + (o.id ? ' id="' + o.id + '"' : '') + '><div class="n1i-kpi__top"><span class="n1i-kpi__label">' + esc(o.label) + '</span>' + (o.tip ? ui.tip(o.tip, o.label + ' açıklaması') : '') + '</div>' +
        '<div class="n1i-kpi__value n1i-num" data-v' + (o.compact ? ' data-full="' + esc(String(o.value)) + '" data-compact="' + esc(o.compact) + '" aria-label="' + esc(String(o.value)) + '"' : '') + '>' + String(o.value).replace(/ TL$/, '<small>TL</small>') + '</div>' + (o.foot ? '<div class="n1i-kpi__foot">' + o.foot + '</div>' : '') + (o.aside ? '<div class="n1i-kpi__aside">' + o.aside + '</div>' : '') + '</div>';
    },
    seg: function (name, items, active, label) {
      return '<div class="n1i-seg" role="group" aria-label="' + esc(label) + '">' + items.map(function (it) {
        return '<button type="button" class="n1i-seg__btn" data-' + name + '="' + esc(it.key) + '" aria-pressed="' + (it.key === active) + '">' + esc(it.label) + '</button>';
      }).join('') + '</div>';
    },
    received: function () { return 'Alındı ' + fmt.timeTR(new Date()) + ' (TSİ)'; },
    /* V2.2: sunucunun gönderdiği aralık (n1iRange) varsa gerçek tarihlerle yazılır; yoksa V2.1 metni. */
    rangeText: function (d, legacyAll) {
      var r = d && d.n1iRange;
      if (!r || !r.label) return (d.rangeLabel || 'Son 7 gün') + (d.rangeKey === 'all' ? ' (' + legacyAll + ')' : ' · bugün dahil');
      var t = r.label + (r.open ? ' · veri başlangıcından bugüne' : (r.span ? ' · ' + r.span : ''));
      if (r.clamped) t += ' · bugünün verisi henüz alınamadı';
      else if (r.partialToday) t += ' · bugün devam ediyor';
      return t;
    },
    rangeTitle: function (d) {
      var r = d && d.n1iRange;
      return r && r.note ? r.label + ': ' + r.note + (r.tz ? ' (' + r.tz + ')' : '') : '';
    }
  };

  // Açıklama kutuları: tek yerden olay yönetimi
  document.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('[data-n1i-tip]') : null;
    document.querySelectorAll('[data-n1i-tip][aria-expanded="true"]').forEach(function (o) {
      if (o !== b) { o.setAttribute('aria-expanded', 'false'); var p = document.getElementById(o.getAttribute('aria-controls')); if (p) p.hidden = true; }
    });
    if (!b) return;
    var pop = document.getElementById(b.getAttribute('aria-controls'));
    var open = b.getAttribute('aria-expanded') !== 'true';
    b.setAttribute('aria-expanded', String(open));
    if (pop) {
      pop.hidden = !open;
      if (open && window.gsap && motion.allowed()) window.gsap.fromTo(pop, { opacity: 0, y: -4, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.16, ease: 'power2.out', clearProps: 'opacity,transform' });
    }
    height.schedule();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('[data-n1i-tip][aria-expanded="true"]').forEach(function (o) {
      o.setAttribute('aria-expanded', 'false'); var p = document.getElementById(o.getAttribute('aria-controls')); if (p) p.hidden = true; o.focus();
    });
  });

  /* ---------------- Modül başlığı ---------------- */
  function header(o) {
    // o: {icon, title, meta:[html], tools(html), tip}
    return '<header class="n1i-head"' + (o.tone ? ' data-tone="' + o.tone + '"' : '') + '><div class="n1i-head__title"><span class="n1i-head__icon">' + icon(o.icon) + '</span><div style="min-width:0">' +
      '<h2 class="n1i-h1">' + esc(o.title) + '</h2>' + (o.meta && o.meta.length ? '<div class="n1i-meta">' + o.meta.filter(Boolean).join('<span class="n1i-meta__sep" aria-hidden="true"></span>') + '</div>' : '') +
      '</div></div>' + (o.tools ? '<div class="n1i-head__tools">' + o.tools + '</div>' : '') + '</header>';
  }

  /* ---------------- Tarih yardımcıları ---------------- */
  /* Günlük seriyi takvimle hizalar: eksik günler 'fill' değeriyle (null = boşluk) doldurulur. */
  function alignDays(rows, getKey, getVals, fill) {
    var map = {}, keys = [];
    rows.forEach(function (r) { var k = String(getKey(r)).replace(/-/g, ''); if (/^\d{8}$/.test(k)) { map[k] = getVals(r); keys.push(k); } });
    if (!keys.length) return { labels: [], keys: [], values: [] };
    keys.sort();
    var start = fmt.parseDay(keys[0]), end = fmt.parseDay(keys[keys.length - 1]);
    var outK = [], outV = [], d = new Date(start.getTime()), guard = 0;
    while (d <= end && guard++ < 4000) {
      var k = fmt.dayKey(d);
      outK.push(k); outV.push(map[k] !== undefined ? map[k] : fill);
      d.setUTCDate(d.getUTCDate() + 1);
    }
    return { keys: outK, labels: outK.map(fmt.dayShort), values: outV };
  }

  /* ---------------- Tarih aralığı denetleyicisi (GA4 / Meta / Google Ads) ----------------
     Mevcut sözleşme: widget → {action:'changeRange', range:'7'|'30'|'all'};
     Velo yalnızca güncel aralığın verisini {..., rangeLabel, rangeKey} olarak geri yollar.
     Ek koruma: bekleyen bir seçim varken farklı rangeKey ile gelen geç yanıt çizilmez.
     Yanıt gelmezse (varsayılan 30 sn) eski veri soluk kalır ve tekrar deneme sunulur. */
  var RANGES_BASE = [{ key: '7', label: '7 gün' }, { key: '30', label: '30 gün' }, { key: 'all', label: 'Tüm zamanlar' }];
  function rangeController(o) {
    /* V2.2: reklam platformlarında uzun dönem "3 yıl" (1095 gün); GA4'te "Tüm zamanlar". Anahtar 'all' aynı kalır. */
    var RANGES = o.allLabel ? [RANGES_BASE[0], RANGES_BASE[1], { key: 'all', label: o.allLabel }] : RANGES_BASE;
    var st = { current: o.initial || '7', pending: null, timer: 0, hasData: false };
    function setPressed(key) { o.root.querySelectorAll('[data-range]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-range') === key)); }); }
    function request(key) {
      st.pending = key; setPressed(key);
      if (o.onPending) o.onPending(key);
      clearTimeout(st.timer);
      st.timer = setTimeout(function () { if (st.pending === key && o.onTimeout) o.onTimeout(key); }, cfg.responseTimeoutMs);
      (o.send || bridge.send)({ action: 'changeRange', range: key });
    }
    /* İlk yanıt hiç gelmezse (Velo hata yakalayıp mesaj göndermediğinde) sonsuz yükleme yerine durum göster. */
    st.timer = setTimeout(function () { if (!st.hasData && !st.pending && o.onInitialTimeout) o.onInitialTimeout(st.current); }, cfg.responseTimeoutMs);
    o.root.addEventListener('click', function (e) {
      var b = e.target.closest('[data-range]'); if (!b) return;
      var key = b.getAttribute('data-range');
      if (key === st.current && !st.pending && st.hasData) return;
      request(key);
    });
    return {
      RANGES: RANGES,
      state: st,
      retry: function () { request(st.pending || st.current); },
      /* Gelen yük kabul edilsin mi? */
      accept: function (d) {
        var k = d.rangeKey || '7';
        if (st.pending) return k === st.pending;
        return k === st.current || !st.hasData;
      },
      isPending: function () { return !!st.pending; },
      done: function (d) { clearTimeout(st.timer); st.current = d.rangeKey || '7'; st.pending = null; st.hasData = true; setPressed(st.current); },
      segHtml: function () { return ui.seg('range', RANGES, st.pending || st.current, 'Tarih aralığı'); }
    };
  }

  /* Aralık seçimi olmayan modüller için ilk veri bekçisi */
  function watchdog(onTimeout) {
    var done = false, t = setTimeout(function () { if (!done) onTimeout(); }, cfg.responseTimeoutMs);
    return function () { done = true; clearTimeout(t); };
  }

  /* ---------------- V2.2 kilit (erişim kodu doğrulanmadan) ----------------
     Velo → embed: { action:'n1iLocked' } / { action:'n1iUnlocked' }. Kilitliyken modül içeriği gizlenir,
     yerine kısa bir bilgi kartı gösterilir; "veri gelmedi" uyarıları kullanıcıya görünmez.
     Kilit yalnızca görünümdür; veri zaten sunucuda oturum olmadan verilmez. */
  (function () {
    var embedded = false;
    function veil() {
      var v = document.querySelector('.n1i-lockveil'); if (v) return v;
      v = document.createElement('div'); v.className = 'n1i-lockveil n1i-glass'; v.setAttribute('role', 'status');
      var T = { summary: 'Genel özet', ga4: 'Google Analytics 4', meta: 'Meta Ads', gads: 'Google Ads', instagram: 'Instagram', sheets: 'İş takip', ai: 'AI rapor asistanı', domain: 'Domain ve lisans', drive: 'Dijital varlık arşivi', glossary: 'Terimler sözlüğü' };
      var name = T[cfg.module] || 'Rapor bölümü';
      v.innerHTML = '<span class="n1i-lockveil__ic" aria-hidden="true">' + icon(T[cfg.module] ? cfg.module : 'info') + '</span><span class="n1i-lockveil__t">' + esc(name) + '</span>' +
        '<span class="n1i-lockveil__s">' + icon('lock') + '<span>Erişim kodundan sonra</span></span>';
      document.body.insertBefore(v, document.body.firstChild); return v;
    }
    noopListener('message', function (e) {
      if (embedded && e.source !== window.parent) return;
      if (cfg.allowedOrigins.length && cfg.allowedOrigins.indexOf(e.origin) === -1) return;
      var d = e.data; if (!d || typeof d !== 'object') return;
      if (d.action === 'n1iLocked') { veil(); document.documentElement.classList.add('n1i-locked'); }
      else if (d.action === 'n1iUnlocked') { document.documentElement.classList.remove('n1i-locked'); }
      else return;
      setTimeout(function () { height.now(); }, 0);
    });
  })();

  /* ---------------- Tema (merkezi protokol) ----------------
     - Varsayılan: AÇIK. prefers-color-scheme okunmaz.
     - Tema seçimi bileşende saklanmaz. Sahibi Wix sayfa kodudur (Velo): tercihi saklar ve
       bütün embed'lere { action:'n1iTheme', theme } gönderir.
     - Embed açılışta { action:'n1iThemeRequest' } ister; ~450 ms içinde yanıt gelmezse açık temada kalır.
     - Değiştirme isteği yalnızca çalışma alanı embed'inden gider: { action:'n1iSetTheme', theme }.
     - Tema değişimi DOM'u yeniden çizmez, veri istemez; yalnızca token ve grafik renkleri değişir. */
  var theme = (function () {
    var de = document.documentElement, listeners = [], current = 'light', first = true, waitTimer = 0;
    de.setAttribute('data-theme', 'light');
    var embedded = false;
    if (embedded && cfg.themeWait !== false) {
      de.classList.add('n1i-theme-wait');
      waitTimer = setTimeout(function () { de.classList.remove('n1i-theme-wait'); first = false; }, cfg.themeWaitMs || 450);
    }
    function apply(t, opts) {
      t = t === 'dark' ? 'dark' : 'light';
      var changed = t !== current;
      var animate = changed && !first && motion.allowed() && !(opts && opts.instant);
      if (animate) { de.classList.add('n1i-theme-anim'); clearTimeout(apply._t); apply._t = setTimeout(function () { de.classList.remove('n1i-theme-anim'); }, 420); }
      current = t;
      de.setAttribute('data-theme', t);
      clearTimeout(waitTimer); de.classList.remove('n1i-theme-wait'); first = false;
      if (changed) {
        charts.retheme();
        listeners.forEach(function (fn) { try { fn(t); } catch (e) {} });
      }
    }
    noopListener('message', function (e) {
      if (embedded && e.source !== window.parent) return;
      if (cfg.allowedOrigins.length && cfg.allowedOrigins.indexOf(e.origin) === -1) return;
      var d = e.data;
      if (!d || typeof d !== 'object' || d.action !== 'n1iTheme' || (d.theme !== 'light' && d.theme !== 'dark')) return;
      apply(d.theme);
    });
    if (embedded) window.parent.postMessage({ action: 'n1iThemeRequest', module: cfg.module }, bridge.parentOrigin());
    return {
      get: function () { return current; },
      onChange: function (fn) { listeners.push(fn); },
      /* Yalnızca çalışma alanı embed'i çağırır: isteği sahibine (Velo) iletir, kendisi uygulamaz. */
      request: function (t) { return bridge.send({ action: 'n1iSetTheme', theme: t === 'dark' ? 'dark' : 'light', module: cfg.module }); },
      _apply: apply
    };
  })();

  /* ---------------- Segment kontrolü: kayan gösterge ----------------
     Seçili düğmenin altına tek bir gösterge yerleşir. GSAP varsa 240 ms kayar; yoksa
     doğrudan konumlanır. Hareket azaltmada animasyon yok. */
  var seg = {
    sync: function (scope, animate, onlyChanged) {
      (scope || document).querySelectorAll('.n1i-seg').forEach(function (s) {
        var btn = s.querySelector('[aria-pressed="true"]');
        var key = btn ? Array.prototype.indexOf.call(s.querySelectorAll('.n1i-seg__btn'), btn) + ':' + btn.offsetWidth : 'none';
        if (onlyChanged && s.getAttribute('data-ind-key') === key) return;
        s.setAttribute('data-ind-key', key);
        var ind = s.querySelector('.n1i-seg__ind');
        if (!ind) { ind = document.createElement('span'); ind.className = 'n1i-seg__ind'; ind.setAttribute('aria-hidden', 'true'); s.insertBefore(ind, s.firstChild); }
        if (!btn || !btn.offsetWidth) { s.classList.remove('has-ind'); return; }
        var to = { x: btn.offsetLeft - 4, width: btn.offsetWidth };
        s.classList.add('has-ind');
        var g = window.gsap;
        if (animate && g && motion.allowed() && s.getAttribute('data-ind-ready')) g.to(ind, { x: to.x, width: to.width, duration: 0.24, ease: 'power3.out', overwrite: true });
        else { if (g) g.set(ind, { x: to.x, width: to.width }); else { ind.style.transform = 'translateX(' + to.x + 'px)'; ind.style.width = to.width + 'px'; } }
        s.setAttribute('data-ind-ready', '1');
      });
    }
  };
  listenWindow('resize', function () { clearTimeout(seg._t); seg._t = setTimeout(function () { seg.sync(document, false); }, 80); });
  document.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('.n1i-seg__btn') : null;
    if (b) requestAnimationFrame(function () { seg.sync(b.closest('.n1i-seg').parentNode, true); });
  });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { seg.sync(document, false); });

  runtime.N1I = {
    version: VERSION, cdn: CDN, cfg: cfg, fmt: fmt, esc: esc, icon: icon, bridge: bridge, height: height,
    motion: motion, charts: charts, ui: ui, header: header, fitNumbers: fitNumbers, alignDays: alignDays, loadScript: loadScript, DASH: DASH, rangeController: rangeController, RANGES: RANGES_BASE, watchdog: watchdog, theme: theme, seg: seg
  };
})();

runtime.N1I_MODULES = Object.create(null);
runtime.N1I_MODULES['ads'] = function(moduleN, document) {
/* 1N INTELLIGENCE — Reklam modülü: Meta Ads (#html5) ve Google Ads (#html17)
   Aynı tasarım, ayrı veri kaynağı. Hangi platformun çizileceği N1I_CONFIG.module ile seçilir ('meta' | 'gads').
   Sözleşme (değişmedi):
     Velo → widget: { campaigns:[...], daily:[...], campaignsError, dailyError, rangeLabel, rangeKey }
       Meta campaigns: { campaign_id, campaign_name, impressions, clicks, ctr(%), spend, cpc, actions:[{action_type,value}], action_values:[...] } (sayılar metin)
       Meta daily: { date_start:'YYYY-MM-DD', impressions, clicks, spend, actions }
       Google campaigns: { campaign_id, campaign_name, impressions, clicks, ctr(oran 0–1), spend, cpc, conversions, conversionsValue }
       Google daily: { date:'YYYY-MM-DD', impressions, clicks, spend }
     widget → Velo: { action:'changeRange', range:'7'|'30'|'all' } */
(function () {
  'use strict';
  var N = moduleN, f = N.fmt, esc = N.esc, ui = N.ui;
  var root = document.getElementById('n1i-root');
  var isMeta = N.cfg.module === 'meta';
  var P = isMeta ? {
    key: 'meta', title: 'Meta Ads', icon: 'meta', source: 'Meta Marketing API (Insights)',
    dayKey: function (r) { return r.date_start; },
    ctrRatio: function (c) { return c.ctr !== undefined && c.ctr !== null && c.ctr !== '' ? Number(c.ctr) / 100 : null; },
    clicksLabel: 'Tıklama (tümü)',
    clicksTip: '<b>Tıklama (tümü)</b>: Meta\'nın <i>clicks</i> alanı. Bağlantı tıklamalarının yanında profil, beğeni, genişletme gibi tıklamaları da içerir. Bağlantı tıklaması ayrıca gösterilir (varsa).'
  } : {
    key: 'gads', title: 'Google Ads', icon: 'gads', source: 'Google Ads API (GAQL)',
    dayKey: function (r) { return r.date; },
    ctrRatio: function (c) { return c.ctr !== undefined && c.ctr !== null && c.ctr !== '' ? Number(c.ctr) : null; },
    clicksLabel: 'Tıklama',
    clicksTip: '<b>Tıklama</b>: Google Ads <i>metrics.clicks</i>. Reklama yapılan tıklamalar.'
  };

  /* Meta eylem türleri: yalnızca açıkça tanımlı olanlar gösterilir; hepsi toplanmaz.
     Satın alma için Meta aynı olayı birden çok türde döndürebildiği için ilk bulunan TEK tür kullanılır. */
  var META_ACTIONS = [
    { id: 'msg', label: 'Mesajlaşma başlatma', types: ['onsite_conversion.messaging_conversation_started_7d'], tip: '<b>Mesajlaşma başlatma</b>: Reklamdan başlatılan Messenger / Instagram DM / WhatsApp konuşmaları (Meta, 7 günlük ilişkilendirme). Satış anlamına gelmez.' },
    { id: 'purchase', label: 'Satın alma (Pixel / Meta)', types: ['omni_purchase', 'purchase', 'offsite_conversion.fb_pixel_purchase'], value: true, tip: '<b>Satın alma</b>: Meta\'nın raporladığı satın alma olayları (site Pixel\'i / Conversions API). DM ve WhatsApp üzerinden yapılan satışları içermez; işletmenin toplam satışı değildir.' },
    { id: 'lead', label: 'Potansiyel müşteri', types: ['lead', 'onsite_conversion.lead_grouped', 'offsite_conversion.fb_pixel_lead'], tip: '<b>Potansiyel müşteri</b>: Form doldurma (Lead) olayları.' },
    { id: 'link', label: 'Bağlantı tıklaması', types: ['link_click'], tip: '<b>Bağlantı tıklaması</b>: Reklamdaki bağlantıya yapılan tıklamalar (Meta link_click).' }
  ];
  function pickAction(list, types) {
    if (!Array.isArray(list)) return null;
    for (var i = 0; i < types.length; i++) {
      for (var j = 0; j < list.length; j++) if (list[j] && list[j].action_type === types[i]) return Number(list[j].value) || 0;
    }
    return null;
  }

  var trendChart = null, metric = 'spend', sortKey = 'spend', sortDir = -1, last = null, showTable = false;
  var ctrl = N.rangeController({
    root: root,
    allLabel: '3 yıl',
    onPending: function () { var b = root.querySelector('[data-body]'); if (b) b.classList.add('is-stale'); setLoading(true); },
    onInitialTimeout: function () { setLoading(false); root.querySelector('[data-body]').innerHTML = ui.state('warn', P.title + ' verisi gelmedi', 'Sayfa kodu bu bölüme veri göndermedi. Wix sayfa kodu hata yakaladığında bölüme mesaj göndermiyor; bağlantı da yavaş olabilir.', '<button type="button" class="n1i-btn n1i-btn--sm" data-retry>' + N.icon('refresh') + 'Tekrar iste</button>'); N.height.schedule(); },
    onTimeout: function () { setLoading(false); banner('error', 'Yeni aralığın verisi gelmedi', 'Ekrandaki sayılar önceki seçime aittir.', true); }
  });

  function shell() {
    root.innerHTML = '<section class="n1i-module" aria-labelledby="ads-title">' +
      N.header({ icon: P.icon, tone: isMeta ? 'sky' : 'sand', title: P.title, meta: ['<span id="ads-range">Son 7 gün</span>', '<span>Kaynak: ' + esc(P.source) + '</span>', '<span id="ads-status"></span>', '<span id="ads-recv" class="n1i-loading-line"><span class="n1i-spin"></span>Yükleniyor…</span>', ui.demoChip()], tools: ctrl.segHtml() }) +
      '<div data-banner></div><div data-body>' + ui.skelKpis(4) + '<div class="n1i-grid"><div class="n1i-col-12">' + ui.skelPanel(220) + '</div></div></div></section>';
    root.querySelector('h2').id = 'ads-title';
  }
  function setLoading(on) { var el = document.getElementById('ads-recv'); if (el) el.innerHTML = on ? '<span class="n1i-spin"></span>Yükleniyor…' : (last ? esc(last.recv) : ''); }
  function banner(kind, title, text, retry) {
    root.querySelector('[data-banner]').innerHTML = '<div class="n1i-banner">' + ui.state(kind, title, text, retry ? '<button type="button" class="n1i-btn n1i-btn--sm" data-retry>' + N.icon('refresh') + 'Tekrar dene</button>' : '') + '</div>';
    N.height.schedule();
  }
  function errText(e) { if (!e) return null; if (typeof e === 'string') return e; return e.message || e.status || e.error_user_msg || 'API hatası'; }

  function aggregate(campaigns) {
    var t = { impressions: 0, clicks: 0, spend: 0, conversions: 0, convValue: 0, actions: {}, actionValues: {} };
    var hasConv = false;
    campaigns.forEach(function (c) {
      t.impressions += Number(c.impressions) || 0;
      t.clicks += Number(c.clicks) || 0;
      t.spend += Number(c.spend) || 0;
      if (isMeta) {
        META_ACTIONS.forEach(function (a) {
          var v = pickAction(c.actions, a.types);
          if (v !== null) t.actions[a.id] = (t.actions[a.id] || 0) + v;
          if (a.value) { var vv = pickAction(c.action_values, a.types); if (vv !== null) t.actionValues[a.id] = (t.actionValues[a.id] || 0) + vv; }
        });
      } else {
        if (c.conversions !== undefined && c.conversions !== null) { hasConv = true; t.conversions += Number(c.conversions) || 0; t.convValue += Number(c.conversionsValue) || 0; }
      }
    });
    t.hasConv = hasConv;
    t.ctr = t.impressions > 0 ? t.clicks / t.impressions : null;
    t.cpc = t.clicks > 0 ? t.spend / t.clicks : null;
    t.cpm = t.impressions > 0 ? t.spend / t.impressions * 1000 : null;
    return t;
  }

  function render(d) {
    ctrl.done(d);
    root.querySelector('[data-banner]').innerHTML = '';
    var first = !last;
    last = { data: d, recv: ui.received() };
    setLoading(false);
    var rEl = document.getElementById('ads-range'); rEl.textContent = ui.rangeText(d, 'son 1095 gün'); rEl.title = ui.rangeTitle(d);

    var cErr = errText(d.campaignsError), dErr = errText(d.dailyError);
    var campaigns = Array.isArray(d.campaigns) ? d.campaigns : [];
    var daily = Array.isArray(d.daily) ? d.daily : [];
    var t = aggregate(campaigns);

    // Durum: bugün gösterim var mı? (günlük veri yoksa durum gösterilmez)
    var st = document.getElementById('ads-status');
    if (!dErr && daily.length) {
      var today = f.todayISO();
      var row = daily.filter(function (r) { return P.dayKey(r) === today; })[0];
      var live = !!(row && Number(row.impressions) > 0);
      st.innerHTML = live ? ui.chip('pos', 'Bugün gösterim var', 'ok') : ui.chip('', 'Bugün gösterim yok', 'clock');
    } else st.innerHTML = '';

    var body = root.querySelector('[data-body]');
    body.classList.remove('is-stale');
    var html = '';
    if (cErr && dErr) {
      body.innerHTML = ui.state('error', P.title + ' verisi alınamadı', 'Kampanya ve günlük sorgular hata döndürdü (' + esc(cErr) + '). Ekranda sıfır gösterilmez; bu bir veri alınamama durumudur.', '<button type="button" class="n1i-btn n1i-btn--sm" data-retry>' + N.icon('refresh') + 'Tekrar dene</button>');
      N.height.schedule(); return;
    }
    if (cErr) html += '<div class="n1i-banner">' + ui.state('warn', 'Kısmi veri', 'Kampanya kırılımı alınamadı (' + esc(cErr) + '). Özet kartlar kampanyalardan hesaplandığı için gösterilmiyor; günlük grafik hesap seviyesindeki veriden çizilir.') + '</div>';
    if (!cErr) {
      var kp = [
        ui.kpi({ id: 'a-spend', label: 'Harcama', value: f.money(t.spend), compact: f.moneyShort(t.spend), tip: '<b>Harcama</b>: Seçilen aralıkta reklamlara harcanan tutar (platformun raporladığı, hesap para birimi TL kabul edilmiştir).' }),
        ui.kpi({ id: 'a-impr', label: 'Gösterim', value: f.int(t.impressions), compact: f.compact(t.impressions), tip: '<b>Gösterim</b>: Reklamların ekranda görüntülenme sayısı.' }),
        ui.kpi({ id: 'a-clicks', label: P.clicksLabel, value: f.int(t.clicks), compact: f.compact(t.clicks), tip: P.clicksTip }),
        ui.kpi({ label: 'CTR', value: f.pctRatio(t.ctr, 2), foot: t.ctr === null ? 'Gösterim yok' : 'tıklama ÷ gösterim', tip: '<b>CTR</b>: Toplam tıklama ÷ toplam gösterim. Kampanya oranlarının ortalaması değildir.' }),
        ui.kpi({ label: isMeta ? 'CPC (tümü)' : 'Ort. TBM (CPC)', value: f.money(t.cpc), compact: f.moneyShort(t.cpc), foot: t.cpc === null ? 'Tıklama yok' : 'harcama ÷ tıklama', tip: '<b>CPC</b>: Toplam harcama ÷ toplam tıklama.' }),
        ui.kpi({ label: 'CPM', value: f.money(t.cpm), compact: f.moneyShort(t.cpm), foot: t.cpm === null ? 'Gösterim yok' : '1.000 gösterim başına', tip: '<b>CPM</b>: 1.000 gösterim başına maliyet = harcama ÷ gösterim × 1.000.' })
      ];
      if (!isMeta) {
        kp.push(ui.kpi({ label: 'Dönüşüm (platform)', value: t.hasConv ? f.dec1(t.conversions) : N.DASH, foot: 'Google Ads\'in raporladığı', tip: '<b>Dönüşüm</b>: Google Ads\'te tanımlı dönüşüm işlemleri. Kesirli olabilir (veriye dayalı ilişkilendirme). İşletmenin toplam satışı değildir.' }));
        kp.push(ui.kpi({ label: 'Dönüşüm değeri (platform)', value: t.hasConv ? f.money(t.convValue) : N.DASH, foot: 'ROAS hesaplanmaz', tip: '<b>Dönüşüm değeri</b>: Dönüşümlere Google Ads\'te atanmış değerlerin toplamı. Gerçek ciro değildir; mağaza, telefon ve DM satışlarını içermez.' }));
      }
      html += '<div class="n1i-kpis n1i-kpis--strip' + (isMeta ? ' n1i-kpis--6' : '') + '" style="--n1i-kpi-desktop:' + (isMeta ? 6 : 4) + '">' + kp.join('') + '</div>';
      if (isMeta) html += actionsPanel(t);
    }
    html += '<div class="n1i-grid"><div class="n1i-panel n1i-col-12" data-trend></div>' + (cErr ? '' : '<div class="n1i-panel n1i-col-12 n1i-responsive-table" data-campaigns></div>') + '</div>';

    // Hesap seviyesindeki günlük toplam ile kampanya toplamı farkı (Meta: silinmiş/arşivlenmiş kampanyalar listede yok)
    var dailySpend = daily.reduce(function (a, r) { return a + (Number(r.spend) || 0); }, 0);
    var foot = [];
    if (!cErr && !dErr && daily.length && Math.abs(dailySpend - t.spend) > Math.max(1, t.spend * 0.01)) {
      foot.push('Günlük grafikteki hesap toplamı ' + f.money(dailySpend) + ', kampanya tablosunun toplamı ' + f.money(t.spend) + '. Fark, listeden çıkarılan silinmiş/arşivlenmiş kampanyalardan veya saat dilimi farkından kaynaklanabilir.');
    }
    foot.push(isMeta ? 'Meta ve Google Ads metrik tanımları birebir aynı değildir; iki platformun sayıları doğrudan toplanmamalıdır.' : 'Tarih aralığı Wix sayfa kodunda UTC tarihiyle hesaplanır; Google Ads hesabının saat dilimine göre gün sınırı farklı olabilir.');
    foot.push('DM ve WhatsApp üzerinden yapılan satışlar reklam platformu verisine yansımayabilir; bu nedenle ROAS veya kesin yatırım getirisi hesaplanmaz.');
    html += '<div class="n1i-foot">' + foot.map(function (x) { return '<p>' + esc(x) + '</p>'; }).join('') + '</div>';
    body.innerHTML = html;

    if (first && !cErr) {
      N.motion.count(document.querySelector('#a-impr [data-v]'), t.impressions, f.int);
      N.motion.count(document.querySelector('#a-clicks [data-v]'), t.clicks, f.int);
    }
    renderTrend(daily, dErr);
    if (!cErr) renderCampaigns(campaigns, t);
    if (first) N.motion.enter(root.querySelectorAll('.n1i-kpi, .n1i-panel'));
    N.height.schedule();
  }

  function actionsPanel(t) {
    var found = META_ACTIONS.filter(function (a) { return t.actions[a.id] !== undefined; });
    var head = '<div class="n1i-subhead"><h3 class="n1i-h2">Platformun bildirdiği eylemler</h3><p class="n1i-panel__sub">Yalnızca API yanıtında açıkça tanımlı eylem türleri</p></div>';
    if (!found.length) return head + ui.state('empty', 'Bu aralıkta tanımlı bir dönüşüm eylemi yok', 'Mesajlaşma, satın alma, form veya bağlantı tıklaması eylemi raporlanmadı.');
    var n = found.length + (t.actionValues.purchase !== undefined ? 1 : 0);
    return head + '<div class="n1i-kpis n1i-kpis--strip n1i-kpis--soft" style="--n1i-kpi-desktop:' + Math.min(4, n) + '">' +
      found.map(function (a) { return ui.kpi({ label: a.label, value: f.int(t.actions[a.id]), compact: f.compact(t.actions[a.id]), tip: a.tip }); }).join('') +
      (t.actionValues.purchase !== undefined ? ui.kpi({ label: 'Satın alma değeri (Pixel)', value: f.money(t.actionValues.purchase), compact: f.moneyShort(t.actionValues.purchase), foot: 'Gerçek ciro değildir', tip: '<b>Satın alma değeri</b>: Pixel / Conversions API ile gönderilen satın alma tutarları. DM, WhatsApp ve mağaza satışlarını içermez.' }) : '') +
      '</div>';
  }

  var METRICS = [{ key: 'spend', label: 'Harcama' }, { key: 'clicks', label: 'Tıklama' }, { key: 'impressions', label: 'Gösterim' }];
  function renderTrend(daily, dErr) {
    var el = root.querySelector('[data-trend]'); if (!el) return;
    var head = '<div class="n1i-panel__head" style="flex-wrap:wrap"><div><h3 class="n1i-h2">Günlük ' + esc(METRICS.filter(function (m) { return m.key === metric; })[0].label.toLowerCase()) + '</h3><div class="n1i-panel__sub">Hesap seviyesi · gün bazında</div></div>' +
      '<div style="display:flex;gap:8px;flex-wrap:wrap">' + ui.seg('metric', METRICS, metric, 'Grafikte gösterilen metrik') + '<button type="button" class="n1i-btn n1i-btn--sm n1i-btn--ghost" data-toggle-table aria-pressed="' + showTable + '">' + N.icon(showTable ? 'chart' : 'table') + (showTable ? 'Grafik' : 'Tablo') + '</button></div></div>';
    if (trendChart) { trendChart.destroy(); trendChart = null; }
    if (dErr) { el.innerHTML = head + ui.state('error', 'Günlük veri alınamadı', esc(dErr)); return; }
    if (!daily.length) { el.innerHTML = head + ui.state('empty', 'Bu aralıkta günlük veri yok', 'Reklam yayınlanmadıysa platform gün satırı döndürmez.'); return; }
    var al = N.alignDays(daily, P.dayKey, function (r) { return { spend: Number(r.spend) || 0, clicks: Number(r.clicks) || 0, impressions: Number(r.impressions) || 0 }; }, { spend: 0, clicks: 0, impressions: 0 });
    var vals = al.values.map(function (v) { return v[metric]; });
    var isMoney = metric === 'spend';
    var fmtV = isMoney ? f.money : f.int;
    var todayKey = f.todayISO().replace(/-/g, ''), partial = al.keys[al.keys.length - 1] === todayKey;
    var tot = vals.reduce(function (a, b) { return a + b; }, 0);
    var summary = 'Toplam ' + fmtV(tot) + '. Ortalama günlük ' + fmtV(tot / (vals.length || 1)) + '.' + (partial ? ' Bugün henüz tamamlanmadı (kesikli).' : '') + ' Kayıt olmayan günler 0 olarak çizilir.';
    if (showTable) {
      el.innerHTML = head + '<div class="n1i-tablewrap" tabindex="0" role="region" aria-label="Günlük veri tablosu" style="max-height:320px"><table class="n1i-table"><thead><tr><th scope="col">Gün</th><th class="is-num" scope="col">Harcama</th><th class="is-num" scope="col">Tıklama</th><th class="is-num" scope="col">Gösterim</th></tr></thead><tbody>' +
        al.keys.map(function (k, i) { var v = al.values[i]; return '<tr><td>' + f.dayLong(k) + '</td><td class="is-num">' + f.money(v.spend) + '</td><td class="is-num">' + f.int(v.clicks) + '</td><td class="is-num">' + f.int(v.impressions) + '</td></tr>'; }).join('') +
        '</tbody></table></div><p class="n1i-summary-text">' + esc(summary) + '</p>';
      N.height.schedule(); return;
    }
    el.innerHTML = head + '<div class="n1i-chartbox"><canvas role="img" aria-label="' + esc('Günlük ' + metric + ' çizgi grafiği. ' + summary) + '"></canvas></div><p class="n1i-summary-text">' + esc(summary) + '</p>';
    N.charts.load().then(function (Chart) {
      var cv = el.querySelector('canvas'); if (!cv) return;
      var colVar = isMoney ? '--n1i-c1' : (metric === 'clicks' ? '--n1i-c2' : '--n1i-c3');
      trendChart = N.charts.create(cv, function () { var c = N.charts.color; return {
        type: 'line',
        data: { labels: al.labels, datasets: [{ label: METRICS.filter(function (m) { return m.key === metric; })[0].label, data: vals, borderColor: c(colVar), backgroundColor: isMoney ? N.charts.areaFill('--n1i-c1-fill') : 'transparent', fill: isMoney ? 'origin' : false, pointBackgroundColor: c('--n1i-surface'), pointBorderColor: c(colVar), pointBorderWidth: 2, borderWidth: 2.5, pointRadius: 0, pointHoverRadius: 5, tension: 0.35, segment: { borderDash: function (ctx) { return partial && ctx.p1DataIndex === vals.length - 1 ? [4, 4] : undefined; } } }] },
        options: {
          scales: { x: N.charts.axis({ grid: { display: false }, ticks: { color: c('--n1i-muted'), maxRotation: 0, autoSkip: true, maxTicksLimit: 8, font: { size: 12.5, weight: '500' } } }), y: N.charts.axis({ beginAtZero: true, ticks: { color: c('--n1i-muted'), maxTicksLimit: 5, callback: function (v) { return isMoney ? f.moneyShort(v) : f.compact(v); }, font: { size: 12.5, weight: '500' } } }) },
          plugins: { tooltip: { callbacks: { title: function (it) { return f.dayLong(al.keys[it[0].dataIndex]); }, label: function (it) { return ' ' + it.dataset.label + ': ' + fmtV(it.parsed.y); } } } }
        }
      }; });
    }, function () { showTable = true; renderTrend(daily, dErr); });
    N.height.schedule();
  }

  function campaignRow(c) {
    var r = { name: c.campaign_name || '(adsız kampanya)', spend: Number(c.spend) || 0, impressions: Number(c.impressions) || 0, clicks: Number(c.clicks) || 0 };
    r.ctr = r.impressions > 0 ? r.clicks / r.impressions : null;
    r.cpc = r.clicks > 0 ? r.spend / r.clicks : null;
    if (isMeta) { r.msg = pickAction(c.actions, META_ACTIONS[0].types); r.purchase = pickAction(c.actions, META_ACTIONS[1].types); }
    else { r.conv = c.conversions === undefined || c.conversions === null ? null : Number(c.conversions); }
    return r;
  }
  function renderCampaigns(campaigns, t) {
    var el = root.querySelector('[data-campaigns]'); if (!el) return;
    var head = '<div class="n1i-panel__head"><div><h3 class="n1i-h2">Kampanyalar</h3><div class="n1i-panel__sub">' + f.int(campaigns.length) + ' kampanya · sıralamak için sütun başlığına dokunun</div></div></div>';
    if (!campaigns.length) { el.innerHTML = head + ui.state('empty', 'Bu aralıkta harcama yapan kampanya yok', 'Platform bu aralık için kampanya satırı döndürmedi.'); return; }
    var rows = campaigns.map(campaignRow);
    rows.sort(function (a, b) { var x = a[sortKey], y = b[sortKey]; if (sortKey === 'name') return sortDir * String(x).localeCompare(String(y), 'tr'); return sortDir * ((x === null ? -1 : x) - (y === null ? -1 : y)); });
    var cols = [{ k: 'name', l: 'Kampanya' }, { k: 'spend', l: 'Harcama', n: 1 }, { k: 'impressions', l: 'Gösterim', n: 1 }, { k: 'clicks', l: P.clicksLabel, n: 1 }, { k: 'ctr', l: 'CTR', n: 1 }, { k: 'cpc', l: 'CPC', n: 1 }];
    if (isMeta) { cols.push({ k: 'msg', l: 'Mesaj başlatma', n: 1 }); cols.push({ k: 'purchase', l: 'Satın alma', n: 1 }); } else cols.push({ k: 'conv', l: 'Dönüşüm', n: 1 });
    function cell(r, k) {
      if (k === 'spend' || k === 'cpc') return f.money(r[k]);
      if (k === 'ctr') return f.pctRatio(r[k], 2);
      if (k === 'conv') return r.conv === null ? N.DASH : f.dec1(r.conv);
      if (k === 'msg' || k === 'purchase') return r[k] === null ? N.DASH : f.int(r[k]);
      return f.int(r[k]);
    }
    var th = cols.map(function (c) {
      var s = sortKey === c.k ? (sortDir < 0 ? 'descending' : 'ascending') : null;
      return '<th scope="col"' + (c.n ? ' class="is-num"' : '') + (s ? ' aria-sort="' + s + '"' : '') + '><button type="button" class="n1i-th-btn" data-sort="' + c.k + '"' + (s ? ' aria-sort="' + s + '"' : '') + '>' + esc(c.l) + (s ? N.icon(sortDir < 0 ? 'down' : 'up', 'n1i-sorticon') : '') + '</button></th>';
    }).join('');
    var tb = rows.map(function (r) { return '<tr>' + cols.map(function (c) { return c.k === 'name' ? '<td class="is-name">' + esc(r.name) + '</td>' : '<td class="is-num">' + cell(r, c.k) + '</td>'; }).join('') + '</tr>'; }).join('');
    var tf = '<tr><td>Toplam</td><td class="is-num">' + f.money(t.spend) + '</td><td class="is-num">' + f.int(t.impressions) + '</td><td class="is-num">' + f.int(t.clicks) + '</td><td class="is-num">' + f.pctRatio(t.ctr, 2) + '</td><td class="is-num">' + f.money(t.cpc) + '</td>' +
      (isMeta ? '<td class="is-num">' + (t.actions.msg !== undefined ? f.int(t.actions.msg) : N.DASH) + '</td><td class="is-num">' + (t.actions.purchase !== undefined ? f.int(t.actions.purchase) : N.DASH) + '</td>' : '<td class="is-num">' + (t.hasConv ? f.dec1(t.conversions) : N.DASH) + '</td>') + '</tr>';
    var cards = rows.map(function (r) {
      var extra = isMeta ? '<div><dt>Mesaj</dt><dd>' + cell(r, 'msg') + '</dd></div><div><dt>Satın alma</dt><dd>' + cell(r, 'purchase') + '</dd></div>' : '<div><dt>Dönüşüm</dt><dd>' + cell(r, 'conv') + '</dd></div>';
      return '<li class="n1i-ccard"><div class="n1i-ccard__name">' + esc(r.name) + '</div><dl><div><dt>Harcama</dt><dd>' + cell(r, 'spend') + '</dd></div><div><dt>Gösterim</dt><dd>' + cell(r, 'impressions') + '</dd></div><div><dt>Tıklama</dt><dd>' + cell(r, 'clicks') + '</dd></div><div><dt>CTR</dt><dd>' + cell(r, 'ctr') + '</dd></div><div><dt>CPC</dt><dd>' + cell(r, 'cpc') + '</dd></div>' + extra + '</dl></li>';
    }).join('');
    el.innerHTML = head + '<div class="n1i-tablewrap" tabindex="0" role="region" aria-label="Kampanya tablosu"><table class="n1i-table"><thead><tr>' + th + '</tr></thead><tbody>' + tb + '</tbody><tfoot>' + tf + '</tfoot></table></div><ul class="n1i-cards" aria-label="Kampanyalar">' + cards + '</ul>';
  }

  root.addEventListener('click', function (e) {
    var m = e.target.closest('[data-metric]');
    if (m && last) { metric = m.getAttribute('data-metric'); renderTrend(last.data.daily || [], errText(last.data.dailyError)); return; }
    var s = e.target.closest('[data-sort]');
    if (s && last) { var k = s.getAttribute('data-sort'); if (sortKey === k) sortDir = -sortDir; else { sortKey = k; sortDir = k === 'name' ? 1 : -1; } renderCampaigns(last.data.campaigns || [], aggregate(last.data.campaigns || [])); var nb = root.querySelector('[data-sort="' + k + '"]'); if (nb) nb.focus(); N.height.schedule(); return; }
    if (e.target.closest('[data-toggle-table]') && last) { showTable = !showTable; renderTrend(last.data.daily || [], errText(last.data.dailyError)); return; }
    if (e.target.closest('[data-retry]')) { root.querySelector('[data-banner]').innerHTML = ''; ctrl.retry(); }
  });

  shell();
  N.height.start(root);
  N.bridge.listen(function (d) { if (!ctrl.accept(d)) return; render(d); }, {
    accept: function (d) { return Array.isArray(d.campaigns) && (!d.rangeKey || /^(7|30|all)$/.test(d.rangeKey)); },
    kind: function (d) { return 'r' + (d.rangeKey || '7'); },
    dedupe: function () { return !ctrl.isPending(); },
    onError: function () { banner('error', 'Görüntüleme hatası', 'Gelen veri beklenen biçimde değil.'); }
  });
})();

};
runtime.N1I_MODULES['ai'] = function(moduleN, document) {
/* 1N INTELLIGENCE — AI Rapor Asistanı (#html16)
   Sözleşme (değişmedi):
     widget → Velo: { action:'askAI', question }
     Velo → widget: { action:'aiAnswer', answer }
   Velo, getAIAnswer() için sayfadaki dashboardContext nesnesini kullanır; bu bileşen veri bağlamı göndermez,
   API anahtarı tutmaz. Analiz yalnızca mevcut backend üzerinden yapılır.
   Ek koruma: tek seferde bir soru; yanıt beklenmiyorken gelen aiAnswer yok sayılır; 60 sn içinde yanıt
   gelmezse hata ve tekrar deneme; bilinen hata metinleri hata olarak gösterilir. */
(function () {
  'use strict';
  var N = moduleN, esc = N.esc, ui = N.ui;
  var root = document.getElementById('n1i-root');
  var MAX = 500, TIMEOUT = (N.cfg.demo && /[?&]timeout=\d/.test(location.search)) ? N.cfg.responseTimeoutMs : ((N.cfg.options && N.cfg.options.aiTimeoutMs) || 60000);
  var waiting = null, timer = 0, lastQuestion = '', busy = false;
  var ERRORS = ['Bir hata oluştu, lütfen tekrar deneyin.', 'Şu anda cevap veremiyorum, lütfen daha sonra tekrar deneyin.', 'Bağlantı hatası oluştu, lütfen tekrar deneyin.', 'Bir cevap alınamadı.'];
  var SUGGEST = (N.cfg.options && N.cfg.options.suggestions) || [
    'Son 7 günlük reklam performansımı analiz et.',
    'Google Ads ve Meta Ads sonuçlarını karşılaştır.',
    'Web sitemin trafik kaynaklarını değerlendir.',
    'En başarılı kampanyalarımı açıkla.'
  ];

  var MARK = '<span class="n1i-ai__av" aria-hidden="true" translate="no">1N</span>';
  root.innerHTML = '<section class="n1i-module n1i-ai" aria-labelledby="ai-title">' +
    N.header({ icon: 'ai', tone: 'lime', title: 'AI rapor asistanı', meta: ['<span>Bu sayfadaki rapor verileriyle yanıt verir</span>', ui.demoChip()] }) +
    '<div class="n1i-card n1i-ai__card">' +
    '<div class="n1i-ai__intro" id="ai-intro">' + MARK + '<div><p class="n1i-ai__name">1N Asistan</p><p class="n1i-ai__lead">Bu sayfadaki Analytics, Meta Ads, Google Ads, Instagram ve iş takip verileriyle sorularınızı yanıtlar. Veride olmayan bir bilgiyi tahmin etmez.</p></div></div>' +
    '<div class="n1i-ai__log" role="log" aria-live="polite" aria-relevant="additions" aria-label="Sohbet" id="ai-log"></div>' +
    '<div class="n1i-ai__suggest" id="ai-suggest" aria-label="Örnek sorular">' + SUGGEST.map(function (s) { return '<button type="button" class="n1i-ai__chip" data-q="' + esc(s) + '">' + N.icon('chart') + '<span>' + esc(s) + '</span></button>'; }).join('') + '</div>' +
    '<form class="n1i-ai__form n1i-glass" id="ai-form" novalidate><label for="ai-q" class="n1i-sr">Sorunuz</label>' +
    '<textarea id="ai-q" rows="1" maxlength="' + MAX + '" placeholder="Raporlarınızla ilgili bir soru yazın…" autocomplete="off" enterkeyhint="send"></textarea>' +
    '<div class="n1i-ai__bar"><span id="ai-hint">Enter gönderir · Shift+Enter yeni satır</span><span class="n1i-ai__right"><span id="ai-count" class="n1i-num">0 / ' + MAX + '</span>' +
    '<button type="submit" class="n1i-ai__send" id="ai-send" aria-label="Soruyu gönder" disabled>' + N.icon('send') + '</button></span></div></form>' +
    '</div>' +
    '<p class="n1i-summary-text" style="margin-top:12px">Yanıtlar yapay zekâ tarafından üretilir ve yalnızca bu sayfaya yüklenen verilere dayanır. Önemli kararlar öncesinde sayıları ilgili bölümden kontrol edin. DM ve WhatsApp satışları verilerde yer almaz.</p>' +
    '</section>';
  root.querySelector('h2').id = 'ai-title';

  var css = document.createElement('style');
  css.textContent =
    '.n1i-ai__card{display:flex;flex-direction:column;gap:18px}' +
    '.n1i-ai__av{width:34px;height:34px;border-radius:11px;display:grid;place-items:center;flex:none;background:var(--n1i-accent);color:var(--n1i-accent-ink);font-family:var(--n1i-font-display);font-weight:600;font-size:14px;letter-spacing:.02em;box-shadow:inset 0 1px 0 rgba(255,255,255,.5)}' +
    '.n1i-ai__intro{display:flex;gap:14px;align-items:flex-start}' +
    '.n1i-ai__name{margin:2px 0 3px;font-weight:600;font-size:15px}' +
    '.n1i-ai__lead{margin:0;color:var(--n1i-text-2);font-size:15px;line-height:1.6;max-width:68ch}' +
    '.n1i-ai__log{display:flex;flex-direction:column;gap:20px}' +
    '.n1i-ai__log:empty{display:none}' +
    '.n1i-ai__row{display:flex;gap:14px;align-items:flex-start;min-width:0}' +
    '.n1i-ai__row--user{justify-content:flex-end}' +
    '.n1i-ai__body{min-width:0;flex:0 1 auto;max-width:72ch}' +
    '.n1i-ai__meta{display:flex;align-items:baseline;gap:8px;margin:2px 0 4px;font-size:var(--n1i-fs-xs);color:var(--n1i-muted);font-weight:500}' +
    '.n1i-ai__meta b{color:var(--n1i-text);font-size:14px;font-weight:600}' +
    '.n1i-ai__text{font-size:15.5px;line-height:1.68;color:var(--n1i-text);overflow-wrap:anywhere}' +
    '.n1i-ai__text p{margin:0 0 10px}.n1i-ai__text p:last-child{margin:0}' +
    '.n1i-ai__text ul{margin:2px 0 12px;padding-left:20px}.n1i-ai__text li{margin:3px 0}.n1i-ai__text li::marker{color:var(--n1i-accent-text)}' +
    '.n1i-ai__text b{font-weight:600}' +
    '.n1i-ai__bubble{max-width:min(620px,86%);padding:12px 16px;border-radius:20px 20px 6px 20px;background:var(--n1i-bubble-user);color:var(--n1i-bubble-user-text);font-size:15.5px;line-height:1.55;overflow-wrap:anywhere;box-shadow:0 1px 2px rgba(0,0,0,.08),0 8px 20px -8px rgba(0,0,0,.25)}' +
    '.n1i-ai__bubble p{margin:0}' +
    '.n1i-ai__typing{display:inline-flex;align-items:center;gap:10px;color:var(--n1i-text-2);font-size:15px;padding:6px 0}' +
    '.n1i-ai__dots{display:inline-flex;gap:4px}.n1i-ai__dots i{width:6px;height:6px;border-radius:50%;background:var(--n1i-accent-text);opacity:.35;animation:n1i-dot 1.1s ease-in-out infinite}' +
    '.n1i-ai__dots i:nth-child(2){animation-delay:.15s}.n1i-ai__dots i:nth-child(3){animation-delay:.3s}' +
    '@keyframes n1i-dot{0%,80%,100%{opacity:.3;transform:translateY(0)}40%{opacity:1;transform:translateY(-2px)}}' +
    '.n1i-ai__err{border-radius:16px;padding:12px 14px;background:var(--n1i-neg-bg);color:var(--n1i-text);display:flex;gap:10px;align-items:flex-start}' +
    '.n1i-ai__err > svg{width:18px;height:18px;color:var(--n1i-neg);flex:none;margin-top:3px}' +
    '.n1i-ai__err p{margin:0 0 8px}' +
    '.n1i-ai__suggest{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:10px}' +
    '.n1i-ai__chip{appearance:none;display:flex;align-items:center;gap:10px;border:1px solid var(--n1i-line);background:var(--n1i-surface);color:var(--n1i-text);border-radius:16px;padding:12px 14px;font-size:14px;font-weight:500;line-height:1.35;text-align:left;min-height:52px;transition:border-color var(--n1i-dur-fast) var(--n1i-ease),background-color var(--n1i-dur-fast) var(--n1i-ease),transform var(--n1i-dur-fast) var(--n1i-ease)}' +
    '.n1i-ai__chip svg{width:16px;height:16px;flex:none;color:var(--n1i-accent-text)}' +
    '.n1i-ai__chip:hover{border-color:var(--n1i-line-strong);background:var(--n1i-surface-2)}.n1i-ai__chip:active{transform:scale(.99)}' +
    '.n1i-ai__chip:disabled{opacity:.5;cursor:not-allowed}' +
    '.n1i-ai__form{border-radius:24px;padding:10px 10px 10px 16px;display:grid;gap:4px}' +
    '.n1i-ai__form textarea{width:100%;min-height:48px;max-height:180px;resize:none;border:0;background:transparent;color:var(--n1i-text);padding:10px 0 4px;font-size:16px;line-height:1.5;outline:none}' +
    '.n1i-ai__form textarea::placeholder{color:var(--n1i-muted)}' +
    '.n1i-ai__form:focus-within{border-color:var(--n1i-accent-ring);box-shadow:0 0 0 3px var(--n1i-accent-soft),var(--n1i-shadow-glass)}' +
    '.n1i-ai__bar{display:flex;align-items:center;justify-content:space-between;gap:10px;color:var(--n1i-muted);font-size:var(--n1i-fs-xs);font-weight:500}' +
    '.n1i-ai__right{display:inline-flex;align-items:center;gap:12px}' +
    '.n1i-ai__send{width:44px;height:44px;border-radius:50%;border:0;display:grid;place-items:center;background:var(--n1i-ink);color:var(--n1i-on-ink);transition:transform var(--n1i-dur-fast) var(--n1i-ease),opacity var(--n1i-dur-fast) var(--n1i-ease),background-color var(--n1i-dur-fast) var(--n1i-ease)}' +
    '.n1i-ai__send svg{width:18px;height:18px}' +
    '.n1i-ai__send:hover:not(:disabled){background:var(--n1i-ink-hover)}.n1i-ai__send:active:not(:disabled){transform:scale(.94)}' +
    '.n1i-ai__send:disabled{opacity:.32;cursor:not-allowed}' +
    '.n1i-ai__send:focus-visible{outline-offset:3px;border-radius:50%}' +
    '@media (prefers-reduced-motion:reduce){.n1i-ai__dots i{animation:none;opacity:.8}}' +
    '@media (max-width:479px){#ai-hint{display:none}.n1i-ai__bar{justify-content:flex-end}.n1i-ai__row{gap:10px}.n1i-ai__av{width:30px;height:30px;font-size:13px;border-radius:10px}.n1i-ai__text{font-size:15.5px}.n1i-ai__suggest{grid-template-columns:1fr}.n1i-ai__bubble{max-width:92%}}';
  document.head.appendChild(css);

  var intro = document.getElementById('ai-intro'), log = document.getElementById('ai-log'), form = document.getElementById('ai-form'), ta = document.getElementById('ai-q'), send = document.getElementById('ai-send'), count = document.getElementById('ai-count');

  /* Güvenli biçim: önce kaçış, sonra yalnızca **kalın**, satır ve madde işaretleri. HTML yorumlanmaz. */
  function formatAnswer(text) {
    var lines = String(text || '').replace(/\r/g, '').split('\n'), out = [], list = null;
    lines.forEach(function (l) {
      var t = l.trim();
      var li = t.match(/^[-*•]\s+(.*)$/) || t.match(/^\d+[.)]\s+(.*)$/);
      if (li) { if (!list) { list = []; } list.push(li[1]); return; }
      if (list) { out.push('<ul>' + list.map(function (x) { return '<li>' + inline(x) + '</li>'; }).join('') + '</ul>'); list = null; }
      if (t) out.push('<p>' + inline(t) + '</p>');
    });
    if (list) out.push('<ul>' + list.map(function (x) { return '<li>' + inline(x) + '</li>'; }).join('') + '</ul>');
    return out.join('');
  }
  function inline(t) { return esc(t).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/^#{1,4}\s*/, ''); }

  function now() { return N.fmt.timeTR(new Date()); }
  function add(kind, html, extra) {
    var div = document.createElement('div');
    if (kind === 'user') {
      div.className = 'n1i-ai__row n1i-ai__row--user';
      div.innerHTML = '<div class="n1i-ai__bubble"><span class="n1i-sr">Siz: </span>' + html + '</div>';
    } else {
      div.className = 'n1i-ai__row' + (extra ? ' ' + extra : '');
      div.innerHTML = MARK + '<div class="n1i-ai__body"><div class="n1i-ai__meta"><b>1N Asistan</b><span>' + now() + '</span></div><div class="n1i-ai__text">' + html + '</div></div>';
    }
    log.appendChild(div);
    intro.hidden = true;
    N.motion.enter([div]);
    N.height.schedule();
    return div;
  }
  function setBusy(b) {
    send.disabled = b || !ta.value.trim(); ta.setAttribute('aria-busy', String(b)); busy = b;
    document.querySelectorAll('.n1i-ai__chip').forEach(function (c) { c.disabled = b; });
  }
  function ask(q) {
    q = String(q || '').trim().slice(0, MAX);
    if (!q || waiting) return;
    lastQuestion = q;
    add('user', '<p>' + esc(q) + '</p>');
    ta.value = ''; resize(); updateCount();
    setBusy(true);
    waiting = add('ai', '<span class="n1i-ai__typing" role="status"><span class="n1i-ai__dots" aria-hidden="true"><i></i><i></i><i></i></span>Veriler inceleniyor, yanıt hazırlanıyor…</span>');
    clearTimeout(timer);
    timer = setTimeout(function () { fail('Yanıt ' + Math.round(TIMEOUT / 1000) + ' saniye içinde gelmedi.'); }, TIMEOUT);
    if (!N.bridge.send({ action: 'askAI', question: q })) fail('Bu bileşen bir Wix sayfasına yerleştirilmediği için soru gönderilemedi.');
  }
  function fail(reason) {
    clearTimeout(timer);
    if (waiting) { waiting.remove(); waiting = null; }
    add('ai', '<div class="n1i-ai__err" role="alert">' + N.icon('error') + '<div><p><b>Yanıt alınamadı.</b> ' + esc(reason) + '</p><button type="button" class="n1i-btn n1i-btn--sm" data-retry>' + N.icon('refresh') + 'Tekrar dene</button></div></div>', 'n1i-ai__row--err');
    setBusy(false);
  }
  function answer(text) {
    if (!waiting) return; // beklenmeyen veya tekrar eden yanıt
    clearTimeout(timer);
    waiting.remove(); waiting = null;
    var s = String(text || '').trim();
    if (!s || ERRORS.indexOf(s) > -1) { fail(s || 'Boş yanıt geldi.'); return; }
    add('ai', formatAnswer(s));
    setBusy(false);
    /* Mobilde klavyeyi yeniden açmamak için yalnızca işaretçi olan cihazlarda odak */
    if (window.matchMedia && window.matchMedia('(pointer:fine)').matches) ta.focus({ preventScroll: true });
  }
  function resize() { ta.style.height = 'auto'; ta.style.height = Math.min(ta.scrollHeight, 180) + 'px'; N.height.schedule(); }
  function updateCount() { count.textContent = ta.value.length + ' / ' + MAX; if (!busy) send.disabled = !ta.value.trim(); }

  form.addEventListener('submit', function (e) { e.preventDefault(); ask(ta.value); });
  ta.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) { e.preventDefault(); ask(ta.value); } });
  ta.addEventListener('input', function () { resize(); updateCount(); });
  root.addEventListener('click', function (e) {
    var c = e.target.closest('[data-q]'); if (c) { ask(c.getAttribute('data-q')); return; }
    var r = e.target.closest('[data-retry]'); if (r) { var m = r.closest('.n1i-ai__row'); if (m) m.remove(); var u = log.querySelectorAll('.n1i-ai__row--user'); if (u.length) u[u.length - 1].remove(); ask(lastQuestion); }
  });

  N.height.start(root);
  N.bridge.listen(function (d) { answer(d.answer); }, {
    accept: function (d) { return d.action === 'aiAnswer' && (typeof d.answer === 'string' || d.answer === undefined || d.answer === null); },
    dedupe: function () { return false; }
  });
})();

};
runtime.N1I_MODULES['domain'] = function(moduleN, document) {
/* 1N INTELLIGENCE — Domain ve Lisans modülü (#html6)
   Veri kaynağı: API yok; tarihler müşteri yapılandırmasında elle tutulur (mevcut bileşende de kod içindeydi).
   Yapılandırma: N1I_CONFIG.client.renewals = [{ label, date:'gg.aa.yyyy', verifiedUntil?:'gg.aa.yyyy', checkedAt?:'gg.aa.yyyy' }]
   DEĞİŞEN DAVRANIŞ (rapor edildi): Eski bileşen geçmiş tarihi her yıl otomatik ileri taşıyordu (getNextCycle).
   Bu, yenileme yapılmadığı halde süre varmış gibi gösterebilir. Yeni modül geçmiş tarihi taşımaz;
   "Yenileme doğrulanmadı" uyarısı gösterir. Yenileme yapıldıysa yapılandırmaya verifiedUntil yazılır. */
(function () {
  'use strict';
  var N = moduleN, esc = N.esc, ui = N.ui, f = N.fmt;
  var root = document.getElementById('n1i-root');
  var items = (N.cfg.client && Array.isArray(N.cfg.client.renewals)) ? N.cfg.client.renewals : [];

  function parse(s) { var m = String(s || '').trim().match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/); return m ? Date.UTC(+m[3], +m[2] - 1, +m[1]) : null; }
  function todayUTC() { var t = f.todayISO().split('-'); return Date.UTC(+t[0], +t[1] - 1, +t[2]); }
  function show(ms) { return new Intl.DateTimeFormat('tr-TR', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(ms)); }

  function card(it) {
    var base = parse(it.verifiedUntil) || parse(it.date);
    /* V2.2: tarih bilinmiyorsa tahmin yok, "doğrulanmadı" */
    if (base === null) return ui.kpi({ label: it.label, value: N.DASH, state: 'na', foot: (it.date ? 'Tarih okunamadı: ' + esc(it.date) + '<br>' : '') + ui.chip('warn', 'Bitiş tarihi doğrulanmadı', 'alert'), tip: '<b>' + esc(it.label) + '</b>: Bitiş tarihi 1N kayıtlarında yok veya okunamadı. Tarih tahmin edilmez; kayıt firmasından doğrulanıp yapılandırmaya yazılmalıdır.' });
    var days = Math.round((base - todayUTC()) / 86400000);
    var chip, value, foot, state = 'ok';
    if (days < 0) {
      value = esc(f.int(Math.abs(days))) + '<small>gün önce doldu</small>';
      chip = ui.chip('neg', 'Yenileme doğrulanmadı', 'alert');
      foot = 'Kayıtlı bitiş: <b>' + show(base) + '</b><br>' + chip + '<br>Yenilendiyse yeni bitiş tarihi 1N tarafından güncellenmelidir.';
      state = 'err';
    } else {
      value = esc(f.int(days)) + '<small>gün kaldı</small>';
      chip = days <= 30 ? ui.chip('neg', 'Yenileme yaklaştı', 'alert') : days <= 90 ? ui.chip('warn', '90 günden az', 'clock') : ui.chip('pos', 'Süre yeterli', 'ok');
      foot = 'Bitiş: <b>' + show(base) + '</b><br>' + chip;
    }
    foot += it.checkedAt ? '<br>Son kontrol: ' + esc(it.checkedAt) : '<br><span title="Tarih kayıt firmasıyla karşılaştırılmadı">Kaynakla doğrulanmadı</span>';
    return ui.kpi({ cls: 'n1i-kpi--lg', label: it.label, value: value, foot: foot, state: state, tip: '<b>' + esc(it.label) + '</b>: Tarih 1N tarafından elle kaydedilir; kayıt firmasıyla otomatik eşitlenmez. 30 gün ve altı kırmızı, 90 gün ve altı sarı uyarıdır. Geçmiş tarih otomatik ileri taşınmaz.' });
  }

  root.innerHTML = '<section class="n1i-module" aria-labelledby="dm-title">' +
    N.header({ icon: 'domain', tone: 'sky', title: 'Domain ve lisans', meta: ['<span>Yenileme takibi</span>', '<span>Kaynak: 1N kayıtları (elle)</span>'] }) +
    (items.length ? '<div class="n1i-kpis" style="--n1i-kpi-desktop:' + Math.min(4, Math.max(2, items.length)) + '">' + items.map(card).join('') + '</div>' : ui.state('empty', 'Kayıtlı yenileme tarihi yok', 'Bu müşteri için domain veya lisans tarihi tanımlanmamış.')) +
    '</section>';
  root.querySelector('h2').id = 'dm-title';
  var st = document.createElement('style'); st.textContent = '@media (max-width:479px){#n1i-root .n1i-kpis{--n1i-kpi-cols:1 !important}}'; document.head.appendChild(st);
  N.height.start(root);
  N.motion.enter(root.querySelectorAll('.n1i-kpi'));
})();

};
runtime.N1I_MODULES['drive'] = function(moduleN, document) {
/* 1N INTELLIGENCE — Dijital Varlık Yönetimi (#html7, Google Drive ortak arşiv)
   Veri kaynağı: API yok. Bağlantı müşteri yapılandırmasında durur (N1I_CONFIG.client.driveUrl).
   Paylaşım izinleri bu bileşenle değişmez; bağlantı yalnızca Drive'ı yeni sekmede açar.
   Güvenlik: yalnızca https://drive.google.com/ adresleri kabul edilir. */
(function () {
  'use strict';
  var N = moduleN, esc = N.esc, ui = N.ui;
  var root = document.getElementById('n1i-root');
  var url = (N.cfg.client && N.cfg.client.driveUrl) || '';
  var valid = /^https:\/\/drive\.google\.com\//.test(url);
  var kinds = ['Prodüksiyon videoları', 'Logo ve marka varlıkları', 'Sosyal medya içerikleri', 'Baskıya hazır tasarımlar'];

  root.innerHTML = '<section class="n1i-module" aria-labelledby="dv-title">' +
    N.header({ icon: 'drive', tone: 'sand', title: 'Dijital varlık arşivi', meta: ['<span>Google Drive ortak klasörü</span>'] }) +
    '<div class="n1i-grid" style="margin-top:0;align-items:stretch">' +
    '<div class="n1i-panel n1i-col-8"><p style="margin:0 0 12px;color:var(--n1i-text-2);max-width:68ch">Markanıza ait dijital ve basılı materyaller bu ortak arşivde düzenli olarak saklanır ve güncellenir.</p>' +
    '<ul style="list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:8px">' + kinds.map(function (k) { return '<li style="display:flex;align-items:center;gap:8px;color:var(--n1i-text);font-size:var(--n1i-fs-sm)"><span style="color:var(--n1i-muted);width:16px;height:16px;flex:none">' + N.icon('drive') + '</span>' + esc(k) + '</li>'; }).join('') + '</ul></div>' +
    '<div class="n1i-panel n1i-col-4" style="display:flex;flex-direction:column;gap:12px;justify-content:center">' +
    (valid ? '<a class="n1i-btn n1i-btn--primary" href="' + esc(url) + '" target="_blank" rel="noopener noreferrer">' + N.icon('external') + 'Google Drive\'ı aç<span class="n1i-sr"> (yeni sekmede açılır)</span></a>'
      : ui.state('warn', 'Arşiv bağlantısı tanımlı değil', 'Bağlantı 1N tarafından eklenecek.')) +
    '<div class="n1i-state n1i-state--info" style="padding:10px 12px">' + N.icon('lock') + '<p class="n1i-state__text" style="color:var(--n1i-text-2)">Ortak Google Drive klasörünü yalnızca erişim yetkisi verilmiş hesaplar görüntüleyebilir.</p></div>' +
    '</div></div></section>';
  root.querySelector('h2').id = 'dv-title';
  N.height.start(root);
})();

};
runtime.N1I_MODULES['ga4'] = function(moduleN, document) {
/* 1N INTELLIGENCE — Google Analytics 4 modülü (#html3)
   Sözleşme (değişmedi):
     Velo → widget: { summary, daily, trafficSources, topPages, deviceBreakdown, rangeLabel, rangeKey }
       Her rapor GA4 Data API'nin ham yanıtıdır: { rows:[{dimensionValues,metricValues}] } veya { error:{...} }.
       summary.metricValues sırası: sessions, activeUsers, newUsers, screenPageViews, engagementRate, averageSessionDuration
       daily: dimension date (YYYYMMDD), metrics sessions, activeUsers
     widget → Velo: { action:'changeRange', range:'7'|'30'|'all' } */
(function () {
  'use strict';
  var N = moduleN, f = N.fmt, esc = N.esc, ui = N.ui;
  var root = document.getElementById('n1i-root');
  var lineChart = null, showTable = false, last = null;

  var ctrl = N.rangeController({
    root: root,
    onPending: function () { var b = root.querySelector('[data-body]'); if (b) b.classList.add('is-stale'); setLoadingLine(true); },
    onInitialTimeout: function () { setLoadingLine(false); root.querySelector('[data-body]').innerHTML = ui.state('warn', 'Google Analytics verisi gelmedi', 'Sayfa kodu bu bölüme veri göndermedi. Wix sayfa kodu hata yakaladığında bölüme mesaj göndermiyor; bağlantı da yavaş olabilir.', '<button type="button" class="n1i-btn n1i-btn--sm" data-retry>' + N.icon('refresh') + 'Tekrar iste</button>'); N.height.schedule(); },
    onTimeout: function () { setLoadingLine(false); showBanner('error', 'Yeni aralığın verisi gelmedi', 'Ekrandaki sayılar önceki seçime aittir. Bağlantı yavaş olabilir veya Google Analytics yanıt vermemiş olabilir.', true); }
  });

  function shell() {
    root.innerHTML = '<section class="n1i-module" aria-labelledby="ga4-title">' +
      N.header({ icon: 'ga4', tone: 'teal', title: 'Google Analytics 4', meta: ['<span id="ga4-range">Son 7 gün</span>', '<span>Kaynak: GA4 Data API</span>', '<span id="ga4-recv" class="n1i-loading-line"><span class="n1i-spin"></span>Yükleniyor…</span>', ui.demoChip()], tools: ctrl.segHtml() }) +
      '<div data-banner></div><div data-body>' + ui.skelKpis(6) + '<div class="n1i-grid"><div class="n1i-col-8">' + ui.skelPanel(220) + '</div><div class="n1i-col-4">' + ui.skelPanel(220) + '</div></div></div>' +
      '</section>';
    root.querySelector('.n1i-module').querySelector('h2').id = 'ga4-title';
    root.querySelector('.n1i-kpis').style.setProperty('--n1i-kpi-desktop', '6');
  }
  function setLoadingLine(on) {
    var el = document.getElementById('ga4-recv'); if (!el) return;
    el.innerHTML = on ? '<span class="n1i-spin"></span>Yükleniyor…' : (last ? esc(last.recv) : '');
  }
  function showBanner(kind, title, text, retry) {
    var b = root.querySelector('[data-banner]');
    b.innerHTML = '<div class="n1i-banner">' + ui.state(kind, title, text, retry ? '<button type="button" class="n1i-btn n1i-btn--sm" data-retry>' + N.icon('refresh') + 'Tekrar dene</button>' : '') + '</div>';
    N.height.schedule();
  }
  root.addEventListener('click', function (e) {
    if (e.target.closest('[data-retry]')) { root.querySelector('[data-banner]').innerHTML = ''; ctrl.retry(); }
    if (e.target.closest('[data-toggle-table]')) { showTable = !showTable; if (last) renderTrend(last.data); }
  });

  function apiErr(rep) { return rep && rep.error ? (rep.error.status || rep.error.message || 'API hatası') : null; }
  function rows(rep) { return (rep && Array.isArray(rep.rows)) ? rep.rows : []; }

  var DEVICE = { desktop: 'Masaüstü', mobile: 'Mobil', tablet: 'Tablet', 'smart tv': 'Akıllı TV' };

  function render(d) {
    ctrl.done(d);
    root.querySelector('[data-banner]').innerHTML = '';
    var first = !last;
    last = { data: d, recv: ui.received() };
    var rEl = document.getElementById('ga4-range'); rEl.textContent = ui.rangeText(d, 'GA4 mülkünün veri başlangıcından'); rEl.title = ui.rangeTitle(d);
    setLoadingLine(false);

    var sErr = apiErr(d.summary), sRow = rows(d.summary)[0];
    var mv = sRow ? sRow.metricValues.map(function (m) { return m.value; }) : [];
    var tips = {
      sessions: '<b>Oturum</b>: Sitenize yapılan ziyaret sayısı. Aynı kişi birden çok kez gelirse her ziyaret ayrı sayılır.',
      users: '<b>Aktif kullanıcı</b>: GA4\'ün <i>activeUsers</i> metriği. Tarayıcı/cihaz bazlı tahmindir; tekil kişi sayısıyla birebir aynı değildir.',
      newUsers: '<b>Yeni kullanıcı</b>: Bu aralıkta siteye ilk kez gelen kullanıcılar (GA4 first_visit ölçümü).',
      views: '<b>Sayfa görüntüleme</b>: Sayfaların ve uygulama ekranlarının toplam açılma sayısı.',
      engage: '<b>Etkileşim oranı</b>: Etkileşimli oturumların tüm oturumlara oranı. GA4\'te 10 saniyeden uzun süren, dönüşüm olayı içeren veya en az 2 sayfa görüntülenen oturum etkileşimli sayılır.',
      dur: '<b>Ort. oturum süresi</b>: Oturumların ortalama etkileşim süresi (GA4 averageSessionDuration).'
    };
    var kp;
    if (sErr) {
      kp = '<div class="n1i-col-12">' + ui.state('error', 'Özet metrikler alınamadı', 'Google Analytics hata döndürdü (' + esc(sErr) + '). Bu bir sıfır değer değildir.') + '</div>';
      kp = '<div class="n1i-grid" style="margin-top:0">' + kp + '</div>';
    } else if (!sRow) {
      kp = ui.state('empty', 'Bu aralıkta kayıtlı ziyaret yok', 'GA4 bu aralık için satır döndürmedi. Ölçüm kodu çalışıyorsa bu, ziyaret olmadığı anlamına gelir.');
    } else {
      kp = '<div class="n1i-kpis n1i-kpis--strip n1i-kpis--6" style="--n1i-kpi-desktop:6">' +
        ui.kpi({ id: 'k-sessions', label: 'Oturum', value: f.int(mv[0]), compact: f.compact(mv[0]), tip: tips.sessions }) +
        ui.kpi({ id: 'k-users', label: 'Aktif kullanıcı', value: f.int(mv[1]), compact: f.compact(mv[1]), tip: tips.users }) +
        ui.kpi({ id: 'k-new', label: 'Yeni kullanıcı', value: f.int(mv[2]), compact: f.compact(mv[2]), tip: tips.newUsers }) +
        ui.kpi({ id: 'k-views', label: 'Sayfa görüntüleme', value: f.int(mv[3]), compact: f.compact(mv[3]), tip: tips.views }) +
        ui.kpi({ id: 'k-eng', label: 'Etkileşim oranı', value: f.pctRatio(mv[4]), tip: tips.engage }) +
        ui.kpi({ id: 'k-dur', label: 'Ort. oturum süresi', value: f.duration(mv[5]), tip: tips.dur }) +
        '</div>';
    }

    var body = root.querySelector('[data-body]');
    body.classList.remove('is-stale');
    body.innerHTML = kp +
      '<div class="n1i-grid">' +
      '<div class="n1i-panel n1i-col-8" data-trend></div>' +
      '<div class="n1i-col-4 n1i-stackcol"><div class="n1i-panel" data-device></div><div class="n1i-panel" data-sources></div></div>' +
      '<div class="n1i-panel n1i-col-12" data-pages></div>' +
      '</div>' +
      '<div class="n1i-foot"><p>GA4 tarih sınırları, mülkün raporlama saat dilimine göre hesaplanır. "Son 7 gün" seçimi GA4\'e 7daysAgo–today olarak gönderilir; bugünün yarım günü dahildir.</p></div>';

    if (!sErr && sRow) {
      [['k-sessions', mv[0], f.int], ['k-users', mv[1], f.int], ['k-new', mv[2], f.int], ['k-views', mv[3], f.int]].forEach(function (x) {
        if (first) N.motion.count(document.querySelector('#' + x[0] + ' [data-v]'), x[1], x[2]);
      });
    }
    renderTrend(d);
    renderShares(root.querySelector('[data-sources]'), 'Trafik kaynakları', 'Oturuma göre ilk 6 kaynak / mecra', d.trafficSources, Number(mv[0]), function (n) { return n === '(direct) / (none)' ? 'Doğrudan giriş (direct / none)' : n; }, 'oturum');
    renderDevices(d.deviceBreakdown);
    renderPages(d.topPages, Number(mv[3]));
    if (first) N.motion.enter(root.querySelectorAll('.n1i-kpi, .n1i-panel'));
    N.height.schedule();
  }

  function renderTrend(d) {
    var el = root.querySelector('[data-trend]'); if (!el) return;
    var err = apiErr(d.daily);
    var head = '<div class="n1i-panel__head"><div><h3 class="n1i-h2">Günlük oturum ve kullanıcı</h3><div class="n1i-panel__sub">Gün bazında · ' + esc(d.rangeLabel || 'Son 7 gün') + '</div></div>' +
      '<button type="button" class="n1i-btn n1i-btn--sm n1i-btn--ghost" data-toggle-table aria-pressed="' + showTable + '">' + N.icon(showTable ? 'chart' : 'table') + (showTable ? 'Grafik' : 'Tablo') + '</button></div>';
    if (err) { el.innerHTML = head + ui.state('error', 'Günlük trend alınamadı', 'Google Analytics hata döndürdü (' + esc(err) + ').'); return; }
    var r = rows(d.daily);
    if (!r.length) { el.innerHTML = head + ui.state('empty', 'Gösterilecek günlük veri yok', 'Bu aralıkta GA4 gün bazında satır döndürmedi.'); return; }
    var al = N.alignDays(r, function (x) { return x.dimensionValues[0].value; }, function (x) { return [Number(x.metricValues[0].value), Number(x.metricValues[1].value)]; }, [0, 0]);
    var sessions = al.values.map(function (v) { return v[0]; }), users = al.values.map(function (v) { return v[1]; });
    var todayKey = f.todayISO().replace(/-/g, ''), partial = al.keys[al.keys.length - 1] === todayKey;
    var tot = sessions.reduce(function (a, b) { return a + b; }, 0);
    var peakI = sessions.indexOf(Math.max.apply(null, sessions));
    var summary = 'Toplam ' + f.int(tot) + ' oturum (günlük toplamların toplamı). En yüksek gün: ' + al.labels[peakI] + ' (' + f.int(sessions[peakI]) + ').' + (partial ? ' Son gün (bugün) henüz tamamlanmadı ve kesikli çizilir.' : '');
    var legend = '<div class="n1i-legend" aria-hidden="true"><span class="n1i-legend__item" style="color:var(--n1i-c1)"><span class="n1i-legend__swatch"></span><span style="color:var(--n1i-text-2)">Oturum</span></span><span class="n1i-legend__item" style="color:var(--n1i-c2)"><span class="n1i-legend__swatch n1i-legend__swatch--dash"></span><span style="color:var(--n1i-text-2)">Aktif kullanıcı</span></span></div>';
    var table = '<div class="n1i-tablewrap" tabindex="0" role="region" aria-label="Günlük trend tablosu" style="max-height:320px"><table class="n1i-table"><thead><tr><th scope="col">Gün</th><th scope="col" class="is-num">Oturum</th><th scope="col" class="is-num">Aktif kullanıcı</th></tr></thead><tbody>' +
      al.keys.map(function (k, i) { return '<tr><td>' + f.dayLong(k) + (partial && i === al.keys.length - 1 ? ' (devam ediyor)' : '') + '</td><td class="is-num">' + f.int(sessions[i]) + '</td><td class="is-num">' + f.int(users[i]) + '</td></tr>'; }).join('') + '</tbody></table></div>';
    if (lineChart) { lineChart.destroy(); lineChart = null; }
    if (showTable) { el.innerHTML = head + table + '<p class="n1i-summary-text">' + summary + '</p>'; N.height.schedule(); return; }
    el.innerHTML = head + legend + '<div class="n1i-chartbox"><canvas role="img" aria-label="Günlük oturum ve aktif kullanıcı çizgi grafiği. ' + esc(summary) + '"></canvas></div><p class="n1i-summary-text">' + summary + ' GA4 boş günler için satır döndürmez; o günler 0 olarak çizilir.</p>';
    N.charts.load().then(function (Chart) {
      var cv = el.querySelector('canvas'); if (!cv) return;
      var c = N.charts.color;
      var dashLast = function (ctx) { return partial && ctx.p1DataIndex === sessions.length - 1 ? [4, 4] : undefined; };
      lineChart = N.charts.create(cv, function () { var c = N.charts.color; return {
        type: 'line',
        data: { labels: al.labels, datasets: [
          { label: 'Oturum', data: sessions, borderColor: c('--n1i-c1'), backgroundColor: N.charts.areaFill('--n1i-c1-fill'), fill: 'origin', pointBackgroundColor: c('--n1i-surface'), pointBorderColor: c('--n1i-c1'), pointBorderWidth: 2, borderWidth: 2.5, pointRadius: 0, pointHoverRadius: 5, tension: 0.35, segment: { borderDash: dashLast } },
          { label: 'Aktif kullanıcı', data: users, borderColor: c('--n1i-c2'), backgroundColor: c('--n1i-c2'), borderWidth: 2, borderDash: [6, 5], pointRadius: 0, pointHoverRadius: 5, tension: 0.35 }
        ] },
        options: {
          scales: { x: N.charts.axis({ grid: { display: false }, ticks: { color: c('--n1i-muted'), maxRotation: 0, autoSkip: true, maxTicksLimit: 8, font: { size: 12.5, weight: '500' } } }), y: N.charts.axis({ beginAtZero: true, ticks: { color: c('--n1i-muted'), precision: 0, maxTicksLimit: 5, callback: function (v) { return f.compact(v); }, font: { size: 12.5, weight: '500' } } }) },
          plugins: { tooltip: { callbacks: { title: function (it) { return f.dayLong(al.keys[it[0].dataIndex]) + (partial && it[0].dataIndex === al.keys.length - 1 ? ' (devam ediyor)' : ''); }, label: function (it) { return ' ' + it.dataset.label + ': ' + f.int(it.parsed.y); } } } }
        }
      }; });
    }, function () {
      showTable = true; renderTrend(d);
      el.insertAdjacentHTML('afterbegin', '<div class="n1i-banner">' + ui.state('info', 'Grafik kütüphanesi yüklenemedi', 'Veriler tablo olarak gösteriliyor.') + '</div>');
    });
    N.height.schedule();
  }

  function renderShares(el, title, sub, rep, total, rename, unit) {
    var err = apiErr(rep), r = rows(rep);
    var head = '<div class="n1i-panel__head"><div><h3 class="n1i-h2">' + esc(title) + '</h3><div class="n1i-panel__sub">' + esc(sub) + '</div></div></div>';
    if (err) { el.innerHTML = head + ui.state('error', title + ' alınamadı', 'Google Analytics hata döndürdü (' + esc(err) + ').'); return; }
    if (!r.length) { el.innerHTML = head + ui.state('empty', 'Bu aralıkta kayıt yok', ''); return; }
    var max = Math.max.apply(null, r.map(function (x) { return Number(x.metricValues[0].value) || 0; })) || 1;
    var html = '<ol class="n1i-shares">' + r.map(function (x) {
      var n = x.dimensionValues[0].value, v = Number(x.metricValues[0].value) || 0;
      var share = total > 0 ? v / total : null;
      return '<li class="n1i-share"><span class="n1i-share__name" title="' + esc(rename(n)) + '">' + esc(rename(n)) + '</span><span class="n1i-share__val n1i-num">' + f.int(v) + (share !== null ? '<small>' + f.pctRatio(share) + '</small>' : '') + '</span>' +
        '<span class="n1i-share__track" aria-hidden="true"><span class="n1i-share__fill" style="width:' + (v / max * 100).toFixed(1) + '%"></span></span></li>';
    }).join('') + '</ol>';
    var note = total > 0 ? '<p class="n1i-summary-text">Yüzdeler toplam ' + f.int(total) + ' ' + unit + ' içindeki paydır; yalnızca ilk ' + r.length + ' satır listelenir.</p>' : '';
    el.innerHTML = head + html + note;
    N.motion.bars(el.querySelectorAll('.n1i-share__fill'));
  }

  function renderDevices(rep) {
    var el = root.querySelector('[data-device]');
    var err = apiErr(rep), r = rows(rep);
    var head = '<div class="n1i-panel__head"><div><h3 class="n1i-h2">Cihaz dağılımı</h3><div class="n1i-panel__sub">Oturum payı</div></div></div>';
    if (err) { el.innerHTML = head + ui.state('error', 'Cihaz dağılımı alınamadı', 'Google Analytics hata döndürdü (' + esc(err) + ').'); return; }
    if (!r.length) { el.innerHTML = head + ui.state('empty', 'Bu aralıkta kayıt yok', ''); return; }
    var items = r.map(function (x) { return { name: DEVICE[x.dimensionValues[0].value] || x.dimensionValues[0].value, v: Number(x.metricValues[0].value) || 0 }; }).sort(function (a, b) { return b.v - a.v; });
    var tot = items.reduce(function (a, b) { return a + b.v; }, 0) || 1;
    var cols = ['--n1i-c1', '--n1i-c2', '--n1i-c3', '--n1i-c4', '--n1i-c5'];
    el.innerHTML = head + '<div class="n1i-stack" role="img" aria-label="' + esc(items.map(function (i) { return i.name + ' ' + f.pctRatio(i.v / tot); }).join(', ')) + '">' +
      items.map(function (i, k) { return '<span style="width:' + (i.v / tot * 100).toFixed(2) + '%;background:var(' + cols[k % cols.length] + ')"></span>'; }).join('') + '</div>' +
      '<ul class="n1i-shares">' + items.map(function (i, k) {
        return '<li class="n1i-share"><span class="n1i-share__name"><span style="display:inline-block;width:8px;height:8px;border-radius:2px;margin-right:8px;background:var(' + cols[k % cols.length] + ')"></span>' + esc(i.name) + '</span><span class="n1i-share__val n1i-num">' + f.pctRatio(i.v / tot) + '<small>' + f.int(i.v) + '</small></span></li>';
      }).join('') + '</ul>';
  }

  function renderPages(rep, totalViews) {
    var el = root.querySelector('[data-pages]');
    var err = apiErr(rep), r = rows(rep);
    var head = '<div class="n1i-panel__head"><div><h3 class="n1i-h2">En çok görüntülenen sayfalar</h3><div class="n1i-panel__sub">İlk 5 sayfa · görüntülemeye göre</div></div></div>';
    if (err) { el.innerHTML = head + ui.state('error', 'Sayfa listesi alınamadı', 'Google Analytics hata döndürdü (' + esc(err) + ').'); return; }
    if (!r.length) { el.innerHTML = head + ui.state('empty', 'Bu aralıkta kayıt yok', ''); return; }
    el.innerHTML = head + '<div class="n1i-tablewrap" tabindex="0" role="region" aria-label="En çok görüntülenen sayfalar"><table class="n1i-table"><thead><tr><th scope="col">Sayfa yolu</th><th scope="col" class="is-num">Görüntüleme</th><th scope="col" class="is-num">Pay</th></tr></thead><tbody>' +
      r.map(function (x) {
        var p = x.dimensionValues[0].value, v = Number(x.metricValues[0].value) || 0;
        return '<tr><td class="is-name">' + esc(p === '/' ? '/ (ana sayfa)' : p) + '</td><td class="is-num">' + f.int(v) + '</td><td class="is-num">' + (totalViews > 0 ? f.pctRatio(v / totalViews) : N.DASH) + '</td></tr>';
      }).join('') + '</tbody></table></div>';
  }

  shell();
  N.height.start(document.getElementById('n1i-root'));
  N.bridge.listen(function (d) {
    if (!ctrl.accept(d)) return;
    render(d);
  }, {
    accept: function (d) { return !!d.summary && typeof d.summary === 'object' && (!d.rangeKey || /^(7|30|all)$/.test(d.rangeKey)); },
    kind: function (d) { return 'r' + (d.rangeKey || '7'); },
    dedupe: function () { return !ctrl.isPending(); },
    onError: function () { root.querySelector('[data-banner]').innerHTML = ui.state('error', 'Görüntüleme hatası', 'Gelen veri beklenen biçimde değil.'); }
  });
})();

};
runtime.N1I_MODULES['glossary'] = function(moduleN, document) {
/* 1N INTELLIGENCE — Terimler sözlüğü / bilgi merkezi (#html15)
   Mevcut terimler ve açıklamaları DEĞİŞTİRİLMEDEN korunur (kaynak: mevcut #html15).
   "Yeni" işaretli terimler bu sürümde eklenen ve onay bekleyen açıklamalardır.
   Mevcut açıklamalardaki teknik notlar arayüzde değil, ARCHITECTURE_REPORT.md içinde raporlanır. */
(function () {
  'use strict';
  var N = moduleN, esc = N.esc, ui = N.ui;
  var root = document.getElementById('n1i-root');
  var CATS = [
    { id: 'ga', title: 'Google Analytics', icon: 'ga4', terms: [
      ['Oturum', 'Bir ziyaretçinin sitenize yaptığı tek bir ziyaret. Aynı kişi bir gün içinde birden çok kez gelirse birden çok oturum sayılır.'],
      ['Kullanıcı', 'Sitenizi ziyaret eden tekil (farklı) kişi sayısı.'],
      ['Yeni Kullanıcı', 'Sitenize daha önce hiç gelmemiş, ilk kez ziyaret eden kişi sayısı.'],
      ['Sayfa Görüntüleme', 'Sitenizdeki sayfaların toplam kaç kez açıldığı.'],
      ['Etkileşim Oranı', 'Ziyaretçilerin sitede aktif olarak vakit geçirme veya bir işlem yapma oranı. Yüksek olması iyidir.'],
      ['Ortalama Oturum Süresi', 'Ziyaretçilerin sitenizde ortalama ne kadar süre kaldığı.'],
      ['Trafik Kaynağı', 'Ziyaretçilerin sitenize hangi yoldan (Google araması, sosyal medya, direkt giriş vb.) geldiği.'],
      ['Cihaz Dağılımı', 'Ziyaretçilerin sitenize telefon, bilgisayar ya da tablet üzerinden girme oranı.']
    ] },
    { id: 'meta', title: 'Meta Reklam (Facebook / Instagram)', icon: 'meta', terms: [
      ['Gösterim', 'Reklamınızın ekranlarda toplam kaç kez görüntülendiği.'],
      ['Tıklama', 'Reklamınıza kullanıcıların kaç kez tıkladığı.'],
      ['CTR (Tıklama Oranı)', 'Reklamı görenlerin yüzde kaçının tıkladığı. Yüksek olması reklamın ilgi çektiğini gösterir.'],
      ['Harcama', 'Seçilen tarih aralığında reklamlara ödenen toplam tutar.'],
      ['CPC (Tıklama Başı Maliyet)', 'Bir tıklama için ortalama ne kadar ödendiği. Düşük olması maliyet verimliliği açısından iyidir.'],
      ['Dönüşüm', 'Reklamı gören kişilerin form doldurma, satın alma, arama gibi istenen bir işlemi tamamlama sayısı.'],
      ['CPM (Bin Gösterim Maliyeti)', '1.000 gösterim için ödenen ortalama tutar. Harcama ÷ gösterim × 1.000 olarak hesaplanır.', true],
      ['Mesajlaşma Başlatma', 'Reklamdan sonra başlatılan Messenger, Instagram DM veya WhatsApp konuşması sayısı. Bir satış olduğu anlamına gelmez.', true],
      ['Bağlantı Tıklaması', 'Reklamdaki bağlantıya yapılan tıklamalar. Meta\'nın genel "Tıklama" sayısı bunun yanında profil, beğeni gibi tıklamaları da içerir.', true]
    ] },
    { id: 'gads', title: 'Google Ads', icon: 'gads', terms: [
      ['Ort. TBM (CPC)', 'Tıklama başına ortalama maliyet: toplam harcama ÷ tıklama.', true],
      ['Dönüşüm (Google Ads)', 'Google Ads hesabında tanımlı işlemler (ör. arama, form, satın alma). İlişkilendirme modeli nedeniyle kesirli olabilir.', true],
      ['Dönüşüm Değeri', 'Dönüşümlere Google Ads\'te atanmış değerlerin toplamı. İşletmenin gerçek cirosu değildir.', true]
    ] },
    { id: 'ig', title: 'Instagram', icon: 'instagram', terms: [
      ['Takipçi', 'Instagram hesabınızı takip eden kişi sayısı.'],
      ['Takip Edilen', 'Hesabınızın takip ettiği kişi/hesap sayısı.'],
      ['Gönderi', 'Hesabınızda paylaşılan toplam gönderi (fotoğraf/video) sayısı.'],
      ['Yeni Takipçi', 'Meta\'nın günlük yeni takipçi verisinin (follower_count) son 30 gün (bugün hariç) toplamı. Takipten çıkmalar düşülmez; net değişim değildir.', true],
      ['Son 5 Gönderi Etkileşimi', 'En son paylaşılan 5 gönderinin beğeni ve yorum toplamı.', true]
    ] }
  ];
  var onlyCats = N.cfg.options && N.cfg.options.categories;
  if (Array.isArray(onlyCats)) CATS = CATS.filter(function (c) { return onlyCats.indexOf(c.id) > -1; });

  function fold(s) { return String(s || '').toLocaleLowerCase('tr-TR').replace(/ı/g, 'i').replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ö/g, 'o').replace(/ç/g, 'c'); }
  var wide = window.matchMedia('(min-width: 720px)').matches;
  var open = {}; CATS.forEach(function (c, i) { open[c.id] = wide || i === 0; });
  var q = '';

  root.innerHTML = '<section class="n1i-module" aria-labelledby="gl-title">' +
    N.header({ icon: 'glossary', tone: 'teal', title: 'Terimler sözlüğü', meta: ['<span>Raporlarda geçen terimlerin kısa açıklamaları</span>'] }) +
    '<div style="display:grid;grid-template-columns:minmax(0,1fr) auto;gap:8px;align-items:end;margin-bottom:12px" class="gl-tools">' +
    '<div class="n1i-field"><label for="gl-q">Terim ara</label><div class="n1i-searchbox">' + N.icon('search') + '<input id="gl-q" class="n1i-input" type="search" placeholder="ör. CTR, oturum, takipçi" autocomplete="off"></div></div>' +
    '<div style="display:flex;gap:8px"><button type="button" class="n1i-btn n1i-btn--sm" data-all="1">Tümünü aç</button><button type="button" class="n1i-btn n1i-btn--sm" data-all="0">Tümünü kapat</button></div></div>' +
    '<div data-list></div><p class="n1i-summary-text" id="gl-count" aria-live="polite"></p></section>';
  root.querySelector('h2').id = 'gl-title';
  var st = document.createElement('style');
  st.textContent = '.gl-cat{border:var(--n1i-border-soft);border-radius:var(--n1i-r-md);background:var(--n1i-panel-raised);margin-bottom:8px}' +
    '.gl-cat__btn{width:100%;display:flex;align-items:center;gap:10px;padding:12px 14px;min-height:48px;background:none;border:0;color:var(--n1i-text);text-align:left;font-weight:600;font-size:var(--n1i-fs-md)}' +
    '.gl-cat__btn svg{width:16px;height:16px;color:var(--n1i-muted);flex:none}.gl-cat__btn .gl-chev{margin-left:auto;transition:transform var(--n1i-dur) var(--n1i-ease)}' +
    '.gl-cat__btn[aria-expanded="true"] .gl-chev{transform:rotate(180deg)}' +
    '.gl-cat__n{color:var(--n1i-muted);font-weight:500;font-size:var(--n1i-fs-xs)}' +
    '.gl-terms{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:8px;padding:0 14px 14px;margin:0}' +
    '.gl-term{padding:12px;border-radius:var(--n1i-r-sm);background:var(--n1i-panel-sunken);border:var(--n1i-border-soft)}' +
    '.gl-term dt{font-weight:600;margin-bottom:4px;display:flex;gap:8px;align-items:center;flex-wrap:wrap}.gl-term dd{margin:0;color:var(--n1i-text-2);font-size:var(--n1i-fs-sm);line-height:1.5}' +
    '.gl-term mark{background:var(--n1i-accent-soft);color:var(--n1i-text);border-radius:2px}' +
    '@media (max-width:479px){.gl-tools{grid-template-columns:1fr !important}}';
  document.head.appendChild(st);

  function hl(text) {
    var t = esc(text); if (!q) return t;
    var src = String(text), fs = fold(src), fq = fold(q), i = fs.indexOf(fq);
    if (i < 0 || fs.length !== src.length) return t;
    return esc(src.slice(0, i)) + '<mark>' + esc(src.slice(i, i + q.length)) + '</mark>' + esc(src.slice(i + q.length));
  }
  function draw() {
    var fq = fold(q.trim()), total = 0;
    var html = CATS.map(function (c) {
      var terms = c.terms.filter(function (t) { return !fq || fold(t[0] + ' ' + t[1]).indexOf(fq) > -1; });
      total += terms.length;
      if (!terms.length) return '';
      var isOpen = fq ? true : open[c.id];
      var pid = 'gl-' + c.id;
      return '<div class="gl-cat"><button type="button" class="gl-cat__btn" data-cat="' + c.id + '" aria-expanded="' + isOpen + '" aria-controls="' + pid + '">' + N.icon(c.icon) + '<span>' + esc(c.title) + '</span><span class="gl-cat__n">' + terms.length + ' terim</span>' + N.icon('chevron', 'gl-chev') + '</button>' +
        '<dl class="gl-terms" id="' + pid + '"' + (isOpen ? '' : ' hidden') + '>' + terms.map(function (t) {
          return '<div class="gl-term"><dt>' + hl(t[0]) + (t[2] ? ui.chip('info', 'Yeni · onay bekliyor') : '') + '</dt><dd>' + hl(t[1]) + '</dd></div>';
        }).join('') + '</dl></div>';
    }).join('');
    root.querySelector('[data-list]').innerHTML = html || ui.state('empty', 'Eşleşen terim yok', '"' + esc(q) + '" için sonuç bulunamadı.');
    document.getElementById('gl-count').textContent = fq ? total + ' terim bulundu' : '';
    N.height.schedule();
  }
  root.addEventListener('click', function (e) {
    var b = e.target.closest('[data-cat]');
    if (b) { var id = b.getAttribute('data-cat'); open[id] = b.getAttribute('aria-expanded') !== 'true'; draw(); var nb = root.querySelector('[data-cat="' + id + '"]'); if (nb) nb.focus(); return; }
    var a = e.target.closest('[data-all]');
    if (a) { var v = a.getAttribute('data-all') === '1'; CATS.forEach(function (c) { open[c.id] = v; }); draw(); }
  });
  document.getElementById('gl-q').addEventListener('input', function (e) { q = e.target.value; draw(); });
  draw();
  N.height.start(root);
})();

};
runtime.N1I_MODULES['instagram'] = function(moduleN, document) {
/* 1N INTELLIGENCE — Instagram modülü (#html8)
   Sözleşme (değişmedi): Velo → widget: getInstagramData() yanıtının tamamı
     { profile:{username, followers_count, follows_count, media_count} | {error} | null,
       insights:{ data:[{ values:[{value, end_time}] }] } | {error} | null,
       followerGrowthLast30Days, followerChangeToday, followerChangeLast7, engagementLast5, mediaError }
   Not: backend günlük seri alınamadığında değişimleri 0 olarak hesaplıyor; bu modül seri yoksa
   değişimi "doğrulanamadı" gösterir, 0 göstermez. */
(function () {
  'use strict';
  var N = moduleN, f = N.fmt, esc = N.esc, ui = N.ui;
  var root = document.getElementById('n1i-root');
  var chart = null, received = false;

  function shell() {
    root.innerHTML = '<section class="n1i-module" aria-labelledby="ig-title">' +
      N.header({ icon: 'instagram', tone: 'rose', title: 'Instagram', meta: ['<span id="ig-user">Hesap</span>', '<span>Kaynak: Instagram Graph API</span>', '<span id="ig-recv" class="n1i-loading-line"><span class="n1i-spin"></span>Yükleniyor…</span>', ui.demoChip()] }) +
      '<div data-body>' + ui.skelKpis(4) + '<div class="n1i-grid"><div class="n1i-col-12">' + ui.skelPanel(160) + '</div></div></div></section>';
    root.querySelector('h2').id = 'ig-title';
  }
  function errText(e) { return e ? (e.message || e.type || 'API hatası') : null; }

  function render(d) {
    received = true;
    var first = !root.querySelector('[data-rendered]');
    document.getElementById('ig-recv').textContent = ui.received();
    var body = root.querySelector('[data-body]');
    body.setAttribute('data-rendered', '1');
    var p = d.profile, pErr = p && p.error ? errText(p.error) : (p ? null : (d.mediaError || 'Profil alınamadı'));
    var insErr = d.insights && d.insights.error ? errText(d.insights.error) : null;
    var values = (d.insights && d.insights.data && d.insights.data[0] && Array.isArray(d.insights.data[0].values)) ? d.insights.data[0].values : [];
    var seriesOk = !insErr && values.length > 0;
    document.getElementById('ig-user').textContent = p && p.username ? '@' + p.username : 'Hesap';

    if (pErr && !seriesOk) {
      body.innerHTML = ui.state('error', 'Instagram verisi alınamadı', 'Meta hata döndürdü (' + esc(pErr) + '). Bu bir sıfır değer değildir; erişim izni veya token süresi kontrol edilmelidir.');
      N.height.schedule(); return;
    }
    var html = '';
    if (pErr) html += '<div class="n1i-banner">' + ui.state('warn', 'Kısmi veri', 'Profil bilgisi alınamadı (' + esc(pErr) + '). Günlük takipçi serisi gösteriliyor.') + '</div>';
    if (insErr) html += '<div class="n1i-banner">' + ui.state('warn', 'Yeni takipçi verisi alınamadı', 'Günlük takipçi verisi Meta\'dan gelmedi (' + esc(insErr) + '). Yeni takipçi kartları 0 yerine "—" gösterir.') + '</div>';

    /* V2.2: dönem etiketi gelen günlük değer sayısından (sunucu n1iCoverage); yoksa değer sayısından burada hesaplanır. */
    var covDays = d.n1iCoverage && d.n1iCoverage.days ? d.n1iCoverage.days : values.length;
    var covLabel = covDays ? 'Son ' + covDays + ' gün · bugün hariç' : 'Günlük seri';
    var growthTip = '<b>Yeni takipçi</b>: Meta\'nın günlük <i>follower_count</i> değerlerinin toplamı. Bu metrik yeni takipleri sayar; takipten çıkmalar düşülmez, bu yüzden net değişim değildir. Meta bu veriyi bugün hariç en fazla son 30 gün için verir; gösterilen dönem gelen gün sayısıdır (' + covDays + ' gün).';
    function change(v, label, period) {
      if (!seriesOk || v === null || v === undefined) return ui.kpi({ label: label, value: N.DASH, state: 'na', foot: '<b>' + period + '</b> · doğrulanamadı', tip: growthTip });
      var ic = v > 0 ? ui.chip('pos', 'Yeni takip var', 'up') : v < 0 ? ui.chip('neg', 'Negatif değer', 'down') : ui.chip('', 'Yeni takip yok', 'flat');
      return ui.kpi({ label: label, value: v < 0 ? f.signed(v) : f.int(v), foot: '<b>' + period + '</b> ' + ic, tip: growthTip });
    }
    html += '<div class="n1i-kpis n1i-kpis--strip n1i-kpis--6" style="--n1i-kpi-desktop:6">' +
      ui.kpi({ id: 'ig-f', label: 'Takipçi', value: p && !p.error ? f.int(p.followers_count) : N.DASH, state: p && !p.error ? 'ok' : 'na', foot: '<b>Mevcut toplam</b>', tip: '<b>Takipçi</b>: Hesabı şu an takip eden hesap sayısı.' }) +
      change(d.followerGrowthLast30Days, 'Yeni takipçi', covLabel) +
      change(d.followerChangeLast7, 'Yeni takipçi', 'Son 7 gün') +
      ui.kpi({ label: 'Gönderi', value: p && !p.error ? f.int(p.media_count) : N.DASH, state: p && !p.error ? 'ok' : 'na', foot: '<b>Mevcut toplam</b>', tip: '<b>Gönderi</b>: Hesapta paylaşılan toplam gönderi sayısı.' }) +
      ui.kpi({ label: 'Takip edilen', value: p && !p.error ? f.int(p.follows_count) : N.DASH, state: p && !p.error ? 'ok' : 'na', foot: '<b>Mevcut toplam</b>', tip: '<b>Takip edilen</b>: Hesabın takip ettiği hesap sayısı.' }) +
      ui.kpi({ label: 'Son 5 gönderi etkileşimi', value: d.engagementLast5 === null || d.engagementLast5 === undefined ? N.DASH : f.int(d.engagementLast5), state: d.engagementLast5 === null || d.engagementLast5 === undefined ? 'na' : 'ok', foot: d.mediaError ? 'Gönderi verisi alınamadı' : 'beğeni + yorum', tip: '<b>Son 5 gönderi etkileşimi</b>: En son paylaşılan 5 gönderinin beğeni ve yorum toplamı. Tarih aralığına bağlı değildir; erişim (reach) değildir.' }) +
      '</div>';
    html += '<div class="n1i-grid"><div class="n1i-panel n1i-col-12" data-chart></div></div>' +
      '<div class="n1i-foot"><p>Erişim, gösterim ve gönderi bazlı performans oranları mevcut backend tarafından alınmadığı için gösterilmez; tahmin üretilmez.</p></div>';
    body.innerHTML = html;
    if (first && p && !p.error) N.motion.count(document.querySelector('#ig-f [data-v]'), p.followers_count, f.int);
    renderChart(values, seriesOk);
    if (first) N.motion.enter(root.querySelectorAll('.n1i-kpi, .n1i-panel'));
    N.height.schedule();
  }

  function renderChart(values, ok) {
    var el = root.querySelector('[data-chart]');
    var head = '<div class="n1i-panel__head"><div><h3 class="n1i-h2">Günlük yeni takipçi</h3><div class="n1i-panel__sub">Son 30 gün · bugün hariç · Meta follower_count</div></div></div>';
    if (!ok) { el.innerHTML = head + ui.state('info', 'Günlük seri yok', 'Meta bu hesap için günlük takipçi verisi döndürmedi. Geçmiş takipçi sayıları tahmin edilmez.'); return; }
    var keys = values.map(function (v) { return v.end_time ? String(v.end_time).slice(0, 10) : ''; });
    var nums = values.map(function (v) { return Number(v.value) || 0; });
    var tot = nums.reduce(function (a, b) { return a + b; }, 0), peak = Math.max.apply(null, nums), pk = nums.indexOf(peak);
    var summary = nums.length + ' gün içinde toplam ' + f.int(tot) + ' yeni takipçi. En yüksek gün ' + (keys[pk] ? f.dayLong(keys[pk]) : '—') + ' (' + f.int(peak) + '). Takipten çıkmalar bu sayıya dahil değildir.';
    el.innerHTML = head + '<div class="n1i-legend" aria-hidden="true"><span class="n1i-legend__item" style="color:var(--n1i-bar-edge)"><span class="n1i-legend__swatch n1i-legend__swatch--bar"></span><span style="color:var(--n1i-text-2)">Günlük yeni takipçi</span></span><span class="n1i-legend__item" style="color:var(--n1i-c1)"><span class="n1i-legend__swatch n1i-legend__swatch--bar"></span><span style="color:var(--n1i-text-2)">En yüksek gün</span></span></div>' +
      '<div class="n1i-chartbox n1i-chartbox--sm"><canvas role="img" aria-label="' + esc('Günlük yeni takipçi çubuk grafiği. ' + summary) + '"></canvas></div><p class="n1i-summary-text">' + esc(summary) + '</p>';
    N.charts.load().then(function (Chart) {
      var c = N.charts.color, cv = el.querySelector('canvas'); if (!cv) return;
      if (chart) chart.destroy();
      chart = N.charts.create(cv, function () { var c = N.charts.color; return {
        type: 'bar',
        data: { labels: keys.map(function (k) { return k ? f.dayShort(k) : ''; }), datasets: [{ label: 'Yeni takipçi', data: nums, backgroundColor: nums.map(function (v, i) { return v < 0 ? c('--n1i-neg') : (i === pk ? c('--n1i-bar-hi') : c('--n1i-bar')); }), borderColor: nums.map(function (v, i) { return i === pk ? c('--n1i-bar-hi-edge') : c('--n1i-bar-edge'); }), borderWidth: { top: 2, left: 0, right: 0, bottom: 0 }, borderSkipped: 'bottom', borderRadius: 6, maxBarThickness: 18 }] },
        options: { scales: { x: N.charts.axis({ grid: { display: false }, ticks: { color: c('--n1i-muted'), maxRotation: 0, autoSkip: true, maxTicksLimit: 8, font: { size: 12.5, weight: '500' } } }), y: N.charts.axis({ beginAtZero: true, ticks: { color: c('--n1i-muted'), precision: 0, maxTicksLimit: 4, font: { size: 12.5, weight: '500' } } }) },
          plugins: { tooltip: { callbacks: { title: function (it) { return keys[it[0].dataIndex] ? f.dayLong(keys[it[0].dataIndex]) : ''; }, label: function (it) { return 'Yeni takipçi: ' + f.int(it.parsed.y); } } } } }
      }; });
    }, function () {
      el.innerHTML = head + '<p class="n1i-summary-text">' + esc(summary) + '</p>';
    });
  }

  shell();
  N.height.start(root);
  var stop = N.watchdog(function () { if (received) return; root.querySelector('[data-body]').innerHTML = ui.state('warn', 'Instagram verisi gelmedi', 'Sayfa kodu bu bölüme veri göndermedi. Wix sayfa kodu hata yakaladığında bölüme mesaj göndermiyor. Sorun sürerse sayfayı yenileyin.'); document.getElementById('ig-recv').textContent = ''; N.height.schedule(); });
  N.bridge.listen(function (d) { stop(); render(d); }, {
    accept: function (d) { return ('profile' in d) || ('insights' in d) || ('followerGrowthLast30Days' in d); },
    onError: function () { root.querySelector('[data-body]').innerHTML = ui.state('error', 'Görüntüleme hatası', 'Gelen veri beklenen biçimde değil.'); }
  });
})();

};
runtime.N1I_MODULES['sheets'] = function(moduleN, document) {
/* 1N INTELLIGENCE — İş Takip modülü (#html4, Google Sheets, salt okunur)
   Sözleşme (değişmedi): Velo → widget: { values: [[...satır...], ...] }
     Sheets API hata döndürdüğünde mevcut sayfa kodu { values: undefined } gönderir; bu modül
     bunu hata olarak gösterir (eski bileşen sonsuz "yükleniyor"da kalıyordu).
   Tablo yapısı: başlık satırı "Öncelik" hücresini içeren ilk satırdır. Üstündeki satırlar
   özet satırlarıdır. Kullanılan sütunlar: Öncelik, Durum, Task, Tarih (+ varsa Açıklama, Kategori).
   Bu modül hiçbir veriyi geri yazmaz; yazma yetkisi yoktur. */
(function () {
  'use strict';
  var N = moduleN, esc = N.esc, ui = N.ui;
  var root = document.getElementById('n1i-root');
  var CLIENT = (N.cfg.client && N.cfg.client.name) || '';
  var WANTED = ['Öncelik', 'Durum', 'Task', 'Tarih'];
  var OPTIONAL = ['Açıklama', 'Kategori'];
  var model = null, filters = { q: '', pr: '', st: '' }, limit = 40, received = false;

  function norm(s) { return String(s === null || s === undefined ? '' : s).trim().toLocaleLowerCase('tr-TR'); }
  function fold(s) { return norm(s).replace(/ı/g, 'i').replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ö/g, 'o').replace(/ç/g, 'c').replace(/i̇/g, 'i'); }
  function statusOf(v) {
    var n = fold(v);
    if (n.indexOf('tamamlan') > -1) return { k: 'done', label: 'Tamamlandı', chip: 'pos', ic: 'ok' };
    if (n.indexOf('devam') > -1) return { k: 'doing', label: 'Devam ediyor', chip: 'info', ic: 'clock' };
    if (n.indexOf('bekli') > -1) return { k: 'wait', label: 'Bekliyor', chip: 'warn', ic: 'alert' };
    if (n.indexOf('iptal') > -1) return { k: 'cancel', label: 'İptal', chip: '', ic: 'close' };
    return { k: 'other', label: v ? String(v) : 'Belirtilmemiş', chip: '', ic: 'info' };
  }
  function priorityChip(v) {
    var n = fold(v);
    if (!n) return '<span class="n1i-chip">—</span>';
    if (n.indexOf('yuksek') > -1) return ui.chip('warn', v, 'up');
    if (n.indexOf('dusuk') > -1) return ui.chip('', v, 'down');
    return ui.chip('', v, 'flat');
  }
  /* Tarih: gg.aa.yyyy, g.a.yyyy, gg/aa/yyyy, yyyy-aa-gg desteklenir. Okunamayan tarih sıralamada sona gider. */
  function parseDate(s) {
    s = String(s || '').trim(); var m;
    if ((m = s.match(/^(\d{1,2})[./](\d{1,2})[./](\d{4})$/))) return Date.UTC(+m[3], +m[2] - 1, +m[1]);
    if ((m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/))) return Date.UTC(+m[1], +m[2] - 1, +m[3]);
    return null;
  }

  function shell() {
    root.innerHTML = '<section class="n1i-module" aria-labelledby="sh-title">' +
      N.header({ icon: 'sheets', tone: 'lilac', title: 'İş takip', meta: [CLIENT ? '<span>' + esc(CLIENT) + '</span>' : '', '<span>Kaynak: Google Sheets · salt okunur</span>', '<span id="sh-recv" class="n1i-loading-line"><span class="n1i-spin"></span>Yükleniyor…</span>', ui.demoChip()] }) +
      '<div data-body>' + ui.skelPanel(120) + '<div class="n1i-grid"><div class="n1i-col-12">' + ui.skelPanel(220) + '</div></div></div></section>';
    root.querySelector('h2').id = 'sh-title';
  }

  function build(values) {
    var hi = values.findIndex(function (r) { return Array.isArray(r) && r.some(function (c) { return norm(c) === 'öncelik'; }); });
    if (hi === -1) return { raw: true, header: values[0] || [], rows: values.slice(1) };
    var header = values[hi];
    function col(name) { return header.findIndex(function (h) { return norm(h) === norm(name); }); }
    var cols = WANTED.map(function (n) { return { name: n, i: col(n) }; });
    OPTIONAL.forEach(function (n) { var i = col(n); if (i > -1) cols.push({ name: n, i: i }); });
    var ti = col('Tarih');
    var rows = values.slice(hi + 1).filter(function (r) { return Array.isArray(r) && r.some(function (c) { return String(c || '').trim() !== ''; }); }).map(function (r, idx) {
      var o = { idx: idx, cells: {} };
      cols.forEach(function (c) { o.cells[c.name] = c.i > -1 ? (r[c.i] === undefined ? '' : r[c.i]) : ''; });
      o.date = ti > -1 ? parseDate(r[ti]) : null;
      o.status = statusOf(o.cells['Durum']);
      o.search = fold(cols.map(function (c) { return o.cells[c.name]; }).join(' '));
      return o;
    });
    rows.sort(function (a, b) { if (a.date === null && b.date === null) return a.idx - b.idx; if (a.date === null) return 1; if (b.date === null) return -1; return b.date - a.date; });
    var top = values.slice(0, hi).filter(function (r) { return Array.isArray(r) && r.some(function (c) { return String(c || '').trim() !== ''; }); });
    return { raw: false, cols: cols, missing: cols.filter(function (c) { return c.i === -1; }).map(function (c) { return c.name; }), rows: rows, top: top, badDates: rows.filter(function (r) { return r.cells['Tarih'] && r.date === null; }).length };
  }

  function render(values) {
    received = true;
    document.getElementById('sh-recv').textContent = ui.received();
    var body = root.querySelector('[data-body]');
    if (!Array.isArray(values)) { body.innerHTML = ui.state('error', 'İş takip verisi alınamadı', 'Google Sheets bu sekme için veri döndürmedi (erişim izni, sekme adı veya bağlantı sorunu olabilir). Bu boş bir liste değildir.'); N.height.schedule(); return; }
    if (!values.length) { body.innerHTML = ui.state('empty', 'İş takip tablosu boş', 'Sekmede henüz kayıt yok.'); N.height.schedule(); return; }
    var first = !model;
    model = build(values);
    if (model.raw) {
      body.innerHTML = ui.state('info', 'Beklenen başlık satırı bulunamadı', '"Öncelik" sütunu olmadığı için tablo olduğu gibi gösteriliyor.') +
        '<div class="n1i-tablewrap" style="margin-top:12px" tabindex="0" role="region" aria-label="İş takip tablosu"><table class="n1i-table"><thead><tr>' + model.header.map(function (h) { return '<th scope="col">' + esc(h) + '</th>'; }).join('') + '</tr></thead><tbody>' +
        model.rows.map(function (r) { return '<tr>' + model.header.map(function (_, i) { return '<td>' + esc(r[i]) + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>';
      N.height.schedule(); return;
    }
    var counts = { done: 0, doing: 0, wait: 0, cancel: 0, other: 0 };
    model.rows.forEach(function (r) { counts[r.status.k]++; });
    var prs = [], sts = [];
    model.rows.forEach(function (r) { var p = r.cells['Öncelik'], s = r.cells['Durum']; if (p && prs.indexOf(p) === -1) prs.push(p); if (s && sts.indexOf(s) === -1) sts.push(s); });

    var topHtml = model.top.length ? '<div class="n1i-panel" style="margin-bottom:12px"><div class="n1i-panel__head"><div><h3 class="n1i-h2">Tablo özeti</h3><div class="n1i-panel__sub">Sekmenin üst satırları, olduğu gibi</div></div></div><div class="n1i-tablewrap" tabindex="0" role="region" aria-label="Tablo özeti"><table class="n1i-table"><tbody>' +
      model.top.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + esc(c) + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div></div>' : '';

    body.innerHTML =
      (function () {
        var tot = model.rows.length || 1;
        var parts = [['done', 'Tamamlandı', 'var(--n1i-pos)', 'ok'], ['doing', 'Devam ediyor', 'var(--n1i-info)', 'clock'], ['wait', 'Bekliyor', 'var(--n1i-warn)', 'alert'], ['cancel', 'İptal', 'var(--n1i-faint)', 'close'], ['other', 'Diğer', 'var(--n1i-line-strong)', 'info']];
        return '<div class="n1i-panel"><div class="n1i-panel__head" style="margin-bottom:12px"><div><h3 class="n1i-h2">Durum dağılımı</h3><div class="n1i-panel__sub">' + N.fmt.int(model.rows.length) + ' kayıt · Sheets\'teki "Durum" sütununa göre</div></div></div>' +
          '<div class="n1i-stack" role="img" aria-label="' + esc(parts.filter(function (p) { return counts[p[0]]; }).map(function (p) { return p[1] + ' ' + counts[p[0]]; }).join(', ')) + '">' + parts.filter(function (p) { return counts[p[0]]; }).map(function (p) { return '<span style="width:' + (counts[p[0]] / tot * 100).toFixed(2) + '%;background:' + p[2] + '"></span>'; }).join('') + '</div>' +
          '<div class="n1i-dist">' + parts.map(function (p) { return '<div class="n1i-dist__item"><span class="n1i-dist__label"><span class="n1i-dist__dot" style="background:' + p[2] + '"></span>' + p[1] + '</span><span class="n1i-dist__value n1i-num">' + N.fmt.int(counts[p[0]]) + '</span></div>'; }).join('') + '</div></div>';
      })() +
      '<div class="n1i-grid"><div class="n1i-col-12">' + topHtml +
      '<div class="n1i-panel n1i-responsive-table">' +
      '<div class="n1i-panel__head"><div><h3 class="n1i-h2">Görevler</h3><div class="n1i-panel__sub" id="sh-count"></div></div></div>' +
      '<div style="display:grid;grid-template-columns:minmax(0,2fr) minmax(0,1fr) minmax(0,1fr);gap:8px;margin-bottom:12px" class="sh-filters">' +
      '<div class="n1i-field"><label for="sh-q">Ara</label><div class="n1i-searchbox">' + N.icon('search') + '<input id="sh-q" class="n1i-input" type="search" placeholder="Görev, durum veya tarih" autocomplete="off"></div></div>' +
      '<div class="n1i-field"><label for="sh-pr">Öncelik</label><select id="sh-pr" class="n1i-select"><option value="">Tümü</option>' + prs.map(function (p) { return '<option value="' + esc(p) + '">' + esc(p) + '</option>'; }).join('') + '</select></div>' +
      '<div class="n1i-field"><label for="sh-st">Durum</label><select id="sh-st" class="n1i-select"><option value="">Tümü</option>' + sts.map(function (p) { return '<option value="' + esc(p) + '">' + esc(p) + '</option>'; }).join('') + '</select></div>' +
      '</div><div data-list></div></div></div></div>' +
      '<div class="n1i-foot"><p>Satırlar Tarih sütununa göre yeniden eskiye sıralanır' + (model.badDates ? '; okunamayan ' + model.badDates + ' tarih sona alındı' : '') + '.</p>' + (model.missing.length ? '<p>Tabloda bulunamayan sütun: ' + esc(model.missing.join(', ')) + '.</p>' : '') + '<p>Bu bölüm salt okunurdur; değişiklikler Google Sheets üzerinden yapılır.</p></div>';
    var st = document.createElement('style'); st.textContent = '@media (max-width:639px){.sh-filters{grid-template-columns:1fr 1fr !important}.sh-filters .n1i-field:first-child{grid-column:1/-1}}';
    body.appendChild(st);
    document.getElementById('sh-q').value = filters.q;
    document.getElementById('sh-pr').value = filters.pr;
    document.getElementById('sh-st').value = filters.st;
    drawList();
    if (first) N.motion.enter(root.querySelectorAll('.n1i-kpi, .n1i-panel'));
    N.height.schedule();
  }

  function drawList() {
    var el = root.querySelector('[data-list]'); if (!el) return;
    var q = fold(filters.q);
    var rows = model.rows.filter(function (r) {
      if (filters.pr && r.cells['Öncelik'] !== filters.pr) return false;
      if (filters.st && r.cells['Durum'] !== filters.st) return false;
      if (q && r.search.indexOf(q) === -1) return false;
      return true;
    });
    document.getElementById('sh-count').textContent = N.fmt.int(rows.length) + ' / ' + N.fmt.int(model.rows.length) + ' kayıt';
    if (!rows.length) { el.innerHTML = ui.state('empty', 'Filtreye uyan kayıt yok', 'Aramayı veya filtreleri değiştirin.', '<button type="button" class="n1i-btn n1i-btn--sm" data-clear>Filtreleri temizle</button>'); N.height.schedule(); return; }
    var shown = rows.slice(0, limit);
    var cols = model.cols.filter(function (c) { return c.i > -1; });
    function cell(r, c) {
      var v = r.cells[c.name];
      if (c.name === 'Durum') return ui.chip(r.status.chip, r.status.label, r.status.ic);
      if (c.name === 'Öncelik') return priorityChip(v);
      return esc(v);
    }
    el.innerHTML = '<div class="n1i-tablewrap" tabindex="0" role="region" aria-label="Görev tablosu"><table class="n1i-table"><thead><tr>' + cols.map(function (c) { return '<th scope="col">' + esc(c.name === 'Task' ? 'Görev' : c.name) + '</th>'; }).join('') + '</tr></thead><tbody>' +
      shown.map(function (r) { return '<tr>' + cols.map(function (c) { return '<td' + (c.name === 'Task' || c.name === 'Açıklama' ? ' class="is-name"' : (c.name === 'Tarih' ? ' style="white-space:nowrap"' : '')) + '>' + cell(r, c) + '</td>'; }).join('') + '</tr>'; }).join('') +
      '</tbody></table></div>' +
      '<ul class="n1i-cards" aria-label="Görevler">' + shown.map(function (r) {
        return '<li class="n1i-ccard"><div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px">' + ui.chip(r.status.chip, r.status.label, r.status.ic) + priorityChip(r.cells['Öncelik']) + '</div><div class="n1i-ccard__name">' + esc(r.cells['Task'] || '(görev adı yok)') + '</div>' +
          (r.cells['Açıklama'] ? '<p style="margin:0 0 6px;color:var(--n1i-text-2);font-size:var(--n1i-fs-sm)">' + esc(r.cells['Açıklama']) + '</p>' : '') +
          '<div style="color:var(--n1i-muted);font-size:var(--n1i-fs-xs)">' + esc(r.cells['Tarih'] || 'Tarih yok') + (r.cells['Kategori'] ? ' · ' + esc(r.cells['Kategori']) : '') + '</div></li>';
      }).join('') + '</ul>' +
      (rows.length > shown.length ? '<div style="margin-top:12px"><button type="button" class="n1i-btn n1i-btn--sm" data-more>Daha fazla göster (' + N.fmt.int(rows.length - shown.length) + ')</button></div>' : '');
    N.height.schedule();
  }

  root.addEventListener('input', function (e) {
    if (!model) return;
    if (e.target.id === 'sh-q') { filters.q = e.target.value; limit = 40; drawList(); }
  });
  root.addEventListener('change', function (e) {
    if (!model) return;
    if (e.target.id === 'sh-pr') { filters.pr = e.target.value; limit = 40; drawList(); }
    if (e.target.id === 'sh-st') { filters.st = e.target.value; limit = 40; drawList(); }
  });
  root.addEventListener('click', function (e) {
    if (e.target.closest('[data-more]')) { limit += 40; drawList(); }
    if (e.target.closest('[data-clear]')) { filters = { q: '', pr: '', st: '' }; ['sh-q', 'sh-pr', 'sh-st'].forEach(function (id) { document.getElementById(id).value = ''; }); drawList(); }
  });

  shell();
  N.height.start(root);
  var stop = N.watchdog(function () { if (received) return; root.querySelector('[data-body]').innerHTML = ui.state('warn', 'İş takip verisi gelmedi', 'Sayfa kodu bu bölüme veri göndermedi. Sorun sürerse sayfayı yenileyin.'); document.getElementById('sh-recv').textContent = ''; N.height.schedule(); });
  N.bridge.listen(function (d) { stop(); render(d.values); }, {
    accept: function (d) { return 'values' in d; },
    onError: function () { root.querySelector('[data-body]').innerHTML = ui.state('error', 'Görüntüleme hatası', 'Gelen veri beklenen biçimde değil.'); }
  });
})();

};
runtime.N1I_MODULES['summary'] = function(moduleN, document) {
/* 1N INTELLIGENCE — Genel Özet modülü (#html18)
   Sözleşme (değişmedi): Velo sayfa açılışında BİR KEZ gönderir:
     { visitors, sessions, visitorSeries:[{date:'YYYYMMDD', value}], totalSpend, spendPeriodLabel,
       totalClicks, followers, followerGrowth30, followerSeries:[{value, end_time}] }
   İsteğe bağlı, geriye uyumlu ek alan (önerilir, Velo'da henüz YOK):
     sourceStatus: { ga, meta7, google7, metaMtd, googleMtd, instagram } değerleri 'ok' | 'error' | 'missing'
   sourceStatus gelmezse 0 değerleri "doğrulanamadı" notuyla gösterilir, çünkü mevcut sayfa kodu
   veri alınamadığında da 0 gönderiyor. Her kart kendi dönemini gösterir; tek bir filtreye bağlı değildir. */
(function () {
  'use strict';
  var N = moduleN, f = N.fmt, esc = N.esc, ui = N.ui;
  var root = document.getElementById('n1i-root');
  var visChart = null, folChart = null, received = false;
  var MONTHS = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];

  function shell() {
    root.innerHTML = '<section class="n1i-module" aria-labelledby="sum-title">' +
      N.header({ icon: 'summary', tone: 'lime', title: 'Genel özet', meta: ['<span>Her kart kendi döneminde</span>', '<span id="sum-recv" class="n1i-loading-line"><span class="n1i-spin"></span>Yükleniyor…</span>', ui.demoChip()] }) +
      '<div data-body class="n1i-wash"><div class="n1i-hero"><div>' + ui.skelPanel(300) + '</div><div class="n1i-hero__side">' + [0, 1, 2, 3].map(function (i) { return '<div class="n1i-kpi' + (i > 1 ? ' n1i-span2' : '') + '" aria-hidden="true"><div class="n1i-skel n1i-skel--text" style="width:55%"></div><div class="n1i-skel n1i-skel--value"></div><div class="n1i-skel n1i-skel--text" style="width:40%"></div></div>'; }).join('') + '</div></div></div></section>';
    root.querySelector('h2').id = 'sum-title';
  }

  function status(d, key) { return d.sourceStatus && d.sourceStatus[key] ? d.sourceStatus[key] : null; }

  function render(d) {
    received = true;
    var first = !root.querySelector('[data-rendered]');
    document.getElementById('sum-recv').textContent = ui.received();
    var hasStatus = !!d.sourceStatus;

    // ---- Oturum (GA4, son 7 gün). Ek satır: ziyaretçi başına oturum (aynı karttaki iki gerçek değerden) ----
    var gaSt = status(d, 'ga');
    var gaFail = gaSt === 'error' || gaSt === 'missing';
    /* V2.2: GA4 isteği başarılı ama satır yoksa bu gerçek sıfırdır ("veri alınamadı" değil) */
    if (gaSt === 'empty') { if (d.visitors === null || d.visitors === undefined) d.visitors = 0; if (d.sessions === null || d.sessions === undefined) d.sessions = 0; }
    function sessionsCard() {
      var tip = '<b>Oturum</b>: GA4 sessions, ' + (d.spendPeriod ? 'bugün dahil son 7 takvim günü' : 'son 7 gün + bugün') + '. <b>Ziyaretçi başına</b>: oturum ÷ aktif kullanıcı (aynı dönem).';
      if (gaFail || d.sessions === null || d.sessions === undefined) return ui.kpi({ id: 's-ses', label: 'Oturum', value: N.DASH, state: 'na', foot: '<b>Son 7 gün</b> · ' + (gaFail ? ui.chip('neg', 'Veri alınamadı', 'error') : 'veri yok'), tip: tip, cls: 'n1i-glass' });
      var ratio = f.isNum(d.visitors) && Number(d.visitors) > 0 ? f.dec2(Number(d.sessions) / Number(d.visitors)) : null;
      return ui.kpi({ id: 's-ses', label: 'Oturum', value: f.int(d.sessions), foot: '<b>Son 7 gün</b> · bugün dahil', tip: tip, cls: 'n1i-glass',
        aside: ratio ? '<span>Ziyaretçi başına</span><b class="n1i-num">' + ratio + '</b>' : '' });
    }

    // ---- Reklam kartları ----
    function adsCard(id, label, value, keys, periodHtml, formatter, tip, accent, aside, compact) {
      var sts = keys.map(function (k) { return status(d, k); });
      var bad = sts.filter(function (s) { return s === 'error' || s === 'missing'; }).length;
      var foot = periodHtml, state = 'ok', shown = formatter(value), cmp = compact ? compact(value) : null;
      if (!hasStatus) {
        if (Number(value) === 0) foot += ' · <span title="Mevcut sayfa kodu veri alınamadığında da 0 gönderir">0 doğrulanamadı</span>';
      } else if (bad === keys.length) { shown = N.DASH; cmp = null; state = 'na'; foot += ' · ' + ui.chip('neg', 'Veri alınamadı', 'error'); }
      else if (bad > 0) { foot += ' · ' + ui.chip('warn', 'Kısmi: ' + (sts[0] === 'ok' ? 'yalnızca Meta' : 'yalnızca Google'), 'alert'); }
      return ui.kpi({ id: id, label: label, value: shown, compact: cmp, foot: foot, state: state, tip: tip, aside: state === 'ok' ? aside : '', cls: (accent && state === 'ok' ? 'n1i-kpi--accent' : 'n1i-glass') + (accent ? ' n1i-span2' : '') });
    }
    var now = new Date(), monthLabel = d.spendPeriodLabel || (MONTHS[now.getMonth()] + ' Ayı');
    var monthName = monthLabel.replace(' Ayı', '');
    /* V2.2: dönem sunucudan (Europe/Istanbul takvim günü). Yoksa V2.1 davranışı. */
    var v22 = !!d.spendPeriod;
    var todayDay = v22 ? Number(d.spendPeriod.end.slice(8, 10)) : Number(f.todayISO().slice(8, 10));
    var spendNote = v22 ? 'Ayın 1\'inden bugüne (Türkiye saatiyle), bugün devam ediyor.' : 'Not: mevcut sayfa kodunda Meta ay başı hesabı önceki ayın son gününü de içeriyor; düzeltme onay bekliyor (DATA_ACCURACY_REVIEW V2).';
    var acc = d.accountCheck, curNote = '';
    if (acc) {
      var plats = [acc.meta, acc.gads].filter(Boolean);
      var bad = plats.some(function (x) { return x.currencyOk === false; });
      var verified = plats.length && plats.every(function (x) { return x.currencyOk === true; });
      curNote = bad ? ' ' + ui.chip('warn', 'Para birimi uyuşmuyor', 'alert') : (verified ? '' : ' · <span title="Hesap para birimi API\'den doğrulanmadı">para birimi doğrulanmadı</span>');
    }

    var side = '<div class="n1i-hero__side">' +
      sessionsCard() +
      adsCard('s-clk', 'Reklam tıklaması', d.totalClicks, ['meta7', 'google7'], '<b>Son 7 gün</b> · bugün dahil', f.int,
        '<b>Reklam tıklaması</b>: Meta "clicks (tümü)" ile Google Ads "clicks" toplamı. İki platformun tıklama tanımı aynı değildir; toplam yaklaşık bir göstergedir.', false,
        '<span>Kaynak</span><b>Meta + Google</b>') +
      adsCard('s-spd', 'Reklam harcaması', d.totalSpend, ['metaMtd', 'googleMtd'], '<b>' + esc(monthName) + '</b> · ay başından bugüne' + curNote, f.money,
        '<b>Reklam harcaması</b>: Bu ayın 1\'inden bugüne Meta + Google Ads harcaması. Diğer bölümlerdeki 7/30 gün seçiminden bağımsızdır. ' + spendNote, true,
        '<span>Dönem</span><b>1–' + todayDay + ' ' + esc(monthName) + '</b>', f.moneyShort) +
      '<div class="n1i-kpi n1i-glass n1i-span2" id="s-ig" data-ig></div>' +
      '</div>';

    var body = root.querySelector('[data-body]');
    body.setAttribute('data-rendered', '1');
    body.innerHTML = '<div class="n1i-hero"><div class="n1i-hero__main n1i-glass" id="s-vis" data-vis></div>' + side + '</div>' +
      '<div class="n1i-foot"><p>Dönemler farklıdır: ziyaretçi, oturum ve tıklama son 7 gün; harcama ay başından bugüne; takipçi mevcut toplam; yeni takipçi Meta\'nın günlük verisi (bugün hariç, gelen gün sayısı kadar). Bu özet sayfa açılışında bir kez hesaplanır, bölümlerdeki aralık seçimlerinden etkilenmez.</p>' +
      (hasStatus ? '' : '<p>Kaynak durumu bilgisi gelmediği için 0 değerler doğrulanamıyor (bkz. DATA_CONTRACTS.md, önerilen sourceStatus alanı).</p>') + '</div>';

    renderVisitors(d, gaFail);
    renderInstagram(d);
    if (first && !gaFail) { N.motion.count(document.querySelector('#s-vis [data-v]'), d.visitors, f.int); N.motion.count(document.querySelector('#s-ses [data-v]'), d.sessions, f.int); }
    N.fitNumbers(root, true);
    if (first) N.motion.enter(root.querySelectorAll('.n1i-kpi, .n1i-hero__main'));
    N.height.schedule();
  }

  function renderVisitors(d, gaFail) {
    var el = root.querySelector('[data-vis]');
    var na = gaFail || d.visitors === null || d.visitors === undefined;
    var head = '<div class="n1i-kpi__top"><span class="n1i-kpi__label">Web sitesi ziyaretçisi</span>' + ui.tip('<b>Ziyaretçi</b>: GA4 aktif kullanıcı (activeUsers), ' + (d.spendPeriod ? 'bugün dahil son 7 takvim günü' : 'son 7 gün + bugün') + '. Tarayıcı/cihaz bazlı tahmindir.', 'Ziyaretçi açıklaması') + '</div>' +
      '<div class="n1i-hero__value n1i-num" data-v>' + (na ? N.DASH : f.int(d.visitors)) + '</div>' +
      '<div class="n1i-kpi__foot" style="margin:0 0 18px"><b>Son 7 gün</b> · bugün dahil' + (gaFail ? ' · ' + ui.chip('neg', 'Veri alınamadı', 'error') : (na ? ' · veri yok' : '')) + '</div>' +
      '<div class="n1i-legend" data-leg style="margin:4px 0 6px"><span class="n1i-legend__item"><span class="n1i-legend__swatch n1i-legend__swatch--bar" style="color:var(--n1i-bar-edge)"></span>Günlük aktif kullanıcı</span><span class="n1i-legend__item"><span class="n1i-legend__swatch n1i-legend__swatch--bar" style="color:var(--n1i-bar-hi)"></span>En yüksek gün</span></div>';
    var s = Array.isArray(d.visitorSeries) ? d.visitorSeries : [];
    if (gaFail || !s.length) head = head.replace(/<div class="n1i-legend" data-leg[\s\S]*?<\/div>$/, '');
    if (gaFail) { el.innerHTML = head + ui.state('error', 'GA4 verisi alınamadı', 'Trend çizilemedi. Bu bir sıfır değer değildir.'); return; }
    if (!s.length) { el.innerHTML = head + ui.state('empty', 'Gösterilecek günlük veri yok', 'GA4 bu dönem için gün satırı döndürmedi.'); return; }
    var al = N.alignDays(s, function (x) { return x.date; }, function (x) { return Number(x.value) || 0; }, 0);
    var todayKey = f.todayISO().replace(/-/g, ''), partial = al.keys[al.keys.length - 1] === todayKey;
    var peak = Math.max.apply(null, al.values), pi = al.values.indexOf(peak);
    var summary = 'En yüksek gün ' + al.labels[pi] + ' (' + f.int(peak) + ').' + (partial ? ' Son çubuk bugündür ve gün henüz bitmedi.' : '') + ' Günlük değerlerin toplamı 7 günlük ziyaretçi sayısına eşit değildir; aynı kişi farklı günlerde tekrar sayılır.';
    el.innerHTML = head + '<div class="n1i-chartbox n1i-chartbox--sm" style="flex:1;min-height:170px"><canvas role="img" aria-label="' + esc('Günlük aktif kullanıcı çubuk grafiği. ' + summary) + '"></canvas></div><p class="n1i-summary-text">' + esc(summary) + '</p>';
    N.charts.load().then(function (Chart) {
      var c = N.charts.color, cv = el.querySelector('canvas'); if (!cv) return;
      if (visChart) visChart.destroy();
      visChart = N.charts.create(cv, function () { var c = N.charts.color; return {
        type: 'bar',
        data: { labels: al.labels, datasets: [{ label: 'Aktif kullanıcı', data: al.values, backgroundColor: al.values.map(function (v, i) { return partial && i === al.values.length - 1 ? c('--n1i-bar-partial') : (i === pi ? c('--n1i-bar-hi') : c('--n1i-bar')); }), borderColor: al.values.map(function (v, i) { return i === pi ? c('--n1i-bar-hi-edge') : c('--n1i-bar-edge'); }), borderWidth: { top: 2, left: 0, right: 0, bottom: 0 }, borderSkipped: 'bottom', borderRadius: 10, maxBarThickness: 46 }] },
        options: { scales: { x: N.charts.axis({ grid: { display: false }, ticks: { color: c('--n1i-muted'), font: { size: 12.5, weight: '500' }, maxRotation: 0, autoSkipPadding: 10 } }), y: N.charts.axis({ beginAtZero: true, ticks: { color: c('--n1i-muted'), maxTicksLimit: 4, precision: 0, callback: function (v) { return f.compact(v); } } }) },
          plugins: { tooltip: { callbacks: { title: function (it) { return f.dayLong(al.keys[it[0].dataIndex]) + (partial && it[0].dataIndex === al.keys.length - 1 ? ' (devam ediyor)' : ''); }, label: function (it) { return 'Aktif kullanıcı: ' + f.int(it.parsed.y); } } } } }
      }; });
    }, function () {
      el.innerHTML = head + '<ul class="n1i-shares">' + al.keys.map(function (k, i) { return '<li class="n1i-share"><span class="n1i-share__name">' + f.dayLong(k) + '</span><span class="n1i-share__val n1i-num">' + f.int(al.values[i]) + '</span></li>'; }).join('') + '</ul>';
    });
  }

  function renderInstagram(d) {
    var el = root.querySelector('[data-ig]');
    var igSt = status(d, 'instagram'), igFail = igSt === 'error' || igSt === 'missing';
    var head = '<div class="n1i-kpi__top"><span class="n1i-kpi__label">Instagram takipçisi</span>' + ui.tip('<b>Takipçi</b>: profildeki güncel toplam. <b>Yeni takipçi</b>: Meta Instagram API\'nin günlük <i>follower_count</i> değerlerinin son 30 gün (bugün hariç) toplamı. Bu metrik yalnızca yeni takipleri sayar; takipten çıkmalar düşülmez, bu yüzden net değişim değildir.', 'Instagram açıklaması') + '</div>';
    if (igFail || d.followers === null || d.followers === undefined) {
      el.classList.add('n1i-kpi--na');
      el.innerHTML = head + '<div class="n1i-kpi__value n1i-num" data-v>' + N.DASH + '</div><div class="n1i-kpi__foot"><b>Güncel toplam</b> · ' + (igFail ? ui.chip('neg', 'Veri alınamadı', 'error') : 'veri yok') + '</div>';
      return;
    }
    var series = (Array.isArray(d.followerSeries) ? d.followerSeries : []).map(function (v) { return Number(v.value) || 0; });
    var g = d.followerGrowth30;
    var covN = d.followerCoverage && d.followerCoverage.days ? d.followerCoverage.days : series.length;
    var covTxt = covN ? 'Son ' + covN + ' gün · bugün hariç' : 'Dönem doğrulanamadı';
    // Mevcut backend, Meta günlük seriyi döndüremediğinde değeri 0 olarak hesaplıyor: seri boşsa doğrulanamaz.
    var known = g !== null && g !== undefined && series.length > 0;
    var chip = !known ? ui.chip('', 'Yeni takipçi doğrulanamadı', 'info') : g > 0 ? ui.chip('pos', '+' + f.int(g) + ' yeni takipçi', 'up') : ui.chip('', 'Yeni takipçi yok', 'flat');
    el.innerHTML = head +
      '<div class="n1i-kpi__row"><div><div class="n1i-kpi__value n1i-num" id="s-fol" data-v>' + f.int(d.followers) + '</div>' +
      '<div class="n1i-kpi__foot" style="margin-top:8px"><b>Güncel toplam</b> ' + chip + '</div></div>' +
      (series.length ? '<div class="n1i-mini"><canvas role="img" aria-label="' + esc(covTxt) + ': günlük yeni takipçi sayısı çubuk grafiği"></canvas></div>' : '') + '</div>' +
      '<div class="n1i-kpi__aside"><span>Yeni takipçi dönemi</span><b>' + esc(covTxt) + '</b></div>';
    if (!series.length) return;
    N.charts.load().then(function (Chart) {
      var cv = el.querySelector('canvas'); if (!cv) return;
      if (folChart) folChart.destroy();
      var ends = (d.followerSeries || []).map(function (v) { return v.end_time ? String(v.end_time).slice(0, 10) : ''; });
      var peak = Math.max.apply(null, series);
      folChart = N.charts.create(cv, function () { var c = N.charts.color; return {
        type: 'bar',
        data: { labels: ends.map(function (e) { return e ? f.dayShort(e) : ''; }), datasets: [{ label: 'Yeni takipçi', data: series, backgroundColor: series.map(function (v) { return v === peak ? c('--n1i-bar-hi') : c('--n1i-bar'); }), borderColor: series.map(function (v) { return v === peak ? c('--n1i-bar-hi-edge') : c('--n1i-bar-edge'); }), borderWidth: { top: 1.5, left: 0, right: 0, bottom: 0 }, borderSkipped: 'bottom', borderRadius: 3, maxBarThickness: 9 }] },
        options: { layout: { padding: 0 }, scales: { x: { display: false }, y: { display: false, beginAtZero: true } },
          plugins: { tooltip: { callbacks: { title: function (it) { return ends[it[0].dataIndex] ? f.dayLong(ends[it[0].dataIndex]) : ''; }, label: function (it) { return 'Yeni takipçi: ' + f.int(it.parsed.y); } } } } }
      }; });
    }, function () {});
  }

  shell();
  N.height.start(root);
  var stopWatch = N.watchdog(function () {
    if (received) return;
    root.querySelector('[data-body]').innerHTML = ui.state('warn', 'Özet verisi gelmedi', 'Sayfa kodu bu bölüme veri göndermedi. Özet, diğer kaynakların ilk yüklemesi bittikten sonra bir kez gönderilir; bağlantı yavaşsa birkaç saniye sürebilir. Sorun sürerse sayfayı yenileyin.');
    document.getElementById('sum-recv').textContent = '';
    N.height.schedule();
  });
  N.bridge.listen(function (d) { stopWatch(); render(d); }, {
    accept: function (d) { return ('visitors' in d) || ('totalSpend' in d) || ('followers' in d); },
    onError: function () { root.querySelector('[data-body]').innerHTML = ui.state('error', 'Görüntüleme hatası', 'Gelen veri beklenen biçimde değil.'); }
  });
})();

};
runtime.N1I_MODULES['workspace'] = function(moduleN, document) {
/* 1N INTELLIGENCE V2.2 — Çalışma alanı: marka, bölüm navigasyonu ve tema kontrolü (#htmlNav, yeni embed)
   Wix site menüsünden ayrıdır; yalnızca bu sayfadaki dashboard bölümlerine geçiş sağlar.
   Sözleşme (V2 ile aynı; Velo eki gerekir, mevcut sözleşmeleri değiştirmez):
     widget → Velo: { action:'n1iNavigate', target }        Velo: $w('#htmlX').scrollTo()
     Velo → widget: { action:'n1iActive', target }          Velo: onViewportEnter
     widget → Velo: { action:'n1iSetTheme', theme }         Velo: tercihi saklar, bütün embed'lere yayınlar
     Velo → bütün embed'ler: { action:'n1iTheme', theme }   (çekirdek uygular)
   V2.1:
     - Masaüstü/tablet: iki satır. Üstte müşteri adı + ürün kimliği + tema; altta ikon + kısa adlı sekmeler.
       Sekmeler sığmazsa yatay kaydırılır (kenar soluklaşması + ok düğmeleri). Yazı küçültülmez.
     - Mobil (< 720 px): sekmeler "Bölüm" düğmesindeki cam menüye taşınır; düğme etkin bölümün adını gösterir.
     - Tema kontrolü her genişlikte görünür (güneş / ay, 44 px dokunma alanı).
     - Etkin sekme kayan gösterge ile belirtilir (GSAP varsa 240 ms; yoksa / hareket azaltmada anında).
   V2.2 — erişim kodu kapısı (yalnızca Velo isterse görünür; istemezse V2.1 ile aynı):
     Velo → widget: { action:'n1iAuthRequired', reason, remember }   kapıyı göster
     widget → Velo: { action:'n1iAuthSubmit', code, remember }       kod alanı gönderimden hemen sonra temizlenir
     Velo → widget: { action:'n1iAuthResult', ok, message, retryAfterSec }
     widget → Velo: { action:'n1iSignOut' }
   Oturum belirteci bu embed'e hiç gelmez.
   Bu embed Wix içinde "sticky" DEĞİLDİR: iFrame kendi dışına sabitlenemez. Wix Studio'da bölüm sabitleme
   ayrıca denenmeli (WIX_SETUP.md). Tema düğmesi temayı KENDİSİ değiştirmez; yalnızca isteği iletir. */
(function () {
  'use strict';
  var N = moduleN, esc = N.esc, ui = N.ui;
  var root = document.getElementById('n1i-root');
  var c = N.cfg.client || {};
  var mods = Array.isArray(c.modules) ? c.modules.filter(function (m) { return m.enabled !== false; }) : [];
  var active = mods.length ? mods[0].id : null, menuOpen = false, pendingTimer = 0, userNavUntil = 0, userNavTarget = null;

  var SUN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4L6 18M18 6l1.4-1.4"/></svg>';
  var MOON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>';
  var OUT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4M10 16l-4-4 4-4M6 12h10"/></svg>';
  var EYE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="2.8"/></svg>';
  var LEFT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>';
  var RIGHT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';

  function label(id) { for (var i = 0; i < mods.length; i++) if (mods[i].id === id) return mods[i].label; return 'Bölümler'; }
  function icon(id) { for (var i = 0; i < mods.length; i++) if (mods[i].id === id) return mods[i].icon || 'info'; return 'menu'; }
  function links(cls) {
    return mods.map(function (m) { return '<li><a href="#' + esc(m.id) + '" class="' + cls + '" data-nav="' + esc(m.id) + '"' + (m.id === active ? ' aria-current="true"' : '') + '>' + N.icon(m.icon || 'info') + '<span>' + esc(m.label) + '</span></a></li>'; }).join('');
  }

  root.innerHTML = '<div class="n1i-wash ws-wrap"><nav class="ws n1i-glass" aria-label="Rapor bölümleri">' +
    '<div class="ws__top">' +
      '<div class="ws__id"><span class="ws__mark" aria-hidden="true" translate="no">1N</span>' +
        '<div class="ws__names"><div class="ws__client">' + esc(c.name || 'Müşteri') + '</div>' +
        '<div class="ws__product"><span translate="no">1N Intelligence</span><span class="ws__dot" aria-hidden="true"></span><span>Dijital performans raporu</span></div></div>' +
        ui.demoChip() + '</div>' +
      '<div class="ws__tools">' +
        '<button type="button" class="ws__toggle" aria-expanded="false" aria-controls="ws-menu"><span class="ws__toggle-ic">' + N.icon(icon(active)) + '</span><span class="ws__toggle-t">' + esc(label(active)) + '</span>' + N.icon('chevron', 'ws__chev') + '<span class="n1i-sr"> — bölüm menüsü</span></button>' +
        '<button type="button" class="ws__out" data-signout hidden aria-label="Oturumu kapat" title="Oturumu kapat">' + OUT + '</button>' +
        '<div class="n1i-seg ws__theme" role="group" aria-label="Tema">' +
          '<button type="button" class="n1i-seg__btn" data-theme-btn="light" aria-pressed="true" aria-label="Açık tema">' + SUN + '<span class="ws__tlabel" aria-hidden="true">Açık</span></button>' +
          '<button type="button" class="n1i-seg__btn" data-theme-btn="dark" aria-pressed="false" aria-label="Koyu tema">' + MOON + '<span class="ws__tlabel" aria-hidden="true">Koyu</span></button>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="ws__tabs">' +
      '<button type="button" class="ws__arrow ws__arrow--l" data-scroll="-1" aria-label="Önceki bölümler" tabindex="-1" hidden>' + LEFT + '</button>' +
      '<ul class="ws__links" role="list"><li class="ws__ind" aria-hidden="true" role="presentation"></li>' + links('ws__link') + '</ul>' +
      '<button type="button" class="ws__arrow ws__arrow--r" data-scroll="1" aria-label="Sonraki bölümler" tabindex="-1" hidden>' + RIGHT + '</button>' +
    '</div></nav>' +
    '<div class="ws__menu n1i-glass n1i-glass--strong" id="ws-menu" hidden><ul role="list">' + links('ws__mlink') + '</ul></div>' +
    '<div class="ws__msgwrap"><p class="ws__msg n1i-toast n1i-glass" role="status" aria-live="polite" hidden></p></div>' +
    '<section class="ws__gate n1i-glass n1i-glass--strong" aria-labelledby="ws-gate-t" hidden>' +
      '<div class="ws__gate-ic" aria-hidden="true">' + N.icon('lock') + '</div>' +
      '<div class="ws__gate-body"><h2 class="ws__gate-t" id="ws-gate-t">Rapor erişim kodu</h2>' +
      '<p class="ws__gate-p">Bu rapor yalnızca size verilen erişim koduyla açılır. Kodu 1N Digital Media ekibinden alabilirsiniz.</p>' +
      '<form class="ws__form" novalidate autocomplete="on">' +
        '<label class="ws__lbl" for="ws-code">Erişim kodu</label>' +
        '<div class="ws__field"><input id="ws-code" name="password" type="password" inputmode="text" autocomplete="current-password" autocapitalize="characters" spellcheck="false" maxlength="80" required aria-describedby="ws-gerr">' +
          '<button type="button" class="ws__eye" data-eye aria-pressed="false" aria-label="Kodu göster">' + EYE + '</button></div>' +
        '<label class="ws__rem" hidden><input type="checkbox" data-remember> <span>Bu cihazda 30 gün hatırla</span></label>' +
        '<p class="ws__gerr" id="ws-gerr" role="alert"></p>' +
        '<button type="submit" class="n1i-btn ws__go" data-go>Raporu aç</button>' +
      '</form></div></section></div>';

  var st = document.createElement('style');
  st.textContent = '.n1i-root{padding-top:16px;padding-bottom:10px}' +
    '.ws-wrap::before{height:100%;inset:-6px -6px -6px -6px}' +
    '.ws{border-radius:26px;padding:12px 12px 10px}' +
    '.ws__top{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:2px 4px 12px 6px}' +
    '.ws__id{display:flex;align-items:center;gap:14px;min-width:0}' +
    '.ws__mark{width:44px;height:44px;border-radius:14px;display:grid;place-items:center;background:var(--n1i-accent);color:var(--n1i-accent-ink);font-family:var(--n1i-font-display);font-weight:600;font-size:19px;letter-spacing:.02em;flex:none;box-shadow:inset 0 1px 0 rgba(255,255,255,.55),0 4px 12px -4px rgba(87,141,25,.55)}' +
    '.ws__names{min-width:0}' +
    '.ws__client{font-weight:600;font-size:23px;line-height:1.12;letter-spacing:-.018em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--n1i-text)}' +
    '.ws__product{display:flex;align-items:center;gap:8px;margin-top:3px;font-size:var(--n1i-fs-sm);font-weight:500;color:var(--n1i-muted);white-space:nowrap}' +
    '.ws__product span:first-child{color:var(--n1i-text-2);font-weight:600}' +
    '.ws__dot{width:3px;height:3px;border-radius:50%;background:var(--n1i-faint);flex:none}' +
    '.ws__tools{display:flex;align-items:center;gap:8px;flex:none}' +
    '.ws__theme .n1i-seg__btn{display:inline-flex;align-items:center;gap:7px;min-height:40px;min-width:44px;padding:0 14px;justify-content:center}' +
    '.ws__theme svg{width:17px;height:17px;flex:none}' +
    '.ws__theme[aria-busy="true"]{opacity:.72}' +
    /* sekme satırı */
    '.ws__tabs{position:relative;display:flex;align-items:center;border-radius:18px;background:var(--n1i-glass-tint);box-shadow:inset 0 0 0 1px var(--n1i-glass-edge)}' +
    '.ws__links{position:relative;display:flex;gap:2px;list-style:none;margin:0;padding:5px;overflow-x:auto;scrollbar-width:none;scroll-behavior:smooth;flex:1;min-width:0;isolation:isolate}' +
    '.ws__links::-webkit-scrollbar{display:none}' +
    '.ws__links li{flex:1 0 auto}' +
    '.ws__ind{position:absolute;z-index:-1;top:5px;bottom:5px;left:0;width:0;border-radius:13px;background:var(--n1i-ink);box-shadow:0 1px 2px rgba(0,0,0,.14),0 6px 14px -4px rgba(0,0,0,.22);opacity:0;pointer-events:none}' +
    '.ws__links.has-ind .ws__ind{opacity:1}' +
    '.ws__link{position:relative;display:flex;align-items:center;justify-content:center;gap:8px;min-height:42px;padding:0 15px;border-radius:13px;color:var(--n1i-text-2);text-decoration:none;font-size:14px;font-weight:600;white-space:nowrap;transition:color var(--n1i-dur-fast) var(--n1i-ease),background-color var(--n1i-dur-fast) var(--n1i-ease)}' +
    '.ws__link svg,.ws__mlink svg{width:17px;height:17px;flex:none}' +
    '.ws__link:hover{color:var(--n1i-text);background:var(--n1i-surface)}' +
    '.ws__link[aria-current="true"]{color:var(--n1i-on-ink)}' +
    '.ws__links:not(.has-ind) .ws__link[aria-current="true"]{background:var(--n1i-ink)}' +
    '.ws__link[aria-current="true"]:hover{background:transparent}.ws__links:not(.has-ind) .ws__link[aria-current="true"]:hover{background:var(--n1i-ink)}' +
    '.ws__link:focus-visible{outline-offset:-2px;border-radius:13px}' +
    /* taşma: kenar soluklaşması + oklar */
    '.ws__tabs.is-ovl-l .ws__links{-webkit-mask-image:linear-gradient(90deg,transparent 0,#000 48px);mask-image:linear-gradient(90deg,transparent 0,#000 48px)}' +
    '.ws__tabs.is-ovl-r .ws__links{-webkit-mask-image:linear-gradient(90deg,#000 calc(100% - 48px),transparent 100%);mask-image:linear-gradient(90deg,#000 calc(100% - 48px),transparent 100%)}' +
    '.ws__tabs.is-ovl-l.is-ovl-r .ws__links{-webkit-mask-image:linear-gradient(90deg,transparent 0,#000 48px,#000 calc(100% - 48px),transparent 100%);mask-image:linear-gradient(90deg,transparent 0,#000 48px,#000 calc(100% - 48px),transparent 100%)}' +
    '.ws__arrow{flex:none;width:36px;height:36px;margin:0 3px;display:grid;place-items:center;border-radius:12px;border:0;background:var(--n1i-surface);color:var(--n1i-text-2);box-shadow:var(--n1i-shadow-1)}' +
    '.ws__arrow svg{width:16px;height:16px}.ws__arrow:hover{color:var(--n1i-text)}' +
    /* mobil menü düğmesi */
    '.ws__toggle{display:none;align-items:center;gap:8px;min-height:44px;padding:0 12px 0 10px;border-radius:var(--n1i-r-pill);border:1px solid var(--n1i-glass-edge);background:var(--n1i-surface);color:var(--n1i-text);font-size:14px;font-weight:600;max-width:52vw;box-shadow:var(--n1i-shadow-1)}' +
    '.ws__toggle-ic{width:28px;height:28px;border-radius:50%;display:grid;place-items:center;background:var(--n1i-ink);color:var(--n1i-on-ink);flex:none}' +
    '.ws__toggle-ic svg{width:15px;height:15px}' +
    '.ws__toggle-t{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}' +
    '.ws__chev{width:16px;height:16px;flex:none;color:var(--n1i-muted);transition:transform var(--n1i-dur) var(--n1i-ease)}' +
    '.ws__toggle[aria-expanded="true"] .ws__chev{transform:rotate(180deg)}' +
    '.ws__menu{margin-top:10px;border-radius:24px;padding:10px;transform-origin:50% 0}' +
    '.ws__menu ul{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}' +
    '.ws__mlink{display:flex;align-items:center;gap:11px;min-height:54px;padding:0 14px;border-radius:16px;background:var(--n1i-surface);border:1px solid var(--n1i-line-soft);color:var(--n1i-text);text-decoration:none;font-size:15px;font-weight:600}' +
    '.ws__mlink svg{color:var(--n1i-text-2)}' +
    '.ws__mlink[aria-current="true"]{background:var(--n1i-ink);color:var(--n1i-on-ink);border-color:var(--n1i-ink)}.ws__mlink[aria-current="true"] svg{color:inherit}' +
    '.ws__msgwrap{display:flex;justify-content:flex-end;padding:0 6px}' +
    /* V2.2 erişim kodu kapısı */
    '.ws__out{width:44px;height:40px;display:grid;place-items:center;border-radius:var(--n1i-r-pill);border:1px solid var(--n1i-glass-edge);background:var(--n1i-surface);color:var(--n1i-text-2);box-shadow:var(--n1i-shadow-1)}.ws__out svg{width:18px;height:18px}.ws__out:hover{color:var(--n1i-text)}' +
    '.ws.is-locked .ws__tabs,.ws.is-locked .ws__toggle{display:none!important}' +
    '.ws__gate{display:flex;gap:20px;align-items:flex-start;margin-top:14px;border-radius:26px;padding:28px}' +
    '.ws__gate[hidden]{display:none}' +
    '.ws__gate-ic{width:48px;height:48px;border-radius:16px;display:grid;place-items:center;background:var(--n1i-accent-surface);color:var(--n1i-accent-ink);flex:none;box-shadow:inset 0 0 0 1px var(--n1i-accent-edge)}.ws__gate-ic svg{width:22px;height:22px}' +
    '.ws__gate-body{flex:1;min-width:0;max-width:520px}' +
    '.ws__gate-t{margin:2px 0 6px;font-size:var(--n1i-fs-title);line-height:1.15;letter-spacing:-.018em;font-weight:600;color:var(--n1i-text)}' +
    '.ws__gate-p{margin:0 0 18px;color:var(--n1i-muted);font-size:var(--n1i-fs-base);line-height:1.5;max-width:60ch}' +
    '.ws__lbl{display:block;font-size:var(--n1i-fs-sm);font-weight:600;color:var(--n1i-text-2);margin:0 0 6px}' +
    '.ws__field{display:flex;align-items:center;gap:6px;border-radius:16px;background:var(--n1i-surface);border:1px solid var(--n1i-line);padding:4px 4px 4px 14px;transition:border-color var(--n1i-dur-fast) var(--n1i-ease),box-shadow var(--n1i-dur-fast) var(--n1i-ease)}' +
    '.ws__field:focus-within{border-color:var(--n1i-accent-ring);box-shadow:0 0 0 2px var(--n1i-accent-ring)}' +
    '.ws__field input{flex:1;min-width:0;min-height:44px;border:0;background:transparent;color:var(--n1i-text);outline:none;font:600 17px/1.2 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;letter-spacing:.08em;outline:none}' +
    '.ws__field[aria-invalid="true"]{border-color:var(--n1i-neg)}' +
    '.ws__eye{width:44px;height:44px;display:grid;place-items:center;border:0;border-radius:12px;background:transparent;color:var(--n1i-muted)}.ws__eye svg{width:19px;height:19px}.ws__eye[aria-pressed="true"]{color:var(--n1i-text)}' +
    '.ws__rem{display:flex;align-items:center;gap:10px;margin:12px 0 0;font-size:var(--n1i-fs-sm);color:var(--n1i-text-2);min-height:32px}.ws__rem input{width:18px;height:18px;accent-color:var(--n1i-ink)}' +
    '.ws__gerr{min-height:20px;margin:10px 0 0;color:var(--n1i-neg);font-size:var(--n1i-fs-sm);font-weight:600}' +
    '.ws__gerr:empty{min-height:0;margin:0}' +
    '.ws__go{margin-top:16px;min-height:48px;padding:0 26px;border-radius:var(--n1i-r-pill);background:var(--n1i-ink);color:var(--n1i-on-ink);border:0;font-weight:600;font-size:15px}' +
    '.ws__go[disabled]{opacity:.55;cursor:not-allowed}' +
    '@media (max-width:719px){.ws__gate{flex-direction:column;align-items:stretch;gap:14px;padding:20px;border-radius:22px}.ws__gate-body{max-width:none}.ws__go{width:100%}.ws__out{order:2;flex:none}}' +
    '.ws__msg{margin:10px 0 0}' +
    '@media (max-width:1439px){.ws__link{padding:0 12px;gap:7px}}' +
    '@media (max-width:1023px){.ws__product span:nth-child(n+2){display:none}.ws__client{font-size:21px}}' +
    '@media (max-width:719px){.ws{padding:10px}.ws__top{padding:0;gap:10px;flex-wrap:wrap}.ws__tools{display:contents}.ws__id{order:1;flex:1 1 0}.ws__theme{order:2;width:auto!important;flex:none}.ws__theme .n1i-seg__btn{flex:none!important}.ws__toggle{order:3;flex:1 1 100%;max-width:none;justify-content:flex-start;min-height:48px;border-radius:16px}.ws__toggle .ws__chev{margin-left:auto}.ws__toggle-t{max-width:none!important}.ws__tabs{display:none}.ws__toggle{display:inline-flex}.ws__tlabel{display:none}.ws__theme .n1i-seg__btn{padding:0;width:44px;min-height:40px}.ws__mark{width:40px;height:40px;font-size:17px;border-radius:13px}.ws__id{gap:11px}.ws .n1i-chip--demo{display:none}.ws__client{font-size:18px}.ws__product{font-size:12.5px}.ws__msgwrap{justify-content:stretch}.ws__msg{width:100%;border-radius:16px}}' +
    '@media (max-width:479px){.ws__product{display:none}.ws__toggle{padding:0 12px 0 10px}}' +
    '@media (max-width:359px){.ws__mark{display:none}.ws__client{font-size:17px}}' +
    '@media (max-width:339px){.ws__menu ul{grid-template-columns:1fr}}' +
    /* mobilde demo etiketi navigasyonun altında, tam görünür */
    '.ws__demo-m{display:none}@media (max-width:719px){.ws__demo-m{display:flex;margin:8px 4px 0}}';
  document.head.appendChild(st);
  if (N.cfg.demo) root.querySelector('.ws-wrap').insertAdjacentHTML('beforeend', '<div class="ws__demo-m">' + ui.demoChip() + '</div>');

  var toggle = root.querySelector('.ws__toggle'), menu = document.getElementById('ws-menu'), themeSeg = root.querySelector('.ws__theme'), msg = root.querySelector('.ws__msg');
  var tabs = root.querySelector('.ws__tabs'), list = root.querySelector('.ws__links'), ind = root.querySelector('.ws__ind');
  var arrowL = root.querySelector('.ws__arrow--l'), arrowR = root.querySelector('.ws__arrow--r');

  /* Taşma durumu: okları ve kenar soluklaşmasını göster */
  function overflow() {
    var max = list.scrollWidth - list.clientWidth;
    var l = list.scrollLeft > 4, r = max - list.scrollLeft > 4;
    tabs.classList.toggle('is-ovl-l', l); tabs.classList.toggle('is-ovl-r', r);
    arrowL.hidden = !l; arrowR.hidden = !r;
  }
  /* Etkin sekmeyi görünür alana getir (yalnızca bu iFrame içindeki listeyi kaydırır; Wix sayfasını kaydırmaz) */
  function reveal(a, smooth) {
    if (!a) return;
    var li = a.parentNode, left = li.offsetLeft - 48, right = li.offsetLeft + li.offsetWidth + 48;
    if (left < list.scrollLeft) list.scrollTo({ left: Math.max(0, left), behavior: smooth ? 'smooth' : 'auto' });
    else if (right > list.scrollLeft + list.clientWidth) list.scrollTo({ left: right - list.clientWidth, behavior: smooth ? 'smooth' : 'auto' });
  }
  function moveInd(animate) {
    var a = list.querySelector('[aria-current="true"]');
    if (!a || !a.offsetWidth) { list.classList.remove('has-ind'); return; }
    var x = a.parentNode.offsetLeft, w = a.offsetWidth;
    list.classList.add('has-ind');
    var g = window.gsap;
    if (animate && g && N.motion.allowed() && ind.getAttribute('data-ready')) g.to(ind, { x: x, width: w, duration: 0.24, ease: 'power3.out', overwrite: true });
    else { ind.style.transform = 'translateX(' + x + 'px)'; ind.style.width = w + 'px'; }
    ind.setAttribute('data-ready', '1');
  }

  /* Mobil menü: GSAP varsa 200 ms açılır, yoksa anında */
  function setMenu(o) {
    menuOpen = o; toggle.setAttribute('aria-expanded', String(o));
    if (o) {
      menu.hidden = false; N.height.schedule();
      var g = window.gsap;
      if (g && N.motion.allowed()) {
        g.fromTo(menu, { opacity: 0, y: -6, scale: 0.985 }, { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: 'power2.out', clearProps: 'transform,opacity' });
        g.fromTo(menu.querySelectorAll('li'), { opacity: 0, y: 4 }, { opacity: 1, y: 0, duration: 0.18, ease: 'power2.out', stagger: 0.015, clearProps: 'transform,opacity' });
      }
      var a = menu.querySelector('[aria-current="true"]') || menu.querySelector('a'); if (a) a.focus();
    } else { menu.hidden = true; N.height.schedule(); }
  }
  function setActive(id, fromUser) {
    if (!id) return;
    active = id;
    root.querySelectorAll('[data-nav]').forEach(function (a) { if (a.getAttribute('data-nav') === id) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
    toggle.querySelector('.ws__toggle-t').textContent = label(id);
    toggle.querySelector('.ws__toggle-ic').innerHTML = N.icon(icon(id));
    reveal(list.querySelector('[aria-current="true"]'), true);
    moveInd(true);
  }
  function showTheme(t) {
    themeSeg.querySelectorAll('[data-theme-btn]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-theme-btn') === t)); });
    themeSeg.removeAttribute('aria-busy');
    N.seg.sync(root, true);
  }
  function toast(text) {
    if (!text) { msg.hidden = true; msg.textContent = ''; N.height.schedule(); return; }
    /* Önce görünür yap, metni bir kare sonra yaz: canlı bölge duyurusu kaçmasın */
    msg.hidden = false; msg.textContent = '';
    requestAnimationFrame(function () { msg.innerHTML = N.icon('alert') + '<span>' + esc(text) + '</span>'; N.height.schedule(); });
    var g = window.gsap; if (g && N.motion.allowed()) g.fromTo(msg, { opacity: 0, y: -4 }, { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out', clearProps: 'transform,opacity' });
  }

  toggle.addEventListener('click', function () { setMenu(!menuOpen); });
  list.addEventListener('scroll', function () { overflow(); }, { passive: true });
  root.addEventListener('click', function (e) {
    var ar = e.target.closest('[data-scroll]');
    if (ar) { list.scrollBy({ left: Number(ar.getAttribute('data-scroll')) * list.clientWidth * 0.7, behavior: 'smooth' }); return; }
    var tb = e.target.closest('[data-theme-btn]');
    if (tb) {
      var t = tb.getAttribute('data-theme-btn');
      if (t === N.theme.get()) { showTheme(t); return; }
      toast('');
      showTheme(t); themeSeg.setAttribute('aria-busy', 'true');
      clearTimeout(pendingTimer);
      var sent = N.theme.request(t);
      /* Sahibi (Wix sayfa kodu) yanıt vermezse seçimi geri al ve açıkla */
      pendingTimer = setTimeout(function () {
        if (N.theme.get() !== t) { showTheme(N.theme.get()); toast('Tema değiştirilemedi: sayfa kodu yanıt vermedi.'); }
      }, sent ? 1500 : 0);
      return;
    }
    var a = e.target.closest('[data-nav]'); if (!a) return;
    e.preventDefault();
    var id = a.getAttribute('data-nav');
    /* Kaydırma sürerken aradaki bölümlerin etkin bildirimi sekmeyi oynatmasın */
    userNavUntil = Date.now() + 1800; userNavTarget = id;
    setActive(id, true);
    if (menuOpen) {
      /* Önce menüyü kapat ve yeni yüksekliği bildir; kaydırma isteği yükseklik oturduktan sonra gider.
         Aksi halde menü kapanınca hedef bölüm yukarı kayar. */
      setMenu(false); toggle.focus(); N.height.now();
      setTimeout(function () { N.bridge.send({ action: 'n1iNavigate', target: id }); }, 180);
      return;
    }
    N.bridge.send({ action: 'n1iNavigate', target: id });
  });
  /* Klavye: sekme listesinde ← → ile gezinme */
  list.addEventListener('keydown', function (e) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    var all = Array.prototype.slice.call(list.querySelectorAll('.ws__link')), i = all.indexOf(document.activeElement);
    if (i < 0) return;
    e.preventDefault();
    var n = all[(i + (e.key === 'ArrowRight' ? 1 : -1) + all.length) % all.length]; n.focus(); reveal(n, true);
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menuOpen) { setMenu(false); toggle.focus(); } });
  document.addEventListener('click', function (e) { if (menuOpen && !e.target.closest('#ws-menu') && !e.target.closest('.ws__toggle')) setMenu(false); });
  N.theme.onChange(function (t) { clearTimeout(pendingTimer); toast(''); showTheme(t); N.height.schedule(); });

  function relayout() { overflow(); moveInd(false); reveal(list.querySelector('[aria-current="true"]'), false); }
  listenWindow('resize', function () { clearTimeout(relayout._t); relayout._t = setTimeout(relayout, 60); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(relayout);
  showTheme(N.theme.get());
  relayout();
  N.height.start(root);
  /* ---------- V2.2 erişim kodu kapısı ---------- */
  var navEl = root.querySelector('.ws'), gate = root.querySelector('.ws__gate'), form = root.querySelector('.ws__form');
  var codeIn = document.getElementById('ws-code'), field = root.querySelector('.ws__field'), gerr = document.getElementById('ws-gerr');
  var go = root.querySelector('[data-go]'), rem = root.querySelector('.ws__rem'), remBox = root.querySelector('[data-remember]'), outBtn = root.querySelector('[data-signout]');
  var waitTimer = 0, sending = false;
  var REASONS = { EXPIRED: 'Oturum süresi doldu. Erişim kodunu yeniden girin.', REVOKED: 'Oturum sonlandırıldı. Erişim kodunu yeniden girin.', SIGNED_OUT: 'Oturum kapatıldı.' };
  function setErr(t) { gerr.textContent = t || ''; field.setAttribute('aria-invalid', t ? 'true' : 'false'); N.height.schedule(); }
  function lock(d) {
    navEl.classList.add('is-locked'); gate.hidden = false; outBtn.hidden = true;
    if (menuOpen) setMenu(false);
    rem.hidden = !d.remember;
    setErr(REASONS[d.reason] || '');
    sending = false; go.disabled = false; go.textContent = 'Raporu aç';
    N.height.schedule();
    setTimeout(function () { try { codeIn.focus({ preventScroll: true }); } catch (e) { codeIn.focus(); } }, 60);
  }
  function unlock() {
    navEl.classList.remove('is-locked'); gate.hidden = true; outBtn.hidden = false; setErr('');
    sending = false; go.disabled = false; go.textContent = 'Raporu aç';
    relayout(); N.height.schedule();
  }
  function countdown(sec) {
    clearInterval(waitTimer); var left = Math.max(1, Math.min(3600, Number(sec) || 60));
    go.disabled = true;
    function tick() { if (left <= 0) { clearInterval(waitTimer); go.disabled = false; go.textContent = 'Raporu aç'; return; } var m = Math.floor(left / 60), s2 = left % 60; go.textContent = 'Tekrar deneme: ' + m + ':' + (s2 < 10 ? '0' : '') + s2; left--; }
    tick(); waitTimer = setInterval(tick, 1000);
  }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (sending || go.disabled) return;
    var v = codeIn.value.trim();
    if (v.length < 8) { setErr('Erişim kodunu eksiksiz girin.'); codeIn.focus(); return; }
    sending = true; go.disabled = true; go.textContent = 'Doğrulanıyor…'; setErr('');
    N.bridge.send({ action: 'n1iAuthSubmit', code: v, remember: !rem.hidden && remBox.checked });
    codeIn.value = '';   /* kod DOM'da tutulmaz */
  });
  root.querySelector('[data-eye]').addEventListener('click', function () {
    var show = codeIn.type === 'password'; codeIn.type = show ? 'text' : 'password';
    this.setAttribute('aria-pressed', String(show)); this.setAttribute('aria-label', show ? 'Kodu gizle' : 'Kodu göster');
  });
  outBtn.addEventListener('click', function () { N.bridge.send({ action: 'n1iSignOut' }); });
  N.bridge.listen(function (d) {
    if (d.action === 'n1iAuthRequired') { lock(d); return; }
    if (d.ok) { unlock(); return; }
    sending = false;
    if (d.code === 'RATE_LIMITED' && d.retryAfterSec) { setErr(d.message || 'Çok fazla deneme yapıldı.'); countdown(d.retryAfterSec); }
    else { go.disabled = false; go.textContent = 'Raporu aç'; setErr(typeof d.message === 'string' ? d.message.slice(0, 160) : 'Erişim doğrulanamadı.'); }
    codeIn.focus();
  }, { accept: function (d) { return d.action === 'n1iAuthRequired' || d.action === 'n1iAuthResult'; }, dedupe: function () { return false; } });

  var ids = mods.map(function (m) { return m.id; });
  N.bridge.listen(function (d) { if (Date.now() < userNavUntil && d.target !== userNavTarget) return; setActive(d.target); }, { accept: function (d) { return d.action === 'n1iActive' && ids.indexOf(d.target) > -1; }, dedupe: function () { return false; } });
})();

};
(function(){
'use strict';
const P='n1i-dashboard-v3', base=runtime.N1I, config=runtime.N1I_CONFIG||{}, nav=document.getElementById('n1-nav'), area=document.getElementById('n1-area'), status=document.getElementById('n1-status');
const defs=[['summary','Genel Özet'],['ga4','Analytics'],['meta','Meta Ads'],['gads','Google Ads'],['instagram','Instagram'],['sheets','İş Takibi'],['ai','AI Asistan'],['domain','Domain'],['drive','Dosyalar'],['glossary','Sözlük']];
const ids=defs.map(x=>x[0]), mods=new Map(); let connected=false, unlocked=false, selected='summary', authTimer=0, authId=0, theme='light';
function up(action,fields={}){if(!host.isConnected)return false;host.dispatchEvent(new CustomEvent('n1-request',{detail:JSON.stringify({protocol:P,action,...fields}),bubbles:true,composed:true}));return true;}
function statusText(t){status.textContent=t;status.hidden=!t;}
function emit(id,d){const m=mods.get(id);if(!m)return;for(const item of m.listeners){if(item.opts.accept&&!item.opts.accept(d))continue;try{item.fn(d)}catch(e){console.error('N1I render',id,e);if(item.opts.onError)item.opts.onError(e);}}}
function mount(id,root){const listeners=[], styles=[];let alive=true;const cfg={...base.cfg,module:id,client:{...config.client,modules:defs.map(([id,label])=>({id,label,icon:id,enabled:true}))},demo:false};
const scopedDoc={getElementById:key=>key==='n1i-root'?root:root.querySelector('#'+CSS.escape(key)),querySelector:s=>root.querySelector(s),querySelectorAll:s=>root.querySelectorAll(s),createElement:document.createElement.bind(document),head:{appendChild:e=>{styles.push(e);if(e.tagName==='STYLE')e.textContent=e.textContent.replaceAll('#n1i-root','#n1-'+id).replace(/^\.n1i-root\{/,'#n1-'+id+'{');document.head.appendChild(e);return e;}},addEventListener:document.addEventListener.bind(document),fonts:document.fonts,get activeElement(){return document.activeElement;}};
const send=m=>{if(!alive)return false;return route(id,m);}; const bridge={listen:(fn,opts={})=>listeners.push({fn,opts}),send,forget:()=>{}};
const height={start:()=>{},now:()=>measure(),schedule:()=>measure()};
const N={...base,cfg,bridge,height,theme:{...base.theme,request:t=>route(id,{action:'n1iSetTheme',theme:t})},rangeController:o=>base.rangeController({...o,send}),watchdog:fn=>{let t=setTimeout(()=>{if(alive)fn()},30000);return ()=>clearTimeout(t);}};
const rec={root,listeners,styles,dispose:()=>{alive=false;for(const s of styles)s.remove();if(window.Chart)root.querySelectorAll('canvas').forEach(c=>{try{window.Chart.getChart(c)?.destroy()}catch{}});root.remove();}};mods.set(id,rec);try{runtime.N1I_MODULES[id==='meta'||id==='gads'?'ads':id==='nav'?'workspace':id](N,scopedDoc);}catch(e){console.error('N1I mount',id,e);root.textContent='Bu bölüm yüklenemedi. Sayfayı yenileyin.';}return rec;}
let mt=0;function measure(){cancelAnimationFrame(mt);mt=requestAnimationFrame(()=>{base.seg.sync(document,false);base.fitNumbers(document,false);});}
function applyTheme(t){theme=t==='dark'?'dark':'light';base.theme._apply(theme);measure();}
function authRequired(reason){clearTimeout(authTimer);unlocked=false;authId++;for(const [id,m] of mods){if(id!=='nav'){m.dispose();mods.delete(id);}}base.charts.registry=base.charts.registry.filter(x=>x.chart.canvas?.isConnected);area.hidden=true;selected='summary';emit('nav',{action:'n1iAuthRequired',reason,remember:false});measure();}
function authError(m){clearTimeout(authTimer);emit('nav',{action:'n1iAuthResult',ok:false,code:m.code,message:m.message||'Erişim doğrulanamadı.',retryAfterSec:m.retryAfterSec});}
function unlock(){clearTimeout(authTimer);if(unlocked)return;unlocked=true;statusText('');area.hidden=false;emit('nav',{action:'n1iAuthResult',ok:true});navigate('summary');}
function navigate(id){if(!unlocked||!ids.includes(id))return;selected=id;for(const [key,r] of mods)if(key!=='nav')r.root.hidden=key!==id;let rec=mods.get(id);if(!rec){const el=document.createElement('section');el.className='n1i-root';el.id='n1-'+id;area.appendChild(el);rec=mount(id,el);if(['summary','ga4','meta','gads','instagram','sheets'].includes(id))up('load',{target:id,range:'7'});}rec.root.hidden=false;emit('nav',{action:'n1iActive',target:id});measure();}
function route(id,m){if(id==='nav'){switch(m.action){case 'n1iAuthSubmit':if(!connected){authError({message:'Wix bağlantısı kurulmadı. Önizlemeyi yenileyin.'});return false;}if(unlocked)return false;const req=++authId;clearTimeout(authTimer);if(!up('login',{code:m.code,requestId:req})){authError({message:'Wix bağlantısı yok.'});return false;}authTimer=setTimeout(()=>{if(authId===req&&!unlocked){authId++;up('cancelLogin',{requestId:req});authError({message:'Doğrulama zaman aşımına uğradı. Tekrar deneyin.'});}},22000);return true;case 'n1iSignOut':authRequired('SIGNED_OUT');return up('logout');case 'n1iSetTheme':applyTheme(m.theme);return up('theme',{theme});case 'n1iNavigate':navigate(m.target);return true;}}if(!unlocked)return false;if(m.action==='changeRange'&&['ga4','meta','gads'].includes(id))return up('load',{target:id,range:m.range});if(id==='ai'&&m.action==='askAI')return up('ask',{question:m.question});return false;}
host._receive=m=>{if(!m||m.protocol!==P)return;connected=true;statusText('');switch(m.action){case 'state':applyTheme(m.theme);if(m.unlocked===true)unlock();else if(!unlocked)authRequired();break;case 'authResult':if(m.requestId!==authId)return;if(m.ok)unlock();else authError(m);break;case 'lock':authRequired(m.reason);break;case 'theme':applyTheme(m.theme);break;case 'data':if(unlocked&&ids.includes(m.target)&&m.payload&&typeof m.payload==='object')emit(m.target,m.payload);break;}};
mount('nav',nav);authRequired();statusText('Wix bağlantısı kuruluyor…');up('ready');const ping=setInterval(()=>{if(!host.isConnected||connected){clearInterval(ping);return;}up('ready');},850);setTimeout(()=>{if(!connected)statusText('Wix bağlantısı bekleniyor. Bu ekran tek başına veri göstermez.');},5000);listenWindow('resize',measure);})();

})(doc);if(this._pending){this._receive?.(this._pending);this._pending=null;}}catch(e){shell.querySelector('#n1-status').textContent='Dashboard yüklenemedi. Sayfayı yenileyin.';console.error('N1I mount failure',e);}}
 attributeChangedCallback(name,old,value){if(name!=='n1-response'||!value)return;try{const m=JSON.parse(value);if(this._receive)this._receive(m);else this._pending=m;}catch(e){/* malformed data ignored */}}
 disconnectedCallback(){this._abort?.abort();this._receive=null;this._pending=null;this._started=false;}
}customElements.define(TAG,Intelligence);})();
