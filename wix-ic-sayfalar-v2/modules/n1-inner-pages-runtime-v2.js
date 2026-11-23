/* 1N Digital Media | Shared Inner Pages Runtime v2 | 16 bespoke page configurations | SVG-only decorative icons */
(function agencyRuntimeV2(){
  'use strict';
  if (window.__N1_INNER_PAGES_RUNTIME_V2) { if (window.N1RegisterInnerPages) window.N1RegisterInnerPages(); return; }
  window.__N1_INNER_PAGES_RUNTIME_V2=true;
  const BASE='https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@82513fdc15127f6bb15962a22142f5b80eddc748/wix-full-v1/';
  const MOD='https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@376e9ae1871976102d6e10dbc91c5f2dc68c4332/wix-full-v1/modules/';
  const ASSETS='https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@f142fafe5acee6797404d3e08e43d4c634161e3f/wix-full-v1/aktarim-medya/';
  const RESP='https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@09612df97e85978976d13edbd79dad0adcc1d1f1/wix-studyo-v1/site/n1-inner-responsive-v6.css';
  const WHATSAPP='https://api.whatsapp.com/send/?phone=905516816026&text&type=phone_number&app_absent=0';
  const ICONS={
    diag:'<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><path d="M5 19 19 5M8 5h11v11" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    down:'<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><path d="M12 4v16m-6-6 6 6 6-6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    up:'<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><path d="M12 20V4M6 10l6-6 6 6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    wa:'<svg viewBox="0 0 24 24" width="21" height="21" aria-hidden="true" focusable="false"><path d="M3.6 20.4l1.25-4.1A8.6 8.6 0 1 1 8 19.3z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.05 8.05c.3-.55.75-.6 1.05-.6.25 0 .45.1.55.35l.75 1.75c.08.2.05.45-.1.62l-.6.68c.6 1.2 1.55 2.15 2.8 2.8l.68-.6c.17-.15.42-.18.62-.1l1.75.75c.25.1.35.3.35.55 0 .3-.05.75-.6 1.05-.6.33-1.45.45-2.4.05a9.6 9.6 0 0 1-4.9-4.9c-.4-.95-.28-1.8.05-2.4z" fill="currentColor" stroke="none"/></svg>'
  };
  const STYLE=`
  .n1ip{--n1-text:#ECEBE5;--n1-sub:#A7AAA3;--n1-mid:#797F76;--n1-bg:#080A09;--n1-border:rgba(236,235,229,.13);--n1-accent:#A8CF62;display:block!important;position:relative;width:100%;background:#080A09;color:var(--n1-text);font:400 16px/1.52 Barlow,Arial,sans-serif;isolation:isolate}
  .n1ip *{box-sizing:border-box}.n1ip a{color:inherit;text-decoration:none}.n1ip button,.n1ip a{-webkit-tap-highlight-color:transparent}.n1ip a:focus-visible,.n1ip button:focus-visible{outline:2px solid var(--n1-accent);outline-offset:4px}
  .n1ip .n1ip-container{width:90%;max-width:1600px;margin-left:auto;margin-right:auto}.n1ip .n1ip-muted{color:var(--n1-sub)}
  .n1ip .n1ip-kicker{font-size:11px;letter-spacing:.24em;font-weight:500;text-transform:uppercase;color:#A7ACA3;display:flex;align-items:center;gap:12px}
  .n1ip .n1ip-kicker:before{content:"";width:6px;height:6px;border-radius:50%;background:var(--n1-accent);display:inline-block;flex-shrink:0}
  .n1ip .n1ip-headline{font:600 clamp(88px,11.5vw,232px)/1.08 "Barlow Condensed",Impact,"Arial Narrow",sans-serif;letter-spacing:-.028em;text-transform:uppercase;margin:0;text-wrap:balance;max-width:100%}
  .n1ip .n1ip-headline>span{display:block}.n1ip .n1ip-headline>span:last-child{color:var(--n1-accent)}.n1ip .n1ip-hero{min-height:min(980px,100svh);padding:132px 0 74px;position:relative;overflow:hidden;border-bottom:1px solid var(--n1-border)}
  .n1ip .n1ip-hero:before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse at 73% 34%,rgba(162,255,0,.062),transparent 34%),radial-gradient(ellipse at 10% 90%,rgba(255,255,255,.03),transparent 55%);pointer-events:none}
  .n1ip .n1ip-hero-top{display:flex;justify-content:space-between;gap:20px;align-items:center;border-bottom:1px solid var(--n1-border);padding-bottom:24px;margin-bottom:clamp(58px,9vh,110px)}
  .n1ip .n1ip-hero-top .n1ip-count{color:#6B7068;letter-spacing:.18em;font-size:11px}.n1ip .n1ip-hero-grid{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(320px,.75fr);gap:4vw;align-items:center}
  .n1ip .n1ip-hero-body{min-width:0}.n1ip .n1ip-hero-intro{font:500 11px/1.4 Barlow,sans-serif;letter-spacing:.24em;color:#BBBEB8;margin:0 0 25px;text-transform:uppercase}
  .n1ip .n1ip-hero-copy{max-width:710px;margin:42px 0 0;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.2fr);gap:20px;align-items:start}
  .n1ip .n1ip-tagline{font:500 clamp(22px,2.1vw,31px)/1.2 Barlow,sans-serif;margin:0;letter-spacing:-.025em}
  .n1ip .n1ip-hero-copy p:last-child{font:400 clamp(15px,1.1vw,18px)/1.62 Barlow,sans-serif;color:var(--n1-sub);margin:0}
  .n1ip .n1ip-art{width:100%;max-width:610px;aspect-ratio:1/1;position:relative;display:grid;place-items:center;margin-inline:auto}
  .n1ip .n1ip-art:before{content:"";position:absolute;inset:7%;border:1px solid rgba(234,235,225,.08);border-radius:50%}
  .n1ip .n1ip-art:after{content:attr(data-label);position:absolute;bottom:0;left:50%;transform:translateX(-50%);font-size:10px;letter-spacing:.22em;color:#747C70;white-space:nowrap}
  .n1ip .n1ip-art svg{display:block;width:100%;height:100%;overflow:visible}
  .n1ip .n1ip-art .shape-line{fill:none;stroke:#9DA69A;stroke-width:1;stroke-linecap:round;stroke-linejoin:round}
  .n1ip .n1ip-art .shape-accent{fill:none;stroke:var(--n1-accent);stroke-width:1.3;stroke-linecap:round;stroke-linejoin:round}
  .n1ip .n1ip-art .shape-solid{fill:var(--n1-accent);opacity:.83}.n1ip .n1ip-art .shape-dark{fill:#111512;stroke:#5C655A;stroke-width:1}
  .n1ip .n1ip-art svg [data-spin]{transform-origin:250px 250px;animation:n1ip-spin 35s linear infinite}
  .n1ip .n1ip-art svg [data-float]{animation:n1ip-float 6s ease-in-out infinite}
  @keyframes n1ip-spin{to{transform:rotate(360deg)}}@keyframes n1ip-float{50%{transform:translateY(-10px)}}
  .n1ip .n1ip-hero-bottom{display:flex;justify-content:space-between;align-items:center;gap:20px;margin-top:90px}
  .n1ip .n1ip-jump{display:inline-flex;align-items:center;gap:14px;font-size:11px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:#B3B7AE}
  .n1ip .n1ip-arrow-circle{display:grid;place-items:center;width:44px;height:44px;border:1px solid var(--n1-border);border-radius:50%;color:var(--n1-accent);flex:0 0 auto;transition:background .25s,border-color .25s,transform .25s}
  .n1ip .n1ip-jump:hover .n1ip-arrow-circle{border-color:var(--n1-accent);transform:translateY(4px)}
  .n1ip .n1ip-hero-bottom>span{font-size:11px;letter-spacing:.21em;color:#687067}
  .n1ip .n1ip-section{padding:clamp(96px,12vw,190px) 0;border-bottom:1px solid var(--n1-border)}
  .n1ip .n1ip-sectionhead{display:flex;justify-content:space-between;align-items:start;gap:32px;margin-bottom:70px}
  .n1ip .n1ip-smallno{font:500 11px Barlow,sans-serif;color:#7D837A;letter-spacing:.2em}
  .n1ip .n1ip-manifesto{display:grid;grid-template-columns:1fr 2fr;gap:6vw}
  .n1ip .n1ip-statement{font:600 clamp(52px,7.4vw,132px)/1.09 "Barlow Condensed",Impact,sans-serif;letter-spacing:-.023em;text-transform:uppercase;margin:0;max-width:1150px}
  .n1ip .n1ip-statement em{font-style:normal;color:var(--n1-accent)}
  .n1ip .n1ip-statement-body{max-width:570px;margin:38px 0 0 auto;font:400 clamp(16px,1.35vw,20px)/1.75 Barlow,sans-serif;color:#A5AAA1}
  .n1ip .n1ip-pillars{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));border-top:1px solid var(--n1-border);border-left:1px solid var(--n1-border)}
  .n1ip .n1ip-pillar{padding:38px 30px 44px;min-height:360px;border-right:1px solid var(--n1-border);border-bottom:1px solid var(--n1-border);display:flex;flex-direction:column;position:relative;transition:background .25s}
  .n1ip .n1ip-pillar:hover{background:rgba(255,255,255,.022)}
  .n1ip .n1ip-pillar-top{display:flex;align-items:start;justify-content:space-between;color:#8A9285;font-size:11px;letter-spacing:.16em}
  .n1ip .n1ip-pillar-top svg{color:var(--n1-accent);width:24px;height:24px}
  .n1ip .n1ip-pillar h3{font:600 clamp(32px,3.2vw,53px)/1.08 "Barlow Condensed",Impact,sans-serif;letter-spacing:-.01em;text-transform:uppercase;margin:auto 0 20px}
  .n1ip .n1ip-pillar p{max-width:370px;margin:0;color:#A7ACA4;font:400 15px/1.7 Barlow,sans-serif}
  .n1ip .n1ip-sectiontitle{font:600 clamp(55px,7vw,118px)/1.08 "Barlow Condensed",Impact,sans-serif;letter-spacing:-.02em;text-transform:uppercase;margin:0}
  .n1ip .n1ip-sectiontitle em{font-style:normal;color:var(--n1-accent)}
  .n1ip .n1ip-scope-grid{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:9vw;align-items:start}
  .n1ip .n1ip-scope-lead{font:400 17px/1.7 Barlow,sans-serif;max-width:420px;color:#A7ACA3;margin-top:32px}
  .n1ip .n1ip-scope-list{border-top:1px solid var(--n1-border)}
  .n1ip .n1ip-scope-item{border-bottom:1px solid var(--n1-border);padding:23px 0;display:flex;justify-content:space-between;align-items:center;gap:20px}
  .n1ip .n1ip-scope-item span{font:500 clamp(17px,1.6vw,25px)/1.3 Barlow,sans-serif;letter-spacing:-.025em}
  .n1ip .n1ip-scope-item b{font:400 11px Barlow,sans-serif;letter-spacing:.17em;color:#7E857C}
  .n1ip .n1ip-process-head{margin-bottom:70px}
  .n1ip .n1ip-process{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:26px}
  .n1ip .n1ip-phase{border-top:1px solid var(--n1-border);padding:22px 0 0}
  .n1ip .n1ip-phase-index{color:var(--n1-accent);font:500 12px Barlow,sans-serif;letter-spacing:.19em}
  .n1ip .n1ip-phase h3{font:600 clamp(32px,3.5vw,55px)/1 "Barlow Condensed",Impact,sans-serif;margin:62px 0 16px;text-transform:uppercase}
  .n1ip .n1ip-phase p{margin:0;max-width:340px;font:400 15px/1.7 Barlow,sans-serif;color:var(--n1-sub)}
  .n1ip .n1ip-quote{padding:clamp(85px,12vw,180px) 0;overflow:hidden;position:relative;border-bottom:1px solid var(--n1-border);background:#0B0F0C}
  .n1ip .n1ip-quote:before{content:"";position:absolute;width:500px;height:500px;border:1px solid rgba(162,255,0,.13);border-radius:50%;right:-200px;top:-200px;box-shadow:0 0 0 80px rgba(162,255,0,.018),0 0 0 160px rgba(162,255,0,.009)}
  .n1ip .n1ip-quote-text{max-width:1180px;font:600 clamp(60px,9vw,152px)/1.09 "Barlow Condensed",Impact,sans-serif;letter-spacing:-.015em;text-transform:uppercase;margin:40px 0}
  .n1ip .n1ip-quote-text strong{font-weight:inherit;color:var(--n1-accent)}
  .n1ip .n1ip-cta{padding:clamp(90px,13vw,210px) 0 clamp(90px,11vw,170px);overflow:hidden;position:relative}
  .n1ip .n1ip-cta-kicker{font-size:11px;letter-spacing:.22em;color:#8E968A}
  .n1ip .n1ip-cta h2{font:600 clamp(75px,11vw,180px)/1.09 "Barlow Condensed",Impact,sans-serif;letter-spacing:-.025em;text-transform:uppercase;margin:36px 0 52px}
  .n1ip .n1ip-cta h2 span{display:block;color:var(--n1-accent)}
  .n1ip .n1ip-cta-actions{display:flex;flex-wrap:wrap;gap:12px}
  .n1ip .n1ip-btn{min-height:54px;padding:0 23px;border:1px solid #424B3E;border-radius:9px;display:inline-flex;align-items:center;gap:35px;font:500 12px Barlow,sans-serif;letter-spacing:.12em;text-transform:uppercase;transition:background .25s,color .25s,border-color .25s}
  .n1ip .n1ip-btn svg{width:19px;height:19px;transition:transform .25s}
  .n1ip .n1ip-btn:hover svg{transform:translate(3px,-3px)}
  .n1ip .n1ip-btn--primary{background:var(--n1-accent);color:#0A0C0A!important;border-color:var(--n1-accent)}
  .n1ip .n1ip-btn--secondary{background:transparent;color:#E8EAE4}
  .n1ip .n1ip-btn--secondary:hover{border-color:var(--n1-accent)}
  .n1ip .n1ip-footer-rule{height:1px;background:var(--n1-border)}
  @media(max-width:1100px){.n1ip .n1ip-hero-grid{grid-template-columns:1.15fr .85fr}.n1ip .n1ip-headline{font-size:clamp(74px,11.5vw,145px)}.n1ip .n1ip-hero-copy{display:block}.n1ip .n1ip-tagline{margin-bottom:14px}.n1ip .n1ip-pillar{padding:26px;min-height:300px}}
  @media(max-width:1024px){.n1ip n1-header{display:block!important}.n1ip n1-header .n1h-bar{width:90%!important;margin-inline:auto!important}.n1ip n1-header .n1h-tag{font-size:10px!important}.n1ip .n1ip-hero{padding-top:115px}.n1ip .n1ip-art{max-width:450px}.n1ip .n1ip-section{padding:96px 0}.n1ip .n1ip-manifesto{grid-template-columns:1fr 2.3fr;gap:25px}}
  @media(max-width:767px){
   .n1ip .n1ip-container{width:calc(100% - 40px)}.n1ip .n1ip-hero{padding:106px 0 44px;min-height:100svh}
   .n1ip .n1ip-hero-top{margin-bottom:54px;padding-bottom:18px;gap:8px}
   .n1ip .n1ip-kicker{font-size:9px;letter-spacing:.15em;gap:8px}.n1ip .n1ip-count{font-size:9px!important}
   .n1ip .n1ip-hero-grid{grid-template-columns:1fr;gap:8px}.n1ip .n1ip-headline{font-size:clamp(71px,16vw,126px);line-height:1.12;white-space:normal}
   .n1ip .n1ip-hero-intro{font-size:9px;margin-bottom:17px}.n1ip .n1ip-hero-copy{margin-top:24px}
   .n1ip .n1ip-tagline{font-size:24px}.n1ip .n1ip-hero-copy p:last-child{font-size:15px}
   .n1ip .n1ip-art{width:74%;max-width:300px;margin:16px auto 0}.n1ip .n1ip-hero-bottom{margin-top:24px}.n1ip .n1ip-hero-bottom>span{display:none}
   .n1ip .n1ip-section{padding:86px 0}.n1ip .n1ip-sectionhead{margin-bottom:38px}
   .n1ip .n1ip-manifesto{display:block}.n1ip .n1ip-statement{font-size:clamp(52px,12.8vw,89px);margin-top:38px}
   .n1ip .n1ip-statement-body{margin:27px 0 0;font-size:16px}.n1ip .n1ip-pillars{grid-template-columns:1fr}
   .n1ip .n1ip-pillar{min-height:250px;padding:28px 25px}.n1ip .n1ip-pillar h3{font-size:45px;margin-top:50px}
   .n1ip .n1ip-scope-grid{grid-template-columns:1fr;gap:32px}.n1ip .n1ip-sectiontitle{font-size:clamp(55px,11vw,83px)}
   .n1ip .n1ip-scope-lead{font-size:16px;margin:22px 0 0}.n1ip .n1ip-scope-item{padding:19px 0}
   .n1ip .n1ip-process{grid-template-columns:1fr;gap:40px}.n1ip .n1ip-process-head{margin-bottom:35px}
   .n1ip .n1ip-phase h3{font-size:44px;margin:30px 0 11px}
   .n1ip .n1ip-quote{padding:91px 0}.n1ip .n1ip-quote-text{font-size:clamp(58px,12vw,96px)}
   .n1ip .n1ip-cta h2{font-size:clamp(66px,12.5vw,100px);margin:26px 0 40px}
   .n1ip .n1ip-cta-actions{flex-direction:column}.n1ip .n1ip-btn{justify-content:space-between;min-height:56px}
  }
  @media(max-width:360px){.n1ip .n1ip-container{width:calc(100% - 32px)}.n1ip .n1ip-headline{font-size:clamp(62px,15.8vw,90px)}.n1ip .n1ip-hero{padding-top:98px}}
  @media(max-width:1024px){
    body.n1-ip-fc-on .n1fc{display:none!important}
    body.n1-ip-fc-on #n1-ip-mobile-controls{display:flex!important;position:fixed!important;z-index:10010!important;right:calc(18px + env(safe-area-inset-right,0px))!important;bottom:calc(18px + env(safe-area-inset-bottom,0px))!important;flex-direction:column;gap:9px;pointer-events:none!important}
    #n1-ip-mobile-controls .n1ip-fc-btn{display:grid!important;place-items:center;box-sizing:border-box;width:46px!important;height:46px!important;padding:0!important;margin:0!important;border-radius:10px!important;border:1px solid rgba(236,235,229,.19)!important;background:rgba(12,14,13,.88)!important;color:#ECEBE5!important;pointer-events:auto!important;cursor:pointer;text-decoration:none!important;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}
    #n1-ip-mobile-controls .n1ip-fc-btn svg{display:block!important;width:21px;height:21px}
    #n1-ip-mobile-controls .n1ip-fc-btn:focus-visible{outline:2px solid #A8CF62;outline-offset:3px}
    #n1-ip-mobile-controls .n1ip-fc-top:not([data-on]){opacity:0!important;visibility:hidden!important;pointer-events:none!important}
    #n1-ip-mobile-controls[data-menu-open]{opacity:0!important;visibility:hidden!important;pointer-events:none!important}
  }
  @media(max-width:767px){body.n1-ip-fc-on #n1-ip-mobile-controls{right:calc(14px + env(safe-area-inset-right,0px))!important;bottom:calc(16px + env(safe-area-inset-bottom,0px))!important;gap:8px}#n1-ip-mobile-controls .n1ip-fc-btn{width:44px!important;height:44px!important}}
  @media(min-width:1025px){#n1-ip-mobile-controls{display:none!important}}
  @media(prefers-reduced-motion:reduce){.n1ip *, .n1ip *:before,.n1ip *:after{animation-duration:.001ms!important;transition-duration:.001ms!important}}
  `;
  const SVGHEAD='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" role="img" aria-hidden="true" focusable="false">';
  const SVGEND='</svg>';
  function visual(type){
    const lines=[];const C='class="shape-line"', A='class="shape-accent"';
    function line(x1,y1,x2,y2,accent){lines.push('<line '+(accent?A:C)+' x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'"/>');}
    function rect(x,y,w,h,accent,r){lines.push('<rect '+(accent?A:C)+' x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+(r||0)+'"/>');}
    function circle(x,y,r,accent){lines.push('<circle '+(accent?A:C)+' cx="'+x+'" cy="'+y+'" r="'+r+'"/>');}
    for(let t=0;t<5;t++)circle(250,250,68+t*35,t===3);
    const ring='<g data-spin><circle cx="250" cy="250" r="164" class="shape-line" stroke-dasharray="1 12"/><circle cx="250" cy="86" r="5" class="shape-solid"/></g>';
    const add=(arr)=>{for(const s of arr)lines.push(s);};
    switch(type){
      case 'rhythm': for(let i=0;i<14;i++){let x=102+i*22;let ht=40+Math.round((Math.sin(i*1.4)+1)*75);line(x,340-ht,x,340,i%4===0);circle(x,340-ht,2,i%4===0)}break;
      case 'studio':for(let i=0;i<9;i++){let rad=20+i*19;rect(250-rad,250-rad,rad*2,rad*2,i===7,5)}break;
      case 'brand': for(let i=0;i<8;i++){let ang=i*Math.PI/4,x=250+145*Math.cos(ang),y=250+145*Math.sin(ang);line(250,250,x.toFixed(1),y.toFixed(1),i%3===0);circle(x.toFixed(1),y.toFixed(1),i%3===0?15:7,i%3===0)}circle(250,250,30,true);break;
      case 'performance':for(let i=0;i<6;i++){line(110,130+i*45,390,130+i*45,false);line(110+i*55,130,110+i*55,360,false)}add(['<path d="M120 334 177 292 218 320 275 231 326 247 381 162" class="shape-accent" stroke-width="3"/>']);circle(381,162,8,true);break;
      case 'social': for(let i=0;i<3;i++)for(let j=0;j<3;j++){rect(145+i*74,145+j*74,62,62,(i+j)===2,9);if((i+j)%2===0)circle(176+i*74,176+j*74,10,(i+j)===2)}break;
      case 'web':rect(92,131,316,240,true,10);rect(92,131,316,45,false,10);for(let i=0;i<3;i++)circle(114+i*17,153,4,true);rect(120,204,150,102,false,3);rect(287,204,92,21,true,2);rect(287,244,92,10,false,2);rect(287,267,70,10,false,2);break;
      case 'innovation':for(let i=0;i<18;i++){let an=i*Math.PI/9,x=250+145*Math.cos(an),y=250+145*Math.sin(an);line(250,250,x.toFixed(1),y.toFixed(1),i%5===0);circle(x.toFixed(1),y.toFixed(1),i%5===0?8:3,i%5===0)}circle(250,250,34,true);break;
      case 'workshop':rect(117,139,265,201,true,5);line(145,192,352,192);for(let i=0;i<3;i++){circle(164+i*76,265,27,i===1);line(140+i*76,317,188+i*76,317,i===1)}break;
      case 'insight':for(let i=0;i<5;i++){let x=135+i*57,h=55+i*i*13;rect(x,365-h,35,h,i===4,1)}add(['<path d="M135 288 183 248 237 264 300 174 368 140" class="shape-accent" stroke-width="2.5"/>']);break;
      case 'production':for(let i=0;i<6;i++){rect(118+i*45,170+i%2*15,44,180-i%2*30,i===3,3)}add(['<path d="M132 146 162 118 196 146 228 118 262 146 294 118 327 146" class="shape-accent" stroke-width="2"/>']);break;
      case 'commerce':rect(145,130,210,270,true,6);rect(167,165,166,96,false,3);line(170,310,329,310);line(170,330,302,330);line(170,350,280,350);circle(300,230,16,true);break;
      case 'community':for(let i=0;i<3;i++){rect(113+i*62,145+i*54,198,122,i===1,20);line(141+i*62,180+i*54,277+i*62,180+i*54);line(141+i*62,205+i*54,238+i*62,205+i*54)}break;
      case 'ads':rect(116,145,268,225,false,8);for(let i=0;i<4;i++){let x=143+i*58,h=45+i*37;rect(x,337-h,32,h,i===3,2)}add(['<path d="M141 212 187 194 239 204 291 157 344 134" class="shape-accent" stroke-width="3"/>']);break;
      case 'uiux':rect(136,129,228,280,true,16);rect(156,159,188,28,false,4);rect(156,204,85,93,false,6);rect(254,204,90,93,true,6);rect(156,313,188,17,false,3);rect(156,346,130,17,false,3);break;
      case 'ai': for(let i=0;i<8;i++)for(let j=0;j<8;j++){let x=128+i*35,y=128+j*35;if((i+j)%3===0)circle(x,y,4,(i+j)%6===0);if(j<7&&i%2===0)line(x,y,x,y+35,false)}circle(250,250,45,true);break;
      case 'application':rect(173,100,154,300,true,24);rect(186,129,128,231,false,9);rect(210,164,80,50,false,6);rect(210,230,80,18,true,3);rect(210,266,80,18,false,3);rect(210,302,80,18,false,3);circle(250,380,7,true);break;
      default:circle(250,250,73,true);
    }
    return SVGHEAD+'<g opacity=".6">'+ring+'</g>'+lines.join('')+SVGEND;
  }
  const escapeText=s=>String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  const h=escapeText;
  function render(cfg){
    const item=(t,i)=>'<article class="n1ip-pillar"><div class="n1ip-pillar-top"><span>0'+(i+1)+' / 03</span>'+ICONS.diag+'</div><h3>'+h(t.title)+'</h3><p>'+h(t.desc)+'</p></article>';
    const scope=(t,i)=>'<div class="n1ip-scope-item"><span>'+h(t)+'</span><b>'+String(i+1).padStart(2,'0')+'</b></div>';
    const phase=(t,i)=>'<article class="n1ip-phase"><span class="n1ip-phase-index">0'+(i+1)+' / 03</span><h3>'+h(t.title)+'</h3><p>'+h(t.desc)+'</p></article>';
    return '<main class="n1ip-main" id="n1ip-main">'+
    '<section class="n1ip-hero" aria-labelledby="n1ip-heading"><div class="n1ip-container">'+
    '<div class="n1ip-hero-top"><div class="n1ip-kicker">1N DIGITAL MEDIA <span>/</span> '+h(cfg.type)+'</div><span class="n1ip-count">'+h(cfg.edition)+' / 1N</span></div>'+
    '<div class="n1ip-hero-grid"><div class="n1ip-hero-body"><p class="n1ip-hero-intro">'+h(cfg.eyebrow)+'</p><h1 id="n1ip-heading" class="n1ip-headline"><span>'+h(cfg.hero[0])+'</span><span>'+h(cfg.hero[1])+'</span></h1>'+
    '<div class="n1ip-hero-copy"><h2 class="n1ip-tagline">'+h(cfg.tagline)+'</h2><p>'+h(cfg.intro)+'</p></div></div>'+
    '<div class="n1ip-art" data-label="'+h(cfg.artLabel)+'">'+visual(cfg.art)+'</div></div>'+
    '<div class="n1ip-hero-bottom"><a class="n1ip-jump" href="#n1ip-approach"><span class="n1ip-arrow-circle">'+ICONS.down+'</span> YAKLAŞIMIMIZI KEŞFEDİN</a><span>'+h(cfg.heroFoot)+'</span></div></div></section>'+
    '<section id="n1ip-approach" class="n1ip-section"><div class="n1ip-container"><div class="n1ip-manifesto"><div class="n1ip-kicker">01 / BAKIŞ AÇIMIZ</div>'+
    '<div><h2 class="n1ip-statement">'+h(cfg.manifesto[0])+' <em>'+h(cfg.manifesto[1])+'</em></h2><p class="n1ip-statement-body">'+h(cfg.manifestoBody)+'</p></div></div></div></section>'+
    '<section class="n1ip-section" aria-label="Üç temel ilke"><div class="n1ip-container"><div class="n1ip-sectionhead"><div class="n1ip-kicker">02 / NASIL DÜŞÜNÜYORUZ?</div><span class="n1ip-smallno">YAKLAŞIM / 03 İLKE</span></div><div class="n1ip-pillars">'+cfg.pillars.map(item).join('')+'</div></div></section>'+
    '<section class="n1ip-section"><div class="n1ip-container"><div class="n1ip-scope-grid"><div><div class="n1ip-kicker">03 / ÇALIŞMA ALANLARI</div><h2 class="n1ip-sectiontitle" style="margin-top:28px">'+h(cfg.scopeTitle[0])+'<br><em>'+h(cfg.scopeTitle[1])+'</em></h2><p class="n1ip-scope-lead">'+h(cfg.scopeText)+'</p></div><div class="n1ip-scope-list">'+cfg.scope.map(scope).join('')+'</div></div></div></section>'+
    '<section class="n1ip-section"><div class="n1ip-container"><div class="n1ip-process-head"><div class="n1ip-kicker">04 / UYGULAMA AKIŞI</div><h2 class="n1ip-sectiontitle" style="margin-top:30px">'+h(cfg.processTitle)+'</h2></div><div class="n1ip-process">'+cfg.process.map(phase).join('')+'</div></div></section>'+
    '<section class="n1ip-quote"><div class="n1ip-container"><div class="n1ip-kicker">1N / CREATIVE THINKING</div><p class="n1ip-quote-text">'+h(cfg.quote[0])+'<br><strong>'+h(cfg.quote[1])+'</strong></p><span class="n1ip-smallno">CRAFTED WITH INTENTION</span></div></section>'+
    '<section class="n1ip-cta"><div class="n1ip-container"><div class="n1ip-cta-kicker">BİRLİKTE ÜRETELİM / 1N DIGITAL MEDIA</div><h2>'+h(cfg.cta[0])+'<span>'+h(cfg.cta[1])+'</span></h2>'+
    '<div class="n1ip-cta-actions"><a href="/iletisim" class="n1ip-btn n1ip-btn--primary">PROJENİZİ KONUŞALIM '+ICONS.diag+'</a><a href="'+h(cfg.nextHref)+'" class="n1ip-btn n1ip-btn--secondary">'+h(cfg.nextLabel)+' '+ICONS.diag+'</a></div></div></section>'+
    '</main>';
  }
  const loadMap=new Map();
  function loadScript(url){
    if(loadMap.has(url))return loadMap.get(url);
    const promise=new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=url;s.async=false;s.onload=resolve;s.onerror=()=>reject(new Error('1N kaynak yüklenemedi: '+url));document.head.appendChild(s);});
    loadMap.set(url,promise);return promise;
  }
  function loadCss(url){
    if(loadMap.has(url))return loadMap.get(url);
    const promise=new Promise((resolve,reject)=>{const l=document.createElement('link');l.rel='stylesheet';l.href=url;l.onload=resolve;l.onerror=()=>reject(new Error('1N stil yüklenemedi: '+url));document.head.appendChild(l);});
    loadMap.set(url,promise);return promise;
  }
  function ensureStyle(){
    if(document.getElementById('n1-ip-runtime-v1-style'))return;
    const st=document.createElement('style');st.id='n1-ip-runtime-v1-style';st.textContent=STYLE;document.head.appendChild(st);
  }
  function createClass(cfg){
    return class N1ServicePage extends HTMLElement{
      connectedCallback(){
        if(this._mounted)return;
        this._mounted=true;
        this.classList.add('n1-inner-page','n1ip');
        this.style.cssText='display:block;width:100%;position:relative;background:#080A09';
        document.body.classList.add('n1-ip-page');
        ensureStyle();
        this.innerHTML=render(cfg);
        this._bootstrap().catch(err=>{console.error('[1N İç Sayfa] '+cfg.slug,err);});
      }
      async _bootstrap(){
        const deps=await Promise.allSettled([
          loadCss('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@400;500;600;700&display=swap'),
          loadCss(MOD+'n1-footer-v636.css'),
          loadCss(RESP),
          loadScript(BASE+'site/n1-site-markup-v1.js')
        ]);
        if(!this.isConnected)return;
        if(deps[3].status==='rejected')throw deps[3].reason;
        if(!window.N1_SITE_MARKUP)throw new Error('Ortak site şablonu bulunamadı');
        const temp=document.createElement('template');temp.innerHTML=window.N1_SITE_MARKUP;
        const header=temp.content.querySelector('n1-header');
        const footer=temp.content.querySelector('footer.n1ft');
        const fc=temp.content.querySelector('n1-floating-controls');
        if(!header||!footer||!fc)throw new Error('Header/Footer/Floating bileşenleri yok');
        const h=header.cloneNode(true);
        h.setAttribute('logo-href','https://www.reklam1n.com/');
        const menuData=h.querySelector('script[type="application/json"]');
        if(menuData){try{const data=JSON.parse(menuData.textContent);if(data.brand)data.brand.href='https://www.reklam1n.com/';menuData.textContent=JSON.stringify(data);}catch(err){console.warn('[1N Menü JSON]',err);}}
        const ft=document.createElement('template');
        ft.innerHTML=footer.outerHTML.replace(/\{\{ASSETS\}\}/g,ASSETS);
        const partnerList=ft.content.querySelector('.n1ft-partners');
        if(partnerList){
          const pic=document.createElement('picture');pic.className='n1ft-partner-art';
          const source=document.createElement('source');source.media='(max-width:767px)';source.srcset='https://static.wixstatic.com/media/6dbf5e_32b849155e954320a1f6479f27fd6ad2~mv2.png';
          const img=document.createElement('img');img.src='https://static.wixstatic.com/media/6dbf5e_800ff5a00ba244f9bb31761a6b2d713d~mv2.png';img.alt='1N Digital Media iş ortakları ve sertifikalar';img.loading='lazy';img.decoding='async';
          img.onerror=()=>pic.classList.add('n1-art-failed');pic.append(source,img);partnerList.parentNode.insertBefore(pic,partnerList);
        }
        const main=this.querySelector('.n1ip-main');
        if(!main)return;
        this.insertBefore(h,main);
        const floating=fc.cloneNode(true);floating.setAttribute('show-after','0.5');
        this.append(ft.content,floating);
        document.body.classList.add('n1-inner-fc-enabled');
        await loadScript(MOD+'n1-links-v646.js');
        if(!customElements.get('n1-header'))await loadScript(MOD+'n1-header-v613.js');
        if(h.panel)h.panel.classList.add('n1-inner-panel');
        // Footer module is an IIFE and must be run after footer insertion.
        const fo=document.createElement('script');fo.src=MOD+'n1-footer-v646.js';fo.async=false;document.head.appendChild(fo);
        if(!customElements.get('n1-floating-controls'))await loadScript(MOD+'n1-floating-controls-v632.js');
        if(!this.isConnected)return;
        this._buildFloating(h);
      }
      _buildFloating(header){
        if(this._mobileOverlay)return;
        const nav=document.createElement('nav');nav.id='n1-ip-mobile-controls';nav.setAttribute('aria-label','Hızlı erişim');
        nav.innerHTML='<button type="button" class="n1ip-fc-btn n1ip-fc-top" aria-label="Sayfanın başına dön" aria-hidden="true" tabindex="-1">'+ICONS.up+'</button>'+
          '<a class="n1ip-fc-btn n1ip-fc-wa" href="'+WHATSAPP+'" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp üzerinden 1N Digital Media ile iletişime geç">'+ICONS.wa+'</a>';
        document.body.appendChild(nav);document.body.classList.add('n1-ip-fc-on');
        this._mobileOverlay=nav;
        this._mobileTop=nav.querySelector('.n1ip-fc-top');
        this._topClick=()=>window.scrollTo({top:0,left:0,behavior:window.matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});
        this._mobileTop.addEventListener('click',this._topClick);
        this._refreshControls=()=>{const on=scrollY>innerHeight*.5;this._mobileTop.toggleAttribute('data-on',on);this._mobileTop.inert=!on;this._mobileTop.tabIndex=on?0:-1;this._mobileTop.setAttribute('aria-hidden',on?'false':'true');nav.toggleAttribute('data-menu-open',header.hasAttribute('data-open'));};
        this._scheduleControls=()=>{if(!this._fcRaf)this._fcRaf=requestAnimationFrame(()=>{this._fcRaf=0;this._refreshControls();});};
        window.addEventListener('scroll',this._scheduleControls,{passive:true});
        window.addEventListener('resize',this._scheduleControls,{passive:true});
        this._menuObserver=new MutationObserver(this._scheduleControls);
        this._menuObserver.observe(header,{attributes:true,attributeFilter:['data-open']});
        this._refreshControls();
      }
      disconnectedCallback(){
        this._mounted=false;
        if(this._menuObserver)this._menuObserver.disconnect();
        if(this._scheduleControls){window.removeEventListener('scroll',this._scheduleControls);window.removeEventListener('resize',this._scheduleControls);}
        if(this._fcRaf)cancelAnimationFrame(this._fcRaf);
        if(this._mobileTop)this._mobileTop.removeEventListener('click',this._topClick);
        if(this._mobileOverlay)this._mobileOverlay.remove();
        this._mobileOverlay=null;
        document.body.classList.remove('n1-ip-fc-on','n1-ip-page','n1-inner-fc-enabled');
        this.replaceChildren();
      }
    };
  }
  window.N1RegisterInnerPages=function(){
    const list=window.N1_PENDING_INNER_PAGES||[];
    while(list.length){
      const item=list.shift();
      if(item&&item.tag&&!customElements.get(item.tag))customElements.define(item.tag,createClass(item.cfg));
    }
  };
  window.N1RegisterInnerPages();
})();
