<script setup lang="ts">
/**
 * ILoadingSpinner - 介面層
 *
 * 用途：純粹的 Loading 動畫元件
 * 樣式：Double Bounce (雙層跳動圓點)
 */

interface Props {
  size?: number | string
  color1?: string
  color2?: string
}

withDefaults(defineProps<Props>(), {
  size: 60,
  color1: '#3498db', // 主要藍色
  color2: '#2ecc71' // 次要綠色
})
</script>

<template>
  <div
    class="spinner"
    :style="{ width: `${size}px`, height: `${size}px` }"
  >
    <div
      class="double-bounce1"
      :style="{ backgroundColor: color1 }"
    ></div>
    <div
      class="double-bounce2"
      :style="{ backgroundColor: color2 }"
    ></div>
  </div>
</template>

<style scoped>
.spinner {
  position: relative;
}

.double-bounce1,
.double-bounce2 {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
  animation: sk-bounce 2s infinite ease-in-out;
}

.double-bounce2 {
  animation-delay: -1s;
}

@keyframes sk-bounce {
  0%,
  100% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
}
</style>
