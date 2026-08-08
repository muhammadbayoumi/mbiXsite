// ═══════════════════════════════════════════
// SCRAPEX LOADER — engine manifest + upstream documents
// ═══════════════════════════════════════════

import { getLink } from './links.js';
import { t } from './i18n.js';
import { renderMarkdown } from './markdown.js';

/** The manifest's own declared identity. Anything else is the wrong file. */
const EXPECTED_PRODUCT = 'scrapex-engine';

function fetchWithTimeout(url, options = {}, timeoutMs = 8000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(url, { ...options, signal: controller.signal })
    .finally(() => clearTimeout(timeoutId));
}

/** Minute-bucketed cache key — same reasoning as version-loader.js. */
function bust(url) {
  const bucket = Math.floor(Date.now() / 60000);
  return `${url}${url.includes('?') ? '&' : '?'}t=${bucket}`;
}

// ── Engine manifest ────────────────────────

/**
 * Fetch the ScrapeX engine manifest.
 *
 * Returns null rather than throwing whenever the answer is not a manifest we
 * can trust. Today the file 404s because ScrapeX has not had its first
 * release, and that is the honest state, not a failure: the page must show no
 * version at all rather than inventing one.
 */
export async function loadScrapexVersion() {
  const url = getLink('scrapex.version_check');
  if (!url) return null;

  try {
    const res = await fetchWithTimeout(bust(url), { cache: 'no-store' });

    // Before the first release this is the expected response, not an error.
    if (res.status === 404) {
      console.info('[scrapex] No engine manifest published yet (404).');
      return null;
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();

    // The add-in's manifest lives one folder away with a similar shape, so a
    // path typo would otherwise surface as a confident, wrong version — which
    // is indistinguishable from success. Refuse anything not self-identifying.
    if (data?.product !== EXPECTED_PRODUCT) {
      console.warn(
        `[scrapex] Manifest is not "${EXPECTED_PRODUCT}" (got "${data?.product}"). Ignoring.`
      );
      return null;
    }

    return data;
  } catch (err) {
    console.warn('[scrapex] Failed to load engine manifest:', err.message);
    return null;
  }
}

/**
 * Fill the engine's version, download link, size and checksum.
 *
 * With no manifest, every hook keeps the placeholder the markup shipped with
 * and the download button falls back to the releases page — a real page that
 * always lists whatever the newest build actually is.
 */
export async function applyScrapexVersion() {
  const data = await loadScrapexVersion();
  const installer = data?.installer;

  if (data?.version) {
    document.querySelectorAll('[data-sx-version]').forEach(el => {
      el.textContent = data.version;
    });
  }

  const releasesUrl = getLink('scrapex.releases');
  document.querySelectorAll('[data-sx-url]').forEach(el => {
    if (el.tagName !== 'A') return;
    const href = installer?.url || releasesUrl;
    if (!href) return;
    el.href = href;
    el.target = '_blank';
    el.rel = 'noopener noreferrer';
    // Tell the visitor which of the two they are about to get.
    el.classList.toggle('is-fallback', !installer?.url);
  });

  if (installer?.sha256) {
    document.querySelectorAll('[data-sx-sha]').forEach(el => {
      el.textContent = installer.sha256;
    });
  }

  if (installer?.bytes) {
    document.querySelectorAll('[data-sx-size]').forEach(el => {
      el.textContent = formatBytes(installer.bytes);
    });
  }

  if (installer?.name) {
    document.querySelectorAll('[data-sx-file]').forEach(el => {
      el.textContent = installer.name;
    });
  }

  // Panels that only make sense once there is a real release.
  document.querySelectorAll('[data-sx-when-released]').forEach(el => {
    el.hidden = !installer?.url;
  });
  document.querySelectorAll('[data-sx-when-unreleased]').forEach(el => {
    el.hidden = !!installer?.url;
  });
}

function formatBytes(bytes) {
  const mb = bytes / (1024 * 1024);
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`;
}

// ── Chrome Web Store button ────────────────

/**
 * The listing does not exist yet. Rather than shipping a dead button, the
 * markup carries a disabled state that stays until scrapex.webstore is filled
 * in — one edit in links.json turns it into a real link.
 */
export function applyWebstoreLink() {
  const url = getLink('scrapex.webstore');
  document.querySelectorAll('[data-sx-webstore]').forEach(el => {
    if (url) {
      el.href = url;
      el.target = '_blank';
      el.rel = 'noopener noreferrer';
      el.classList.remove('is-disabled');
      el.removeAttribute('aria-disabled');
    } else {
      el.classList.add('is-disabled');
      el.setAttribute('aria-disabled', 'true');
      el.removeAttribute('href');
    }
  });
}

// ── Upstream documents ─────────────────────

// The documents cross-reference each other by filename; on the site those
// need to point at the pages that render them.
const DOC_LINK_MAP = {
  'support.md': 'scrapex-support.html',
  'privacy-policy.md': 'scrapex-privacy.html',
  './support.md': 'scrapex-support.html',
  './privacy-policy.md': 'scrapex-privacy.html'
};

/**
 * Render an upstream markdown document into [data-sx-doc].
 *
 * The source of truth is the copy in mbiX-hub, whose prose is asserted against
 * the shipped extension by tests in the ScrapeX repository. It is fetched, not
 * duplicated here, so this page cannot drift out of agreement with those tests.
 */
export async function applyScrapexDoc() {
  const host = document.querySelector('[data-sx-doc]');
  if (!host) return;

  const which = host.getAttribute('data-sx-doc'); // 'privacy' | 'support'
  const url = getLink(which === 'support' ? 'scrapex.support_md' : 'scrapex.privacy_md');
  if (!url) return setDocMessage(host, 'sx_doc_error');

  try {
    const res = await fetchWithTimeout(bust(url), { cache: 'no-store' }, 10000);

    // Not yet published upstream. Say exactly that — an empty policy page
    // would be worse than one that admits it is waiting on its source.
    if (res.status === 404) return setDocMessage(host, 'sx_doc_unpublished');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const md = await res.text();
    if (!md.trim()) return setDocMessage(host, 'sx_doc_unpublished');

    renderMarkdown(host, md, DOC_LINK_MAP);
  } catch (err) {
    console.warn('[scrapex] Failed to load document:', err.message);
    setDocMessage(host, 'sx_doc_error');
  }
}

const DOC_FALLBACK = {
  sx_doc_unpublished:
    'This document has not been published yet. It appears here as soon as ScrapeX publishes its first release.',
  sx_doc_error: 'Could not load this document. Please try again later.'
};

function setDocMessage(host, key) {
  const p = document.createElement('p');
  p.className = 'md-notice';
  p.setAttribute('data-i18n', key);
  p.textContent = t(key) || DOC_FALLBACK[key] || '';

  const link = document.createElement('a');
  link.className = 'md-notice-link';
  link.href = getLink('scrapex.releases') || '#';
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.setAttribute('data-i18n', 'sx_doc_source');
  link.textContent = t('sx_doc_source') || 'View the source repository';

  host.replaceChildren(p, link);
}
