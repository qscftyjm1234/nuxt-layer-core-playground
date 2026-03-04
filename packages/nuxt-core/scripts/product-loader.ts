// @ts-ignore
import path from 'path'
import fs from 'fs'

/**
 * 設定檔格式定義
 * 規定 JSON 裡面可以寫什麼
 */
export interface ProductConfig {
  /** 1. 品牌資訊 (Branding) - 第一眼看到的門面 */
  branding?: {
    name?: string           // 公司名稱
    shortName?: string      // 簡寫或標籤名
    logo?: string           // 主 Logo 路徑
    logoDark?: string       // 暗色版 Logo
    icon?: string           // 網頁 Favicon/手機 Icon
    copyright?: string      // Footer 版權文字
    uaIdentifier?: string   // [NEW] App 識別字串 (User-Agent)
  }

  /** 2. 全域 Meta 標籤 */
  meta?: {
    title?: string          // 預設網頁標題
    titleTemplate?: string  // 標題模板 (%s - Kit)
    description?: string    // SEO 描述
    author?: string         // 作者/團隊
    lang?: string           // 語系 (zh-TW, en, etc.)
    favicon?: string        // 網站圖示
  }

  /** 3. 版面與導航設定 (Layout) */
  layout?: {
    menuStyle?: 'sidebar' | 'topbar' | 'hybrid'
    sidebar?: {
      width?: number
      collapsed?: boolean
      title?: string
      showIcon?: boolean
    }
    header?: {
      fixed?: boolean
      search?: boolean
      searchPlaceholder?: string
      showUserAction?: boolean
      globalLoading?: boolean  // [NEW] 是否開啟全域 Loading 條
    }
    footer?: {
      visible?: boolean
      content?: string
    }
  }

  /** 4. 主題視覺令牌 (Theme Tokens) - 所有配色與外觀 */
  theme?: {
    primaryColor?: string   // 主色 (品牌色)
    successColor?: string
    warningColor?: string
    errorColor?: string
    infoColor?: string
    borderRadius?: number   // 全域圓角大小
    animation?: boolean     // 是否啟用微動畫
    spacingSize?: 'small' | 'medium' | 'large' // 間距規格
    customCss?: string[]    // [NEW] 允許專案額外注入全域 CSS 檔案
  }

  /** 5. 網路開發與代理 (Network & Proxy) - 解決 Nginx 同工不同酬的問題 */
  network?: {
    apiBaseUrl?: string      // API 基礎路徑
    timeout?: number        // [NEW] 請求超時時間
    retry?: number          // [NEW] 請求重試次數
    proxy?: {
      [prefix: string]: {    // 例: { "/api/v1": "https://dev-server.com" }
        target: string
        changeOrigin?: boolean
        rewrite?: string     // 常見的路徑重寫
      }
    }
  }

  /** 6. 功能模組與建置開關 (Features & Build) */
  features?: {
    enableWatermark?: boolean // 是否開啟浮水印
    enableAuth?: boolean      // 是否開啟登入驗證
    enableLog?: boolean       // 是否開啟前端 Log 紀錄
    mockApi?: boolean         // [NEW] 是否開啟 Mock API
    [key: string]: any
  }

  /** 7. 進階建置優化 (Build Optimization) - 給組員微調性能 */
  build?: {
    compress?: boolean        // 是否開啟 Nitro 資源壓縮
    analyze?: boolean         // 是否開啟建置分析
    optimizeDeps?: string[]   // 額外強制優化的套件
  }

  /** 8. 驗證與安全性 (Auth & Security) */
  auth?: {
    tokenKey?: string
    maxAge?: number
  }

  /** 9. 模組精確控制 (Module Registry) */
  modules?: {
    [moduleName: string]: boolean // 例: { "@nuxtjs/i18n": false } 可停用 Layer 內建模組
  }

  /** 其他擴充 */
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
