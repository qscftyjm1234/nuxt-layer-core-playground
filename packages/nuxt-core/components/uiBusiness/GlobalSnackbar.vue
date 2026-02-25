<script setup lang="ts">
/**
 * GlobalSnackbar - 業務邏輯層
 *
 * 用途：
 * 1. 連接 useNotify (全域狀態)
 * 2. 呼叫 ISnackbar (介面層) 進行顯示
 * 3. 處理狀態同步
 */

import ISnackbar from '../uiInterface/ISnackbar.vue'

// 1. 取得全域狀態
const { show, message, color, timeout } = useNotify()

// 2. 處理關閉事件
const handleUpdateValue = (val: boolean) => {
  show.value = val
}

defineOptions({
  inheritAttrs: false
})
</script>

<template>
  <!-- 3. 渲染介面層 -->
  <ISnackbar
    v-bind="$attrs"
    :model-value="show"
    :message="message"
    :color="color"
    :timeout="timeout"
    @update:model-value="handleUpdateValue"
  />
</template>
