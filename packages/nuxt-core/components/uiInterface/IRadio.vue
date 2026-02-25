<script setup lang="ts">
import { computed } from 'vue'

/**
 * Component: IRadio (單選按鈕元件)
 *
 * 介面層 (Interface Layer) 標準元件。
 * 用於單選組 (Radio Group) 中的單一選項。
 *
 * 設計風格遵循 Corporate Trust (企業信賴) 風格指南：
 * - Primary: 選中時呈現 Indigo 色調。
 * - Animation: 平滑過渡效果與縮放動畫。
 * - Accessibility: 支援鍵盤導航與 ARIA 屬性。
 */

// ====================================================
// 框架切換開關
// ====================================================
const USE_FRAMEWORK = true

// 1. 定義標準 Props
interface Props {
  /**
   * 綁定值 (Radio Group 的當前值)
   */
  modelValue?: any

  /**
   * 此選項的值
   */
  value: any

  /**
   * 標籤文字
   */
  label?: string

  /**
   * Radio Group 名稱 (原生 HTML 使用)
   */
  name?: string

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean

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
   * 是否隱藏詳細訊息
   * @default false
   */
  hideDetails?: boolean | 'auto'
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  label: undefined,
  name: undefined,
  disabled: false,
  color: 'primary',
  density: 'compact',
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
const isChecked = computed(() => props.modelValue === props.value)

const handleChange = () => {
  if (!props.disabled) {
    emit('update:modelValue', props.value)
    emit('change', props.value)
  }
}

// ====================================================
// 3. 屬性對照表 (Adapter)
// ====================================================
const vuetifyBindings = computed(() => {
  return {
    color: props.color === 'primary' ? 'primary' : props.color,
    density: props.density,
    hideDetails: props.hideDetails
  }
})
</script>

<template>
  <!-- Vuetify Implementation -->
  <v-radio
    v-if="USE_FRAMEWORK"
    v-bind="{ ...vuetifyBindings, ...$attrs }"
    :model-value="modelValue"
    :value="value"
    :label="label"
    :disabled="disabled"
    class="i-radio-field"
    @update:model-value="(val) => emit('update:modelValue', val)"
  >
    <template v-if="$slots.label" #label>
      <slot name="label">{{ label }}</slot>
    </template>
  </v-radio>

  <!-- Native Implementation Support (Simplified Fallback) -->
  <label
    v-else
    class="i-radio"
    :class="{ 'i-radio--disabled': disabled, 'i-radio--checked': isChecked }"
  >
    <input
      type="radio"
      :name="name"
      :value="value"
      :checked="isChecked"
      :disabled="disabled"
      class="i-radio__input"
      @change="handleChange"
    />
    <span class="i-radio__circle"></span>
    <span v-if="label || $slots.label" class="i-radio__label">
      <slot name="label">{{ label }}</slot>
    </span>
  </label>
</template>

<style scoped>
.i-radio-field {
  margin-top: 0;
}

/* Vuetify Style Overrides for Corporate Trust */
:deep(.v-selection-control__input > .v-icon) {
  color: var(--color-gray-300, #cbd5e1);
  opacity: 1;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

:deep(.v-selection-control--dirty .v-selection-control__input > .v-icon),
:deep(.v-selection-control--dirty .v-selection-control__input > .v-icon::before) {
  color: var(--color-primary-600, #4f46e5) !important;
  transform: scale(1.1);
  filter: drop-shadow(0 2px 4px rgba(79, 70, 229, 0.2));
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
.i-radio {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
}

.i-radio--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.i-radio__input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.i-radio__circle {
  position: relative;
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid #cbd5e1;
  border-radius: 50%;
  background: white;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.i-radio:hover .i-radio__circle {
  border-color: #4f46e5;
  background-color: #f5f3ff;
}

.i-radio__input:checked ~ .i-radio__circle {
  border-color: #4f46e5;
  box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.3);
}

.i-radio__input:checked ~ .i-radio__circle::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #4f46e5;
}

.i-radio__label {
  font-size: 0.875rem;
  color: #334155;
  font-weight: 500;
}
</style>
