/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />

interface ImportMetaEnv {
  readonly VITE_URL_SITE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
