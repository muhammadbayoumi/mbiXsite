// ═══════════════════════════════════════════
// FOOTER — Language Dropdown Only
// ═══════════════════════════════════════════

import { setLang, getLang, isLangEnabled } from './i18n.js';

export function initFooter() {
  initLanguageDropdown();
}

// ── LANGUAGE DROPDOWN ──
function initLanguageDropdown() {
  const toggle = document.getElementById('langToggleFooter');
  const menu = document.getElementById('langMenuFooter');
  if (!toggle || !menu) return;

  // Drop entries for languages that are not currently offered. Removing the
  // item beats disabling it: a greyed-out language reads as broken, whereas an
  // absent one reads as not offered yet. The markup is untouched, so restoring
  // a language is a one-word change in i18n.js.
  menu.querySelectorAll('li').forEach(li => {
    const lang = li.querySelector('button[data-lang]')?.dataset.lang;
    if (lang && !isLangEnabled(lang)) li.remove();
  });

  // With one language left there is nothing to choose between, so the whole
  // control goes rather than sitting there as a menu of one. It returns by
  // itself as soon as a second language is enabled.
  if (menu.querySelectorAll('button[data-lang]').length <= 1) {
    toggle.closest('.lang-dropdown')?.remove();
    return;
  }

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
