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

/** Get fallback data from links.json for graceful degradation */
function getFallbackData() {
  const fallbackUrl = getLink('fallbacks.download_url');
  const fallbackVersion = getLink('fallbacks.version');
  if (!fallbackUrl && !fallbackVersion) return null;
  return {
    version: fallbackVersion || '',
    url: fallbackUrl || '',
    notes: '',
    sha256: ''
  };
}

export async function loadVersion() {
  if (versionCache) return versionCache;

  const url = getLink('endpoints.version_check');
  if (!url) return getFallbackData();

  try {
    const res = await fetchWithTimeout(url, { cache: 'no-store' }, 5000);
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

  // Version number
  document.querySelectorAll('[data-version]').forEach(el => {
    el.textContent = data.version || '';
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
