import type { NuxtConfig } from 'nuxt/schema'
import vuetify from 'vite-plugin-vuetify'
import { productConfig } from '../../scripts/product-loader'

/**
 * Vite 設定
 *
 * 控制 Vite 建置工具的行為
 *
 * @see https://nuxt.com/docs/api/nuxt-config#vite
 */
export const viteConfig: NuxtConfig['vite'] = {
  /**
   * 預熱常用檔案
   *
   * 在開發模式下預先載入這些檔案，加速首次訪問
   */
  // warmup: {
  //   clientFiles: ['./app.vue', './pages/**/*.vue']
  // },
  // 移除 SCSS modern-compiler 設定（Nuxt 3 不支援）

  plugins: [vuetify({ autoImport: true })],

  /**
   * 依賴優化設定
   * 強制 Vite 預先構建這些套件，避免 HMR Runtime 錯誤
   */
  optimizeDeps: {
    include: ['dayjs', 'lodash.clonedeep', 'vuetify', ...(productConfig.build?.optimizeDeps || [])]
  }
}
