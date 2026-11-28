// mono logo önizlemesi: 56/52/48 kutu, normal ve hover rengi, büyük boy
const pw=require('playwright'),fs=require('fs'),path=require('path');const M=path.join(__dirname,'../assets/platforms/mono/');
const n=['01-zeyp','02-market','03-hemen-tikla','04-intelligence'];const svg=n.map(x=>fs.readFileSync(M+x+'.svg','utf8'));
const tile=(s,i,c)=>`<span style="display:inline-grid;place-items:center;width:${s}px;height:${s}px;margin-right:${s>50?10:8}px;border-radius:8px;background:#1A1C1B;box-shadow:inset 0 0 0 1px rgba(189,191,185,.14);color:${c}"><span style="display:block;width:${Math.round(s*.58)}px;height:${Math.round(s*.58)}px">${svg[i]}</span></span>`;
const row=(s,c)=>`<div style="margin:0 0 14px">${n.map((_,i)=>tile(s,i,c)).join('')}</div>`;
const html=`<body style="margin:0;padding:20px;background:#111312;font:12px sans-serif;color:#777">${row(56,'#BDBFB9')}${row(52,'#BDBFB9')}${row(48,'#BDBFB9')}${row(56,'#A2FF00')}<div>${n.map((_,i)=>`<span style="display:inline-block;width:220px;height:220px;margin-right:10px;background:#1A1C1B;color:#BDBFB9">${svg[i]}</span>`).join('')}</div><style>svg{width:100%;height:100%;display:block}</style></body>`;
(async()=>{const b=await pw.chromium.launch();const p=await b.newPage({viewport:{width:960,height:560},deviceScaleFactor:2});await p.setContent(html);await p.screenshot({path:process.argv[2]||'/tmp/mono.png'});await b.close()})();
