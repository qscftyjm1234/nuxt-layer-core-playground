<script setup lang="ts">
/**
 * IDatePicker - 日期選擇器介面層
 *
 * 用途：統一的 DatePicker 介面，內部可替換 UI 框架
 *
 * 設計原則：
 * - 只定義 props 和 events
 * - 支援日期範圍選擇
 */

interface Props {
  modelValue: string | Date | null
  type?: 'date' | 'datetime' | 'time' | 'month' | 'year'
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  format?: string // 顯示格式
  minDate?: string | Date
  maxDate?: string | Date
  // 驗證相關
  error?: boolean
  errorMessage?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'date',
  placeholder: '請選擇日期',
  disabled: false,
  clearable: true,
  error: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string | Date | null]
  change: [value: string | Date | null]
  clear: []
}>()

// 轉換為 input 可用的格式
const inputType = computed(() => {
  const typeMap: Record<string, string> = {
    date: 'date',
    datetime: 'datetime-local',
    time: 'time',
    month: 'month',
    year: 'number'
  }
  return typeMap[props.type] || 'date'
})

// 格式化日期值
const formattedValue = computed({
  get: () => {
    if (!props.modelValue) return ''

    if (props.modelValue instanceof Date) {
      return formatDate(props.modelValue)
    }
    return props.modelValue
  },
  set: (val) => {
    if (!val) {
      emit('update:modelValue', null)
      emit('change', null)
      return
    }

    const date = new Date(val)
    emit('update:modelValue', date)
    emit('change', date)
  }
})

// 格式化日期為 input 格式
const formatDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  if (props.type === 'date') {
    return `${year}-${month}-${day}`
  }

  if (props.type === 'datetime') {
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day}T${hours}:${minutes}`
  }

  if (props.type === 'month') {
    return `${year}-${month}`
  }

  if (props.type === 'year') {
    return String(year)
  }

  return date.toISOString()
}

// 清除日期
const handleClear = () => {
  formattedValue.value = ''
  emit('clear')
}
</script>

<template>
  <div class="i-datepicker">
    <div
      class="datepicker-wrapper"
      :class="{ 'has-error': error, 'is-disabled': disabled }"
    >
      <input
        v-model="formattedValue"
        :type="inputType"
        :placeholder="placeholder"
        :disabled="disabled"
        :min="minDate as any"
        :max="maxDate as any"
        class="datepicker-field"
      />

      <!-- 清除按鈕 -->
      <button
        v-if="clearable && formattedValue"
        type="button"
        class="clear-btn"
        @click="handleClear"
      >
        ✕
      </button>
    </div>

    <!-- 錯誤訊息 -->
    <div
      v-if="error && errorMessage"
      class="error-message"
    >
      {{ errorMessage }}
    </div>
  </div>

  <!-- 未來換成 Vuetify 的範例 -->
  <!--
  <VDatePicker
    v-model="formattedValue"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    :clearable="clearable"
    :min="minDate"
    :max="maxDate"
    :error="error"
    :error-messages="errorMessage"
  />
  -->
</template>

<style scoped>
.i-datepicker {
  width: 100%;
}

.datepicker-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  transition: all 0.2s;
}

.datepicker-wrapper:hover:not(.is-disabled) {
  border-color: #3498db;
}

.datepicker-wrapper:focus-within {
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.datepicker-wrapper.has-error {
  border-color: #e74c3c;
}

.datepicker-wrapper.has-error:focus-within {
  box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
}

.datepicker-wrapper.is-disabled {
  background: #f5f5f5;
  cursor: not-allowed;
}

.datepicker-field {
  flex: 1;
  padding: 0.5rem;
  border: none;
  outline: none;
  font-size: 1rem;
  background: transparent;
}

.datepicker-field:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.clear-btn {
  padding: 0 0.5rem;
  border: none;
  background: transparent;
  color: #999;
  cursor: pointer;
  font-size: 1.2rem;
  transition: color 0.2s;
}

.clear-btn:hover {
  color: #666;
}

.error-message {
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: #e74c3c;
}
</style>
