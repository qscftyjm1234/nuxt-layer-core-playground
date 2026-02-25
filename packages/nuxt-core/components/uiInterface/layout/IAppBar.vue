<script setup lang="ts">
/**
 * IAppBar - UI 介面層頂部導航欄
 *
 * 用途：統一的 AppBar 介面，內部可使用原生 HTML 或 UI 框架
 * 未來要換 UI 框架，只需要修改這個檔案
 *
 * 設計原則：
 * - 提供標準化的 props 介面
 * - 內部適配不同 UI 框架的差異
 * - Layout 元件只需要知道這個統一介面
 */

interface Props {
  fixed?: boolean // 是否固定在頂部
  elevation?: number // 陰影深度 (0-24)
  color?: string // 背景顏色
  dark?: boolean // 深色模式
}

const props = withDefaults(defineProps<Props>(), {
  fixed: true,
  elevation: 2,
  color: 'white',
  dark: false
})

// 計算樣式
const appBarClass = computed(() => ({
  'is-fixed': props.fixed,
  'is-dark': props.dark
}))

const appBarStyle = computed(() => ({
  backgroundColor: props.color,
  boxShadow:
    props.elevation > 0
      ? `0 ${props.elevation}px ${props.elevation * 2}px rgba(0, 0, 0, 0.1)`
      : 'none'
}))
</script>

<template>
  <!-- 目前使用原生 HTML -->
  <!-- 未來可以換成 Vuetify/Element UI -->

  <header
    class="ui-app-bar"
    :class="appBarClass"
    :style="appBarStyle"
  >
    <div class="app-bar-content">
      <slot />
    </div>
  </header>

  <!-- 未來換成 Vuetify 的範例 -->
  <!--
  <VAppBar
    :color="color"
    :elevation="elevation"
    :app="fixed"
    :dark="dark"
  >
    <slot />
  </VAppBar>
  -->

  <!-- 未來換成 Element UI 的範例 -->
  <!--
  <ElHeader
    :style="{ backgroundColor: color }"
    :class="{ 'is-fixed': fixed }"
  >
    <slot />
  </ElHeader>
  -->
</template>

<style scoped>
.ui-app-bar {
  width: 100%;
  min-height: 64px;
  display: flex;
  align-items: center;
  z-index: 1000;
  transition: all 0.3s ease;
}

.ui-app-bar.is-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}

.ui-app-bar.is-dark {
  color: white;
}

.app-bar-content {
  width: 100%;
  max-width: 100%;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* 為 fixed 的 AppBar 預留空間 */
.ui-app-bar.is-fixed + * {
  margin-top: 64px;
}
</style>
