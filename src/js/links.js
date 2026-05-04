// ═══════════════════════════════════════════
// LINKS LOADER
// Loads links.json and applies them to elements
// with [data-link="path.to.value"]
// ═══════════════════════════════════════════

import linksData from '../data/links.json';

export function applyLinks() {
  document.querySelectorAll('[data-link]').forEach(el => {
    const path = el.getAttribute('data-link');
    const value = resolvePath(linksData, path);
    if (!value) return;

    // For <a> tags → set href
    if (el.tagName === 'A') {
      el.href = value;
      // External links open in new tab
      if (value.startsWith('http')) {
        el.target = '_blank';
        el.rel = 'noopener noreferrer';
      }
    } else {
      // For other tags → set text content
      el.textContent = value;
    }
  });
}

export function getLink(path) {
  return resolvePath(linksData, path);
}

function resolvePath(obj, path) {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
}

export default linksData;