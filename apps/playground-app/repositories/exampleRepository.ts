/**
 * 示範：Repository 模式與 useApi 的整合
 */
export const exampleRepository = () => {
  const api = useApi()
  
  return {
    /** 獲取使用者列表 */
    getUsers: () => api.get('/users'),
    /** 建立使用者 */
    createUser: (data: any) => api.post('/users', data)
  }
}
