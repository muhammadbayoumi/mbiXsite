import { defineConfig } from 'vite';
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig(({ command }) => ({
  root: '.',
  base: command === 'build' ? '/mbiXsite/' : '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main:    resolve(__dirname, 'index.html'),
        about:   resolve(__dirname, 'about.html'),
        install: resolve(__dirname, 'install.html'),
        newsletter: resolve(__dirname, 'join-newsletter.html'),
        help:    resolve(__dirname, 'help-center.html'),
        scrapex:        resolve(__dirname, 'scrapex-install.html'),
        scrapexPrivacy: resolve(__dirname, 'scrapex-privacy.html'),
        scrapexSupport: resolve(__dirname, 'scrapex-support.html')
      },
      output: {
        manualChunks: {
          bootstrap: ['bootstrap']
        }
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        silenceDeprecations: ['import', 'global-builtin', 'color-functions', 'if-function']
      }
    },
    devSourcemap: true
  },
  optimizeDeps: {
    include: ['bootstrap']
  },
  server: {
    port: 3000,
    open: true
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/partials'),
      context(pagePath) {
        // Default context for all pages.
        // ScrapeX is tested first and excluded from the others: its install
        // page's filename contains "install", which would otherwise light up
        // the add-in's nav item and switch the navbar to the install theme.
        const isScrapex = pagePath.includes('scrapex');
        const isIndex = pagePath.includes('index.html');
        const isAbout = pagePath.includes('about');
        const isInstall = !isScrapex && pagePath.includes('install');
        const isNewsletter = pagePath.includes('newsletter');
        const isHelp = !isScrapex && pagePath.includes('help');

        return {
          // Navbar theme
          navbarTheme: isInstall ? 'navbar-mbx-install' : 'navbar-dark navbar-mbx',

          // Active states
          activeHome: isIndex ? ' active' : '',
          activeInstall: isInstall ? ' active' : '',
          activeAbout: isAbout ? ' active' : '',
          activeNewsletter: isNewsletter ? ' active' : '',
          activeHelp: isHelp ? ' active' : '',
          activeScrapex: isScrapex ? ' active' : '',

          // Page URLs
          homeUrl:    'index.html',
          installUrl: 'install.html',
          aboutUrl:   'about.html',
          newsletterUrl: 'join-newsletter.html',
          helpUrl:    'help-center.html',
          scrapexUrl:        'scrapex-install.html',
          scrapexPrivacyUrl: 'scrapex-privacy.html',
          scrapexSupportUrl: 'scrapex-support.html',
        };
      }
    })
  ]
}));
