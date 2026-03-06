<script setup lang="ts">
import { computed, ref, watch, nextTick, onMounted } from 'vue'

/**
 * Component: ITextarea (多行文字輸入元件)
 *
 * 介面層 (Interface Layer) 標準元件。
 * 用於多行文字輸入,支援自動高度調整。
 *
 * 設計風格遵循 Corporate Trust (企業信賴) 風格指南：
 * - Primary: Focus 時呈現 Indigo 色調。
 * - Animation: 平滑的高度過渡效果。
 * - Accessibility: 支援字數統計與鍵盤導航。
 */

// ====================================================
// 框架切換開關
// ====================================================
const USE_FRAMEWORK = true

// 1. 定義標準 Props
interface Props {
  /**
   * 綁定值 (v-model)
   */
  modelValue?: string

  /**
   * 標籤文字
   */
  label?: string

  /**
   * 佔位符文字
   */
  placeholder?: string

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
   * 行數
   * @default 3
   */
  rows?: number

  /**
   * 最大字數限制
   */
  maxlength?: number

  /**
   * 是否自動調整高度
   * @default false
   */
  autoGrow?: boolean

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
   * 是否顯示字數統計
   * @default false
   */
  counter?: boolean | number

  /**
   * 是否隱藏詳細訊息
   * @default false
   */
  hideDetails?: boolean | 'auto'
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  label: undefined,
  placeholder: undefined,
  disabled: false,
  readonly: false,
  rows: 3,
  maxlength: undefined,
  autoGrow: false,
  color: 'primary',
  density: 'compact',
  errorMessages: undefined,
  counter: false,
  hideDetails: false
})

// 定義事件
interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
  (e: 'blur', event: FocusEvent): void
  (e: 'focus', event: FocusEvent): void
}
const emit = defineEmits<Emits>()

// ====================================================
// 2. 邏輯處理
// ====================================================
const textareaRef = ref<HTMLTextAreaElement>()

const internalValue = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val || '')
    emit('change', val || '')
  }
})

// 字數統計
const charCount = computed(() => props.modelValue?.length || 0)

// 自動調整高度 (僅用於原生實作)
const adjustHeight = () => {
  if (props.autoGrow && textareaRef.value && !USE_FRAMEWORK) {
    textareaRef.value.style.height = 'auto'
    textareaRef.value.style.height = `${textareaRef.value.scrollHeight}px`
  }
}

watch(
  () => props.modelValue,
  () => {
    nextTick(adjustHeight)
  }
)

onMounted(() => {
  adjustHeight()
})

// ====================================================
// 3. 屬性對照表 (Adapter)
// ====================================================
const vuetifyBindings = computed(() => ({
  color: props.color === 'primary' ? 'primary' : props.color,
  density: props.density,
  hideDetails: props.hideDetails,
  errorMessages: props.errorMessages,
  counter: props.counter
}))
</script>

<template>
  <!-- Vuetify Implementation -->
  <v-textarea
    v-if="USE_FRAMEWORK"
    v-bind="{ ...vuetifyBindings, ...$attrs }"
    v-model="internalValue"
    :label="label"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :rows="rows"
    :maxlength="maxlength"
    :auto-grow="autoGrow"
    variant="outlined"
    bg-color="white"
    class="i-textarea-field"
    @blur="(e: FocusEvent) => emit('blur', e)"
    @focus="(e: FocusEvent) => emit('focus', e)"
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
  </v-textarea>

  <!-- Native Implementation Support (Simplified Fallback) -->
  <div
    v-else
    class="i-textarea"
  >
    <label
      v-if="label"
      class="field-label"
    >
      {{ label }}
    </label>
    <div
      class="textarea-wrapper"
      :class="{ 'has-error': !!errorMessages, 'is-disabled': disabled }"
    >
      <textarea
        ref="textareaRef"
        v-model="internalValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :rows="rows"
        :maxlength="maxlength"
        class="textarea-field"
        @blur="(e: any) => emit('blur', e)"
        @focus="(e: any) => emit('focus', e)"
      />
    </div>

    <!-- 底部資訊列 -->
    <div
      v-if="errorMessages || counter"
      class="textarea-footer"
    >
      <div
        v-if="errorMessages"
        class="field-error"
      >
        {{ Array.isArray(errorMessages) ? errorMessages[0] : errorMessages }}
      </div>
      <div
        v-if="counter"
        class="char-count"
      >
        {{ charCount }}{{ maxlength ? ` / ${maxlength}` : '' }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.i-textarea-field {
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
.i-textarea {
  width: 100%;
}

.field-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #334155;
  margin-bottom: 0.5rem;
}

.textarea-wrapper {
  position: relative;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  transition: all 0.2s;
}

.textarea-wrapper:hover:not(.is-disabled) {
  border-color: #6366f1;
}

.textarea-wrapper:focus-within {
  border-color: #6366f1;
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
}

.textarea-wrapper.has-error {
  border-color: #ef4444;
}

.textarea-wrapper.has-error:focus-within {
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
}

.textarea-wrapper.is-disabled {
  background: #f8fafc;
  cursor: not-allowed;
  opacity: 0.7;
}

.textarea-field {
  width: 100%;
  padding: 0.75rem;
  border: none;
  outline: none;
  font-size: 0.875rem;
  font-family: inherit;
  background: transparent;
  resize: vertical;
}

.textarea-field:disabled {
  cursor: not-allowed;
}

.textarea-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.4rem;
  font-size: 0.85rem;
}

.field-error {
  color: #ef4444;
}

.char-count {
  color: #94a3b8;
  margin-left: auto;
}
</style>
