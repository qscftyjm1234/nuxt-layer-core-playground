<script setup lang="ts">
/**
 * Header 動作按鈕 - 框架無關
 * 框架無關的標頭動作按鈕
 */
import { useAppStore } from '../../../stores/app'

const appStore = useAppStore()

const handleAction = (item: any) => {
  if (item.to) {
    navigateTo(item.to)
  } else if (item.action) {
    console.log('Triggered action:', item.action)
  }
}
</script>

<template>
  <div style="display: flex; gap: 0.5rem">
    <button
      v-for="(action, i) in appStore.config.header.actions"
      :key="i"
      class="btn-icon"
      :title="action.title"
      @click="handleAction(action)"
    >
      <div style="position: relative">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
          />
        </svg>
        <span
          v-if="action.badge"
          class="badge badge-dot"
          style="position: absolute; top: -2px; right: -2px"
        />
      </div>
    </button>
  </div>
</template>
