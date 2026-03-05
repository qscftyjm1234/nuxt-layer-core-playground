/**
 * 資料格式化 Composable
 * 提供數字、字串、電話號碼等格式化功能
 */

/**
 * 資料格式化 Composable
 * @returns 格式化相關方法
 */
export function useFormatter() {
  /**
   * 數字千分位格式化
   * @param value - 數字
   * @param decimals - 小數位數
   * @returns 格式化後的字串
   */
  const formatNumber = (value: number | string, decimals?: number): string => {
    const num = typeof value === 'string' ? parseFloat(value) : value

    if (isNaN(num)) return '0'

    const fixed = decimals !== undefined ? num.toFixed(decimals) : num.toString()
    const parts = fixed.split('.')

    // 加上千分位逗號
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    return parts.join('.')
  }

  /**
   * 貨幣格式化
   * @param value - 數字
   * @param currency - 貨幣符號
   * @param decimals - 小數位數（預設 0）
   * @returns 格式化後的字串
   */
  const formatCurrency = (
    value: number | string,
    currency: string = 'NT$',
    decimals: number = 0
  ): string => {
    const formatted = formatNumber(value, decimals)
    return `${currency} ${formatted}`
  }

  /**
   * 百分比格式化
   * @param value - 數字（0-1 或 0-100）
   * @param decimals - 小數位數
   * @param isDecimal - 是否為小數格式（0-1）
   * @returns 格式化後的字串
   */
  const formatPercent = (
    value: number,
    decimals: number = 2,
    isDecimal: boolean = true
  ): string => {
    const percent = isDecimal ? value * 100 : value
    return `${percent.toFixed(decimals)}%`
  }

  /**
   * 台灣手機號碼格式化
   * @param value - 手機號碼
   * @returns 格式化後的字串（09xx-xxxxxx）
   */
  const formatPhone = (value: string): string => {
    if (!value) return ''

    // 移除所有非數字字元
    const cleaned = value.replace(/\D/g, '')

    // 格式化為 09xx-xxxxxx
    if (cleaned.length === 10 && cleaned.startsWith('09')) {
      return `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`
    }

    return value
  }

  /**
   * 台灣身分證字號格式化
   * @param value - 身分證字號
   * @returns 格式化後的字串（A123456789）
   */
  const formatTaiwanId = (value: string): string => {
    if (!value) return ''

    // 轉換為大寫並移除空白
    return value.toUpperCase().replace(/\s/g, '')
  }

  /**
   * 信用卡號格式化
   * @param value - 信用卡號
   * @returns 格式化後的字串（xxxx-xxxx-xxxx-xxxx）
   */
  const formatCreditCard = (value: string): string => {
    if (!value) return ''

    // 移除所有非數字字元
    const cleaned = value.replace(/\D/g, '')

    // 每 4 位數加上連字號
    const parts = cleaned.match(/.{1,4}/g) || []
    return parts.join('-')
  }

  /**
   * 字串首字母大寫
   * @param value - 字串
   * @returns 格式化後的字串
   */
  const capitalize = (value: string): string => {
    if (!value) return ''
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
  }

  /**
   * 字串每個單字首字母大寫
   * @param value - 字串
   * @returns 格式化後的字串
   */
  const capitalizeWords = (value: string): string => {
    if (!value) return ''
    return value
      .split(' ')
      .map((word) => capitalize(word))
      .join(' ')
  }

  /**
   * 字串轉大寫
   * @param value - 字串
   * @returns 格式化後的字串
   */
  const uppercase = (value: string): string => (value ? value.toUpperCase() : '')

  /**
   * 字串轉小寫
   * @param value - 字串
   * @returns 格式化後的字串
   */
  const lowercase = (value: string): string => (value ? value.toLowerCase() : '')

  /**
   * 字串截斷
   * @param value - 字串
   * @param length - 最大長度
   * @param suffix - 後綴（預設 ...）
   * @returns 格式化後的字串
   */
  const truncate = (value: string, length: number, suffix: string = '...'): string => {
    if (!value) return ''
    if (value.length <= length) return value
    return value.slice(0, length) + suffix
  }

  /**
   * 移除字串前後空白
   * @param value - 字串
   * @returns 格式化後的字串
   */
  const trim = (value: string): string => (value ? value.trim() : '')

  /**
   * 移除字串所有空白
   * @param value - 字串
   * @returns 格式化後的字串
   */
  const removeSpaces = (value: string): string => (value ? value.replace(/\s/g, '') : '')

  /**
   * JSON 格式化（美化）
   * @param value - JSON 物件或字串
   * @param indent - 縮排空格數
   * @returns 格式化後的 JSON 字串
   */
  const formatJson = (value: any, indent: number = 2): string => {
    try {
      const obj = typeof value === 'string' ? JSON.parse(value) : value
      return JSON.stringify(obj, null, indent)
    } catch {
      return String(value)
    }
  }

  /**
   * 檔案大小格式化
   * @param bytes - 位元組數
   * @param decimals - 小數位數
   * @returns 格式化後的字串
   */
  const formatFileSize = (bytes: number, decimals: number = 2): string => {
    if (bytes === 0) return '0 Bytes'

    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${(bytes / Math.pow(k, i)).toFixed(decimals)} ${sizes[i]}`
  }

  /**
   * 數字補零
   * @param value - 數字
   * @param length - 總長度
   * @returns 格式化後的字串
   */
  const padZero = (value: number | string, length: number = 2): string =>
    String(value).padStart(length, '0')

  /**
   * 隱藏部分字串（遮罩）
   * @param value - 字串
   * @param start - 開始位置
   * @param end - 結束位置
   * @param mask - 遮罩字元
   * @returns 格式化後的字串
   */
  const mask = (value: string, start: number, end: number, mask: string = '*'): string => {
    if (!value) return ''
    if (start < 0 || end > value.length || start >= end) return value

    const before = value.slice(0, start)
    const after = value.slice(end)
    const masked = mask.repeat(end - start)

    return before + masked + after
  }

  /**
   * Email 遮罩
   * @param email - Email 地址
   * @returns 格式化後的字串
   */
  const maskEmail = (email: string): string => {
    if (!email || !email.includes('@')) return email

    const [username, domain] = email.split('@')
    const visibleChars = Math.min(3, Math.floor(username.length / 2))
    const maskedUsername = `${username.slice(0, visibleChars)}***`

    return `${maskedUsername}@${domain}`
  }

  /**
   * 手機號碼遮罩
   * @param phone - 手機號碼
   * @returns 格式化後的字串
   */
  const maskPhone = (phone: string): string => {
    if (!phone) return ''

    const cleaned = phone.replace(/\D/g, '')
    if (cleaned.length === 10) {
      return `${cleaned.slice(0, 4)}-***-${cleaned.slice(7)}`
    }

    return phone
  }

  /**
   * 移除 HTML 標籤
   * @param html - HTML 字串
   * @returns 純文字
   */
  const stripHtml = (html: string): string => {
    if (!html) return ''
    return html.replace(/<[^>]*>/g, '')
  }

  /**
   * URL 編碼
   * @param value - 字串
   * @returns 編碼後的字串
   */
  const encodeUrl = (value: string): string => (value ? encodeURIComponent(value) : '')

  /**
   * URL 解碼
   * @param value - 編碼的字串
   * @returns 解碼後的字串
   */
  const decodeUrl = (value: string): string => {
    try {
      return value ? decodeURIComponent(value) : ''
    } catch {
      return value
    }
  }

  return {
    // 數字格式化
    formatNumber,
    formatCurrency,
    formatPercent,
    formatFileSize,
    padZero,

    // 電話/證件格式化
    formatPhone,
    formatTaiwanId,
    formatCreditCard,

    // 字串格式化
    capitalize,
    capitalizeWords,
    uppercase,
    lowercase,
    truncate,
    trim,
    removeSpaces,

    // 遮罩
    mask,
    maskEmail,
    maskPhone,

    // 其他
    formatJson,
    stripHtml,
    encodeUrl,
    decodeUrl,

    /**
     * 格式化為民國日期 (YYY-MM-DD)
     * @param value - 日期物件或字串
     * @returns 民國日期字串
     */
    formatToMinguoDate: (value: Date | string | number): string => {
      const date = new Date(value)
      if (isNaN(date.getTime())) return ''

      const year = date.getFullYear() - 1911
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')

      return `${year}-${month}-${day}`
    }
  }
}
