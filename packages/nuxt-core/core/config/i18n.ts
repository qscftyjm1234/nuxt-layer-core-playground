/**
 * i18n 國際化設定
 *
 * 使用 @nuxtjs/i18n 模組進行多語言管理
 * - 支援英文 (en) 與繁體中文 (zh)
 * - 預設語言為繁體中文
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
      iso: 'en-US', // ISO 語言代碼 (Language Code) + 地區代碼 (Country Code)
      file: 'en-US.json' // 對應檔案路徑：i18n/locales/en-US.json
    },
    {
      code: 'zh',
      name: '中文',
      iso: 'zh-TW', // ISO 語言代碼 (Language Code) + 地區代碼 (Country Code)
      file: 'zh-TW.json' // 對應檔案路徑：i18n/locales/zh-TW.json
    }
  ],

  /**
   * 預設語言
   */
  defaultLocale: 'zh',

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
