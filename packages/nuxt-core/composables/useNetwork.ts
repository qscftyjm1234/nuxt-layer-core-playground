/**
 * useNetwork - 網路狀態監控
 * 提供線上/離線狀態、網路類型和速度偵測
 */

export type NetworkType = 'slow-2g' | '2g' | '3g' | '4g' | undefined

export interface UseNetworkReturn {
  /** 是否線上 */
  isOnline: Ref<boolean>
  /** 網路類型 */
  effectiveType: Ref<NetworkType>
  /** 下載速度（Mbps） */
  downlink: Ref<number | undefined>
  /** 往返時間（ms） */
  rtt: Ref<number | undefined>
  /** 最後斷線時間 */
  offlineAt: Ref<Date | undefined>
}

/**
 * 網路狀態監控 Composable
 * @returns 網路狀態資訊
 */
export function useNetwork(): UseNetworkReturn {
  // 基本線上/離線狀態
  const isOnline = ref(true)
  const offlineAt = ref<Date | undefined>(undefined)

  // Network Information API 資訊
  const effectiveType = ref<NetworkType>(undefined)
  const downlink = ref<number | undefined>(undefined)
  const rtt = ref<number | undefined>(undefined)

  /**
   * 更新網路資訊
   */
  const updateNetworkInfo = (): void => {
    // @ts-expect-error - Navigator.connection is not standard
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection

    if (connection) {
      effectiveType.value = connection.effectiveType
      downlink.value = connection.downlink
      rtt.value = connection.rtt
    }
  }

  /**
   * 處理線上狀態
   */
  const handleOnline = (): void => {
    isOnline.value = true
    updateNetworkInfo()
  }

  /**
   * 處理離線狀態
   */
  const handleOffline = (): void => {
    isOnline.value = false
    offlineAt.value = new Date()
  }

  // 初始化
  onMounted(() => {
    // 設定初始狀態
    isOnline.value = navigator.onLine
    updateNetworkInfo()

    // 監聽線上/離線事件
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // 監聽網路資訊變化
    // @ts-expect-error - Navigator.connection is not standard
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
    if (connection) {
      connection.addEventListener('change', updateNetworkInfo)
    }
  })

  // 清理
  onUnmounted(() => {
    window.removeEventListener('online', handleOnline)
    window.removeEventListener('offline', handleOffline)

    // @ts-expect-error - Navigator.connection is not standard
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
    if (connection) {
      connection.removeEventListener('change', updateNetworkInfo)
    }
  })

  return {
    isOnline,
    effectiveType,
    downlink,
    rtt,
    offlineAt
  }
}
