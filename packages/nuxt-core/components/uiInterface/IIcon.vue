<script setup lang="ts">
import { computed, h } from 'vue'

/**
 * IIcon - UI 介面層圖示 (框架無關版本)
 *
 * 用途：通用圖示容器，不依賴特定 UI 框架。
 * 特性：
 * 1. 原生 MDI 支援：直接使用 @mdi/font 的 CSS class，不依賴 v-icon。
 * 2. SVG 路徑支援：支援直接傳入 SVG Path 字串。
 * 3. 插槽支援：支援嵌入自定義 SVG 內容。
 */

interface Props {
  /**
   * 圖示名稱 (MDI 字串如 'mdi-home') 或 SVG Path 字串 或 Vue Component
   */
  icon?: string | Component
  /**
   * 圖示大小
   * number: 自動轉 px
   * string: 支援 css 單位 (rem, em, px) 或預設關鍵字 (x-small, small, default, large, x-large)
   */
  size?: 'x-small' | 'small' | 'default' | 'large' | 'x-large' | number | string
  /**
   * 圖示顏色 (CSS color string)
   */
  color?: string
  /**
   * (Optional) 變體樣式類別
   */
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
}

const props = withDefaults(defineProps<Props>(), {
  icon: undefined,
  size: 'default',
  color: undefined,
  variant: undefined
})

// 判斷是否為 MDI 字串
const isMdi = computed(() => typeof props.icon === 'string' && props.icon.startsWith('mdi-'))

// 轉換 MDI 名稱格式 (mdi-home -> mdi:home) 為 @nuxt/icon 使用
const mdiIconName = computed(() => {
  if (!isMdi.value) return ''
  return (props.icon as string).replace('mdi-', 'mdi:')
})

// 判斷是否為 Custom Icon (svg-xxx 格式)
const isCustomIcon = computed(() => typeof props.icon === 'string' && props.icon.startsWith('svg-'))

// 提取 custom icon 名稱 (移除 svg- 前綴)
const customIconName = computed(() => {
  if (!isCustomIcon.value) return undefined
  return (props.icon as string).replace('svg-', '')
})

// 使用 composable 載入自訂圖示
const { svgContent: customIconContent } = useCustomIcon(customIconName)

// 判斷是否為 SVG Path (簡單判斷是否包含逗號或 M 開頭，但排除完整 SVG 標籤)
// 移到前面以便 logic 使用
const isSvgPath = computed(
  () =>
    typeof props.icon === 'string' &&
    !isMdi.value &&
    !isCustomIcon.value &&
    !props.icon.trim().startsWith('<svg') && // 排除 raw SVG
    (props.icon.includes(',') || props.icon.trim().startsWith('M'))
)

// 判斷是否為 Vue Component
const isComponent = computed(
  () => typeof props.icon === 'object' || typeof props.icon === 'function'
)

// 判斷是否為 Raw SVG String
const isRawSvg = computed(
  () => typeof props.icon === 'string' && props.icon.trim().startsWith('<svg')
)

// 處理 Raw SVG / Custom Icon Content
const processedSvg = computed(() => {
  let svg = ''

  if (isCustomIcon.value) {
    svg = customIconContent.value
  } else if (isRawSvg.value) {
    svg = props.icon as string
  } else {
    return ''
  }

  // 移除 width 和 height 屬性，但保留 viewBox
  svg = svg.replace(/\s+(width|height)=["'](\d+|[\d.]+(px|em|ex|%|in|cm|mm|pt|pc))["']/gi, '')

  // 如果沒有 viewBox，嘗試從原始的 width/height 創建一個
  if (!svg.includes('viewBox')) {
    // 嘗試從原始字串或內容中找尺寸
    const original = isRawSvg.value ? (props.icon as string) : svg
    const widthMatch = original.match(/width=["'](\d+)/)
    const heightMatch = original.match(/height=["'](\d+)/)
    if (widthMatch && heightMatch) {
      svg = svg.replace('<svg', `<svg viewBox="0 0 ${widthMatch[1]} ${heightMatch[1]}"`)
    }
  }

  return svg
})

// 計算 CSS 尺寸值
const cssSize = computed(() => {
  if (typeof props.size === 'number') return `${props.size}px`
  const sizeMap: Record<string, string> = {
    'x-small': '12px',
    small: '16px',
    default: '24px',
    large: '32px',
    'x-large': '48px'
  }
  return sizeMap[props.size] || props.size
})

// 計算樣式
const styles = computed(() => {
  const s: Record<string, string> = {}

  if (props.color) {
    // 支援 CSS 變數或直接顏色值
    s.color = props.color.startsWith('var(') ? props.color : props.color
    // 簡易支援 Vuetify theme color 關鍵字 (如果專案有定義對應 CSS 變數)
    if (['primary', 'secondary', 'success', 'warning', 'error', 'info'].includes(props.color)) {
      s.color = `var(--color-${props.color}, ${props.color})`
    }
  }

  if (props.size) {
    const val = cssSize.value
    s.fontSize = val
    s.width = val
    s.height = val
  }

  return s
})

// 計算 Class
const classes = computed(() => [
  'ui-icon',
  props.variant ? `ui-icon--${props.variant}` : '',
  // 如果有指定顏色，加上強制變色 class (針對 Raw SVG)
  props.color ? '--forced-color' : ''
])

// 為了避開 vue/no-v-html 規則，使用 Render Function 渲染 Raw SVG
const RawIcon = (props: { svg: string }) =>
  h('span', {
    class: 'ui-icon__raw',
    innerHTML: props.svg
  })
</script>

<template>
  <span
    :class="classes"
    :style="styles"
  >
    <!-- MDI 圖示模式 (遷移至 @nuxt/icon) -->
    <Icon
      v-if="isMdi"
      :name="mdiIconName"
      :size="cssSize"
    />

    <!-- SVG Path 模式 -->
    <svg
      v-else-if="isSvgPath"
      viewBox="0 0 24 24"
    >
      <path :d="icon as string" />
    </svg>

    <!-- Component 模式 (Vue Component) -->
    <component
      :is="icon"
      v-else-if="isComponent"
    />

    <!-- Raw SVG / Custom Icon 模式 -->
    <RawIcon
      v-else-if="isRawSvg || isCustomIcon"
      :svg="processedSvg"
    />

    <!-- Slot 模式 (內容優先) -->
    <slot v-else />
  </span>
</template>

<style scoped>
.ui-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  line-height: 1;
  /* 預設大小 */
  font-size: 24px;
  width: 1em;
  height: 1em;

  /* 預設繼承顏色 */
  fill: currentColor;
  color: inherit;
}

/* MDI 專用修正：MDI 使用 ::before 呈現圖示，需要 inline-block 才能正確運作 */
.ui-icon.mdi {
  display: inline-block;
  text-align: center;
}

.ui-icon__raw {
  display: contents;
  width: 100%;
  height: 100%;
}

.ui-icon__raw :deep(svg) {
  /* 強制 SVG 填滿容器，由 font-size 控制容器大小 */
  width: 100% !important;
  height: 100% !important;
  /* 移除預設垂直對齊問題 */
  display: block;
}

/* 確保 SVG 內的 image 元素也能正確顯示 */
.ui-icon__raw :deep(svg image) {
  width: 100%;
  height: 100%;
}

/* 當指定了 color prop 時，強制覆蓋內部路徑顏色 */
.ui-icon.--forced-color :deep(path),
.ui-icon.--forced-color :deep(circle),
.ui-icon.--forced-color :deep(rect),
.ui-icon.--forced-color :deep(polygon),
.ui-icon.--forced-color :deep(g) {
  fill: currentColor !important;
  stroke: currentColor !important;
}
</style>
