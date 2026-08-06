// ═══════════════════════════════════════════
// MAIN JS — Entry Point
// ═══════════════════════════════════════════

import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../scss/main.scss';

import { initI18n } from './i18n.js';
import { applyLinks } from './links.js';
import { initAnimations } from './animations.js';
import { initNavbar } from './navbar.js';
import { initFooter } from './language-dropdown.js';

/**
 * Safely execute an initializer, catching any errors to prevent
 * one failing module from breaking the entire application.
 */
function safeInit(name, fn) {
  try {
    const result = fn();
    // Handle async errors too (unhandled promise rejections)
    if (result && typeof result.catch === 'function') {
      result.catch(err => {
        console.error(`[main] Async error in "${name}":`, err);
      });
    }
    return result;
  } catch (err) {
    console.error(`[main] Error initializing "${name}":`, err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Core modules needed on every page
  safeInit('applyLinks', applyLinks);
  safeInit('initI18n', initI18n);
  safeInit('initAnimations', initAnimations);
  safeInit('initNavbar', initNavbar);
  safeInit('initFooter', initFooter);

  // Version data is only fetched on pages that actually display it
  if (document.querySelector('[data-version], [data-version-url], [data-version-notes], [data-version-sha]')) {
    import('./version-loader.js')
      .then(mod => safeInit('applyVersion', mod.applyVersion))
      .catch(err => console.error('[main] Failed to load version-loader:', err));
  }
});
