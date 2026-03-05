import type { NuxtConfig } from 'nuxt/schema'
import { productConfig } from '../../scripts/product-loader'

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
  compressPublicAssets: productConfig.build?.compress ?? true,

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
   * 優先讀取 configs/*.json 中的 network.proxy 設定
   */
  devProxy: {
    ...(productConfig.network?.proxy || {}),
    // 備援：如果 JSON 沒設，才看環境變數
    ...(Object.keys(productConfig.network?.proxy || {}).length === 0
      ? {
          '/api': {
            target: process.env.NUXT_PROXY_TARGET || 'http://localhost:8080',
            changeOrigin: true
          }
        }
      : {})
  }
}
