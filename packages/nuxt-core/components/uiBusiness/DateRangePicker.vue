<script setup lang="ts">
/**
 * 業務元件 - 日期範圍選擇器
 *
 * 用途：封裝日期範圍選擇的業務邏輯
 * 特點：
 * - 開始日期和結束日期聯動
 * - 自動驗證日期範圍
 * - 支援快速選擇（今天、本週、本月等）
 *
 * 未來維護：
 * - 要改 UI 框架 → 只需要改 IDatePicker.vue
 * - 要改業務邏輯 → 只需要改這個檔案
 * - 頁面完全不用動！
 */

import IDatePicker from '../uiInterface/IDatePicker.vue'

interface DateRange {
  start: Date | null
  end: Date | null
}

interface Props {
  modelValue: DateRange
  disabled?: boolean
  maxRange?: number // 最大範圍天數
  quickSelects?: boolean // 顯示快速選擇
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  quickSelects: true,
  maxRange: undefined
})

const emit = defineEmits<{
  'update:modelValue': [value: DateRange]
  change: [value: DateRange]
}>()

// ... rest of logic stays same

// 開始日期
const startDate = computed({
  get: () => props.modelValue.start,
  set: (val) => {
    const newRange = { ...props.modelValue, start: val }
    emit('update:modelValue', newRange)
    emit('change', newRange)
  }
})

// 結束日期
const endDate = computed({
  get: () => props.modelValue.end,
  set: (val) => {
    const newRange = { ...props.modelValue, end: val }
    emit('update:modelValue', newRange)
    emit('change', newRange)
  }
})

// 業務邏輯：結束日期不能早於開始日期
const minEndDate = computed(() => startDate.value || undefined)

// 業務邏輯：開始日期不能晚於結束日期
const maxStartDate = computed(() => endDate.value || undefined)

// 驗證日期範圍
const isValidRange = computed(() => {
  if (!startDate.value || !endDate.value) return true

  const start = new Date(startDate.value)
  const end = new Date(endDate.value)

  if (end < start) return false

  if (props.maxRange) {
    const diffDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    return diffDays <= props.maxRange
  }

  return true
})

const errorMessage = computed(() => {
  if (!isValidRange.value) {
    if (props.maxRange) {
      return `日期範圍不能超過 ${props.maxRange} 天`
    }
    return '結束日期不能早於開始日期'
  }
  return ''
})

// 快速選擇選項
const quickSelectOptions = [
  { label: '今天', value: 'today' },
  { label: '昨天', value: 'yesterday' },
  { label: '最近 7 天', value: 'last7days' },
  { label: '最近 30 天', value: 'last30days' },
  { label: '本月', value: 'thisMonth' },
  { label: '上月', value: 'lastMonth' }
]

const handleQuickSelect = (value: string) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  let start: Date
  let end: Date = new Date(today)

  switch (value) {
    case 'today':
      start = new Date(today)
      break
    case 'yesterday':
      start = new Date(today)
      start.setDate(start.getDate() - 1)
      end = new Date(start)
      break
    case 'last7days':
      start = new Date(today)
      start.setDate(start.getDate() - 6)
      break
    case 'last30days':
      start = new Date(today)
      start.setDate(start.getDate() - 29)
      break
    case 'thisMonth':
      start = new Date(today.getFullYear(), today.getMonth(), 1)
      break
    case 'lastMonth':
      start = new Date(today.getFullYear(), today.getMonth() - 1, 1)
      end = new Date(today.getFullYear(), today.getMonth(), 0)
      break
    default:
      return
  }

  const newRange = { start, end }
  emit('change', newRange)
}

defineOptions({
  inheritAttrs: false
})
</script>

<template>
  <div
    class="date-range-picker"
    v-bind="$attrs"
  >
    <!-- 快速選擇 -->
    <div
      v-if="quickSelects"
      class="quick-selects"
    >
      <button
        v-for="option in quickSelectOptions"
        :key="option.value"
        type="button"
        class="quick-select-btn"
        @click="handleQuickSelect(option.value)"
      >
        {{ option.label }}
      </button>
    </div>

    <!-- 日期選擇器 -->
    <div class="date-inputs">
      <div class="date-input-group">
        <label class="date-label">開始日期</label>
        <IDatePicker
          v-model="startDate"
          :disabled="disabled"
          :max-date="maxStartDate"
          placeholder="選擇開始日期"
        />
      </div>

      <span class="date-separator">~</span>

      <div class="date-input-group">
        <label class="date-label">結束日期</label>
        <IDatePicker
          v-model="endDate"
          :disabled="disabled"
          :min-date="minEndDate"
          placeholder="選擇結束日期"
          :error="!isValidRange"
          :error-message="errorMessage"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.date-range-picker {
  width: 100%;
}

.quick-selects {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.quick-select-btn {
  padding: 0.25rem 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  color: #666;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}

.quick-select-btn:hover {
  border-color: #3498db;
  color: #3498db;
  background: rgba(52, 152, 219, 0.05);
}

.date-inputs {
  display: flex;
  align-items: flex-end;
  gap: 1rem;
}

.date-input-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.date-label {
  font-size: 0.875rem;
  color: #666;
  font-weight: 500;
}

.date-separator {
  padding-bottom: 0.5rem;
  color: #999;
  font-size: 1.2rem;
}
</style>
