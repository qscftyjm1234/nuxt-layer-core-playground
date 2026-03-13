// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',

  // 擴展 Core Layer
  extends: ['softleader-nuxt-core'],

  // 覆寫 Runtime 配置
  runtimeConfig: {
    public: {
      appName: '松凌科技前端開發包',
      appType: 'playground'
    }
  },

  // TypeScript
  typescript: {
    strict: true,
    typeCheck: false,
    tsConfig: {
      extends: '../../../tsconfig.base.json'
    }
  },

  // 開發工具
  devtools: { enabled: true }
})
