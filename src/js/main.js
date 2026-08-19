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
  if (document.querySelector('[data-version], [data-version-url], [data-version-notes], [data-version-sha], [data-releases]')) {
    import('./version-loader.js')
      .then(mod => {
        safeInit('applyVersion', mod.applyVersion);
        // Only binds a listener; the release list is fetched on first open.
        safeInit('initReleases', mod.initReleases);
      })
      .catch(err => console.error('[main] Failed to load version-loader:', err));
  }

  // Legal document pages own their own fetch: legal-doc.js has to build the
  // section list from the outline the render returns, so it awaits
  // applyScrapexDoc itself rather than having it called out from under it here.
  //
  // Hence the else — both branches match [data-sx-doc], and running them both
  // would fetch and render the document twice.
  if (document.querySelector('[data-legal-doc]')) {
    import('./legal-doc.js')
      .then(mod => safeInit('initLegalDoc', mod.initLegalDoc))
      .catch(err => console.error('[main] Failed to load legal-doc:', err));

  // ScrapeX pages only — keeps its manifest and markdown fetches off every
  // other page, and its renderer out of their bundles.
  } else if (document.querySelector('[data-sx-version], [data-sx-url], [data-sx-webstore], [data-sx-doc]')) {
    import('./scrapex-loader.js')
      .then(mod => {
        safeInit('applyScrapexVersion', mod.applyScrapexVersion);
        safeInit('applyWebstoreLink', mod.applyWebstoreLink);
        safeInit('applyScrapexDoc', mod.applyScrapexDoc);
      })
      .catch(err => console.error('[main] Failed to load scrapex-loader:', err));
  }
});
