/**
 * 側邊欄項目介面
 * 整合了不同模組的路由定義格式 (path/to)
 */
export interface SidebarItem {
  label: string
  icon: string
  permission: string
  path?: string // 舊格式
  to?: string // 新格式
  disabled?: boolean // 是否禁用 (顯示但不可點擊)
  module?: string // 所屬模組 (自動注入)
  children?: SidebarItem[] // 子選單
  [key: string]: any
}

/**
 * 模組設定介面
 */
export interface ModuleConfig {
  module: string
  routes?: SidebarItem[]
  items?: SidebarItem[]
}

/**
 * 建構側邊欄的選項介面
 */
export interface BuildSidebarOptions {
  /** 註冊的模組列表 */
  sidebarRegistry: ModuleConfig[]
  /** 目前啟用的模組代碼列表，如 ["auth", "setting"] */
  enabledModules: string[]
  /** 使用者擁有的權限列表，如 ["user.view"] */
  permissions?: string[]
  /** 公司代號 (可選，用於客製化邏輯) */
  company?: string
  /** 自定義過濾函式 (可選，用於更彈性的過濾邏輯) */
  customFilter?: (item: SidebarItem) => boolean
}

/**
 * 建構側邊欄選單
 *
 * 負責整合各模組設定，過濾權限與啟用狀態，並標準化輸出格式。
 *
 * @param options - 建構選項
 * @param options.sidebarRegistry - 所有模組的側邊欄設定註冊表
 * @param options.enabledModules - 目前系統啟用的模組清單，未啟用的模組將被過濾
 * @param options.permissions - 當前使用者的權限清單，無權限的項目將被過濾
 * @param options.company - 公司代號，保留給未來客製化邏輯使用
 * @param options.customFilter - 自定義過濾函式，回傳 false 則該項目會被隱藏
 * @returns 標準化的側邊欄項目陣列，包含 label, icon, to, disabled
 */
export function buildSidebar({
  sidebarRegistry = [],
  permissions = [],
  enabledModules = [],
  customFilter
}: BuildSidebarOptions) {
  // 遞迴處理函式
  const processItems = (items: SidebarItem[], moduleName: string): SidebarItem[] =>
    items
      .map((item) => ({ ...item, module: moduleName })) // 注入模組名稱
      .filter((item) => {
        // 1. 權限過濾
        // 1. 權限過濾 (支援 '*' 為超級管理員權限)
        if (item.permission && !permissions.includes('*') && !permissions.includes(item.permission))
          return false
        // 2. 自定義過濾
        if (customFilter && !customFilter(item)) return false
        return true
      })
      .map((item) => {
        const newItem: SidebarItem = {
          label: item.label,
          icon: item.icon,
          permission: item.permission, // 保留 permission 供除錯或後續使用
          to: item.to ?? item.path ?? '',
          disabled: item.disabled ?? false,
          module: item.module
        }

        // 遞迴處理子選單
        if (item.children && item.children.length > 0) {
          const processedChildren = processItems(item.children, moduleName)
          if (processedChildren.length > 0) {
            newItem.children = processedChildren
          }
        }

        return newItem
      })
      // 過濾掉沒有子項目且沒有連結的父層 (視需求而定，這裡假設如果父層沒連結且子層都被過濾光了，父層也該隱藏)
      // 但如果父層本身有連結，則保留
      .filter((item) => {
        const hasChildren = item.children && item.children.length > 0
        const hasLink = !!item.to
        return hasChildren || hasLink
      })

  return sidebarRegistry
    .filter((m) => enabledModules.includes(m.module))
    .flatMap((m) => {
      const items = m.routes ?? m.items ?? []
      return processItems(items, m.module)
    })
}
