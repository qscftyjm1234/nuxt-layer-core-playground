import type { FetchContext } from 'ofetch'

/**
 * 處理 API 錯誤的統一入口
 * 這裡集中管理所有 HTTP 錯誤狀態碼的邏輯
 *
 * @param context - ofetch 的錯誤上下文
 * @param autoError - 是否自動顯示錯誤訊息
 */
export const handleApiError = (context: FetchContext, autoError: boolean = true) => {
  // 使用 useErrorHandler 來處理錯誤
  const { handleApiError: handleError } = useErrorHandler()

  // 呼叫 useErrorHandler 的 API 錯誤處理
  handleError(context, autoError)
}
