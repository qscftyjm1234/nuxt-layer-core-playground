import { defineNuxtSchema } from 'nuxt/schema'

/**
 * 定義核心架構的配置架構 (Schema)
 * 這會讓子專案在編輯 nuxt.config.ts 或 app.config.ts 時擁有完美的 IDE 提示
 */
export default defineNuxtSchema({
  appConfig: {
    /** 核心架構設定 */
    core: {
      /** 品牌資訊 */
      branding: {
        /** 公司或專案名稱 */
        name: 'Softleader Core',
        /** 簡寫 */
        shortName: 'SL Core',
        /** 主 Logo 路徑 */
        logo: '',
        /** 暗色版 Logo */
        logoDark: '',
        /** 網頁 Favicon */
        icon: '',
        /** 版權宣告文字 */
        copyright: '© 2026 Softleader Technical Team.',
        /** App 識別字串 */
        uaIdentifier: 'MyApp'
      },
      /** 版面設定 */
      layout: {
        /** 選單樣式 */
        menuStyle: 'sidebar',
        /** 側邊欄設定 */
        sidebar: {
          width: 260,
          collapsed: false,
          title: '控制台'
        },
        /** 頂吧設定 */
        header: {
          fixed: true,
          search: true,
          /** 是否開啟全域 Loading 條 */
          globalLoading: true
        },
        /** 底吧設定 */
        footer: {
          /** 是否顯示底吧 */
          visible: true
        }
      },
      /** 主題與樣式設定 */
      theme: {
        /** 主色調 */
        primaryColor: '#2563eb',
        /** 圓角大小 */
        borderRadius: 12,
        /** 是否啟用動畫 */
        animation: true,
        /** 間距大小 (small, medium, large) */
        spacingSize: 'medium'
      },
      /** 網路與 API 進階設定 */
      network: {
        /** API 基礎路徑 (Runtime 可能會被覆寫) */
        apiBaseUrl: '/api/v1',
        /** 請求超時時間 (ms) */
        timeout: 30000,
        /** 請求重試次數 */
        retry: 0,
        /** Proxy 代理設定 (僅開發環境可用) */
        proxy: {}
      },
      /** 功能開關 */
      features: {
        /** 是否啟用浮水印 */
        enableWatermark: false,
        /** 是否啟用權限驗證 */
        enableAuth: true,
        /** 是否開啟 Log 紀錄 */
        enableLog: true,
        /** 是否開啟 Mock API */
        mockApi: false
      },
      /** 身分認證設定 */
      auth: {
        /** Token 儲存名稱 */
        tokenKey: 'auth_token',
        /** Token 有效期限 (秒) */
        maxAge: 60 * 60 * 24 * 7
      },
      /** SEO 與 Meta 設定 */
      meta: {
        /** 網頁標題 */
        title: 'Softleader Core',
        /** 網頁標題模板 */
        titleTemplate: '%s - Softleader Core',
        /** 網頁描述 */
        description: '',
        /** 作者 */
        author: 'Softleader',
        /** 語系 */
        lang: 'zh-TW',
        /** 網站圖示 */
        favicon: '/favicon.ico'
      }
    }
  }
})
