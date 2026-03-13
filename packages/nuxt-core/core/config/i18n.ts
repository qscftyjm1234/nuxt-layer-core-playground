import { productConfig } from '../../scripts/product-loader'

/**
 * i18n 國際化設定
 *
 * 使用 @nuxtjs/i18n 模組進行多語言管理
 * - 支援英文 (en) 與繁體中文 (zh)
 * - 預設語言讀取自 configs/*.json (meta.lang)
 * - 自動偵測瀏覽器語言
 */
export const i18nConfig = {
  /**
   * 支援的語言清單
   */
  locales: [
    {
      code: 'en',
      name: 'English',
      iso: 'en-US',
      file: 'en-US.json'
    },
    {
      code: 'zh',
      name: '中文',
      iso: 'zh-TW',
      file: 'zh-TW.json'
    }
  ],

  /**
   * 預設語言 (由藍圖驅動)
   */
  defaultLocale: productConfig.meta?.lang?.split('-')[0] || 'zh',

  /**
   * 語言檔存放目錄
   */
  langDir: 'locales/',

  /**
   * 路由策略
   * prefix_except_default: 預設語言不加前綴，其他語言加前綴
   */
  strategy: 'no_prefix',

  /**
   * 瀏覽器語言偵測設定
   */
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: 'i18n_redirected',
    redirectOn: 'root' // 只在根目錄偵測並重定向
  }
}
