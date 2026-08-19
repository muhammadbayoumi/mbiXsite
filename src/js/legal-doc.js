// ═══════════════════════════════════════════
// LEGAL DOCUMENT — page behaviour for the policy / agreement pages
// ═══════════════════════════════════════════
//
// Owns the whole pipeline for a legal page, in two beats:
//
//   1. Synchronously, before anything is fetched — the document index, the
//      archive link and the print button. All of it is known at DOMContentLoaded,
//      so the rail's final width is committed on the first paint and nothing
//      reflows later.
//   2. After the document arrives — the section list, the effective date, the
//      current-section highlight, and repairing the fragment in the URL.
//
// The prose itself is fetched from mbiX-hub by scrapex-loader.js and rendered by
// markdown.js. Nothing here writes prose; it only builds the chrome around it.
//
// Note that renderMarkdown() calls replaceChildren() on the article, so every
// element this module writes into lives *outside* [data-sx-doc]. Anything put
// inside it would be wiped the moment the document loads.

import legal from '../data/legal.json';
import { applyScrapexDoc } from './scrapex-loader.js';
import { t } from './i18n.js';

export async function initLegalDoc() {
  const host = document.querySelector('[data-sx-doc][data-legal-doc]');
  if (!host) return;

  // ── Beat one: chrome that needs no network ──
  const index = renderDocIndex(document.querySelector('[data-legal-docs]'));
  renderArchive(document.querySelector('[data-legal-archive]'), index.current);
  wirePrint(document.querySelector('[data-legal-print]'));
  wireAnchorFocus();

  // ── Beat two: everything that depends on the document ──
  const result = await applyScrapexDoc({
    // The page carries its own translated <h1>, and markdown.js is told to lift
    // the document's own title out rather than repeat it. With that heading gone
    // the usual demotion is wrong, so the document's sections land on h2 and the
    // page reads h1 → h2 → h3 with no skipped level.
    headingOffset: 0,
    liftTitle: true,
    headingIds: true
  });

  if (result.status !== 'ok') {
    // setDocMessage() has already painted the visible notice; this is only for
    // anyone who cannot see it. Announced on failure only — "loaded fine" is not
    // news worth interrupting a screen reader for.
    announce(result.messageKey);
    return;
  }

  liftDate(host);

  if (result.outline.length) {
    buildToc(result.outline);
    startSectionHighlight(result.outline);
    repairHash();
  }
}

// ── Document index ─────────────────────────

function renderDocIndex(mount) {
  if (!mount) return { count: 0, current: null };

  const docs = Array.isArray(legal.documents) ? legal.documents : [];
  const here = currentPage();
  let current = null;

  // Group headings only earn their place once there is more than one group;
  // with a single group the label merely repeats the section title above it.
  const groups = [...new Set(docs.map(d => d.group || ''))];
  const showGroups = groups.filter(Boolean).length > 1;

  const frag = document.createDocumentFragment();

  for (const group of groups) {
    if (showGroups && group) {
      const label = document.createElement('div');
      label.className = 'legal-rail-group';
      label.textContent = group;
      frag.append(label);
    }

    const list = document.createElement('ul');
    list.className = 'legal-list';

    for (const doc of docs.filter(d => (d.group || '') === group)) {
      if (!doc.url) continue;

      const link = document.createElement('a');
      link.className = 'legal-link';
      link.href = doc.url;

      // Titles come from i18n so the index survives a language switch: t() fills
      // it now, and data-i18n is what lets applyLang() refill it later. initI18n
      // has already swept the page by the time this runs, which is why both are
      // needed rather than the attribute alone.
      if (doc.titleKey) {
        link.setAttribute('data-i18n', doc.titleKey);
        link.textContent = t(doc.titleKey) || doc.titleKey;
      } else {
        link.textContent = doc.id || doc.url;
      }

      if (doc.url.toLowerCase() === here) {
        link.setAttribute('aria-current', 'page');
        current = doc;
      }

      const item = document.createElement('li');
      item.append(link);
      list.append(item);
    }

    if (list.children.length) frag.append(list);
  }

  mount.replaceChildren(frag);

  // An index of nothing is worse than no index: hide the whole section rather
  // than leave a heading standing over an empty list.
  const section = mount.closest('[data-legal-docs-section]');
  if (section) section.hidden = mount.childElementCount === 0;

  return { count: docs.length, current };
}

/** The current page's filename, which is how registry entries identify themselves. */
function currentPage() {
  const last = location.pathname.split('/').filter(Boolean).pop();
  return (last || 'index.html').toLowerCase();
}

// ── Archive ────────────────────────────────

function renderArchive(link, entry) {
  if (!link) return;

  const href = entry && entry.archiveUrl;
  // The same whitelist markdown.js applies to fetched links. This href comes
  // from a data file rather than the network, but it lands in the document
  // either way, and one guard for both is easier to trust than an exception.
  if (!href || !/^https?:\/\//i.test(href)) return;

  link.href = href;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.hidden = false;
}

// ── Print ──────────────────────────────────

function wirePrint(button) {
  if (!button) return;
  // No PDF library: every browser's print dialog offers "Save as PDF", and
  // generating one here would mean shipping a renderer to duplicate what the
  // print stylesheet already describes.
  button.addEventListener('click', () => window.print());
  button.hidden = false;
}

// ── Effective date ─────────────────────────

const DATE_LINE = /^(?:last\s+updated|updated|effective(?:\s+date)?|version)\s*[:—–-]?\s*(.+)$/i;

/**
 * Move the document's own "Last updated …" line into the page header.
 *
 * Bounded deliberately: only the first few blocks, and only short ones, so a
 * sentence from the middle of the policy can never be mistaken for a date. If
 * nothing matches, the paragraph is left exactly where it is — the page simply
 * goes without a styled date rather than losing a line or inventing one.
 */
function liftDate(host) {
  const meta = document.querySelector('[data-legal-meta]');
  if (!meta) return false;

  for (const el of Array.from(host.children).slice(0, 3)) {
    if (el.tagName !== 'P') continue;

    const text = el.textContent.trim();
    if (!text || text.length > 80) continue;

    const match = text.match(DATE_LINE);
    if (!match) continue;

    // The date is kept verbatim: reformatted by a locale guess it would read
    // worse than it was written upstream, and this is a legal effective date. So
    // the label stays as prose, the date goes in a <time>, and the only derived
    // value is that element's machine-readable attribute — set only when the
    // date parses unambiguously.
    const value = match[1].trim();
    const label = text.slice(0, text.length - match[1].length);

    const time = document.createElement('time');
    time.className = 'legal-meta-value';
    time.textContent = value;
    const stamp = isoDate(value);
    if (stamp) time.dateTime = stamp;

    meta.replaceChildren(document.createTextNode(label), time);
    meta.hidden = false;
    el.remove();
    return true;
  }

  return false;
}

function isoDate(value) {
  const parsed = Date.parse(value.trim());
  if (Number.isNaN(parsed)) return null;
  // Built from local parts rather than toISOString(), which would shift the date
  // by a day for anyone west of UTC.
  const d = new Date(parsed);
  const pad = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

// ── Section list ───────────────────────────

function buildToc(outline) {
  const lists = document.querySelectorAll('[data-legal-toc-list]');
  if (!lists.length) return;

  let top = Math.min(...outline.map(h => h.level));

  // A shallowest level with a single heading is the document naming itself, not
  // a section — the sections are one level down. Only reachable if the title
  // could not be lifted, but a one-item index would be a silly way to fail.
  const atTop = outline.filter(h => h.level === top).length;
  if (atTop === 1 && outline.some(h => h.level === top + 1)) top += 1;

  lists.forEach(list => {
    const frag = document.createDocumentFragment();
    let parent = null;
    let sub = null;

    for (const heading of outline) {
      if (heading.level === top) {
        parent = tocItem(heading);
        sub = null;
        frag.append(parent);
      } else if (heading.level === top + 1 && parent) {
        if (!sub) {
          sub = document.createElement('ul');
          sub.className = 'legal-list legal-list-sub';
          parent.append(sub);
        }
        sub.append(tocItem(heading));
      }
      // Anything deeper is not listed. A legal document's third level is detail,
      // and a three-deep rail stops being scannable — which is the only thing
      // the rail is for.
    }

    list.replaceChildren(frag);
  });

  // Both copies of the list are populated; CSS decides which one is exposed at
  // a given width, so exactly one is ever in the accessibility tree.
  document
    .querySelectorAll('[data-legal-toc-mobile], [data-legal-toc-rail]')
    .forEach(el => { el.hidden = false; });
}

function tocItem(heading) {
  const link = document.createElement('a');
  link.className = 'legal-link';
  link.href = `#${encodeURIComponent(heading.id)}`;
  link.textContent = heading.text;

  const item = document.createElement('li');
  item.append(link);
  return item;
}

// ── Current-section highlight ──────────────

function startSectionHighlight(outline) {
  const headings = outline.map(h => document.getElementById(h.id)).filter(Boolean);
  if (!headings.length) return;

  const links = new Map();
  document.querySelectorAll('[data-legal-toc-list] a[href^="#"]').forEach(link => {
    const id = fragmentId(link.hash);
    if (!id) return;
    if (!links.has(id)) links.set(id, []);
    links.get(id).push(link);
  });

  let active = null;
  const setActive = id => {
    if (id === active) return;
    links.get(active)?.forEach(l => l.removeAttribute('aria-current'));
    active = id;
    links.get(id)?.forEach(l => l.setAttribute('aria-current', 'location'));
  };

  // Read off geometry rather than IntersectionObserver: the last section on a
  // short page can never reach the top of the viewport, so an observer-based
  // band leaves it permanently unhighlighted. This way there is always exactly
  // one active entry, and the header offset is exact rather than a percentage
  // guess. Throttling follows navbar.js.
  const update = () => {
    queued = false;

    const header = document.querySelector('.legal-header');
    const limit = (header ? header.getBoundingClientRect().height : 0) + 24;

    let current = headings[0];
    for (const heading of headings) {
      if (heading.getBoundingClientRect().top - limit > 0) break;
      current = heading;
    }

    // At the very bottom of the page the last section is the one being read,
    // whatever the geometry of its heading says.
    const atBottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    if (atBottom) current = headings[headings.length - 1];

    setActive(current.id);
  };

  let queued = false;
  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  };

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  update();
}

// ── Anchors ────────────────────────────────

/**
 * Clicking a same-page link moves the sequential-focus starting point but does
 * not move focus, and a heading is not focusable by default — markdown.js gives
 * the generated ones tabindex="-1" precisely so this can.
 *
 * The default navigation is left alone so the URL still gains its fragment;
 * focus follows on the next frame.
 */
function wireAnchorFocus() {
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || event.defaultPrevented) return;

    const id = fragmentId(link.hash);
    const target = id && document.getElementById(id);
    if (!target) return;

    requestAnimationFrame(() => target.focus({ preventScroll: true }));
  });
}

/**
 * Land on the section named in the URL.
 *
 * The document is fetched, so by the time its headings exist the browser has
 * already tried and failed to honour the fragment — the target did not exist
 * yet. Without this every link shared into a section opens at the top of the
 * page instead.
 */
function repairHash() {
  const id = fragmentId(location.hash);
  const target = id && document.getElementById(id);
  if (!target) return; // a stale fragment stays put rather than jumping somewhere arbitrary

  // No arguments, so CSS decides how: html { scroll-behavior: smooth } applies,
  // and the blanket prefers-reduced-motion override in _base.scss turns it back
  // off for anyone who asked. Passing { behavior: 'smooth' } would defeat both.
  target.scrollIntoView();
  target.focus({ preventScroll: true });
}

function fragmentId(hash) {
  if (!hash || hash.length < 2) return '';
  try {
    return decodeURIComponent(hash.slice(1));
  } catch {
    return hash.slice(1); // a malformed escape is not worth throwing over
  }
}

// ── Status ─────────────────────────────────

function announce(key) {
  const region = document.querySelector('[data-legal-status]');
  if (!region || !key) return;
  region.setAttribute('data-i18n', key);
  region.textContent = t(key) || '';
}
