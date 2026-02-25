import type { NuxtConfig } from 'nuxt/schema'

/**
 * Nitro 伺服器設定檔案
 *
 * 主要用途：
 * - 關於伺服器引擎的相關設定
 * - 部署相關設定 (Deployment)
 * - 輸出資源壓縮優化 (Compression)
 *
 * @see https://nitro.unjs.io/config
 */
export const nitroConfig: NuxtConfig['nitro'] = {
  /**
   * 壓縮 Public Assets
   *
   * 開啟後，Nuxt 會在建置時自動產生 .gz 與 .br 壓縮檔
   * 有助於減少傳輸流量並提升載入速度
   */
  compressPublicAssets: true,

  typescript: {
    tsConfig: {
      compilerOptions: {
        composite: true,
        emitDeclarationOnly: true,
        noEmit: false
      }
    }
  },

  /**
   * 開發環境代理 (Development Proxy)
   *
   * 僅在 `npm run dev` 模式下生效
   * 用於解決本機開發時的 CORS 跨域問題，或將 API 請求轉發到後端測試主機
   *
   * @example
   * devProxy: {
   *   '/api': {
   *     target: 'https://dev-api.example.com',
   *     changeOrigin: true,
   *   }
   * }
   */
  devProxy: {
    '/api': {
      target: process.env.NUXT_PROXY_TARGET || 'http://localhost:8080',
      changeOrigin: true
    }
  }
}
