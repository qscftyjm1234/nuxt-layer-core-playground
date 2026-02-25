<script setup lang="ts">
/**
 * Header 搜尋欄 - 框架無關
 * 框架無關的搜尋欄
 */
import { useAppStore } from '../../../stores/app'

const appStore = useAppStore()
const searchQuery = ref('')

// 處理輸入框 Focus/Blur 以改變樣式
const handleSearchFocus = (event: FocusEvent) => {
  const target = event.target as HTMLInputElement
  target.style.backgroundColor = 'var(--color-white)'
  target.style.borderColor = 'var(--color-primary)'
}

const handleSearchBlur = (event: FocusEvent) => {
  const target = event.target as HTMLInputElement
  target.style.backgroundColor = 'var(--color-gray-100)'
  target.style.borderColor = 'var(--color-gray-300)'
}
</script>

<template>
  <div
    v-if="appStore.config.header.search"
    class="header-search hidden-mobile"
  >
    <div style="position: relative; max-width: 300px">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        style="
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--color-gray-500);
        "
      >
        <circle
          cx="11"
          cy="11"
          r="8"
        />
        <path d="m21 21-4.35-4.35" />
      </svg>
      <input
        v-model="searchQuery"
        type="search"
        :placeholder="appStore.config.header.searchPlaceholder"
        style="
          width: 100%;
          padding: 0.5rem 0.75rem 0.5rem 2.5rem;
          border: 1px solid var(--color-gray-300);
          border-radius: var(--radius-lg);
          background-color: var(--color-gray-100);
          font-size: 0.875rem;
          transition: all var(--transition-fast);
        "
        @focus="handleSearchFocus"
        @blur="handleSearchBlur"
      />
    </div>
  </div>
</template>

<style scoped>
.header-search input:focus {
  outline: none;
}
</style>
