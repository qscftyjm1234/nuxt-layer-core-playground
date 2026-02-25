<script setup lang="ts">
/**
 * IChip - UI 介面層標籤
 *
 * 用途：統一的 Chip 介面，內部可使用原生 HTML 或 UI 框架
 * 未來要換 UI 框架，只需要修改這個檔案
 */

interface Props {
  label?: string
  color?: string
  size?: 'small' | 'medium' | 'large'
  variant?: 'filled' | 'outlined'
  closable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  color: '#3498db',
  size: 'medium',
  variant: 'filled',
  closable: false
})

const emit = defineEmits<{
  close: []
}>()

const chipClass = computed(() => ({
  [`size-${props.size}`]: true,
  [`variant-${props.variant}`]: true
}))

const chipStyle = computed(() => {
  if (props.variant === 'filled') {
    return {
      backgroundColor: props.color,
      color: 'white'
    }
  }
  return {
    borderColor: props.color,
    color: props.color
  }
})
</script>

<template>
  <!-- 目前使用原生 HTML -->
  <span
    class="ui-chip"
    :class="chipClass"
    :style="chipStyle"
  >
    <span class="chip-label">
      <slot>{{ label }}</slot>
    </span>
    <button
      v-if="closable"
      class="chip-close"
      @click="emit('close')"
    >
      ×
    </button>
  </span>

  <!-- 未來換成 Vuetify 的範例 -->
  <!--
  <VChip
    :color="color"
    :size="size"
    :variant="variant"
    :closable="closable"
    @click:close="emit('close')"
  >
    <slot>{{ label }}</slot>
  </VChip>
  -->
</template>

<style scoped>
.ui-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  transition: all 0.2s;
}

.ui-chip.size-small {
  padding: 0.125rem 0.5rem;
  font-size: 0.75rem;
}

.ui-chip.size-large {
  padding: 0.375rem 1rem;
  font-size: 1rem;
}

.ui-chip.variant-outlined {
  background: transparent !important;
  border: 1px solid currentColor;
}

.chip-label {
  line-height: 1;
}

.chip-close {
  background: none;
  border: none;
  color: inherit;
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
  padding: 0;
  margin-left: 0.25rem;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.chip-close:hover {
  opacity: 1;
}
</style>
