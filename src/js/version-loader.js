// ═══════════════════════════════════════════
// VERSION LOADER
// ═══════════════════════════════════════════

import { getLink } from './links.js';

let versionCache = null;

export async function loadVersion() {
  if (versionCache) return versionCache;

  const url = getLink('endpoints.version_check');
  if (!url) return null;

  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to load version.json');
    versionCache = await res.json();
    return versionCache;
  } catch (err) {
    console.warn('[version-loader] Failed to fetch version:', err);
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
