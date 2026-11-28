#!/usr/bin/env python3
"""n1-header v13 = v12 (wix-global-menu-v12/modules/n1-header-v12.js) + hibrit menü satırı:
 href + sub olan başlık (İnsan Kaynakları) = başlık bağlantısı (/insan-kaynaklari) + ayrı alt menü düğmesi.
Tasarım, açılış/kapanış hareketi, odak yönetimi ve V1.3 menü kapanış uyumu korunur. Her değişiklik tam bir kez eşleşmeli."""
import os,sys
R=os.path.abspath(os.path.join(os.path.dirname(__file__),'..','..'))
s=open(os.path.join(R,'wix-global-menu-v12','modules','n1-header-v12.js'),encoding='utf-8').read()
def rep(o,n,c=1):
    global s
    if s.count(o)!=c: sys.exit('eşleşme %d≠%d: %r'%(s.count(o),c,o[:100]))
    s=s.replace(o,n)
rep(" * n1-header — 1N Digital Media header (v12 · GLOBAL MENU V1.2; v6.48 tabanı)",
""" * n1-header — 1N Digital Media header (v13 · KARİYER MENÜSÜ; v12 tabanı)
 * v13: hem "href" hem "sub" taşıyan başlık (İnsan Kaynakları) HİBRİT satırdır: başlık metni bağlantıdır (/insan-kaynaklari'ye gider),
 *   yanındaki ayrı düğme (not metni + işaret) alt menüyü açar/kapatır. Dokunmatikte bağlantı ve alt menü birbirini engellemez;
 *   farede başlığın üzerine gelince alt menü yine açılır, tıklama sayfaya gider. Diğer başlıklar, tasarım ve hareketler v12 ile aynıdır.
 *   V1.3 menü kapanış betiğiyle uyum: menü her açılışta ve BFCache dönüşünde alt menü durumu sıfırlanır.""")
# varsayılan menü
rep('''      {
        "title": "İnsan Kaynakları",
        "note": "Ekibe katıl",
        "sub": [
          {
            "text": "Ekibimize Katıl",
            "href": "/ekibimize-katil"
          },
          {
            "text": "Açık Pozisyonlar",
            "href": "/acik-pozisyonlar"
          }
        ]
      }''','''      {
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
      }''')
# CSS: hibrit satır (mevcut .n1h-item görünümü korunur; not alanı düğme olur)
rep(".n1h-nav li.n1h-last{margin-top:6px}",
""".n1h-row{display:flex;align-items:stretch;gap:4px}
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
.n1h-nav li.n1h-last{margin-top:6px}""")
# işaretleme: hibrit satır
rep("""return `<li${i === items.length - 1 ? ' class="n1h-last"' : ''}>${it.href && !(it.sub || []).length ? `<a class="n1h-item" href="${esc(it.href)}" data-i="${i}">${inner}</a>` : `<button class="n1h-item" type="button" aria-expanded="false" aria-controls="${id}-s${i}" data-i="${i}">${inner}</button>`}</li>`; }).join('')}</ul>""",
"""const subs = (it.sub || []).length; const li = `<li${i === items.length - 1 ? ' class="n1h-last"' : ''}>`;
        if (it.href && subs) { // v13 hibrit: başlık bağlantı + ayrı alt menü düğmesi
          const lt = `<span class="n1h-mark" aria-hidden="true"></span><span class="n1h-txt">${esc(it.title)}</span>`;
          return `${li}<div class="n1h-row"><a class="n1h-item" href="${esc(it.href)}" data-i="${i}" data-sub="1">${lt}</a><button class="n1h-subtog" type="button" aria-expanded="false" aria-controls="${id}-s${i}" aria-label="${esc(it.title)} alt menüsü" data-i="${i}"><span aria-hidden="true">${esc(it.note || '')}</span><span class="n1h-plus" aria-hidden="true"></span></button></div></li>`; }
        return `${li}${it.href && !subs ? `<a class="n1h-item" href="${esc(it.href)}" data-i="${i}">${inner}</a>` : `<button class="n1h-item" type="button" aria-expanded="false" aria-controls="${id}-s${i}" data-i="${i}">${inner}</button>`}</li>`; }).join('')}</ul>""")
rep("this.items = [...p.querySelectorAll('.n1h-item')]; this.subs = [...p.querySelectorAll('.n1h-sub')];",
    "this.items = [...p.querySelectorAll('.n1h-item')]; this.subs = [...p.querySelectorAll('.n1h-sub')]; this.togs = [...p.querySelectorAll('.n1h-subtog')];")
# tıklama: alt menü düğmesi
rep("""        const it = e.target.closest('.n1h-item'); if (it) { if (it.tagName === 'A') { this.close(false); return; }""",
"""        const tg = e.target.closest('.n1h-subtog'); if (tg) { const i = +tg.dataset.i; if (this.sub === i && this._subBy !== 'hover') this._openSub(-1); else { this._openSub(i); this._subBy = 'click'; } return; }
        const it = e.target.closest('.n1h-item'); if (it) { if (it.tagName === 'A') { this.close(false); return; }""")
# hover: hibrit bağlantı da alt menüyü açar (yalnız fare)
rep("""this._openSub(it.tagName === 'A' ? -1 : +it.dataset.i);""","""this._openSub(it.tagName === 'A' && !it.dataset.sub ? -1 : +it.dataset.i);""")
rep("""      p.querySelector('.n1h-brand').addEventListener('pointerenter',""",
"""      this.togs.forEach((tg) => tg.addEventListener('pointerenter', (e) => { if ((e.pointerType && e.pointerType !== 'mouse') || !N1H_CAN_HOVER()) return; clearTimeout(this._ht); this._ht = setTimeout(() => { const was = this.sub; this._openSub(+tg.dataset.i); if (this.sub >= 0 && this.sub !== was) this._subBy = 'hover'; }, 90); }));
      p.querySelector('.n1h-brand').addEventListener('pointerenter',""")
# klavye: ← hibrit satırda da alt menüyü açar (başlıktan ya da düğmeden)
rep("""        const it = e.target.closest('.n1h-item');
        if (it && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
          if (e.key === 'ArrowLeft' && it.tagName !== 'A') {""",
"""        const it = e.target.closest('.n1h-item') || e.target.closest('.n1h-subtog');
        if (it && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
          if (e.key === 'ArrowLeft' && (it.tagName !== 'A' || it.dataset.sub)) {""")
rep("""        } else if (e.target.closest('.n1h-sub') && e.key === 'ArrowRight') { const i = this.sub; this._openSub(-1); this.items[i] && this.items[i].focus(); e.preventDefault(); }""",
"""        } else if (e.target.closest('.n1h-sub') && e.key === 'ArrowRight') { const i = this.sub; this._openSub(-1); this._focusRow(i); e.preventDefault(); }""")
rep("""        if (this.sub >= 0) { const i = this.sub; this._openSub(-1); this.items[i] && this.items[i].focus(); } else this.close(true);""",
"""        if (this.sub >= 0) { const i = this.sub; this._openSub(-1); this._focusRow(i); } else this.close(true);""")
# BFCache dönüşünde alt menü durumunu sıfırla (V1.3 menü kapanış betiği DOM'u doğrudan kapatabilir)
rep("""      addEventListener('scroll', this._scroll, { passive: true }); addEventListener('resize', this._scroll);""",
"""      addEventListener('scroll', this._scroll, { passive: true }); addEventListener('resize', this._scroll);
      this._ps = (e) => { if (e.persisted) this._resetSub(); }; addEventListener('pageshow', this._ps);""")
rep("""      this._on = false; removeEventListener('scroll', this._scroll); removeEventListener('resize', this._scroll);""",
"""      this._on = false; removeEventListener('scroll', this._scroll); removeEventListener('resize', this._scroll); removeEventListener('pageshow', this._ps);""")
rep("""    show() {
      this.open = true;""","""    show() {
      this._resetSub();
      this.open = true;""")
rep("""      this.items.forEach((it, k) => it.setAttribute('aria-expanded', String(k === i)));""",
"""      this.items.forEach((it, k) => { if (it.tagName === 'A') { if (k === i) it.dataset.exp = ''; else delete it.dataset.exp; } else it.setAttribute('aria-expanded', String(k === i)); });
      this.togs.forEach((tg) => tg.setAttribute('aria-expanded', String(+tg.dataset.i === i)));""")
rep("""    _update() {""","""    _resetSub() { // dış kapanıştan (V1.3 menü kapanışı, BFCache) sonra iç durumu DOM ile eşitle
      clearTimeout(this._ht); this.sub = -1; this._subBy = null;
      this.subs.forEach((s) => delete s.dataset.open);
      this.items.forEach((it) => { if (it.tagName === 'A') delete it.dataset.exp; else it.setAttribute('aria-expanded', 'false'); });
      this.togs.forEach((tg) => tg.setAttribute('aria-expanded', 'false'));
    }
    _focusRow(i) { const tg = this.togs.find((t) => +t.dataset.i === i); const el = tg || this.items[i]; el && el.focus(); }
    _update() {""")
out=os.path.join(R,'wix-career-v1','modules','n1-header-v13.js');open(out,'w',encoding='utf-8').write(s);print('yazıldı',out,len(s))
