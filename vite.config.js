import { defineConfig } from 'vite';
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';
import linksData from './src/data/links.json' with { type: 'json' };

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
        subscription: resolve(__dirname, 'subscription.html')
      },
      output: {
        manualChunks: {
          bootstrap: ['bootstrap'],
          gsap: ['gsap']
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
    include: ['bootstrap', 'gsap']
  },
  server: {
    port: 3000,
    open: true
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/partials'),
      context(pagePath) {
        // Default context for all pages
        const isIndex = pagePath.includes('index.html') && !pagePath.includes('about') && !pagePath.includes('install') && !pagePath.includes('subscription');
        const isAbout = pagePath.includes('about');
        const isInstall = pagePath.includes('install');
        const isSubscription = pagePath.includes('subscription');

        // Read page URLs from links.json (single source of truth)
        const pages = linksData.pages || {};

        return {
          // Navbar theme
          navbarTheme: isInstall ? 'navbar-mbx-light' : 'navbar-dark navbar-mbx',

          // Active states
          activeHome: isIndex ? ' active' : '',
          activeInstall: isInstall ? ' active' : '',
          activeAbout: isAbout ? ' active' : '',
          activeSubscription: isSubscription ? ' active' : '',

          // Page URLs from links.json (single source of truth)
          homeUrl:    pages.home    || 'index.html',
          installUrl: pages.install || 'install.html',
          aboutUrl:   pages.about   || 'about.html',
          subscriptionUrl: pages.subscription || 'subscription.html',
        };
      }
    })
  ]
}));
