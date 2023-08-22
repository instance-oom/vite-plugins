import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import i18nLocalesPlugin from 'ddr-i18n-locales';
import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    i18nLocalesPlugin({ dir: path.resolve(__dirname, './src/locales'), flatKey: true }),
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
