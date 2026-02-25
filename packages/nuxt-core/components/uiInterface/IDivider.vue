<script setup lang="ts">
/**
 * IDivider - UI 介面層分隔線
 *
 * 用途：統一的 Divider 介面，內部可使用原生 HTML 或 UI 框架
 * 未來要換 UI 框架，只需要修改這個檔案
 */

interface Props {
  color?: string
  thickness?: number
  vertical?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  color: '#e0e0e0',
  thickness: 1,
  vertical: false
})

const dividerStyle = computed(() => ({
  backgroundColor: props.color,
  [props.vertical ? 'width' : 'height']: `${props.thickness}px`
}))
</script>

<template>
  <!-- 目前使用原生 HTML -->
  <hr
    class="ui-divider"
    :class="{ 'ui-divider--vertical': vertical }"
    :style="dividerStyle"
  />

  <!-- 未來換成 Vuetify 的範例 -->
  <!--
  <VDivider
    :color="color"
    :thickness="thickness"
    :vertical="vertical"
  />
  -->
</template>

<style scoped>
.ui-divider {
  border: none;
  margin: 0;
}

.ui-divider--vertical {
  display: inline-block;
  height: auto;
  align-self: stretch;
}
</style>
