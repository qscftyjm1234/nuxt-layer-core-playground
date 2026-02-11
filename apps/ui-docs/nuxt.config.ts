// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',

  // 擴展 Core Layer
  extends: ['../../packages/nuxt-core'],

  // 覆寫 Runtime 配置
  runtimeConfig: {
    public: {
      appName: 'UI Documentation',
      appType: 'ui-docs'
    }
  },

  // TypeScript
  typescript: {
    strict: true,
    typeCheck: true
  },

  // 開發工具
  devtools: { enabled: true }
})
