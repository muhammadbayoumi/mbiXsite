// ═══════════════════════════════════════════
// i18n — Language Switcher
// ═══════════════════════════════════════════

const translations = {
  en: {
    nav_features:  'Features',
    nav_how:       'How It Works',
    nav_demo:      'Demo',
    nav_schema:    'Schema',
    nav_install:   'Install',
    nav_about:     'About',
    nav_download:  'Download',
    hero_badge:    'Excel Intelligence Platform · v2.0',
    hero_t1:       'Your Excel.',
    hero_t2:       'Supercharged',
    hero_t3:       'by Real Data.',
    hero_sub:      'mbiX syncs Google Sheets data into a local SQLite database through a full ETL pipeline — giving your Excel workbooks live, validated, schema-driven data.',
    hero_btn1:     'Download mbiX',
    hero_btn2:     'Interactive Demo →',
    stat1_val:     '5+',
    stat1_lbl:     'System Tables',
    stat2_val:     '3',
    stat2_lbl:     'Sync Lanes',
    stat3_val:     '0',
    stat3_lbl:     'Ghost Processes',
    stat4_val:     '100%',
    stat4_lbl:     'COM Safe',
    feat_tag:      'Features',
    feat_title:    'Coming next...',
    about_tag:     'The Engineer',
    about_name:    '[Your Name]',
    about_role:    'Software Engineer & Creator of mbiX',
    about_bio:     'The mind behind mbiX — an Excel Intelligence Platform that transforms how teams work with data inside Microsoft Excel.',
    story_tag:     'The Story',
    story_title:   'Why mbiX?',
    story_p1:      'Every data team faces the same problem: critical business data lives in Google Sheets, but the real work happens in Excel.',
    story_p2:      'mbiX was born from this frustration. Instead of building yet another cloud tool, I built the solution where the work actually happens.',
    timeline_1:    'First prototype — basic sync from Google Sheets to Excel',
    timeline_2:    'Full ETL pipeline with validation, schema rules, and PipelineLogger',
    timeline_3:    'Dynamic Ribbon, RSA licensing, Export Engine, and public release',
    install_tag:    'Get Started',
    install_title:  'Install mbiX in Minutes',
    install_sub:    'Follow the steps below to install mbiX on your Windows machine — no admin rights required.',
    req_tag:        'Step 01',
    req_title:      'Requirements',
    req_desc:       'Before installing mbiX, make sure your system meets these requirements.',
    req_excel:      'Microsoft Excel',
    req_net:        '.NET Framework',
    req_os:         'Windows',
    req_internet:   'Internet',
    req_internet_d: 'For first-time sync only',
    dl_tag:         'Step 02',
    dl_title:       'Download Setup',
    dl_desc:        'Download the latest installer from the official Releases page on GitHub.',
    steps_tag:      'Step 03',
    steps_title:    'Run Installer',
    step1_t:        'Close Excel',
    step1_d:        'Make sure all Excel windows are closed before running the installer.',
    step2_t:        'Run the .msi',
    step2_d:        'Double-click the installer file. Follow the wizard — defaults are fine.',
    step3_t:        'Open Excel',
    step3_d:        'A new "mbiX" tab appears in the Ribbon. You\'re ready to sync.',
    cfg_tag:        'Step 04',
    cfg_title:      'Configure Google Sheet',
    cfg_desc:       'mbiX needs 5 system tables in your Google Sheet to know what to sync.',
    cfg_btn:        'View Schema Docs →',
  },
  ar: {
    nav_features:  'المميزات',
    nav_how:       'كيف يعمل',
    nav_demo:      'تجربة حية',
    nav_schema:    'المخطط',
    nav_install:   'التثبيت',
    nav_about:     'من نحن',
    nav_download:  'تحميل',
    hero_badge:    'منصة ذكاء إكسل · v2.0',
    hero_t1:       'إكسل الخاص بك.',
    hero_t2:       'مُعزّز',
    hero_t3:       'ببيانات حقيقية.',
    hero_sub:      'mbiX يقوم بمزامنة بيانات Google Sheets إلى قاعدة بيانات SQLite محلية عبر خط أنابيب ETL كامل — مما يمنح مصنفات Excel بيانات مباشرة ومُتحقق منها.',
    hero_btn1:     'تحميل mbiX',
    hero_btn2:     '← تجربة تفاعلية',
    stat1_val:     '+5',
    stat1_lbl:     'جداول النظام',
    stat2_val:     '3',
    stat2_lbl:     'مسارات المزامنة',
    stat3_val:     '0',
    stat3_lbl:     'عمليات شبحية',
    stat4_val:     '100%',
    stat4_lbl:     'آمن COM',
    feat_tag:      'المميزات',
    feat_title:    'قريباً...',
    about_tag:     'المهندس',
    about_name:    '[اسمك هنا]',
    about_role:    'مهندس برمجيات ومبتكر mbiX',
    about_bio:     'العقل المدبر وراء mbiX — منصة ذكاء إكسل التي تُحوّل طريقة عمل الفِرق مع البيانات داخل Microsoft Excel.',
    story_tag:     'القصة',
    story_title:   'لماذا mbiX؟',
    story_p1:      'كل فريق بيانات يواجه نفس المشكلة: البيانات الحيوية في Google Sheets، لكن العمل الحقيقي يحدث في Excel.',
    story_p2:      'وُلد mbiX من هذا الإحباط. بدلاً من بناء أداة سحابية أخرى، بنيت الحل حيث يحدث العمل فعلاً — داخل Excel مباشرة.',
    timeline_1:    'النموذج الأولي — مزامنة أساسية من Google Sheets إلى Excel',
    timeline_2:    'خط أنابيب ETL كامل مع التحقق وقواعد المخطط وPipelineLogger',
    timeline_3:    'Ribbon ديناميكي، ترخيص RSA، محرك التصدير، والإطلاق العام',
    install_tag:    'ابدأ الآن',
    install_title:  'ثبّت mbiX في دقائق',
    install_sub:    'اتبع الخطوات التالية لتثبيت mbiX على جهازك — لا حاجة لصلاحيات المسؤول.',
    req_tag:        'الخطوة 01',
    req_title:      'المتطلبات',
    req_desc:       'قبل تثبيت mbiX، تأكد من توافر هذه المتطلبات.',
    req_excel:      'مايكروسوفت إكسل',
    req_net:        '.NET Framework',
    req_os:         'ويندوز',
    req_internet:   'الإنترنت',
    req_internet_d: 'للمزامنة الأولى فقط',
    dl_tag:         'الخطوة 02',
    dl_title:       'تحميل المثبّت',
    dl_desc:        'حمّل أحدث نسخة من صفحة Releases الرسمية على GitHub.',
    steps_tag:      'الخطوة 03',
    steps_title:    'تشغيل المثبّت',
    step1_t:        'أغلق إكسل',
    step1_d:        'تأكد من إغلاق جميع نوافذ إكسل قبل تشغيل المثبّت.',
    step2_t:        'شغّل ملف .msi',
    step2_d:        'انقر مرتين على ملف المثبّت واتبع المعالج — الإعدادات الافتراضية مناسبة.',
    step3_t:        'افتح إكسل',
    step3_d:        'سيظهر تبويب جديد "mbiX" في الشريط — جاهز للمزامنة.',
    cfg_tag:        'الخطوة 04',
    cfg_title:      'إعداد Google Sheet',
    cfg_desc:       'يحتاج mbiX إلى 5 جداول نظام في Google Sheet ليعرف ما الذي يزامنه.',
    cfg_btn:        '← عرض توثيق المخطط',
  }
};

let currentLang = localStorage.getItem('mbx-lang') || 'en';

export function initI18n() {
  applyLang(currentLang);

  const toggle = document.getElementById('langToggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      currentLang = currentLang === 'en' ? 'ar' : 'en';
      localStorage.setItem('mbx-lang', currentLang);
      applyLang(currentLang);
    });
  }
}

function applyLang(lang) {
  const t = translations[lang];
  if (!t) return;

  // Direction & font
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.body.classList.toggle('is-rtl', lang === 'ar');

  // Toggle button text
  const toggle = document.getElementById('langToggle');
  if (toggle) {
  toggle.textContent = lang === 'en' ? 'ع' : 'EN';
  }

  // Apply translations
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) el.textContent = t[key];
  });
}

export function getLang() {
  return currentLang;
}