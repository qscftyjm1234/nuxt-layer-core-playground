import type { ApiResponse, UserListResponse } from '~/../packages/nuxt-core/types/api'

/**
 * 使用者資料層 (從 nuxt3-test 遷移)
 */
const api = useClient('/users')

const userRepository = {
  /**
   * 取得使用者列表
   */
  getUsers(params = {}, options = {}) {
    return api.get<UserListResponse>('/', {
      query: params,
      ...options
    })
  },

  /**
   * 根據 ID 取得單一使用者
   */
  getUserById(id: MaybeRefOrGetter<string | number>) {
    return api.get<ApiResponse<any>>(`/${unref(id)}`)
  },

  /**
   * 建立使用者
   */
  createUser(userData: any) {
    return api.post('/', userData)
  },

  /**
   * 更新使用者
   */
  updateUser(id: string | number, userData: any) {
    return api.put(`/${id}`, userData)
  },

  /**
   * 刪除使用者
   */
  deleteUser(id: string | number) {
    return api.delete(`/${id}`)
  }
}

export default userRepository
