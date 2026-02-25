import { computed } from 'vue'
import type { OptionItem } from './types'

/** 性別 - 基本 */
export const gender: OptionItem[] = [
  { label: '男', value: 'MALE' },
  { label: '女', value: 'FEMALE' }
]

/** 性別 - 擴充（繼承 gender） */
export const genderExtended: OptionItem[] = [...gender, { label: '未知', value: 'UNKNOWN' }]

/** 是否 */
export const yesNo: OptionItem[] = [
  { label: '是', value: 'Y' },
  { label: '否', value: 'N' }
]

/** 狀態（啟用/停用） */
export const status: OptionItem[] = [
  { label: '啟用', value: 'ACTIVE', color: 'green' },
  { label: '停用', value: 'INACTIVE', color: 'red' }
]

/** 作業狀態 */
export const opStatus: OptionItem[] = [
  { label: '草稿', value: 'DRAFT', color: 'grey' },
  { label: '生效', value: 'EFFECTIVE', color: 'green' },
  { label: '生效編輯中', value: 'EFF_EDIT', color: 'orange' },
  { label: '失效', value: 'INACTIVE', color: 'red' },
  { label: '待生效', value: 'PENDING', color: 'blue' }
]

/** 台灣城市列表 */
export const cities: OptionItem[] = [
  { label: '台北市', value: 'TPE' },
  { label: '新北市', value: 'NTPC' },
  { label: '桃園市', value: 'TYC' },
  { label: '台中市', value: 'TXG' },
  { label: '台南市', value: 'TNN' },
  { label: '高雄市', value: 'KHH' }
]

/** 城市 (Alias for OptionSelect demo) */
export const city = cities

/** 職業 (Demo) */
export const job: OptionItem[] = [
  { label: '前端工程師', value: 'frontend' },
  { label: '後端工程師', value: 'backend' },
  { label: '全端工程師', value: 'fullstack' },
  { label: '設計師', value: 'design' }
]

/** 興趣 (Demo) */
export const interest: OptionItem[] = [
  { label: '寫程式', value: 'coding' },
  { label: '看書', value: 'reading' },
  { label: '打電動', value: 'gaming' }
]

/** 假資料:響應式選項 (Computed 範例) */
export const vocabularies = computed(() =>
  // 模擬： userId 透過 store異動等等
  [
    { label: '蘋果', value: 'apple' },
    { label: '香蕉', value: 'banana' }
  ]
)
