import { productConfig } from '../../scripts/product-loader'

/**
 * 全域主題設計變數 (Design Tokens)
 * 供 Vuetify、Tailwind 或其他 UI 框架共用的基礎變數
 */
export const themeConfig = {
  // ========================================================================
  // 品牌與語意色彩 (Semantic Colors)
  // ========================================================================
  colors: {
    primary: productConfig.theme?.primaryColor || '#2563eb',
    business: productConfig.theme?.businessColor || '#fa541c',
    success: productConfig.theme?.successColor || '#10b981',
    warning: productConfig.theme?.warningColor || '#f59e0b',
    error: productConfig.theme?.errorColor || '#ef4444',
    info: productConfig.theme?.infoColor || '#3b82f6'
  },

  // ========================================================================
  // 基礎樣式變數 (Base Variables)
  // ========================================================================
  typography: {
    fontFamily: `Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif`,
    fontSizeBase: 14
  },

  shape: {
    borderRadius: productConfig.theme?.borderRadius ?? 8,
    lineWidth: 1
  },

  // ========================================================================
  // 預留其他彈性擴充
  // ========================================================================
  animation: {
    enabled: productConfig.theme?.animation ?? true,
    motionUnit: 0.1
  }
}
