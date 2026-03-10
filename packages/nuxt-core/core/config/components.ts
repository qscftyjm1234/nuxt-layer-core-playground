import type { NuxtConfig } from 'nuxt/schema'

/**
 * 元件設定
 *
 * 控制 Vue 元件的自動註冊和命名規則
 */
export const componentsConfig: NuxtConfig['components'] = [
  // 基礎介面組件 (Interface Layer)
  { path: './components/uiInterface', pathPrefix: false, global: true },

  // 共用業務組件 (Business Layer)
  { path: './components/uiBusiness', pathPrefix: false, global: true },

  // 版面框架組件 (Layout Layer)
  { path: './components/layout', pathPrefix: false, global: true },

  // 驗證相關組件
  { path: './components/auth', pathPrefix: false, global: true },

  // 其他範本組件
  { path: './components/templates', pathPrefix: false, global: true }
]
