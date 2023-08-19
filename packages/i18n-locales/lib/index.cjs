'use strict';

const fs = require('fs');
const path = require('path');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e.default : e; }

const fs__default = /*#__PURE__*/_interopDefaultCompat(fs);
const path__default = /*#__PURE__*/_interopDefaultCompat(path);

const i18nLocalesPlugin = (opts) => {
  const baseDir = path__default.normalize(opts.dir);
  if (!fs__default.existsSync(baseDir))
    throw new Error(`[i18n-locales] Dir(${opts.dir}) is not exists`);
  const virtualModuleIds = ["ddr-i18n-locales/locales", "ddr-i18n-locales/lib/locales"];
  const resolvedVirtualModuleId = "\0ddr-i18n-locales/locales";
  const readFiles = (dirPath) => {
    const result = {};
    const items = fs__default.readdirSync(dirPath).sort();
    for (const item of items) {
      const itemPath = path__default.join(dirPath, item);
      let itemData = {};
      if (fs__default.statSync(itemPath).isDirectory()) {
        itemData = readFiles(itemPath);
      } else {
        const content = fs__default.readFileSync(itemPath).toString();
        try {
          itemData = JSON.parse(content);
        } catch (err) {
        }
      }
      Object.assign(result, {}, itemData);
    }
    return result;
  };
  return {
    name: "i18n-locales",
    enforce: "pre",
    resolveId(id) {
      if (virtualModuleIds.includes(id))
        return resolvedVirtualModuleId;
    },
    load(id) {
      if (id !== resolvedVirtualModuleId)
        return;
      const messages = {};
      const dirs = fs__default.readdirSync(baseDir);
      for (const dir of dirs) {
        const itemPath = path__default.join(baseDir, dir);
        if (!fs__default.statSync(itemPath).isDirectory())
          continue;
        if (!messages[dir])
          messages[dir] = {};
        const temp = readFiles(itemPath);
        Object.assign(messages[dir], {}, temp);
      }
      return { code: `export default ${JSON.stringify(messages)}` };
    },
    async handleHotUpdate({ file, server }) {
      if (/\.(json5?)$/.test(file)) {
        const module = server.moduleGraph.getModuleById(resolvedVirtualModuleId);
        if (module) {
          server.moduleGraph.invalidateModule(module);
          return [module];
        }
      }
    }
  };
};

module.exports = i18nLocalesPlugin;
