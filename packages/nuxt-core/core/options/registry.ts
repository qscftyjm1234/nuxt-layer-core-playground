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

/** 選項物件類型 */
export type Options = {
  [K in OptionKey]: OptionArray
}
