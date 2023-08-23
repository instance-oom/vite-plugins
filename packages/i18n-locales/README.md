## 💿 Installation

```sh
npm i @instance-oom/i18n-locales
```

```ts
// vite.config.ts
import i18nLocalesPlugin from '@instance-oom/i18n-locales';

export default defineConfig({
  plugins: [
    i18nLocalesPlugin({ dir: path.resolve(__dirname, './src/locales') }),
    vue()
  ],
})
```

```ts
// xxx.ts
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
/*
 * All i18n resources specified in the plugin `include` option can be loaded
 * at once using the import syntax
 */
import locales from '@instance-oom/i18n-locales/locales';

const i18n = createI18n({
  locale: 'en',
  messages: locales
})

const app = createApp()
app.use(i18n).mount('#app')
```