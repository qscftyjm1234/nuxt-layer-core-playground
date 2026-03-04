/**
 * Option 定義檔 - 統一入口
 *
 * 這裡只負責匯總各個模組的選項
 */
import * as common from './common'
import * as modules from './modules'

export const optionsRegistry = {
  ...common,
  ...modules
}

export type OptionKey = keyof typeof optionsRegistry

import type { OptionArray } from './types'

/** 
 * 提供專案層級擴充的介面
 * 開發者可以透過 Declare Module 方式擴充此介面
 */
export interface CustomOptions {
  // 由 scanner 自動產生或手動擴充
}

/** 
 * 選項物件類型 (核心 + 自定義)
 */
export type Options = {
  [K in OptionKey]: OptionArray
} & {
  [K in keyof CustomOptions]: OptionArray
}
