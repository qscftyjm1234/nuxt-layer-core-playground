/**
 * usePermission - 權限管理模組
 * 提供使用者權限檢查、角色驗證和功能權限控制
 */

export interface PermissionConfig {
  /** 使用者角色列表 */
  roles: string[]
  /** 功能權限映射表 */
  permissions: Record<string, boolean>
}

export interface UsePermissionReturn {
  /** 檢查是否擁有指定角色 */
  hasRole: (role: string | string[]) => boolean
  /** 檢查是否擁有指定權限 */
  hasPermission: (permission: string | string[]) => boolean
  /** 檢查是否擁有所有指定角色 */
  hasAllRoles: (roles: string[]) => boolean
  /** 檢查是否擁有任一指定角色 */
  hasAnyRole: (roles: string[]) => boolean
  /** 檢查是否擁有所有指定權限 */
  hasAllPermissions: (permissions: string[]) => boolean
  /** 檢查是否擁有任一指定權限 */
  hasAnyPermission: (permissions: string[]) => boolean
  /** 設定使用者角色 */
  setRoles: (roles: string[]) => void
  /** 設定使用者權限 */
  setPermissions: (permissions: Record<string, boolean>) => void
  /** 新增角色 */
  addRole: (role: string) => void
  /** 移除角色 */
  removeRole: (role: string) => void
  /** 新增權限 */
  addPermission: (permission: string) => void
  /** 移除權限 */
  removePermission: (permission: string) => void
  /** 清除所有角色和權限 */
  clear: () => void
  /** 當前角色列表 */
  roles: Ref<string[]>
  /** 當前權限映射表 */
  permissions: Ref<Record<string, boolean>>
}

/**
 * 權限管理 Composable
 * @param initialConfig - 初始權限設定
 * @returns 權限管理方法和狀態
 */
export function usePermission(initialConfig?: Partial<PermissionConfig>): UsePermissionReturn {
  // 使用者角色列表
  const roles = ref<string[]>(initialConfig?.roles || [])

  // 功能權限映射表
  const permissions = ref<Record<string, boolean>>(initialConfig?.permissions || {})

  /**
   * 檢查是否擁有指定角色
   * @param role - 角色名稱或角色列表
   * @returns 是否擁有角色
   */
  const hasRole = (role: string | string[]): boolean => {
    if (Array.isArray(role)) {
      return role.some((r) => roles.value.includes(r))
    }
    return roles.value.includes(role)
  }

  /**
   * 檢查是否擁有指定權限
   * @param permission - 權限名稱或權限列表
   * @returns 是否擁有權限
   */
  const hasPermission = (permission: string | string[]): boolean => {
    if (Array.isArray(permission)) {
      return permission.some((p) => permissions.value[p] === true)
    }
    return permissions.value[permission] === true
  }

  /**
   * 檢查是否擁有所有指定角色
   * @param roleList - 角色列表
   * @returns 是否擁有所有角色
   */
  const hasAllRoles = (roleList: string[]): boolean =>
    roleList.every((role) => roles.value.includes(role))

  /**
   * 檢查是否擁有任一指定角色
   * @param roleList - 角色列表
   * @returns 是否擁有任一角色
   */
  const hasAnyRole = (roleList: string[]): boolean =>
    roleList.some((role) => roles.value.includes(role))

  /**
   * 檢查是否擁有所有指定權限
   * @param permissionList - 權限列表
   * @returns 是否擁有所有權限
   */
  const hasAllPermissions = (permissionList: string[]): boolean =>
    permissionList.every((permission) => permissions.value[permission] === true)

  /**
   * 檢查是否擁有任一指定權限
   * @param permissionList - 權限列表
   * @returns 是否擁有任一權限
   */
  const hasAnyPermission = (permissionList: string[]): boolean =>
    permissionList.some((permission) => permissions.value[permission] === true)

  /**
   * 設定使用者角色
   * @param newRoles - 新的角色列表
   */
  const setRoles = (newRoles: string[]): void => {
    roles.value = [...newRoles]
  }

  /**
   * 設定使用者權限
   * @param newPermissions - 新的權限映射表
   */
  const setPermissions = (newPermissions: Record<string, boolean>): void => {
    permissions.value = { ...newPermissions }
  }

  /**
   * 新增角色
   * @param role - 角色名稱
   */
  const addRole = (role: string): void => {
    if (!roles.value.includes(role)) {
      roles.value.push(role)
    }
  }

  /**
   * 移除角色
   * @param role - 角色名稱
   */
  const removeRole = (role: string): void => {
    const index = roles.value.indexOf(role)
    if (index > -1) {
      roles.value.splice(index, 1)
    }
  }

  /**
   * 新增權限
   * @param permission - 權限名稱
   */
  const addPermission = (permission: string): void => {
    permissions.value[permission] = true
  }

  /**
   * 移除權限
   * @param permission - 權限名稱
   */
  const removePermission = (permission: string): void => {
    delete permissions.value[permission]
  }

  /**
   * 清除所有角色和權限
   */
  const clear = (): void => {
    roles.value = []
    permissions.value = {}
  }

  return {
    hasRole,
    hasPermission,
    hasAllRoles,
    hasAnyRole,
    hasAllPermissions,
    hasAnyPermission,
    setRoles,
    setPermissions,
    addRole,
    removeRole,
    addPermission,
    removePermission,
    clear,
    roles,
    permissions
  }
}
