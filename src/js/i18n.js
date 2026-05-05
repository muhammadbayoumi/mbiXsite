// ═══════════════════════════════════════════
// i18n — Language Switcher
// ═══════════════════════════════════════════

const translations = {
  en: {
    nav_home:      'Home',
    nav_how:       'How It Works',
    nav_demo:      'Demo',
    nav_schema:    'Schema',
    nav_install:   'How to Install',
    nav_about:     'About',
    nav_subscription: 'Subscription',
    nav_download:  'Download',
    hero_badge:    'Excel Intelligence Platform · v2.0',
    hero_t1:       'Your Excel.',
    hero_t2:       'Supercharged',
    hero_t3:       'by Real Data.',
    hero_sub:      'mbiX syncs Google Sheets data into a local SQLite database through a full ETL pipeline — giving your Excel workbooks live, validated, schema-driven data.',
    hero_btn1:     'Download mbiX',
    hero_btn2:     'Interactive Demo',
    stat1_val:     '5+',
    stat1_lbl:     'System Tables',
    stat2_val:     '3',
    stat2_lbl:     'Sync Lanes',
    stat3_val:     '0',
    stat3_lbl:     'Ghost Processes',
    stat4_val:     '100%',
    stat4_lbl:     'COM Safe',
    feat_tag:      'Features',
    feat_title:    'Built for Data Engineers',
    feat_desc:     'Everything you need to bridge Google Sheets and Excel — without the cloud middleware.',
    feat_1_title:  'ETL Pipeline',
    feat_1_desc:   'Full extract, transform, load cycle with built-in validation and schema enforcement.',
    feat_2_title:  'SQLite Engine',
    feat_2_desc:   'Local, fast, zero-config database that lives inside your Excel Add-in. No server needed.',
    feat_3_title:  'Schema Governance',
    feat_3_desc:   'Define rules once. mbiX validates every column, type, and relation before it hits your sheet.',
    feat_4_title:  'Live Sync',
    feat_4_desc:   'Pull real-time data from Google Sheets with configurable refresh intervals.',
    feat_5_title:  'COM Safe',
    feat_5_desc:   'Native VSTO architecture ensures 100% compatibility with Excel without ghost processes.',
    feat_6_title:  'Zero Dependencies',
    feat_6_desc:   'No cloud servers, no subscriptions, no third-party lock-in. Your data stays yours.',
    how_tag:       'Architecture',
    how_title:     'How It Works',
    how_desc:      'A 3-lane sync pipeline that moves data from cloud to workbook in seconds.',
    how_1_title:   'Configure Tables',
    how_1_desc:    'Define your system tables in Google Sheets. mbiX reads the schema and knows what to sync.',
    how_2_title:   'Run Sync',
    how_2_desc:    'One click triggers the full ETL pipeline. Data is validated, cleaned, and loaded into SQLite.',
    how_3_title:   'Work in Excel',
    how_3_desc:    'Your data appears instantly in the Ribbon — ready to query, pivot, and analyze.',
    demo_tag:      'Live Demo',
    demo_title:    'See mbiX in Action',
    demo_desc:     'Watch how a single click transforms raw Google Sheets into structured Excel intelligence.',
    schema_tag:    'Data Model',
    schema_title:  'Schema Reference',
    schema_desc:   '5 system tables power the entire platform. Clean, relational, and version-controlled.',
    schema_table:  'Table',
    schema_cols:   'Columns',
    schema_purpose:'Purpose',
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
    install_dl_btn:  'Download mbiXaddin.zip',
    s1_title:        'Download the Package',
    s1_desc:         'Get the latest .zip from the official Releases page.',
    s2_title:        'Unblock the File',
    s2_desc:         'Windows blocks files downloaded from the internet by default.',
    s2_l1:           'Right-click mbiXaddin.zip',
    s2_l2:           'Select Properties (or press Alt+Enter)',
    s2_l3:           'In the General tab, check Unblock',
    s2_l4:           'Click Apply, then OK',
    s3_title:        'Extract & Run Installer',
    s3_desc:         'Extract the zip to any folder, then run the .vsto file.',
    s3_l1:           'Extract mbiXaddin.zip',
    s3_l2:           'Open the extracted folder',
    s3_l3:           'Double-click mbiXaddin.vsto',
    s3_l4:           'Click Install in the dialog',
    s4_title:        "Open Excel — You're In",
    s4_desc:         'Open Excel. A new mbiXaddin tab will appear in the Ribbon.',
    s4_btn:          'View Ribbon Tour',
    trouble_tag:     'Help',
    trouble_title:   'Troubleshooting',
    t1_title:        'Tab not appearing in Excel',
    t1_desc:         'Did you Unblock the zip BEFORE extracting?',
    t2_title:        '"Cannot install" error',
    t2_desc:         'Make sure all Excel windows are closed.',
    t3_title:        'Antivirus blocks installer',
    t3_desc:         'Add the folder to antivirus exclusions.',
    t4_title:        'Need more help?',
    t4_desc:         'Open an issue on GitHub.',
    t4_btn:          'Open GitHub Issue',
    footer_brand:    'mbiX',
    footer_copy:     '© 2025 mbiX · Excel Intelligence Platform',
  },
  ar: {
    nav_home:      'الرئيسية',
    nav_how:       'كيف يعمل',
    nav_demo:      'تجربة حية',
    nav_schema:    'المخطط',
    nav_install:   'كيفية التثبيت',
    nav_about:     'من نحن',
    nav_subscription: 'الاشتراك',
    nav_download:  'تحميل',
    hero_badge:    'منصة ذكاء إكسل · v2.0',
    hero_t1:       'إكسل الخاص بك.',
    hero_t2:       'مُعزّز',
    hero_t3:       'ببيانات حقيقية.',
    hero_sub:      'mbiX يقوم بمزامنة بيانات Google Sheets إلى قاعدة بيانات SQLite محلية عبر خط أنابيب ETL كامل — مما يمنح مصنفات Excel بيانات مباشرة ومُتحقق منها.',
    hero_btn1:     'تحميل mbiX',
    hero_btn2:     'تجربة تفاعلية',
    stat1_val:     '+5',
    stat1_lbl:     'جداول النظام',
    stat2_val:     '3',
    stat2_lbl:     'مسارات المزامنة',
    stat3_val:     '0',
    stat3_lbl:     'عمليات شبحية',
    stat4_val:     '100%',
    stat4_lbl:     'آمن COM',
    feat_tag:      'المميزات',
    feat_title:    'مُصمّم لمهندسي البيانات',
    feat_desc:     'كل ما تحتاجه لربط Google Sheets وExcel — بدون وسيط سحابي.',
    feat_1_title:  'خط أنابيب ETL',
    feat_1_desc:   'دورة استخراج وتحويل وتحميل كاملة مع تحقق مدمج وفرض المخطط.',
    feat_2_title:  'محرك SQLite',
    feat_2_desc:   'قاعدة بيانات محلية وسريعة داخل إضافة Excel. لا تحتاج خادماً.',
    feat_3_title:  'حوكمة المخطط',
    feat_3_desc:   'عرّف القواعد مرة واحدة. يتحقق mbiX من كل عمود ونوع وعلاقة.',
    feat_4_title:  'مزامنة مباشرة',
    feat_4_desc:   'اسحب البيانات من Google Sheets بشكل فوري مع فترات تحديث قابلة للضبط.',
    feat_5_title:  'آمن COM',
    feat_5_desc:   'بنية VSTO أصلية تضمن توافقاً 100% مع Excel بدون عمليات شبحية.',
    feat_6_title:  'صفر تبعيات',
    feat_6_desc:   'بدون خوادم سحابية، بدون اشتراكات، بدون قفل طرف ثالث. بياناتك لك.',
    how_tag:       'البنية',
    how_title:     'كيف يعمل',
    how_desc:      'خط مزامنة بـ 3 مسارات ينقل البيانات من السحابة إلى المصنف في ثوانٍ.',
    how_1_title:   'إعداد الجداول',
    how_1_desc:    'عرف جداول النظام في Google Sheets. يقرأ mbiX المخطط ويعرف ما يزامنه.',
    how_2_title:   'تشغيل المزامنة',
    how_2_desc:    'نقرة واحدة تشغل خط ETL كامل. البيانات تُتحقق وتُنظف وتُحمل في SQLite.',
    how_3_title:   'العمل في Excel',
    how_3_desc:    'تظهر البيانات فوراً في الشريط — جاهزة للاستعلام والتحليل.',
    demo_tag:      'تجربة حية',
    demo_title:    'شاهد mbiX أثناء العمل',
    demo_desc:     'شاهد كيف تحوّل نقرة واحدة بيانات Google Sheets إلى ذكاء منظم في Excel.',
    schema_tag:    'نموذج البيانات',
    schema_title:  'مرجع المخطط',
    schema_desc:   '5 جداول نظام تشغّل المنصة بالكامل. نظيفة، علاقية، ومُحكّمة بالإصدارات.',
    schema_table:  'الجدول',
    schema_cols:   'الأعمدة',
    schema_purpose:'الغرض',
    about_tag:     'المهندس',
    about_name:    '[اسمك هنا]',
    about_role:    'مهندس برمجيات ومبتكر mbiX',
    about_bio:     'العقل المدبر وراء mbiX — منصة ذكاء إكسل التي تُحوّل طريقة عمل الفِرق مع البيانات داخل Microsoft Excel.',
    story_tag:     'القصة',
    story_title:   'لماذا mbiX؟',
    story_p1:      'كل فريق بيانات يواجه نفس المشكلة: البيانات الحيوية في Google Sheets، لكن العمل الحقيقي يحدث في Excel.',
    story_p2:      'وُلد mbiX من هذا الإحباط. بدلاً من بناء أداة سحابية أخرى، بنيت الحل حيث يحدث العمل فعلاً.',
    timeline_1:    'النموذج الأولي — مزامنة أساسية من Google Sheets إلى Excel',
    timeline_2:    'خط أنابيب ETL كامل مع التحقق وقواعد المخطط وPipelineLogger',
    timeline_3:    'Ribbon ديناميكي، ترخيص RSA، محرك التصدير، والإطلاق العام',
    install_tag:    'ابدأ الآن',
    install_title:  'ثبّت mbiX في دقائق',
    install_sub:    'اتبع الخطوات التالية لتثبيت mbiX على جهازك — لا حاجة لصلاحيات المسؤول.',
    install_dl_btn:  'تحميل mbiXaddin.zip',
    s1_title:        'تحميل الحزمة',
    s1_desc:         'احصل على آخر إصدار .zip من صفحة الإصدارات الرسمية.',
    s2_title:        'إلغاء حظر الملف',
    s2_desc:         'يحظر ويندوز الملفات المُنزّلة من الإنترنت افتراضياً.',
    s2_l1:           'انقر بالزر الأيمن على mbiXaddin.zip',
    s2_l2:           'اختر خصائص (أو اضغط Alt+Enter)',
    s2_l3:           'في تبويب عام، فعّل إلغاء الحظر',
    s2_l4:           'اضغط تطبيق ثم موافق',
    s3_title:        'فك الضغط وتشغيل المثبّت',
    s3_desc:         'فك ضغط الملف، ثم شغّل ملف .vsto.',
    s3_l1:           'فك ضغط mbiXaddin.zip',
    s3_l2:           'افتح المجلد المُستخرج',
    s3_l3:           'انقر مرتين على mbiXaddin.vsto',
    s3_l4:           'اضغط تثبيت في النافذة',
    s4_title:        'افتح إكسل — أنت جاهز',
    s4_desc:         'افتح إكسل. سيظهر تبويب جديد mbiXaddin في الشريط.',
    s4_btn:          'جولة في الشريط',
    trouble_tag:     'المساعدة',
    trouble_title:   'حل المشكلات',
    t1_title:        'التبويب لا يظهر في إكسل',
    t1_desc:         'هل قمت بإلغاء حظر الملف قبل فك الضغط؟',
    t2_title:        'خطأ "لا يمكن التثبيت"',
    t2_desc:         'تأكد من إغلاق جميع نوافذ إكسل.',
    t3_title:        'برنامج الحماية يحظر المثبّت',
    t3_desc:         'أضف المجلد إلى استثناءات برنامج الحماية.',
    t4_title:        'تحتاج مساعدة إضافية؟',
    t4_desc:         'افتح تذكرة على GitHub.',
    t4_btn:          'فتح تذكرة GitHub',
    footer_brand:    'mbiX',
    footer_copy:     '© 2025 mbiX · Excel Intelligence Platform',
  }
};

let currentLang = localStorage.getItem('mbx-lang') || 'en';

export function initI18n() {
  applyLang(currentLang);
}

export function setLang(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  localStorage.setItem('mbx-lang', lang);
  applyLang(lang);
}

export function getLang() {
  return currentLang;
}

/**
 * Replace text content of an element while preserving all child elements.
 * Only replaces direct text nodes, leaving elements (icons, spans, etc.) untouched.
 */
function setTextPreserveChildren(el, text) {
  // If element has no element children, simple textContent is fine
  if (el.children.length === 0) {
    el.textContent = text;
    return;
  }

  // Collect all child elements to preserve their order
  const childElements = Array.from(el.childNodes).filter(node => node.nodeType === Node.ELEMENT_NODE);

  // Clear all content
  el.textContent = text;

  // Re-append child elements in their original order
  childElements.forEach(child => el.appendChild(child));
}

let pendingLangUpdate = null;

function applyLang(lang) {
  const t = translations[lang];
  if (!t) return;

  // Cancel any pending update to batch rapid switches
  if (pendingLangUpdate) cancelAnimationFrame(pendingLangUpdate);

  pendingLangUpdate = requestAnimationFrame(() => {
    pendingLangUpdate = null;

    // Direction & font
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.toggle('is-rtl', lang === 'ar');

    // Apply translations — preserve all child elements (icons, spans, etc.)
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key]) {
        setTextPreserveChildren(el, t[key]);
      }
    });

    // Update document title if translated
    const titleEl = document.querySelector('title[data-i18n]');
    if (titleEl && t[titleEl.dataset.i18n]) {
      document.title = t[titleEl.dataset.i18n];
    }
  });
}
