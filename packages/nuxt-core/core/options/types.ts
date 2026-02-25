/**
 * Option 系統類型定義
 */

/** 選項項目 */
export interface OptionItem<T = string | number | boolean> {
  label: string
  value: T
  /** 可選：顏色（用於 chip 顯示） */
  color?: string
  /** 可選：是否停用 */
  isDisabled?: boolean
  /** 可選：其他自訂屬性 */
  [key: string]: unknown
}

/** 選項定義類型 */
export type OptionDefinition<T = string> =
  | OptionItem<T>[] // 靜態陣列
  | ((...args: any[]) => Promise<OptionItem<T>[]>) // API 函數
  | ((...args: any[]) => OptionItem<T>[]) // 計算函數
  | ComputedRef<OptionItem<T>[]> // Computed ref

/**
 * 選項陣列介面 (Option Array Interface)
 * 這是 `options.xxx` 回傳的核心物件，它同時具備三種特性：
 *
 * 1. **它是陣列**：可以直接用 `map`, `find`, `v-for`。
 * 2. **它是函數**：可以呼叫 `options.townships('TPE')` 帶參數。
 * 3. **它是物件**：擁有 `.withAll`, `.label()`, `.reload()` 等擴充方法。
 *
 * @example
 * // 1. 一般用法 (當作陣列)
 * const options = useOptions()
 * const statusList = options.status
 * // -> [{ label: '啟用', value: 'ACTIVE' }, { label: '停用', value: 'INACTIVE' }]
 *
 * // 用於 v-for
 * // <v-select :items="options.status" item-title="label" item-value="value" />
 *
 * // 陣列操作
 * const activeLabels = options.status.map(o => o.label)
 * const activeOption = options.status.find(o => o.value === 'ACTIVE')
 *
 * @example
 * // 2. 帶參數用法
 * const tpe = options.townships('TPE')
 *
 * @example
 * // 3. 擴充功能
 * options.status.withAll           // 加「全部」
 * options.status.label('ACTIVE') // 取顯示名稱
 * await options.countries.reload() // 強制刷新
 *
 * @example
 * // 4. 響應式選項 (Computed)
 * // 當語系或權限變更時，內容會自動更新
 * const i18nOptions = options.vocabularies
 * // -> (中文) [{ label: '蘋果', value: 'apple' }]
 * // -> (英文) [{ label: 'Apple', value: 'apple' }]
 */
export interface OptionArray extends Array<OptionItem> {
  /**
   * 呼叫帶參數的選項
   * @param args 傳遞給定義函數的參數
   * @returns 回傳一個綁定參數的新 OptionArray
   *
   * @example
   * // 1. 取得台北的鄉鎮區
   * const tpeOptions = options.townships('TPE')
   */
  (...args: unknown[]): OptionArray

  /**
   * 是否正在載入（僅 API 選項）
   * @example options.countries.isLoading // → true / false
   */
  isLoading: boolean

  /**
   * 是否載入完成 (僅 API 選項)
   * @example options.countries.isLoaded // -> true / false
   */
  isLoaded: boolean

  /**
   * 取得含「全部」的選項（withAll = 加上「全部」）
   * @example options.status.withAll // → [{ label: '全部', value: '' }, ...]
   */
  withAll: OptionItem[]

  /**
   * 取得含「其他」的選項（other = 加上「其他」）
   * @example options.status.other // → [..., { label: '其他', value: 'other' }]
   */
  other: OptionItem[]

  /**
   * 根據 value 取得 label
   * @example options.status.label('ACTIVE') // → '啟用'
   */
  label: (value: unknown) => string

  /**
   * 根據 value 取得完整選項（覆蓋 Array.find）
   * @example options.status.findByValue('ACTIVE') // → { label: '啟用', ... }
   */
  findByValue: (value: unknown) => OptionItem | undefined

  /**
   * 排除特定選項
   * @example options.status.exclude(['INACTIVE'])
   */
  exclude: (values: unknown[]) => OptionItem[]

  /**
   * 只保留特定選項
   * @example options.status.only(['ACTIVE'])
   */
  only: (values: unknown[]) => OptionItem[]

  /**
   * 強制重新載入（僅 API 選項有效）
   * @returns Promise<OptionItem[]> 新載入的選項資料
   *
   * @example
   * // 1. 基本用法（自動刷新 UI）
   * await options.countries.reload()
   */
  reload: () => Promise<OptionItem[]>
  
  /**
   * 取得原始資料（純陣列）
   */
  value: OptionItem[]

  /**
   * 取得原始資料（函數形式）
   */
  get: () => OptionItem[]
}

/** Options Registry 類型 */
export type OptionsRegistry = Record<string, OptionDefinition>
