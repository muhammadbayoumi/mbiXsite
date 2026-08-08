// ═══════════════════════════════════════════
// VERSION LOADER
// ═══════════════════════════════════════════

import { getLink } from './links.js';
import { getLang, t } from './i18n.js';

let versionCache = null;

/** Create a fetch with timeout (in ms) */
function fetchWithTimeout(url, options = {}, timeoutMs = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(url, { ...options, signal: controller.signal })
    .finally(() => clearTimeout(timeoutId));
}

/**
 * Get fallback data from links.json for graceful degradation.
 *
 * Deliberately carries no version number: a hard-coded one goes stale on
 * every release, and telling a visitor they are on the latest build when
 * we could not check is worse than telling them nothing. The download URL
 * points at the releases page, where the real number is always correct.
 */
function getFallbackData() {
  const fallbackUrl = getLink('fallbacks.download_url');
  if (!fallbackUrl) return null;
  return {
    version: '',
    url: fallbackUrl,
    notes: '',
    sha256: ''
  };
}

export async function loadVersion() {
  if (versionCache) return versionCache;

  const url = getLink('endpoints.version_check');
  if (!url) return getFallbackData();

  // raw.githubusercontent.com caches for ~5 minutes at the CDN, which
  // `cache: 'no-store'` does not bypass (that only covers the browser cache).
  //
  // Bucket the cache key by the minute rather than using a unique timestamp:
  // everyone loading the page within the same minute shares one cache entry,
  // so the CDN still absorbs almost every request, while the data is never
  // more than a minute stale. A per-request timestamp would push every single
  // visitor through to origin, which measurably slowed the fetch and made the
  // timeout below far more likely to fire.
  const bucket = Math.floor(Date.now() / 60000);
  const bustedUrl = `${url}${url.includes('?') ? '&' : '?'}t=${bucket}`;

  try {
    const res = await fetchWithTimeout(bustedUrl, { cache: 'no-store' }, 8000);
    if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to load version.json`);
    versionCache = await res.json();
    return versionCache;
  } catch (err) {
    const fallback = getFallbackData();
    if (fallback) {
      console.warn('[version-loader] Fetch failed, using fallback data:', err.message);
      versionCache = fallback;
      return fallback;
    }
    console.warn('[version-loader] Failed to fetch version, no fallback available:', err.message);
    return null;
  }
}

export async function applyVersion() {
  const data = await loadVersion();
  if (!data) return;

  // Version number. Only overwrite when we actually have one, so a failed
  // fetch leaves the markup's own placeholder ("v—") visible instead of
  // blanking it or showing a stale hard-coded number.
  document.querySelectorAll('[data-version]').forEach(el => {
    if (data.version) el.textContent = data.version;
  });

  // Download URL
  document.querySelectorAll('[data-version-url]').forEach(el => {
    if (el.tagName === 'A' && data.url) {
      el.href = data.url;
      el.target = '_blank';
      el.rel = 'noopener noreferrer';
    }
  });

  // Release notes (preserve newlines)
  document.querySelectorAll('[data-version-notes]').forEach(el => {
    if (data.notes) {
      el.innerHTML = escapeHtml(data.notes).replace(/\n/g, '<br/>');
    }
  });

  // SHA256. Same rule as the version above: leave the placeholder alone
  // rather than blanking it when we have nothing to show.
  document.querySelectorAll('[data-version-sha]').forEach(el => {
    if (data.sha256) {
      el.textContent = data.sha256.substring(0, 12) + '...';
      el.title = data.sha256;
    }
  });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ═══════════════════════════════════════════
// RELEASE HISTORY
// ═══════════════════════════════════════════

/**
 * Wire up the release-history disclosure.
 *
 * The list is fetched the first time the user opens it, never on page load.
 * api.github.com allows 60 unauthenticated requests per hour per IP, and
 * spending one of a visitor's on a panel they may never open is a poor
 * trade — especially when the latest version, the number nearly everyone
 * actually wants, is already on the page from version.json.
 */
export function initReleases() {
  const host = document.querySelector('[data-releases]');
  if (!host) return;

  let started = false;
  host.addEventListener('toggle', () => {
    if (!host.open || started) return;
    started = true;
    renderReleases(host.querySelector('[data-releases-list]'));
  });
}

async function renderReleases(list) {
  if (!list) return;

  const url = getLink('endpoints.releases_api');
  if (!url) return setMessage(list, 'releases_error');

  try {
    const res = await fetchWithTimeout(url, {
      headers: { Accept: 'application/vnd.github+json' }
    }, 8000);

    // 403 here is the hourly rate limit, not a permissions problem.
    if (res.status === 403) return setMessage(list, 'releases_rate_limited');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const releases = (await res.json())
      .filter(r => !r.draft && !r.prerelease);

    if (!releases.length) return setMessage(list, 'releases_empty');

    list.replaceChildren(...releases.map(buildRow));
  } catch (err) {
    console.warn('[version-loader] Failed to load releases:', err.message);
    setMessage(list, 'releases_error');
  }
}

function buildRow(release) {
  const row = document.createElement('div');
  row.className = 'release-row';

  const tag = document.createElement('span');
  tag.className = 'release-row-tag';
  tag.textContent = release.tag_name || release.name || '';

  const date = document.createElement('time');
  date.className = 'release-row-date';
  if (release.published_at) date.dateTime = release.published_at;
  date.textContent = formatDate(release.published_at);

  row.append(tag, date);

  // Releases name their asset after the version, so there is no fixed
  // filename to build a URL from — take whatever the release actually ships.
  const asset = (release.assets || [])[0];
  const href = asset?.browser_download_url || release.html_url;
  if (href) {
    const link = document.createElement('a');
    link.className = 'release-row-link';
    link.href = href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = asset ? asset.name : '↗';
    row.append(link);
  }

  return row;
}

/**
 * Render a status line. The data-i18n attribute is what keeps it correct
 * when the visitor switches language later; t() only seeds it now.
 */
function setMessage(list, key) {
  const span = document.createElement('span');
  span.className = 'release-row-msg';
  span.setAttribute('data-i18n', key);
  span.textContent = t(key) || FALLBACK_MESSAGES[key] || '';
  list.replaceChildren(span);
}

const FALLBACK_MESSAGES = {
  releases_error: 'Could not load the release history.',
  releases_rate_limited: 'GitHub rate limit reached. Please try again later.',
  releases_empty: 'No releases published yet.'
};

/** Locale-aware date, falling back to the raw ISO day if anything is off. */
function formatDate(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString(getLang() === 'ar' ? 'ar-EG' : 'en-GB', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  } catch {
    return iso.slice(0, 10);
  }
}
