import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ command }) => ({
  root: '.',

  // base URL for production deploy (GitHub Pages subdirectory)
  // empty during dev so localhost works at /
  base: command === 'build' ? '/mbiXsite/' : '/',

  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main:    resolve(__dirname, 'index.html'),
        about:   resolve(__dirname, 'about.html'),
        install: resolve(__dirname, 'install.html')
      }
    }
  },

  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: [
          'import',
          'global-builtin',
          'color-functions',
          'if-function'
        ]
      }
    }
  }
}));