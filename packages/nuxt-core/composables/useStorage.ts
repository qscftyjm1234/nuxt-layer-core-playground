/**
 * 本地儲存 Composable
 * 提供 LocalStorage 和 SessionStorage 的封裝
 */

/**
 * 儲存選項
 */
export interface StorageOptions {
  /** 過期時間（毫秒） */
  expires?: number
  /** 是否加密 */
  encrypt?: boolean
}

/**
 * 儲存項目
 */
interface StorageItem<T> {
  /** 值 */
  value: T
  /** 過期時間戳 */
  expires?: number
}

/**
 * 本地儲存 Composable
 * @param type - 儲存類型（local 或 session）
 * @returns 儲存相關方法
 */
export function useStorage(type: 'local' | 'session' = 'local') {
  const storage = type === 'local' ? localStorage : sessionStorage

  /**
   * 設定儲存項目
   * @param key - 鍵
   * @param value - 值
   * @param options - 選項
   */
  const setItem = <T>(key: string, value: T, options: StorageOptions = {}): void => {
    try {
      const item: StorageItem<T> = {
        value,
        expires: options.expires ? Date.now() + options.expires : undefined
      }

      const serialized = JSON.stringify(item)
      storage.setItem(key, serialized)
    } catch (error) {
      console.error(`Error setting storage item "${key}":`, error)
    }
  }

  /**
   * 取得儲存項目
   * @param key - 鍵
   * @param defaultValue - 預設值
   * @returns 值
   */
  const getItem = <T>(key: string, defaultValue?: T): T | null => {
    try {
      const serialized = storage.getItem(key)
      if (!serialized) return defaultValue ?? null

      const item: StorageItem<T> = JSON.parse(serialized)

      // 檢查是否過期
      if (item.expires && Date.now() > item.expires) {
        removeItem(key)
        return defaultValue ?? null
      }

      return item.value
    } catch (error) {
      console.error(`Error getting storage item "${key}":`, error)
      return defaultValue ?? null
    }
  }

  /**
   * 移除儲存項目
   * @param key - 鍵
   */
  const removeItem = (key: string): void => {
    try {
      storage.removeItem(key)
    } catch (error) {
      console.error(`Error removing storage item "${key}":`, error)
    }
  }

  /**
   * 清除所有儲存項目
   */
  const clear = (): void => {
    try {
      storage.clear()
    } catch (error) {
      console.error('Error clearing storage:', error)
    }
  }

  /**
   * 檢查鍵是否存在
   * @param key - 鍵
   * @returns 是否存在
   */
  const hasItem = (key: string): boolean => storage.getItem(key) !== null

  /**
   * 取得所有鍵
   * @returns 鍵陣列
   */
  const keys = (): string[] => {
    try {
      return Object.keys(storage)
    } catch (error) {
      console.error('Error getting storage keys:', error)
      return []
    }
  }

  /**
   * 取得儲存項目數量
   * @returns 數量
   */
  const length = (): number => storage.length

  /**
   * 建立響應式儲存
   * @param key - 鍵
   * @param defaultValue - 預設值
   * @param options - 選項
   * @returns 響應式 Ref
   */
  const useStorageRef = <T>(key: string, defaultValue: T, options: StorageOptions = {}): Ref<T> => {
    const data = ref<T>(getItem<T>(key, defaultValue) ?? defaultValue) as Ref<T>

    // 監聽變化並自動儲存
    watch(
      data,
      (newValue) => {
        setItem(key, newValue, options)
      },
      { deep: true }
    )

    return data
  }

  /**
   * 批次設定
   * @param items - 項目物件
   * @param options - 選項
   */
  const setItems = (items: Record<string, any>, options: StorageOptions = {}): void => {
    Object.entries(items).forEach(([key, value]) => {
      setItem(key, value, options)
    })
  }

  /**
   * 批次取得
   * @param keys - 鍵陣列
   * @returns 值物件
   */
  const getItems = <T = any>(keys: string[]): Record<string, T | null> => {
    const result: Record<string, T | null> = {}
    keys.forEach((key) => {
      result[key] = getItem<T>(key)
    })
    return result
  }

  /**
   * 批次移除
   * @param keys - 鍵陣列
   */
  const removeItems = (keys: string[]): void => {
    keys.forEach((key) => {
      removeItem(key)
    })
  }

  return {
    setItem,
    getItem,
    removeItem,
    clear,
    hasItem,
    keys,
    length,
    useStorageRef,
    setItems,
    getItems,
    removeItems
  }
}

/**
 * LocalStorage 快捷方法
 * @returns LocalStorage 操作介面
 */
export const useLocalStorage = () => useStorage('local')

/**
 * SessionStorage 快捷方法
 * @returns SessionStorage 操作介面
 */
export const useSessionStorage = () => useStorage('session')
