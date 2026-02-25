/**
 * 標準 API 回應格式
 * @template T - 資料內容的型別
 */
export interface ApiResponse<T> {
  code: number
  message: string
  data: T
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
  user: {
    id: string
    username: string
    name: string
  }
}

export interface UserListResponse {
  items: any[]
  total: number
}

export interface OrderListResponse {
  items: any[]
  total: number
}

export interface OrderDetailResponse {
  id: string
  items: any[]
}
