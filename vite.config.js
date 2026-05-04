import { defineConfig } from 'vite';
import { resolve } from 'path';

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
        install: resolve(__dirname, 'install.html')
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
  }
}));
