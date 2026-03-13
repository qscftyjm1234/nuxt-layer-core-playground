/**
 * 核心邏輯模組入口 (Centralized Logic Modules Entry)
 * 提供專案規範中要求的核心 Composable。
 */
export function useModules() {
  return {
    /** 分頁管理 */
    usePagination,
    /** API 請求 */
    useApi,
    /** 檔案下載 */
    useFileDownload,
    /** 檔案上傳 */
    useFileUpload,
    /** 資料驗證 */
    useValidation
  }
}
