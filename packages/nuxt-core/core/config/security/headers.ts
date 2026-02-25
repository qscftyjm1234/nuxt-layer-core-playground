import type { NuxtConfig } from 'nuxt/schema'

/**
 * @功能 安全性 Header 設定
 * @description 設定各種安全性相關的 HTTP Response Headers
 */
export const securityConfig: NuxtConfig['routeRules'] = {
  // 全域安全性設定 (目前的用途)
  '/**': {
    headers: {
      /**
       * 防止 Clickjacking 攻擊
       * SAMEORIGIN: 只允許同源網站嵌入 iframe
       */
      'X-Frame-Options': 'SAMEORIGIN',

      /**
       * 防止 MIME Type Sniffing
       * 瀏覽器不會自動偵測檔案類型，防止惡意檔案偽裝
       */
      'X-Content-Type-Options': 'nosniff',

      /**
       * XSS 過濾器（較舊的保護機制）
       * 現代瀏覽器建議搭配 CSP 使用
       */
      'X-XSS-Protection': '1; mode=block',

      /**
       * 控制 Referrer 資訊傳送
       * strict-origin-when-cross-origin: 跨域時只傳送 origin
       */
      'Referrer-Policy': 'strict-origin-when-cross-origin',

      /**
       * 強制 HTTPS 連線 (HSTS)
       * max-age: 1年 (31536000秒)
       * includeSubDomains: 包含子網域
       * @注意 確保網站有有效的 SSL 憑證再啟用
       */
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',

      /**
       * 權限策略 - 限制瀏覽器 API 使用
       * 禁用相機、麥克風、地理位置等敏感 API
       */
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',

      /**
       * 內容安全策略 (CSP) - Report Only 模式
       *
       * 目前設定為 "Report Only"，這意味著：
       * 1. 瀏覽器會檢查安全規則，但 **不會真的阻擋** 資源載入。
       * 2. 違反規則時，會顯示在 Console 中供開發者除錯。
       *
       * [建議] 在專案穩定後，將 Header 名稱改回 'Content-Security-Policy' 以啟用強制阻擋。
       */
      'Content-Security-Policy-Report-Only': [
        "default-src 'self'", // 預設：只允許同源 (自己的網域)
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // JS：允許 inline (Vue 需要) 與 eval
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com", // CSS：允許 inline 與 Google Fonts
        "img-src 'self' data: https: blob:", // 圖片：允許 https 圖片、Base64、Blob
        "font-src 'self' https://fonts.gstatic.com data:", // 字型：允許 Google Fonts
        "connect-src 'self' https: wss:", // 連線：允許 HTTPS API 與 WebSocket
        "frame-ancestors 'self'", // 嵌入：只允許自己嵌入自己 (防 iframe 攻擊)
        "base-uri 'self'", // <base> 標籤：只准自己
        "form-action 'self'" // 表單提交：只准自己
      ].join('; ')
    }
  }
}
