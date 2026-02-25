/**
 * useTableData - 表格資料載入管理
 *
 * 用途：管理 Table 的資料載入邏輯
 * 支援 Server-side 與 Client-side 兩種模式
 */

export interface TableDataOptions {
  api?: string
  staticData?: any[]
  itemsPerPage?: number
}

export interface TableDataState {
  items: Ref<any[]>
  totalItems: Ref<number>
  loading: Ref<boolean>
  page: Ref<number>
  itemsPerPage: Ref<number>
  search: Ref<string>
  loadItems: (options: { page: number; itemsPerPage: number }) => Promise<void>
}

/**
 * 使用表格資料管理
 *
 * @param options - 設定選項
 * @returns 表格資料狀態與載入方法
 *
 * @example
 * ```ts
 * // Server-side mode
 * const tableData = useTableData({ api: '/api/users' })
 *
 * // Client-side mode
 * const tableData = useTableData({ staticData: [...] })
 * ```
 */
export function useTableData(options: TableDataOptions = {}): TableDataState {
  const { api = '', staticData = [], itemsPerPage: initialItemsPerPage = 5 } = options

  // 狀態管理
  const items = ref<any[]>([])
  const totalItems = ref(0)
  const loading = ref(false)
  const page = ref(1)
  const itemsPerPage = ref(initialItemsPerPage)
  const search = ref('')

  /**
   * 載入資料
   * @param root0
   * @param root0.page
   * @param root0.itemsPerPage
   */
  const loadItems = async ({
    page: p,
    itemsPerPage: ipp
  }: {
    page: number
    itemsPerPage: number
  }) => {
    if (!api) {
      // Client-side mode: 使用靜態資料
      items.value = staticData
      totalItems.value = staticData.length
      return
    }

    // Server-side mode: 從 API 載入
    loading.value = true
    try {
      const result = await $fetch(api, {
        params: {
          page: p,
          itemsPerPage: ipp,
          q: search.value
        }
      })

      if (result) {
        // 支援回傳格式 { items: [], total: 100 } 或直接回傳 []
        if (Array.isArray(result)) {
          items.value = result
          totalItems.value = result.length
        } else {
          const res = result as any
          items.value = res.items || []
          totalItems.value = res.total || 0
        }
      }
    } catch (e) {
      console.error('Failed to load items', e)
      items.value = []
      totalItems.value = 0
    } finally {
      loading.value = false
    }
  }

  // 監聽搜尋變更
  let searchTimeout: ReturnType<typeof setTimeout>
  watch(search, () => {
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      page.value = 1
    }, 500)
  })

  // 初始載入
  onMounted(() => {
    if (!api) {
      items.value = staticData
      totalItems.value = staticData.length
    }
  })

  return {
    items,
    totalItems,
    loading,
    page,
    itemsPerPage,
    search,
    loadItems
  }
}
