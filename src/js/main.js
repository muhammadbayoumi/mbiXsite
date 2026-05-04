import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../scss/main.scss';
import { initI18n } from './i18n.js';
import { applyLinks } from './links.js';
import { applyIcons } from './icons-loader.js';
import { applyVersion } from './version-loader.js';

document.addEventListener('DOMContentLoaded', () => {
  applyLinks();
  initI18n();
  applyIcons();
  applyVersion();
});