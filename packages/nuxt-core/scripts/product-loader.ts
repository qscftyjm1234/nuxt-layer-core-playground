// @ts-ignore
import path from 'path'
import fs from 'fs'

/**
 * 設定檔格式定義
 * 規定 JSON 裡面可以寫什麼
 */
export interface ProductConfig {
  /** 1. 品牌資訊 (Branding) */
  branding?: {
    name?: string
    shortName?: string
    logo?: string
    logoDark?: string
    icon?: string
    copyright?: string
    uaIdentifier?: string
  }

  /** 2. 全域 Meta 標籤 */
  meta?: {
    title?: string
    titleTemplate?: string
    description?: string
    author?: string
    lang?: string
    favicon?: string
  }

  /** 3. 版面與導航設定 (Layout) */
  layout?: {
    menuStyle?: 'sidebar' | 'topbar' | 'hybrid'
    sidebar?: {
      width?: number
      collapsed?: boolean
      title?: string
      showIcon?: boolean
      mainMenuTitle?: string
    }
    header?: {
      visible?: boolean
      height?: number
      search?: boolean
      searchPlaceholder?: string
      showUserAction?: boolean
      globalLoading?: boolean
      notifications?: boolean
    }
    footer?: {
      visible?: boolean
      content?: string
    }
    branding?: {
      title?: string
      subtitle?: string
      logoIcon?: string
      logoImage?: string
    }
  }

  /** 4. 主題視覺令牌 (Theme Tokens) */
  theme?: {
    primaryColor?: string
    successColor?: string
    warningColor?: string
    errorColor?: string
    infoColor?: string
    businessColor?: string
    borderRadius?: number
    animation?: boolean
    spacingSize?: 'small' | 'medium' | 'large'
    customCss?: string[]
  }

  /** 5. 網路開發與代理 (Network & Proxy) */
  network?: {
    apiBaseUrl?: string
    timeout?: number
    retry?: number
    proxy?: {
      [prefix: string]: {
        target: string
        changeOrigin?: boolean
        rewrite?: string
      }
    }
  }

  /** 6. 功能與驗證 */
  features?: {
    enableWatermark?: boolean
    enableAuth?: boolean
    enableLog?: boolean
    mockApi?: boolean
    [key: string]: any
  }

  /** 7. 驗證設定 */
  auth?: {
    tokenKey?: string
    maxAge?: number
  }

  /** 8. 模組控制 */
  modules?: {
    [moduleName: string]: boolean
  }

  [key: string]: any
}

/**
 * 主要功能：讀取 JSON 設定檔
 *
 * 運作方式：
 * 1. 看一下環境變數 `PRODUCT_CONFIG` 是什麼 (沒設就用 'default')
 * 2. 去 `configs/` 資料夾找對應的 .json 檔案
 * 3. 讀取或是回傳空的設定 (避免程式壞掉)
 *
 * @param rootDir 專案根目錄 (預設抓目前位置)
 * @returns 讀到的設定內容
 */
export function getProductConfig(rootDir?: string): ProductConfig {
  // 核心預設結構，確保不會噴 undefined 錯誤 (visible, enabled 等)
  let config: ProductConfig = {
    branding: {},
    meta: {},
    layout: {
      header: { visible: true },
      footer: { visible: true },
      sidebar: { visible: true }
    },
    theme: {},
    network: {},
    features: {},
    auth: {},
    modules: {}
  }

  // 如果是在瀏覽器環境，直接回傳預設結構 (瀏覽器應該透過 useAppConfig 取得)
  if (typeof process === 'undefined' || !process.cwd) {
    return config
  }

  // 診斷日誌：寫入檔案以便查閱 (因為看見不到終端機)
  const debugLog = (msg: string) => {
    try {
      fs.appendFileSync('c:\\Users\\gino.huang\\Desktop\\nuxt-layer-core-playground\\product-loader-debug.log', `[${new Date().toISOString()}] ${msg}\n`)
    } catch (e) {}
    console.log(msg)
  }
  debugLog(`>>> getProductConfig start. CWD: ${process.cwd()}, ENV: Ref=${process.env.npm_package_name}`)

  // 1. 決定要讀哪個設定檔
  const productConfigName = process.env.PRODUCT_CONFIG || 'default'

  // 2. 智慧路徑搜尋：找出最近的 configs/ 資料夾
  // 我們會檢查：
  // A. 目前執行目錄 (CWD) 下的 configs/
  // B. 往上找 5 層 (適用於從根目錄跑 workspace 指令的情況)
  let currentSearchDir = process.cwd()
  let configPath = ''

  console.log(`[Config Debug] CWD: ${currentSearchDir}`)

  for (let i = 0; i < 5; i++) {
    const targetPath = path.resolve(currentSearchDir, 'configs', `${productConfigName}.json`)
    debugLog(`[Config Path Check ${i}] ${targetPath}`)
    
    if (fs.existsSync(targetPath)) {
      configPath = targetPath
      break
    }

    // 額外支援：如果在根目錄跑，嘗試找 apps/${npm_package_name}/configs
    if (i === 0) {
      const activePackage = process.env.npm_package_name
      const appsDir = path.resolve(currentSearchDir, 'apps')
      debugLog(`[Config Context Check] Package: ${activePackage}, appsDir: ${appsDir}`)
      
      if (activePackage && fs.existsSync(path.resolve(appsDir, activePackage))) {
        const appConfigPath = path.resolve(appsDir, activePackage, 'configs', `${productConfigName}.json`)
        debugLog(`[Config Workspace Check] ${appConfigPath}`)
        if (fs.existsSync(appConfigPath)) {
          configPath = appConfigPath
          break
        }
      }

      if (!configPath && fs.existsSync(appsDir)) {
        const apps = fs.readdirSync(appsDir)
        for (const app of apps) {
          const appConfigPath = path.resolve(appsDir, app, 'configs', `${productConfigName}.json`)
          if (fs.existsSync(appConfigPath)) {
             configPath = appConfigPath
             break 
          }
        }
      }
    }
    
    if (configPath) break

    const nextDir = path.dirname(currentSearchDir)
    if (nextDir === currentSearchDir) break
    currentSearchDir = nextDir
  }

  if (configPath) {
    debugLog(`[Config Success] 最終確認讀取路徑: ${configPath}`)
    try {
      const fileContents = fs.readFileSync(configPath, 'utf8')
      const loaded = JSON.parse(fileContents)

      if (loaded) {
        config = { ...config, ...loaded }
        debugLog(`[Config Success] 載入內容: title=${config.meta?.title}, color=${config.theme?.primaryColor}`)
      }
    } catch (e) {
      debugLog(`[Config Error] 讀取 JSON 失敗 ${configPath}: ${e}`)
    }
  } else {
    debugLog(`[Config Warning] 在任何路徑中都找不到 ${productConfigName}.json`)
  }

  return config
}

// 把讀好的設定匯出，讓其他檔案直接 import 就能用
export const productConfig = getProductConfig()
