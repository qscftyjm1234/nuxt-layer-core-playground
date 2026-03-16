/**
 * 示範：Repository 模式與 useApi 的整合
 */
const exampleRepository = {
  /** 獲取使用者列表 */
  getUsers: () => useApi().get('/users'),
  /** 建立使用者 */
  createUser: (data: any) => useApi().post('/users', data)
}

export default exampleRepository
