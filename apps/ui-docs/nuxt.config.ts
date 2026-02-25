import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  alias: {
    '~/components/uiBusiness': resolve('../../packages/nuxt-core/components/uiBusiness'),
    '@/components/uiBusiness': resolve('../../packages/nuxt-core/components/uiBusiness'),
    '~/components/uiInterface': resolve('../../packages/nuxt-core/components/uiInterface'),
    '@/components/uiInterface': resolve('../../packages/nuxt-core/components/uiInterface'),
    '~/stores': resolve('../../packages/nuxt-core/stores'),
    '@/stores': resolve('../../packages/nuxt-core/stores'),
    '~/composables': resolve('../../packages/nuxt-core/composables'),
    '@/composables': resolve('../../packages/nuxt-core/composables'),
    '~/utils/security': resolve('../../packages/nuxt-core/utils/security'),
    '@/utils/security': resolve('../../packages/nuxt-core/utils/security'),
    '@/core': resolve('../../packages/nuxt-core/core')
  },

  compatibilityDate: '2024-04-03',

  // 擴展 Core Layer
  extends: ['../../packages/nuxt-core'],

  // Enable global component registration for dynamic rendering in Showcase
  // Enable global component registration for dynamic rendering in Showcase
  components: [
    {
      path: resolve('../../packages/nuxt-core/components/uiInterface'),
      global: true
    },
    {
      path: resolve('../../packages/nuxt-core/components/uiBusiness'),
      global: true
    },
    // Include local components if needed
    '~/components'
  ],

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
    typeCheck: false,
    tsConfig: {
      extends: '../../../tsconfig.base.json'
    }
  },

  // 開發工具
  devtools: { enabled: true },

  hooks: {
    // 註冊 Showcase 模組頁面
    async 'pages:extend'(pages) {
      const { scanModulePages } = await import('./scanner.mjs')
      const { createResolver } = await import('@nuxt/kit')
      const { resolve } = createResolver(import.meta.url)
      
      // 掃描 modules/showcase/pages
      scanModulePages(pages, ['showcase'], resolve('./'))
    }
  }
})
