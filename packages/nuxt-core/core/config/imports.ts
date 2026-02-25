import type { NuxtConfig } from 'nuxt/schema'

/**
 * 自動引入設定
 *
 * 控制哪些資料夾下的檔案可以自動引入，不需要手動 import
 *
 * @example
 * ```typescript
 * // utils/global/formatDate.ts
 * export function formatDate(date) { ... }
 *
 * // 在任何檔案中直接使用，不用 import
 * formatDate(new Date())  // ✅ 自動可用
 * ```
 *
 * @see https://nuxt.com/docs/api/nuxt-config#imports
 */
export const importsConfig: NuxtConfig['imports'] = {
  /**
   * 自動引入的資料夾清單
   *
   * - `utils/global`：全域工具，自動引入（無需 import）
   * - `utils` 根目錄：Nuxt 預設強制自動引入
   * - `utils/xxx`（子目錄）：預設不會引入，需手動 import
   */
  dirs: ['utils/global', 'stores']
}
