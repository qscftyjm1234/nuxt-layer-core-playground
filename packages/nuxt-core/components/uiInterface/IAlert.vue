<script setup lang="ts">
/**
 * IAlert - UI 介面層警示框
 *
 * 用途：顯示重要訊息、提示或警告
 */
interface Props {
  title?: string
  text?: string
  type?: 'info' | 'success' | 'warning' | 'error'
  variant?: 'tonal' | 'outlined' | 'flat'
  icon?: string
}

withDefaults(defineProps<Props>(), {
  title: '',
  text: '',
  type: 'info',
  variant: 'tonal',
  icon: ''
})
</script>

<template>
  <div
    class="ui-alert"
    :class="[`type-${type}`, `variant-${variant}`]"
  >
    <div
      v-if="icon"
      class="alert-icon"
    >
      {{ icon }}
    </div>
    <div class="alert-content-wrapper">
      <div
        v-if="title"
        class="alert-title"
      >
        {{ title }}
      </div>
      <div class="alert-text">
        <slot>{{ text }}</slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ui-alert {
  display: flex;
  padding: 1rem 1.5rem;
  border-radius: 4px;
  border-left-width: 4px;
  border-left-style: solid;
  gap: 1rem;
}

.variant-tonal.type-info {
  background: #f0f7ff;
  border-left-color: #2196f3;
  color: #0c5460;
}

.variant-tonal.type-success {
  background: #e8f5e9;
  border-left-color: #4caf50;
  color: #2e7d32;
}

.variant-tonal.type-warning {
  background: #fff3e0;
  border-left-color: #ff9800;
  color: #856404;
}

.variant-tonal.type-error {
  background: #fee2e2;
  border-left-color: #ef4444;
  color: #721c24;
}

.variant-outlined {
  background: transparent;
  border: 1px solid currentColor;
  border-left-width: 4px;
}

.alert-title {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.alert-text {
  font-size: 0.95rem;
  line-height: 1.5;
}

.alert-content-wrapper {
  flex: 1;
}

.alert-icon {
  font-size: 1.5rem;
  display: flex;
  align-items: flex-start;
  padding-top: 0.125rem;
}
</style>
