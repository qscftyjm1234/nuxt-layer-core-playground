/**
 * useErrorHandler - 全域錯誤處理
 * 提供錯誤捕捉、分類、記錄和重試機制
 */

import type { FetchContext } from 'ofetch'

export interface ErrorRecord {
  /** 錯誤 ID */
  id: string
  /** 錯誤類型 */
  type: 'api' | 'system' | 'business' | 'network' | 'unknown'
  /** 錯誤訊息 */
  message: string
  /** 原始錯誤 */
  error?: Error
  /** 錯誤上下文 */
  context?: Record<string, any>
  /** 時間戳記 */
  timestamp: Date
}

export interface RetryOptions {
  /** 最大重試次數 */
  maxRetries?: number
  /** 重試延遲（毫秒） */
  delay?: number
  /** 延遲倍數（指數退避） */
  backoff?: number
}

export interface UseErrorHandlerReturn {
  /** 捕捉錯誤 */
  captureError: (error: Error, context?: Record<string, any>) => void
  /** 處理 API 錯誤 */
  handleApiError: (context: FetchContext, autoNotify?: boolean) => void
  /** 顯示錯誤訊息 */
  showError: (message: string) => void
  /** 錯誤重試 */
  retry: <T>(fn: () => Promise<T>, options?: RetryOptions) => Promise<T>
  /** 錯誤歷史 */
  errors: Ref<ErrorRecord[]>
  /** 清除錯誤 */
  clearErrors: () => void
}

// 全域錯誤儲存
const errors = ref<ErrorRecord[]>([])

/**
 * 錯誤處理 Composable
 * @returns 錯誤處理方法和狀態
 */
export function useErrorHandler(): UseErrorHandlerReturn {
  /**
   * 生成唯一 ID
   * @returns 唯一 ID
   */
  const generateId = (): string =>
    `error-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`

  /**
   * 判斷錯誤類型
   * @param error - 錯誤物件
   * @param context - 錯誤上下文
   * @returns 錯誤類型
   */
  const getErrorType = (error: Error, context?: Record<string, any>): ErrorRecord['type'] => {
    if (context?.type) {
      return context.type
    }

    if (error.message.includes('fetch') || error.message.includes('network')) {
      return 'network'
    }

    if (error.message.includes('API')) {
      return 'api'
    }

    return 'unknown'
  }

  /**
   * 捕捉錯誤
   * @param error - 錯誤物件
   * @param context - 錯誤上下文
   */
  const captureError = (error: Error, context?: Record<string, any>): void => {
    const record: ErrorRecord = {
      id: generateId(),
      type: getErrorType(error, context),
      message: error.message,
      error,
      context,
      timestamp: new Date()
    }

    // 儲存到錯誤歷史
    errors.value.push(record)

    // 限制錯誤數量（保留最新 100 筆）
    if (errors.value.length > 100) {
      errors.value.shift()
    }

    // 記錄到 console
    console.error(error.message, {
      type: record.type,
      context,
      stack: error.stack
    })

    // 生產環境：可以送到錯誤追蹤服務（如 Sentry）
    // if (import.meta.prod) {
    //   Sentry.captureException(error, { extra: context })
    // }
  }

  /**
   * 處理 API 錯誤
   * @param context - ofetch 錯誤上下文
   * @param autoNotify - 是否自動顯示通知
   */
  const handleApiError = (context: FetchContext, autoNotify: boolean = true): void => {
    const { response } = context
    const status = response?.status

    // 建立錯誤物件
    const error = new Error(`API Error: ${status}`)

    // 捕捉錯誤
    captureError(error, {
      type: 'api',
      status,
      url: context.request,
      response: response?._data
    })

    // 自動顯示錯誤訊息
    if (autoNotify) {
      const msg = response?._data?.message || `請求失敗 (${status})`
      showError(msg)
    }

    // 根據狀態碼做不同處理
    switch (status) {
      case 401:
        console.warn('401 Unauthorized - 請重新登入')
        // TODO: 執行登出邏輯或導向登入頁
        break

      case 403:
        console.warn('403 Forbidden - 權限不足')
        break

      case 404:
        console.warn('404 Not Found - 找不到資源')
        break

      case 500:
        console.error('500 Internal Server Error - 伺服器出錯')
        break

      default:
        console.error(`${status} - 未知錯誤`, response?.statusText)
    }
  }

  /**
   * 顯示錯誤訊息
   * @param message - 錯誤訊息
   */
  const showError = (message: string): void => {
    const { error } = useNotify()
    error(message)
  }

  /**
   * 錯誤重試
   * @param fn - 要執行的函數
   * @param options - 重試選項
   * @returns Promise
   */
  const retry = async <T>(fn: () => Promise<T>, options: RetryOptions = {}): Promise<T> => {
    const { maxRetries = 3, delay = 1000, backoff = 2 } = options

    let lastError: Error | undefined

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        console.debug(`Retry attempt ${attempt + 1}/${maxRetries + 1}`)
        return await fn()
      } catch (error) {
        lastError = error as Error
        console.warn(`Attempt ${attempt + 1} failed`, { error: lastError.message })

        // 如果還有重試次數，等待後重試
        if (attempt < maxRetries) {
          const waitTime = delay * Math.pow(backoff, attempt)
          console.debug(`Waiting ${waitTime}ms before retry`)
          await new Promise((resolve) => setTimeout(resolve, waitTime))
        }
      }
    }

    // 所有重試都失敗
    console.error('All retry attempts failed', { error: lastError })
    throw lastError
  }

  /**
   * 清除錯誤
   */
  const clearErrors = (): void => {
    console.info('Errors cleared')
  }

  return {
    captureError,
    handleApiError,
    showError,
    retry,
    errors,
    clearErrors
  }
}
