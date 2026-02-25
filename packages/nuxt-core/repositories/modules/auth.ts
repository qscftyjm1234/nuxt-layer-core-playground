
import type { UseFetchOptions } from 'nuxt/app'

// 定義 Client，指向 /auth (假設後端路由是 /api/auth)
const api = useClient('/auth')

export default {
  /**
   * 使用者登入
   * @param credentials { username, password }
   * @param options
   */
  login(credentials: any, options: UseFetchOptions<any> = {}) {
    return api.post('/login', credentials, options)
  },

  /**
   * 使用者登出 (如果有的話)
   */
  logout() {
    return api.post('/logout')
  },

  /**
   * 取得當前使用者資訊 (Session/Me)
   */
  getProfile() {
    return api.get('/me')
  }
}
