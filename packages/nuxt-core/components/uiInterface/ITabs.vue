<script setup lang="ts">
/**
 * ITabs - UI 介面層分頁導航 (支援深色模式)
 */
interface TabOption {
  label: string
  value: string | number
}

interface Props {
  modelValue: string | number
  options: TabOption[]
}

defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const updateValue = (value: string | number) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="ui-tabs">
    <button
      v-for="option in options"
      :key="option.value"
      class="tab-item"
      :class="{ active: modelValue === option.value }"
      @click="updateValue(option.value)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<style scoped>
.ui-tabs {
  display: flex;
  gap: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1); /* 深色模式邊框 */
  padding: 0 1rem;
  overflow-x: auto;
  scrollbar-width: none;
}

.ui-tabs::-webkit-scrollbar {
  display: none;
}

.tab-item {
  padding: 0.75rem 1.5rem;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  color: #94a3b8; /* 深色模式柔和文字 */
  white-space: nowrap;
  transition: all 0.3s ease;
  position: relative;
  bottom: -1px; /* 對齊底部邊框 */
}

.tab-item:hover {
  color: #e2e8f0;
  background: rgba(255, 255, 255, 0.05); /* 輕微懸停效果 */
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}

.tab-item.active {
  color: #38bdf8; /* 天藍色激活狀態 */
  border-bottom-color: #38bdf8;
}
</style>
