<script setup lang="ts">
/**
 * ISnackbar - 介面層
 *
 * 用途：統一的 Snackbar/Toast 介面
 *
 * 設計原則：
 * - 透過 props 接收顯示狀態與內容
 * - 透過 emit 通知關閉
 * - 不包含 useNotify 邏輯
 */

interface Props {
  modelValue: boolean
  message: string
  color?: 'success' | 'error' | 'warning' | 'info' | string
  timeout?: number
}

const props = withDefaults(defineProps<Props>(), {
  color: 'success',
  timeout: 3000
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

// 內部狀態管理 (為了 Transition 與 auto-close)
// 如果底層是 Vuetify，直接傳 props 即可。
// 這裡是原生實作，所以簡單模擬一下 timeout 行為。
// 注意：如果由外部控制 timeout (如 useNotify)，這裡其實可以單純響應。
// 但為了符合 "UI component" 通常自帶 timeout 的習慣，我們這裡實作一個簡單的 watcher。

let timer: any = null

watch(
  () => props.modelValue,
  (val) => {
    if (val && props.timeout > 0) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        emit('update:modelValue', false)
      }, props.timeout)
    }
  }
)

// 清理 timer
onBeforeUnmount(() => {
  clearTimeout(timer)
})
</script>

<template>
  <Teleport to="body">
    <div class="i-snackbar-container">
      <Transition name="slide-fade">
        <div
          v-if="modelValue"
          class="i-snackbar"
          :class="`is-${color}`"
        >
          <div class="i-snackbar__content">
            {{ message }}
          </div>
          <button
            class="i-snackbar__close"
            @click="emit('update:modelValue', false)"
          >
            ×
          </button>
        </div>
      </Transition>
    </div>
  </Teleport>

  <!-- 未來換成 Vuetify 的範例 -->
  <!--
  <VSnackbar
    :model-value="modelValue"
    :color="color"
    :timeout="timeout"
    location="bottom right"
    @update:model-value="emit('update:modelValue', $event)"
  >
    {{ message }}
    <template v-slot:actions>
      <VBtn variant="text" @click="emit('update:modelValue', false)">Close</VBtn>
    </template>
  </VSnackbar>
  -->
</template>

<style scoped>
.i-snackbar-container {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 8px;
  pointer-events: none; /* 讓點擊穿透容器，但按鈕可點 */
}

.i-snackbar {
  pointer-events: auto;
  min-width: 300px;
  max-width: 400px;
  padding: 12px 16px;
  border-radius: 8px;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: #333;
  font-size: 14px;
  border-left: 4px solid #ccc;
}

/* Colors */
.is-success {
  border-left-color: #2ecc71;
  background: #e8f8f5;
}
.is-error {
  border-left-color: #e74c3c;
  background: #fdedec;
}
.is-warning {
  border-left-color: #f39c12;
  background: #fef9e7;
}
.is-info {
  border-left-color: #3498db;
  background: #eaf2f8;
}

.i-snackbar__content {
  flex: 1;
  line-height: 1.5;
}

.i-snackbar__close {
  background: none;
  border: none;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  opacity: 0.5;
  padding: 0 4px;
  color: inherit;
}

.i-snackbar__close:hover {
  opacity: 1;
}

/* Transitions */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
