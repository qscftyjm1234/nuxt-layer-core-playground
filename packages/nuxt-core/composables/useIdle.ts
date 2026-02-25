/**
 * useIdle - 閒置偵測
 * 偵測使用者閒置狀態，支援自動登出或暫停操作
 */

export interface UseIdleOptions {
  /** 閒置時間（毫秒），預設 5 分鐘 */
  timeout?: number
  /** 要監聽的事件 */
  events?: string[]
}

export interface UseIdleReturn {
  /** 是否閒置 */
  isIdle: Ref<boolean>
  /** 最後活動時間 */
  lastActive: Ref<Date>
  /** 閒置時間（毫秒） */
  idleTime: Ref<number>
  /** 重置閒置狀態 */
  reset: () => void
  /** 暫停偵測 */
  pause: () => void
  /** 恢復偵測 */
  resume: () => void
}

/**
 * 閒置偵測 Composable
 * @param options - 閒置偵測選項
 * @returns 閒置狀態和控制方法
 */
export function useIdle(options: UseIdleOptions = {}): UseIdleReturn {
  const {
    timeout = 5 * 60 * 1000, // 預設 5 分鐘
    events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll']
  } = options

  const isIdle = ref(false)
  const lastActive = ref(new Date())
  const idleTime = ref(0)
  const isPaused = ref(false)

  let idleTimer: ReturnType<typeof setTimeout> | null = null
  let updateTimer: ReturnType<typeof setInterval> | null = null

  /**
   * 重置閒置計時器
   */
  const reset = (): void => {
    if (isPaused.value) return

    lastActive.value = new Date()
    idleTime.value = 0
    isIdle.value = false

    // 清除舊的計時器
    if (idleTimer) {
      clearTimeout(idleTimer)
    }

    // 設定新的計時器
    idleTimer = setTimeout(() => {
      isIdle.value = true
    }, timeout)
  }

  /**
   * 更新閒置時間
   */
  const updateIdleTime = (): void => {
    if (isPaused.value || isIdle.value) return

    const now = new Date().getTime()
    const last = lastActive.value.getTime()
    idleTime.value = now - last
  }

  /**
   * 暫停偵測
   */
  const pause = (): void => {
    isPaused.value = true
    if (idleTimer) {
      clearTimeout(idleTimer)
      idleTimer = null
    }
    if (updateTimer) {
      clearInterval(updateTimer)
      updateTimer = null
    }
  }

  /**
   * 恢復偵測
   */
  const resume = (): void => {
    isPaused.value = false
    reset()
    startUpdateTimer()
  }

  /**
   * 開始更新計時器
   */
  const startUpdateTimer = (): void => {
    updateTimer = setInterval(updateIdleTime, 1000) // 每秒更新一次
  }

  // 初始化
  onMounted(() => {
    // 綁定事件監聽
    events.forEach((event) => {
      window.addEventListener(event, reset, { passive: true })
    })

    // 初始化計時器
    reset()
    startUpdateTimer()
  })

  // 清理
  onUnmounted(() => {
    // 移除事件監聽
    events.forEach((event) => {
      window.removeEventListener(event, reset)
    })

    // 清除計時器
    if (idleTimer) {
      clearTimeout(idleTimer)
    }
    if (updateTimer) {
      clearInterval(updateTimer)
    }
  })

  return {
    isIdle,
    lastActive,
    idleTime,
    reset,
    pause,
    resume
  }
}
