import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  clean: true,
  declaration: true,
  outDir: 'lib',
  entries: [
    {
      name: 'index',
      input: 'src/index'
    },
    {
      name: 'locales',
      input: 'src/locales'
    }
  ],
  rollup: {
    emitCJS: true
  },
  externals: ['vite']
})