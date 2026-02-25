<script setup lang="ts">
/**
 * GlobalLoading - 業務邏輯層
 *
 * 用途：
 * 1. 監聽 useLoading (全域狀態)
 * 2. 顯示全螢幕遮罩
 * 3. 呼叫 ILoadingSpinner (介面層) 顯示動畫
 */

import ILoadingSpinner from '../uiInterface/ILoadingSpinner.vue'

// 1. 取得全域狀態
const { isLoading } = useLoading()

defineOptions({
  inheritAttrs: false
})
</script>

<template>
  <Transition name="fade">
    <div
      v-if="isLoading"
      class="global-loading-overlay"
      v-bind="$attrs"
    >
      <!-- 2. 引入介面層動畫 -->
      <ILoadingSpinner :size="60" />
    </div>
  </Transition>
</template>

<style scoped>
.global-loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  /* 深色遮罩以提供更好的對比度 */
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

/* 過渡效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
