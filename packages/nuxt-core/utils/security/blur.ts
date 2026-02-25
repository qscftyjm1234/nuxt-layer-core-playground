/**
 * 模糊層工具函式
 * @description 建立與管理安全防護用的模糊遮罩層
 */

/**
 * 模糊層設定選項
 */
export interface BlurOverlayOptions {
  /** 元素 ID */
  id: string
  /** z-index 層級 */
  zIndex?: number
  /** 模糊程度 (px) */
  blurAmount?: number
  /** 圖示 emoji */
  icon?: string
  /** 標題文字 */
  title?: string
  /** 訊息內容 */
  message?: string
  /** 動作提示文字 */
  action?: string
  /** 點擊是否解除模糊 */
  clickToDismiss?: boolean
  /** 是否可點擊 (pointer-events) */
  pointerEvents?: boolean
  /** 顯示時的回呼函式 */
  onShow?: () => void
  /** 隱藏時的回呼函式 */
  onHide?: () => void
}

/**
 * 模糊層實例介面
 */
export interface BlurOverlay {
  /** DOM 元素 */
  element: HTMLDivElement
  /** 顯示模糊層 */
  show: () => void
  /** 隱藏模糊層 */
  hide: () => void
  /** 檢查是否可見 */
  isVisible: () => boolean
}

/**
 * 建立模糊遮罩層
 * @param options 設定選項
 * @returns 模糊層實例
 */
export function createBlurOverlay(options: BlurOverlayOptions): BlurOverlay {
  const {
    id,
    zIndex = 999999,
    blurAmount = 8,
    icon = '⚠️',
    title = '',
    message = '',
    action = '',
    clickToDismiss: shouldDismissOnClick = false,
    pointerEvents: hasPointerEvents = true,
    onShow,
    onHide
  } = options

  const overlay = document.createElement('div')
  overlay.id = id
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(${blurAmount}px);
    -webkit-backdrop-filter: blur(${blurAmount}px);
    z-index: ${zIndex};
    display: none;
    ${hasPointerEvents ? 'cursor: pointer;' : 'pointer-events: none;'}
    justify-content: center;
    align-items: center;
  `

  // 只有在有內容時才顯示訊息框
  if (title || message || action) {
    overlay.innerHTML = `
      <div style="
        text-align: center;
        font-family: 'Microsoft JhengHei', -apple-system, sans-serif;
        background: #fff;
        padding: 28px 36px;
        border-radius: 8px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
      ">
        ${icon ? `<div style="font-size: 32px; margin-bottom: 12px;">${icon}</div>` : ''}
        ${title ? `<div style="font-size: 15px; font-weight: 600; color: #333; margin-bottom: 8px;">${title}</div>` : ''}
        ${message ? `<div style="font-size: 13px; color: #666; margin-bottom: ${action ? '16px' : '0'};">${message}</div>` : ''}
        ${action ? `<div style="font-size: 12px; color: #999;">${action}</div>` : ''}
      </div>
    `
  }

  document.body.appendChild(overlay)

  const show = () => {
    overlay.style.display = 'flex'
    onShow?.()
  }

  const hide = () => {
    overlay.style.display = 'none'
    onHide?.()
  }

  const isVisible = () => overlay.style.display === 'flex'

  // 點擊解除
  if (shouldDismissOnClick) {
    overlay.addEventListener('click', hide)
  }

  return {
    element: overlay,
    show,
    hide,
    isVisible
  }
}

/**
 * 顯示安全警告 Toast
 * @param message 警告訊息
 */
export function showSecurityWarning(message: string): void {
  const warning = document.createElement('div')
  warning.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, #ff6b6b, #ee5a5a);
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    z-index: 1000000;
    box-shadow: 0 4px 12px rgba(255, 107, 107, 0.4);
    animation: slideDown 0.3s ease-out;
  `
  warning.textContent = `⚠️ ${message}`

  // 加入動畫樣式
  const animStyle = document.createElement('style')
  animStyle.textContent = `
    @keyframes slideDown {
      from { transform: translateX(-50%) translateY(-100%); opacity: 0; }
      to { transform: translateX(-50%) translateY(0); opacity: 1; }
    }
  `
  document.head.appendChild(animStyle)
  document.body.appendChild(warning)

  // 3秒後移除
  setTimeout(() => {
    warning.style.animation = 'slideDown 0.3s ease-out reverse'
    setTimeout(() => warning.remove(), 300)
  }, 3000)
}
