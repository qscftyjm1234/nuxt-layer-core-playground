<script setup lang="ts">
/**
 * 業務元件 - 城市選擇器
 *
 * 用途：封裝城市選擇的業務邏輯
 * 特點：
 * - 自動從 useOptions 載入城市資料
 * - 封裝選擇後的業務邏輯
 * - 頁面只需要 v-model，不用關心內部實作
 *
 * 未來維護：
 * - 要改 UI 框架 → 只需要改 UiSelect.vue
 * - 要改業務邏輯 → 只需要改這個檔案
 * - 頁面完全不用動！
 */

import ISelect from '../uiInterface/ISelect.vue'
import { useOptions } from '../../composables/useOptions'

interface Props {
  modelValue: string
  placeholder?: string
  disabled?: boolean
  // 業務相關的 props
  showAllOption?: boolean // 是否顯示「全部」選項
  excludeCities?: string[] // 排除特定城市
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '請選擇城市',
  disabled: false,
  showAllOption: false,
  excludeCities: () => []
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
}>()

// 業務邏輯：從 useOptions 取得城市資料
const options = useOptions()

// 業務邏輯：處理選項
const cityOptions = computed(() => {
  let opts = options.cities.get()
  
  // 如果需要排除特定城市
  if (props.excludeCities && props.excludeCities.length > 0) {
    opts = opts.filter(o => !props.excludeCities.includes(o.value as string))
  }

  // 如果需要「全部」選項
  if (props.showAllOption) {
    return [{ label: '全部', value: '' }, ...opts]
  }

  return opts
})

// 業務邏輯：選擇處理
const handleChange = (value: string) => {
  emit('update:modelValue', value)
  emit('change', value)

  // 業務邏輯：可以在這裡加入其他邏輯
  // 例如：記錄到最近選擇、載入相關資料等
  console.log('城市已選擇:', value)
  console.log('城市已選擇:', value)
}

defineOptions({
  inheritAttrs: false
})
</script>

<template>
  <ISelect
    v-bind="$attrs"
    :model-value="modelValue"
    :items="cityOptions"
    :placeholder="placeholder"
    :disabled="disabled"
    @update:model-value="handleChange"
  >
    <!-- 
      Slot Forwarding (Slot 透傳)
      將 CitySelect 接收到的所有 slot，原封不動地傳給 ISelect
      這樣如果不論 ISelect 換成什麼 UI 庫，只有要支援該 slot，外層都能使用
    -->
    <template
      v-for="(_, name) in $slots"
      #[name]="slotData"
    >
      <slot
        :name="name"
        v-bind="slotData || {}"
      />
    </template>
  </ISelect>
</template>
