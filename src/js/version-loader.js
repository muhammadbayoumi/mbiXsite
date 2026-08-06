// ═══════════════════════════════════════════
// VERSION LOADER
// ═══════════════════════════════════════════

import { getLink } from './links.js';

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

  // SHA256
  document.querySelectorAll('[data-version-sha]').forEach(el => {
    el.textContent = data.sha256 ? data.sha256.substring(0, 12) + '...' : '';
    if (data.sha256) el.title = data.sha256;
  });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
