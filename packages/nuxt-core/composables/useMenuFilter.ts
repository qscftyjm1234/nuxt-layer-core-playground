/**
 * useMenuFilter - 選單權限過濾模組
 * 負責根據使用者權限過濾選單項目
 */

export interface MenuItem {
  label: string
  icon?: string
  path?: string
  permission?: string
  roles?: string[]
  children?: MenuItem[]
  [key: string]: any
}

/**
 * 選單權限過濾 Composable
 * 提供根據權限與角色過濾選單項目的功能
 * @returns 包含 filterMenu 方法的物件
 */
export function useMenuFilter() {
  const { hasPermission, hasRole } = usePermission()

  /**
   * 遞迴過濾選單項目
   * @param items 選單列表
   * @returns 過濾後的選單列表
   */
  const filterMenu = (items: MenuItem[]): MenuItem[] =>
    items.reduce((filtered: MenuItem[], item) => {
      // 1. 檢查自身權限
      // 如果有設定 permission，必須通過 hasPermission 檢查
      const isPermissionPass = item.permission ? hasPermission(item.permission) : true

      // 如果有設定 roles，必須通過 hasRole 檢查 (任一角色符合即可)
      const isRolePass =
        item.roles && item.roles.length > 0 ? item.roles.some((r) => hasRole(r)) : true

      if (!isPermissionPass || !isRolePass) {
        return filtered // 權限或角色不符，直接跳過
      }

      // 2. 處理子選單 (遞迴)
      if (item.children && item.children.length > 0) {
        const filteredChildren = filterMenu(item.children)

        // 如果子選單過濾後全空，且父層本身沒有連結(path)，則隱藏父層
        // (例如「保險行政」沒有連結，如果底下子功能都沒權限，那個標題也不該顯示)
        if (filteredChildren.length === 0 && !item.path) {
          return filtered
        }

        // 複製 item 並替換 children
        filtered.push({
          ...item,
          children: filteredChildren
        })
      } else {
        // 沒有 children 且權限通過，直接加入
        filtered.push(item)
      }

      return filtered
    }, [])

  return {
    filterMenu
  }
}
