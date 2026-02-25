/**
 * 全域通知 Composable
 * 用於控制 GlobalSnackbar 顯示成功或錯誤訊息
 */
export const useNotify = () => {
  const show = useState<boolean>('notify_show', () => false)
  const message = useState<string>('notify_message', () => '')
  const color = useState<string>('notify_color', () => 'success')
  const timeout = useState<number>('notify_timeout', () => 3000)

  /**
   * 顯示成功訊息 (綠色)
   * @param msg 訊息內容
   */
  const success = (msg: string) => {
    message.value = msg
    color.value = 'success'
    show.value = true
  }

  /**
   * 顯示錯誤訊息 (紅色)
   * @param msg 訊息內容
   */
  const error = (msg: string) => {
    message.value = msg
    color.value = 'error'
    show.value = true
  }

  /**
   * 顯示警告訊息 (橘色)
   * @param msg 訊息內容
   */
  const warning = (msg: string) => {
    message.value = msg
    color.value = 'warning'
    show.value = true
  }

  /**
   * 顯示一般訊息 (藍色/預設)
   * @param msg 訊息內容
   */
  const info = (msg: string) => {
    message.value = msg
    color.value = 'info'
    show.value = true
  }

  return {
    show,
    message,
    color,
    timeout,
    success,
    error,
    warning,
    info
  }
}
