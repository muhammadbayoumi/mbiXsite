// ═══════════════════════════════════════════
// FOOTER — Language Dropdown Only
// ═══════════════════════════════════════════

import { setLang, getLang } from './i18n.js';

export function initFooter() {
  initLanguageDropdown();
}

// ── LANGUAGE DROPDOWN ──
function initLanguageDropdown() {
  const toggle = document.getElementById('langToggleFooter');
  const menu = document.getElementById('langMenuFooter');
  if (!toggle || !menu) return;

  // Toggle menu
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', !expanded);
    menu.classList.toggle('show');
  });

  // Close on outside click
  document.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded', 'false');
    menu.classList.remove('show');
  });

  // Prevent menu click from closing
  menu.addEventListener('click', (e) => e.stopPropagation());

  // Language selection
  menu.querySelectorAll('button[data-lang]').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      setLang(lang);
      updateLangIndicator(lang);
    });
  });

  // Set initial
  updateLangIndicator(getLang());
}

function updateLangIndicator(lang) {
  const toggle = document.getElementById('langToggleFooter');
  const menu = document.getElementById('langMenuFooter');
  if (!toggle || !menu) return;

  const labels = { en: 'English', ar: 'العربية' };
  const labelEl = toggle.querySelector('.lang-label');
  if (labelEl) labelEl.textContent = labels[lang] || 'Language';

  menu.querySelectorAll('button').forEach(btn => {
    const icon = btn.querySelector('i');
    if (!icon) return;
    const isActive = btn.dataset.lang === lang;
    btn.classList.toggle('active', isActive);
    icon.className = isActive ? 'bi bi-check-circle-fill' : 'bi bi-circle';
  });
}
