/**
 * @功能 浮水印 Composable
 * @description 在頁面上繪製浮水印，用於追溯資料來源
 * @用法
 * ```vue
 * <script setup>
 * const { showWatermark, hideWatermark } = useWatermark()
 *
 * onMounted(() => {
 *   showWatermark({ text: '使用者帳號' })
 * })
 * </script>
 * ```
 */

interface WatermarkOptions {
  /** 浮水印文字（預設：使用者帳號 + 時間） */
  text?: string
  /** 字體大小（預設：16） */
  fontSize?: number
  /** 字體顏色（預設：rgba(0, 0, 0, 0.08)） */
  color?: string
  /** 旋轉角度（預設：-25） */
  rotate?: number
  /** 水平間距（預設：200） */
  gapX?: number
  /** 垂直間距（預設：150） */
  gapY?: number
  /** z-index（預設：9999） */
  zIndex?: number
}

/**
 *
 */
export function useWatermark() {
  const watermarkId = 'app-watermark'
  let watermarkEl: HTMLDivElement | null = null

  /**
   * 建立浮水印 Canvas
   * @param options
   */
  const createWatermarkCanvas = (options: Required<WatermarkOptions>): string => {
    const { text, fontSize, color, rotate, gapX, gapY } = options

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!

    // 計算文字寬度以設定 canvas 尺寸
    ctx.font = `${fontSize}px Microsoft JhengHei, sans-serif`
    const textWidth = ctx.measureText(text).width

    // 設定 canvas 尺寸（包含間距）
    canvas.width = textWidth + gapX
    canvas.height = fontSize + gapY

    // 設定文字樣式
    ctx.font = `${fontSize}px Microsoft JhengHei, sans-serif`
    ctx.fillStyle = color
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    // 旋轉並繪製文字
    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.rotate((rotate * Math.PI) / 180)
    ctx.fillText(text, 0, 0)

    return canvas.toDataURL('image/png')
  }

  /**
   * 顯示浮水印
   * @param options
   */
  const showWatermark = (options: WatermarkOptions = {}) => {
    // 移除舊的浮水印
    hideWatermark()

    // 預設值
    const defaultOptions: Required<WatermarkOptions> = {
      text: options.text || `${new Date().toLocaleDateString()}`,
      fontSize: options.fontSize ?? 14,
      color: options.color ?? 'rgba(0, 0, 0, 0.06)',
      rotate: options.rotate ?? -25,
      gapX: options.gapX ?? 180,
      gapY: options.gapY ?? 120,
      zIndex: options.zIndex ?? 9999
    }

    // 建立浮水印圖片
    const watermarkImage = createWatermarkCanvas(defaultOptions)

    // 建立浮水印元素
    watermarkEl = document.createElement('div')
    watermarkEl.id = watermarkId
    watermarkEl.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: ${defaultOptions.zIndex};
      background-image: url('${watermarkImage}');
      background-repeat: repeat;
    `

    document.body.appendChild(watermarkEl)

    // 使用 MutationObserver 防止浮水印被移除
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        // 如果浮水印被移除，重新加入
        if (mutation.type === 'childList') {
          const removed = Array.from(mutation.removedNodes).find(
            (node) => (node as HTMLElement).id === watermarkId
          )
          if (removed && watermarkEl) {
            document.body.appendChild(watermarkEl)
          }
        }

        // 如果浮水印屬性被修改，重新建立
        if (mutation.type === 'attributes' && (mutation.target as HTMLElement).id === watermarkId) {
          hideWatermark()
          showWatermark(options)
        }
      })
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    })
  }

  /**
   * 隱藏浮水印
   */
  const hideWatermark = () => {
    const existing = document.getElementById(watermarkId)
    if (existing) {
      existing.remove()
    }
    watermarkEl = null
  }

  /**
   * 更新浮水印文字
   * @param text
   */
  const updateWatermark = (text: string) => {
    hideWatermark()
    showWatermark({ text })
  }

  return {
    showWatermark,
    hideWatermark,
    updateWatermark
  }
}
