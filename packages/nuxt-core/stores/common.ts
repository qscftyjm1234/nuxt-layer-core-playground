import { defineStore } from 'pinia'

/**
 * 通用業務資料 Store (sCommon)
 */
export const sCommon = defineStore('common', () => {
  /**
   * 取得產品群組名稱
   */
  const getProductGroupText = (value: any) => {
    // 模擬實作，實際應從 API 或配置取得
    const map: Record<string, string> = {
      Admin: '管理員',
      User: '一般用戶',
      Guest: '訪客'
    }
    return map[value] || value
  }

  /**
   * 狀態文字轉換
   */
  const statusText = (value: any) => {
    if (value === 'Y' || value === true) return '啟用'
    if (value === 'N' || value === false) return '停用'
    return value
  }

  return {
    getProductGroupText,
    statusText
  }
})
