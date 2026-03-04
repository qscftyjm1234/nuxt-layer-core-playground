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
      // 當前執行環境
      env: process.env.NODE_ENV,
      /** App 識別字串 */
      uaIdentifier: process.env.NUXT_PUBLIC_APP_UA_IDENTIFIER || 'DefaultApp'
    },

    // API 連線相關設定
    api: {
      baseUrl: process.env.VITE_API_BASE_URL,
      timeout: Number(process.env.VITE_API_TIMEOUT) || 30000,
      retry: Number(process.env.VITE_API_RETRY_COUNT) || 0,
      globalLoading: true
    },

    // 身分認證相關設定
    auth: {
      tokenKey: 'auth_token',
      maxAge: 60 * 60 * 24 * 7
    },

    // Mock API 開關
    featureApiMock: false
  }
}
