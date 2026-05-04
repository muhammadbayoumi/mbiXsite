// ═══════════════════════════════════════════
// ICONS LOADER
// ═══════════════════════════════════════════

import { getLink } from './links.js';

let iconsMapCache = null;

export async function loadIconsMap() {
  if (iconsMapCache) return iconsMapCache;

  const url = getLink('endpoints.icons_map');
  if (!url) return {};

  try {
    const res = await fetch(url, { cache: 'force-cache' });
    if (!res.ok) throw new Error('Failed to load icons map');
    iconsMapCache = await res.json();
    return iconsMapCache;
  } catch (err) {
    console.warn('[icons-loader] Failed to fetch icons map:', err);
    return {};
  }
}

export async function applyIcons() {
  const elements = document.querySelectorAll('[data-icon]');
  if (!elements.length) return;

  const map = await loadIconsMap();
  const baseUrl = getLink('endpoints.icons_base');

  elements.forEach(el => {
    const key = el.getAttribute('data-icon');
    const filename = map[key];
    if (!filename) {
      el.classList.add('icon-missing');
      el.setAttribute('role', 'img');
      el.setAttribute('aria-label', `Missing icon: ${key}`);
      return;
    }

    const url = baseUrl + filename;

    if (el.tagName === 'IMG') {
      el.src = url;
      el.alt = key;
    } else {
      el.style.backgroundImage = `url("${url}")`;
      el.setAttribute('role', 'img');
      el.setAttribute('aria-label', key);
    }
  });
}
