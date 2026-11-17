// A small markdown to HTML renderer for this site's own guidance files. Node built-ins only.
// Written by specialist-design@AgentiCCells.dinis, 2026-11-16. Code: Apache-2.0.
// Supports what the guidance uses: headings, paragraphs, lists (one level, with indented
// continuation lines), pipe tables, fenced code, block quotes, **bold**, `code`, [links](url).
// Links to .md files become links to the rendered .html page. Everything else is escaped.

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function inline(s) {
  const codes = [];
  s = s.replace(/`([^`]+)`/g, (_, c) => { codes.push(c); return `\u0000${codes.length - 1}\u0000`; });
  s = esc(s);
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, u) => {
    const href = /^https?:/.test(u) ? u : u.replace(/\.md(#|$)/, '.html$1').replace(/(^|\/)README\.html/, '$1index.html');
    return `<a href="${href}">${t}</a>`;
  });
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  return s.replace(/\u0000(\d+)\u0000/g, (_, i) => `<code>${esc(codes[Number(i)])}</code>`);
}

const slug = (s) => s.toLowerCase().replace(/<[^>]+>/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export function render(md) {
  const lines = md.replace(/\r/g, '').split('\n');
  const out = [];
  let title = '';
  let i = 0;
  const isBlockStart = (l) => /^(#{1,4} |```|> |\s*[-*] |\s*\d+\. |\|)/.test(l) || l.trim() === '';
  while (i < lines.length) {
    const l = lines[i];
    if (l.trim() === '') { i++; continue; }
    let m;
    if ((m = l.match(/^(#{1,4}) (.*)$/))) {
      const n = m[1].length, text = inline(m[2]);
      if (n === 1 && !title) title = m[2].replace(/[`*]/g, '');
      out.push(`<h${n} id="${slug(text)}">${text}</h${n}>`); i++; continue;
    }
    if (l.startsWith('```')) {
      const buf = []; i++;
      while (i < lines.length && !lines[i].startsWith('```')) buf.push(lines[i++]);
      i++; out.push(`<pre><code>${esc(buf.join('\n'))}</code></pre>`); continue;
    }
    if (l.startsWith('> ')) {
      const buf = [];
      while (i < lines.length && lines[i].startsWith('>')) buf.push(lines[i++].replace(/^> ?/, ''));
      out.push(`<blockquote><p>${inline(buf.join(' '))}</p></blockquote>`); continue;
    }
    if (l.startsWith('|')) {
      const rows = [];
      while (i < lines.length && lines[i].startsWith('|')) rows.push(lines[i++]);
      const cells = (r) => r.replace(/^\||\|$/g, '').split('|').map((c) => inline(c.trim()));
      const head = cells(rows[0]);
      const body = rows.slice(rows[1] && /^\|[\s:|-]+\|$/.test(rows[1]) ? 2 : 1).map(cells);
      out.push(`<div class="table"><table><thead><tr>${head.map((c) => `<th>${c}</th>`).join('')}</tr></thead><tbody>${body.map((r) => `<tr>${r.map((c, k) => `<td data-label="${(head[k] || '').replace(/<[^>]+>/g, '').replace(/"/g, '&quot;')}">${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`);
      continue;
    }
    if ((m = l.match(/^(\s*)([-*]|\d+\.) /))) {
      const ordered = /\d/.test(m[2]);
      const items = [];
      while (i < lines.length) {
        const im = lines[i].match(/^(\s*)([-*]|\d+\.) (.*)$/);
        if (im && im[1].length === 0) { items.push([im[3]]); i++; continue; }
        if (im && items.length) { items[items.length - 1].push('\u0001' + im[3]); i++; continue; } // nested item
        if (items.length && /^\s{2,}\S/.test(lines[i])) { items[items.length - 1].push(lines[i].trim()); i++; continue; }
        break;
      }
      const li = items.map((parts) => {
        const main = [], sub = [];
        for (const p of parts) (p.startsWith('\u0001') ? sub.push(p.slice(1)) : sub.length ? sub[sub.length - 1] += ' ' + p : main.push(p));
        return `<li>${inline(main.join(' '))}${sub.length ? `<ul>${sub.map((s) => `<li>${inline(s)}</li>`).join('')}</ul>` : ''}</li>`;
      });
      out.push(`<${ordered ? 'ol' : 'ul'}>${li.join('')}</${ordered ? 'ol' : 'ul'}>`);
      continue;
    }
    const buf = [];
    while (i < lines.length && (buf.length === 0 || !isBlockStart(lines[i]))) buf.push(lines[i++]);
    out.push(`<p>${inline(buf.join(' '))}</p>`);
  }
  const firstPara = md.split('\n').find((x) => x && !/^(#|\||>|```|\s*[-*] |\s*\d+\. )/.test(x)) || title;
  return { title, description: firstPara.replace(/\[([^\]]+)\]\([^)\s]+\)/g, '$1').replace(/[`*]/g, '').trim(), html: out.join('\n') };
}
