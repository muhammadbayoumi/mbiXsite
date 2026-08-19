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
    nav_newsletter:  'Join the Newsletter',
    nav_help:      'Help Center',
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
    about_name:    'Muhammad Bayoumi',
    about_role:    'Senior Technical Office Engineer, and <span class="about-role-highlight">The mind behind mbiX</span>',
    about_bio_1:   'Civil engineer with <span data-years-since="2019"></span>+ years of experience in tendering, technical office work, quantity surveying, and cost estimation on large-scale construction projects across Egypt and Saudi Arabia.',
    about_bio_2:   'The mind behind mbiX — an Excel VSTO add-in designed to help teams pull and update data inside Microsoft Excel seamlessly — eliminating the friction of manual updates.',
    about_bio_3:   'A self-motivated, ethics-driven engineer committed to continuous learning and to delivering real value to colleagues in ways that strengthen team spirit and collaboration. My ambition is to be part of leading positive change in the world.',
    story_tag:     'The Story',
    story_title:   'Why mbiX?',
    story_p1:      'In every construction project, the same problem repeats: pricing data, material rates, and BOQ breakdowns live in Google Sheets — shared across teams, updated by dozens of people. But the real engineering work happens in Excel.',
    story_p2:      'mbiX was born from this daily frustration. Instead of waiting for an IT department to build a cloud solution, Muhammad built the tool where the work actually happens — directly inside Excel, with a full ETL pipeline, schema governance, and zero external dependencies.',
    timeline_0:    'Joined Samco as Site Engineer, then moved to Technical Office — first exposure to the data sync problem',
    timeline_1:    'First mbiX prototype — basic sync from Google Sheets to Excel using C# and VSTO',
    timeline_2:    'Full ETL pipeline with validation, schema rules, and PipelineLogger. Promoted to Senior QS and Cost Estimation Engineer',
    timeline_3:    'Moved to SAPAC in Riyadh as Senior Technical Office Engineer. Dynamic Ribbon, RSA licensing, Export Engine, and public release of mbiX',
    install_tag:    'Get Started',
    install_title:  'Install mbiX in Minutes',
    install_sub:    'Follow the steps below to install mbiX on your Windows machine — no admin rights required.',
    install_dl_btn:  'Download mbiXaddin.zip',
    s1_title:        'Download the Package',
    s1_desc:         'Get the latest .zip from the official Releases page.',
    s2_title:        'Unblock the File',
    s2_desc:         'Windows blocks files downloaded from the internet by default.',
    s2_l1:           'Right-click <code>mbiXaddin.zip</code>',
    s2_l2:           'Select <strong>Properties</strong> (or press <kbd>Alt</kbd>+<kbd>Enter</kbd>)',
    s2_l3:           'In the <strong>General</strong> tab, check <strong>Unblock</strong>',
    s2_l4:           'Click <strong>Apply</strong>, then <strong>OK</strong>',
    s3_title:        'Extract & Run Installer',
    s3_desc:         'Extract the zip to any folder, then run the .vsto file.',
    s3_l1:           'Extract <code>mbiXaddin.zip</code>',
    s3_l2:           'Open the extracted folder',
    s3_l3:           'Double-click <code>mbiXaddin.vsto</code>',
    s3_l4:           'Click <strong>Install</strong> in the dialog',
    s4_title:        "Open Excel — You're In",
    s4_desc:         'Open Excel. A new mbiXaddin tab will appear in the Ribbon.',
    s4_btn:          'View Ribbon Tour',
    trouble_tag:     'Help',
    trouble_title:   'Troubleshooting',
    t1_title:        'Tab not appearing in Excel',
    t1_desc:         'Did you restart Excel after installation? Close all Excel windows completely, then reopen Excel.',
    t2_title:        '"Cannot install" error',
    t2_desc:         'Did you unblock the zip file BEFORE extracting? Right-click the zip → Properties → check "Unblock" → Apply → then extract again.',
    t3_title:        'Antivirus blocks installer',
    t3_desc:         'Add the folder to antivirus exclusions.',
    t4_title:        'Need more help?',
    t4_desc:         'Open an issue on GitHub.',
    t4_btn:          'Open GitHub Issue',
    footer_brand:    'mbiX',
    footer_copy:     '© 2025 mbiX · Excel Intelligence Platform',
    releases_title:  'Release history',
    releases_loading:'Loading releases…',
    releases_error:  'Could not load the release history.',
    releases_rate_limited: 'GitHub rate limit reached. Please try again later.',
    releases_empty:  'No releases published yet.',
    footer_privacy:  'Privacy Policy',

    // ── Products
    nav_products:      'Products',
    nav_prod_addin:    'Xadd-in for Excel',
    nav_prod_scrapex:  'ScrapeX for Chrome',
    footer_what_we_do: 'What we do',
    footer_product:    'Xadd-in',
    footer_scrapex:    'ScrapeX',
    footer_who_we_are: 'Who we are',
    footer_need_help:  'Need help?',
    home_products_tag:   'Two products',
    home_products_title: 'One platform, two tools',
    home_products_sub:   'Xadd-in brings your pricing data into Excel. ScrapeX collects published prices from the web into a database on your own machine.',
    home_addin_title:    'Xadd-in for Excel',
    home_addin_desc:     'An Excel add-in for tendering, quantity surveying and cost estimation.',
    home_addin_btn:      'How to install',
    home_scrapex_title:  'ScrapeX for Chrome',
    home_scrapex_desc:   'A Chrome panel and a local Windows engine that collect published prices into a database you own.',
    home_scrapex_btn:    'How to install',

    // ── ScrapeX install
    sx_tag:            'ScrapeX',
    sx_title:          'Install ScrapeX',
    sx_sub:            'Collect published prices from sites you choose into a database on your own machine. Nothing runs on a server.',
    sx_fact_windows:   'Windows only',
    sx_fact_noadmin:   'No administrator rights',
    sx_fact_noserver:  'No account, no server',
    sx_fact_chrome:    'Chrome or Chromium',
    sx_halves_tag:     'How it fits together',
    sx_halves_title:   'ScrapeX installs in two halves',
    sx_halves_sub:     'A panel inside Chrome, and a small program on your computer that does the collecting. You need both — with only one, the panel looks broken.',
    sx_half1_title:    'The extension',
    sx_half1_desc:     'Installs from the Chrome Web Store like any other extension. It gives you the side panel where you add sites and read results.',
    sx_half1_btn:      'Get it on the Chrome Web Store',
    sx_half1_pending:  'The store listing is being created. This button becomes active as soon as it is published.',
    sx_half2_title:    'The engine',
    sx_half2_desc:     'A single program that fetches pages and stores what it finds. <strong>The extension downloads and installs it for you</strong> from its own Engine page — that is the route to use.',
    sx_half2_s1:       'Open the ScrapeX panel in Chrome',
    sx_half2_s2:       'Go to <strong>Engine</strong>',
    sx_half2_s3:       'Choose <strong>Install engine</strong> and let it finish',
    sx_half2_manual:   'Installing by hand works too — see below.',
    sx_manual_title:   'Installing the engine by hand',
    sx_manual_desc:    'If you would rather not let the extension do it, download the engine yourself. Put it anywhere and run it — there is no installer to step through.',
    sx_manual_s1:      'Download the engine using the button opposite',
    sx_manual_s2:      'Put it anywhere you like — your Downloads folder is fine',
    sx_manual_s3:      'Run it. It installs for your user only, into <code>%LOCALAPPDATA%\\ScrapeX\\engine\\</code>',
    sx_manual_s4:      'Open the ScrapeX panel in Chrome; it finds the engine within a few seconds',
    sx_manual_uninstall: 'It appears in <strong>Apps &amp; features</strong> like any other program, and is removed the same way.',
    sx_dl_meta:        'Engine for Windows',
    sx_dl_btn:         'Download the engine',
    sx_dl_size:        'Size',
    sx_dl_sha:         'SHA-256',
    sx_dl_unreleased:  'The first release is not published yet, so there is no version number or checksum to show. This button opens the releases page, which always lists the newest build.',
    sx_dl_verify:      'Verify the file before running it: in PowerShell, <code>Get-FileHash .\\scrapex-engine.exe</code> should print the hash above.',
    sx_ss_title:       'Windows will warn you once',
    sx_ss_desc:        'The engine is not code-signed, so the first time you run it Windows shows a blue SmartScreen dialog. This is expected. It says nothing about whether the file is safe — only that Windows has not seen it signed by a paid certificate.',
    sx_ss_what:        'Here is exactly what it says, and what to press:',
    sx_ss_s1:          'Click <strong>More info</strong>',
    sx_ss_s2:          'Click <strong>Run anyway</strong>',
    sx_ss_verify:      'If you would rather check the file first, compare its SHA-256 against the one published with the release above. That tells you far more than a signature would.',
    sx_ss_dlg_title:   'Windows protected your PC',
    sx_ss_dlg_body:    'Microsoft Defender SmartScreen prevented an unrecognised app from starting. Running this app might put your PC at risk.',
    sx_ss_dlg_more:    'More info',
    sx_ss_dlg_run:     'Run anyway',
    sx_ss_dlg_dont:    "Don't run",
    sx_priv_tag:       'Your data',
    sx_priv_title:     'Everything stays on your machine',
    sx_priv_1_title:   'No account, no server',
    sx_priv_1_desc:    'There is nothing to sign up for and nowhere for your data to be sent. If your machine is off, nothing runs.',
    sx_priv_2_title:   'A database you own',
    sx_priv_2_desc:    'What you collect is written to a file in your own user folder. Deleting it is a matter of deleting a folder.',
    sx_priv_3_title:   'No telemetry',
    sx_priv_3_desc:    'No analytics, no crash reports, no usage counts. The full detail is in the privacy policy.',
    sx_priv_btn:       'Read the privacy policy',
    sx_help_title:     'Something not working?',
    sx_help_desc:      'The support page lists the three problems that account for most of what goes wrong, and exactly which two version numbers to include in a report.',
    sx_help_btn:       'Open ScrapeX support',

    // ── ScrapeX documents
    sxp_title:         'Privacy Policy',
    sxp_sub:           'Every piece of data ScrapeX touches, and where it lives.',
    sxs_title:         'Support',
    sxs_sub:           'What to include in a report, and the problems that account for most of what goes wrong.',
    sxs_issue_btn:     'Open an issue',
    sx_doc_loading:    'Loading…',
    sx_doc_unpublished:'This document has not been published yet. It appears here as soon as ScrapeX publishes its first release.',
    sx_doc_error:      'Could not load this document. Please try again later.',
    sx_doc_source:     'View the source repository',

    // ── Legal document pages (chrome around the fetched documents)
    legal_documents:   'Documents',
    legal_on_this_page:'On this page',
    legal_print:       'Print',
    legal_archive:     'Previous versions',
    legal_top:         'Back to top',
  },
  ar: {
    nav_home:      'الرئيسية',
    nav_how:       'كيف يعمل',
    nav_demo:      'تجربة حية',
    nav_schema:    'المخطط',
    nav_install:   'كيفية التثبيت',
    nav_about:     'من نحن',
    nav_newsletter:  'النشرة البريدية',
    nav_help:      'مركز المساعدة',
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
    about_name:    'محمد بيومي',
    about_role:    'مهندس مكتب فني أول، <span class="about-role-highlight">والعقل المدبر وراء mbiX</span>',
    about_bio_1:   'مهندس مدني بخبرة تتجاوز <span data-years-since="2019"></span> سنوات في المناقصات وأعمال المكتب الفني وحصر الكميات وتقدير التكاليف في مشاريع البناء الكبرى بمصر والسعودية.',
    about_bio_2:   'العقل المدبر وراء mbiX — إضافة Excel VSTO مصممة لمساعدة الفِرق على سحب وتحديث البيانات داخل Microsoft Excel بسلاسة — مما يلغي احتكاك التحديثات اليدوية.',
    about_bio_3:   'مهندس طموح ذاتي الدافع، ملتزم بالتعلم المستمر وتقديم قيمة حقيقية للزملاء بطرق تعزز روح الفريق والتعاون. طموحي أن أكون جزءاً من قيادة التغيير الإيجابي في العالم.',
    story_tag:     'القصة',
    story_title:   'لماذا mbiX؟',
    story_p1:      'في كل مشروع بناء، تتكرر نفس المشكلة: بيانات التسعير ومعدلات المواد وتفاصيل جداول الكميات موجودة في Google Sheets — مشتركة بين الفِرق ويحدّثها عشرات الأشخاص. لكن العمل الهندسي الحقيقي يحدث في Excel.',
    story_p2:      'وُلد mbiX من هذا الإحباط اليومي. بدلاً من انتظار قسم تقنية المعلومات لبناء حل سحابي، بنى محمد الأداة حيث يحدث العمل فعلاً — داخل Excel مباشرة، بخط أنابيب ETL كامل وحوكمة للمخطط وصفر تبعيات خارجية.',
    timeline_0:    'التحق بشركة سامكو كمهندس موقع، ثم انتقل للمكتب الفني — أول تعرض لمشكلة مزامنة البيانات',
    timeline_1:    'أول نموذج أولي لـ mbiX — مزامنة أساسية من Google Sheets إلى Excel باستخدام C# و VSTO',
    timeline_2:    'خط أنابيب ETL كامل مع التحقق وقواعد المخطط و PipelineLogger. ترقية لمهندس حصر كميات وتقدير تكاليف أول',
    timeline_3:    'الانتقال لشركة SAPAC بالرياض كمهندس مكتب فني أول. Ribbon ديناميكي، ترخيص RSA، محرك التصدير، والإطلاق العام لـ mbiX',
    install_tag:    'ابدأ الآن',
    install_title:  'ثبّت mbiX في دقائق',
    install_sub:    'اتبع الخطوات التالية لتثبيت mbiX على جهازك — لا حاجة لصلاحيات المسؤول.',
    install_dl_btn:  'تحميل mbiXaddin.zip',
    s1_title:        'تحميل الحزمة',
    s1_desc:         'احصل على آخر إصدار .zip من صفحة الإصدارات الرسمية.',
    s2_title:        'إلغاء حظر الملف',
    s2_desc:         'يحظر ويندوز الملفات المُنزّلة من الإنترنت افتراضياً.',
    s2_l1:           'انقر بالزر الأيمن على <code>mbiXaddin.zip</code>',
    s2_l2:           'اختر <strong>خصائص</strong> (أو اضغط <kbd>Alt</kbd>+<kbd>Enter</kbd>)',
    s2_l3:           'في تبويب <strong>عام</strong>، فعّل <strong>إلغاء الحظر</strong>',
    s2_l4:           'اضغط <strong>تطبيق</strong> ثم <strong>موافق</strong>',
    s3_title:        'فك الضغط وتشغيل المثبّت',
    s3_desc:         'فك ضغط الملف، ثم شغّل ملف .vsto.',
    s3_l1:           'فك ضغط <code>mbiXaddin.zip</code>',
    s3_l2:           'افتح المجلد المُستخرج',
    s3_l3:           'انقر مرتين على <code>mbiXaddin.vsto</code>',
    s3_l4:           'اضغط <strong>تثبيت</strong> في النافذة',
    s4_title:        'افتح إكسل — أنت جاهز',
    s4_desc:         'افتح إكسل. سيظهر تبويب جديد mbiXaddin في الشريط.',
    s4_btn:          'جولة في الشريط',
    trouble_tag:     'المساعدة',
    trouble_title:   'حل المشكلات',
    t1_title:        'التبويب لا يظهر في إكسل',
    t1_desc:         'هل أعدت تشغيل إكسل بعد التثبيت؟ أغلق جميع نوافذ إكسل تماماً، ثم أعد فتحها.',
    t2_title:        'خطأ \u201cلا يمكن التثبيت\u201d',
    t2_desc:         'هل قمت بإلغاء حظر ملف الـ zip قبل فك الضغط؟ انقر بالزر الأيمن على الملف → خصائص → فعّل \u201cإلغاء الحظر\u201d → تطبيق → ثم فك الضغط وأعد المحاولة.',
    t3_title:        'برنامج الحماية يحظر المثبّت',
    t3_desc:         'أضف المجلد إلى استثناءات برنامج الحماية.',
    t4_title:        'تحتاج مساعدة إضافية؟',
    t4_desc:         'افتح تذكرة على GitHub.',
    t4_btn:          'فتح تذكرة GitHub',
    footer_brand:    'mbiX',
    footer_copy:     '© 2025 mbiX · Excel Intelligence Platform',
    releases_title:  'سجل الإصدارات',
    releases_loading:'جارٍ تحميل الإصدارات…',
    releases_error:  'تعذّر تحميل سجل الإصدارات.',
    releases_rate_limited: 'تم بلوغ حد الطلبات على GitHub. حاول لاحقًا.',
    releases_empty:  'لا توجد إصدارات منشورة بعد.',
    footer_privacy:  'سياسة الخصوصية',

    // ── المنتجات
    nav_products:      'المنتجات',
    nav_prod_addin:    'Xadd-in لإكسل',
    nav_prod_scrapex:  'ScrapeX لكروم',
    footer_what_we_do: 'ماذا نقدّم',
    footer_product:    'Xadd-in',
    footer_scrapex:    'ScrapeX',
    footer_who_we_are: 'من نحن',
    footer_need_help:  'تحتاج مساعدة؟',
    home_products_tag:   'منتجان',
    home_products_title: 'منصّة واحدة، أداتان',
    home_products_sub:   'Xadd-in يجمع بيانات التسعير داخل إكسل. وScrapeX يجمع الأسعار المنشورة على الويب في قاعدة بيانات على جهازك.',
    home_addin_title:    'Xadd-in لإكسل',
    home_addin_desc:     'إضافة لإكسل لأعمال المناقصات وحصر الكميات وتقدير التكاليف.',
    home_addin_btn:      'طريقة التثبيت',
    home_scrapex_title:  'ScrapeX لكروم',
    home_scrapex_desc:   'لوحة داخل كروم ومحرّك يعمل على ويندوز، يجمعان الأسعار المنشورة في قاعدة بيانات تملكها أنت.',
    home_scrapex_btn:    'طريقة التثبيت',

    // ── تثبيت ScrapeX
    sx_tag:            'ScrapeX',
    sx_title:          'تثبيت ScrapeX',
    sx_sub:            'اجمع الأسعار المنشورة من المواقع التي تختارها في قاعدة بيانات على جهازك. لا شيء يعمل على أي سيرفر.',
    sx_fact_windows:   'ويندوز فقط',
    sx_fact_noadmin:   'لا يحتاج صلاحيات مسؤول',
    sx_fact_noserver:  'بلا حساب وبلا سيرفر',
    sx_fact_chrome:    'كروم أو أي متصفح Chromium',
    sx_halves_tag:     'كيف يعمل معًا',
    sx_halves_title:   'ScrapeX يُثبَّت على نصفين',
    sx_halves_sub:     'لوحة داخل كروم، وبرنامج صغير على جهازك هو الذي يقوم بالجمع. تحتاج الاثنين — فبأحدهما فقط تبدو اللوحة معطّلة.',
    sx_half1_title:    'الإضافة',
    sx_half1_desc:     'تُثبَّت من متجر كروم مثل أي إضافة أخرى، وتمنحك اللوحة الجانبية التي تضيف فيها المواقع وتقرأ النتائج.',
    sx_half1_btn:      'احصل عليها من متجر كروم',
    sx_half1_pending:  'صفحة المتجر قيد الإنشاء، وسيصبح هذا الزر فعّالًا بمجرّد نشرها.',
    sx_half2_title:    'المحرّك',
    sx_half2_desc:     'برنامج واحد يجلب الصفحات ويخزّن ما يجده. <strong>الإضافة تنزّله وتثبّته لك</strong> من صفحة المحرّك داخلها، وهذا هو المسار المفضّل.',
    sx_half2_s1:       'افتح لوحة ScrapeX في كروم',
    sx_half2_s2:       'اذهب إلى <strong>المحرّك</strong>',
    sx_half2_s3:       'اختر <strong>تثبيت المحرّك</strong> وانتظر حتى ينتهي',
    sx_half2_manual:   'التثبيت اليدوي متاح أيضًا — انظر بالأسفل.',
    sx_manual_title:   'تثبيت المحرّك يدويًا',
    sx_manual_desc:    'إن فضّلت ألّا تترك الأمر للإضافة، نزّل المحرّك بنفسك. ضعه في أي مكان وشغّله — لا يوجد معالج تثبيت تمرّ بخطواته.',
    sx_manual_s1:      'نزّل المحرّك من الزر المقابل',
    sx_manual_s2:      'ضعه في أي مكان تريده — مجلد التنزيلات يكفي',
    sx_manual_s3:      'شغّله. يُثبَّت لحسابك أنت وحدك في <code>%LOCALAPPDATA%\\ScrapeX\\engine\\</code>',
    sx_manual_s4:      'افتح لوحة ScrapeX في كروم، وسيجد المحرّك في ثوانٍ',
    sx_manual_uninstall: 'يظهر في <strong>التطبيقات والميزات</strong> مثل أي برنامج آخر، ويُزال بالطريقة نفسها.',
    sx_dl_meta:        'المحرّك لويندوز',
    sx_dl_btn:         'نزّل المحرّك',
    sx_dl_size:        'الحجم',
    sx_dl_sha:         'بصمة SHA-256',
    sx_dl_unreleased:  'الإصدار الأول لم يُنشر بعد، فلا يوجد رقم نسخة ولا بصمة لعرضهما. هذا الزر يفتح صفحة الإصدارات التي تعرض دائمًا أحدث نسخة.',
    sx_dl_verify:      'تحقّق من الملف قبل تشغيله: في PowerShell، الأمر <code>Get-FileHash .\\scrapex-engine.exe</code> يجب أن يطبع البصمة الظاهرة أعلاه.',
    sx_ss_title:       'ويندوز سيحذّرك مرّة واحدة',
    sx_ss_desc:        'المحرّك غير موقَّع رقميًا، لذلك يعرض ويندوز نافذة SmartScreen الزرقاء في أول تشغيل. هذا متوقّع، ولا يقول شيئًا عن أمان الملف — إنما يقول فقط إن ويندوز لم يجده موقَّعًا بشهادة مدفوعة. وتظهر النافذة بلغة نظامك، فإن كان ويندوز عندك بالعربية سترى النص مترجمًا.',
    sx_ss_what:        'هذا نصّها بالحرف، وما ينبغي أن تضغطه:',
    sx_ss_s1:          'اضغط <strong>More info</strong>',
    sx_ss_s2:          'اضغط <strong>Run anyway</strong>',
    sx_ss_verify:      'وإن فضّلت التحقّق من الملف أولًا، قارن بصمة SHA-256 الخاصة به بالبصمة المنشورة مع الإصدار أعلاه. هذا يخبرك أكثر بكثير مما يخبرك به التوقيع.',
    sx_ss_dlg_title:   'Windows protected your PC',
    sx_ss_dlg_body:    'Microsoft Defender SmartScreen prevented an unrecognised app from starting. Running this app might put your PC at risk.',
    sx_ss_dlg_more:    'More info',
    sx_ss_dlg_run:     'Run anyway',
    sx_ss_dlg_dont:    "Don't run",
    sx_priv_tag:       'بياناتك',
    sx_priv_title:     'كل شيء يبقى على جهازك',
    sx_priv_1_title:   'بلا حساب وبلا سيرفر',
    sx_priv_1_desc:    'لا يوجد ما تسجّل فيه، ولا مكان تُرسل إليه بياناتك. وإن كان جهازك مغلقًا فلا شيء يعمل.',
    sx_priv_2_title:   'قاعدة بيانات تملكها',
    sx_priv_2_desc:    'ما تجمعه يُكتب في ملف داخل مجلد المستخدم الخاص بك، وحذفه لا يزيد على حذف مجلد.',
    sx_priv_3_title:   'بلا تتبّع',
    sx_priv_3_desc:    'لا تحليلات ولا تقارير أعطال ولا عدّ استخدام. التفصيل الكامل في سياسة الخصوصية.',
    sx_priv_btn:       'اقرأ سياسة الخصوصية',
    sx_help_title:     'شيء لا يعمل؟',
    sx_help_desc:      'صفحة الدعم تسرد المشكلات الثلاث التي تمثّل معظم ما يحدث من أخطاء، وتحدّد رقمَي النسخة اللذين ينبغي إرفاقهما في أي تقرير.',
    sx_help_btn:       'افتح دعم ScrapeX',

    // ── مستندات ScrapeX
    sxp_title:         'سياسة الخصوصية',
    sxp_sub:           'كل بيانات يلمسها ScrapeX، وأين تُحفظ.',
    sxs_title:         'الدعم',
    sxs_sub:           'ما ينبغي إرفاقه في التقرير، والمشكلات التي تمثّل معظم ما يحدث من أخطاء.',
    sxs_issue_btn:     'افتح تقرير مشكلة',
    sx_doc_loading:    'جارٍ التحميل…',
    sx_doc_unpublished:'هذا المستند لم يُنشر بعد، وسيظهر هنا بمجرّد أن ينشر ScrapeX إصداره الأول.',
    sx_doc_error:      'تعذّر تحميل هذا المستند. حاول مرة أخرى لاحقًا.',
    sx_doc_source:     'اعرض المستودع المصدر',

    // ── صفحات المستندات القانونية
    legal_documents:   'المستندات',
    legal_on_this_page:'في هذه الصفحة',
    legal_print:       'طباعة',
    legal_archive:     'الإصدارات السابقة',
    legal_top:         'عودة إلى الأعلى',
  }
};

/**
 * Languages offered to visitors.
 *
 * Arabic is written and complete — 192 keys, at parity with English — but its
 * rendered layout has not been reviewed yet, and RTL is the kind of thing that
 * looks fine in the data and wrong on the page. It stays out of the picker
 * until someone has actually looked at it.
 *
 * To bring it back, add 'ar' here. Nothing else needs to change: the strings,
 * the RTL stylesheet and the dropdown entry are all already in place.
 */
export const ENABLED_LANGS = ['en'];

export function isLangEnabled(lang) {
  return ENABLED_LANGS.includes(lang);
}

// A visitor who already chose Arabic has it in localStorage. Honouring that
// now would drop them into the very state we are holding back, so the stored
// value is only trusted while its language is enabled.
const storedLang = localStorage.getItem('mbx-lang');
let currentLang = isLangEnabled(storedLang) ? storedLang : ENABLED_LANGS[0];

export function initI18n() {
  applyLang(currentLang);

  // Fill dynamic year calculations
  applyDynamicYears();
}

export function setLang(lang) {
  if (!translations[lang] || !isLangEnabled(lang)) return;
  currentLang = lang;
  localStorage.setItem('mbx-lang', lang);
  applyLang(lang);

  // Re-apply dynamic years after language switch
  applyDynamicYears();
}

export function getLang() {
  return currentLang;
}

/**
 * Look up a single string in the current language.
 *
 * For content built in JS after load, where the usual [data-i18n] sweep has
 * already run. Set the attribute too and applyLang() will keep it in sync on
 * later language switches.
 */
export function t(key) {
  return translations[currentLang]?.[key] ?? '';
}

/**
 * Fills elements with [data-years-since="YYYY"] with the dynamic year count.
 * Example: <span data-years-since="2019"></span> → "6" (if current year is 2025)
 */
function applyDynamicYears() {
  const currentYear = new Date().getFullYear();
  document.querySelectorAll('[data-years-since]').forEach(el => {
    const startYear = parseInt(el.getAttribute('data-years-since'), 10);
    if (!isNaN(startYear)) {
      el.textContent = String(currentYear - startYear);
    }
  });
}

/**
 * Replace text content while preserving ONLY decorative child elements (icons).
 */
function setTextPreserveChildren(el, text) {
  if (text.includes('<')) {
    el.innerHTML = text;
    return;
  }

  const decorativeChildren = Array.from(el.children).filter(child => {
    const cls = child.className || '';
    return cls.includes('bi-') || cls.includes('btn-arrow') || cls.includes('about-role-highlight');
  });

  el.textContent = text;
  decorativeChildren.forEach(child => el.appendChild(child));
}

let pendingLangUpdate = null;

function applyLang(lang) {
  const t = translations[lang];
  if (!t) return;

  if (pendingLangUpdate) cancelAnimationFrame(pendingLangUpdate);

  pendingLangUpdate = requestAnimationFrame(() => {
    pendingLangUpdate = null;

    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.toggle('is-rtl', lang === 'ar');

    // Apply HTML translations
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      if (t[key]) {
        el.innerHTML = t[key];
      }
    });

    // Apply text translations — preserve icons and highlights
    document.querySelectorAll('[data-i18n]').forEach(el => {
      if (el.hasAttribute('data-i18n-html')) return;
      const key = el.getAttribute('data-i18n');
      if (t[key]) {
        setTextPreserveChildren(el, t[key]);
      }
    });

    // Update document title
    const titleEl = document.querySelector('title[data-i18n]');
    if (titleEl && t[titleEl.dataset.i18n]) {
      document.title = t[titleEl.dataset.i18n];
    }
  });
}
