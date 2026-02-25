/**
 * useModal - 彈窗管理模組
 * 提供統一的彈窗控制、多層彈窗管理和確認對話框功能
 */

export interface ModalConfig {
  /** 彈窗標題 */
  title?: string
  /** 彈窗內容 */
  content?: string
  /** 確認按鈕文字 */
  confirmText?: string
  /** 取消按鈕文字 */
  cancelText?: string
  /** 是否顯示取消按鈕 */
  showCancel?: boolean
  /** 是否可以點擊遮罩關閉 */
  closeOnMask?: boolean
  /** 自訂 CSS 類別 */
  customClass?: string
  /** 是否點擊遮罩不關閉 */
  persistent?: boolean
  /**
   * 自訂元件 (用於 Slot 插入)
   * 可傳入 Vue Component Object
   */
  component?: any
  /**
   * 傳給自訂元件的 Props
   */
  componentProps?: Record<string, any>
}

export interface ModalInstance {
  /** 彈窗 ID */
  id: string
  /** 彈窗設定 */
  config: ModalConfig
  /** 是否顯示 */
  isVisible: boolean
  /** 確認回呼 */
  onConfirm?: () => void | Promise<void>
  /** 取消回呼 */
  onCancel?: () => void | Promise<void>
}

export interface UseModalReturn {
  /** 開啟彈窗 */
  open: (config: ModalConfig) => Promise<boolean>
  /** 關閉彈窗 */
  close: (id?: string) => void
  /** 關閉所有彈窗 */
  closeAll: () => void
  /** 確認對話框 */
  confirm: (config: ModalConfig) => Promise<boolean>
  /** 警告對話框 */
  alert: (config: ModalConfig) => Promise<void>
  /** 當前彈窗列表 */
  modals: Ref<ModalInstance[]>
  /** 是否有彈窗開啟 */
  hasModal: ComputedRef<boolean>
  /** 當前彈窗數量 */
  modalCount: ComputedRef<number>
}

/**
 * 彈窗管理 Composable
 * @returns 彈窗管理方法和狀態
 */
export function useModal(): UseModalReturn {
  // 彈窗列表
  // 彈窗列表 - 使用 useState 確保全域狀態同步
  const modals = useState<ModalInstance[]>('modal-state', () => [])

  // 是否有彈窗開啟
  const hasModal = computed(() => modals.value.length > 0)

  // 當前彈窗數量
  const modalCount = computed(() => modals.value.length)

  /**
   * 生成唯一 ID
   * @returns 唯一 ID
   */
  const generateId = (): string =>
    `modal-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`

  /**
   * 開啟彈窗
   * @param config - 彈窗設定
   * @returns Promise，解析為使用者是否確認
   */
  const open = (config: ModalConfig): Promise<boolean> =>
    new Promise((resolve) => {
      const id = generateId()

      const modal: ModalInstance = {
        id,
        config: {
          showCancel: true,
          closeOnMask: true,
          confirmText: '確認',
          cancelText: '取消',
          ...config
        },
        isVisible: true,
        onConfirm: async () => {
          close(id)
          resolve(true)
        },
        onCancel: async () => {
          close(id)
          resolve(false)
        }
      }

      modals.value.push(modal)
    })

  /**
   * 關閉彈窗
   * @param id - 彈窗 ID，若未提供則關閉最上層彈窗
   */
  const close = (id?: string): void => {
    if (id) {
      const index = modals.value.findIndex((m) => m.id === id)
      if (index > -1) {
        modals.value.splice(index, 1)
      }
    } else {
      // 關閉最上層彈窗
      modals.value.pop()
    }
  }

  /**
   * 關閉所有彈窗
   */
  const closeAll = (): void => {
    modals.value = []
  }

  /**
   * 確認對話框
   * @param config - 彈窗設定
   * @returns Promise，解析為使用者是否確認
   */
  const confirm = (config: ModalConfig): Promise<boolean> =>
    open({
      showCancel: true,
      ...config
    })

  /**
   * 警告對話框
   * @param config - 彈窗設定
   * @returns Promise，在使用者確認後解析
   */
  const alert = (config: ModalConfig): Promise<void> =>
    new Promise((resolve) => {
      const id = generateId()

      const modal: ModalInstance = {
        id,
        config: {
          showCancel: false,
          closeOnMask: false,
          confirmText: '確認',
          ...config
        },
        isVisible: true,
        onConfirm: async () => {
          close(id)
          resolve()
        }
      }

      modals.value.push(modal)
    })

  return {
    open,
    close,
    closeAll,
    confirm,
    alert,
    modals,
    hasModal,
    modalCount
  }
}
