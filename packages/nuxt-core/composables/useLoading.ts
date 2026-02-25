/**
 * 全域 Loading 狀態管理 Composable
 * 用於管理 API 請求或其他非同步操作的 Loading 狀態
 * 採用計數器模式：
 * - start(): 計數 +1
 * - finish(): 計數 -1
 * - isLoading: 當計數 > 0 時為 true
 */
export const useLoading = () => {
  // 使用 useState 讓狀態在全域共享 (取代 Pinia Store)
  const requestCount = useState<number>('loading_request_count', () => 0)

  /**
   * 是否正在 Loading
   */
  const isLoading = computed(() => requestCount.value > 0)

  /**
   * 開始 Loading (計數 +1)
   */
  const start = () => {
    requestCount.value++
  }

  /**
   * 結束 Loading (計數 -1)
   */
  const finish = () => {
    if (requestCount.value > 0) {
      requestCount.value--
    }
  }

  /**
   * 強制重置 Loading (歸零)
   * 用於發生例外或需要強制關閉時
   */
  const reset = () => {
    requestCount.value = 0
  }

  return {
    isLoading,
    start,
    finish,
    reset,
    count: computed(() => requestCount.value)
  }
}
