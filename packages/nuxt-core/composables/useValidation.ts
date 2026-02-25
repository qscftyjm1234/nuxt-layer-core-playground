/**
 * 表單驗證 Composable
 * 提供常用的驗證規則與自訂驗證功能
 */

/**
 * 驗證結果
 */
export interface ValidationResult {
  /** 是否有效 */
  valid: boolean
  /** 錯誤訊息 */
  message?: string
}

/**
 * 驗證規則函數
 */
export type ValidationRule = (value: any) => ValidationResult | boolean

/**
 * 表單驗證 Composable
 * @returns 驗證相關方法
 */
export function useValidation() {
  /**
   * 必填驗證
   * @param value - 值
   * @param message - 自訂錯誤訊息
   * @returns 驗證結果
   */
  const required = (value: any, message: string = '此欄位為必填'): ValidationResult => {
    const isValid = value !== null && value !== undefined && value !== ''
    return {
      valid: isValid,
      message: isValid ? undefined : message
    }
  }

  /**
   * Email 驗證
   * @param value - Email 字串
   * @param message - 自訂錯誤訊息
   * @returns 驗證結果
   */
  const email = (value: string, message: string = 'Email 格式不正確'): ValidationResult => {
    if (!value) return { valid: true }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isValid = emailRegex.test(value)

    return {
      valid: isValid,
      message: isValid ? undefined : message
    }
  }

  /**
   * 台灣手機號碼驗證
   * @param value - 手機號碼
   * @param message - 自訂錯誤訊息
   * @returns 驗證結果
   */
  const phone = (value: string, message: string = '手機號碼格式不正確'): ValidationResult => {
    if (!value) return { valid: true }

    // 台灣手機號碼格式：09xx-xxxxxx 或 09xxxxxxxx
    const phoneRegex = /^09\d{2}-?\d{6}$/
    const isValid = phoneRegex.test(value.replace(/\s/g, ''))

    return {
      valid: isValid,
      message: isValid ? undefined : message
    }
  }

  /**
   * URL 驗證
   * @param value - URL 字串
   * @param message - 自訂錯誤訊息
   * @returns 驗證結果
   */
  const url = (value: string, message: string = 'URL 格式不正確'): ValidationResult => {
    if (!value) return { valid: true }

    try {
      new URL(value)
      return { valid: true }
    } catch {
      return {
        valid: false,
        message
      }
    }
  }

  /**
   * 台灣身分證字號驗證
   * @param value - 身分證字號
   * @param message - 自訂錯誤訊息
   * @returns 驗證結果
   */
  const taiwanId = (value: string, message: string = '身分證字號格式不正確'): ValidationResult => {
    if (!value) return { valid: true }

    // 台灣身分證字號格式：1個英文字母 + 9個數字
    const idRegex = /^[A-Z][12]\d{8}$/
    if (!idRegex.test(value)) {
      return { valid: false, message }
    }

    // 驗證檢查碼
    const letterMap: Record<string, number> = {
      A: 10,
      B: 11,
      C: 12,
      D: 13,
      E: 14,
      F: 15,
      G: 16,
      H: 17,
      I: 34,
      J: 18,
      K: 19,
      L: 20,
      M: 21,
      N: 22,
      O: 35,
      P: 23,
      Q: 24,
      R: 25,
      S: 26,
      T: 27,
      U: 28,
      V: 29,
      W: 32,
      X: 30,
      Y: 31,
      Z: 33
    }

    const letter = value.charAt(0)
    const letterValue = letterMap[letter]
    const d1 = Math.floor(letterValue / 10)
    const d2 = letterValue % 10

    const weights = [1, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1]
    const digits = [d1, d2, ...value.slice(1).split('').map(Number)]

    const sum = digits.reduce((acc, digit, index) => acc + digit * weights[index], 0)
    const isValid = sum % 10 === 0

    return {
      valid: isValid,
      message: isValid ? undefined : message
    }
  }

  /**
   * 最小長度驗證
   * @param min - 最小長度
   * @param message - 自訂錯誤訊息
   * @returns 驗證函數
   */
  const minLength =
    (min: number, message?: string) =>
    (value: string): ValidationResult => {
      if (!value) return { valid: true }

      const isValid = value.length >= min
      return {
        valid: isValid,
        message: isValid ? undefined : message || `長度不得少於 ${min} 個字元`
      }
    }

  /**
   * 最大長度驗證
   * @param max - 最大長度
   * @param message - 自訂錯誤訊息
   * @returns 驗證函數
   */
  const maxLength =
    (max: number, message?: string) =>
    (value: string): ValidationResult => {
      if (!value) return { valid: true }

      const isValid = value.length <= max
      return {
        valid: isValid,
        message: isValid ? undefined : message || `長度不得超過 ${max} 個字元`
      }
    }

  /**
   * 數字範圍驗證
   * @param min - 最小值
   * @param max - 最大值
   * @param message - 自訂錯誤訊息
   * @returns 驗證函數
   */
  const range =
    (min: number, max: number, message?: string) =>
    (value: number): ValidationResult => {
      if (value === null || value === undefined) return { valid: true }

      const isValid = value >= min && value <= max
      return {
        valid: isValid,
        message: isValid ? undefined : message || `數值必須介於 ${min} 到 ${max} 之間`
      }
    }

  /**
   * 數字驗證
   * @param value - 值
   * @param message - 自訂錯誤訊息
   * @returns 驗證結果
   */
  const number = (value: any, message: string = '必須為數字'): ValidationResult => {
    if (value === null || value === undefined || value === '') return { valid: true }

    const isValid = !isNaN(Number(value))
    return {
      valid: isValid,
      message: isValid ? undefined : message
    }
  }

  /**
   * 整數驗證
   * @param value - 值
   * @param message - 自訂錯誤訊息
   * @returns 驗證結果
   */
  const integer = (value: any, message: string = '必須為整數'): ValidationResult => {
    if (value === null || value === undefined || value === '') return { valid: true }

    const isValid = Number.isInteger(Number(value))
    return {
      valid: isValid,
      message: isValid ? undefined : message
    }
  }

  /**
   * 正數驗證
   * @param value - 值
   * @param message - 自訂錯誤訊息
   * @returns 驗證結果
   */
  const positive = (value: number, message: string = '必須為正數'): ValidationResult => {
    if (value === null || value === undefined) return { valid: true }

    const isValid = value > 0
    return {
      valid: isValid,
      message: isValid ? undefined : message
    }
  }

  /**
   * 正則表達式驗證
   * @param regex - 正則表達式
   * @param message - 自訂錯誤訊息
   * @returns 驗證函數
   */
  const pattern =
    (regex: RegExp, message: string = '格式不正確') =>
    (value: string): ValidationResult => {
      if (!value) return { valid: true }

      const isValid = regex.test(value)
      return {
        valid: isValid,
        message: isValid ? undefined : message
      }
    }

  /**
   * 相同值驗證（確認密碼）
   * @param targetValue - 目標值
   * @param message - 自訂錯誤訊息
   * @returns 驗證函數
   */
  const sameAs =
    (targetValue: any, message: string = '兩次輸入不一致') =>
    (value: any): ValidationResult => {
      const isValid = value === targetValue
      return {
        valid: isValid,
        message: isValid ? undefined : message
      }
    }

  /**
   * 批次驗證
   * @param value - 要驗證的值
   * @param rules - 驗證規則陣列
   * @returns 驗證結果
   */
  const validate = (value: any, rules: ValidationRule[]): ValidationResult => {
    for (const rule of rules) {
      const result = rule(value)

      // 處理布林值回傳
      if (typeof result === 'boolean') {
        if (!result) {
          return {
            valid: false,
            message: '驗證失敗'
          }
        }
      } else if (!result.valid) {
        // 處理 ValidationResult 回傳
        return result
      }
    }

    return { valid: true }
  }

  /**
   * 驗證多個欄位
   * @param data - 資料物件
   * @param rules - 驗證規則物件
   * @returns 驗證結果物件
   */
  const validateFields = (
    data: Record<string, any>,
    rules: Record<string, ValidationRule[]>
  ): Record<string, ValidationResult> => {
    const results: Record<string, ValidationResult> = {}

    Object.keys(rules).forEach((field) => {
      const value = data[field]
      const fieldRules = rules[field]
      results[field] = validate(value, fieldRules)
    })

    return results
  }

  /**
   * 檢查是否所有欄位都有效
   * @param results - 驗證結果物件
   * @returns 是否全部有效
   */
  const isAllValid = (results: Record<string, ValidationResult>): boolean =>
    Object.values(results).every((result) => result.valid)

  /**
   * 陣列驗證
   * @param values - 要驗證的陣列
   * @param rules - 驗證規則
   * @returns 驗證結果陣列
   */
  const validateArray = (values: any[], rules: ValidationRule[]): ValidationResult[] =>
    values.map((value) => validate(value, rules))

  /**
   * 陣列驗證 (簡易版)
   * 驗證陣列中的所有項目，回傳單一結果。只要有一個失敗即回傳失敗。
   * @param values - 要驗證的陣列
   * @param rules - 驗證規則
   * @returns 單一驗證結果 (含錯誤索引資訊)
   */
  const validateList = (values: any[], rules: ValidationRule[]): ValidationResult => {
    for (let i = 0; i < values.length; i++) {
      const result = validate(values[i], rules)
      if (!result.valid) {
        return {
          valid: false,
          message: `第 ${i + 1} 項錯誤: ${result.message}`
        }
      }
    }
    return { valid: true }
  }

  return {
    // 基本驗證
    required,
    email,
    phone,
    url,
    taiwanId,
    number,
    integer,
    positive,

    // 長度驗證
    minLength,
    maxLength,

    // 範圍驗證
    range,

    // 進階驗證
    pattern,
    sameAs,

    // 批次驗證
    validate,
    validateFields,
    validateArray, // 詳細版 (回傳陣列)
    validateList, // 簡易版 (回傳單一結果)
    isAllValid
  }
}
