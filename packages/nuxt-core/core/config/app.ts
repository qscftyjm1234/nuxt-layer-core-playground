import type { NuxtConfig } from 'nuxt/schema'

/**
 * App 標題與基礎 Meta 設定 (預設值)
 *
 * 注意：這裡只放底層預設值。
 * 實際專案設定會由 nuxt.config.ts 從 JSON 讀取並覆寫於此。
 */
export const appConfig: NuxtConfig['app'] = {
  head: {
    /** 網頁標題 - 顯示在瀏覽器分頁上 */
    title: 'Nuxt 3 Development Kit',

    /** 標題模板 */
    titleTemplate: '%s - Nuxt 3 Kit',

    /** HTML 語言屬性 */
    htmlAttrs: {
      lang: 'zh-TW'
    },

    // Meta 標籤
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: 'description',
        content: 'Enterprise-grade Nuxt 3 Development Kit'
      },
      { name: 'author', content: 'Softleader' },
      { name: 'robots', content: 'index, follow' },
      { name: 'format-detection', content: 'telephone=no' }
    ],

    // 網站圖示
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  }
}
