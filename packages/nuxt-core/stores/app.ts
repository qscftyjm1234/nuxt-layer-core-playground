import { defineStore } from 'pinia'
import { defaultLayoutConfig, type LayoutConfig } from '../core/config/layout'

export const useAppStore = defineStore('app', () => {
  // 狀態
  const config = ref<LayoutConfig>({ ...defaultLayoutConfig })
  const drawer = ref(true)
  const loading = ref(false)

  // 動作
  /**
   *
   */
  function toggleDrawer() {
    drawer.value = !drawer.value
  }

  /**
   * 設定主題
   * @param newTheme - 新的主題 ('light' 或 'dark')
   */
  function setTheme(newTheme: 'light' | 'dark') {
    config.value.theme.defaultTheme = newTheme
  }

  /**
   * 更新設定
   * @param newConfig - 部分設定物件
   */
  function updateConfig(newConfig: Partial<LayoutConfig>) {
    // 可以在這裡加入深度合併 (Deep merge) 邏輯以處理更複雜的更新
    Object.assign(config.value, newConfig)
  }

  /**
   * 重新載入設定（用於熱重載）
   * @param newConfig - 新的設定物件
   */
  function reloadConfig(newConfig?: typeof defaultLayoutConfig) {
    if (newConfig) {
      // 使用新模組的設定
      Object.assign(config.value, newConfig)
    } else {
      // 使用當前的 defaultLayoutConfig（用於手動重載）
      Object.assign(config.value, defaultLayoutConfig)
    }
    console.log('🔄 Layout config reloaded:', config.value)
  }

  // 初始化 (模擬從後端獲取)
  /**
   *
   */
  async function initApp() {
    loading.value = true
    try {
      console.log('App initialized with config:', config.value)
    } finally {
      loading.value = false
    }
  }

  // 開發模式下啟用熱重載
  // if (import.meta.hot) {
  //   // {import.meta.hot.accept} 如果有人改了我裡面的程式碼，直接把我的新邏輯「塞」進去就好，不准重新整理網頁
  //   import.meta.hot.accept('~/core/config/layout', (newModule) => {
  //     if (newModule && newModule.defaultLayoutConfig) {
  //       // 使用新模組的設定資料
  //       reloadConfig(newModule.defaultLayoutConfig)
  //     }
  //   })
  // }

  return {
    config,
    drawer,
    loading,
    toggleDrawer,
    setTheme,
    updateConfig,
    reloadConfig,
    initApp
  }
})
