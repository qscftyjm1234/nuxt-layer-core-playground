// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",

  // 啟用自動導入
  components: true,
  imports: {
    autoImport: true,
  },

  // CSS 配置
  css: ["./styles/main.css"],

  // Runtime 配置
  runtimeConfig: {
    public: {
      appName: "Nuxt Core",
      apiTimeout: 30000,
    },
  },

  // TypeScript 配置
  typescript: {
    strict: true,
    typeCheck: true,
  },

  // 開發工具
  devtools: { enabled: true },
});
