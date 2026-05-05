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

/**
 * Conditionally load a module only if its DOM elements are present.
 * Reduces bundle overhead for pages that don't need certain features.
 */
function safeInitAsync(name, importFn, selector) {
  // Skip if no relevant DOM elements exist
  if (selector && !document.querySelector(selector)) {
    return;
  }
  importFn()
    .then(mod => {
      if (typeof mod.default === 'function') {
        safeInit(name, mod.default);
      } else if (typeof mod[name] === 'function') {
        safeInit(name, mod[name]);
      } else {
        // Try common export names
        const fn = mod.applyVersion || mod.applyIcons || mod.initIcons || mod.loadAndApply;
        if (fn) safeInit(name, fn);
      }
    })
    .catch(err => console.error(`[main] Failed to load module "${name}":`, err));
}

document.addEventListener('DOMContentLoaded', () => {
  // Core modules needed on every page
  safeInit('applyLinks', applyLinks);
  safeInit('initI18n', initI18n);
  safeInit('initAnimations', initAnimations);
  safeInit('initNavbar', initNavbar);
  safeInit('initFooter', initFooter);

  // Lazy-load optional modules in parallel when their DOM elements are present
  const lazyModules = [
    { name: 'applyVersion', importer: () => import('./version-loader.js'), selector: '[data-version], [data-version-url], [data-version-notes], [data-version-sha]' },
    { name: 'applyIcons',   importer: () => import('./icons-loader.js'),   selector: '[data-icon]' },
  ].filter(m => document.querySelector(m.selector));

  if (lazyModules.length > 0) {
    Promise.all(lazyModules.map(m => m.importer()))
      .then(modules => {
        modules.forEach((mod, i) => {
          const name = lazyModules[i].name;
          const fn = mod.applyVersion || mod.applyIcons;
          if (fn) safeInit(name, fn);
        });
      })
      .catch(err => console.error('[main] Failed to load lazy modules:', err));
  }
});
