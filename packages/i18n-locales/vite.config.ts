import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: './lib/index.ts',
      fileName: 'i18n-locales',
      formats: ['cjs', 'es']
    }
  }
})
