/**
 * 裝置環境偵測 Composable
 *
 * 整合 @nuxtjs/device 與自定義 App 偵測邏輯
 * 用於判斷當前是用戶是使用：
 * 1. 哪種裝置 (手機/平板/桌面) - 透過 useNuxtApp().$device (避免與自身名稱衝突導致遞迴)
 * 2. 哪種環境 (瀏覽器/App Webview) - 透過 User-Agent 識別字串
 *
 * @returns 包含裝置資訊、環境判斷與裝置名稱的整合物件
 */
export const useAppDevice = () => {
  // 1. 取得裝置資訊
  // 注意：這裡不能呼叫 useDevice()，因為會遞迴呼叫自己
  // 我們改為從 NuxtApp Context 取得 @nuxtjs/device 注入的 $device
  const nuxtApp = useNuxtApp()
  // 如果沒裝 @nuxtjs/device 模組，就給一個空的物件預設值
  const device = (nuxtApp.$device || {
    isIos: false,
    isAndroid: false,
    isMobile: false,
    isDesktop: true, // 預設為電腦版
    isTablet: false
  }) as any

  // 2. 取得 Runtime Config (讀取 App 識別字串設定)
  const config = useRuntimeConfig() as any
  const appIdentifier = (config.public?.app?.uaIdentifier as string) || 'MyApp'

  // 3. 判斷是否為 App 環境
  // 邏輯：檢查 User-Agent 是否包含特定的識別字串 (例如 "MyApp")
  const isApp = useState('device-is-app', () => {
    // SSR 處理：從 Request Headers 讀取 User-Agent
    if (import.meta.server) {
      const headers = useRequestHeaders(['user-agent'])
      const ua = (headers['user-agent'] as string) || ''
      return ua.includes(appIdentifier)
    }

    // Client 處理：從 navigator.userAgent 讀取
    // 也可以擴充檢查 window.Android 或 window.webkit
    return navigator.userAgent.includes(appIdentifier)
  })

  // 4. 判斷作業系統 (整合 Device 資訊)
  // 注意：需要確保 device 物件存在 (雖然後端 plugin 應該保證存在，但加個防呆較安全)
  const isIOS = computed(() => !!device?.isIos)
  const isAndroid = computed(() => !!device?.isAndroid)
  const isMobile = computed(() => !!device?.isMobile)
  const isDesktop = computed(() => !!device?.isDesktop)
  const isTablet = computed(() => !!device?.isTablet)

  /**
   * 為了方便使用，回傳一個整合過的裝置字串
   * 可能值: 'ios-app', 'android-app', 'ios-web', 'android-web', 'desktop'
   */
  const deviceName = computed(() => {
    if (isDesktop.value) return 'desktop'

    const os = isIOS.value ? 'ios' : isAndroid.value ? 'android' : 'mobile'
    const env = isApp.value ? 'app' : 'web'

    return `${os}-${env}`
  })

  return {
    // 原始 device 物件 (如果需要更細的資訊)
    ...device,

    // 是否為 App 內嵌
    isApp,

    // 常用判斷 (Computed Ref)
    isIOS,
    isAndroid,
    isMobile,
    isDesktop,
    isTablet,

    // 組合名稱
    deviceName,

    // 原始 User-Agent (CSR 环境下可直接读取 navigator.userAgent)
    userAgent: import.meta.client ? navigator.userAgent : ''
  }
}
