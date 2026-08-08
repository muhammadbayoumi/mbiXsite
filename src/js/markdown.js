// ═══════════════════════════════════════════
// MARKDOWN — minimal renderer for the upstream ScrapeX documents
// ═══════════════════════════════════════════
//
// Deliberately small. It covers exactly the constructs the two documents in
// mbiX-hub/ScrapeX/docs use — headings, paragraphs, tables, lists, blockquotes,
// horizontal rules, links, bold, italic and inline code — and nothing else. A
// full CommonMark implementation would be several times the weight of the rest
// of this site's JavaScript for two pages of prose.
//
// Everything is built as DOM nodes and text, never assigned through innerHTML.
// The source is fetched over the network at runtime, so treating it as markup
// would mean anything that could alter that file could inject script into this
// origin. Text nodes make that structurally impossible rather than unlikely.

/**
 * Render markdown into `host`, replacing its contents.
 *
 * @param {HTMLElement} host
 * @param {string} md
 * @param {Object<string,string>} [linkMap] rewrites for relative links,
 *        e.g. { 'support.md': 'scrapex-support.html' }
 */
export function renderMarkdown(host, md, linkMap = {}) {
  const frag = document.createDocumentFragment();
  for (const block of splitBlocks(md.replace(/\r\n/g, '\n'))) {
    const el = renderBlock(block, linkMap);
    if (el) frag.append(el);
  }
  host.replaceChildren(frag);
}

/** Split into blocks on blank lines, keeping table and list runs together. */
function splitBlocks(md) {
  const lines = md.split('\n');
  const blocks = [];
  let current = [];

  const flush = () => {
    if (current.length) blocks.push(current);
    current = [];
  };

  for (const line of lines) {
    if (!line.trim()) { flush(); continue; }
    // A heading or rule is always its own block, even without a blank line.
    if (/^(#{1,6}\s|---+\s*$|\*\*\*+\s*$)/.test(line)) {
      flush();
      blocks.push([line]);
      continue;
    }
    current.push(line);
  }
  flush();
  return blocks;
}

function renderBlock(lines, linkMap) {
  const first = lines[0];

  // Horizontal rule
  if (/^(---+|\*\*\*+)\s*$/.test(first)) return document.createElement('hr');

  // Heading
  const heading = first.match(/^(#{1,6})\s+(.*)$/);
  if (heading) {
    // The document's own H1 duplicates the page title, so it is demoted:
    // two H1s on one page is a real accessibility problem, and the page
    // heading is the one that belongs to the site.
    const level = Math.min(heading[1].length + 1, 6);
    const el = document.createElement(`h${level}`);
    el.append(...renderInline(heading[2], linkMap));
    return el;
  }

  // Table — needs a header row and a delimiter row beneath it
  if (lines.length >= 2 && first.includes('|') && /^\s*\|?[\s:|-]+\|[\s:|-]*$/.test(lines[1])) {
    return renderTable(lines, linkMap);
  }

  // Blockquote
  if (/^>\s?/.test(first)) {
    const el = document.createElement('blockquote');
    const text = lines.map(l => l.replace(/^>\s?/, '')).join(' ');
    const p = document.createElement('p');
    p.append(...renderInline(text, linkMap));
    el.append(p);
    return el;
  }

  // Lists
  if (/^\s*([-*+]|\d+\.)\s/.test(first)) return renderList(lines, linkMap);

  // Paragraph — soft-wrapped source lines join into one flowing paragraph
  const p = document.createElement('p');
  p.append(...renderInline(lines.join(' '), linkMap));
  return p;
}

function renderTable(lines, linkMap) {
  const cells = row => row.replace(/^\s*\|/, '').replace(/\|\s*$/, '').split('|').map(c => c.trim());

  const table = document.createElement('table');
  table.className = 'md-table';

  const thead = document.createElement('thead');
  const headRow = document.createElement('tr');
  for (const cell of cells(lines[0])) {
    const th = document.createElement('th');
    th.append(...renderInline(cell, linkMap));
    headRow.append(th);
  }
  thead.append(headRow);
  table.append(thead);

  const tbody = document.createElement('tbody');
  for (const line of lines.slice(2)) {
    const tr = document.createElement('tr');
    for (const cell of cells(line)) {
      const td = document.createElement('td');
      td.append(...renderInline(cell, linkMap));
      tr.append(td);
    }
    tbody.append(tr);
  }
  table.append(tbody);

  // Tables are the one construct here that can outgrow a phone screen.
  const wrap = document.createElement('div');
  wrap.className = 'md-table-wrap';
  wrap.append(table);
  return wrap;
}

function renderList(lines, linkMap) {
  const ordered = /^\s*\d+\./.test(lines[0]);
  const list = document.createElement(ordered ? 'ol' : 'ul');
  list.className = 'md-list';

  // Continuation lines (indented under an item) belong to the item above.
  const items = [];
  for (const line of lines) {
    const m = line.match(/^\s*(?:[-*+]|\d+\.)\s+(.*)$/);
    if (m) items.push([m[1]]);
    else if (items.length) items[items.length - 1].push(line.trim());
  }

  for (const parts of items) {
    const li = document.createElement('li');
    li.append(...renderInline(parts.join(' '), linkMap));
    list.append(li);
  }
  return list;
}

// Inline: `code`, [text](href), **bold**, *italic*. Code is matched first so
// markup inside backticks stays literal.
const INLINE = /(`[^`]+`)|(\[[^\]]*\]\([^)]*\))|(\*\*[^*]+\*\*)|(\*[^*]+\*)/;

function renderInline(text, linkMap) {
  const out = [];
  let rest = text;

  while (rest) {
    const m = rest.match(INLINE);
    if (!m) { out.push(document.createTextNode(rest)); break; }

    if (m.index > 0) out.push(document.createTextNode(rest.slice(0, m.index)));
    const token = m[0];

    if (token.startsWith('`')) {
      const code = document.createElement('code');
      code.textContent = token.slice(1, -1);
      out.push(code);
    } else if (token.startsWith('[')) {
      out.push(renderLink(token, linkMap));
    } else if (token.startsWith('**')) {
      const strong = document.createElement('strong');
      strong.append(...renderInline(token.slice(2, -2), linkMap));
      out.push(strong);
    } else {
      const em = document.createElement('em');
      em.append(...renderInline(token.slice(1, -1), linkMap));
      out.push(em);
    }

    rest = rest.slice(m.index + token.length);
  }

  return out;
}

function renderLink(token, linkMap) {
  const m = token.match(/^\[([^\]]*)\]\(([^)]*)\)$/);
  if (!m) return document.createTextNode(token);

  const [, label, rawHref] = m;
  const href = linkMap[rawHref] ?? rawHref;

  // Only http(s) and same-page anchors become links. Anything else — a
  // javascript: URL above all — is rendered as plain text instead.
  const safe = /^(https?:\/\/|#|[\w.-]+\.html)/i.test(href);
  if (!safe) return document.createTextNode(label);

  const a = document.createElement('a');
  a.href = href;
  a.append(...renderInline(label, linkMap));
  if (/^https?:\/\//i.test(href)) {
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
  }
  return a;
}
