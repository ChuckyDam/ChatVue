/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />
declare module '*.vue';

interface ImportMetaEnv {
  readonly VITE_URL_SITE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
