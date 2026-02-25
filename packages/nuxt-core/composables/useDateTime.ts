/**
 * 日期時間處理 Composable
 * 提供完整的日期時間格式化、解析、計算與驗證功能
 */

/**
 * 日期時間格式選項
 */
export interface DateTimeFormatOptions {
  /** 日期格式 */
  dateFormat?: string
  /** 時間格式 */
  timeFormat?: string
  /** 語言地區 */
  locale?: string
  /** 時區 */
  timezone?: string
}

/**
 * 相對時間選項
 */
export interface RelativeTimeOptions {
  /** 語言地區 */
  locale?: string
  /** 顯示風格 (long, short, narrow) */
  style?: 'long' | 'short' | 'narrow'
  /** 數值顯示 (always, auto) */
  numeric?: 'always' | 'auto'
}

/**
 * 日期計算單位
 */
export type DateUnit =
  | 'year'
  | 'month'
  | 'week'
  | 'day'
  | 'hour'
  | 'minute'
  | 'second'
  | 'millisecond'

/**
 * 預設格式
 */
const DEFAULT_FORMATS = {
  date: 'YYYY-MM-DD',
  time: 'HH:mm:ss',
  datetime: 'YYYY-MM-DD HH:mm:ss',
  dateShort: 'YYYY/MM/DD',
  dateLong: 'YYYY年MM月DD日',
  timeShort: 'HH:mm',
  datetimeShort: 'YYYY/MM/DD HH:mm',
  iso: 'YYYY-MM-DDTHH:mm:ss.SSSZ'
}

/**
 * 格式化日期時間字串
 * @param date - 日期物件或字串
 * @param format - 格式字串
 * @returns 格式化後的字串
 */
function formatDateString(date: Date, format: string): string {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  const milliseconds = date.getMilliseconds()

  const tokens: Record<string, string> = {
    YYYY: year.toString(),
    YY: year.toString().slice(-2),
    MM: month.toString().padStart(2, '0'),
    M: month.toString(),
    DD: day.toString().padStart(2, '0'),
    D: day.toString(),
    HH: hours.toString().padStart(2, '0'),
    H: hours.toString(),
    hh: (hours % 12 || 12).toString().padStart(2, '0'),
    h: (hours % 12 || 12).toString(),
    mm: minutes.toString().padStart(2, '0'),
    m: minutes.toString(),
    ss: seconds.toString().padStart(2, '0'),
    s: seconds.toString(),
    SSS: milliseconds.toString().padStart(3, '0'),
    A: hours >= 12 ? 'PM' : 'AM',
    a: hours >= 12 ? 'pm' : 'am'
  }

  let result = format
  Object.keys(tokens).forEach((token) => {
    result = result.replace(new RegExp(token, 'g'), tokens[token])
  })

  return result
}

/**
 * 解析日期
 * @param input - 輸入值
 * @returns Date 物件
 */
function parseDate(input: Date | string | number | null | undefined): Date {
  if (!input) return new Date()
  if (input instanceof Date) return input
  if (typeof input === 'number') return new Date(input)
  return new Date(input)
}

/**
 * 日期時間處理 Composable
 * @returns 日期時間處理相關方法
 */
export function useDateTime() {
  /**
   * 格式化日期
   * @param date - 日期
   * @param format - 格式（預設：YYYY-MM-DD）
   * @returns 格式化後的字串
   */
  const formatDate = (
    date: Date | string | number | null | undefined,
    format: string = DEFAULT_FORMATS.date
  ): string => {
    const d = parseDate(date)
    return formatDateString(d, format)
  }

  /**
   * 格式化時間
   * @param date - 日期
   * @param format - 格式（預設：HH:mm:ss）
   * @returns 格式化後的字串
   */
  const formatTime = (
    date: Date | string | number | null | undefined,
    format: string = DEFAULT_FORMATS.time
  ): string => {
    const d = parseDate(date)
    return formatDateString(d, format)
  }

  /**
   * 格式化日期時間
   * @param date - 日期
   * @param format - 格式（預設：YYYY-MM-DD HH:mm:ss）
   * @returns 格式化後的字串
   */
  const formatDateTime = (
    date: Date | string | number | null | undefined,
    format: string = DEFAULT_FORMATS.datetime
  ): string => {
    const d = parseDate(date)
    return formatDateString(d, format)
  }

  /**
   * 格式化為相對時間（例如：3 天前）
   * @param date - 日期
   * @param options - 選項
   * @returns 相對時間字串
   */
  const formatRelative = (
    date: Date | string | number,
    options: RelativeTimeOptions = {}
  ): string => {
    const { locale = 'zh-TW', style = 'long', numeric = 'auto' } = options

    const d = parseDate(date)
    const now = new Date()
    const diffMs = now.getTime() - d.getTime()
    const diffSec = Math.floor(diffMs / 1000)
    const diffMin = Math.floor(diffSec / 60)
    const diffHour = Math.floor(diffMin / 60)
    const diffDay = Math.floor(diffHour / 24)
    const diffWeek = Math.floor(diffDay / 7)
    const diffMonth = Math.floor(diffDay / 30)
    const diffYear = Math.floor(diffDay / 365)

    // 簡化的相對時間計算（中文）
    if (locale === 'zh-TW' || locale === 'zh-CN') {
      if (diffSec < 60) return '剛剛'
      if (diffMin < 60) return `${diffMin} 分鐘前`
      if (diffHour < 24) return `${diffHour} 小時前`
      if (diffDay < 7) return `${diffDay} 天前`
      if (diffWeek < 4) return `${diffWeek} 週前`
      if (diffMonth < 12) return `${diffMonth} 個月前`
      return `${diffYear} 年前`
    }

    // 使用 Intl.RelativeTimeFormat（英文）
    try {
      const rtf = new Intl.RelativeTimeFormat(locale, { numeric, style })

      if (Math.abs(diffYear) >= 1) return rtf.format(-diffYear, 'year')
      if (Math.abs(diffMonth) >= 1) return rtf.format(-diffMonth, 'month')
      if (Math.abs(diffWeek) >= 1) return rtf.format(-diffWeek, 'week')
      if (Math.abs(diffDay) >= 1) return rtf.format(-diffDay, 'day')
      if (Math.abs(diffHour) >= 1) return rtf.format(-diffHour, 'hour')
      if (Math.abs(diffMin) >= 1) return rtf.format(-diffMin, 'minute')
      return rtf.format(-diffSec, 'second')
    } catch {
      return formatDate(date)
    }
  }

  /**
   * 解析 ISO 字串
   * @param isoString - ISO 格式字串
   * @returns Date 物件
   */
  const parseISO = (isoString: string): Date => new Date(isoString)

  /**
   * 解析時間戳
   * @param timestamp - 時間戳（毫秒）
   * @returns Date 物件
   */
  const parseTimestamp = (timestamp: number): Date => new Date(timestamp)

  /**
   * 新增時間
   * @param date - 日期
   * @param amount - 數量
   * @param unit - 單位
   * @returns 新的 Date 物件
   */
  const add = (date: Date | string | number, amount: number, unit: DateUnit): Date => {
    const d = new Date(parseDate(date))

    switch (unit) {
      case 'year':
        d.setFullYear(d.getFullYear() + amount)
        break
      case 'month':
        d.setMonth(d.getMonth() + amount)
        break
      case 'week':
        d.setDate(d.getDate() + amount * 7)
        break
      case 'day':
        d.setDate(d.getDate() + amount)
        break
      case 'hour':
        d.setHours(d.getHours() + amount)
        break
      case 'minute':
        d.setMinutes(d.getMinutes() + amount)
        break
      case 'second':
        d.setSeconds(d.getSeconds() + amount)
        break
      case 'millisecond':
        d.setMilliseconds(d.getMilliseconds() + amount)
        break
    }

    return d
  }

  /**
   * 減少時間
   * @param date - 日期
   * @param amount - 數量
   * @param unit - 單位
   * @returns 新的 Date 物件
   */
  const subtract = (date: Date | string | number, amount: number, unit: DateUnit): Date =>
    add(date, -amount, unit)

  /**
   * 計算時間差
   * @param date1 - 日期 1
   * @param date2 - 日期 2
   * @param unit - 單位
   * @returns 時間差
   */
  const diff = (
    date1: Date | string | number,
    date2: Date | string | number,
    unit: DateUnit = 'millisecond'
  ): number => {
    const d1 = parseDate(date1)
    const d2 = parseDate(date2)
    const diffMs = d1.getTime() - d2.getTime()

    switch (unit) {
      case 'year':
        return Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365))
      case 'month':
        return Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30))
      case 'week':
        return Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7))
      case 'day':
        return Math.floor(diffMs / (1000 * 60 * 60 * 24))
      case 'hour':
        return Math.floor(diffMs / (1000 * 60 * 60))
      case 'minute':
        return Math.floor(diffMs / (1000 * 60))
      case 'second':
        return Math.floor(diffMs / 1000)
      default:
        return diffMs
    }
  }

  /**
   * 判斷日期是否在另一個日期之前
   * @param date1 - 日期 1
   * @param date2 - 日期 2
   * @returns 是否在之前
   */
  const isBefore = (date1: Date | string | number, date2: Date | string | number): boolean =>
    parseDate(date1).getTime() < parseDate(date2).getTime()

  /**
   * 判斷日期是否在另一個日期之後
   * @param date1 - 日期 1
   * @param date2 - 日期 2
   * @returns 是否在之後
   */
  const isAfter = (date1: Date | string | number, date2: Date | string | number): boolean =>
    parseDate(date1).getTime() > parseDate(date2).getTime()

  /**
   * 判斷兩個日期是否相同（精確到天）
   * @param date1 - 日期 1
   * @param date2 - 日期 2
   * @returns 是否相同
   */
  const isSameDay = (date1: Date | string | number, date2: Date | string | number): boolean => {
    const d1 = parseDate(date1)
    const d2 = parseDate(date2)
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    )
  }

  /**
   * 取得今天的開始時間（00:00:00）
   * @param date - 日期物件或字串
   * @returns Date 物件
   */
  const startOfDay = (date?: Date | string | number): Date => {
    const d = parseDate(date)
    d.setHours(0, 0, 0, 0)
    return d
  }

  /**
   * 取得今天的結束時間（23:59:59）
   * @param date - 日期物件或字串
   * @returns Date 物件
   */
  const endOfDay = (date?: Date | string | number): Date => {
    const d = parseDate(date)
    d.setHours(23, 59, 59, 999)
    return d
  }

  /**
   * 取得本週的開始時間（週一 00:00:00）
   * @param date - 日期物件或字串
   * @returns Date 物件
   */
  const startOfWeek = (date?: Date | string | number): Date => {
    const d = parseDate(date)
    const day = d.getDay()
    const diff = d.getDate() - day + (day === 0 ? -6 : 1) // 調整為週一
    d.setDate(diff)
    d.setHours(0, 0, 0, 0)
    return d
  }

  /**
   * 取得本週的結束時間（週日 23:59:59）
   * @param date - 日期物件或字串
   * @returns Date 物件
   */
  const endOfWeek = (date?: Date | string | number): Date => {
    const d = startOfWeek(date)
    d.setDate(d.getDate() + 6)
    d.setHours(23, 59, 59, 999)
    return d
  }

  /**
   * 取得本月的開始時間
   * @param date - 日期物件或字串
   * @returns Date 物件
   */
  const startOfMonth = (date?: Date | string | number): Date => {
    const d = parseDate(date)
    d.setDate(1)
    d.setHours(0, 0, 0, 0)
    return d
  }

  /**
   * 取得本月的結束時間
   * @param date - 日期物件或字串
   * @returns Date 物件
   */
  const endOfMonth = (date?: Date | string | number): Date => {
    const d = parseDate(date)
    d.setMonth(d.getMonth() + 1, 0)
    d.setHours(23, 59, 59, 999)
    return d
  }

  /**
   * 取得今天
   * @returns Date 物件
   */
  const today = (): Date => startOfDay(new Date())

  /**
   * 取得昨天
   * @returns Date 物件
   */
  const yesterday = (): Date => subtract(today(), 1, 'day')

  /**
   * 取得明天
   * @returns Date 物件
   */
  const tomorrow = (): Date => add(today(), 1, 'day')

  /**
   * 驗證日期字串
   * @param dateString - 日期字串
   * @returns 是否有效
   */
  const isValid = (dateString: string | Date | number): boolean => {
    const d = parseDate(dateString)
    return !isNaN(d.getTime())
  }

  /**
   * 判斷是否為週末
   * @param date - 日期
   * @returns 是否為週末
   */
  const isWeekend = (date?: Date | string | number): boolean => {
    const d = parseDate(date)
    const day = d.getDay()
    return day === 0 || day === 6
  }

  /**
   * 判斷是否為今天
   * @param date - 日期
   * @returns 是否為今天
   */
  const isToday = (date: Date | string | number): boolean => isSameDay(date, new Date())

  /**
   * 取得兩個日期之間的所有日期
   * @param start - 開始日期
   * @param end - 結束日期
   * @returns 日期陣列
   */
  const getDateRange = (start: Date | string | number, end: Date | string | number): Date[] => {
    const dates: Date[] = []
    const current = new Date(parseDate(start))
    const endDate = parseDate(end)

    while (current <= endDate) {
      dates.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }

    return dates
  }

  /**
   * 取得當前時區
   * @returns 時區字串
   */
  const getTimezone = (): string => Intl.DateTimeFormat().resolvedOptions().timeZone

  /**
   * 轉換為 ISO 字串
   * @param date - 日期
   * @returns ISO 字串
   */
  const toISO = (date?: Date | string | number): string => parseDate(date).toISOString()

  /**
   * 轉換為時間戳
   * @param date - 日期
   * @returns 時間戳（毫秒）
   */
  const toTimestamp = (date?: Date | string | number): number => parseDate(date).getTime()

  return {
    // 格式化
    formatDate,
    formatTime,
    formatDateTime,
    formatRelative,

    // 解析
    parseISO,
    parseTimestamp,

    // 計算
    add,
    subtract,
    diff,

    // 比較
    isBefore,
    isAfter,
    isSameDay,
    isToday,
    isWeekend,

    // 邊界時間
    startOfDay,
    endOfDay,
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth,

    // 快捷方法
    today,
    yesterday,
    tomorrow,

    // 驗證
    isValid,

    // 工具
    getDateRange,
    getTimezone,
    toISO,
    toTimestamp,

    // 常數
    DEFAULT_FORMATS
  }
}
