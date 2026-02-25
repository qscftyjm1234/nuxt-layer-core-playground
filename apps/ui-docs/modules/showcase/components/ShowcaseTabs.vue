<script setup lang="ts">
/**
 * ShowcaseTabs
 * 業務邏輯層元件 (Business Layer)
 * 封裝 ITabs 用於展示頁面導航 (Dark Mode)
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

const handleUpdate = (value: string | number) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="showcase-tabs-wrapper">
    <ITabs
      :model-value="modelValue"
      :options="options"
      @update:model-value="handleUpdate"
    />
  </div>
</template>

<style scoped>
.showcase-tabs-wrapper {
  margin: 2rem 0;
  /* Dark mode specific tweaks if needed, but ITabs handles the look */
}
</style>
