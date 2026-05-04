// ═══════════════════════════════════════════
// MAIN JS — Entry Point
// ═══════════════════════════════════════════

import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../scss/main.scss';

import { initI18n } from './i18n.js';
import { applyLinks } from './links.js';
import { applyIcons } from './icons-loader.js';
import { applyVersion } from './version-loader.js';
import { initAnimations } from './animations.js';
import { initNavbar } from './navbar.js';
import { initFooter } from './footer.js';

document.addEventListener('DOMContentLoaded', () => {
  applyLinks();
  initI18n();
  applyIcons();
  applyVersion();
  initAnimations();
  initNavbar();
  initFooter();
});
