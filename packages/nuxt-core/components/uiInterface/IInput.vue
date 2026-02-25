<script setup lang="ts">
import { computed } from 'vue'
import IIcon from './IIcon.vue'

/**
 * Component: IInput (輸入框元件)
 *
 * 介面層 (Interface Layer) 標準元件。
 * 負責將統一的 Props 轉換為底層 UI 框架 (Vuetify) 的屬性。
 * 內部保留了「與 UI 框架解耦」的能力，可隨時切換回原生或其他框架。
 */

// ====================================================
// 框架切換開關 (DEMO USE ONLY)
// true = 使用 Vuetify 實作
// false = 使用 原生 HTML/CSS 實作
// ====================================================
const USE_FRAMEWORK = true

// 1. 定義標準 Props (20% 核心)
interface Props {
  // 綁定的值 (v-model)
  modelValue?: string | number
  // 輸入框類型 (text, password, number...)
  type?: string
  // 提示文字 (灰字)
  placeholder?: string
  // 是否鎖定 (不可點、變灰)
  disabled?: boolean
  // 是否唯讀 (可點、但不給改)
  readonly?: boolean
  // 是否顯示錯誤狀態 (變紅)
  error?: boolean
  // 錯誤訊息文字 (會顯示在下方)
  errorMessage?: string
  // 是否顯示清除按鈕 (X)
  clearable?: boolean
  // 最大長度限制
  maxlength?: number
  // 瀏覽器自動完成建議
  autocomplete?: string
  // 前綴圖示 (左邊的 icon)
  prependIcon?: string
  // 後綴圖示 (右邊的 icon)
  appendIcon?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  type: 'text',
  placeholder: undefined,
  disabled: false,
  readonly: false,
  error: false,
  errorMessage: undefined,
  clearable: false,
  maxlength: undefined,
  autocomplete: 'off',
  prependIcon: undefined,
  appendIcon: undefined
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  change: [value: string | number]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
  clear: []
}>()

// 內部值管理 (Computed Setter/Getter)
const internalValue = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val!)
    emit('change', val!)
  }
})

// ====================================================
// 2. 屬性對照表 (把我們的標準轉成 Vuetify 看得懂的樣子)
// ====================================================
const vuetifyBindings = computed(() => {
  const bindings: Record<string, any> = {}

  // 錯誤訊息處理
  // Vuetify 預設吃 error-messages (陣列或字串)
  if (props.error || props.errorMessage) {
    bindings['error'] = true
    bindings['error-messages'] = props.errorMessage
  }

  // 圖示對照
  // Vuetify 的 input 支援 prepend-inner-icon 和 append-inner-icon
  // 這裡假設我們的 prependIcon 對應到內部的 icon (因為比較常見)
  if (props.prependIcon) bindings['prepend-inner-icon'] = props.prependIcon
  if (props.appendIcon) bindings['append-inner-icon'] = props.appendIcon

  return bindings
})

// ====================================================
// 3. 原生實作邏輯 (Native Logic)
// ====================================================
const handleClear = () => {
  internalValue.value = ''
  emit('clear')
}

defineOptions({
  inheritAttrs: false // 避免屬性直接貼在 wrapper 上
})
</script>

<template>
  <!-- 
    實作 A: 底層框架 (Vuetify)
    原則：功能對等，屬性透傳 ($attrs)
  -->
  <v-text-field
    v-if="USE_FRAMEWORK"
    v-model="internalValue"
    v-bind="{ ...vuetifyBindings, ...$attrs }"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :clearable="clearable"
    :maxlength="maxlength"
    :autocomplete="autocomplete"
    variant="outlined"
    density="compact"
    hide-details="auto"
    class="i-input-field"
    @blur="emit('blur', $event)"
    @focus="emit('focus', $event)"
    @click:clear="emit('clear')"
  >
    <!-- 透傳 Slot (例如 prepend, append) -->
    <template
      v-for="(_, name) in $slots"
      #[name]="slotProps"
    >
      <slot
        :name="name"
        v-bind="slotProps"
      />
    </template>
  </v-text-field>

  <!-- 
    實作 B: 原生 HTML/CSS
    完全不依賴任何第三方 UI 庫，證明介面層解耦能力
  -->
  <div
    v-else
    class="i-input"
  >
    <div
      class="input-wrapper"
      :class="{ 'has-error': error || errorMessage, 'is-disabled': disabled }"
    >
      <!-- 前綴圖示 -->
      <IIcon
        v-if="prependIcon"
        :icon="prependIcon"
        class="prefix-icon"
      />

      <!-- 輸入框 -->
      <input
        v-model="internalValue"
        v-bind="$attrs"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        :autocomplete="autocomplete"
        class="input-field"
        @blur="emit('blur', $event)"
        @focus="emit('focus', $event)"
      />

      <!-- 清除按鈕 -->
      <button
        v-if="clearable && internalValue && !disabled && !readonly"
        type="button"
        class="clear-btn"
        @click="handleClear"
      >
        ✕
      </button>

      <!-- 後綴圖示 -->
      <IIcon
        v-if="appendIcon"
        :icon="appendIcon"
        class="suffix-icon"
      />
    </div>

    <!-- 錯誤訊息 -->
    <div
      v-if="errorMessage"
      class="error-message"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<style scoped>
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

:deep(.v-field__input::placeholder) {
  color: var(--color-gray-400, #94a3b8) !important;
  opacity: 1;
}

:deep(.v-field--disabled) {
  background-color: var(--color-gray-50, #f8fafc);
  opacity: 0.7;
}

:deep(.v-label) {
  font-size: 0.875rem;
  color: var(--color-gray-500, #64748b);
}
</style>

<style scoped>
/* 
 注意：這些樣式僅在使用「原生實作」時才會生效
 當切換到 Vuetify 時，這些樣式完全不會被載入
*/
.i-input {
  width: 100%;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  background: rgba(15, 23, 42, 0.4);
  transition: all 0.2s;
}

.input-wrapper:hover:not(.is-disabled) {
  border-color: rgba(56, 189, 248, 0.5);
  background: rgba(15, 23, 42, 0.6);
}

.input-wrapper:focus-within {
  border-color: #38bdf8;
  box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.2);
  background: rgba(15, 23, 42, 0.8);
}

.input-wrapper.has-error {
  border-color: #ef4444;
}
.input-wrapper.has-error:focus-within {
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
}

.input-wrapper.is-disabled {
  background: rgba(255, 255, 255, 0.05);
  cursor: not-allowed;
  opacity: 0.6;
}

.input-field {
  flex: 1;
  padding: 0.75rem 1rem;
  border: none;
  outline: none;
  font-size: 0.95rem;
  background: transparent;
  color: #e2e8f0;
  width: 100%;
}

.input-field::placeholder {
  color: #64748b;
}
.input-field:disabled {
  cursor: not-allowed;
}

.prefix-icon,
.suffix-icon {
  padding: 0 0.75rem;
  color: #94a3b8;
  display: flex;
  align-items: center;
}

.clear-btn {
  padding: 0 0.5rem;
  border: none;
  background: transparent;
  color: #64748b;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.clear-btn:hover {
  color: #e2e8f0;
}

.error-message {
  margin-top: 0.4rem;
  font-size: 0.85rem;
  color: #ef4444;
  margin-left: 0.25rem;
}
</style>
