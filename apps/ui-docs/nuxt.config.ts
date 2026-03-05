export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',

  // 1. 繼承核心層
  extends: ['../../packages/nuxt-core'],

  // 2. 註冊模組
  modules: ['@nuxt/content', '@nuxt/fonts'],

  // 3. 配置 Content (MDC 支援在 Markdown 中渲染組件)
  content: {
    highlight: {
      theme: 'github-dark'
    }
  },

  // 4. 樣式配置
  css: ['~/assets/css/main.css'],

  // 5. 字體配置
  fonts: {
    families: [
      { name: 'Inter', provider: 'google' },
      { name: 'Outfit', provider: 'google' }
    ]
  },

  // 6. 全域組件註冊 (為了讓 Content 可以直接讀取核心組件)
  components: {
    global: true,
    dirs: ['~/components']
  },

  devtools: { enabled: true },

  vite: {
    vue: {
      template: {
        transformAssetUrls: {
          'v-img': ['src'],
          'v-parallax': ['src'],
          'v-card': ['src'],
          'v-avatar': ['src']
        }
      }
    }
  }
})
