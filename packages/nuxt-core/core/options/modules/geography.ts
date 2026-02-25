import type { OptionItem } from '../types'

/**
 * 國家列表 - 從 API 取得
 * @returns 國家選項列表
 */
export const countries = async (): Promise<OptionItem[]> =>
  // 模擬資料
  [
    { label: '台灣', value: 'TW' },
    { label: '日本', value: 'JP' },
    { label: '美國', value: 'US' },
    { label: '韓國', value: 'KR' }
  ]

/**
 * 幣別列表 - 從 API 取得
 * @returns 幣別選項列表
 */
export const currencies = async (): Promise<OptionItem[]> =>
  // 範例
  [
    { label: '新台幣 (TWD)', value: 'TWD' },
    { label: '美元 (USD)', value: 'USD' },
    { label: '日圓 (JPY)', value: 'JPY' },
    { label: '歐元 (EUR)', value: 'EUR' }
  ]

/**
 * 鄉鎮區列表 - 帶參數範例
 * @param cityId - 城市代碼 (e.g. TPE, KHH)
 * @returns 該城市的鄉鎮區列表
 */
export const townships = async (cityId?: string): Promise<OptionItem[]> => {
  if (!cityId) return []

  // 模擬 API 延遲
  await new Promise((r) => setTimeout(r, 1000))

  if (cityId === 'TPE') {
    return [
      { label: '中正區', value: '100' },
      { label: '大同區', value: '103' },
      { label: '中山區', value: '104' }
    ]
  }

  if (cityId === 'KHH') {
    return [
      { label: '新興區', value: '800' },
      { label: '前金區', value: '801' },
      { label: '苓雅區', value: '802' }
    ]
  }

  return []
}
