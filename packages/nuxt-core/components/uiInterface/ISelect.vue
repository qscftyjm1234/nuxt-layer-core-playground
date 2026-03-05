<script setup lang="ts">
import { computed } from 'vue'

/**
 * Component: ISelect (下拉選擇元件)
 *
 * 介面層 (Interface Layer) 標準元件。
 * 用於單選或多選下拉選擇。
 *
 * 設計風格遵循 Corporate Trust (企業信賴) 風格指南：
 * - Primary: 選中時呈現 Indigo 色調。
 * - Animation: 平滑展開/收合動畫。
 * - Accessibility: 支援鍵盤導航與搜尋。
 */

// ====================================================
// 框架切換開關
// ====================================================
const USE_FRAMEWORK = true

// 1. 定義選項介面
interface SelectOption {
  /**
   * 選項的值
   */
  value: any

  /**
   * 顯示的標籤
   */
  label: string

  /**
   * 是否禁用此選項
   */
  disabled?: boolean
}

// 2. 定義標準 Props
interface Props {
  /**
   * 綁定值 (v-model)
   */
  modelValue?: any

  /**
   * 選項列表
   */
  items: SelectOption[]

  /**
   * 標籤文字
   */
  label?: string

  /**
   * 佔位符文字
   * @default '請選擇'
   */
  placeholder?: string

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean

  /**
   * 是否可清除
   * @default false
   */
  clearable?: boolean

  /**
   * 是否多選
   * @default false
   */
  multiple?: boolean

  /**
   * 顏色主題
   * @default 'primary'
   */
  color?: string

  /**
   * 排列密度
   * @default 'compact'
   */
  density?: 'default' | 'comfortable' | 'compact'

  /**
   * 錯誤訊息
   */
  errorMessages?: string | string[]

  /**
   * 是否隱藏詳細訊息
   * @default false
   */
  hideDetails?: boolean | 'auto'
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  label: undefined,
  placeholder: '請選擇',
  disabled: false,
  clearable: false,
  multiple: false,
  color: 'primary',
  density: 'compact',
  errorMessages: undefined,
  hideDetails: false
})

// 定義事件
interface Emits {
  (e: 'update:modelValue', value: any): void
  (e: 'change', value: any): void
}
const emit = defineEmits<Emits>()

// ====================================================
// 2. 邏輯處理
// ====================================================
const internalValue = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val)
    emit('change', val)
  }
})

// ====================================================
// 3. 屬性對照表 (Adapter)
// ====================================================
const vuetifyBindings = computed(() => {
  return {
    color: props.color === 'primary' ? 'primary' : props.color,
    density: props.density,
    hideDetails: props.hideDetails,
    errorMessages: props.errorMessages
  }
})
</script>

<template>
  <!-- Vuetify Implementation -->
  <v-select
    v-if="USE_FRAMEWORK"
    v-bind="{ ...vuetifyBindings, ...$attrs }"
    v-model="internalValue"
    :items="items"
    :label="label"
    :placeholder="placeholder"
    :disabled="disabled"
    :clearable="clearable"
    :multiple="multiple"
    item-title="label"
    item-value="value"
    variant="outlined"
    bg-color="white"
    class="i-select-field"
  >
    <template
      v-for="(_, name) in $slots"
      #[name]="slotProps"
    >
      <slot
        :name="name"
        v-bind="slotProps"
      />
    </template>
  </v-select>

  <!-- Native Implementation Support (Simplified Fallback) -->
  <div
    v-else
    class="i-select"
  >
    <label
      v-if="label"
      class="field-label"
    >
      {{ label }}
    </label>
    <div
      class="select-wrapper"
      :class="{ 'is-disabled': disabled }"
    >
      <select
        v-model="internalValue"
        :disabled="disabled"
        :multiple="multiple"
        class="select-field"
      >
        <option
          v-if="placeholder && !multiple"
          value=""
          disabled
          selected
        >
          {{ placeholder }}
        </option>
        <option
          v-for="option in items"
          :key="option.value"
          :value="option.value"
          :disabled="option.disabled"
        >
          {{ option.label }}
        </option>
      </select>
    </div>
    <div
      v-if="errorMessages"
      class="field-error"
    >
      {{ Array.isArray(errorMessages) ? errorMessages[0] : errorMessages }}
    </div>
  </div>
</template>

<style scoped>
.i-select-field {
  margin-top: 0;
}

/* Vuetify Style Overrides for Corporate Trust */
:deep(.v-field__outline__start),
:deep(.v-field__outline__end),
:deep(.v-field__outline__notch) {
  border-color: var(--color-gray-200, #e2e8f0) !important;
}

:deep(.v-field--focused .v-field__outline__start),
:deep(.v-field--focused .v-field__outline__end),
:deep(.v-field--focused .v-field__outline__notch) {
  border-color: var(--color-primary-500, #6366f1) !important;
  opacity: 1 !important;
  border-width: 1px !important;
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
}

:deep(.v-field__input) {
  padding-top: 10px;
  padding-bottom: 10px;
  min-height: 44px;
  font-family: var(--font-family-base, 'Inter');
  font-size: 0.875rem;
  color: var(--color-gray-900, #0f172a);
}

:deep(.v-label) {
  font-size: 0.875rem;
  color: var(--color-gray-500, #64748b);
}

:deep(.v-field--disabled) {
  background-color: var(--color-gray-50, #f8fafc);
  opacity: 0.7;
}

/* Native Styles */
.i-select {
  width: 100%;
}

.field-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #334155;
  margin-bottom: 0.5rem;
}

.select-wrapper {
  position: relative;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  transition: all 0.2s;
}

.select-wrapper:hover:not(.is-disabled) {
  border-color: #6366f1;
}

.select-wrapper:focus-within {
  border-color: #6366f1;
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
}

.select-field {
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  outline: none;
  font-size: 0.875rem;
  background: transparent;
  cursor: pointer;
  appearance: none;
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2394a3b8%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 0.8rem;
}

.select-field:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.field-error {
  margin-top: 0.4rem;
  font-size: 0.85rem;
  color: #ef4444;
  margin-left: 0.25rem;
}
</style>
