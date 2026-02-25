/**
 * @description 敏感資料遮蔽工具
 * @description 用於將敏感資料部分遮蔽，保護個人隱私
 * @example
 * ```typescript
 * import { maskIdCard, maskPhone, maskEmail } from './mask'
 *
 * maskIdCard('A123456789')      // A123****89
 * maskPhone('0912345678')        // 0912***678
 * maskEmail('user@example.com')  // u***@example.com
 * ```
 * @returns 回傳值
 */

/**
 * 通用遮蔽函式
 * @param text - 原始文字
 * @param visibleStart - 開頭保留字數 (預設 2)
 * @param visibleEnd - 結尾保留字數 (預設 2)
 * @param maskChar - 遮蔽字元（預設: *）
 * @returns 遮蔽後的字串
 * @example maskText('A123456789', 4, 2) => 'A123****89'
 */
export function maskText(
  text: string | null | undefined,
  visibleStart: number = 2,
  visibleEnd: number = 2,
  maskChar: string = '*'
): string {
  if (!text) return ''

  const len = text.length

  // 如果文字太短，無法遮蔽
  if (len <= visibleStart + visibleEnd) {
    return text
  }

  const start = text.slice(0, visibleStart)
  const end = text.slice(-visibleEnd)
  const maskedLength = len - visibleStart - visibleEnd
  const masked = maskChar.repeat(Math.min(maskedLength, 4)) // 最多 4 個 *

  return `${start}${masked}${end}`
}

/**
 * 身分證字號遮蔽
 * @param idCard - 身分證字號
 * @example maskIdCard('A123456789') => 'A123****89'
 * @returns 遮蔽後的字串
 */
export function maskIdCard(idCard: string | null | undefined): string {
  if (!idCard) return ''
  // 保留前4碼和後2碼
  return maskText(idCard, 4, 2)
}

/**
 * 電話號碼遮蔽
 * @param phone - 電話號碼
 * @example maskPhone('0912345678') => '0912***678'
 * @returns 遮蔽後的字串
 */
export function maskPhone(phone: string | null | undefined): string {
  if (!phone) return ''
  // 移除非數字字元
  const cleanPhone = phone.replace(/\D/g, '')

  // 手機號碼（10碼）
  if (cleanPhone.length === 10) {
    return maskText(cleanPhone, 4, 3)
  }

  // 市內電話（8-9碼）
  if (cleanPhone.length >= 8 && cleanPhone.length <= 9) {
    return maskText(cleanPhone, 2, 4)
  }

  // 其他情況使用預設遮蔽
  return maskText(cleanPhone, 3, 2)
}

/**
 * Email 遮蔽
 * @param email - 電子郵件地址
 * @example maskEmail('user@example.com') => 'u***@example.com'
 * @returns 遮蔽後的字串
 */
export function maskEmail(email: string | null | undefined): string {
  if (!email) return ''

  const parts = email.split('@')
  if (parts.length < 2) return maskText(email)

  const localPart = parts[0]
  const domain = parts[1]

  if (!localPart || !domain) return maskText(email)

  // 遮蔽 @ 前的部分
  const maskedLocal =
    localPart.length <= 2
      ? `${localPart.charAt(0)}***`
      : `${localPart.charAt(0)}***${localPart.slice(-1)}`

  return `${maskedLocal}@${domain}`
}

/**
 * 姓名遮蔽
 * @param name - 姓名
 * @example maskName('王小明') => '王*明'
 * @example maskName('王大小明') => '王**明'
 * @returns 遮蔽後的字串
 */
export function maskName(name: string | null | undefined): string {
  if (!name) return ''

  const len = name.length

  if (len <= 1) return name
  if (len === 2) return `${name.charAt(0)}*`

  // 保留姓和最後一個字
  const masked = '*'.repeat(len - 2)
  return name.charAt(0) + masked + name.charAt(len - 1)
}

/**
 * 地址遮蔽
 * @param address - 地址
 * @example maskAddress('台北市大安區信義路100號5樓') => '台北市大安區***'
 * @returns 遮蔽後的字串
 */
export function maskAddress(address: string | null | undefined): string {
  if (!address) return ''

  // 保留縣市區（約前6-8字），其餘遮蔽
  const prefixLength = Math.min(address.length, 8)
  return `${address.slice(0, prefixLength)}***`
}

/**
 * 信用卡號遮蔽
 * @param cardNumber - 信用卡號
 * @example maskCreditCard('1234567890123456') => '1234 **** **** 3456'
 * @returns 遮蔽後的字串
 */
export function maskCreditCard(cardNumber: string | null | undefined): string {
  if (!cardNumber) return ''

  // 移除非數字字元
  const cleanNumber = cardNumber.replace(/\D/g, '')

  if (cleanNumber.length < 12) return maskText(cleanNumber)

  const first4 = cleanNumber.slice(0, 4)
  const last4 = cleanNumber.slice(-4)

  return `${first4} **** **** ${last4}`
}

/**
 * 銀行帳號遮蔽
 * @param accountNumber - 銀行帳號
 * @example maskBankAccount('12345678901234') => '1234******1234'
 * @returns 遮蔽後的字串
 */
export function maskBankAccount(accountNumber: string | null | undefined): string {
  if (!accountNumber) return ''

  // 移除非數字字元
  const cleanNumber = accountNumber.replace(/\D/g, '')

  return maskText(cleanNumber, 4, 4)
}

/**
 * 統一編號遮蔽
 * @param taxId - 統一編號
 * @example maskTaxId('12345678') => '1234****'
 * @returns 遮蔽後的字串
 */
export function maskTaxId(taxId: string | null | undefined): string {
  if (!taxId) return ''
  return maskText(taxId, 4, 0)
}

/**
 * 護照號碼遮蔽
 * @param passport - 護照號碼
 * @example maskPassport('AB1234567') => 'AB***567'
 * @returns 遮蔽後的字串
 */
export function maskPassport(passport: string | null | undefined): string {
  if (!passport) return ''
  return maskText(passport, 2, 3)
}
