
import type { UseFetchOptions } from 'nuxt/app'
import type { UserListResponse } from '../../types/api'

type MaybeRef<T> = T | Ref<T>

interface UserQueryParams {
  page?: MaybeRef<number>
  itemsPerPage?: MaybeRef<number>
  q?: MaybeRef<string>
}

// 1. 定義 Client
const api = useClient('/users')

export default {
  /**
   * 取得使用者列表
   * @param params - 查詢參數 (如分頁、搜尋關鍵字)
   * @param options - 其他 Fetch 選項
   * @returns List of users
   */
  getUsers(params: UserQueryParams = {}, options: UseFetchOptions<UserListResponse> = {}) {
    return api.get<UserListResponse>('/', {
      query: params,
      ...options
    })
  },

  /**
   * 根據 ID 取得單一使用者
   * @param id - 使用者 ID
   * @returns User detail
   */
  getUserById(id: MaybeRef<number>) {
    return api.get<any>(`/${unref(id)}`)
  },

  /**
   * [範例] 建立使用者
   * @param userData - 使用者資料物件
   * @returns Created user data
   */
  createUser(userData: any) {
    return api.post('/', userData)
  },

  /**
   * [範例] 搜尋使用者
   * @param keyword - 搜尋關鍵字
   * @returns Search results
   */
  searchUsers(keyword: Ref<string>) {
    return api.get('/search', {
      query: { q: keyword },
      watch: [keyword]
    })
  },

  /**
   * [範例] 更新使用者
   * @param id - 使用者 ID
   * @param userData - 更新的使用者資料
   * @returns Updated user data
   */
  updateUser(id: number, userData: any) {
    return api.put(`/${id}`, userData)
  },

  /**
   * [範例] 刪除使用者
   * @param id - 使用者 ID
   * @returns Deletion result
   */
  deleteUser(id: number) {
    return api.delete(`/${id}`)
  },

  /**
   * [範例] 取得大量資料 (延遲載入)
   * @returns Heavy data report
   */
  getHeavyData() {
    // 注意：這裡是 /heavy-report，因為 api base 是 /users
    // 假設 heavy-report 也是在 /users 下，否則需另外處理
    // 原始碼是 useApi('/heavy-report')，這可能不在 /users 下
    // 為了安全，這裡假設它是獨立的
    // 如果是獨立的，應該用 useApi 或另外一個 useClient
    // 這裡我判斷它可能是 /users/heavy-report 的筆誤，或者真的是 root level
    // 為了保持功能，我這裡用 root client 處理 (假設它不是 users/*)
    // 但原檔放在 user.ts 卻叫 /heavy-report 有點怪
    // 我先維持原路徑：/heavy-report (不接在 /users 後面)

    // 這裡特別展示：如何在 policy 模式下呼叫「外面」的 API
    // 方法 1: 使用 useApi
    // return useApi('/heavy-report', { lazy: true })

    // 方法 2 (如果它其實是 user 報表):
    return useApi('/heavy-report', { lazy: true })
  }
}
