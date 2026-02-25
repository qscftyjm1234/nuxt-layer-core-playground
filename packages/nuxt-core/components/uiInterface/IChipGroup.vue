<script setup lang="ts">
/**
 * IChipGroup - UI 介面層 Chip 群組容器
 *
 * 用途：統一的 Chip Group 介面，內部可使用原生 HTML 或 UI 框架
 * 未來要換 UI 框架，只需要修改這個檔案
 */

interface Props {
  gap?: string | number
}

const props = withDefaults(defineProps<Props>(), {
  gap: '0.5rem'
})

const groupStyle = computed(() => ({
  gap: typeof props.gap === 'number' ? `${props.gap}px` : props.gap
}))
</script>

<template>
  <!-- 目前使用原生 HTML -->
  <div
    class="ui-chip-group"
    :style="groupStyle"
  >
    <slot />
  </div>

  <!-- 未來換成 Vuetify 的範例 -->
  <!--
  <VChipGroup>
    <slot />
  </VChipGroup>
  -->
</template>

<style scoped>
.ui-chip-group {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
</style>
