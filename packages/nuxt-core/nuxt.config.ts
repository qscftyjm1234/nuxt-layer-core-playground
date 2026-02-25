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

const { resolve } = createResolver(import.meta.url)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  compatibilityDate: "2024-04-03",

  /** 編譯與打包設定 */
  build: buildConfig,

  /** 標題與預設 meta */
  app: appConfig,

  /** 全域 CSS */
  css: Array.isArray(cssConfig) ? (cssConfig as any[]).map(p => resolve(p)) : [],

  /** Nuxt 模組 */
  modules: modulesConfig,

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

  /** 執行階段設定 (Runtime Config) */
  runtimeConfig: projectRuntimeConfig as any,

  /** 路由規則與安全性 Header */
  routeRules: securityConfig,

  /** TypeScript 設定 */
  typescript: {
    ...typescriptConfig,
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
      const enabledModules = productConfig.modules || []
      const modulesDir = resolve('./modules')
      
      // 只有當 packages/nuxt-core/modules 目錄存在且有對應模組時才掃描
      // 避免 Extended App (如 ui-docs) 繼承此 hook 時報錯
      if (fs.existsSync(modulesDir)) {
        scanModulePages(pages, enabledModules, resolve('.'))
      }
    }
  },

  experimental: {
    appManifest: false
  },

  devtools: { enabled: true },
} as any);
