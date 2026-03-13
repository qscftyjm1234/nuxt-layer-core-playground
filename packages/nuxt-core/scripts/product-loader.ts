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
export function getProductConfig(rootDir: string = process.cwd()): ProductConfig {
  // 1. 決定要讀哪個設定檔
  // 可以在 package.json 裡面用 cross-env PRODUCT_CONFIG=xxx 來指定
  const productConfigName = process.env.PRODUCT_CONFIG || 'default'

  // 2. 算出檔案在哪裡
  const configPath = path.resolve(rootDir, 'configs', `${productConfigName}.json`)

  // 預設給一個空的，免得找不到檔案時出錯
  let config: ProductConfig = { modules: {} }

  // 3. 真的去讀檔案
  if (fs.existsSync(configPath)) {
    try {
      const fileContents = fs.readFileSync(configPath, 'utf8')
      const loaded = JSON.parse(fileContents)

      // 有讀到東西就合併進去
      if (loaded) {
        config = { ...config, ...loaded }
      }
      console.log(`[Config] 成功載入設定: ${productConfigName}`)
    } catch (e) {
      console.error(`[Config] 讀取設定失敗 ${configPath}:`, e)
    }
  } else {
    // 找不到檔案，提醒一下
    console.warn(`[Config] 找不到設定檔: ${configPath}，將不載入任何模組。`)
  }

  return config
}

// 把讀好的設定匯出，讓其他檔案直接 import 就能用
export const productConfig = getProductConfig()
