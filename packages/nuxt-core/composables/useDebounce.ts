/**
 * 防抖與節流 Composable
 * 提供函數防抖和節流功能，用於效能優化
 */

/**
 * 防抖與節流 Composable
 * @returns 防抖與節流相關方法
 */
export function useDebounce() {
  /**
   * 防抖函數
   * @param fn - 要防抖的函數
   * @param delay - 延遲時間（毫秒）
   * @returns 防抖後的函數
   */
  const debounce = <T extends (...args: any[]) => any>(
    fn: T,
    delay: number = 300
  ): ((...args: Parameters<T>) => void) & { cancel: () => void } => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null

    const debouncedFn = (...args: Parameters<T>) => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      timeoutId = setTimeout(() => {
        fn(...args)
        timeoutId = null
      }, delay)
    }

    // 取消防抖
    debouncedFn.cancel = () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
      }
    }

    return debouncedFn
  }

  /**
   * 節流函數
   * @param fn - 要節流的函數
   * @param limit - 限制時間（毫秒）
   * @returns 節流後的函數
   */
  const throttle = <T extends (...args: any[]) => any>(
    fn: T,
    limit: number = 300
  ): ((...args: Parameters<T>) => void) & { cancel: () => void } => {
    let inThrottle = false
    let lastArgs: Parameters<T> | null = null
    let timeoutId: ReturnType<typeof setTimeout> | null = null

    const throttledFn = (...args: Parameters<T>) => {
      lastArgs = args

      if (!inThrottle) {
        fn(...args)
        inThrottle = true
        lastArgs = null

        timeoutId = setTimeout(() => {
          inThrottle = false
          if (lastArgs) {
            throttledFn(...lastArgs)
          }
        }, limit)
      }
    }

    // 取消節流
    throttledFn.cancel = () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
      }
      inThrottle = false
      lastArgs = null
    }

    return throttledFn
  }

  /**
   * 防抖 Ref
   * @param value - 初始值
   * @param delay - 延遲時間（毫秒）
   * @returns 防抖後的 Ref 和原始 Ref
   */
  const useDebouncedRef = <T>(value: T, delay: number = 300) => {
    const immediate = ref<T>(value) as Ref<T>
    const debounced = ref<T>(value) as Ref<T>

    let timeoutId: ReturnType<typeof setTimeout> | null = null

    watch(immediate, (newValue) => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      timeoutId = setTimeout(() => {
        debounced.value = newValue
        timeoutId = null
      }, delay)
    })

    return {
      immediate,
      debounced
    }
  }

  /**
   * 節流 Ref
   * @param value - 初始值
   * @param limit - 限制時間（毫秒）
   * @returns 節流後的 Ref 和原始 Ref
   */
  const useThrottledRef = <T>(value: T, limit: number = 300) => {
    const immediate = ref<T>(value) as Ref<T>
    const throttled = ref<T>(value) as Ref<T>

    let inThrottle = false
    let timeoutId: ReturnType<typeof setTimeout> | null = null

    watch(immediate, (newValue) => {
      if (!inThrottle) {
        throttled.value = newValue
        inThrottle = true

        timeoutId = setTimeout(() => {
          inThrottle = false
          // 更新為最新值
          if (immediate.value !== throttled.value) {
            throttled.value = immediate.value
          }
        }, limit)
      }
    })

    return {
      immediate,
      throttled
    }
  }

  /**
   * 延遲執行
   * @param fn - 要執行的函數
   * @param delay - 延遲時間（毫秒）
   * @returns 取消函數
   */
  const delay = (fn: () => void, delay: number): (() => void) => {
    const timeoutId = setTimeout(fn, delay)

    return () => {
      clearTimeout(timeoutId)
    }
  }

  return {
    debounce,
    throttle,
    useDebouncedRef,
    useThrottledRef,
    delay
  }
}
