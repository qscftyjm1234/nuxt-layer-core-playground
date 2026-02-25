<script setup lang="ts">
/**
 * IBadge - UI 介面層徽章
 *
 * 用途：統一的 Badge 介面，內部可使用原生 HTML 或 UI 框架
 * 未來要換 UI 框架，只需要修改這個檔案
 */

interface Props {
  content?: string | number // 徽章內容
  dot?: boolean // 是否只顯示點
  color?: string // 顏色
  max?: number // 最大數字(超過顯示 99+)
}

const props = withDefaults(defineProps<Props>(), {
  dot: false,
  color: '#f44336',
  max: 99
})

// 計算顯示內容
const displayContent = computed(() => {
  if (props.dot) return ''
  if (typeof props.content === 'number' && props.content > props.max) {
    return `${props.max}+`
  }
  return props.content
})

// 是否顯示徽章
const shouldShow = computed(
  () => props.dot || (props.content !== undefined && props.content !== '' && props.content !== 0)
)
</script>

<template>
  <!-- 目前使用原生 HTML -->
  <div class="ui-badge-wrapper">
    <slot />
    <span
      v-if="shouldShow"
      class="ui-badge"
      :class="{ 'is-dot': dot }"
      :style="{ backgroundColor: color }"
    >
      {{ displayContent }}
    </span>
  </div>

  <!-- 未來換成 Vuetify 的範例 -->
  <!--
  <VBadge
    :content="displayContent"
    :dot="dot"
    :color="color"
  >
    <slot />
  </VBadge>
  -->
</template>

<style scoped>
.ui-badge-wrapper {
  position: relative;
  display: inline-flex;
}

.ui-badge {
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: #f44336;
  color: white;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
  box-shadow: 0 0 0 2px white;
}

.ui-badge.is-dot {
  min-width: 8px;
  height: 8px;
  padding: 0;
  border-radius: 50%;
}
</style>
