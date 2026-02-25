<script setup lang="ts">
/**
 * ISheet - UI 介面層容器
 *
 * 用途：統一的 Sheet/Container 介面，內部可使用原生 HTML 或 UI 框架
 * 未來要換 UI 框架，只需要修改這個檔案
 */

interface Props {
  color?: string
  rounded?: boolean | string
  elevation?: number
  border?: boolean
  padding?: string | number
}

const props = withDefaults(defineProps<Props>(), {
  color: 'white',
  rounded: false,
  elevation: 0,
  border: false,
  padding: '1rem'
})

const sheetClass = computed(() => ({
  'ui-sheet--rounded': props.rounded === true,
  'ui-sheet--border': props.border
}))

const sheetStyle = computed(() => ({
  backgroundColor: props.color,
  borderRadius: typeof props.rounded === 'string' ? props.rounded : undefined,
  boxShadow:
    props.elevation > 0
      ? `0 ${props.elevation}px ${props.elevation * 2}px rgba(0, 0, 0, 0.1)`
      : 'none',
  padding: typeof props.padding === 'number' ? `${props.padding}px` : props.padding
}))
</script>

<template>
  <!-- 目前使用原生 HTML -->
  <div
    class="ui-sheet"
    :class="sheetClass"
    :style="sheetStyle"
  >
    <slot />
  </div>

  <!-- 未來換成 Vuetify 的範例 -->
  <!--
  <VSheet
    :color="color"
    :rounded="rounded"
    :elevation="elevation"
    :border="border"
    :class="sheetClass"
  >
    <slot />
  </VSheet>
  -->
</template>

<style scoped>
.ui-sheet {
  transition: all 0.3s ease;
}

.ui-sheet--rounded {
  border-radius: 8px;
}

.ui-sheet--border {
  border: 1px solid #e0e0e0;
}
</style>
