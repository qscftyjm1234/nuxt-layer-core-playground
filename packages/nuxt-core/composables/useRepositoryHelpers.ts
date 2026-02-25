/**
 * Repository Helper - 提供等待資料載入的工具函式
 */

/**
 * 等待 useFetch 資料載入完成
 *
 * @example
 * const { data, pending } = useRepository().dashboard.getStats()
 * await waitForData(pending)
 * console.log('資料已載入:', data.value)
 *
 * @param pending - useFetch 返回的 pending Ref
 * @param timeout - 超時時間（毫秒），預設 10 秒
 * @returns Promise
 */
export async function waitForData(pending: Ref<boolean>, timeout: number = 10000): Promise<void> {
  return new Promise((resolve, reject) => {
    // 如果已經載入完成，直接返回
    if (!pending.value) {
      resolve()
      return
    }

    // 監聽 pending 變化
    const unwatch = watch(pending, (isPending) => {
      if (!isPending) {
        unwatch()
        resolve()
      }
    })

    // 超時處理
    setTimeout(() => {
      unwatch()
      reject(new Error(`資料載入超時 (${timeout}ms)`))
    }, timeout)
  })
}

/**
 * 等待多個 API 資料都載入完成
 *
 * @example
 * const stats = useRepository().dashboard.getStats()
 * const activities = useRepository().dashboard.getActivities({ limit: 10 })
 *
 * await waitForAll([stats.pending, activities.pending])
 * console.log('所有資料都已載入')
 *
 * @param pendingRefs - pending Ref 陣列
 * @param timeout - 超時時間（毫秒），預設 10 秒
 */
export async function waitForAll(
  pendingRefs: Ref<boolean>[],
  timeout: number = 10000
): Promise<void> {
  await Promise.all(pendingRefs.map((pending) => waitForData(pending, timeout)))
}

/**
 * 使用 $fetch 直接取得資料（會等待）
 *
 * @example
 * const activities = await fetchData('/api/dashboard/activities', { limit: 10 })
 * console.log('資料已載入:', activities)
 *
 * @param url - API 路徑
 * @param query - 查詢參數
 * @returns Promise<T>
 */
export async function fetchData<T>(url: string, query?: Record<string, any>): Promise<T> {
  const config = useRuntimeConfig()
  const baseURL = config.public.api.baseUrl as string

  return await $fetch<T>(url, {
    baseURL,
    query
  })
}
