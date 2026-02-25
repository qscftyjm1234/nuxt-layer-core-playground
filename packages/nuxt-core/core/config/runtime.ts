import { productConfig } from '../../scripts/product-loader'

/**
 * Runtime Configuration
 *
 * 這裡定義了所有的環境變數與設定值。
 * 結構分為 private (根層級) 和 public (public 屬性內)。
 */
export const runtimeConfig = {
  // --- 私密區 (Server Only) ---
  // npm run generate 私密區並無作用

  // --- 公開區 (Client & Server) ---
  public: {
    // 應用程式相關設定
    app: {
      // 當前執行環境 (development, production, test)
      env: process.env.NODE_ENV,

      /**

       * App 識別字串 (User-Agent)
       * 用於判斷網頁是否在 App 的 Webview 中開啟
       */
      uaIdentifier: process.env.NUXT_PUBLIC_APP_UA_IDENTIFIER || 'MyApp',

      /**
       * 產品設定檔注入
       * 將 YAML 讀取到的設定 (如 modules 列表) 注入到前端。
       * 這樣前端頁面也能知道目前啟用哪些模組，或讀取產品特定的 UI 設定。
       * 注意：這是 Build Time 決定的，Runtime 無法動態改變 YAML 內容。
       */
      productConfig
    },

    // 資安模式開關（預設關閉）
    enableSecurityMode: process.env.NUXT_PUBLIC_ENABLE_SECURITY_MODE === 'true',

    // API 連線相關設定
    api: {
      // API 伺服器的基礎路徑 (Base URL)
      baseUrl: process.env.VITE_API_BASE_URL,
      // 請求超時時間 (毫秒)，預設 30 秒
      timeout: Number(process.env.VITE_API_TIMEOUT) || 30000,
      // 請求失敗後的自動重試次數，預設 0 次 (不重試)
      retry: Number(process.env.VITE_API_RETRY_COUNT) || 0,
      // 是否預設開啟全域 Loading 條 (上方藍色進度條)
      globalLoading: true
    },

    // 身分認證相關設定
    auth: {
      // 儲存 Token 的 Cookie 名稱
      tokenKey: 'auth_token',
      // Token 的有效期限 (秒)，預設 7 天
      maxAge: 60 * 60 * 24 * 7
    },

    // Mock API 開關 (預設開啟以進行展示)
    featureApiMock: true
  }
}
