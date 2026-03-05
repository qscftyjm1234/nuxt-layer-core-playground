<script setup lang="ts">
import { computed } from 'vue'
import IIcon from './IIcon.vue'

/**
 * Component: IButton (按鈕元件)
 *
 * 介面層 (Interface Layer) 標準元件。
 * 負責將統一的 Props 轉換為底層 UI 框架 (Vuetify) 的屬性。
 * 內部保留了「與 UI 框架解耦」的能力，可隨時切換回原生或其他框架。
 *
 * 設計風格遵循 Corporate Trust (企業信賴) 風格指南：
 * - Primary: 漸層背景 (Indigo to Violet)，圓角 (Rounded Full/Lg)，懸浮時微幅上浮。
 * - Shadows: 使用帶有藍紫色的陰影，增加深度感。
 *
 * @example
 * <IButton variant="primary" size="large" loading prepend-icon="mdi-check">提交</IButton>
 */

// ====================================================
// 框架切換開關 (可改為 inject 或 config)
// ====================================================
const USE_FRAMEWORK = true

// 1. 定義標準 Props
interface Props {
  /**
   * 按鈕樣式變體
   * @default 'primary'
   */
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'text'
    | 'outlined'
    | 'plain' // 新增 Vuetify 常用變體
    | 'tonal'
    | 'flat'

  /**
   * 尺寸
   * @default 'medium'
   */
  size?: 'x-small' | 'small' | 'medium' | 'large' | 'x-large'

  /**
   * 是否為區塊按鈕 (全寬)
   * @default false
   */
  block?: boolean

  /**
   * 是否處於載入狀態
   * @default false
   */
  loading?: boolean

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean

  /**
   * 連結目標 URL (若存在則渲染為 <a>)
   */
  href?: string

  /**
   * 連結開啟目標 (_blank, _self, etc.)
   */
  target?: string

  /**
   * 自訂顏色 (Hex, RGB, 或 CSS 變數)
   * 若未指定，將根據 variant 自動決定
   */
  color?: string

  /**
   * 前置圖示名稱 (支援 mdi, fa, svg-softleader)
   */
  prependIcon?: string

  /**
   * 後置圖示名稱
   */
  appendIcon?: string

  /**
   * 圓角設定 (符合設計系統)
   * Primary 按鈕通常使用圓角較大的風格
   */
  rounded?: string | number | boolean

  /**
   * 陰影設定
   * @default undefined
   */
  elevation?: string | number
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'medium',
  block: false,
  loading: false,
  disabled: false,
  target: undefined,
  color: undefined,
  href: undefined,
  prependIcon: undefined,
  appendIcon: undefined,
  rounded: undefined,
  elevation: undefined
})

// 定義事件
interface Emits {
  (e: 'click', event: MouseEvent): void
}
const emit = defineEmits<Emits>()

// ====================================================
// 2. 屬性對照表 (Adapter Pattern)
// ====================================================
const vuetifyBindings = computed(() => {
  const bindings: Record<string, any> = {}

  // [Size Mapping]
  // Vuetify 3 支援: x-small, small, default, large, x-large
  const sizeMap: Record<string, string> = {
    'x-small': 'x-small',
    small: 'small',
    medium: 'default', // Mapping medium to default
    large: 'large',
    'x-large': 'x-large'
  }
  bindings.size = sizeMap[props.size] || props.size

  // [Variant & Color Mapping]
  const colorMap: Record<string, string> = {
    danger: 'error',
    success: 'success',
    warning: 'warning',
    info: 'info',
    secondary: 'secondary',
    primary: 'primary'
  }

  // 處理特殊 Variant 映射
  if (['text', 'outlined', 'plain', 'tonal', 'flat'].includes(props.variant)) {
    bindings.variant = props.variant
    // 若無指定顏色，則使用 Primary 或預設
    bindings.color = props.color || (props.variant === 'outlined' ? 'primary' : undefined)
  } else {
    // 實心類按鈕 (Elevated)
    bindings.variant = 'elevated'
    // 映射語意顏色
    bindings.color = props.color || colorMap[props.variant] || props.variant
  }

  // 處理圓角
  // 只有在 props.rounded 真的是 undefined 時才使用預設值
  // 空字串 '' 代表使用者明確選擇 "Default",應該傳遞給 Vuetify
  if (props.rounded !== undefined) {
    // 如果是空字串,轉換為 undefined 讓 Vuetify 使用預設值
    bindings.rounded = props.rounded === '' ? undefined : props.rounded
  }

  // 處理 Elevation
  if (props.elevation !== undefined) {
    bindings.elevation = props.elevation
  }

  return bindings
})

// ====================================================
// 3. 樣式類別計算 (Classes)
// ====================================================
const buttonClasses = computed(() => {
  const classes: any[] = []

  // Design System: Primary Button Gradients & Shadows
  if (props.variant === 'primary' && !props.disabled && !props.loading && !props.color) {
    classes.push(
      'bg-gradient-to-r from-indigo-600 to-violet-600 text-white',
      'hover:shadow-[0_10px_25px_-5px_rgba(79,70,229,0.4)]', // Enhanced Colored Shadow
      'hover:-translate-y-0.5', // Lift effect
      'transition-all duration-200 ease-out'
    )
  }

  // Custom Outline Style
  if (props.variant === 'outlined' && !props.color) {
    classes.push('border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300')
  }

  return classes
})

// ====================================================
// 4. 原生實作邏輯 (Native Fallback)
// ====================================================
const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}

const isLink = computed(() => !!props.href)
const componentTag = computed(() => (isLink.value ? 'a' : 'button'))

const nativeStyle = computed(() => {
  if (!props.color) return {}
  const colorValue =
    props.color.startsWith('var(') || props.color.startsWith('#') || props.color.startsWith('rgb')
      ? props.color
      : `var(--color-${props.color}, ${props.color})`

  const isOutlinedOrText = ['text', 'outlined', 'plain'].includes(props.variant)

  return {
    color: isOutlinedOrText ? colorValue : '#ffffff',
    backgroundColor: isOutlinedOrText ? 'transparent' : colorValue,
    borderColor: props.variant === 'outlined' ? colorValue : 'transparent'
  }
})
</script>

<template>
  <!-- 
    實作 A: 底層框架 (Vuetify)
    原則：屬性透傳 ($attrs) 讓 Vue 自動處理剩下的 80% 屬性
  -->
  <v-btn
    v-if="USE_FRAMEWORK"
    v-bind="{ ...vuetifyBindings, ...$attrs }"
    :block="block"
    :loading="loading"
    :disabled="disabled"
    :href="href"
    :target="target"
    :class="buttonClasses"
    @click="handleClick"
  >
    <!-- Prepend Slot -->
    <template
      v-if="prependIcon"
      #prepend
    >
      <slot name="prepend">
        <IIcon :icon="prependIcon" />
      </slot>
    </template>
    <template
      v-else-if="$slots.prepend"
      #prepend
    >
      <slot name="prepend" />
    </template>

    <!-- Default Slot -->
    <slot />

    <!-- Append Slot -->
    <template
      v-if="appendIcon"
      #append
    >
      <slot name="append">
        <IIcon :icon="appendIcon" />
      </slot>
    </template>
    <template
      v-else-if="$slots.append"
      #append
    >
      <slot name="append" />
    </template>

    <!-- Loader Slot (Optional customization) -->
    <template
      v-if="$slots.loader"
      #loader
    >
      <slot name="loader" />
    </template>
  </v-btn>

  <!-- 
    實作 B: 原生 HTML/CSS
    完全不依賴任何第三方 UI 庫，證明介面層解耦能力
  -->
  <component
    :is="componentTag"
    v-else
    :type="isLink ? undefined : 'button'"
    :href="isLink ? href : undefined"
    :target="isLink ? target : undefined"
    :disabled="isLink ? undefined : disabled || loading"
    :class="[
      'i-button',
      `i-button--${variant}`,
      `i-button--${size}`,
      {
        'i-button--block': block,
        'i-button--loading': loading,
        'i-button--disabled': disabled
      },
      ...buttonClasses // Apply same utility classes where possible
    ]"
    :style="nativeStyle"
    @click="handleClick"
  >
    <!-- Loading -->
    <span
      v-if="loading"
      class="i-button__loading"
    >
      <svg
        class="animate-spin h-5 w-5 text-current"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </span>

    <!-- Prepend Icon -->
    <span
      v-if="!loading && (prependIcon || $slots.prepend)"
      class="i-button__prepend mr-2"
    >
      <slot name="prepend">
        <IIcon :icon="prependIcon!" />
      </slot>
    </span>

    <!-- Content -->
    <slot />

    <!-- Append Icon -->
    <span
      v-if="!loading && (appendIcon || $slots.append)"
      class="i-button__append ml-2"
    >
      <slot name="append">
        <IIcon :icon="appendIcon!" />
      </slot>
    </span>
  </component>
</template>

<style scoped>
/* 
 Native Implementation Styles
 Only loaded when USE_FRAMEWORK is false
*/
.i-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border: 1px solid transparent; /* Ensure border exists for layout */
  border-radius: 0.5rem; /* rounded-lg */
  font-size: 1rem; /* text-base */
  font-weight: 500; /* font-medium */
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  line-height: 1.5;
  outline: none;
  user-select: none;
}

.i-button:focus-visible {
  box-shadow:
    0 0 0 2px white,
    0 0 0 4px var(--color-primary, #4f46e5);
}

/* Sizes */
.i-button--x-small {
  padding: 0.125rem 0.5rem;
  font-size: 0.75rem;
}
.i-button--small {
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
}
.i-button--medium {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
} /* Default is often text-sm in systems */
.i-button--large {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}
.i-button--x-large {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}

/* Block */
.i-button--block {
  display: flex;
  width: 100%;
}

/* Disabled */
.i-button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
  box-shadow: none !important;
  transform: none !important;
}

/* Native Variants (Fallbacks) */
.i-button--primary {
  /* Handled by utility classes mostly, but fallback: */
  background-color: #4f46e5;
  color: white;
}
.i-button--secondary {
  background-color: #64748b;
  color: white;
}
.i-button--danger {
  background-color: #ef4444;
  color: white;
}
.i-button--text {
  background-color: transparent;
  color: inherit;
}
.i-button--outlined {
  background-color: transparent;
  border: 1px solid currentColor;
}

.i-button__loading {
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
}
</style>
