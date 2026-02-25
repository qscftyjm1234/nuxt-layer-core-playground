<script setup lang="ts">
/**
 * IStack - UI 介面層佈局元件
 *
 * 用途：提供 Flexbox 佈局容器，消除頁面中的 CSS 排版代碼。
 */
interface Props {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  gap?: string | number
  align?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
  inline?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'row',
  gap: '0.5rem',
  align: 'stretch',
  justify: 'flex-start',
  wrap: 'nowrap',
  inline: false
})
</script>

<template>
  <div
    class="ui-stack"
    :style="{
      display: inline ? 'inline-flex' : 'flex',
      flexDirection: direction,
      gap: typeof gap === 'number' ? `${gap}rem` : gap,
      alignItems: align,
      justifyContent: justify,
      flexWrap: wrap
    }"
  >
    <slot />
  </div>
</template>

<style scoped>
.ui-stack {
  width: 100%;
}
</style>
