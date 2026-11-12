// Minimal Markdown -> styled HTML converter for this repo's documents.
// Supports: headings, GFM tables, unordered/ordered lists, blockquotes, hr,
// **bold**, *italic*, `code`. Output is tuned for A4 print / PDF.

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const docsDir = path.join(root, 'docs');
const outDir = path.join(root, 'build');

// Only the Hindi documents go to PDF: they are handed to the contractor/electrician.
// English documents stay as markdown.
const files = [
  'quotation.hi.md',
  'fitting-list.hi.md',
];

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function inline(s) {
  s = esc(s);
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>');
  return s;
}

function isSep(line) {
  return /^\s*\|?[\s:-]*-[\s:|-]*\|?\s*$/.test(line) && line.includes('-');
}

function splitRow(line) {
  let l = line.trim();
  if (l.startsWith('|')) l = l.slice(1);
  if (l.endsWith('|')) l = l.slice(0, -1);
  return l.split('|').map((c) => c.trim());
}

function convert(md) {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const out = [];
  let para = [];
  let i = 0;

  const flush = () => {
    if (para.length) {
      out.push('<p>' + inline(para.join(' ')) + '</p>');
      para = [];
    }
  };

  while (i < lines.length) {
    const line = lines[i];

    if (/^\s*$/.test(line)) { flush(); i++; continue; }
    if (/^\s*-{3,}\s*$/.test(line)) { flush(); out.push('<hr>'); i++; continue; }

    let m = line.match(/^(#{1,6})\s+(.*)$/);
    if (m) {
      flush();
      const lvl = m[1].length;
      out.push(`<h${lvl}>${inline(m[2].trim())}</h${lvl}>`);
      i++; continue;
    }

    if (line.trim().startsWith('|')) {
      const block = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) { block.push(lines[i]); i++; }
      if (block.length >= 2 && isSep(block[1])) {
        flush();
        const head = splitRow(block[0]);
        const rows = block.slice(2).map(splitRow);
        let t = '<table><thead><tr>' + head.map((h) => `<th>${inline(h)}</th>`).join('') + '</tr></thead><tbody>';
        for (const r of rows) t += '<tr>' + r.map((c) => `<td>${inline(c)}</td>`).join('') + '</tr>';
        t += '</tbody></table>';
        out.push(t);
      } else {
        para.push(...block);
      }
      continue;
    }

    if (/^\s*>\s?/.test(line)) {
      flush();
      const block = [];
      while (i < lines.length && /^\s*>\s?/.test(lines[i])) { block.push(lines[i].replace(/^\s*>\s?/, '')); i++; }
      out.push('<blockquote>' + convert(block.join('\n')) + '</blockquote>');
      continue;
    }

    if (/^\s*[-*+]\s+/.test(line)) {
      flush();
      const items = [];
      while (i < lines.length && /^\s*[-*+]\s+/.test(lines[i])) { items.push(lines[i].replace(/^\s*[-*+]\s+/, '')); i++; }
      out.push('<ul>' + items.map((t) => `<li>${inline(t)}</li>`).join('') + '</ul>');
      continue;
    }

    if (/^\s*\d+\.\s+/.test(line)) {
      flush();
      const items = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) { items.push(lines[i].replace(/^\s*\d+\.\s+/, '')); i++; }
      out.push('<ol>' + items.map((t) => `<li>${inline(t)}</li>`).join('') + '</ol>');
      continue;
    }

    para.push(line.trim());
    i++;
  }
  flush();
  return out.join('\n');
}

function page(title, body) {
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>${esc(title)}</title>
<style>
  @page { size: A4; margin: 15mm 13mm; }
  * { box-sizing: border-box; }
  body {
    font-family: 'Nirmala UI','Mangal','Noto Sans Devanagari','Segoe UI',Arial,sans-serif;
    font-size: 10.5pt; line-height: 1.55; color:#1a1a1a; margin:0;
  }
  h1 { font-size: 17pt; margin: 0 0 10px; padding-bottom:6px; border-bottom:2px solid #333; }
  h2 { font-size: 13pt; margin: 18px 0 8px; border-bottom:1px solid #cfcfcf; padding-bottom:3px; }
  h3 { font-size: 11.5pt; margin: 14px 0 6px; }
  p { margin: 6px 0; }
  table { border-collapse: collapse; width:100%; margin: 8px 0 12px; font-size:9.5pt; }
  th, td { border:1px solid #949494; padding:5px 7px; text-align:left; vertical-align:top; }
  th { background:#eef0f2; font-weight:600; }
  tr { page-break-inside: avoid; }
  ul, ol { margin:6px 0 10px; padding-left: 20px; }
  li { margin: 3px 0; }
  blockquote { margin:8px 0; padding:8px 12px; background:#f6f6f6; border-left:3px solid #999; font-size:9.8pt; }
  code { background:#f0f0f0; padding:1px 4px; border-radius:3px; font-size:9.5pt; }
  hr { border:none; border-top:1px solid #ccc; margin:14px 0; }
</style>
</head>
<body>
${body}
</body>
</html>
`;
}

for (const f of files) {
  const src = path.join(docsDir, f);
  const md = fs.readFileSync(src, 'utf8');
  const title = (md.match(/^#\s+(.*)$/m) || [, f])[1].trim();
  const html = page(title, convert(md));
  const out = path.join(outDir, f.replace(/\.md$/, '.html'));
  fs.writeFileSync(out, html, 'utf8');
  console.log('Wrote ' + path.relative(root, out));
}
