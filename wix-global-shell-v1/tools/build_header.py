#!/usr/bin/env python3
"""n1-header v14 = v13 (wix-career-v1/modules/n1-header-v13.js) + global menü revizyonu:
 - İletişim satırı (menü verisinden); bütün satırlar aynı tipografi (son satırın küçültülmüş stili kaldırıldı)
 - Başlangıca Dön kartının altında A7 Prodüksiyon kartı ve "Uygulama ve Platformlar" logo kartı (menü verisinden: a7, platforms)
 - Logolar menü ilk kez açıldığında yüklenir (data-src → src); kapalı menü logo indirmez
 - Adres tabanlı aktif durum (bulunulan sayfanın satırı / alt bağlantısı: data-current + aria-current)
 - no-cta özniteliği: Teklif Al düğmesi hiç oluşturulmaz (bağımsız header)
 - Kısa masaüstü ekranları için sıkıştırma; çok kısa ekranda panel kendi içinde kayar (alt menü panelin içine iner)
Her değişiklik birebir eşleşmelidir."""
import os,sys,json
R=os.path.abspath(os.path.join(os.path.dirname(__file__),'..','..'))
s=open(os.path.join(R,'wix-career-v1','modules','n1-header-v13.js'),encoding='utf-8').read()
def rep(o,n,c=1):
    global s
    if s.count(o)!=c: sys.exit('eşleşme %d≠%d: %r'%(s.count(o),c,o[:110]))
    s=s.replace(o,n)
ASSET=sys.argv[1]  # logo commit SHA
LOGO='https://cdn.jsdelivr.net/gh/1ndigitalmedia-design/1n-ronin-assets@%s/wix-global-shell-v1/assets/platforms/'%ASSET
rep(" * n1-header — 1N Digital Media header (v13 · KARİYER MENÜSÜ; v12 tabanı)",
""" * n1-header — 1N Digital Media header (v14 · GLOBAL MENÜ V2; v13 tabanı)
 * v14: İletişim satırı; A7 Prodüksiyon ve "Uygulama ve Platformlar" kartları (menü verisinden, logolar menü açılınca yüklenir);
 *   adres tabanlı aktif durum; no-cta özniteliği (bağımsız header'da Teklif Al yok); kısa ekran düzeni. Diğer her şey v13 ile aynıdır.""")
MENU_ADD=''',
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
        { "name": "ZEYP", "href": "https://www.zeyp.com.tr/", "img": "%s01-zeyp" },
        { "name": "Market — Canlı Piyasalar", "href": "https://www.carsialtin.com/faprika/canli-piyasalar/", "img": "%s02-market" },
        { "name": "Hemen Tıkla", "href": "https://www.hementik.la/", "img": "%s03-hemen-tikla" },
        { "name": "1N Intelligence", "href": "https://www.reklam1n.com/intelligence", "img": "%s04-intelligence" }
      ]
    }
  };'''%(LOGO,LOGO,LOGO,LOGO)
rep('''          {
            "text": "Staj Programları",
            "href": "/staj-programlari"
          }
        ]
      }
    ]
  };''','''          {
            "text": "Staj Programları",
            "href": "/staj-programlari"
          }
        ]
      }'''+MENU_ADD)
CSS_ADD=r"""
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
.n1h-platcard{padding:10px 10px 12px}
.n1h-platcard h3{margin:6px 6px 10px;font:500 11px/1 Barlow,Arial,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:rgba(236,235,230,.45)}
.n1h-plats{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}
.n1h-plats li{min-width:0}
.n1h-plat{position:relative;display:block;aspect-ratio:1/1;min-width:44px;min-height:44px;border-radius:9px;overflow:hidden;background:#1a1d1b;outline:none;transition:transform .35s ${EASE},box-shadow .3s ease}
.n1h-plat img{display:block;width:100%;height:100%;object-fit:cover;border-radius:inherit}
.n1h-plat:hover{transform:translateY(-2px)}
.n1h-plat:focus-visible{box-shadow:0 0 0 2px #111312,0 0 0 4px #ecebe6}
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
  .n1h-platcard{padding:8px 10px 10px}
  .n1h-platcard h3{margin:4px 6px 8px}
  .n1h-plats{grid-template-columns:repeat(4,64px);justify-content:space-between}
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
"""
rep(".n1h-foot{display:flex;",CSS_ADD+"\n.n1h-foot{display:flex;")
# satırlar: son satır küçük stili artık uygulanmaz (İletişim diğer satırlarla aynı)
rep("const subs = (it.sub || []).length; const li = `<li${i === items.length - 1 ? ' class=\"n1h-last\"' : ''}>`;",
    "const subs = (it.sub || []).length; const li = '<li>';   // v14: bütün satırlar aynı tipografi (İletişim dahil)")
# CTA yok seçeneği
rep('''    <a class="n1h-btn n1h-cta" href="${esc(A('cta-href', '#iletisim'))}"><span class="n1h-dot" aria-hidden="true"></span>${esc(A('cta-text', 'Teklif Al'))}</a>''',
    '''    ${this.hasAttribute('no-cta') ? '' : `<a class="n1h-btn n1h-cta" href="${esc(A('cta-href', '#iletisim'))}"><span class="n1h-dot" aria-hidden="true"></span>${esc(A('cta-text', 'Teklif Al'))}</a>`}''')
# kartlar: Başlangıca Dön'ün altına
EXT_SVG='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" aria-hidden="true" focusable="false"><path d="M5 11L11 5M6 5h5v5"/></svg>'
old_brand='''<div class="n1h-card n1h-brandcard" style="--i:1"><a class="n1h-brand" href="${esc(menu.brand.href)}"><span><b>${esc(menu.brand.text)}</b><small>${esc(menu.brand.note || 'Başlangıca dön')}</small></span><span class="n1h-bline" aria-hidden="true"></span></a></div>`;'''
new_brand='''<div class="n1h-card n1h-brandcard" style="--i:1"><a class="n1h-brand" href="${esc(menu.brand.href)}"><span><b>${esc(menu.brand.text)}</b><small>${esc(menu.brand.note || 'Başlangıca dön')}</small></span><span class="n1h-bline" aria-hidden="true"></span></a></div>${menu.a7 && menu.a7.href ? `<div class="n1h-card n1h-a7card" style="--i:2"><a class="n1h-a7" href="${esc(menu.a7.href)}" target="_blank" rel="noopener noreferrer"><span><b>${esc(menu.a7.text)}</b>${menu.a7.note ? `<small>${esc(menu.a7.note)}</small>` : ''}<span class="n1h-sr"> (yeni sekmede açılır)</span></span><span class="n1h-ext">'''+EXT_SVG+'''</span></a></div>` : ''}${menu.platforms && (menu.platforms.items || []).length ? `<div class="n1h-card n1h-platcard" style="--i:3" role="group" aria-label="${esc(menu.platforms.title || 'Uygulama ve Platformlar')}"><h3>${esc(menu.platforms.title || 'Uygulama ve Platformlar')}</h3><ul class="n1h-plats">${menu.platforms.items.map((pl) => { const ext = !/^https?:\\/\\/(www\\.)?reklam1n\\.com(\\/|$)/.test(pl.href) && /^https?:/.test(pl.href); return `<li><a class="n1h-plat" href="${esc(pl.href)}"${ext ? ' target="_blank" rel="noopener noreferrer"' : ''} aria-label="${esc(pl.name)}${ext ? ' (yeni sekmede açılır)' : ''}"><img alt="" width="160" height="160" decoding="async" data-src="${esc(pl.img)}-160.webp" data-srcset="${esc(pl.img)}-160.webp 160w, ${esc(pl.img)}-320.webp 320w" sizes="(max-width:767px) 22vw, 84px"></a></li>`; }).join('')}</ul></div>` : ''}`;'''
rep(old_brand,new_brand)
# aktif durum + logo tembel yükleme
rep("      this.sub = -1; this._update();\n    }",
"""      this.sub = -1; this._markCurrent(); this._update();
    }
    _markCurrent() { // v14: bulunulan sayfanın satırı (ve alt bağlantısı) işaretlenir; ana sayfada kaydırma tabanlı işaret (match) korunur
      const norm = (h) => { try { const u = new URL(h, location.href); return u.origin === location.origin ? (u.pathname.replace(/\\/+$/, '') || '/') : null; } catch (e) { return null; } };
      const here = norm(location.href); if (!here || here === '/') return;
      this._pathCur = -1;
      (this.menu.items || []).forEach((it, i) => {
        let hit = it.href && norm(it.href) === here;
        (it.sub || []).forEach((sb) => { if (sb.href && norm(sb.href) === here) hit = true; });
        if (hit) this._pathCur = i;
      });
      this.panel.querySelectorAll('a[href]').forEach((a) => { if (norm(a.getAttribute('href')) === here && !a.target) a.setAttribute('aria-current', 'page'); });
    }
    _loadLogos() { if (this._logos) return; this._logos = true; this.panel.querySelectorAll('img[data-src]').forEach((im) => { im.srcset = im.dataset.srcset; im.src = im.dataset.src; im.removeAttribute('data-src'); im.removeAttribute('data-srcset'); }); }""")
rep("      this.items && this.items.forEach((it, i) => { if (i === cur) it.dataset.current = ''; else delete it.dataset.current; });",
    "      if (cur < 0 && this._pathCur >= 0) cur = this._pathCur;\n      this.items && this.items.forEach((it, i) => { if (i === cur) it.dataset.current = ''; else delete it.dataset.current; });")
rep("""    show() {
      this._resetSub();""","""    show() {
      this._resetSub(); this._loadLogos();""")
rep("""      const top = row.offsetTop - 10, maxTop""","""      const top = row.getBoundingClientRect().top - this.panel.getBoundingClientRect().top - 10, maxTop""")
out=os.path.join(R,'wix-global-shell-v1','modules','n1-header-v14.js');os.makedirs(os.path.dirname(out),exist_ok=True);open(out,'w',encoding='utf-8').write(s);print('yazıldı',out,len(s))
