import type { NuxtConfig } from 'nuxt/schema'

/**
 * 元件設定
 *
 * 控制 Vue 元件的自動註冊和命名規則
 *
 * @example
 * ```typescript
 * // components/user/Profile.vue → <Profile />（去掉路徑前綴）
 * // components/form/Input.vue → <FormInput />（強制加上 Form 前綴）
 * ```
 *
 * @see https://nuxt.com/docs/api/nuxt-config#components
 */
export const componentsConfig: NuxtConfig['components'] = [
  /**
   * 一般元件：去掉路徑前綴
   *
   * 讓 `components/user/Profile.vue` 變成 `<Profile />` 而不是 `<UserProfile />`
   *
   * 優點：名稱簡短
   * 缺點：需注意不同資料夾下的同名檔案衝突
   */
  { path: './components', pathPrefix: false }

  /**
   * 表單元件：強制加上 Form 前綴
   *
   * 讓 `components/form/Input.vue` 變成 `<FormInput />`
   *
   * 優點：避免與 HTML 原生標籤衝突，且語意明確
   */
  // { path: '~/components/form/', prefix: 'Form' }
]
