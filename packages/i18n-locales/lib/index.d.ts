import { Plugin } from 'vite';

declare const i18nLocalesPlugin: (opts: {
    dir: string;
}) => Plugin;

export { i18nLocalesPlugin as default };
