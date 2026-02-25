// 通用的 API 回應結構
// 根據後端實際回傳格式調整
export interface ApiResponse<T> {
  data: T
  message?: string
  status?: number
}

// 使用者資料介面 (對應後端資料結構)
export interface User {
  id: number
  name: string
  email: string
  role: string
}

// 使用者列表回應介面
export interface UserListResponse {
  items: User[]
  total: number
}
