import fs from 'node:fs'
import { createResolver } from '@nuxt/kit'
import { scanModulePages } from './router/routes-scanner'
import { productConfig } from './scripts/product-loader'
import { runtimeConfig as projectRuntimeConfig } from './core/config/runtime'
import { i18nConfig } from './core/config/i18n'
import { appConfig } from './core/config/app'
import { securityConfig } from './core/config/security'
import { buildConfig } from './core/config/build'
import { importsConfig } from './core/config/imports'
import { componentsConfig } from './core/config/components'
import { modulesConfig } from './core/config/modules'
import { cssConfig } from './core/config/css'
import { typescriptConfig } from './core/config/typescript'
import { viteConfig } from './core/config/vite'
import { nitroConfig } from './core/config/nitro'
import optionsScanner from './modules/options-scanner'
import repositoriesScanner from './modules/repositories-scanner'

const { resolve } = createResolver(import.meta.url)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  compatibilityDate: '2024-04-03',

  /** 編譯與打包設定 */
  build: buildConfig,

  /** 標題與預設 meta */
  app: appConfig,

  /** 全域 CSS */
  css: Array.isArray(cssConfig) ? (cssConfig as any[]).map((p) => resolve(p)) : [],

  /** Nuxt 模組 */
  modules: [...(modulesConfig || []), optionsScanner, repositoriesScanner],

  /** i18n 設定 */
  i18n: (modulesConfig?.includes('@nuxtjs/i18n') ? i18nConfig : undefined) as any,

  /** 自動導入設定 */
  imports: importsConfig,

  /** 元件自動註冊 */
  components: Array.isArray(componentsConfig)
    ? componentsConfig.map((c: any) => {
        if (typeof c === 'object' && c.path) {
          return { ...c, path: resolve(c.path) }
        }
        return c
      })
    : componentsConfig,

  /** 執行階段設定 (Runtime Config) - 系統連線與環境參數 */
  runtimeConfig: {
    ...projectRuntimeConfig,
    public: {
      ...projectRuntimeConfig.public,
      app: {
        ...projectRuntimeConfig.public.app,
        uaIdentifier:
          projectRuntimeConfig.public.app.uaIdentifier || productConfig.branding?.uaIdentifier
      },
      // 將 JSON 裡的網路設定同步到 runtimeConfig (環境變數優先)
      api: {
        ...projectRuntimeConfig.public.api,
        baseUrl: projectRuntimeConfig.public.api.baseUrl || productConfig.network?.apiBaseUrl,
        timeout: projectRuntimeConfig.public.api.timeout || productConfig.network?.timeout,
        retry: projectRuntimeConfig.public.api.retry || productConfig.network?.retry,
        globalLoading:
          productConfig.layout?.header?.globalLoading ??
          projectRuntimeConfig.public.api.globalLoading
      },
      // 將 JSON 裡的驗證設定同步到 runtimeConfig
      auth: {
        ...projectRuntimeConfig.public.auth,
        tokenKey: projectRuntimeConfig.public.auth.tokenKey || productConfig.auth?.tokenKey,
        maxAge: projectRuntimeConfig.public.auth.maxAge || productConfig.auth?.maxAge
      },
      // Mock API 開關
      featureApiMock: productConfig.features?.mockApi ?? projectRuntimeConfig.public.featureApiMock
    }
  } as any,

  /** 橋接產品設定至 appConfig (視覺顯示與 UI 開關) */
  appConfig: {
    core: {
      ...productConfig,
      meta: {
        ...productConfig.meta,
        titleTemplate: productConfig.meta?.titleTemplate,
        favicon: productConfig.meta?.favicon
      },
      // 確保 network 映射正確 (包含 Timeout/Retry)
      network: {
        apiBaseUrl: productConfig.network?.apiBaseUrl,
        timeout: productConfig.network?.timeout,
        retry: productConfig.network?.retry,
        proxy: productConfig.network?.proxy
      }
    }
  },

  /** 路由規則與安全性 Header */
  routeRules: securityConfig,

  /** TypeScript 設定 */
  typescript: {
    ...typescriptConfig
    // tsConfig: {
    //   extends: '../../tsconfig.base.json'
    // }
  },

  /** Vite 建置優化 */
  vite: viteConfig,

  /** Nitro (Server) 優化 */
  nitro: nitroConfig,

  hooks: {
    // 動態掃描模組頁面
    async 'pages:extend'(pages: any[]) {
      const { resolve } = createResolver(import.meta.url)

      // 將 modules 物件轉換為啟用的字串陣列 ([key]: true)
      const modulesObj = productConfig.modules || {}
      const enabledModules = Object.entries(modulesObj)
        .filter(([_, enabled]) => enabled !== false)
        .map(([name]) => name)

      const modulesDir = resolve('./modules')

      if (fs.existsSync(modulesDir)) {
        scanModulePages(pages, enabledModules, resolve('.'))
      }
    }
  },

  experimental: {
    appManifest: false
  },

  devtools: { enabled: true }
} as any)
