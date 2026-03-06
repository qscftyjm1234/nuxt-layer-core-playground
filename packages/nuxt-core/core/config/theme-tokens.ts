import { productConfig } from '../../scripts/product-loader'

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
    primary: productConfig.theme?.primaryColor || '#1677ff',
    business: productConfig.theme?.businessColor || '#fa541c',
    success: '#52c41a',
    warning: '#faad14',
    error: '#ff4d4f',
    info: '#1677ff'
  },

  // ========================================================================
  // 基礎樣式變數 (Base Variables)
  // ========================================================================
  typography: {
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
    fontSizeBase: 14
  },

  shape: {
    borderRadius: productConfig.theme?.borderRadius ?? 6,
    lineWidth: 1
  },

  // ========================================================================
  // 預留其他彈性擴充
  // ========================================================================
  animation: {
    motionUnit: 0.1
  }
}
