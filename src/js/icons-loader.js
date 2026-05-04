// ═══════════════════════════════════════════
// ICONS LOADER
// Fetches the live icons_map.json from GitHub
// and builds image URLs for the Ribbon controls
// ═══════════════════════════════════════════

import { getLink } from './links.js';

let iconsMapCache = null;

/**
 * Loads icons_map.json from the live server (GitHub raw).
 */
export async function loadIconsMap() {
  if (iconsMapCache) return iconsMapCache;

  const url = getLink('endpoints.icons_map');
  if (!url) return {};

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to load icons map');
    iconsMapCache = await res.json();
    return iconsMapCache;
  } catch (err) {
    console.warn('[icons-loader] Failed to fetch icons map:', err);
    return {};
  }
}

/**
 * Applies icons to all elements with [data-icon="ICON_KEY"]
 */
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
      return;
    }

    const url = baseUrl + filename;

    if (el.tagName === 'IMG') {
      el.src = url;
    } else {
      el.style.backgroundImage = `url("${url}")`;
    }
  });
}