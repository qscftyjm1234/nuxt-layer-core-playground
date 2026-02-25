/**
 * 分頁管理 Composable
 * 提供完整的分頁邏輯處理
 */

/**
 * 分頁選項
 */
export interface PaginationOptions {
  /** 當前頁碼（從 1 開始） */
  currentPage?: number
  /** 每頁筆數 */
  pageSize?: number
  /** 總筆數 */
  total?: number
}

/**
 * 分頁資訊
 */
export interface PaginationInfo {
  /** 當前頁碼 */
  currentPage: number
  /** 每頁筆數 */
  pageSize: number
  /** 總筆數 */
  total: number
  /** 總頁數 */
  totalPages: number
  /** 是否有上一頁 */
  hasPrev: boolean
  /** 是否有下一頁 */
  hasNext: boolean
  /** 當前頁的起始索引（從 0 開始） */
  startIndex: number
  /** 當前頁的結束索引（從 0 開始） */
  endIndex: number
  /** 當前頁的起始筆數（從 1 開始） */
  startItem: number
  /** 當前頁的結束筆數（從 1 開始） */
  endItem: number
}

/**
 * 分頁管理 Composable
 * @param options - 分頁選項
 * @returns 分頁相關方法和狀態
 */
export function usePagination(options: PaginationOptions = {}) {
  const currentPage = ref(options.currentPage || 1)
  const pageSize = ref(options.pageSize || 10)
  const total = ref(options.total || 0)

  /**
   * 計算總頁數
   */
  const totalPages = computed(() => Math.ceil(total.value / pageSize.value))

  /**
   * 是否有上一頁
   */
  const hasPrev = computed(() => currentPage.value > 1)

  /**
   * 是否有下一頁
   */
  const hasNext = computed(() => currentPage.value < totalPages.value)

  /**
   * 當前頁的起始索引（從 0 開始）
   */
  const startIndex = computed(() => (currentPage.value - 1) * pageSize.value)

  /**
   * 當前頁的結束索引（從 0 開始）
   */
  const endIndex = computed(() => Math.min(startIndex.value + pageSize.value - 1, total.value - 1))

  /**
   * 當前頁的起始筆數（從 1 開始）
   */
  const startItem = computed(() => (total.value === 0 ? 0 : startIndex.value + 1))

  /**
   * 當前頁的結束筆數（從 1 開始）
   */
  const endItem = computed(() => Math.min(startIndex.value + pageSize.value, total.value))

  /**
   * 分頁資訊
   */
  const info = computed<PaginationInfo>(() => ({
    currentPage: currentPage.value,
    pageSize: pageSize.value,
    total: total.value,
    totalPages: totalPages.value,
    hasPrev: hasPrev.value,
    hasNext: hasNext.value,
    startIndex: startIndex.value,
    endIndex: endIndex.value,
    startItem: startItem.value,
    endItem: endItem.value
  }))

  /**
   * 前往指定頁
   * @param page - 頁碼
   */
  const goToPage = (page: number): void => {
    if (page < 1 || page > totalPages.value) return
    currentPage.value = page
  }

  /**
   * 前往上一頁
   */
  const prevPage = (): void => {
    if (hasPrev.value) {
      currentPage.value--
    }
  }

  /**
   * 前往下一頁
   */
  const nextPage = (): void => {
    if (hasNext.value) {
      currentPage.value++
    }
  }

  /**
   * 前往第一頁
   */
  const firstPage = (): void => {
    currentPage.value = 1
  }

  /**
   * 前往最後一頁
   */
  const lastPage = (): void => {
    currentPage.value = totalPages.value
  }

  /**
   * 設定每頁筆數
   * @param size - 每頁筆數
   */
  const setPageSize = (size: number): void => {
    pageSize.value = size
    // 重新計算當前頁碼，確保不超出範圍
    const newTotalPages = Math.ceil(total.value / size)
    if (currentPage.value > newTotalPages) {
      currentPage.value = Math.max(1, newTotalPages)
    }
  }

  /**
   * 設定總筆數
   * @param count - 總筆數
   */
  const setTotal = (count: number): void => {
    total.value = count
    // 重新計算當前頁碼，確保不超出範圍
    if (currentPage.value > totalPages.value) {
      currentPage.value = Math.max(1, totalPages.value)
    }
  }

  /**
   * 重置分頁
   */
  const reset = (): void => {
    currentPage.value = 1
  }

  /**
   * 取得頁碼範圍（用於顯示頁碼按鈕）
   * @param maxButtons - 最多顯示幾個頁碼按鈕
   * @returns 頁碼陣列
   */
  const getPageRange = (maxButtons: number = 5): number[] => {
    const pages: number[] = []
    const half = Math.floor(maxButtons / 2)

    let start = Math.max(1, currentPage.value - half)
    const end = Math.min(totalPages.value, start + maxButtons - 1)

    // 調整起始位置
    if (end - start + 1 < maxButtons) {
      start = Math.max(1, end - maxButtons + 1)
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    return pages
  }

  /**
   * 計算 offset（用於 API 請求）
   */
  const offset = computed(() => startIndex.value)

  /**
   * 計算 limit（用於 API 請求）
   */
  const limit = computed(() => pageSize.value)

  /**
   * 對陣列進行分頁
   * @param array - 原始陣列
   * @returns 當前頁的資料
   */
  const paginateArray = <T>(array: T[]): T[] => array.slice(startIndex.value, endIndex.value + 1)

  return {
    // 狀態
    currentPage,
    pageSize,
    total,
    totalPages,
    hasPrev,
    hasNext,
    startIndex,
    endIndex,
    startItem,
    endItem,
    info,
    offset,
    limit,

    // 方法
    goToPage,
    prevPage,
    nextPage,
    firstPage,
    lastPage,
    setPageSize,
    setTotal,
    reset,
    getPageRange,
    paginateArray
  }
}
