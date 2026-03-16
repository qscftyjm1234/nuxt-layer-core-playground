// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['softleader-nuxt-core'],
  /** 支援配置驅動：監控 JSON 變動並自動重啟伺服器 (即改即變) */
  watch: ['configs/*.json', 'configs/**/*.json'],
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true }
})
