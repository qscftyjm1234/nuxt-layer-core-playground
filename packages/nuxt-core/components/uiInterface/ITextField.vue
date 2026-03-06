<script setup lang="ts">
import { computed } from 'vue'

/**
 * Component: ITextField (文字輸入框元件)
 *
 * 介面層 (Interface Layer) 標準元件。
 * 負責處理單行文字輸入、密碼輸入等，並提供統一的樣式與行為。
 *
 * 設計風格遵循 Corporate Trust (企業信賴) 風格指南：
 * - Focus: 聚焦時顯示 Indigo 色調的 Ring。
 * - Style: 簡潔的邊框與清晰的文字層級。
 * - Density: 支援 Compact 模式以適應複雜表單。
 */

// ====================================================
// 框架切換開關
// ====================================================
const USE_FRAMEWORK = true

// 1. 定義標準 Props
interface Props {
  /**
   * 綁定值
   */
  modelValue?: string | number | null

  /**
   * 標籤文字
   */
  label?: string

  /**
   * 佔位符文字
   */
  placeholder?: string

  /**
   * 輸入類型 (text, password, number, etc.)
   * @default 'text'
   */
  type?: string

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean

  /**
   * 是否唯讀
   * @default false
   */
  readonly?: boolean

  /**
   * 是否顯示清除按鈕
   * @default false
   */
  clearable?: boolean

  /**
   * 前置圖示 (內部)
   */
  prependIcon?: string

  /**
   * 後置圖示 (內部)
   */
  appendIcon?: string

  /**
   * 錯誤訊息
   */
  errorMessages?: string | string[]

  /**
   * 排列密度
   * @default 'compact'
   */
  density?: 'default' | 'comfortable' | 'compact'

  /**
   * 樣式變體
   * @default 'outlined'
   */
  variant?: 'filled' | 'outlined' | 'plain' | 'underlined' | 'solo'

  /**
   * 自定義與輸入框互動的顏色
   * @default 'primary'
   */
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  label: undefined,
  placeholder: undefined,
  type: 'text',
  disabled: false,
  readonly: false,
  clearable: false,
  prependIcon: undefined,
  appendIcon: undefined,
  errorMessages: undefined,
  density: 'compact',
  variant: 'outlined',
  color: 'primary'
})

// 定義事件
interface Emits {
  (e: 'update:modelValue', value: string | number | null): void
  (e: 'clear'): void
  (e: 'click:prepend'): void
  (e: 'click:append'): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}
const emit = defineEmits<Emits>()

// ====================================================
// 2. 邏輯處理
// ====================================================
const internalValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const handleClear = () => {
  emit('update:modelValue', '')
  emit('clear')
}

// ====================================================
// 3. 屬性對照表 (Adapter)
// ====================================================
const vuetifyBindings = computed(() => ({
  color: props.color === 'primary' ? 'primary' : props.color,
  variant: props.variant,
  density: props.density,
  errorMessages: props.errorMessages,
  prependInnerIcon: props.prependIcon,
  appendInnerIcon: props.appendIcon
}))
</script>

<template>
  <!-- Vuetify Implementation -->
  <v-text-field
    v-if="USE_FRAMEWORK"
    v-bind="{ ...vuetifyBindings, ...$attrs }"
    v-model="internalValue"
    :label="label"
    :placeholder="placeholder"
    :type="type"
    :disabled="disabled"
    :readonly="readonly"
    :clearable="clearable"
    bg-color="white"
    hide-details="auto"
    class="i-text-field"
    @click:clear="emit('clear')"
    @click:prepend-inner="emit('click:prepend')"
    @click:append-inner="emit('click:append')"
    @focus="(e: FocusEvent) => emit('focus', e)"
    @blur="(e: FocusEvent) => emit('blur', e)"
  />

  <!-- Native Fallback (Simplified) -->
  <div
    v-else
    class="ui-text-field"
  >
    <label
      v-if="label"
      class="field-label"
    >
      {{ label }}
    </label>
    <div
      class="field-wrapper"
      :class="{
        'field-wrapper--focused': false /* TODO: Add focus state logic if needed for native */,
        'field-wrapper--disabled': disabled,
        'field-wrapper--error': !!errorMessages
      }"
    >
      <span
        v-if="prependIcon"
        class="field-icon prepend"
      >
        {{ prependIcon }}
      </span>
      <input
        v-model="internalValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        class="field-input"
        @focus="(e: any) => emit('focus', e)"
        @blur="(e: any) => emit('blur', e)"
      />
      <button
        v-if="clearable && internalValue"
        class="field-icon append clickable"
        @click="handleClear"
      >
        ×
      </button>
      <span
        v-else-if="appendIcon"
        class="field-icon append"
      >
        {{ appendIcon }}
      </span>
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
/* Vuetify Overrides for Corporate Trust */
.i-text-field {
  transition: all 0.2s ease;
}

:deep(.v-field__outline__start),
:deep(.v-field__outline__end),
:deep(.v-field__outline__notch) {
  border-color: var(--color-gray-200, #e2e8f0) !important;
  opacity: 1;
  transition: border-color 0.2s ease;
}

:deep(.v-field--focused .v-field__outline__start),
:deep(.v-field--focused .v-field__outline__end),
:deep(.v-field--focused .v-field__outline__notch) {
  border-color: var(--color-primary-500, #6366f1) !important;
  border-width: 1px !important;
  box-shadow:
    0 0 0 1px #6366f1,
    0 0 0 4px rgba(99, 102, 241, 0.1);
}

:deep(.v-field--error:not(.v-field--disabled) .v-field__outline__start),
:deep(.v-field--error:not(.v-field--disabled) .v-field__outline__end),
:deep(.v-field--error:not(.v-field--disabled) .v-field__outline__notch) {
  border-color: #ef4444 !important;
}

:deep(.v-field__input) {
  padding-top: 10px;
  padding-bottom: 10px;
  min-height: 40px;
  font-family: var(--font-family-base, 'Inter');
  font-size: 0.875rem;
  color: var(--color-gray-900, #0f172a);
}

:deep(.v-field__input::placeholder) {
  color: var(--color-gray-400, #94a3b8) !important;
  opacity: 1;
}

:deep(.v-label) {
  font-size: 0.875rem;
  color: var(--color-gray-500, #64748b);
  opacity: 1;
}

:deep(.v-field--focused .v-label) {
  color: var(--color-primary-600, #4f46e5);
  font-weight: 500;
}

/* Native Styles */
.ui-text-field {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.field-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #334155;
}

.field-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem; /* rounded-lg */
  background: white;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.field-wrapper:focus-within {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.field-wrapper--error {
  border-color: #ef4444;
}

.field-wrapper--error:focus-within {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.field-input {
  flex: 1;
  padding: 0.5rem 0.75rem;
  border: none;
  outline: none;
  font-size: 0.875rem;
  background: transparent;
  color: #0f172a;
}

.field-input::placeholder {
  color: #94a3b8;
}

.field-input:disabled {
  background-color: #f8fafc;
  cursor: not-allowed;
}

.field-icon {
  padding: 0 0.75rem;
  color: #94a3b8;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
}

.field-icon.clickable {
  cursor: pointer;
  transition: color 0.2s;
}

.field-icon.clickable:hover {
  color: #64748b;
}

.field-error {
  font-size: 0.75rem;
  color: #ef4444;
}
</style>
