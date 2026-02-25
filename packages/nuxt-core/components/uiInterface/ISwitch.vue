<script setup lang="ts">
import { computed } from 'vue'

/**
 * Component: ISwitch (開關切換元件)
 *
 * 介面層 (Interface Layer) 標準元件。
 * 用於二元狀態切換 (開/關、是/否)。
 *
 * 設計風格遵循 Corporate Trust (企業信賴) 風格指南：
 * - Primary: 開啟時呈現 Indigo 色調。
 * - Animation: 平滑滑動過渡效果。
 * - Accessibility: 支援鍵盤操作與 ARIA 屬性。
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
  modelValue?: boolean | any

  /**
   * 開啟時的值
   * @default true
   */
  trueValue?: any

  /**
   * 關閉時的值
   * @default false
   */
  falseValue?: any

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
   * 是否顯示載入中
   * @default false
   */
  loading?: boolean

  /**
   * 顏色主題
   * @default 'primary'
   */
  color?: string

  /**
   * 是否內嵌 (inset) 樣式
   * @default false
   */
  inset?: boolean

  /**
   * 是否隱藏詳細訊息
   * @default false
   */
  hideDetails?: boolean | 'auto'
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  trueValue: true,
  falseValue: false,
  label: undefined,
  disabled: false,
  loading: false,
  color: 'primary',
  inset: false,
  hideDetails: false
})

// 定義事件
interface Emits {
  (e: 'update:modelValue', value: boolean | any): void
  (e: 'change', value: boolean | any): void
}
const emit = defineEmits<Emits>()

// ====================================================
// 2. 邏輯處理
// ====================================================
const isChecked = computed(() => props.modelValue === props.trueValue)

const handleToggle = (val: boolean) => {
  if (!props.disabled && !props.loading) {
    const newValue = val ? props.trueValue : props.falseValue
    emit('update:modelValue', newValue)
    emit('change', newValue)
  }
}

// ====================================================
// 3. 屬性對照表 (Adapter)
// ====================================================
const vuetifyBindings = computed(() => {
  return {
    color: props.color === 'primary' ? 'primary' : props.color,
    inset: props.inset,
    hideDetails: props.hideDetails
  }
})
</script>

<template>
  <!-- Vuetify Implementation -->
  <v-switch
    v-if="USE_FRAMEWORK"
    v-bind="{ ...vuetifyBindings, ...$attrs }"
    :model-value="isChecked"
    :label="label"
    :disabled="disabled"
    :loading="loading"
    density="compact"
    class="i-switch-field"
    @update:model-value="handleToggle"
  >
    <template v-if="$slots.label" #label>
      <slot name="label">{{ label }}</slot>
    </template>
  </v-switch>

  <!-- Native Implementation Support (Simplified Fallback) -->
  <label
    v-else
    class="i-switch"
    :class="{
      'i-switch--disabled': disabled,
      'i-switch--loading': loading
    }"
  >
    <input
      type="checkbox"
      :checked="isChecked"
      :disabled="disabled || loading"
      class="i-switch__input"
      @change="() => handleToggle(!isChecked)"
    />
    <span
      class="i-switch__track"
      :class="{ 'i-switch__track--checked': isChecked }"
    >
      <span class="i-switch__thumb">
        <span v-if="loading" class="i-switch__loading">⏳</span>
      </span>
    </span>
    <span v-if="label || $slots.label" class="i-switch__label">
      <slot name="label">{{ label }}</slot>
    </span>
  </label>
</template>

<style scoped>
.i-switch-field {
  margin-top: 0;
}

/* Vuetify Style Overrides for Corporate Trust */
:deep(.v-switch__track) {
  background-color: var(--color-gray-300, #cbd5e1);
  opacity: 1;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

:deep(.v-switch--dirty .v-switch__track) {
  background-color: var(--color-primary-600, #4f46e5) !important;
  box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.3);
}

:deep(.v-switch__thumb) {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

:deep(.v-label) {
  font-family: var(--font-family-base, 'Inter');
  font-size: 0.875rem;
  color: var(--color-gray-700, #334155);
  opacity: 1;
  font-weight: 500;
}

:deep(.v-switch--disabled) {
  opacity: 0.6;
}

/* Native Styles */
.i-switch {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  user-select: none;
}

.i-switch--disabled,
.i-switch--loading {
  opacity: 0.6;
  cursor: not-allowed;
}

.i-switch__input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.i-switch__track {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
  background: #cbd5e1;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.i-switch__track--checked {
  background: #4f46e5;
  box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.3);
}

.i-switch__thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.i-switch__track--checked .i-switch__thumb {
  transform: translateX(20px);
}

.i-switch__loading {
  font-size: 0.75rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.i-switch__label {
  font-size: 0.875rem;
  color: #334155;
  font-weight: 500;
}
</style>
