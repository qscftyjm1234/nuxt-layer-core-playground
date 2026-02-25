/**
 * @功能 前端安全防護 Plugin (Client Only)
 * @desc 實作各種前端防護機制,增加資料洩漏難度
 * @注意 這些措施無法 100% 阻止,但可大幅增加洩漏成本
 */
import { defaultSecurityOptions } from '../core/config/security/options'
import { securityMessages } from '../core/config/security/messages'
import { createBlurOverlay, showSecurityWarning } from '../utils/security/blur'
import type { BlurOverlay } from '../utils/security/blur'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  // ✅ 檢查是否啟用資安模式(預設關閉)
  const isSecurityEnabled =
    config.public.enableSecurityMode === true || String(config.public.enableSecurityMode) === 'true'

  // 如果未啟用,直接返回
  if (!isSecurityEnabled) {
    console.log('[Security] 資安模式已關閉')
    return
  }

  console.log('[Security] 資安模式已啟用')
  const isProduction = config.public.app.env === 'production'

  // 使用集中化設定
  const options = defaultSecurityOptions
  const messages = securityMessages

  // ==========================================
  // ======= 建立所有模糊層 =======
  // ==========================================

  // 截圖偵測模糊層(持續顯示,需點擊解除)
  const screenshotBlur: BlurOverlay = createBlurOverlay({
    id: 'screenshot-blur',
    zIndex: 2147483647,
    blurAmount: 8,
    icon: messages.screenshot.icon,
    title: messages.screenshot.title,
    message: messages.screenshot.message,
    action: messages.screenshot.action,
    clickToDismiss: true,
    onShow: () => {
      // 清空剪貼簿
      navigator.clipboard.writeText('').catch(() => {})
    }
  })

  // 先發制人模糊層(無訊息,純模糊)
  const preemptiveBlur: BlurOverlay = createBlurOverlay({
    id: 'preemptive-blur',
    zIndex: 2147483646,
    blurAmount: 8,
    pointerEvents: false
  })

  // 視窗失焦模糊層
  const visibilityBlur: BlurOverlay = createBlurOverlay({
    id: 'visibility-blur',
    zIndex: 999999,
    blurAmount: 8,
    icon: messages.visibility.icon,
    title: messages.visibility.title,
    message: messages.visibility.message,
    action: messages.visibility.action
  })

  // 閒置超時模糊層
  const idleBlur: BlurOverlay = createBlurOverlay({
    id: 'idle-blur',
    zIndex: 2147483645,
    blurAmount: 12,
    icon: messages.idle.icon,
    title: messages.idle.title,
    message: messages.idle.message,
    action: messages.idle.action,
    clickToDismiss: true
  })

  // ==========================================
  // ======= 基礎防護功能 =======
  // ==========================================

  // ===== 1. 禁用右鍵選單 =====
  if (options.disableContextMenu) {
    document.addEventListener('contextmenu', (e: MouseEvent) => {
      e.preventDefault()
      return false
    })
  }

  // ===== 2. 禁用開發者工具快捷鍵 =====
  if (options.disableDevTools) {
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      // F12
      if (e.key === 'F12') {
        e.preventDefault()
        return false
      }

      // Ctrl+Shift+I (開發者工具)
      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault()
        return false
      }

      // Ctrl+Shift+J (Console)
      if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault()
        return false
      }

      // Ctrl+Shift+C (Element Inspector)
      if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault()
        return false
      }

      // Ctrl+U (View Source)
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault()
        return false
      }

      // Ctrl+S (Save Page)
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault()
        return false
      }

      // Ctrl+P (Print)
      if (e.ctrlKey && e.key === 'p') {
        e.preventDefault()
        return false
      }
    })
  }

  // ===== 3. 禁用文字選取 =====
  if (options.disableTextSelection) {
    document.body.style.userSelect = 'none'
    document.body.style.webkitUserSelect = 'none'

    const style = document.createElement('style')
    style.textContent = `
      body { user-select: none !important; -webkit-user-select: none !important; }
      .selectable { user-select: text !important; -webkit-user-select: text !important; }
    `
    document.head.appendChild(style)
  }

  // ===== 4. 禁用拖曳圖片/連結 =====
  if (options.disableDragDrop) {
    document.addEventListener('dragstart', (e: DragEvent) => {
      e.preventDefault()
      return false
    })

    document.addEventListener('drop', (e: DragEvent) => {
      e.preventDefault()
      return false
    })
  }

  // ===== 5. 生產環境移除 Console =====
  if (options.disableConsole) {
    const noop = () => {}
    console.log = noop
    console.warn = noop
    console.info = noop
    console.debug = noop
  }

  // ==========================================
  // ======= 防止截圖相關進階功能 =======
  // ==========================================

  // ===== 6. Print Screen 按鍵偵測與持續模糊 =====
  if (options.disablePrintScreen) {
    // 📌 方法1: keydown 立即模糊(盡早觸發)
    document.addEventListener(
      'keydown',
      (e: KeyboardEvent) => {
        // PrintScreen 鍵 - 持續模糊
        if (e.key === 'PrintScreen') {
          screenshotBlur.show()
          e.preventDefault()
          return false
        }

        // Windows + Shift + S (截圖工具) - 持續模糊
        if (e.shiftKey && e.metaKey && e.key.toLowerCase() === 's') {
          screenshotBlur.show()
          e.preventDefault()
          return false
        }

        // Alt + PrintScreen (截取當前視窗)
        if (e.key === 'PrintScreen' && e.altKey) {
          screenshotBlur.show()
          e.preventDefault()
          return false
        }

        // MacOS: Cmd + Shift + 3/4/5
        if (e.metaKey && e.shiftKey && ['3', '4', '5'].includes(e.key)) {
          screenshotBlur.show()
          e.preventDefault()
          return false
        }
      },
      true
    ) // 使用 capture: true 更早捕獲

    // 📌 方法2: keyup 也觸發(補救)
    document.addEventListener('keyup', (e: KeyboardEvent) => {
      if (e.key === 'PrintScreen') {
        screenshotBlur.show()
      }
    })

    // 📌 方法3: 「先發制人」策略 - 在截圖前就模糊
    let blurTimeout: ReturnType<typeof setTimeout> | null = null
    let isPreemptiveBlur = false

    // 顯示先發制人模糊
    const showQuickBlur = () => {
      preemptiveBlur.show()
      isPreemptiveBlur = true
    }

    // 隱藏先發制人模糊
    const hideQuickBlur = () => {
      preemptiveBlur.hide()
      isPreemptiveBlur = false
    }

    // 🔑 核心:當 Shift 按下時立即模糊
    document.addEventListener(
      'keydown',
      (e: KeyboardEvent) => {
        // 清除之前的計時器
        if (blurTimeout) {
          clearTimeout(blurTimeout)
          blurTimeout = null
        }

        // 當 Shift 鍵按下時,立即顯示模糊
        if (e.key === 'Shift') {
          showQuickBlur()
          console.log('[Security] Shift 按下,先發制人模糊')

          // 500ms 後如果沒有失焦(沒有截圖),則解除模糊
          blurTimeout = setTimeout(() => {
            if (isPreemptiveBlur && document.hasFocus()) {
              hideQuickBlur()
              console.log('[Security] 500ms 無截圖,解除模糊')
            }
          }, 500)
        }
      },
      true
    )

    // Shift 放開時,延遲解除模糊
    document.addEventListener(
      'keyup',
      (e: KeyboardEvent) => {
        if (e.key === 'Shift') {
          setTimeout(() => {
            if (isPreemptiveBlur && document.hasFocus()) {
              hideQuickBlur()
            }
          }, 300)
        }
      },
      true
    )

    // 視窗失焦時(確認是截圖),顯示持續模糊
    window.addEventListener('blur', () => {
      if (isPreemptiveBlur) {
        hideQuickBlur()
        screenshotBlur.show()
        console.warn('[Security] 確認截圖行為,顯示持續模糊')
      }
    })

    window.addEventListener('focus', () => {
      hideQuickBlur()
    })
  }

  // ===== 7. 視窗失焦時模糊畫面 =====
  if (options.blurOnVisibilityChange) {
    // 頁面切換到背景時
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        visibilityBlur.show()
      } else {
        setTimeout(() => visibilityBlur.hide(), 300)
      }
    })

    // 視窗失焦時
    window.addEventListener('blur', () => {
      visibilityBlur.show()
    })

    window.addEventListener('focus', () => {
      setTimeout(() => visibilityBlur.hide(), 300)
    })
  }

  // ===== 8. 偵測螢幕錄影 =====
  if (options.detectScreenCapture) {
    const detectDisplayMedia = () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
        const originalGetDisplayMedia = navigator.mediaDevices.getDisplayMedia.bind(
          navigator.mediaDevices
        )
        navigator.mediaDevices.getDisplayMedia = async (constraints) => {
          console.warn('[Security] Screen capture attempt detected - showing blur')
          screenshotBlur.show()
          navigator.clipboard.writeText('⚠️ 螢幕錄影已被偵測').catch(() => {})
          return originalGetDisplayMedia(constraints)
        }
      }
    }
    detectDisplayMedia()
  }

  // ===== 9. 阻止 Media Capture API =====
  if (options.preventMediaCapture) {
    const originalToDataURL = HTMLCanvasElement.prototype.toDataURL
    const originalToBlob = HTMLCanvasElement.prototype.toBlob

    HTMLCanvasElement.prototype.toDataURL = function (...args) {
      if (this.dataset.allowCapture !== 'true') {
        console.warn('[Security] Canvas capture attempt - showing blur')
        screenshotBlur.show()
        return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
      }
      return originalToDataURL.apply(this, args)
    }

    HTMLCanvasElement.prototype.toBlob = function (callback, ...args) {
      if (this.dataset.allowCapture !== 'true') {
        console.warn('[Security] Canvas toBlob attempt - showing blur')
        screenshotBlur.show()
        const emptyCanvas = document.createElement('canvas')
        emptyCanvas.width = 1
        emptyCanvas.height = 1
        return originalToBlob.apply(emptyCanvas, [callback, ...args])
      }
      return originalToBlob.apply(this, [callback, ...args])
    }
  }

  // ===== 10. 偵測開發者工具開啟 =====
  if (isProduction) {
    let devToolsOpen = false
    const threshold = 160

    const checkDevTools = () => {
      const widthThreshold = window.outerWidth - window.innerWidth > threshold
      const heightThreshold = window.outerHeight - window.innerHeight > threshold

      if (widthThreshold || heightThreshold) {
        if (!devToolsOpen) {
          devToolsOpen = true
          console.warn('[Security] DevTools may be open')
        }
      } else {
        devToolsOpen = false
      }
    }

    setInterval(checkDevTools, 1000)
  }

  // ===== 11. CSS 防護:列印時隱藏內容 =====
  const printProtectionStyle = document.createElement('style')
  printProtectionStyle.textContent = `
    @media print {
      body * {
        visibility: hidden !important;
      }
      body::after {
        content: "列印功能已被禁用";
        visibility: visible;
        display: block;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 24px;
        color: #666;
      }
    }
  `
  document.head.appendChild(printProtectionStyle)

  // ===== 12. 禁用瀏覽器導航快捷鍵 =====
  if (options.disableNavigation) {
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      // Alt + Left Arrow (上一頁)
      if (e.altKey && e.key === 'ArrowLeft') {
        e.preventDefault()
        return false
      }

      // Alt + Right Arrow (下一頁)
      if (e.altKey && e.key === 'ArrowRight') {
        e.preventDefault()
        return false
      }

      // Backspace (部分瀏覽器上一頁)
      if (
        e.key === 'Backspace' &&
        !(e.target as HTMLElement).matches('input, textarea, [contenteditable]')
      ) {
        e.preventDefault()
        return false
      }

      // F5 / Ctrl+R (重新整理)
      if (e.key === 'F5' || (e.ctrlKey && e.key === 'r')) {
        e.preventDefault()
        return false
      }

      // Ctrl+L / Alt+D / F6 (聚焦網址列)
      if ((e.ctrlKey && e.key === 'l') || (e.altKey && e.key === 'd') || e.key === 'F6') {
        e.preventDefault()
        return false
      }

      // Ctrl+T (新分頁)
      if (e.ctrlKey && e.key === 't') {
        e.preventDefault()
        return false
      }

      // Ctrl+W (關閉分頁)
      if (e.ctrlKey && e.key === 'w') {
        e.preventDefault()
        return false
      }

      // Ctrl+N (新視窗)
      if (e.ctrlKey && e.key === 'n') {
        e.preventDefault()
        return false
      }
    })
  }

  // ===== 13. 防止上一頁 =====
  if (options.preventBackNavigation) {
    history.pushState(null, '', location.href)

    window.addEventListener('popstate', () => {
      history.pushState(null, '', location.href)
    })

    window.addEventListener('beforeunload', (e) => {
      e.preventDefault()
      e.returnValue = ''
      return ''
    })
  }

  // ===== 14. 閒置超時自動模糊 =====
  if (options.idleTimeoutBlur) {
    let idleTimer: ReturnType<typeof setTimeout> | null = null

    const resetIdleTimer = () => {
      if (idleTimer) {
        clearTimeout(idleTimer)
      }
      idleTimer = setTimeout(() => {
        idleBlur.show()
        console.log('[Security] 閒置超時,畫面已鎖定')
      }, options.idleTimeoutDuration)
    }

    document.addEventListener('keydown', () => {
      if (idleBlur.isVisible()) {
        idleBlur.hide()
      }
      resetIdleTimer()
    })

    const activityEvents = ['mousemove', 'mousedown', 'scroll', 'touchstart', 'touchmove']
    activityEvents.forEach((event) => {
      document.addEventListener(
        event,
        () => {
          if (!idleBlur.isVisible()) {
            resetIdleTimer()
          }
        },
        { passive: true }
      )
    })

    idleBlur.element.addEventListener('click', resetIdleTimer)
    resetIdleTimer()
    console.log(
      `[Security] 閒置超時模糊已啟用,閒置 ${options.idleTimeoutDuration / 1000} 秒後將鎖定畫面`
    )
  }

  // ===== 15. Kiosk 模式 =====
  if (options.enableKioskMode) {
    const enterFullscreen = async () => {
      try {
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen()
        }
      } catch (err) {
        console.warn('[Security] Fullscreen request failed:', err)
      }
    }

    const handleFirstClick = () => {
      enterFullscreen()
      document.removeEventListener('click', handleFirstClick)
    }
    document.addEventListener('click', handleFirstClick)

    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement) {
        setTimeout(() => {
          if (confirm('為了安全考量,請維持全螢幕模式。點擊確定重新進入。')) {
            enterFullscreen()
          }
        }, 100)
      }
    })
  }

  // ===== 16. 在新視窗開啟(隱藏網址列)的工具函式 =====
  ;(window as any).openSecureWindow = (url: string = location.href) => {
    const width = screen.availWidth
    const height = screen.availHeight

    const features = [
      `width=${width}`,
      `height=${height}`,
      'top=0',
      'left=0',
      'menubar=no',
      'toolbar=no',
      'location=no',
      'status=no',
      'resizable=yes',
      'scrollbars=yes'
    ].join(',')

    const secureWindow = window.open(url, '_blank', features)

    if (secureWindow) {
      window.close()
    } else {
      alert('請允許彈出視窗以使用安全模式')
    }

    return secureWindow
  }
})
