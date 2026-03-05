<script setup lang="ts">
import { computed } from 'vue'

/**
 * Component: ICheckbox (核取方塊元件)
 *
 * 介面層 (Interface Layer) 標準元件。
 * 支援單選 (Boolean) 與多選 (Array) 模式。
 *
 * 設計風格遵循 Corporate Trust (企業信賴) 風格指南：
 * - Primary: 選中時呈現 Indigo 色調。
 * - Indeterminate: 半選狀態支援。
 * - Animation: 平滑過渡效果。
 */

// ====================================================
// 框架切換開關
// ====================================================
const USE_FRAMEWORK = true

// 1. 定義標準 Props
interface Props {
  /**
   * 綁定值 (支援 Boolean 或 Array)
   */
  modelValue?: boolean | any[]

  /**
   * 多選模式下的選項值
   */
  value?: any

  /**
   * 標籤文字
   */
  label?: string

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean

  /**
   * 是否為半選狀態 (Indeterminate)
   * @default false
   */
  indeterminate?: boolean

  /**
   * 錯誤訊息 (若有值則顯示錯誤狀態)
   */
  errorMessages?: string | string[]

  /**
   * 顏色主題
   * @default 'primary'
   */
  color?: string

  /**
   * 是否隱藏詳細訊息 (如錯誤訊息/提示)
   * @default false
   */
  hideDetails?: boolean | 'auto'

  /**
   * 排列密度
   * @default 'compact'
   */
  density?: 'default' | 'comfortable' | 'compact'

  /**
   * 是否為唯讀
   * @default false
   */
  readonly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  value: undefined,
  label: undefined,
  disabled: false,
  indeterminate: false,
  errorMessages: undefined,
  color: 'primary',
  hideDetails: false,
  density: 'compact',
  readonly: false
})

// 定義事件
interface Emits {
  (e: 'update:modelValue', value: boolean | any[]): void
  (e: 'change', value: boolean | any[]): void
}
const emit = defineEmits<Emits>()

// ====================================================
// 2. 邏輯處理
// ====================================================
const isChecked = computed(() => {
  if (Array.isArray(props.modelValue)) {
    return props.value !== undefined && props.modelValue.includes(props.value)
  }
  return !!props.modelValue
})

const handleChange = (event: any) => {
  // Vuetify 的 @update:model-value 會直接給出新值，若是原生則需處理 event
  const newValue = event
  emit('update:modelValue', newValue)
  emit('change', newValue)
}

// ====================================================
// 3. 屬性對照表 (Adapter)
// ====================================================
const vuetifyBindings = computed(() => {
  return {
    color: props.color === 'primary' ? 'primary' : props.color,
    density: props.density,
    hideDetails: props.hideDetails,
    readonly: props.readonly,
    errorMessages: props.errorMessages
  }
})
</script>

<template>
  <!-- Vuetify Implementation -->
  <v-checkbox
    v-if="USE_FRAMEWORK"
    v-bind="{ ...vuetifyBindings, ...$attrs }"
    :model-value="modelValue"
    :value="value"
    :label="label"
    :disabled="disabled"
    :indeterminate="indeterminate"
    class="i-checkbox-field"
    @update:model-value="handleChange"
  >
    <template
      v-if="$slots.label"
      #label
    >
      <slot name="label">{{ label }}</slot>
    </template>
  </v-checkbox>

  <!-- Native Implementation Support (Simplified Fallback) -->
  <label
    v-else
    class="i-checkbox"
    :class="{
      'i-checkbox--disabled': disabled,
      'i-checkbox--checked': isChecked,
      'i-checkbox--indeterminate': indeterminate
    }"
  >
    <input
      type="checkbox"
      class="i-checkbox__input"
      :checked="isChecked"
      :disabled="disabled"
      :value="value"
      @change="(e) => handleChange((e.target as HTMLInputElement).checked)"
    />
    <span class="i-checkbox__checkmark"></span>
    <span
      v-if="label || $slots.label"
      class="i-checkbox__label"
    >
      <slot name="label">{{ label }}</slot>
    </span>
  </label>
</template>

<style scoped>
.i-checkbox-field {
  /* Aligns with standard text height */
  margin-top: 0;
}

/* Vuetify Style Overrides for Corporate Trust */
:deep(.v-selection-control__input > .v-icon) {
  color: var(--color-gray-300, #cbd5e1); /* Default border color look */
  opacity: 1;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

:deep(.v-selection-control--dirty .v-selection-control__input > .v-icon),
:deep(.v-selection-control--dirty .v-selection-control__input > .v-icon::before),
:deep(.v-selection-control--indeterminate .v-selection-control__input > .v-icon) {
  color: var(--color-primary-600, #4f46e5) !important;
  transform: scale(1.1); /* Subtle pop effect */
  filter: drop-shadow(0 2px 4px rgba(79, 70, 229, 0.2)); /* Weighted shadow */
}

:deep(.v-label) {
  font-family: var(--font-family-base, 'Inter');
  font-size: 0.875rem;
  color: var(--color-gray-700, #334155);
  opacity: 1;
  font-weight: 500;
}

:deep(.v-selection-control--disabled) {
  opacity: 0.6;
}

/* Native Styles */
.i-checkbox {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
}

.i-checkbox--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.i-checkbox__input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.i-checkbox__checkmark {
  position: relative;
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid #cbd5e1;
  border-radius: 6px; /* rounded-md */
  background: white;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.i-checkbox:hover .i-checkbox__checkmark {
  border-color: #4f46e5;
  background-color: #f5f3ff;
}

.i-checkbox__input:checked ~ .i-checkbox__checkmark {
  background: #4f46e5;
  border-color: #4f46e5;
  box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.3);
}

.i-checkbox__input:checked ~ .i-checkbox__checkmark::after {
  content: '';
  position: absolute;
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

/* Indeterminate State */
.i-checkbox--indeterminate .i-checkbox__checkmark {
  background: #4f46e5;
  border-color: #4f46e5;
}

.i-checkbox--indeterminate .i-checkbox__checkmark::after {
  content: '';
  position: absolute;
  left: 4px;
  top: 8px;
  width: 8px;
  height: 2px;
  background: white;
  transform: none;
  border: none;
}

.i-checkbox__label {
  font-size: 0.875rem;
  color: #334155;
  font-weight: 500;
}
</style>
