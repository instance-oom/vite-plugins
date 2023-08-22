import { Plugin } from 'vite';

declare const i18nLocalesPlugin: (opts: {
    dir: string;
    flatKey?: boolean;
}) => Plugin;

export { i18nLocalesPlugin as default };
