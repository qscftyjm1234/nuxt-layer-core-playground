/**
 * 選單項目介面
 * 用於定義 Header 和 Sidebar 的選單項目
 */
export interface MenuItem {
  /** 選單項目標題 */
  title?: string
  /** Material Design Icons 圖示名稱（例如：'mdi-home'） */
  icon?: string
  /** 路由路徑（用於導覽） */
  to?: string
  /** 動作名稱（用於觸發事件，例如：'logout'） */
  action?: string
  /** 是否為分隔線 */
  divider?: boolean
  /** 顏色（例如：'primary', 'error'） */
  color?: string
  /** 徽章文字 */
  badge?: string
}

/**
 * Layout 設定介面
 * 定義整個應用程式的版面設定
 *
 * 此設定支援熱重載（HMR），修改後會自動更新 UI
 * 設定儲存在 stores/app.ts 中，可透過 useAppStore() 存取
 */
export interface LayoutConfig {
  /** 品牌設定 - 顯示在 Sidebar 頂部 */
  branding: {
    /** Logo 設定 */
    logo: {
      /** Material Design Icons 圖示名稱（例如：'mdi-rocket-launch'） */
      icon: string
      /** Logo 圖片 URL（選填，優先於 icon） */
      image?: string
    }
    /** 企業主標題 */
    title: string
    /** 企業副標題 */
    subtitle: string
  }
  /** Header（頂部導覽列）設定 */
  header: {
    /** 是否顯示 Header */
    visible: boolean
    /** Header 高度（像素） */
    height: number
    /** 是否顯示麵包屑導覽 */
    breadcrumbs: boolean
    /** 是否顯示搜尋框 */
    search: boolean
    /** 搜尋框的 placeholder 文字 */
    searchPlaceholder: string
    /** 是否顯示通知鈴鐺 */
    notifications: boolean
    /** 使用者選單設定 */
    userMenu: {
      /** 是否顯示使用者選單 */
      visible: boolean
      /** 選單項目清單 */
      items: MenuItem[]
    }
    /** 是否顯示主題切換按鈕（明/暗模式） */
    themeToggle: boolean
    /** Header 右側的額外動作按鈕 */
    actions: MenuItem[]
  }
  /** Sidebar（側邊欄）設定 */
  sidebar: {
    /** 是否顯示 Sidebar */
    visible: boolean
    /** Sidebar 寬度（像素） */
    width: number
    /** 是否可摺疊 */
    collapsible: boolean
    /** 主選單標題文字 */
    mainMenuTitle: string
  }
  /** Footer（頁尾）設定 */
  footer: {
    /** 是否顯示 Footer */
    visible: boolean
    /** 是否固定在底部（fixed positioning） */
    fixed: boolean
    /** Footer 顯示的文字內容 */
    content: string
  }
  /** 主題設定 */
  theme: {
    /** 預設主題模式 */
    defaultTheme: 'light' | 'dark'
    /** 主要顏色（HEX 格式，例如：'#1976D2'） */
    primaryColor: string
  }
}

/**
 * 預設 Layout 設定
 *
 * 定義應用程式的預設版面設定
 * 此設定會在應用程式啟動時載入到 stores/app.ts
 *
 * @example
 * ```typescript
 * // 在元件中使用
 * const appStore = useAppStore()
 * console.log(appStore.config.branding.title) // 'Demo App Framework'
 * ```
 *
 * @see {@link LayoutConfig} 完整的設定介面定義
 */
export const defaultLayoutConfig: LayoutConfig = {
  branding: {
    logo: {
      icon: 'mdi-rocket-launch'
    },
    title: 'Demo App Framework',
    subtitle: 'Enterprise Framework'
  },
  header: {
    visible: true,
    height: 64,
    breadcrumbs: true,
    search: true,
    searchPlaceholder: '搜尋全站...',
    notifications: true,
    userMenu: {
      visible: true,
      items: [
        { title: '個人設定', icon: 'mdi-account-cog', action: 'profile' },
        { title: '系統設定', icon: 'mdi-cog', action: 'settings' },
        { divider: true },
        { title: '登出系統', icon: 'mdi-logout', action: 'logout', color: 'error' }
      ]
    },
    themeToggle: true,
    actions: []
  },
  sidebar: {
    visible: true,
    width: 280,
    collapsible: true,
    mainMenuTitle: '主選單'
  },
  footer: {
    visible: true,
    fixed: false,
    content: 'Copyright © 2026 Demo App. All rights reserved.'
  },
  theme: {
    defaultTheme: 'light',
    primaryColor: '#1976D2'
  }
}
