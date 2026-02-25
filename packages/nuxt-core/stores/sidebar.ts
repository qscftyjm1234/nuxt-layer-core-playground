import { defineStore } from 'pinia'
// 權限或篩選
import { buildSidebar, type SidebarItem, type ModuleConfig } from '../core/sidebar/buildSidebar'
// Sidebar
import { sidebarRegistry } from '../core/sidebar/registry'

/**
 * 側邊欄狀態介面
 */
interface SidebarState {
  items: SidebarItem[]
}

/**
 * 側邊欄 Store
 * 負責管理與產生側邊欄選單項目
 */
export const useSidebarStore = defineStore('sidebar', {
  state: (): SidebarState => ({
    items: []
  }),

  actions: {
    /**
     * 產生側邊欄選單
     *
     * 根據使用者權限與系統設定，過濾並產生最終的側邊欄結構。
     *
     * @param userPermissions - 使用者擁有的權限列表 (例如 ['user.view', 'setting.edit'])
     * @param companyModules - (可選) 公司特定的模組設定，用於客製化邏輯
     */
    generate(userPermissions: string[], companyModules?: string) {
      const registry = sidebarRegistry as ModuleConfig[]

      const config = useRuntimeConfig()
      // @ts-ignore
      const enabledModules = config.public.productConfig?.modules || []

      this.items = buildSidebar({
        sidebarRegistry: registry,
        enabledModules,
        permissions: userPermissions,
        company: companyModules
      })
    }
  }
})
