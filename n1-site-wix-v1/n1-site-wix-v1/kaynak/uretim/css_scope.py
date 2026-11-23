"""v6.47 index.html <style> içeriğini <n1-site-v1> bileşen kapsamına alır.
Kural: özgüllük v6.47 ile aynı kalsın (:where ile), yalnızca '*' kuralı normal özgüllükte (Wix'in genel kurallarına yenilmesin)."""
import re
ROOT = 'n1-site-v1'
S = ':where(n1-site-v1, [data-n1-owner])'

def split_blocks(css):
    """Üst düzey blokları (prelude, body) olarak döndürür; iç içe süslü parantezleri sayar."""
    out, i, n = [], 0, len(css)
    while i < n:
        j = css.find('{', i)
        if j < 0:
            break
        prelude = css[i:j].strip()
        d, k = 1, j + 1
        while d and k < n:
            c = css[k]
            if c == '{': d += 1
            elif c == '}': d -= 1
            k += 1
        out.append((prelude, css[j + 1:k - 1]))
        i = k
    return out

def split_selectors(sel):
    parts, depth, buf = [], 0, ''
    for c in sel:
        if c in '([': depth += 1
        elif c in ')]': depth -= 1
        if c == ',' and depth == 0:
            parts.append(buf.strip()); buf = ''
        else:
            buf += c
    if buf.strip(): parts.append(buf.strip())
    return parts

def scope_one(s):
    if s == '*':
        return f'{ROOT}, {ROOT} *, [data-n1-owner], [data-n1-owner] *'
    if s in ('html', ':root', 'body'):
        return S
    m = re.match(r'^(?:html)?\.has-js(\s+|$)(.*)$', s)
    if m:
        return f':where({ROOT}).has-js' + (' ' + m.group(2) if m.group(2) else '')
    m = re.match(r'^(?:html)?\.has-scroll-highlight\s+(.*)$', s)
    if m:
        return f'.has-scroll-highlight {S} ' + m.group(1)
    m = re.match(r'^(html|body)\s+(.*)$', s)
    if m:
        return S + ' ' + m.group(2)
    if re.match(r'^(html|body)\W', s):
        raise ValueError('ele alınmamış html/body seçicisi: ' + s)
    return S + ' ' + s

def scope_css(css):
    css = re.sub(r'/\*.*?\*/', '', css, flags=re.S)
    out = []
    for prelude, body in split_blocks(css):
        if prelude.startswith('@media') or prelude.startswith('@supports'):
            out.append(prelude + '{' + scope_css(body) + '}')
        elif prelude.startswith('@'):
            out.append(prelude + '{' + body + '}')       # @keyframes / @font-face aynen
        else:
            sels = [scope_one(x) for x in split_selectors(prelude)]
            out.append(',\n'.join(sels) + '{' + body.strip() + '}')
    return '\n'.join(out)
