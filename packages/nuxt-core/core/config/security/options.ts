/**
 * 資安功能開關統一設定
 * @description 集中管理所有資安相關的功能開關
 */

/**
 * 資安選項介面定義
 */
export interface SecurityOptions {
  // === 基礎防護 ===
  /** 禁用右鍵選單 */
  disableContextMenu: boolean
  /** 禁用開發者工具快捷鍵 (F12, Ctrl+Shift+I 等) */
  disableDevTools: boolean
  /** 禁用文字選取 */
  disableTextSelection: boolean
  /** 禁用拖曳功能 */
  disableDragDrop: boolean
  /** 生產環境移除 Console 輸出 */
  disableConsole: boolean

  // === 截圖防護 ===
  /** 偵測並阻止 Print Screen */
  disablePrintScreen: boolean
  /** 視窗失焦時模糊畫面 */
  blurOnVisibilityChange: boolean
  /** 按下截圖鍵時模糊畫面 */
  blurOnPrintScreen: boolean
  /** 偵測螢幕錄影/截圖 API */
  detectScreenCapture: boolean
  /** 阻止 Canvas 截圖 */
  preventMediaCapture: boolean

  // === 進階防護 ===
  /** 啟用 Kiosk 模式 (全螢幕) */
  enableKioskMode: boolean
  /** 禁用瀏覽器導航快捷鍵 */
  disableNavigation: boolean
  /** 防止返回上一頁 */
  preventBackNavigation: boolean
  /** 閒置超時自動模糊 */
  idleTimeoutBlur: boolean
  /** 閒置超時時間 (毫秒) */
  idleTimeoutDuration: number
}

/**
 * 預設資安設定
 *
 * ---
 * ### 1. 基礎防護 (Basic Protection) - 針對一般使用者操作
 * - `disableContextMenu`: **禁用右鍵選單**：防止使用者按右鍵查看原始碼或存圖。
 * - `disableDevTools`: **禁用開發者工具**：阻止快捷鍵 (F12, Ctrl+Shift+I) 開啟檢查視窗。
 * - `disableTextSelection`: **禁用文字選取**：預設為 `false` (允許選取)，避免造成使用不便。
 * - `disableDragDrop`: **禁用拖曳功能**：防止使用者將圖片或內容拖曳到其他程式。
 * - `disableConsole`: **生產環境移除 Console**：在正式版自動清除所有的 `console.log`。
 *
 * ### 2. 截圖防護 (Screenshot Protection) - 針對資料外洩
 * - `disablePrintScreen`: **偵測截圖鍵**：按下 Print Screen 時會觸發保護。
 * - `blurOnPrintScreen`: **截圖時模糊**：當偵測到截圖動作時，立即將畫面變模糊。
 * - `blurOnVisibilityChange`: **視窗失焦模糊**：切換分頁或縮小視窗時，自動遮蓋畫面。
 * - `detectScreenCapture`: **偵測錄影 API**：監測瀏覽器是否正在被錄影或抓取畫面。
 * - `preventMediaCapture`: **阻止內容抓取**：對 Canvas 或特定媒體元素進行保護。
 *
 * ### 3. 進階防護 (Advanced & Navigation) - 針對導航與閒置
 * - `disableNavigation`: **禁用導航快捷鍵**：防止使用者用 Alt+左/右 鍵瀏覽歷史。
 * - `preventBackNavigation`: **防止返回上一頁**：加強瀏覽器歷史記錄的控制。
 * - `idleTimeoutBlur`: **閒置超時模糊**：長時間沒動滑鼠或鍵盤時自動鎖定畫面。
 * - `idleTimeoutDuration`: **閒置時間**：預設為 3 分鐘 (180,000 毫秒)。
 * - `enableKioskMode`: **全螢幕模式**：是否強制瀏覽器進入全螢幕。
 * ---
 */
export const defaultSecurityOptions: SecurityOptions = {
  // 基礎防護
  disableContextMenu: true,
  disableDevTools: true,
  disableTextSelection: false, // 預設允許選取,避免影響使用體驗
  disableDragDrop: true,
  disableConsole: process.env.NODE_ENV === 'production',

  // 截圖防護
  disablePrintScreen: true,
  blurOnVisibilityChange: true,
  blurOnPrintScreen: true,
  detectScreenCapture: true,
  preventMediaCapture: true,

  // 進階防護
  enableKioskMode: false, // 預設關閉,需手動啟用
  disableNavigation: true,
  preventBackNavigation: true,
  idleTimeoutBlur: true,
  idleTimeoutDuration: 3 * 60 * 1000 // 3 分鐘
}
