import repositories from '../repositories'

// 取得 repositories 的型別
// typeof repositories 會自動推斷出 { user: ..., order: ... } 的結構
type Repositories = typeof repositories

/**
 * 擴充 Nuxt 的型別定義 (Module Augmentation)
 * 告訴 TypeScript：我們的 NuxtApp 裡面多了一個 $api 屬性
 */
declare module '#app' {
  interface NuxtApp {
    $api: Repositories
  }
}

/**
 * 擴充 Vue 的型別定義
 * 告訴 TypeScript：在 Vue Template 或 this.$api (Options API) 也可以用
 */
declare module 'vue' {
  interface ComponentCustomProperties {
    $api: Repositories
  }
}

export {}
