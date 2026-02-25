/**
 * 功能開關設定
 *
 * 這個檔案定義了系統中所有可用的功能開關。
 * 不同的前端專案或客戶可以根據需求啟用或停用特定功能。
 *
 * @module config/features
 */

export interface FeatureConfig {
  /** 功能是否啟用 */
  enabled: boolean
  /** 功能描述 */
  description: string
  /** 對應的環境變數名稱 (可選) */
  envKey?: string
  /** 建議使用的環境 (development, staging, production, all) */
  environments?: ('development' | 'staging' | 'production' | 'all')[]
}

export interface FeatureFlags {
  /** 開發工具相關功能 */
  devTools: {
    /** 自動產生函式歷史記錄文件 */
    historyGeneration: FeatureConfig
    /** API Mock 功能 */
    apiMock: FeatureConfig
  }
}

/**
 * 預設功能開關設定
 *
 * 可以透過環境變數覆蓋這些預設值
 * 環境變數格式: NUXT_PUBLIC_FEATURE_<CATEGORY>_<FEATURE_NAME>=true|false
 */
export const defaultFeatures: FeatureFlags = {
  devTools: {
    historyGeneration: {
      enabled: true,
      description: '自動產生函式歷史記錄文件,追蹤業務邏輯演進',
      envKey: 'NUXT_PUBLIC_FEATURE_HISTORY_GENERATION',
      environments: ['development', 'staging']
    },
    apiMock: {
      enabled: true,
      description: '開發環境使用 Mock API 數據',
      envKey: 'NUXT_PUBLIC_FEATURE_API_MOCK',
      environments: ['development']
    }
  }
}
