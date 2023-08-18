import fs from 'fs';
import path from 'path';
const i18nLocalesPlugin = (opts) => {
    const baseDir = path.normalize(opts.dir);
    if (!fs.existsSync(baseDir))
        throw new Error(`[i18n-locales] Dir(${opts.dir}) is not exists`);
    const virtualModuleId = '@i-oom/vite-plugins/i18n-locales/locales';
    const resolvedVirtualModuleId = '\0' + virtualModuleId;
    const readFiles = (dirPath) => {
        const result = {};
        const items = fs.readdirSync(dirPath).sort();
        for (const item of items) {
            const itemPath = path.join(dirPath, item);
            let itemData = {};
            if (fs.statSync(itemPath).isDirectory()) {
                itemData = readFiles(itemPath);
            }
            else {
                const content = fs.readFileSync(itemPath).toString();
                try {
                    itemData = JSON.parse(content);
                }
                catch (err) { /*ignore*/ }
            }
            Object.assign(result, {}, itemData);
        }
        return result;
    };
    return {
        name: 'i18n-locales',
        resolveId(id) { if (id === virtualModuleId)
            return resolvedVirtualModuleId; },
        load(id) {
            if (id !== resolvedVirtualModuleId)
                return;
            const messages = {};
            const dirs = fs.readdirSync(baseDir);
            for (const dir of dirs) {
                const itemPath = path.join(baseDir, dir);
                if (!fs.statSync(itemPath).isDirectory())
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
export default i18nLocalesPlugin;
