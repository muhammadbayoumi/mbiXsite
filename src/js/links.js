// ═══════════════════════════════════════════
// LINKS LOADER
// ═══════════════════════════════════════════

import linksData from '../data/links.json';

export function applyLinks() {
  document.querySelectorAll('[data-link]').forEach(el => {
    const path = el.getAttribute('data-link');
    const value = resolvePath(linksData, path);
    if (value === undefined) {
      console.warn(`[links.js] Unknown data-link path: "${path}" on element:`, el.outerHTML.substring(0, 120));
      return;
    }
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
  const value = resolvePath(linksData, path);
  if (value === undefined) {
    console.warn(`[links.js] Unknown link path: "${path}"`);
  }
  return value;
}

function resolvePath(obj, path) {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
}

export default linksData;
